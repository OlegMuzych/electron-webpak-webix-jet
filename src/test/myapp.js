/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/webix-jet/dist/es6/jet.js":
/*!************************************************!*\
  !*** ./node_modules/webix-jet/dist/es6/jet.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "plugins": () => (/* binding */ plugins),
/* harmony export */   "errors": () => (/* binding */ errors),
/* harmony export */   "JetApp": () => (/* binding */ JetApp),
/* harmony export */   "JetView": () => (/* binding */ JetView),
/* harmony export */   "HashRouter": () => (/* binding */ HashRouter),
/* harmony export */   "StoreRouter": () => (/* binding */ StoreRouter),
/* harmony export */   "UrlRouter": () => (/* binding */ UrlRouter),
/* harmony export */   "EmptyRouter": () => (/* binding */ EmptyRouter),
/* harmony export */   "SubRouter": () => (/* binding */ SubRouter)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");



function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var NavigationBlocked = function NavigationBlocked() {};

var JetBase = /*#__PURE__*/function () {
  function JetBase(webix) {
    this.webixJet = true;
    this.webix = webix;
    this._events = [];
    this._subs = {};
    this._data = {};
  }

  var _proto = JetBase.prototype;

  _proto.getRoot = function getRoot() {
    return this._root;
  };

  _proto.destructor = function destructor() {
    this._detachEvents();

    this._destroySubs();

    this._events = this._container = this.app = this._parent = this._root = null;
  };

  _proto.setParam = function setParam(id, value, url) {
    if (this._data[id] !== value) {
      this._data[id] = value;

      this._segment.update(id, value, 0);

      if (url) {
        return this.show(null);
      }
    }
  };

  _proto.getParam = function getParam(id, parent) {
    var value = this._data[id];

    if (typeof value !== "undefined" || !parent) {
      return value;
    }

    var view = this.getParentView();

    if (view) {
      return view.getParam(id, parent);
    }
  };

  _proto.getUrl = function getUrl() {
    return this._segment.suburl();
  };

  _proto.getUrlString = function getUrlString() {
    return this._segment.toString();
  };

  _proto.getParentView = function getParentView() {
    return this._parent;
  };

  _proto.$$ = function $$(id) {
    if (typeof id === "string") {
      var root = this.getRoot();
      return root.queryView(function (obj) {
        return (obj.config.id === id || obj.config.localId === id) && obj.$scope === root.$scope;
      }, "self");
    } else {
      return id;
    }
  };

  _proto.on = function on(obj, name, code) {
    var id = obj.attachEvent(name, code);

    this._events.push({
      obj: obj,
      id: id
    });

    return id;
  };

  _proto.contains = function contains(view) {
    for (var key in this._subs) {
      var kid = this._subs[key].view;

      if (kid === view || kid.contains(view)) {
        return true;
      }
    }

    return false;
  };

  _proto.getSubView = function getSubView(name) {
    var sub = this.getSubViewInfo(name);

    if (sub) {
      return sub.subview.view;
    }
  };

  _proto.getSubViewInfo = function getSubViewInfo(name) {
    var sub = this._subs[name || "default"];

    if (sub) {
      return {
        subview: sub,
        parent: this
      };
    }

    if (name === "_top") {
      this._subs[name] = {
        url: "",
        id: null,
        popup: true
      };
      return this.getSubViewInfo(name);
    } // when called from a child view, searches for nearest parent with subview


    if (this._parent) {
      return this._parent.getSubViewInfo(name);
    }

    return null;
  };

  _proto._detachEvents = function _detachEvents() {
    var events = this._events;

    for (var i = events.length - 1; i >= 0; i--) {
      events[i].obj.detachEvent(events[i].id);
    }
  };

  _proto._destroySubs = function _destroySubs() {
    // destroy sub views
    for (var key in this._subs) {
      var subView = this._subs[key].view; // it possible that subview was not loaded with any content yet
      // so check on null

      if (subView) {
        subView.destructor();
      }
    } // reset to prevent memory leaks


    this._subs = {};
  };

  _proto._init_url_data = function _init_url_data() {
    var url = this._segment.current();

    this._data = {};
    this.webix.extend(this._data, url.params, true);
  };

  _proto._getDefaultSub = function _getDefaultSub() {
    if (this._subs.default) {
      return this._subs.default;
    }

    for (var key in this._subs) {
      var sub = this._subs[key];

      if (!sub.branch && sub.view && key !== "_top") {
        var child = sub.view._getDefaultSub();

        if (child) {
          return child;
        }
      }
    }
  };

  _proto._routed_view = function _routed_view() {
    var parent = this.getParentView();

    if (!parent) {
      return true;
    }

    var sub = parent._getDefaultSub();

    if (!sub && sub !== this) {
      return false;
    }

    return parent._routed_view();
  };

  return JetBase;
}();

function parse(url) {
  // remove starting /
  if (url[0] === "/") {
    url = url.substr(1);
  } // split url by "/"


  var parts = url.split("/");
  var chunks = []; // for each page in url

  for (var i = 0; i < parts.length; i++) {
    var test = parts[i];
    var result = {}; // detect params
    // support old 			some:a=b:c=d
    // and new notation		some?a=b&c=d

    var pos = test.indexOf(":");

    if (pos === -1) {
      pos = test.indexOf("?");
    }

    if (pos !== -1) {
      var params = test.substr(pos + 1).split(/[\:\?\&]/g); // create hash of named params

      for (var _iterator = _createForOfIteratorHelperLoose(params), _step; !(_step = _iterator()).done;) {
        var param = _step.value;
        var dchunk = param.split("=");
        result[dchunk[0]] = decodeURIComponent(dchunk[1]);
      }
    } // store parsed values


    chunks[i] = {
      page: pos > -1 ? test.substr(0, pos) : test,
      params: result,
      isNew: true
    };
  } // return array of page objects


  return chunks;
}

function url2str(stack) {
  var url = [];

  for (var _iterator2 = _createForOfIteratorHelperLoose(stack), _step2; !(_step2 = _iterator2()).done;) {
    var chunk = _step2.value;
    url.push("/" + chunk.page);
    var params = obj2str(chunk.params);

    if (params) {
      url.push("?" + params);
    }
  }

  return url.join("");
}

function obj2str(obj) {
  var str = [];

  for (var key in obj) {
    if (str.length) {
      str.push("&");
    }

    str.push(key + "=" + encodeURIComponent(obj[key]));
  }

  return str.join("");
}

var Route = /*#__PURE__*/function () {
  function Route(route, index) {
    this._next = 1;

    if (typeof route === "string") {
      this.route = {
        url: parse(route),
        path: route
      };
    } else {
      this.route = route;
    }

    this.index = index;
  }

  var _proto2 = Route.prototype;

  _proto2.current = function current() {
    return this.route.url[this.index];
  };

  _proto2.next = function next() {
    return this.route.url[this.index + this._next];
  };

  _proto2.suburl = function suburl() {
    return this.route.url.slice(this.index);
  };

  _proto2.shift = function shift() {
    return new Route(this.route, this.index + this._next);
  };

  _proto2.refresh = function refresh() {
    var url = this.route.url;

    for (var i = this.index + 1; i < url.length; i++) {
      url[i].isNew = true;
    }
  };

  _proto2.toString = function toString() {
    var str = url2str(this.suburl());
    return str ? str.substr(1) : "";
  };

  _proto2._join = function _join(path, kids) {
    var url = this.route.url;

    if (path === null) {
      // change of parameters, route elements are not affected
      return url;
    }

    var old = this.route.url;
    url = old.slice(0, this.index + (kids ? this._next : 0));

    if (path) {
      url = url.concat(parse(path));

      for (var i = 0; i < url.length; i++) {
        if (old[i]) {
          url[i].view = old[i].view;
        }

        if (old[i] && url[i].page === old[i].page) {
          url[i].isNew = false;
        }
      }
    }

    return url;
  };

  _proto2.append = function append(path) {
    var url = this._join(path, true);

    this.route.path = url2str(url);
    this.route.url = url;
    return this.route.path;
  };

  _proto2.show = function show(path, view, kids) {
    var _this = this;

    var url = this._join(path, kids);

    return new Promise(function (res, rej) {
      var redirect = url2str(url);
      var obj = {
        url: url,
        redirect: redirect,
        confirm: Promise.resolve()
      };
      var app = view ? view.app : null; // when creating a new route, it possible that it will not have any content
      // guard is not necessary in such case

      if (app) {
        var result = app.callEvent("app:guard", [obj.redirect, view, obj]);

        if (!result) {
          rej(new NavigationBlocked());
          return;
        }
      }

      obj.confirm.catch(function (err) {
        return rej(err);
      }).then(function () {
        if (obj.redirect === null) {
          rej(new NavigationBlocked());
          return;
        }

        if (obj.redirect !== redirect) {
          app.show(obj.redirect);
          rej(new NavigationBlocked());
          return;
        }

        _this.route.path = redirect;
        _this.route.url = url;
        res();
      });
    });
  };

  _proto2.size = function size(n) {
    this._next = n;
  };

  _proto2.split = function split() {
    var route = {
      url: this.route.url.slice(this.index + 1),
      path: ""
    };

    if (route.url.length) {
      route.path = url2str(route.url);
    }

    return new Route(route, 0);
  };

  _proto2.update = function update(name, value, index) {
    var chunk = this.route.url[this.index + (index || 0)];

    if (!chunk) {
      this.route.url.push({
        page: "",
        params: {}
      });
      return this.update(name, value, index);
    }

    if (name === "") {
      chunk.page = value;
    } else {
      chunk.params[name] = value;
    }

    this.route.path = url2str(this.route.url);
  };

  return Route;
}();

