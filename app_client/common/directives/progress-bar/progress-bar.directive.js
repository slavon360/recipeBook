(function(){
	angular.module('myPortfolio')
	 .directive('progressBar',progressBar);
	 function progressBar(){
	 	var widthSetter=function(progrBar){
	 		var result=(100/progrBar.total)*progrBar.counter;
	 		return result+'%';
	 	}
	 	return{
	 		restrict:'EA',
	 		link:function(scope,element,attrs){
	 			element.append('<div class="progress-img-bar-child"></div>');
	 			scope.$on('progressBarEvent',function(event,progrBar){
	 				element.children().css('width',widthSetter(progrBar));
	 			})
	 		}
	 	}
	 }
})();