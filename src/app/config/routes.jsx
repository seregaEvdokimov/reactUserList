/**
 * Created by s.evdokimov on 13.12.2016.
 */

import React from "react";
import {Route, IndexRoute} from "react-router";

import App from '../../app/components/app.jsx';
import UserTable from '../components/body/userTable/index.jsx';
import UserProfile from '../components/body/userProfile/index.jsx';

export default (
    <Route>
        <Route components={App}>
            <Route path="/" component={UserTable}/>
            <Route path="/user/:id" component={UserProfile}/>
        </Route>
    </Route>
);