import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import _ from 'lodash';

import localization from '../../../../lib/localization';
import { DatasetLabelNational } from '../../../../components/dataset-label-national/dataset-label-national.component';
import './search-hit-item.scss';
import { getTranslateText } from '../../../../lib/translateText';

const renderHeaderLink = item => {
  if (!item) {
    return null;
  }
  const { title } = item;
  const link = `/apis/${encodeURIComponent(item.uri)}`;

  return (
    <Link
      className="search-hit__title-link"
      title={`${localization.api}: ${getTranslateText(title)}`}
      to={link}
    >
      <div className="mb-2 d-flex flex-wrap align-items-baseline">
        <h2 className="mr-3">{getTranslateText(title)}</h2>
        {_.get(item, ['provenance']) === 'NASJONAL' && <DatasetLabelNational />}
      </div>
    </Link>
  );
};

const renderDescription = description => {
  if (!description) {
    return null;
  }
  let descriptionText = getTranslateText(description);
  if (descriptionText && descriptionText.length > 220) {
    descriptionText = `${descriptionText.substr(0, 220)}...`;
  }
  return (
    <p>
      <span className="uu-invisible" aria-hidden="false">
        Beskrivelse av api,
      </span>
      {descriptionText}
    </p>
  );
};

const renderPublisher = publisher => {
  if (publisher && publisher.name) {
    return (
      <div className="mb-4">
        <span>
          <span className="uu-invisible" aria-hidden="false">
            Datasettet
          </span>
          {localization.search_hit.owned}&nbsp;
          <span className="fdk-strong-virksomhet">
            <span className="uu-invisible" aria-hidden="false">
              Utgiver.
            </span>
            {publisher && publisher.name
              ? publisher.name.charAt(0) +
                publisher.name.substring(1).toLowerCase()
              : ''}
          </span>
        </span>
      </div>
    );
  }
  return null;
};

const renderExpiredVersion = expired => {
  if (!expired) {
    return null;
  }
  return (
    <div className="search-hit__version mb-4 p-4">
      <span>Denne versjonen av API-et er utgått og vil fases ut i 2019. </span>
      <Link to="/TODO">Versjon 2 er dokumentert her.</Link>
    </div>
  );
};

const renderAccessRights = accessRights => {
  // TODO check props
  if (!accessRights) {
    return null;
  }
  return (
    <div className="mb-2">
      <strong>{localization.api.accessRight.public}</strong>
      <i className="fa fa-info-circle ml-2 fdk-color-cta2" />
    </div>
  );
};

const renderFormat = formats => {
  // TODO check props
  if (!formats) {
    return null;
  }
  return (
    <div className="mb-2">
      <strong>Format:&nbsp;</strong>
      <span>applicatoin/rfd+xml, JSON</span>
    </div>
  );
};

export const SearchHitItem = props => {
  const { item, fadeInCounter } = props;

  const searchHitClass = cx('search-hit', {
    'fade-in-200': fadeInCounter === 0,
    'fade-in-300': fadeInCounter === 1,
    'fade-in-400': fadeInCounter === 2
  });

  return (
    <article className={searchHitClass}>
      <span className="uu-invisible" aria-hidden="false">
        Søketreff.
      </span>

      {renderHeaderLink(item)}

      {renderPublisher(_.get(item, 'publisher'))}

      {renderExpiredVersion(_.get(item, 'expired'))}

      {renderDescription(_.get(item, 'description'))}

      {renderAccessRights(_.get(item, 'accessRights'))}

      {renderFormat(_.get(item, 'formats'))}
    </article>
  );
};

SearchHitItem.defaultProps = {
  fadeInCounter: null,
  item: null
};

SearchHitItem.propTypes = {
  fadeInCounter: PropTypes.number,
  item: PropTypes.shape({})
};
