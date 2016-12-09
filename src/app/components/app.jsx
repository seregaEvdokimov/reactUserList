/**
 * Created by s.evdokimov on 06.12.2016.
 */

import React from 'react';

import Header from './header/index.jsx';
import TableUser from './body/usertable/index.jsx';
import Modal from './modal/index.jsx';


export default function() {
    return (
        <div>
            <Header />
            <TableUser />
            <Modal />
        </div>
    )
}

