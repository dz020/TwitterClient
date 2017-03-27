'use strict';
angular.module('main', [
  'ionic',
  'ngCordova',
  'ui.router',
  'rt.encodeuri',
  'ngOpenFB',
  'ui.rCalendar'
])
.config(function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/main/login');
  $stateProvider
    .state('main', {
      url: '/main',
      abstract: true,
      templateUrl: 'main/templates/tabs.html'
    })
      .state('main.list', {
        url: '/list',
        views: {
          'tab-list': {
            templateUrl: 'main/templates/list.html',
            controller: 'ListViewController as listViewCtrl'
          }
        }
      })
      .state('main.listDetail', {
        url: '/list/detail',
        views: {
          'tab-list': {
            templateUrl: 'main/templates/list-detail.html',
            controller: 'ListDetailViewController as listDetailViewCtrl'
          }
        }
      })
      .state('main.about', {
        url: '/about',
        views: {
          'tab-about': {
            templateUrl: 'main/templates/about.html',
            controller: 'AboutViewController as aboutViewCtrl'
          }
        }
      })
      .state('main.imprint', {
        url: '/imprint',
        views: {
          'tab-imprint': {
            templateUrl: 'main/templates/imprint.html',
            controller: 'ImprintViewController as imprintViewCtrl'
          }
        }
      })
      .state('main.login', {
        url: '/login',
        views: {
          'tab-about': {
            templateUrl: 'main/templates/login.html',
            controller: 'LoginViewController as loginViewCtrl'
          }
        }
      }); 
});
