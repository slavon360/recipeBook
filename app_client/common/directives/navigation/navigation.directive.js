(function(){
	angular.module('myPortfolio')
	 .directive('navigation',navigation);
	 function navigation(){
	 	return{
	 		restrict:'EA',
	 		templateUrl:'/common/directives/navigation/navigation.template.html'
	 	}
	 }
})();