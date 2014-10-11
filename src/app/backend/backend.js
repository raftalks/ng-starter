(function(){
	'use strict';

	angular.module('app.backend', [
        'backend.dashboard'
    ])

	.config(['$stateProvider', '$urlRouterProvider',
		function($stateProvider, $urlRouterProvider){

			$stateProvider.state('be', {
                url: '/admin/',
                abstract: true,
                views: {
                    '@': {
                        templateUrl: 'common/views/layouts/sidebar.tpl.html',
                    },
                    'sidebar@app.be': {
                        template: '<div><w:menu ng-model="menu_links" brand="Starter Kit"></w:menu></div>'
                    }
                }
            })

	}])

    .controller('backendController', ['$scope', '$log', function($scope, $log) {

        // defne the backend menu        
        $scope.menu_links = [{label: 'home', link:'/'}, {label:'dashboard', link:'/dashboard'}];

    }]);

})();