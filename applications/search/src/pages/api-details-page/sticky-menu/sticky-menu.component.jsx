import React from 'react';
import PropTypes from 'prop-types';
import Scroll from 'react-scroll';

const ScrollLink = Scroll.Link;

const renderMenuItem = menuItem => (
  <li className="border-top py-3" key={menuItem.name}>
    <ScrollLink
      className="smoothScroll d-flex justify-content-between"
      to={menuItem.name}
      spy
      smooth
      isDynamic
      offset={0}
      duration={1500}
    >
      <span className="read-more">{menuItem.prefLabel}</span>
    </ScrollLink>
  </li>
);

const renderMenu = menuItems => {
  if (!menuItems) {
    return null;
  }
  const children = menuItems =>
    menuItems.map(menuItem => renderMenuItem(menuItem));

  return <ul className="p-0">{children(menuItems)}</ul>;
};

export const StickyMenu = props => (
  <nav className="sticky-menu sticky-top py-5 py-md-4" aria-hidden="true">
    <span className="uu-invisible" aria-hidden="false">
      Sidemeny for api beskrivelse:
    </span>
    {renderMenu(props.menuItems)}
  </nav>
);

StickyMenu.defaultProps = {
  menuItems: null
};

StickyMenu.propTypes = {
  menuItems: PropTypes.array
};
