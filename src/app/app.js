(function(){

	'use strict';

	/* global angular */
	angular.module('app', [
		'app.common',
        'app.home',
		'app.dashboard'
	])

	.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
        function($stateProvider, $urlRouterProvider, $locationProvider) {

        	$locationProvider.html5Mode(true);

            $stateProvider.state('app', {
                abstract: true,
                views: {
                    '@': {
                        templateUrl: 'common/views/layouts/root.tpl.html'
                    }
                }
            });

            $urlRouterProvider.otherwise('/');
        }
    ]);

})();