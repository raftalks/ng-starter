(function(){

	'use strict';

	/* global angular */
	angular.module('app', [
		'app.common',
        'app.frontend',
		'app.backend'
	])

	.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', 'appConfigProvider',
        function($stateProvider, $urlRouterProvider, $locationProvider, appConfigProvider) {

            /*
            Application Configuration Provider is used to set config keys used throughout the application.
            This works as a global memory space for the application on runtime.
            Feel free to set your own config values here.
            */
            appConfigProvider.set('Server', 'http://localhost');    // API SERVER FOR REST CALLS
            appConfigProvider.set('RegistryKey', 'Registry');       // REGISTRY KEY IDENTIFIER
            appConfigProvider.set('AuthSessionId', 'AuthSession');  // AUTH SESSION KEY IDENTIFIER
            appConfigProvider.set('SessionID', 'AppSession');       // APP SESSION KEY IDENTIFIER

            // Any custom Configurations that you like to add here should follow under this line.

            // End of custom configs.


            /*
            Enabling this feature will remove the hash tag from the URL to make it work in modern browsers. However
            this is still on experimental stage and is not recommended for production yet. Enabling this may also require
            setting some sort of URL rewriting when the same URL is requested directly on the browser.
            */
        	$locationProvider.html5Mode(false);


            /*
            Here, we use stateProvider to set the base state of the app which is an abstract state that other states will extend from.
            Do not modify this unless you know what you are doing here.
            */
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