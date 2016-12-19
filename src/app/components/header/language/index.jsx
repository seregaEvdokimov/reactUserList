/**
 * Created by s.evdokimov on 15.12.2016.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions';

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
            <div className="language" onClick={this.handlerChangeLanguage.bind(this,  this)}>
                <a className={"language__link " + (lang === 'en' ? 'language__link_active' : null)} data-language="en">EN</a>
                <a className={"language__link " + (lang === 'ru' ? 'language__link_active' : null)} data-language="ru">RU</a>
            </div>
        )
    }
}

export default connect(function(state) {
    return {lang: state.HeaderSetting.currentLang};
})(Language);