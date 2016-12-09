/**
 * Created by s.evdokimov on 08.11.2016.
 */

import Xhr from './Xhr';
var baseUrl = 'http://localhost:4000/';

Request = {
    load: function(entity, params, callbacks) {
        var URL = this.generateFullUrl(entity, params);
        var xhr = new Xhr({
            method: 'GET',
            URL: URL,
            params: params,
            callbacks: {
                onSuccess: callbacks.success,
                onFailure: callbacks.failure,
                dispatch: callbacks.dispatch
            }
        });

        return xhr.sendRequest();
    },

    update: function(entity, params, callbacks) {
        var URL = this.generateFullUrl(entity);
        var xhr = new Xhr({
            method: 'PUT',
            URL: URL,
            params: params,
            callbacks: {
                onSuccess: callbacks.success,
                onFailure: callbacks.failure,
                dispatch: callbacks.dispatch
            }
        });

        return xhr.sendRequest();
    },

    delete: function(entity, params, callbacks) {
        var URL = this.generateFullUrl(entity);
        var xhr = new Xhr({
            method: 'DELETE',
            URL: URL,
            params: params,
            callbacks: {
                onSuccess: callbacks.success,
                onFailure: callbacks.failure,
                dispatch: callbacks.dispatch
            }
        });

        return xhr.sendRequest();
    },

    create: function(entity, params, callbacks) {
        var URL = this.generateFullUrl(entity);
        var xhr = new Xhr({
            method: 'POST',
            URL: URL,
            params: params,
            callbacks: {
                onSuccess: callbacks.success,
                onFailure: callbacks.failure,
                dispatch: callbacks.dispatch
            }
        });

        return xhr.sendRequest();
    },

    generateFullUrl: function(entity, params) {
        var queryString = this.createQueryString(params);
        var fragmentUrl = '';
        switch (entity) {
            case 'user':
                fragmentUrl = 'user';
                break;
            case 'tooltip':
                fragmentUrl = 'tooltip';
                break;
        }

        return baseUrl + fragmentUrl + queryString;
    },

    createQueryString: function(params) {
        if(!params) return '';

        var str = '?';
        for(var index in params) {
            str += index + '=' + params[index] + '&';
        }

        str = str.slice(0, -1);
        return str;
    }
};

export default Request;