(function(){
	angular.module('myPortfolio')
	 .factory('factoryCities',factoryCities);
	 function factoryCities(){
  return{
  	removeList:function(cities){
  		return cities=[];
  	}
  }
}
})();