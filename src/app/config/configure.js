/**
 * Created by s.evdokimov on 07.12.2016.
 */

import {createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import {hashHistory} from "react-router";
import {syncHistoryWithStore} from "react-router-redux";

import rootReducers from './reducers';
import sharedWorker from './sharedWorker';

export const store = createStore(rootReducers, applyMiddleware(thunk));
export const history = syncHistoryWithStore(hashHistory, store);

sharedWorker(store.dispatch, store.getState());
export default store;