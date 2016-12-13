/**
 * Created by s.evdokimov on 06.12.2016.
 */

import React from 'react';
import ReactDOM from 'react-dom';

import {Provider} from 'react-redux';
import store from './app/config/configure';

import './App.less';
import App from './app/components/app.jsx';
import sharedWorker from './sharedWorker';
sharedWorker(store.dispatch, store.getState());

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);


