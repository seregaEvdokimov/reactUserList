/**
 * Created by s.evdokimov on 06.12.2016.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from './../actions';

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
        let {sort} = this.props;
        let className = ' active ' + sort.direction;
        return (
            <thead className="tHead" onClick={this.handlerSortBy.bind(this, this)}>
                <tr>
                    <th className={"id" + (sort.param === 'id' ? className : '' )} data-sort-by="id">№</th>
                    <th className={"name" + (sort.param === 'name' ? className : '' )} data-sort-by="name">Имя</th>
                    <th className={"email" + (sort.param === 'email' ? className : '' )} data-sort-by="email">Email</th>
                    <th className={"birth" + (sort.param === 'birth' ? className : '' )} data-sort-by="birth">День рождения</th>
                    <th className={"date" + (sort.param === 'date' ? className : '' )} data-sort-by="date">Расчетное время</th>
                    <th className="delete">Удалить</th>
                    <th className="edit">Редактировать</th>
                </tr>
            </thead>
        )
    }
}

export default connect(function(state) {
    return {sort: state.UsersTable.sort};
})(tHead);