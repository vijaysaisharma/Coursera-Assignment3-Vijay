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
            //console.log('response: ', response.A.menu_items); 
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

                var resultArray = [];
                var indexArray = [];
                var dataArray = Array.from(Object.values(result.data));
                
                dataArray.forEach(function(value, index){
                    var currentMenuItem = value.menu_items;
                    
                    currentMenuItem.forEach(function(menuItem, itemIndex){
                        if(menuItem.description.includes(searchTerm)){
                        resultArray.push({
                            "description": menuItem.description,
                            "name": menuItem.name,
                            "short_name": menuItem.short_name
                        });
                    };
                    });
                });

                console.log('resultArray: ', resultArray);

                // return processed items
                console.log('result.data: ', Array.from(Object.values(result.data)));
                return result.data;
            });
        };
    }

})();