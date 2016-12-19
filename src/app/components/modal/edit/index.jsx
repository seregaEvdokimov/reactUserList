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


class Edit extends Component{
    constructor(props) { // componentWillMount
        super(props);
        this.uploader = new ImageUploader();
        this.validator = Validator;
    }

    handlerBtnControls(self, event) {
        let el = event.target;
        if(el.tagName !== 'BUTTON') return false;

        switch(el.className) {
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

        let isUpdate = this.dataCompare();
        if(isUpdate) this.saveClient();
        this.beforeHide('save');
    }

    dataCompare = function() {
        let toUpdate = false;
        let oldData = this.props.params.data;
        let newData = this.refs;

        for(let index in oldData) {
            let newDate = null;
            let oldDate = null;

            switch (index) {
                case 'email':
                case 'name':
                case 'id':
                    if(oldData[index] != newData[index].value) toUpdate = true;
                    break;
                case 'avatar':
                    if(oldData[index] != newData[index].dataset.img) toUpdate = true;
                    break;
                case 'birth':
                    newDate = new Date(newData[index].valueAsNumber).getTime();
                    oldDate = new Date(oldData[index]).getTime();
                    if(oldDate != newDate) toUpdate = true;
                    break;
                case 'date':
                    newDate = new Date(newData.date.valueAsNumber + newData.time.valueAsNumber).getTime();
                    oldDate = new Date(oldData[index]).getTime();
                    if(oldDate != newDate) toUpdate = true;
                    break;
                default:
                    break;
            }
        }

        return toUpdate;
    };

    chekDate = function(data) {
        let {date, time} = this.refs;
        var result = this.validator.checkFinishDate(data);

        date.classList.add(result.className);
        time.classList.add(result.className);
        return result.valid;
    };


    saveClient() {
        let {dispatch, lang} = this.props;
        let {id, name, email, birth, date, time, avatar} = this.refs;
        let data = {
            id: parseInt(id.value),
            name: name.value,
            email: email.value,
            birth: new Date(birth.valueAsNumber),
            date: new Date(date.valueAsNumber + time.valueAsNumber),
            avatar: avatar.dataset.img
        };

        let str = Dictionary.getMessage(data, ['notify', 'updateUser'], lang);
        dispatch(notifyActions.notifyCreate(str));
        dispatch(usersActions.editUsersRequest(dispatch, data));
    }

    beforeHide(actionType) {
        let {dispatch} = this.props;

        switch(actionType) {
            case 'save':
                for(var index in this.refs) {
                    let node = this.refs[index];
                    node.classList.remove('error');
                    node.classList.remove('success');
                    if(node.tagName === 'INPUT') node.value = '';
                }
                dispatch(actions.hideModalEdit());
            break;
            case 'close':
                let isConfirm = this.dataCompare();
                if(isConfirm) {
                    dispatch(actions.showModalConfirm(this.saveClient.bind(this)));
                } else {
                    dispatch(actions.hideModalEdit());
                }

                break;
        }
    }

    render() {
        let {params, lang} = this.props;
        let {data, show} = params;

        if(show) {
            let {id, name, email, birth, date, time, imgAvatar, avatar} = this.refs;

            id.value = data.id;
            name.value = data.name;
            email.value = data.email;
            birth.valueAsNumber = new Date(data.birth).getTime();
            date.valueAsNumber = new Date(data.date).getTime();
            time.valueAsNumber = new Date(data.date).getTime();
            imgAvatar.src = data.avatar;
            avatar.dataset.img = data.avatar;
        }

        return (
            <div className={"modal-window " + (show ? 'modal-window_show' : '')}>
                <h3 className="modal-window__caption">{Dictionary.t(['modal', 'edit', 'caption'], lang)}</h3>
                <div className="modal-window__group">
                    <div className="modal-window-group">
                        <label>{Dictionary.t(['modal', 'edit', 'avatar'], lang)}</label>
                        <img src="" alt="" ref="imgAvatar" />
                        <input type="file" ref="avatar" name="avatar" onChange={this.handlerUploadFile.bind(this, this)} />
                    </div>
                </div>
                <div className="modal-window__group">
                    <div className="modal-window-group">
                        <label>{Dictionary.t(['modal', 'edit', 'name'], lang)}</label>
                        <input type="text" name="name" ref="name" />
                    </div>
                </div>
                <div className="modal-window__group">
                    <div className="modal-window-group">
                        <label>{Dictionary.t(['modal', 'edit', 'email'], lang)}</label>
                        <input type="text" name="email" ref="email" />
                    </div>
                </div>
                <div className="modal-window__group">
                    <div className="modal-window-group">
                        <label>{Dictionary.t(['modal', 'edit', 'birth'], lang)}</label>
                        <input type="date" name="birth" ref="birth" />
                    </div>
                </div>
                <div className="modal-window__group">
                    <div className="modal-window-group">
                        <label>{Dictionary.t(['modal', 'edit', 'time'], lang)}</label>
                        <input type="date" name="date" ref="date" />
                        <input type="time" name="time" ref="time" />
                    </div>
                </div>
                <div className="modal-window__group modal-window__group_control" onClick={this.handlerBtnControls.bind(this, this)}>
                    <div className="modal-window-group modal-window-group_control">
                        <button className="add-btn">{Dictionary.t(['modal', 'edit', 'save'], lang)}</button>
                        <button className="cancel-btn">{Dictionary.t(['modal', 'edit', 'cancel'], lang)}</button>
                    </div>
                </div>
                <input type="hidden" name="id" className="id-input" ref="id" />
            </div>
        )
    }
}

export default connect(function(state) {
    return {
        lang: state.HeaderSetting.currentLang,
        params: state.ModalWindows.edit
    };
})(Edit);