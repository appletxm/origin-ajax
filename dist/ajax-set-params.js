import _JSON$stringify from 'babel-runtime/core-js/json/stringify';
import _Object$keys from 'babel-runtime/core-js/object/keys';
export function setDefault(options) {}

export function getParamsForGet(options) {
  var params = '?timer=' + new Date().getTime() + '&';
  var opP = options.params;
  var keys = _Object$keys(opP);

  if (options.headers.contentType.indexOf('application/json') >= 0) {
    params = params + 'params=' + encodeURIComponent(_JSON$stringify(opP));
  } else {
    for (var i = 0; i < keys.length; i++) {
      params += keys[i] + '=' + opP[key[i]] + (i === keys.length - 1 ? '' : '&');
    }
  }

  return params;
}

export function getParamsForPost(options) {
  var params = '';
  var opP = options.params;
  var keys = _Object$keys(opP);

  if (options.headers.contentType.indexOf('application/json') >= 0) {
    params = params + 'params=' + _JSON$stringify(opP);
  } else if (options.headers.contentType.indexOf('application/x-www-form-urlencoded') >= 0) {
    for (var i = 0; i < keys.length; i++) {
      params += keys[i] + '=' + opP[key[i]] + (i === keys.length - 1 ? '' : '&');
    }
  } else if (options.headers.contentType.indexOf('multipart/form-data') >= 0) {
    params = '';
  } else if (options.headers.contentType.indexOf('text/xml') >= 0) {
    params = '';
  }

  params = encodeURIComponent(params);

  return params;
}