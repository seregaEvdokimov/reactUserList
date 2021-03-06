/**
 * Created by s.evdokimov on 12.12.2016.
 */

export const NOTIFY_SHOW = 'NOTIFY_SHOW';
export const NOTIFY_CREATE = 'NOTIFY_CREATE';

export const NOTIFY_HIDE = 'NOTIFY_HIDE';
export const NOTIFY_REMOVE = 'NOTIFY_REMOVE';

export const NOTIFY_TRIGGER = 'NOTIFY_TRIGGER';

export function notifyShow(data) {
    return {type: NOTIFY_SHOW, payload: {id: data}};
}

export function notifyCreate(data) {
    return {type: NOTIFY_CREATE, payload: {str: data}};
}

export function notifyHide(data) {
    return {type: NOTIFY_HIDE, payload: data};
}

export function notifyRemove(data) {
    return {type: NOTIFY_REMOVE, payload: data};
}

export function notifyTrigger() {
    return {type: NOTIFY_TRIGGER};
}