(function(){
	angular.module('myPortfolio')
	 .directive('newRecipe',newRecipe);
	 newRecipe.$inject=['$compile'];
	 function newRecipe($compile){
	    //var myTemplate='<div class="general-layout-app newRecipe" ><section class="navigation-links"><a href="/works/recipeBook"><i class="fa fa-home" style="font-size:36px;"></i></a><div ng-repeat="link in locationPathCollection">/<a href="{{link.url}}">{{link.name}}</a></div></section><section class="creation-field"><form name="recipe" role="form"><div class="creation-field-title">Title <input type="text" ng-model="newRecipe.name" required="required" name="recipeName"></div><div class="creation-field-text"><div>Text<span style="visibility:hidden;">e</span></div><textarea rows="4" ng-model="newRecipe.description" required="required" name="recipeDescription"></textarea></div><div class="creation-field-photo"><button ng-click="addPhoto()">Add photo</button><div class="button-wrapper"><button type="submit" ng-click="addRecipe()">SAVE</button></div></div></form></section></div>'
        var myTemplate='<ng-include src="\'/common/directives/new-recipe/newRecipe.html\'"></ng-include>';
        var renderTemplate=function(scope){
        	if(scope.pageState.newRecipe){
        		scope.$emit('dropNewRecipe',{});
        		return '<ng-include src="\'/views/works/recipeBook/mainPage.html\'"></ng-include>';
        	}
        	return '<ng-include src="\'/common/directives/new-recipe/newRecipe.html\'"></ng-include>';
        }
	 	return{
	 		link:function(scope,elem,attrs){
	 			elem.on('click',function(){
	 				scope.$apply(function(){
	 					var content=$compile(renderTemplate(scope))(scope,function(_elem,_scope){

	 						elem.parent().parent().replaceWith(_elem);
	 						scope.pageState.newRecipe=!scope.pageState.newRecipe;
	 					});
	 					
	 				})
	 			})
	 		},
	 		restrict:'EA'
	 	}
	 }
})();