'use strict';
angular.module('main')


.controller('AboutViewController', function ($log, Config, ngFB) {
  this.config = Config.BUILD;

  this.fbLogin = function () {
    ngFB.init({appId: '1194492117332170'});
    $log.log('test', ngFB);
    ngFB.login({scope: 'email'}).then(
      function (response) {
        if (response.status === 'connected') {
          $log.log('antwooort', response.authResponse.accessToken);
          $log.log('Facebook login succeeded');
        } else {
          alert('Facebook login failed');
        }
      });
  };

});
