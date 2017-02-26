(function(){
	angular.module('myPortfolio')
	 .controller('weatherAppCtrl',weatherAppCtrl);
	 weatherAppCtrl.$inject=['$scope','$http','factoryCities','apiHandlerService'];

	 function weatherAppCtrl($scope,$http,factoryCities,apiHandlerService){
     $scope.cities=[];
     $scope.clearList=function(){
        $scope.cities=factoryCities.removeList($scope.cities);
     }
     $scope.submitForm=function(){
      apiHandlerService.getWeatherInfo($scope.weather.city)
        .then(function(response){
        console.log(response);
         $scope.cities.push(response.data);
       },function(error){
        console.log(error);
       })
     }
    }
})();
