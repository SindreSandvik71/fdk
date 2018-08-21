import React from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import cx from 'classnames';

import localization from '../../../lib/localization';
import { SearchHitItem } from './search-hit-item/search-hit-item.component';
import { Select } from '../../../components/select/select.component';
import { FilterBox } from '../../../components/filter-box/filter-box.component';
import { SearchPublishersTree } from '../search-publishers-tree/search-publishers-tree.component';

export class ResultsApi extends React.Component {
  _renderFilterModal() {
    const {
      showFilterModal,
      closeFilterModal,
      apiItems,
      onFilterTheme,
      onFilterAccessRights,
      onFilterPublisherHierarchy,
      onFilterProvenance,
      onFilterSpatial,
      searchQuery,
      themesItems,
      publisherArray,
      publishers
    } = this.props;
    return (
      <Modal isOpen={showFilterModal} toggle={closeFilterModal}>
        <ModalHeader toggle={closeFilterModal}>Filter</ModalHeader>
        <ModalBody>
          <div className="search-filters">
            <FilterBox
              htmlKey={1}
              title={localization.facet.theme}
              filter={apiItems.aggregations.theme_count}
              onClick={onFilterTheme}
              activeFilter={searchQuery.theme}
              themesItems={themesItems}
            />
            <FilterBox
              htmlKey={2}
              title={localization.facet.accessRight}
              filter={apiItems.aggregations.accessRightsCount}
              onClick={onFilterAccessRights}
              activeFilter={searchQuery.accessrights}
            />
            <SearchPublishersTree
              title={localization.facet.organisation}
              filter={publisherArray}
              onFilterPublisherHierarchy={onFilterPublisherHierarchy}
              activeFilter={searchQuery.orgPath}
              publishers={publishers}
            />
            <FilterBox
              htmlKey={3}
              title={localization.facet.spatial}
              filter={apiItems.aggregations.spatial}
              onClick={onFilterSpatial}
              activeFilter={searchQuery.spatial}
            />
            <FilterBox
              htmlKey={4}
              title={localization.facet.provenance}
              filter={apiItems.aggregations.provenanceCount}
              onClick={onFilterProvenance}
              activeFilter={searchQuery.provenance}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            className="fdk-button"
            onClick={closeFilterModal}
            color="primary"
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  }

  _renderHits() {
    const { apiItems, publishers } = this.props;
    if (apiItems && apiItems.hits) {
      return apiItems.hits.map((item, index) => (
        <SearchHitItem
          key={item.uri}
          item={item}
          fadeInCounter={index < 3 ? index : null}
          publishers={publishers}
        />
      ));
    }
    return null;
  }

  render() {
    const {
      apiItems,
      onClearSearch,
      onFilterTheme,
      onFilterAccessRights,
      onFilterPublisherHierarchy,
      onFilterProvenance,
      onFilterSpatial,
      onSort,
      onPageChange,
      showClearFilterButton,
      searchQuery,
      themesItems,
      hitsPerPage,
      publisherArray,
      publishers
    } = this.props;

    const page =
      searchQuery && searchQuery.from ? searchQuery.from / hitsPerPage : 0;
    const pageCount = Math.ceil(
      (apiItems && apiItems.hits ? apiItems.hits.total : 1) / hitsPerPage
    );

    const clearButtonClass = cx(
      'btn',
      'btn-primary',
      'fdk-button',
      'fade-in-500',
      {
        'd-none': showClearFilterButton
      }
    );

    return (
      <main id="content">
        <div className="row mb-3">
          <div className="col-12 d-flex justify-content-between">
            <button
              className={clearButtonClass}
              onClick={onClearSearch}
              type="button"
            >
              {localization.query.clear}
            </button>
            <Select
              items={[
                {
                  label: 'relevance',
                  field: '_score',
                  order: 'asc',
                  defaultOption: true
                },
                {
                  label: 'title',
                  field: 'title',
                  order: 'asc'
                },
                {
                  label: 'modified',
                  field: 'modified',
                  order: 'desc'
                },
                {
                  label: 'publisher',
                  field: 'publisher.name',
                  order: 'asc'
                }
              ]}
              onChange={onSort}
              activeSort={searchQuery.sortfield}
            />
          </div>
        </div>
        <div className="row">
          <aside className="search-filters col-lg-4 d-none d-lg-block">
            <span className="uu-invisible" aria-hidden="false">
              Filtrering tilgang
            </span>
            <div>[filterbox]</div>
            {false &&
              apiItems && (
                <div>
                  {this._renderFilterModal()}
                  <FilterBox
                    htmlKey={1}
                    title={localization.facet.theme}
                    filter={apiItems.aggregations.theme_count}
                    onClick={onFilterTheme}
                    activeFilter={searchQuery.theme}
                    themesItems={themesItems}
                  />
                  <FilterBox
                    htmlKey={2}
                    title={localization.facet.accessRight}
                    filter={apiItems.aggregations.accessRightsCount}
                    onClick={onFilterAccessRights}
                    activeFilter={searchQuery.accessrights}
                  />
                  <SearchPublishersTree
                    title={localization.facet.organisation}
                    filter={publisherArray}
                    onFilterPublisherHierarchy={onFilterPublisherHierarchy}
                    activeFilter={searchQuery.orgPath}
                    publishers={publishers}
                  />
                  <FilterBox
                    htmlKey={3}
                    title={localization.facet.spatial}
                    filter={apiItems.aggregations.spatial}
                    onClick={onFilterSpatial}
                    activeFilter={searchQuery.spatial}
                  />
                  <FilterBox
                    htmlKey={4}
                    title={localization.facet.provenance}
                    filter={apiItems.aggregations.provenanceCount}
                    onClick={onFilterProvenance}
                    activeFilter={searchQuery.provenance}
                  />
                </div>
              )}
          </aside>
          <div id="apis" className="col-12 col-lg-8">
            {this._renderHits()}
            <div className="col-12 d-flex justify-content-center">
              <span className="uu-invisible" aria-hidden="false">
                Sidepaginering.
              </span>
              <ReactPaginate
                pageCount={pageCount}
                pageRangeDisplayed={2}
                marginPagesDisplayed={1}
                previousLabel={localization.page.prev}
                nextLabel={localization.page.next}
                breakLabel={<span>...</span>}
                breakClassName="break-me"
                containerClassName="pagination"
                onPageChange={onPageChange}
                subContainerClassName="pages pagination"
                activeClassName="active"
                initialPage={page}
                disableInitialCallback
              />
            </div>
          </div>
        </div>
      </main>
    );
  }
}

ResultsApi.defaultProps = {
  apiItems: [],
  // showFilterModal: false,
  // closeFilterModal: null,
  // datasetItems: null,
  // onFilterTheme: null,
  // onFilterAccessRights: null,
  // onFilterPublisherHierarchy: null,
  // onFilterProvenance: null,
  // onFilterSpatial: null,
  searchQuery: {},
  // themesItems: null,
  // publisherArray: null,
  publishers: null
  // distributionTypeItems: null,
  // onClearSearch: null,
  // onPageChange: null,
  // showClearFilterButton: null,
  // hitsPerPage: null
};

ResultsApi.propTypes = {
  apiItems: PropTypes.object,
  // showFilterModal: PropTypes.bool,
  // closeFilterModal: PropTypes.func,
  // datasetItems: PropTypes.object,
  // onFilterTheme: PropTypes.func,
  // onFilterAccessRights: PropTypes.func,
  // onFilterPublisherHierarchy: PropTypes.func,
  // onFilterProvenance: PropTypes.func,
  // onFilterSpatial: PropTypes.func,
  searchQuery: PropTypes.object,
  // themesItems: PropTypes.object,
  // publisherArray: PropTypes.array,
  publishers: PropTypes.object,
  // distributionTypeItems: PropTypes.array,
  // onClearSearch: PropTypes.func,
  onSort: PropTypes.func.isRequired
  // onPageChange: PropTypes.func,
  // showClearFilterButton: PropTypes.bool,
  // hitsPerPage: PropTypes.number
};
