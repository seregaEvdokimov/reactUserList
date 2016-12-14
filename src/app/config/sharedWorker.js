/**
 * Created by s.evdokimov on 13.12.2016.
 */

import Dictionary from '../lib/Dictionary';

import * as notifyActions from '../components/additional/notify/actions';
import * as usersActions from '../components/body/userTable/actions';

export default function(dispatch, state) {
    var sharedWorker = new SharedWorker('./worker.js');
    sharedWorker.port.addEventListener("message", function(e) {
        var data = JSON.parse(e.data);
        console.log('worker say: ' + data.type);
        switch (data.type) {
            case 'connect':
                console.info('connect');
                break;
            case 'new user':
                let str = Dictionary.getMessage(data.payload, ['notify', 'createUser'], state.HeaderSetting.currentLang);
                dispatch(notifyActions.notifyCreate(str));
                dispatch(usersActions.createUserSuccess(data.payload));
                break;
            case 'time passed':
                data.payload.forEach(function(item) {
                    let str = Dictionary.getMessage(item, ['notify', 'timePassed'], state.HeaderSetting.currentLang);
                    dispatch(notifyActions.notifyCreate(str));
                });
                break;
        }
    }, false);

    sharedWorker.port.start();
};


