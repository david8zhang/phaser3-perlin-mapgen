// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/jsx-dom/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Component = Component;
exports.Fragment = Fragment;
exports.className = className;
exports.h = exports.createElement = createElement;
exports.createFactory = createFactory;
exports.useRef = exports.createRef = createRef;
exports.isRef = isRef;
exports.jsxs = exports.jsx = jsx;
exports.useCallback = exports.memo = identity;
exports.preventDefault = preventDefault;
exports.stopPropagation = stopPropagation;
exports.useClassList = useClassList;
exports.useMemo = useMemo;
exports.useText = useText;
exports.SVGNamespace = exports.default = void 0;
const keys = Object.keys;

function identity(value) {
  return value;
}

function isBoolean(val) {
  return typeof val === "boolean";
}

function isElement(val) {
  return val && typeof val.nodeType === "number";
}

function isString(val) {
  return typeof val === "string";
}

function isNumber(val) {
  return typeof val === "number";
}

function isObject(val) {
  return typeof val === "object" ? val !== null : isFunction(val);
}

function isFunction(val) {
  return typeof val === "function";
}

function isComponentClass(Component) {
  const prototype = Component.prototype;
  return !!(prototype && prototype.isReactComponent);
}

function isArrayLike(obj) {
  return isObject(obj) && typeof obj.length === "number" && typeof obj.nodeType !== "number";
}

function forEach(value, fn) {
  if (!value) return;

  for (const key of keys(value)) {
    fn(value[key], key);
  }
}

function createRef() {
  return Object.seal({
    current: null
  });
}

function isRef(maybeRef) {
  return isObject(maybeRef) && "current" in maybeRef;
}

function useMemo(factory) {
  return factory();
}

const isUnitlessNumber = {
  animationIterationCount: 0,
  borderImageOutset: 0,
  borderImageSlice: 0,
  borderImageWidth: 0,
  boxFlex: 0,
  boxFlexGroup: 0,
  boxOrdinalGroup: 0,
  columnCount: 0,
  columns: 0,
  flex: 0,
  flexGrow: 0,
  flexPositive: 0,
  flexShrink: 0,
  flexNegative: 0,
  flexOrder: 0,
  gridArea: 0,
  gridRow: 0,
  gridRowEnd: 0,
  gridRowSpan: 0,
  gridRowStart: 0,
  gridColumn: 0,
  gridColumnEnd: 0,
  gridColumnSpan: 0,
  gridColumnStart: 0,
  fontWeight: 0,
  lineClamp: 0,
  lineHeight: 0,
  opacity: 0,
  order: 0,
  orphans: 0,
  tabSize: 0,
  widows: 0,
  zIndex: 0,
  zoom: 0,
  fillOpacity: 0,
  floodOpacity: 0,
  stopOpacity: 0,
  strokeDasharray: 0,
  strokeDashoffset: 0,
  strokeMiterlimit: 0,
  strokeOpacity: 0,
  strokeWidth: 0
};

function prefixKey(prefix, key) {
  return prefix + key.charAt(0).toUpperCase() + key.substring(1);
}

const prefixes = ["Webkit", "ms", "Moz", "O"];
keys(isUnitlessNumber).forEach(prop => {
  prefixes.forEach(prefix => {
    isUnitlessNumber[prefixKey(prefix, prop)] = 0;
  });
});
const SVGNamespace = "http://www.w3.org/2000/svg";
exports.SVGNamespace = SVGNamespace;
const XLinkNamespace = "http://www.w3.org/1999/xlink";
const XMLNamespace = "http://www.w3.org/XML/1998/namespace";

function isVisibleChild(value) {
  return !isBoolean(value) && value != null;
}

function className(value) {
  if (Array.isArray(value)) {
    return value.map(className).filter(Boolean).join(" ");
  } else if (isObject(value)) {
    return keys(value).filter(k => value[k]).join(" ");
  } else if (isVisibleChild(value)) {
    return "" + value;
  } else {
    return "";
  }
}

