'use strict';
angular.module('main')


.controller('ListDetailViewController', function ($scope, $window, TransferDataBetweenControllers, $log) {
  this.data = TransferDataBetweenControllers.getData();
  $log.log('data::::', this, TransferDataBetweenControllers.getData());
  var that = this;
  this.url = '';
  this.hasLink = false;

  this.prepareDataForDisplay = function () {
    this.data = TransferDataBetweenControllers.getData();
    $log.log('dateeen', this.data);
/*    if (that.data.retweet_count > 0 ) {
      that.data.text = that.data.retweeted_status.text;
    }
    if (that.data.text.indexOf('http://') !== -1 || that.data.text.indexOf('https://') !== -1) {
      $log.log('link gefunden');
      that.data.link = that.urlify(that.data.text);
      that.hasLink = true;
    }*/
  };

  this.urlify = function (text) {
    var urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, function (url) {
      that.url = url;
      that.data.text = that.data.text.replace(url, '');
    });
  };

  this.openLink = function () {

    $log.log('wurde aufgerufen', $window);

    if ($window.webview) {
      $window.webview.openWebView(null, null, {
        iconColor: ' #ffff00',
        backgroundColor: '#f00000',
        isPDF: false,
        url: 'https://www.facebook.com/events/' + that.data.id,
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
    } else {
      window.open('https://www.facebook.com/events/' + that.data.id, '_blank');
    }
  };

  //--------------------------------------------------------------

  this.prepareDataForDisplay();

});
