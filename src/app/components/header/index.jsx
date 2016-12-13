/**
 * Created by s.evdokimov on 06.12.2016.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as actions from './actions'
import * as notifyActions from './../additional/notify/actions'

import Dictionary from './../../lib/Dictionary';

class Switcher extends Component {
    constructor(props) {
        super(props)
    }

    handlerTriggerNotify(self, event) {
        let {dispatch} = this.props;
        dispatch(notifyActions.notifyTrigger());
    }

    render() {
        let {lang, notify} = this.props;

        return (
            <div className="switch-notify">
                <input type="checkbox" id="switch" checked={!notify} onChange={this.handlerTriggerNotify.bind(this,  this)} />
                <label htmlFor="switch">{Dictionary.t(['header', 'settings', 'label'], lang)}</label>
            </div>
        )
    }
};

const SwitcherComponent = connect(function(state) {
    return {
        lang: state.HeaderSetting.currentLang,
        notify: state.Notify.isShow
    };
})(Switcher);


class Language extends Component {
    constructor(props) {
        super(props);
    }

    handlerChangeLanguage(self, event) {
        let el = event.target;
        if (el.tagName !== 'A') return false;

        let lang = el.dataset.language;
        let {dispatch} = self.props;
        dispatch(actions.changeLanguage({lang}));
    }

    render() {
        let {lang} = this.props;

        return (
            <div className="languages-wrapper" onClick={this.handlerChangeLanguage.bind(this,  this)}>
                <a data-language="en" className={lang === 'en' ? 'active' : null }>EN</a>
                <a data-language="ru" className={lang === 'ru' ? 'active' : null }>RU</a>
            </div>
        )
    }
};

const LanguageComponent = connect(function(state) {
    return {lang: state.HeaderSetting.currentLang};
})(Language);



class Search extends Component {
    constructor(props) { // componentWillUpdate
        super(props);
    }

    handlerSearchBtn(self, event) {
        let {dispatch, users} = self.props;
        let {search} = self.refs;
        let strSearch = search.value;

        dispatch(actions.searchUsers({strSearch, users}));
    }

    render() {
        let {lang} = this.props;

        return (
            <div className="search">
                <input name="search" ref="search" />
                <button onClick={this.handlerSearchBtn.bind(this,  this)}>{Dictionary.t(['header', 'search', 'button'], lang)}</button>
            </div>
        )
    }
}

const SearchComponent = connect(function(state) {
    return {
        users: state.UsersTable.users,
        lang: state.HeaderSetting.currentLang
    };
})(Search);


export default function() {
    return (
        <div className="header">
            <SwitcherComponent />
            <LanguageComponent />
            <SearchComponent />
        </div>
    );
}

