(function(){
	angular.module('myPortfolio')
	 .controller('recipeCtrl',recipeCtrl);
	 recipeCtrl.$inject=['$scope','$location','linkRenderer','$routeParams','apiHandlerService','historyRecipeService','$timeout'];
	 
	 function recipeCtrl($scope,$location,linkRenderer,$routeParams,apiHandlerService,historyRecipeService,$timeout){
	 	console.log('recipeCtrl');
	 	$scope.dropNewRecipe=function(){
	 		if($scope.$parent.newRecipe.hasOwnProperty('name')){
	 		$scope.$parent.newRecipe={};
	 		}		
	 	}
	 	$scope.displayOldRecipe=function(recipeid){
	 		apiHandlerService.getRecipeForEditing(recipeid)
	 		 .then(function(result){
	 		 	$location.path('/works/recipes/'+recipeid+'/edit');
	 
	 		 	$scope.$parent.newRecipe=result.data;
	 		 
	 		 },function(error){
	 		 	console.log(error);
	 		 })
	 	}
	 	function chooseCurrentRecipe(){
	 		if($scope.$parent.newRecipe.hasOwnProperty('name')){
	 			return $scope.$parent.newRecipe;
	 		}
	 		return $scope.$parent.recipesList.reduce(function(result,current){
	    	
	    	if(current._id == $routeParams.recipeid){
	    		result=current;	
	    	}
	    	return result;
	    	
	        },{});

	 	}

	    $scope.currentRecipe=chooseCurrentRecipe();
	    
	    $scope.editRecipe=function(recipeid){	    	
	    	apiHandlerService.updateRecipe(recipeid,$scope.$parent.newRecipe)
	    	 .then(function(response){
	    	 	$scope.$emit('updatedRecipe',response.data);
	    	 	
	    	 	$scope.$parent.newRecipe={};
	    	 	$location.path('/works/recipes/'+recipeid);
	    	 },function(error){
	    	 	console.log(error)
	    	 })
	    }
	    $scope.deleteRecipe=function(recipeid){
	    	apiHandlerService.deleteRecipe(recipeid)
	    	 .then(function(response){
	    	 	$scope.currentRecipe.clicked=true;
	    	 	$timeout(function(){
	    	 	$scope.$emit('updateRecipesList',recipeid);
	    	 	$location.path('/works/recipes');
	    	 	},1000)
	    	 },function(error){
	    	 	console.log(error);
	    	 })
	    }

	    $scope.locationPathCollection=linkRenderer.locationPathCollection($location.path(),$scope.currentRecipe);
	    
	     $scope.$on('transferLinks',function(event,images){
	 	$scope.recipeImages=images;
	 })

	    $scope.addImgLink=function(index){
	    	if($scope.recipeImages && $scope.recipeImages.length>0){
	    	$scope.$parent.newRecipe.imgSrc=$scope.recipeImages[index];
	    	}else{
	    		console.log('imagesLinks is empty or undefined');
	    	}
	    }
	    $scope.displayHistoryList=function(recipeid){	    	
	    	apiHandlerService.getRecipeHistory(recipeid)
	    	 .then(function(response){
	    	 	$scope.$emit('currentHistoryList',response.data.history);
	    	 	$location.path('/works/recipes/'+recipeid+'/history');
	    	 },function(error){
	    	 	console.log(error);
	    	 })
	    }
	    $scope.deleteHistoryItem=function(recipe_id,recipe){
	    	recipe.clicked=true;	    	
	    	apiHandlerService.deleteHistoryItem($routeParams.recipeid,recipe_id)
	    	 .then(function(response){
	    	 	$timeout(function(){
             $scope.$parent.recipeHistoryList=historyRecipeService.updateHistoryList($scope.recipeHistoryList,recipe_id);
	    	 	},1000);
	    	 },function(error){
	    	 	console.log(error);
	    	 })
	    	 
	    }
	 }
	 
})();