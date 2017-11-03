import React from 'react'; // const React = require('react');
import qs from 'qs'; // const qs = require('qs');

import localization from '../localization';
let state = {}
let lastupdated = 0;
const CustomHitsStats = (props) => {
  const { hitsCount, timeTaken } = props;
  const queryObj = qs.parse(window.location.search.substr(1));
  const language = localization.getLanguage();
  const locationHref = window.location.href;
  const initialCountSummaryShown = requestCompleted && hitsCountInt;
  const hitsCountHasDecreased = state.hitsCount > hitsCount;

  const filteringOrTextSearchPerformed = queryObj ? Object.keys(queryObj).length > 1 || (Object.keys(queryObj).length === 1 && !queryObj.lang) : false;
  const hitsCountInt = hitsCount ? parseInt(hitsCount, 10) : 0;
  let previousState = '';
  let requestCompleted = true;

  if(timeTaken === state.timeTaken && language === state.language && locationHref === state.locationHref) {
    requestCompleted =  false;
  }
  if(state.initialCountSummaryShown) {
    previousState = 'initialCountSummaryShown';
  } else {
    previousState = 'searchSummaryShown';
  }
  state.language = language;
  state.timeTaken = timeTaken;
  state.locationHref = locationHref;
  state.initialCountSummaryShown = initialCountSummaryShown;
  state.hitsCount = hitsCount;

  if (
      requestCompleted &&
      filteringOrTextSearchPerformed &&
      previousState !== 'initialCountSummaryShown'
    ) { // it's a search
    lastupdated = Date.now();
    return (
      <div className="sk-hits-stats" data-qa="hits-stats">
        <div className="sk-hits-stats__info" data-qa="info">
          <span>{localization.page['result.summary']}</span> <span>{hitsCount}</span> {localization.page.dataset}
        </div>
      </div>
    );
  } else if (requestCompleted && hitsCountInt) {
    return (
      lastupdated = Date.now();
      <div className="sk-hits-stats" data-qa="hits-stats">
        <div className="sk-hits-stats__info nosearch" data-qa="info">
          <span>{localization.page['nosearch.summary']}</span> <span>{hitsCount}</span> {localization.page['nosearch.descriptions']}
        </div>
      </div>
    );
  }
  return null;
};
/*
*/

export default CustomHitsStats;
