package no.dcat.controller;

import com.google.common.collect.Sets;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import no.dcat.model.Catalog;
import no.dcat.model.Dataset;
import no.dcat.model.exceptions.CatalogNotFoundException;
import no.dcat.model.exceptions.DatasetNotFoundException;
import no.dcat.model.exceptions.ErrorResponse;
import no.dcat.service.CatalogRepository;
import no.dcat.shared.DataTheme;
import no.dcat.shared.SkosCode;
import no.dcat.datastore.domain.dcat.builders.DcatReader;
import org.apache.commons.io.IOUtils;
import org.apache.jena.query.DatasetFactory;
import org.apache.jena.rdf.model.Model;
import org.apache.jena.riot.JsonLDWriteContext;
import org.apache.jena.riot.RDFDataMgr;
import org.apache.jena.riot.RDFFormat;
import org.apache.jena.riot.WriterDatasetRIOT;
import org.apache.jena.riot.system.PrefixMap;
import org.apache.jena.riot.system.RiotLib;
import org.apache.jena.util.FileManager;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.io.StringWriter;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.*;

import static org.springframework.http.MediaType.APPLICATION_JSON_UTF8_VALUE;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@RestController
@RequestMapping(value = "/catalogs/{id}/import")
public class ImportController {

    private static Logger logger = LoggerFactory.getLogger(ImportController.class);

    protected final CatalogController catalogController;

    protected final DatasetController datasetController;

    protected final CatalogRepository catalogRepository;

    @Value("${application.themesServiceUrl}")
    private String  THEMES_SERVICE_URL = "http://localhost:8100";

    private final Map<String,Map<String,SkosCode>> allCodes = new HashMap<>();
    final Map<String,DataTheme> allThemes = new HashMap<>();
    private final static Model owlSchema = FileManager.get().loadModel("frames/schema.ttl");

    @Autowired
    public ImportController(CatalogController catalogController, DatasetController datasetController, CatalogRepository catalogRepository) {
        this.catalogController = catalogController;
        this.datasetController = datasetController;
        this.catalogRepository = catalogRepository;
    }

    @PreAuthorize("hasPermission(#catalogId, 'write')")
    @CrossOrigin
    @RequestMapping(value = "",
            method = POST,
            produces = APPLICATION_JSON_UTF8_VALUE)
    public HttpEntity<Catalog> importCatalog(
            @PathVariable(value = "id") String catalogId,
            @RequestBody String url) throws DatasetNotFoundException, CatalogNotFoundException, IOException {
        logger.info("import requested for {} starts", url);
        Catalog catalog;

        catalog = importDatasets(catalogId, new URL(url));

        logger.info("import request for {} finished. Found {} dataset to import", url, catalog.getDataset());
        return new ResponseEntity<>(catalog, HttpStatus.OK);
    }

