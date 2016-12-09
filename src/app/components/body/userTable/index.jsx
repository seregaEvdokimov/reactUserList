/**
 * Created by s.evdokimov on 06.12.2016.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';

import TableHeader from './tHead/index.jsx';
import TableBody from './tBody/index.jsx';
import Footer from './footer/index.jsx';

class Table extends Component {
    constructor(props) { // componentWillMount
        super(props);
    }


    render() {
        let {pagination} = this.props.table;

        return (
            <div className="userList">
                <table className={"table " + (pagination.type === 'lazyLoad' ? 'lazyLoad' : '')}>
                    <TableHeader />
                    <TableBody />
                </table>
                <Footer />
            </div>
        )
    }
}

export default connect(function(state) {
    return {table: state.UsersTable};
})(Table);