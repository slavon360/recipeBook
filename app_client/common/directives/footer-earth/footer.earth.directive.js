(function(){
	angular.module('myPortfolio')
	 .directive('footerEarth',footerEarth);
	 footerEarth.$inject=['earthService'];
	 function footerEarth(earthService){
	 	return{
	 		restrict:'EA',
	 		templateUrl:'/common/directives/footer-earth/footer-earth.template.html'
	 	}
	 }
})();