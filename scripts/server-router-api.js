const fs = require('fs')
const path = require('path')

function getMockFiles(req, res){
  let filePath
  let file 
  let parseFile

  try {
    filePath = path.resolve(__dirname, '../mocks/' + req['baseUrl'] + req['path'] + '.json')
    file = fs.readFileSync(filePath, {encoding: 'utf-8'})
    parseFile = file ? JSON.parse(file) : {}
    parseFile.code = '200'
    parseFile.msg = 'Get data success'
  } catch(e){
    parseFile = {}
    parseFile.code = '999'
    parseFile.msg = 'Fail to get data'
  }
  parseFile = JSON.stringify(parseFile)

  res.set({
    'Content-Type': 'application/json;charset=UTF-8',
    'Content-Length': parseFile.length,
  })
  res.send(parseFile)
  // res.end()
}

function getAjaxGet (req, res) {
  let params

  params = decodeURIComponent((req['_parsedUrl']['query'].match(/params=(.+)/))[1])
  params = JSON.parse(params)
  getMockFiles(req, res)
}

function getAjaxPost(req, res) {
  let body = ''
  let params

  // console.info(req.headers)

  req.on('data', (chunk) => {
    body += chunk
  })

  req.on('end', () => {
    params = (decodeURIComponent(body)).match(/params=(.+)/)[1]
    params = JSON.parse(params)
    getMockFiles(req, res)
  })
}

function routerApi(req, res, logger){
  console.info('[http get api]', req.baseUrl, req.originalUrl)
  logger.info('[http get api]', req.baseUrl, req.originalUrl)

  // console.info(req.headers, req.method)

  if(req.method === 'GET'){
    getAjaxGet(req, res)
  } else if(req.method === 'POST') {
    getAjaxPost(req, res)
  }

  // if (next && typeof next === 'function') {
  //   next()
  // }
}

module.exports = routerApi
