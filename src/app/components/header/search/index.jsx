/**
 * Created by s.evdokimov on 15.12.2016.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';

import Dictionary from './../../../lib/Dictionary';

import * as actions from '../actions';

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

export default connect(function(state) {
    return {
        users: state.UsersTable.users,
        lang: state.HeaderSetting.currentLang
    };
})(Search);