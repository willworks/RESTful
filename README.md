# RESTful
A RESTful web system build with node

### node获取url数据

		/* 测试代码

		 * POST请求
		   var xmlhttp = new XMLHttpRequest();
		   var user = 'name=mohit&password=password4&profession=teacher&id=4';
		   xmlhttp.open('POST','http://localhost:8080/addUser',true);
		   xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		   xmlhttp.send(user)

		 * GET请求
		    var xmlhttp = new XMLHttpRequest();
		    xmlhttp.open('GET','http://localhost:8080/listUsers'+'?id=1');
		    xmlhttp.send();

		 * PUT请求
		 	用于增加数据，但是具体未实现
		 	var xmlhttp = new XMLHttpRequest();
		 	xmlhttp.open('PUT','http://localhost:8080/listUsers'+'?id=1');
		 	xmlhttp.send();

	     * DELETE请求
	        var xmlhttp = new XMLHttpRequest();
	        xmlhttp.open('DELETE','http://localhost:8080/deleteUser'+'?id=1');
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

			//获取GET/PUT/DELETE url传递的参数 通过来获取params.XXX
			var params = url.parse(req.url).query; 
				params = querystring.parse(params);

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

### RESTful API列表

<table style="margin:0 auto"> 
	<tbody>
		<tr>
			<th>序号</th>
			<th>URI</th>
			<th>HTTP 方法</th>
			<th>发送内容</th>
			<th>结果</th> 
		</tr>

		<tr>
			<td>1</td>
			<td>listUsers</td>
			<td>GET</td>
			<td>空</td>
			<td>显示所有用户列表</td> 
		</tr>

		<tr>
			<td>2</td>
			<td>addUser</td>
			<td>POST</td>
			<td>JSON 字符串</td>
			<td>添加新用户</td> 
		</tr>

		<tr>
			<td>3</td>
			<td>deleteUser?id=</td>
			<td>DELETE</td>
			<td>空</td>
			<td>删除用户</td> 
		</tr>

		<tr>
			<td>4</td>
			<td>listUsers?id=</td>
			<td>GET</td>
			<td>空</td>
			<td>显示用户详细信息</td> 
		</tr>
	</tbody>
</table>