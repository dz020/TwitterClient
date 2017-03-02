'use strict';
angular.module('main')

  .service('TransferDataBetweenControllers', function ($log) {

    this.data = '';
    this.isOffline = 'nix';
    var that = this;
    this.networkStatus = '';
    this.token = '';

    this.getData = function () {
      $log.log('get data service was callled');
      return that.data;
    };

    this.setData = function (data) {
      $log.log('set data service was called with data:', data);
      that.data = data;
    };

    this.setNetworkStatus = function (available) {
      this.networkStatus = available;
      if ( available ) {
        $log.log('make api call');
      } else {
        $log.log('trigger popup');
      }
    };

    this.setToken = function (token) {
      $log.log('tokeeen', token);
      that.token = token;
    };

    this.getToken = function () {
      return that.token;
    };

  });
