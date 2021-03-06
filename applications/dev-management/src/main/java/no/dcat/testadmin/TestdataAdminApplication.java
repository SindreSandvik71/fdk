package no.dcat.testadmin;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

/**
 * Created by nodavsko on 02.11.2016.
 */
@SpringBootApplication
public class TestdataAdminApplication extends WebMvcConfigurerAdapter {
    private static  Logger logger = LoggerFactory.getLogger(TestdataAdminApplication.class);

    /**
     * Standard magic for starting the spring boot application.
     *
     * @param args any parameters that you want to transfer to the spring boot application
     */
    public static void main(final String[] args) {

        SpringApplication.run(TestdataAdminApplication.class, args);
    }

}
