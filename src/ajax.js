import * as setParams from './ajax-set-params.js'
import * as setHeaders from './ajax-set-headers.js'

const defaultConfig = {
  method: 'GET',
  async: true,
  url: '',
  params: {},
  timeout: 30000,
  headers: {
    contentType: 'application/json; charset=UTF-8'
  }
}
const xhrList = {}

const Ajax = class {
  constructor () {
    this.options = defaultConfig
  }

  static setDefault(options){

  }

  mergeOptions (options) {
    options = Object.assign(this.options, options)
    return options
  }

  createXHR (options) {
    let xhr

    if (window.ActiveXObject) {
      xhr = new ActiveXObject('Microsoft.XMLHTTP')
    } else if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest()
    }

    xhr.timeout = options.timeout

    return xhr
  }

  addEventListener (xhrId, resolveCb, rejectCb) {
    let xhr = xhrList[xhrId]['xhr']
    if (!xhr) {
      return false
    }

    xhr.addEventListener('readystatechange', () => {
      // console.info(xhr.readyState, xhr.status)
      if(xhr.readyState === 4 && xhr.status === 200){
        let resObj = JSON.parse(xhr.responseText)
        this.destroyed(xhrId)
        resolveCb(resObj)
        
      } 
      // else if(xhr.readyState === 4 && xhr.status !== 200){
      //   debugger
      //   this.destroyed(xhrId)
      //   rejectCb({code: '9999', msg: 'get data failed'})
      // }
    })

    xhr.addEventListener('timeout', () => {
      debugger
      this.destroyed(xhrId)
      rejectCb({code: '10000', msg: 'request timeout'})
    })
  }

  destroyed(xhrId) {
    if(xhrList[xhrId]) {
      delete xhrList[xhrId]
    }
  }

  prepareForAjax(options){
    let xhrObj
    let xhrId
    let resolveCb
    let rejectCb
    let promise

    options = this.mergeOptions(options)
    xhrId = Math.random() + ''
    xhrList[xhrId] = {}
    xhrObj = this.createXHR(options)
    xhrList[xhrId]['options'] = options
    xhrList[xhrId]['xhrId'] = xhrId
    xhrList[xhrId]['xhr'] = xhrObj

    promise = new Promise((resolve, reject) => {
      // console.info(resolve, reject)
      rejectCb = reject
      resolveCb = resolve
    })

    return {options, xhrId, xhrObj, promise, resolveCb, rejectCb}
  }

  doAjax(options, xhrObj){
    xhrObj.open(options.method, options.url, options.async)
    setHeaders.doSetForGet(options, xhrObj);
    xhrObj.send(options.paramsStr ? options.paramsStr : '')
  }

  get (_options) {
    let params
    

    _options.method = 'GET'
    let {options, xhrObj, promise, resolveCb, rejectCb, xhrId} = this.prepareForAjax(_options)
    
    if (options.method === 'GET' && xhrObj) {
      params = setParams.getParamsForGet(options)
    }
    options.url = options.url + params
    this.addEventListener(xhrId, resolveCb, rejectCb)
    this.doAjax(options, xhrObj)

    return promise
  }

  post (_options) {
    let params

    _options.method = 'POST'
    let {options, xhrObj, promise, resolveCb, rejectCb, xhrId} = this.prepareForAjax(_options)

    if (options.method === 'POST' && xhrObj) {
      params = setParams.getParamsForPost(options)
      options.paramsStr = params
    }

    this.addEventListener(xhrId, resolveCb, rejectCb)
    this.doAjax(options, xhrObj)

    return promise
  }
}

export default Ajax
