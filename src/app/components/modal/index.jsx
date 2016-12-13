/**
 * Created by s.evdokimov on 08.12.2016.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as actions from './actions';

import Create from './create/index.jsx';
import Edit from './edit/index.jsx';
import Confirm from './confirm/index.jsx';

class Modal extends Component {
    constructor(props) { //ComponentWillMount
        super(props);
    }

    handlerHideModalAll(self, event) {
        let el = event.target;
        if(el.tagName != 'SECTION') return false;

        let {dispatch} = self.props;
        dispatch(actions.hideModalAll());
    }

    render() {
        let {params} = this.props;

        return (
            <section className={"modal " + (params.show ? 'show' : '')} onClick={this.handlerHideModalAll.bind(this, this)}>
                <Create />
                <Edit />
                <Confirm />
            </section>
        )
    }
}

export default connect(function(state) {
    return {params: state.ModalWindows.main};
})(Modal);