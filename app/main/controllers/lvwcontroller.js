'use strict';
var app = angular.module('main') //eine App == ein Module


//console.log("app", app);

.controller('ListViewController', function ($scope, $http, $window, $ionicLoading, TransferDataBetweenControllers) {


  var consumerKey = encodeURIComponent('JLecUmd1bXGJbQHhP3W9UD9uN');
  var consumerSecret = encodeURIComponent('ckJUEow7KwpOjv6rQ5wajVcIFq7YI2uTjfr5s138lB091vAfWN');
  this.tweets = '';
  this.displayType = 'list-gallery';

  this.getToken = function () {

    var that = this;

	    var tokenCredentials = $window.btoa(consumerKey + ':' + consumerSecret);
	    console.log('tokenCredentials', tokenCredentials);

    	console.log('that', that);
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
      console.log('error', error);
	    });
  };

  this.getTweets = function (searchTerm) {
    var that = this;
    TransferDataBetweenControllers.data = 'test uebergabe';
    if (searchTerm == '' || searchTerm == undefined) {
      console.log('in if');
      searchTerm = 'MiaSanMia';
      return that.getToken().then(function () {
        that.showLoading();
        return $http({
          method: 'GET',
          url: 'https://api.twitter.com/1.1/search/tweets.json?q=' + searchTerm,
        })
				.then(function (result) {
  console.log('unfiltered results', result);
  that.tweets = result.data.statuses;
  that.loadMoreTweetsUrl = 'https://api.twitter.com/1.1/search/tweets.json' + result.data.search_metadata.next_results;
  that.refreshTweetsUrl = 'https://api.twitter.com/1.1/search/tweets.json' + result.data.search_metadata.refresh_url;
})
				.finally(function () {
			      that.hideLoading();
			    })
				.catch(function (error) {
  console.log(error);
});
      });
    }
    else {
      console.log('in else');
      that.searchTerm = searchTerm;
      that.showLoading();
      return $http({
        method: 'GET',
        url: 'https://api.twitter.com/1.1/search/tweets.json?q=' + searchTerm,
      })
			.then(function (result) {
  console.log('unfiltered results', result);
  that.tweets = result.data.statuses;
  that.loadMoreTweetsUrl = 'https://api.twitter.com/1.1/search/tweets.json' + result.data.search_metadata.next_results;
  that.refreshTweetsUrl = 'https://api.twitter.com/1.1/search/tweets.json' + result.data.search_metadata.refresh_url;
  TransferDataBetweenControllers.data = that.tweets;
})
			.finally(function () {
		      that.hideLoading();
		    })
			.catch(function (error) {
  console.log(error);
});
    }
  };

  this.loadMoreResults = function () {
    	console.log('scroll to moad more');
    	var that = this;
    that.showLoading();
    return $http({
      method: 'GET',
      url: that.loadMoreTweetsUrl
    })
		.then(function (result) {
  console.log('that tweets vor push', that.tweets);
  that.tweets = that.tweets.concat(result.data.statuses);
  console.log('tweets nachgeladen total: ', that.tweets);
  that.loadMoreTweetsUrl = 'https://api.twitter.com/1.1/search/tweets.json' + result.data.search_metadata.next_results;
  that.refreshTweetsUrl = 'https://api.twitter.com/1.1/search/tweets.json' + result.data.search_metadata.refresh_url;
  TransferDataBetweenControllers.data = that.tweets;
})
		.finally(function () {
	      that.hideLoading();
	    })
		.catch(function (error) {
  console.log(error);
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
  console.log('unfiltered results von refresh_url', result);
  if (result.data.statuses.length !== 0) {
    that.tweets = result.data.statuses;
  }
  that.refreshTweetsUrl = 'https://api.twitter.com/1.1/search/tweets.json' + result.data.search_metadata.refresh_url;
})
		.finally(function () {
	        that.hideLoading();
})
		.catch(function (error) {
  console.log(error);
});
  };

  this.hasMoreResults = function () {
    	var that = this;
    	if (that.loadMoreTweetsUrl != '') {
	    	console.log('more results available');
	    	return true;
    	} else {
	    	console.log('NO MORE RESULTS available');
    		return false;
    	}
  };

  this.showLoading = function () {
//		console.log("spinner sollte kommen");
    $ionicLoading.show({
      template: '<p>Loading...</p><ion-spinner></ion-spinner>'
    });
  };

  this.hideLoading = function () {
    $ionicLoading.hide();
  };

  this.isGallery = function () {
    return true;
  };

  this.isDefault = function () {
    return false;
  };


//--------------------------------------------------------------

  this.getTweets();

});


