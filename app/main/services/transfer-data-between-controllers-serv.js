'use strict';
angular.module('main')

  .service('TransferDataBetweenControllers', function ($log) {

    this.data = '';
    this.TMPData = '';
    var that = this;

    //console.log('Hello from your Service: TransferDataBetweenControllers in module main');
    this.getData = function () {
      $log.log('get data service was callled');
      return that.data;
    };

    this.setData = function (data) {
      $log.log('set data service was called with data:', data);
      that.data = data;
    };

    this.setTMPData = function (data) {
      that.TMPData = data;
    };

    this.getTMPData = function () {
      return that.TMPData;
    };

  });
