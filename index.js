"use strict";

const http = require('http')
const fs = require('fs')
const ecstatic = require('ecstatic')(__dirname + '/exports')
const router = require('routes')()

const st = (src) => fs.createReadStream(__dirname + '/exports' + src)

router.addRoute('/use/*', (req, res) => ecstatic(req, res))
router.addRoute('/views/*', (req, res) => ecstatic(req, res))

router.addRoute('*', (req, res) => {
    res.setHeader('content-type', 'text/html')
    return st('/index.html').pipe(res)
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