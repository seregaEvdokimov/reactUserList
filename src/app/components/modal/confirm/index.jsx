/**
 * Created by s.evdokimov on 08.12.2016.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';

class Confirm extends Component {
    constructor(props) { // ComponentWillMount
        super(props);
    }

    handlerControlsBtn(self, event) {
        let el = event.target;
        if (el.tagName != 'BUTTON') return false;

        let {params, dispatch} = this.props;
        switch(el.className) {
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
        let {params} = this.props;

        return (
            <div className={"modal-window modal-confirm " + (params.show ? 'show' : '')}>
                <h3 className="caption">Есть изменения. Сохранить?</h3>
                <div className="control-group" onClick={this.handlerControlsBtn.bind(this, this)}>
                    <button className="ok">Сохранить</button>
                    <button className="cancel">Отмена</button>
                </div>
            </div>
        )
    }
}


export default connect(function(state) {
    let {confirm} = state.ModalWindows;
    return {params: confirm};
})(Confirm);