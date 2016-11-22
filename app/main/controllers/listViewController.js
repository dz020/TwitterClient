'use strict';
angular.module('main') //eine App == ein Module

.controller('ListViewController', function ($scope, $http, $window, $ionicLoading, TransferDataBetweenControllers, $log, $ionicScrollDelegate, Config) {

  var consumerKey = encodeURIComponent(Config.ENV.CONSUMER_KEY);
  var consumerSecret = encodeURIComponent(Config.ENV.CONSUMER_SECRET);
  this.tweets = '';
  this.displayType = 'list-gallery';
  this.isGallery = false;
  this.isList = true;
  var that = this;
  this.searchTerm = Config.ENV.DEFAULT_SEARCHTERM;

  $log.log('is offline ???', TransferDataBetweenControllers.isOffline);

  this.getToken = function () {

    var tokenCredentials = $window.btoa(consumerKey + ':' + consumerSecret);
    $log.log('tokenCredentials', tokenCredentials);

    $log.log('that', that);
    return $http({
      method: 'POST',
      url: Config.ENV.API_BASE_URL + Config.ENV.AUTH_TYPE_FOR_URL,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'Authorization': 'Basic ' + tokenCredentials
      },
      data: 'grant_type=client_credentials'
    })
    .then(function (result) {
      if (result.data && result.data.access_token) {
        $http.defaults.headers.common.Authorization = 'Bearer ' + result.data.access_token;
      }
    })
    .catch(function (error) {
      $log.log('error', error);
    });
  };

  this.getTweets = function (searchTerm) {
    that.showLoading();

    if (searchTerm === '' || searchTerm === undefined) {
      searchTerm = Config.ENV.DEFAULT_SEARCHTERM;
    } else {
      that.searchTerm = searchTerm;
      $log.log('SEARCHTERM:', that.searchTerm);
      $ionicScrollDelegate.scrollTop();
    }

    return that.getToken().then(function () {
      return $http({
        method: 'GET',
        url: Config.ENV.API_BASE_URL + Config.ENV.API_SEARCH_URL,
        params: {
          q: searchTerm
        }
      })
      .then(function (result) {
        that.tweets = result.data.statuses;
        that.formateDate(result.data.statuses);
        that.loadMoreTweetsUrl = Config.ENV.API_BASE_URL + Config.ENV.API_SEARCH_URL + result.data.search_metadata.next_results;
        that.refreshTweetsUrl = Config.ENV.API_BASE_URL + Config.ENV.API_SEARCH_URL + result.data.search_metadata.refresh_url;
      })
      .finally(function () {
        that.hideLoading();
      })
      .catch(function (error) {
        $log.log(error);
      });
    });
  };

  this.loadMoreResults = function () {
    $log.log('scroll to moad more');
    that.showLoading();
    return $http({
      method: 'GET',
      url: that.loadMoreTweetsUrl
    })
    .then(function (result) {
      $log.log('that tweets vor push', that.tweets);
      that.tweets = that.tweets.concat(result.data.statuses);
      $log.log('tweets nachgeladen total: ', that.tweets);
      that.loadMoreTweetsUrl = Config.ENV.API_BASE_URL + Config.ENV.API_SEARCH_URL + result.data.search_metadata.next_results;
      that.refreshTweetsUrl = Config.ENV.API_BASE_URL + Config.ENV.API_SEARCH_URL + result.data.search_metadata.refresh_url;
    })
    .finally(function () {
      that.hideLoading();
      $scope.$broadcast('scroll.infiniteScrollComplete');
    })
    .catch(function (error) {
      $log.log(error);
    });
  };

  this.doRefresh = function () {
    that.showLoading();
    return $http({
      method: 'GET',
      url: that.refreshTweetsUrl,
    })
    .then(function (result) {
      $log.log('unfiltered results von refresh_url', result);
      if (result.data.statuses.length !== 0) {
        that.tweets = result.data.statuses;
      }
      that.refreshTweetsUrl = Config.ENV.API_BASE_URL + Config.ENV.API_SEARCH_URL + result.data.search_metadata.refresh_url;
    })
    .finally(function () {
      that.hideLoading();
    })
    .catch(function (error) {
      $log.log(error);
    });
  };

  this.hasMoreResults = function () {
    if (that.loadMoreTweetsUrl !== '') {
      $log.log('more results available');
      return true;
    } else {
      $log.log('no more results available');
      return false;
    }
  };

  this.showLoading = function () {
    $ionicLoading.show({
      template: '<p>Loading...</p><ion-spinner></ion-spinner>'
    });
  };

  this.hideLoading = function () {
    $ionicLoading.hide();
  };


  this.shareSelectedData = function (tweet) {
    $log.log('tweet der gesendet werden soll', tweet);
    TransferDataBetweenControllers.setData(tweet);
  };

  this.formateDate = function (data) {
    for (var i = 0; i < data.length; i++) {
      that.tweets[i].created_at = new Date(data[i].created_at).getTime();
    }
  };

//--------------------------------------------------------------

  this.getTweets();

});
