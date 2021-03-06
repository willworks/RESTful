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
	path = require('path'), // path模块处理路径
	querystring = require('querystring');
/**
 * url处理具体参照 http://nodeapi.ucdok.com/#/api/url.html
 */
http.createServer(function (req, res) { 
	
	// 过滤浏览器默认favicon.ico请求
	if (req.url === '/favicon.ico'){
		return;
	}else{
		/** 
		 * node url模块获取url传参
		 * url.parse(req.url, true).query 参数保存为JSON格式
		 * url.parse(req.url).query 参数保存为字符串。需要配合querystring.parse(),参数保存为JSON格式
		 */
		var method = req.method; //获取请求方法
		var path = req.url; //获取原始请求路径，例如/user?id=1&name=kevin 
		var pathname = url.parse(path).pathname; // 获取不带参数的路径，例如/user


		// node path模块自带的pathname.split(path.sep)用于切割路径
		// 但是由于windows和*nix下，具体看http://nodeapi.ucdok.com/#/api/path.html
		/** path.sep
		 * linux上的例子:'foo/bar/baz'.split(path.sep) returns ['foo', 'bar', 'baz']
		 * Windows上的例子:'foo\\bar\\baz'.split(path.sep) returns ['foo', 'bar', 'baz']
		 */

		// 这里用pathname.split('/')来实现切割各个参数
		pathname = pathname.split('/');

		/** 处理GET DELETE 通过URL ?传值
		 * 获取GET url传递的参数 通过来获取params.XXX
		 * params = url.parse(req.url).query; 
		 * params = querystring.parse(paramsGet);
		 */
		var paramsGet = ''; // 存储GET请求数据
		var paramsDelete = ''; // 存储DELETE请求数据


		/** 获取POST PUT传递的参数 通过addListener来实现
	     * req.addListener('data', function(chunk){  
	     *     params += chunk;  
	     * })  
	     * .addListener('end', function(){	            
	     * 	fs.readFile( __dirname + "/" + "data/users.json", 'utf8', function (err, data) {
		 * 		params = querystring.parse(params);
		 * 		// JSON解析
	     * 		data = JSON.parse(data);
	     * });
		 */
		var paramsPost = ''; // 存储POST传递数据
		var paramsPut = ''; // 存储PUT请求数据


		// 判断请求类型，分类处理
		// http只有这4种请求，其他的均不合法，故不用default加以处理
		// 而且传输的时候，需要将JSON，也就是object转为string，用JSON.stringify()
		switch(method){
			/*start GET*/
			/**
			   // URL类型
			   http://localhost:8080/listUsers
			   http://localhost:8080/listUser/id

			   // AJAX GET请求
			   var xmlhttp = new XMLHttpRequest();
			   // xmlhttp.open('GET','http://localhost:8080/listUsers');
			   xmlhttp.open('GET','http://localhost:8080/listUser/1');
			   xmlhttp.send();
			 */
			case 'GET'   :  if(pathname[1] == 'listUsers'){
								if(pathname[2] === '' || pathname[2] === undefined){
									// 读取保存的全部用户
									fs.readFile( __dirname + "/" + "data/users.json", 'utf8', function (err, data) {
										res.writeHead(200, {'Content-Type': 'text/plain'});
									    res.write(data);
									    res.end();
									    console.log(method + ' all users');
									});
								}else{
									// 处理非法的URL访问
									res.writeHead(200, {'Content-Type': 'text/plain'});
									res.write('Request URL is not in RESTful style!');
									res.end();
									console.log('Request URL is not in RESTful style!');
								}
							}else{
								if(pathname[1] == 'listUser'){
									if(pathname[2] === '' || pathname[2] === undefined){
										// 处理非法的URL访问
										res.writeHead(200, {'Content-Type': 'text/plain'});
										res.write('Request URL is not in RESTful style!');
										res.end();
										console.log('Request URL is not in RESTful style!');
									}else{
										// 查询具体用户
										var id = 'user' + pathname[2];
										fs.readFile( __dirname + "/" + "data/users.json", 'utf8', function (err, data) {
											var user = JSON.parse(data)[id];
											user = JSON.stringify(user);
											if(user === undefined){
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

								}else{
									// 处理非法的URL访问
									res.writeHead(200, {'Content-Type': 'text/plain'});
									res.write('Request URL is not in RESTful style!');
									res.end();
									console.log('Request URL is not in RESTful style!');
								}
							}

						    break;
			/*end GET*/


			/*start POST*/
		    /**
		       // URL类型
		       http://localhost:8080/addUser
		    
		       // AJAX POST请求
		       var xmlhttp = new XMLHttpRequest();
		       var user = 'name=mohit&password=password4&profession=teacher&id=4';
		       xmlhttp.open('POST','http://localhost:8080/addUser',true);
		       xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		       xmlhttp.send(user)
		     */
			case 'POST'  :  if(pathname[1] == 'addUser'){
								if(pathname[2] === '' || pathname[2] === undefined){
									// 获取POST传递的参数 通过addListener来实现
							        req.addListener('data', function(chunk){  
							            paramsPost += chunk;  
							        })  
							        .addListener('end', function(){	    
						            	fs.readFile( __dirname + "/" + "data/users.json", 'utf8', function (err, data) {
						            		/** 
						            		 * 处理POST的传值
											 * 测试传值：name=mohit&password=password4&profession=teacher&id=4
											 */
					            			paramsPost = querystring.parse(paramsPost);
					            			// JSON解析
						            		data = JSON.parse(data);
						            		// 存储
						            		data['user4'] = paramsPost;
		            			            console.log(method + ' store user4' + JSON.stringify(paramsPost) + ' succefully!');
		            			            // 返回
		            		             	res.writeHead(200, {'Content-Type': 'text/plain'}); 
		            		             	data = JSON.stringify(data);
		            		            	res.write(data); 
		            		            	res.end();
						            	});
							        });
								}else{
									res.writeHead(200, {'Content-Type': 'text/plain'});
									res.write('Request URL is not in RESTful style!');
									res.end();
									console.log('Request URL is not in RESTful style!');
								}
							}else{
								res.writeHead(200, {'Content-Type': 'text/plain'});
								res.write('Request URL is not in RESTful style!');
								res.end();
								console.log('Request URL is not in RESTful style!');
							}

						    break;
			/*end POST*/

			/*start PUT*/
			case 'PUT'   :  if(pathname[1] == 'addUser'){
								// 检测是否指定具体资源
								if(pathname[2] === '' || pathname[2] === undefined){
									// 处理非法的URL访问
									res.writeHead(200, {'Content-Type': 'text/plain'});
									res.write('Request URL is not in RESTful style!');
									res.end();
									console.log('Request URL is not in RESTful style!');
								}else{
									// 获取PUT传递的参数 通过addListener来实现
							        req.addListener('data', function(chunk){  
							            paramsPut += chunk;  
							        })  
							        .addListener('end', function(){	    
						            	fs.readFile( __dirname + "/" + "data/users.json", 'utf8', function (err, data) {
						            		/** 
						            		 * 处理PUT的传值
											 * 测试传值：name=mohit&password=password4&profession=teacher&id=4
											 */
					            			paramsPut = querystring.parse(paramsPut);
					            			// JSON解析
						            		data = JSON.parse(data);
						            		// 存储
						            		var user = 'user' + pathname[2];
						            		data[user] = paramsPut;
		            			            console.log(method + ' store ' + user + JSON.stringify(paramsPut) + ' succefully!');
		            			            // 返回
		            		             	res.writeHead(200, {'Content-Type': 'text/plain'}); 
		            		             	data = JSON.stringify(data);
		            		            	res.write(data); 
		            		            	res.end();
						            	});
							        });
								}
							}else{
								// 处理非法的URL访问
								res.writeHead(200, {'Content-Type': 'text/plain'});
								res.write('Request URL is not in RESTful style!');
								res.end();
								console.log('Request URL is not in RESTful style!');
							}

						    break;
			/*end PUT*/



			/*start DELETE*/
			/**
			   // URL类型
			   http://localhost:8080/deleteUser
			   http://localhost:8080/deleteUser?id=1

			   // AJAX DELETE请求
			   var xmlhttp = new XMLHttpRequest();
			   xmlhttp.open('DELETE','http://localhost:8080/deleteUser/1');
			   xmlhttp.send();
			 */
			case 'DELETE':  if(pathname[1] == 'deleteUser'){
								// 删除前，查询具体用户是否存在
								if(pathname[2] === '' || pathname[2] === undefined){
									// 处理非法的URL访问
									res.writeHead(200, {'Content-Type': 'text/plain'});
									res.write('Request URL is not in RESTful style!');
									res.end();
									console.log('Request URL is not in RESTful style!');
								}else{
									var id = 'user' + pathname[2];
									fs.readFile( __dirname + "/" + "data/users.json", 'utf8', function (err, data) {
										var users = JSON.parse(data);
										var user = users[id];
										user = JSON.stringify(user);
										if(user === undefined){
											res.writeHead(200, {'Content-Type': 'text/plain'});
											res.write('user does not exist!');
											res.end();
											console.log('user does not exist!');
										}else{
											res.writeHead(200, {'Content-Type': 'text/plain'});
											delete users[id];
											res.write(JSON.stringify(users));
											res.end();
											console.log(method + ' ' + user);
										}
									});
								}
							}else{
								// 处理非法的URL访问
								res.writeHead(200, {'Content-Type': 'text/plain'});
								res.write('Request URL is not in RESTful style!');
								res.end();
								console.log('Request URL is not in RESTful style!');
							}

						    break;
			/*end DELETE*/
			default     :   // 处理GET POST DELETE PUT 之外的http请求类型，如TRACE HEAD等
							res.writeHead(200, {'Content-Type': 'text/plain'});
							res.write(method + ' Request is not supported yet!');
							res.end();
							console.log(method + ' Request is not supported yet!');
		}
		/*end switch*/
	}


}).listen(8080, '127.0.0.1'); 

console.log('Server running at http://127.0.0.1:8080/');