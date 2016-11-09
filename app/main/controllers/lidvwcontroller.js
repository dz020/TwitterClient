'use strict';
angular.module('main') //eine App == ein Module


.controller('ListItemDetailViewController', function ($scope, $window, TransferDataBetweenControllers, $log) {
    //$log.log("app data", app.data);
  $log.log('test ob uebergabe lief', TransferDataBetweenControllers.data, $scope, this);

  this.openLink = function () {

    $log.log('wurde aufgerufen', $window);

    if ($window.webview) {

      $window.webview.openWebView({
        iconColor: ' #ffff00',
        backgroundColor: '#f00000',
        isPDF: false,
        url: 'http://mwaysolutions.com',
        urlEncoding: false,
        visibleAddress: false,
        editableAddress: false,
        navigationAtTop: false,
        icons: {
          backward: true,
          forward: true,
          refresh: true
        }
      });
    }
  };


});


