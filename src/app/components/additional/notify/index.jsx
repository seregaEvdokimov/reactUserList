/**
 * Created by s.evdokimov on 12.12.2016.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as actions from './actions';

class Item extends Component {
    constructor(props) {
        super(props);
        this.idTimeout = null;
    }

    componentDidMount() {
        let {dispatch, item, isNew} = this.props;
        let {el} = this.refs;

        this.idTimeout = setTimeout(() => {
            dispatch(actions.notifyHide(item.id));
            el.style.opacity = 0;
        }, 50000);

        if(isNew) {
            el.style.opacity = 1;
            dispatch(actions.notifyShow(item.id));
        }
    }

    componentWillUnmount() {
        clearTimeout(this.idTimeout);
    }

    render() {
        let {item, isNew} = this.props;
        let style = {};

        if(isNew) style.opacity = 0;

        return (
            <div className="notify" ref="el" style={style} data-notify-id={item.id}>
                {item.text}
            </div>
        )
    }
}

class Notify extends Component {
    constructor(props) {
        super(props);
    }

    handlerNotifyHide = function(self, event) {
        let el = event.target;
        if(el.tagName !== 'DIV') return false;

        let {dispatch} = this.props;
        let id = el.dataset.notifyId;

        dispatch(actions.notifyHide(id));
        el.style.opacity = 0;
    };

    handlerNotifyRemove = function(self, event) {
        let el = event.target;

        let {dispatch} = self.props;
        let id = el.dataset.notifyId;

        dispatch(actions.notifyRemove(id));
    };

    render() {
        let {items, newItem, dispatch} = this.props;

        return (
            <section className="notify-wrapper" onClick={this.handlerNotifyHide.bind(this,  this)} onTransitionEnd={this.handlerNotifyRemove.bind(this,  this)}>
                {(newItem) ? <Item key={newItem.id} item={newItem} dispatch={dispatch} isNew={true} /> : null}
                {items.map(item => <Item key={item.id} item={item} dispatch={dispatch} /> )}
            </section>
        )
    }
}

export default connect(function(state) {
    return {
        items: state.Notify.items,
        newItem: state.Notify.newItem
    };
})(Notify);