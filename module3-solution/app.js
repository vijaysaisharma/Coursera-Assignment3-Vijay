(function(){

    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .constant('ApiBasePath', 'https://coursera-jhu-default-rtdb.firebaseio.com')
        .directive('foundItems', foundItemsDirective);

        function foundItemsDirective(){
            var ddo = {
                templateUrl: 'foundItems.html',
                scope: {
                  narrowItDown: '=myList',
                  myTitle: '@title',
                  onRemove: '&'
                }
              };
            return ddo;
        }

    NarrowItDownController.$inject = ['MenuSearchService'];

    function NarrowItDownController(MenuSearchService){
        var narrowItDown = this;

        narrowItDown.searchTerm = "";
        narrowItDown.foundItems = [];

        narrowItDown.getNarrowMenuItems = function(searchTerm){
            var promise = MenuSearchService.getMatchedMenuItems(searchTerm);
            promise.then(function(response){
                narrowItDown.foundItems = response;
            });
        };

        narrowItDown.onRemove = function(index){
            narrowItDown.foundItems.splice(index, 1);
        };
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
                var foundItems = [];

                var dataArray = Array.from(Object.values(result.data));
                
                dataArray.forEach(function(value, index){
                    var currentMenuItem = value.menu_items;
                    
                    currentMenuItem.forEach(function(menuItem, itemIndex){
                        if(menuItem.description.includes(searchTerm)){
                            foundItems.push({
                            "description": menuItem.description,
                            "name": menuItem.name,
                            "short_name": menuItem.short_name
                        });
                    };
                    });
                });

                console.log('foundItems: ', foundItems);

                // return processed items
                return foundItems;
            });
        };
    }

})();