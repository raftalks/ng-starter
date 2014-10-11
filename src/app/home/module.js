(function() {

	'use strict';

	angular.module('app.home', [])

	.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
        function($stateProvider, $urlRouterProvider, $locationProvider) {

            $stateProvider.state('app.home', {
                url: '/',
                // templateUrl: 'app/home/template.tpl.html',
                // controller: 'homeController'
                views: {
                    '': {
                        templateUrl: 'app/home/template.tpl.html',
                        controller: 'homeController'
                    },
                    'sidebar@app.home': {
                        template: '<div><w:menu ng-model="menu_links" brand="Starter Kit"></w:menu></div>'
                    }
                }
            });

        }
    ])

    .controller('homeController', ['$scope', '$log', function($scope, $log) {

		$log.log('test');
		$scope.welcome = 'Welcome to Angularjs Starter Kit';
		
        $scope.menu_links = [{label: 'home', link:'/'}, {label:'dashboard', link:'/dashboard'}];

	}]);
})();