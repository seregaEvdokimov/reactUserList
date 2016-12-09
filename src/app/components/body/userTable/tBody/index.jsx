/**
 * Created by s.evdokimov on 06.12.2016.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from './../actions';
import * as modalActions from './../../../modal/actions';

import Timer from '../../../../lib/Timer';
import ProgressBarTimer from '../../../../lib/ProgressBarTimer';


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


class Row extends Component {
    constructor(props) { // componentWillMount
        super(props);

        let {user} = props;
        this.timer = new Timer({start: user.birth, end: user.date}, this.calcTime.bind(this));
    }

    componentDidMount() {
        let {user} = this.props;
        let {overlay} = this.refs;

        this.timer.start();
        this.progressBar = new ProgressBarTimer({start: user.birth, end: user.date}, overlay);
        this.progressBar.start();
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
        let {user} = this.props;
        let date = parseTime(user.date);

        let birth = new Date(user.birth);
        birth = birth.getDate() + '. ' + (birth.getMonth() + 1) + '. ' + birth.getFullYear();

        return (
            <tr>
                <td className="id">{user.id}</td>
                <td className="name">{user.name}</td>
                <td className="email">{user.email}</td>
                <td className="birth">{birth}</td>
                <td className="date">
                    <div className="left-time" ref='date'>{date}</div>
                    <div className="overlay positive" ref='overlay' style={{width: '0%'}}></div>
                </td>
                <td className="del">
                    <a className="delete-btn">Удалить</a>
                </td>
                <td className="edit">
                    <a className="edit-btn">Редактировать</a>
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
    }

    rowBtnControls(self, event) {
        let el = event.target;
        if(el.tagName !== 'A') return false;

        let {dispatch, users} = self.props;
        let id = self.getRowId(el);
        let userFind = users.filter(function(user) {
            return user.id === id;
        })[0];

        switch(el.className) {
            case 'delete-btn':
                dispatch(actions.deleteUserRequest(dispatch, id));
                break;
            case 'edit-btn':
                dispatch(modalActions.showModalEdit(userFind));
                break;
        }
    }

    getRowId(element) {
        if(element.tagName == 'TR') return parseInt(element.querySelector('.id').textContent);
        return this.getRowId(element.parentNode);
    }

    render() {
        let {users} = this.props;

        return (
            <tbody className="tBody" onClick={this.rowBtnControls.bind(this, this)}>
                {users.map(user => <Row key={user.id} user={user} />)}
            </tbody>
        )
    }
}


export default connect(function(state) {
    let users = state.HeaderSetting.search.users === null
        ? state.UsersTable.users
        : state.HeaderSetting.search.users ;

    return {
        users: users,
        timeStamp: Date.now()
    };
})(tBody);