/**
 * Created by s.evdokimov on 06.12.2016.
 */

import React from 'react';

import TableHeader from './tHead/index.jsx';
import TableBody from './tBody/index.jsx';
import Footer from './footer/index.jsx';

export default function() {
    return (
        <div className="userList">
            <table className="table">
                <TableHeader />
                <TableBody />
            </table>
            <Footer />
        </div>
    )
}