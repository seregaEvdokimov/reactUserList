/**
 * Created by s.evdokimov on 07.12.2016.
 */

import {createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducers from './reducers';

export default createStore(rootReducers, applyMiddleware(thunk));