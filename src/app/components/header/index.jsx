/**
 * Created by s.evdokimov on 06.12.2016.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from './actions'

const Switcher = function() {
    return (
        <div className="switch-notify">
            <input type="checkbox" id="switch" />
            <label>Выключить оповещение</label>
        </div>
    )
};

const Language = function() {
    return (
        <div className="languages-wrapper">
            <a>EN</a>
            <a className="active">RU</a>
        </div>
    )
};

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
        return (
            <div className="search">
                <input name="search" ref="search" />
                <button onClick={this.handlerSearchBtn.bind(this,  this)}>Поиск</button>
            </div>
        )
    }
}

const SearchComponent = connect(function(state) {
    return {users: state.UsersTable.users};
})(Search);


export default function() {
    return (
        <div className="header">
            <Switcher />
            <Language />
            <SearchComponent />
        </div>
    );
}

