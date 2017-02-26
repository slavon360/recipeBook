(function(){
	angular.module('myPortfolio')
	 .controller('mainCtrl',mainCtrl);
	 mainCtrl.$inject=['$scope','earthService','$location','apiHandlerService','$rootScope','$timeout','linkRenderer'];
	 function mainCtrl($scope,earthService,$location,apiHandlerService,$rootScope,$timeout,linkRenderer){
	 	$scope.pageState={
	 		newRecipe:false,
	 		imgGrid:false
	 	}
	 	$scope.newRecipe={};
	 	getHomePage();
	 	function getHomePage(){
	 	apiHandlerService.getHomePage()
	 	 .then(function(response){
	 	 	$scope.portfolio=response.data;
	 	 },function(error){
	 	 	console.log(error);
	 	 })	 		
	 	}

	 	getRecipesList();
	 	function getRecipesList(){
	 	apiHandlerService.getRecipesList()
	 	 .then(function(response){
	 	 	$scope.recipesList=response.data; 	
	 	 },function(error){
	 	 	console.log(error);
	 	 })	
	 	}

	 	$scope.$on('updatedRecipe',function(event,updRecipe){
	 		console.log('updated recipe:')
	 		console.log(updRecipe);
	 		var updated=$scope.recipesList.map(function(item){
	 			if(item._id === updRecipe._id){
	 				return updRecipe;
	 			}
	 			return item;
	 		})
	 		$scope.recipesList=updated;
	 		console.log($scope.recipesList)
	 	})

	 	$scope.addRecipe=function(){
	 		if(!$scope.newRecipe || !$scope.newRecipe.name || !$scope.newRecipe.description){
	 			console.log('$scope.newRecipe not defined or form not filled');
	 			return false;
	 		}
	 		apiHandlerService.newRecipe($scope.newRecipe)
	 		 .then(function(response){
	 		 	$scope.recipesList.push(response.data);
	 		 	$scope.pageState.newRecipe=!$scope.pageState.newRecipe;
	 		 	$scope.newRecipe={};
	 		 	console.log(response);
	 		 	$location.path('/works/recipes');
	 		 },function(error){
	 		 	console.log(error);
	 		 	$scope.formError="Sorry, something went wrong. Please, repeat your action, or refresh the page";
	 		 });
	 	}

	 	$scope.rotationValue=function(){
	 	return earthService.rotationValue;	
	 	}

	 	$scope.locationPathCollection=linkRenderer.locationPathCollection($location.path());
	 	console.log('mainCtrl');
        $scope.$on('dropNewRecipe',function(event,emptyobj){
        	$scope.newRecipe=emptyobj;
        })
        $scope.$on('updateRecipesList',function(event, recipeid){
        	var updated=$scope.recipesList.reduce(function(result,current){
        		current._id !== recipeid ? result.push(current) : '';
        		return result;
        	},[]);
        	$scope.recipesList=updated;
        });
        $scope.$on('currentHistoryList',function(event,list){
        	$scope.recipeHistoryList=list;
        })
        $scope.$on('getTotalNumberOfImgsFromApi',function(event,number){
	 	$scope.totalNumberOfImagesFromRespondedApi=number;
	 })
         $scope.$on('progressImgBar',function(event,counter){	    	
	    	var progrBar={
	    		total:$scope.totalNumberOfImagesFromRespondedApi,
	    		counter:counter
	    	};
	    	$scope.$broadcast('progressBarEvent',progrBar);
	    })          
	 }
})();