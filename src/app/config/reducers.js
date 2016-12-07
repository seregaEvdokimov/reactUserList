/**
 * Created by s.evdokimov on 06.12.2016.
 */

import {combineReducers} from 'redux';
import users from '../components/body/userTable/reducer';

export default combineReducers({
    usersTable: users
});