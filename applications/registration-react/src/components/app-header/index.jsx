import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

import { fetchUserIfNeeded } from '../../actions/index';
import localization from '../../utils/localization';
import '../../assets/style/main.scss';
import './index.scss';
import { getLanguageFromUrl } from '../../utils/translateText';
import { onChangeLanguage } from '../../utils/changeLanguage';

export class Header extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.toggleLanguage = this.toggleLanguage.bind(this);
    this.state = {
      dropdownOpen: false,
      dropdownLanguageOpen: false
    };
    this.props.dispatch(fetchUserIfNeeded());
  }

  componentWillMount() {
    const langCode = getLanguageFromUrl();
    if (langCode !== null) {
      localization.setLanguage(langCode);
    }
  }

  toggleLanguage() {
    this.setState({
      dropdownLanguageOpen: !this.state.dropdownLanguageOpen
    });
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    const { userItem } = this.props;
    return (
      <header>
        <div>
          <a
            id="focus-element"
            className="uu-invisible"
            href={`${location.pathname}#content`}
            aria-hidden="true"
          >
            {localization.app.skipLink}
          </a>
        </div>
        <div id="skip-link-wrap">
          <a id="skip-link" href={`${location.pathname}#content`}>
            {localization.app.skipLink}
          </a>
        </div>
        <div className="fdk-header-beta">
          {localization.beta.header}
          <br className="d-md-none" />
          {localization.beta.first}
          <a className="white-link" href="mailto:fellesdatakatalog@brreg.no">
            {localization.beta.second}
          </a>{' '}
          {localization.beta.last}
        </div>
        <div className="fdk-header">
          <div className="container">
            <div className="row">
              <div className="col-6 col-md-4">
                <a title="Link til Felles datakatalog" href="/">
                  <span className="uu-invisible" aria-hidden="false">
                    {localization.app.navigateFrontpage}
                  </span>
                  <img
                    className="fdk-logo"
                    src="/static/img/fdk-logo@2x.png"
                    alt="Logo for Felles datakatalog"
                  />
                </a>
              </div>

              <div className="col-6 col-md-4 d-flex justify-content-center align-items-center">
                <span>
                  <strong>{localization.app.title}</strong>
                </span>
              </div>
              <div className="col-md-4 d-flex align-items-center fdk-header-text_items justify-content-end">
                {userItem &&
                  userItem.name && (
                    <div className="fdk-margin-right-double">
                      <i className="fa fa-user fdk-fa-left fdk-color-cta3" />
                      {userItem.name}
                    </div>
                  )}
                {userItem && (
                  <div className="fdk-margin-right-double fdk-auth-link">
                    <a href={`${window.location.origin}/logout`}>
                      {localization.app.logOut}
                    </a>
                  </div>
                )}
                {!userItem && (
                  <div className="fdk-margin-right-double fdk-auth-link">
                    <a href={`${window.location.origin}/login`}>
                      {localization.app.logIn}
                    </a>
                  </div>
                )}

                <div>
                  <Dropdown
                    className="btn-group-default btn-group"
                    isOpen={this.state.dropdownLanguageOpen}
                    toggle={this.toggleLanguage}
                  >
                    <DropdownToggle
                      className="fdk-button fdk-button-language fdk-button-default dropdown-toggle btn-default"
                      caret
                    >
                      <span>{localization.lang.chosenLanguage}</span>
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem
                        className="dropdown-item"
                        onClick={() => onChangeLanguage('nb')}
                      >
                        {localization.lang['norwegian-nb']}
                      </DropdownItem>
                      <DropdownItem
                        className="dropdown-item"
                        onClick={() => onChangeLanguage('en')}
                      >
                        {localization.lang['english-en']}
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>

                <div>
                  <Dropdown
                    className="btn-group-default"
                    isOpen={this.state.dropdownOpen}
                    toggle={this.toggle}
                  >
                    <DropdownToggle
                      className="fdk-button fdk-button-default fdk-button-menu dropdown-toggle btn-default"
                      caret
                    >
                      <i className="fa fa-bars fdk-fa-dark fdk-fa-left" />
                      <span>{localization.menu.title}</span>
                    </DropdownToggle>
                    <DropdownMenu>
                      <a
                        className="dropdown-item"
                        title="Veileder"
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://doc.difi.no/data/veileder-for-beskrivelse-av-datasett/"
                      >
                        {localization.menu.guide}
                      </a>

                      <a
                        className="dropdown-item"
                        title="Standard"
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://doc.difi.no/dcat-ap-no/"
                      >
                        {localization.menu.standard}
                      </a>
                      <a
                        className="dropdown-item"
                        title="Felles datakatalog"
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://fellesdatakatalog.brreg.no"
                      >
                        {localization.menu.fdk}
                      </a>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

Header.defaultProps = {
  userItem: null
};

Header.propTypes = {
  dispatch: PropTypes.func.isRequired,
  userItem: PropTypes.object
};

function mapStateToProps({ user }) {
  const { userItem } = user || {
    userItem: null
  };

  return {
    userItem
  };
}

export default connect(mapStateToProps)(Header);
