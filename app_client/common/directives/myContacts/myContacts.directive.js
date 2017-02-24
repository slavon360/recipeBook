(function(){
	angular.module('myPortfolio')
	 .directive('myContacts',myContacts);

	function myContacts(){
		return{
			restrict:'EA',
			link:function(scope,element,attrs){
				element.html('<a class="facebook" href="https://www.facebook.com/viacheslav360" target="_blank"></a><a class="linkedin" href="https://www.linkedin.com/in/viacheslav-liakh-656171131" target="_blank"></a><a class="twitter" href="https://twitter.com/slavon360" target="_blank"></a>')
			}
		}
	}
})();