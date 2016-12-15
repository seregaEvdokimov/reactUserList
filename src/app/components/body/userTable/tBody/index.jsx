/**
 * Created by s.evdokimov on 06.12.2016.
 */

import React, {Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

import * as actions from './../actions';
import * as modalActions from './../../../modal/actions';
import * as notifyActions from './../../../additional/notify/actions';

import Timer from '../../../../lib/Timer';
import ProgressBarTimer from '../../../../lib/ProgressBarTimer';
import Dictionary from './../../../../lib/Dictionary';


function parseTime (endTime) {
    var currentDate = new Date().getTime();
    endTime = new Date(endTime).getTime();

    var difference = endTime - currentDate;
    var time =  difference / 1000; // to second

    var seconds = Math.floor(time % 60);
    time = time / 60;

    var minutes = Math.floor(time % 60);
    time = time / 60;

    var hours = Math.floor(time % 24);
    time = time / 24;

    var days = Math.floor(time % 30);
    time = time / 30;

    var month = Math.floor(time % 12);
    var years = Math.floor(time / 12);

    var timeLeft = {
        years: years,
        months: month,
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds
    };

    var dateString = '';
    for (var key in timeLeft) {
        dateString += key + ': ' + timeLeft[key] + ', ';
    }

    return dateString;
}


class Block extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {lang, user, responsive} = this.props;

        let date = new Date(user.date);
        date = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();

        return (
            <tr className="block">
                {(responsive.device !== 'phone') ? <td className="avatar"><img src={user.avatar} alt=""/></td> : null }
                <td className="info">
                    <p className="id">{user.id}</p>
                    <p>Date/Time: {date}</p>
                    <p>Person: {user.name}</p>
                    <p>Email: {user.email}</p>
                </td>
                <td className="controls">
                    <a className="delete-btn">{Dictionary.t(['userTable', 'tBody', 'delete'], lang)}</a>
                    <a className="edit-btn">{Dictionary.t(['userTable', 'tBody', 'edit'], lang)}</a>
                </td>
            </tr>
        );
    }
}

class Row extends Component {
    constructor(props) { // componentWillMount
        super(props);

        let {user} = props;
        this.timer = new Timer({start: user.birth, end: user.date}, this.calcTime.bind(this));
    }

    componentDidMount() {
        let {user, isNew} = this.props;
        let {overlay, el} = this.refs;

        this.timer.start();
        this.progressBar = new ProgressBarTimer({start: user.birth, end: user.date}, overlay);
        this.progressBar.start();

        if(isNew) {
            setTimeout(() => el.classList.remove('addition'), 300);
        }
    }

    componentDidUpdate() {
        let {user} = this.props;
        this.progressBar.update({start: user.birth, end: user.date});
        this.timer.update({start: user.birth, end: user.date});
    }

    componentWillUnmount() {
        this.timer.stop();
        this.progressBar.stop();
    }

    calcTime() {
        let {date} = this.refs;
        date.textContent = parseTime(this.timer.finishTime);
    }

    render() {
        let {user, isNew, lang} = this.props;
        let date = parseTime(user.date);

        let birth = new Date(user.birth);
        birth = birth.getDate() + '. ' + (birth.getMonth() + 1) + '. ' + birth.getFullYear();

        return (
            <tr className={'row ' + (isNew ? 'addition' : '')} ref="el">
                <td className="id"><Link to={`/user/${user.id}`}>{user.id}</Link></td>
                <td className="name" data-tooltip="name">{user.name}</td>
                <td className="email" data-tooltip="email">{user.email}</td>
                <td className="birth">{birth}</td>
                <td className="date">
                    <div className="left-time" ref='date'>{date}</div>
                    <div className="overlay positive" ref='overlay' style={{width: '0%'}}></div>
                </td>
                <td className="del">
                    <a className="delete-btn">{Dictionary.t(['userTable', 'tBody', 'delete'], lang)}</a>
                </td>
                <td className="edit">
                    <a className="edit-btn">{Dictionary.t(['userTable', 'tBody', 'edit'], lang)}</a>
                </td>
            </tr>
        );
    }
}


class tBody extends Component {
    constructor(props) { // componentWillMount
        super(props);

        let {users, dispatch} = props;
        if(!users.length) actions.loadUsersRequest(dispatch);

        this.usersTotal = users.length;
    }

    rowBtnControls(self, event) {
        let el = event.target;
        if(el.tagName !== 'A') return false;

        let {dispatch, users, lang} = self.props;
        let row = self.getRowId(el);
        let id = parseInt(row.querySelector('.id').textContent);
        let userFind = users.filter(function(user) {
            return user.id === id;
        })[0];

        switch(el.className) {
            case 'delete-btn':
                let str = Dictionary.getMessage(userFind, ['notify', 'deleteUser'], lang);
                row.classList.add('deleting');
                setTimeout(() => {
                    dispatch(notifyActions.notifyCreate(str));
                    dispatch(actions.deleteUserRequest(dispatch, id));
                }, 300);
                break;
            case 'edit-btn':
                dispatch(modalActions.showModalEdit(userFind));
                break;
        }
    }

    lazyLoadUsers(self, event) {
        let {pagination, dispatch} = self.props;
        let el = event.target;
        if(pagination.type !== 'lazyLoad') return false;

        let currentScroll = el.scrollTop + el.clientHeight;
        let maxScroll = el.scrollHeight;

        if(currentScroll == maxScroll) {
            let start = 0;
            let limit = el.childNodes.length + pagination.perPage;

            if(self.usersTotal != self.props.users.length) dispatch(actions.changePage(dispatch, start, limit, 1));
            self.usersTotal = self.props.users.length;
        }
    }

    getRowId(element) {
        if(element.tagName == 'TR') return element;
        return this.getRowId(element.parentNode);
    }

    render() {
        let {users, lang, responsive} = this.props;

        users = users.slice();
        let newUser = users.shift() || {};

        return (
            <tbody className="tBody" onScroll={this.lazyLoadUsers.bind(this, this)} onClick={this.rowBtnControls.bind(this, this)}>
                {(responsive.device === 'tablet' || responsive.device === 'phone')
                    ? <Block key={newUser.id} user={newUser} lang={lang} responsive={responsive} isNew={true}/>
                    : <Row key={newUser.id} user={newUser} lang={lang} responsive={responsive} isNew={true}/>
                }

                {(responsive.device === 'tablet' || responsive.device === 'phone')
                    ? users.map(user => <Block key={user.id} user={user} responsive={responsive} lang={lang}/>)
                    : users.map(user => <Row key={user.id} user={user} responsive={responsive} lang={lang}/>)
                }
            </tbody>
        )
    }
}


export default connect(function(state) {
    let users = state.HeaderSetting.search.users === null
        ? state.UsersTable.users
        : state.HeaderSetting.search.users ;

    return {
        lang: state.HeaderSetting.currentLang,
        users: users,
        pagination: state.UsersTable.pagination,
        responsive: state.HeaderSetting.responsive,
        timeStamp: Date.now()
    };
})(tBody);