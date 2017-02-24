(function(){
	angular.module('myPortfolio')
	 .directive('techRenderer',techRenderer);
	 techRenderer.$inject=['$interval'];
	 function techRenderer($interval){

	 	function startInterval(msec, pnts, callback){
	 		var interval=msec/pnts, counterPoints=0, points=parseInt(pnts);
	 		var runInterval=$interval(function(){
	 			counterPoints+=1;
	 			callback(counterPoints);
	 			if(counterPoints === points){
	 				$interval.cancel(runInterval);
	 			}
	 		    },interval);
	 	
	 	}
	 	return{
	 		restrict:'EA',
	 		link:function(scope,element,attrs){
	 			var name=attrs.nameTech, points=attrs.points, msec=attrs.msec, tab;
	 			function setBackground(number){
	 		        if(number<20){
	 	        		return 'rgba(194, 17, 17, .8)';
	 	        	}if(number<60){
	 	        		return 'rgba(247, 228, 15, .9);';
	 	        	}else{
	 	        		return 'rgba(3, 163, 33, .8);';
	 	        	}
	 	        };
	 			startInterval(msec,points,function(counterPoints){
	 				tab=counterPoints;
	 				element.html('<span>'+' '+name+' <span class="tab-bar">'+tab+'%</span></span><div style="width:'+tab+'%;background:'+setBackground(tab)+'" class="tech-bar"></div>');
	 			});
	 			
	 		}
	 	}
	 }
})();