var request = require('request');

var apiOptions={
	server:'http://localhost:3000'
}

module.exports.startPage=function(req,res){
	var requestOptions, path='/api';
	requestOptions={
		method:"GET",
		url:apiOptions.server+path,
		json:{}
	}
	request(requestOptions,function(err, response, body){
		if(response.statusCode === 200){
			renderHomepage(req,res,body)
		}
		if(err){
			console.log(err)
		}
	})
}

function renderHomepage(req,res,body){
	res.render('homepage',{
		name:body.name,
		position:body.position,
		photoUrl:body.photoUrl,
		works:body.works,
		err:req.query.err
	})
}
module.exports.worksList=function(req,res){
	var requestOptions, path='/api/works';
	requestOptions={
		method:"GET",
		url:apiOptions.server+path,
		json:{}
	}
	request(requestOptions,function(err,response,body){
		if(response.statusCode === 200){
			res.render('works',{
				works:body
			})
		}else{
			if(err){
				console.log(err);
				return
			}
			console.log(response.statusCode);
		}
	})
}