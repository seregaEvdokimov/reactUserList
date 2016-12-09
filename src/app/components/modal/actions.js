/**
 * Created by s.evdokimov on 08.12.2016.
 */

export const SHOW_MODAL_CREATE = 'SHOW_MODAL_CREATE';
export const HIDE_MODAL_CREATE = 'HIDE_MODAL_CREATE';
export const SHOW_MODAL_EDIT = 'SHOW_MODAL_EDIT';
export const HIDE_MODAL_EDIT = 'HIDE_MODAL_EDIT';
export const SHOW_MODAL_CONFIRM = 'SHOW_MODAL_CONFIRM';
export const HIDE_MODAL_CONFIRM = 'HIDE_MODAL_CONFIRM';
export const HIDE_MODAL_ALL = 'HIDE_MODAL_ALL';

export function showModalCreate() {
    return {type: SHOW_MODAL_CREATE};
}

export function hideModalCreate() {
    return {type: HIDE_MODAL_CREATE};
}

export function showModalEdit(data) {
    return {type: SHOW_MODAL_EDIT, payload: data};
}

export function hideModalEdit() {
    return {type: HIDE_MODAL_EDIT};
}

export function showModalConfirm(data) {
    return {type: SHOW_MODAL_CONFIRM, payload: data};
}

export function hideModalConfirm() {
    return {type: HIDE_MODAL_CONFIRM};
}

export function hideModalAll() {
    return {type: HIDE_MODAL_ALL};
}