(function(){
	'use strict';

	angular.module('backend.dashboard', [])

	.config(['$stateProvider', '$urlRouterProvider',
		function($stateProvider, $urlRouterProvider){

			$stateProvider.state('be.dashboard', {
                url: 'dashboard',
                // abstract: true,
                templateUrl: 'app/backend/dashboard/layout.tpl.html'
                        
            });

		}]);

})();