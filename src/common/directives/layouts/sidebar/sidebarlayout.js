(function() {

	'use strict';

	angular.module('com.sidebar.layout', [])


	.directive('sideBarLayout', ['$log', function($log) {
		
		$log.debug('loading sidebar panel');

		return {
			restrict: 'E',
			transclude: true,
			replace: true,
			templateUrl: 'common/directives/layouts/sidebar/template.tpl.html',
			link: function(scope) {

				scope.wrapper_toggle = false;

				scope.toggleMenu = function()
				{
					scope.wrapper_toggle = !scope.wrapper_toggle;

					console.log('toggle', scope.wrapper_toggle);
				}
			}
		};

	}]);

})();