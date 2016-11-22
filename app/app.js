'use strict';
angular.module('twitterClient', [
  'main',
  'pascalprecht.translate'
])

.config(function ($translateProvider) {
  $translateProvider.useSanitizeValueStrategy(null);
  $translateProvider.useStaticFilesLoader({
    prefix: 'main/assets/i18n/',
    suffix: '.json'
  });
  $translateProvider.preferredLanguage('en');
})

.run(function ($ionicPlatform, $cordovaNetwork, $log, $ionicPopup, TransferDataBetweenControllers) {
  $ionicPlatform.ready(function () {
    TransferDataBetweenControllers.setNetworkStatus($cordovaNetwork.isOffline());
  });

});
