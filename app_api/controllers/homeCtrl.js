var mongoose = require('mongoose');
var Pfolio = mongoose.model('Portfolio');
var portf = require('../models/portfolio');
var fs = require('fs');

function sendJsonResponse(res, status, content){
	res.status(status);
	res.json(content);
}
module.exports.getLinks=function(req,res){
	var filename=req.params.filename;
fs.readFile(filename,'utf-8',function(err,file){
	if(err){
		sendJsonResponse(res,400,err)
		return 
	}
	var output=file.split('\n');
	sendJsonResponse(res,200,output);
})
}

function showProfile(results){
	var response=[];
		results.forEach(function(item){
			response.push({name:item.name,
				position:item.position,
				photoUrl:item.photoUrl,
				works:item.works})
		})
}
module.exports.startPage=function(req,res){
	Pfolio.find({},function(err,results){
		if(err){
			sendJsonResponse(res,400,err);
			return
		}
		showProfile(results);
		sendJsonResponse(res,200,results[results.length-1]);
	})
}
module.exports.worksList=function(req,res){

	if(portf.myWorks.length>0){
		sendJsonResponse(res,200,portf.myWorks);
	}else{
		sendJsonResponse(res,404,{"message":"Works not found"});
	}
}