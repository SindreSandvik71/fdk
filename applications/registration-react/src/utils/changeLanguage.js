import qs from 'qs';

import localization from './localization';
import { addOrReplaceParam } from './addOrReplaceParam';
import history from './history';

export const getLangUrl = langCode => {
  const href = window.location.search;
  const queryObj = qs.parse(window.location.search.substr(1));
  if (langCode === 'nb') {
    return addOrReplaceParam(href, 'lang', '');
  } else if (href.indexOf('lang=') === -1) {
    return href.indexOf('?') === -1
      ? `${href}?lang=${langCode}`
      : `${href}&lang=${langCode}`;
  } else if (langCode !== queryObj.lang) {
    const replacedUrl = addOrReplaceParam(href, 'lang', langCode);
    return replacedUrl.substring(replacedUrl.indexOf('?'));
  }
  return href;
};

export const onChangeLanguage = lang => {
  const langCode = lang;
  const langUrl = getLangUrl(langCode);
  const nextUrl = `${location.pathname}${langUrl}`;
  history.push(nextUrl);
  localization.setLanguage(langCode);
};
