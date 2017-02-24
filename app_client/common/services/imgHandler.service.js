(function(){
	angular.module('myPortfolio')
	 .service('imgHandler',imgHandler);
	 imgHandler.$inject=['$timeout']
	 function imgHandler($timeout){
	 	var validImgs=[], counter=0;
	 	var linkAnalize=function(url,callback){
	 		var image = new Image();
	 		image.src=url;
	 		image.onerror=function(){
	 			var message='This url is not valide: '+url;
	 			callback(new Error(message));
	 		}
	 		image.onload=function(){
	 			callback(null,image.src);
	 		}
	 	}

	 	var imgValidate=function(scope,imgsObjs, callback){	
	 			scope.$emit('getTotalNumberOfImgsFromApi',imgsObjs.length);
	 				scope.totalImgs=imgsObjs.length;
	 		var links=imgsObjs.map(function(item,index,arr){
	 			linkAnalize(item.webformatURL,function(error,image){
	 				if(error){
	 					counter++;
	 					throw error;
	 				}
	 				counter++;
	 				scope.$emit('progressImgBar',counter);
	 				validImgs.push(image);
	 				if(counter === arr.length){	  								
	 				callback(validImgs);
	 				scope.$emit('transferLinks',validImgs);
	 				validImgs=[];
	 				counter=0;
	 				}	
	 			}) 
	 		})	
	 	}
	 	return{
	 		imgValidate:imgValidate
	 	}
	 }
})();