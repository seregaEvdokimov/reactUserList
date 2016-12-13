/**
 * Created by s.evdokimov on 12.12.2016.
 */

import * as actions from './actions';

let initialState = {
    isShow: true,
    newItem: null,
    items: []
};

export default function(state = initialState, action) {
    switch(action.type) {
        case actions.NOTIFY_SHOW:
            // console.log('ACTION', actions.NOTIFY_SHOW, action.payload);
            state.items.push(state.newItem);
            state.newItem = null;
            return {...state};
        case actions.NOTIFY_CREATE:
            // console.log('ACTION', actions.NOTIFY_CREATE, action.payload);
            if(state.isShow) state.newItem = {id: Date.now(), text: action.payload.str};
            return {...state};
        case actions.NOTIFY_HIDE:
            // console.log('ACTION', actions.NOTIFY_HIDE, action.payload);
            return state;
        case actions.NOTIFY_REMOVE:
            // console.log('ACTION', actions.NOTIFY_REMOVE, action.payload);
            let items = state.items.reduce(function (acc, item) {
                if (item.id != parseInt(action.payload.id)) acc.push(item);
                return acc;
            }, []);

            return {...state, ...{items}};
        case actions.NOTIFY_TRIGGER:
            // console.log('ACTION', actions.NOTIFY_TRIGGER);
            state.isShow = !state.isShow;
            return {...state};
    }

    return state;
}