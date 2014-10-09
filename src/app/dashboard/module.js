(function(){
	'use strict';

	angular.module('app.dashboard', [])

	.config(['$stateProvider', '$urlRouterProvider',
		function($stateProvider, $urlRouterProvider){

			$stateProvider.state('app.dashboard', {
                url: 'dashboard',
                // abstract: true,
                views: {
                    '@': {
                        templateUrl: 'app/dashboard/layout.tpl.html',
                        //controller: 'dashboardController'
                    }
                }
            });

		}]);

})();