/**
 * Created by s.evdokimov on 08.12.2016.
 */

export const SEARCH_USERS = 'SEARCH_USERS';

export function searchUsers(data) {
    return { type: SEARCH_USERS, payload: data};
}