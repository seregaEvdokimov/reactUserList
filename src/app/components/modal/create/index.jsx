/**
 * Created by s.evdokimov on 08.12.2016.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as actions from './../actions';
import * as usersActions from './../../body/userTable/actions';
import * as notifyActions from './../../additional/notify/actions';

import ImageUploader from './../../../lib/imageUploader';
import Validator from './../../../lib/Validator';
import Dictionary from './../../../lib/Dictionary';


class Create extends Component {
    constructor(props) { //ComponentWillMount
        super(props);
        this.uploader = new ImageUploader();
        this.validator = Validator;
    }

    handlerBtnControls(self, event) {
        let el = event.target;
        if(el.tagName !== 'BUTTON') return false;

        switch(el.classList[1]) {
            case 'add-btn':
                self.dataValidate();
                break;
            case 'cancel-btn':
                self.beforeHide('close');
                break;
        }
    }

    handlerUploadFile(self, event) {
        var el = event.target;
        el.classList.remove('error');
        el.classList.remove('success');

        self.uploader.read(el, self.onImageUploadSuccess.bind(self));
    }

    onImageUploadSuccess = function(file) {

    };

    dataValidate() {
        let dateTimeFinish = {};
        let valid = true;
        let result;

        for(var index in this.refs) {
            let node = this.refs[index];
            let value = this.refs[index].value;

            node.classList.remove('success');
            node.classList.remove('error');

            switch(index) {
                case 'id':
                    continue;
                case 'avatar':
                    result = this.validator.checkImage(node);
                    break;
                case 'name':
                    result = this.validator.checkName(value);
                    break;
                case 'email':
                    result = this.validator.checkEmail(value);
                    break;
                case 'birth':
                    result = this.validator.checkStartDate({date: value});
                    break;
                case 'date':
                    dateTimeFinish.date = value;
                    break;
                case 'time':
                    dateTimeFinish.time = value;
                    break;
                default:
                    continue;
            }

            node.classList.add(result.className);
            valid = result.valid;

            if(!valid) break;
        }

        valid = (valid) ? this.chekDate(dateTimeFinish) : false;
        if(!valid) return false;

        this.saveClient();
        this.beforeHide('save');
    }

    chekDate = function(data) {
        let {date, time} = this.refs;
        var result = this.validator.checkFinishDate(data);

        date.classList.add(result.className);
        time.classList.add(result.className);
        return result.valid;
    };

    saveClient() {
        let {dispatch, lang} = this.props;
        let {name, email, birth, date, time, avatar} = this.refs;
        date = date.valueAsNumber || 0;
        time = time.valueAsNumber || 0;

        let timeStamp = date + time;
        let data = {
            name: name.value,
            email: email.value,
            birth: new Date(birth.valueAsNumber),
            date: new Date(timeStamp),
            avatar: avatar.dataset.img
        };

        let str = Dictionary.getMessage(data, ['notify', 'createUser'], lang);
        dispatch(notifyActions.notifyCreate(str));
        dispatch(usersActions.createUserRequest(dispatch, data));
    }

    beforeHide(actionType) {
        let {dispatch} = this.props;

        for(var index in this.refs) {
            let node = this.refs[index];
            node.classList.remove('error');
            node.classList.remove('success');
            if(node.tagName === 'INPUT') node.value = '';
        }
        dispatch(actions.hideModalCreate());
    }

    render() {
        let {params, lang} = this.props;

        return (
            <div className={"modal-window " + (params.show ? 'modal-window_show' : '')}>
                <h3 className="modal-window__caption">{Dictionary.t(['modal', 'create', 'caption'], lang)}</h3>
                <div className="modal-window__group">
                    <div className="modal-window-group">
                        <label className="modal-window-group__label">{Dictionary.t(['modal', 'create', 'avatar'], lang)}</label>
                        <input className="modal-window-group__input" type="file" name="avatar" ref="avatar" onChange={this.handlerUploadFile.bind(this, this)} />
                    </div>
                </div>
                <div className="modal-window__group">
                    <div className="modal-window-group">
                        <label className="modal-window-group__label">{Dictionary.t(['modal', 'create', 'name'], lang)}</label>
                        <input className="modal-window-group__input" type="text" name="name" ref="name"/>
                    </div>
                </div>
                <div className="modal-window__group">
                    <div className="modal-window-group">
                        <label className="modal-window-group__label">{Dictionary.t(['modal', 'create', 'email'], lang)}</label>
                        <input className="modal-window-group__input" type="text" name="email" ref="email"/>
                    </div>
                </div>
                <div className="modal-window__group">
                    <div className="modal-window-group">
                        <label className="modal-window-group__label">{Dictionary.t(['modal', 'create', 'birth'], lang)}</label>
                        <input className="modal-window-group__input" type="date" name="birth" ref="birth"/>
                    </div>
                </div>
                <div className="modal-window__group">
                    <div className="modal-window-group">
                        <label className="modal-window-group__label">{Dictionary.t(['modal', 'create', 'time'], lang)}</label>
                        <input className="modal-window-group__input" type="date" name="date" ref="date"/>
                        <input className="modal-window-group__input" type="time" name="time" ref="time"/>
                    </div>
                </div>
                <div className="modal-window__group modal-window__group_control" onClick={this.handlerBtnControls.bind(this, this)}>
                    <div className="modal-window-group modal-window-group_control">
                        <button className="modal-window-group__button add-btn">{Dictionary.t(['modal', 'create', 'save'], lang)}</button>
                        <button className="modal-window-group__button cancel-btn">{Dictionary.t(['modal', 'create', 'cancel'], lang)}</button>
                    </div>
                </div>
            </div>
        )
    }
}


export default connect(function(state) {
    return {
        lang: state.HeaderSetting.currentLang,
        params: state.ModalWindows.create
    };
})(Create);