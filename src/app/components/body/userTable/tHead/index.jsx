/**
 * Created by s.evdokimov on 06.12.2016.
 */

import React from 'react';

export default function() {
    return (
        <thead className="tHead">
            <tr>
                <th className="id">№</th>
                <th className="name">Имя</th>
                <th className="email">Email</th>
                <th className="birth">День рождения</th>
                <th className="date">Расчетное время</th>
                <th className="delete">Удалить</th>
                <th className="edit">Редактировать</th>
            </tr>
        </thead>
    )
}