const http = require('http')
const fs = require('fs')
const url = require('url')

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'content-type': 'text/html' })

  var pathname = url.parse(req.url).pathname

  switch (pathname) {
    case '/bundle.js':
      fs.createReadStream('bundle.js').pipe(res)
      break

    case '/style.css':
      res.writeHead(200, { 'content-type': 'text/css' })
      fs.createReadStream('style.css').pipe(res)
      break

    default:
      fs.createReadStream('index.html').pipe(res)
      break
  }
})

server.listen(process.env.PORT || 3000)
