/**
 * Created by s.evdokimov on 06.12.2016.
 */

import React from 'react';

var Switcher = function() {
    return (
        <div className="switch-notify">
            <input type="checkbox" id="switch" />
            <label>Выключить оповещение</label>
        </div>
    )
};

var Language = function() {
    return (
        <div className="languages-wrapper">
            <a>EN</a>
            <a className="active">RU</a>
        </div>
    )
};

var Search = function() {
    return (
        <div className="search">
            <input name="search" />
            <button>Поиск</button>
        </div>
    )
};

export default function() {
    return (
        <div className="header">
            <Switcher />
            <Language />
            <Search />
        </div>
    );
}

