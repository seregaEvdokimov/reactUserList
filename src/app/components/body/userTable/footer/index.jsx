/**
 * Created by s.evdokimov on 08.12.2016.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from './../actions';
import * as modalActions from './../../../modal/actions';


function Page({page, currentPage}) {
    return(
        <div className={"page " + (currentPage === page ? 'active' : '')} data-page={page}>{page}</div>
    )
}

class Footer extends Component {
    constructor(props) { // componentWillMount
        super(props);
    }

    handlerAddClient(self, event) {
        let {dispatch} = self.props;
        dispatch(modalActions.showModalCreate());
    }

    handlerChangePage(self, event) {
        let el = event.target;
        if(!el.classList.contains('page')) return false;

        let {dispatch, pagination} = self.props;
        let page = parseInt(el.dataset.page);

        if(page === pagination.currentPage) return false;

        let start = (page == 1) ? 1 : page * pagination.perPage + 1;
        let limit = start + pagination.perPage;

        dispatch(actions.changePage(dispatch, start, limit, page));
    }

    render() {
        let {pagination} = this.props;
        let pages = [];
        for(let i = 1; i < pagination.pages; i++) {
            pages.push(i);
        }

        return (
            <div className="option">
                <button className="add-user" onClick={this.handlerAddClient.bind(this, this)}>Добавить клиента</button>
                { (pagination.type === 'pagination')
                    ?  <div className="pagination" onClick={this.handlerChangePage.bind(this, this)}>
                            {pages.map((page) => <Page key={page} page={page} currentPage={pagination.currentPage} />)}
                        </div>
                    : '' }
            </div>
        )
    }
}

export default connect(function(state) {
    return {pagination: state.UsersTable.pagination};
})(Footer);