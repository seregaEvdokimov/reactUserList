/**
 * Created by s.evdokimov on 07.12.2016.
 */

import * as actions from './actions'

const initialState = {
    search: '',
    sort: {
        param: 'id',
        direction: 'asc'
    },
    users: []
};


export default function(state = initialState, action){
    let sortParams = {};
    let users = [];
    let search = '';

    switch (action.type){
        case actions.LOAD_USERS_REQUEST:
            // console.log('ACTION', actions.LOAD_USERS_REQUEST);
            return state;
        case actions.LOAD_USERS_SUCCESS:
            // console.log('ACTION', actions.LOAD_USERS_SUCCESS);
            users = userSort(action.payload, state.sort);
            return {...state, ...{users}};
        case actions.LOAD_USERS_FAILURE:
            // console.log('ACTION', actions.LOAD_USERS_FAILURE);
            console.warn(action.error);
            return state;
        case actions.SORT_USERS:
            // console.log('ACTION', actions.SORT_USERS);
            sortParams = action.payload;
            users = userSort(state.users, sortParams);
            return {...state, ...{users, sort: sortParams}};
            break;
    }

    return state
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

    // let i = 1;
    // sorted.forEach(function(user) {
    //     user.position = i;
    //     i++;
    // });

    return sorted;
}
