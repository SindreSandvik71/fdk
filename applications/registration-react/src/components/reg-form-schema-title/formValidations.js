import {
  validateRequired,
  validateMinTwoChars,
  validateURL
} from '../../validation/validation';
import localization from '../../utils/localization';

const validate = values => {
  let errors = {};
  const title =
    values.title && values.title[localization.getLanguage()]
      ? values.title[localization.getLanguage()]
      : null;
  const description =
    values.description && values.description[localization.getLanguage()]
      ? values.description[localization.getLanguage()]
      : null;
  const objective =
    values.objective && values.objective[localization.getLanguage()]
      ? values.objective[localization.getLanguage()]
      : null;
  const landingPage =
    values.landingPage && values.landingPage[0] ? values.landingPage[0] : null;

  errors = validateRequired('title', title, errors);
  errors = validateMinTwoChars('title', title, errors);

  errors = validateRequired('description', description, errors);
  errors = validateMinTwoChars('description', description, errors);

  errors = validateMinTwoChars('objective', objective, errors);

  errors = validateURL('landingPage', landingPage, errors, true);

  return errors;
};

export default validate;
