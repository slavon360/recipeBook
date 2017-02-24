var mongoose = require('mongoose');
var Rec = mongoose.model('Recipe');

function sendJsonResponse(res, status, content){
	res.status(status);
	res.json(content);
}

module.exports.recipesList=function(req, res){
	Rec.find({},function(err,results){
		if(err){
			sendJsonResponse(res, 404, err)
		} else{
			showList(req,res,results);
		}
		
	})
}
function showList(req,res,results){
	var recipes=[];
			results.forEach(function(doc){
					recipes.push({
					name:doc.name,
					description:doc.description,
					_id:doc._id,
					createdOn:doc.createdOn,
					imgSrc:doc.imgSrc
				})	
			})
			sendJsonResponse(res,200,recipes);
				
				}

module.exports.historyRecipe=function(req,res){
	if(req.params && req.params.recipeid){
		Rec
		 .findById(req.params.recipeid)
		 .exec(function(err,recipe){
		 	if(err){
		 		sendJsonResponse(res,400,err);
		 	}else{
		 		showHistory(req,res,recipe);
		 	}
		 })
	} else{
		sendJsonResponse(res,404,{"message":"Not found recipeid required"})
	}
}
function showHistory(req, res, recipe){
	var answer={
		history:[]
	}
	if(!recipe){
		sendJsonResponse(res,404,{"message":"Recipes not found"})
	}else{
		answer._id=recipe._id;
		recipe.history.forEach(function(item){
			answer.history.push(item)
		});
		
		sendJsonResponse(res,200,answer);
	}
}

module.exports.newRecipe=function(req,res){
	console.log('req body: ');
	console.log(req.body)
	Rec.create({
		name:req.body.name,
		description:req.body.description,
		imgSrc:req.body.imgSrc
	},function(err,doc){
		if (err) {
			sendJsonResponse(res, 400, err);
		}else{
			sendJsonResponse(res, 201, doc);
		}
	})
}
module.exports.editRecipe=function(req,res){
	if(req.params && req.params.recipeid){
	 Rec
	  .findById(req.params.recipeid)
	  .exec(function(err,data){
	  	if(err){
	  		sendJsonResponse(res,400,err)
	  	}else{
	  		sendJsonResponse(res,200,data)
	  	}
	  })	
	}else{
		sendJsonResponse(res,404,{"message":"Not found, recipeid is required"})
	}	
}
module.exports.doEditRecipe=function(req,res){
	if(req.params && req.params.recipeid){
		Rec
		 .findById(req.params.recipeid)
		 .exec(function(err,recipe){

		 	if(err){
		 		sendJsonResponse(res,400,err);
		 	}else{
		 		var newRecipe={
		 			name:req.body.name,
		 			description:req.body.description,
		 			imgSrc:req.body.imgSrc
		 		}
		 		
		 		updateRecipe(req,res,recipe,newRecipe)
		 	}
		 })
	}else{
		sendJsonResponse(res,404,{"message":"Not found, recipeid is required"})
	}
}

function updateRecipe(req,res,recipe,newRecipe){
	if(!recipe){
		sendJsonResponse(req,404,{"message":"No recipes has been found"})
	}else{
		if(!(recipe.history instanceof Array)){
		recipe.history=[];	
		}
		if(!recipe.history.length){
			recipe.history.push(
				{_id:recipe._id,
					name:recipe.name,
					description:recipe.description,
					createdOn:recipe.createdOn})
		}
		recipe.name=newRecipe.name;
		recipe.createdOn=Date.now();
		recipe.description=newRecipe.description;
		recipe.imgSrc=newRecipe.imgSrc;
		recipe.history.push(newRecipe);
		newRecipe.createdOn=recipe.createdOn;
		newRecipe._id=recipe._id;
		recipe.save(function(err,recipe){
			if(err){
				sendJsonResponse(res,400,err);
			}else{
				sendJsonResponse(res,201,newRecipe)
			}
		})
	}
}

module.exports.deleteItem=function(req,res){
	
	if(!req.params.recipeid && req.params.recipe_id){
		sendJsonResponse(res,404,{"message":"recipeid and recipedate both required"});
		return;
	}
	Rec
	 .findById(req.params.recipeid)
	 .select('history')
	 .exec(function(err,recipe){
	 	if(!recipe){
	 		sendJsonResponse(res,404,{"message":"recipe not found"});
	 		return
	 	}else if(err){
	 		sendJsonResponse(res,400,err);
	 		return
	 	}if(recipe.history && recipe.history.length>0){
	 		if(!recipe.history.id(req.params.recipe_id)){
	 			sendJsonResponse(res,404,{"message":"history item not found"})
	 		}else{
	 			recipe.history.id(req.params.recipe_id).remove();
	 			recipe.save(function(err){
	 				if(err){
	 					sendJsonResponse(res,400,err);
	 				}else{
	 					sendJsonResponse(res,204,null)
	 				}
	 			})
	 		}
	 	}else{
	 		sendJsonResponse(res,404,{"message":"history is empty"})
	 	}
	 })
}
module.exports.deleteRecipe=function(req,res){
	if(!req.params.recipeid){
		sendJsonResponse(res,404,{"message":"recipeid is required"});
		return
	}
	Rec 
	 .findByIdAndRemove(req.params.recipeid)
	 .exec(function(err,recipe){
	 	if(!recipe){
	 		sendJsonResponse(res,404,{"message":"recipe not found"});
	 		return
	 	}else if(err){
	 		sendJsonResponse(res,400,err);
	 		return
	 	}
	 	sendJsonResponse(res,204,null);
	 })
}