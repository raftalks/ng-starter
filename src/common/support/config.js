(function() {

	'use strict';

	angular.module('com.config', [])

	/**
     * Application Config Service Provider
     * @return {object}
     */
    .provider('appConfig', function appConfigProvider() {

        this.Data = {};

        this.set = function(key, value) {
            this.Data[key] = value;
        };


        this.$get = ['$rootScope',
            function($rootScope) {

                var ConfigRoot = $rootScope.$new();
                ConfigRoot.data = this.Data;

                return {
                    get: function(key) {
                        return ConfigRoot.data[key];
                    }
                };

            }
        ];
    });

})();