var JetView = /*#__PURE__*/function (_JetBase) {
  (0,_babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(JetView, _JetBase);

  function JetView(app, config) {
    var _this2;

    _this2 = _JetBase.call(this, app.webix) || this;
    _this2.app = app; //this.$config = config;

    _this2._children = [];
    return _this2;
  }

  var _proto3 = JetView.prototype;

  _proto3.ui = function ui(_ui, config) {
    config = config || {};
    var container = config.container || _ui.container;
    var jetview = this.app.createView(_ui);

    this._children.push(jetview);

    jetview.render(container, this._segment, this);

    if (typeof _ui !== "object" || _ui instanceof JetBase) {
      // raw webix UI
      return jetview;
    } else {
      return jetview.getRoot();
    }
  };

  _proto3.show = function show(path, config) {
    config = config || {}; // convert parameters object to url

    if (typeof path === "object") {
      for (var key in path) {
        this.setParam(key, path[key]);
      }

      path = null;
    } else {
      // deligate to app in case of root prefix
      if (path.substr(0, 1) === "/") {
        return this.app.show(path);
      } // local path, do nothing


      if (path.indexOf("./") === 0) {
        path = path.substr(2);
      } // parent path, call parent view


      if (path.indexOf("../") === 0) {
        var parent = this.getParentView();

        if (parent) {
          return parent.show(path.substr(3), config);
        } else {
          return this.app.show("/" + path.substr(3));
        }
      }

      var sub = this.getSubViewInfo(config.target);

      if (sub) {
        if (sub.parent !== this) {
          return sub.parent.show(path, config);
        } else if (config.target && config.target !== "default") {
          return this._renderFrameLock(config.target, sub.subview, path);
        }
      } else {
        if (path) {
          return this.app.show("/" + path);
        }
      }
    }

    return this._show(this._segment, path, this);
  };

  _proto3._show = function _show(segment, path, view) {
    var _this3 = this;

    return segment.show(path, view, true).then(function () {
      _this3._init_url_data();

      return _this3._urlChange();
    }).then(function () {
      if (segment.route.linkRouter) {
        _this3.app.getRouter().set(segment.route.path, {
          silent: true
        });

        _this3.app.callEvent("app:route", [segment.route.path]);
      }
    });
  };

  _proto3.init = function init(_$view, _$) {// stub
  };

  _proto3.ready = function ready(_$view, _$url) {// stub
  };

  _proto3.config = function config() {
    this.app.webix.message("View:Config is not implemented");
  };

  _proto3.urlChange = function urlChange(_$view, _$url) {// stub
  };

  _proto3.destroy = function destroy() {// stub
  };

  _proto3.destructor = function destructor() {
    this.destroy();

    this._destroyKids(); // destroy actual UI


    this._root.destructor();

    _JetBase.prototype.destructor.call(this);
  };

  _proto3.use = function use(plugin, config) {
    plugin(this.app, this, config);
  };

  _proto3.refresh = function refresh() {
    var url = this.getUrl();
    this.destroy();

    this._destroyKids();

    this._destroySubs();

    this._detachEvents();

    if (this._container.tagName) {
      this._root.destructor();
    }

    this._segment.refresh();

    return this._render(this._segment);
  };

  _proto3.render = function render(root, url, parent) {
    var _this4 = this;

    if (typeof url === "string") {
      url = new Route(url, 0);
    }

    this._segment = url;
    this._parent = parent;

    this._init_url_data();

    root = root || document.body;

    var _container = typeof root === "string" ? this.webix.toNode(root) : root;

    if (this._container !== _container) {
      this._container = _container;
      return this._render(url);
    } else {
      return this._urlChange().then(function () {
        return _this4.getRoot();
      });
    }
  };

  _proto3._render = function _render(url) {
    var _this5 = this;

    var config = this.config();

    if (config.then) {
      return config.then(function (cfg) {
        return _this5._render_final(cfg, url);
      });
    } else {
      return this._render_final(config, url);
    }
  };

  _proto3._render_final = function _render_final(config, url) {
    var _this6 = this;

    // get previous view in the same slot
    var slot = null;
    var container = null;
    var show = false;

    if (!this._container.tagName) {
      slot = this._container;

      if (slot.popup) {
        container = document.body;
        show = true;
      } else {
        container = this.webix.$$(slot.id);
      }
    } else {
      container = this._container;
    } // view already destroyed


    if (!this.app || !container) {
      return Promise.reject(null);
    }

    var response;

    var current = this._segment.current(); // using wrapper object, so ui can be changed from app:render event


    var result = {
      ui: {}
    };
    this.app.copyConfig(config, result.ui, this._subs);
    this.app.callEvent("app:render", [this, url, result]);
    result.ui.$scope = this;
    /* destroy old HTML attached views before creating new one */

    if (!slot && current.isNew && current.view) {
      current.view.destructor();
    }

    try {
      // special handling for adding inside of multiview - preserve old id
      if (slot && !show) {
        var oldui = container;
        var parent = oldui.getParentView();

        if (parent && parent.name === "multiview" && !result.ui.id) {
          result.ui.id = oldui.config.id;
        }
      }

      this._root = this.app.webix.ui(result.ui, container);
      var asWin = this._root; // check for url added to ignore this.ui calls

      if (show && asWin.setPosition && !asWin.isVisible()) {
        asWin.show();
      } // check, if we are replacing some older view


      if (slot) {
        if (slot.view && slot.view !== this && slot.view !== this.app) {
          slot.view.destructor();
        }

        slot.id = this._root.config.id;
        if (this.getParentView() || !this.app.app) slot.view = this;else {
          // when we have subapp, set whole app as a view
          // so on destruction, the whole app will be destroyed
          slot.view = this.app;
        }
      }

      if (current.isNew) {
        current.view = this;
        current.isNew = false;
      }

      response = Promise.resolve(this._init(this._root, url)).then(function () {
        return _this6._urlChange().then(function () {
          _this6._initUrl = null;
          return _this6.ready(_this6._root, url.suburl());
        });
      });
    } catch (e) {
      response = Promise.reject(e);
    }

    return response.catch(function (err) {
      return _this6._initError(_this6, err);
    });
  };

  _proto3._init = function _init(view, url) {
    return this.init(view, url.suburl());
  };

  _proto3._urlChange = function _urlChange() {
    var _this7 = this;

    this.app.callEvent("app:urlchange", [this, this._segment]);
    var waits = [];

    for (var key in this._subs) {
      var frame = this._subs[key];

      var wait = this._renderFrameLock(key, frame, null);

      if (wait) {
        waits.push(wait);
      }
    }

    return Promise.all(waits).then(function () {
      return _this7.urlChange(_this7._root, _this7._segment.suburl());
    });
  };

  _proto3._renderFrameLock = function _renderFrameLock(key, frame, path) {
    // if subview is not occupied by some rendering yet
    if (!frame.lock) {
      // retreive and store rendering end promise
      var lock = this._renderFrame(key, frame, path);

      if (lock) {
        // clear lock after frame rendering
        // as promise.finally is not supported by  Webix lesser than 6.2
        // using a more verbose notation
        frame.lock = lock.then(function () {
          return frame.lock = null;
        }, function () {
          return frame.lock = null;
        });
      }
    } // return rendering end promise


    return frame.lock;
  };

  _proto3._renderFrame = function _renderFrame(key, frame, path) {
    var _this8 = this;

    //default route
    if (key === "default") {
      if (this._segment.next()) {
        // we have a next segment in url, render it
        return this._createSubView(frame, this._segment.shift());
      } else if (frame.view && frame.popup) {
        // there is no next segment, delete the existing sub-view
        frame.view.destructor();
        frame.view = null;
      }
    } //if new path provided, set it to the frame


    if (path !== null) {
      frame.url = path;
    } // in case of routed sub-view


    if (frame.route) {
      // we have a new path for sub-view
      if (path !== null) {
        return frame.route.show(path, frame.view).then(function () {
          return _this8._createSubView(frame, frame.route);
        });
      } // do not trigger onChange for isolated sub-views


      if (frame.branch) {
        return;
      }
    }

    var view = frame.view; // if view doesn't exists yet, init it

    if (!view && frame.url) {
      if (typeof frame.url === "string") {
        // string, so we have isolated subview url
        frame.route = new Route(frame.url, 0);
        return this._createSubView(frame, frame.route);
      } else {
        // object, so we have an embeded subview
        if (typeof frame.url === "function" && !(view instanceof frame.url)) {
          view = new frame.url(this.app, "");
        }

        if (!view) {
          view = frame.url;
        }
      }
    } // trigger onChange for already existed view


    if (view) {
      return view.render(frame, frame.route || this._segment, this);
    }
  };

  _proto3._initError = function _initError(view, err) {
    /*
        if view is destroyed, ignore any view related errors
    */
    if (this.app) {
      this.app.error("app:error:initview", [err, view]);
    }

    return true;
  };

  _proto3._createSubView = function _createSubView(sub, suburl) {
    var _this9 = this;

    return this.app.createFromURL(suburl.current()).then(function (view) {
      return view.render(sub, suburl, _this9);
    });
  };

  _proto3._destroyKids = function _destroyKids() {
    // destroy child views
    var uis = this._children;

    for (var i = uis.length - 1; i >= 0; i--) {
      if (uis[i] && uis[i].destructor) {
        uis[i].destructor();
      }
    } // reset vars for better GC processing


    this._children = [];
  };

  return JetView;
}(JetBase); // wrapper for raw objects and Jet 1.x structs


var JetViewRaw = /*#__PURE__*/function (_JetView) {
  (0,_babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(JetViewRaw, _JetView);

  function JetViewRaw(app, config) {
    var _this10;

    _this10 = _JetView.call(this, app, config) || this;
    _this10._ui = config.ui;
    return _this10;
  }

  var _proto4 = JetViewRaw.prototype;

  _proto4.config = function config() {
    return this._ui;
  };

  return JetViewRaw;
}(JetView);

var SubRouter = /*#__PURE__*/function () {
  function SubRouter(cb, config, app) {
    this.path = "";
    this.app = app;
  }

  var _proto5 = SubRouter.prototype;

  _proto5.set = function set(path, config) {
    this.path = path;
    var a = this.app;
    a.app.getRouter().set(a._segment.append(this.path), {
      silent: true
    });
  };

  _proto5.get = function get() {
    return this.path;
  };

  return SubRouter;
}();

var _once = true;

var JetAppBase = /*#__PURE__*/function (_JetBase2) {
  (0,_babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(JetAppBase, _JetBase2);

  function JetAppBase(config) {
    var _this11;

    var webix = (config || {}).webix || window.webix;
    _this11 = _JetBase2.call(this, webix) || this; // init config

    _this11.config = _this11.webix.extend({
      name: "App",
      version: "1.0",
      start: "/home"
    }, config, true);
    _this11.app = _this11.config.app;
    _this11.ready = Promise.resolve();
    _this11._services = {};

    _this11.webix.extend((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0__["default"])(_this11), _this11.webix.EventSystem);

    return _this11;
  }

  var _proto6 = JetAppBase.prototype;

  _proto6.getUrl = function getUrl() {
    return this._subSegment.suburl();
  };

  _proto6.getUrlString = function getUrlString() {
    return this._subSegment.toString();
  };

  _proto6.getService = function getService(name) {
    var obj = this._services[name];

    if (typeof obj === "function") {
      obj = this._services[name] = obj(this);
    }

    return obj;
  };

  _proto6.setService = function setService(name, handler) {
    this._services[name] = handler;
  };

  _proto6.destructor = function destructor() {
    this.getSubView().destructor();

    _JetBase2.prototype.destructor.call(this);
  } // copy object and collect extra handlers
  ;

  _proto6.copyConfig = function copyConfig(obj, target, config) {
    // raw ui config
    if (obj instanceof JetBase || typeof obj === "function" && obj.prototype instanceof JetBase) {
      obj = {
        $subview: obj
      };
    } // subview placeholder


    if (typeof obj.$subview != "undefined") {
      return this.addSubView(obj, target, config);
    } // process sub-properties


    target = target || (obj instanceof Array ? [] : {});

    for (var method in obj) {
      var point = obj[method]; // view class

      if (typeof point === "function" && point.prototype instanceof JetBase) {
        point = {
          $subview: point
        };
      }

      if (point && typeof point === "object" && !(point instanceof this.webix.DataCollection) && !(point instanceof RegExp) && !(point instanceof Map)) {
        if (point instanceof Date) {
          target[method] = new Date(point);
        } else {
          var copy = this.copyConfig(point, point instanceof Array ? [] : {}, config);

          if (copy !== null) {
            target[method] = copy;
          }
        }
      } else {
        target[method] = point;
      }
    }

    return target;
  };

  _proto6.getRouter = function getRouter() {
    return this.$router;
  };

  _proto6.clickHandler = function clickHandler(e, target) {
    if (e) {
      target = target || e.target || e.srcElement;

      if (target && target.getAttribute) {
        var trigger = target.getAttribute("trigger");

        if (trigger) {
          this._forView(target, function (view) {
            return view.app.trigger(trigger);
          });

          e.cancelBubble = true;
          return e.preventDefault();
        }

        var route = target.getAttribute("route");

        if (route) {
          this._forView(target, function (view) {
            return view.show(route);
          });

          e.cancelBubble = true;
          return e.preventDefault();
        }
      }
    }

    var parent = target.parentNode;

    if (parent) {
      this.clickHandler(e, parent);
    }
  };

  _proto6.getRoot = function getRoot() {
    return this.getSubView().getRoot();
  };

  _proto6.refresh = function refresh() {
    var _this12 = this;

    if (!this._subSegment) {
      return Promise.resolve(null);
    }

    return this.getSubView().refresh().then(function (view) {
      _this12.callEvent("app:route", [_this12.getUrl()]);

      return view;
    });
  };

  _proto6.loadView = function loadView(url) {
    var _this13 = this;

    var views = this.config.views;
    var result = null;

    if (url === "") {
      return Promise.resolve(this._loadError("", new Error("Webix Jet: Empty url segment")));
    }

    try {
      if (views) {
        if (typeof views === "function") {
          // custom loading strategy
          result = views(url);
        } else {
          // predefined hash
          result = views[url];
        }

        if (typeof result === "string") {
          url = result;
          result = null;
        }
      }

      if (!result) {
        if (url === "_blank") {
          result = {};
        } else {
          result = this._loadViewDynamic(url);
        }
      }
    } catch (e) {
      result = this._loadError(url, e);
    } // custom handler can return view or its promise


    if (!result.then) {
      result = Promise.resolve(result);
    } // set error handler


    result = result.then(function (module) {
      return module.__esModule ? module.default : module;
    }).catch(function (err) {
      return _this13._loadError(url, err);
    });
    return result;
  };

  _proto6._forView = function _forView(target, handler) {
    var view = this.webix.$$(target);

    if (view) {
      handler(view.$scope);
    }
  };

  _proto6._loadViewDynamic = function _loadViewDynamic(url) {
    return null;
  };

  _proto6.createFromURL = function createFromURL(chunk) {
    var _this14 = this;

    var view;

    if (chunk.isNew || !chunk.view) {
      view = this.loadView(chunk.page).then(function (ui) {
        return _this14.createView(ui, name);
      });
    } else {
      view = Promise.resolve(chunk.view);
    }

    return view;
  };

  _proto6.createView = function createView(ui, name) {
    var obj;

    if (typeof ui === "function") {
      if (ui.prototype instanceof JetAppBase) {
        // UI class
        return new ui({
          app: this,
          name: name,
          router: SubRouter
        });
      } else if (ui.prototype instanceof JetBase) {
        // UI class
        return new ui(this, {
          name: name
        });
      } else {
        // UI factory functions
        ui = ui(this);
      }
    }

    if (ui instanceof JetBase) {
      obj = ui;
    } else {
      // UI object
      obj = new JetViewRaw(this, {
        name: name,
        ui: ui
      });
    }

    return obj;
  } // show view path
  ;

  _proto6.show = function show(url) {
    return this.render(this._container, url || this.config.start);
  } // event helpers
  ;

  _proto6.trigger = function trigger(name) {
    for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      rest[_key - 1] = arguments[_key];
    }

    this.apply(name, rest);
  };

  _proto6.apply = function apply(name, data) {
    this.callEvent(name, data);
  };

  _proto6.action = function action(name) {
    return this.webix.bind(function () {
      for (var _len2 = arguments.length, rest = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        rest[_key2] = arguments[_key2];
      }

      this.apply(name, rest);
    }, this);
  };

  _proto6.on = function on(name, handler) {
    this.attachEvent(name, handler);
  };

  _proto6.use = function use(plugin, config) {
    plugin(this, null, config);
  };

  _proto6.error = function error(name, er) {
    this.callEvent(name, er);
    this.callEvent("app:error", er);
    /* tslint:disable */

    if (this.config.debug) {
      for (var i = 0; i < er.length; i++) {
        console.error(er[i]);

        if (er[i] instanceof Error) {
          var text = er[i].message;

          if (text.indexOf("Module build failed") === 0) {
            text = text.replace(/\x1b\[[0-9;]*m/g, "");
            document.body.innerHTML = "<pre style='font-size:16px; background-color: #ec6873; color: #000; padding:10px;'>" + text + "</pre>";
          } else {
            text += "<br><br>Check console for more details";
            this.webix.message({
              type: "error",
              text: text,
              expire: -1
            });
          }
        }
      }

      debugger;
    }
    /* tslint:enable */

  } // renders top view
  ;

  _proto6.render = function render(root, url, parent) {
    var _this15 = this;

    this._container = typeof root === "string" ? this.webix.toNode(root) : root || document.body;
    var firstInit = !this.$router;
    var path = null;

    if (firstInit) {
      if (_once && "tagName" in this._container) {
        this.webix.event(document.body, "click", function (e) {
          return _this15.clickHandler(e);
        });
        _once = false;
      }

      if (typeof url === "string") {
        url = new Route(url, 0);
      }

      this._subSegment = this._first_start(url);
      this._subSegment.route.linkRouter = true;
    } else {
      if (typeof url === "string") {
        path = url;
      } else {
        if (this.app) {
          path = url.split().route.path || this.config.start;
        } else {
          path = url.toString();
        }
      }
    }

    var top = this.getSubView();
    var segment = this._subSegment;
    var ready = segment.show(path, top).then(function () {
      return _this15.createFromURL(segment.current());
    }).then(function (view) {
      return view.render(root, segment);
    }).then(function (base) {
      _this15.$router.set(segment.route.path, {
        silent: true
      });

      _this15.callEvent("app:route", [_this15.getUrl()]);

      return base;
    });
    this.ready = this.ready.then(function () {
      return ready;
    });
    return ready;
  };

  _proto6.getSubView = function getSubView() {
    if (this._subSegment) {
      var view = this._subSegment.current().view;

      if (view) return view;
    }

    return new JetView(this, {});
  };

  _proto6._first_start = function _first_start(route) {
    var _this16 = this;

    this._segment = route;

    var cb = function cb(a) {
      return setTimeout(function () {
        _this16.show(a).catch(function (e) {
          if (!(e instanceof NavigationBlocked)) throw e;
        });
      }, 1);
    };

    this.$router = new this.config.router(cb, this.config, this); // start animation for top-level app

    if (this._container === document.body && this.config.animation !== false) {
      var node = this._container;
      this.webix.html.addCss(node, "webixappstart");
      setTimeout(function () {
        _this16.webix.html.removeCss(node, "webixappstart");

        _this16.webix.html.addCss(node, "webixapp");
      }, 10);
    }

    if (!route) {
      // if no url defined, check router first
      var urlString = this.$router.get();

      if (!urlString) {
        urlString = this.config.start;
        this.$router.set(urlString, {
          silent: true
        });
      }

      route = new Route(urlString, 0);
    } else if (this.app) {
      route.current().view = this;

      if (route.next()) {
        route.refresh();
        route = route.split();
      } else {
        route = new Route(this.config.start, 0);
      }
    }

    return route;
  } // error during view resolving
  ;

  _proto6._loadError = function _loadError(url, err) {
    this.error("app:error:resolve", [err, url]);
    return {
      template: " "
    };
  };

  _proto6.addSubView = function addSubView(obj, target, config) {
    var url = obj.$subview !== true ? obj.$subview : null;
    var name = obj.name || (url ? this.webix.uid() : "default");
    target.id = obj.id || "s" + this.webix.uid();
    var view = config[name] = {
      id: target.id,
      url: url,
      branch: obj.branch,
      popup: obj.popup
    };
    return view.popup ? null : target;
  };

  return JetAppBase;
}(JetBase);

var HashRouter = /*#__PURE__*/function () {
  function HashRouter(cb, config) {
    var _this17 = this;

    this.config = config || {};

    this._detectPrefix();

    this.cb = cb;

    window.onpopstate = function () {
      return _this17.cb(_this17.get());
    };
  }

  var _proto7 = HashRouter.prototype;

  _proto7.set = function set(path, config) {
    var _this18 = this;

    if (this.config.routes) {
      var compare = path.split("?", 2);

      for (var key in this.config.routes) {
        if (this.config.routes[key] === compare[0]) {
          path = key + (compare.length > 1 ? "?" + compare[1] : "");
          break;
        }
      }
    }

    if (this.get() !== path) {
      window.history.pushState(null, null, this.prefix + this.sufix + path);
    }

    if (!config || !config.silent) {
      setTimeout(function () {
        return _this18.cb(path);
      }, 1);
    }
  };

  _proto7.get = function get() {
    var path = this._getRaw().replace(this.prefix, "").replace(this.sufix, "");

    path = path !== "/" && path !== "#" ? path : "";

    if (this.config.routes) {
      var compare = path.split("?", 2);
      var key = this.config.routes[compare[0]];

      if (key) {
        path = key + (compare.length > 1 ? "?" + compare[1] : "");
      }
    }

    return path;
  };

  _proto7._detectPrefix = function _detectPrefix() {
    // use "#!" for backward compatibility
    var sufix = this.config.routerPrefix;
    this.sufix = "#" + (typeof sufix === "undefined" ? "!" : sufix);
    this.prefix = document.location.href.split("#", 2)[0];
  };

  _proto7._getRaw = function _getRaw() {
    return document.location.href;
  };

  return HashRouter;
}();

var isPatched = false;

function patch(w) {
  if (isPatched || !w) {
    return;
  }

  isPatched = true; // custom promise for IE8

  var win = window;

  if (!win.Promise) {
    win.Promise = w.promise;
  }

  var version = w.version.split("."); // will be fixed in webix 5.3

  if (version[0] * 10 + version[1] * 1 < 53) {
    w.ui.freeze = function (handler) {
      // disabled because webix jet 5.0 can't handle resize of scrollview correctly
      // w.ui.$freeze = true;
      var res = handler();

      if (res && res.then) {
        res.then(function (some) {
          w.ui.$freeze = false;
          w.ui.resize();
          return some;
        });
      } else {
        w.ui.$freeze = false;
        w.ui.resize();
      }

      return res;
    };
  } // adding views as classes


  var baseAdd = w.ui.baselayout.prototype.addView;
  var baseRemove = w.ui.baselayout.prototype.removeView;
  var config = {
    addView: function addView(view, index) {
      var _this19 = this;

      // trigger logic only for widgets inside of jet-view
      // ignore case when addView used with already initialized widget
      if (this.$scope && this.$scope.webixJet && !view.queryView) {
        var _ret = function () {
          var jview = _this19.$scope;
          var subs = {};
          view = jview.app.copyConfig(view, {}, subs);
          baseAdd.apply(_this19, [view, index]);

          var _loop = function _loop(key) {
            jview._renderFrame(key, subs[key], null).then(function () {
              jview._subs[key] = subs[key];
            });
          };

          for (var key in subs) {
            _loop(key);
          }

          return {
            v: view.id
          };
        }();

        if (typeof _ret === "object") return _ret.v;
      } else {
        return baseAdd.apply(this, arguments);
      }
    },
    removeView: function removeView() {
      baseRemove.apply(this, arguments);

      if (this.$scope && this.$scope.webixJet) {
        var subs = this.$scope._subs; // check all sub-views, destroy and clean the removed one

        for (var key in subs) {
          var test = subs[key];

          if (!w.$$(test.id)) {
            test.view.destructor();
            delete subs[key];
          }
        }
      }
    }
  };
  w.extend(w.ui.layout.prototype, config, true);
  w.extend(w.ui.baselayout.prototype, config, true); // wrapper for using Jet Apps as views

  w.protoUI({
    name: "jetapp",
    $init: function $init(cfg) {
      this.$app = new this.app(cfg);
      var id = w.uid().toString();
      cfg.body = {
        id: id
      };
      this.$ready.push(function () {
        this.$app.render({
          id: id
        });
      });

      for (var key in this.$app) {
        var origin = this.$app[key];

        if (typeof origin === "function" && !this[key]) {
          this[key] = origin.bind(this.$app);
        }
      }
    }
  }, w.ui.proxy);
}

var JetApp = /*#__PURE__*/function (_JetAppBase) {
  (0,_babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(JetApp, _JetAppBase);

  function JetApp(config) {
    var _this20;

    config.router = config.router || HashRouter;
    _this20 = _JetAppBase.call(this, config) || this;
    patch(_this20.webix);
    return _this20;
  }

  var _proto8 = JetApp.prototype;

  _proto8._loadViewDynamic = function _loadViewDynamic(url) {
    url = url.replace(/\./g, "/");
    return __webpack_require__("./sources/views sync recursive ^\\.\\/.*$")("./" + url);
  };

  return JetApp;
}(JetAppBase);

var StoreRouter = /*#__PURE__*/function () {
  function StoreRouter(cb, config, app) {
    this.storage = config.storage || app.webix.storage.session;
    this.name = config.storeName || config.id + ":route";
    this.cb = cb;
  }

  var _proto9 = StoreRouter.prototype;

  _proto9.set = function set(path, config) {
    var _this21 = this;

    this.storage.put(this.name, path);

    if (!config || !config.silent) {
      setTimeout(function () {
        return _this21.cb(path);
      }, 1);
    }
  };

  _proto9.get = function get() {
    return this.storage.get(this.name);
  };

  return StoreRouter;
}();

var UrlRouter = /*#__PURE__*/function (_HashRouter) {
  (0,_babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(UrlRouter, _HashRouter);

  function UrlRouter() {
    return _HashRouter.apply(this, arguments) || this;
  }

  var _proto10 = UrlRouter.prototype;

  _proto10._detectPrefix = function _detectPrefix() {
    this.prefix = "";
    this.sufix = this.config.routerPrefix || "";
  };

  _proto10._getRaw = function _getRaw() {
    return document.location.pathname + (document.location.search || "");
  };

  return UrlRouter;
}(HashRouter);

var EmptyRouter = /*#__PURE__*/function () {
  function EmptyRouter(cb, _$config) {
    this.path = "";
    this.cb = cb;
  }

  var _proto11 = EmptyRouter.prototype;

  _proto11.set = function set(path, config) {
    var _this22 = this;

    this.path = path;

    if (!config || !config.silent) {
      setTimeout(function () {
        return _this22.cb(path);
      }, 1);
    }
  };

  _proto11.get = function get() {
    return this.path;
  };

  return EmptyRouter;
}();

function UnloadGuard(app, view, config) {
  view.on(app, "app:guard", function (_$url, point, promise) {
    if (point === view || point.contains(view)) {
      var res = config();

      if (res === false) {
        promise.confirm = Promise.reject(new NavigationBlocked());
      } else {
        promise.confirm = promise.confirm.then(function () {
          return res;
        });
      }
    }
  });
} //     (c) 2012-2018 Airbnb, Inc.
// var has = require('has');


function has(store, key) {
  return Object.prototype.hasOwnProperty.call(store, key);
} // var forEach = require('for-each');


function forEach(obj, handler, context) {
  for (var key in obj) {
    if (has(obj, key)) {
      handler.call(context || obj, obj[key], key, obj);
    }
  }
} // var trim = require('string.prototype.trim');


function trim(str) {
  return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
} // var warning = require('warning');


function warn(message) {
  message = 'Warning: ' + message;

  if (typeof console !== 'undefined') {
    console.error(message);
  }

  try {
    throw new Error(message);
  } catch (x) {}
}

var replace = String.prototype.replace;
var split = String.prototype.split; // #### Pluralization methods
// The string that separates the different phrase possibilities.

var delimiter = '||||';

var russianPluralGroups = function russianPluralGroups(n) {
  var end = n % 10;

  if (n !== 11 && end === 1) {
    return 0;
  }

  if (2 <= end && end <= 4 && !(n >= 12 && n <= 14)) {
    return 1;
  }

  return 2;
}; // Mapping from pluralization group plural logic.


var pluralTypes = {
  arabic: function arabic(n) {
    // http://www.arabeyes.org/Plural_Forms
    if (n < 3) {
      return n;
    }

    var lastTwo = n % 100;
    if (lastTwo >= 3 && lastTwo <= 10) return 3;
    return lastTwo >= 11 ? 4 : 5;
  },
  bosnian_serbian: russianPluralGroups,
  chinese: function chinese() {
    return 0;
  },
  croatian: russianPluralGroups,
  french: function french(n) {
    return n > 1 ? 1 : 0;
  },
  german: function german(n) {
    return n !== 1 ? 1 : 0;
  },
  russian: russianPluralGroups,
  lithuanian: function lithuanian(n) {
    if (n % 10 === 1 && n % 100 !== 11) {
      return 0;
    }

    return n % 10 >= 2 && n % 10 <= 9 && (n % 100 < 11 || n % 100 > 19) ? 1 : 2;
  },
  czech: function czech(n) {
    if (n === 1) {
      return 0;
    }

    return n >= 2 && n <= 4 ? 1 : 2;
  },
  polish: function polish(n) {
    if (n === 1) {
      return 0;
    }

    var end = n % 10;
    return 2 <= end && end <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2;
  },
  icelandic: function icelandic(n) {
    return n % 10 !== 1 || n % 100 === 11 ? 1 : 0;
  },
  slovenian: function slovenian(n) {
    var lastTwo = n % 100;

    if (lastTwo === 1) {
      return 0;
    }

    if (lastTwo === 2) {
      return 1;
    }

    if (lastTwo === 3 || lastTwo === 4) {
      return 2;
    }

    return 3;
  }
}; // Mapping from pluralization group to individual language codes/locales.
// Will look up based on exact match, if not found and it's a locale will parse the locale
// for language code, and if that does not exist will default to 'en'

var pluralTypeToLanguages = {
  arabic: ['ar'],
  bosnian_serbian: ['bs-Latn-BA', 'bs-Cyrl-BA', 'srl-RS', 'sr-RS'],
  chinese: ['id', 'id-ID', 'ja', 'ko', 'ko-KR', 'lo', 'ms', 'th', 'th-TH', 'zh'],
  croatian: ['hr', 'hr-HR'],
  german: ['fa', 'da', 'de', 'en', 'es', 'fi', 'el', 'he', 'hi-IN', 'hu', 'hu-HU', 'it', 'nl', 'no', 'pt', 'sv', 'tr'],
  french: ['fr', 'tl', 'pt-br'],
  russian: ['ru', 'ru-RU'],
  lithuanian: ['lt'],
  czech: ['cs', 'cs-CZ', 'sk'],
  polish: ['pl'],
  icelandic: ['is'],
  slovenian: ['sl-SL']
};

function langToTypeMap(mapping) {
  var ret = {};
  forEach(mapping, function (langs, type) {
    forEach(langs, function (lang) {
      ret[lang] = type;
    });
  });
  return ret;
}

function pluralTypeName(locale) {
  var langToPluralType = langToTypeMap(pluralTypeToLanguages);
  return langToPluralType[locale] || langToPluralType[split.call(locale, /-/, 1)[0]] || langToPluralType.en;
}

function pluralTypeIndex(locale, count) {
  return pluralTypes[pluralTypeName(locale)](count);
}

function escape(token) {
  return token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function constructTokenRegex(opts) {
  var prefix = opts && opts.prefix || '%{';
  var suffix = opts && opts.suffix || '}';

  if (prefix === delimiter || suffix === delimiter) {
    throw new RangeError('"' + delimiter + '" token is reserved for pluralization');
  }

  return new RegExp(escape(prefix) + '(.*?)' + escape(suffix), 'g');
}

var dollarRegex = /\$/g;
var dollarBillsYall = '$$';
var defaultTokenRegex = /%\{(.*?)\}/g; // ### transformPhrase(phrase, substitutions, locale)
//
// Takes a phrase string and transforms it by choosing the correct
// plural form and interpolating it.
//
//     transformPhrase('Hello, %{name}!', {name: 'Spike'});
//     // "Hello, Spike!"
//
// The correct plural form is selected if substitutions.smart_count
// is set. You can pass in a number instead of an Object as `substitutions`
// as a shortcut for `smart_count`.
//
//     transformPhrase('%{smart_count} new messages |||| 1 new message', {smart_count: 1}, 'en');
//     // "1 new message"
//
//     transformPhrase('%{smart_count} new messages |||| 1 new message', {smart_count: 2}, 'en');
//     // "2 new messages"
//
//     transformPhrase('%{smart_count} new messages |||| 1 new message', 5, 'en');
//     // "5 new messages"
//
// You should pass in a third argument, the locale, to specify the correct plural type.
// It defaults to `'en'` with 2 plural forms.

function transformPhrase(phrase, substitutions, locale, tokenRegex) {
  if (typeof phrase !== 'string') {
    throw new TypeError('Polyglot.transformPhrase expects argument #1 to be string');
  }

  if (substitutions == null) {
    return phrase;
  }

  var result = phrase;
  var interpolationRegex = tokenRegex || defaultTokenRegex; // allow number as a pluralization shortcut

  var options = typeof substitutions === 'number' ? {
    smart_count: substitutions
  } : substitutions; // Select plural form: based on a phrase text that contains `n`
  // plural forms separated by `delimiter`, a `locale`, and a `substitutions.smart_count`,
  // choose the correct plural form. This is only done if `count` is set.

  if (options.smart_count != null && result) {
    var texts = split.call(result, delimiter);
    result = trim(texts[pluralTypeIndex(locale || 'en', options.smart_count)] || texts[0]);
  } // Interpolate: Creates a `RegExp` object for each interpolation placeholder.


  result = replace.call(result, interpolationRegex, function (expression, argument) {
    if (!has(options, argument) || options[argument] == null) {
      return expression;
    } // Ensure replacement value is escaped to prevent special $-prefixed regex replace tokens.


    return replace.call(options[argument], dollarRegex, dollarBillsYall);
  });
  return result;
} // ### Polyglot class constructor


function Polyglot(options) {
  var opts = options || {};
  this.phrases = {};
  this.extend(opts.phrases || {});
  this.currentLocale = opts.locale || 'en';
  var allowMissing = opts.allowMissing ? transformPhrase : null;
  this.onMissingKey = typeof opts.onMissingKey === 'function' ? opts.onMissingKey : allowMissing;
  this.warn = opts.warn || warn;
  this.tokenRegex = constructTokenRegex(opts.interpolation);
} // ### polyglot.locale([locale])
//
// Get or set locale. Internally, Polyglot only uses locale for pluralization.


Polyglot.prototype.locale = function (newLocale) {
  if (newLocale) this.currentLocale = newLocale;
  return this.currentLocale;
}; // ### polyglot.extend(phrases)
//
// Use `extend` to tell Polyglot how to translate a given key.
//
//     polyglot.extend({
//       "hello": "Hello",
//       "hello_name": "Hello, %{name}"
//     });
//
// The key can be any string.  Feel free to call `extend` multiple times;
// it will override any phrases with the same key, but leave existing phrases
// untouched.
//
// It is also possible to pass nested phrase objects, which get flattened
// into an object with the nested keys concatenated using dot notation.
//
//     polyglot.extend({
//       "nav": {
//         "hello": "Hello",
//         "hello_name": "Hello, %{name}",
//         "sidebar": {
//           "welcome": "Welcome"
//         }
//       }
//     });
//
//     console.log(polyglot.phrases);
//     // {
//     //   'nav.hello': 'Hello',
//     //   'nav.hello_name': 'Hello, %{name}',
//     //   'nav.sidebar.welcome': 'Welcome'
//     // }
//
// `extend` accepts an optional second argument, `prefix`, which can be used
// to prefix every key in the phrases object with some string, using dot
// notation.
//
//     polyglot.extend({
//       "hello": "Hello",
//       "hello_name": "Hello, %{name}"
//     }, "nav");
//
//     console.log(polyglot.phrases);
//     // {
//     //   'nav.hello': 'Hello',
//     //   'nav.hello_name': 'Hello, %{name}'
//     // }
//
// This feature is used internally to support nested phrase objects.


Polyglot.prototype.extend = function (morePhrases, prefix) {
  forEach(morePhrases, function (phrase, key) {
    var prefixedKey = prefix ? prefix + '.' + key : key;

    if (typeof phrase === 'object') {
      this.extend(phrase, prefixedKey);
    } else {
      this.phrases[prefixedKey] = phrase;
    }
  }, this);
}; // ### polyglot.unset(phrases)
// Use `unset` to selectively remove keys from a polyglot instance.
//
//     polyglot.unset("some_key");
//     polyglot.unset({
//       "hello": "Hello",
//       "hello_name": "Hello, %{name}"
//     });
//
// The unset method can take either a string (for the key), or an object hash with
// the keys that you would like to unset.


Polyglot.prototype.unset = function (morePhrases, prefix) {
  if (typeof morePhrases === 'string') {
    delete this.phrases[morePhrases];
  } else {
    forEach(morePhrases, function (phrase, key) {
      var prefixedKey = prefix ? prefix + '.' + key : key;

      if (typeof phrase === 'object') {
        this.unset(phrase, prefixedKey);
      } else {
        delete this.phrases[prefixedKey];
      }
    }, this);
  }
}; // ### polyglot.clear()
//
// Clears all phrases. Useful for special cases, such as freeing
// up memory if you have lots of phrases but no longer need to
// perform any translation. Also used internally by `replace`.


Polyglot.prototype.clear = function () {
  this.phrases = {};
}; // ### polyglot.replace(phrases)
//
// Completely replace the existing phrases with a new set of phrases.
// Normally, just use `extend` to add more phrases, but under certain
// circumstances, you may want to make sure no old phrases are lying around.


Polyglot.prototype.replace = function (newPhrases) {
  this.clear();
  this.extend(newPhrases);
}; // ### polyglot.t(key, options)
//
// The most-used method. Provide a key, and `t` will return the
// phrase.
//
//     polyglot.t("hello");
//     => "Hello"
//
// The phrase value is provided first by a call to `polyglot.extend()` or
// `polyglot.replace()`.
//
// Pass in an object as the second argument to perform interpolation.
//
//     polyglot.t("hello_name", {name: "Spike"});
//     => "Hello, Spike"
//
// If you like, you can provide a default value in case the phrase is missing.
// Use the special option key "_" to specify a default.
//
//     polyglot.t("i_like_to_write_in_language", {
//       _: "I like to write in %{language}.",
//       language: "JavaScript"
//     });
//     => "I like to write in JavaScript."
//


Polyglot.prototype.t = function (key, options) {
  var phrase, result;
  var opts = options == null ? {} : options;

  if (typeof this.phrases[key] === 'string') {
    phrase = this.phrases[key];
  } else if (typeof opts._ === 'string') {
    phrase = opts._;
  } else if (this.onMissingKey) {
    var onMissingKey = this.onMissingKey;
    result = onMissingKey(key, opts, this.currentLocale, this.tokenRegex);
  } else {
    this.warn('Missing translation for key: "' + key + '"');
    result = key;
  }

  if (typeof phrase === 'string') {
    result = transformPhrase(phrase, opts, this.currentLocale, this.tokenRegex);
  }

  return result;
}; // ### polyglot.has(key)
//
// Check if polyglot has a translation for given key


Polyglot.prototype.has = function (key) {
  return has(this.phrases, key);
}; // export transformPhrase


Polyglot.transformPhrase = function transform(phrase, substitutions, locale) {
  return transformPhrase(phrase, substitutions, locale);
};

var webixPolyglot = Polyglot;

function Locale(app, _view, config) {
  config = config || {};
  var storage = config.storage;
  var lang = storage ? storage.get("lang") || "en" : config.lang || "en";

  function setLangData(name, data, silent) {
    if (data.__esModule) {
      data = data.default;
    }

    var pconfig = {
      phrases: data
    };

    if (config.polyglot) {
      app.webix.extend(pconfig, config.polyglot);
    }

    var poly = service.polyglot = new webixPolyglot(pconfig);
    poly.locale(name);
    service._ = app.webix.bind(poly.t, poly);
    lang = name;

    if (storage) {
      storage.put("lang", lang);
    }

    if (config.webix) {
      var locName = config.webix[name];

      if (locName) {
        app.webix.i18n.setLocale(locName);
      }
    }

    if (!silent) {
      return app.refresh();
    }

    return Promise.resolve();
  }

  function getLang() {
    return lang;
  }

  function setLang(name, silent) {
    // ignore setLang if loading by path is disabled
    if (config.path === false) {
      return;
    }

    var path = (config.path ? config.path + "/" : "") + name;

    var data = __webpack_require__("./sources/locales sync recursive ^\\.\\/.*$")("./" + path);

    setLangData(name, data, silent);
  }

  var service = {
    getLang: getLang,
    setLang: setLang,
    setLangData: setLangData,
    _: null,
    polyglot: null
  };
  app.setService("locale", service);
  setLang(lang, true);
}

function show(view, config, value) {
  if (config.urls) {
    value = config.urls[value] || value;
  } else if (config.param) {
    var _value;

    value = (_value = {}, _value[config.param] = value, _value);
  }

  view.show(value);
}

function Menu(app, view, config) {
  var frame = view.getSubViewInfo().parent;
  var ui = view.$$(config.id || config);
  var silent = false;
  ui.attachEvent("onchange", function () {
    if (!silent) {
      show(frame, config, this.getValue());
    }
  });
  ui.attachEvent("onafterselect", function () {
    if (!silent) {
      var id = null;

      if (ui.setValue) {
        id = this.getValue();
      } else if (ui.getSelectedId) {
        id = ui.getSelectedId();
      }

      show(frame, config, id);
    }
  });
  view.on(app, "app:route", function () {
    var name = "";

    if (config.param) {
      name = view.getParam(config.param, true);
    } else {
      var segment = frame.getUrl()[1];

      if (segment) {
        name = segment.page;
      }
    }

    if (name) {
      silent = true;

      if (ui.setValue && ui.getValue() !== name) {
        ui.setValue(name);
      } else if (ui.select && ui.exists(name) && ui.getSelectedId() !== name) {
        ui.select(name);
      }

      silent = false;
    }
  });
}

var baseicons = {
  good: "check",
  error: "warning",
  saving: "refresh fa-spin"
};
var basetext = {
  good: "Ok",
  error: "Error",
  saving: "Connecting..."
};

function Status(app, view, config) {
  var status = "good";
  var count = 0;
  var iserror = false;
  var expireDelay = config.expire;

  if (!expireDelay && expireDelay !== false) {
    expireDelay = 2000;
  }

  var texts = config.texts || basetext;
  var icons = config.icons || baseicons;

  if (typeof config === "string") {
    config = {
      target: config
    };
  }

  function refresh(content) {
    var area = view.$$(config.target);

    if (area) {
      if (!content) {
        content = "<div class='status_" + status + "'><span class='webix_icon fa-" + icons[status] + "'></span> " + texts[status] + "</div>";
      }

      area.setHTML(content);
    }
  }

  function success() {
    count--;
    setStatus("good");
  }

  function fail(err) {
    count--;
    setStatus("error", err);
  }

  function start(promise) {
    count++;
    setStatus("saving");

    if (promise && promise.then) {
      promise.then(success, fail);
    }
  }

  function getStatus() {
    return status;
  }

  function hideStatus() {
    if (count === 0) {
      refresh(" ");
    }
  }

  function setStatus(mode, err) {
    if (count < 0) {
      count = 0;
    }

    if (mode === "saving") {
      status = "saving";
      refresh();
    } else {
      iserror = mode === "error";

      if (count === 0) {
        status = iserror ? "error" : "good";

        if (iserror) {
          app.error("app:error:server", [err.responseText || err]);
        } else {
          if (expireDelay) {
            setTimeout(hideStatus, expireDelay);
          }
        }

        refresh();
      }
    }
  }

  function track(data) {
    var dp = app.webix.dp(data);

    if (dp) {
      view.on(dp, "onAfterDataSend", start);
      view.on(dp, "onAfterSaveError", function (_id, _obj, response) {
        return fail(response);
      });
      view.on(dp, "onAfterSave", success);
    }
  }

  app.setService("status", {
    getStatus: getStatus,
    setStatus: setStatus,
    track: track
  });

  if (config.remote) {
    view.on(app.webix, "onRemoteCall", start);
  }

  if (config.ajax) {
    view.on(app.webix, "onBeforeAjax", function (_mode, _url, _data, _request, _headers, _files, promise) {
      start(promise);
    });
  }

  if (config.data) {
    track(config.data);
  }
}

function Theme(app, _view, config) {
  config = config || {};
  var storage = config.storage;
  var theme = storage ? storage.get("theme") || "flat-default" : config.theme || "flat-default";
  var service = {
    getTheme: function getTheme() {
      return theme;
    },
    setTheme: function setTheme(name, silent) {
      var parts = name.split("-");
      var links = document.getElementsByTagName("link");

      for (var i = 0; i < links.length; i++) {
        var lname = links[i].getAttribute("title");

        if (lname) {
          if (lname === name || lname === parts[0]) {
            links[i].disabled = false;
          } else {
            links[i].disabled = true;
          }
        }
      }

      app.webix.skin.set(parts[0]); // remove old css

      app.webix.html.removeCss(document.body, "theme-" + theme); // add new css

      app.webix.html.addCss(document.body, "theme-" + name);
      theme = name;

      if (storage) {
        storage.put("theme", name);
      }

      if (!silent) {
        app.refresh();
      }
    }
  };
  app.setService("theme", service);
  service.setTheme(theme, true);
}

function copyParams(data, url, route) {
  for (var i = 0; i < route.length; i++) {
    data[route[i]] = url[i + 1] ? url[i + 1].page : "";
  }
}

function UrlParam(app, view, config) {
  var route = config.route || config;
  var data = {};
  view.on(app, "app:urlchange", function (subview, segment) {
    if (view === subview) {
      copyParams(data, segment.suburl(), route);
      segment.size(route.length + 1);
    }
  });
  var os = view.setParam;
  var og = view.getParam;

  view.setParam = function (name, value, show) {
    var index = route.indexOf(name);

    if (index >= 0) {
      data[name] = value;

      this._segment.update("", value, index + 1);

      if (show) {
        return view.show(null);
      }
    } else {
      return os.call(this, name, value, show);
    }
  };

  view.getParam = function (key, mode) {
    var val = data[key];

    if (typeof val !== "undefined") {
      return val;
    }

    return og.call(this, key, mode);
  };

  copyParams(data, view.getUrl(), route);
}

function User(app, _view, config) {
  config = config || {};
  var login = config.login || "/login";
  var logout = config.logout || "/logout";
  var afterLogin = config.afterLogin || app.config.start;
  var afterLogout = config.afterLogout || "/login";
  var ping = config.ping || 5 * 60 * 1000;
  var model = config.model;
  var user = config.user;
  var service = {
    getUser: function getUser() {
      return user;
    },
    getStatus: function getStatus(server) {
      if (!server) {
        return user !== null;
      }

      return model.status().catch(function () {
        return null;
      }).then(function (data) {
        user = data;
      });
    },
    login: function login(name, pass) {
      return model.login(name, pass).then(function (data) {
        user = data;

        if (!data) {
          throw new Error("Access denied");
        }

        app.callEvent("app:user:login", [user]);
        app.show(afterLogin);
      });
    },
    logout: function logout() {
      user = null;
      return model.logout().then(function (res) {
        app.callEvent("app:user:logout", []);
        return res;
      });
    }
  };

  function canNavigate(url, obj) {
    if (url === logout) {
      service.logout();
      obj.redirect = afterLogout;
    } else if (url !== login && !service.getStatus()) {
      obj.redirect = login;
    }
  }

  app.setService("user", service);
  app.attachEvent("app:guard", function (url, _$root, obj) {
    if (config.public && config.public(url)) {
      return true;
    }

    if (typeof user === "undefined") {
      obj.confirm = service.getStatus(true).then(function () {
        return canNavigate(url, obj);
      });
    }

    return canNavigate(url, obj);
  });

  if (ping) {
    setInterval(function () {
      return service.getStatus(true);
    }, ping);
  }
}
/*
MIT License
Copyright (c) 2019 XB Software
*/


var webix = window.webix;

if (webix) {
  patch(webix);
}

var plugins = {
  UnloadGuard: UnloadGuard,
  Locale: Locale,
  Menu: Menu,
  Theme: Theme,
  User: User,
  Status: Status,
  UrlParam: UrlParam
};
var errors = {
  NavigationBlocked: NavigationBlocked
};
var w = window;

if (!w.Promise) {
  w.Promise = w.webix.promise;
}



/***/ }),

/***/ "./sources/locales/en.js":
/*!*******************************!*\
  !*** ./sources/locales/en.js ***!
  \*******************************/
/***/ (() => {



/***/ }),

/***/ "./sources/models/records.js":
/*!***********************************!*\
  !*** ./sources/models/records.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "data": () => (/* binding */ data)
/* harmony export */ });
var data = new webix.DataCollection({
  data: [{
    id: 1,
    title: "The Shawshank Redemption",
    year: 1994,
    votes: 678790,
    rating: 9.2,
    rank: 1
  }, {
    id: 2,
    title: "The Godfather",
    year: 1972,
    votes: 511495,
    rating: 9.2,
    rank: 2
  }, {
    id: 3,
    title: "The Godfather: Part II",
    year: 1974,
    votes: 319352,
    rating: 9.0,
    rank: 3
  }, {
    id: 4,
    title: "The Good, the Bad and the Ugly",
    year: 1966,
    votes: 213030,
    rating: 8.9,
    rank: 4
  }, {
    id: 5,
    title: "My Fair Lady",
    year: 1964,
    votes: 533848,
    rating: 8.9,
    rank: 5
  }, {
    id: 6,
    title: "12 Angry Men",
    year: 1957,
    votes: 164558,
    rating: 8.9,
    rank: 6
  }]
});

/***/ }),

/***/ "./sources/views/data.js":
/*!*******************************!*\
  !*** ./sources/views/data.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DataView)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var webix_jet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! webix-jet */ "./node_modules/webix-jet/dist/es6/jet.js");
/* harmony import */ var models_records__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! models/records */ "./sources/models/records.js");




var DataView = /*#__PURE__*/function (_JetView) {
  (0,_babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(DataView, _JetView);

  function DataView() {
    return _JetView.apply(this, arguments) || this;
  }

  var _proto = DataView.prototype;

  _proto.config = function config() {
    return {
      view: "datatable",
      autoConfig: true,
      css: "webix_shadow_medium"
    };
  };

  _proto.init = function init(view) {
    view.parse(models_records__WEBPACK_IMPORTED_MODULE_2__.data);
  };

  return DataView;
}(webix_jet__WEBPACK_IMPORTED_MODULE_1__.JetView);



/***/ }),

/***/ "./sources/views/start.js":
/*!********************************!*\
  !*** ./sources/views/start.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  template: "Start page",
  css: "webix_shadow_medium app_start"
});

/***/ }),

/***/ "./sources/views/top.js":
/*!******************************!*\
  !*** ./sources/views/top.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TopView)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var webix_jet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! webix-jet */ "./node_modules/webix-jet/dist/es6/jet.js");



var TopView = /*#__PURE__*/function (_JetView) {
  (0,_babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(TopView, _JetView);

  function TopView() {
    return _JetView.apply(this, arguments) || this;
  }

  var _proto = TopView.prototype;

  _proto.config = function config() {
    var header = {
      type: "header",
      template: this.app.config.name,
      css: "webix_header app_header"
    };
    var menu = {
      view: "menu",
      id: "top:menu",
      css: "app_menu",
      width: 180,
      layout: "y",
      select: true,
      template: "<span class='webix_icon #icon#'></span> #value# ",
      data: [{
        value: "Dashboard",
        id: "start",
        icon: "wxi-columns"
      }, {
        value: "Data",
        id: "data",
        icon: "wxi-pencil"
      }]
    };
    var ui = {
      type: "clean",
      paddingX: 5,
      css: "app_layout",
      cols: [{
        paddingX: 5,
        paddingY: 10,
        rows: [{
          css: "webix_shadow_medium",
          rows: [header, menu]
        }]
      }, {
        type: "wide",
        paddingY: 10,
        paddingX: 5,
        rows: [{
          $subview: true
        }]
      }]
    };
    return ui;
  };

  _proto.init = function init() {
    this.use(webix_jet__WEBPACK_IMPORTED_MODULE_1__.plugins.Menu, "top:menu");
  };

  return TopView;
}(webix_jet__WEBPACK_IMPORTED_MODULE_1__.JetView);



/***/ }),

/***/ "./sources/styles/app.css":
/*!********************************!*\
  !*** ./sources/styles/app.css ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./sources/locales sync recursive ^\\.\\/.*$":
/*!****************************************!*\
  !*** ./sources/locales/ sync ^\.\/.*$ ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./en": "./sources/locales/en.js",
	"./en.js": "./sources/locales/en.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./sources/locales sync recursive ^\\.\\/.*$";

/***/ }),

/***/ "./sources/views sync recursive ^\\.\\/.*$":
/*!**************************************!*\
  !*** ./sources/views/ sync ^\.\/.*$ ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./data": "./sources/views/data.js",
	"./data.js": "./sources/views/data.js",
	"./start": "./sources/views/start.js",
	"./start.js": "./sources/views/start.js",
	"./top": "./sources/views/top.js",
	"./top.js": "./sources/views/top.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./sources/views sync recursive ^\\.\\/.*$";

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _assertThisInitialized)
/* harmony export */ });
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/defineProperty.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _defineProperty)
/* harmony export */ });
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _inheritsLoose)
/* harmony export */ });
/* harmony import */ var _setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./setPrototypeOf.js */ "./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js");

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  (0,_setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__["default"])(subClass, superClass);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _setPrototypeOf)
/* harmony export */ });
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**************************!*\
  !*** ./sources/myapp.js ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MyApp)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var _styles_app_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./styles/app.css */ "./sources/styles/app.css");
/* harmony import */ var webix_jet__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! webix-jet */ "./node_modules/webix-jet/dist/es6/jet.js");



function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }




