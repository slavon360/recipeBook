(function(){
	angular.module('myPortfolio')
	 .directive('pageDisplay',pageDisplay);
	 pageDisplay.$inject=['$timeout'];
	  function pageDisplay($timeout){
	  	return {
	  		restrict:'EA',
	  		link:function(scope,element,attrs){
	  			var msec=attrs.msec;
	  			element.append('<loading class="loading-thing"><div class="loading-circle"></div><img class="loading-image" src="/images/profile.png"></loading>');
	  			 $timeout(function(){
	  			 	element.find('loading').remove();
	  			 },msec);
	  		}
	  	}
	  }
})();