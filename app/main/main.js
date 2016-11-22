'use strict';
angular.module('main', [
  'ionic',
  'ngCordova',
  'ui.router',
  'rt.encodeuri'
])
.config(function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/main/list');
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
            templateUrl: 'main/templates/about.html'
          }
        }
      })
      .state('main.imprint', {
        url: '/imprint',
        views: {
          'tab-imprint': {
            templateUrl: 'main/templates/imprint.html'
          }
        }
      });
});
