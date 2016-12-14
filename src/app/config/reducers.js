/**
 * Created by s.evdokimov on 06.12.2016.
 */

import {combineReducers} from 'redux';
import {routerReducer as routing} from 'react-router-redux';

import UsersTable from '../components/body/userTable/reducer';
import HeaderSetting from '../components/header/reducer';
import ModalWindows from '../components/modal/reducer';
import Tooltip from '../components/additional/tooltip/reducer';
import Notify from '../components/additional/notify/reducer';

export default combineReducers({
    UsersTable,
    HeaderSetting,
    ModalWindows,
    Tooltip,
    Notify,
    routing
});