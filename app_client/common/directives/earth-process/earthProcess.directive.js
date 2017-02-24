(function(){
	angular.module('myPortfolio')
	 .directive('earthProcess',earthProcess);
	 earthProcess.$inject=['earthService','$location','$timeout','$rootScope'];
	 function earthProcess(earthService,$location,$timeout,$rootScope){
	 	return{
	 		restrict:"EA",
	 		link:function(scope,elem,attrs){
	 				scope.$on('$routeChangeSuccess', function(event,next,current){
	 					if($location.path() === attrs.href){
	 					elem.css('color','white');
	 				}else{
	 					elem.css('color','');
	 				}	 				
	 			});
	 			elem.bind('click',function(){
	 			scope.$apply(function(){
	 				earthService.changeRotation();
	 			})	 				
	 						
	 			});
	 			elem.bind('mouseover', function(){
	 				elem.css('cursor','pointer');
	 			});
	 		}
	 	}
	 }
})();