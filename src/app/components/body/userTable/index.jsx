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
            let id = el.parentNode.querySelector('.row__id').textContent;
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
        let {pagination, responsive} = this.props;

        return (
            <div className="user-list">
                <div className="user-list__table">
                    <table className={"table " + (pagination.type === 'lazyLoad' ? 'table_lazyload' : null)}
                        onMouseMove={this.handlerTooltip.bind(this, this)}
                        onMouseOut={this.handlerTooltip.bind(this, this)}
                        onMouseOver={this.handlerTooltip.bind(this, this)} >
                        {(responsive.device === 'tablet' || responsive.device === 'phone') ? null : <TableHeader /> }
                        <TableBody />
                    </table>
                </div>
                <div className="user-list__tooltip">
                    <Tooltip />
                </div>
                <div className="user-list__options">
                    <Footer />
                </div>
            </div>
        )
    }
}

export default connect(function(state) {
    return {
        pagination: state.UsersTable.pagination,
        responsive: state.HeaderSetting.responsive
    };
})(Table);