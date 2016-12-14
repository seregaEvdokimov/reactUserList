/**
 * Created by s.evdokimov on 14.12.2016.
 */


import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as userTableActions from '../userTable/actions';


class UserProfile extends Component {
    constructor(props) {
        super(props);

        let {users, dispatch} = props;
        if(!users.length) userTableActions.loadUsersRequest(dispatch);
    }

    render() {
        let {users, params} = this.props;
        let find = users.filter(function(item) {
            return item.id == params.id;
        })[0] || {};

        return (
            <div className="person-wrapper">
                <img src={find.avatar} alt=""/>
                <div className="info">
                    <p className="id">{find.id}</p>
                    <p className="id">{find.name}</p>
                    <p className="id">{find.email}</p>
                </div>
            </div>
        )
    }
}

export default connect(function(state) {
    return {users: state.UsersTable.users}
})(UserProfile);