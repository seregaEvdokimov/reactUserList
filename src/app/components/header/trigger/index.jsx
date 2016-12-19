/**
 * Created by s.evdokimov on 15.12.2016.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';

import Dictionary from './../../../lib/Dictionary';

import * as notifyActions from '../../additional/notify/actions';

class Trigger extends Component {
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
                <input className="switch-notify__checkbox" type="checkbox" id="switch" checked={!notify} onChange={this.handlerTriggerNotify.bind(this,  this)} />
                <label className="switch-notify__label" htmlFor="switch">{Dictionary.t(['header', 'settings', 'label'], lang)}</label>
            </div>
        )
    }
}

export default connect(function(state) {
    return {
        lang: state.HeaderSetting.currentLang,
        notify: state.Notify.isShow
    };
})(Trigger);