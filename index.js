"use strict";

const http = require('http')
const fs = require('fs')
const serve = require('serve-static')('exports')

const final = (req, res) => {
    return function() {
        res.setHeader('content-type', 'text/html')
        return fs.createReadStream(__dirname + '/exports/index.html').pipe(res)
    }
}

const favicon = (res) => {
    res.setHeader('content-type', 'image/x-icon')
    return res.end()
}

let server = http.createServer(
    (req, res) => {
        switch(req.url) {
            case '/favicon.ico':
                return favicon(res);
            default:
                return serve(req, res, final(req, res))
        }
    }
)
server.listen( 8080, 
    () => console.log( 'listening on:', server.address().port ) 
)