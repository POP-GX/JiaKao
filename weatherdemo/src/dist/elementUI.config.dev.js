"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _elementUi = require("element-ui");

var elementUI = [_elementUi.Select];
var _default = {
  /**
   * Vue.use 方法会自动调用install函数
   * Install Vant Component plugin
   * @param Vue
   */
  install: function install(Vue) {
    elementUI.forEach(function (Component) {
      Vue.use(Component);
    });
  }
};
exports["default"] = _default;