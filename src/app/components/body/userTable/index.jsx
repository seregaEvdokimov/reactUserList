/**
 * Created by s.evdokimov on 06.12.2016.
 */

import React from 'react';

import TableHeader from './tHead/index.jsx';
import TableBody from './tBody/index.jsx';

export default function() {
    return (
        <table className="table">
            <TableHeader />
            <TableBody />
        </table>
    )
}