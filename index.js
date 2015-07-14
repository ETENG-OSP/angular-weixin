var API_LIST = require('./api-list');

angular.module('ngWeixin', [])
  .provider('wx', WXProvider);

function WXProvider() {
  var debug = true;
  var apiList = API_LIST;
  var ticketUrl = '/api/token';
  var appId;
  var httpService;
  return {
    appId: function(_appId) {
      appId = _appId;
      return this;
    },
    debug: function(_debug) {
      debug = _debug;
      return this;
    },
    appList: function(_appList) {
      appList = _appList;
      return this;
    },
    signUrl: function(_ticketUrl) {
      ticketUrl = _ticketUrl;
      return this;
    },

    /**
     * @ngInject
     */
    $get: function($http) {
      httpService = $http;
      config();
      handleError();
      return wx;
    }
  };

  function getUrl() {
    return window.location.origin + window.location.pathname;
  }

  function getTicket() {
    console.log('get ticket');

    var $http = httpService;
    return $http.post(ticketUrl, {
      url: getUrl()
    }).then(function(results) {
      return results.data;
    });
  }

  function handleError() {
    console.log('handle error');
    wx.error(config);
  }

  function config() {
    console.log('config');
    var $http = httpService;

    if (!appId) {
      throw new Error('appId not set');
    }

    var ticket = getTicket().then(function(ticket) {
      ticket.debug = debug;
      ticket.appId = appId;
      ticket.jsApiList = apiList;
      wx.config(ticket);
    });
  }
}
