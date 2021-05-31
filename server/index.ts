require('../src/index');
var http = require('http');
var server = http.createServer(function (request, response) {
    response.write('Hello, My Love')
    response.end()
})
server.listen(3030)
