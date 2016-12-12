/**
 * Created by s.evdokimov on 07.12.2016.
 */

import Request from '../../../lib/Request';

export const LOAD_USERS_REQUEST = 'LOAD_USERS_REQUEST';
export const LOAD_USERS_SUCCESS = 'LOAD_USERS_SUCCESS';
export const LOAD_USERS_FAILURE = 'LOAD_USERS_FAILURE';

export const EDIT_USER_REQUEST = 'EDIT_USER_REQUEST';
export const EDIT_USER_SUCCESS = 'EDIT_USER_SUCCESS';
export const EDIT_USER_FAILURE = 'EDIT_USER_FAILURE';

export const CREATE_USER_REQUEST = 'CREATE_USER_REQUEST';
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const CREATE_USER_FAILURE = 'CREATE_USER_FAILURE';

export const DELETE_USER_REQUEST = 'DELETE_USER_REQUEST';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const DELETE_USER_FAILURE = 'DELETE_USER_FAILURE';

export const SORT_USERS = 'SORT_USERS';
export const CHANGE_PAGE = 'CHANGE_PAGE';


export function loadUsersRequest(dispatch) {
    loadUsers(dispatch);
    return { type: LOAD_USERS_REQUEST };
}

export function loadUsersSuccess(data) {
    return { type: LOAD_USERS_SUCCESS, payload: data };
}

export function loadUsersFailure(error) {
    return { type: LOAD_USERS_FAILURE, error: error };
}

export function sortUsers(data) {
    return { type: SORT_USERS, payload: data };
}

export function changePage(dispatch, start, limit, page) {
    loadUsers(dispatch, start, limit);
    return { type: CHANGE_PAGE, payload: page };
}

export function editUsersRequest(dispatch, data) {
    editUser(dispatch, data);
    return { type: EDIT_USER_REQUEST };
}

export function editUserSuccess(data) {
    return { type: EDIT_USER_SUCCESS, payload: data };
}

export function editUserFailure(error) {
    return { type: EDIT_USER_FAILURE, error };
}

export function createUserRequest(dispatch, data) {
    createUser(dispatch, data);
    return { type: CREATE_USER_REQUEST };
}

export function createUserSuccess(data) {
    return { type: CREATE_USER_SUCCESS, payload: data };
}

export function createUserFailure(error) {
    return { type: CREATE_USER_FAILURE, error };
}

export function deleteUserRequest(dispatch, data) {
    deleteUser(dispatch, data);
    return { type: DELETE_USER_REQUEST };
}

export function deleteUserSuccess(data) {
    return { type: DELETE_USER_SUCCESS, payload: data };
}

export function deleteUserFailure(error) {
    return { type: DELETE_USER_FAILURE, error };
}





function loadUsers(dispatch, start = 0, limit = 11) {
    Request.load('user', {start, limit}, {dispatch, success: loadUsersSuccess, failure: loadUsersFailure});
}

function editUser(dispatch, data) {
    Request.update('user', {payload: data}, {dispatch, success: editUserSuccess, failure: editUserFailure});
}

function createUser(dispatch, data) {
    Request.create('user', {payload: data}, {dispatch, success: createUserSuccess, failure: createUserFailure});
}

function deleteUser(dispatch, data) {
    Request.delete('user', {payload: {id: data}}, {dispatch, success: deleteUserSuccess, failure: deleteUserFailure});
}