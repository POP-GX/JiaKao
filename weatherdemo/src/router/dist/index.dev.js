"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

var _Examination = _interopRequireDefault(require("../components/test/Examination"));

var _SubjectOne = _interopRequireDefault(require("../components/test/SubjectOne"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

_vue["default"].use(_vueRouter["default"]);

var routes = [// {
// 	path: '/',
// 	// name:"Home",
// 	component: Home,
// },
{
  path: '/',
  // props: true,
  name: "examination",
  component: _Examination["default"],
  children: [{
    path: '/',
    name: 'SubjectOne',
    // props: true,
    meta: {
      num: 1
    },
    component: _SubjectOne["default"]
  }, {
    path: '/subjectfour',
    name: 'SubjectFour',
    // props: true,
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('../components/test/SubjectFour'));
      });
    }
  }]
}, {
  path: '/testdemo',
  name: "Testdemo3",
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../views/TestDemo3'));
    });
  }
}, {
  path: '/testdemo2',
  name: "Testdemo2",
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../views/TestDemo2'));
    });
  }
}, {
  path: '/iconView',
  name: "IconView",
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("../views/icondemo/IconView"));
    });
  }
}, {
  path: '/iconlist',
  name: "IconList",
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("../views/icondemo/IconList"));
    });
  }
}, {
  path: '/videoDemo',
  name: "VideoDemo",
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("../views/VideoDemo"));
    });
  }
}, {
  path: '/findcar',
  name: "Findcar",
  meta: {
    num: 2
  },
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("../views/FindCar"));
    });
  }
}, {
  path: '/collection',
  name: "Collection",
  meta: {
    num: 2
  },
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("../views/Collection"));
    });
  }
}];
var router = new _vueRouter["default"]({
  // 初始化VueRouter
  mode: 'history',
  routes: routes,
  linkActiveClass: "actived",
  linkExactActiveClass: "exact-actived"
});
var _default = router;
exports["default"] = _default;