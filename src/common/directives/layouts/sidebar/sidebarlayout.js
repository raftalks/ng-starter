(function() {

	'use strict';

	angular.module('com.sidebar.layout', [])


	.directive('sideBarLayout', ['$log', function($log) {
		
		$log.debug('loading sidebar panel');

		return {
			restrict: 'E',
			transclude: true,
			templateUrl: 'common/directives/layouts/sidebar/template.tpl.html'
		};

	}]);

})();