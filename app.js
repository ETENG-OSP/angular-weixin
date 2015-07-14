angular.module('app', [
  'ngWeixin'
]).config(config)
  .controller('TestController', TestController);

function config(wxProvider) {
  wxProvider
    .appId('wxb3c27ef068bf7146')
    .signUrl('http://etengweixin.duapp.com/api/token');
}

function TestController(wx) {
  this.wx = wx;
}

TestController.prototype.takePicture = function() {
  var wx = this.wx;
  wx.chooseImage({
    success: function() {
      alert('ok');
    }
  });
};
