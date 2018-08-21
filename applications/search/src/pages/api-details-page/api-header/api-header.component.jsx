import React from 'react';
import PropTypes from 'prop-types';
import DocumentMeta from 'react-document-meta';
import Moment from 'react-moment';
import _ from 'lodash';

import localization from '../../../lib/localization';
import { DatasetLabelNational } from '../../../components/dataset-label-national/dataset-label-national.component';
import { getPublisherByOrgNr } from '../../../redux/modules/publishers';
import { getTranslateText } from '../../../lib/translateText';

export const ApiHeader = props => {
  const { title, publisher, harvest, publisherItems } = props;

  const renderPublisher = () => {
    if (!publisher) {
      return null;
    }
    const publisherItem = getPublisherByOrgNr(
      publisherItems,
      _.get(publisher, 'id')
    );

    const publisherPrefLabel =
      getTranslateText(_.get(publisherItem, ['prefLabel'])) ||
      _.capitalize(_.get(publisherItem, 'name', ''));

    if (publisherPrefLabel) {
      return (
        <div className="mb-4">
          <span>
            <span className="uu-invisible" aria-hidden="false">
              API
            </span>
            {localization.api.provider}&nbsp;
            <span className="fdk-strong-virksomhet">{publisherPrefLabel}</span>
          </span>
        </div>
      );
    }
  };

  const renderHarvested = () => {
    if (harvest && harvest.firstHarvested) {
      return (
        <span>
          {localization.dataset.firstHarvested}&nbsp;
          <Moment format="DD.MM.YYYY">{harvest.firstHarvested}</Moment>
        </span>
      );
    }
    return null;
  };

  const renderHarvestSeparator = () => {
    if (harvest && harvest.firstHarvested && harvest.lastChanged) {
      return <span>&nbsp;/&nbsp;</span>;
    }
    return null;
  };

  const renderLastChanged = () => {
    if (harvest && harvest.lastChanged) {
      return (
        <span>
          {localization.dataset.lastChanged}&nbsp;
          <Moment format="DD.MM.YYYY">{harvest.lastChanged}</Moment>
        </span>
      );
    }
    return null;
  };

  const meta = {
    title
  };
  return (
    <header>
      <DocumentMeta {...meta} />

      <div className="fdk-detail-date mb-4">
        {renderHarvested()}
        {renderHarvestSeparator()}
        {renderLastChanged()}
      </div>

      {title && (
        <div className="mb-2 d-flex flex-wrap align-items-baseline">
          <h1 className="mr-3">{title}</h1>
          <DatasetLabelNational />
        </div>
      )}

      <div className="mb-4">{renderPublisher()}</div>
    </header>
  );
};

ApiHeader.defaultProps = {
  title: null,
  publisher: null,
  harvest: null
};

ApiHeader.propTypes = {
  title: PropTypes.string,
  publisher: PropTypes.object,
  harvest: PropTypes.object
};
