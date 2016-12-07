/**
 * Created by s.evdokimov on 06.12.2016.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';


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


const Row = function({user}) {
    // user.timer = new App.Lib.Timer({start: user.birth, end: user.date}, parseTime);
    let date = parseTime(user.date);

    return (
        <tr className="">
            <td className="id">{user.id}</td>
            <td className="name">{user.name}</td>
            <td className="email">{user.email}</td>
            <td className="birth">{user.birth}</td>
            <td className="date">
                <div className="left-time">{date}</div>
                <div className="overlay positive" style={{width: '0.0453895%'}}></div>
            </td>
            <td className="del">
                <a className="delete-btn">Удалить</a>
            </td>
            <td className="edit">
                <a className="edit-btn">Редактировать</a>
            </td>
        </tr>
    );
};


class tBody extends Component {
    componentDidMount() {
        // console.log(this.props);
    }

    render() {
        let {users} = this.props;
        return (
            <tbody className="tBody">
                {users.map(user => <Row key={user.id} user={user} />)}
            </tbody>
        )
    }
}


export default connect(function(state) {
    return {users: state.usersTable.users};
})(tBody);