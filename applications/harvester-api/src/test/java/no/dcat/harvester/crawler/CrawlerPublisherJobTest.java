package no.dcat.harvester.crawler;

import no.dcat.admin.store.domain.DcatSource;
import no.dcat.harvester.HarvesterApplication;
import org.junit.Test;
import org.mockito.Mockito;

import java.net.URL;

import static org.mockito.Matchers.anyObject;
import static org.mockito.Mockito.verify;

/**
 * Class for testing CrawlerPublisherJob.
 */
public class CrawlerPublisherJobTest {
    URL url = getClass().getClassLoader().getResource("catalog.ttl");

    @Test
    public void testThatHandlerIsInvoked() {
        CrawlerResultHandler handler = Mockito.mock(CrawlerResultHandler.class);
        Mockito.doNothing().when(handler).process(anyObject(), anyObject());

        URL url = getClass().getClassLoader().getResource("datasett-mini.ttl");
        DcatSource dcatSource = new DcatSource("http//dcat.no/test", "Test", url.toString(), "admin_user", "123456789");

        CrawlerPublisherJob j = new CrawlerPublisherJob(dcatSource, null, HarvesterApplication.getBrregCache(), handler);

        j.run();

        verify(handler).process(anyObject(), anyObject());
    }
}