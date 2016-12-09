/**
 * Created by s.evdokimov on 08.11.2016.
 */

function XHR(config) {
    this.xhr = new XMLHttpRequest();
    this.method = config.method;
    this.URL = config.URL;
    this.params = config.params;
    this.callbacks = config.callbacks;
    this.paramsBody = '';

    if('payload' in this.params) {
        this.paramsBody = this.createParamsBody(this.params.payload);
    }
}

XHR.prototype.sendRequest = function() {
    this.xhr.open(this.method, this.URL, true);
    this.xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    this.xhr.addEventListener('readystatechange', this.readyStateChangeHandler.bind(this));
    this.xhr.send(this.paramsBody);
};

XHR.prototype.createParamsBody = function(data) {
    var str = '';
    for (var key in data) {
        str += key + '=' + encodeURIComponent(data[key] + '') + '&';
    }
    return str;
};

XHR.prototype.readyStateChangeHandler = function () {
    if (this.xhr.readyState !== 4)  return;

    if (this.xhr.status >= 200 && this.xhr.status < 300) {
        var pageResult = JSON.parse(this.xhr.responseText);
        this.callbacks.dispatch(this.callbacks.onSuccess(pageResult));
    } else {
        var errorText = 'error: ' + (this.xhr.status ? this.xhr.statusText : 'problems with request');
        this.callbacks.dispatch(self.callbacks.onFailure(errorText));
    }
};

export default XHR;

