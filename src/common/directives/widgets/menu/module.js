(function() {

	'use strict';

	angular.module('widget.menu', [])

	.directive('wMenu', function() {

		return {
			restrict: 'E',
			template: '<ul class="sidebar-nav"><li class="sidebar-brand"><a href="#" ng-bind="brand"></a></li><li ng-repeat="item in items"><a href="#" ng-bind="item.label"></a></li></ul>',
			scope: {
				items : '=ngModel',
				brand : '@'
			}
		};
	})

	.directive('wAppMenu', function() {

		return {
			restrict: 'E',
			templateUrl: 'common/directives/widgets/menu/app-menu.tpl.html',
			scope: {
				items : '=ngModel'
			}
		};
	});

})();