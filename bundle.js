(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports=[
  "onMenuShareTimeline",
  "onMenuShareAppMessage",
  "onMenuShareQQ",
  "onMenuShareWeibo",
  "startRecord",
  "stopRecord",
  "onVoiceRecordEnd",
  "playVoice",
  "pauseVoice",
  "stopVoice",
  "onVoicePlayEnd",
  "uploadVoice",
  "downloadVoice",
  "chooseImage",
  "previewImage",
  "uploadImage",
  "downloadImage",
  "translateVoice",
  "getNetworkType",
  "openLocation",
  "getLocation",
  "hideOptionMenu",
  "showOptionMenu",
  "hideMenuItems",
  "showMenuItems",
  "hideAllNonBaseMenuItem",
  "showAllNonBaseMenuItem",
  "closeWindow",
  "scanQRCode",
  "chooseWXPay",
  "openProductSpecificView",
  "addCard",
  "chooseCard",
  "openCard"
]

},{}],2:[function(require,module,exports){
var API_LIST = require('./api-list');

angular.module('ngWeixin', [])
  .provider('wx', WXProvider);

function WXProvider() {
  var debug = true;
  var apiList = API_LIST;
  var ticketUrl = '/api/jsapi_ticket';
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
    ticketUrl: function(_ticketUrl) {
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

  function getTicket() {
    console.log('get ticket');

    var $http = httpService;
    return $http.post(ticketUrl, {
      url: window.location.href
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
      // console.log('ticket:', ticket);
      ticket.debug = debug;
      ticket.appId = appId;
      ticket.jsApiList = apiList;
      delete ticket['jsapi_ticket'];
      console.log(ticket);
      wx.config(ticket);
    });
  }
}

},{"./api-list":1}]},{},[2]);
