'use strict';
var app = angular.module('main') //eine App == ein Module


.controller('ListItemDetailViewController', function ($scope, $window, TransferDataBetweenControllers) {
	//console.log("app data", app.data);
  console.log('test ob uebergabe lief', TransferDataBetweenControllers.data, $scope, this);

  this.openLink = function () {

    console.log('wurde aufgerufen', $window);

    if ($window.webview) {
      $window.webview.openWebView(success, failure, {
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


