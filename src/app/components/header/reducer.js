/**
 * Created by s.evdokimov on 08.12.2016.
 */

import * as actions from './actions'

const initialState = {
    search: {
        str: '',
        users: null
    }
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
    }

    return state
}