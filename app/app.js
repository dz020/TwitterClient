'use strict';
angular.module('twitterClient', [
  // load your modules here
  'main', // starting with the main module
])

.run(function ($ionicPlatform, $cordovaNetwork, $log) {
  $ionicPlatform.ready(function () {
    $log.log('zeig mir navigator', $cordovaNetwork.isOffline());
  });

});
