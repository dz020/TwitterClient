'use strict';

describe('module: main, service: TransferDataBetweenControllers', function () {

  // load the service's module
  beforeEach(module('main'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate service
  var TransferDataBetweenControllers;
  beforeEach(inject(function (_TransferDataBetweenControllers_) {
    TransferDataBetweenControllers = _TransferDataBetweenControllers_;
  }));

  it('should do something', function () {
    expect(!!TransferDataBetweenControllers).toBe(true);
  });

});
