package no.dcat.service;

import no.dcat.model.Catalog;
import no.dcat.shared.admin.DcatSourceDto;
import org.apache.commons.codec.binary.Base64;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.support.BasicAuthorizationInterceptor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.nio.charset.Charset;
import java.util.List;

/**
 * Created by bjg on 02.02.2018.
 *
 * Handles communication with harvester,
 * so that registration-api can create harvest
 * data sources for its catalogs
 *
 */
@Service
public class HarvesterService {
    private static Logger logger = LoggerFactory.getLogger(HarvesterService.class);
    public List<DcatSourceDto> getHarvestEntries() {

        RestTemplate restTemplate = new RestTemplate();


        //get existing entries
        //TODO: flytt til properties
        String uri = "http://localhost:8082/api/admin/dcat-sources";
        String username = "test_admin";
        String password = "password";

        restTemplate.getInterceptors().add(new BasicAuthorizationInterceptor(username,password));

        ResponseEntity<String> response = null;
        try {
            //restTemplate.postForEntity(uri, String.class);
            response = restTemplate.getForEntity(uri, String.class);
            //response = restTemplate.exchange(
            //        uri,
            //        HttpMethod.GET,
            //        new HttpEntity<>(createHeaders(username, password)),
            //        String.class);
        } catch (Exception e) {
            logger.error("Failed to get list of dcat sources from harvester-api: {}", e.getLocalizedMessage());
            logger.error("response from harvester: {}", response.toString());
        }

       //List<DcatSourceDto> dcatsources = response.getBody();

        logger.info("response status code: {}", response.getStatusCode());
        logger.info("Response body: {}", response.getBody());

        return null;
    }


    public boolean createHarvestEntry(Catalog catalog) {
        return true;
    }




    /**
     * helper method to create authorisation header for http request
     *
     * @param username
     * @param password
     * @return HTTP header containing basic auth and content type application/josn
     */
    private HttpHeaders createHeaders(String username, String password){
        return new HttpHeaders() {{
            String auth = username + ":" + password;

            byte[] encodedAuth = Base64.encodeBase64(
                    auth.getBytes(Charset.forName("US-ASCII")) );
            String authHeader = "Basic " + new String( encodedAuth );
            set( "Authorization", authHeader );
        }};
    }

}
