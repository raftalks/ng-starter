(function() {

	'use strict';

	angular.module('frontend.home', [])

	.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
        function($stateProvider, $urlRouterProvider, $locationProvider) {

            $stateProvider.state('fe.home', {
                url: '/',
                // templateUrl: 'app/home/template.tpl.html',
                // controller: 'homeController'
                views: {
                    '@': {
                        templateUrl: 'app/frontend/home/template.tpl.html',
                        controller: 'homeController'
                    }
                }
            });

        }
    ])

    .controller('homeController', ['$scope', '$log', function($scope, $log) {

		$log.log('test');
		$scope.welcome = 'Welcome to Angularjs Starter Kit';
	

	}]);
})();