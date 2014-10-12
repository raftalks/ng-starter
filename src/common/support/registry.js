(function() {
    'use strict';
    /* global angular:false */
    angular.module('com.registry', [])

    .service('Registry', ['RegistryCacheFactory', 'AppConfig',
        function(RegistryCacheFactory, AppConfig) {

            var RegKeyRoot  = AppConfig.get('RegistryKey');
                RegObj      = new RegistryCacheFactory(RegKeyRoot);

            return RegObj;

        }
    ])

    .factory('RegistryCacheFactory', ['$cacheFactory',
        function($cacheFactory) {

            var cachedItems = {};

            function RegistryFactoryClass(regID) {
                
                var cache;

                if (cachedItems[regID] !== undefined) {
                    cache = cachedItems[regID];
                } else {
                    cache = $cacheFactory(regID);
                    cachedItems[regID] = cache;
                }


                return {

                    put: function(key, value) {
                        return cache.put(key, value);
                    },

                    get: function(key) {
                        return cache.get(key);
                    },

                    remove: function(key) {
                        cache.remove(key);
                    },

                    empty: function() {
                        cache.removeAll();
                    },

                    destroy: function() {
                        cache.destroy();
                    }
                };

            };

            return RegistryFactoryClass;
        }
    ]);

})();
