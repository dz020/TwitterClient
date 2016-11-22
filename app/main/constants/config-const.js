'use strict';
angular.module('main')
.constant('Config', {
  // gulp environment: injects environment vars
  ENV: {
    /*inject-env*/
    'SERVER_URL': 'https://DEVSERVER/api',
    'SOME_OTHER_URL': '/postman-proxy',
    'API_BASE_URL': 'https://api.twitter.com/',
    'API_SEARCH_URL': '1.1/search/tweets.json',
    'CONSUMER_KEY': 'JLecUmd1bXGJbQHhP3W9UD9uN',
    'CONSUMER_SECRET': 'ckJUEow7KwpOjv6rQ5wajVcIFq7YI2uTjfr5s138lB091vAfWN',
    'DEFAULT_SEARCHTERM': 'MiaSanMia',
    'AUTH_TYPE_FOR_URL': 'oauth2/token'
    /*endinject*/
  },
  // gulp build-vars: injects build vars
  BUILD: {
    /*inject-build*/
    /*endinject*/
  },
});
