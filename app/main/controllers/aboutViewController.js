'use strict';
angular.module('main')


.controller('AboutViewController', function ($log, Config) {
  this.config = Config.BUILD;
});
