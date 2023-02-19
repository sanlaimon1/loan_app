import axios from "axios";
const apiRoot = 'https://api.cybdzw.com';

const objectToQueryString = (obj) => {
    return Object.keys(obj).map(key => key + '=' + obj[key]).join('&');
}

const doRequest = async (path, params, method, activeToken, onUploadProgress) => {
    const options = {
        method, headers: {}, onUploadProgress: {}
    }
    // console.log("chkparams", path, params, method, activeToken);
    if (params) {
        if (method == 'GET') {
            path += '?' + objectToQueryString(params)
            // console.log("chk options get", options)
        } else {
            options.data = params;            
        }
    }
    if (activeToken) {
        options.headers = {
            Authorization: `Bearer ${activeToken}`,
            'content-type': 'multipart/form-data',
            method: 'HEAD',
            mode: 'no-cors'
        }
        options.onUploadProgress = onUploadProgress
    }

    const httpMethods = method.toLowerCase();
    return axios({
        method: httpMethods, url: apiRoot + path, data: params, headers: {
            'Authorization': `Bearer ${activeToken}`,
            'content-type': 'multipart/form-data',
        },
        onUploadProgress: onUploadProgress
    }).then((res) => {
        if (res.status === 204) {
            return undefined;
        }
        if (res.status === 403) {
            activeToken = null;
        }
        return res;
    });
}
const get = (path, params, token) => {
    return doRequest(path, params, 'GET', token);
}

const post = (path, params, token, uploadprogress) => {
    return doRequest(path, params, 'POST', token, uploadprogress);
}

export default {
    get,
    post,
    apiRoot
}