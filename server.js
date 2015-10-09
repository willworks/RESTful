/** 
    Document   : RESTful
    Created on : 2015.10
    Author     : Kevin Zhong
    License    : MIT
    github     : https://github.com/willworks/RESTful/ 
    Description: A RESTful web system build with node
    Copyright (c) 2015 Kevin Zhong
*/
var http = require('http'),
	fs = require('fs'),
	url = require('url'),
	querystring = require('querystring');
/**
 * req.method 请求方法
 * req.url 原始请求路径，例如/id=1&name=kevin 
 * 服务器最最核心的部分就在于req.url这部分的请求信息，再进行处理，这其中有两个重要的数据，路径和get参数
 */
http.createServer(function (req, res) { 
	/**
	 * node url模块获取url传参
	 * url.parse(req.url, true).query 参数保存为JSON格式
	 * url.parse(req.url).query 参数保存为字符串。需要配合querystring.parse(),参数保存为JSON格式

	 * 具体例子，运行服务器后浏览器打开 http://localhost:8080/user?identification=1
	 * var dataJ = url.parse(req.url, true).query;
	 * console.log(dataJ.identification); 

	 * var dataS = url.parse(req.url).query;
	 * dataS = querystring.parse(dataS);
	 * console.log(dataS.identification);
	 */
	var method = req.method; //获取请求方法
	var path = req.url; //获取原始请求路径
	var pathname = url.parse(path).pathname; // 获取不带参数的路径

	/* 测试代码，复制到控制台运行
	
	 * POST请求
	   var xmlhttp = new XMLHttpRequest();
	   xmlhttp.open('POST','http://localhost:8080',true);
	   xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	   xmlhttp.send('name=kevin&id=1');

	 * GET请求
	    var xmlhttp = new XMLHttpRequest();
		xmlhttp.open('GET','http://localhost:8080'+'?name=kevin&id=1');
		xmlhttp.send();
	*/

	switch(method){
		case 'GET'   : console.log('1'); break;
		case 'POST'  : console.log('2'); break;
		case 'PUT'   : console.log('3'); break;
		case 'DELETE': console.log('4'); break;
		default      :console.log('error');break;
	}

	//获取GET url传递的参数 通过来获取paramsGet.XXX
	var paramsGet = url.parse(req.url).query; 
		paramsGet = querystring.parse(paramsGet);

	//获取POST传递的参数 通过addListener来实现
	var paramsPost ='';  
    req.addListener('data', function(chunk){  
        paramsPost += chunk;  
    })  
    .addListener('end', function(){  
        paramsPost = querystring.parse(paramsPost);
        console.log(paramsPost);
    });

	console.log(method);
	console.log(path);
	console.log(pathname);
	console.log(paramsGet);

	res.writeHead(200, {'Content-Type': 'text/plain'}); 
	res.write('hello world!'); 
	res.end();
}).listen(8080, '127.0.0.1'); 

console.log('Server running at http://127.0.0.1:8080/');