'use strict';
angular.module('main', [
  'ionic',
  'ngCordova',
  'ui.router',
  // TODO: load other modules selected during generation
])
.config(function ($stateProvider, $urlRouterProvider) {

  // ROUTING with ui.router

  //$log.log('window size', document.documentElement.clientWidth);

  if (document.documentElement.clientWidth > 360) {
    //alert("splitscreen laden");
  }

  $urlRouterProvider.otherwise('/main/list'); //gibt an welche seite als default geladen wird wenn man localhost aufruft
  $stateProvider
    // this state is placed in the <ion-nav-view> in the index.html
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
            controller: 'ListViewController as lvwcontroller'
          }
        }
      })
      .state('main.listDetail', {
        url: '/list/detail:id',
        views: {
          'tab-list': {
            templateUrl: 'main/templates/list-detail.html',
            controller: 'ListItemDetailViewController as lidvwcontroller'
          }
        }
      })
      .state('main.employee', {
        url: '/employee',
        views: {
          'tab-employee': {
            templateUrl: 'main/templates/employee.html'
          }
        }
      })
      .state('main.company', {
        url: '/company',
        views: {
          'tab-company': {
            templateUrl: 'main/templates/company.html'
          }
        }
      });
});
