'use strict';
angular.module('main') //eine App == ein Module


//$log.log("app", app);

.controller('ListViewController', function ($scope, $http, $window, $ionicLoading, TransferDataBetweenControllers, $log) {

  var consumerKey = encodeURIComponent('JLecUmd1bXGJbQHhP3W9UD9uN');
  var consumerSecret = encodeURIComponent('ckJUEow7KwpOjv6rQ5wajVcIFq7YI2uTjfr5s138lB091vAfWN');
  this.tweets = '';
  this.displayType = 'list-gallery';
  this.isGallery = false;
  this.isList = true;

  this.getToken = function () {

    var that = this;

    var tokenCredentials = $window.btoa(consumerKey + ':' + consumerSecret);
    $log.log('tokenCredentials', tokenCredentials);

    $log.log('that', that);
    return $http({
      method: 'POST',
      url: 'https://api.twitter.com/oauth2/token',
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
    var that = this;
    if (searchTerm === '' || searchTerm === undefined) {
      $log.log('no searchTerm defined');
      searchTerm = 'MiaSanMia';
      return that.getToken().then(function () {
        that.showLoading();
        return $http({
          method: 'GET',
          url: 'https://api.twitter.com/1.1/search/tweets.json?q=' + searchTerm,
        })
                .then(function (result) {
                  $log.log('unfiltered results', result);
                  that.tweets = result.data.statuses;
                  that.loadMoreTweetsUrl = 'https://api.twitter.com/1.1/search/tweets.json' + result.data.search_metadata.next_results;
                  that.refreshTweetsUrl = 'https://api.twitter.com/1.1/search/tweets.json' + result.data.search_metadata.refresh_url;
                })
                .finally(function () {
                  that.hideLoading();
                })
                .catch(function (error) {
                  $log.log(error);
                });
      });
    }
    else {
      $log.log('in else');
      that.searchTerm = searchTerm;
      that.showLoading();
      return $http({
        method: 'GET',
        url: 'https://api.twitter.com/1.1/search/tweets.json?q=' + searchTerm,
      })
            .then(function (result) {
              $log.log('unfiltered results', result);
              that.tweets = result.data.statuses;
              that.loadMoreTweetsUrl = 'https://api.twitter.com/1.1/search/tweets.json' + result.data.search_metadata.next_results;
              that.refreshTweetsUrl = 'https://api.twitter.com/1.1/search/tweets.json' + result.data.search_metadata.refresh_url;
            })
            .finally(function () {
              that.hideLoading();
            })
            .catch(function (error) {
              $log.log(error);
            });
    }
  };

  this.loadMoreResults = function () {
    $log.log('scroll to moad more');
    var that = this;
    that.showLoading();
    return $http({
      method: 'GET',
      url: that.loadMoreTweetsUrl
    })
        .then(function (result) {
          $log.log('that tweets vor push', that.tweets);
          that.tweets = that.tweets.concat(result.data.statuses);
          $log.log('tweets nachgeladen total: ', that.tweets);
          that.loadMoreTweetsUrl = 'https://api.twitter.com/1.1/search/tweets.json' + result.data.search_metadata.next_results;
          that.refreshTweetsUrl = 'https://api.twitter.com/1.1/search/tweets.json' + result.data.search_metadata.refresh_url;
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
    var that = this;
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
          that.refreshTweetsUrl = 'https://api.twitter.com/1.1/search/tweets.json' + result.data.search_metadata.refresh_url;
        })
        .finally(function () {
          that.hideLoading();
        })
        .catch(function (error) {
          $log.log(error);
        });
  };

  this.hasMoreResults = function () {
    var that = this;
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
    TransferDataBetweenControllers.setTMPData(tweet);
  };

//--------------------------------------------------------------

  this.getTweets();

});
