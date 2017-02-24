var request = require('request');

var apiOptions={
	server:'http://localhost:3000'
}

function newLineCorrector(bodyArray){
	var updated=bodyArray.reduce(function(result,current){
				result.push({name:current.name,
					_id:current._id,
					createdOn:current.createdOn,
				    description:current.description.replace(/\r\n/g,'\n') })
				return result
			},[]);
	return updated
}
module.exports.recipesList=function(req,res){
	var requestOptions, path;
	path='/api/works/recipes';
	requestOptions={
		url:apiOptions.server+path,
		method:'GET',
		json:{}
	};
	request(requestOptions, function(err, response, body){
		if(response.statusCode === 200){
			var updatedBody=newLineCorrector(body);			
			renderHomepage(req,res,updatedBody)
		}
		if(err){
			console.log(error);
		}
	})
}
 var renderHomepage=function(req,res,respondedBody){
 	var message;
 	if(!(respondedBody instanceof Array)){
 		message='API lookup error';
 		respondedBody=[];
 	} else{
 		if(!respondedBody.length){
 			message='No recipes at this time. Let`s add some!'
 		}
 	}
 	res.render('recipes',{
 		title:'Recipes',
 		recipes:respondedBody,
 		url:req.originalUrl,
 		error:req.query.err
 	})
 }

 module.exports.historyList=function(req, res){
  getHistoryList(req,res,function(req,res,data){
  	renderHistoryList(req,res,data);
  })
 }

 function getHistoryList(req,res,callback){
 		var requestOptions,path;
 	path='/api/works/recipes/'+req.params.recipeid+'/history';
 	requestOptions={
 		url:apiOptions.server+path,
 		method:"GET",
 		json:{}
 	};
 	request(requestOptions,function(err, response, body){
 		if(response.statusCode === 200){
 			callback(req,res,body)
 		}else{
 			_showError(req, res, response.statusCode)
 		}
 	})
 }

 function renderHistoryList(req,res,data){
 	var message;
 	if(!data.history.length){
 		message="History is empty"
 	}
 	res.render('recipes-history',{
 		message:message,
 		recipes:data
 	})
 }

 function _showError(req,res,status){
 	var title, content;
 	if(status === 404){

 		title="Page not found";
 		content="Oh dear. Looks like we can't find this page. Sorry.";
 	}else{
 		title=status+", somethings gone wrong";
		content="Something, somewhere, has gone just a little bit wrong.";
 	}
 	res.status(status);
 	res.render('error',{
 		title:title,
 		content:content
 	});
 }
 module.exports.newRecipe=function(req,res){
 	var requestOptions, postData, path;
 	path='/api/works/newRecipe';
 	postData={
 		name:req.body.name,
 		description:req.body.description
 	};
 	requestOptions={
 		method:"POST",
 		json:postData,
 		url:apiOptions.server+path
 	}
 	if(!postData.name || !postData.description){
 		res.redirect('/works/recipe/?err=val');
 	}else{
 		request(requestOptions,function(err,response,body){
 			if(response.statusCode === 201){
 				res.redirect('/works/recipe');
 			}else if(response.statusCode === 400 && body.name && body.name === "ValidationError"){
 				res.redirect('/works/recipe/?err=val')
 			}else{
 				_showError(req, res, response.statusCode);
 			}
 		})
 	}
 }
 module.exports.editRecipe=function(req,res){
 	getRecipe(req,res,function(req,res,data){
 		renderEditPage(req,res,data)
 	})
 }
 function getRecipe(req,res,callback){
 	 	var requestOptions, path, recipeid=req.params.recipeid;
 	path='/api/works/recipes/'+recipeid+'/edit';
 	requestOptions={
 		method:"GET",
 		url:apiOptions.server+path,
 		json:{}
 	}
 	request(requestOptions,function(err,response,data){
 		if (response.statusCode === 200){
 			callback(req,res,data);
 		}else{
 			_showError(req,res,response.statusCode)
 		}
 	})
 }
 function renderEditPage(req,res,data){
 	res.render('edit-recipe',{
 		recipe:data,
 		url:req.originalUrl
 	})
 }

 module.exports.doEditRecipe=function(req,res){
 	getEditRecipe(req,res)
 }

 function getEditRecipe(req,res){
 	var requestOptions, path, postData, recipeid=req.params.recipeid;
 	path='/api/works/recipes/'+recipeid+'/edit';
 	postData={
 		name:req.body.name,
 		description:req.body.description
 	}
 	requestOptions={
 		method:"POST",
 		url:apiOptions.server+path,
 		json:postData
 	}
 	if(!postData.name || !postData.description){
 			res.redirect('/works/recipe/'+recipeid+'/edit?err=val')
 		}
 	request(requestOptions,function(err,response,body){
 		if(response.statusCode === 201){
 			res.redirect('/works/recipe')
 		}else if(response.statusCode === 400 && body.name && body.name==='ValidationError'){
 			res.redirect('/works/recipe/'+recipeid+'/edit?err=val')
 		}else{
 			_showError(req,res,response.statusCode)
 		}
 	})
 }
 module.exports.deleteItem=function(req,res){
 	
 	var requestOptions, recipeid=req.params.recipeid, recipe_id=req.params.recipe_id,
 	path='/api/works/recipes/'+recipeid+'/history/'+recipe_id;
 	requestOptions={
 		method:"DELETE",
 		url:apiOptions.server+path,
 		json:{}
 	}
 	request(requestOptions,function(err,response,body){
 		if(response.statusCode === 204){
 			res.redirect('/works/recipe/'+recipeid+'/history');
 		}else if(response.statusCode === 400 && body.name && body.name === 'ValidationError'){
 			res.redirect('/works/recipe/'+recipeid+'/history?err=val')
 		}else{
 			_showError(req,res,response.statusCode);
 		}
 	})
 }
 module.exports.deleteRecipe=function(req,res){
 	var requestOptions, recipeid=req.params.recipeid, path='/api/works/recipes/'+recipeid+'/delete';
 	requestOptions={
 		method:"DELETE",
 		url:apiOptions.server+path,
 		json:{}
 	};
 	request(requestOptions,function(err,response,body){
 		if(response.statusCode === 204){
 			res.redirect('/works/recipe');
 		}else if(response.statusCode === 400 && body.name && body.name === 'ValidationError'){
 			res.redirect('/works/recipe?err=val')
 		}else{
 			_showError(req,res,response.statusCode);
 		}
 	})
 }