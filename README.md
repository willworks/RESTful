# RESTful
A RESTful web system build with node

### node获取url数据

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

		var http = require('http'),
			fs = require('fs'),
			url = require('url'),
			querystring = require('querystring');

		http.createServer(function (req, res) { 

			//获取请求方法
			var method = req.method; 

			//获取原始请求路径
			var path = req.url; 

			// 获取不带参数的路径
			var pathname = url.parse(path).pathname; 

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

		}).listen(8080, '127.0.0.1'); 

		console.log('Server running at http://127.0.0.1:8080/');