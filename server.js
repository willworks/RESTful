var http = require('http'),
	fs = require('fs');
/**
 * req.method 请求方法
 * req.url 原始请求路径，例如/id=1&name=kevin
 */
http.createServer(function (req, res) { 
	res.writeHead(200, {'Content-Type': 'text/plain'}); 
	res.write('hello world!'); 
	res.end();
}).listen(8080); 

console.log('Server running at http://127.0.0.1:8080/');