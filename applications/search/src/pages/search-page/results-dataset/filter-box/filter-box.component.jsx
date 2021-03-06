import React from 'react';
import PropTypes from 'prop-types';
import { Collapse } from 'reactstrap';
import cx from 'classnames';

import localization from '../../../../lib/localization';
import { FilterOption } from '../../filter-option/filter-option.component';
import './filter-box.scss';

export class FilterBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openFilter: true,
      open: false
    };
    this.toggleFilter = this.toggleFilter.bind(this);
    this.toggleList = this.toggleList.bind(this);
  }

  toggleFilter() {
    this.setState({ openFilter: !this.state.openFilter });
  }

  toggleList() {
    this.setState({ open: !this.state.open });
  }

  _renderOptions({ buckets }, onClick, activeFilter) {
    const { open } = this.state;
    const { htmlKey, themesItems } = this.props;
    let filters;
    if (activeFilter) {
      filters = activeFilter.split(',');
    }
    const options = items =>
      items.map((item, index) => {
        // generate unique key, this is used by FilterOption on label htmlFor
        let itemKey = 0;
        if (htmlKey) {
          itemKey = Number.parseInt(`${htmlKey}${index}`, 10);
        }
        let active = false;
        if (filters && filters.includes(item.key)) {
          active = true;
        }
        return (
          <FilterOption
            key={itemKey}
            itemKey={itemKey}
            value={item.key}
            label={item.key}
            count={item.doc_count}
            onClick={onClick}
            active={active}
            themesItems={themesItems}
          />
        );
      });

    if (buckets) {
      const bucketsLength = buckets.length;
      return (
        <div>
          {options(buckets.slice(0, 5))}
          {bucketsLength > 5 && (
            <div>
              <Collapse isOpen={open}>
                <div>{options(buckets.slice(5))}</div>
              </Collapse>
              <button className="fdk-toggleList" onClick={this.toggleList}>
                {open
                  ? localization.facet.showfewer
                  : localization.facet.showmore}
              </button>
            </div>
          )}
        </div>
      );
    }
    return null;
  }

  render() {
    const { openFilter } = this.state;
    const { title, filter, onClick, activeFilter } = this.props;
    const collapseIconClass = cx('fa', 'mr-2', {
      'fa-angle-down': !openFilter,
      'fa-angle-up': openFilter
    });
    return (
      <div className="fdk-panel--filter">
        <div className="fdk-panel__header">
          <button className="fdk-toggleFilter p-0" onClick={this.toggleFilter}>
            <i className={collapseIconClass} />
            <span>{title}</span>
          </button>
        </div>
        <Collapse isOpen={openFilter}>
          <div className="fdk-panel__content">
            <div className="fdk-items-list">
              {this._renderOptions(filter, onClick, activeFilter)}
            </div>
          </div>
        </Collapse>
      </div>
    );
  }
}

FilterBox.defaultProps = {
  htmlKey: null,
  title: null,
  activeFilter: null,
  themesItems: null
};

FilterBox.propTypes = {
  htmlKey: PropTypes.number,
  title: PropTypes.string,
  filter: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  activeFilter: PropTypes.string,
  themesItems: PropTypes.object
};

// export default FilterBox;
