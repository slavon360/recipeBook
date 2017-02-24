(function(){
	angular.module('myPortfolio')
	 .service('historyRecipeService',historyRecipeService);
	 function historyRecipeService(){
	 	var updateHistoryList=function(list, recipe_id){
	 		var updated=list.reduce(function(result,current){
	    	 		current._id !== recipe_id ? result.push(current) : '';
	    	 		return result;
	    	 	},[]);
	 		return updated;
	 	}
	 	return{
	 		updateHistoryList:updateHistoryList
	 	}
	 }
})();