const svg = {
  animate: 0,
  circle: 0,
  clipPath: 0,
  defs: 0,
  desc: 0,
  ellipse: 0,
  feBlend: 0,
  feColorMatrix: 0,
  feComponentTransfer: 0,
  feComposite: 0,
  feConvolveMatrix: 0,
  feDiffuseLighting: 0,
  feDisplacementMap: 0,
  feDistantLight: 0,
  feFlood: 0,
  feFuncA: 0,
  feFuncB: 0,
  feFuncG: 0,
  feFuncR: 0,
  feGaussianBlur: 0,
  feImage: 0,
  feMerge: 0,
  feMergeNode: 0,
  feMorphology: 0,
  feOffset: 0,
  fePointLight: 0,
  feSpecularLighting: 0,
  feSpotLight: 0,
  feTile: 0,
  feTurbulence: 0,
  filter: 0,
  foreignObject: 0,
  g: 0,
  image: 0,
  line: 0,
  linearGradient: 0,
  marker: 0,
  mask: 0,
  metadata: 0,
  path: 0,
  pattern: 0,
  polygon: 0,
  polyline: 0,
  radialGradient: 0,
  rect: 0,
  stop: 0,
  svg: 0,
  switch: 0,
  symbol: 0,
  text: 0,
  textPath: 0,
  tspan: 0,
  use: 0,
  view: 0
};
const nonPresentationSVGAttributes = /^(a(ll|t|u)|base[FP]|c(al|lipPathU|on)|di|ed|ex|filter[RU]|g(lyphR|r)|ke|l(en|im)|ma(rker[HUW]|s)|n|pat|pr|point[^e]|re[^n]|s[puy]|st[^or]|ta|textL|vi|xC|y|z)/;

function createFactory(tag) {
  return createElement.bind(null, tag);
}

function Fragment(attr) {
  const fragment = document.createDocumentFragment();
  appendChildren(attr.children, fragment);
  return fragment;
}

function Component(props) {
  this.props = props;
}

Object.defineProperties(Component.prototype, {
  isReactComponent: {
    value: true
  },
  render: {
    value() {
      return null;
    }

  }
});

function jsx(tag, {
  children,
  ...attr
}) {
  if (!attr.namespaceURI && svg[tag] === 0) {
    attr = { ...attr,
      namespaceURI: SVGNamespace
    };
  }

  let node;

  if (isString(tag)) {
    node = attr.namespaceURI ? document.createElementNS(attr.namespaceURI, tag) : document.createElement(tag);
    attributes(attr, node);
    appendChild(children, node);
  } else if (isFunction(tag)) {
    if (isObject(tag.defaultProps)) {
      attr = { ...tag.defaultProps,
        ...attr
      };
    }

    node = isComponentClass(tag) ? new tag({ ...tag.defaultProps,
      ...attr,
      children
    }).render() : tag({ ...attr,
      children
    });
  }

  if (isRef(attr.ref)) {
    attr.ref.current = node;
  } else if (isFunction(attr.ref)) {
    attr.ref(node);
  }

  return node;
}

function createElement(tag, attr, ...children) {
  if (isString(attr) || Array.isArray(attr)) {
    children.unshift(attr);
    attr = {};
  }

  attr = attr || {};

  if (attr.children != null && !children.length) {
    ;
    ({
      children,
      ...attr
    } = attr);
  }

  return jsx(tag, { ...attr,
    children
  }, attr.key);
}

function appendChild(child, node) {
  if (isArrayLike(child)) {
    appendChildren(child, node);
  } else if (isString(child) || isNumber(child)) {
    appendChildToNode(document.createTextNode(child), node);
  } else if (child === null) {
    appendChildToNode(document.createComment(""), node);
  } else if (isElement(child)) {
    appendChildToNode(child, node);
  }
}

function appendChildren(children, node) {
  for (const child of [...children]) {
    appendChild(child, node);
  }

  return node;
}

function appendChildToNode(child, node) {
  if (node instanceof window.HTMLTemplateElement) {
    node.content.appendChild(child);
  } else {
    node.appendChild(child);
  }
}

function normalizeAttribute(s, separator) {
  return s.replace(/[A-Z\d]/g, match => separator + match.toLowerCase());
}

