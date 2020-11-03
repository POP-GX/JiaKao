"use strict";

var _vue = _interopRequireDefault(require("vue"));

var _App = _interopRequireDefault(require("./App.vue"));

var _axios = _interopRequireDefault(require("axios"));

var _vueAxios = _interopRequireDefault(require("vue-axios"));

var _index = _interopRequireDefault(require("./router/index.js"));

var _vantConfig = _interopRequireDefault(require("./vant.config.js"));

var _vueInfiniteScroll = _interopRequireDefault(require("vue-infinite-scroll"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import elementUI from './elementUI.config' 
// import BMap from 'bmap'
_vue["default"].config.productionTip = false;

_vue["default"].use(_vueAxios["default"], _axios["default"]);

_vue["default"].use(_vantConfig["default"]);

_vue["default"].use(_vueInfiniteScroll["default"]); // Vue.use(elementUI)
// Vue.use(BMap)


new _vue["default"]({
  render: function render(h) {
    return h(_App["default"]);
  },
  router: _index["default"]
}).$mount('#app');