/**
 * Created by s.evdokimov on 06.12.2016.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as actions from './actions'

import Language from './language/index.jsx';
import SwitchNotify from './trigger/index.jsx';
import Search from './search/index.jsx';


function HeaderMenu() {
    return (
        <div className="header__menu">
            <div className="header-menu">
                <div className="header-menu__switch">
                    <SwitchNotify />
                </div>
                <div className="header-menu__language">
                    <Language />
                </div>
                <div className="header-menu__search">
                    <Search />
                </div>
            </div>
        </div>
    )
}

function HamburgerMenu({active, onclick}) {
    return (
        <div className="header__menu">
            <div className={"hamburger-menu " + (active ? 'hamburger-menu_show' : '')}>
                <div className="hamburger-menu_switch">
                    <SwitchNotify />
                </div>
                <div className="hamburger-menu_language">
                    <Language />
                </div>
                <div className="hamburger-menu__search">
                    <Search />
                </div>
                <div className="close" onClick={onclick}></div>
            </div>
        </div>
    )
}

function ToggleHumburger({onclick}) {
    return (
        <div className="header__toggle-icon" onClick={onclick}></div>
    )
}


class Header extends Component {
    constructor(props) {
        super(props);
    }

    handlerToggleMenu(self, event) {
        let {dispatch} = self.props;
        dispatch(actions.toggleHamburger());
    }

    render() {
        let {responsive, menuActive} = this.props;

        return (
            <div className="header">
                {(responsive.device === 'tablet' || responsive.device === 'phone') ? <ToggleHumburger onclick={this.handlerToggleMenu.bind(this, this)}/> : null}
                {(responsive.device === 'tablet' || responsive.device === 'phone')
                    ? <HamburgerMenu onclick={this.handlerToggleMenu.bind(this, this)} active={menuActive}/>
                    : <HeaderMenu />}
            </div>
        );
    }
}


export default connect(function(state) {
    return {
        responsive: state.HeaderSetting.responsive,
        menuActive: state.HeaderSetting.menuActive
    }
})(Header);