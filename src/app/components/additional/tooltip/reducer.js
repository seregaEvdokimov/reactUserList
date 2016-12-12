/**
 * Created by s.evdokimov on 12.12.2016.
 */

import * as actions from './actions';

let initialState = {
    top: null,
    left: null,
    show: false,
    type: null,
    data: {}
};


export default function(state = initialState, action) {
    let left = 0;
    let top = 0;
    switch(action.type) {
        case actions.SHOW_TOOLTIP:
            // console.log('ACTION', actions.SHOW_TOOLTIP);
            left = action.payload.x + 15;
            top = action.payload.y + 15;
            return {...state, ...{left, top}};
        case actions.SHOW_TOOLTIP_REQUEST:
            // console.log('ACTION', actions.SHOW_TOOLTIP_REQUEST);
            return state;
        case actions.SHOW_TOOLTIP_SUCCESS:
            // console.log('ACTION', actions.SHOW_TOOLTIP_SUCCESS, action.payload);
            return {...state, ...{show: true, type: action.payload.type, data: action.payload}};
        case actions.SHOW_TOOLTIP_FAILURE:
            // console.log('ACTION', actions.SHOW_TOOLTIP_FAILURE);
            console.warn(action.error);
            return state;
        case actions.MOVE_TOOLTIP:
            // console.log('ACTION', actions.MOVE_TOOLTIP);
            left = action.payload.x + 15;
            top = action.payload.y + 15;
            return {...state, ...{top, left}};
        case actions.HIDE_TOOLTIP:
            return {...state, ...{show: false}};
    }

    return state;
}