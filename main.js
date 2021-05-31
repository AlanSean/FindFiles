let net = require('net');
require('./test/index.js');
// 创建一个net服务器
const server = net.createServer();

// 监听8080端口
server.listen(8080);

// 监听回调函数
server.on('listening', () => {
    console.log('listening')
});