(function(){
	angular.module('myPortfolio')
	 .controller('worksCtrl',worksCtrl);
	 worksCtrl.$inject=['$scope','apiHandlerService','worksNavigation'];
	 function worksCtrl($scope, apiHandlerService,worksNavigation){
//fetching works list from db
	 	getWorksList()
	 	function getWorksList(){
	 	apiHandlerService.getWorksList()
	 	 .then(function(response){
	 	 	console.log($scope.portfolio)
	 	 	$scope.portfolio.works=response.data;
	 	 },function(error){
	 	 	console.log(error)
	 	 })
	 	}

	 	$scope.myList=[{name:'Recipe Book',description:'some info-info-info-info-info-info-info-info-info-info-info-info-info-info-info-info-info-info-info-info-info',
	 	background:'url("/images/recipeBook1.png")'},
	 	               {name:'App 2',description:'some info-info-info-info-info-info-info-info'},
	 	               {name:'App 3',description:'some info-info-info-info-info-info-info-info'},
	 	               {name:'App 4',description:'some info-info-info-info-info-info-info-info'}]
//position for each work-item
	 	$scope.renderPosition=function(index){
	 		return (worksNavigation.renderWidth()*(index+worksNavigation.currentPosition))+'%';
	 	}

	 	$scope.workItemWidth=function(){
	 		return worksNavigation.renderWidth()+'%';
	 	}

	 	$scope.nextWork=function(){
	 		worksNavigation.next($scope.portfolio.works);
	 	}

	 	$scope.previousWork=function(){
	 		worksNavigation.previous($scope.portfolio.works);
	 	}
	 }
})();