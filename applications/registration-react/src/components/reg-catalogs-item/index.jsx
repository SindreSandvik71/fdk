import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardText, CardBody, CardTitle } from 'reactstrap';
import { Link } from 'react-router-dom';

import { getLanguageFromUrl } from '../../utils/translateText';

const CatalogItem = props => {
  const { item } = props;
  const langCode = getLanguageFromUrl();
  const langParam = langCode ? `?lang=${langCode}` : '';
  return (
    <div className="col-md-4 pl-0">
      <Link className="card-link" to={`/catalogs/${item.id}${langParam}`}>
        <Card>
          <CardBody>
            <CardTitle>{item.title.nb}</CardTitle>
            <hr />
            <CardText className="fdk-catalog-text fdk-text-size-small fdk-color1">
              {item.description.nb}
            </CardText>
          </CardBody>
        </Card>
      </Link>
    </div>
  );
};

CatalogItem.defaultProps = {};

CatalogItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.object,
    description: PropTypes.object
  }).isRequired
};

export default CatalogItem;
