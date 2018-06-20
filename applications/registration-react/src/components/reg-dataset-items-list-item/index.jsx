import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cx from 'classnames';

import localization from '../../utils/localization';
import { getLanguageFromUrl } from '../../utils/translateText';
import './index.scss';

const DatasetItemsListItem = props => {
  const { catalogId, item } = props;
  const langCode = getLanguageFromUrl();
  const langParam = langCode ? `?lang=${langCode}` : '';
  const itemClass = cx('w-75', 'fdk-text-size-small', {
    'fdk-color2': item.title && !item.title.nb
  });
  return (
    <div className="fdk-datasets-list-item d-flex">
      {item && (
        <Link
          className="w-100"
          to={`/catalogs/${catalogId}/datasets/${item.id}${langParam}`}
        >
          <div className="d-flex justify-content-between">
            <span className={itemClass}>
              {item.title.nb
                ? item.title.nb
                : localization.datasets.list.missingTitle}
            </span>
            <span className="d-flex w-25">
              {item.registrationStatus === 'PUBLISH' && (
                <span>
                  <i className="fa fa-circle fdk-color-cta mr-2" />
                  <span>{localization.datasets.list.statusPublished}</span>
                </span>
              )}
              {item.registrationStatus === 'DRAFT' && (
                <span>
                  <i className="fa fa-circle fdk-color3 mr-2" />
                  <span>{localization.datasets.list.statusDraft}</span>
                </span>
              )}
            </span>
          </div>
        </Link>
      )}
    </div>
  );
};

DatasetItemsListItem.defaultProps = {
  item: null
};

DatasetItemsListItem.propTypes = {
  catalogId: PropTypes.string.isRequired,
  item: PropTypes.object
};

export default DatasetItemsListItem;
