(function(){

	'use strict';

	/* global angular */
	angular.module('app', [
		'app.common',
		'app.dashboard'
	])

	.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
        function($stateProvider, $urlRouterProvider, $locationProvider) {

        	$locationProvider.html5Mode(true);

            $stateProvider.state('app', {
                url: '/',
                // abstract: true,
                views: {
                    '@': {
                        templateUrl: 'common/views/layouts/home.tpl.html',
                        controller: 'homeController'
                    }
                }
            });

            $urlRouterProvider.otherwise('/');
        }
    ])

	.controller('homeController', ['$scope', '$log', function($scope, $log) {

		$log.log('test');
		$scope.welcome = 'Welcome to Angularjs Starter Kit';
	}]);

})();