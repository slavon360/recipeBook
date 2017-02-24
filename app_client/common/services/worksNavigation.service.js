(function(){
	angular.module('myPortfolio')
	 .service('worksNavigation',worksNavigation);
	 function worksNavigation(){

	 	return{
	 		currentPosition:0,
	 		next:function(workslist){
	 			if(this.currentPosition>(-(workslist.length-1))){
	 				this.currentPosition-=1;
	 			}
	 		},
	 		previous:function(workslist){
	 			if(this.currentPosition!==0){
	 				this.currentPosition+=1;
	 			}
	 		},
	 		renderWidth:function(){
	 			var width;
	 		if(window.outerWidth <= 768){
	 			width=100;
	 		}else{
	 			width=33.33;
	 		}
	 		return width;
	 		}
	 	}
	 }
})();