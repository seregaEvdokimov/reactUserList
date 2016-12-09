/**
 * Created by s.evdokimov on 08.12.2016.
 */

import * as actions from './actions';

const initialState = {
    main: {
        show: false
    },
    create: {
        show: false
    },
    edit: {
        show: false,
        data: {}
    },
    confirm: {
        show: false,
        callback: null
    }
};

export default function(state = initialState, action) {
    let res = {};

    switch(action.type) {
        case actions.SHOW_MODAL_CREATE:
            // console.log('ACTION', actions.SHOW_MODAL_CREATE);
            res = dispatcherModalWindows('create', true);
            return {...state, ...res};
        case actions.HIDE_MODAL_CREATE:
            // console.log('ACTION', actions.HIDE_MODAL_CREATE);
            res = dispatcherModalWindows('create', false);
            return {...state, ...res};
        case actions.SHOW_MODAL_EDIT:
            // console.log('ACTION', actions.SHOW_MODAL_EDIT);
            res = dispatcherModalWindows('edit', true);
            res.edit.data = action.payload;
            return {...state, ...res};
        case actions.HIDE_MODAL_EDIT:
            // console.log('ACTION', actions.HIDE_MODAL_EDIT);
            res = dispatcherModalWindows('edit', false);
            return {...state, ...res};
        case actions.SHOW_MODAL_CONFIRM:
            // console.log('ACTION', actions.SHOW_MODAL_CONFIRM);
            res = dispatcherModalWindows('confirm', true);
            res.confirm.callback = action.payload;
            return {...state, ...res};
        case actions.HIDE_MODAL_CONFIRM:
            // console.log('ACTION', actions.HIDE_MODAL_CONFIRM);
            res = dispatcherModalWindows('confirm', false);
            return {...state, ...res};
        case actions.HIDE_MODAL_ALL:
            // console.log('ACTION', actions.HIDE_MODAL_ALL);
            res = dispatcherModalWindows(null, false);
            return {...state, ...res};
    }

    return state;
}

function dispatcherModalWindows(windowName, type) {
    return {
        main:    { show: (type) ? true : false },
        create:  { show: (windowName === 'create') ? type : false },
        edit:    { show: (windowName === 'edit') ? type : false },
        confirm: { show: (windowName === 'confirm') ? type : false }
    };
}

