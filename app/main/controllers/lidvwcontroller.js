'use strict';
angular.module('main') //eine App == ein Module


.controller('ListItemDetailViewController', function ($scope, $window, TransferDataBetweenControllers, $log) {
    //$log.log("app data", app.data);
  this.data = TransferDataBetweenControllers.getTMPData();
  $log.log('data::::', this, TransferDataBetweenControllers.getTMPData());
  var that = this;
  this.url = '';
  this.hasLink = false;

  this.prepareDataForDisplay = function () {
    if (that.data.retweet_count > 0 ) {
      that.data.text = that.data.retweeted_status.text;
    }
    if (that.data.text.indexOf('http://') !== -1 || that.data.text.indexOf('https://') !== -1) {
      $log.log('link gefunden');
      that.data.link = that.urlify(that.data.text);
      that.hasLink = true;
    }
  };

  this.urlify = function (text) {
    var urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, function (url) {
      that.url = url;
    });
  };

  this.prepareDataForDisplay();

  this.openLink = function () {

    $log.log('wurde aufgerufen', $window);

    if ($window.webview) {
      $window.webview.openWebView(null, null, {
        iconColor: ' #ffff00',
        backgroundColor: '#f00000',
        isPDF: false,
        url: that.url,
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
