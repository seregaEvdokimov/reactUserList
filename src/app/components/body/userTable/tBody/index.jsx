/**
 * Created by s.evdokimov on 06.12.2016.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from './../actions';

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
        user.timer = new Timer({start: user.birth, end: user.date}, this.calcTime.bind(this));
    }

    componentDidMount() {
        let {user} = this.props;
        let {overlay} = this.refs;

        user.timer.start();
        user.progressBar = new ProgressBarTimer({start: user.birth, end: user.date}, overlay);
        user.progressBar.start();
    }

    componentWillUnMount() {
        let {user} = this.props;

        user.timer.stop();
        user.progressBar.stop();
    }

    calcTime() {
        let {user} = this.props;
        let {date} = this.refs;

        date.textContent = parseTime(user.timer.finishTime);
    }

    render() {
        let {user} = this.props;
        let date = parseTime(user.date);

        let birth = new Date(user.birth);
        birth = birth.getDate() + '. ' + (birth.getMonth() + 1) + '. ' + birth.getFullYear();

        return (
            <tr className="">
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

    // componentDidMount() {
    //
    // }

    rowBtnControls(event) {
        let el = event.target;
        if(el.tagName !== 'A') return false;

        switch(el.className) {
            case 'delete-btn':
                alert('delete');
                break;
            case 'edit-btn':
                alert('edit');
                break;
        }

        // console.log(el.tagName, event);
    }

    render() {
        let {users} = this.props;

        return (
            <tbody className="tBody" onClick={this.rowBtnControls}>
                {users.map(user => <Row key={user.id} user={user} />)}
            </tbody>
        )
    }
}


export default connect(function(state) {
    console.log(state.usersTable.users);
    return {users: state.usersTable.users};
})(tBody);