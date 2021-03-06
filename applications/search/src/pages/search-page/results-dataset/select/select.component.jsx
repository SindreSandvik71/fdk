import React from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown
} from 'reactstrap';

import localization from '../../../../lib/localization';

export class Select extends React.Component {
  constructor(props) {
    super(props);
    const { activeSort } = this.props;
    this.state = {
      selectedValue: activeSort
        ? activeSort.substring(0, activeSort.lastIndexOf('.'))
        : 'relevance'
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const { onChange } = this.props;
    onChange(e);
    this.setState({
      selectedValue: e.label
    });
  }

  render() {
    const { items } = this.props;
    return (
      <UncontrolledDropdown
        id="search-result-dropdown-1"
        title={`${localization.sort.by} ${
          localization.sort[this.state.selectedValue]
        }`}
        aria-label={`Sorter søkeresultat, ${localization.sort.by} ${
          localization.sort[this.state.selectedValue]
        }`}
      >
        <DropdownToggle className="fdk-button" caret color="primary">
          {localization.sort.by} {localization.sort[this.state.selectedValue]}
        </DropdownToggle>
        <DropdownMenu right className="fdk-dropdownmenu">
          {map(items, (item, idx) => {
            const { label } = item;
            const text = `${localization.sort.by} ${localization.sort[label]}`;
            return (
              <DropdownItem key={idx} onClick={() => this.onChange(item)}>
                {text}
              </DropdownItem>
            );
          })}
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  }
}

Select.defaultProps = {
  items: null,
  activeSort: null
};

Select.propTypes = {
  items: PropTypes.array,
  activeSort: PropTypes.string,
  onChange: PropTypes.func.isRequired
};
