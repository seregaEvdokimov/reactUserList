/**
 * Created by s.evdokimov on 07.12.2016.
 */

import Request from '../../../lib/Request';

export const LOAD_USERS_REQUEST = 'LOAD_USERS_REQUEST';
export const LOAD_USERS_SUCCESS = 'LOAD_USERS_SUCCESS';
export const LOAD_USERS_FAILURE = 'LOAD_USERS_FAILURE';
export const SORT_USERS = 'SORT_USERS';


export function loadUsersRequest(dispatch) {
    loadUsers(dispatch);
    return { type: LOAD_USERS_REQUEST};
}

export function loadUsersSuccess(data) {
    return { type: LOAD_USERS_SUCCESS, payload: data};
}

export function loadUsersFailure(error) {
    return { type: LOAD_USERS_FAILURE, error: error};
}

export function sortUsers(data) {
    return { type: SORT_USERS, payload: data};
}



function loadUsers(dispatch) {
    Request.load('user', {dispatch, success: loadUsersSuccess, failure: loadUsersFailure});
}