(function(){
	angular.module('myPortfolio')
	 .service('pageHandlerService',pageHandlerService);
	 function pageHandlerService(){
	 	var pagesStock=[];
	 	return{
	 		pageWasVisited:function(page){
	 			var result;
	 			console.log(pagesStock);
	 			pagesStock.forEach(function(item){
	 				if(item === page){
	 					result=true;
	 				}	
	 			})
	 			return result;
	 		},
	 		includePage:function(page){
	 			if(page){
	 			pagesStock.push(page);	
	 			}	
	 		}
	 	}
	 }
})();
