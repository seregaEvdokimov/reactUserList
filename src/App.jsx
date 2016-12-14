/**
 * Created by s.evdokimov on 06.12.2016.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from "react-router";
import {Provider} from 'react-redux';

import './App.less';
import {store, history} from './app/config/configure';
import routes from './app/config/routes.jsx';

ReactDOM.render(
    <Provider store={store}>
        <Router history={history} routes={routes} />
    </Provider>,
    document.getElementById('app')
);


