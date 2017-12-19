import {AxiosESTransport} from "searchkit";
const defaults = require("lodash/defaults");
import * as axios from "axios";
const qs = require('qs');

export class QueryTransport2 extends AxiosESTransport {
  constructor(host, options) {
    super()
    this.options = defaults(options, {
      headers:{},
      searchUrlPath: "/datasets" // harvest(s?)
    })
    this.axios = axios.create({
      baseURL:this.host,
      timeout:AxiosESTransport.timeout,
      headers:this.options.headers
    })
    this.filters = [
      {
        key: 'subject.no.raw',
        paramName: 'subject',
        name: 'subjectCount',
      },
      {
        key: 'publisher.name.raw',
        paramName: 'publisher',
        name: 'publisherCount',
      }
    ];
  }
  
  search(query) {
    this.filters.forEach((filter)=> {
      // http://localhost:8083/search?q=test&from=0&size=10&lang=nb&publisher=AKERSHUS%20FYLKESKOMMUNE
      filter.query = '';
      let multiple = false;
      if(query.post_filter) { // there is an aggregation post_filter
        if(query.post_filter.bool) { // array of post_filters
          query.post_filter.bool.must.forEach((post_filter) => {
            if(post_filter.term[filter.key]) {
              if(filter.query.length === 0) {
                filter.query += '&' + filter.paramName +'=';
              }
              if (multiple) {
                  filter.query += ',';
              }
              filter.query += encodeURIComponent(post_filter.term[filter.key]);
              multiple = true;
            }
          })
        } else if(query.post_filter.term) { // single post_filter
          filter.query = (query.post_filter.term[filter.key] ? '&' + filter.paramName +'=' + encodeURIComponent(query.post_filter.term[filter.key]) : '');
        }
      }
      filter.query = filter.query.replace(/,\s*$/, "");
    })

    let hasSingleWord = false;
    if(query.query) {
      let q = query.query.simple_query_string.query;
      hasSingleWord = !q.includes(' ') && !q.includes('*'); // no spaces and no asterix search
    }

    let filtersUrlFragment = this.filters.map(filter=>filter.query).join(''); // build url fragment from list of filters
    return this.axios.get(
      `${this.options.searchUrlPath}?q=` +
			(query.query ? encodeURIComponent(query.query.simple_query_string.query) : '') +
      (hasSingleWord ? '*' : '') + // if there is a single word, we perform an assterix search
			'&from=' +
			((!query.from) ? '0' : query.from) +
			'&size=' +
      query.size +
      '&lang=nb' +
      filtersUrlFragment
		)
      .then(x => new Promise(resolve => setTimeout(() => resolve(x), 50)))
      .then((response)=>this.getData.call(this, response))
  }

  getData(response) {
    let aggregations = response.data.aggregations;
      this.filters.forEach((filter, index)=>{
        let rawName = filter.key + (index + 3); // why 3? seems the first 2-3 are internal searchkit stuff
        let name = filter.name;
        let rawNameShort = rawName.substr(0, rawName.length-1);
        if (aggregations && aggregations.hasOwnProperty(name)) {
            aggregations[rawName] = {};
            aggregations[rawName].size = '5';
            aggregations[rawName][rawNameShort] = aggregations[name];
            if(aggregations[rawName][rawNameShort].buckets.length > 5) {
              aggregations[rawName][rawNameShort].buckets.splice(5, 0, {key:'showmoreinput'});
              aggregations[rawName][rawNameShort].buckets.splice(6, 0, {key:'showmorelabel'});
              aggregations[rawName][rawNameShort].buckets.splice(100, 0, {key:'showfewerlabel'});
            }
            aggregations[rawName][rawNameShort].buckets = aggregations[rawName][rawNameShort].buckets.slice(0,101);
            aggregations[rawName][rawNameShort].doc_count_error_upper_bound = 1000;
            aggregations[rawName][rawNameShort].sum_other_doc_count = 1000;
            delete aggregations[name];
        }
      })
    this.responseData = response.data;
    return response.data
  }
}