function attribute(key, value, node) {
  switch (key) {
    case "xlinkActuate":
    case "xlinkArcrole":
    case "xlinkHref":
    case "xlinkRole":
    case "xlinkShow":
    case "xlinkTitle":
    case "xlinkType":
      attrNS(node, XLinkNamespace, normalizeAttribute(key, ":"), value);
      return;

    case "xmlnsXlink":
      attr(node, normalizeAttribute(key, ":"), value);
      return;

    case "xmlBase":
    case "xmlLang":
    case "xmlSpace":
      attrNS(node, XMLNamespace, normalizeAttribute(key, ":"), value);
      return;
  }

  switch (key) {
    case "htmlFor":
      attr(node, "for", value);
      return;

    case "dataset":
      forEach(value, (dataValue, dataKey) => {
        if (dataValue != null) {
          node.dataset[dataKey] = dataValue;
        }
      });
      return;

    case "innerHTML":
    case "innerText":
    case "textContent":
      node[key] = value;
      return;

    case "dangerouslySetInnerHTML":
      if (isObject(value)) {
        node.innerHTML = value["__html"];
      }

      return;

    case "spellCheck":
      node.spellcheck = value;
      return;

    case "class":
    case "className":
      if (isFunction(value)) {
        value(node);
      } else {
        attr(node, "class", className(value));
      }

      return;

    case "ref":
    case "namespaceURI":
      return;

    case "style":
      if (isObject(value)) {
        forEach(value, (val, key) => {
          if (isNumber(val) && isUnitlessNumber[key] !== 0) {
            node.style[key] = val + "px";
          } else {
            node.style[key] = val;
          }
        });
        return;
      }

  }

  if (isFunction(value)) {
    if (key[0] === "o" && key[1] === "n") {
      const attribute = key.toLowerCase();

      if (node[attribute] == null) {
        node[attribute] = value;
      } else {
        node.addEventListener(key, value);
      }
    }
  } else if (value === true) {
    attr(node, key, "");
  } else if (value !== false && value != null) {
    if (node instanceof SVGElement && !nonPresentationSVGAttributes.test(key)) {
      attr(node, normalizeAttribute(key, "-"), value);
    } else {
      attr(node, key, value);
    }
  }
}

function attr(node, key, value) {
  node.setAttribute(key, value);
}

function attrNS(node, namespace, key, value) {
  node.setAttributeNS(namespace, key, value);
}

function attributes(attr, node) {
  for (const key of keys(attr)) {
    attribute(key, attr[key], node);
  }

  return node;
}

function useText(initialValue) {
  const text = new Text();
  Object.defineProperty(text, "toString", {
    value() {
      return this.textContent;
    }

  });

  function setText(value) {
    text.textContent = value;
  }

  if (initialValue != null) {
    setText(initialValue);
  }

  return [text, setText];
}

function useClassList(initialValue) {
  const div = document.createElement("div");

  if (initialValue != null) {
    div.className = className(initialValue);
  }

  let list = div.classList;

  function ClassList(value) {
    value.className = list.value;
    list = value.classList;
  }

  Object.defineProperties(ClassList, Object.getOwnPropertyDescriptors({
    get size() {
      return list.length;
    },

    get value() {
      return list.value;
    },

    add(...tokens) {
      list.add(...tokens);
    },

    remove(...tokens) {
      list.remove(...tokens);
    },

    toggle(token, force) {
      list.toggle(token, force);
    },

    contains(token) {
      return list.contains(token);
    }

  }));
  return ClassList;
}

var index = {
  createElement,
  Fragment,
  Component
};

function preventDefault(event) {
  event.preventDefault();
  return event;
}

function stopPropagation(event) {
  event.stopPropagation();
  return event;
}

var _default = index;
exports.default = _default;
},{}],"jsx-dom-shim.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("jsx-dom"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

window['React'] = React;
var _default = React;
exports.default = _default;
},{"jsx-dom":"../node_modules/jsx-dom/index.js"}],"../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "52734" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","jsx-dom-shim.ts"], null)
//# sourceMappingURL=/jsx-dom-shim.afe2c5c1.js.map