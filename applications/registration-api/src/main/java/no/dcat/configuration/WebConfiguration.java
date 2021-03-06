package no.dcat.configuration;

import no.dcat.datastore.domain.dcat.RdfMessageConverter;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import java.util.List;

/**
 * Created by dask on 10.04.2017.
 */
@Configuration
public class WebConfiguration extends WebMvcConfigurerAdapter {

    @Override
    public void extendMessageConverters(List<HttpMessageConverter<?>> converters) {
        RdfMessageConverter converter = new RdfMessageConverter();
        converters.add(0, new RdfMessageConverter());
        super.extendMessageConverters(converters);
    }
}
