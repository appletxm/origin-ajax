import _Promise from 'babel-runtime/core-js/promise';
import _Object$assign from 'babel-runtime/core-js/object/assign';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import * as setParams from './ajax-set-params.js';
import * as setHeaders from './ajax-set-headers.js';

var defaultConfig = {
  method: 'GET',
  async: true,
  url: '',
  params: {},
  timeout: 30000,
  headers: {
    contentType: 'application/json; charset=UTF-8'
  }
};
var xhrList = {};

var Ajax = function () {
  function Ajax() {
    _classCallCheck(this, Ajax);

    this.options = defaultConfig;
  }

  _createClass(Ajax, [{
    key: 'mergeOptions',
    value: function mergeOptions(options) {
      options = _Object$assign(this.options, options);
      return options;
    }
  }, {
    key: 'createXHR',
    value: function createXHR(options) {
      var xhr = void 0;

      if (window.ActiveXObject) {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
      } else if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
      }

      xhr.timeout = options.timeout;

      return xhr;
    }
  }, {
    key: 'addEventListener',
    value: function addEventListener(xhrId, resolveCb, rejectCb, options) {
      var _this = this;

      var xhr = xhrList[xhrId]['xhr'];
      if (!xhr) {
        return false;
      }

      xhr.addEventListener('readystatechange', function () {
        // console.info(xhr.readyState, xhr.status)
        if (xhr.readyState === 4 && xhr.status === 200) {
          var resObj = JSON.parse(xhr.responseText);
          _this.destroyed(xhrId);
          resolveCb(resObj);
        }
        // else if(xhr.readyState === 4 && xhr.status !== 200){
        //   this.destroyed(xhrId)
        //   rejectCb({code: '9999', msg: 'get data failed'})
        // }
      });

      xhr.addEventListener('timeout', function () {
        _this.destroyed(xhrId);
        rejectCb({ code: '10000', msg: 'request timeout' });
      });

      if (options.onProgress && typeof options.onProgress === 'function') {
        xhr.addEventListener('progress', function (e) {
          options.onProgress(e);
        });
      }
    }
  }, {
    key: 'destroyed',
    value: function destroyed(xhrId) {
      if (xhrList[xhrId]) {
        delete xhrList[xhrId];
      }
    }
  }, {
    key: 'prepareForAjax',
    value: function prepareForAjax(options) {
      var xhrObj = void 0;
      var xhrId = void 0;
      var resolveCb = void 0;
      var rejectCb = void 0;
      var promise = void 0;

      options = this.mergeOptions(options);
      xhrId = Math.random() + '';
      xhrList[xhrId] = {};
      xhrObj = this.createXHR(options);
      xhrList[xhrId]['options'] = options;
      xhrList[xhrId]['xhrId'] = xhrId;
      xhrList[xhrId]['xhr'] = xhrObj;

      promise = new _Promise(function (resolve, reject) {
        // console.info(resolve, reject)
        rejectCb = reject;
        resolveCb = resolve;
      });

      return { options: options, xhrId: xhrId, xhrObj: xhrObj, promise: promise, resolveCb: resolveCb, rejectCb: rejectCb };
    }
  }, {
    key: 'doAjax',
    value: function doAjax(options, xhrObj) {
      xhrObj.open(options.method, options.url, options.async);
      setHeaders.doSetForGet(options, xhrObj);
      xhrObj.send(options.paramsStr ? options.paramsStr : '');
    }
  }, {
    key: 'get',
    value: function get(_options) {
      var params = void 0;

      _options.method = 'GET';

      var _prepareForAjax = this.prepareForAjax(_options),
          options = _prepareForAjax.options,
          xhrObj = _prepareForAjax.xhrObj,
          promise = _prepareForAjax.promise,
          resolveCb = _prepareForAjax.resolveCb,
          rejectCb = _prepareForAjax.rejectCb,
          xhrId = _prepareForAjax.xhrId;

      if (options.method === 'GET' && xhrObj) {
        params = setParams.getParamsForGet(options);
      }
      options.url = options.url + params;
      this.addEventListener(xhrId, resolveCb, rejectCb, options);
      this.doAjax(options, xhrObj);

      return promise;
    }
  }, {
    key: 'post',
    value: function post(_options) {
      var params = void 0;

      _options.method = 'POST';

      var _prepareForAjax2 = this.prepareForAjax(_options),
          options = _prepareForAjax2.options,
          xhrObj = _prepareForAjax2.xhrObj,
          promise = _prepareForAjax2.promise,
          resolveCb = _prepareForAjax2.resolveCb,
          rejectCb = _prepareForAjax2.rejectCb,
          xhrId = _prepareForAjax2.xhrId;

      if (options.method === 'POST' && xhrObj) {
        params = setParams.getParamsForPost(options);
        options.paramsStr = params;
      }

      this.addEventListener(xhrId, resolveCb, rejectCb, options);
      this.doAjax(options, xhrObj);

      return promise;
    }
  }], [{
    key: 'setDefault',
    value: function setDefault(options) {}
  }]);

  return Ajax;
}();

export default Ajax;