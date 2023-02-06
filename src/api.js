const apiRoot = 'https://www.xmnongfu.com';

const objectToQueryString = (obj) => {
    return Object.keys(obj).map(key => key + '=' + obj[key]).join('&');
}

const doRequest = async (path, params, method, activeToken) => {
    const options = { method, headers: {}, method: 'HEAD', mode: 'no-cors' }
    //method: 'HEAD', mode: 'no-cors'
    console.log("chkparams", params);
    if (params) {
        if (method == 'GET') {
            path += '?' + objectToQueryString(params)
            console.log("chk options", options)
        } else {
            options.body = params;
        }
    }
    if (activeToken) {
        options.headers = new Headers({
            Authorization: `Bearer ${activeToken}`
        })
    }
    console.log(apiRoot+path, options)
    return fetch(apiRoot + path, options).then((res) => {
        console.log(res)
        if (res.status === 204) {
            return undefined;
        }
        if (res.status === 403) {
            activeToken = null;
        }
        return res.json().then(result => {
            return result;
        })
    })
}

const get = (path, params, token) => {
    console.log(path,params,token);
    return doRequest(path, params, 'GET', token);
}

const post = (path, params, token) => {
    console.log(params);
    return doRequest(path, params, 'POST', token);
}

export default {
    get,
    post
}