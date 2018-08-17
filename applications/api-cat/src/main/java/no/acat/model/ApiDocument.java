package no.acat.model;


import com.fasterxml.jackson.annotation.JsonInclude;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.ToString;
import no.acat.model.openapi3.OpenApi;
import no.dcat.shared.Contact;
import no.dcat.shared.HarvestMetadata;
import no.dcat.shared.PeriodOfTime;
import no.dcat.shared.Publisher;
import no.dcat.shared.Reference;
import no.dcat.shared.SkosCode;

import java.util.List;
import java.util.Map;

@Data
@ToString(includeFieldNames = false)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiDocument  {
    @ApiModelProperty("The id given to the object by the harvest system")
    private String id;

    @ApiModelProperty("The uri (url) of the specification which are used to harvest the specification ")
    private String uri;

    @ApiModelProperty("information about when the api was first and last harvested by the system")
    private HarvestMetadata harvest;

    @ApiModelProperty("the time period the api is open for business and can be used by clients, [start-date, end-date)")
    private List<PeriodOfTime> online;

    @ApiModelProperty("if the api is replaced or are going to be closed the deprecation field should be present")
    private Deprecation deprecation;

    @ApiModelProperty("the title of the api, can be specified in multiple langauges [dct:title]")
    private Map<String, String> title;

    @ApiModelProperty("the description of the api, can be specified in multiple languages [dct:description]")
    private Map<String, String> description;

    @ApiModelProperty("a code that identifies the level of trust you should put in the data returned from the api (NASJONAL, VEDTAK, BRUKER, TREDJEPART) [dct:provenance]")
    private SkosCode provenance;

    @ApiModelProperty("A code to identify if the api is open or restricted in some way [dct:accessRights]")
    private SkosCode accessRights;

    @ApiModelProperty("The publisher of the api [dct:publisher]")
    private Publisher publisher;

    @ApiModelProperty("The contact point [dcat:contactPoint]")
    private List<Contact> contactPoint ;

    @ApiModelProperty("An overview of the formats returned by the api")
    private List<String> format;

    @ApiModelProperty("A code to specify how often the data is updated (the frequency) [dct:accrualPeriodicity]")
    private SkosCode accrualPeriodicity;

    @ApiModelProperty("A list of references to the datasets that can be returned by the api")
    private List<Reference> datasetReferences;

    @ApiModelProperty("The open api specification (swagger)")
    private OpenApi openApi;

}
