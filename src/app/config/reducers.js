/**
 * Created by s.evdokimov on 06.12.2016.
 */

import {combineReducers} from 'redux';
import UsersTable from '../components/body/userTable/reducer';
import HeaderSetting from '../components/header/reducer';
import ModalWindows from '../components/modal/reducer';

export default combineReducers({
    UsersTable,
    HeaderSetting,
    ModalWindows
});