/**
 * Created by s.evdokimov on 06.12.2016.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as actions from './../actions';

import Dictionary from './../../../../lib/Dictionary';

class tHead extends Component {
    constructor(props) { // componentWillMount
        super(props);
    }

    handlerSortBy(self, event) {
        let el = event.target;
        if(el.className === 'delete' || el.className === 'edit') return false;

        let {sort} = self.props;
        let {dispatch} = self.props;

        let param = el.dataset.sortBy;
        let direction = (sort.direction === 'desc') ? 'asc' : 'desc' ;

        dispatch(actions.sortUsers({param, direction}));
    }

    render() {
        let {sort, lang} = this.props;
        let className = ' active ' + sort.direction;

        return (
            <thead className="table__thead" onClick={this.handlerSortBy.bind(this, this)}>
                <tr className="row row_type_head">
                    <th className={"row__id" + (sort.param === 'id' ? className : '')} data-sort-by="id">{Dictionary.t(['userTable', 'tHead', 'id'], lang)}</th>
                    <th className={"row__name" + (sort.param === 'name' ? className : '')} data-sort-by="name">{Dictionary.t(['userTable', 'tHead', 'name'], lang)}</th>
                    <th className={"row__email" + (sort.param === 'email' ? className : '')} data-sort-by="email">{Dictionary.t(['userTable', 'tHead', 'email'], lang)}</th>
                    <th className={"row__birth" + (sort.param === 'birth' ? className : '')} data-sort-by="birth">{Dictionary.t(['userTable', 'tHead', 'birth'], lang)}</th>
                    <th className={"row__date" + (sort.param === 'date' ? className : '')} data-sort-by="date">{Dictionary.t(['userTable', 'tHead', 'time'], lang)}</th>
                    <th className="row__delete">{Dictionary.t(['userTable', 'tHead', 'delete'], lang)}</th>
                    <th className="row__edit">{Dictionary.t(['userTable', 'tHead', 'edit'], lang)}</th>
                </tr>
            </thead>
        )
    }
}

export default connect(function(state) {
    return {
        lang: state.HeaderSetting.currentLang,
        sort: state.UsersTable.sort
    };
})(tHead);