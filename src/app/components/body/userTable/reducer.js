/**
 * Created by s.evdokimov on 07.12.2016.
 */

import * as actions from './actions'

const initialState = {
    sort: {},
    users: []
};

export default function(state = initialState, action){
    switch (action.type){
        case actions.LOAD_USERS_REQUEST:
            console.log('ACTION', actions.LOAD_USERS_REQUEST);
            return state;
            break;
        case actions.LOAD_USERS_SUCCESS:
            console.log('ACTION', actions.LOAD_USERS_SUCCESS);
            var obj = {users: action.payload};
            return {...state, ...obj};
            break;
        case actions.LOAD_USERS_FAILURE:
            console.log('ACTION', actions.LOAD_USERS_FAILURE);
            console.warn(action.error);
            return state;
            break;
    }

    return state
}