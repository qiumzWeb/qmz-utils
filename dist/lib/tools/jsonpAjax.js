import { getUuid, getObjType } from './index';
export default function JsonPAjax(option) {
    return new Promise(function (resolve, reject) {
        var _a = (option || {}), url = _a.url, data = _a.data;
        if (!url)
            return reject('URL not allow empty');
        var callbackName = "CALL_" + getUuid();
        var script = document.createElement('script');
        var responseSuccess = false;
        window[callbackName] = function (res) {
            responseSuccess = true;
            if (res.success) {
                resolve(res.data);
            }
            else {
                reject(res);
            }
            script.remove();
            delete window[callbackName];
        };
        var requestUrl = url;
        if (getObjType(data) === 'Object') {
            var params_1 = '';
            Object.entries(data).forEach(function (_a, index) {
                var key = _a[0], val = _a[1];
                if (index) {
                    params_1 += "&" + key + "=" + val;
                }
                else {
                    var f = url.includes('?') ? "&" : '?';
                    params_1 += "" + f + key + "=" + val;
                }
            });
            requestUrl += params_1;
        }
        var c = requestUrl.includes('?') ? "&" : '?';
        requestUrl += c + "callback=" + callbackName;
        script.setAttribute('src', requestUrl);
        script.setAttribute('async', "true");
        script.onload = function () {
            if (!responseSuccess) {
                reject('Network Error');
            }
        };
        document.body.appendChild(script);
    });
}
//# sourceMappingURL=jsonpAjax.js.map