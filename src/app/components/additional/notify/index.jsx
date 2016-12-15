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
        let {item, dispatch} = this.props;
        this.idTimeout = setTimeout(() => dispatch(actions.notifyRemove({id: item.id})), 50000);
    }

    componentWillUnmount() {
        clearTimeout(this.idTimeout);
    }

    render() {
        let {item} = this.props;

        return (
            <div className="notify" data-notify-id={item.id}>
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
        dispatch(actions.notifyRemove({id}));
    };

    render() {
        let {items, dispatch} = this.props;

        return (
            <section className="notify-wrapper" onClick={this.handlerNotifyHide.bind(this,  this)}>
                {items.map(item => <Item key={item.id} item={item} dispatch={dispatch} /> )}
            </section>
        )
    }
}

export default connect(function(state) {
    return {
        items: state.Notify.items,
        timeStamp: Date.now()
    };
})(Notify);