/**
 * List Posts View
 */
ngWP.app.controller('productView', ['$scope', '$http', '$stateParams', 'Products', 'localStorageService', function( $scope, $http, $stateParams, Products, LocalPosts, localStorageService ){
    /**
     * Set a controller wide CPT
     * @type {string}
     */

    $scope.posts = [];
    $scope.next_page = 2;
    Products.query({per_page: 15, post_type: $stateParams.post_type, sub_product: $stateParams.sub_product}, function(res){
        $scope.total_posts = res.total_posts;
        var arr = [];
        _.forEach(res, function(e, k) {
            $scope.posts.push(e);
        });
        $scope.pagination = {
            current: 1
        };
    });

    /**
     * Page Change
     * Find total pages, if on last page, query next page
     * Next page query is next 3 pages
     * @param newPage
     */
    $scope.pageChanged = function( newPage ) {
        /**
         * How many pages based on current amount of posts
         * @type {number}
         */
        $scope.total_current_pages = $scope.posts.length / ngWP.config.posts_per_page;
        /**
         * How many total available pages
         * @type {number}
         */
        $scope.total_available_pages = $scope.total_posts / ngWP.config.posts_per_page;

        if (newPage == $scope.total_current_pages && $scope.total_current_pages < $scope.total_available_pages ) {
            LocalPosts.getPage({page: $scope.next_page, per_page: ngWP.config.posts_per_page * 3}).then(function (new_posts) {
                angular.forEach(new_posts, function (value, key) {
                    $scope.posts.push(value);
                });
            });
            $scope.next_page++;
        };
    };
}]);