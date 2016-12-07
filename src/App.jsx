/**
 * Created by s.evdokimov on 06.12.2016.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/components/app.jsx';
import './App.less';

import {Provider} from 'react-redux';
import store from './app/config/configure';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);