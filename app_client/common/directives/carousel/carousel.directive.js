(function(){
   angular.module('myPortfolio')
      .directive('carousel', carousel);
      carousel.$inject=['$timeout'];
      function carousel($timeout) {
         return {
            restrict: 'E',
            scope: {
              works: '='
            },
            templateUrl: '/common/directives/carousel/carousel.template.html',
            link: function(scope, element) {
              $timeout(function() {
                
                $('.carousel-inner .item',element).first().addClass('active');
              });
            }
         }
      }
})();
     