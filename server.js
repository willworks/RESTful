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
	var paramsGet = ''; // 存储GET请求数据
	var paramsPost = ''; // 存储POST传递数据

	/* 测试代码
	
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

	// 判断请求类型，分类处理
	// http只有这4种请求，其他的钧不合法，故不用default加以处理
	// 而且传输的时候，需要将JSON，也就是object转为string，用JSON.stringify()


	switch(method){
		/*start GET*/
		/**
		 * http://localhost:8080/listUsers
		 * http://localhost:8080/listUsers?id=1
		 */
		case 'GET'   :  if(pathname == '/listUsers'){
							// 获取GET url传递的参数 通过来获取paramsGet.XXX
						    paramsGet = url.parse(req.url).query; 
							paramsGet = querystring.parse(paramsGet);
							if(paramsGet.id == undefined){
								// 读取保存的全部用户
								fs.readFile( __dirname + "/" + "data/users.json", 'utf8', function (err, data) {
									res.writeHead(200, {'Content-Type': 'text/plain'});
								    res.write(data);
								    res.end();
								    console.log(method + ' all users');
								});
							}else{
								// 查询具体用户
								var id = 'user' + paramsGet.id;
								fs.readFile( __dirname + "/" + "data/users.json", 'utf8', function (err, data) {
									var user = JSON.parse(data)[id];
									user = JSON.stringify(user);
									if(user == undefined){
										res.writeHead(200, {'Content-Type': 'text/plain'});
										res.write('user does not exist!');
										res.end();
										console.log('user does not exist!');
									}else{
										res.writeHead(200, {'Content-Type': 'text/plain'});
										res.write(user);
										res.end();
										console.log(method + ' ' + user);
									}
								});
							}
						}
					    break;
		/*end GET*/


		/*start POST*/
	    /**
	     * http://localhost:8080/listUsers
	     * http://localhost:8080/listUsers?id=1
	     */
		case 'POST'  :  //获取POST传递的参数 通过addListener来实现
				        req.addListener('data', function(chunk){  
				            paramsPost += chunk;  
				        })  
				        .addListener('end', function(){  
				            paramsPost = querystring.parse(paramsPost);
				            console.log(paramsPost);
			                res.writeHead(200, {'Content-Type': 'text/plain'}); 
			            	res.write('POST'); 
			            	res.end();
				        });

					    break;
		/*end POST*/

		/*start PUT*/
		case 'PUT'   :  console.log('PUT is not ready yet!'); 
						res.writeHead(200, {'Content-Type': 'text/plain'}); 
						res.write('PUT is not ready yet!'); 
						res.end();
					    break;
		/*end PUT*/


		/*start DELETE*/
		case 'DELETE':  console.log('DELETE is not ready yet!'); 
						res.writeHead(200, {'Content-Type': 'text/plain'}); 
						res.write('DELETE is not ready yet!'); 
						res.end();
					    break;
		/*end DELETE*/
	}
	
}).listen(8080, '127.0.0.1'); 

console.log('Server running at http://127.0.0.1:8080/');