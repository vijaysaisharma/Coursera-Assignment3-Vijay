(function(){

    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .constant('ApiBasePath', 'https://coursera-jhu-default-rtdb.firebaseio.com')
        .directive('foundItemsDirective', foundItemsDirective);

        function foundItemsDirective(){
            var ddo = {
                templateUrl: 'foundItems.html',
                scope: {
                  items: '<',
                  myTitle: '@title',
                  onRemove: '&'
                },
                controller: NarrowItDownController,
                controllerAs: 'narrowCtrl',
                bindToController: true
              };
            return ddo;
        }

    NarrowItDownController.$inject = ['MenuSearchService'];

    function NarrowItDownController(MenuSearchService){
        var narrowItDown = this;

        var promise = MenuSearchService.getMatchedMenuItems("tofu");
        promise.then(function(response){
            console.log('response: ', response); 
        });
    }

    MenuSearchService.$inject = ['$http', 'ApiBasePath'];

    function MenuSearchService($http, ApiBasePath){
        var service = this;

        service.getMatchedMenuItems = function(searchTerm){
            return $http({
                method: "GET",
                url: (ApiBasePath + "/menu_items.json")
            }).then(function (result) {
                // process result and only keep items that match
                var foundItems;
                
                // return processed items
                return result.data;
            });
        };
    }

})();