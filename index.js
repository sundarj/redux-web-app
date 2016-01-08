"use strict";

const http = require('http')
const fs = require('fs')
const serve = require('serve-static')('exports')
const router = require('routes')()

router.addRoute('/favicon.ico', (req, res) => {
    res.setHeader('content-type', 'image/x-icon')
    return res.end()
})

const final = (req, res) => {
    return function() {
        res.setHeader('content-type', 'text/html')
        return fs.createReadStream(__dirname + '/exports/index.html').pipe(res)
    }
}

router.addRoute('*', (req, res) => {
    return serve(req, res, final(req, res))
})

let server = http.createServer(
    (req, res) => {
        let m = router.match(req.url)
        
        if (m)
            return m.fn(req, res)
    }
)
server.listen( 8080, 
    () => console.log( 'listening on:', server.address().port ) 
)