    @ExceptionHandler(IOException.class)
    public ResponseEntity<ErrorResponse> exceptionHandler(Exception ex) {
        ErrorResponse error = new ErrorResponse();
        error.setErrorCode(HttpStatus.BAD_REQUEST.value());
        error.setMessage(ex.getMessage());

        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(value = {CatalogNotFoundException.class, DatasetNotFoundException.class })
    public ResponseEntity<ErrorResponse> notFoundException(Exception ex) {
        ErrorResponse error = new ErrorResponse();
        error.setErrorCode(HttpStatus.NOT_FOUND.value());
        error.setMessage(ex.getMessage());

        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }

    Catalog importDatasets(String catalogId, URL url) throws IOException, CatalogNotFoundException, DatasetNotFoundException {
        if(!(url.getProtocol().equals("http") || url.getProtocol().equals("https"))){
            throw new MalformedURLException("Supports only http and https");
        }

        Model model = null;

        try {
            model = FileManager.get().loadModel(url.toString());
        } catch (NullPointerException e) {
            throw new IOException(String.format("Cannot open import url %s",url));
        }

        Catalog existingCatalog = catalogRepository.findOne(catalogId);

        if (existingCatalog == null) {
            throw new CatalogNotFoundException(String.format("Catalog %s does not exist in registration database", catalogId));
        }

        Catalog catalogToImportTo = parseCatalog(model, existingCatalog, catalogId);

        if (catalogToImportTo == null) {
            throw new CatalogNotFoundException(String.format("Catalog %s is not found in imported data", catalogId));
        }

        List<Dataset> importedDatasets = parseAndSaveDatasets(model, catalogToImportTo, catalogId);

        if (importedDatasets.isEmpty()) {
            throw new DatasetNotFoundException(String.format("No datasets found in import data that is part of catalog %s", catalogId ));
        }

        List<no.dcat.shared.Dataset> theList = new ArrayList<>();
        theList.addAll(importedDatasets);
        catalogToImportTo.setDataset(theList);


        return catalogToImportTo;
    }

    Catalog parseCatalog(Model model, Catalog existingCatalog, String catalogId) throws  IOException, CatalogNotFoundException {
        List<Catalog> catalogs = parseCatalogs(model);

        Catalog catalogToImportTo = catalogs
                .stream()
                .filter(cat -> cat.getUri().contains(catalogId))
                .peek(cat -> logger.debug("Found catalog {} in external data", cat.toString()))
                .findFirst()
                .orElseThrow(() -> new CatalogNotFoundException(String.format("Catalog %s is not found in import data", catalogId)));

        // Ignore imported catalog attributes, i.e. copy over stored values to result
        catalogToImportTo.setId(existingCatalog.getId());
        catalogToImportTo.setTitle(existingCatalog.getTitle());
        catalogToImportTo.setDescription(existingCatalog.getDescription());
        catalogToImportTo.setPublisher(existingCatalog.getPublisher());

        return catalogToImportTo;
    }

    List<Dataset> parseAndSaveDatasets(Model model, Catalog catalogToImportTo, String catalogId) throws IOException {
        List<Dataset> importedDatasets = new ArrayList<>();

        List<Dataset> datasets = parseDatasets(model);

        for (Dataset dataset : datasets) {
            if (dataset.getCatalog() != null && dataset.getCatalog().getId().contains(catalogId) ) {
                dataset.setCatalogId(catalogId);
                dataset.setCatalog(null);

                Dataset newDataset = datasetController.createAndSaveDataset(catalogId, dataset, catalogToImportTo);
                importedDatasets.add(newDataset);
                logger.trace("ds: {}", newDataset);
            }
        }

        return importedDatasets;
    }

    List<Catalog> parseCatalogs(Model model) throws IOException {

        String json = frame(DatasetFactory.create(model), IOUtils.toString(new ClassPathResource("frames/catalog.json").getInputStream(), "UTF-8"));

        return new Gson().fromJson(json, FramedCatalog.class).getGraph();
    }

    DcatReader getDcatReader(Model model) {
        return new DcatReader(model, THEMES_SERVICE_URL, "user", "password");
    }

    List<Dataset> parseDatasets(Model model) throws IOException {

        DcatReader reader = getDcatReader(model);

        List<no.dcat.shared.Dataset> firstResult = reader.getDatasets();
        List<Dataset> result = new ArrayList<>();
        firstResult.forEach( dataset -> {
            Dataset d = new Dataset();
            BeanUtils.copyProperties(dataset,d);
            logger.debug ("dataset {}", d.getUri());
            result.add(d);
        });

        logger.trace("Result from Dcat transformation: {}", new GsonBuilder().setPrettyPrinting().create().toJson(result));
        logger.info("parsed {} datasets from RDF import", result.size());

        return result;
    }

    private final Set<String> languages = Sets.newHashSet("no", "nb", "nn", "en");


    void pruneLanguages(List<SkosCode> codelist) {
        codelist.forEach(skosCode -> skosCode.getPrefLabel().keySet().removeIf(lang -> !languages.contains(lang)));
    }

    Map<String,String> getLabelForCode(String codeType, String code) {
        SkosCode skosCode = allCodes.get(codeType).get(code);

        if (skosCode != null) {
            return skosCode.getPrefLabel();
        }

        return null;
    }


    private String frame(org.apache.jena.query.Dataset dataset, String frame) {

        WriterDatasetRIOT w = RDFDataMgr.createDatasetWriter(RDFFormat.JSONLD_FRAME_PRETTY);
        PrefixMap pm = RiotLib.prefixMap(dataset.getDefaultModel().getGraph());

        StringWriter stringWriter = new StringWriter();

        JsonLDWriteContext ctx = new JsonLDWriteContext();

        ctx.setFrame(frame);

        w.write(stringWriter, dataset.asDatasetGraph(), pm, null, ctx);


        return stringWriter.toString();
    }


}
