package no.dcat.harvester.crawler;

import com.google.common.cache.LoadingCache;
import no.dcat.admin.store.AdminDataStore;
import no.dcat.admin.store.DcatDataStore;
import no.dcat.admin.store.Fuseki;
import no.dcat.admin.store.domain.DcatSource;
import no.dcat.harvester.crawler.handlers.ElasticSearchResultHandler;
import no.dcat.harvester.crawler.handlers.ElasticSearchResultPubHandler;
import no.dcat.harvester.crawler.handlers.FusekiResultHandler;
import no.dcat.harvester.settings.ApplicationSettings;
import no.dcat.harvester.settings.FusekiSettings;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.net.URL;

@Component
public class CrawlerJobFactory {
	
	@Autowired
	private FusekiSettings fusekiSettings;

	@Autowired
	private ApplicationSettings applicationSettings;
	
	@Autowired
	private LoadingCache<URL, String> brregCache;
	
	private AdminDataStore adminDataStore;
	private DcatDataStore dcatDataStore;
	
	private FusekiResultHandler fusekiResultHandler;
	private ElasticSearchResultHandler elasticSearchResultHandler;
	private CrawlerResultHandler publisherHandler;
	private CrawlerResultHandler codeHandler;

	private final Logger logger = LoggerFactory.getLogger(CrawlerJobFactory.class);

	@PostConstruct
	public void initialize() {
		adminDataStore = new AdminDataStore(new Fuseki(fusekiSettings.getAdminServiceUri()));
		dcatDataStore = new DcatDataStore(new Fuseki(fusekiSettings.getDcatServiceUri()));
		fusekiResultHandler = new FusekiResultHandler(dcatDataStore, adminDataStore);
	}
	
	public CrawlerJob createCrawlerJob(DcatSource dcatSource) {

		logger.debug("applicationsettings.elasticSearchHost: " + applicationSettings.getElasticSearchHost());
		logger.debug("applicationsettings.elasticSearchPort: " + applicationSettings.getElasticSearchPort());
		logger.debug("applicationsettings.elasticSearchCluster: " + applicationSettings.getElasticSearchCluster());


		publisherHandler = new ElasticSearchResultPubHandler(applicationSettings.getElasticSearchHost(),applicationSettings.getElasticSearchPort(), applicationSettings.getElasticSearchCluster());
		elasticSearchResultHandler = new ElasticSearchResultHandler(applicationSettings.getElasticSearchHost(), applicationSettings.getElasticSearchPort(), applicationSettings.getElasticSearchCluster(), applicationSettings.getThemesHostname(), applicationSettings.getHttpUsername(), applicationSettings.getHttpPassword());
		return new CrawlerJob(dcatSource, adminDataStore, brregCache, fusekiResultHandler, elasticSearchResultHandler, publisherHandler);
	}

}