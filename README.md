angular-weixin
=============

auto get weixin sign in angular

Install
----------

```bash
bower install https://github.com/gengen1988/angular-weixin.git#master
```

Usage
---------

```js
angular.module('app', ['ngWeixin']).config(config);

function config(wxProvider) {
  wxProvider.appId('id').signUrl('restful endpoint');
}
```
