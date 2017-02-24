(function(){
	angular.module('myPortfolio')
	 .service('earthService',earthService);
	 function earthService(){
	 	

	 	return{
	 		rotationValue:0,
	 		changeRotation:function(){
	 		if (this.rotationValue<180){
	 			return this.rotationValue+=180;
	 		}else{
	 			return this.rotationValue=0
	 		}}
	 	}
	 
	 }
})();