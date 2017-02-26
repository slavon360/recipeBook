(function(){
	angular.module('myPortfolio')
	 .controller('recipesCtrl',recipesCtrl);
	 recipesCtrl.$inject=['$scope','apiHandlerService','$rootScope','$location','linkRenderer','$timeout'];	 
	 function recipesCtrl($scope,apiHandlerService,$rootScope,$location,linkRenderer,$timeout){

	 	console.log('recipesCtrl')
	 $scope.$on('transferLinks',function(event,images){
	 	$scope.recipeImages=images;
	 });	

	    $scope.addImgLink=function(index){
	    	if($scope.recipeImages && $scope.recipeImages.length>0){
	    	$scope.$parent.newRecipe.imgSrc=$scope.recipeImages[index];
	    	}else{
	    		console.log('imagesLinks is empty or undefined');
	    	}
	    }
	    
	 	$scope.locationPathCollection=linkRenderer.locationPathCollection($location.path());
	 }
})();