'use strict';
angular.module('main')


.controller('LoginViewController', function ($log, Config, ngFB, TransferDataBetweenControllers, $window) {
  this.config = Config.BUILD;

  this.fbLogin = function () {
    ngFB.init({appId: '1194492117332170'});
    $log.log('test', ngFB);
    ngFB.login({scope: 'email'}).then(
      function (response) {
        if (response.status === 'connected') {
          $log.log('Facebook login succeeded', response.authResponse.accessToken);
          TransferDataBetweenControllers.setToken(response.authResponse.accessToken);
          $window.location.href = '#/main/list';
        } else {
          alert('Facebook login failed');
        }
      });
  };

});
