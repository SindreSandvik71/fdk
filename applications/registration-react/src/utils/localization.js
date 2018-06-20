import LocalizedStrings from 'react-localization';

import nb from '../l10n/nb.json';
import en from '../l10n/en.json';

const localization = new LocalizedStrings({
  nb,
  en
});

localization.setLanguage('nb');

export default localization;
