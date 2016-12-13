/**
 * Created by s.evdokimov on 06.12.2016.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';

import TableHeader from './tHead/index.jsx';
import TableBody from './tBody/index.jsx';
import Footer from './footer/index.jsx';
import Tooltip from './../../additional/tooltip/index.jsx';

import * as tooltipActions from './../../additional/tooltip/actions';


class Table extends Component {
    constructor(props) { // componentWillMount
        super(props);
        this.idTimeout = null
    }

    handlerTooltip(self, event) {
        let el = event.target;
        let type = event.type;

        if(el.tagName == 'TD' && el.dataset.tooltip) {
            let {dispatch} = self.props;
            let tooltipType = el.dataset.tooltip;
            let id = el.parentNode.querySelector('.id').textContent;
            let coords = {x: event.pageX, y: event.pageY};

            switch(type) {
                case 'mouseover':
                    self.idTimeout = setTimeout(() => dispatch(tooltipActions.showTooltip(dispatch, {id, type: tooltipType}, coords)), 500);
                    break;
                case 'mouseout':
                    clearTimeout(self.idTimeout);
                    dispatch(tooltipActions.hideTooltip());
                    break;
                case 'mousemove':
                    dispatch(tooltipActions.moveTooltip(coords));
                    break;
            }
        }
    }

    render() {
        let {pagination} = this.props;

        return (
            <div className="userList">
                <table
                    className={"table " + (pagination.type === 'lazyLoad' ? 'lazyLoad' : null)}
                    onMouseMove={this.handlerTooltip.bind(this, this)}
                    onMouseOut={this.handlerTooltip.bind(this, this)}
                    onMouseOver={this.handlerTooltip.bind(this, this)}
                >
                    <TableHeader />
                    <TableBody />
                </table>
                <Tooltip />
                <Footer />
            </div>
        )
    }
}

export default connect(function(state) {
    return state.UsersTable;
})(Table);