/**
 * Created by s.evdokimov on 08.12.2016.
 */

import * as actions from './actions'

const initialState = {
    search: {
        str: '',
        users: null
    },
    currentLang: 'ru',
    responsive: {
        device: null,
        orientation: null
    },
    menuActive: false,
};

export default function(state = initialState, action){
    switch (action.type){
        case actions.SEARCH_USERS:
            // console.log('ACTION', actions.SEARCH_USERS);
            let searchStr = action.payload.strSearch;
            let users = action.payload.users.filter(function(user) {
                return user.name.indexOf(searchStr) !== -1;
            });

            let search = {
                str: searchStr,
                users: (searchStr === '') ? null : users
            };

            return {...state, ...{search}};
        case actions.CHANGE_LANGUAGE:
            // console.log('Action', actions.CHANGE_LANGUAGE, action.payload);
            return {...state, ...{currentLang: action.payload.lang}};
        case actions.RESPONSIVE_PARAMS:
            // console.log('Action', actions.RESPONSIVE_PARAMS, action.payload);
            return {...state, ...{responsive: action.payload}};
        case actions.TOGGLE_HAMBURGER:
            // console.log('Action', actions.TOGGLE_HAMBURGER, action.payload);
            state.menuActive = !state.menuActive;
            return {...state};
    }

    return state
}