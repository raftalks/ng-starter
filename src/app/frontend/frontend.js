(function(){
	'use strict';

	angular.module('app.frontend', [
        'frontend.home'
    ])

	.config(['$stateProvider', '$urlRouterProvider',
		function($stateProvider, $urlRouterProvider){

			$stateProvider.state('fe', {
                abstract: true
            });

	}])

    .controller('frontendController', ['$scope', '$log', function($scope, $log) {

        // defne the backend menu        
        $scope.menu_links = [{label: 'home', link:'/'}, {label:'dashboard', link:'/dashboard'}];

    }]);

})();