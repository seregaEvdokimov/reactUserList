/**
 * Created by s.evdokimov on 08.12.2016.
 */

export const SEARCH_USERS = 'SEARCH_USERS';
export const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE';
export const RESPONSIVE_PARAMS = 'RESPONSIVE_PARAMS';
export const TOGGLE_HAMBURGER = 'TOGGLE_HAMBURGER';

export function searchUsers(data) {
    return { type: SEARCH_USERS, payload: data};
}

export function changeLanguage(data) {
    return { type: CHANGE_LANGUAGE, payload: data};
}

export function setResponsiveParams(data) {
    return { type: RESPONSIVE_PARAMS, payload: data};
}

export function toggleHamburger() {
    return { type: TOGGLE_HAMBURGER};
}