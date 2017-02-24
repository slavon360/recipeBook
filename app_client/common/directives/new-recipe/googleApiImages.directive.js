(function(){
	angular.module('myPortfolio')
	 .directive('chooseImages',chooseImages);
	 chooseImages.$inject=['apiHandlerService','$compile','imgHandler','$timeout'];
	 function chooseImages(apiHandlerService,$compile,imgHandler,$timeout){
	 	var template='<ng-include src="\'/common/directives/new-recipe/searchEngine.template.html\'"></ng-include>',
	 	    prevNameOfRecipe;
	 	
	 	return{
	 		restrict:'EA',
	 		link:function(scope,elem,attrs){
	 			elem.on('click',function(){
	 				
	 				if(scope.recipeImages === undefined || scope.newRecipe.name !== prevNameOfRecipe){
	 				            scope.$apply(function(){
	 				        	scope.recipeImages=[];
	 				        })
	 				scope.totalImgs=true;
	 				apiHandlerService.getImagesFromPixabay(scope.newRecipe.name)
	 		             .then(function(response){
	 		             	console.log(response); 		             	   		 		             	
                          imgHandler.imgValidate(scope,response.data.hits,function(images){
                          	scope.$apply(function(){
                          		scope.recipeImages=images;
                          	})
                          });                                    
                          prevNameOfRecipe=scope.newRecipe.name;
	 		             },function(error){
	 		             	console.log(error);
	 		             })			
	 				}
	 				scope.$apply(function(){
	 					var content=$compile(template)(scope,function(_elem,_scope){
	 						if(!scope.pageState.imgGrid){
	 							elem.append(_elem);
	 							scope.pageState.imgGrid=!scope.pageState.imgGrid;
	 						}else{
	 							elem[0].querySelector('.images-grid-wrapper1').remove();
	 							scope.pageState.imgGrid=!scope.pageState.imgGrid;
	 						}
	 					})
	 				})
	 			})
	 		}
	 	}
	 }
})();