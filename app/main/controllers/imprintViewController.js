'use strict';
angular.module('main')


.controller('ImprintViewController', function ($log, Config, TransferDataBetweenControllers) {
  this.config = Config.BUILD;

  this.saveLookup = function () {
    TransferDataBetweenControllers.saveLookup();
  };

});
