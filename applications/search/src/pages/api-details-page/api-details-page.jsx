import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import localization from '../../lib/localization';
import { getTranslateText } from '../../lib/translateText';
import { ApiHeader } from './api-header/api-header.component';
import { ApiEndpoints } from './api-endpoints/api-endpoints.component';
import { ShowMore } from '../../components/show-more/show-more';
import { StickyMenu } from './sticky-menu/sticky-menu.component';
import { SingleColGrid } from './singleColGrid/singleColGrid';
import { ListType1 } from './listType1/listType1';
import { TwoColRow } from './listType1/twoColRow/twoColRow';
import './api-details-page.scss';

const renderDescription = description => {
  if (!description) {
    return null;
  }
  const descriptionText = getTranslateText(description);
  return (
    <ShowMore
      showMoreButtonText={localization.showFullDescription}
      label={localization.description}
      contentHtml={descriptionText}
    />
  );
};

const renderFormats = formats => {
  if (!formats) {
    return null;
  }
  return <SingleColGrid title={localization.format} items={[formats]} />;
};

const renderApiEndpoints = paths => {
  if (!paths) {
    return null;
  }
  return (
    <ApiEndpoints name={localization.api.endpoints.response} paths={paths} />
  );
};

const renderContactPoint = contactPoint => (
  <React.Fragment key={contactPoint.uri}>
    <TwoColRow col1="Kontaktpunkt" col2={contactPoint.uri} />
    <hr />
    <TwoColRow col1="E-post" col2={contactPoint.uri} />
    <hr />
    <TwoColRow col1="Telefon" col2={contactPoint.uri} />
  </React.Fragment>
);

const renderContactPoints = contactPoints => {
  if (!contactPoints) {
    return null;
  }
  const children = items => items.map(item => renderContactPoint(item));

  return (
    <ListType1 title={localization.contactInfo}>
      {children(contactPoints)}
    </ListType1>
  );
};

const renderStickyMenu = apiItem => {
  const menuItems = [];
  if (_.get(apiItem, 'description')) {
    menuItems.push({
      name: localization.description,
      prefLabel: localization.description
    });
  }
  if (_.get(apiItem, 'formats')) {
    menuItems.push({
      name: localization.format,
      prefLabel: localization.format
    });
  }
  if (_.get(apiItem, ['openApi', 'paths'])) {
    menuItems.push({
      name: localization.api.endpoints.response,
      prefLabel: localization.api.endpoints.response
    });
  }
  if (_.get(apiItem, 'contactPoint')) {
    menuItems.push({
      name: localization.contactInfo,
      prefLabel: localization.contactInfo
    });
  }
  return <StickyMenu menuItems={menuItems} />;
};

export const ApiDetailsPage = props => {
  const { apiItem } = props;
  if (!apiItem) {
    return null;
  }
  return (
    <main id="content" className="container">
      <article>
        <div className="row">
          <div className="col-12 col-lg-8 offset-lg-4">
            <ApiHeader
              title={getTranslateText(apiItem.title)}
              publisher={apiItem.publisher}
              harvest={apiItem.harvest}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-lg-4 ">{renderStickyMenu(apiItem)}</div>

          <section className="col-12 col-lg-8 mt-3">
            {renderDescription(_.get(apiItem, 'description'))}

            {renderFormats(_.get(apiItem, 'formats'))}

            {renderApiEndpoints(_.get(apiItem, ['openApi', 'paths']))}

            {renderContactPoints(_.get(apiItem, 'contactPoint'))}
          </section>
        </div>
      </article>
    </main>
  );
};

ApiDetailsPage.defaultProps = {
  apiItem: null
};

ApiDetailsPage.propTypes = {
  apiItem: PropTypes.object
};
