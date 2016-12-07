/**
 * Created by s.evdokimov on 06.12.2016.
 */

import React from 'react';
import {connect} from 'react-redux';

import Header from './header/index.jsx';
import TableUser from './body/usertable/index.jsx';


export default function() {
    return (
        <div>
            <Header />
            <TableUser />
        </div>
    )
}

