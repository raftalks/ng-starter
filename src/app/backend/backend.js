(function(){
	'use strict';

	angular.module('app.backend', [
        'backend.dashboard',
        'backend.cms'
    ])

	.config(['$stateProvider', '$urlRouterProvider',
		function($stateProvider, $urlRouterProvider){

			$stateProvider.state('be', {
                url: '/admin/',
                abstract: true,
                views: {
                    '@': {
                        templateUrl: 'common/views/layouts/sidebar.tpl.html',
                        controller: 'backendController'
                    },
                    'sidebar@be': {
                        template: '<div><w:app-menu ng-model="menu_links"></w:app-menu></div>'
                    }
                }
            })

	}])

    .constant('backendMenuItems', [
        {
            label:'Home',
            state: 'fe.home',
            class: 'fa fa-home'
        },

        {
            label:'Dashboard',
            state: 'be.dashboard',
            class: 'fa fa-dashboard'
        },

        {
            label:'CMS',
            state: 'be.cms',
            class: 'fa fa-newspaper-o'
        }
    ])

    .controller('backendController', ['$scope', '$log', 'backendMenuItems', function($scope, $log, backendMenuItems) {

        // defne the backend menu        
        $scope.menu_links = backendMenuItems;

    }]);

})();