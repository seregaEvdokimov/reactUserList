/**
 * Created by s.evdokimov on 07.12.2016.
 */

import * as actions from './actions'

const initialState = {
    sort: {
        param: 'id',
        direction: 'asc'
    },
    users: [],
    pagination: {
        perPage: 10,
        pages: null,
        currentPage: 1
    }
};


export default function(state = initialState, action){
    let sortParams = {};
    let users = [];
    let pagination = {};
    let findIndex = null;

    switch (action.type){
        case actions.LOAD_USERS_REQUEST:
            // console.log('ACTION', actions.LOAD_USERS_REQUEST);
            return state;
        case actions.LOAD_USERS_SUCCESS:
            // console.log('ACTION', actions.LOAD_USERS_SUCCESS);
            pagination = calcPagination(action.payload.count, state.pagination);
            users = userSort(action.payload.users, state.sort);
            return {...state, ...{users, pagination}};
        case actions.LOAD_USERS_FAILURE:
            // console.log('ACTION', actions.LOAD_USERS_FAILURE);
            console.warn(action.error);
            return state;
        case actions.EDIT_USER_REQUEST:
            // console.log('ACTION', actions.EDIT_USER_REQUEST);
            return state;
        case actions.EDIT_USER_SUCCESS:
            // console.log('ACTION', actions.EDIT_USER_SUCCESS, action.payload);
            state.users.forEach(function (item, index) {
                if (item.id === action.payload.id) findIndex = index;
            });

            state.users.splice(findIndex, 1, action.payload);
            users = userSort(state.users, state.sort);
            return {...state, ...{users}};
        case actions.EDIT_USER_FAILURE:
            // console.log('ACTION', actions.EDIT_USER_FAILURE);
            console.warn(action.error);
            return state;
        case actions.CREATE_USER_REQUEST:
            // console.log('ACTION', actions.CREATE_USER_REQUEST);
            return state;
        case actions.CREATE_USER_SUCCESS:
            // console.log('ACTION', actions.CREATE_USER_SUCCESS, action.payload);
            // state.users.push(action.payload);
            users = userSort(state.users, state.sort);
            return {...state, ...{users}};
        case actions.CREATE_USER_FAILURE:
            // console.log('ACTION', actions.CREATE_USER_FAILURE);
            console.warn(action.error);
            return state;
        case actions.DELETE_USER_REQUEST:
            console.log('ACTION', actions.DELETE_USER_REQUEST);
            return state;
        case actions.DELETE_USER_SUCCESS:
            // console.log('ACTION', actions.DELETE_USER_SUCCESS, action.payload);
            state.users.forEach(function (item, index) {
                if (item.id === action.payload.id) findIndex = index;
            });

            state.users.splice(findIndex, 1);
            users = userSort(state.users, state.sort);
            return {...state, ...{users}};
        case actions.DELETE_USER_FAILURE:
            console.log('ACTION', actions.DELETE_USER_FAILURE);
            console.warn(action.error);
            return state;
        case actions.SORT_USERS:
            // console.log('ACTION', actions.SORT_USERS);
            sortParams = action.payload;
            users = userSort(state.users, sortParams);
            return {...state, ...{users, sort: sortParams}};
        case actions.CHANGE_PAGE:
            // console.log('ACTION', actions.CHANGE_PAGE);
            pagination = state.pagination;
            pagination.currentPage = action.payload;
            return {...state, ...{pagination}};
    }

    return state
}

function calcPagination(count, pagination) {
    let pages = Math.ceil(count / pagination.perPage);
    return {
        perPage: pagination.perPage,
        currentPage: pagination.currentPage,
        pages
    }
}

function userSort(users, params) {
    let sorted = users.sort(function(v1, v2) {
        let p1 = (params.param == 'date' || params.param == 'birth') ? new Date(v1[params.param]).getTime() : v1[params.param];
        let p2 = (params.param == 'date' || params.param == 'birth') ? new Date(v2[params.param]).getTime() : v2[params.param];
        let res = 0;

        if (params.direction == 'asc') res = (p1 > p2) ? 1 : -1;
        if (params.direction == 'desc') res = (p1 > p2) ? -1 : 1;
        return res;
    });

    return sorted;
}
