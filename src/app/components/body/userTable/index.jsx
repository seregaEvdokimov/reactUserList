/**
 * Created by s.evdokimov on 06.12.2016.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from './actions';

import TableHeader from './tHead/index.jsx';
import TableBody from './tBody/index.jsx';

class Table extends Component {
    componentDidMount() {
        let {data, dispatch} = this.props;
        if(!data.users.length) dispatch(actions.loadUsersRequest(dispatch));
    }

    render() {
        return (
            <table className="table">
                <TableHeader />
                <TableBody />
            </table>
        )
    }
}


export default connect(function(state) {
    return {data: state.usersTable};
})(Table);