var MyApp = /*#__PURE__*/function (_JetApp) {
  (0,_babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(MyApp, _JetApp);

  function MyApp(config) {
    var defaults = {
      id: "webix-jet-app",
      version: "1.1.0",
      router:  false ? 0 : webix_jet__WEBPACK_IMPORTED_MODULE_3__.HashRouter,
      debug: !false,
      start: "/top/start"
    };
    return _JetApp.call(this, _objectSpread(_objectSpread({}, defaults), config)) || this;
  }

  return MyApp;
}(webix_jet__WEBPACK_IMPORTED_MODULE_3__.JetApp);



if (true) {
  webix.ready(function () {
    return new MyApp().render();
  });
}
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QWUsR0FBR1IsQ0FBSCxHQUFpQkMsaURBSDFCO0FBSWhCUSxNQUFBQSxLQUFLLEVBQUksQ0FBQ0MsS0FKTTtBQUtoQkMsTUFBQUEsS0FBSyxFQUFJO0FBTE8sS0FBakI7QUFEa0IsV0FTbEIsbURBQVdSLFFBQVgsR0FBd0JyRCxNQUF4QixFQVRrQjtBQVVsQjs7O0VBWGlDaUQ7Ozs7QUFjbkMsSUFBSSxJQUFKLEVBQXFCO0FBQ3BCM0QsRUFBQUEsS0FBSyxDQUFDd0UsS0FBTixDQUFZO0FBQUEsV0FBTSxJQUFJVixLQUFKLEdBQVlXLE1BQVosRUFBTjtBQUFBLEdBQVo7QUFDQSxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2ViaXgtamV0LWFwcC8uLi8uLi9zb3VyY2VzL2Vycm9ycy50cyIsIndlYnBhY2s6Ly93ZWJpeC1qZXQtYXBwLy4uLy4uL3NvdXJjZXMvSmV0QmFzZS50cyIsIndlYnBhY2s6Ly93ZWJpeC1qZXQtYXBwLy4uLy4uL3NvdXJjZXMvaGVscGVycy50cyIsIndlYnBhY2s6Ly93ZWJpeC1qZXQtYXBwLy4uLy4uL3NvdXJjZXMvUm91dGUudHMiLCJ3ZWJwYWNrOi8vd2ViaXgtamV0LWFwcC8uLi8uLi9zb3VyY2VzL0pldFZpZXcudHMiLCJ3ZWJwYWNrOi8vd2ViaXgtamV0LWFwcC8uLi8uLi9zb3VyY2VzL0pldFZpZXdSYXcudHMiLCJ3ZWJwYWNrOi8vd2ViaXgtamV0LWFwcC8uLi8uLi9zb3VyY2VzL3JvdXRlcnMvU3ViUm91dGVyLnRzIiwid2VicGFjazovL3dlYml4LWpldC1hcHAvLi4vLi4vc291cmNlcy9KZXRBcHBCYXNlLnRzIiwid2VicGFjazovL3dlYml4LWpldC1hcHAvLi4vLi4vc291cmNlcy9yb3V0ZXJzL0hhc2hSb3V0ZXIudHMiLCJ3ZWJwYWNrOi8vd2ViaXgtamV0LWFwcC8uLi8uLi9zb3VyY2VzL3BhdGNoLnRzIiwid2VicGFjazovL3dlYml4LWpldC1hcHAvLi4vLi4vc291cmNlcy9KZXRBcHAudHMiLCJ3ZWJwYWNrOi8vd2ViaXgtamV0LWFwcC8uLi8uLi9zb3VyY2VzL3JvdXRlcnMvU3RvcmVSb3V0ZXIudHMiLCJ3ZWJwYWNrOi8vd2ViaXgtamV0LWFwcC8uLi8uLi9zb3VyY2VzL3JvdXRlcnMvVXJsUm91dGVyLnRzIiwid2VicGFjazovL3dlYml4LWpldC1hcHAvLi4vLi4vc291cmNlcy9yb3V0ZXJzL0VtcHR5Um91dGVyLnRzIiwid2VicGFjazovL3dlYml4LWpldC1hcHAvLi4vLi4vc291cmNlcy9wbHVnaW5zL0d1YXJkLnRzIiwid2VicGFjazovL3dlYml4LWpldC1hcHAvLi4vLi4vbm9kZV9tb2R1bGVzL3dlYml4LXBvbHlnbG90L2luZGV4LmpzIiwid2VicGFjazovL3dlYml4LWpldC1hcHAvLi4vLi4vc291cmNlcy9wbHVnaW5zL0xvY2FsZS50cyIsIndlYnBhY2s6Ly93ZWJpeC1qZXQtYXBwLy4uLy4uL3NvdXJjZXMvcGx1Z2lucy9NZW51LnRzIiwid2VicGFjazovL3dlYml4LWpldC1hcHAvLi4vLi4vc291cmNlcy9wbHVnaW5zL1N0YXR1cy50cyIsIndlYnBhY2s6Ly93ZWJpeC1qZXQtYXBwLy4uLy4uL3NvdXJjZXMvcGx1Z2lucy9UaGVtZS50cyIsIndlYnBhY2s6Ly93ZWJpeC1qZXQtYXBwLy4uLy4uL3NvdXJjZXMvcGx1Z2lucy9VcmxQYXJhbS50cyIsIndlYnBhY2s6Ly93ZWJpeC1qZXQtYXBwLy4uLy4uL3NvdXJjZXMvcGx1Z2lucy9Vc2VyLnRzIiwid2VicGFjazovL3dlYml4LWpldC1hcHAvLi4vLi4vc291cmNlcy9pbmRleC50cyIsIndlYnBhY2s6Ly93ZWJpeC1qZXQtYXBwLy4vc291cmNlcy9tb2RlbHMvcmVjb3Jkcy5qcyIsIndlYnBhY2s6Ly93ZWJpeC1qZXQtYXBwLy4vc291cmNlcy92aWV3cy9kYXRhLmpzIiwid2VicGFjazovL3dlYml4LWpldC1hcHAvLi9zb3VyY2VzL3ZpZXdzL3N0YXJ0LmpzIiwid2VicGFjazovL3dlYml4LWpldC1hcHAvLi9zb3VyY2VzL3ZpZXdzL3RvcC5qcyIsIndlYnBhY2s6Ly93ZWJpeC1qZXQtYXBwLy4vc291cmNlcy9zdHlsZXMvYXBwLmNzcz9iNzQwIiwid2VicGFjazovL3dlYml4LWpldC1hcHAvL2hvbWUvbXV6X29sL1dlYnN0b3JtUHJvamVjdHMvZWxlY3Ryb24tc3RhcnQvamV0LXN0YXJ0L3NvdXJjZXMvbG9jYWxlc3xzeW5jfC9eXFwuXFwvLiokLyIsIndlYnBhY2s6Ly93ZWJpeC1qZXQtYXBwLy9ob21lL211el9vbC9XZWJzdG9ybVByb2plY3RzL2VsZWN0cm9uLXN0YXJ0L2pldC1zdGFydC9zb3VyY2VzL3ZpZXdzfHN5bmN8L15cXC5cXC8uKiQvIiwid2VicGFjazovL3dlYml4LWpldC1hcHAvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vYXNzZXJ0VGhpc0luaXRpYWxpemVkLmpzIiwid2VicGFjazovL3dlYml4LWpldC1hcHAvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vZGVmaW5lUHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vd2ViaXgtamV0LWFwcC8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9pbmhlcml0c0xvb3NlLmpzIiwid2VicGFjazovL3dlYml4LWpldC1hcHAvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vc2V0UHJvdG90eXBlT2YuanMiLCJ3ZWJwYWNrOi8vd2ViaXgtamV0LWFwcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWJpeC1qZXQtYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWJpeC1qZXQtYXBwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2ViaXgtamV0LWFwcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYml4LWpldC1hcHAvLi9zb3VyY2VzL215YXBwLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBOYXZpZ2F0aW9uQmxvY2tlZCB7fSIsImltcG9ydCB7IElCYXNlVmlldywgSUpldEFwcCwgSUpldFVSTCwgSUpldFZpZXcsXG5cdElSb3V0ZSwgSVN1YlZpZXcsIElTdWJWaWV3SW5mbywgSVdlYml4RmFjYWRlIH0gZnJvbSBcIi4vaW50ZXJmYWNlc1wiO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgSmV0QmFzZSBpbXBsZW1lbnRzIElKZXRWaWV3e1xuXHRwdWJsaWMgYXBwOiBJSmV0QXBwO1xuXHRwdWJsaWMgd2ViaXg6IElXZWJpeEZhY2FkZTtcblx0cHVibGljIHdlYml4SmV0ID0gdHJ1ZTtcblxuXHRwcm90ZWN0ZWQgX25hbWU6IHN0cmluZztcblx0cHJvdGVjdGVkIF9wYXJlbnQ6IElKZXRWaWV3O1xuXHRwcm90ZWN0ZWQgX2NvbnRhaW5lcjogSFRNTEVsZW1lbnQgfCBJU3ViVmlldztcblx0cHJvdGVjdGVkIF9yb290OiBJQmFzZVZpZXc7XG5cdHByb3RlY3RlZCBfZXZlbnRzOnsgaWQ6c3RyaW5nLCBvYmo6IGFueSB9W107XG5cdHByb3RlY3RlZCBfc3Viczp7W25hbWU6c3RyaW5nXTpJU3ViVmlld307XG5cdHByb3RlY3RlZCBfaW5pdFVybDpJSmV0VVJMO1xuXHRwcm90ZWN0ZWQgX3NlZ21lbnQ6IElSb3V0ZTtcblxuXHRwcml2YXRlIF9kYXRhOntbbmFtZTpzdHJpbmddOmFueX07XG5cdFxuXG5cdGNvbnN0cnVjdG9yKHdlYml4OklXZWJpeEZhY2FkZSl7XG5cdFx0dGhpcy53ZWJpeCA9IHdlYml4O1xuXHRcdHRoaXMuX2V2ZW50cyA9IFtdO1xuXHRcdHRoaXMuX3N1YnMgPSB7fTtcblx0XHR0aGlzLl9kYXRhID0ge307XG5cdH1cblxuXHRnZXRSb290KCk6IElCYXNlVmlldyB7XG5cdFx0cmV0dXJuIHRoaXMuX3Jvb3Q7XG5cdH1cblxuXHRkZXN0cnVjdG9yKCkge1xuXHRcdHRoaXMuX2RldGFjaEV2ZW50cygpO1xuXHRcdHRoaXMuX2Rlc3Ryb3lTdWJzKCk7XG5cdFx0dGhpcy5fZXZlbnRzID0gdGhpcy5fY29udGFpbmVyID0gdGhpcy5hcHAgPSB0aGlzLl9wYXJlbnQgPSB0aGlzLl9yb290ID0gbnVsbDtcblx0fVxuXHRzZXRQYXJhbShpZDpzdHJpbmcsIHZhbHVlOmFueSwgdXJsPzpib29sZWFuKTp2b2lkfFByb21pc2U8YW55Pntcblx0XHRpZiAodGhpcy5fZGF0YVtpZF0gIT09IHZhbHVlKXtcblx0XHRcdHRoaXMuX2RhdGFbaWRdID0gdmFsdWU7XG5cdFx0XHR0aGlzLl9zZWdtZW50LnVwZGF0ZShpZCwgdmFsdWUsIDApO1xuXHRcdFx0aWYgKHVybCl7XG5cdFx0XHRcdHJldHVybiB0aGlzLnNob3cobnVsbCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdGdldFBhcmFtKGlkOnN0cmluZywgcGFyZW50OmJvb2xlYW4pOmFueXtcblx0XHRjb25zdCB2YWx1ZSA9IHRoaXMuX2RhdGFbaWRdO1xuXHRcdGlmICh0eXBlb2YgdmFsdWUgIT09IFwidW5kZWZpbmVkXCIgfHwgIXBhcmVudCl7XG5cdFx0XHRyZXR1cm4gdmFsdWU7XG5cdFx0fVxuXG5cdFx0Y29uc3QgdmlldyA9IHRoaXMuZ2V0UGFyZW50VmlldygpO1xuXHRcdGlmICh2aWV3KXtcblx0XHRcdHJldHVybiB2aWV3LmdldFBhcmFtKGlkLCBwYXJlbnQpO1xuXHRcdH1cblx0fVxuXHRnZXRVcmwoKTpJSmV0VVJMe1xuXHRcdHJldHVybiB0aGlzLl9zZWdtZW50LnN1YnVybCgpO1xuXHR9XG5cdGdldFVybFN0cmluZygpOnN0cmluZ3tcblx0XHRyZXR1cm4gdGhpcy5fc2VnbWVudC50b1N0cmluZygpO1xuXHR9XG5cblx0Z2V0UGFyZW50VmlldygpIDogSUpldFZpZXd7XG5cdFx0cmV0dXJuIHRoaXMuX3BhcmVudDtcblx0fVxuXG5cdCQkKGlkOnN0cmluZyB8IElCYXNlVmlldyk6SUJhc2VWaWV3e1xuXHRcdGlmICh0eXBlb2YgaWQgPT09IFwic3RyaW5nXCIpe1xuXHRcdFx0Y29uc3Qgcm9vdCA9IHRoaXMuZ2V0Um9vdCgpIGFzIGFueTtcblx0XHRcdHJldHVybiByb290LnF1ZXJ5Vmlldyhcblx0XHRcdFx0KG9iaiA9PiAob2JqLmNvbmZpZy5pZCA9PT0gaWQgfHwgb2JqLmNvbmZpZy5sb2NhbElkID09PSBpZCkgJiZcblx0XHRcdFx0XHRcdChvYmouJHNjb3BlID09PSByb290LiRzY29wZSlcblx0XHRcdFx0KSxcblx0XHRcdFx0XCJzZWxmXCIpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gaWQ7XG5cdFx0fVxuXHR9XG5cblx0b24ob2JqLCBuYW1lLCBjb2RlKXtcblx0XHRjb25zdCBpZCA9IG9iai5hdHRhY2hFdmVudChuYW1lLCBjb2RlKTtcblx0XHR0aGlzLl9ldmVudHMucHVzaCh7IG9iaiwgaWQgfSk7XG5cdFx0cmV0dXJuIGlkO1xuXHR9XG5cblx0Y29udGFpbnModmlldzogSUpldFZpZXcpe1xuXHRcdGZvciAoY29uc3Qga2V5IGluIHRoaXMuX3N1YnMpe1xuXHRcdFx0Y29uc3Qga2lkID0gdGhpcy5fc3Vic1trZXldLnZpZXc7XG5cdFx0XHRpZiAoa2lkID09PSB2aWV3IHx8IGtpZC5jb250YWlucyh2aWV3KSl7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHRnZXRTdWJWaWV3KG5hbWU/OnN0cmluZyk6SUpldFZpZXd7XG5cdFx0Y29uc3Qgc3ViID0gdGhpcy5nZXRTdWJWaWV3SW5mbyhuYW1lKTtcblx0XHRpZiAoc3ViKXtcblx0XHRcdHJldHVybiBzdWIuc3Vidmlldy52aWV3O1xuXHRcdH1cblx0fVxuXG5cdGdldFN1YlZpZXdJbmZvKG5hbWU/OnN0cmluZyk6SVN1YlZpZXdJbmZve1xuXHRcdGNvbnN0IHN1YiA9IHRoaXMuX3N1YnNbbmFtZSB8fCBcImRlZmF1bHRcIl07XG5cdFx0aWYgKHN1Yil7XG5cdFx0XHRyZXR1cm4geyBzdWJ2aWV3OnN1YiwgcGFyZW50OnRoaXMgfTtcblx0XHR9XG5cblx0XHRpZiAobmFtZSA9PT0gXCJfdG9wXCIpe1xuXHRcdFx0dGhpcy5fc3Vic1tuYW1lXSA9IHsgdXJsOlwiXCIsIGlkOm51bGwsIHBvcHVwOnRydWUgfTtcblx0XHRcdHJldHVybiB0aGlzLmdldFN1YlZpZXdJbmZvKG5hbWUpO1xuXHRcdH1cblxuXHRcdC8vIHdoZW4gY2FsbGVkIGZyb20gYSBjaGlsZCB2aWV3LCBzZWFyY2hlcyBmb3IgbmVhcmVzdCBwYXJlbnQgd2l0aCBzdWJ2aWV3XG5cdFx0aWYgKHRoaXMuX3BhcmVudCl7XG5cdFx0XHRyZXR1cm4gdGhpcy5fcGFyZW50LmdldFN1YlZpZXdJbmZvKG5hbWUpO1xuXHRcdH1cblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXG5cdHB1YmxpYyBhYnN0cmFjdCByZWZyZXNoKCk7XG5cdHB1YmxpYyBhYnN0cmFjdCBzaG93KHBhdGg6YW55LCBjb25maWc/OmFueSk7XG5cdHB1YmxpYyBhYnN0cmFjdCByZW5kZXIoXG5cdFx0cm9vdD86IHN0cmluZyB8IEhUTUxFbGVtZW50IHwgSVN1YlZpZXcsXG5cdFx0dXJsPzogSVJvdXRlLCBwYXJlbnQ/OiBJSmV0Vmlldyk6IFByb21pc2U8SUJhc2VWaWV3PjtcblxuXHRwcm90ZWN0ZWQgX2RldGFjaEV2ZW50cygpe1xuXHRcdGNvbnN0IGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcblx0XHRmb3IgKGxldCBpID0gZXZlbnRzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKXtcblx0XHRcdGV2ZW50c1tpXS5vYmouZGV0YWNoRXZlbnQoZXZlbnRzW2ldLmlkKTtcblx0XHR9XG5cdH1cblx0cHJvdGVjdGVkIF9kZXN0cm95U3Vicygpe1xuXHRcdC8vIGRlc3Ryb3kgc3ViIHZpZXdzXG5cdFx0Zm9yIChjb25zdCBrZXkgaW4gdGhpcy5fc3Vicyl7XG5cdFx0XHRjb25zdCBzdWJWaWV3ID0gdGhpcy5fc3Vic1trZXldLnZpZXc7XG5cdFx0XHQvLyBpdCBwb3NzaWJsZSB0aGF0IHN1YnZpZXcgd2FzIG5vdCBsb2FkZWQgd2l0aCBhbnkgY29udGVudCB5ZXRcblx0XHRcdC8vIHNvIGNoZWNrIG9uIG51bGxcblx0XHRcdGlmIChzdWJWaWV3KXtcblx0XHRcdFx0c3ViVmlldy5kZXN0cnVjdG9yKCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gcmVzZXQgdG8gcHJldmVudCBtZW1vcnkgbGVha3Ncblx0XHR0aGlzLl9zdWJzID0ge307XG5cdH1cblx0cHJvdGVjdGVkIF9pbml0X3VybF9kYXRhKCl7XG5cdFx0Y29uc3QgdXJsID0gdGhpcy5fc2VnbWVudC5jdXJyZW50KCk7XG5cdFx0dGhpcy5fZGF0YSA9IHt9O1xuXHRcdHRoaXMud2ViaXguZXh0ZW5kKHRoaXMuX2RhdGEsIHVybC5wYXJhbXMsIHRydWUpO1xuXHR9XG5cblx0cHJvdGVjdGVkIF9nZXREZWZhdWx0U3ViKCl7XG5cdFx0aWYgKHRoaXMuX3N1YnMuZGVmYXVsdCl7XG5cdFx0XHRyZXR1cm4gdGhpcy5fc3Vicy5kZWZhdWx0O1xuXHRcdH1cblx0XHRmb3IgKGNvbnN0IGtleSBpbiB0aGlzLl9zdWJzKXtcblx0XHRcdGNvbnN0IHN1YiA9IHRoaXMuX3N1YnNba2V5XTtcblx0XHRcdGlmICghc3ViLmJyYW5jaCAmJiBzdWIudmlldyAmJiBrZXkgIT09IFwiX3RvcFwiKXtcblx0XHRcdFx0Y29uc3QgY2hpbGQgPSAoc3ViLnZpZXcgYXMgSmV0QmFzZSkuX2dldERlZmF1bHRTdWIoKTtcblx0XHRcdFx0aWYgKGNoaWxkKXtcblx0XHRcdFx0XHRyZXR1cm4gY2hpbGQ7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRwcm90ZWN0ZWQgX3JvdXRlZF92aWV3KCkge1xuXHRcdGNvbnN0IHBhcmVudCA9IHRoaXMuZ2V0UGFyZW50VmlldygpIGFzIEpldEJhc2U7XG5cdFx0aWYgKCFwYXJlbnQpe1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXG5cdFx0Y29uc3Qgc3ViID0gcGFyZW50Ll9nZXREZWZhdWx0U3ViKCk7XG5cdFx0aWYgKCFzdWIgJiYgc3ViICE9PSB0aGlzKXtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gcGFyZW50Ll9yb3V0ZWRfdmlldygpO1xuXHR9XG5cblx0XG59XG4iLCJpbXBvcnQge0lKZXRVUkxDaHVua30gZnJvbSBcIi4vaW50ZXJmYWNlc1wiO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZSh1cmw6c3RyaW5nKTpJSmV0VVJMQ2h1bmtbXXtcblx0Ly8gcmVtb3ZlIHN0YXJ0aW5nIC9cblx0aWYgKHVybFswXSA9PT0gXCIvXCIpe1xuXHRcdHVybCA9IHVybC5zdWJzdHIoMSk7XG5cdH1cblxuXHQvLyBzcGxpdCB1cmwgYnkgXCIvXCJcblx0Y29uc3QgcGFydHMgPSB1cmwuc3BsaXQoXCIvXCIpO1xuXHRjb25zdCBjaHVua3M6SUpldFVSTENodW5rW10gPSBbXTtcblxuXHQvLyBmb3IgZWFjaCBwYWdlIGluIHVybFxuXHRmb3IgKGxldCBpID0gMDsgaSA8IHBhcnRzLmxlbmd0aDsgaSsrKXtcblx0XHRjb25zdCB0ZXN0ID0gcGFydHNbaV07XG5cdFx0Y29uc3QgcmVzdWx0ID0ge307XG5cblx0XHQvLyBkZXRlY3QgcGFyYW1zXG5cdFx0Ly8gc3VwcG9ydCBvbGQgXHRcdFx0c29tZTphPWI6Yz1kXG5cdFx0Ly8gYW5kIG5ldyBub3RhdGlvblx0XHRzb21lP2E9YiZjPWRcblx0XHRsZXQgcG9zID0gdGVzdC5pbmRleE9mKFwiOlwiKTtcblx0XHRpZiAocG9zID09PSAtMSl7XG5cdFx0XHRwb3MgPSB0ZXN0LmluZGV4T2YoXCI/XCIpO1xuXHRcdH1cblxuXHRcdGlmIChwb3MgIT09IC0xKXtcblx0XHRcdGNvbnN0IHBhcmFtcyA9IHRlc3Quc3Vic3RyKHBvcysxKS5zcGxpdCgvW1xcOlxcP1xcJl0vZyk7XG5cdFx0XHQvLyBjcmVhdGUgaGFzaCBvZiBuYW1lZCBwYXJhbXNcblx0XHRcdGZvciAoY29uc3QgcGFyYW0gb2YgcGFyYW1zKSB7XG5cdFx0XHRcdGNvbnN0IGRjaHVuayA9IHBhcmFtLnNwbGl0KFwiPVwiKTtcblx0XHRcdFx0cmVzdWx0W2RjaHVua1swXV0gPSBkZWNvZGVVUklDb21wb25lbnQoZGNodW5rWzFdKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBzdG9yZSBwYXJzZWQgdmFsdWVzXG5cdFx0Y2h1bmtzW2ldID0ge1xuXHRcdFx0cGFnZTogKHBvcyA+IC0xID8gdGVzdC5zdWJzdHIoMCwgcG9zKSA6IHRlc3QpLFxuXHRcdFx0cGFyYW1zOnJlc3VsdCxcblx0XHRcdGlzTmV3OnRydWVcblx0XHR9O1xuXHR9XG5cblx0Ly8gcmV0dXJuIGFycmF5IG9mIHBhZ2Ugb2JqZWN0c1xuXHRyZXR1cm4gY2h1bmtzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdXJsMnN0cihzdGFjazpJSmV0VVJMQ2h1bmtbXSk6c3RyaW5ne1xuXHRjb25zdCB1cmwgPSBbXTtcblxuXHRmb3IgKGNvbnN0IGNodW5rIG9mIHN0YWNrKXtcblx0XHR1cmwucHVzaChcIi9cIitjaHVuay5wYWdlKTtcblx0XHRjb25zdCBwYXJhbXMgPSBvYmoyc3RyKGNodW5rLnBhcmFtcyk7XG5cdFx0aWYgKHBhcmFtcyl7XG5cdFx0XHR1cmwucHVzaChcIj9cIitwYXJhbXMpO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiB1cmwuam9pbihcIlwiKTtcbn1cblxuZnVuY3Rpb24gb2JqMnN0cihvYmope1xuXHRjb25zdCBzdHIgPSBbXTtcblx0Zm9yIChjb25zdCBrZXkgaW4gb2JqKXtcblx0XHRpZiAoc3RyLmxlbmd0aCl7XG5cdFx0XHRzdHIucHVzaChcIiZcIik7XG5cdFx0fVxuXHRcdHN0ci5wdXNoKGtleStcIj1cIitlbmNvZGVVUklDb21wb25lbnQob2JqW2tleV0pKTtcblx0fVxuXG5cdHJldHVybiBzdHIuam9pbihcIlwiKTtcbn0iLCJpbXBvcnQgeyBJSmV0VVJMLCBJSmV0VmlldywgSVBhdGgsIElSb3V0ZSwgSUpldFVSTENodW5rIH0gZnJvbSBcIi4vaW50ZXJmYWNlc1wiO1xuaW1wb3J0IHtOYXZpZ2F0aW9uQmxvY2tlZH0gZnJvbSBcIi4vZXJyb3JzXCI7XG5cbmltcG9ydCB7cGFyc2UsIHVybDJzdHJ9IGZyb20gXCIuL2hlbHBlcnNcIjtcblxuZXhwb3J0IGNsYXNzIFJvdXRlIGltcGxlbWVudHMgSVJvdXRle1xuXHRwdWJsaWMgcm91dGU6IElQYXRoO1xuXHRwcml2YXRlIGluZGV4OiBudW1iZXI7XG5cdHByaXZhdGUgX25leHQ6IG51bWJlciA9IDE7XG5cblx0Y29uc3RydWN0b3Iocm91dGU6IHN0cmluZ3xJUGF0aCwgaW5kZXg6IG51bWJlcil7XG5cdFx0aWYgKHR5cGVvZiByb3V0ZSA9PT0gXCJzdHJpbmdcIil7XG5cdFx0XHR0aGlzLnJvdXRlID0ge1xuXHRcdFx0XHR1cmw6cGFyc2Uocm91dGUpLFxuXHRcdFx0XHRwYXRoOiByb3V0ZVxuXHRcdFx0fTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5yb3V0ZSA9IHJvdXRlO1xuXHRcdH1cblxuXHRcdHRoaXMuaW5kZXggPSBpbmRleDtcblx0fVxuXHRjdXJyZW50KCk6SUpldFVSTENodW5re1xuXHRcdHJldHVybiB0aGlzLnJvdXRlLnVybFt0aGlzLmluZGV4XTtcblx0fVxuXHRuZXh0KCk6SUpldFVSTENodW5re1xuXHRcdHJldHVybiB0aGlzLnJvdXRlLnVybFt0aGlzLmluZGV4ICsgdGhpcy5fbmV4dF07XG5cdH1cblxuXHRzdWJ1cmwoKTpJSmV0VVJMe1xuXHRcdHJldHVybiB0aGlzLnJvdXRlLnVybC5zbGljZSh0aGlzLmluZGV4KTtcblx0fVxuXHRzaGlmdCgpOklSb3V0ZXtcblx0XHRyZXR1cm4gbmV3IFJvdXRlKHRoaXMucm91dGUsIHRoaXMuaW5kZXggKyB0aGlzLl9uZXh0KTtcblx0fVxuXHRyZWZyZXNoKCl7XG5cdFx0Y29uc3QgdXJsID0gdGhpcy5yb3V0ZS51cmw7XG5cdFx0Zm9yIChsZXQgaT10aGlzLmluZGV4KzE7IGk8dXJsLmxlbmd0aDsgaSsrKXtcblx0XHRcdHVybFtpXS5pc05ldyA9IHRydWU7XG5cdFx0fVxuXHR9XG5cdHRvU3RyaW5nKCl7XG5cdFx0Y29uc3Qgc3RyID0gdXJsMnN0cih0aGlzLnN1YnVybCgpKTtcblx0XHRyZXR1cm4gc3RyID8gc3RyLnN1YnN0cigxKSA6IFwiXCI7XG5cdH1cblx0X2pvaW4ocGF0aDogc3RyaW5nLCBraWRzPzogYm9vbGVhbil7XG5cdFx0bGV0IHVybCA9IHRoaXMucm91dGUudXJsO1xuXHRcdGlmIChwYXRoID09PSBudWxsKXsgLy8gY2hhbmdlIG9mIHBhcmFtZXRlcnMsIHJvdXRlIGVsZW1lbnRzIGFyZSBub3QgYWZmZWN0ZWRcblx0XHRcdHJldHVybiB1cmw7XG5cdFx0fVxuXG5cdFx0Y29uc3Qgb2xkID0gdGhpcy5yb3V0ZS51cmw7XG5cdFx0dXJsID0gb2xkLnNsaWNlKDAsIHRoaXMuaW5kZXgrKGtpZHM/dGhpcy5fbmV4dDowKSk7XG5cdFx0aWYgKHBhdGgpe1xuXHRcdFx0dXJsID0gdXJsLmNvbmNhdChwYXJzZShwYXRoKSk7XG5cblx0XHRcdGZvciAobGV0IGk9MDsgaTx1cmwubGVuZ3RoOyBpKyspe1xuXHRcdFx0XHRpZiAob2xkW2ldKXtcblx0XHRcdFx0XHR1cmxbaV0udmlldyA9IG9sZFtpXS52aWV3O1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChvbGRbaV0gJiYgdXJsW2ldLnBhZ2UgPT09IG9sZFtpXS5wYWdlKXtcblx0XHRcdFx0XHR1cmxbaV0uaXNOZXcgPSBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB1cmw7XG5cdH1cblxuXHRhcHBlbmQocGF0aDpzdHJpbmcpOnN0cmluZ3tcblx0XHRjb25zdCB1cmwgPSB0aGlzLl9qb2luKHBhdGgsIHRydWUpO1xuXHRcdHRoaXMucm91dGUucGF0aCA9IHVybDJzdHIodXJsKTtcblx0XHR0aGlzLnJvdXRlLnVybCA9IHVybDtcblxuXHRcdHJldHVybiB0aGlzLnJvdXRlLnBhdGg7XG5cdH1cblxuXHRzaG93KHBhdGg6c3RyaW5nLCB2aWV3OklKZXRWaWV3LCBraWRzPzogYm9vbGVhbik6UHJvbWlzZTx2b2lkPntcblx0XHRjb25zdCB1cmwgPSB0aGlzLl9qb2luKHBhdGgsIGtpZHMpO1xuXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXMsIHJlaikgPT4ge1xuXHRcdFx0Y29uc3QgcmVkaXJlY3QgPSB1cmwyc3RyKHVybCk7XG5cdFx0XHRjb25zdCBvYmogPSB7XG5cdFx0XHRcdHVybCxcblx0XHRcdFx0cmVkaXJlY3QsXG5cdFx0XHRcdGNvbmZpcm06IFByb21pc2UucmVzb2x2ZSgpXG5cdFx0XHR9O1xuXG5cdFx0XHRjb25zdCBhcHAgPSB2aWV3ID8gdmlldy5hcHAgOiBudWxsO1xuXHRcdFx0Ly8gd2hlbiBjcmVhdGluZyBhIG5ldyByb3V0ZSwgaXQgcG9zc2libGUgdGhhdCBpdCB3aWxsIG5vdCBoYXZlIGFueSBjb250ZW50XG5cdFx0XHQvLyBndWFyZCBpcyBub3QgbmVjZXNzYXJ5IGluIHN1Y2ggY2FzZVxuXHRcdFx0aWYgKGFwcCl7XG5cdFx0XHRcdGNvbnN0IHJlc3VsdCA9IGFwcC5jYWxsRXZlbnQoXCJhcHA6Z3VhcmRcIiwgW29iai5yZWRpcmVjdCwgdmlldywgb2JqXSk7XG5cdFx0XHRcdGlmICghcmVzdWx0KXtcblx0XHRcdFx0XHRyZWoobmV3IE5hdmlnYXRpb25CbG9ja2VkKCkpO1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRsZXQgZXJyO1xuXHRcdFx0b2JqLmNvbmZpcm0uY2F0Y2goZXJyID0+IHJlaihlcnIpKS50aGVuKCgpID0+IHtcblx0XHRcdFx0aWYgKG9iai5yZWRpcmVjdCA9PT0gbnVsbCl7XG5cdFx0XHRcdFx0cmVqKG5ldyBOYXZpZ2F0aW9uQmxvY2tlZCgpKTtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAob2JqLnJlZGlyZWN0ICE9PSByZWRpcmVjdCl7XG5cdFx0XHRcdFx0YXBwLnNob3cob2JqLnJlZGlyZWN0KTtcblx0XHRcdFx0XHRyZWoobmV3IE5hdmlnYXRpb25CbG9ja2VkKCkpO1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHRoaXMucm91dGUucGF0aCA9IHJlZGlyZWN0O1xuXHRcdFx0XHR0aGlzLnJvdXRlLnVybCA9IHVybDtcblx0XHRcdFx0cmVzKCk7XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fVxuXHRzaXplKG46bnVtYmVyKXtcblx0XHR0aGlzLl9uZXh0ID0gbjtcblx0fVxuXHRzcGxpdCgpOklSb3V0ZXtcblx0XHRjb25zdCByb3V0ZSA9IHtcblx0XHRcdHVybDogdGhpcy5yb3V0ZS51cmwuc2xpY2UodGhpcy5pbmRleCsxKSxcblx0XHRcdHBhdGg6XCJcIlxuXHRcdH07XG5cblx0XHRpZiAocm91dGUudXJsLmxlbmd0aCl7XG5cdFx0XHRyb3V0ZS5wYXRoID0gdXJsMnN0cihyb3V0ZS51cmwpO1xuXHRcdH1cblxuXHRcdHJldHVybiBuZXcgUm91dGUocm91dGUsIDApO1xuXHR9XG5cdHVwZGF0ZShuYW1lOnN0cmluZywgdmFsdWU6IHN0cmluZywgaW5kZXg/Om51bWJlcil7XG5cdFx0Y29uc3QgY2h1bmsgPSB0aGlzLnJvdXRlLnVybFt0aGlzLmluZGV4ICsgKGluZGV4IHx8IDApXTtcblx0XHRpZiAoIWNodW5rKXtcblx0XHRcdHRoaXMucm91dGUudXJsLnB1c2goeyBwYWdlOlwiXCIsIHBhcmFtczp7fSB9KTtcblx0XHRcdHJldHVybiB0aGlzLnVwZGF0ZShuYW1lLCB2YWx1ZSwgaW5kZXgpO1xuXHRcdH1cblxuXHRcdGlmIChuYW1lID09PSBcIlwiKXtcblx0XHRcdGNodW5rLnBhZ2UgPSB2YWx1ZTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y2h1bmsucGFyYW1zW25hbWVdID0gdmFsdWU7XG5cdFx0fVxuXG5cdFx0dGhpcy5yb3V0ZS5wYXRoID0gdXJsMnN0cih0aGlzLnJvdXRlLnVybCk7XG5cdH1cbn0iLCJpbXBvcnQge0pldEJhc2V9IGZyb20gXCIuL0pldEJhc2VcIjtcblxuaW1wb3J0IHtcblx0SUJhc2VDb25maWcsIElCYXNlVmlldywgSUpldEFwcCwgSUpldFVSTCxcblx0SUpldFZpZXcsIElKZXRWaWV3RmFjdG9yeSwgSVN1YlZpZXcsIElVSUNvbmZpZywgSVJvdXRlIH0gZnJvbSBcIi4vaW50ZXJmYWNlc1wiO1xuaW1wb3J0IHsgUm91dGUgfSBmcm9tIFwiLi9Sb3V0ZVwiO1xuXG5cbmV4cG9ydCBjbGFzcyBKZXRWaWV3IGV4dGVuZHMgSmV0QmFzZXtcblx0cHJpdmF0ZSBfY2hpbGRyZW46SUpldFZpZXdbXTtcblxuXHRjb25zdHJ1Y3RvcihhcHAgOiBJSmV0QXBwLCBjb25maWcgOiBhbnkpe1xuXHRcdHN1cGVyKGFwcC53ZWJpeCk7XG5cblx0XHR0aGlzLmFwcCA9IGFwcDtcblx0XHQvL3RoaXMuJGNvbmZpZyA9IGNvbmZpZztcblxuXHRcdHRoaXMuX2NoaWxkcmVuID0gW107XG5cdH1cblxuXHR1aShcblx0XHR1aTpJQmFzZUNvbmZpZ3xJSmV0Vmlld0ZhY3RvcnksXG5cdFx0Y29uZmlnPzogSVVJQ29uZmlnXG5cdCkgOiBJQmFzZVZpZXcgfCBJSmV0Vmlld3tcblx0XHRjb25maWcgPSBjb25maWcgfHwge307XG5cdFx0Y29uc3QgY29udGFpbmVyID0gY29uZmlnLmNvbnRhaW5lciB8fCAodWkgYXMgSUJhc2VDb25maWcpLmNvbnRhaW5lcjtcblxuXHRcdGNvbnN0IGpldHZpZXcgPSB0aGlzLmFwcC5jcmVhdGVWaWV3KHVpKTtcblx0XHR0aGlzLl9jaGlsZHJlbi5wdXNoKGpldHZpZXcpO1xuXG5cdFx0amV0dmlldy5yZW5kZXIoY29udGFpbmVyLCB0aGlzLl9zZWdtZW50LCB0aGlzKTtcblxuXHRcdGlmICh0eXBlb2YgdWkgIT09IFwib2JqZWN0XCIgfHwgKHVpIGluc3RhbmNlb2YgSmV0QmFzZSkpe1xuXHRcdFx0Ly8gcmF3IHdlYml4IFVJXG5cdFx0XHRyZXR1cm4gamV0dmlldztcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIGpldHZpZXcuZ2V0Um9vdCgpO1xuXHRcdH1cblx0fVxuXG5cdHNob3cocGF0aDphbnksIGNvbmZpZz86YW55KTpQcm9taXNlPGFueT57XG5cdFx0Y29uZmlnID0gY29uZmlnIHx8IHt9O1xuXG5cdFx0Ly8gY29udmVydCBwYXJhbWV0ZXJzIG9iamVjdCB0byB1cmxcblx0XHRpZiAodHlwZW9mIHBhdGggPT09IFwib2JqZWN0XCIpe1xuXHRcdFx0Zm9yIChjb25zdCBrZXkgaW4gcGF0aCl7XG5cdFx0XHRcdHRoaXMuc2V0UGFyYW0oa2V5LCBwYXRoW2tleV0pO1xuXHRcdFx0fVxuXHRcdFx0cGF0aCA9IG51bGw7XG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0Ly8gZGVsaWdhdGUgdG8gYXBwIGluIGNhc2Ugb2Ygcm9vdCBwcmVmaXhcblx0XHRcdGlmIChwYXRoLnN1YnN0cigwLDEpID09PSBcIi9cIil7XG5cdFx0XHRcdHJldHVybiB0aGlzLmFwcC5zaG93KHBhdGgpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBsb2NhbCBwYXRoLCBkbyBub3RoaW5nXG5cdFx0XHRpZiAocGF0aC5pbmRleE9mKFwiLi9cIikgPT09IDApe1xuXHRcdFx0XHRwYXRoID0gcGF0aC5zdWJzdHIoMik7XG5cdFx0XHR9XG5cblx0XHRcdC8vIHBhcmVudCBwYXRoLCBjYWxsIHBhcmVudCB2aWV3XG5cdFx0XHRpZiAocGF0aC5pbmRleE9mKFwiLi4vXCIpID09PSAwKXtcblx0XHRcdFx0Y29uc3QgcGFyZW50ID0gdGhpcy5nZXRQYXJlbnRWaWV3KCk7XG5cdFx0XHRcdGlmIChwYXJlbnQpe1xuXHRcdFx0XHRcdHJldHVybiBwYXJlbnQuc2hvdyhwYXRoLnN1YnN0cigzKSwgY29uZmlnKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5hcHAuc2hvdyhcIi9cIitwYXRoLnN1YnN0cigzKSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Y29uc3Qgc3ViID0gdGhpcy5nZXRTdWJWaWV3SW5mbyhjb25maWcudGFyZ2V0KTtcblx0XHRcdGlmIChzdWIpe1xuXHRcdFx0XHRpZiAoc3ViLnBhcmVudCAhPT0gdGhpcyl7XG5cdFx0XHRcdFx0cmV0dXJuIHN1Yi5wYXJlbnQuc2hvdyhwYXRoLCBjb25maWcpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKGNvbmZpZy50YXJnZXQgJiYgY29uZmlnLnRhcmdldCAhPT0gXCJkZWZhdWx0XCIpe1xuXHRcdFx0XHRcdHJldHVybiB0aGlzLl9yZW5kZXJGcmFtZUxvY2soY29uZmlnLnRhcmdldCwgc3ViLnN1YnZpZXcsIHBhdGgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAocGF0aCl7XG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMuYXBwLnNob3coXCIvXCIrcGF0aCk7XG5cdFx0XHRcdH0gXG5cdFx0XHR9XG5cblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcy5fc2hvdyh0aGlzLl9zZWdtZW50LCBwYXRoLCB0aGlzKTtcblx0fVxuXG5cdF9zaG93KHNlZ21lbnQ6SVJvdXRlLCBwYXRoOnN0cmluZywgdmlldzpJSmV0Vmlldyl7XG5cdFx0cmV0dXJuIHNlZ21lbnQuc2hvdyhwYXRoLCB2aWV3LCB0cnVlKS50aGVuKCgpID0+IHtcblx0XHRcdHRoaXMuX2luaXRfdXJsX2RhdGEoKTtcblx0XHRcdHJldHVybiB0aGlzLl91cmxDaGFuZ2UoKTtcblx0XHR9KS50aGVuKCgpID0+IHtcblx0XHRcdGlmIChzZWdtZW50LnJvdXRlLmxpbmtSb3V0ZXIpe1xuXHRcdFx0XHR0aGlzLmFwcC5nZXRSb3V0ZXIoKS5zZXQoc2VnbWVudC5yb3V0ZS5wYXRoLCB7IHNpbGVudDogdHJ1ZSB9KTtcblx0XHRcdFx0dGhpcy5hcHAuY2FsbEV2ZW50KFwiYXBwOnJvdXRlXCIsIFtzZWdtZW50LnJvdXRlLnBhdGhdKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdGluaXQoXyR2aWV3OklCYXNlVmlldywgXyQ6IElKZXRVUkwpe1xuXHRcdC8vIHN0dWJcblx0fVxuXHRyZWFkeShfJHZpZXc6SUJhc2VWaWV3LCBfJHVybDogSUpldFVSTCl7XG5cdFx0Ly8gc3R1YlxuXHR9XG5cdGNvbmZpZygpIDogYW55IHtcblx0XHR0aGlzLmFwcC53ZWJpeC5tZXNzYWdlKFwiVmlldzpDb25maWcgaXMgbm90IGltcGxlbWVudGVkXCIpO1xuXHR9XG5cdHVybENoYW5nZShfJHZpZXc6IElCYXNlVmlldywgXyR1cmwgOiBJSmV0VVJMKXtcblx0XHQvLyBzdHViXG5cdH1cblxuXHRkZXN0cm95KCl7XG5cdFx0Ly8gc3R1YlxuXHR9XG5cblx0ZGVzdHJ1Y3Rvcigpe1xuXHRcdHRoaXMuZGVzdHJveSgpO1xuXHRcdHRoaXMuX2Rlc3Ryb3lLaWRzKCk7XG5cblx0XHQvLyBkZXN0cm95IGFjdHVhbCBVSVxuXHRcdHRoaXMuX3Jvb3QuZGVzdHJ1Y3RvcigpO1xuXHRcdHN1cGVyLmRlc3RydWN0b3IoKTtcblx0fVxuXG5cdHVzZShwbHVnaW4sIGNvbmZpZyl7XG5cdFx0cGx1Z2luKHRoaXMuYXBwLCB0aGlzLCBjb25maWcpO1xuXHR9XG5cblx0cmVmcmVzaCgpe1xuXHRcdGNvbnN0IHVybCA9IHRoaXMuZ2V0VXJsKCk7XG5cdFx0dGhpcy5kZXN0cm95KCk7XG5cdFx0dGhpcy5fZGVzdHJveUtpZHMoKTtcblx0XHR0aGlzLl9kZXN0cm95U3VicygpO1xuXHRcdHRoaXMuX2RldGFjaEV2ZW50cygpO1xuXG5cdFx0aWYgKCh0aGlzLl9jb250YWluZXIgYXMgYW55KS50YWdOYW1lKXtcblx0XHRcdHRoaXMuX3Jvb3QuZGVzdHJ1Y3RvcigpO1xuXHRcdH1cblxuXHRcdHRoaXMuX3NlZ21lbnQucmVmcmVzaCgpO1xuXHRcdHJldHVybiB0aGlzLl9yZW5kZXIodGhpcy5fc2VnbWVudCk7XG5cdH1cblxuXHRyZW5kZXIoXG5cdFx0cm9vdDogc3RyaW5nIHwgSFRNTEVsZW1lbnQgfCBJU3ViVmlldyxcblx0XHR1cmw6IElSb3V0ZSwgcGFyZW50PzogSUpldFZpZXcpOiBQcm9taXNlPElCYXNlVmlldz4ge1xuXG5cdFx0aWYgKHR5cGVvZiB1cmwgPT09IFwic3RyaW5nXCIpe1xuXHRcdFx0dXJsID0gbmV3IFJvdXRlKHVybCwgMCk7XG5cdFx0fVxuXG5cdFx0dGhpcy5fc2VnbWVudCA9IHVybDtcblxuXHRcdHRoaXMuX3BhcmVudCA9IHBhcmVudDtcblx0XHR0aGlzLl9pbml0X3VybF9kYXRhKCk7XG5cblx0XHRyb290ID0gcm9vdCB8fCBkb2N1bWVudC5ib2R5O1xuXHRcdGNvbnN0IF9jb250YWluZXIgPSAodHlwZW9mIHJvb3QgPT09IFwic3RyaW5nXCIpID8gdGhpcy53ZWJpeC50b05vZGUocm9vdCkgOiByb290O1xuXG5cdFx0aWYgKHRoaXMuX2NvbnRhaW5lciAhPT0gX2NvbnRhaW5lcikge1xuXHRcdFx0dGhpcy5fY29udGFpbmVyID0gX2NvbnRhaW5lcjtcblx0XHRcdHJldHVybiB0aGlzLl9yZW5kZXIodXJsKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIHRoaXMuX3VybENoYW5nZSgpLnRoZW4oKCkgPT4gdGhpcy5nZXRSb290KCkpO1xuXHRcdH1cblx0fVxuXG5cdHByb3RlY3RlZCBfcmVuZGVyKHVybDogSVJvdXRlKTpQcm9taXNlPElCYXNlVmlldz57XG5cdFx0Y29uc3QgY29uZmlnID0gdGhpcy5jb25maWcoKTtcblx0XHRpZiAoY29uZmlnLnRoZW4pe1xuXHRcdFx0cmV0dXJuIGNvbmZpZy50aGVuKGNmZyA9PiB0aGlzLl9yZW5kZXJfZmluYWwoY2ZnLCB1cmwpKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIHRoaXMuX3JlbmRlcl9maW5hbChjb25maWcsIHVybCk7XG5cdFx0fVxuXHR9XG5cblx0cHJvdGVjdGVkIF9yZW5kZXJfZmluYWwoY29uZmlnOmFueSwgdXJsOklSb3V0ZSk6UHJvbWlzZTxhbnk+e1xuXHRcdC8vIGdldCBwcmV2aW91cyB2aWV3IGluIHRoZSBzYW1lIHNsb3Rcblx0XHRsZXQgc2xvdDpJU3ViVmlldyA9IG51bGw7XG5cdFx0bGV0IGNvbnRhaW5lcjpzdHJpbmd8SFRNTEVsZW1lbnR8SUJhc2VWaWV3ID0gbnVsbDtcblx0XHRsZXQgc2hvdyA9IGZhbHNlO1xuXHRcdGlmICghKHRoaXMuX2NvbnRhaW5lciBhcyBIVE1MRWxlbWVudCkudGFnTmFtZSl7XG5cdFx0XHRzbG90ID0gKHRoaXMuX2NvbnRhaW5lciBhcyBJU3ViVmlldyk7XG5cdFx0XHRpZiAoc2xvdC5wb3B1cCl7XG5cdFx0XHRcdGNvbnRhaW5lciA9IGRvY3VtZW50LmJvZHk7XG5cdFx0XHRcdHNob3cgPSB0cnVlO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Y29udGFpbmVyID0gdGhpcy53ZWJpeC4kJChzbG90LmlkKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29udGFpbmVyID0gdGhpcy5fY29udGFpbmVyIGFzIEhUTUxFbGVtZW50O1xuXHRcdH1cblxuXHRcdC8vIHZpZXcgYWxyZWFkeSBkZXN0cm95ZWRcblx0XHRpZiAoIXRoaXMuYXBwIHx8ICFjb250YWluZXIpe1xuXHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KG51bGwpO1xuXHRcdH1cblxuXHRcdGxldCByZXNwb25zZTpQcm9taXNlPGFueT47XG5cdFx0Y29uc3QgY3VycmVudCA9IHRoaXMuX3NlZ21lbnQuY3VycmVudCgpO1xuXG5cdFx0Ly8gdXNpbmcgd3JhcHBlciBvYmplY3QsIHNvIHVpIGNhbiBiZSBjaGFuZ2VkIGZyb20gYXBwOnJlbmRlciBldmVudFxuXHRcdGNvbnN0IHJlc3VsdDphbnkgPSB7IHVpOiB7fSB9O1xuXHRcdHRoaXMuYXBwLmNvcHlDb25maWcoY29uZmlnLCByZXN1bHQudWksIHRoaXMuX3N1YnMpO1xuXHRcdHRoaXMuYXBwLmNhbGxFdmVudChcImFwcDpyZW5kZXJcIiwgW3RoaXMsIHVybCwgcmVzdWx0XSk7XG5cdFx0cmVzdWx0LnVpLiRzY29wZSA9IHRoaXM7XG5cblx0XHQvKiBkZXN0cm95IG9sZCBIVE1MIGF0dGFjaGVkIHZpZXdzIGJlZm9yZSBjcmVhdGluZyBuZXcgb25lICovXG5cdFx0aWYgKCFzbG90ICYmIGN1cnJlbnQuaXNOZXcgJiYgY3VycmVudC52aWV3KXtcblx0XHRcdGN1cnJlbnQudmlldy5kZXN0cnVjdG9yKCk7XG5cdFx0fVxuXG5cdFx0dHJ5IHtcblx0XHRcdC8vIHNwZWNpYWwgaGFuZGxpbmcgZm9yIGFkZGluZyBpbnNpZGUgb2YgbXVsdGl2aWV3IC0gcHJlc2VydmUgb2xkIGlkXG5cdFx0XHRpZiAoc2xvdCAmJiAhc2hvdyl7XG5cdFx0XHRcdGNvbnN0IG9sZHVpID0gY29udGFpbmVyIGFzIElCYXNlVmlldztcblx0XHRcdFx0Y29uc3QgcGFyZW50ID0gb2xkdWkuZ2V0UGFyZW50VmlldygpO1xuXHRcdFx0XHRpZiAocGFyZW50ICYmIHBhcmVudC5uYW1lID09PSBcIm11bHRpdmlld1wiICYmICFyZXN1bHQudWkuaWQpe1xuXHRcdFx0XHRcdHJlc3VsdC51aS5pZCA9IG9sZHVpLmNvbmZpZy5pZDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLl9yb290ID0gdGhpcy5hcHAud2ViaXgudWkocmVzdWx0LnVpLCBjb250YWluZXIpO1xuXHRcdFx0Y29uc3QgYXNXaW4gPSB0aGlzLl9yb290IGFzIGFueTtcblx0XHRcdC8vIGNoZWNrIGZvciB1cmwgYWRkZWQgdG8gaWdub3JlIHRoaXMudWkgY2FsbHNcblx0XHRcdGlmIChzaG93ICYmIGFzV2luLnNldFBvc2l0aW9uICYmICFhc1dpbi5pc1Zpc2libGUoKSl7XG5cdFx0XHRcdGFzV2luLnNob3coKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gY2hlY2ssIGlmIHdlIGFyZSByZXBsYWNpbmcgc29tZSBvbGRlciB2aWV3XG5cdFx0XHRpZiAoc2xvdCl7XG5cdFx0XHRcdGlmIChzbG90LnZpZXcgJiYgc2xvdC52aWV3ICE9PSB0aGlzICYmIHNsb3QudmlldyAhPT0gdGhpcy5hcHApe1xuXHRcdFx0XHRcdHNsb3Qudmlldy5kZXN0cnVjdG9yKCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRzbG90LmlkID0gdGhpcy5fcm9vdC5jb25maWcuaWQgYXMgc3RyaW5nO1xuXHRcdFx0XHRpZiAodGhpcy5nZXRQYXJlbnRWaWV3KCkgfHwgIXRoaXMuYXBwLmFwcClcblx0XHRcdFx0XHRzbG90LnZpZXcgPSB0aGlzO1xuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHQvLyB3aGVuIHdlIGhhdmUgc3ViYXBwLCBzZXQgd2hvbGUgYXBwIGFzIGEgdmlld1xuXHRcdFx0XHRcdC8vIHNvIG9uIGRlc3RydWN0aW9uLCB0aGUgd2hvbGUgYXBwIHdpbGwgYmUgZGVzdHJveWVkXG5cdFx0XHRcdFx0c2xvdC52aWV3ID0gdGhpcy5hcHAgYXMgYW55O1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGlmIChjdXJyZW50LmlzTmV3KXtcblx0XHRcdFx0Y3VycmVudC52aWV3ID0gdGhpcztcblx0XHRcdFx0Y3VycmVudC5pc05ldyA9IGZhbHNlO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXNwb25zZSA9IFByb21pc2UucmVzb2x2ZSh0aGlzLl9pbml0KHRoaXMuX3Jvb3QsIHVybCkpLnRoZW4oKCkgPT4ge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5fdXJsQ2hhbmdlKCkudGhlbigoKSA9PiB7XG5cdFx0XHRcdFx0dGhpcy5faW5pdFVybCA9IG51bGw7XG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMucmVhZHkodGhpcy5fcm9vdCwgdXJsLnN1YnVybCgpKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblx0XHR9IGNhdGNoKGUpe1xuXHRcdFx0cmVzcG9uc2UgPSBQcm9taXNlLnJlamVjdChlKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gcmVzcG9uc2UuY2F0Y2goZXJyID0+IHRoaXMuX2luaXRFcnJvcih0aGlzLCBlcnIpKTtcblx0fVxuXG5cdHByb3RlY3RlZCBfaW5pdCh2aWV3OklCYXNlVmlldywgdXJsOiBJUm91dGUpe1xuXHRcdHJldHVybiB0aGlzLmluaXQodmlldywgdXJsLnN1YnVybCgpKTtcblx0fVxuXG5cdHByb3RlY3RlZCBfdXJsQ2hhbmdlKCk6UHJvbWlzZTxhbnk+e1xuXHRcdHRoaXMuYXBwLmNhbGxFdmVudChcImFwcDp1cmxjaGFuZ2VcIiwgW3RoaXMsIHRoaXMuX3NlZ21lbnRdKTtcblxuXHRcdGNvbnN0IHdhaXRzID0gW107XG5cdFx0Zm9yIChjb25zdCBrZXkgaW4gdGhpcy5fc3Vicyl7XG5cdFx0XHRjb25zdCBmcmFtZSA9IHRoaXMuX3N1YnNba2V5XTtcblx0XHRcdGNvbnN0IHdhaXQgPSB0aGlzLl9yZW5kZXJGcmFtZUxvY2soa2V5LCBmcmFtZSwgbnVsbCk7XG5cdFx0XHRpZiAod2FpdCl7XG5cdFx0XHRcdHdhaXRzLnB1c2god2FpdCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIFByb21pc2UuYWxsKHdhaXRzKS50aGVuKCgpID0+IHtcblx0XHRcdHJldHVybiB0aGlzLnVybENoYW5nZSh0aGlzLl9yb290LCB0aGlzLl9zZWdtZW50LnN1YnVybCgpKTtcblx0XHR9KTtcblx0fVxuXG5cdHByb3RlY3RlZCAgX3JlbmRlckZyYW1lTG9jayhrZXk6c3RyaW5nLCBmcmFtZTpJU3ViVmlldywgcGF0aDogc3RyaW5nKTpQcm9taXNlPGFueT57XG5cdFx0Ly8gaWYgc3VidmlldyBpcyBub3Qgb2NjdXBpZWQgYnkgc29tZSByZW5kZXJpbmcgeWV0XG5cdFx0aWYgKCFmcmFtZS5sb2NrKSB7XG5cdFx0XHQvLyByZXRyZWl2ZSBhbmQgc3RvcmUgcmVuZGVyaW5nIGVuZCBwcm9taXNlXG5cdFx0XHRjb25zdCBsb2NrID0gIHRoaXMuX3JlbmRlckZyYW1lKGtleSwgZnJhbWUsIHBhdGgpO1xuXHRcdFx0aWYgKGxvY2spe1xuXHRcdFx0XHQvLyBjbGVhciBsb2NrIGFmdGVyIGZyYW1lIHJlbmRlcmluZ1xuXHRcdFx0XHQvLyBhcyBwcm9taXNlLmZpbmFsbHkgaXMgbm90IHN1cHBvcnRlZCBieSAgV2ViaXggbGVzc2VyIHRoYW4gNi4yXG5cdFx0XHRcdC8vIHVzaW5nIGEgbW9yZSB2ZXJib3NlIG5vdGF0aW9uXG5cdFx0XHRcdGZyYW1lLmxvY2sgPSBsb2NrLnRoZW4oKCkgPT4gZnJhbWUubG9jayA9IG51bGwsICgpID0+IGZyYW1lLmxvY2sgPSBudWxsKVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIHJldHVybiByZW5kZXJpbmcgZW5kIHByb21pc2Vcblx0XHRyZXR1cm4gZnJhbWUubG9jaztcblx0fVxuXG5cdHByb3RlY3RlZCBfcmVuZGVyRnJhbWUoa2V5OnN0cmluZywgZnJhbWU6SVN1YlZpZXcsIHBhdGg6IHN0cmluZyk6UHJvbWlzZTxhbnk+e1xuXHRcdC8vZGVmYXVsdCByb3V0ZVxuXHRcdGlmIChrZXkgPT09IFwiZGVmYXVsdFwiKXtcblx0XHRcdGlmICh0aGlzLl9zZWdtZW50Lm5leHQoKSl7XG5cdFx0XHRcdC8vIHdlIGhhdmUgYSBuZXh0IHNlZ21lbnQgaW4gdXJsLCByZW5kZXIgaXRcblx0XHRcdFx0cmV0dXJuIHRoaXMuX2NyZWF0ZVN1YlZpZXcoZnJhbWUsIHRoaXMuX3NlZ21lbnQuc2hpZnQoKSk7XG5cdFx0XHR9IGVsc2UgaWYgKGZyYW1lLnZpZXcgJiYgZnJhbWUucG9wdXApIHtcblx0XHRcdFx0Ly8gdGhlcmUgaXMgbm8gbmV4dCBzZWdtZW50LCBkZWxldGUgdGhlIGV4aXN0aW5nIHN1Yi12aWV3XG5cdFx0XHRcdGZyYW1lLnZpZXcuZGVzdHJ1Y3RvcigpO1xuXHRcdFx0XHRmcmFtZS52aWV3ID0gbnVsbDtcblx0XHRcdH1cblx0XHR9XG5cdFx0XG5cdFx0Ly9pZiBuZXcgcGF0aCBwcm92aWRlZCwgc2V0IGl0IHRvIHRoZSBmcmFtZVxuXHRcdGlmIChwYXRoICE9PSBudWxsKXtcblx0XHRcdGZyYW1lLnVybCA9IHBhdGg7XG5cdFx0fVxuXG5cdFx0Ly8gaW4gY2FzZSBvZiByb3V0ZWQgc3ViLXZpZXdcblx0XHRpZiAoZnJhbWUucm91dGUpe1xuXHRcdFx0Ly8gd2UgaGF2ZSBhIG5ldyBwYXRoIGZvciBzdWItdmlld1xuXHRcdFx0aWYgKHBhdGggIT09IG51bGwpe1xuXHRcdFx0XHRyZXR1cm4gZnJhbWUucm91dGUuc2hvdyhwYXRoLCBmcmFtZS52aWV3KS50aGVuKCgpID0+IHtcblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5fY3JlYXRlU3ViVmlldyhmcmFtZSwgZnJhbWUucm91dGUpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gZG8gbm90IHRyaWdnZXIgb25DaGFuZ2UgZm9yIGlzb2xhdGVkIHN1Yi12aWV3c1xuXHRcdFx0aWYgKGZyYW1lLmJyYW5jaCl7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRsZXQgdmlldyA9IGZyYW1lLnZpZXc7XG5cdFx0Ly8gaWYgdmlldyBkb2Vzbid0IGV4aXN0cyB5ZXQsIGluaXQgaXRcblx0XHRpZiAoIXZpZXcgJiYgZnJhbWUudXJsKXtcblx0XHRcdGlmICh0eXBlb2YgZnJhbWUudXJsID09PSBcInN0cmluZ1wiKXtcblx0XHRcdFx0Ly8gc3RyaW5nLCBzbyB3ZSBoYXZlIGlzb2xhdGVkIHN1YnZpZXcgdXJsXG5cdFx0XHRcdGZyYW1lLnJvdXRlID0gbmV3IFJvdXRlKGZyYW1lLnVybCwgMCk7XG5cdFx0XHRcdHJldHVybiB0aGlzLl9jcmVhdGVTdWJWaWV3KGZyYW1lLCBmcmFtZS5yb3V0ZSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQvLyBvYmplY3QsIHNvIHdlIGhhdmUgYW4gZW1iZWRlZCBzdWJ2aWV3XG5cdFx0XHRcdGlmICh0eXBlb2YgZnJhbWUudXJsID09PSBcImZ1bmN0aW9uXCIgJiYgISh2aWV3IGluc3RhbmNlb2YgZnJhbWUudXJsKSl7XG5cdFx0XHRcdFx0dmlldyA9IG5ldyBmcmFtZS51cmwodGhpcy5hcHAsIFwiXCIpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICghdmlldyl7XG5cdFx0XHRcdFx0dmlldyA9IGZyYW1lLnVybCBhcyBhbnk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyB0cmlnZ2VyIG9uQ2hhbmdlIGZvciBhbHJlYWR5IGV4aXN0ZWQgdmlld1xuXHRcdGlmICh2aWV3KXtcblx0XHRcdHJldHVybiB2aWV3LnJlbmRlcihmcmFtZSwgKGZyYW1lLnJvdXRlIHx8IHRoaXMuX3NlZ21lbnQpLCB0aGlzKTtcblx0XHR9XG5cdH1cblxuXHRwcml2YXRlIF9pbml0RXJyb3IodmlldzogYW55LCBlcnI6IGFueSl7XG5cdFx0Lypcblx0XHRcdGlmIHZpZXcgaXMgZGVzdHJveWVkLCBpZ25vcmUgYW55IHZpZXcgcmVsYXRlZCBlcnJvcnNcblx0XHQqL1xuXHRcdGlmICh0aGlzLmFwcCl7XG5cdFx0XHR0aGlzLmFwcC5lcnJvcihcImFwcDplcnJvcjppbml0dmlld1wiLCBbZXJyLCB2aWV3XSk7XG5cdFx0fVxuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cblx0cHJpdmF0ZSBfY3JlYXRlU3ViVmlldyhcblx0XHRcdFx0XHRzdWI6SVN1YlZpZXcsXG5cdFx0XHRcdFx0c3VidXJsOklSb3V0ZSk6UHJvbWlzZTxJQmFzZVZpZXc+e1xuXHRcdHJldHVybiB0aGlzLmFwcC5jcmVhdGVGcm9tVVJMKHN1YnVybC5jdXJyZW50KCkpLnRoZW4odmlldyA9PiB7XG5cdFx0XHRyZXR1cm4gdmlldy5yZW5kZXIoc3ViLCBzdWJ1cmwsIHRoaXMpO1xuXHRcdH0pO1xuXHR9XG5cblx0cHJpdmF0ZSBfZGVzdHJveUtpZHMoKXtcblx0XHQvLyBkZXN0cm95IGNoaWxkIHZpZXdzXG5cdFx0Y29uc3QgdWlzID0gdGhpcy5fY2hpbGRyZW47XG5cdFx0Zm9yIChsZXQgaSA9IHVpcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSl7XG5cdFx0XHRpZiAodWlzW2ldICYmIHVpc1tpXS5kZXN0cnVjdG9yKXtcblx0XHRcdFx0dWlzW2ldLmRlc3RydWN0b3IoKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyByZXNldCB2YXJzIGZvciBiZXR0ZXIgR0MgcHJvY2Vzc2luZ1xuXHRcdHRoaXMuX2NoaWxkcmVuID0gW107XG5cdH1cbn0iLCJpbXBvcnQge0lKZXRBcHB9IGZyb20gXCIuL2ludGVyZmFjZXNcIjtcbmltcG9ydCB7SmV0Vmlld30gZnJvbSBcIi4vSmV0Vmlld1wiO1xuXG5cbi8vIHdyYXBwZXIgZm9yIHJhdyBvYmplY3RzIGFuZCBKZXQgMS54IHN0cnVjdHNcbmV4cG9ydCBjbGFzcyBKZXRWaWV3UmF3IGV4dGVuZHMgSmV0Vmlld3tcblx0cHJpdmF0ZSBfdWk6YW55O1xuXG5cdGNvbnN0cnVjdG9yKGFwcDpJSmV0QXBwLCBjb25maWc6YW55KXtcblx0XHRzdXBlcihhcHAsIGNvbmZpZyk7XG5cdFx0dGhpcy5fdWkgPSBjb25maWcudWk7XG5cdH1cblxuXHRjb25maWcoKXtcblx0XHRyZXR1cm4gdGhpcy5fdWk7XG5cdH1cbn0iLCJpbXBvcnQge0lKZXRBcHAsIElKZXRSb3V0ZXIsIElKZXRSb3V0ZXJDYWxsYmFjaywgSUpldFJvdXRlck9wdGlvbnN9IGZyb20gXCIuLi9pbnRlcmZhY2VzXCI7XG5cbmltcG9ydCB7dXJsMnN0cn0gZnJvbSBcIi4uL2hlbHBlcnNcIjtcblxuZXhwb3J0IGNsYXNzIFN1YlJvdXRlciBpbXBsZW1lbnRzIElKZXRSb3V0ZXJ7XG5cdHByaXZhdGUgYXBwOiBJSmV0QXBwO1xuXHRwcml2YXRlIHBhdGg6IHN0cmluZztcblx0cHJpdmF0ZSBwcmVmaXg6IHN0cmluZztcblxuXHRjb25zdHJ1Y3RvcihjYjogSUpldFJvdXRlckNhbGxiYWNrLCBjb25maWc6YW55LCBhcHA6SUpldEFwcCl7XG5cdFx0dGhpcy5wYXRoID0gXCJcIjtcblx0XHR0aGlzLmFwcCA9IGFwcDtcblx0fVxuXHRzZXQocGF0aDpzdHJpbmcsIGNvbmZpZz86SUpldFJvdXRlck9wdGlvbnMpe1xuXHRcdHRoaXMucGF0aCA9IHBhdGg7XG5cdFx0Y29uc3QgYSA9IHRoaXMuYXBwIGFzIGFueTtcblx0XHRhLmFwcC5nZXRSb3V0ZXIoKS5zZXQoYS5fc2VnbWVudC5hcHBlbmQodGhpcy5wYXRoKSwgeyBzaWxlbnQ6dHJ1ZSB9KTtcblx0fVxuXHRnZXQoKXtcblx0XHRyZXR1cm4gdGhpcy5wYXRoO1xuXHR9XG59IiwiaW1wb3J0IHsgSmV0QmFzZSB9IGZyb20gXCIuL0pldEJhc2VcIjtcbmltcG9ydCB7IEpldFZpZXdSYXcgfSBmcm9tIFwiLi9KZXRWaWV3UmF3XCI7XG5pbXBvcnQgeyBKZXRWaWV3IH0gZnJvbSBcIi4vSmV0Vmlld1wiO1xuaW1wb3J0IHtTdWJSb3V0ZXJ9IGZyb20gXCIuL3JvdXRlcnMvU3ViUm91dGVyXCI7XG5pbXBvcnQge05hdmlnYXRpb25CbG9ja2VkfSBmcm9tIFwiLi9lcnJvcnNcIjtcblxuaW1wb3J0IHtcblx0SUJhc2VWaWV3LCBJSmV0QXBwLCBJSmV0Q29uZmlnLCBJSmV0Um91dGVyLFxuXHRJSmV0VVJMLCBJSmV0VVJMQ2h1bmssXG5cdElKZXRWaWV3LCBJUm91dGUsIElTdWJWaWV3LCBJVmlld0NvbmZpZyB9IGZyb20gXCIuL2ludGVyZmFjZXNcIjtcblxuaW1wb3J0IHsgUm91dGUgfSBmcm9tIFwiLi9Sb3V0ZVwiO1xuXG5sZXQgX29uY2UgPSB0cnVlO1xuXG5leHBvcnQgY2xhc3MgSmV0QXBwQmFzZSBleHRlbmRzIEpldEJhc2UgaW1wbGVtZW50cyBJSmV0VmlldyB7XG5cdHB1YmxpYyBjb25maWc6IElKZXRDb25maWc7XG5cdHB1YmxpYyBhcHA6IElKZXRBcHA7XG5cdHB1YmxpYyByZWFkeTogUHJvbWlzZTxhbnk+O1xuXG5cdGNhbGxFdmVudDogKG5hbWU6IHN0cmluZywgcGFyYW1ldGVyczogYW55W10pID0+IGJvb2xlYW47XG5cdGF0dGFjaEV2ZW50OiAobmFtZTogc3RyaW5nLCBoYW5kbGVyOiBhbnkpID0+IHZvaWQ7XG5cblx0cHJpdmF0ZSAkcm91dGVyOiBJSmV0Um91dGVyO1xuXHRwcml2YXRlIF9zZXJ2aWNlczogeyBbbmFtZTogc3RyaW5nXTogYW55IH07XG5cdHByaXZhdGUgX3N1YlNlZ21lbnQ6IElSb3V0ZTtcblxuXHRjb25zdHJ1Y3Rvcihjb25maWc/OiBhbnkpIHtcblx0XHRjb25zdCB3ZWJpeCA9IChjb25maWcgfHwge30pLndlYml4IHx8ICh3aW5kb3cgYXMgYW55KS53ZWJpeDtcblx0XHRzdXBlcih3ZWJpeCk7XG5cblx0XHQvLyBpbml0IGNvbmZpZ1xuXHRcdHRoaXMuY29uZmlnID0gdGhpcy53ZWJpeC5leHRlbmQoe1xuXHRcdFx0bmFtZTogXCJBcHBcIixcblx0XHRcdHZlcnNpb246IFwiMS4wXCIsXG5cdFx0XHRzdGFydDogXCIvaG9tZVwiXG5cdFx0fSwgY29uZmlnLCB0cnVlKTtcblxuXHRcdHRoaXMuYXBwID0gdGhpcy5jb25maWcuYXBwO1xuXHRcdHRoaXMucmVhZHkgPSBQcm9taXNlLnJlc29sdmUoKTtcblx0XHR0aGlzLl9zZXJ2aWNlcyA9IHt9O1xuXG5cdFx0dGhpcy53ZWJpeC5leHRlbmQodGhpcywgdGhpcy53ZWJpeC5FdmVudFN5c3RlbSk7XG5cdH1cblx0Z2V0VXJsKCk6SUpldFVSTHtcblx0XHRyZXR1cm4gdGhpcy5fc3ViU2VnbWVudC5zdWJ1cmwoKTtcblx0fVxuXHRnZXRVcmxTdHJpbmcoKXtcblx0XHRyZXR1cm4gdGhpcy5fc3ViU2VnbWVudC50b1N0cmluZygpO1xuXHR9XG5cdGdldFNlcnZpY2UobmFtZTogc3RyaW5nKSB7XG5cdFx0bGV0IG9iaiA9IHRoaXMuX3NlcnZpY2VzW25hbWVdO1xuXHRcdGlmICh0eXBlb2Ygb2JqID09PSBcImZ1bmN0aW9uXCIpIHtcblx0XHRcdG9iaiA9IHRoaXMuX3NlcnZpY2VzW25hbWVdID0gb2JqKHRoaXMpO1xuXHRcdH1cblx0XHRyZXR1cm4gb2JqO1xuXHR9XG5cdHNldFNlcnZpY2UobmFtZTogc3RyaW5nLCBoYW5kbGVyOiBhbnkpIHtcblx0XHR0aGlzLl9zZXJ2aWNlc1tuYW1lXSA9IGhhbmRsZXI7XG5cdH1cblx0ZGVzdHJ1Y3Rvcigpe1xuXHRcdHRoaXMuZ2V0U3ViVmlldygpLmRlc3RydWN0b3IoKTtcblx0XHRzdXBlci5kZXN0cnVjdG9yKCk7XG5cdH1cblx0Ly8gY29weSBvYmplY3QgYW5kIGNvbGxlY3QgZXh0cmEgaGFuZGxlcnNcblx0Y29weUNvbmZpZyhvYmo6IGFueSwgdGFyZ2V0OiBhbnksIGNvbmZpZzogSVZpZXdDb25maWcpIHtcblx0XHQvLyByYXcgdWkgY29uZmlnXG5cdFx0aWYgKG9iaiBpbnN0YW5jZW9mIEpldEJhc2UgfHxcblx0XHRcdCh0eXBlb2Ygb2JqID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLnByb3RvdHlwZSBpbnN0YW5jZW9mIEpldEJhc2UpKXtcblx0XHRcdG9iaiA9IHsgJHN1YnZpZXc6IG9iaiB9O1xuXHRcdH1cblxuXHRcdC8vIHN1YnZpZXcgcGxhY2Vob2xkZXJcblx0XHRpZiAodHlwZW9mIG9iai4kc3VidmlldyAhPSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5hZGRTdWJWaWV3KG9iaiwgdGFyZ2V0LCBjb25maWcpO1xuXHRcdH1cblxuXHRcdC8vIHByb2Nlc3Mgc3ViLXByb3BlcnRpZXNcblx0XHR0YXJnZXQgPSB0YXJnZXQgfHwgKG9iaiBpbnN0YW5jZW9mIEFycmF5ID8gW10gOiB7fSk7XG5cdFx0Zm9yIChjb25zdCBtZXRob2QgaW4gb2JqKSB7XG5cdFx0XHRsZXQgcG9pbnQgPSBvYmpbbWV0aG9kXTtcblxuXHRcdFx0Ly8gdmlldyBjbGFzc1xuXHRcdFx0aWYgKHR5cGVvZiBwb2ludCA9PT0gXCJmdW5jdGlvblwiICYmIHBvaW50LnByb3RvdHlwZSBpbnN0YW5jZW9mIEpldEJhc2UpIHtcblx0XHRcdFx0cG9pbnQgPSB7ICRzdWJ2aWV3IDogcG9pbnQgfTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKHBvaW50ICYmIHR5cGVvZiBwb2ludCA9PT0gXCJvYmplY3RcIiAmJlxuXHRcdFx0XHQhKHBvaW50IGluc3RhbmNlb2YgdGhpcy53ZWJpeC5EYXRhQ29sbGVjdGlvbikgJiYgIShwb2ludCBpbnN0YW5jZW9mIFJlZ0V4cCkgJiYgIShwb2ludCBpbnN0YW5jZW9mIE1hcCkpIHtcblx0XHRcdFx0aWYgKHBvaW50IGluc3RhbmNlb2YgRGF0ZSkge1xuXHRcdFx0XHRcdHRhcmdldFttZXRob2RdID0gbmV3IERhdGUocG9pbnQpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGNvbnN0IGNvcHkgPSB0aGlzLmNvcHlDb25maWcoXG5cdFx0XHRcdFx0XHRwb2ludCxcblx0XHRcdFx0XHRcdChwb2ludCBpbnN0YW5jZW9mIEFycmF5ID8gW10gOiB7fSksXG5cdFx0XHRcdFx0XHRjb25maWcpO1xuXHRcdFx0XHRcdGlmIChjb3B5ICE9PSBudWxsKXtcblx0XHRcdFx0XHRcdHRhcmdldFttZXRob2RdID0gY29weTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRhcmdldFttZXRob2RdID0gcG9pbnQ7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRhcmdldDtcblx0fVxuXG5cdGdldFJvdXRlcigpIHtcblx0XHRyZXR1cm4gdGhpcy4kcm91dGVyO1xuXHR9XG5cblx0Y2xpY2tIYW5kbGVyKGU6IEV2ZW50LCB0YXJnZXQ/OiBIVE1MRWxlbWVudCkge1xuXHRcdGlmIChlKSB7XG5cdFx0XHR0YXJnZXQgPSB0YXJnZXQgfHwgKGUudGFyZ2V0IHx8IGUuc3JjRWxlbWVudCkgYXMgSFRNTEVsZW1lbnQ7XG5cdFx0XHRpZiAodGFyZ2V0ICYmIHRhcmdldC5nZXRBdHRyaWJ1dGUpIHtcblx0XHRcdFx0Y29uc3QgdHJpZ2dlcjogc3RyaW5nID0gdGFyZ2V0LmdldEF0dHJpYnV0ZShcInRyaWdnZXJcIik7XG5cdFx0XHRcdGlmICh0cmlnZ2VyKSB7XG5cdFx0XHRcdFx0dGhpcy5fZm9yVmlldyh0YXJnZXQsIHZpZXcgPT4gdmlldy5hcHAudHJpZ2dlcih0cmlnZ2VyKSk7XG5cdFx0XHRcdFx0ZS5jYW5jZWxCdWJibGUgPSB0cnVlO1xuXHRcdFx0XHRcdHJldHVybiBlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0Y29uc3Qgcm91dGU6IHN0cmluZyA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoXCJyb3V0ZVwiKTtcblx0XHRcdFx0aWYgKHJvdXRlKSB7XG5cdFx0XHRcdFx0dGhpcy5fZm9yVmlldyh0YXJnZXQsIHZpZXcgPT4gdmlldy5zaG93KHJvdXRlKSk7XG5cdFx0XHRcdFx0ZS5jYW5jZWxCdWJibGUgPSB0cnVlO1xuXHRcdFx0XHRcdHJldHVybiBlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRjb25zdCBwYXJlbnQgPSB0YXJnZXQucGFyZW50Tm9kZSBhcyBIVE1MRWxlbWVudDtcblx0XHRpZiAocGFyZW50KXtcblx0XHRcdHRoaXMuY2xpY2tIYW5kbGVyKGUsIHBhcmVudCk7XG5cdFx0fVxuXHR9XG5cblx0Z2V0Um9vdCgpe1xuXHRcdHJldHVybiB0aGlzLmdldFN1YlZpZXcoKS5nZXRSb290KCk7XG5cdH1cblxuXHRyZWZyZXNoKCl7XG5cdFx0aWYgKCF0aGlzLl9zdWJTZWdtZW50KXtcblx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUobnVsbCk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXMuZ2V0U3ViVmlldygpLnJlZnJlc2goKS50aGVuKHZpZXcgPT4ge1xuXHRcdFx0dGhpcy5jYWxsRXZlbnQoXCJhcHA6cm91dGVcIiwgW3RoaXMuZ2V0VXJsKCldKTtcblx0XHRcdHJldHVybiB2aWV3O1xuXHRcdH0pO1xuXHR9XG5cblx0bG9hZFZpZXcodXJsOnN0cmluZyk6IFByb21pc2U8SUpldFZpZXc+IHtcblx0XHRjb25zdCB2aWV3cyA9IHRoaXMuY29uZmlnLnZpZXdzO1xuXHRcdGxldCByZXN1bHQgPSBudWxsO1xuXG5cdFx0aWYgKHVybCA9PT0gXCJcIil7XG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKFxuXHRcdFx0XHR0aGlzLl9sb2FkRXJyb3IoXCJcIiwgbmV3IEVycm9yKFwiV2ViaXggSmV0OiBFbXB0eSB1cmwgc2VnbWVudFwiKSlcblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0dHJ5IHtcblx0XHRcdGlmICh2aWV3cykge1xuXHRcdFx0XHRpZiAodHlwZW9mIHZpZXdzID09PSBcImZ1bmN0aW9uXCIpIHtcblx0XHRcdFx0XHQvLyBjdXN0b20gbG9hZGluZyBzdHJhdGVneVxuXHRcdFx0XHRcdHJlc3VsdCA9IHZpZXdzKHVybCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Ly8gcHJlZGVmaW5lZCBoYXNoXG5cdFx0XHRcdFx0cmVzdWx0ID0gdmlld3NbdXJsXTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAodHlwZW9mIHJlc3VsdCA9PT0gXCJzdHJpbmdcIil7XG5cdFx0XHRcdFx0dXJsID0gcmVzdWx0O1xuXHRcdFx0XHRcdHJlc3VsdCA9IG51bGw7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0aWYgKCFyZXN1bHQpe1xuXHRcdFx0XHRpZiAodXJsID09PSBcIl9ibGFua1wiKXtcblx0XHRcdFx0XHRyZXN1bHQgPSB7fTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZXN1bHQgPSB0aGlzLl9sb2FkVmlld0R5bmFtaWModXJsKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0gY2F0Y2goZSl7XG5cdFx0XHRyZXN1bHQgPSB0aGlzLl9sb2FkRXJyb3IodXJsLCBlKTtcblx0XHR9XG5cblx0XHQvLyBjdXN0b20gaGFuZGxlciBjYW4gcmV0dXJuIHZpZXcgb3IgaXRzIHByb21pc2Vcblx0XHRpZiAoIXJlc3VsdC50aGVuKXtcblx0XHRcdHJlc3VsdCA9IFByb21pc2UucmVzb2x2ZShyZXN1bHQpO1xuXHRcdH1cblxuXHRcdC8vIHNldCBlcnJvciBoYW5kbGVyXG5cdFx0cmVzdWx0ID0gcmVzdWx0XG5cdFx0XHQudGhlbihtb2R1bGUgPT4gbW9kdWxlLl9fZXNNb2R1bGUgPyBtb2R1bGUuZGVmYXVsdCA6IG1vZHVsZSlcblx0XHRcdC5jYXRjaChlcnIgPT4gdGhpcy5fbG9hZEVycm9yKHVybCwgZXJyKSk7XG5cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9XG5cblx0X2ZvclZpZXcodGFyZ2V0OiBIVE1MRWxlbWVudCwgaGFuZGxlcil7XG5cdFx0Y29uc3QgdmlldyA9IHRoaXMud2ViaXguJCQodGFyZ2V0IGFzIGFueSk7XG5cdFx0aWYgKHZpZXcpIHtcblx0XHRcdGhhbmRsZXIoKHZpZXcgYXMgYW55KS4kc2NvcGUpXG5cdFx0fVxuXHR9XG5cblx0X2xvYWRWaWV3RHluYW1pYyh1cmwpe1xuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cblx0Y3JlYXRlRnJvbVVSTChjaHVuazogSUpldFVSTENodW5rKTogUHJvbWlzZTxJSmV0Vmlldz4ge1xuXHRcdGxldCB2aWV3OlByb21pc2U8SUpldFZpZXc+O1xuXG5cdFx0aWYgKGNodW5rLmlzTmV3IHx8ICFjaHVuay52aWV3KSB7XG5cdFx0XHR2aWV3ID0gdGhpcy5sb2FkVmlldyhjaHVuay5wYWdlKVxuXHRcdFx0XHQudGhlbih1aSA9PiB0aGlzLmNyZWF0ZVZpZXcodWksIG5hbWUpKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dmlldyA9IFByb21pc2UucmVzb2x2ZShjaHVuay52aWV3KTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdmlldztcblx0fVxuXG5cdGNyZWF0ZVZpZXcodWk6YW55LCBuYW1lPzpzdHJpbmcpe1xuXHRcdGxldCBvYmo7XG5cdFx0aWYgKHR5cGVvZiB1aSA9PT0gXCJmdW5jdGlvblwiKSB7XG5cdFx0XHRpZiAodWkucHJvdG90eXBlIGluc3RhbmNlb2YgSmV0QXBwQmFzZSkge1xuXHRcdFx0XHQvLyBVSSBjbGFzc1xuXHRcdFx0XHRyZXR1cm4gbmV3IHVpKHsgYXBwOiB0aGlzLCBuYW1lLCByb3V0ZXI6U3ViUm91dGVyIH0pO1xuXHRcdFx0fSBlbHNlIGlmICh1aS5wcm90b3R5cGUgaW5zdGFuY2VvZiBKZXRCYXNlKSB7XG5cdFx0XHRcdC8vIFVJIGNsYXNzXG5cdFx0XHRcdHJldHVybiBuZXcgdWkodGhpcywgeyBuYW1lIH0pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Ly8gVUkgZmFjdG9yeSBmdW5jdGlvbnNcblx0XHRcdFx0dWkgPSB1aSh0aGlzKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAodWkgaW5zdGFuY2VvZiBKZXRCYXNlKXtcblx0XHRcdG9iaiA9IHVpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBVSSBvYmplY3Rcblx0XHRcdG9iaiA9IG5ldyBKZXRWaWV3UmF3KHRoaXMsIHsgbmFtZSwgdWkgfSk7XG5cdFx0fVxuXHRcdHJldHVybiBvYmo7XG5cdH1cblxuXHQvLyBzaG93IHZpZXcgcGF0aFxuXHRzaG93KHVybDogc3RyaW5nKSA6IFByb21pc2U8YW55PiB7XG5cdFx0cmV0dXJuIHRoaXMucmVuZGVyKHRoaXMuX2NvbnRhaW5lciwgKHVybHx8dGhpcy5jb25maWcuc3RhcnQpKTtcblx0fVxuXG5cdC8vIGV2ZW50IGhlbHBlcnNcblx0dHJpZ2dlcihuYW1lOiBzdHJpbmcsIC4uLnJlc3Q6IGFueVtdKSB7XG5cdFx0dGhpcy5hcHBseShuYW1lLCByZXN0KTtcblx0fVxuXHRhcHBseShuYW1lOiBzdHJpbmcsIGRhdGE6IGFueVtdKSB7XG5cdFx0dGhpcy5jYWxsRXZlbnQobmFtZSwgZGF0YSk7XG5cdH1cblx0YWN0aW9uKG5hbWU6IHN0cmluZykge1xuXHRcdHJldHVybiB0aGlzLndlYml4LmJpbmQoZnVuY3Rpb24oLi4ucmVzdDogYW55W10pIHtcblx0XHRcdHRoaXMuYXBwbHkobmFtZSwgcmVzdCk7XG5cdFx0fSwgdGhpcyk7XG5cdH1cblx0b24obmFtZTogc3RyaW5nLCBoYW5kbGVyKSB7XG5cdFx0dGhpcy5hdHRhY2hFdmVudChuYW1lLCBoYW5kbGVyKTtcblx0fVxuXG5cdHVzZShwbHVnaW4sIGNvbmZpZyl7XG5cdFx0cGx1Z2luKHRoaXMsIG51bGwsIGNvbmZpZyk7XG5cdH1cblxuXHRlcnJvcihuYW1lOnN0cmluZywgZXI6YW55W10pe1xuXHRcdHRoaXMuY2FsbEV2ZW50KG5hbWUsIGVyKTtcblx0XHR0aGlzLmNhbGxFdmVudChcImFwcDplcnJvclwiLCBlcik7XG5cblx0XHQvKiB0c2xpbnQ6ZGlzYWJsZSAqL1xuXHRcdGlmICh0aGlzLmNvbmZpZy5kZWJ1Zyl7XG5cdFx0XHRmb3IgKHZhciBpPTA7IGk8ZXIubGVuZ3RoOyBpKyspe1xuXHRcdFx0XHRjb25zb2xlLmVycm9yKGVyW2ldKTtcblx0XHRcdFx0aWYgKGVyW2ldIGluc3RhbmNlb2YgRXJyb3Ipe1xuXHRcdFx0XHRcdGxldCB0ZXh0ID0gZXJbaV0ubWVzc2FnZTtcblx0XHRcdFx0XHRpZiAodGV4dC5pbmRleE9mKFwiTW9kdWxlIGJ1aWxkIGZhaWxlZFwiKSA9PT0gMCl7XG5cdFx0XHRcdFx0XHR0ZXh0ID0gdGV4dC5yZXBsYWNlKC9cXHgxYlxcW1swLTk7XSptL2csXCJcIik7XG5cdFx0XHRcdFx0XHRkb2N1bWVudC5ib2R5LmlubmVySFRNTCA9IGA8cHJlIHN0eWxlPSdmb250LXNpemU6MTZweDsgYmFja2dyb3VuZC1jb2xvcjogI2VjNjg3MzsgY29sb3I6ICMwMDA7IHBhZGRpbmc6MTBweDsnPiR7dGV4dH08L3ByZT5gO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHR0ZXh0ICs9IFwiPGJyPjxicj5DaGVjayBjb25zb2xlIGZvciBtb3JlIGRldGFpbHNcIjtcblx0XHRcdFx0XHRcdHRoaXMud2ViaXgubWVzc2FnZSh7IHR5cGU6XCJlcnJvclwiLCB0ZXh0OnRleHQsIGV4cGlyZTotMSB9KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0ZGVidWdnZXI7XG5cdFx0fVxuXHRcdC8qIHRzbGludDplbmFibGUgKi9cblx0fVxuXG5cdC8vIHJlbmRlcnMgdG9wIHZpZXdcblx0cmVuZGVyKFxuXHRcdHJvb3Q/OiBzdHJpbmcgfCBIVE1MRWxlbWVudCB8IElTdWJWaWV3LFxuXHRcdHVybD86IElSb3V0ZSB8IHN0cmluZywgcGFyZW50PzogSUpldFZpZXcpOiBQcm9taXNlPElCYXNlVmlldz4ge1xuXG5cdFx0dGhpcy5fY29udGFpbmVyID0gKHR5cGVvZiByb290ID09PSBcInN0cmluZ1wiKSA/XG5cdFx0XHR0aGlzLndlYml4LnRvTm9kZShyb290KTpcblx0XHRcdChyb290IHx8IGRvY3VtZW50LmJvZHkpO1xuXG5cdFx0Y29uc3QgZmlyc3RJbml0ID0gIXRoaXMuJHJvdXRlcjtcblx0XHRsZXQgcGF0aDpzdHJpbmcgPSBudWxsO1xuXHRcdGlmIChmaXJzdEluaXQpe1xuXHRcdFx0aWYgKF9vbmNlICYmIFwidGFnTmFtZVwiIGluIHRoaXMuX2NvbnRhaW5lcil7XG5cdFx0XHRcdHRoaXMud2ViaXguZXZlbnQoZG9jdW1lbnQuYm9keSwgXCJjbGlja1wiLCBlID0+IHRoaXMuY2xpY2tIYW5kbGVyKGUpKTtcblx0XHRcdFx0X29uY2UgPSBmYWxzZTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKHR5cGVvZiB1cmwgPT09IFwic3RyaW5nXCIpe1xuXHRcdFx0XHR1cmwgPSBuZXcgUm91dGUodXJsLCAwKTtcblx0XHRcdH1cblx0XHRcdHRoaXMuX3N1YlNlZ21lbnQgPSB0aGlzLl9maXJzdF9zdGFydCh1cmwpO1xuXHRcdFx0dGhpcy5fc3ViU2VnbWVudC5yb3V0ZS5saW5rUm91dGVyID0gdHJ1ZTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0aWYgKHR5cGVvZiB1cmwgPT09IFwic3RyaW5nXCIpe1xuXHRcdFx0XHRwYXRoID0gdXJsO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKHRoaXMuYXBwKXtcblx0XHRcdFx0XHRwYXRoID0gdXJsLnNwbGl0KCkucm91dGUucGF0aCB8fCB0aGlzLmNvbmZpZy5zdGFydDtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRwYXRoID0gdXJsLnRvU3RyaW5nKCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRjb25zdCB0b3AgPSB0aGlzLmdldFN1YlZpZXcoKTtcblx0XHRjb25zdCBzZWdtZW50ID0gdGhpcy5fc3ViU2VnbWVudDtcblx0XHRjb25zdCByZWFkeSA9IHNlZ21lbnQuc2hvdyhwYXRoLCB0b3ApXG5cdFx0XHQudGhlbigoKSA9PiB0aGlzLmNyZWF0ZUZyb21VUkwoc2VnbWVudC5jdXJyZW50KCkpKVxuXHRcdFx0LnRoZW4odmlldyA9PiB2aWV3LnJlbmRlcihyb290LCBzZWdtZW50KSlcblx0XHRcdC50aGVuKGJhc2UgPT4ge1xuXHRcdFx0XHR0aGlzLiRyb3V0ZXIuc2V0KHNlZ21lbnQucm91dGUucGF0aCwgeyBzaWxlbnQ6dHJ1ZSB9KTtcblx0XHRcdFx0dGhpcy5jYWxsRXZlbnQoXCJhcHA6cm91dGVcIiwgW3RoaXMuZ2V0VXJsKCldKTtcblx0XHRcdFx0cmV0dXJuIGJhc2U7XG5cdFx0XHR9KTtcblxuXHRcdHRoaXMucmVhZHkgPSB0aGlzLnJlYWR5LnRoZW4oKCkgPT4gcmVhZHkpO1xuXHRcdHJldHVybiByZWFkeTtcblx0fVxuXG5cdGdldFN1YlZpZXcoKTpJSmV0Vmlld3tcblx0XHRpZiAodGhpcy5fc3ViU2VnbWVudCl7XG5cdFx0XHRjb25zdCB2aWV3ID0gdGhpcy5fc3ViU2VnbWVudC5jdXJyZW50KCkudmlldztcblx0XHRcdGlmICh2aWV3KVxuXHRcdFx0XHRyZXR1cm4gdmlldztcblx0XHR9XG5cdFx0cmV0dXJuIG5ldyBKZXRWaWV3KHRoaXMsIHt9KTtcblx0fVxuXG5cdHByaXZhdGUgX2ZpcnN0X3N0YXJ0KHJvdXRlOiBJUm91dGUpIDogSVJvdXRle1xuXHRcdHRoaXMuX3NlZ21lbnQgPSByb3V0ZTtcblxuXHRcdGNvbnN0IGNiID0gKGE6c3RyaW5nKSA9PiBzZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdCh0aGlzIGFzIEpldEFwcEJhc2UpLnNob3coYSkuY2F0Y2goZSA9PiB7XG5cdFx0XHRcdGlmICghKGUgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uQmxvY2tlZCkpXG5cdFx0XHRcdFx0dGhyb3cgZTtcblx0XHRcdH0pO1xuXHRcdH0sMSk7XG5cdFx0dGhpcy4kcm91dGVyID0gbmV3ICh0aGlzLmNvbmZpZy5yb3V0ZXIpKGNiLCB0aGlzLmNvbmZpZywgdGhpcyk7XG5cblx0XHQvLyBzdGFydCBhbmltYXRpb24gZm9yIHRvcC1sZXZlbCBhcHBcblx0XHRpZiAodGhpcy5fY29udGFpbmVyID09PSBkb2N1bWVudC5ib2R5ICYmIHRoaXMuY29uZmlnLmFuaW1hdGlvbiAhPT0gZmFsc2UpIHtcblx0XHRcdGNvbnN0IG5vZGUgPSB0aGlzLl9jb250YWluZXIgYXMgSFRNTEVsZW1lbnQ7XG5cdFx0XHR0aGlzLndlYml4Lmh0bWwuYWRkQ3NzKG5vZGUsIFwid2ViaXhhcHBzdGFydFwiKTtcblx0XHRcdHNldFRpbWVvdXQoKCkgPT4ge1xuXHRcdFx0XHR0aGlzLndlYml4Lmh0bWwucmVtb3ZlQ3NzKG5vZGUsIFwid2ViaXhhcHBzdGFydFwiKTtcblx0XHRcdFx0dGhpcy53ZWJpeC5odG1sLmFkZENzcyhub2RlLCBcIndlYml4YXBwXCIpO1xuXHRcdFx0fSwgMTApO1xuXHRcdH1cblxuXHRcdGlmICghcm91dGUpe1xuXHRcdFx0Ly8gaWYgbm8gdXJsIGRlZmluZWQsIGNoZWNrIHJvdXRlciBmaXJzdFxuXHRcdFx0bGV0IHVybFN0cmluZyA9IHRoaXMuJHJvdXRlci5nZXQoKTtcblx0XHRcdGlmICghdXJsU3RyaW5nKXtcblx0XHRcdFx0dXJsU3RyaW5nID0gdGhpcy5jb25maWcuc3RhcnQ7XG5cdFx0XHRcdHRoaXMuJHJvdXRlci5zZXQodXJsU3RyaW5nLCB7IHNpbGVudDogdHJ1ZSB9KTtcblx0XHRcdH1cblx0XHRcdHJvdXRlID0gbmV3IFJvdXRlKHVybFN0cmluZywgMCk7XG5cdFx0fSBlbHNlIGlmICh0aGlzLmFwcCkge1xuXHRcdFx0cm91dGUuY3VycmVudCgpLnZpZXcgPSB0aGlzO1xuXHRcdFx0aWYgKHJvdXRlLm5leHQoKSl7XG5cdFx0XHRcdHJvdXRlLnJlZnJlc2goKTtcblx0XHRcdFx0cm91dGUgPSByb3V0ZS5zcGxpdCgpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cm91dGUgPSBuZXcgUm91dGUodGhpcy5jb25maWcuc3RhcnQsIDApO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiByb3V0ZTtcblx0fVxuXG5cdC8vIGVycm9yIGR1cmluZyB2aWV3IHJlc29sdmluZ1xuXHRwcml2YXRlIF9sb2FkRXJyb3IodXJsOiBzdHJpbmcsIGVycjogRXJyb3IpOmFueXtcblx0XHR0aGlzLmVycm9yKFwiYXBwOmVycm9yOnJlc29sdmVcIiwgW2VyciwgdXJsXSk7XG5cdFx0cmV0dXJuIHsgdGVtcGxhdGU6XCIgXCIgfTtcblx0fVxuXG5cdHByaXZhdGUgYWRkU3ViVmlldyhvYmosIHRhcmdldCwgY29uZmlnOklWaWV3Q29uZmlnKSA6IElTdWJWaWV3IHtcblx0XHRjb25zdCB1cmwgPSBvYmouJHN1YnZpZXcgIT09IHRydWUgPyBvYmouJHN1YnZpZXcgOiBudWxsO1xuXHRcdGNvbnN0IG5hbWU6IHN0cmluZyA9IG9iai5uYW1lIHx8ICh1cmwgPyB0aGlzLndlYml4LnVpZCgpIDogXCJkZWZhdWx0XCIpO1xuXHRcdHRhcmdldC5pZCA9IG9iai5pZCB8fCBcInNcIiArIHRoaXMud2ViaXgudWlkKCk7XG5cblx0XHRjb25zdCB2aWV3IDogSVN1YlZpZXcgPSBjb25maWdbbmFtZV0gPSB7XG5cdFx0XHRpZDogdGFyZ2V0LmlkLFxuXHRcdFx0dXJsLFxuXHRcdFx0YnJhbmNoOiBvYmouYnJhbmNoLFxuXHRcdFx0cG9wdXA6IG9iai5wb3B1cFxuXHRcdH07XG5cblx0XHRyZXR1cm4gdmlldy5wb3B1cCA/IG51bGwgOiB0YXJnZXQ7XG5cdH1cbn1cbiIsImltcG9ydCB7SUpldFJvdXRlciwgSUpldFJvdXRlckNhbGxiYWNrLCBJSmV0Um91dGVyT3B0aW9uc30gZnJvbSBcIi4uL2ludGVyZmFjZXNcIjtcblxuZXhwb3J0IGNsYXNzIEhhc2hSb3V0ZXIgaW1wbGVtZW50cyBJSmV0Um91dGVye1xuXHRwcm90ZWN0ZWQgY29uZmlnOmFueTtcblx0cHJvdGVjdGVkIHByZWZpeDpzdHJpbmc7XG5cdHByb3RlY3RlZCBzdWZpeDpzdHJpbmc7XG5cdHByaXZhdGUgY2I6IElKZXRSb3V0ZXJDYWxsYmFjaztcblxuXHRjb25zdHJ1Y3RvcihjYjogSUpldFJvdXRlckNhbGxiYWNrLCBjb25maWc6YW55KXtcblx0XHR0aGlzLmNvbmZpZyA9IGNvbmZpZyB8fCB7fTtcblx0XHR0aGlzLl9kZXRlY3RQcmVmaXgoKTtcblx0XHR0aGlzLmNiID0gY2I7XG5cdFx0d2luZG93Lm9ucG9wc3RhdGUgPSAoKSA9PiB0aGlzLmNiKHRoaXMuZ2V0KCkpO1xuXHR9XG5cblx0c2V0KHBhdGg6c3RyaW5nLCBjb25maWc/OklKZXRSb3V0ZXJPcHRpb25zKXtcblx0XHRpZiAodGhpcy5jb25maWcucm91dGVzKXtcblx0XHRcdGNvbnN0IGNvbXBhcmUgPSBwYXRoLnNwbGl0KFwiP1wiLDIpO1xuXHRcdFx0Zm9yIChjb25zdCBrZXkgaW4gdGhpcy5jb25maWcucm91dGVzKXtcblx0XHRcdFx0aWYgKHRoaXMuY29uZmlnLnJvdXRlc1trZXldID09PSBjb21wYXJlWzBdKXtcblx0XHRcdFx0XHRwYXRoID0ga2V5Kyhjb21wYXJlLmxlbmd0aCA+IDEgPyBcIj9cIitjb21wYXJlWzFdIDogXCJcIik7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAodGhpcy5nZXQoKSAhPT0gcGF0aCl7XG5cdFx0XHR3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUobnVsbCwgbnVsbCwgdGhpcy5wcmVmaXggKyB0aGlzLnN1Zml4ICsgcGF0aCk7XG5cdFx0fVxuXHRcdGlmICghY29uZmlnIHx8ICFjb25maWcuc2lsZW50KXtcblx0XHRcdHNldFRpbWVvdXQoKCkgPT4gdGhpcy5jYihwYXRoKSwgMSk7XG5cdFx0fVxuXHR9XG5cdGdldCgpe1xuXHRcdGxldCBwYXRoID0gdGhpcy5fZ2V0UmF3KCkucmVwbGFjZSh0aGlzLnByZWZpeCwgXCJcIikucmVwbGFjZSh0aGlzLnN1Zml4LCBcIlwiKTtcblx0XHRwYXRoID0gKHBhdGggIT09IFwiL1wiICYmIHBhdGggIT09IFwiI1wiKSA/IHBhdGggOiBcIlwiO1xuXG5cdFx0aWYgKHRoaXMuY29uZmlnLnJvdXRlcyl7XG5cdFx0XHRjb25zdCBjb21wYXJlID0gcGF0aC5zcGxpdChcIj9cIiwyKTtcblx0XHRcdGNvbnN0IGtleSA9IHRoaXMuY29uZmlnLnJvdXRlc1tjb21wYXJlWzBdXTtcblx0XHRcdGlmIChrZXkpe1xuXHRcdFx0XHRwYXRoID0ga2V5Kyhjb21wYXJlLmxlbmd0aCA+IDEgPyBcIj9cIitjb21wYXJlWzFdIDogXCJcIik7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBwYXRoO1xuXHR9XG5cdHByb3RlY3RlZCBfZGV0ZWN0UHJlZml4KCl7XG5cdFx0Ly8gdXNlIFwiIyFcIiBmb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eVxuXHRcdGNvbnN0IHN1Zml4ID0gdGhpcy5jb25maWcucm91dGVyUHJlZml4O1xuXHRcdHRoaXMuc3VmaXggPSBcIiNcIiArICgodHlwZW9mIHN1Zml4ID09PSBcInVuZGVmaW5lZFwiKSA/IFwiIVwiIDogc3VmaXgpO1xuXG5cdFx0dGhpcy5wcmVmaXggPSBkb2N1bWVudC5sb2NhdGlvbi5ocmVmLnNwbGl0KFwiI1wiLCAyKVswXTtcblx0fVxuXG5cdHByb3RlY3RlZCBfZ2V0UmF3KCl7XG5cdFx0cmV0dXJuIGRvY3VtZW50LmxvY2F0aW9uLmhyZWY7XG5cdH1cbn0iLCJsZXQgaXNQYXRjaGVkID0gZmFsc2U7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwYXRjaCh3OiBhbnkpe1xuXHRpZiAoaXNQYXRjaGVkIHx8ICF3KXsgcmV0dXJuOyB9XG5cdGlzUGF0Y2hlZCA9IHRydWU7XG5cblx0Ly8gY3VzdG9tIHByb21pc2UgZm9yIElFOFxuXHRjb25zdCB3aW4gPSB3aW5kb3cgYXMgYW55O1xuXHRpZiAoIXdpbi5Qcm9taXNlKXtcblx0XHR3aW4uUHJvbWlzZSA9IHcucHJvbWlzZTtcblx0fVxuXG5cdGNvbnN0IHZlcnNpb24gPSB3LnZlcnNpb24uc3BsaXQoXCIuXCIpIGFzIGFueVtdO1xuXG5cdC8vIHdpbGwgYmUgZml4ZWQgaW4gd2ViaXggNS4zXG5cdGlmICh2ZXJzaW9uWzBdKjEwK3ZlcnNpb25bMV0qMSA8IDUzKSB7XG5cdFx0dy51aS5mcmVlemUgPSBmdW5jdGlvbihoYW5kbGVyKTphbnl7XG5cdFx0XHQvLyBkaXNhYmxlZCBiZWNhdXNlIHdlYml4IGpldCA1LjAgY2FuJ3QgaGFuZGxlIHJlc2l6ZSBvZiBzY3JvbGx2aWV3IGNvcnJlY3RseVxuXHRcdFx0Ly8gdy51aS4kZnJlZXplID0gdHJ1ZTtcblx0XHRcdGNvbnN0IHJlcyA9IGhhbmRsZXIoKTtcblx0XHRcdGlmIChyZXMgJiYgcmVzLnRoZW4pe1xuXHRcdFx0XHRyZXMudGhlbihmdW5jdGlvbihzb21lKXtcblx0XHRcdFx0XHR3LnVpLiRmcmVlemUgPSBmYWxzZTtcblx0XHRcdFx0XHR3LnVpLnJlc2l6ZSgpO1xuXHRcdFx0XHRcdHJldHVybiBzb21lO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHcudWkuJGZyZWV6ZSA9IGZhbHNlO1xuXHRcdFx0XHR3LnVpLnJlc2l6ZSgpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHJlcztcblx0XHR9O1xuXHR9XG5cblx0Ly8gYWRkaW5nIHZpZXdzIGFzIGNsYXNzZXNcblx0Y29uc3QgYmFzZUFkZCA9IHcudWkuYmFzZWxheW91dC5wcm90b3R5cGUuYWRkVmlldyBhcyBhbnk7XG5cdGNvbnN0IGJhc2VSZW1vdmUgPSB3LnVpLmJhc2VsYXlvdXQucHJvdG90eXBlLnJlbW92ZVZpZXcgYXMgYW55O1xuXG5cdGNvbnN0IGNvbmZpZyA9IHtcblx0XHRhZGRWaWV3KHZpZXcsIGluZGV4KXtcblx0XHRcdC8vIHRyaWdnZXIgbG9naWMgb25seSBmb3Igd2lkZ2V0cyBpbnNpZGUgb2YgamV0LXZpZXdcblx0XHRcdC8vIGlnbm9yZSBjYXNlIHdoZW4gYWRkVmlldyB1c2VkIHdpdGggYWxyZWFkeSBpbml0aWFsaXplZCB3aWRnZXRcblx0XHRcdGlmICh0aGlzLiRzY29wZSAmJiB0aGlzLiRzY29wZS53ZWJpeEpldCAmJiAhdmlldy5xdWVyeVZpZXcpe1xuXHRcdFx0XHRjb25zdCBqdmlldyA9IHRoaXMuJHNjb3BlO1xuXHRcdFx0XHRjb25zdCBzdWJzID0ge307XG5cblx0XHRcdFx0dmlldyA9IGp2aWV3LmFwcC5jb3B5Q29uZmlnKHZpZXcsIHt9LCBzdWJzKTtcblx0XHRcdFx0YmFzZUFkZC5hcHBseSh0aGlzLCBbdmlldywgaW5kZXhdKTtcblxuXHRcdFx0XHRmb3IgKGNvbnN0IGtleSBpbiBzdWJzKXtcblx0XHRcdFx0XHRqdmlldy5fcmVuZGVyRnJhbWUoa2V5LCBzdWJzW2tleV0sIG51bGwpLnRoZW4oKCkgPT4ge1xuXHRcdFx0XHRcdFx0anZpZXcuX3N1YnNba2V5XSA9IHN1YnNba2V5XTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiB2aWV3LmlkO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0dXJuIGJhc2VBZGQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblx0XHRcdH1cblx0XHR9LFxuXHRcdHJlbW92ZVZpZXcoKXtcblx0XHRcdGJhc2VSZW1vdmUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblx0XHRcdGlmICh0aGlzLiRzY29wZSAmJiB0aGlzLiRzY29wZS53ZWJpeEpldCl7XG5cdFx0XHRcdGNvbnN0IHN1YnMgPSB0aGlzLiRzY29wZS5fc3Vicztcblx0XHRcdFx0Ly8gY2hlY2sgYWxsIHN1Yi12aWV3cywgZGVzdHJveSBhbmQgY2xlYW4gdGhlIHJlbW92ZWQgb25lXG5cdFx0XHRcdGZvcihjb25zdCBrZXkgaW4gc3Vicyl7XG5cdFx0XHRcdFx0Y29uc3QgdGVzdCA9IHN1YnNba2V5XTtcblx0XHRcdFx0XHRpZiAoIXcuJCQodGVzdC5pZCkpe1xuXHRcdFx0XHRcdFx0dGVzdC52aWV3LmRlc3RydWN0b3IoKTtcblx0XHRcdFx0XHRcdGRlbGV0ZSBzdWJzW2tleV07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xuXG5cdHcuZXh0ZW5kKHcudWkubGF5b3V0LnByb3RvdHlwZSwgY29uZmlnLCB0cnVlKTtcblx0dy5leHRlbmQody51aS5iYXNlbGF5b3V0LnByb3RvdHlwZSwgY29uZmlnLCB0cnVlKTtcblxuXHQvLyB3cmFwcGVyIGZvciB1c2luZyBKZXQgQXBwcyBhcyB2aWV3c1xuXG5cdHcucHJvdG9VSSh7XG5cdFx0bmFtZTpcImpldGFwcFwiLFxuXHRcdCRpbml0KGNmZyl7XG5cdFx0XHR0aGlzLiRhcHAgPSBuZXcgdGhpcy5hcHAoY2ZnKTtcblxuXHRcdFx0Y29uc3QgaWQgPSB3LnVpZCgpLnRvU3RyaW5nKCk7XG5cdFx0XHRjZmcuYm9keSA9IHsgaWQgfTtcblxuXHRcdFx0dGhpcy4kcmVhZHkucHVzaChmdW5jdGlvbigpe1xuXHRcdFx0XHR0aGlzLiRhcHAucmVuZGVyKHsgaWQgfSk7XG5cdFx0XHR9KTtcblxuXHRcdFx0Zm9yICh2YXIga2V5IGluIHRoaXMuJGFwcCl7XG5cdFx0XHRcdHZhciBvcmlnaW4gPSB0aGlzLiRhcHBba2V5XTtcblx0XHRcdFx0aWYgKHR5cGVvZiBvcmlnaW4gPT09IFwiZnVuY3Rpb25cIiAmJiAhdGhpc1trZXldKXtcblx0XHRcdFx0XHR0aGlzW2tleV0gPSBvcmlnaW4uYmluZCh0aGlzLiRhcHApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9LCAody51aSBhcyBhbnkpLnByb3h5KTtcbn0iLCJpbXBvcnQgeyBJSmV0QXBwIH0gZnJvbSBcIi4vaW50ZXJmYWNlc1wiO1xuaW1wb3J0IHsgSmV0QXBwQmFzZSB9IGZyb20gXCIuL0pldEFwcEJhc2VcIjtcbmltcG9ydCB7IEhhc2hSb3V0ZXIgfSBmcm9tIFwiLi9yb3V0ZXJzL0hhc2hSb3V0ZXJcIjtcblxuaW1wb3J0IHBhdGNoIGZyb20gXCIuL3BhdGNoXCI7XG5cbi8vIHdlYnBhY2sgcmVxdWlyZVxuZGVjbGFyZSBmdW5jdGlvbiByZXF1aXJlKF8kdXJsOiBzdHJpbmcpOiBhbnk7XG5cbi8vIHdlYnBhY2sgcmVxdWlyZVxuZGVjbGFyZSBmdW5jdGlvbiByZXF1aXJlKF8kdXJsOiBzdHJpbmcpOiBhbnk7XG5cbmV4cG9ydCBjbGFzcyBKZXRBcHAgZXh0ZW5kcyBKZXRBcHBCYXNlIGltcGxlbWVudHMgSUpldEFwcCB7XG5cdGNvbnN0cnVjdG9yKGNvbmZpZzogYW55KSB7XG5cdFx0Y29uZmlnLnJvdXRlciA9IGNvbmZpZy5yb3V0ZXIgfHwgSGFzaFJvdXRlcjtcblx0XHRzdXBlcihjb25maWcpO1xuXHRcdHBhdGNoKHRoaXMud2ViaXgpO1xuXHR9XG5cdF9sb2FkVmlld0R5bmFtaWModXJsKXtcblx0XHR1cmwgPSB1cmwucmVwbGFjZSgvXFwuL2csIFwiL1wiKTtcblx0XHRyZXR1cm4gcmVxdWlyZShcImpldC12aWV3cy9cIit1cmwpO1xuXHR9XG59XG4iLCJpbXBvcnQge0lKZXRBcHAsIElKZXRSb3V0ZXIsIElKZXRSb3V0ZXJDYWxsYmFjaywgSUpldFJvdXRlck9wdGlvbnN9IGZyb20gXCIuLi9pbnRlcmZhY2VzXCI7XG5cbmV4cG9ydCBjbGFzcyBTdG9yZVJvdXRlciBpbXBsZW1lbnRzIElKZXRSb3V0ZXJ7XG5cdHByaXZhdGUgbmFtZTpzdHJpbmc7XG5cdHByaXZhdGUgc3RvcmFnZTogYW55O1xuXHRwcml2YXRlIGNiOiBJSmV0Um91dGVyQ2FsbGJhY2s7XG5cblx0Y29uc3RydWN0b3IoY2I6IElKZXRSb3V0ZXJDYWxsYmFjaywgY29uZmlnOmFueSwgYXBwOiBJSmV0QXBwKXtcblx0XHR0aGlzLnN0b3JhZ2UgPSBjb25maWcuc3RvcmFnZSB8fCBhcHAud2ViaXguc3RvcmFnZS5zZXNzaW9uO1xuXHRcdHRoaXMubmFtZSA9IChjb25maWcuc3RvcmVOYW1lIHx8IGNvbmZpZy5pZCtcIjpyb3V0ZVwiKTtcblx0XHR0aGlzLmNiID0gY2I7XG5cdH1cblx0c2V0KHBhdGg6c3RyaW5nLCBjb25maWc/OklKZXRSb3V0ZXJPcHRpb25zKXtcblx0XHR0aGlzLnN0b3JhZ2UucHV0KHRoaXMubmFtZSwgcGF0aCk7XG5cdFx0aWYgKCFjb25maWcgfHwgIWNvbmZpZy5zaWxlbnQpe1xuXHRcdFx0c2V0VGltZW91dCgoKSA9PiB0aGlzLmNiKHBhdGgpLCAxKTtcblx0XHR9XG5cdH1cblx0Z2V0KCl7XG5cdFx0cmV0dXJuIHRoaXMuc3RvcmFnZS5nZXQodGhpcy5uYW1lKTtcblx0fVxufSIsImltcG9ydCB7SUpldFJvdXRlciwgSUpldFJvdXRlckNhbGxiYWNrLCBJSmV0Um91dGVyT3B0aW9uc30gZnJvbSBcIi4uL2ludGVyZmFjZXNcIjtcbmltcG9ydCB7IEhhc2hSb3V0ZXIgfSBmcm9tIFwiLi9IYXNoUm91dGVyXCI7XG5cbmV4cG9ydCBjbGFzcyBVcmxSb3V0ZXIgZXh0ZW5kcyBIYXNoUm91dGVyIGltcGxlbWVudHMgSUpldFJvdXRlcntcblx0cHJvdGVjdGVkIF9kZXRlY3RQcmVmaXgoKXtcblx0XHR0aGlzLnByZWZpeCA9IFwiXCI7XG5cdFx0dGhpcy5zdWZpeCA9IHRoaXMuY29uZmlnLnJvdXRlclByZWZpeCB8fCBcIlwiO1xuXHR9XG5cdHByb3RlY3RlZCBfZ2V0UmF3KCl7XG5cdFx0cmV0dXJuIGRvY3VtZW50LmxvY2F0aW9uLnBhdGhuYW1lICsgKGRvY3VtZW50LmxvY2F0aW9uLnNlYXJjaHx8XCJcIik7XG5cdH1cbn0iLCJpbXBvcnQge0lKZXRSb3V0ZXIsIElKZXRSb3V0ZXJDYWxsYmFjaywgSUpldFJvdXRlck9wdGlvbnN9IGZyb20gXCIuLi9pbnRlcmZhY2VzXCI7XG5cbmV4cG9ydCBjbGFzcyBFbXB0eVJvdXRlciBpbXBsZW1lbnRzIElKZXRSb3V0ZXJ7XG5cdHByaXZhdGUgcGF0aDogc3RyaW5nO1xuXHRwcml2YXRlIGNiOiBJSmV0Um91dGVyQ2FsbGJhY2s7XG5cblx0Y29uc3RydWN0b3IoY2I6IElKZXRSb3V0ZXJDYWxsYmFjaywgXyRjb25maWc6YW55KXtcblx0XHR0aGlzLnBhdGggPSBcIlwiO1xuXHRcdHRoaXMuY2IgPSBjYjtcblx0fVxuXHRzZXQocGF0aDpzdHJpbmcsIGNvbmZpZz86SUpldFJvdXRlck9wdGlvbnMpe1xuXHRcdHRoaXMucGF0aCA9IHBhdGg7XG5cdFx0aWYgKCFjb25maWcgfHwgIWNvbmZpZy5zaWxlbnQpe1xuXHRcdFx0c2V0VGltZW91dCgoKSA9PiB0aGlzLmNiKHBhdGgpLCAxKTtcblx0XHR9XG5cdH1cblx0Z2V0KCl7XG5cdFx0cmV0dXJuIHRoaXMucGF0aDtcblx0fVxufSIsImltcG9ydCB7TmF2aWdhdGlvbkJsb2NrZWR9IGZyb20gXCIuLi9lcnJvcnNcIjtcbmltcG9ydCB7SUpldEFwcCwgSUpldFVSTCwgSUpldFZpZXd9IGZyb20gXCIuLi9pbnRlcmZhY2VzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBVbmxvYWRHdWFyZChhcHA6IElKZXRBcHAsIHZpZXc6IElKZXRWaWV3LCBjb25maWc6IGFueSl7XG5cdHZpZXcub24oYXBwLCBgYXBwOmd1YXJkYCwgZnVuY3Rpb24oXyR1cmw6SUpldFVSTCwgcG9pbnQ6SUpldFZpZXcsIHByb21pc2U6YW55KXtcblx0XHRpZiAocG9pbnQgPT09IHZpZXcgfHwgcG9pbnQuY29udGFpbnModmlldykpe1xuXHRcdFx0Y29uc3QgcmVzID0gY29uZmlnKCk7XG5cdFx0XHRpZiAocmVzID09PSBmYWxzZSl7XG5cdFx0XHRcdHByb21pc2UuY29uZmlybSA9IFByb21pc2UucmVqZWN0KG5ldyBOYXZpZ2F0aW9uQmxvY2tlZCgpKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHByb21pc2UuY29uZmlybSA9IHByb21pc2UuY29uZmlybS50aGVuKCgpID0+IHJlcyk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9KTtcbn0iLCIvLyAgICAgKGMpIDIwMTItMjAxOCBBaXJibmIsIEluYy5cbi8vXG4vLyAgICAgcG9seWdsb3QuanMgbWF5IGJlIGZyZWVseSBkaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEJTRFxuLy8gICAgIGxpY2Vuc2UuIEZvciBhbGwgbGljZW5zaW5nIGluZm9ybWF0aW9uLCBkZXRhaWxzLCBhbmQgZG9jdW1lbnRpb246XG4vLyAgICAgaHR0cDovL2FpcmJuYi5naXRodWIuY29tL3BvbHlnbG90LmpzXG4vL1xuLy9cbi8vIFBvbHlnbG90LmpzIGlzIGFuIEkxOG4gaGVscGVyIGxpYnJhcnkgd3JpdHRlbiBpbiBKYXZhU2NyaXB0LCBtYWRlIHRvXG4vLyB3b3JrIGJvdGggaW4gdGhlIGJyb3dzZXIgYW5kIGluIE5vZGUuIEl0IHByb3ZpZGVzIGEgc2ltcGxlIHNvbHV0aW9uIGZvclxuLy8gaW50ZXJwb2xhdGlvbiBhbmQgcGx1cmFsaXphdGlvbiwgYmFzZWQgb2ZmIG9mIEFpcmJuYidzXG4vLyBleHBlcmllbmNlIGFkZGluZyBJMThuIGZ1bmN0aW9uYWxpdHkgdG8gaXRzIEJhY2tib25lLmpzIGFuZCBOb2RlIGFwcHMuXG4vL1xuLy8gUG9seWxnbG90IGlzIGFnbm9zdGljIHRvIHlvdXIgdHJhbnNsYXRpb24gYmFja2VuZC4gSXQgZG9lc24ndCBwZXJmb3JtIGFueVxuLy8gdHJhbnNsYXRpb247IGl0IHNpbXBseSBnaXZlcyB5b3UgYSB3YXkgdG8gbWFuYWdlIHRyYW5zbGF0ZWQgcGhyYXNlcyBmcm9tXG4vLyB5b3VyIGNsaWVudC0gb3Igc2VydmVyLXNpZGUgSmF2YVNjcmlwdCBhcHBsaWNhdGlvbi5cbi8vXG5cbid1c2Ugc3RyaWN0JztcblxuLy8gdmFyIGhhcyA9IHJlcXVpcmUoJ2hhcycpO1xuZnVuY3Rpb24gaGFzKHN0b3JlLCBrZXkpIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzdG9yZSwga2V5KTtcbn1cbi8vIHZhciBmb3JFYWNoID0gcmVxdWlyZSgnZm9yLWVhY2gnKTtcbmZ1bmN0aW9uIGZvckVhY2gob2JqLCBoYW5kbGVyLCBjb250ZXh0KSB7XG4gIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICBpZiAoaGFzKG9iaiwga2V5KSkge1xuICAgICAgaGFuZGxlci5jYWxsKChjb250ZXh0IHx8IG9iaiksIG9ialtrZXldLCBrZXksIG9iaik7XG4gICAgfVxuICB9XG59XG4vLyB2YXIgdHJpbSA9IHJlcXVpcmUoJ3N0cmluZy5wcm90b3R5cGUudHJpbScpO1xuZnVuY3Rpb24gdHJpbShzdHIpIHtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC9eW1xcc1xcdUZFRkZcXHhBMF0rfFtcXHNcXHVGRUZGXFx4QTBdKyQvZywgJycpO1xufVxuLy8gdmFyIHdhcm5pbmcgPSByZXF1aXJlKCd3YXJuaW5nJyk7XG5mdW5jdGlvbiB3YXJuKG1lc3NhZ2UpIHtcbiAgbWVzc2FnZSA9ICdXYXJuaW5nOiAnICsgbWVzc2FnZTtcbiAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgIGNvbnNvbGUuZXJyb3IobWVzc2FnZSk7XG4gIH1cblxuICB0cnkgeyB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7IH0gY2F0Y2ggKHgpIHt9XG59XG5cbnZhciByZXBsYWNlID0gU3RyaW5nLnByb3RvdHlwZS5yZXBsYWNlO1xudmFyIHNwbGl0ID0gU3RyaW5nLnByb3RvdHlwZS5zcGxpdDtcblxuLy8gIyMjIyBQbHVyYWxpemF0aW9uIG1ldGhvZHNcbi8vIFRoZSBzdHJpbmcgdGhhdCBzZXBhcmF0ZXMgdGhlIGRpZmZlcmVudCBwaHJhc2UgcG9zc2liaWxpdGllcy5cbnZhciBkZWxpbWl0ZXIgPSAnfHx8fCc7XG5cbnZhciBydXNzaWFuUGx1cmFsR3JvdXBzID0gZnVuY3Rpb24gKG4pIHtcbiAgdmFyIGVuZCA9IG4gJSAxMDtcbiAgaWYgKG4gIT09IDExICYmIGVuZCA9PT0gMSkge1xuICAgIHJldHVybiAwO1xuICB9XG4gIGlmICgyIDw9IGVuZCAmJiBlbmQgPD0gNCAmJiAhKG4gPj0gMTIgJiYgbiA8PSAxNCkpIHtcbiAgICByZXR1cm4gMTtcbiAgfVxuICByZXR1cm4gMjtcbn07XG5cbi8vIE1hcHBpbmcgZnJvbSBwbHVyYWxpemF0aW9uIGdyb3VwIHBsdXJhbCBsb2dpYy5cbnZhciBwbHVyYWxUeXBlcyA9IHtcbiAgYXJhYmljOiBmdW5jdGlvbiAobikge1xuICAgIC8vIGh0dHA6Ly93d3cuYXJhYmV5ZXMub3JnL1BsdXJhbF9Gb3Jtc1xuICAgIGlmIChuIDwgMykgeyByZXR1cm4gbjsgfVxuICAgIHZhciBsYXN0VHdvID0gbiAlIDEwMDtcbiAgICBpZiAobGFzdFR3byA+PSAzICYmIGxhc3RUd28gPD0gMTApIHJldHVybiAzO1xuICAgIHJldHVybiBsYXN0VHdvID49IDExID8gNCA6IDU7XG4gIH0sXG4gIGJvc25pYW5fc2VyYmlhbjogcnVzc2lhblBsdXJhbEdyb3VwcyxcbiAgY2hpbmVzZTogZnVuY3Rpb24gKCkgeyByZXR1cm4gMDsgfSxcbiAgY3JvYXRpYW46IHJ1c3NpYW5QbHVyYWxHcm91cHMsXG4gIGZyZW5jaDogZnVuY3Rpb24gKG4pIHsgcmV0dXJuIG4gPiAxID8gMSA6IDA7IH0sXG4gIGdlcm1hbjogZnVuY3Rpb24gKG4pIHsgcmV0dXJuIG4gIT09IDEgPyAxIDogMDsgfSxcbiAgcnVzc2lhbjogcnVzc2lhblBsdXJhbEdyb3VwcyxcbiAgbGl0aHVhbmlhbjogZnVuY3Rpb24gKG4pIHtcbiAgICBpZiAobiAlIDEwID09PSAxICYmIG4gJSAxMDAgIT09IDExKSB7IHJldHVybiAwOyB9XG4gICAgcmV0dXJuIG4gJSAxMCA+PSAyICYmIG4gJSAxMCA8PSA5ICYmIChuICUgMTAwIDwgMTEgfHwgbiAlIDEwMCA+IDE5KSA/IDEgOiAyO1xuICB9LFxuICBjemVjaDogZnVuY3Rpb24gKG4pIHtcbiAgICBpZiAobiA9PT0gMSkgeyByZXR1cm4gMDsgfVxuICAgIHJldHVybiAobiA+PSAyICYmIG4gPD0gNCkgPyAxIDogMjtcbiAgfSxcbiAgcG9saXNoOiBmdW5jdGlvbiAobikge1xuICAgIGlmIChuID09PSAxKSB7IHJldHVybiAwOyB9XG4gICAgdmFyIGVuZCA9IG4gJSAxMDtcbiAgICByZXR1cm4gMiA8PSBlbmQgJiYgZW5kIDw9IDQgJiYgKG4gJSAxMDAgPCAxMCB8fCBuICUgMTAwID49IDIwKSA/IDEgOiAyO1xuICB9LFxuICBpY2VsYW5kaWM6IGZ1bmN0aW9uIChuKSB7IHJldHVybiAobiAlIDEwICE9PSAxIHx8IG4gJSAxMDAgPT09IDExKSA/IDEgOiAwOyB9LFxuICBzbG92ZW5pYW46IGZ1bmN0aW9uIChuKSB7XG4gICAgdmFyIGxhc3RUd28gPSBuICUgMTAwO1xuICAgIGlmIChsYXN0VHdvID09PSAxKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgaWYgKGxhc3RUd28gPT09IDIpIHtcbiAgICAgIHJldHVybiAxO1xuICAgIH1cbiAgICBpZiAobGFzdFR3byA9PT0gMyB8fCBsYXN0VHdvID09PSA0KSB7XG4gICAgICByZXR1cm4gMjtcbiAgICB9XG4gICAgcmV0dXJuIDM7XG4gIH1cbn07XG5cblxuLy8gTWFwcGluZyBmcm9tIHBsdXJhbGl6YXRpb24gZ3JvdXAgdG8gaW5kaXZpZHVhbCBsYW5ndWFnZSBjb2Rlcy9sb2NhbGVzLlxuLy8gV2lsbCBsb29rIHVwIGJhc2VkIG9uIGV4YWN0IG1hdGNoLCBpZiBub3QgZm91bmQgYW5kIGl0J3MgYSBsb2NhbGUgd2lsbCBwYXJzZSB0aGUgbG9jYWxlXG4vLyBmb3IgbGFuZ3VhZ2UgY29kZSwgYW5kIGlmIHRoYXQgZG9lcyBub3QgZXhpc3Qgd2lsbCBkZWZhdWx0IHRvICdlbidcbnZhciBwbHVyYWxUeXBlVG9MYW5ndWFnZXMgPSB7XG4gIGFyYWJpYzogWydhciddLFxuICBib3NuaWFuX3NlcmJpYW46IFsnYnMtTGF0bi1CQScsICdicy1DeXJsLUJBJywgJ3NybC1SUycsICdzci1SUyddLFxuICBjaGluZXNlOiBbJ2lkJywgJ2lkLUlEJywgJ2phJywgJ2tvJywgJ2tvLUtSJywgJ2xvJywgJ21zJywgJ3RoJywgJ3RoLVRIJywgJ3poJ10sXG4gIGNyb2F0aWFuOiBbJ2hyJywgJ2hyLUhSJ10sXG4gIGdlcm1hbjogWydmYScsICdkYScsICdkZScsICdlbicsICdlcycsICdmaScsICdlbCcsICdoZScsICdoaS1JTicsICdodScsICdodS1IVScsICdpdCcsICdubCcsICdubycsICdwdCcsICdzdicsICd0ciddLFxuICBmcmVuY2g6IFsnZnInLCAndGwnLCAncHQtYnInXSxcbiAgcnVzc2lhbjogWydydScsICdydS1SVSddLFxuICBsaXRodWFuaWFuOiBbJ2x0J10sXG4gIGN6ZWNoOiBbJ2NzJywgJ2NzLUNaJywgJ3NrJ10sXG4gIHBvbGlzaDogWydwbCddLFxuICBpY2VsYW5kaWM6IFsnaXMnXSxcbiAgc2xvdmVuaWFuOiBbJ3NsLVNMJ11cbn07XG5cbmZ1bmN0aW9uIGxhbmdUb1R5cGVNYXAobWFwcGluZykge1xuICB2YXIgcmV0ID0ge307XG4gIGZvckVhY2gobWFwcGluZywgZnVuY3Rpb24gKGxhbmdzLCB0eXBlKSB7XG4gICAgZm9yRWFjaChsYW5ncywgZnVuY3Rpb24gKGxhbmcpIHtcbiAgICAgIHJldFtsYW5nXSA9IHR5cGU7XG4gICAgfSk7XG4gIH0pO1xuICByZXR1cm4gcmV0O1xufVxuXG5mdW5jdGlvbiBwbHVyYWxUeXBlTmFtZShsb2NhbGUpIHtcbiAgdmFyIGxhbmdUb1BsdXJhbFR5cGUgPSBsYW5nVG9UeXBlTWFwKHBsdXJhbFR5cGVUb0xhbmd1YWdlcyk7XG4gIHJldHVybiBsYW5nVG9QbHVyYWxUeXBlW2xvY2FsZV1cbiAgICB8fCBsYW5nVG9QbHVyYWxUeXBlW3NwbGl0LmNhbGwobG9jYWxlLCAvLS8sIDEpWzBdXVxuICAgIHx8IGxhbmdUb1BsdXJhbFR5cGUuZW47XG59XG5cbmZ1bmN0aW9uIHBsdXJhbFR5cGVJbmRleChsb2NhbGUsIGNvdW50KSB7XG4gIHJldHVybiBwbHVyYWxUeXBlc1twbHVyYWxUeXBlTmFtZShsb2NhbGUpXShjb3VudCk7XG59XG5cbmZ1bmN0aW9uIGVzY2FwZSh0b2tlbikge1xuICByZXR1cm4gdG9rZW4ucmVwbGFjZSgvWy4qKz9eJHt9KCl8W1xcXVxcXFxdL2csICdcXFxcJCYnKTtcbn1cblxuZnVuY3Rpb24gY29uc3RydWN0VG9rZW5SZWdleChvcHRzKSB7XG4gIHZhciBwcmVmaXggPSAob3B0cyAmJiBvcHRzLnByZWZpeCkgfHwgJyV7JztcbiAgdmFyIHN1ZmZpeCA9IChvcHRzICYmIG9wdHMuc3VmZml4KSB8fCAnfSc7XG5cbiAgaWYgKHByZWZpeCA9PT0gZGVsaW1pdGVyIHx8IHN1ZmZpeCA9PT0gZGVsaW1pdGVyKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1wiJyArIGRlbGltaXRlciArICdcIiB0b2tlbiBpcyByZXNlcnZlZCBmb3IgcGx1cmFsaXphdGlvbicpO1xuICB9XG5cbiAgcmV0dXJuIG5ldyBSZWdFeHAoZXNjYXBlKHByZWZpeCkgKyAnKC4qPyknICsgZXNjYXBlKHN1ZmZpeCksICdnJyk7XG59XG5cbnZhciBkb2xsYXJSZWdleCA9IC9cXCQvZztcbnZhciBkb2xsYXJCaWxsc1lhbGwgPSAnJCQnO1xudmFyIGRlZmF1bHRUb2tlblJlZ2V4ID0gLyVcXHsoLio/KVxcfS9nO1xuXG4vLyAjIyMgdHJhbnNmb3JtUGhyYXNlKHBocmFzZSwgc3Vic3RpdHV0aW9ucywgbG9jYWxlKVxuLy9cbi8vIFRha2VzIGEgcGhyYXNlIHN0cmluZyBhbmQgdHJhbnNmb3JtcyBpdCBieSBjaG9vc2luZyB0aGUgY29ycmVjdFxuLy8gcGx1cmFsIGZvcm0gYW5kIGludGVycG9sYXRpbmcgaXQuXG4vL1xuLy8gICAgIHRyYW5zZm9ybVBocmFzZSgnSGVsbG8sICV7bmFtZX0hJywge25hbWU6ICdTcGlrZSd9KTtcbi8vICAgICAvLyBcIkhlbGxvLCBTcGlrZSFcIlxuLy9cbi8vIFRoZSBjb3JyZWN0IHBsdXJhbCBmb3JtIGlzIHNlbGVjdGVkIGlmIHN1YnN0aXR1dGlvbnMuc21hcnRfY291bnRcbi8vIGlzIHNldC4gWW91IGNhbiBwYXNzIGluIGEgbnVtYmVyIGluc3RlYWQgb2YgYW4gT2JqZWN0IGFzIGBzdWJzdGl0dXRpb25zYFxuLy8gYXMgYSBzaG9ydGN1dCBmb3IgYHNtYXJ0X2NvdW50YC5cbi8vXG4vLyAgICAgdHJhbnNmb3JtUGhyYXNlKCcle3NtYXJ0X2NvdW50fSBuZXcgbWVzc2FnZXMgfHx8fCAxIG5ldyBtZXNzYWdlJywge3NtYXJ0X2NvdW50OiAxfSwgJ2VuJyk7XG4vLyAgICAgLy8gXCIxIG5ldyBtZXNzYWdlXCJcbi8vXG4vLyAgICAgdHJhbnNmb3JtUGhyYXNlKCcle3NtYXJ0X2NvdW50fSBuZXcgbWVzc2FnZXMgfHx8fCAxIG5ldyBtZXNzYWdlJywge3NtYXJ0X2NvdW50OiAyfSwgJ2VuJyk7XG4vLyAgICAgLy8gXCIyIG5ldyBtZXNzYWdlc1wiXG4vL1xuLy8gICAgIHRyYW5zZm9ybVBocmFzZSgnJXtzbWFydF9jb3VudH0gbmV3IG1lc3NhZ2VzIHx8fHwgMSBuZXcgbWVzc2FnZScsIDUsICdlbicpO1xuLy8gICAgIC8vIFwiNSBuZXcgbWVzc2FnZXNcIlxuLy9cbi8vIFlvdSBzaG91bGQgcGFzcyBpbiBhIHRoaXJkIGFyZ3VtZW50LCB0aGUgbG9jYWxlLCB0byBzcGVjaWZ5IHRoZSBjb3JyZWN0IHBsdXJhbCB0eXBlLlxuLy8gSXQgZGVmYXVsdHMgdG8gYCdlbidgIHdpdGggMiBwbHVyYWwgZm9ybXMuXG5mdW5jdGlvbiB0cmFuc2Zvcm1QaHJhc2UocGhyYXNlLCBzdWJzdGl0dXRpb25zLCBsb2NhbGUsIHRva2VuUmVnZXgpIHtcbiAgaWYgKHR5cGVvZiBwaHJhc2UgIT09ICdzdHJpbmcnKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignUG9seWdsb3QudHJhbnNmb3JtUGhyYXNlIGV4cGVjdHMgYXJndW1lbnQgIzEgdG8gYmUgc3RyaW5nJyk7XG4gIH1cblxuICBpZiAoc3Vic3RpdHV0aW9ucyA9PSBudWxsKSB7XG4gICAgcmV0dXJuIHBocmFzZTtcbiAgfVxuXG4gIHZhciByZXN1bHQgPSBwaHJhc2U7XG4gIHZhciBpbnRlcnBvbGF0aW9uUmVnZXggPSB0b2tlblJlZ2V4IHx8IGRlZmF1bHRUb2tlblJlZ2V4O1xuXG4gIC8vIGFsbG93IG51bWJlciBhcyBhIHBsdXJhbGl6YXRpb24gc2hvcnRjdXRcbiAgdmFyIG9wdGlvbnMgPSB0eXBlb2Ygc3Vic3RpdHV0aW9ucyA9PT0gJ251bWJlcicgPyB7IHNtYXJ0X2NvdW50OiBzdWJzdGl0dXRpb25zIH0gOiBzdWJzdGl0dXRpb25zO1xuXG4gIC8vIFNlbGVjdCBwbHVyYWwgZm9ybTogYmFzZWQgb24gYSBwaHJhc2UgdGV4dCB0aGF0IGNvbnRhaW5zIGBuYFxuICAvLyBwbHVyYWwgZm9ybXMgc2VwYXJhdGVkIGJ5IGBkZWxpbWl0ZXJgLCBhIGBsb2NhbGVgLCBhbmQgYSBgc3Vic3RpdHV0aW9ucy5zbWFydF9jb3VudGAsXG4gIC8vIGNob29zZSB0aGUgY29ycmVjdCBwbHVyYWwgZm9ybS4gVGhpcyBpcyBvbmx5IGRvbmUgaWYgYGNvdW50YCBpcyBzZXQuXG4gIGlmIChvcHRpb25zLnNtYXJ0X2NvdW50ICE9IG51bGwgJiYgcmVzdWx0KSB7XG4gICAgdmFyIHRleHRzID0gc3BsaXQuY2FsbChyZXN1bHQsIGRlbGltaXRlcik7XG4gICAgcmVzdWx0ID0gdHJpbSh0ZXh0c1twbHVyYWxUeXBlSW5kZXgobG9jYWxlIHx8ICdlbicsIG9wdGlvbnMuc21hcnRfY291bnQpXSB8fCB0ZXh0c1swXSk7XG4gIH1cblxuICAvLyBJbnRlcnBvbGF0ZTogQ3JlYXRlcyBhIGBSZWdFeHBgIG9iamVjdCBmb3IgZWFjaCBpbnRlcnBvbGF0aW9uIHBsYWNlaG9sZGVyLlxuICByZXN1bHQgPSByZXBsYWNlLmNhbGwocmVzdWx0LCBpbnRlcnBvbGF0aW9uUmVnZXgsIGZ1bmN0aW9uIChleHByZXNzaW9uLCBhcmd1bWVudCkge1xuICAgIGlmICghaGFzKG9wdGlvbnMsIGFyZ3VtZW50KSB8fCBvcHRpb25zW2FyZ3VtZW50XSA9PSBudWxsKSB7IHJldHVybiBleHByZXNzaW9uOyB9XG4gICAgLy8gRW5zdXJlIHJlcGxhY2VtZW50IHZhbHVlIGlzIGVzY2FwZWQgdG8gcHJldmVudCBzcGVjaWFsICQtcHJlZml4ZWQgcmVnZXggcmVwbGFjZSB0b2tlbnMuXG4gICAgcmV0dXJuIHJlcGxhY2UuY2FsbChvcHRpb25zW2FyZ3VtZW50XSwgZG9sbGFyUmVnZXgsIGRvbGxhckJpbGxzWWFsbCk7XG4gIH0pO1xuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8vICMjIyBQb2x5Z2xvdCBjbGFzcyBjb25zdHJ1Y3RvclxuZnVuY3Rpb24gUG9seWdsb3Qob3B0aW9ucykge1xuICB2YXIgb3B0cyA9IG9wdGlvbnMgfHwge307XG4gIHRoaXMucGhyYXNlcyA9IHt9O1xuICB0aGlzLmV4dGVuZChvcHRzLnBocmFzZXMgfHwge30pO1xuICB0aGlzLmN1cnJlbnRMb2NhbGUgPSBvcHRzLmxvY2FsZSB8fCAnZW4nO1xuICB2YXIgYWxsb3dNaXNzaW5nID0gb3B0cy5hbGxvd01pc3NpbmcgPyB0cmFuc2Zvcm1QaHJhc2UgOiBudWxsO1xuICB0aGlzLm9uTWlzc2luZ0tleSA9IHR5cGVvZiBvcHRzLm9uTWlzc2luZ0tleSA9PT0gJ2Z1bmN0aW9uJyA/IG9wdHMub25NaXNzaW5nS2V5IDogYWxsb3dNaXNzaW5nO1xuICB0aGlzLndhcm4gPSBvcHRzLndhcm4gfHwgd2FybjtcbiAgdGhpcy50b2tlblJlZ2V4ID0gY29uc3RydWN0VG9rZW5SZWdleChvcHRzLmludGVycG9sYXRpb24pO1xufVxuXG4vLyAjIyMgcG9seWdsb3QubG9jYWxlKFtsb2NhbGVdKVxuLy9cbi8vIEdldCBvciBzZXQgbG9jYWxlLiBJbnRlcm5hbGx5LCBQb2x5Z2xvdCBvbmx5IHVzZXMgbG9jYWxlIGZvciBwbHVyYWxpemF0aW9uLlxuUG9seWdsb3QucHJvdG90eXBlLmxvY2FsZSA9IGZ1bmN0aW9uIChuZXdMb2NhbGUpIHtcbiAgaWYgKG5ld0xvY2FsZSkgdGhpcy5jdXJyZW50TG9jYWxlID0gbmV3TG9jYWxlO1xuICByZXR1cm4gdGhpcy5jdXJyZW50TG9jYWxlO1xufTtcblxuLy8gIyMjIHBvbHlnbG90LmV4dGVuZChwaHJhc2VzKVxuLy9cbi8vIFVzZSBgZXh0ZW5kYCB0byB0ZWxsIFBvbHlnbG90IGhvdyB0byB0cmFuc2xhdGUgYSBnaXZlbiBrZXkuXG4vL1xuLy8gICAgIHBvbHlnbG90LmV4dGVuZCh7XG4vLyAgICAgICBcImhlbGxvXCI6IFwiSGVsbG9cIixcbi8vICAgICAgIFwiaGVsbG9fbmFtZVwiOiBcIkhlbGxvLCAle25hbWV9XCJcbi8vICAgICB9KTtcbi8vXG4vLyBUaGUga2V5IGNhbiBiZSBhbnkgc3RyaW5nLiAgRmVlbCBmcmVlIHRvIGNhbGwgYGV4dGVuZGAgbXVsdGlwbGUgdGltZXM7XG4vLyBpdCB3aWxsIG92ZXJyaWRlIGFueSBwaHJhc2VzIHdpdGggdGhlIHNhbWUga2V5LCBidXQgbGVhdmUgZXhpc3RpbmcgcGhyYXNlc1xuLy8gdW50b3VjaGVkLlxuLy9cbi8vIEl0IGlzIGFsc28gcG9zc2libGUgdG8gcGFzcyBuZXN0ZWQgcGhyYXNlIG9iamVjdHMsIHdoaWNoIGdldCBmbGF0dGVuZWRcbi8vIGludG8gYW4gb2JqZWN0IHdpdGggdGhlIG5lc3RlZCBrZXlzIGNvbmNhdGVuYXRlZCB1c2luZyBkb3Qgbm90YXRpb24uXG4vL1xuLy8gICAgIHBvbHlnbG90LmV4dGVuZCh7XG4vLyAgICAgICBcIm5hdlwiOiB7XG4vLyAgICAgICAgIFwiaGVsbG9cIjogXCJIZWxsb1wiLFxuLy8gICAgICAgICBcImhlbGxvX25hbWVcIjogXCJIZWxsbywgJXtuYW1lfVwiLFxuLy8gICAgICAgICBcInNpZGViYXJcIjoge1xuLy8gICAgICAgICAgIFwid2VsY29tZVwiOiBcIldlbGNvbWVcIlxuLy8gICAgICAgICB9XG4vLyAgICAgICB9XG4vLyAgICAgfSk7XG4vL1xuLy8gICAgIGNvbnNvbGUubG9nKHBvbHlnbG90LnBocmFzZXMpO1xuLy8gICAgIC8vIHtcbi8vICAgICAvLyAgICduYXYuaGVsbG8nOiAnSGVsbG8nLFxuLy8gICAgIC8vICAgJ25hdi5oZWxsb19uYW1lJzogJ0hlbGxvLCAle25hbWV9Jyxcbi8vICAgICAvLyAgICduYXYuc2lkZWJhci53ZWxjb21lJzogJ1dlbGNvbWUnXG4vLyAgICAgLy8gfVxuLy9cbi8vIGBleHRlbmRgIGFjY2VwdHMgYW4gb3B0aW9uYWwgc2Vjb25kIGFyZ3VtZW50LCBgcHJlZml4YCwgd2hpY2ggY2FuIGJlIHVzZWRcbi8vIHRvIHByZWZpeCBldmVyeSBrZXkgaW4gdGhlIHBocmFzZXMgb2JqZWN0IHdpdGggc29tZSBzdHJpbmcsIHVzaW5nIGRvdFxuLy8gbm90YXRpb24uXG4vL1xuLy8gICAgIHBvbHlnbG90LmV4dGVuZCh7XG4vLyAgICAgICBcImhlbGxvXCI6IFwiSGVsbG9cIixcbi8vICAgICAgIFwiaGVsbG9fbmFtZVwiOiBcIkhlbGxvLCAle25hbWV9XCJcbi8vICAgICB9LCBcIm5hdlwiKTtcbi8vXG4vLyAgICAgY29uc29sZS5sb2cocG9seWdsb3QucGhyYXNlcyk7XG4vLyAgICAgLy8ge1xuLy8gICAgIC8vICAgJ25hdi5oZWxsbyc6ICdIZWxsbycsXG4vLyAgICAgLy8gICAnbmF2LmhlbGxvX25hbWUnOiAnSGVsbG8sICV7bmFtZX0nXG4vLyAgICAgLy8gfVxuLy9cbi8vIFRoaXMgZmVhdHVyZSBpcyB1c2VkIGludGVybmFsbHkgdG8gc3VwcG9ydCBuZXN0ZWQgcGhyYXNlIG9iamVjdHMuXG5Qb2x5Z2xvdC5wcm90b3R5cGUuZXh0ZW5kID0gZnVuY3Rpb24gKG1vcmVQaHJhc2VzLCBwcmVmaXgpIHtcbiAgZm9yRWFjaChtb3JlUGhyYXNlcywgZnVuY3Rpb24gKHBocmFzZSwga2V5KSB7XG4gICAgdmFyIHByZWZpeGVkS2V5ID0gcHJlZml4ID8gcHJlZml4ICsgJy4nICsga2V5IDoga2V5O1xuICAgIGlmICh0eXBlb2YgcGhyYXNlID09PSAnb2JqZWN0Jykge1xuICAgICAgdGhpcy5leHRlbmQocGhyYXNlLCBwcmVmaXhlZEtleSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucGhyYXNlc1twcmVmaXhlZEtleV0gPSBwaHJhc2U7XG4gICAgfVxuICB9LCB0aGlzKTtcbn07XG5cbi8vICMjIyBwb2x5Z2xvdC51bnNldChwaHJhc2VzKVxuLy8gVXNlIGB1bnNldGAgdG8gc2VsZWN0aXZlbHkgcmVtb3ZlIGtleXMgZnJvbSBhIHBvbHlnbG90IGluc3RhbmNlLlxuLy9cbi8vICAgICBwb2x5Z2xvdC51bnNldChcInNvbWVfa2V5XCIpO1xuLy8gICAgIHBvbHlnbG90LnVuc2V0KHtcbi8vICAgICAgIFwiaGVsbG9cIjogXCJIZWxsb1wiLFxuLy8gICAgICAgXCJoZWxsb19uYW1lXCI6IFwiSGVsbG8sICV7bmFtZX1cIlxuLy8gICAgIH0pO1xuLy9cbi8vIFRoZSB1bnNldCBtZXRob2QgY2FuIHRha2UgZWl0aGVyIGEgc3RyaW5nIChmb3IgdGhlIGtleSksIG9yIGFuIG9iamVjdCBoYXNoIHdpdGhcbi8vIHRoZSBrZXlzIHRoYXQgeW91IHdvdWxkIGxpa2UgdG8gdW5zZXQuXG5Qb2x5Z2xvdC5wcm90b3R5cGUudW5zZXQgPSBmdW5jdGlvbiAobW9yZVBocmFzZXMsIHByZWZpeCkge1xuICBpZiAodHlwZW9mIG1vcmVQaHJhc2VzID09PSAnc3RyaW5nJykge1xuICAgIGRlbGV0ZSB0aGlzLnBocmFzZXNbbW9yZVBocmFzZXNdO1xuICB9IGVsc2Uge1xuICAgIGZvckVhY2gobW9yZVBocmFzZXMsIGZ1bmN0aW9uIChwaHJhc2UsIGtleSkge1xuICAgICAgdmFyIHByZWZpeGVkS2V5ID0gcHJlZml4ID8gcHJlZml4ICsgJy4nICsga2V5IDoga2V5O1xuICAgICAgaWYgKHR5cGVvZiBwaHJhc2UgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHRoaXMudW5zZXQocGhyYXNlLCBwcmVmaXhlZEtleSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkZWxldGUgdGhpcy5waHJhc2VzW3ByZWZpeGVkS2V5XTtcbiAgICAgIH1cbiAgICB9LCB0aGlzKTtcbiAgfVxufTtcblxuLy8gIyMjIHBvbHlnbG90LmNsZWFyKClcbi8vXG4vLyBDbGVhcnMgYWxsIHBocmFzZXMuIFVzZWZ1bCBmb3Igc3BlY2lhbCBjYXNlcywgc3VjaCBhcyBmcmVlaW5nXG4vLyB1cCBtZW1vcnkgaWYgeW91IGhhdmUgbG90cyBvZiBwaHJhc2VzIGJ1dCBubyBsb25nZXIgbmVlZCB0b1xuLy8gcGVyZm9ybSBhbnkgdHJhbnNsYXRpb24uIEFsc28gdXNlZCBpbnRlcm5hbGx5IGJ5IGByZXBsYWNlYC5cblBvbHlnbG90LnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5waHJhc2VzID0ge307XG59O1xuXG4vLyAjIyMgcG9seWdsb3QucmVwbGFjZShwaHJhc2VzKVxuLy9cbi8vIENvbXBsZXRlbHkgcmVwbGFjZSB0aGUgZXhpc3RpbmcgcGhyYXNlcyB3aXRoIGEgbmV3IHNldCBvZiBwaHJhc2VzLlxuLy8gTm9ybWFsbHksIGp1c3QgdXNlIGBleHRlbmRgIHRvIGFkZCBtb3JlIHBocmFzZXMsIGJ1dCB1bmRlciBjZXJ0YWluXG4vLyBjaXJjdW1zdGFuY2VzLCB5b3UgbWF5IHdhbnQgdG8gbWFrZSBzdXJlIG5vIG9sZCBwaHJhc2VzIGFyZSBseWluZyBhcm91bmQuXG5Qb2x5Z2xvdC5wcm90b3R5cGUucmVwbGFjZSA9IGZ1bmN0aW9uIChuZXdQaHJhc2VzKSB7XG4gIHRoaXMuY2xlYXIoKTtcbiAgdGhpcy5leHRlbmQobmV3UGhyYXNlcyk7XG59O1xuXG5cbi8vICMjIyBwb2x5Z2xvdC50KGtleSwgb3B0aW9ucylcbi8vXG4vLyBUaGUgbW9zdC11c2VkIG1ldGhvZC4gUHJvdmlkZSBhIGtleSwgYW5kIGB0YCB3aWxsIHJldHVybiB0aGVcbi8vIHBocmFzZS5cbi8vXG4vLyAgICAgcG9seWdsb3QudChcImhlbGxvXCIpO1xuLy8gICAgID0+IFwiSGVsbG9cIlxuLy9cbi8vIFRoZSBwaHJhc2UgdmFsdWUgaXMgcHJvdmlkZWQgZmlyc3QgYnkgYSBjYWxsIHRvIGBwb2x5Z2xvdC5leHRlbmQoKWAgb3Jcbi8vIGBwb2x5Z2xvdC5yZXBsYWNlKClgLlxuLy9cbi8vIFBhc3MgaW4gYW4gb2JqZWN0IGFzIHRoZSBzZWNvbmQgYXJndW1lbnQgdG8gcGVyZm9ybSBpbnRlcnBvbGF0aW9uLlxuLy9cbi8vICAgICBwb2x5Z2xvdC50KFwiaGVsbG9fbmFtZVwiLCB7bmFtZTogXCJTcGlrZVwifSk7XG4vLyAgICAgPT4gXCJIZWxsbywgU3Bpa2VcIlxuLy9cbi8vIElmIHlvdSBsaWtlLCB5b3UgY2FuIHByb3ZpZGUgYSBkZWZhdWx0IHZhbHVlIGluIGNhc2UgdGhlIHBocmFzZSBpcyBtaXNzaW5nLlxuLy8gVXNlIHRoZSBzcGVjaWFsIG9wdGlvbiBrZXkgXCJfXCIgdG8gc3BlY2lmeSBhIGRlZmF1bHQuXG4vL1xuLy8gICAgIHBvbHlnbG90LnQoXCJpX2xpa2VfdG9fd3JpdGVfaW5fbGFuZ3VhZ2VcIiwge1xuLy8gICAgICAgXzogXCJJIGxpa2UgdG8gd3JpdGUgaW4gJXtsYW5ndWFnZX0uXCIsXG4vLyAgICAgICBsYW5ndWFnZTogXCJKYXZhU2NyaXB0XCJcbi8vICAgICB9KTtcbi8vICAgICA9PiBcIkkgbGlrZSB0byB3cml0ZSBpbiBKYXZhU2NyaXB0LlwiXG4vL1xuUG9seWdsb3QucHJvdG90eXBlLnQgPSBmdW5jdGlvbiAoa2V5LCBvcHRpb25zKSB7XG4gIHZhciBwaHJhc2UsIHJlc3VsdDtcbiAgdmFyIG9wdHMgPSBvcHRpb25zID09IG51bGwgPyB7fSA6IG9wdGlvbnM7XG4gIGlmICh0eXBlb2YgdGhpcy5waHJhc2VzW2tleV0gPT09ICdzdHJpbmcnKSB7XG4gICAgcGhyYXNlID0gdGhpcy5waHJhc2VzW2tleV07XG4gIH0gZWxzZSBpZiAodHlwZW9mIG9wdHMuXyA9PT0gJ3N0cmluZycpIHtcbiAgICBwaHJhc2UgPSBvcHRzLl87XG4gIH0gZWxzZSBpZiAodGhpcy5vbk1pc3NpbmdLZXkpIHtcbiAgICB2YXIgb25NaXNzaW5nS2V5ID0gdGhpcy5vbk1pc3NpbmdLZXk7XG4gICAgcmVzdWx0ID0gb25NaXNzaW5nS2V5KGtleSwgb3B0cywgdGhpcy5jdXJyZW50TG9jYWxlLCB0aGlzLnRva2VuUmVnZXgpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMud2FybignTWlzc2luZyB0cmFuc2xhdGlvbiBmb3Iga2V5OiBcIicgKyBrZXkgKyAnXCInKTtcbiAgICByZXN1bHQgPSBrZXk7XG4gIH1cbiAgaWYgKHR5cGVvZiBwaHJhc2UgPT09ICdzdHJpbmcnKSB7XG4gICAgcmVzdWx0ID0gdHJhbnNmb3JtUGhyYXNlKHBocmFzZSwgb3B0cywgdGhpcy5jdXJyZW50TG9jYWxlLCB0aGlzLnRva2VuUmVnZXgpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG5cbi8vICMjIyBwb2x5Z2xvdC5oYXMoa2V5KVxuLy9cbi8vIENoZWNrIGlmIHBvbHlnbG90IGhhcyBhIHRyYW5zbGF0aW9uIGZvciBnaXZlbiBrZXlcblBvbHlnbG90LnByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiBoYXModGhpcy5waHJhc2VzLCBrZXkpO1xufTtcblxuLy8gZXhwb3J0IHRyYW5zZm9ybVBocmFzZVxuUG9seWdsb3QudHJhbnNmb3JtUGhyYXNlID0gZnVuY3Rpb24gdHJhbnNmb3JtKHBocmFzZSwgc3Vic3RpdHV0aW9ucywgbG9jYWxlKSB7XG4gIHJldHVybiB0cmFuc2Zvcm1QaHJhc2UocGhyYXNlLCBzdWJzdGl0dXRpb25zLCBsb2NhbGUpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBQb2x5Z2xvdDtcbiIsImltcG9ydCBQb2x5Z2xvdCBmcm9tIFwid2ViaXgtcG9seWdsb3RcIjtcbmltcG9ydCB7SUpldEFwcCwgSUpldFZpZXd9IGZyb20gXCIuLi9pbnRlcmZhY2VzXCI7XG5cbmRlY2xhcmUgZnVuY3Rpb24gcmVxdWlyZShuYW1lOnN0cmluZyk6YW55O1xuXG5leHBvcnQgZnVuY3Rpb24gTG9jYWxlKGFwcDogSUpldEFwcCwgX3ZpZXc6IElKZXRWaWV3LCBjb25maWc6IGFueSl7XG5cdGNvbmZpZyA9IGNvbmZpZyB8fCB7fTtcblx0Y29uc3Qgc3RvcmFnZSA9IGNvbmZpZy5zdG9yYWdlO1xuXHRsZXQgbGFuZyA9IHN0b3JhZ2UgPyAoc3RvcmFnZS5nZXQoXCJsYW5nXCIpIHx8IFwiZW5cIikgOiAoY29uZmlnLmxhbmcgfHwgXCJlblwiKTtcblxuXHRmdW5jdGlvbiBzZXRMYW5nRGF0YShuYW1lLCBkYXRhOiBhbnksIHNpbGVudD86IGJvb2xlYW4pIDogUHJvbWlzZTxhbnk+e1xuXHRcdGlmIChkYXRhLl9fZXNNb2R1bGUpIHtcblx0XHRcdGRhdGEgPSBkYXRhLmRlZmF1bHQ7XG5cdFx0fVxuXG5cdFx0Y29uc3QgcGNvbmZpZyA9IHsgcGhyYXNlczpkYXRhIH07XG5cdFx0aWYgKGNvbmZpZy5wb2x5Z2xvdCl7XG5cdFx0XHRhcHAud2ViaXguZXh0ZW5kKHBjb25maWcsIGNvbmZpZy5wb2x5Z2xvdCk7XG5cdFx0fVxuXG5cdFx0Y29uc3QgcG9seSA9IHNlcnZpY2UucG9seWdsb3QgPSBuZXcgUG9seWdsb3QocGNvbmZpZyk7XG5cdFx0cG9seS5sb2NhbGUobmFtZSk7XG5cblx0XHRzZXJ2aWNlLl8gPSBhcHAud2ViaXguYmluZChwb2x5LnQsIHBvbHkpO1xuXHRcdGxhbmcgPSBuYW1lO1xuXG5cdFx0aWYgKHN0b3JhZ2Upe1xuXHRcdFx0c3RvcmFnZS5wdXQoXCJsYW5nXCIsIGxhbmcpO1xuXHRcdH1cblxuXHRcdGlmIChjb25maWcud2ViaXgpe1xuXHRcdFx0Y29uc3QgbG9jTmFtZSA9IGNvbmZpZy53ZWJpeFtuYW1lXTtcblx0XHRcdGlmIChsb2NOYW1lKXtcblx0XHRcdFx0YXBwLndlYml4LmkxOG4uc2V0TG9jYWxlKGxvY05hbWUpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmICghc2lsZW50KXtcblx0XHRcdHJldHVybiBhcHAucmVmcmVzaCgpO1xuXHRcdH1cblxuXHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcblx0fVxuXHRmdW5jdGlvbiBnZXRMYW5nKCl7IHJldHVybiBsYW5nOyB9XG5cdGZ1bmN0aW9uIHNldExhbmcobmFtZTpzdHJpbmcsIHNpbGVudD8gOiBib29sZWFuKXtcblx0XHQvLyBpZ25vcmUgc2V0TGFuZyBpZiBsb2FkaW5nIGJ5IHBhdGggaXMgZGlzYWJsZWRcblx0XHRpZiAoY29uZmlnLnBhdGggPT09IGZhbHNlKXtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRjb25zdCBwYXRoID0gKGNvbmZpZy5wYXRoID8gY29uZmlnLnBhdGggKyBcIi9cIiA6IFwiXCIpICsgbmFtZTtcblx0XHRjb25zdCBkYXRhID0gcmVxdWlyZShcImpldC1sb2NhbGVzL1wiK3BhdGgpO1xuXG5cdFx0c2V0TGFuZ0RhdGEobmFtZSwgZGF0YSwgc2lsZW50KTtcblx0fVxuXG5cdGNvbnN0IHNlcnZpY2UgPSB7XG5cdFx0Z2V0TGFuZywgc2V0TGFuZywgc2V0TGFuZ0RhdGEsIF86bnVsbCwgcG9seWdsb3Q6bnVsbFxuXHR9O1xuXG5cdGFwcC5zZXRTZXJ2aWNlKFwibG9jYWxlXCIsIHNlcnZpY2UpO1xuXHRzZXRMYW5nKGxhbmcsIHRydWUpO1xufSIsImltcG9ydCB7SUpldEFwcCwgSUpldFZpZXd9IGZyb20gXCIuLi9pbnRlcmZhY2VzXCI7XG5cbmZ1bmN0aW9uIHNob3codmlldywgY29uZmlnLCB2YWx1ZSl7XG5cdGlmIChjb25maWcudXJscyl7XG5cdFx0dmFsdWUgPSBjb25maWcudXJsc1t2YWx1ZV0gfHwgdmFsdWU7XG5cdH0gZWxzZSBpZiAoY29uZmlnLnBhcmFtKXtcblx0XHR2YWx1ZSA9IHsgW2NvbmZpZy5wYXJhbV06dmFsdWUgfTtcblx0fVxuXG5cdHZpZXcuc2hvdyh2YWx1ZSk7XG59XG5leHBvcnQgZnVuY3Rpb24gTWVudShhcHA6IElKZXRBcHAsIHZpZXc6IElKZXRWaWV3LCBjb25maWc6IGFueSl7XG5cdGNvbnN0IGZyYW1lID0gdmlldy5nZXRTdWJWaWV3SW5mbygpLnBhcmVudDtcblx0Y29uc3QgdWkgPSB2aWV3LiQkKGNvbmZpZy5pZCB8fCBjb25maWcpIGFzIGFueTtcblx0bGV0IHNpbGVudCA9IGZhbHNlO1xuXG5cdHVpLmF0dGFjaEV2ZW50KFwib25jaGFuZ2VcIiwgZnVuY3Rpb24oKXtcblx0XHRpZiAoIXNpbGVudCl7XG5cdFx0XHRzaG93KGZyYW1lLCBjb25maWcsIHRoaXMuZ2V0VmFsdWUoKSk7XG5cdFx0fVxuXHR9KTtcblx0dWkuYXR0YWNoRXZlbnQoXCJvbmFmdGVyc2VsZWN0XCIsIGZ1bmN0aW9uKCl7XG5cdFx0aWYgKCFzaWxlbnQpe1xuXHRcdFx0bGV0IGlkID0gbnVsbDtcblx0XHRcdGlmICh1aS5zZXRWYWx1ZSl7XG5cdFx0XHRcdGlkID0gdGhpcy5nZXRWYWx1ZSgpO1xuXHRcdFx0fSBlbHNlIGlmICh1aS5nZXRTZWxlY3RlZElkKXtcblx0XHRcdFx0aWQgPSB1aS5nZXRTZWxlY3RlZElkKCk7XG5cdFx0XHR9XG5cdFx0XHRzaG93KGZyYW1lLCBjb25maWcsIGlkKTtcblx0XHR9XG5cdH0pO1xuXG5cdHZpZXcub24oYXBwLCBgYXBwOnJvdXRlYCwgZnVuY3Rpb24oKXtcblx0XHRsZXQgbmFtZSA9IFwiXCI7XG5cdFx0aWYgKGNvbmZpZy5wYXJhbSl7XG5cdFx0XHRuYW1lID0gdmlldy5nZXRQYXJhbShjb25maWcucGFyYW0sIHRydWUpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zdCBzZWdtZW50ID0gZnJhbWUuZ2V0VXJsKClbMV07XG5cdFx0XHRpZiAoc2VnbWVudCl7XG5cdFx0XHRcdG5hbWUgPSBzZWdtZW50LnBhZ2U7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKG5hbWUpe1xuXHRcdFx0c2lsZW50ID0gdHJ1ZTtcblx0XHRcdGlmICh1aS5zZXRWYWx1ZSAmJiB1aS5nZXRWYWx1ZSgpICE9PSBuYW1lKXtcblx0XHRcdFx0dWkuc2V0VmFsdWUobmFtZSk7XG5cdFx0XHR9IGVsc2UgaWYgKHVpLnNlbGVjdCAmJiB1aS5leGlzdHMobmFtZSkgJiYgdWkuZ2V0U2VsZWN0ZWRJZCgpICE9PSBuYW1lKXtcblx0XHRcdFx0dWkuc2VsZWN0KG5hbWUpO1xuXHRcdFx0fVxuXHRcdFx0c2lsZW50ID0gZmFsc2U7XG5cdFx0fVxuXHR9KTtcbn0iLCJpbXBvcnQge0lKZXRBcHAsIElKZXRWaWV3LCBJV2ViaXhGYWNhZGV9IGZyb20gXCIuLi9pbnRlcmZhY2VzXCI7XG5cbmNvbnN0IGJhc2VpY29ucyA9IHtcblx0Z29vZDpcdFwiY2hlY2tcIixcblx0ZXJyb3I6IFwid2FybmluZ1wiLFxuXHRzYXZpbmc6IFwicmVmcmVzaCBmYS1zcGluXCJcbn07XG5cbmNvbnN0IGJhc2V0ZXh0ID0ge1xuXHRnb29kOlx0XCJPa1wiLFxuXHRlcnJvcjogXCJFcnJvclwiLFxuXHRzYXZpbmc6IFwiQ29ubmVjdGluZy4uLlwiXG59O1xuXG5leHBvcnQgZnVuY3Rpb24gU3RhdHVzKGFwcDogSUpldEFwcCwgdmlldzogSUpldFZpZXcsIGNvbmZpZzogYW55KXtcblxuXHRsZXQgc3RhdHVzID0gXCJnb29kXCI7XG5cdGxldCBjb3VudCA9IDA7XG5cdGxldCBpc2Vycm9yID0gZmFsc2U7XG5cdGxldCBleHBpcmVEZWxheSA9IGNvbmZpZy5leHBpcmU7XG5cdGlmICghZXhwaXJlRGVsYXkgJiYgZXhwaXJlRGVsYXkgIT09IGZhbHNlKXtcblx0XHRleHBpcmVEZWxheSA9IDIwMDA7XG5cdH1cblx0Y29uc3QgdGV4dHMgPSBjb25maWcudGV4dHMgfHwgYmFzZXRleHQ7XG5cdGNvbnN0IGljb25zID0gY29uZmlnLmljb25zIHx8IGJhc2VpY29ucztcblxuXHRpZiAodHlwZW9mIGNvbmZpZyA9PT0gXCJzdHJpbmdcIil7XG5cdFx0Y29uZmlnID0geyB0YXJnZXQ6Y29uZmlnIH07XG5cdH1cblxuXHRmdW5jdGlvbiByZWZyZXNoKGNvbnRlbnQ/IDogc3RyaW5nKSB7XG5cdFx0Y29uc3QgYXJlYSA9IHZpZXcuJCQoY29uZmlnLnRhcmdldCk7XG5cdFx0aWYgKGFyZWEpIHtcblx0XHRcdGlmICghY29udGVudCl7XG5cdFx0XHRcdGNvbnRlbnQgPSBcIjxkaXYgY2xhc3M9J3N0YXR1c19cIiArXG5cdFx0XHRcdFx0c3RhdHVzICtcblx0XHRcdFx0XHRcIic+PHNwYW4gY2xhc3M9J3dlYml4X2ljb24gZmEtXCIgK1xuXHRcdFx0XHRcdGljb25zW3N0YXR1c10gKyBcIic+PC9zcGFuPiBcIiArIHRleHRzW3N0YXR1c10gKyBcIjwvZGl2PlwiO1xuXHRcdFx0fVxuXHRcdFx0KGFyZWEgYXMgYW55KS5zZXRIVE1MKGNvbnRlbnQpO1xuXHRcdH1cblx0fVxuXHRmdW5jdGlvbiBzdWNjZXNzKCl7XG5cdFx0Y291bnQtLTtcblx0XHRzZXRTdGF0dXMoXCJnb29kXCIpO1xuXHR9XG5cdGZ1bmN0aW9uIGZhaWwoZXJyKXtcblx0XHRjb3VudC0tO1xuXHRcdHNldFN0YXR1cyhcImVycm9yXCIsIGVycik7XG5cdH1cblx0ZnVuY3Rpb24gc3RhcnQocHJvbWlzZSl7XG5cdFx0Y291bnQrKztcblx0XHRzZXRTdGF0dXMoXCJzYXZpbmdcIik7XG5cdFx0aWYgKHByb21pc2UgJiYgcHJvbWlzZS50aGVuKXtcblx0XHRcdHByb21pc2UudGhlbihzdWNjZXNzLCBmYWlsKTtcblx0XHR9XG5cdH1cblx0ZnVuY3Rpb24gZ2V0U3RhdHVzKCl7XG5cdFx0cmV0dXJuIHN0YXR1cztcblx0fVxuXHRmdW5jdGlvbiBoaWRlU3RhdHVzKCl7XG5cdFx0aWYgKGNvdW50ID09PSAwKXtcblx0XHRcdHJlZnJlc2goXCIgXCIpO1xuXHRcdH1cblx0fVxuXHRmdW5jdGlvbiBzZXRTdGF0dXMobW9kZSwgZXJyPyl7XG5cdFx0aWYgKGNvdW50IDwgMCl7XG5cdFx0XHRjb3VudCA9IDA7XG5cdFx0fVxuXG5cdFx0aWYgKG1vZGUgPT09IFwic2F2aW5nXCIpe1xuXHRcdFx0c3RhdHVzID0gXCJzYXZpbmdcIjtcblx0XHRcdHJlZnJlc2goKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0aXNlcnJvciA9IChtb2RlID09PSBcImVycm9yXCIpO1xuXHRcdFx0aWYgKGNvdW50ID09PSAwKXtcblx0XHRcdFx0c3RhdHVzID0gaXNlcnJvciA/IFwiZXJyb3JcIiA6IFwiZ29vZFwiO1xuXHRcdFx0XHRpZiAoaXNlcnJvcil7XG5cdFx0XHRcdFx0YXBwLmVycm9yKFwiYXBwOmVycm9yOnNlcnZlclwiLCBbZXJyLnJlc3BvbnNlVGV4dCB8fCBlcnJdKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRpZiAoZXhwaXJlRGVsYXkpe1xuXHRcdFx0XHRcdFx0c2V0VGltZW91dChoaWRlU3RhdHVzLCBleHBpcmVEZWxheSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmVmcmVzaCgpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRmdW5jdGlvbiB0cmFjayhkYXRhKXtcblx0XHRjb25zdCBkcCA9IGFwcC53ZWJpeC5kcChkYXRhKTtcblx0XHRpZiAoZHApe1xuXHRcdFx0dmlldy5vbihkcCwgXCJvbkFmdGVyRGF0YVNlbmRcIiwgc3RhcnQpO1xuXHRcdFx0dmlldy5vbihkcCwgXCJvbkFmdGVyU2F2ZUVycm9yXCIsIChfaWQsIF9vYmosIHJlc3BvbnNlKSA9PiBmYWlsKHJlc3BvbnNlKSk7XG5cdFx0XHR2aWV3Lm9uKGRwLCBcIm9uQWZ0ZXJTYXZlXCIsIHN1Y2Nlc3MpO1xuXHRcdH1cblx0fVxuXG5cdGFwcC5zZXRTZXJ2aWNlKFwic3RhdHVzXCIsIHtcblx0XHRnZXRTdGF0dXMsXG5cdFx0c2V0U3RhdHVzLFxuXHRcdHRyYWNrXG5cdH0pO1xuXG5cdGlmIChjb25maWcucmVtb3RlKXtcblx0XHR2aWV3Lm9uKGFwcC53ZWJpeCwgXCJvblJlbW90ZUNhbGxcIiwgc3RhcnQpO1xuXHR9XG5cblx0aWYgKGNvbmZpZy5hamF4KXtcblx0XHR2aWV3Lm9uKGFwcC53ZWJpeCwgXCJvbkJlZm9yZUFqYXhcIixcblx0XHRcdChfbW9kZSwgX3VybCwgX2RhdGEsIF9yZXF1ZXN0LCBfaGVhZGVycywgX2ZpbGVzLCBwcm9taXNlKSA9PiB7XG5cdFx0XHRcdHN0YXJ0KHByb21pc2UpO1xuXHRcdH0pO1xuXHR9XG5cblx0aWYgKGNvbmZpZy5kYXRhKXtcblx0XHR0cmFjayhjb25maWcuZGF0YSk7XG5cdH1cbn0iLCJpbXBvcnQge0lKZXRBcHAsIElKZXRWaWV3LCBJV2ViaXhGYWNhZGV9IGZyb20gXCIuLi9pbnRlcmZhY2VzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBUaGVtZShhcHA6IElKZXRBcHAsIF92aWV3OiBJSmV0VmlldywgY29uZmlnOiBhbnkpe1xuXHRjb25maWcgPSBjb25maWcgfHwge307XG5cdGNvbnN0IHN0b3JhZ2UgPSBjb25maWcuc3RvcmFnZTtcblx0bGV0IHRoZW1lID0gc3RvcmFnZSA/XG5cdFx0KHN0b3JhZ2UuZ2V0KFwidGhlbWVcIil8fFwiZmxhdC1kZWZhdWx0XCIpXG5cdFx0OlxuXHRcdChjb25maWcudGhlbWUgfHwgXCJmbGF0LWRlZmF1bHRcIik7XG5cblx0Y29uc3Qgc2VydmljZSA9IHtcblx0XHRnZXRUaGVtZSgpeyByZXR1cm4gdGhlbWU7IH0sXG5cdFx0c2V0VGhlbWUobmFtZTpzdHJpbmcsIHNpbGVudD86Ym9vbGVhbil7XG5cdFx0XHRjb25zdCBwYXJ0cyA9IG5hbWUuc3BsaXQoXCItXCIpO1xuXHRcdFx0Y29uc3QgbGlua3MgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImxpbmtcIik7XG5cblx0XHRcdGZvciAobGV0IGk9MDsgaTxsaW5rcy5sZW5ndGg7IGkrKyl7XG5cdFx0XHRcdGNvbnN0IGxuYW1lID0gbGlua3NbaV0uZ2V0QXR0cmlidXRlKFwidGl0bGVcIik7XG5cdFx0XHRcdGlmIChsbmFtZSl7XG5cdFx0XHRcdFx0aWYgKGxuYW1lID09PSBuYW1lIHx8IGxuYW1lID09PSBwYXJ0c1swXSl7XG5cdFx0XHRcdFx0XHRsaW5rc1tpXS5kaXNhYmxlZCA9IGZhbHNlO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRsaW5rc1tpXS5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdChhcHAud2ViaXggYXMgYW55KS5za2luLnNldChwYXJ0c1swXSk7XG5cdFx0XHQvLyByZW1vdmUgb2xkIGNzc1xuXHRcdFx0YXBwLndlYml4Lmh0bWwucmVtb3ZlQ3NzKGRvY3VtZW50LmJvZHksIFwidGhlbWUtXCIrdGhlbWUpO1xuXHRcdFx0Ly8gYWRkIG5ldyBjc3Ncblx0XHRcdGFwcC53ZWJpeC5odG1sLmFkZENzcyhkb2N1bWVudC5ib2R5LCBcInRoZW1lLVwiK25hbWUpO1xuXG5cdFx0XHR0aGVtZSA9IG5hbWU7XG5cdFx0XHRpZiAoc3RvcmFnZSl7XG5cdFx0XHRcdHN0b3JhZ2UucHV0KFwidGhlbWVcIiwgbmFtZSk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoIXNpbGVudCl7XG5cdFx0XHRcdGFwcC5yZWZyZXNoKCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xuXG5cdGFwcC5zZXRTZXJ2aWNlKFwidGhlbWVcIiwgc2VydmljZSk7XG5cdHNlcnZpY2Uuc2V0VGhlbWUodGhlbWUsIHRydWUpO1xufSIsImltcG9ydCB7SUpldEFwcCwgSUpldFVSTCwgSUpldFZpZXcsIElSb3V0ZSwgSVdlYml4RmFjYWRlfSBmcm9tIFwiLi4vaW50ZXJmYWNlc1wiO1xuXG5mdW5jdGlvbiBjb3B5UGFyYW1zKGRhdGE6IGFueSwgdXJsOklKZXRVUkwsIHJvdXRlOnN0cmluZ1tdKXtcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCByb3V0ZS5sZW5ndGg7IGkrKyl7XG5cdFx0ZGF0YVtyb3V0ZVtpXV0gPSB1cmxbaSsxXSA/IHVybFtpKzFdLnBhZ2UgOiBcIlwiO1xuXHR9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBVcmxQYXJhbShhcHA6IElKZXRBcHAsIHZpZXc6IElKZXRWaWV3LCBjb25maWc6IGFueSl7XG5cdGNvbnN0IHJvdXRlID0gY29uZmlnLnJvdXRlIHx8IGNvbmZpZztcblx0Y29uc3QgZGF0YSA9IHt9O1xuXHRjb25zdCBzZWcgPSBudWxsO1xuXG5cdHZpZXcub24oYXBwLCBcImFwcDp1cmxjaGFuZ2VcIiwgZnVuY3Rpb24oc3Vidmlldywgc2VnbWVudDpJUm91dGUpe1xuXHRcdGlmICh2aWV3ID09PSBzdWJ2aWV3KXtcblx0XHRcdGNvcHlQYXJhbXMoZGF0YSwgc2VnbWVudC5zdWJ1cmwoKSwgcm91dGUpO1xuXHRcdFx0c2VnbWVudC5zaXplKHJvdXRlLmxlbmd0aCsxKTtcblx0XHR9XG5cdH0pO1xuXG5cdGNvbnN0IG9zID0gdmlldy5zZXRQYXJhbTtcblx0Y29uc3Qgb2cgPSB2aWV3LmdldFBhcmFtO1xuXG5cdHZpZXcuc2V0UGFyYW0gPSBmdW5jdGlvbihuYW1lLCB2YWx1ZSwgc2hvdyl7XG5cdFx0Y29uc3QgaW5kZXggPSByb3V0ZS5pbmRleE9mKG5hbWUpO1xuXHRcdGlmIChpbmRleCA+PSAwKXtcblx0XHRcdGRhdGFbbmFtZV0gPSB2YWx1ZTtcblx0XHRcdHRoaXMuX3NlZ21lbnQudXBkYXRlKFwiXCIsIHZhbHVlLCBpbmRleCsxKTtcblx0XHRcdGlmIChzaG93KXtcblx0XHRcdFx0cmV0dXJuIHZpZXcuc2hvdyhudWxsKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIG9zLmNhbGwodGhpcywgbmFtZSwgdmFsdWUsIHNob3cpO1xuXHRcdH1cblx0fTtcblxuXHR2aWV3LmdldFBhcmFtID0gZnVuY3Rpb24oa2V5LCBtb2RlKXtcblx0XHRjb25zdCB2YWwgPSBkYXRhW2tleV07XG5cdFx0aWYgKHR5cGVvZiB2YWwgIT09IFwidW5kZWZpbmVkXCIpIHsgcmV0dXJuIHZhbDsgfVxuXHRcdHJldHVybiBvZy5jYWxsKHRoaXMsIGtleSwgbW9kZSk7XG5cdH07XG5cblx0Y29weVBhcmFtcyhkYXRhLCB2aWV3LmdldFVybCgpLCByb3V0ZSk7XG59XG4iLCJpbXBvcnQge0lKZXRBcHAsIElKZXRWaWV3fSBmcm9tIFwiLi4vaW50ZXJmYWNlc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gVXNlcihhcHA6IElKZXRBcHAsIF92aWV3OiBJSmV0VmlldywgY29uZmlnOiBhbnkpe1xuXHRjb25maWcgPSBjb25maWcgfHwge307XG5cblx0Y29uc3QgbG9naW4gPSBjb25maWcubG9naW4gfHwgXCIvbG9naW5cIjtcblx0Y29uc3QgbG9nb3V0ID0gY29uZmlnLmxvZ291dCB8fCBcIi9sb2dvdXRcIjtcblx0Y29uc3QgYWZ0ZXJMb2dpbiA9IGNvbmZpZy5hZnRlckxvZ2luIHx8IGFwcC5jb25maWcuc3RhcnQ7XG5cdGNvbnN0IGFmdGVyTG9nb3V0ID0gY29uZmlnLmFmdGVyTG9nb3V0IHx8IFwiL2xvZ2luXCI7XG5cdGNvbnN0IHBpbmcgPSBjb25maWcucGluZyB8fCA1KjYwKjEwMDA7XG5cdGNvbnN0IG1vZGVsID0gY29uZmlnLm1vZGVsO1xuXHRsZXQgdXNlciA9IGNvbmZpZy51c2VyO1xuXG5cdGNvbnN0IHNlcnZpY2UgPSB7XG5cdFx0Z2V0VXNlcigpe1xuXHRcdFx0cmV0dXJuIHVzZXI7XG5cdFx0fSxcblx0XHRnZXRTdGF0dXMoc2VydmVyPyA6IGJvb2xlYW4pe1xuXHRcdFx0aWYgKCFzZXJ2ZXIpe1xuXHRcdFx0XHRyZXR1cm4gdXNlciAhPT0gbnVsbDtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIG1vZGVsLnN0YXR1cygpLmNhdGNoKCgpID0+IG51bGwpLnRoZW4oZGF0YSA9PiB7XG5cdFx0XHRcdHVzZXIgPSBkYXRhO1xuXHRcdFx0fSk7XG5cdFx0fSxcblx0XHRsb2dpbihuYW1lOnN0cmluZywgcGFzczpzdHJpbmcpe1xuXHRcdFx0cmV0dXJuIG1vZGVsLmxvZ2luKG5hbWUsIHBhc3MpLnRoZW4oZGF0YSA9PiB7XG5cdFx0XHRcdHVzZXIgPSBkYXRhO1xuXHRcdFx0XHRpZiAoIWRhdGEpe1xuXHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIkFjY2VzcyBkZW5pZWRcIik7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRhcHAuY2FsbEV2ZW50KFwiYXBwOnVzZXI6bG9naW5cIiwgWyB1c2VyIF0pO1xuXHRcdFx0XHRhcHAuc2hvdyhhZnRlckxvZ2luKTtcblx0XHRcdH0pO1xuXHRcdH0sXG5cdFx0bG9nb3V0KCl7XG5cdFx0XHR1c2VyID0gbnVsbDtcblx0XHRcdHJldHVybiBtb2RlbC5sb2dvdXQoKS50aGVuKHJlcyA9PiB7XG5cdFx0XHRcdGFwcC5jYWxsRXZlbnQoXCJhcHA6dXNlcjpsb2dvdXRcIixbXSk7XG5cdFx0XHRcdHJldHVybiByZXM7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH07XG5cblx0ZnVuY3Rpb24gY2FuTmF2aWdhdGUodXJsLCBvYmope1xuXHRcdGlmICh1cmwgPT09IGxvZ291dCl7XG5cdFx0XHRzZXJ2aWNlLmxvZ291dCgpO1xuXHRcdFx0b2JqLnJlZGlyZWN0ID0gYWZ0ZXJMb2dvdXQ7XG5cdFx0fSBlbHNlIGlmICh1cmwgIT09IGxvZ2luICYmICFzZXJ2aWNlLmdldFN0YXR1cygpKXtcblx0XHRcdG9iai5yZWRpcmVjdCA9IGxvZ2luO1xuXHRcdH1cblx0fVxuXG5cdGFwcC5zZXRTZXJ2aWNlKFwidXNlclwiLCBzZXJ2aWNlKTtcblxuXHRhcHAuYXR0YWNoRXZlbnQoYGFwcDpndWFyZGAsIGZ1bmN0aW9uKHVybDogc3RyaW5nLCBfJHJvb3Q6IGFueSwgb2JqOmFueSl7XG5cdFx0aWYgKGNvbmZpZy5wdWJsaWMgJiYgY29uZmlnLnB1YmxpYyh1cmwpKXtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblxuXHRcdGlmICh0eXBlb2YgdXNlciA9PT0gXCJ1bmRlZmluZWRcIil7XG5cdFx0XHRvYmouY29uZmlybSA9IHNlcnZpY2UuZ2V0U3RhdHVzKHRydWUpLnRoZW4oKCkgPT4gY2FuTmF2aWdhdGUodXJsLCBvYmopKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gY2FuTmF2aWdhdGUodXJsLCBvYmopO1xuXHR9KTtcblxuXHRpZiAocGluZyl7XG5cdFx0c2V0SW50ZXJ2YWwoKCkgPT4gc2VydmljZS5nZXRTdGF0dXModHJ1ZSksIHBpbmcpO1xuXHR9XG59IiwiLypcbk1JVCBMaWNlbnNlXG5Db3B5cmlnaHQgKGMpIDIwMTkgWEIgU29mdHdhcmVcbiovXG5cbmltcG9ydCB7IElKZXRBcHAsIElKZXRWaWV3IH0gZnJvbSBcIi4vaW50ZXJmYWNlc1wiO1xuZXhwb3J0IHsgSUpldEFwcCwgSUpldFZpZXcgfTtcblxuaW1wb3J0IHtOYXZpZ2F0aW9uQmxvY2tlZH0gZnJvbSBcIi4vZXJyb3JzXCI7XG5cbmV4cG9ydCB7IEpldEFwcCB9IFx0XHRmcm9tIFwiLi9KZXRBcHBcIjtcbmV4cG9ydCB7IEpldFZpZXcgfSBcdFx0ZnJvbSBcIi4vSmV0Vmlld1wiO1xuXG5leHBvcnQgeyBIYXNoUm91dGVyIH0gXHRmcm9tIFwiLi9yb3V0ZXJzL0hhc2hSb3V0ZXJcIjtcbmV4cG9ydCB7IFN0b3JlUm91dGVyIH1cdGZyb20gXCIuL3JvdXRlcnMvU3RvcmVSb3V0ZXJcIjtcbmV4cG9ydCB7IFVybFJvdXRlciB9IFx0ZnJvbSBcIi4vcm91dGVycy9VcmxSb3V0ZXJcIjtcbmV4cG9ydCB7IEVtcHR5Um91dGVyIH0gXHRmcm9tIFwiLi9yb3V0ZXJzL0VtcHR5Um91dGVyXCI7XG5leHBvcnQgeyBTdWJSb3V0ZXIgfSBcdGZyb20gXCIuL3JvdXRlcnMvU3ViUm91dGVyXCI7XG5cbmltcG9ydCB7VW5sb2FkR3VhcmR9IFx0ZnJvbSBcIi4vcGx1Z2lucy9HdWFyZFwiO1xuaW1wb3J0IHtMb2NhbGV9IFx0XHRmcm9tIFwiLi9wbHVnaW5zL0xvY2FsZVwiO1xuaW1wb3J0IHtNZW51fSBcdFx0XHRmcm9tIFwiLi9wbHVnaW5zL01lbnVcIjtcbmltcG9ydCB7U3RhdHVzfSBcdFx0ZnJvbSBcIi4vcGx1Z2lucy9TdGF0dXNcIjtcbmltcG9ydCB7VGhlbWV9IFx0XHRcdGZyb20gXCIuL3BsdWdpbnMvVGhlbWVcIjtcbmltcG9ydCB7VXJsUGFyYW19XHRcdGZyb20gXCIuL3BsdWdpbnMvVXJsUGFyYW1cIjtcbmltcG9ydCB7VXNlcn0gXHRcdFx0ZnJvbSBcIi4vcGx1Z2lucy9Vc2VyXCI7XG5cbmltcG9ydCBwYXRjaCBmcm9tIFwiLi9wYXRjaFwiO1xubGV0IHdlYml4ID0gKHdpbmRvdyBhcyBhbnkpLndlYml4O1xuaWYgKHdlYml4KXtcblx0cGF0Y2god2ViaXgpO1xufVxuXG5leHBvcnQgY29uc3QgcGx1Z2lucyA9IHtcblx0VW5sb2FkR3VhcmQsIExvY2FsZSwgTWVudSwgVGhlbWUsIFVzZXIsIFN0YXR1cywgVXJsUGFyYW1cbn07XG5cbmV4cG9ydCBjb25zdCBlcnJvcnMgPSB7IE5hdmlnYXRpb25CbG9ja2VkIH07XG5cbmNvbnN0IHcgPSB3aW5kb3cgYXMgYW55O1xuaWYgKCF3LlByb21pc2Upe1xuXHR3LlByb21pc2UgPSB3LndlYml4LnByb21pc2U7XG59IiwiZXhwb3J0IGNvbnN0IGRhdGEgPSBuZXcgd2ViaXguRGF0YUNvbGxlY3Rpb24oeyBkYXRhOltcblx0eyBpZDoxLCB0aXRsZTpcIlRoZSBTaGF3c2hhbmsgUmVkZW1wdGlvblwiLCB5ZWFyOjE5OTQsIHZvdGVzOjY3ODc5MCwgcmF0aW5nOjkuMiwgcmFuazoxfSxcblx0eyBpZDoyLCB0aXRsZTpcIlRoZSBHb2RmYXRoZXJcIiwgeWVhcjoxOTcyLCB2b3Rlczo1MTE0OTUsIHJhdGluZzo5LjIsIHJhbms6Mn0sXG5cdHsgaWQ6MywgdGl0bGU6XCJUaGUgR29kZmF0aGVyOiBQYXJ0IElJXCIsIHllYXI6MTk3NCwgdm90ZXM6MzE5MzUyLCByYXRpbmc6OS4wLCByYW5rOjN9LFxuXHR7IGlkOjQsIHRpdGxlOlwiVGhlIEdvb2QsIHRoZSBCYWQgYW5kIHRoZSBVZ2x5XCIsIHllYXI6MTk2Niwgdm90ZXM6MjEzMDMwLCByYXRpbmc6OC45LCByYW5rOjR9LFxuXHR7IGlkOjUsIHRpdGxlOlwiTXkgRmFpciBMYWR5XCIsIHllYXI6MTk2NCwgdm90ZXM6NTMzODQ4LCByYXRpbmc6OC45LCByYW5rOjV9LFxuXHR7IGlkOjYsIHRpdGxlOlwiMTIgQW5ncnkgTWVuXCIsIHllYXI6MTk1Nywgdm90ZXM6MTY0NTU4LCByYXRpbmc6OC45LCByYW5rOjZ9XG5dfSk7IiwiaW1wb3J0IHtKZXRWaWV3fSBmcm9tIFwid2ViaXgtamV0XCI7XG5pbXBvcnQge2RhdGF9IGZyb20gXCJtb2RlbHMvcmVjb3Jkc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYXRhVmlldyBleHRlbmRzIEpldFZpZXd7XG5cdGNvbmZpZygpe1xuXHRcdHJldHVybiB7IHZpZXc6XCJkYXRhdGFibGVcIiwgYXV0b0NvbmZpZzp0cnVlLCBjc3M6XCJ3ZWJpeF9zaGFkb3dfbWVkaXVtXCIgfTtcblx0fVxuXHRpbml0KHZpZXcpe1xuXHRcdHZpZXcucGFyc2UoZGF0YSk7XG5cdH1cbn0iLCJleHBvcnQgZGVmYXVsdCB7XG5cdHRlbXBsYXRlOlwiU3RhcnQgcGFnZVwiLCBjc3M6XCJ3ZWJpeF9zaGFkb3dfbWVkaXVtIGFwcF9zdGFydFwiXG59O1xuIiwiaW1wb3J0IHtKZXRWaWV3LCBwbHVnaW5zfSBmcm9tIFwid2ViaXgtamV0XCI7XG5cblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUb3BWaWV3IGV4dGVuZHMgSmV0Vmlld3tcblx0Y29uZmlnKCl7XG5cdFx0dmFyIGhlYWRlciA9IHtcblx0XHRcdHR5cGU6XCJoZWFkZXJcIiwgdGVtcGxhdGU6dGhpcy5hcHAuY29uZmlnLm5hbWUsIGNzczpcIndlYml4X2hlYWRlciBhcHBfaGVhZGVyXCJcblx0XHR9O1xuXG5cdFx0dmFyIG1lbnUgPSB7XG5cdFx0XHR2aWV3OlwibWVudVwiLCBpZDpcInRvcDptZW51XCIsIFxuXHRcdFx0Y3NzOlwiYXBwX21lbnVcIixcblx0XHRcdHdpZHRoOjE4MCwgbGF5b3V0OlwieVwiLCBzZWxlY3Q6dHJ1ZSxcblx0XHRcdHRlbXBsYXRlOlwiPHNwYW4gY2xhc3M9J3dlYml4X2ljb24gI2ljb24jJz48L3NwYW4+ICN2YWx1ZSMgXCIsXG5cdFx0XHRkYXRhOltcblx0XHRcdFx0eyB2YWx1ZTpcIkRhc2hib2FyZFwiLCBpZDpcInN0YXJ0XCIsIGljb246XCJ3eGktY29sdW1uc1wiIH0sXG5cdFx0XHRcdHsgdmFsdWU6XCJEYXRhXCIsXHRcdCBpZDpcImRhdGFcIiwgIGljb246XCJ3eGktcGVuY2lsXCIgfVxuXHRcdFx0XVxuXHRcdH07XG5cblx0XHR2YXIgdWkgPSB7XG5cdFx0XHR0eXBlOlwiY2xlYW5cIiwgcGFkZGluZ1g6NSwgY3NzOlwiYXBwX2xheW91dFwiLCBjb2xzOltcblx0XHRcdFx0eyAgcGFkZGluZ1g6NSwgcGFkZGluZ1k6MTAsIHJvd3M6IFsge2NzczpcIndlYml4X3NoYWRvd19tZWRpdW1cIiwgcm93czpbaGVhZGVyLCBtZW51XX0gXX0sXG5cdFx0XHRcdHsgdHlwZTpcIndpZGVcIiwgcGFkZGluZ1k6MTAsIHBhZGRpbmdYOjUsIHJvd3M6W1xuXHRcdFx0XHRcdHsgJHN1YnZpZXc6dHJ1ZSB9IFxuXHRcdFx0XHRdfVxuXHRcdFx0XVxuXHRcdH07XG5cblx0XHRyZXR1cm4gdWk7XG5cdH1cblx0aW5pdCgpe1xuXHRcdHRoaXMudXNlKHBsdWdpbnMuTWVudSwgXCJ0b3A6bWVudVwiKTtcblx0fVxufSIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsInZhciBtYXAgPSB7XG5cdFwiLi9lblwiOiBcIi4vc291cmNlcy9sb2NhbGVzL2VuLmpzXCIsXG5cdFwiLi9lbi5qc1wiOiBcIi4vc291cmNlcy9sb2NhbGVzL2VuLmpzXCJcbn07XG5cblxuZnVuY3Rpb24gd2VicGFja0NvbnRleHQocmVxKSB7XG5cdHZhciBpZCA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpO1xuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhpZCk7XG59XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSB7XG5cdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8obWFwLCByZXEpKSB7XG5cdFx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgcmVxICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdHJldHVybiBtYXBbcmVxXTtcbn1cbndlYnBhY2tDb250ZXh0LmtleXMgPSBmdW5jdGlvbiB3ZWJwYWNrQ29udGV4dEtleXMoKSB7XG5cdHJldHVybiBPYmplY3Qua2V5cyhtYXApO1xufTtcbndlYnBhY2tDb250ZXh0LnJlc29sdmUgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmU7XG5tb2R1bGUuZXhwb3J0cyA9IHdlYnBhY2tDb250ZXh0O1xud2VicGFja0NvbnRleHQuaWQgPSBcIi4vc291cmNlcy9sb2NhbGVzIHN5bmMgcmVjdXJzaXZlIF5cXFxcLlxcXFwvLiokXCI7IiwidmFyIG1hcCA9IHtcblx0XCIuL2RhdGFcIjogXCIuL3NvdXJjZXMvdmlld3MvZGF0YS5qc1wiLFxuXHRcIi4vZGF0YS5qc1wiOiBcIi4vc291cmNlcy92aWV3cy9kYXRhLmpzXCIsXG5cdFwiLi9zdGFydFwiOiBcIi4vc291cmNlcy92aWV3cy9zdGFydC5qc1wiLFxuXHRcIi4vc3RhcnQuanNcIjogXCIuL3NvdXJjZXMvdmlld3Mvc3RhcnQuanNcIixcblx0XCIuL3RvcFwiOiBcIi4vc291cmNlcy92aWV3cy90b3AuanNcIixcblx0XCIuL3RvcC5qc1wiOiBcIi4vc291cmNlcy92aWV3cy90b3AuanNcIlxufTtcblxuXG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dChyZXEpIHtcblx0dmFyIGlkID0gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSk7XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKGlkKTtcbn1cbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpIHtcblx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhtYXAsIHJlcSkpIHtcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0cmV0dXJuIG1hcFtyZXFdO1xufVxud2VicGFja0NvbnRleHQua2V5cyA9IGZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0S2V5cygpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG1hcCk7XG59O1xud2VicGFja0NvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZTtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0NvbnRleHQ7XG53ZWJwYWNrQ29udGV4dC5pZCA9IFwiLi9zb3VyY2VzL3ZpZXdzIHN5bmMgcmVjdXJzaXZlIF5cXFxcLlxcXFwvLiokXCI7IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2Fzc2VydFRoaXNJbml0aWFsaXplZChzZWxmKSB7XG4gIGlmIChzZWxmID09PSB2b2lkIDApIHtcbiAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7XG4gIH1cblxuICByZXR1cm4gc2VsZjtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7XG4gIGlmIChrZXkgaW4gb2JqKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBvYmpba2V5XSA9IHZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIG9iajtcbn0iLCJpbXBvcnQgc2V0UHJvdG90eXBlT2YgZnJvbSBcIi4vc2V0UHJvdG90eXBlT2YuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9pbmhlcml0c0xvb3NlKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7XG4gIHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcy5wcm90b3R5cGUpO1xuICBzdWJDbGFzcy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBzdWJDbGFzcztcbiAgc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7XG4gIF9zZXRQcm90b3R5cGVPZiA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fCBmdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkge1xuICAgIG8uX19wcm90b19fID0gcDtcbiAgICByZXR1cm4gbztcbiAgfTtcblxuICByZXR1cm4gX3NldFByb3RvdHlwZU9mKG8sIHApO1xufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFwiLi9zdHlsZXMvYXBwLmNzc1wiO1xuaW1wb3J0IHtKZXRBcHAsIEVtcHR5Um91dGVyLCBIYXNoUm91dGVyIH0gZnJvbSBcIndlYml4LWpldFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNeUFwcCBleHRlbmRzIEpldEFwcHtcblx0Y29uc3RydWN0b3IoY29uZmlnKXtcblx0XHRjb25zdCBkZWZhdWx0cyA9IHtcblx0XHRcdGlkIFx0XHQ6IEFQUE5BTUUsXG5cdFx0XHR2ZXJzaW9uIDogVkVSU0lPTixcblx0XHRcdHJvdXRlciBcdDogQlVJTERfQVNfTU9EVUxFID8gRW1wdHlSb3V0ZXIgOiBIYXNoUm91dGVyLFxuXHRcdFx0ZGVidWcgXHQ6ICFQUk9EVUNUSU9OLFxuXHRcdFx0c3RhcnQgXHQ6IFwiL3RvcC9zdGFydFwiXG5cdFx0fTtcblxuXHRcdHN1cGVyKHsgLi4uZGVmYXVsdHMsIC4uLmNvbmZpZyB9KTtcblx0fVxufVxuXG5pZiAoIUJVSUxEX0FTX01PRFVMRSl7XG5cdHdlYml4LnJlYWR5KCgpID0+IG5ldyBNeUFwcCgpLnJlbmRlcigpICk7XG59Il0sIm5hbWVzIjpbIlBvbHlnbG90IiwiZGF0YSIsIndlYml4IiwiRGF0YUNvbGxlY3Rpb24iLCJpZCIsInRpdGxlIiwieWVhciIsInZvdGVzIiwicmF0aW5nIiwicmFuayIsIkpldFZpZXciLCJEYXRhVmlldyIsImNvbmZpZyIsInZpZXciLCJhdXRvQ29uZmlnIiwiY3NzIiwiaW5pdCIsInBhcnNlIiwidGVtcGxhdGUiLCJwbHVnaW5zIiwiVG9wVmlldyIsImhlYWRlciIsInR5cGUiLCJhcHAiLCJuYW1lIiwibWVudSIsIndpZHRoIiwibGF5b3V0Iiwic2VsZWN0IiwidmFsdWUiLCJpY29uIiwidWkiLCJwYWRkaW5nWCIsImNvbHMiLCJwYWRkaW5nWSIsInJvd3MiLCIkc3VidmlldyIsInVzZSIsIk1lbnUiLCJfYXNzZXJ0VGhpc0luaXRpYWxpemVkIiwic2VsZiIsIlJlZmVyZW5jZUVycm9yIiwiX2RlZmluZVByb3BlcnR5Iiwib2JqIiwia2V5IiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJlbnVtZXJhYmxlIiwiY29uZmlndXJhYmxlIiwid3JpdGFibGUiLCJzZXRQcm90b3R5cGVPZiIsIl9pbmhlcml0c0xvb3NlIiwic3ViQ2xhc3MiLCJzdXBlckNsYXNzIiwicHJvdG90eXBlIiwiY3JlYXRlIiwiY29uc3RydWN0b3IiLCJfc2V0UHJvdG90eXBlT2YiLCJvIiwicCIsIl9fcHJvdG9fXyIsIkpldEFwcCIsIkVtcHR5Um91dGVyIiwiSGFzaFJvdXRlciIsIk15QXBwIiwiZGVmYXVsdHMiLCJBUFBOQU1FIiwidmVyc2lvbiIsIlZFUlNJT04iLCJyb3V0ZXIiLCJCVUlMRF9BU19NT0RVTEUiLCJkZWJ1ZyIsIlBST0RVQ1RJT04iLCJzdGFydCIsInJlYWR5IiwicmVuZGVyIl0sInNvdXJjZVJvb3QiOiIifQ==