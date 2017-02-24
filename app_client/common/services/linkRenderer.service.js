(function(){
	angular.module('myPortfolio')
	 .service('linkRenderer',linkRenderer);
	 function linkRenderer(){

	 	function finalLocations(locations,recipe){
	 		var output=locations.reduce(function(result,current){
	 			if(current.name===recipe._id){
	 				result.push({name:recipe.name,url:current.url});
	 			}else{
	 				result.push(current)
	 			}
	 			return result;
	 		},[]);
	 		return output;
	 	}

	 	var locationPathCollection=function(locationPath,recipe){
	 		var locationsArray=locationPath.split('/'),
                             n=2;
	 		while(n){
	 			n--;
	 			locationsArray.shift();
	 		}
	 		var updated=locationsArray.reduce(function(result,current){
	 			var n = locationPath.indexOf(current)+current.length;
	 			 result.push({name:current,url:locationPath.slice(0,n)})
	 			return result
	 		},[]);
	 		if(recipe!==undefined){
	 		var finalLocationsArray=finalLocations(updated,recipe);
	 		return finalLocationsArray;	
	 		}if(recipe===undefined){
	 			return updated;
	 		}
	 	}
	 	
	 	return{
	 		locationPathCollection:locationPathCollection
	 	}
	 }
})();