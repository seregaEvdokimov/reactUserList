/**
 * Created by s.evdokimov on 08.12.2016.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions';

import Dictionary from './../../../lib/Dictionary'

class Confirm extends Component {
    constructor(props) { // ComponentWillMount
        super(props);
    }

    handlerControlsBtn(self, event) {
        let el = event.target;
        if (el.tagName != 'BUTTON') return false;

        let {params, dispatch} = this.props;
        switch(el.classList[1]) {
            case 'ok':
                params.callback();
                dispatch(actions.hideModalAll());
                break;
            case 'cancel':
                dispatch(actions.hideModalConfirm());
                break;
        }
    }


    render() {
        let {params, lang} = this.props;

        return (
            <div className={"modal-window " + (params.show ? 'modal-window_show' : '')}>
                <h3 className="modal-window__caption">{Dictionary.t(['modal', 'confirm', 'message'], lang)}</h3>
                <div className="modal-window__group modal-window__group_control" onClick={this.handlerControlsBtn.bind(this, this)}>
                    <div className="modal-window-group modal-window-group_control">
                        <button className="modal-window-group__button ok">{Dictionary.t(['modal', 'confirm', 'save'], lang)}</button>
                        <button className="modal-window-group__button cancel">{Dictionary.t(['modal', 'confirm', 'cancel'], lang)}</button>
                    </div>
                </div>
            </div>
        )
    }
}


export default connect(function(state) {
    return {
        lang: state.HeaderSetting.currentLang,
        params: state.ModalWindows.confirm
    };
})(Confirm);