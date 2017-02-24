(function(){
	angular.module('myPortfolio')
	 .controller('weatherAppCtrl',weatherAppCtrl);
	 weatherAppCtrl.$inject=['$scope','$http','factoryCities'];

	 function weatherAppCtrl($scope,$http,factoryCities){
     $scope.cities=[];
     $scope.clearList=function(){
        $scope.cities=factoryCities.removeList($scope.cities);
     }
     $scope.submitForm=function(){
       $http.get('https://api.openweathermap.org/data/2.5/weather?q='+$scope.weather.city+'&units=metric&APPID=8d9223b647133c51d397626dcaa319ce')
       .then(function(response){
        console.log(response);
         $scope.cities.push(response.data);
       })
     }
    }
})();
