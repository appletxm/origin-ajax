export function doSetForGet(options, xhrObj) {
  //.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
  let headers = options.headers
  
  for(let key in headers){
    let newKey
    newKey = key === 'contentType' ? 'Content-Type' : key
    xhrObj.setRequestHeader(newKey, headers[key])
  }
}

export function doSetForPost(options, xhrObj) {
  //.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
  let headers = options.headers
  
  for(let key in headers){
    let newKey
    newKey = key === 'contentType' ? 'Content-Type' : key
    xhrObj.setRequestHeader(newKey, headers[key])
  }
}
