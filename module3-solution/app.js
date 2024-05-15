(function(){

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .constant('ApiBasePath', 'https://coursera-jhu-default-rtdb.firebaseio.com');

        NarrowItDownController.$inject['MenuSearchService'];

    function NarrowItDownController(MenuSearchService){
        narrowItDown = this;
    };

    MenuSearchService.$inject['$http', 'ApiBasePath'];

    function MenuSearchService($http, ApiBasePath){
        service = this;

        service.getMatchedMenuItems = function(searchTerm){
            return $http().then(function (result) {
                // process result and only keep items that match
                var foundItems;
            
                // return processed items
                return foundItems;
            });
        };
    };

})();