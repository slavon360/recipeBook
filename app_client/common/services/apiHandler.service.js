(function(){
	angular.module('myPortfolio')
	 .service('apiHandlerService',apiHandlerService);
	 apiHandlerService.$inject=['$http','historyRecipeService'];
	 function apiHandlerService($http,historyRecipeService){
	 	var cx = '011077741888233176997:of7fjkpolfw',
	 	    key = 'AIzaSyDLD44qvwYnkayTY-8iuwDV9M1J5r4NF0M',
	 	    pixabayKey='4633909-917c4f4afbf27eecf77953c87',
	 	    corsHeroku='https://cors-anywhere.herokuapp.com/';
	 	    
	 	var getHomePage=function(){
	 		return $http.get('/api');
	 	}
	 	var getWorksList=function(){
	 		return $http.get('/api/works');
	 	}
	 	var getRecipesList=function(){
	 		return $http.get('/api/works/recipes');
	 	}
	 	var newRecipe=function(data){
	 		return $http.post('/api/works/newRecipe',data);
	 	}
	 	var getImages=function(image){
	 		return $http.get('https://www.googleapis.com/customsearch/v1?key='+key+'&cx='+cx+'&q='+image+'&num=10&start=2&searchType=image&alt=json');
	 	}
	 	var getImagesFromPixabay=function(imageName){
	 		return $http.get('https://pixabay.com/api/?key='+pixabayKey+'&q='+imageName+'&per_page=40');
	 	}
	 	var linksFromComp=function(filename){
	 		return $http.get('/api/links/'+filename);
	 	}
	 	var getRecipeForEditing=function(recipeid){
	 		return $http.get('/api/works/recipes/'+recipeid+'/edit');
	 	}
	 	var updateRecipe=function(recipeid,newRecipe){	 		
	 		return $http.post('/api/works/recipes/'+recipeid+'/edit', newRecipe);
	 	}
	 	var deleteRecipe=function(recipeid){
	 		return $http.delete('/api/works/recipes/'+recipeid+'/delete');
	 	}
	 	var getRecipeHistory=function(recipeid){
	 		return $http.get('/api/works/recipes/'+recipeid+'/history');
	 	}
	 	var deleteHistoryItem=function(recipeid,recipe_id){
	 		return $http.delete('/api/works/recipes/'+recipeid+'/history/'+recipe_id);
	 	}
	 	var getWeatherInfo=function(city){
	 		return $http.get(corsHeroku+'http://api.openweathermap.org/data/2.5/weather?q='+city+'&units=metric&APPID=8d9223b647133c51d397626dcaa319ce')
	 	}
	 	return{
	 		getWorksList:getWorksList,
	 		getHomePage:getHomePage,
	 		getRecipesList:getRecipesList,
	 		newRecipe:newRecipe,
	 		getImages:getImages,
	 		getImagesFromPixabay:getImagesFromPixabay,
	 		linksFromComp:linksFromComp,
	 		getRecipeForEditing:getRecipeForEditing,
	 		updateRecipe:updateRecipe,
	 		deleteRecipe:deleteRecipe,
	 		getRecipeHistory:getRecipeHistory,
	 		deleteHistoryItem:deleteHistoryItem,
	 		getWeatherInfo:getWeatherInfo
	 	}
	 }
})();