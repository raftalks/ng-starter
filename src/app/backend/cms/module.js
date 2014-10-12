(function() {
	'use strict';

	angular.module('backend.cms', [])

	.config(['$stateProvider', '$urlRouterProvider',
		function($stateProvider, $urlRouterProvider){

			$stateProvider.state('be.cms', {
                url: 'cms',
                templateUrl: 'app/backend/cms/layout.tpl.html'
                        
            });

		}]);

})();