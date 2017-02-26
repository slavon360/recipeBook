(function(){
	angular.module('myPortfolio')
	 .directive('pageDisplay',pageDisplay);
	 pageDisplay.$inject=['$timeout','pageHandlerService'];
	  function pageDisplay($timeout,pageHandlerService){
	  	return {
	  		restrict:'EA',
	  		link:function(scope,element,attrs){
	  			var msec=attrs.msec, currentPage=attrs.pageName;
	  			if(pageHandlerService.pageWasVisited(currentPage)){
	  				return
	  			}
	  			pageHandlerService.includePage(currentPage);
	  			element.append('<loading class="loading-thing"><div class="loading-circle"></div><img class="loading-image" src="/images/profile.png"></loading>');
	  			 $timeout(function(){
	  			 	element.find('loading').remove();
	  			 },msec);
	  		}
	  	}
	  }
})();