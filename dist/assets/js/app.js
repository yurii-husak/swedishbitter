/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transitionend = exports.GetYoDigits = exports.rtl = undefined;

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Core Foundation Utilities, utilized in a number of places.

/**
 * Returns a boolean for RTL support
 */
function rtl() {
  return (0, _jquery2.default)('html').attr('dir') === 'rtl';
}

/**
 * returns a random base-36 uid with namespacing
 * @function
 * @param {Number} length - number of random base-36 digits desired. Increase for more random strings.
 * @param {String} namespace - name of plugin to be incorporated in uid, optional.
 * @default {String} '' - if no plugin name is provided, nothing is appended to the uid.
 * @returns {String} - unique id
 */
function GetYoDigits(length, namespace) {
  length = length || 6;
  return Math.round(Math.pow(36, length + 1) - Math.random() * Math.pow(36, length)).toString(36).slice(1) + (namespace ? '-' + namespace : '');
}

function transitionend($elem) {
  var transitions = {
    'transition': 'transitionend',
    'WebkitTransition': 'webkitTransitionEnd',
    'MozTransition': 'transitionend',
    'OTransition': 'otransitionend'
  };
  var elem = document.createElement('div'),
      end;

  for (var t in transitions) {
    if (typeof elem.style[t] !== 'undefined') {
      end = transitions[t];
    }
  }
  if (end) {
    return end;
  } else {
    end = setTimeout(function () {
      $elem.triggerHandler('transitionend', [$elem]);
    }, 1);
    return 'transitionend';
  }
}

exports.rtl = rtl;
exports.GetYoDigits = GetYoDigits;
exports.transitionend = transitionend;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MediaQuery = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Default set of media queries
var defaultQueries = {
  'default': 'only screen',
  landscape: 'only screen and (orientation: landscape)',
  portrait: 'only screen and (orientation: portrait)',
  retina: 'only screen and (-webkit-min-device-pixel-ratio: 2),' + 'only screen and (min--moz-device-pixel-ratio: 2),' + 'only screen and (-o-min-device-pixel-ratio: 2/1),' + 'only screen and (min-device-pixel-ratio: 2),' + 'only screen and (min-resolution: 192dpi),' + 'only screen and (min-resolution: 2dppx)'
};

// matchMedia() polyfill - Test a CSS media type/query in JS.
// Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas, David Knight. Dual MIT/BSD license
var matchMedia = window.matchMedia || function () {
  'use strict';

  // For browsers that support matchMedium api such as IE 9 and webkit

  var styleMedia = window.styleMedia || window.media;

  // For those that don't support matchMedium
  if (!styleMedia) {
    var style = document.createElement('style'),
        script = document.getElementsByTagName('script')[0],
        info = null;

    style.type = 'text/css';
    style.id = 'matchmediajs-test';

    script && script.parentNode && script.parentNode.insertBefore(style, script);

    // 'style.currentStyle' is used by IE <= 8 and 'window.getComputedStyle' for all other browsers
    info = 'getComputedStyle' in window && window.getComputedStyle(style, null) || style.currentStyle;

    styleMedia = {
      matchMedium: function matchMedium(media) {
        var text = '@media ' + media + '{ #matchmediajs-test { width: 1px; } }';

        // 'style.styleSheet' is used by IE <= 8 and 'style.textContent' for all other browsers
        if (style.styleSheet) {
          style.styleSheet.cssText = text;
        } else {
          style.textContent = text;
        }

        // Test if media query is true or false
        return info.width === '1px';
      }
    };
  }

  return function (media) {
    return {
      matches: styleMedia.matchMedium(media || 'all'),
      media: media || 'all'
    };
  };
}();

var MediaQuery = {
  queries: [],

  current: '',

  /**
   * Initializes the media query helper, by extracting the breakpoint list from the CSS and activating the breakpoint watcher.
   * @function
   * @private
   */
  _init: function _init() {
    var self = this;
    var $meta = (0, _jquery2.default)('meta.foundation-mq');
    if (!$meta.length) {
      (0, _jquery2.default)('<meta class="foundation-mq">').appendTo(document.head);
    }

    var extractedStyles = (0, _jquery2.default)('.foundation-mq').css('font-family');
    var namedQueries;

    namedQueries = parseStyleToObject(extractedStyles);

    for (var key in namedQueries) {
      if (namedQueries.hasOwnProperty(key)) {
        self.queries.push({
          name: key,
          value: 'only screen and (min-width: ' + namedQueries[key] + ')'
        });
      }
    }

    this.current = this._getCurrentSize();

    this._watcher();
  },


  /**
   * Checks if the screen is at least as wide as a breakpoint.
   * @function
   * @param {String} size - Name of the breakpoint to check.
   * @returns {Boolean} `true` if the breakpoint matches, `false` if it's smaller.
   */
  atLeast: function atLeast(size) {
    var query = this.get(size);

    if (query) {
      return matchMedia(query).matches;
    }

    return false;
  },


  /**
   * Checks if the screen matches to a breakpoint.
   * @function
   * @param {String} size - Name of the breakpoint to check, either 'small only' or 'small'. Omitting 'only' falls back to using atLeast() method.
   * @returns {Boolean} `true` if the breakpoint matches, `false` if it does not.
   */
  is: function is(size) {
    size = size.trim().split(' ');
    if (size.length > 1 && size[1] === 'only') {
      if (size[0] === this._getCurrentSize()) return true;
    } else {
      return this.atLeast(size[0]);
    }
    return false;
  },


  /**
   * Gets the media query of a breakpoint.
   * @function
   * @param {String} size - Name of the breakpoint to get.
   * @returns {String|null} - The media query of the breakpoint, or `null` if the breakpoint doesn't exist.
   */
  get: function get(size) {
    for (var i in this.queries) {
      if (this.queries.hasOwnProperty(i)) {
        var query = this.queries[i];
        if (size === query.name) return query.value;
      }
    }

    return null;
  },


  /**
   * Gets the current breakpoint name by testing every breakpoint and returning the last one to match (the biggest one).
   * @function
   * @private
   * @returns {String} Name of the current breakpoint.
   */
  _getCurrentSize: function _getCurrentSize() {
    var matched;

    for (var i = 0; i < this.queries.length; i++) {
      var query = this.queries[i];

      if (matchMedia(query.value).matches) {
        matched = query;
      }
    }

    if ((typeof matched === 'undefined' ? 'undefined' : _typeof(matched)) === 'object') {
      return matched.name;
    } else {
      return matched;
    }
  },


  /**
   * Activates the breakpoint watcher, which fires an event on the window whenever the breakpoint changes.
   * @function
   * @private
   */
  _watcher: function _watcher() {
    var _this = this;

    (0, _jquery2.default)(window).off('resize.zf.mediaquery').on('resize.zf.mediaquery', function () {
      var newSize = _this._getCurrentSize(),
          currentSize = _this.current;

      if (newSize !== currentSize) {
        // Change the current media query
        _this.current = newSize;

        // Broadcast the media query change on the window
        (0, _jquery2.default)(window).trigger('changed.zf.mediaquery', [newSize, currentSize]);
      }
    });
  }
};

// Thank you: https://github.com/sindresorhus/query-string
function parseStyleToObject(str) {
  var styleObject = {};

  if (typeof str !== 'string') {
    return styleObject;
  }

  str = str.trim().slice(1, -1); // browsers re-quote string style values

  if (!str) {
    return styleObject;
  }

  styleObject = str.split('&').reduce(function (ret, param) {
    var parts = param.replace(/\+/g, ' ').split('=');
    var key = parts[0];
    var val = parts[1];
    key = decodeURIComponent(key);

    // missing `=` should be `null`:
    // http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
    val = val === undefined ? null : decodeURIComponent(val);

    if (!ret.hasOwnProperty(key)) {
      ret[key] = val;
    } else if (Array.isArray(ret[key])) {
      ret[key].push(val);
    } else {
      ret[key] = [ret[key], val];
    }
    return ret;
  }, {});

  return styleObject;
}

exports.MediaQuery = MediaQuery;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*******************************************
 *                                         *
 * This util was created by Marius Olbertz *
 * Please thank Marius on GitHub /owlbertz *
 * or the web http://www.mariusolbertz.de/ *
 *                                         *
 ******************************************/



Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Keyboard = undefined;

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

var _foundationUtil = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var keyCodes = {
  9: 'TAB',
  13: 'ENTER',
  27: 'ESCAPE',
  32: 'SPACE',
  35: 'END',
  36: 'HOME',
  37: 'ARROW_LEFT',
  38: 'ARROW_UP',
  39: 'ARROW_RIGHT',
  40: 'ARROW_DOWN'
};

var commands = {};

// Functions pulled out to be referenceable from internals
function findFocusable($element) {
  if (!$element) {
    return false;
  }
  return $element.find('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]').filter(function () {
    if (!(0, _jquery2.default)(this).is(':visible') || (0, _jquery2.default)(this).attr('tabindex') < 0) {
      return false;
    } //only have visible elements and those that have a tabindex greater or equal 0
    return true;
  });
}

function parseKey(event) {
  var key = keyCodes[event.which || event.keyCode] || String.fromCharCode(event.which).toUpperCase();

  // Remove un-printable characters, e.g. for `fromCharCode` calls for CTRL only events
  key = key.replace(/\W+/, '');

  if (event.shiftKey) key = 'SHIFT_' + key;
  if (event.ctrlKey) key = 'CTRL_' + key;
  if (event.altKey) key = 'ALT_' + key;

  // Remove trailing underscore, in case only modifiers were used (e.g. only `CTRL_ALT`)
  key = key.replace(/_$/, '');

  return key;
}

var Keyboard = {
  keys: getKeyCodes(keyCodes),

  /**
   * Parses the (keyboard) event and returns a String that represents its key
   * Can be used like Foundation.parseKey(event) === Foundation.keys.SPACE
   * @param {Event} event - the event generated by the event handler
   * @return String key - String that represents the key pressed
   */
  parseKey: parseKey,

  /**
   * Handles the given (keyboard) event
   * @param {Event} event - the event generated by the event handler
   * @param {String} component - Foundation component's name, e.g. Slider or Reveal
   * @param {Objects} functions - collection of functions that are to be executed
   */
  handleKey: function handleKey(event, component, functions) {
    var commandList = commands[component],
        keyCode = this.parseKey(event),
        cmds,
        command,
        fn;

    if (!commandList) return console.warn('Component not defined!');

    if (typeof commandList.ltr === 'undefined') {
      // this component does not differentiate between ltr and rtl
      cmds = commandList; // use plain list
    } else {
      // merge ltr and rtl: if document is rtl, rtl overwrites ltr and vice versa
      if ((0, _foundationUtil.rtl)()) cmds = _jquery2.default.extend({}, commandList.ltr, commandList.rtl);else cmds = _jquery2.default.extend({}, commandList.rtl, commandList.ltr);
    }
    command = cmds[keyCode];

    fn = functions[command];
    if (fn && typeof fn === 'function') {
      // execute function  if exists
      var returnValue = fn.apply();
      if (functions.handled || typeof functions.handled === 'function') {
        // execute function when event was handled
        functions.handled(returnValue);
      }
    } else {
      if (functions.unhandled || typeof functions.unhandled === 'function') {
        // execute function when event was not handled
        functions.unhandled();
      }
    }
  },


  /**
   * Finds all focusable elements within the given `$element`
   * @param {jQuery} $element - jQuery object to search within
   * @return {jQuery} $focusable - all focusable elements within `$element`
   */

  findFocusable: findFocusable,

  /**
   * Returns the component name name
   * @param {Object} component - Foundation component, e.g. Slider or Reveal
   * @return String componentName
   */

  register: function register(componentName, cmds) {
    commands[componentName] = cmds;
  },


  // TODO9438: These references to Keyboard need to not require global. Will 'this' work in this context?
  //
  /**
   * Traps the focus in the given element.
   * @param  {jQuery} $element  jQuery object to trap the foucs into.
   */
  trapFocus: function trapFocus($element) {
    var $focusable = findFocusable($element),
        $firstFocusable = $focusable.eq(0),
        $lastFocusable = $focusable.eq(-1);

    $element.on('keydown.zf.trapfocus', function (event) {
      if (event.target === $lastFocusable[0] && parseKey(event) === 'TAB') {
        event.preventDefault();
        $firstFocusable.focus();
      } else if (event.target === $firstFocusable[0] && parseKey(event) === 'SHIFT_TAB') {
        event.preventDefault();
        $lastFocusable.focus();
      }
    });
  },

  /**
   * Releases the trapped focus from the given element.
   * @param  {jQuery} $element  jQuery object to release the focus for.
   */
  releaseFocus: function releaseFocus($element) {
    $element.off('keydown.zf.trapfocus');
  }
};

/*
 * Constants for easier comparing.
 * Can be used like Foundation.parseKey(event) === Foundation.keys.SPACE
 */
function getKeyCodes(kcs) {
  var k = {};
  for (var kc in kcs) {
    k[kcs[kc]] = kcs[kc];
  }return k;
}

exports.Keyboard = Keyboard;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Triggers = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

var _foundationUtil = __webpack_require__(11);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MutationObserver = function () {
  var prefixes = ['WebKit', 'Moz', 'O', 'Ms', ''];
  for (var i = 0; i < prefixes.length; i++) {
    if (prefixes[i] + 'MutationObserver' in window) {
      return window[prefixes[i] + 'MutationObserver'];
    }
  }
  return false;
}();

var triggers = function triggers(el, type) {
  el.data(type).split(' ').forEach(function (id) {
    (0, _jquery2.default)('#' + id)[type === 'close' ? 'trigger' : 'triggerHandler'](type + '.zf.trigger', [el]);
  });
};

var Triggers = {
  Listeners: {
    Basic: {},
    Global: {}
  },
  Initializers: {}
};

Triggers.Listeners.Basic = {
  openListener: function openListener() {
    triggers((0, _jquery2.default)(this), 'open');
  },
  closeListener: function closeListener() {
    var id = (0, _jquery2.default)(this).data('close');
    if (id) {
      triggers((0, _jquery2.default)(this), 'close');
    } else {
      (0, _jquery2.default)(this).trigger('close.zf.trigger');
    }
  },
  toggleListener: function toggleListener() {
    var id = (0, _jquery2.default)(this).data('toggle');
    if (id) {
      triggers((0, _jquery2.default)(this), 'toggle');
    } else {
      (0, _jquery2.default)(this).trigger('toggle.zf.trigger');
    }
  },
  closeableListener: function closeableListener(e) {
    e.stopPropagation();
    var animation = (0, _jquery2.default)(this).data('closable');

    if (animation !== '') {
      _foundationUtil.Motion.animateOut((0, _jquery2.default)(this), animation, function () {
        (0, _jquery2.default)(this).trigger('closed.zf');
      });
    } else {
      (0, _jquery2.default)(this).fadeOut().trigger('closed.zf');
    }
  },
  toggleFocusListener: function toggleFocusListener() {
    var id = (0, _jquery2.default)(this).data('toggle-focus');
    (0, _jquery2.default)('#' + id).triggerHandler('toggle.zf.trigger', [(0, _jquery2.default)(this)]);
  }
};

// Elements with [data-open] will reveal a plugin that supports it when clicked.
Triggers.Initializers.addOpenListener = function ($elem) {
  $elem.off('click.zf.trigger', Triggers.Listeners.Basic.openListener);
  $elem.on('click.zf.trigger', '[data-open]', Triggers.Listeners.Basic.openListener);
};

// Elements with [data-close] will close a plugin that supports it when clicked.
// If used without a value on [data-close], the event will bubble, allowing it to close a parent component.
Triggers.Initializers.addCloseListener = function ($elem) {
  $elem.off('click.zf.trigger', Triggers.Listeners.Basic.closeListener);
  $elem.on('click.zf.trigger', '[data-close]', Triggers.Listeners.Basic.closeListener);
};

// Elements with [data-toggle] will toggle a plugin that supports it when clicked.
Triggers.Initializers.addToggleListener = function ($elem) {
  $elem.off('click.zf.trigger', Triggers.Listeners.Basic.toggleListener);
  $elem.on('click.zf.trigger', '[data-toggle]', Triggers.Listeners.Basic.toggleListener);
};

// Elements with [data-closable] will respond to close.zf.trigger events.
Triggers.Initializers.addCloseableListener = function ($elem) {
  $elem.off('close.zf.trigger', Triggers.Listeners.Basic.closeableListener);
  $elem.on('close.zf.trigger', '[data-closeable], [data-closable]', Triggers.Listeners.Basic.closeableListener);
};

// Elements with [data-toggle-focus] will respond to coming in and out of focus
Triggers.Initializers.addToggleFocusListener = function ($elem) {
  $elem.off('focus.zf.trigger blur.zf.trigger', Triggers.Listeners.Basic.toggleFocusListener);
  $elem.on('focus.zf.trigger blur.zf.trigger', '[data-toggle-focus]', Triggers.Listeners.Basic.toggleFocusListener);
};

// More Global/complex listeners and triggers
Triggers.Listeners.Global = {
  resizeListener: function resizeListener($nodes) {
    if (!MutationObserver) {
      //fallback for IE 9
      $nodes.each(function () {
        (0, _jquery2.default)(this).triggerHandler('resizeme.zf.trigger');
      });
    }
    //trigger all listening elements and signal a resize event
    $nodes.attr('data-events', "resize");
  },
  scrollListener: function scrollListener($nodes) {
    if (!MutationObserver) {
      //fallback for IE 9
      $nodes.each(function () {
        (0, _jquery2.default)(this).triggerHandler('scrollme.zf.trigger');
      });
    }
    //trigger all listening elements and signal a scroll event
    $nodes.attr('data-events', "scroll");
  },
  closeMeListener: function closeMeListener(e, pluginId) {
    var plugin = e.namespace.split('.')[0];
    var plugins = (0, _jquery2.default)('[data-' + plugin + ']').not('[data-yeti-box="' + pluginId + '"]');

    plugins.each(function () {
      var _this = (0, _jquery2.default)(this);
      _this.triggerHandler('close.zf.trigger', [_this]);
    });
  }

  // Global, parses whole document.
};Triggers.Initializers.addClosemeListener = function (pluginName) {
  var yetiBoxes = (0, _jquery2.default)('[data-yeti-box]'),
      plugNames = ['dropdown', 'tooltip', 'reveal'];

  if (pluginName) {
    if (typeof pluginName === 'string') {
      plugNames.push(pluginName);
    } else if ((typeof pluginName === 'undefined' ? 'undefined' : _typeof(pluginName)) === 'object' && typeof pluginName[0] === 'string') {
      plugNames.concat(pluginName);
    } else {
      console.error('Plugin names must be strings');
    }
  }
  if (yetiBoxes.length) {
    var listeners = plugNames.map(function (name) {
      return 'closeme.zf.' + name;
    }).join(' ');

    (0, _jquery2.default)(window).off(listeners).on(listeners, Triggers.Listeners.Global.closeMeListener);
  }
};

function debounceGlobalListener(debounce, trigger, listener) {
  var timer = void 0,
      args = Array.prototype.slice.call(arguments, 3);
  (0, _jquery2.default)(window).off(trigger).on(trigger, function (e) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function () {
      listener.apply(null, args);
    }, debounce || 10); //default time to emit scroll event
  });
}

Triggers.Initializers.addResizeListener = function (debounce) {
  var $nodes = (0, _jquery2.default)('[data-resize]');
  if ($nodes.length) {
    debounceGlobalListener(debounce, 'resize.zf.trigger', Triggers.Listeners.Global.resizeListener, $nodes);
  }
};

Triggers.Initializers.addScrollListener = function (debounce) {
  var $nodes = (0, _jquery2.default)('[data-scroll]');
  if ($nodes.length) {
    debounceGlobalListener(debounce, 'scroll.zf.trigger', Triggers.Listeners.Global.scrollListener, $nodes);
  }
};

Triggers.Initializers.addMutationEventsListener = function ($elem) {
  if (!MutationObserver) {
    return false;
  }
  var $nodes = $elem.find('[data-resize], [data-scroll], [data-mutate]');

  //element callback
  var listeningElementsMutation = function listeningElementsMutation(mutationRecordsList) {
    var $target = (0, _jquery2.default)(mutationRecordsList[0].target);

    //trigger the event handler for the element depending on type
    switch (mutationRecordsList[0].type) {
      case "attributes":
        if ($target.attr("data-events") === "scroll" && mutationRecordsList[0].attributeName === "data-events") {
          $target.triggerHandler('scrollme.zf.trigger', [$target, window.pageYOffset]);
        }
        if ($target.attr("data-events") === "resize" && mutationRecordsList[0].attributeName === "data-events") {
          $target.triggerHandler('resizeme.zf.trigger', [$target]);
        }
        if (mutationRecordsList[0].attributeName === "style") {
          $target.closest("[data-mutate]").attr("data-events", "mutate");
          $target.closest("[data-mutate]").triggerHandler('mutateme.zf.trigger', [$target.closest("[data-mutate]")]);
        }
        break;

      case "childList":
        $target.closest("[data-mutate]").attr("data-events", "mutate");
        $target.closest("[data-mutate]").triggerHandler('mutateme.zf.trigger', [$target.closest("[data-mutate]")]);
        break;

      default:
        return false;
      //nothing
    }
  };

  if ($nodes.length) {
    //for each element that needs to listen for resizing, scrolling, or mutation add a single observer
    for (var i = 0; i <= $nodes.length - 1; i++) {
      var elementObserver = new MutationObserver(listeningElementsMutation);
      elementObserver.observe($nodes[i], { attributes: true, childList: true, characterData: false, subtree: true, attributeFilter: ["data-events", "style"] });
    }
  }
};

Triggers.Initializers.addSimpleListeners = function () {
  var $document = (0, _jquery2.default)(document);

  Triggers.Initializers.addOpenListener($document);
  Triggers.Initializers.addCloseListener($document);
  Triggers.Initializers.addToggleListener($document);
  Triggers.Initializers.addCloseableListener($document);
  Triggers.Initializers.addToggleFocusListener($document);
};

Triggers.Initializers.addGlobalListeners = function () {
  var $document = (0, _jquery2.default)(document);
  Triggers.Initializers.addMutationEventsListener($document);
  Triggers.Initializers.addResizeListener();
  Triggers.Initializers.addScrollListener();
  Triggers.Initializers.addClosemeListener();
};

Triggers.init = function ($, Foundation) {
  if (typeof $.triggersInitialized === 'undefined') {
    var $document = $(document);

    if (document.readyState === "complete") {
      Triggers.Initializers.addSimpleListeners();
      Triggers.Initializers.addGlobalListeners();
    } else {
      $(window).on('load', function () {
        Triggers.Initializers.addSimpleListeners();
        Triggers.Initializers.addGlobalListeners();
      });
    }

    $.triggersInitialized = true;
  }

  if (Foundation) {
    Foundation.Triggers = Triggers;
    // Legacy included to be backwards compatible for now.
    Foundation.IHearYou = Triggers.Initializers.addGlobalListeners;
  }
};

exports.Triggers = Triggers;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Plugin = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

var _foundationUtil = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Abstract class for providing lifecycle hooks. Expect plugins to define AT LEAST
// {function} _setup (replaces previous constructor),
// {function} _destroy (replaces previous destroy)
var Plugin = function () {
  function Plugin(element, options) {
    _classCallCheck(this, Plugin);

    this._setup(element, options);
    var pluginName = getPluginName(this);
    this.uuid = (0, _foundationUtil.GetYoDigits)(6, pluginName);

    if (!this.$element.attr('data-' + pluginName)) {
      this.$element.attr('data-' + pluginName, this.uuid);
    }
    if (!this.$element.data('zfPlugin')) {
      this.$element.data('zfPlugin', this);
    }
    /**
     * Fires when the plugin has initialized.
     * @event Plugin#init
     */
    this.$element.trigger('init.zf.' + pluginName);
  }

  _createClass(Plugin, [{
    key: 'destroy',
    value: function destroy() {
      this._destroy();
      var pluginName = getPluginName(this);
      this.$element.removeAttr('data-' + pluginName).removeData('zfPlugin')
      /**
       * Fires when the plugin has been destroyed.
       * @event Plugin#destroyed
       */
      .trigger('destroyed.zf.' + pluginName);
      for (var prop in this) {
        this[prop] = null; //clean up script to prep for garbage collection.
      }
    }
  }]);

  return Plugin;
}();

// Convert PascalCase to kebab-case
// Thank you: http://stackoverflow.com/a/8955580


function hyphenate(str) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

function getPluginName(obj) {
  if (typeof obj.constructor.name !== 'undefined') {
    return hyphenate(obj.constructor.name);
  } else {
    return hyphenate(obj.className);
  }
}

exports.Plugin = Plugin;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(7);


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

var _whatInput = __webpack_require__(8);

var _whatInput2 = _interopRequireDefault(_whatInput);

__webpack_require__(9);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.$ = _jquery2.default;

// import Foundation from 'foundation-sites';

// If you want to pick and choose which modules to include, comment out the above and uncomment
// the line below


(0, _jquery2.default)(document).foundation();

(0, _jquery2.default)('.tab-inner').filter(':first').addClass('active-tab');
(0, _jquery2.default)('.ba-tab-circle').filter(':first').addClass('active-tab-circle');

(0, _jquery2.default)('.ba-symptoms-tabs .tab-inner').on('click', function (event) {
    var tab_id = (0, _jquery2.default)(this).attr('data-id');
    (0, _jquery2.default)('.ba-symptoms-content').find('.ba-tab-circle').removeClass('active-tab-circle').hide();
    (0, _jquery2.default)('.ba-symptoms-content').find('.tab-inner').removeClass('active-tab');
    (0, _jquery2.default)(this).addClass('active-tab');
    (0, _jquery2.default)('#tab-circle-' + tab_id).addClass('active-tab-circle').fadeIn();
    return false;
});

// Tabs

(0, _jquery2.default)('.tabs-title').filter(':first').addClass('is-active');
(0, _jquery2.default)('.tabs-title .ba-testimonial-cat-button').filter(':first').attr('aria-selected', true);

(0, _jquery2.default)('.ba-testimonial-cat-button').click(function () {
    _jquery2.default.getScript("/wp-content/themes/swedishbitter/loadmore.js", function (data, textStatus, jqxhr) {});
});

var testimonial_cat = void 0;

(0, _jquery2.default)(function () {
    (0, _jquery2.default)('.ba-testimonial-cat-button').click(function () {
        testimonial_cat = (0, _jquery2.default)(this).data('testimonials-cat');

        var data = {
            action: 'simple_testimonial_view',
            testimonialCat: testimonial_cat
        };
        _jquery2.default.post(ba_ajax, data, function (response) {
            (0, _jquery2.default)('.ba-testimonials-content__wrapper').html(response);
        });
    });
});

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * what-input - A global utility for tracking the current input method (mouse, keyboard or touch).
 * @version v4.3.1
 * @link https://github.com/ten1seven/what-input
 * @license MIT
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("whatInput", [], factory);
	else if(typeof exports === 'object')
		exports["whatInput"] = factory();
	else
		root["whatInput"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function () {
	  /*
	   * variables
	   */

	  // last used input type
	  var currentInput = 'initial';

	  // last used input intent
	  var currentIntent = null;

	  // cache document.documentElement
	  var doc = document.documentElement;

	  // form input types
	  var formInputs = ['input', 'select', 'textarea'];

	  var functionList = [];

	  // list of modifier keys commonly used with the mouse and
	  // can be safely ignored to prevent false keyboard detection
	  var ignoreMap = [16, // shift
	  17, // control
	  18, // alt
	  91, // Windows key / left Apple cmd
	  93 // Windows menu / right Apple cmd
	  ];

	  // list of keys for which we change intent even for form inputs
	  var changeIntentMap = [9 // tab
	  ];

	  // mapping of events to input types
	  var inputMap = {
	    keydown: 'keyboard',
	    keyup: 'keyboard',
	    mousedown: 'mouse',
	    mousemove: 'mouse',
	    MSPointerDown: 'pointer',
	    MSPointerMove: 'pointer',
	    pointerdown: 'pointer',
	    pointermove: 'pointer',
	    touchstart: 'touch'
	  };

	  // array of all used input types
	  var inputTypes = [];

	  // boolean: true if touch buffer is active
	  var isBuffering = false;

	  // boolean: true if the page is being scrolled
	  var isScrolling = false;

	  // store current mouse position
	  var mousePos = {
	    x: null,
	    y: null
	  };

	  // map of IE 10 pointer events
	  var pointerMap = {
	    2: 'touch',
	    3: 'touch', // treat pen like touch
	    4: 'mouse'
	  };

	  var supportsPassive = false;

	  try {
	    var opts = Object.defineProperty({}, 'passive', {
	      get: function get() {
	        supportsPassive = true;
	      }
	    });

	    window.addEventListener('test', null, opts);
	  } catch (e) {}

	  /*
	   * set up
	   */

	  var setUp = function setUp() {
	    // add correct mouse wheel event mapping to `inputMap`
	    inputMap[detectWheel()] = 'mouse';

	    addListeners();
	    setInput();
	  };

	  /*
	   * events
	   */

	  var addListeners = function addListeners() {
	    // `pointermove`, `MSPointerMove`, `mousemove` and mouse wheel event binding
	    // can only demonstrate potential, but not actual, interaction
	    // and are treated separately
	    var options = supportsPassive ? { passive: true } : false;

	    // pointer events (mouse, pen, touch)
	    if (window.PointerEvent) {
	      doc.addEventListener('pointerdown', updateInput);
	      doc.addEventListener('pointermove', setIntent);
	    } else if (window.MSPointerEvent) {
	      doc.addEventListener('MSPointerDown', updateInput);
	      doc.addEventListener('MSPointerMove', setIntent);
	    } else {
	      // mouse events
	      doc.addEventListener('mousedown', updateInput);
	      doc.addEventListener('mousemove', setIntent);

	      // touch events
	      if ('ontouchstart' in window) {
	        doc.addEventListener('touchstart', touchBuffer, options);
	        doc.addEventListener('touchend', touchBuffer);
	      }
	    }

	    // mouse wheel
	    doc.addEventListener(detectWheel(), setIntent, options);

	    // keyboard events
	    doc.addEventListener('keydown', updateInput);
	    doc.addEventListener('keyup', updateInput);
	  };

	  // checks conditions before updating new input
	  var updateInput = function updateInput(event) {
	    // only execute if the touch buffer timer isn't running
	    if (!isBuffering) {
	      var eventKey = event.which;
	      var value = inputMap[event.type];
	      if (value === 'pointer') value = pointerType(event);

	      if (currentInput !== value || currentIntent !== value) {
	        var activeElem = document.activeElement;
	        var activeInput = false;
	        var notFormInput = activeElem && activeElem.nodeName && formInputs.indexOf(activeElem.nodeName.toLowerCase()) === -1;

	        if (notFormInput || changeIntentMap.indexOf(eventKey) !== -1) {
	          activeInput = true;
	        }

	        if (value === 'touch' ||
	        // ignore mouse modifier keys
	        value === 'mouse' ||
	        // don't switch if the current element is a form input
	        value === 'keyboard' && eventKey && activeInput && ignoreMap.indexOf(eventKey) === -1) {
	          // set the current and catch-all variable
	          currentInput = currentIntent = value;

	          setInput();
	        }
	      }
	    }
	  };

	  // updates the doc and `inputTypes` array with new input
	  var setInput = function setInput() {
	    doc.setAttribute('data-whatinput', currentInput);
	    doc.setAttribute('data-whatintent', currentInput);

	    if (inputTypes.indexOf(currentInput) === -1) {
	      inputTypes.push(currentInput);
	      doc.className += ' whatinput-types-' + currentInput;
	    }

	    fireFunctions('input');
	  };

	  // updates input intent for `mousemove` and `pointermove`
	  var setIntent = function setIntent(event) {
	    // test to see if `mousemove` happened relative to the screen
	    // to detect scrolling versus mousemove
	    if (mousePos['x'] !== event.screenX || mousePos['y'] !== event.screenY) {
	      isScrolling = false;

	      mousePos['x'] = event.screenX;
	      mousePos['y'] = event.screenY;
	    } else {
	      isScrolling = true;
	    }

	    // only execute if the touch buffer timer isn't running
	    // or scrolling isn't happening
	    if (!isBuffering && !isScrolling) {
	      var value = inputMap[event.type];
	      if (value === 'pointer') value = pointerType(event);

	      if (currentIntent !== value) {
	        currentIntent = value;

	        doc.setAttribute('data-whatintent', currentIntent);

	        fireFunctions('intent');
	      }
	    }
	  };

	  // buffers touch events because they frequently also fire mouse events
	  var touchBuffer = function touchBuffer(event) {
	    if (event.type === 'touchstart') {
	      isBuffering = false;

	      // set the current input
	      updateInput(event);
	    } else {
	      isBuffering = true;
	    }
	  };

	  var fireFunctions = function fireFunctions(type) {
	    for (var i = 0, len = functionList.length; i < len; i++) {
	      if (functionList[i].type === type) {
	        functionList[i].fn.call(undefined, currentIntent);
	      }
	    }
	  };

	  /*
	   * utilities
	   */

	  var pointerType = function pointerType(event) {
	    if (typeof event.pointerType === 'number') {
	      return pointerMap[event.pointerType];
	    } else {
	      // treat pen like touch
	      return event.pointerType === 'pen' ? 'touch' : event.pointerType;
	    }
	  };

	  // detect version of mouse wheel event to use
	  // via https://developer.mozilla.org/en-US/docs/Web/Events/wheel
	  var detectWheel = function detectWheel() {
	    var wheelType = void 0;

	    // Modern browsers support "wheel"
	    if ('onwheel' in document.createElement('div')) {
	      wheelType = 'wheel';
	    } else {
	      // Webkit and IE support at least "mousewheel"
	      // or assume that remaining browsers are older Firefox
	      wheelType = document.onmousewheel !== undefined ? 'mousewheel' : 'DOMMouseScroll';
	    }

	    return wheelType;
	  };

	  var objPos = function objPos(match) {
	    for (var i = 0, len = functionList.length; i < len; i++) {
	      if (functionList[i].fn === match) {
	        return i;
	      }
	    }
	  };

	  /*
	   * init
	   */

	  // don't start script unless browser cuts the mustard
	  // (also passes if polyfills are used)
	  if ('addEventListener' in window && Array.prototype.indexOf) {
	    setUp();
	  }

	  /*
	   * api
	   */

	  return {
	    // returns string: the current input type
	    // opt: 'loose'|'strict'
	    // 'strict' (default): returns the same value as the `data-whatinput` attribute
	    // 'loose': includes `data-whatintent` value if it's more current than `data-whatinput`
	    ask: function ask(opt) {
	      return opt === 'loose' ? currentIntent : currentInput;
	    },

	    // returns array: all the detected input types
	    types: function types() {
	      return inputTypes;
	    },

	    // overwrites ignored keys with provided array
	    ignoreKeys: function ignoreKeys(arr) {
	      ignoreMap = arr;
	    },

	    // attach functions to input and intent "events"
	    // funct: function to fire on change
	    // eventType: 'input'|'intent'
	    registerOnChange: function registerOnChange(fn, eventType) {
	      functionList.push({
	        fn: fn,
	        type: eventType || 'input'
	      });
	    },

	    unRegisterOnChange: function unRegisterOnChange(fn) {
	      var position = objPos(fn);

	      if (position) {
	        functionList.splice(position, 1);
	      }
	    }
	  };
	}();

/***/ }
/******/ ])
});
;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

var _foundation = __webpack_require__(10);

var _foundationUtil = __webpack_require__(3);

var _foundationUtil2 = __webpack_require__(2);

var _foundationUtil3 = __webpack_require__(4);

var _foundation2 = __webpack_require__(12);

var _foundation3 = __webpack_require__(13);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { Toggler } from 'foundation-sites/js/foundation.toggler';
// import { Tooltip } from 'foundation-sites/js/foundation.tooltip';
// import { ResponsiveAccordionTabs } from 'foundation-sites/js/foundation.responsiveAccordionTabs';


// import { Abide } from 'foundation-sites/js/foundation.abide';
// import { Accordion } from 'foundation-sites/js/foundation.accordion';
// import { AccordionMenu } from 'foundation-sites/js/foundation.accordionMenu';
// import { Drilldown } from 'foundation-sites/js/foundation.drilldown';
// import { Dropdown } from 'foundation-sites/js/foundation.dropdown';
// import { DropdownMenu } from 'foundation-sites/js/foundation.dropdownMenu';
// import { Equalizer } from 'foundation-sites/js/foundation.equalizer';
// import { Interchange } from 'foundation-sites/js/foundation.interchange';
// import { Magellan } from 'foundation-sites/js/foundation.magellan';
_foundation.Foundation.addToJquery(_jquery2.default);

// Add Foundation Utils to Foundation global namespace for backwards
// compatibility.

// Foundation.rtl = rtl;
// Foundation.GetYoDigits = GetYoDigits;
// Foundation.transitionend = transitionend;
//
// Foundation.Box = Box;
// Foundation.onImagesLoaded = onImagesLoaded;

// import { Orbit } from 'foundation-sites/js/foundation.orbit';
// import { ResponsiveMenu } from 'foundation-sites/js/foundation.responsiveMenu';
// import { ResponsiveToggle } from 'foundation-sites/js/foundation.responsiveToggle';
// import { Reveal } from 'foundation-sites/js/foundation.reveal';
// import { Slider } from 'foundation-sites/js/foundation.slider';
// import { SmoothScroll } from 'foundation-sites/js/foundation.smoothScroll';
// import { Sticky } from 'foundation-sites/js/foundation.sticky';

// import { Motion, Move } from 'foundation-sites/js/foundation.util.motion';
// import { Nest } from 'foundation-sites/js/foundation.util.nest';
// import { Timer } from 'foundation-sites/js/foundation.util.timer';
// import { Touch } from 'foundation-sites/js/foundation.util.touch';

// import { rtl, GetYoDigits, transitionend } from 'foundation-sites/js/foundation.util.core';
// import { Box } from 'foundation-sites/js/foundation.util.box'
// import { onImagesLoaded } from 'foundation-sites/js/foundation.util.imageLoader';
_foundation.Foundation.Keyboard = _foundationUtil.Keyboard;
_foundation.Foundation.MediaQuery = _foundationUtil2.MediaQuery;
// Foundation.Motion = Motion;
// Foundation.Move = Move;
// Foundation.Nest = Nest;
// Foundation.Timer = Timer;

// Touch and Triggers previously were almost purely sede effect driven,
// so no // need to add it to Foundation, just init them.

// Touch.init($);

_foundationUtil3.Triggers.init(_jquery2.default, _foundation.Foundation);
//
// Foundation.plugin(Abide, 'Abide');
//
// Foundation.plugin(Accordion, 'Accordion');
//
// Foundation.plugin(AccordionMenu, 'AccordionMenu');
//
// Foundation.plugin(Drilldown, 'Drilldown');
//
// Foundation.plugin(Dropdown, 'Dropdown');
//
// Foundation.plugin(DropdownMenu, 'DropdownMenu');
//
// Foundation.plugin(Equalizer, 'Equalizer');
//
// Foundation.plugin(Interchange, 'Interchange');
//
// Foundation.plugin(Magellan, 'Magellan');
//
_foundation.Foundation.plugin(_foundation2.OffCanvas, 'OffCanvas');
//
// Foundation.plugin(Orbit, 'Orbit');
//
// Foundation.plugin(ResponsiveMenu, 'ResponsiveMenu');
//
// Foundation.plugin(ResponsiveToggle, 'ResponsiveToggle');
//
// Foundation.plugin(Reveal, 'Reveal');
//
// Foundation.plugin(Slider, 'Slider');
//
// Foundation.plugin(SmoothScroll, 'SmoothScroll');
//
// Foundation.plugin(Sticky, 'Sticky');
//
_foundation.Foundation.plugin(_foundation3.Tabs, 'Tabs');
//
// Foundation.plugin(Toggler, 'Toggler');
//
// Foundation.plugin(Tooltip, 'Tooltip');
//
// Foundation.plugin(ResponsiveAccordionTabs, 'ResponsiveAccordionTabs');

module.exports = _foundation.Foundation;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Foundation = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

var _foundationUtil = __webpack_require__(1);

var _foundationUtil2 = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FOUNDATION_VERSION = '6.4.3';

// Global Foundation object
// This is attached to the window, or used as a module for AMD/Browserify
var Foundation = {
  version: FOUNDATION_VERSION,

  /**
   * Stores initialized plugins.
   */
  _plugins: {},

  /**
   * Stores generated unique ids for plugin instances
   */
  _uuids: [],

  /**
   * Defines a Foundation plugin, adding it to the `Foundation` namespace and the list of plugins to initialize when reflowing.
   * @param {Object} plugin - The constructor of the plugin.
   */
  plugin: function plugin(_plugin, name) {
    // Object key to use when adding to global Foundation object
    // Examples: Foundation.Reveal, Foundation.OffCanvas
    var className = name || functionName(_plugin);
    // Object key to use when storing the plugin, also used to create the identifying data attribute for the plugin
    // Examples: data-reveal, data-off-canvas
    var attrName = hyphenate(className);

    // Add to the Foundation object and the plugins list (for reflowing)
    this._plugins[attrName] = this[className] = _plugin;
  },
  /**
   * @function
   * Populates the _uuids array with pointers to each individual plugin instance.
   * Adds the `zfPlugin` data-attribute to programmatically created plugins to allow use of $(selector).foundation(method) calls.
   * Also fires the initialization event for each plugin, consolidating repetitive code.
   * @param {Object} plugin - an instance of a plugin, usually `this` in context.
   * @param {String} name - the name of the plugin, passed as a camelCased string.
   * @fires Plugin#init
   */
  registerPlugin: function registerPlugin(plugin, name) {
    var pluginName = name ? hyphenate(name) : functionName(plugin.constructor).toLowerCase();
    plugin.uuid = (0, _foundationUtil.GetYoDigits)(6, pluginName);

    if (!plugin.$element.attr('data-' + pluginName)) {
      plugin.$element.attr('data-' + pluginName, plugin.uuid);
    }
    if (!plugin.$element.data('zfPlugin')) {
      plugin.$element.data('zfPlugin', plugin);
    }
    /**
     * Fires when the plugin has initialized.
     * @event Plugin#init
     */
    plugin.$element.trigger('init.zf.' + pluginName);

    this._uuids.push(plugin.uuid);

    return;
  },
  /**
   * @function
   * Removes the plugins uuid from the _uuids array.
   * Removes the zfPlugin data attribute, as well as the data-plugin-name attribute.
   * Also fires the destroyed event for the plugin, consolidating repetitive code.
   * @param {Object} plugin - an instance of a plugin, usually `this` in context.
   * @fires Plugin#destroyed
   */
  unregisterPlugin: function unregisterPlugin(plugin) {
    var pluginName = hyphenate(functionName(plugin.$element.data('zfPlugin').constructor));

    this._uuids.splice(this._uuids.indexOf(plugin.uuid), 1);
    plugin.$element.removeAttr('data-' + pluginName).removeData('zfPlugin')
    /**
     * Fires when the plugin has been destroyed.
     * @event Plugin#destroyed
     */
    .trigger('destroyed.zf.' + pluginName);
    for (var prop in plugin) {
      plugin[prop] = null; //clean up script to prep for garbage collection.
    }
    return;
  },

  /**
   * @function
   * Causes one or more active plugins to re-initialize, resetting event listeners, recalculating positions, etc.
   * @param {String} plugins - optional string of an individual plugin key, attained by calling `$(element).data('pluginName')`, or string of a plugin class i.e. `'dropdown'`
   * @default If no argument is passed, reflow all currently active plugins.
   */
  reInit: function reInit(plugins) {
    var isJQ = plugins instanceof _jquery2.default;
    try {
      if (isJQ) {
        plugins.each(function () {
          (0, _jquery2.default)(this).data('zfPlugin')._init();
        });
      } else {
        var type = typeof plugins === 'undefined' ? 'undefined' : _typeof(plugins),
            _this = this,
            fns = {
          'object': function object(plgs) {
            plgs.forEach(function (p) {
              p = hyphenate(p);
              (0, _jquery2.default)('[data-' + p + ']').foundation('_init');
            });
          },
          'string': function string() {
            plugins = hyphenate(plugins);
            (0, _jquery2.default)('[data-' + plugins + ']').foundation('_init');
          },
          'undefined': function undefined() {
            this['object'](Object.keys(_this._plugins));
          }
        };
        fns[type](plugins);
      }
    } catch (err) {
      console.error(err);
    } finally {
      return plugins;
    }
  },

  /**
   * Initialize plugins on any elements within `elem` (and `elem` itself) that aren't already initialized.
   * @param {Object} elem - jQuery object containing the element to check inside. Also checks the element itself, unless it's the `document` object.
   * @param {String|Array} plugins - A list of plugins to initialize. Leave this out to initialize everything.
   */
  reflow: function reflow(elem, plugins) {

    // If plugins is undefined, just grab everything
    if (typeof plugins === 'undefined') {
      plugins = Object.keys(this._plugins);
    }
    // If plugins is a string, convert it to an array with one item
    else if (typeof plugins === 'string') {
        plugins = [plugins];
      }

    var _this = this;

    // Iterate through each plugin
    _jquery2.default.each(plugins, function (i, name) {
      // Get the current plugin
      var plugin = _this._plugins[name];

      // Localize the search to all elements inside elem, as well as elem itself, unless elem === document
      var $elem = (0, _jquery2.default)(elem).find('[data-' + name + ']').addBack('[data-' + name + ']');

      // For each plugin found, initialize it
      $elem.each(function () {
        var $el = (0, _jquery2.default)(this),
            opts = {};
        // Don't double-dip on plugins
        if ($el.data('zfPlugin')) {
          console.warn("Tried to initialize " + name + " on an element that already has a Foundation plugin.");
          return;
        }

        if ($el.attr('data-options')) {
          var thing = $el.attr('data-options').split(';').forEach(function (e, i) {
            var opt = e.split(':').map(function (el) {
              return el.trim();
            });
            if (opt[0]) opts[opt[0]] = parseValue(opt[1]);
          });
        }
        try {
          $el.data('zfPlugin', new plugin((0, _jquery2.default)(this), opts));
        } catch (er) {
          console.error(er);
        } finally {
          return;
        }
      });
    });
  },
  getFnName: functionName,

  addToJquery: function addToJquery($) {
    // TODO: consider not making this a jQuery function
    // TODO: need way to reflow vs. re-initialize
    /**
     * The Foundation jQuery method.
     * @param {String|Array} method - An action to perform on the current jQuery object.
     */
    var foundation = function foundation(method) {
      var type = typeof method === 'undefined' ? 'undefined' : _typeof(method),
          $noJS = $('.no-js');

      if ($noJS.length) {
        $noJS.removeClass('no-js');
      }

      if (type === 'undefined') {
        //needs to initialize the Foundation object, or an individual plugin.
        _foundationUtil2.MediaQuery._init();
        Foundation.reflow(this);
      } else if (type === 'string') {
        //an individual method to invoke on a plugin or group of plugins
        var args = Array.prototype.slice.call(arguments, 1); //collect all the arguments, if necessary
        var plugClass = this.data('zfPlugin'); //determine the class of plugin

        if (plugClass !== undefined && plugClass[method] !== undefined) {
          //make sure both the class and method exist
          if (this.length === 1) {
            //if there's only one, call it directly.
            plugClass[method].apply(plugClass, args);
          } else {
            this.each(function (i, el) {
              //otherwise loop through the jQuery collection and invoke the method on each
              plugClass[method].apply($(el).data('zfPlugin'), args);
            });
          }
        } else {
          //error for no class or no method
          throw new ReferenceError("We're sorry, '" + method + "' is not an available method for " + (plugClass ? functionName(plugClass) : 'this element') + '.');
        }
      } else {
        //error for invalid argument type
        throw new TypeError('We\'re sorry, ' + type + ' is not a valid parameter. You must use a string representing the method you wish to invoke.');
      }
      return this;
    };
    $.fn.foundation = foundation;
    return $;
  }
};

Foundation.util = {
  /**
   * Function for applying a debounce effect to a function call.
   * @function
   * @param {Function} func - Function to be called at end of timeout.
   * @param {Number} delay - Time in ms to delay the call of `func`.
   * @returns function
   */
  throttle: function throttle(func, delay) {
    var timer = null;

    return function () {
      var context = this,
          args = arguments;

      if (timer === null) {
        timer = setTimeout(function () {
          func.apply(context, args);
          timer = null;
        }, delay);
      }
    };
  }
};

window.Foundation = Foundation;

// Polyfill for requestAnimationFrame
(function () {
  if (!Date.now || !window.Date.now) window.Date.now = Date.now = function () {
    return new Date().getTime();
  };

  var vendors = ['webkit', 'moz'];
  for (var i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
    var vp = vendors[i];
    window.requestAnimationFrame = window[vp + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vp + 'CancelAnimationFrame'] || window[vp + 'CancelRequestAnimationFrame'];
  }
  if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
    var lastTime = 0;
    window.requestAnimationFrame = function (callback) {
      var now = Date.now();
      var nextTime = Math.max(lastTime + 16, now);
      return setTimeout(function () {
        callback(lastTime = nextTime);
      }, nextTime - now);
    };
    window.cancelAnimationFrame = clearTimeout;
  }
  /**
   * Polyfill for performance.now, required by rAF
   */
  if (!window.performance || !window.performance.now) {
    window.performance = {
      start: Date.now(),
      now: function now() {
        return Date.now() - this.start;
      }
    };
  }
})();
if (!Function.prototype.bind) {
  Function.prototype.bind = function (oThis) {
    if (typeof this !== 'function') {
      // closest thing possible to the ECMAScript 5
      // internal IsCallable function
      throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
    }

    var aArgs = Array.prototype.slice.call(arguments, 1),
        fToBind = this,
        fNOP = function fNOP() {},
        fBound = function fBound() {
      return fToBind.apply(this instanceof fNOP ? this : oThis, aArgs.concat(Array.prototype.slice.call(arguments)));
    };

    if (this.prototype) {
      // native functions don't have a prototype
      fNOP.prototype = this.prototype;
    }
    fBound.prototype = new fNOP();

    return fBound;
  };
}
// Polyfill to get the name of a function in IE9
function functionName(fn) {
  if (Function.prototype.name === undefined) {
    var funcNameRegex = /function\s([^(]{1,})\(/;
    var results = funcNameRegex.exec(fn.toString());
    return results && results.length > 1 ? results[1].trim() : "";
  } else if (fn.prototype === undefined) {
    return fn.constructor.name;
  } else {
    return fn.prototype.constructor.name;
  }
}
function parseValue(str) {
  if ('true' === str) return true;else if ('false' === str) return false;else if (!isNaN(str * 1)) return parseFloat(str);
  return str;
}
// Convert PascalCase to kebab-case
// Thank you: http://stackoverflow.com/a/8955580
function hyphenate(str) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

exports.Foundation = Foundation;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Motion = exports.Move = undefined;

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

var _foundationUtil = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Motion module.
 * @module foundation.motion
 */

var initClasses = ['mui-enter', 'mui-leave'];
var activeClasses = ['mui-enter-active', 'mui-leave-active'];

var Motion = {
  animateIn: function animateIn(element, animation, cb) {
    animate(true, element, animation, cb);
  },

  animateOut: function animateOut(element, animation, cb) {
    animate(false, element, animation, cb);
  }
};

function Move(duration, elem, fn) {
  var anim,
      prog,
      start = null;
  // console.log('called');

  if (duration === 0) {
    fn.apply(elem);
    elem.trigger('finished.zf.animate', [elem]).triggerHandler('finished.zf.animate', [elem]);
    return;
  }

  function move(ts) {
    if (!start) start = ts;
    // console.log(start, ts);
    prog = ts - start;
    fn.apply(elem);

    if (prog < duration) {
      anim = window.requestAnimationFrame(move, elem);
    } else {
      window.cancelAnimationFrame(anim);
      elem.trigger('finished.zf.animate', [elem]).triggerHandler('finished.zf.animate', [elem]);
    }
  }
  anim = window.requestAnimationFrame(move);
}

/**
 * Animates an element in or out using a CSS transition class.
 * @function
 * @private
 * @param {Boolean} isIn - Defines if the animation is in or out.
 * @param {Object} element - jQuery or HTML object to animate.
 * @param {String} animation - CSS class to use.
 * @param {Function} cb - Callback to run when animation is finished.
 */
function animate(isIn, element, animation, cb) {
  element = (0, _jquery2.default)(element).eq(0);

  if (!element.length) return;

  var initClass = isIn ? initClasses[0] : initClasses[1];
  var activeClass = isIn ? activeClasses[0] : activeClasses[1];

  // Set up the animation
  reset();

  element.addClass(animation).css('transition', 'none');

  requestAnimationFrame(function () {
    element.addClass(initClass);
    if (isIn) element.show();
  });

  // Start the animation
  requestAnimationFrame(function () {
    element[0].offsetWidth;
    element.css('transition', '').addClass(activeClass);
  });

  // Clean up the animation when it finishes
  element.one((0, _foundationUtil.transitionend)(element), finish);

  // Hides the element (for out animations), resets the element, and runs a callback
  function finish() {
    if (!isIn) element.hide();
    reset();
    if (cb) cb.apply(element);
  }

  // Resets transitions and removes motion-specific classes
  function reset() {
    element[0].style.transitionDuration = 0;
    element.removeClass(initClass + ' ' + activeClass + ' ' + animation);
  }
}

exports.Move = Move;
exports.Motion = Motion;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OffCanvas = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

var _foundationUtil = __webpack_require__(3);

var _foundationUtil2 = __webpack_require__(2);

var _foundationUtil3 = __webpack_require__(1);

var _foundation = __webpack_require__(5);

var _foundationUtil4 = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * OffCanvas module.
 * @module foundation.offcanvas
 * @requires foundation.util.keyboard
 * @requires foundation.util.mediaQuery
 * @requires foundation.util.triggers
 */

var OffCanvas = function (_Plugin) {
  _inherits(OffCanvas, _Plugin);

  function OffCanvas() {
    _classCallCheck(this, OffCanvas);

    return _possibleConstructorReturn(this, (OffCanvas.__proto__ || Object.getPrototypeOf(OffCanvas)).apply(this, arguments));
  }

  _createClass(OffCanvas, [{
    key: '_setup',

    /**
     * Creates a new instance of an off-canvas wrapper.
     * @class
     * @name OffCanvas
     * @fires OffCanvas#init
     * @param {Object} element - jQuery object to initialize.
     * @param {Object} options - Overrides to the default plugin settings.
     */
    value: function _setup(element, options) {
      var _this3 = this;

      this.className = 'OffCanvas'; // ie9 back compat
      this.$element = element;
      this.options = _jquery2.default.extend({}, OffCanvas.defaults, this.$element.data(), options);
      this.contentClasses = { base: [], reveal: [] };
      this.$lastTrigger = (0, _jquery2.default)();
      this.$triggers = (0, _jquery2.default)();
      this.position = 'left';
      this.$content = (0, _jquery2.default)();
      this.nested = !!this.options.nested;

      // Defines the CSS transition/position classes of the off-canvas content container.
      (0, _jquery2.default)(['push', 'overlap']).each(function (index, val) {
        _this3.contentClasses.base.push('has-transition-' + val);
      });
      (0, _jquery2.default)(['left', 'right', 'top', 'bottom']).each(function (index, val) {
        _this3.contentClasses.base.push('has-position-' + val);
        _this3.contentClasses.reveal.push('has-reveal-' + val);
      });

      // Triggers init is idempotent, just need to make sure it is initialized
      _foundationUtil4.Triggers.init(_jquery2.default);
      _foundationUtil2.MediaQuery._init();

      this._init();
      this._events();

      _foundationUtil.Keyboard.register('OffCanvas', {
        'ESCAPE': 'close'
      });
    }

    /**
     * Initializes the off-canvas wrapper by adding the exit overlay (if needed).
     * @function
     * @private
     */

  }, {
    key: '_init',
    value: function _init() {
      var id = this.$element.attr('id');

      this.$element.attr('aria-hidden', 'true');

      // Find off-canvas content, either by ID (if specified), by siblings or by closest selector (fallback)
      if (this.options.contentId) {
        this.$content = (0, _jquery2.default)('#' + this.options.contentId);
      } else if (this.$element.siblings('[data-off-canvas-content]').length) {
        this.$content = this.$element.siblings('[data-off-canvas-content]').first();
      } else {
        this.$content = this.$element.closest('[data-off-canvas-content]').first();
      }

      if (!this.options.contentId) {
        // Assume that the off-canvas element is nested if it isn't a sibling of the content
        this.nested = this.$element.siblings('[data-off-canvas-content]').length === 0;
      } else if (this.options.contentId && this.options.nested === null) {
        // Warning if using content ID without setting the nested option
        // Once the element is nested it is required to work properly in this case
        console.warn('Remember to use the nested option if using the content ID option!');
      }

      if (this.nested === true) {
        // Force transition overlap if nested
        this.options.transition = 'overlap';
        // Remove appropriate classes if already assigned in markup
        this.$element.removeClass('is-transition-push');
      }

      this.$element.addClass('is-transition-' + this.options.transition + ' is-closed');

      // Find triggers that affect this element and add aria-expanded to them
      this.$triggers = (0, _jquery2.default)(document).find('[data-open="' + id + '"], [data-close="' + id + '"], [data-toggle="' + id + '"]').attr('aria-expanded', 'false').attr('aria-controls', id);

      // Get position by checking for related CSS class
      this.position = this.$element.is('.position-left, .position-top, .position-right, .position-bottom') ? this.$element.attr('class').match(/position\-(left|top|right|bottom)/)[1] : this.position;

      // Add an overlay over the content if necessary
      if (this.options.contentOverlay === true) {
        var overlay = document.createElement('div');
        var overlayPosition = (0, _jquery2.default)(this.$element).css("position") === 'fixed' ? 'is-overlay-fixed' : 'is-overlay-absolute';
        overlay.setAttribute('class', 'js-off-canvas-overlay ' + overlayPosition);
        this.$overlay = (0, _jquery2.default)(overlay);
        if (overlayPosition === 'is-overlay-fixed') {
          (0, _jquery2.default)(this.$overlay).insertAfter(this.$element);
        } else {
          this.$content.append(this.$overlay);
        }
      }

      this.options.isRevealed = this.options.isRevealed || new RegExp(this.options.revealClass, 'g').test(this.$element[0].className);

      if (this.options.isRevealed === true) {
        this.options.revealOn = this.options.revealOn || this.$element[0].className.match(/(reveal-for-medium|reveal-for-large)/g)[0].split('-')[2];
        this._setMQChecker();
      }

      if (this.options.transitionTime) {
        this.$element.css('transition-duration', this.options.transitionTime);
      }

      // Initally remove all transition/position CSS classes from off-canvas content container.
      this._removeContentClasses();
    }

    /**
     * Adds event handlers to the off-canvas wrapper and the exit overlay.
     * @function
     * @private
     */

  }, {
    key: '_events',
    value: function _events() {
      this.$element.off('.zf.trigger .zf.offcanvas').on({
        'open.zf.trigger': this.open.bind(this),
        'close.zf.trigger': this.close.bind(this),
        'toggle.zf.trigger': this.toggle.bind(this),
        'keydown.zf.offcanvas': this._handleKeyboard.bind(this)
      });

      if (this.options.closeOnClick === true) {
        var $target = this.options.contentOverlay ? this.$overlay : this.$content;
        $target.on({ 'click.zf.offcanvas': this.close.bind(this) });
      }
    }

    /**
     * Applies event listener for elements that will reveal at certain breakpoints.
     * @private
     */

  }, {
    key: '_setMQChecker',
    value: function _setMQChecker() {
      var _this = this;

      (0, _jquery2.default)(window).on('changed.zf.mediaquery', function () {
        if (_foundationUtil2.MediaQuery.atLeast(_this.options.revealOn)) {
          _this.reveal(true);
        } else {
          _this.reveal(false);
        }
      }).one('load.zf.offcanvas', function () {
        if (_foundationUtil2.MediaQuery.atLeast(_this.options.revealOn)) {
          _this.reveal(true);
        }
      });
    }

    /**
     * Removes the CSS transition/position classes of the off-canvas content container.
     * Removing the classes is important when another off-canvas gets opened that uses the same content container.
     * @param {Boolean} hasReveal - true if related off-canvas element is revealed.
     * @private
     */

  }, {
    key: '_removeContentClasses',
    value: function _removeContentClasses(hasReveal) {
      if (typeof hasReveal !== 'boolean') {
        this.$content.removeClass(this.contentClasses.base.join(' '));
      } else if (hasReveal === false) {
        this.$content.removeClass('has-reveal-' + this.position);
      }
    }

    /**
     * Adds the CSS transition/position classes of the off-canvas content container, based on the opening off-canvas element.
     * Beforehand any transition/position class gets removed.
     * @param {Boolean} hasReveal - true if related off-canvas element is revealed.
     * @private
     */

  }, {
    key: '_addContentClasses',
    value: function _addContentClasses(hasReveal) {
      this._removeContentClasses(hasReveal);
      if (typeof hasReveal !== 'boolean') {
        this.$content.addClass('has-transition-' + this.options.transition + ' has-position-' + this.position);
      } else if (hasReveal === true) {
        this.$content.addClass('has-reveal-' + this.position);
      }
    }

    /**
     * Handles the revealing/hiding the off-canvas at breakpoints, not the same as open.
     * @param {Boolean} isRevealed - true if element should be revealed.
     * @function
     */

  }, {
    key: 'reveal',
    value: function reveal(isRevealed) {
      if (isRevealed) {
        this.close();
        this.isRevealed = true;
        this.$element.attr('aria-hidden', 'false');
        this.$element.off('open.zf.trigger toggle.zf.trigger');
        this.$element.removeClass('is-closed');
      } else {
        this.isRevealed = false;
        this.$element.attr('aria-hidden', 'true');
        this.$element.off('open.zf.trigger toggle.zf.trigger').on({
          'open.zf.trigger': this.open.bind(this),
          'toggle.zf.trigger': this.toggle.bind(this)
        });
        this.$element.addClass('is-closed');
      }
      this._addContentClasses(isRevealed);
    }

    /**
     * Stops scrolling of the body when offcanvas is open on mobile Safari and other troublesome browsers.
     * @private
     */

  }, {
    key: '_stopScrolling',
    value: function _stopScrolling(event) {
      return false;
    }

    // Taken and adapted from http://stackoverflow.com/questions/16889447/prevent-full-page-scrolling-ios
    // Only really works for y, not sure how to extend to x or if we need to.

  }, {
    key: '_recordScrollable',
    value: function _recordScrollable(event) {
      var elem = this; // called from event handler context with this as elem

      // If the element is scrollable (content overflows), then...
      if (elem.scrollHeight !== elem.clientHeight) {
        // If we're at the top, scroll down one pixel to allow scrolling up
        if (elem.scrollTop === 0) {
          elem.scrollTop = 1;
        }
        // If we're at the bottom, scroll up one pixel to allow scrolling down
        if (elem.scrollTop === elem.scrollHeight - elem.clientHeight) {
          elem.scrollTop = elem.scrollHeight - elem.clientHeight - 1;
        }
      }
      elem.allowUp = elem.scrollTop > 0;
      elem.allowDown = elem.scrollTop < elem.scrollHeight - elem.clientHeight;
      elem.lastY = event.originalEvent.pageY;
    }
  }, {
    key: '_stopScrollPropagation',
    value: function _stopScrollPropagation(event) {
      var elem = this; // called from event handler context with this as elem
      var up = event.pageY < elem.lastY;
      var down = !up;
      elem.lastY = event.pageY;

      if (up && elem.allowUp || down && elem.allowDown) {
        event.stopPropagation();
      } else {
        event.preventDefault();
      }
    }

    /**
     * Opens the off-canvas menu.
     * @function
     * @param {Object} event - Event object passed from listener.
     * @param {jQuery} trigger - element that triggered the off-canvas to open.
     * @fires OffCanvas#opened
     */

  }, {
    key: 'open',
    value: function open(event, trigger) {
      if (this.$element.hasClass('is-open') || this.isRevealed) {
        return;
      }
      var _this = this;

      if (trigger) {
        this.$lastTrigger = trigger;
      }

      if (this.options.forceTo === 'top') {
        window.scrollTo(0, 0);
      } else if (this.options.forceTo === 'bottom') {
        window.scrollTo(0, document.body.scrollHeight);
      }

      if (this.options.transitionTime && this.options.transition !== 'overlap') {
        this.$element.siblings('[data-off-canvas-content]').css('transition-duration', this.options.transitionTime);
      } else {
        this.$element.siblings('[data-off-canvas-content]').css('transition-duration', '');
      }

      /**
       * Fires when the off-canvas menu opens.
       * @event OffCanvas#opened
       */
      this.$element.addClass('is-open').removeClass('is-closed');

      this.$triggers.attr('aria-expanded', 'true');
      this.$element.attr('aria-hidden', 'false').trigger('opened.zf.offcanvas');

      this.$content.addClass('is-open-' + this.position);

      // If `contentScroll` is set to false, add class and disable scrolling on touch devices.
      if (this.options.contentScroll === false) {
        (0, _jquery2.default)('body').addClass('is-off-canvas-open').on('touchmove', this._stopScrolling);
        this.$element.on('touchstart', this._recordScrollable);
        this.$element.on('touchmove', this._stopScrollPropagation);
      }

      if (this.options.contentOverlay === true) {
        this.$overlay.addClass('is-visible');
      }

      if (this.options.closeOnClick === true && this.options.contentOverlay === true) {
        this.$overlay.addClass('is-closable');
      }

      if (this.options.autoFocus === true) {
        this.$element.one((0, _foundationUtil3.transitionend)(this.$element), function () {
          if (!_this.$element.hasClass('is-open')) {
            return; // exit if prematurely closed
          }
          var canvasFocus = _this.$element.find('[data-autofocus]');
          if (canvasFocus.length) {
            canvasFocus.eq(0).focus();
          } else {
            _this.$element.find('a, button').eq(0).focus();
          }
        });
      }

      if (this.options.trapFocus === true) {
        this.$content.attr('tabindex', '-1');
        _foundationUtil.Keyboard.trapFocus(this.$element);
      }

      this._addContentClasses();
    }

    /**
     * Closes the off-canvas menu.
     * @function
     * @param {Function} cb - optional cb to fire after closure.
     * @fires OffCanvas#closed
     */

  }, {
    key: 'close',
    value: function close(cb) {
      if (!this.$element.hasClass('is-open') || this.isRevealed) {
        return;
      }

      var _this = this;

      this.$element.removeClass('is-open');

      this.$element.attr('aria-hidden', 'true')
      /**
       * Fires when the off-canvas menu opens.
       * @event OffCanvas#closed
       */
      .trigger('closed.zf.offcanvas');

      this.$content.removeClass('is-open-left is-open-top is-open-right is-open-bottom');

      // If `contentScroll` is set to false, remove class and re-enable scrolling on touch devices.
      if (this.options.contentScroll === false) {
        (0, _jquery2.default)('body').removeClass('is-off-canvas-open').off('touchmove', this._stopScrolling);
        this.$element.off('touchstart', this._recordScrollable);
        this.$element.off('touchmove', this._stopScrollPropagation);
      }

      if (this.options.contentOverlay === true) {
        this.$overlay.removeClass('is-visible');
      }

      if (this.options.closeOnClick === true && this.options.contentOverlay === true) {
        this.$overlay.removeClass('is-closable');
      }

      this.$triggers.attr('aria-expanded', 'false');

      if (this.options.trapFocus === true) {
        this.$content.removeAttr('tabindex');
        _foundationUtil.Keyboard.releaseFocus(this.$element);
      }

      // Listen to transitionEnd and add class when done.
      this.$element.one((0, _foundationUtil3.transitionend)(this.$element), function (e) {
        _this.$element.addClass('is-closed');
        _this._removeContentClasses();
      });
    }

    /**
     * Toggles the off-canvas menu open or closed.
     * @function
     * @param {Object} event - Event object passed from listener.
     * @param {jQuery} trigger - element that triggered the off-canvas to open.
     */

  }, {
    key: 'toggle',
    value: function toggle(event, trigger) {
      if (this.$element.hasClass('is-open')) {
        this.close(event, trigger);
      } else {
        this.open(event, trigger);
      }
    }

    /**
     * Handles keyboard input when detected. When the escape key is pressed, the off-canvas menu closes, and focus is restored to the element that opened the menu.
     * @function
     * @private
     */

  }, {
    key: '_handleKeyboard',
    value: function _handleKeyboard(e) {
      var _this4 = this;

      _foundationUtil.Keyboard.handleKey(e, 'OffCanvas', {
        close: function close() {
          _this4.close();
          _this4.$lastTrigger.focus();
          return true;
        },
        handled: function handled() {
          e.stopPropagation();
          e.preventDefault();
        }
      });
    }

    /**
     * Destroys the offcanvas plugin.
     * @function
     */

  }, {
    key: '_destroy',
    value: function _destroy() {
      this.close();
      this.$element.off('.zf.trigger .zf.offcanvas');
      this.$overlay.off('.zf.offcanvas');
    }
  }]);

  return OffCanvas;
}(_foundation.Plugin);

OffCanvas.defaults = {
  /**
   * Allow the user to click outside of the menu to close it.
   * @option
   * @type {boolean}
   * @default true
   */
  closeOnClick: true,

  /**
   * Adds an overlay on top of `[data-off-canvas-content]`.
   * @option
   * @type {boolean}
   * @default true
   */
  contentOverlay: true,

  /**
   * Target an off-canvas content container by ID that may be placed anywhere. If null the closest content container will be taken.
   * @option
   * @type {?string}
   * @default null
   */
  contentId: null,

  /**
   * Define the off-canvas element is nested in an off-canvas content. This is required when using the contentId option for a nested element.
   * @option
   * @type {boolean}
   * @default null
   */
  nested: null,

  /**
   * Enable/disable scrolling of the main content when an off canvas panel is open.
   * @option
   * @type {boolean}
   * @default true
   */
  contentScroll: true,

  /**
   * Amount of time in ms the open and close transition requires. If none selected, pulls from body style.
   * @option
   * @type {number}
   * @default null
   */
  transitionTime: null,

  /**
   * Type of transition for the offcanvas menu. Options are 'push', 'detached' or 'slide'.
   * @option
   * @type {string}
   * @default push
   */
  transition: 'push',

  /**
   * Force the page to scroll to top or bottom on open.
   * @option
   * @type {?string}
   * @default null
   */
  forceTo: null,

  /**
   * Allow the offcanvas to remain open for certain breakpoints.
   * @option
   * @type {boolean}
   * @default false
   */
  isRevealed: false,

  /**
   * Breakpoint at which to reveal. JS will use a RegExp to target standard classes, if changing classnames, pass your class with the `revealClass` option.
   * @option
   * @type {?string}
   * @default null
   */
  revealOn: null,

  /**
   * Force focus to the offcanvas on open. If true, will focus the opening trigger on close.
   * @option
   * @type {boolean}
   * @default true
   */
  autoFocus: true,

  /**
   * Class used to force an offcanvas to remain open. Foundation defaults for this are `reveal-for-large` & `reveal-for-medium`.
   * @option
   * @type {string}
   * @default reveal-for-
   * @todo improve the regex testing for this.
   */
  revealClass: 'reveal-for-',

  /**
   * Triggers optional focus trapping when opening an offcanvas. Sets tabindex of [data-off-canvas-content] to -1 for accessibility purposes.
   * @option
   * @type {boolean}
   * @default false
   */
  trapFocus: false
};

exports.OffCanvas = OffCanvas;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tabs = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

var _foundationUtil = __webpack_require__(3);

var _foundationUtil2 = __webpack_require__(14);

var _foundation = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Tabs module.
 * @module foundation.tabs
 * @requires foundation.util.keyboard
 * @requires foundation.util.imageLoader if tabs contain images
 */

var Tabs = function (_Plugin) {
  _inherits(Tabs, _Plugin);

  function Tabs() {
    _classCallCheck(this, Tabs);

    return _possibleConstructorReturn(this, (Tabs.__proto__ || Object.getPrototypeOf(Tabs)).apply(this, arguments));
  }

  _createClass(Tabs, [{
    key: '_setup',

    /**
     * Creates a new instance of tabs.
     * @class
     * @name Tabs
     * @fires Tabs#init
     * @param {jQuery} element - jQuery object to make into tabs.
     * @param {Object} options - Overrides to the default plugin settings.
     */
    value: function _setup(element, options) {
      this.$element = element;
      this.options = _jquery2.default.extend({}, Tabs.defaults, this.$element.data(), options);
      this.className = 'Tabs'; // ie9 back compat

      this._init();
      _foundationUtil.Keyboard.register('Tabs', {
        'ENTER': 'open',
        'SPACE': 'open',
        'ARROW_RIGHT': 'next',
        'ARROW_UP': 'previous',
        'ARROW_DOWN': 'next',
        'ARROW_LEFT': 'previous'
        // 'TAB': 'next',
        // 'SHIFT_TAB': 'previous'
      });
    }

    /**
     * Initializes the tabs by showing and focusing (if autoFocus=true) the preset active tab.
     * @private
     */

  }, {
    key: '_init',
    value: function _init() {
      var _this3 = this;

      var _this = this;

      this.$element.attr({ 'role': 'tablist' });
      this.$tabTitles = this.$element.find('.' + this.options.linkClass);
      this.$tabContent = (0, _jquery2.default)('[data-tabs-content="' + this.$element[0].id + '"]');

      this.$tabTitles.each(function () {
        var $elem = (0, _jquery2.default)(this),
            $link = $elem.find('a'),
            isActive = $elem.hasClass('' + _this.options.linkActiveClass),
            hash = $link.attr('data-tabs-target') || $link[0].hash.slice(1),
            linkId = $link[0].id ? $link[0].id : hash + '-label',
            $tabContent = (0, _jquery2.default)('#' + hash);

        $elem.attr({ 'role': 'presentation' });

        $link.attr({
          'role': 'tab',
          'aria-controls': hash,
          'aria-selected': isActive,
          'id': linkId,
          'tabindex': isActive ? '0' : '-1'
        });

        $tabContent.attr({
          'role': 'tabpanel',
          'aria-labelledby': linkId
        });

        if (!isActive) {
          $tabContent.attr('aria-hidden', 'true');
        }

        if (isActive && _this.options.autoFocus) {
          (0, _jquery2.default)(window).load(function () {
            (0, _jquery2.default)('html, body').animate({ scrollTop: $elem.offset().top }, _this.options.deepLinkSmudgeDelay, function () {
              $link.focus();
            });
          });
        }
      });
      if (this.options.matchHeight) {
        var $images = this.$tabContent.find('img');

        if ($images.length) {
          (0, _foundationUtil2.onImagesLoaded)($images, this._setHeight.bind(this));
        } else {
          this._setHeight();
        }
      }

      //current context-bound function to open tabs on page load or history popstate
      this._checkDeepLink = function () {
        var anchor = window.location.hash;
        //need a hash and a relevant anchor in this tabset
        if (anchor.length) {
          var $link = _this3.$element.find('[href$="' + anchor + '"]');
          if ($link.length) {
            _this3.selectTab((0, _jquery2.default)(anchor), true);

            //roll up a little to show the titles
            if (_this3.options.deepLinkSmudge) {
              var offset = _this3.$element.offset();
              (0, _jquery2.default)('html, body').animate({ scrollTop: offset.top }, _this3.options.deepLinkSmudgeDelay);
            }

            /**
              * Fires when the zplugin has deeplinked at pageload
              * @event Tabs#deeplink
              */
            _this3.$element.trigger('deeplink.zf.tabs', [$link, (0, _jquery2.default)(anchor)]);
          }
        }
      };

      //use browser to open a tab, if it exists in this tabset
      if (this.options.deepLink) {
        this._checkDeepLink();
      }

      this._events();
    }

    /**
     * Adds event handlers for items within the tabs.
     * @private
     */

  }, {
    key: '_events',
    value: function _events() {
      this._addKeyHandler();
      this._addClickHandler();
      this._setHeightMqHandler = null;

      if (this.options.matchHeight) {
        this._setHeightMqHandler = this._setHeight.bind(this);

        (0, _jquery2.default)(window).on('changed.zf.mediaquery', this._setHeightMqHandler);
      }

      if (this.options.deepLink) {
        (0, _jquery2.default)(window).on('popstate', this._checkDeepLink);
      }
    }

    /**
     * Adds click handlers for items within the tabs.
     * @private
     */

  }, {
    key: '_addClickHandler',
    value: function _addClickHandler() {
      var _this = this;

      this.$element.off('click.zf.tabs').on('click.zf.tabs', '.' + this.options.linkClass, function (e) {
        e.preventDefault();
        e.stopPropagation();
        _this._handleTabChange((0, _jquery2.default)(this));
      });
    }

    /**
     * Adds keyboard event handlers for items within the tabs.
     * @private
     */

  }, {
    key: '_addKeyHandler',
    value: function _addKeyHandler() {
      var _this = this;

      this.$tabTitles.off('keydown.zf.tabs').on('keydown.zf.tabs', function (e) {
        if (e.which === 9) return;

        var $element = (0, _jquery2.default)(this),
            $elements = $element.parent('ul').children('li'),
            $prevElement,
            $nextElement;

        $elements.each(function (i) {
          if ((0, _jquery2.default)(this).is($element)) {
            if (_this.options.wrapOnKeys) {
              $prevElement = i === 0 ? $elements.last() : $elements.eq(i - 1);
              $nextElement = i === $elements.length - 1 ? $elements.first() : $elements.eq(i + 1);
            } else {
              $prevElement = $elements.eq(Math.max(0, i - 1));
              $nextElement = $elements.eq(Math.min(i + 1, $elements.length - 1));
            }
            return;
          }
        });

        // handle keyboard event with keyboard util
        _foundationUtil.Keyboard.handleKey(e, 'Tabs', {
          open: function open() {
            $element.find('[role="tab"]').focus();
            _this._handleTabChange($element);
          },
          previous: function previous() {
            $prevElement.find('[role="tab"]').focus();
            _this._handleTabChange($prevElement);
          },
          next: function next() {
            $nextElement.find('[role="tab"]').focus();
            _this._handleTabChange($nextElement);
          },
          handled: function handled() {
            e.stopPropagation();
            e.preventDefault();
          }
        });
      });
    }

    /**
     * Opens the tab `$targetContent` defined by `$target`. Collapses active tab.
     * @param {jQuery} $target - Tab to open.
     * @param {boolean} historyHandled - browser has already handled a history update
     * @fires Tabs#change
     * @function
     */

  }, {
    key: '_handleTabChange',
    value: function _handleTabChange($target, historyHandled) {

      /**
       * Check for active class on target. Collapse if exists.
       */
      if ($target.hasClass('' + this.options.linkActiveClass)) {
        if (this.options.activeCollapse) {
          this._collapseTab($target);

          /**
           * Fires when the zplugin has successfully collapsed tabs.
           * @event Tabs#collapse
           */
          this.$element.trigger('collapse.zf.tabs', [$target]);
        }
        return;
      }

      var $oldTab = this.$element.find('.' + this.options.linkClass + '.' + this.options.linkActiveClass),
          $tabLink = $target.find('[role="tab"]'),
          hash = $tabLink.attr('data-tabs-target') || $tabLink[0].hash.slice(1),
          $targetContent = this.$tabContent.find('#' + hash);

      //close old tab
      this._collapseTab($oldTab);

      //open new tab
      this._openTab($target);

      //either replace or update browser history
      if (this.options.deepLink && !historyHandled) {
        var anchor = $target.find('a').attr('href');

        if (this.options.updateHistory) {
          history.pushState({}, '', anchor);
        } else {
          history.replaceState({}, '', anchor);
        }
      }

      /**
       * Fires when the plugin has successfully changed tabs.
       * @event Tabs#change
       */
      this.$element.trigger('change.zf.tabs', [$target, $targetContent]);

      //fire to children a mutation event
      $targetContent.find("[data-mutate]").trigger("mutateme.zf.trigger");
    }

    /**
     * Opens the tab `$targetContent` defined by `$target`.
     * @param {jQuery} $target - Tab to Open.
     * @function
     */

  }, {
    key: '_openTab',
    value: function _openTab($target) {
      var $tabLink = $target.find('[role="tab"]'),
          hash = $tabLink.attr('data-tabs-target') || $tabLink[0].hash.slice(1),
          $targetContent = this.$tabContent.find('#' + hash);

      $target.addClass('' + this.options.linkActiveClass);

      $tabLink.attr({
        'aria-selected': 'true',
        'tabindex': '0'
      });

      $targetContent.addClass('' + this.options.panelActiveClass).removeAttr('aria-hidden');
    }

    /**
     * Collapses `$targetContent` defined by `$target`.
     * @param {jQuery} $target - Tab to Open.
     * @function
     */

  }, {
    key: '_collapseTab',
    value: function _collapseTab($target) {
      var $target_anchor = $target.removeClass('' + this.options.linkActiveClass).find('[role="tab"]').attr({
        'aria-selected': 'false',
        'tabindex': -1
      });

      (0, _jquery2.default)('#' + $target_anchor.attr('aria-controls')).removeClass('' + this.options.panelActiveClass).attr({ 'aria-hidden': 'true' });
    }

    /**
     * Public method for selecting a content pane to display.
     * @param {jQuery | String} elem - jQuery object or string of the id of the pane to display.
     * @param {boolean} historyHandled - browser has already handled a history update
     * @function
     */

  }, {
    key: 'selectTab',
    value: function selectTab(elem, historyHandled) {
      var idStr;

      if ((typeof elem === 'undefined' ? 'undefined' : _typeof(elem)) === 'object') {
        idStr = elem[0].id;
      } else {
        idStr = elem;
      }

      if (idStr.indexOf('#') < 0) {
        idStr = '#' + idStr;
      }

      var $target = this.$tabTitles.find('[href$="' + idStr + '"]').parent('.' + this.options.linkClass);

      this._handleTabChange($target, historyHandled);
    }
  }, {
    key: '_setHeight',

    /**
     * Sets the height of each panel to the height of the tallest panel.
     * If enabled in options, gets called on media query change.
     * If loading content via external source, can be called directly or with _reflow.
     * If enabled with `data-match-height="true"`, tabs sets to equal height
     * @function
     * @private
     */
    value: function _setHeight() {
      var max = 0,
          _this = this; // Lock down the `this` value for the root tabs object

      this.$tabContent.find('.' + this.options.panelClass).css('height', '').each(function () {

        var panel = (0, _jquery2.default)(this),
            isActive = panel.hasClass('' + _this.options.panelActiveClass); // get the options from the parent instead of trying to get them from the child

        if (!isActive) {
          panel.css({ 'visibility': 'hidden', 'display': 'block' });
        }

        var temp = this.getBoundingClientRect().height;

        if (!isActive) {
          panel.css({
            'visibility': '',
            'display': ''
          });
        }

        max = temp > max ? temp : max;
      }).css('height', max + 'px');
    }

    /**
     * Destroys an instance of an tabs.
     * @fires Tabs#destroyed
     */

  }, {
    key: '_destroy',
    value: function _destroy() {
      this.$element.find('.' + this.options.linkClass).off('.zf.tabs').hide().end().find('.' + this.options.panelClass).hide();

      if (this.options.matchHeight) {
        if (this._setHeightMqHandler != null) {
          (0, _jquery2.default)(window).off('changed.zf.mediaquery', this._setHeightMqHandler);
        }
      }

      if (this.options.deepLink) {
        (0, _jquery2.default)(window).off('popstate', this._checkDeepLink);
      }
    }
  }]);

  return Tabs;
}(_foundation.Plugin);

Tabs.defaults = {
  /**
   * Allows the window to scroll to content of pane specified by hash anchor
   * @option
   * @type {boolean}
   * @default false
   */
  deepLink: false,

  /**
   * Adjust the deep link scroll to make sure the top of the tab panel is visible
   * @option
   * @type {boolean}
   * @default false
   */
  deepLinkSmudge: false,

  /**
   * Animation time (ms) for the deep link adjustment
   * @option
   * @type {number}
   * @default 300
   */
  deepLinkSmudgeDelay: 300,

  /**
   * Update the browser history with the open tab
   * @option
   * @type {boolean}
   * @default false
   */
  updateHistory: false,

  /**
   * Allows the window to scroll to content of active pane on load if set to true.
   * Not recommended if more than one tab panel per page.
   * @option
   * @type {boolean}
   * @default false
   */
  autoFocus: false,

  /**
   * Allows keyboard input to 'wrap' around the tab links.
   * @option
   * @type {boolean}
   * @default true
   */
  wrapOnKeys: true,

  /**
   * Allows the tab content panes to match heights if set to true.
   * @option
   * @type {boolean}
   * @default false
   */
  matchHeight: false,

  /**
   * Allows active tabs to collapse when clicked.
   * @option
   * @type {boolean}
   * @default false
   */
  activeCollapse: false,

  /**
   * Class applied to `li`'s in tab link list.
   * @option
   * @type {string}
   * @default 'tabs-title'
   */
  linkClass: 'tabs-title',

  /**
   * Class applied to the active `li` in tab link list.
   * @option
   * @type {string}
   * @default 'is-active'
   */
  linkActiveClass: 'is-active',

  /**
   * Class applied to the content containers.
   * @option
   * @type {string}
   * @default 'tabs-panel'
   */
  panelClass: 'tabs-panel',

  /**
   * Class applied to the active content container.
   * @option
   * @type {string}
   * @default 'is-active'
   */
  panelActiveClass: 'is-active'
};

exports.Tabs = Tabs;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onImagesLoaded = undefined;

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Runs a callback function when images are fully loaded.
 * @param {Object} images - Image(s) to check if loaded.
 * @param {Func} callback - Function to execute when image is fully loaded.
 */
function onImagesLoaded(images, callback) {
  var self = this,
      unloaded = images.length;

  if (unloaded === 0) {
    callback();
  }

  images.each(function () {
    // Check if image is loaded
    if (this.complete && this.naturalWidth !== undefined) {
      singleImageLoaded();
    } else {
      // If the above check failed, simulate loading on detached element.
      var image = new Image();
      // Still count image as loaded if it finalizes with an error.
      var events = "load.zf.images error.zf.images";
      (0, _jquery2.default)(image).one(events, function me(event) {
        // Unbind the event listeners. We're using 'one' but only one of the two events will have fired.
        (0, _jquery2.default)(this).off(events, me);
        singleImageLoaded();
      });
      image.src = (0, _jquery2.default)(this).attr('src');
    }
  });

  function singleImageLoaded() {
    unloaded--;
    if (unloaded === 0) {
      callback();
    }
  }
}

exports.onImagesLoaded = onImagesLoaded;

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMWExNGM5N2UwZGY2N2RkYjk5ZjEiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwialF1ZXJ5XCIiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi51dGlsLmNvcmUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi51dGlsLm1lZGlhUXVlcnkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi51dGlsLmtleWJvYXJkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24udXRpbC50cmlnZ2Vycy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLnBsdWdpbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2pzL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2hhdC1pbnB1dC9kaXN0L3doYXQtaW5wdXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9qcy9saWIvZm91bmRhdGlvbi1leHBsaWNpdC1waWVjZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi5jb3JlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24udXRpbC5tb3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi5vZmZjYW52YXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi50YWJzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24udXRpbC5pbWFnZUxvYWRlci5qcyJdLCJuYW1lcyI6WyJydGwiLCJhdHRyIiwiR2V0WW9EaWdpdHMiLCJsZW5ndGgiLCJuYW1lc3BhY2UiLCJNYXRoIiwicm91bmQiLCJwb3ciLCJyYW5kb20iLCJ0b1N0cmluZyIsInNsaWNlIiwidHJhbnNpdGlvbmVuZCIsIiRlbGVtIiwidHJhbnNpdGlvbnMiLCJlbGVtIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiZW5kIiwidCIsInN0eWxlIiwic2V0VGltZW91dCIsInRyaWdnZXJIYW5kbGVyIiwiZGVmYXVsdFF1ZXJpZXMiLCJsYW5kc2NhcGUiLCJwb3J0cmFpdCIsInJldGluYSIsIm1hdGNoTWVkaWEiLCJ3aW5kb3ciLCJzdHlsZU1lZGlhIiwibWVkaWEiLCJzY3JpcHQiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsImluZm8iLCJ0eXBlIiwiaWQiLCJwYXJlbnROb2RlIiwiaW5zZXJ0QmVmb3JlIiwiZ2V0Q29tcHV0ZWRTdHlsZSIsImN1cnJlbnRTdHlsZSIsIm1hdGNoTWVkaXVtIiwidGV4dCIsInN0eWxlU2hlZXQiLCJjc3NUZXh0IiwidGV4dENvbnRlbnQiLCJ3aWR0aCIsIm1hdGNoZXMiLCJNZWRpYVF1ZXJ5IiwicXVlcmllcyIsImN1cnJlbnQiLCJfaW5pdCIsInNlbGYiLCIkbWV0YSIsImFwcGVuZFRvIiwiaGVhZCIsImV4dHJhY3RlZFN0eWxlcyIsImNzcyIsIm5hbWVkUXVlcmllcyIsInBhcnNlU3R5bGVUb09iamVjdCIsImtleSIsImhhc093blByb3BlcnR5IiwicHVzaCIsIm5hbWUiLCJ2YWx1ZSIsIl9nZXRDdXJyZW50U2l6ZSIsIl93YXRjaGVyIiwiYXRMZWFzdCIsInNpemUiLCJxdWVyeSIsImdldCIsImlzIiwidHJpbSIsInNwbGl0IiwiaSIsIm1hdGNoZWQiLCJvZmYiLCJvbiIsIm5ld1NpemUiLCJjdXJyZW50U2l6ZSIsInRyaWdnZXIiLCJzdHIiLCJzdHlsZU9iamVjdCIsInJlZHVjZSIsInJldCIsInBhcmFtIiwicGFydHMiLCJyZXBsYWNlIiwidmFsIiwiZGVjb2RlVVJJQ29tcG9uZW50IiwidW5kZWZpbmVkIiwiQXJyYXkiLCJpc0FycmF5Iiwia2V5Q29kZXMiLCJjb21tYW5kcyIsImZpbmRGb2N1c2FibGUiLCIkZWxlbWVudCIsImZpbmQiLCJmaWx0ZXIiLCJwYXJzZUtleSIsImV2ZW50Iiwid2hpY2giLCJrZXlDb2RlIiwiU3RyaW5nIiwiZnJvbUNoYXJDb2RlIiwidG9VcHBlckNhc2UiLCJzaGlmdEtleSIsImN0cmxLZXkiLCJhbHRLZXkiLCJLZXlib2FyZCIsImtleXMiLCJnZXRLZXlDb2RlcyIsImhhbmRsZUtleSIsImNvbXBvbmVudCIsImZ1bmN0aW9ucyIsImNvbW1hbmRMaXN0IiwiY21kcyIsImNvbW1hbmQiLCJmbiIsImNvbnNvbGUiLCJ3YXJuIiwibHRyIiwiJCIsImV4dGVuZCIsInJldHVyblZhbHVlIiwiYXBwbHkiLCJoYW5kbGVkIiwidW5oYW5kbGVkIiwicmVnaXN0ZXIiLCJjb21wb25lbnROYW1lIiwidHJhcEZvY3VzIiwiJGZvY3VzYWJsZSIsIiRmaXJzdEZvY3VzYWJsZSIsImVxIiwiJGxhc3RGb2N1c2FibGUiLCJ0YXJnZXQiLCJwcmV2ZW50RGVmYXVsdCIsImZvY3VzIiwicmVsZWFzZUZvY3VzIiwia2NzIiwiayIsImtjIiwiTXV0YXRpb25PYnNlcnZlciIsInByZWZpeGVzIiwidHJpZ2dlcnMiLCJlbCIsImRhdGEiLCJmb3JFYWNoIiwiVHJpZ2dlcnMiLCJMaXN0ZW5lcnMiLCJCYXNpYyIsIkdsb2JhbCIsIkluaXRpYWxpemVycyIsIm9wZW5MaXN0ZW5lciIsImNsb3NlTGlzdGVuZXIiLCJ0b2dnbGVMaXN0ZW5lciIsImNsb3NlYWJsZUxpc3RlbmVyIiwiZSIsInN0b3BQcm9wYWdhdGlvbiIsImFuaW1hdGlvbiIsIk1vdGlvbiIsImFuaW1hdGVPdXQiLCJmYWRlT3V0IiwidG9nZ2xlRm9jdXNMaXN0ZW5lciIsImFkZE9wZW5MaXN0ZW5lciIsImFkZENsb3NlTGlzdGVuZXIiLCJhZGRUb2dnbGVMaXN0ZW5lciIsImFkZENsb3NlYWJsZUxpc3RlbmVyIiwiYWRkVG9nZ2xlRm9jdXNMaXN0ZW5lciIsInJlc2l6ZUxpc3RlbmVyIiwiJG5vZGVzIiwiZWFjaCIsInNjcm9sbExpc3RlbmVyIiwiY2xvc2VNZUxpc3RlbmVyIiwicGx1Z2luSWQiLCJwbHVnaW4iLCJwbHVnaW5zIiwibm90IiwiX3RoaXMiLCJhZGRDbG9zZW1lTGlzdGVuZXIiLCJwbHVnaW5OYW1lIiwieWV0aUJveGVzIiwicGx1Z05hbWVzIiwiY29uY2F0IiwiZXJyb3IiLCJsaXN0ZW5lcnMiLCJtYXAiLCJqb2luIiwiZGVib3VuY2VHbG9iYWxMaXN0ZW5lciIsImRlYm91bmNlIiwibGlzdGVuZXIiLCJ0aW1lciIsImFyZ3MiLCJwcm90b3R5cGUiLCJjYWxsIiwiYXJndW1lbnRzIiwiY2xlYXJUaW1lb3V0IiwiYWRkUmVzaXplTGlzdGVuZXIiLCJhZGRTY3JvbGxMaXN0ZW5lciIsImFkZE11dGF0aW9uRXZlbnRzTGlzdGVuZXIiLCJsaXN0ZW5pbmdFbGVtZW50c011dGF0aW9uIiwibXV0YXRpb25SZWNvcmRzTGlzdCIsIiR0YXJnZXQiLCJhdHRyaWJ1dGVOYW1lIiwicGFnZVlPZmZzZXQiLCJjbG9zZXN0IiwiZWxlbWVudE9ic2VydmVyIiwib2JzZXJ2ZSIsImF0dHJpYnV0ZXMiLCJjaGlsZExpc3QiLCJjaGFyYWN0ZXJEYXRhIiwic3VidHJlZSIsImF0dHJpYnV0ZUZpbHRlciIsImFkZFNpbXBsZUxpc3RlbmVycyIsIiRkb2N1bWVudCIsImFkZEdsb2JhbExpc3RlbmVycyIsImluaXQiLCJGb3VuZGF0aW9uIiwidHJpZ2dlcnNJbml0aWFsaXplZCIsInJlYWR5U3RhdGUiLCJJSGVhcllvdSIsIlBsdWdpbiIsImVsZW1lbnQiLCJvcHRpb25zIiwiX3NldHVwIiwiZ2V0UGx1Z2luTmFtZSIsInV1aWQiLCJfZGVzdHJveSIsInJlbW92ZUF0dHIiLCJyZW1vdmVEYXRhIiwicHJvcCIsImh5cGhlbmF0ZSIsInRvTG93ZXJDYXNlIiwib2JqIiwiY29uc3RydWN0b3IiLCJjbGFzc05hbWUiLCJmb3VuZGF0aW9uIiwiYWRkQ2xhc3MiLCJ0YWJfaWQiLCJyZW1vdmVDbGFzcyIsImhpZGUiLCJmYWRlSW4iLCJjbGljayIsImdldFNjcmlwdCIsInRleHRTdGF0dXMiLCJqcXhociIsInRlc3RpbW9uaWFsX2NhdCIsImFjdGlvbiIsInRlc3RpbW9uaWFsQ2F0IiwicG9zdCIsImJhX2FqYXgiLCJyZXNwb25zZSIsImh0bWwiLCJhZGRUb0pxdWVyeSIsIk9mZkNhbnZhcyIsIlRhYnMiLCJtb2R1bGUiLCJleHBvcnRzIiwiRk9VTkRBVElPTl9WRVJTSU9OIiwidmVyc2lvbiIsIl9wbHVnaW5zIiwiX3V1aWRzIiwiZnVuY3Rpb25OYW1lIiwiYXR0ck5hbWUiLCJyZWdpc3RlclBsdWdpbiIsInVucmVnaXN0ZXJQbHVnaW4iLCJzcGxpY2UiLCJpbmRleE9mIiwicmVJbml0IiwiaXNKUSIsImZucyIsInBsZ3MiLCJwIiwiT2JqZWN0IiwiZXJyIiwicmVmbG93IiwiYWRkQmFjayIsIiRlbCIsIm9wdHMiLCJ0aGluZyIsIm9wdCIsInBhcnNlVmFsdWUiLCJlciIsImdldEZuTmFtZSIsIm1ldGhvZCIsIiRub0pTIiwicGx1Z0NsYXNzIiwiUmVmZXJlbmNlRXJyb3IiLCJUeXBlRXJyb3IiLCJ1dGlsIiwidGhyb3R0bGUiLCJmdW5jIiwiZGVsYXkiLCJjb250ZXh0IiwiRGF0ZSIsIm5vdyIsImdldFRpbWUiLCJ2ZW5kb3JzIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwidnAiLCJjYW5jZWxBbmltYXRpb25GcmFtZSIsInRlc3QiLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJsYXN0VGltZSIsImNhbGxiYWNrIiwibmV4dFRpbWUiLCJtYXgiLCJwZXJmb3JtYW5jZSIsInN0YXJ0IiwiRnVuY3Rpb24iLCJiaW5kIiwib1RoaXMiLCJhQXJncyIsImZUb0JpbmQiLCJmTk9QIiwiZkJvdW5kIiwiZnVuY05hbWVSZWdleCIsInJlc3VsdHMiLCJleGVjIiwiaXNOYU4iLCJwYXJzZUZsb2F0IiwiaW5pdENsYXNzZXMiLCJhY3RpdmVDbGFzc2VzIiwiYW5pbWF0ZUluIiwiY2IiLCJhbmltYXRlIiwiTW92ZSIsImR1cmF0aW9uIiwiYW5pbSIsInByb2ciLCJtb3ZlIiwidHMiLCJpc0luIiwiaW5pdENsYXNzIiwiYWN0aXZlQ2xhc3MiLCJyZXNldCIsInNob3ciLCJvZmZzZXRXaWR0aCIsIm9uZSIsImZpbmlzaCIsInRyYW5zaXRpb25EdXJhdGlvbiIsImRlZmF1bHRzIiwiY29udGVudENsYXNzZXMiLCJiYXNlIiwicmV2ZWFsIiwiJGxhc3RUcmlnZ2VyIiwiJHRyaWdnZXJzIiwicG9zaXRpb24iLCIkY29udGVudCIsIm5lc3RlZCIsImluZGV4IiwiX2V2ZW50cyIsImNvbnRlbnRJZCIsInNpYmxpbmdzIiwiZmlyc3QiLCJ0cmFuc2l0aW9uIiwibWF0Y2giLCJjb250ZW50T3ZlcmxheSIsIm92ZXJsYXkiLCJvdmVybGF5UG9zaXRpb24iLCJzZXRBdHRyaWJ1dGUiLCIkb3ZlcmxheSIsImluc2VydEFmdGVyIiwiYXBwZW5kIiwiaXNSZXZlYWxlZCIsIlJlZ0V4cCIsInJldmVhbENsYXNzIiwicmV2ZWFsT24iLCJfc2V0TVFDaGVja2VyIiwidHJhbnNpdGlvblRpbWUiLCJfcmVtb3ZlQ29udGVudENsYXNzZXMiLCJvcGVuIiwiY2xvc2UiLCJ0b2dnbGUiLCJfaGFuZGxlS2V5Ym9hcmQiLCJjbG9zZU9uQ2xpY2siLCJoYXNSZXZlYWwiLCJfYWRkQ29udGVudENsYXNzZXMiLCJzY3JvbGxIZWlnaHQiLCJjbGllbnRIZWlnaHQiLCJzY3JvbGxUb3AiLCJhbGxvd1VwIiwiYWxsb3dEb3duIiwibGFzdFkiLCJvcmlnaW5hbEV2ZW50IiwicGFnZVkiLCJ1cCIsImRvd24iLCJoYXNDbGFzcyIsImZvcmNlVG8iLCJzY3JvbGxUbyIsImJvZHkiLCJjb250ZW50U2Nyb2xsIiwiX3N0b3BTY3JvbGxpbmciLCJfcmVjb3JkU2Nyb2xsYWJsZSIsIl9zdG9wU2Nyb2xsUHJvcGFnYXRpb24iLCJhdXRvRm9jdXMiLCJjYW52YXNGb2N1cyIsIiR0YWJUaXRsZXMiLCJsaW5rQ2xhc3MiLCIkdGFiQ29udGVudCIsIiRsaW5rIiwiaXNBY3RpdmUiLCJsaW5rQWN0aXZlQ2xhc3MiLCJoYXNoIiwibGlua0lkIiwibG9hZCIsIm9mZnNldCIsInRvcCIsImRlZXBMaW5rU211ZGdlRGVsYXkiLCJtYXRjaEhlaWdodCIsIiRpbWFnZXMiLCJfc2V0SGVpZ2h0IiwiX2NoZWNrRGVlcExpbmsiLCJhbmNob3IiLCJsb2NhdGlvbiIsInNlbGVjdFRhYiIsImRlZXBMaW5rU211ZGdlIiwiZGVlcExpbmsiLCJfYWRkS2V5SGFuZGxlciIsIl9hZGRDbGlja0hhbmRsZXIiLCJfc2V0SGVpZ2h0TXFIYW5kbGVyIiwiX2hhbmRsZVRhYkNoYW5nZSIsIiRlbGVtZW50cyIsInBhcmVudCIsImNoaWxkcmVuIiwiJHByZXZFbGVtZW50IiwiJG5leHRFbGVtZW50Iiwid3JhcE9uS2V5cyIsImxhc3QiLCJtaW4iLCJwcmV2aW91cyIsIm5leHQiLCJoaXN0b3J5SGFuZGxlZCIsImFjdGl2ZUNvbGxhcHNlIiwiX2NvbGxhcHNlVGFiIiwiJG9sZFRhYiIsIiR0YWJMaW5rIiwiJHRhcmdldENvbnRlbnQiLCJfb3BlblRhYiIsInVwZGF0ZUhpc3RvcnkiLCJoaXN0b3J5IiwicHVzaFN0YXRlIiwicmVwbGFjZVN0YXRlIiwicGFuZWxBY3RpdmVDbGFzcyIsIiR0YXJnZXRfYW5jaG9yIiwiaWRTdHIiLCJwYW5lbENsYXNzIiwicGFuZWwiLCJ0ZW1wIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiaGVpZ2h0Iiwib25JbWFnZXNMb2FkZWQiLCJpbWFnZXMiLCJ1bmxvYWRlZCIsImNvbXBsZXRlIiwibmF0dXJhbFdpZHRoIiwic2luZ2xlSW1hZ2VMb2FkZWQiLCJpbWFnZSIsIkltYWdlIiwiZXZlbnRzIiwibWUiLCJzcmMiXSwi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O0FBQ0E7QUFDQSxDQUFDO0FBQ0Qsb0NBQW9DO0FBQ3BDO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUF1QjtBQUN2QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLHdDQUF3QztBQUN4QztBQUNBO0FBQ0E7QUFDQSxNQUFNOztBQUVOO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0MsZ0JBQWdCOztBQUV0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0EsK0NBQStDLFNBQVM7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsK0NBQStDLFNBQVM7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNOztBQUVOO0FBQ0E7QUFDQTtBQUNBLE1BQU07O0FBRU47QUFDQTtBQUNBO0FBQ0EsTUFBTTs7QUFFTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUixNQUFNOztBQUVOO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBLENBQUM7QUFDRCxDOzs7Ozs7Ozs7QUMzWEE7Ozs7QUFDQTs7QUFJQTs7QUFDQTs7QUFLQTs7QUFVQTs7QUFRQTs7OztBQUNBO0FBQ0E7QUFDQTs7O0FBcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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NWMsSUFBUixDQUFhLEtBQWIsQ0FBWjtBQUNEO0FBQ0YsR0FqQkQ7O0FBbUJBLFdBQVN1YyxpQkFBVCxHQUE2QjtBQUMzQkg7QUFDQSxRQUFJQSxhQUFhLENBQWpCLEVBQW9CO0FBQ2xCdEo7QUFDRDtBQUNGO0FBQ0Y7O1FBRVFvSixjLEdBQUFBLGMiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMWExNGM5N2UwZGY2N2RkYjk5ZjEiLCJtb2R1bGUuZXhwb3J0cyA9IGpRdWVyeTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImpRdWVyeVwiXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuXG4vLyBDb3JlIEZvdW5kYXRpb24gVXRpbGl0aWVzLCB1dGlsaXplZCBpbiBhIG51bWJlciBvZiBwbGFjZXMuXG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBib29sZWFuIGZvciBSVEwgc3VwcG9ydFxuICAgKi9cbmZ1bmN0aW9uIHJ0bCgpIHtcbiAgcmV0dXJuICQoJ2h0bWwnKS5hdHRyKCdkaXInKSA9PT0gJ3J0bCc7XG59XG5cbi8qKlxuICogcmV0dXJucyBhIHJhbmRvbSBiYXNlLTM2IHVpZCB3aXRoIG5hbWVzcGFjaW5nXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7TnVtYmVyfSBsZW5ndGggLSBudW1iZXIgb2YgcmFuZG9tIGJhc2UtMzYgZGlnaXRzIGRlc2lyZWQuIEluY3JlYXNlIGZvciBtb3JlIHJhbmRvbSBzdHJpbmdzLlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVzcGFjZSAtIG5hbWUgb2YgcGx1Z2luIHRvIGJlIGluY29ycG9yYXRlZCBpbiB1aWQsIG9wdGlvbmFsLlxuICogQGRlZmF1bHQge1N0cmluZ30gJycgLSBpZiBubyBwbHVnaW4gbmFtZSBpcyBwcm92aWRlZCwgbm90aGluZyBpcyBhcHBlbmRlZCB0byB0aGUgdWlkLlxuICogQHJldHVybnMge1N0cmluZ30gLSB1bmlxdWUgaWRcbiAqL1xuZnVuY3Rpb24gR2V0WW9EaWdpdHMobGVuZ3RoLCBuYW1lc3BhY2Upe1xuICBsZW5ndGggPSBsZW5ndGggfHwgNjtcbiAgcmV0dXJuIE1hdGgucm91bmQoKE1hdGgucG93KDM2LCBsZW5ndGggKyAxKSAtIE1hdGgucmFuZG9tKCkgKiBNYXRoLnBvdygzNiwgbGVuZ3RoKSkpLnRvU3RyaW5nKDM2KS5zbGljZSgxKSArIChuYW1lc3BhY2UgPyBgLSR7bmFtZXNwYWNlfWAgOiAnJyk7XG59XG5cbmZ1bmN0aW9uIHRyYW5zaXRpb25lbmQoJGVsZW0pe1xuICB2YXIgdHJhbnNpdGlvbnMgPSB7XG4gICAgJ3RyYW5zaXRpb24nOiAndHJhbnNpdGlvbmVuZCcsXG4gICAgJ1dlYmtpdFRyYW5zaXRpb24nOiAnd2Via2l0VHJhbnNpdGlvbkVuZCcsXG4gICAgJ01velRyYW5zaXRpb24nOiAndHJhbnNpdGlvbmVuZCcsXG4gICAgJ09UcmFuc2l0aW9uJzogJ290cmFuc2l0aW9uZW5kJ1xuICB9O1xuICB2YXIgZWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxuICAgICAgZW5kO1xuXG4gIGZvciAodmFyIHQgaW4gdHJhbnNpdGlvbnMpe1xuICAgIGlmICh0eXBlb2YgZWxlbS5zdHlsZVt0XSAhPT0gJ3VuZGVmaW5lZCcpe1xuICAgICAgZW5kID0gdHJhbnNpdGlvbnNbdF07XG4gICAgfVxuICB9XG4gIGlmKGVuZCl7XG4gICAgcmV0dXJuIGVuZDtcbiAgfWVsc2V7XG4gICAgZW5kID0gc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgJGVsZW0udHJpZ2dlckhhbmRsZXIoJ3RyYW5zaXRpb25lbmQnLCBbJGVsZW1dKTtcbiAgICB9LCAxKTtcbiAgICByZXR1cm4gJ3RyYW5zaXRpb25lbmQnO1xuICB9XG59XG5cbmV4cG9ydCB7cnRsLCBHZXRZb0RpZ2l0cywgdHJhbnNpdGlvbmVuZH07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLnV0aWwuY29yZS5qcyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcblxuLy8gRGVmYXVsdCBzZXQgb2YgbWVkaWEgcXVlcmllc1xuY29uc3QgZGVmYXVsdFF1ZXJpZXMgPSB7XG4gICdkZWZhdWx0JyA6ICdvbmx5IHNjcmVlbicsXG4gIGxhbmRzY2FwZSA6ICdvbmx5IHNjcmVlbiBhbmQgKG9yaWVudGF0aW9uOiBsYW5kc2NhcGUpJyxcbiAgcG9ydHJhaXQgOiAnb25seSBzY3JlZW4gYW5kIChvcmllbnRhdGlvbjogcG9ydHJhaXQpJyxcbiAgcmV0aW5hIDogJ29ubHkgc2NyZWVuIGFuZCAoLXdlYmtpdC1taW4tZGV2aWNlLXBpeGVsLXJhdGlvOiAyKSwnICtcbiAgICAnb25seSBzY3JlZW4gYW5kIChtaW4tLW1vei1kZXZpY2UtcGl4ZWwtcmF0aW86IDIpLCcgK1xuICAgICdvbmx5IHNjcmVlbiBhbmQgKC1vLW1pbi1kZXZpY2UtcGl4ZWwtcmF0aW86IDIvMSksJyArXG4gICAgJ29ubHkgc2NyZWVuIGFuZCAobWluLWRldmljZS1waXhlbC1yYXRpbzogMiksJyArXG4gICAgJ29ubHkgc2NyZWVuIGFuZCAobWluLXJlc29sdXRpb246IDE5MmRwaSksJyArXG4gICAgJ29ubHkgc2NyZWVuIGFuZCAobWluLXJlc29sdXRpb246IDJkcHB4KSdcbiAgfTtcblxuXG4vLyBtYXRjaE1lZGlhKCkgcG9seWZpbGwgLSBUZXN0IGEgQ1NTIG1lZGlhIHR5cGUvcXVlcnkgaW4gSlMuXG4vLyBBdXRob3JzICYgY29weXJpZ2h0IChjKSAyMDEyOiBTY290dCBKZWhsLCBQYXVsIElyaXNoLCBOaWNob2xhcyBaYWthcywgRGF2aWQgS25pZ2h0LiBEdWFsIE1JVC9CU0QgbGljZW5zZVxubGV0IG1hdGNoTWVkaWEgPSB3aW5kb3cubWF0Y2hNZWRpYSB8fCAoZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICAvLyBGb3IgYnJvd3NlcnMgdGhhdCBzdXBwb3J0IG1hdGNoTWVkaXVtIGFwaSBzdWNoIGFzIElFIDkgYW5kIHdlYmtpdFxuICB2YXIgc3R5bGVNZWRpYSA9ICh3aW5kb3cuc3R5bGVNZWRpYSB8fCB3aW5kb3cubWVkaWEpO1xuXG4gIC8vIEZvciB0aG9zZSB0aGF0IGRvbid0IHN1cHBvcnQgbWF0Y2hNZWRpdW1cbiAgaWYgKCFzdHlsZU1lZGlhKSB7XG4gICAgdmFyIHN0eWxlICAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpLFxuICAgIHNjcmlwdCAgICAgID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NjcmlwdCcpWzBdLFxuICAgIGluZm8gICAgICAgID0gbnVsbDtcblxuICAgIHN0eWxlLnR5cGUgID0gJ3RleHQvY3NzJztcbiAgICBzdHlsZS5pZCAgICA9ICdtYXRjaG1lZGlhanMtdGVzdCc7XG5cbiAgICBzY3JpcHQgJiYgc2NyaXB0LnBhcmVudE5vZGUgJiYgc2NyaXB0LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHN0eWxlLCBzY3JpcHQpO1xuXG4gICAgLy8gJ3N0eWxlLmN1cnJlbnRTdHlsZScgaXMgdXNlZCBieSBJRSA8PSA4IGFuZCAnd2luZG93LmdldENvbXB1dGVkU3R5bGUnIGZvciBhbGwgb3RoZXIgYnJvd3NlcnNcbiAgICBpbmZvID0gKCdnZXRDb21wdXRlZFN0eWxlJyBpbiB3aW5kb3cpICYmIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHN0eWxlLCBudWxsKSB8fCBzdHlsZS5jdXJyZW50U3R5bGU7XG5cbiAgICBzdHlsZU1lZGlhID0ge1xuICAgICAgbWF0Y2hNZWRpdW0obWVkaWEpIHtcbiAgICAgICAgdmFyIHRleHQgPSBgQG1lZGlhICR7bWVkaWF9eyAjbWF0Y2htZWRpYWpzLXRlc3QgeyB3aWR0aDogMXB4OyB9IH1gO1xuXG4gICAgICAgIC8vICdzdHlsZS5zdHlsZVNoZWV0JyBpcyB1c2VkIGJ5IElFIDw9IDggYW5kICdzdHlsZS50ZXh0Q29udGVudCcgZm9yIGFsbCBvdGhlciBicm93c2Vyc1xuICAgICAgICBpZiAoc3R5bGUuc3R5bGVTaGVldCkge1xuICAgICAgICAgIHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IHRleHQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3R5bGUudGV4dENvbnRlbnQgPSB0ZXh0O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVGVzdCBpZiBtZWRpYSBxdWVyeSBpcyB0cnVlIG9yIGZhbHNlXG4gICAgICAgIHJldHVybiBpbmZvLndpZHRoID09PSAnMXB4JztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24obWVkaWEpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbWF0Y2hlczogc3R5bGVNZWRpYS5tYXRjaE1lZGl1bShtZWRpYSB8fCAnYWxsJyksXG4gICAgICBtZWRpYTogbWVkaWEgfHwgJ2FsbCdcbiAgICB9O1xuICB9XG59KSgpO1xuXG52YXIgTWVkaWFRdWVyeSA9IHtcbiAgcXVlcmllczogW10sXG5cbiAgY3VycmVudDogJycsXG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemVzIHRoZSBtZWRpYSBxdWVyeSBoZWxwZXIsIGJ5IGV4dHJhY3RpbmcgdGhlIGJyZWFrcG9pbnQgbGlzdCBmcm9tIHRoZSBDU1MgYW5kIGFjdGl2YXRpbmcgdGhlIGJyZWFrcG9pbnQgd2F0Y2hlci5cbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfaW5pdCgpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdmFyICRtZXRhID0gJCgnbWV0YS5mb3VuZGF0aW9uLW1xJyk7XG4gICAgaWYoISRtZXRhLmxlbmd0aCl7XG4gICAgICAkKCc8bWV0YSBjbGFzcz1cImZvdW5kYXRpb24tbXFcIj4nKS5hcHBlbmRUbyhkb2N1bWVudC5oZWFkKTtcbiAgICB9XG5cbiAgICB2YXIgZXh0cmFjdGVkU3R5bGVzID0gJCgnLmZvdW5kYXRpb24tbXEnKS5jc3MoJ2ZvbnQtZmFtaWx5Jyk7XG4gICAgdmFyIG5hbWVkUXVlcmllcztcblxuICAgIG5hbWVkUXVlcmllcyA9IHBhcnNlU3R5bGVUb09iamVjdChleHRyYWN0ZWRTdHlsZXMpO1xuXG4gICAgZm9yICh2YXIga2V5IGluIG5hbWVkUXVlcmllcykge1xuICAgICAgaWYobmFtZWRRdWVyaWVzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgc2VsZi5xdWVyaWVzLnB1c2goe1xuICAgICAgICAgIG5hbWU6IGtleSxcbiAgICAgICAgICB2YWx1ZTogYG9ubHkgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAke25hbWVkUXVlcmllc1trZXldfSlgXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuY3VycmVudCA9IHRoaXMuX2dldEN1cnJlbnRTaXplKCk7XG5cbiAgICB0aGlzLl93YXRjaGVyKCk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiB0aGUgc2NyZWVuIGlzIGF0IGxlYXN0IGFzIHdpZGUgYXMgYSBicmVha3BvaW50LlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHBhcmFtIHtTdHJpbmd9IHNpemUgLSBOYW1lIG9mIHRoZSBicmVha3BvaW50IHRvIGNoZWNrLlxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gYHRydWVgIGlmIHRoZSBicmVha3BvaW50IG1hdGNoZXMsIGBmYWxzZWAgaWYgaXQncyBzbWFsbGVyLlxuICAgKi9cbiAgYXRMZWFzdChzaXplKSB7XG4gICAgdmFyIHF1ZXJ5ID0gdGhpcy5nZXQoc2l6ZSk7XG5cbiAgICBpZiAocXVlcnkpIHtcbiAgICAgIHJldHVybiBtYXRjaE1lZGlhKHF1ZXJ5KS5tYXRjaGVzO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfSxcblxuICAvKipcbiAgICogQ2hlY2tzIGlmIHRoZSBzY3JlZW4gbWF0Y2hlcyB0byBhIGJyZWFrcG9pbnQuXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcGFyYW0ge1N0cmluZ30gc2l6ZSAtIE5hbWUgb2YgdGhlIGJyZWFrcG9pbnQgdG8gY2hlY2ssIGVpdGhlciAnc21hbGwgb25seScgb3IgJ3NtYWxsJy4gT21pdHRpbmcgJ29ubHknIGZhbGxzIGJhY2sgdG8gdXNpbmcgYXRMZWFzdCgpIG1ldGhvZC5cbiAgICogQHJldHVybnMge0Jvb2xlYW59IGB0cnVlYCBpZiB0aGUgYnJlYWtwb2ludCBtYXRjaGVzLCBgZmFsc2VgIGlmIGl0IGRvZXMgbm90LlxuICAgKi9cbiAgaXMoc2l6ZSkge1xuICAgIHNpemUgPSBzaXplLnRyaW0oKS5zcGxpdCgnICcpO1xuICAgIGlmKHNpemUubGVuZ3RoID4gMSAmJiBzaXplWzFdID09PSAnb25seScpIHtcbiAgICAgIGlmKHNpemVbMF0gPT09IHRoaXMuX2dldEN1cnJlbnRTaXplKCkpIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5hdExlYXN0KHNpemVbMF0pO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIG1lZGlhIHF1ZXJ5IG9mIGEgYnJlYWtwb2ludC5cbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBzaXplIC0gTmFtZSBvZiB0aGUgYnJlYWtwb2ludCB0byBnZXQuXG4gICAqIEByZXR1cm5zIHtTdHJpbmd8bnVsbH0gLSBUaGUgbWVkaWEgcXVlcnkgb2YgdGhlIGJyZWFrcG9pbnQsIG9yIGBudWxsYCBpZiB0aGUgYnJlYWtwb2ludCBkb2Vzbid0IGV4aXN0LlxuICAgKi9cbiAgZ2V0KHNpemUpIHtcbiAgICBmb3IgKHZhciBpIGluIHRoaXMucXVlcmllcykge1xuICAgICAgaWYodGhpcy5xdWVyaWVzLmhhc093blByb3BlcnR5KGkpKSB7XG4gICAgICAgIHZhciBxdWVyeSA9IHRoaXMucXVlcmllc1tpXTtcbiAgICAgICAgaWYgKHNpemUgPT09IHF1ZXJ5Lm5hbWUpIHJldHVybiBxdWVyeS52YWx1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfSxcblxuICAvKipcbiAgICogR2V0cyB0aGUgY3VycmVudCBicmVha3BvaW50IG5hbWUgYnkgdGVzdGluZyBldmVyeSBicmVha3BvaW50IGFuZCByZXR1cm5pbmcgdGhlIGxhc3Qgb25lIHRvIG1hdGNoICh0aGUgYmlnZ2VzdCBvbmUpLlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHByaXZhdGVcbiAgICogQHJldHVybnMge1N0cmluZ30gTmFtZSBvZiB0aGUgY3VycmVudCBicmVha3BvaW50LlxuICAgKi9cbiAgX2dldEN1cnJlbnRTaXplKCkge1xuICAgIHZhciBtYXRjaGVkO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnF1ZXJpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBxdWVyeSA9IHRoaXMucXVlcmllc1tpXTtcblxuICAgICAgaWYgKG1hdGNoTWVkaWEocXVlcnkudmFsdWUpLm1hdGNoZXMpIHtcbiAgICAgICAgbWF0Y2hlZCA9IHF1ZXJ5O1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0eXBlb2YgbWF0Y2hlZCA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHJldHVybiBtYXRjaGVkLm5hbWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBtYXRjaGVkO1xuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICogQWN0aXZhdGVzIHRoZSBicmVha3BvaW50IHdhdGNoZXIsIHdoaWNoIGZpcmVzIGFuIGV2ZW50IG9uIHRoZSB3aW5kb3cgd2hlbmV2ZXIgdGhlIGJyZWFrcG9pbnQgY2hhbmdlcy5cbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfd2F0Y2hlcigpIHtcbiAgICAkKHdpbmRvdykub2ZmKCdyZXNpemUuemYubWVkaWFxdWVyeScpLm9uKCdyZXNpemUuemYubWVkaWFxdWVyeScsICgpID0+IHtcbiAgICAgIHZhciBuZXdTaXplID0gdGhpcy5fZ2V0Q3VycmVudFNpemUoKSwgY3VycmVudFNpemUgPSB0aGlzLmN1cnJlbnQ7XG5cbiAgICAgIGlmIChuZXdTaXplICE9PSBjdXJyZW50U2l6ZSkge1xuICAgICAgICAvLyBDaGFuZ2UgdGhlIGN1cnJlbnQgbWVkaWEgcXVlcnlcbiAgICAgICAgdGhpcy5jdXJyZW50ID0gbmV3U2l6ZTtcblxuICAgICAgICAvLyBCcm9hZGNhc3QgdGhlIG1lZGlhIHF1ZXJ5IGNoYW5nZSBvbiB0aGUgd2luZG93XG4gICAgICAgICQod2luZG93KS50cmlnZ2VyKCdjaGFuZ2VkLnpmLm1lZGlhcXVlcnknLCBbbmV3U2l6ZSwgY3VycmVudFNpemVdKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufTtcblxuXG5cbi8vIFRoYW5rIHlvdTogaHR0cHM6Ly9naXRodWIuY29tL3NpbmRyZXNvcmh1cy9xdWVyeS1zdHJpbmdcbmZ1bmN0aW9uIHBhcnNlU3R5bGVUb09iamVjdChzdHIpIHtcbiAgdmFyIHN0eWxlT2JqZWN0ID0ge307XG5cbiAgaWYgKHR5cGVvZiBzdHIgIT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHN0eWxlT2JqZWN0O1xuICB9XG5cbiAgc3RyID0gc3RyLnRyaW0oKS5zbGljZSgxLCAtMSk7IC8vIGJyb3dzZXJzIHJlLXF1b3RlIHN0cmluZyBzdHlsZSB2YWx1ZXNcblxuICBpZiAoIXN0cikge1xuICAgIHJldHVybiBzdHlsZU9iamVjdDtcbiAgfVxuXG4gIHN0eWxlT2JqZWN0ID0gc3RyLnNwbGl0KCcmJykucmVkdWNlKGZ1bmN0aW9uKHJldCwgcGFyYW0pIHtcbiAgICB2YXIgcGFydHMgPSBwYXJhbS5yZXBsYWNlKC9cXCsvZywgJyAnKS5zcGxpdCgnPScpO1xuICAgIHZhciBrZXkgPSBwYXJ0c1swXTtcbiAgICB2YXIgdmFsID0gcGFydHNbMV07XG4gICAga2V5ID0gZGVjb2RlVVJJQ29tcG9uZW50KGtleSk7XG5cbiAgICAvLyBtaXNzaW5nIGA9YCBzaG91bGQgYmUgYG51bGxgOlxuICAgIC8vIGh0dHA6Ly93My5vcmcvVFIvMjAxMi9XRC11cmwtMjAxMjA1MjQvI2NvbGxlY3QtdXJsLXBhcmFtZXRlcnNcbiAgICB2YWwgPSB2YWwgPT09IHVuZGVmaW5lZCA/IG51bGwgOiBkZWNvZGVVUklDb21wb25lbnQodmFsKTtcblxuICAgIGlmICghcmV0Lmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgIHJldFtrZXldID0gdmFsO1xuICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShyZXRba2V5XSkpIHtcbiAgICAgIHJldFtrZXldLnB1c2godmFsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0W2tleV0gPSBbcmV0W2tleV0sIHZhbF07XG4gICAgfVxuICAgIHJldHVybiByZXQ7XG4gIH0sIHt9KTtcblxuICByZXR1cm4gc3R5bGVPYmplY3Q7XG59XG5cbmV4cG9ydCB7TWVkaWFRdWVyeX07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLnV0aWwubWVkaWFRdWVyeS5qcyIsIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKlxuICogVGhpcyB1dGlsIHdhcyBjcmVhdGVkIGJ5IE1hcml1cyBPbGJlcnR6ICpcbiAqIFBsZWFzZSB0aGFuayBNYXJpdXMgb24gR2l0SHViIC9vd2xiZXJ0eiAqXG4gKiBvciB0aGUgd2ViIGh0dHA6Ly93d3cubWFyaXVzb2xiZXJ0ei5kZS8gKlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcbmltcG9ydCB7IHJ0bCBhcyBSdGwgfSBmcm9tICcuL2ZvdW5kYXRpb24udXRpbC5jb3JlJztcblxuY29uc3Qga2V5Q29kZXMgPSB7XG4gIDk6ICdUQUInLFxuICAxMzogJ0VOVEVSJyxcbiAgMjc6ICdFU0NBUEUnLFxuICAzMjogJ1NQQUNFJyxcbiAgMzU6ICdFTkQnLFxuICAzNjogJ0hPTUUnLFxuICAzNzogJ0FSUk9XX0xFRlQnLFxuICAzODogJ0FSUk9XX1VQJyxcbiAgMzk6ICdBUlJPV19SSUdIVCcsXG4gIDQwOiAnQVJST1dfRE9XTidcbn1cblxudmFyIGNvbW1hbmRzID0ge31cblxuLy8gRnVuY3Rpb25zIHB1bGxlZCBvdXQgdG8gYmUgcmVmZXJlbmNlYWJsZSBmcm9tIGludGVybmFsc1xuZnVuY3Rpb24gZmluZEZvY3VzYWJsZSgkZWxlbWVudCkge1xuICBpZighJGVsZW1lbnQpIHtyZXR1cm4gZmFsc2U7IH1cbiAgcmV0dXJuICRlbGVtZW50LmZpbmQoJ2FbaHJlZl0sIGFyZWFbaHJlZl0sIGlucHV0Om5vdChbZGlzYWJsZWRdKSwgc2VsZWN0Om5vdChbZGlzYWJsZWRdKSwgdGV4dGFyZWE6bm90KFtkaXNhYmxlZF0pLCBidXR0b246bm90KFtkaXNhYmxlZF0pLCBpZnJhbWUsIG9iamVjdCwgZW1iZWQsICpbdGFiaW5kZXhdLCAqW2NvbnRlbnRlZGl0YWJsZV0nKS5maWx0ZXIoZnVuY3Rpb24oKSB7XG4gICAgaWYgKCEkKHRoaXMpLmlzKCc6dmlzaWJsZScpIHx8ICQodGhpcykuYXR0cigndGFiaW5kZXgnKSA8IDApIHsgcmV0dXJuIGZhbHNlOyB9IC8vb25seSBoYXZlIHZpc2libGUgZWxlbWVudHMgYW5kIHRob3NlIHRoYXQgaGF2ZSBhIHRhYmluZGV4IGdyZWF0ZXIgb3IgZXF1YWwgMFxuICAgIHJldHVybiB0cnVlO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gcGFyc2VLZXkoZXZlbnQpIHtcbiAgdmFyIGtleSA9IGtleUNvZGVzW2V2ZW50LndoaWNoIHx8IGV2ZW50LmtleUNvZGVdIHx8IFN0cmluZy5mcm9tQ2hhckNvZGUoZXZlbnQud2hpY2gpLnRvVXBwZXJDYXNlKCk7XG5cbiAgLy8gUmVtb3ZlIHVuLXByaW50YWJsZSBjaGFyYWN0ZXJzLCBlLmcuIGZvciBgZnJvbUNoYXJDb2RlYCBjYWxscyBmb3IgQ1RSTCBvbmx5IGV2ZW50c1xuICBrZXkgPSBrZXkucmVwbGFjZSgvXFxXKy8sICcnKTtcblxuICBpZiAoZXZlbnQuc2hpZnRLZXkpIGtleSA9IGBTSElGVF8ke2tleX1gO1xuICBpZiAoZXZlbnQuY3RybEtleSkga2V5ID0gYENUUkxfJHtrZXl9YDtcbiAgaWYgKGV2ZW50LmFsdEtleSkga2V5ID0gYEFMVF8ke2tleX1gO1xuXG4gIC8vIFJlbW92ZSB0cmFpbGluZyB1bmRlcnNjb3JlLCBpbiBjYXNlIG9ubHkgbW9kaWZpZXJzIHdlcmUgdXNlZCAoZS5nLiBvbmx5IGBDVFJMX0FMVGApXG4gIGtleSA9IGtleS5yZXBsYWNlKC9fJC8sICcnKTtcblxuICByZXR1cm4ga2V5O1xufVxuXG52YXIgS2V5Ym9hcmQgPSB7XG4gIGtleXM6IGdldEtleUNvZGVzKGtleUNvZGVzKSxcblxuICAvKipcbiAgICogUGFyc2VzIHRoZSAoa2V5Ym9hcmQpIGV2ZW50IGFuZCByZXR1cm5zIGEgU3RyaW5nIHRoYXQgcmVwcmVzZW50cyBpdHMga2V5XG4gICAqIENhbiBiZSB1c2VkIGxpa2UgRm91bmRhdGlvbi5wYXJzZUtleShldmVudCkgPT09IEZvdW5kYXRpb24ua2V5cy5TUEFDRVxuICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudCAtIHRoZSBldmVudCBnZW5lcmF0ZWQgYnkgdGhlIGV2ZW50IGhhbmRsZXJcbiAgICogQHJldHVybiBTdHJpbmcga2V5IC0gU3RyaW5nIHRoYXQgcmVwcmVzZW50cyB0aGUga2V5IHByZXNzZWRcbiAgICovXG4gIHBhcnNlS2V5OiBwYXJzZUtleSxcblxuICAvKipcbiAgICogSGFuZGxlcyB0aGUgZ2l2ZW4gKGtleWJvYXJkKSBldmVudFxuICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudCAtIHRoZSBldmVudCBnZW5lcmF0ZWQgYnkgdGhlIGV2ZW50IGhhbmRsZXJcbiAgICogQHBhcmFtIHtTdHJpbmd9IGNvbXBvbmVudCAtIEZvdW5kYXRpb24gY29tcG9uZW50J3MgbmFtZSwgZS5nLiBTbGlkZXIgb3IgUmV2ZWFsXG4gICAqIEBwYXJhbSB7T2JqZWN0c30gZnVuY3Rpb25zIC0gY29sbGVjdGlvbiBvZiBmdW5jdGlvbnMgdGhhdCBhcmUgdG8gYmUgZXhlY3V0ZWRcbiAgICovXG4gIGhhbmRsZUtleShldmVudCwgY29tcG9uZW50LCBmdW5jdGlvbnMpIHtcbiAgICB2YXIgY29tbWFuZExpc3QgPSBjb21tYW5kc1tjb21wb25lbnRdLFxuICAgICAga2V5Q29kZSA9IHRoaXMucGFyc2VLZXkoZXZlbnQpLFxuICAgICAgY21kcyxcbiAgICAgIGNvbW1hbmQsXG4gICAgICBmbjtcblxuICAgIGlmICghY29tbWFuZExpc3QpIHJldHVybiBjb25zb2xlLndhcm4oJ0NvbXBvbmVudCBub3QgZGVmaW5lZCEnKTtcblxuICAgIGlmICh0eXBlb2YgY29tbWFuZExpc3QubHRyID09PSAndW5kZWZpbmVkJykgeyAvLyB0aGlzIGNvbXBvbmVudCBkb2VzIG5vdCBkaWZmZXJlbnRpYXRlIGJldHdlZW4gbHRyIGFuZCBydGxcbiAgICAgICAgY21kcyA9IGNvbW1hbmRMaXN0OyAvLyB1c2UgcGxhaW4gbGlzdFxuICAgIH0gZWxzZSB7IC8vIG1lcmdlIGx0ciBhbmQgcnRsOiBpZiBkb2N1bWVudCBpcyBydGwsIHJ0bCBvdmVyd3JpdGVzIGx0ciBhbmQgdmljZSB2ZXJzYVxuICAgICAgICBpZiAoUnRsKCkpIGNtZHMgPSAkLmV4dGVuZCh7fSwgY29tbWFuZExpc3QubHRyLCBjb21tYW5kTGlzdC5ydGwpO1xuXG4gICAgICAgIGVsc2UgY21kcyA9ICQuZXh0ZW5kKHt9LCBjb21tYW5kTGlzdC5ydGwsIGNvbW1hbmRMaXN0Lmx0cik7XG4gICAgfVxuICAgIGNvbW1hbmQgPSBjbWRzW2tleUNvZGVdO1xuXG4gICAgZm4gPSBmdW5jdGlvbnNbY29tbWFuZF07XG4gICAgaWYgKGZuICYmIHR5cGVvZiBmbiA9PT0gJ2Z1bmN0aW9uJykgeyAvLyBleGVjdXRlIGZ1bmN0aW9uICBpZiBleGlzdHNcbiAgICAgIHZhciByZXR1cm5WYWx1ZSA9IGZuLmFwcGx5KCk7XG4gICAgICBpZiAoZnVuY3Rpb25zLmhhbmRsZWQgfHwgdHlwZW9mIGZ1bmN0aW9ucy5oYW5kbGVkID09PSAnZnVuY3Rpb24nKSB7IC8vIGV4ZWN1dGUgZnVuY3Rpb24gd2hlbiBldmVudCB3YXMgaGFuZGxlZFxuICAgICAgICAgIGZ1bmN0aW9ucy5oYW5kbGVkKHJldHVyblZhbHVlKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGZ1bmN0aW9ucy51bmhhbmRsZWQgfHwgdHlwZW9mIGZ1bmN0aW9ucy51bmhhbmRsZWQgPT09ICdmdW5jdGlvbicpIHsgLy8gZXhlY3V0ZSBmdW5jdGlvbiB3aGVuIGV2ZW50IHdhcyBub3QgaGFuZGxlZFxuICAgICAgICAgIGZ1bmN0aW9ucy51bmhhbmRsZWQoKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIEZpbmRzIGFsbCBmb2N1c2FibGUgZWxlbWVudHMgd2l0aGluIHRoZSBnaXZlbiBgJGVsZW1lbnRgXG4gICAqIEBwYXJhbSB7alF1ZXJ5fSAkZWxlbWVudCAtIGpRdWVyeSBvYmplY3QgdG8gc2VhcmNoIHdpdGhpblxuICAgKiBAcmV0dXJuIHtqUXVlcnl9ICRmb2N1c2FibGUgLSBhbGwgZm9jdXNhYmxlIGVsZW1lbnRzIHdpdGhpbiBgJGVsZW1lbnRgXG4gICAqL1xuXG4gIGZpbmRGb2N1c2FibGU6IGZpbmRGb2N1c2FibGUsXG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGNvbXBvbmVudCBuYW1lIG5hbWVcbiAgICogQHBhcmFtIHtPYmplY3R9IGNvbXBvbmVudCAtIEZvdW5kYXRpb24gY29tcG9uZW50LCBlLmcuIFNsaWRlciBvciBSZXZlYWxcbiAgICogQHJldHVybiBTdHJpbmcgY29tcG9uZW50TmFtZVxuICAgKi9cblxuICByZWdpc3Rlcihjb21wb25lbnROYW1lLCBjbWRzKSB7XG4gICAgY29tbWFuZHNbY29tcG9uZW50TmFtZV0gPSBjbWRzO1xuICB9LFxuXG5cbiAgLy8gVE9ETzk0Mzg6IFRoZXNlIHJlZmVyZW5jZXMgdG8gS2V5Ym9hcmQgbmVlZCB0byBub3QgcmVxdWlyZSBnbG9iYWwuIFdpbGwgJ3RoaXMnIHdvcmsgaW4gdGhpcyBjb250ZXh0P1xuICAvL1xuICAvKipcbiAgICogVHJhcHMgdGhlIGZvY3VzIGluIHRoZSBnaXZlbiBlbGVtZW50LlxuICAgKiBAcGFyYW0gIHtqUXVlcnl9ICRlbGVtZW50ICBqUXVlcnkgb2JqZWN0IHRvIHRyYXAgdGhlIGZvdWNzIGludG8uXG4gICAqL1xuICB0cmFwRm9jdXMoJGVsZW1lbnQpIHtcbiAgICB2YXIgJGZvY3VzYWJsZSA9IGZpbmRGb2N1c2FibGUoJGVsZW1lbnQpLFxuICAgICAgICAkZmlyc3RGb2N1c2FibGUgPSAkZm9jdXNhYmxlLmVxKDApLFxuICAgICAgICAkbGFzdEZvY3VzYWJsZSA9ICRmb2N1c2FibGUuZXEoLTEpO1xuXG4gICAgJGVsZW1lbnQub24oJ2tleWRvd24uemYudHJhcGZvY3VzJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgIGlmIChldmVudC50YXJnZXQgPT09ICRsYXN0Rm9jdXNhYmxlWzBdICYmIHBhcnNlS2V5KGV2ZW50KSA9PT0gJ1RBQicpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgJGZpcnN0Rm9jdXNhYmxlLmZvY3VzKCk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChldmVudC50YXJnZXQgPT09ICRmaXJzdEZvY3VzYWJsZVswXSAmJiBwYXJzZUtleShldmVudCkgPT09ICdTSElGVF9UQUInKSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICRsYXN0Rm9jdXNhYmxlLmZvY3VzKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0sXG4gIC8qKlxuICAgKiBSZWxlYXNlcyB0aGUgdHJhcHBlZCBmb2N1cyBmcm9tIHRoZSBnaXZlbiBlbGVtZW50LlxuICAgKiBAcGFyYW0gIHtqUXVlcnl9ICRlbGVtZW50ICBqUXVlcnkgb2JqZWN0IHRvIHJlbGVhc2UgdGhlIGZvY3VzIGZvci5cbiAgICovXG4gIHJlbGVhc2VGb2N1cygkZWxlbWVudCkge1xuICAgICRlbGVtZW50Lm9mZigna2V5ZG93bi56Zi50cmFwZm9jdXMnKTtcbiAgfVxufVxuXG4vKlxuICogQ29uc3RhbnRzIGZvciBlYXNpZXIgY29tcGFyaW5nLlxuICogQ2FuIGJlIHVzZWQgbGlrZSBGb3VuZGF0aW9uLnBhcnNlS2V5KGV2ZW50KSA9PT0gRm91bmRhdGlvbi5rZXlzLlNQQUNFXG4gKi9cbmZ1bmN0aW9uIGdldEtleUNvZGVzKGtjcykge1xuICB2YXIgayA9IHt9O1xuICBmb3IgKHZhciBrYyBpbiBrY3MpIGtba2NzW2tjXV0gPSBrY3Nba2NdO1xuICByZXR1cm4gaztcbn1cblxuZXhwb3J0IHtLZXlib2FyZH07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLnV0aWwua2V5Ym9hcmQuanMiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5pbXBvcnQgeyBNb3Rpb24gfSBmcm9tICcuL2ZvdW5kYXRpb24udXRpbC5tb3Rpb24nO1xuXG5jb25zdCBNdXRhdGlvbk9ic2VydmVyID0gKGZ1bmN0aW9uICgpIHtcbiAgdmFyIHByZWZpeGVzID0gWydXZWJLaXQnLCAnTW96JywgJ08nLCAnTXMnLCAnJ107XG4gIGZvciAodmFyIGk9MDsgaSA8IHByZWZpeGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGAke3ByZWZpeGVzW2ldfU11dGF0aW9uT2JzZXJ2ZXJgIGluIHdpbmRvdykge1xuICAgICAgcmV0dXJuIHdpbmRvd1tgJHtwcmVmaXhlc1tpXX1NdXRhdGlvbk9ic2VydmVyYF07XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn0oKSk7XG5cbmNvbnN0IHRyaWdnZXJzID0gKGVsLCB0eXBlKSA9PiB7XG4gIGVsLmRhdGEodHlwZSkuc3BsaXQoJyAnKS5mb3JFYWNoKGlkID0+IHtcbiAgICAkKGAjJHtpZH1gKVsgdHlwZSA9PT0gJ2Nsb3NlJyA/ICd0cmlnZ2VyJyA6ICd0cmlnZ2VySGFuZGxlciddKGAke3R5cGV9LnpmLnRyaWdnZXJgLCBbZWxdKTtcbiAgfSk7XG59O1xuXG52YXIgVHJpZ2dlcnMgPSB7XG4gIExpc3RlbmVyczoge1xuICAgIEJhc2ljOiB7fSxcbiAgICBHbG9iYWw6IHt9XG4gIH0sXG4gIEluaXRpYWxpemVyczoge31cbn1cblxuVHJpZ2dlcnMuTGlzdGVuZXJzLkJhc2ljICA9IHtcbiAgb3Blbkxpc3RlbmVyOiBmdW5jdGlvbigpIHtcbiAgICB0cmlnZ2VycygkKHRoaXMpLCAnb3BlbicpO1xuICB9LFxuICBjbG9zZUxpc3RlbmVyOiBmdW5jdGlvbigpIHtcbiAgICBsZXQgaWQgPSAkKHRoaXMpLmRhdGEoJ2Nsb3NlJyk7XG4gICAgaWYgKGlkKSB7XG4gICAgICB0cmlnZ2VycygkKHRoaXMpLCAnY2xvc2UnKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAkKHRoaXMpLnRyaWdnZXIoJ2Nsb3NlLnpmLnRyaWdnZXInKTtcbiAgICB9XG4gIH0sXG4gIHRvZ2dsZUxpc3RlbmVyOiBmdW5jdGlvbigpIHtcbiAgICBsZXQgaWQgPSAkKHRoaXMpLmRhdGEoJ3RvZ2dsZScpO1xuICAgIGlmIChpZCkge1xuICAgICAgdHJpZ2dlcnMoJCh0aGlzKSwgJ3RvZ2dsZScpO1xuICAgIH0gZWxzZSB7XG4gICAgICAkKHRoaXMpLnRyaWdnZXIoJ3RvZ2dsZS56Zi50cmlnZ2VyJyk7XG4gICAgfVxuICB9LFxuICBjbG9zZWFibGVMaXN0ZW5lcjogZnVuY3Rpb24oZSkge1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgbGV0IGFuaW1hdGlvbiA9ICQodGhpcykuZGF0YSgnY2xvc2FibGUnKTtcblxuICAgIGlmKGFuaW1hdGlvbiAhPT0gJycpe1xuICAgICAgTW90aW9uLmFuaW1hdGVPdXQoJCh0aGlzKSwgYW5pbWF0aW9uLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJCh0aGlzKS50cmlnZ2VyKCdjbG9zZWQuemYnKTtcbiAgICAgIH0pO1xuICAgIH1lbHNle1xuICAgICAgJCh0aGlzKS5mYWRlT3V0KCkudHJpZ2dlcignY2xvc2VkLnpmJyk7XG4gICAgfVxuICB9LFxuICB0b2dnbGVGb2N1c0xpc3RlbmVyOiBmdW5jdGlvbigpIHtcbiAgICBsZXQgaWQgPSAkKHRoaXMpLmRhdGEoJ3RvZ2dsZS1mb2N1cycpO1xuICAgICQoYCMke2lkfWApLnRyaWdnZXJIYW5kbGVyKCd0b2dnbGUuemYudHJpZ2dlcicsIFskKHRoaXMpXSk7XG4gIH1cbn07XG5cbi8vIEVsZW1lbnRzIHdpdGggW2RhdGEtb3Blbl0gd2lsbCByZXZlYWwgYSBwbHVnaW4gdGhhdCBzdXBwb3J0cyBpdCB3aGVuIGNsaWNrZWQuXG5UcmlnZ2Vycy5Jbml0aWFsaXplcnMuYWRkT3Blbkxpc3RlbmVyID0gKCRlbGVtKSA9PiB7XG4gICRlbGVtLm9mZignY2xpY2suemYudHJpZ2dlcicsIFRyaWdnZXJzLkxpc3RlbmVycy5CYXNpYy5vcGVuTGlzdGVuZXIpO1xuICAkZWxlbS5vbignY2xpY2suemYudHJpZ2dlcicsICdbZGF0YS1vcGVuXScsIFRyaWdnZXJzLkxpc3RlbmVycy5CYXNpYy5vcGVuTGlzdGVuZXIpO1xufVxuXG4vLyBFbGVtZW50cyB3aXRoIFtkYXRhLWNsb3NlXSB3aWxsIGNsb3NlIGEgcGx1Z2luIHRoYXQgc3VwcG9ydHMgaXQgd2hlbiBjbGlja2VkLlxuLy8gSWYgdXNlZCB3aXRob3V0IGEgdmFsdWUgb24gW2RhdGEtY2xvc2VdLCB0aGUgZXZlbnQgd2lsbCBidWJibGUsIGFsbG93aW5nIGl0IHRvIGNsb3NlIGEgcGFyZW50IGNvbXBvbmVudC5cblRyaWdnZXJzLkluaXRpYWxpemVycy5hZGRDbG9zZUxpc3RlbmVyID0gKCRlbGVtKSA9PiB7XG4gICRlbGVtLm9mZignY2xpY2suemYudHJpZ2dlcicsIFRyaWdnZXJzLkxpc3RlbmVycy5CYXNpYy5jbG9zZUxpc3RlbmVyKTtcbiAgJGVsZW0ub24oJ2NsaWNrLnpmLnRyaWdnZXInLCAnW2RhdGEtY2xvc2VdJywgVHJpZ2dlcnMuTGlzdGVuZXJzLkJhc2ljLmNsb3NlTGlzdGVuZXIpO1xufVxuXG4vLyBFbGVtZW50cyB3aXRoIFtkYXRhLXRvZ2dsZV0gd2lsbCB0b2dnbGUgYSBwbHVnaW4gdGhhdCBzdXBwb3J0cyBpdCB3aGVuIGNsaWNrZWQuXG5UcmlnZ2Vycy5Jbml0aWFsaXplcnMuYWRkVG9nZ2xlTGlzdGVuZXIgPSAoJGVsZW0pID0+IHtcbiAgJGVsZW0ub2ZmKCdjbGljay56Zi50cmlnZ2VyJywgVHJpZ2dlcnMuTGlzdGVuZXJzLkJhc2ljLnRvZ2dsZUxpc3RlbmVyKTtcbiAgJGVsZW0ub24oJ2NsaWNrLnpmLnRyaWdnZXInLCAnW2RhdGEtdG9nZ2xlXScsIFRyaWdnZXJzLkxpc3RlbmVycy5CYXNpYy50b2dnbGVMaXN0ZW5lcik7XG59XG5cbi8vIEVsZW1lbnRzIHdpdGggW2RhdGEtY2xvc2FibGVdIHdpbGwgcmVzcG9uZCB0byBjbG9zZS56Zi50cmlnZ2VyIGV2ZW50cy5cblRyaWdnZXJzLkluaXRpYWxpemVycy5hZGRDbG9zZWFibGVMaXN0ZW5lciA9ICgkZWxlbSkgPT4ge1xuICAkZWxlbS5vZmYoJ2Nsb3NlLnpmLnRyaWdnZXInLCBUcmlnZ2Vycy5MaXN0ZW5lcnMuQmFzaWMuY2xvc2VhYmxlTGlzdGVuZXIpO1xuICAkZWxlbS5vbignY2xvc2UuemYudHJpZ2dlcicsICdbZGF0YS1jbG9zZWFibGVdLCBbZGF0YS1jbG9zYWJsZV0nLCBUcmlnZ2Vycy5MaXN0ZW5lcnMuQmFzaWMuY2xvc2VhYmxlTGlzdGVuZXIpO1xufVxuXG4vLyBFbGVtZW50cyB3aXRoIFtkYXRhLXRvZ2dsZS1mb2N1c10gd2lsbCByZXNwb25kIHRvIGNvbWluZyBpbiBhbmQgb3V0IG9mIGZvY3VzXG5UcmlnZ2Vycy5Jbml0aWFsaXplcnMuYWRkVG9nZ2xlRm9jdXNMaXN0ZW5lciA9ICgkZWxlbSkgPT4ge1xuICAkZWxlbS5vZmYoJ2ZvY3VzLnpmLnRyaWdnZXIgYmx1ci56Zi50cmlnZ2VyJywgVHJpZ2dlcnMuTGlzdGVuZXJzLkJhc2ljLnRvZ2dsZUZvY3VzTGlzdGVuZXIpO1xuICAkZWxlbS5vbignZm9jdXMuemYudHJpZ2dlciBibHVyLnpmLnRyaWdnZXInLCAnW2RhdGEtdG9nZ2xlLWZvY3VzXScsIFRyaWdnZXJzLkxpc3RlbmVycy5CYXNpYy50b2dnbGVGb2N1c0xpc3RlbmVyKTtcbn1cblxuXG5cbi8vIE1vcmUgR2xvYmFsL2NvbXBsZXggbGlzdGVuZXJzIGFuZCB0cmlnZ2Vyc1xuVHJpZ2dlcnMuTGlzdGVuZXJzLkdsb2JhbCAgPSB7XG4gIHJlc2l6ZUxpc3RlbmVyOiBmdW5jdGlvbigkbm9kZXMpIHtcbiAgICBpZighTXV0YXRpb25PYnNlcnZlcil7Ly9mYWxsYmFjayBmb3IgSUUgOVxuICAgICAgJG5vZGVzLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgICAgJCh0aGlzKS50cmlnZ2VySGFuZGxlcigncmVzaXplbWUuemYudHJpZ2dlcicpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIC8vdHJpZ2dlciBhbGwgbGlzdGVuaW5nIGVsZW1lbnRzIGFuZCBzaWduYWwgYSByZXNpemUgZXZlbnRcbiAgICAkbm9kZXMuYXR0cignZGF0YS1ldmVudHMnLCBcInJlc2l6ZVwiKTtcbiAgfSxcbiAgc2Nyb2xsTGlzdGVuZXI6IGZ1bmN0aW9uKCRub2Rlcykge1xuICAgIGlmKCFNdXRhdGlvbk9ic2VydmVyKXsvL2ZhbGxiYWNrIGZvciBJRSA5XG4gICAgICAkbm9kZXMuZWFjaChmdW5jdGlvbigpe1xuICAgICAgICAkKHRoaXMpLnRyaWdnZXJIYW5kbGVyKCdzY3JvbGxtZS56Zi50cmlnZ2VyJyk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgLy90cmlnZ2VyIGFsbCBsaXN0ZW5pbmcgZWxlbWVudHMgYW5kIHNpZ25hbCBhIHNjcm9sbCBldmVudFxuICAgICRub2Rlcy5hdHRyKCdkYXRhLWV2ZW50cycsIFwic2Nyb2xsXCIpO1xuICB9LFxuICBjbG9zZU1lTGlzdGVuZXI6IGZ1bmN0aW9uKGUsIHBsdWdpbklkKXtcbiAgICBsZXQgcGx1Z2luID0gZS5uYW1lc3BhY2Uuc3BsaXQoJy4nKVswXTtcbiAgICBsZXQgcGx1Z2lucyA9ICQoYFtkYXRhLSR7cGx1Z2lufV1gKS5ub3QoYFtkYXRhLXlldGktYm94PVwiJHtwbHVnaW5JZH1cIl1gKTtcblxuICAgIHBsdWdpbnMuZWFjaChmdW5jdGlvbigpe1xuICAgICAgbGV0IF90aGlzID0gJCh0aGlzKTtcbiAgICAgIF90aGlzLnRyaWdnZXJIYW5kbGVyKCdjbG9zZS56Zi50cmlnZ2VyJywgW190aGlzXSk7XG4gICAgfSk7XG4gIH1cbn1cblxuLy8gR2xvYmFsLCBwYXJzZXMgd2hvbGUgZG9jdW1lbnQuXG5UcmlnZ2Vycy5Jbml0aWFsaXplcnMuYWRkQ2xvc2VtZUxpc3RlbmVyID0gZnVuY3Rpb24ocGx1Z2luTmFtZSkge1xuICB2YXIgeWV0aUJveGVzID0gJCgnW2RhdGEteWV0aS1ib3hdJyksXG4gICAgICBwbHVnTmFtZXMgPSBbJ2Ryb3Bkb3duJywgJ3Rvb2x0aXAnLCAncmV2ZWFsJ107XG5cbiAgaWYocGx1Z2luTmFtZSl7XG4gICAgaWYodHlwZW9mIHBsdWdpbk5hbWUgPT09ICdzdHJpbmcnKXtcbiAgICAgIHBsdWdOYW1lcy5wdXNoKHBsdWdpbk5hbWUpO1xuICAgIH1lbHNlIGlmKHR5cGVvZiBwbHVnaW5OYW1lID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgcGx1Z2luTmFtZVswXSA9PT0gJ3N0cmluZycpe1xuICAgICAgcGx1Z05hbWVzLmNvbmNhdChwbHVnaW5OYW1lKTtcbiAgICB9ZWxzZXtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ1BsdWdpbiBuYW1lcyBtdXN0IGJlIHN0cmluZ3MnKTtcbiAgICB9XG4gIH1cbiAgaWYoeWV0aUJveGVzLmxlbmd0aCl7XG4gICAgbGV0IGxpc3RlbmVycyA9IHBsdWdOYW1lcy5tYXAoKG5hbWUpID0+IHtcbiAgICAgIHJldHVybiBgY2xvc2VtZS56Zi4ke25hbWV9YDtcbiAgICB9KS5qb2luKCcgJyk7XG5cbiAgICAkKHdpbmRvdykub2ZmKGxpc3RlbmVycykub24obGlzdGVuZXJzLCBUcmlnZ2Vycy5MaXN0ZW5lcnMuR2xvYmFsLmNsb3NlTWVMaXN0ZW5lcik7XG4gIH1cbn1cblxuZnVuY3Rpb24gZGVib3VuY2VHbG9iYWxMaXN0ZW5lcihkZWJvdW5jZSwgdHJpZ2dlciwgbGlzdGVuZXIpIHtcbiAgbGV0IHRpbWVyLCBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAzKTtcbiAgJCh3aW5kb3cpLm9mZih0cmlnZ2VyKS5vbih0cmlnZ2VyLCBmdW5jdGlvbihlKSB7XG4gICAgaWYgKHRpbWVyKSB7IGNsZWFyVGltZW91dCh0aW1lcik7IH1cbiAgICB0aW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgIGxpc3RlbmVyLmFwcGx5KG51bGwsIGFyZ3MpO1xuICAgIH0sIGRlYm91bmNlIHx8IDEwKTsvL2RlZmF1bHQgdGltZSB0byBlbWl0IHNjcm9sbCBldmVudFxuICB9KTtcbn1cblxuVHJpZ2dlcnMuSW5pdGlhbGl6ZXJzLmFkZFJlc2l6ZUxpc3RlbmVyID0gZnVuY3Rpb24oZGVib3VuY2Upe1xuICBsZXQgJG5vZGVzID0gJCgnW2RhdGEtcmVzaXplXScpO1xuICBpZigkbm9kZXMubGVuZ3RoKXtcbiAgICBkZWJvdW5jZUdsb2JhbExpc3RlbmVyKGRlYm91bmNlLCAncmVzaXplLnpmLnRyaWdnZXInLCBUcmlnZ2Vycy5MaXN0ZW5lcnMuR2xvYmFsLnJlc2l6ZUxpc3RlbmVyLCAkbm9kZXMpO1xuICB9XG59XG5cblRyaWdnZXJzLkluaXRpYWxpemVycy5hZGRTY3JvbGxMaXN0ZW5lciA9IGZ1bmN0aW9uKGRlYm91bmNlKXtcbiAgbGV0ICRub2RlcyA9ICQoJ1tkYXRhLXNjcm9sbF0nKTtcbiAgaWYoJG5vZGVzLmxlbmd0aCl7XG4gICAgZGVib3VuY2VHbG9iYWxMaXN0ZW5lcihkZWJvdW5jZSwgJ3Njcm9sbC56Zi50cmlnZ2VyJywgVHJpZ2dlcnMuTGlzdGVuZXJzLkdsb2JhbC5zY3JvbGxMaXN0ZW5lciwgJG5vZGVzKTtcbiAgfVxufVxuXG5UcmlnZ2Vycy5Jbml0aWFsaXplcnMuYWRkTXV0YXRpb25FdmVudHNMaXN0ZW5lciA9IGZ1bmN0aW9uKCRlbGVtKSB7XG4gIGlmKCFNdXRhdGlvbk9ic2VydmVyKXsgcmV0dXJuIGZhbHNlOyB9XG4gIGxldCAkbm9kZXMgPSAkZWxlbS5maW5kKCdbZGF0YS1yZXNpemVdLCBbZGF0YS1zY3JvbGxdLCBbZGF0YS1tdXRhdGVdJyk7XG5cbiAgLy9lbGVtZW50IGNhbGxiYWNrXG4gIHZhciBsaXN0ZW5pbmdFbGVtZW50c011dGF0aW9uID0gZnVuY3Rpb24gKG11dGF0aW9uUmVjb3Jkc0xpc3QpIHtcbiAgICB2YXIgJHRhcmdldCA9ICQobXV0YXRpb25SZWNvcmRzTGlzdFswXS50YXJnZXQpO1xuXG4gICAgLy90cmlnZ2VyIHRoZSBldmVudCBoYW5kbGVyIGZvciB0aGUgZWxlbWVudCBkZXBlbmRpbmcgb24gdHlwZVxuICAgIHN3aXRjaCAobXV0YXRpb25SZWNvcmRzTGlzdFswXS50eXBlKSB7XG4gICAgICBjYXNlIFwiYXR0cmlidXRlc1wiOlxuICAgICAgICBpZiAoJHRhcmdldC5hdHRyKFwiZGF0YS1ldmVudHNcIikgPT09IFwic2Nyb2xsXCIgJiYgbXV0YXRpb25SZWNvcmRzTGlzdFswXS5hdHRyaWJ1dGVOYW1lID09PSBcImRhdGEtZXZlbnRzXCIpIHtcbiAgICAgICAgICAkdGFyZ2V0LnRyaWdnZXJIYW5kbGVyKCdzY3JvbGxtZS56Zi50cmlnZ2VyJywgWyR0YXJnZXQsIHdpbmRvdy5wYWdlWU9mZnNldF0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICgkdGFyZ2V0LmF0dHIoXCJkYXRhLWV2ZW50c1wiKSA9PT0gXCJyZXNpemVcIiAmJiBtdXRhdGlvblJlY29yZHNMaXN0WzBdLmF0dHJpYnV0ZU5hbWUgPT09IFwiZGF0YS1ldmVudHNcIikge1xuICAgICAgICAgICR0YXJnZXQudHJpZ2dlckhhbmRsZXIoJ3Jlc2l6ZW1lLnpmLnRyaWdnZXInLCBbJHRhcmdldF0pO1xuICAgICAgICAgfVxuICAgICAgICBpZiAobXV0YXRpb25SZWNvcmRzTGlzdFswXS5hdHRyaWJ1dGVOYW1lID09PSBcInN0eWxlXCIpIHtcbiAgICAgICAgICAkdGFyZ2V0LmNsb3Nlc3QoXCJbZGF0YS1tdXRhdGVdXCIpLmF0dHIoXCJkYXRhLWV2ZW50c1wiLFwibXV0YXRlXCIpO1xuICAgICAgICAgICR0YXJnZXQuY2xvc2VzdChcIltkYXRhLW11dGF0ZV1cIikudHJpZ2dlckhhbmRsZXIoJ211dGF0ZW1lLnpmLnRyaWdnZXInLCBbJHRhcmdldC5jbG9zZXN0KFwiW2RhdGEtbXV0YXRlXVwiKV0pO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIFwiY2hpbGRMaXN0XCI6XG4gICAgICAgICR0YXJnZXQuY2xvc2VzdChcIltkYXRhLW11dGF0ZV1cIikuYXR0cihcImRhdGEtZXZlbnRzXCIsXCJtdXRhdGVcIik7XG4gICAgICAgICR0YXJnZXQuY2xvc2VzdChcIltkYXRhLW11dGF0ZV1cIikudHJpZ2dlckhhbmRsZXIoJ211dGF0ZW1lLnpmLnRyaWdnZXInLCBbJHRhcmdldC5jbG9zZXN0KFwiW2RhdGEtbXV0YXRlXVwiKV0pO1xuICAgICAgICBicmVhaztcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgLy9ub3RoaW5nXG4gICAgfVxuICB9O1xuXG4gIGlmICgkbm9kZXMubGVuZ3RoKSB7XG4gICAgLy9mb3IgZWFjaCBlbGVtZW50IHRoYXQgbmVlZHMgdG8gbGlzdGVuIGZvciByZXNpemluZywgc2Nyb2xsaW5nLCBvciBtdXRhdGlvbiBhZGQgYSBzaW5nbGUgb2JzZXJ2ZXJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8PSAkbm9kZXMubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICB2YXIgZWxlbWVudE9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIobGlzdGVuaW5nRWxlbWVudHNNdXRhdGlvbik7XG4gICAgICBlbGVtZW50T2JzZXJ2ZXIub2JzZXJ2ZSgkbm9kZXNbaV0sIHsgYXR0cmlidXRlczogdHJ1ZSwgY2hpbGRMaXN0OiB0cnVlLCBjaGFyYWN0ZXJEYXRhOiBmYWxzZSwgc3VidHJlZTogdHJ1ZSwgYXR0cmlidXRlRmlsdGVyOiBbXCJkYXRhLWV2ZW50c1wiLCBcInN0eWxlXCJdIH0pO1xuICAgIH1cbiAgfVxufVxuXG5UcmlnZ2Vycy5Jbml0aWFsaXplcnMuYWRkU2ltcGxlTGlzdGVuZXJzID0gZnVuY3Rpb24oKSB7XG4gIGxldCAkZG9jdW1lbnQgPSAkKGRvY3VtZW50KTtcblxuICBUcmlnZ2Vycy5Jbml0aWFsaXplcnMuYWRkT3Blbkxpc3RlbmVyKCRkb2N1bWVudCk7XG4gIFRyaWdnZXJzLkluaXRpYWxpemVycy5hZGRDbG9zZUxpc3RlbmVyKCRkb2N1bWVudCk7XG4gIFRyaWdnZXJzLkluaXRpYWxpemVycy5hZGRUb2dnbGVMaXN0ZW5lcigkZG9jdW1lbnQpO1xuICBUcmlnZ2Vycy5Jbml0aWFsaXplcnMuYWRkQ2xvc2VhYmxlTGlzdGVuZXIoJGRvY3VtZW50KTtcbiAgVHJpZ2dlcnMuSW5pdGlhbGl6ZXJzLmFkZFRvZ2dsZUZvY3VzTGlzdGVuZXIoJGRvY3VtZW50KTtcblxufVxuXG5UcmlnZ2Vycy5Jbml0aWFsaXplcnMuYWRkR2xvYmFsTGlzdGVuZXJzID0gZnVuY3Rpb24oKSB7XG4gIGxldCAkZG9jdW1lbnQgPSAkKGRvY3VtZW50KTtcbiAgVHJpZ2dlcnMuSW5pdGlhbGl6ZXJzLmFkZE11dGF0aW9uRXZlbnRzTGlzdGVuZXIoJGRvY3VtZW50KTtcbiAgVHJpZ2dlcnMuSW5pdGlhbGl6ZXJzLmFkZFJlc2l6ZUxpc3RlbmVyKCk7XG4gIFRyaWdnZXJzLkluaXRpYWxpemVycy5hZGRTY3JvbGxMaXN0ZW5lcigpO1xuICBUcmlnZ2Vycy5Jbml0aWFsaXplcnMuYWRkQ2xvc2VtZUxpc3RlbmVyKCk7XG59XG5cblxuVHJpZ2dlcnMuaW5pdCA9IGZ1bmN0aW9uKCQsIEZvdW5kYXRpb24pIHtcbiAgaWYgKHR5cGVvZigkLnRyaWdnZXJzSW5pdGlhbGl6ZWQpID09PSAndW5kZWZpbmVkJykge1xuICAgIGxldCAkZG9jdW1lbnQgPSAkKGRvY3VtZW50KTtcblxuICAgIGlmKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09IFwiY29tcGxldGVcIikge1xuICAgICAgVHJpZ2dlcnMuSW5pdGlhbGl6ZXJzLmFkZFNpbXBsZUxpc3RlbmVycygpO1xuICAgICAgVHJpZ2dlcnMuSW5pdGlhbGl6ZXJzLmFkZEdsb2JhbExpc3RlbmVycygpO1xuICAgIH0gZWxzZSB7XG4gICAgICAkKHdpbmRvdykub24oJ2xvYWQnLCAoKSA9PiB7XG4gICAgICAgIFRyaWdnZXJzLkluaXRpYWxpemVycy5hZGRTaW1wbGVMaXN0ZW5lcnMoKTtcbiAgICAgICAgVHJpZ2dlcnMuSW5pdGlhbGl6ZXJzLmFkZEdsb2JhbExpc3RlbmVycygpO1xuICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICAkLnRyaWdnZXJzSW5pdGlhbGl6ZWQgPSB0cnVlO1xuICB9XG5cbiAgaWYoRm91bmRhdGlvbikge1xuICAgIEZvdW5kYXRpb24uVHJpZ2dlcnMgPSBUcmlnZ2VycztcbiAgICAvLyBMZWdhY3kgaW5jbHVkZWQgdG8gYmUgYmFja3dhcmRzIGNvbXBhdGlibGUgZm9yIG5vdy5cbiAgICBGb3VuZGF0aW9uLklIZWFyWW91ID0gVHJpZ2dlcnMuSW5pdGlhbGl6ZXJzLmFkZEdsb2JhbExpc3RlbmVyc1xuICB9XG59XG5cbmV4cG9ydCB7VHJpZ2dlcnN9O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi51dGlsLnRyaWdnZXJzLmpzIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IHsgR2V0WW9EaWdpdHMgfSBmcm9tICcuL2ZvdW5kYXRpb24udXRpbC5jb3JlJztcblxuLy8gQWJzdHJhY3QgY2xhc3MgZm9yIHByb3ZpZGluZyBsaWZlY3ljbGUgaG9va3MuIEV4cGVjdCBwbHVnaW5zIHRvIGRlZmluZSBBVCBMRUFTVFxuLy8ge2Z1bmN0aW9ufSBfc2V0dXAgKHJlcGxhY2VzIHByZXZpb3VzIGNvbnN0cnVjdG9yKSxcbi8vIHtmdW5jdGlvbn0gX2Rlc3Ryb3kgKHJlcGxhY2VzIHByZXZpb3VzIGRlc3Ryb3kpXG5jbGFzcyBQbHVnaW4ge1xuXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICB0aGlzLl9zZXR1cChlbGVtZW50LCBvcHRpb25zKTtcbiAgICB2YXIgcGx1Z2luTmFtZSA9IGdldFBsdWdpbk5hbWUodGhpcyk7XG4gICAgdGhpcy51dWlkID0gR2V0WW9EaWdpdHMoNiwgcGx1Z2luTmFtZSk7XG5cbiAgICBpZighdGhpcy4kZWxlbWVudC5hdHRyKGBkYXRhLSR7cGx1Z2luTmFtZX1gKSl7IHRoaXMuJGVsZW1lbnQuYXR0cihgZGF0YS0ke3BsdWdpbk5hbWV9YCwgdGhpcy51dWlkKTsgfVxuICAgIGlmKCF0aGlzLiRlbGVtZW50LmRhdGEoJ3pmUGx1Z2luJykpeyB0aGlzLiRlbGVtZW50LmRhdGEoJ3pmUGx1Z2luJywgdGhpcyk7IH1cbiAgICAvKipcbiAgICAgKiBGaXJlcyB3aGVuIHRoZSBwbHVnaW4gaGFzIGluaXRpYWxpemVkLlxuICAgICAqIEBldmVudCBQbHVnaW4jaW5pdFxuICAgICAqL1xuICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlcihgaW5pdC56Zi4ke3BsdWdpbk5hbWV9YCk7XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHRoaXMuX2Rlc3Ryb3koKTtcbiAgICB2YXIgcGx1Z2luTmFtZSA9IGdldFBsdWdpbk5hbWUodGhpcyk7XG4gICAgdGhpcy4kZWxlbWVudC5yZW1vdmVBdHRyKGBkYXRhLSR7cGx1Z2luTmFtZX1gKS5yZW1vdmVEYXRhKCd6ZlBsdWdpbicpXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBGaXJlcyB3aGVuIHRoZSBwbHVnaW4gaGFzIGJlZW4gZGVzdHJveWVkLlxuICAgICAgICAgKiBAZXZlbnQgUGx1Z2luI2Rlc3Ryb3llZFxuICAgICAgICAgKi9cbiAgICAgICAgLnRyaWdnZXIoYGRlc3Ryb3llZC56Zi4ke3BsdWdpbk5hbWV9YCk7XG4gICAgZm9yKHZhciBwcm9wIGluIHRoaXMpe1xuICAgICAgdGhpc1twcm9wXSA9IG51bGw7Ly9jbGVhbiB1cCBzY3JpcHQgdG8gcHJlcCBmb3IgZ2FyYmFnZSBjb2xsZWN0aW9uLlxuICAgIH1cbiAgfVxufVxuXG4vLyBDb252ZXJ0IFBhc2NhbENhc2UgdG8ga2ViYWItY2FzZVxuLy8gVGhhbmsgeW91OiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS84OTU1NTgwXG5mdW5jdGlvbiBoeXBoZW5hdGUoc3RyKSB7XG4gIHJldHVybiBzdHIucmVwbGFjZSgvKFthLXpdKShbQS1aXSkvZywgJyQxLSQyJykudG9Mb3dlckNhc2UoKTtcbn1cblxuZnVuY3Rpb24gZ2V0UGx1Z2luTmFtZShvYmopIHtcbiAgaWYodHlwZW9mKG9iai5jb25zdHJ1Y3Rvci5uYW1lKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm4gaHlwaGVuYXRlKG9iai5jb25zdHJ1Y3Rvci5uYW1lKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gaHlwaGVuYXRlKG9iai5jbGFzc05hbWUpO1xuICB9XG59XG5cbmV4cG9ydCB7UGx1Z2lufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24ucGx1Z2luLmpzIiwiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcclxuXHJcbmltcG9ydCB3aGF0SW5wdXQgZnJvbSAnd2hhdC1pbnB1dCc7XHJcblxyXG53aW5kb3cuJCA9ICQ7XHJcblxyXG4vLyBpbXBvcnQgRm91bmRhdGlvbiBmcm9tICdmb3VuZGF0aW9uLXNpdGVzJztcclxuXHJcbi8vIElmIHlvdSB3YW50IHRvIHBpY2sgYW5kIGNob29zZSB3aGljaCBtb2R1bGVzIHRvIGluY2x1ZGUsIGNvbW1lbnQgb3V0IHRoZSBhYm92ZSBhbmQgdW5jb21tZW50XHJcbi8vIHRoZSBsaW5lIGJlbG93XHJcbmltcG9ydCAnLi9saWIvZm91bmRhdGlvbi1leHBsaWNpdC1waWVjZXMnO1xyXG5cclxuJChkb2N1bWVudCkuZm91bmRhdGlvbigpO1xyXG5cclxuJCgnLnRhYi1pbm5lcicpLmZpbHRlcignOmZpcnN0JykuYWRkQ2xhc3MoJ2FjdGl2ZS10YWInKTtcclxuJCgnLmJhLXRhYi1jaXJjbGUnKS5maWx0ZXIoJzpmaXJzdCcpLmFkZENsYXNzKCdhY3RpdmUtdGFiLWNpcmNsZScpO1xyXG5cclxuJCgnLmJhLXN5bXB0b21zLXRhYnMgLnRhYi1pbm5lcicpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgbGV0IHRhYl9pZCA9ICQodGhpcykuYXR0cignZGF0YS1pZCcpO1xyXG4gICAgJCgnLmJhLXN5bXB0b21zLWNvbnRlbnQnKS5maW5kKCcuYmEtdGFiLWNpcmNsZScpLnJlbW92ZUNsYXNzKCdhY3RpdmUtdGFiLWNpcmNsZScpLmhpZGUoKTtcclxuICAgICQoJy5iYS1zeW1wdG9tcy1jb250ZW50JykuZmluZCgnLnRhYi1pbm5lcicpLnJlbW92ZUNsYXNzKCdhY3RpdmUtdGFiJyk7XHJcbiAgICAkKHRoaXMpLmFkZENsYXNzKCdhY3RpdmUtdGFiJyk7XHJcbiAgICAkKCcjdGFiLWNpcmNsZS0nICsgdGFiX2lkKS5hZGRDbGFzcygnYWN0aXZlLXRhYi1jaXJjbGUnKS5mYWRlSW4oKTtcclxuICAgIHJldHVybiBmYWxzZTtcclxufSlcclxuXHJcbi8vIFRhYnNcclxuXHJcbiQoJy50YWJzLXRpdGxlJykuZmlsdGVyKCc6Zmlyc3QnKS5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiQoJy50YWJzLXRpdGxlIC5iYS10ZXN0aW1vbmlhbC1jYXQtYnV0dG9uJykuZmlsdGVyKCc6Zmlyc3QnKS5hdHRyKCdhcmlhLXNlbGVjdGVkJywgdHJ1ZSk7XHJcblxyXG4kKCcuYmEtdGVzdGltb25pYWwtY2F0LWJ1dHRvbicpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAkLmdldFNjcmlwdCggXCIvd3AtY29udGVudC90aGVtZXMvc3dlZGlzaGJpdHRlci9sb2FkbW9yZS5qc1wiLCBmdW5jdGlvbiggZGF0YSwgdGV4dFN0YXR1cywganF4aHIgKSB7XHJcblxyXG4gICAgfSk7XHJcbn0pO1xyXG5cclxubGV0IHRlc3RpbW9uaWFsX2NhdDtcclxuXHJcbiQoZnVuY3Rpb24oKXtcclxuICAgICQoJy5iYS10ZXN0aW1vbmlhbC1jYXQtYnV0dG9uJykuY2xpY2soZnVuY3Rpb24oKXtcclxuICAgICAgICB0ZXN0aW1vbmlhbF9jYXQgPSAkKHRoaXMpLmRhdGEoJ3Rlc3RpbW9uaWFscy1jYXQnKTtcclxuXHJcbiAgICAgICAgbGV0IGRhdGEgPSB7XHJcbiAgICAgICAgICAgIGFjdGlvbjogJ3NpbXBsZV90ZXN0aW1vbmlhbF92aWV3JyxcclxuICAgICAgICAgICAgdGVzdGltb25pYWxDYXQ6IHRlc3RpbW9uaWFsX2NhdFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgJC5wb3N0KGJhX2FqYXgsIGRhdGEsIGZ1bmN0aW9uKHJlc3BvbnNlKXtcclxuICAgICAgICAgICAgJCgnLmJhLXRlc3RpbW9uaWFscy1jb250ZW50X193cmFwcGVyJykuaHRtbChyZXNwb25zZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2Fzc2V0cy9qcy9hcHAuanMiLCIvKipcbiAqIHdoYXQtaW5wdXQgLSBBIGdsb2JhbCB1dGlsaXR5IGZvciB0cmFja2luZyB0aGUgY3VycmVudCBpbnB1dCBtZXRob2QgKG1vdXNlLCBrZXlib2FyZCBvciB0b3VjaCkuXG4gKiBAdmVyc2lvbiB2NC4zLjFcbiAqIEBsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS90ZW4xc2V2ZW4vd2hhdC1pbnB1dFxuICogQGxpY2Vuc2UgTUlUXG4gKi9cbihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFwid2hhdElucHV0XCIsIFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIndoYXRJbnB1dFwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJ3aGF0SW5wdXRcIl0gPSBmYWN0b3J5KCk7XG59KSh0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiAvKioqKioqLyAoZnVuY3Rpb24obW9kdWxlcykgeyAvLyB3ZWJwYWNrQm9vdHN0cmFwXG4vKioqKioqLyBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbi8qKioqKiovIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuLyoqKioqKi8gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuLyoqKioqKi8gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbi8qKioqKiovIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbi8qKioqKiovIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbi8qKioqKiovIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4vKioqKioqLyBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbi8qKioqKiovIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4vKioqKioqLyBcdFx0XHRleHBvcnRzOiB7fSxcbi8qKioqKiovIFx0XHRcdGlkOiBtb2R1bGVJZCxcbi8qKioqKiovIFx0XHRcdGxvYWRlZDogZmFsc2Vcbi8qKioqKiovIFx0XHR9O1xuXG4vKioqKioqLyBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4vKioqKioqLyBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbi8qKioqKiovIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4vKioqKioqLyBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbi8qKioqKiovIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuLyoqKioqKi8gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbi8qKioqKiovIFx0fVxuXG5cbi8qKioqKiovIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuLyoqKioqKi8gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4vKioqKioqLyBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbi8qKioqKiovIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vKioqKioqLyBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuLyoqKioqKi8gfSlcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKioqKioqLyAoW1xuLyogMCAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXG5cdG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xuXHQgIC8qXG5cdCAgICogdmFyaWFibGVzXG5cdCAgICovXG5cblx0ICAvLyBsYXN0IHVzZWQgaW5wdXQgdHlwZVxuXHQgIHZhciBjdXJyZW50SW5wdXQgPSAnaW5pdGlhbCc7XG5cblx0ICAvLyBsYXN0IHVzZWQgaW5wdXQgaW50ZW50XG5cdCAgdmFyIGN1cnJlbnRJbnRlbnQgPSBudWxsO1xuXG5cdCAgLy8gY2FjaGUgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50XG5cdCAgdmFyIGRvYyA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcblxuXHQgIC8vIGZvcm0gaW5wdXQgdHlwZXNcblx0ICB2YXIgZm9ybUlucHV0cyA9IFsnaW5wdXQnLCAnc2VsZWN0JywgJ3RleHRhcmVhJ107XG5cblx0ICB2YXIgZnVuY3Rpb25MaXN0ID0gW107XG5cblx0ICAvLyBsaXN0IG9mIG1vZGlmaWVyIGtleXMgY29tbW9ubHkgdXNlZCB3aXRoIHRoZSBtb3VzZSBhbmRcblx0ICAvLyBjYW4gYmUgc2FmZWx5IGlnbm9yZWQgdG8gcHJldmVudCBmYWxzZSBrZXlib2FyZCBkZXRlY3Rpb25cblx0ICB2YXIgaWdub3JlTWFwID0gWzE2LCAvLyBzaGlmdFxuXHQgIDE3LCAvLyBjb250cm9sXG5cdCAgMTgsIC8vIGFsdFxuXHQgIDkxLCAvLyBXaW5kb3dzIGtleSAvIGxlZnQgQXBwbGUgY21kXG5cdCAgOTMgLy8gV2luZG93cyBtZW51IC8gcmlnaHQgQXBwbGUgY21kXG5cdCAgXTtcblxuXHQgIC8vIGxpc3Qgb2Yga2V5cyBmb3Igd2hpY2ggd2UgY2hhbmdlIGludGVudCBldmVuIGZvciBmb3JtIGlucHV0c1xuXHQgIHZhciBjaGFuZ2VJbnRlbnRNYXAgPSBbOSAvLyB0YWJcblx0ICBdO1xuXG5cdCAgLy8gbWFwcGluZyBvZiBldmVudHMgdG8gaW5wdXQgdHlwZXNcblx0ICB2YXIgaW5wdXRNYXAgPSB7XG5cdCAgICBrZXlkb3duOiAna2V5Ym9hcmQnLFxuXHQgICAga2V5dXA6ICdrZXlib2FyZCcsXG5cdCAgICBtb3VzZWRvd246ICdtb3VzZScsXG5cdCAgICBtb3VzZW1vdmU6ICdtb3VzZScsXG5cdCAgICBNU1BvaW50ZXJEb3duOiAncG9pbnRlcicsXG5cdCAgICBNU1BvaW50ZXJNb3ZlOiAncG9pbnRlcicsXG5cdCAgICBwb2ludGVyZG93bjogJ3BvaW50ZXInLFxuXHQgICAgcG9pbnRlcm1vdmU6ICdwb2ludGVyJyxcblx0ICAgIHRvdWNoc3RhcnQ6ICd0b3VjaCdcblx0ICB9O1xuXG5cdCAgLy8gYXJyYXkgb2YgYWxsIHVzZWQgaW5wdXQgdHlwZXNcblx0ICB2YXIgaW5wdXRUeXBlcyA9IFtdO1xuXG5cdCAgLy8gYm9vbGVhbjogdHJ1ZSBpZiB0b3VjaCBidWZmZXIgaXMgYWN0aXZlXG5cdCAgdmFyIGlzQnVmZmVyaW5nID0gZmFsc2U7XG5cblx0ICAvLyBib29sZWFuOiB0cnVlIGlmIHRoZSBwYWdlIGlzIGJlaW5nIHNjcm9sbGVkXG5cdCAgdmFyIGlzU2Nyb2xsaW5nID0gZmFsc2U7XG5cblx0ICAvLyBzdG9yZSBjdXJyZW50IG1vdXNlIHBvc2l0aW9uXG5cdCAgdmFyIG1vdXNlUG9zID0ge1xuXHQgICAgeDogbnVsbCxcblx0ICAgIHk6IG51bGxcblx0ICB9O1xuXG5cdCAgLy8gbWFwIG9mIElFIDEwIHBvaW50ZXIgZXZlbnRzXG5cdCAgdmFyIHBvaW50ZXJNYXAgPSB7XG5cdCAgICAyOiAndG91Y2gnLFxuXHQgICAgMzogJ3RvdWNoJywgLy8gdHJlYXQgcGVuIGxpa2UgdG91Y2hcblx0ICAgIDQ6ICdtb3VzZSdcblx0ICB9O1xuXG5cdCAgdmFyIHN1cHBvcnRzUGFzc2l2ZSA9IGZhbHNlO1xuXG5cdCAgdHJ5IHtcblx0ICAgIHZhciBvcHRzID0gT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAncGFzc2l2ZScsIHtcblx0ICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG5cdCAgICAgICAgc3VwcG9ydHNQYXNzaXZlID0gdHJ1ZTtcblx0ICAgICAgfVxuXHQgICAgfSk7XG5cblx0ICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0ZXN0JywgbnVsbCwgb3B0cyk7XG5cdCAgfSBjYXRjaCAoZSkge31cblxuXHQgIC8qXG5cdCAgICogc2V0IHVwXG5cdCAgICovXG5cblx0ICB2YXIgc2V0VXAgPSBmdW5jdGlvbiBzZXRVcCgpIHtcblx0ICAgIC8vIGFkZCBjb3JyZWN0IG1vdXNlIHdoZWVsIGV2ZW50IG1hcHBpbmcgdG8gYGlucHV0TWFwYFxuXHQgICAgaW5wdXRNYXBbZGV0ZWN0V2hlZWwoKV0gPSAnbW91c2UnO1xuXG5cdCAgICBhZGRMaXN0ZW5lcnMoKTtcblx0ICAgIHNldElucHV0KCk7XG5cdCAgfTtcblxuXHQgIC8qXG5cdCAgICogZXZlbnRzXG5cdCAgICovXG5cblx0ICB2YXIgYWRkTGlzdGVuZXJzID0gZnVuY3Rpb24gYWRkTGlzdGVuZXJzKCkge1xuXHQgICAgLy8gYHBvaW50ZXJtb3ZlYCwgYE1TUG9pbnRlck1vdmVgLCBgbW91c2Vtb3ZlYCBhbmQgbW91c2Ugd2hlZWwgZXZlbnQgYmluZGluZ1xuXHQgICAgLy8gY2FuIG9ubHkgZGVtb25zdHJhdGUgcG90ZW50aWFsLCBidXQgbm90IGFjdHVhbCwgaW50ZXJhY3Rpb25cblx0ICAgIC8vIGFuZCBhcmUgdHJlYXRlZCBzZXBhcmF0ZWx5XG5cdCAgICB2YXIgb3B0aW9ucyA9IHN1cHBvcnRzUGFzc2l2ZSA/IHsgcGFzc2l2ZTogdHJ1ZSB9IDogZmFsc2U7XG5cblx0ICAgIC8vIHBvaW50ZXIgZXZlbnRzIChtb3VzZSwgcGVuLCB0b3VjaClcblx0ICAgIGlmICh3aW5kb3cuUG9pbnRlckV2ZW50KSB7XG5cdCAgICAgIGRvYy5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVyZG93bicsIHVwZGF0ZUlucHV0KTtcblx0ICAgICAgZG9jLmFkZEV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJtb3ZlJywgc2V0SW50ZW50KTtcblx0ICAgIH0gZWxzZSBpZiAod2luZG93Lk1TUG9pbnRlckV2ZW50KSB7XG5cdCAgICAgIGRvYy5hZGRFdmVudExpc3RlbmVyKCdNU1BvaW50ZXJEb3duJywgdXBkYXRlSW5wdXQpO1xuXHQgICAgICBkb2MuYWRkRXZlbnRMaXN0ZW5lcignTVNQb2ludGVyTW92ZScsIHNldEludGVudCk7XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICAvLyBtb3VzZSBldmVudHNcblx0ICAgICAgZG9jLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHVwZGF0ZUlucHV0KTtcblx0ICAgICAgZG9jLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHNldEludGVudCk7XG5cblx0ICAgICAgLy8gdG91Y2ggZXZlbnRzXG5cdCAgICAgIGlmICgnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cpIHtcblx0ICAgICAgICBkb2MuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRvdWNoQnVmZmVyLCBvcHRpb25zKTtcblx0ICAgICAgICBkb2MuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0b3VjaEJ1ZmZlcik7XG5cdCAgICAgIH1cblx0ICAgIH1cblxuXHQgICAgLy8gbW91c2Ugd2hlZWxcblx0ICAgIGRvYy5hZGRFdmVudExpc3RlbmVyKGRldGVjdFdoZWVsKCksIHNldEludGVudCwgb3B0aW9ucyk7XG5cblx0ICAgIC8vIGtleWJvYXJkIGV2ZW50c1xuXHQgICAgZG9jLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB1cGRhdGVJbnB1dCk7XG5cdCAgICBkb2MuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCB1cGRhdGVJbnB1dCk7XG5cdCAgfTtcblxuXHQgIC8vIGNoZWNrcyBjb25kaXRpb25zIGJlZm9yZSB1cGRhdGluZyBuZXcgaW5wdXRcblx0ICB2YXIgdXBkYXRlSW5wdXQgPSBmdW5jdGlvbiB1cGRhdGVJbnB1dChldmVudCkge1xuXHQgICAgLy8gb25seSBleGVjdXRlIGlmIHRoZSB0b3VjaCBidWZmZXIgdGltZXIgaXNuJ3QgcnVubmluZ1xuXHQgICAgaWYgKCFpc0J1ZmZlcmluZykge1xuXHQgICAgICB2YXIgZXZlbnRLZXkgPSBldmVudC53aGljaDtcblx0ICAgICAgdmFyIHZhbHVlID0gaW5wdXRNYXBbZXZlbnQudHlwZV07XG5cdCAgICAgIGlmICh2YWx1ZSA9PT0gJ3BvaW50ZXInKSB2YWx1ZSA9IHBvaW50ZXJUeXBlKGV2ZW50KTtcblxuXHQgICAgICBpZiAoY3VycmVudElucHV0ICE9PSB2YWx1ZSB8fCBjdXJyZW50SW50ZW50ICE9PSB2YWx1ZSkge1xuXHQgICAgICAgIHZhciBhY3RpdmVFbGVtID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcblx0ICAgICAgICB2YXIgYWN0aXZlSW5wdXQgPSBmYWxzZTtcblx0ICAgICAgICB2YXIgbm90Rm9ybUlucHV0ID0gYWN0aXZlRWxlbSAmJiBhY3RpdmVFbGVtLm5vZGVOYW1lICYmIGZvcm1JbnB1dHMuaW5kZXhPZihhY3RpdmVFbGVtLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkpID09PSAtMTtcblxuXHQgICAgICAgIGlmIChub3RGb3JtSW5wdXQgfHwgY2hhbmdlSW50ZW50TWFwLmluZGV4T2YoZXZlbnRLZXkpICE9PSAtMSkge1xuXHQgICAgICAgICAgYWN0aXZlSW5wdXQgPSB0cnVlO1xuXHQgICAgICAgIH1cblxuXHQgICAgICAgIGlmICh2YWx1ZSA9PT0gJ3RvdWNoJyB8fFxuXHQgICAgICAgIC8vIGlnbm9yZSBtb3VzZSBtb2RpZmllciBrZXlzXG5cdCAgICAgICAgdmFsdWUgPT09ICdtb3VzZScgfHxcblx0ICAgICAgICAvLyBkb24ndCBzd2l0Y2ggaWYgdGhlIGN1cnJlbnQgZWxlbWVudCBpcyBhIGZvcm0gaW5wdXRcblx0ICAgICAgICB2YWx1ZSA9PT0gJ2tleWJvYXJkJyAmJiBldmVudEtleSAmJiBhY3RpdmVJbnB1dCAmJiBpZ25vcmVNYXAuaW5kZXhPZihldmVudEtleSkgPT09IC0xKSB7XG5cdCAgICAgICAgICAvLyBzZXQgdGhlIGN1cnJlbnQgYW5kIGNhdGNoLWFsbCB2YXJpYWJsZVxuXHQgICAgICAgICAgY3VycmVudElucHV0ID0gY3VycmVudEludGVudCA9IHZhbHVlO1xuXG5cdCAgICAgICAgICBzZXRJbnB1dCgpO1xuXHQgICAgICAgIH1cblx0ICAgICAgfVxuXHQgICAgfVxuXHQgIH07XG5cblx0ICAvLyB1cGRhdGVzIHRoZSBkb2MgYW5kIGBpbnB1dFR5cGVzYCBhcnJheSB3aXRoIG5ldyBpbnB1dFxuXHQgIHZhciBzZXRJbnB1dCA9IGZ1bmN0aW9uIHNldElucHV0KCkge1xuXHQgICAgZG9jLnNldEF0dHJpYnV0ZSgnZGF0YS13aGF0aW5wdXQnLCBjdXJyZW50SW5wdXQpO1xuXHQgICAgZG9jLnNldEF0dHJpYnV0ZSgnZGF0YS13aGF0aW50ZW50JywgY3VycmVudElucHV0KTtcblxuXHQgICAgaWYgKGlucHV0VHlwZXMuaW5kZXhPZihjdXJyZW50SW5wdXQpID09PSAtMSkge1xuXHQgICAgICBpbnB1dFR5cGVzLnB1c2goY3VycmVudElucHV0KTtcblx0ICAgICAgZG9jLmNsYXNzTmFtZSArPSAnIHdoYXRpbnB1dC10eXBlcy0nICsgY3VycmVudElucHV0O1xuXHQgICAgfVxuXG5cdCAgICBmaXJlRnVuY3Rpb25zKCdpbnB1dCcpO1xuXHQgIH07XG5cblx0ICAvLyB1cGRhdGVzIGlucHV0IGludGVudCBmb3IgYG1vdXNlbW92ZWAgYW5kIGBwb2ludGVybW92ZWBcblx0ICB2YXIgc2V0SW50ZW50ID0gZnVuY3Rpb24gc2V0SW50ZW50KGV2ZW50KSB7XG5cdCAgICAvLyB0ZXN0IHRvIHNlZSBpZiBgbW91c2Vtb3ZlYCBoYXBwZW5lZCByZWxhdGl2ZSB0byB0aGUgc2NyZWVuXG5cdCAgICAvLyB0byBkZXRlY3Qgc2Nyb2xsaW5nIHZlcnN1cyBtb3VzZW1vdmVcblx0ICAgIGlmIChtb3VzZVBvc1sneCddICE9PSBldmVudC5zY3JlZW5YIHx8IG1vdXNlUG9zWyd5J10gIT09IGV2ZW50LnNjcmVlblkpIHtcblx0ICAgICAgaXNTY3JvbGxpbmcgPSBmYWxzZTtcblxuXHQgICAgICBtb3VzZVBvc1sneCddID0gZXZlbnQuc2NyZWVuWDtcblx0ICAgICAgbW91c2VQb3NbJ3knXSA9IGV2ZW50LnNjcmVlblk7XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICBpc1Njcm9sbGluZyA9IHRydWU7XG5cdCAgICB9XG5cblx0ICAgIC8vIG9ubHkgZXhlY3V0ZSBpZiB0aGUgdG91Y2ggYnVmZmVyIHRpbWVyIGlzbid0IHJ1bm5pbmdcblx0ICAgIC8vIG9yIHNjcm9sbGluZyBpc24ndCBoYXBwZW5pbmdcblx0ICAgIGlmICghaXNCdWZmZXJpbmcgJiYgIWlzU2Nyb2xsaW5nKSB7XG5cdCAgICAgIHZhciB2YWx1ZSA9IGlucHV0TWFwW2V2ZW50LnR5cGVdO1xuXHQgICAgICBpZiAodmFsdWUgPT09ICdwb2ludGVyJykgdmFsdWUgPSBwb2ludGVyVHlwZShldmVudCk7XG5cblx0ICAgICAgaWYgKGN1cnJlbnRJbnRlbnQgIT09IHZhbHVlKSB7XG5cdCAgICAgICAgY3VycmVudEludGVudCA9IHZhbHVlO1xuXG5cdCAgICAgICAgZG9jLnNldEF0dHJpYnV0ZSgnZGF0YS13aGF0aW50ZW50JywgY3VycmVudEludGVudCk7XG5cblx0ICAgICAgICBmaXJlRnVuY3Rpb25zKCdpbnRlbnQnKTtcblx0ICAgICAgfVxuXHQgICAgfVxuXHQgIH07XG5cblx0ICAvLyBidWZmZXJzIHRvdWNoIGV2ZW50cyBiZWNhdXNlIHRoZXkgZnJlcXVlbnRseSBhbHNvIGZpcmUgbW91c2UgZXZlbnRzXG5cdCAgdmFyIHRvdWNoQnVmZmVyID0gZnVuY3Rpb24gdG91Y2hCdWZmZXIoZXZlbnQpIHtcblx0ICAgIGlmIChldmVudC50eXBlID09PSAndG91Y2hzdGFydCcpIHtcblx0ICAgICAgaXNCdWZmZXJpbmcgPSBmYWxzZTtcblxuXHQgICAgICAvLyBzZXQgdGhlIGN1cnJlbnQgaW5wdXRcblx0ICAgICAgdXBkYXRlSW5wdXQoZXZlbnQpO1xuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgaXNCdWZmZXJpbmcgPSB0cnVlO1xuXHQgICAgfVxuXHQgIH07XG5cblx0ICB2YXIgZmlyZUZ1bmN0aW9ucyA9IGZ1bmN0aW9uIGZpcmVGdW5jdGlvbnModHlwZSkge1xuXHQgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGZ1bmN0aW9uTGlzdC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuXHQgICAgICBpZiAoZnVuY3Rpb25MaXN0W2ldLnR5cGUgPT09IHR5cGUpIHtcblx0ICAgICAgICBmdW5jdGlvbkxpc3RbaV0uZm4uY2FsbCh1bmRlZmluZWQsIGN1cnJlbnRJbnRlbnQpO1xuXHQgICAgICB9XG5cdCAgICB9XG5cdCAgfTtcblxuXHQgIC8qXG5cdCAgICogdXRpbGl0aWVzXG5cdCAgICovXG5cblx0ICB2YXIgcG9pbnRlclR5cGUgPSBmdW5jdGlvbiBwb2ludGVyVHlwZShldmVudCkge1xuXHQgICAgaWYgKHR5cGVvZiBldmVudC5wb2ludGVyVHlwZSA9PT0gJ251bWJlcicpIHtcblx0ICAgICAgcmV0dXJuIHBvaW50ZXJNYXBbZXZlbnQucG9pbnRlclR5cGVdO1xuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgLy8gdHJlYXQgcGVuIGxpa2UgdG91Y2hcblx0ICAgICAgcmV0dXJuIGV2ZW50LnBvaW50ZXJUeXBlID09PSAncGVuJyA/ICd0b3VjaCcgOiBldmVudC5wb2ludGVyVHlwZTtcblx0ICAgIH1cblx0ICB9O1xuXG5cdCAgLy8gZGV0ZWN0IHZlcnNpb24gb2YgbW91c2Ugd2hlZWwgZXZlbnQgdG8gdXNlXG5cdCAgLy8gdmlhIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0V2ZW50cy93aGVlbFxuXHQgIHZhciBkZXRlY3RXaGVlbCA9IGZ1bmN0aW9uIGRldGVjdFdoZWVsKCkge1xuXHQgICAgdmFyIHdoZWVsVHlwZSA9IHZvaWQgMDtcblxuXHQgICAgLy8gTW9kZXJuIGJyb3dzZXJzIHN1cHBvcnQgXCJ3aGVlbFwiXG5cdCAgICBpZiAoJ29ud2hlZWwnIGluIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpKSB7XG5cdCAgICAgIHdoZWVsVHlwZSA9ICd3aGVlbCc7XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICAvLyBXZWJraXQgYW5kIElFIHN1cHBvcnQgYXQgbGVhc3QgXCJtb3VzZXdoZWVsXCJcblx0ICAgICAgLy8gb3IgYXNzdW1lIHRoYXQgcmVtYWluaW5nIGJyb3dzZXJzIGFyZSBvbGRlciBGaXJlZm94XG5cdCAgICAgIHdoZWVsVHlwZSA9IGRvY3VtZW50Lm9ubW91c2V3aGVlbCAhPT0gdW5kZWZpbmVkID8gJ21vdXNld2hlZWwnIDogJ0RPTU1vdXNlU2Nyb2xsJztcblx0ICAgIH1cblxuXHQgICAgcmV0dXJuIHdoZWVsVHlwZTtcblx0ICB9O1xuXG5cdCAgdmFyIG9ialBvcyA9IGZ1bmN0aW9uIG9ialBvcyhtYXRjaCkge1xuXHQgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGZ1bmN0aW9uTGlzdC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuXHQgICAgICBpZiAoZnVuY3Rpb25MaXN0W2ldLmZuID09PSBtYXRjaCkge1xuXHQgICAgICAgIHJldHVybiBpO1xuXHQgICAgICB9XG5cdCAgICB9XG5cdCAgfTtcblxuXHQgIC8qXG5cdCAgICogaW5pdFxuXHQgICAqL1xuXG5cdCAgLy8gZG9uJ3Qgc3RhcnQgc2NyaXB0IHVubGVzcyBicm93c2VyIGN1dHMgdGhlIG11c3RhcmRcblx0ICAvLyAoYWxzbyBwYXNzZXMgaWYgcG9seWZpbGxzIGFyZSB1c2VkKVxuXHQgIGlmICgnYWRkRXZlbnRMaXN0ZW5lcicgaW4gd2luZG93ICYmIEFycmF5LnByb3RvdHlwZS5pbmRleE9mKSB7XG5cdCAgICBzZXRVcCgpO1xuXHQgIH1cblxuXHQgIC8qXG5cdCAgICogYXBpXG5cdCAgICovXG5cblx0ICByZXR1cm4ge1xuXHQgICAgLy8gcmV0dXJucyBzdHJpbmc6IHRoZSBjdXJyZW50IGlucHV0IHR5cGVcblx0ICAgIC8vIG9wdDogJ2xvb3NlJ3wnc3RyaWN0J1xuXHQgICAgLy8gJ3N0cmljdCcgKGRlZmF1bHQpOiByZXR1cm5zIHRoZSBzYW1lIHZhbHVlIGFzIHRoZSBgZGF0YS13aGF0aW5wdXRgIGF0dHJpYnV0ZVxuXHQgICAgLy8gJ2xvb3NlJzogaW5jbHVkZXMgYGRhdGEtd2hhdGludGVudGAgdmFsdWUgaWYgaXQncyBtb3JlIGN1cnJlbnQgdGhhbiBgZGF0YS13aGF0aW5wdXRgXG5cdCAgICBhc2s6IGZ1bmN0aW9uIGFzayhvcHQpIHtcblx0ICAgICAgcmV0dXJuIG9wdCA9PT0gJ2xvb3NlJyA/IGN1cnJlbnRJbnRlbnQgOiBjdXJyZW50SW5wdXQ7XG5cdCAgICB9LFxuXG5cdCAgICAvLyByZXR1cm5zIGFycmF5OiBhbGwgdGhlIGRldGVjdGVkIGlucHV0IHR5cGVzXG5cdCAgICB0eXBlczogZnVuY3Rpb24gdHlwZXMoKSB7XG5cdCAgICAgIHJldHVybiBpbnB1dFR5cGVzO1xuXHQgICAgfSxcblxuXHQgICAgLy8gb3ZlcndyaXRlcyBpZ25vcmVkIGtleXMgd2l0aCBwcm92aWRlZCBhcnJheVxuXHQgICAgaWdub3JlS2V5czogZnVuY3Rpb24gaWdub3JlS2V5cyhhcnIpIHtcblx0ICAgICAgaWdub3JlTWFwID0gYXJyO1xuXHQgICAgfSxcblxuXHQgICAgLy8gYXR0YWNoIGZ1bmN0aW9ucyB0byBpbnB1dCBhbmQgaW50ZW50IFwiZXZlbnRzXCJcblx0ICAgIC8vIGZ1bmN0OiBmdW5jdGlvbiB0byBmaXJlIG9uIGNoYW5nZVxuXHQgICAgLy8gZXZlbnRUeXBlOiAnaW5wdXQnfCdpbnRlbnQnXG5cdCAgICByZWdpc3Rlck9uQ2hhbmdlOiBmdW5jdGlvbiByZWdpc3Rlck9uQ2hhbmdlKGZuLCBldmVudFR5cGUpIHtcblx0ICAgICAgZnVuY3Rpb25MaXN0LnB1c2goe1xuXHQgICAgICAgIGZuOiBmbixcblx0ICAgICAgICB0eXBlOiBldmVudFR5cGUgfHwgJ2lucHV0J1xuXHQgICAgICB9KTtcblx0ICAgIH0sXG5cblx0ICAgIHVuUmVnaXN0ZXJPbkNoYW5nZTogZnVuY3Rpb24gdW5SZWdpc3Rlck9uQ2hhbmdlKGZuKSB7XG5cdCAgICAgIHZhciBwb3NpdGlvbiA9IG9ialBvcyhmbik7XG5cblx0ICAgICAgaWYgKHBvc2l0aW9uKSB7XG5cdCAgICAgICAgZnVuY3Rpb25MaXN0LnNwbGljZShwb3NpdGlvbiwgMSk7XG5cdCAgICAgIH1cblx0ICAgIH1cblx0ICB9O1xuXHR9KCk7XG5cbi8qKiovIH1cbi8qKioqKiovIF0pXG59KTtcbjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy93aGF0LWlucHV0L2Rpc3Qvd2hhdC1pbnB1dC5qc1xuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xyXG5pbXBvcnQgeyBGb3VuZGF0aW9uIH0gZnJvbSAnZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLmNvcmUnO1xyXG4vLyBpbXBvcnQgeyBydGwsIEdldFlvRGlnaXRzLCB0cmFuc2l0aW9uZW5kIH0gZnJvbSAnZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLnV0aWwuY29yZSc7XHJcbi8vIGltcG9ydCB7IEJveCB9IGZyb20gJ2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi51dGlsLmJveCdcclxuLy8gaW1wb3J0IHsgb25JbWFnZXNMb2FkZWQgfSBmcm9tICdmb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24udXRpbC5pbWFnZUxvYWRlcic7XHJcbmltcG9ydCB7IEtleWJvYXJkIH0gZnJvbSAnZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLnV0aWwua2V5Ym9hcmQnO1xyXG5pbXBvcnQgeyBNZWRpYVF1ZXJ5IH0gZnJvbSAnZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLnV0aWwubWVkaWFRdWVyeSc7XHJcbi8vIGltcG9ydCB7IE1vdGlvbiwgTW92ZSB9IGZyb20gJ2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi51dGlsLm1vdGlvbic7XHJcbi8vIGltcG9ydCB7IE5lc3QgfSBmcm9tICdmb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24udXRpbC5uZXN0JztcclxuLy8gaW1wb3J0IHsgVGltZXIgfSBmcm9tICdmb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24udXRpbC50aW1lcic7XHJcbi8vIGltcG9ydCB7IFRvdWNoIH0gZnJvbSAnZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLnV0aWwudG91Y2gnO1xyXG5pbXBvcnQgeyBUcmlnZ2VycyB9IGZyb20gJ2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi51dGlsLnRyaWdnZXJzJztcclxuLy8gaW1wb3J0IHsgQWJpZGUgfSBmcm9tICdmb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24uYWJpZGUnO1xyXG4vLyBpbXBvcnQgeyBBY2NvcmRpb24gfSBmcm9tICdmb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24uYWNjb3JkaW9uJztcclxuLy8gaW1wb3J0IHsgQWNjb3JkaW9uTWVudSB9IGZyb20gJ2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi5hY2NvcmRpb25NZW51JztcclxuLy8gaW1wb3J0IHsgRHJpbGxkb3duIH0gZnJvbSAnZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLmRyaWxsZG93bic7XHJcbi8vIGltcG9ydCB7IERyb3Bkb3duIH0gZnJvbSAnZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLmRyb3Bkb3duJztcclxuLy8gaW1wb3J0IHsgRHJvcGRvd25NZW51IH0gZnJvbSAnZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLmRyb3Bkb3duTWVudSc7XHJcbi8vIGltcG9ydCB7IEVxdWFsaXplciB9IGZyb20gJ2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi5lcXVhbGl6ZXInO1xyXG4vLyBpbXBvcnQgeyBJbnRlcmNoYW5nZSB9IGZyb20gJ2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi5pbnRlcmNoYW5nZSc7XHJcbi8vIGltcG9ydCB7IE1hZ2VsbGFuIH0gZnJvbSAnZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLm1hZ2VsbGFuJztcclxuaW1wb3J0IHsgT2ZmQ2FudmFzIH0gZnJvbSAnZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLm9mZmNhbnZhcyc7XHJcbi8vIGltcG9ydCB7IE9yYml0IH0gZnJvbSAnZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLm9yYml0JztcclxuLy8gaW1wb3J0IHsgUmVzcG9uc2l2ZU1lbnUgfSBmcm9tICdmb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24ucmVzcG9uc2l2ZU1lbnUnO1xyXG4vLyBpbXBvcnQgeyBSZXNwb25zaXZlVG9nZ2xlIH0gZnJvbSAnZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLnJlc3BvbnNpdmVUb2dnbGUnO1xyXG4vLyBpbXBvcnQgeyBSZXZlYWwgfSBmcm9tICdmb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24ucmV2ZWFsJztcclxuLy8gaW1wb3J0IHsgU2xpZGVyIH0gZnJvbSAnZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLnNsaWRlcic7XHJcbi8vIGltcG9ydCB7IFNtb290aFNjcm9sbCB9IGZyb20gJ2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi5zbW9vdGhTY3JvbGwnO1xyXG4vLyBpbXBvcnQgeyBTdGlja3kgfSBmcm9tICdmb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24uc3RpY2t5JztcclxuaW1wb3J0IHsgVGFicyB9IGZyb20gJ2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi50YWJzJztcclxuLy8gaW1wb3J0IHsgVG9nZ2xlciB9IGZyb20gJ2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi50b2dnbGVyJztcclxuLy8gaW1wb3J0IHsgVG9vbHRpcCB9IGZyb20gJ2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi50b29sdGlwJztcclxuLy8gaW1wb3J0IHsgUmVzcG9uc2l2ZUFjY29yZGlvblRhYnMgfSBmcm9tICdmb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24ucmVzcG9uc2l2ZUFjY29yZGlvblRhYnMnO1xyXG5cclxuXHJcbkZvdW5kYXRpb24uYWRkVG9KcXVlcnkoJCk7XHJcblxyXG4vLyBBZGQgRm91bmRhdGlvbiBVdGlscyB0byBGb3VuZGF0aW9uIGdsb2JhbCBuYW1lc3BhY2UgZm9yIGJhY2t3YXJkc1xyXG4vLyBjb21wYXRpYmlsaXR5LlxyXG5cclxuLy8gRm91bmRhdGlvbi5ydGwgPSBydGw7XHJcbi8vIEZvdW5kYXRpb24uR2V0WW9EaWdpdHMgPSBHZXRZb0RpZ2l0cztcclxuLy8gRm91bmRhdGlvbi50cmFuc2l0aW9uZW5kID0gdHJhbnNpdGlvbmVuZDtcclxuLy9cclxuLy8gRm91bmRhdGlvbi5Cb3ggPSBCb3g7XHJcbi8vIEZvdW5kYXRpb24ub25JbWFnZXNMb2FkZWQgPSBvbkltYWdlc0xvYWRlZDtcclxuRm91bmRhdGlvbi5LZXlib2FyZCA9IEtleWJvYXJkO1xyXG5Gb3VuZGF0aW9uLk1lZGlhUXVlcnkgPSBNZWRpYVF1ZXJ5O1xyXG4vLyBGb3VuZGF0aW9uLk1vdGlvbiA9IE1vdGlvbjtcclxuLy8gRm91bmRhdGlvbi5Nb3ZlID0gTW92ZTtcclxuLy8gRm91bmRhdGlvbi5OZXN0ID0gTmVzdDtcclxuLy8gRm91bmRhdGlvbi5UaW1lciA9IFRpbWVyO1xyXG5cclxuLy8gVG91Y2ggYW5kIFRyaWdnZXJzIHByZXZpb3VzbHkgd2VyZSBhbG1vc3QgcHVyZWx5IHNlZGUgZWZmZWN0IGRyaXZlbixcclxuLy8gc28gbm8gLy8gbmVlZCB0byBhZGQgaXQgdG8gRm91bmRhdGlvbiwganVzdCBpbml0IHRoZW0uXHJcblxyXG4vLyBUb3VjaC5pbml0KCQpO1xyXG5cclxuVHJpZ2dlcnMuaW5pdCgkLCBGb3VuZGF0aW9uKTtcclxuLy9cclxuLy8gRm91bmRhdGlvbi5wbHVnaW4oQWJpZGUsICdBYmlkZScpO1xyXG4vL1xyXG4vLyBGb3VuZGF0aW9uLnBsdWdpbihBY2NvcmRpb24sICdBY2NvcmRpb24nKTtcclxuLy9cclxuLy8gRm91bmRhdGlvbi5wbHVnaW4oQWNjb3JkaW9uTWVudSwgJ0FjY29yZGlvbk1lbnUnKTtcclxuLy9cclxuLy8gRm91bmRhdGlvbi5wbHVnaW4oRHJpbGxkb3duLCAnRHJpbGxkb3duJyk7XHJcbi8vXHJcbi8vIEZvdW5kYXRpb24ucGx1Z2luKERyb3Bkb3duLCAnRHJvcGRvd24nKTtcclxuLy9cclxuLy8gRm91bmRhdGlvbi5wbHVnaW4oRHJvcGRvd25NZW51LCAnRHJvcGRvd25NZW51Jyk7XHJcbi8vXHJcbi8vIEZvdW5kYXRpb24ucGx1Z2luKEVxdWFsaXplciwgJ0VxdWFsaXplcicpO1xyXG4vL1xyXG4vLyBGb3VuZGF0aW9uLnBsdWdpbihJbnRlcmNoYW5nZSwgJ0ludGVyY2hhbmdlJyk7XHJcbi8vXHJcbi8vIEZvdW5kYXRpb24ucGx1Z2luKE1hZ2VsbGFuLCAnTWFnZWxsYW4nKTtcclxuLy9cclxuRm91bmRhdGlvbi5wbHVnaW4oT2ZmQ2FudmFzLCAnT2ZmQ2FudmFzJyk7XHJcbi8vXHJcbi8vIEZvdW5kYXRpb24ucGx1Z2luKE9yYml0LCAnT3JiaXQnKTtcclxuLy9cclxuLy8gRm91bmRhdGlvbi5wbHVnaW4oUmVzcG9uc2l2ZU1lbnUsICdSZXNwb25zaXZlTWVudScpO1xyXG4vL1xyXG4vLyBGb3VuZGF0aW9uLnBsdWdpbihSZXNwb25zaXZlVG9nZ2xlLCAnUmVzcG9uc2l2ZVRvZ2dsZScpO1xyXG4vL1xyXG4vLyBGb3VuZGF0aW9uLnBsdWdpbihSZXZlYWwsICdSZXZlYWwnKTtcclxuLy9cclxuLy8gRm91bmRhdGlvbi5wbHVnaW4oU2xpZGVyLCAnU2xpZGVyJyk7XHJcbi8vXHJcbi8vIEZvdW5kYXRpb24ucGx1Z2luKFNtb290aFNjcm9sbCwgJ1Ntb290aFNjcm9sbCcpO1xyXG4vL1xyXG4vLyBGb3VuZGF0aW9uLnBsdWdpbihTdGlja3ksICdTdGlja3knKTtcclxuLy9cclxuRm91bmRhdGlvbi5wbHVnaW4oVGFicywgJ1RhYnMnKTtcclxuLy9cclxuLy8gRm91bmRhdGlvbi5wbHVnaW4oVG9nZ2xlciwgJ1RvZ2dsZXInKTtcclxuLy9cclxuLy8gRm91bmRhdGlvbi5wbHVnaW4oVG9vbHRpcCwgJ1Rvb2x0aXAnKTtcclxuLy9cclxuLy8gRm91bmRhdGlvbi5wbHVnaW4oUmVzcG9uc2l2ZUFjY29yZGlvblRhYnMsICdSZXNwb25zaXZlQWNjb3JkaW9uVGFicycpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBGb3VuZGF0aW9uO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXNzZXRzL2pzL2xpYi9mb3VuZGF0aW9uLWV4cGxpY2l0LXBpZWNlcy5qcyIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IHsgR2V0WW9EaWdpdHMgfSBmcm9tICcuL2ZvdW5kYXRpb24udXRpbC5jb3JlJztcbmltcG9ydCB7IE1lZGlhUXVlcnkgfSBmcm9tICcuL2ZvdW5kYXRpb24udXRpbC5tZWRpYVF1ZXJ5JztcblxudmFyIEZPVU5EQVRJT05fVkVSU0lPTiA9ICc2LjQuMyc7XG5cbi8vIEdsb2JhbCBGb3VuZGF0aW9uIG9iamVjdFxuLy8gVGhpcyBpcyBhdHRhY2hlZCB0byB0aGUgd2luZG93LCBvciB1c2VkIGFzIGEgbW9kdWxlIGZvciBBTUQvQnJvd3NlcmlmeVxudmFyIEZvdW5kYXRpb24gPSB7XG4gIHZlcnNpb246IEZPVU5EQVRJT05fVkVSU0lPTixcblxuICAvKipcbiAgICogU3RvcmVzIGluaXRpYWxpemVkIHBsdWdpbnMuXG4gICAqL1xuICBfcGx1Z2luczoge30sXG5cbiAgLyoqXG4gICAqIFN0b3JlcyBnZW5lcmF0ZWQgdW5pcXVlIGlkcyBmb3IgcGx1Z2luIGluc3RhbmNlc1xuICAgKi9cbiAgX3V1aWRzOiBbXSxcblxuICAvKipcbiAgICogRGVmaW5lcyBhIEZvdW5kYXRpb24gcGx1Z2luLCBhZGRpbmcgaXQgdG8gdGhlIGBGb3VuZGF0aW9uYCBuYW1lc3BhY2UgYW5kIHRoZSBsaXN0IG9mIHBsdWdpbnMgdG8gaW5pdGlhbGl6ZSB3aGVuIHJlZmxvd2luZy5cbiAgICogQHBhcmFtIHtPYmplY3R9IHBsdWdpbiAtIFRoZSBjb25zdHJ1Y3RvciBvZiB0aGUgcGx1Z2luLlxuICAgKi9cbiAgcGx1Z2luOiBmdW5jdGlvbihwbHVnaW4sIG5hbWUpIHtcbiAgICAvLyBPYmplY3Qga2V5IHRvIHVzZSB3aGVuIGFkZGluZyB0byBnbG9iYWwgRm91bmRhdGlvbiBvYmplY3RcbiAgICAvLyBFeGFtcGxlczogRm91bmRhdGlvbi5SZXZlYWwsIEZvdW5kYXRpb24uT2ZmQ2FudmFzXG4gICAgdmFyIGNsYXNzTmFtZSA9IChuYW1lIHx8IGZ1bmN0aW9uTmFtZShwbHVnaW4pKTtcbiAgICAvLyBPYmplY3Qga2V5IHRvIHVzZSB3aGVuIHN0b3JpbmcgdGhlIHBsdWdpbiwgYWxzbyB1c2VkIHRvIGNyZWF0ZSB0aGUgaWRlbnRpZnlpbmcgZGF0YSBhdHRyaWJ1dGUgZm9yIHRoZSBwbHVnaW5cbiAgICAvLyBFeGFtcGxlczogZGF0YS1yZXZlYWwsIGRhdGEtb2ZmLWNhbnZhc1xuICAgIHZhciBhdHRyTmFtZSAgPSBoeXBoZW5hdGUoY2xhc3NOYW1lKTtcblxuICAgIC8vIEFkZCB0byB0aGUgRm91bmRhdGlvbiBvYmplY3QgYW5kIHRoZSBwbHVnaW5zIGxpc3QgKGZvciByZWZsb3dpbmcpXG4gICAgdGhpcy5fcGx1Z2luc1thdHRyTmFtZV0gPSB0aGlzW2NsYXNzTmFtZV0gPSBwbHVnaW47XG4gIH0sXG4gIC8qKlxuICAgKiBAZnVuY3Rpb25cbiAgICogUG9wdWxhdGVzIHRoZSBfdXVpZHMgYXJyYXkgd2l0aCBwb2ludGVycyB0byBlYWNoIGluZGl2aWR1YWwgcGx1Z2luIGluc3RhbmNlLlxuICAgKiBBZGRzIHRoZSBgemZQbHVnaW5gIGRhdGEtYXR0cmlidXRlIHRvIHByb2dyYW1tYXRpY2FsbHkgY3JlYXRlZCBwbHVnaW5zIHRvIGFsbG93IHVzZSBvZiAkKHNlbGVjdG9yKS5mb3VuZGF0aW9uKG1ldGhvZCkgY2FsbHMuXG4gICAqIEFsc28gZmlyZXMgdGhlIGluaXRpYWxpemF0aW9uIGV2ZW50IGZvciBlYWNoIHBsdWdpbiwgY29uc29saWRhdGluZyByZXBldGl0aXZlIGNvZGUuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwbHVnaW4gLSBhbiBpbnN0YW5jZSBvZiBhIHBsdWdpbiwgdXN1YWxseSBgdGhpc2AgaW4gY29udGV4dC5cbiAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgLSB0aGUgbmFtZSBvZiB0aGUgcGx1Z2luLCBwYXNzZWQgYXMgYSBjYW1lbENhc2VkIHN0cmluZy5cbiAgICogQGZpcmVzIFBsdWdpbiNpbml0XG4gICAqL1xuICByZWdpc3RlclBsdWdpbjogZnVuY3Rpb24ocGx1Z2luLCBuYW1lKXtcbiAgICB2YXIgcGx1Z2luTmFtZSA9IG5hbWUgPyBoeXBoZW5hdGUobmFtZSkgOiBmdW5jdGlvbk5hbWUocGx1Z2luLmNvbnN0cnVjdG9yKS50b0xvd2VyQ2FzZSgpO1xuICAgIHBsdWdpbi51dWlkID0gR2V0WW9EaWdpdHMoNiwgcGx1Z2luTmFtZSk7XG5cbiAgICBpZighcGx1Z2luLiRlbGVtZW50LmF0dHIoYGRhdGEtJHtwbHVnaW5OYW1lfWApKXsgcGx1Z2luLiRlbGVtZW50LmF0dHIoYGRhdGEtJHtwbHVnaW5OYW1lfWAsIHBsdWdpbi51dWlkKTsgfVxuICAgIGlmKCFwbHVnaW4uJGVsZW1lbnQuZGF0YSgnemZQbHVnaW4nKSl7IHBsdWdpbi4kZWxlbWVudC5kYXRhKCd6ZlBsdWdpbicsIHBsdWdpbik7IH1cbiAgICAgICAgICAvKipcbiAgICAgICAgICAgKiBGaXJlcyB3aGVuIHRoZSBwbHVnaW4gaGFzIGluaXRpYWxpemVkLlxuICAgICAgICAgICAqIEBldmVudCBQbHVnaW4jaW5pdFxuICAgICAgICAgICAqL1xuICAgIHBsdWdpbi4kZWxlbWVudC50cmlnZ2VyKGBpbml0LnpmLiR7cGx1Z2luTmFtZX1gKTtcblxuICAgIHRoaXMuX3V1aWRzLnB1c2gocGx1Z2luLnV1aWQpO1xuXG4gICAgcmV0dXJuO1xuICB9LFxuICAvKipcbiAgICogQGZ1bmN0aW9uXG4gICAqIFJlbW92ZXMgdGhlIHBsdWdpbnMgdXVpZCBmcm9tIHRoZSBfdXVpZHMgYXJyYXkuXG4gICAqIFJlbW92ZXMgdGhlIHpmUGx1Z2luIGRhdGEgYXR0cmlidXRlLCBhcyB3ZWxsIGFzIHRoZSBkYXRhLXBsdWdpbi1uYW1lIGF0dHJpYnV0ZS5cbiAgICogQWxzbyBmaXJlcyB0aGUgZGVzdHJveWVkIGV2ZW50IGZvciB0aGUgcGx1Z2luLCBjb25zb2xpZGF0aW5nIHJlcGV0aXRpdmUgY29kZS5cbiAgICogQHBhcmFtIHtPYmplY3R9IHBsdWdpbiAtIGFuIGluc3RhbmNlIG9mIGEgcGx1Z2luLCB1c3VhbGx5IGB0aGlzYCBpbiBjb250ZXh0LlxuICAgKiBAZmlyZXMgUGx1Z2luI2Rlc3Ryb3llZFxuICAgKi9cbiAgdW5yZWdpc3RlclBsdWdpbjogZnVuY3Rpb24ocGx1Z2luKXtcbiAgICB2YXIgcGx1Z2luTmFtZSA9IGh5cGhlbmF0ZShmdW5jdGlvbk5hbWUocGx1Z2luLiRlbGVtZW50LmRhdGEoJ3pmUGx1Z2luJykuY29uc3RydWN0b3IpKTtcblxuICAgIHRoaXMuX3V1aWRzLnNwbGljZSh0aGlzLl91dWlkcy5pbmRleE9mKHBsdWdpbi51dWlkKSwgMSk7XG4gICAgcGx1Z2luLiRlbGVtZW50LnJlbW92ZUF0dHIoYGRhdGEtJHtwbHVnaW5OYW1lfWApLnJlbW92ZURhdGEoJ3pmUGx1Z2luJylcbiAgICAgICAgICAvKipcbiAgICAgICAgICAgKiBGaXJlcyB3aGVuIHRoZSBwbHVnaW4gaGFzIGJlZW4gZGVzdHJveWVkLlxuICAgICAgICAgICAqIEBldmVudCBQbHVnaW4jZGVzdHJveWVkXG4gICAgICAgICAgICovXG4gICAgICAgICAgLnRyaWdnZXIoYGRlc3Ryb3llZC56Zi4ke3BsdWdpbk5hbWV9YCk7XG4gICAgZm9yKHZhciBwcm9wIGluIHBsdWdpbil7XG4gICAgICBwbHVnaW5bcHJvcF0gPSBudWxsOy8vY2xlYW4gdXAgc2NyaXB0IHRvIHByZXAgZm9yIGdhcmJhZ2UgY29sbGVjdGlvbi5cbiAgICB9XG4gICAgcmV0dXJuO1xuICB9LFxuXG4gIC8qKlxuICAgKiBAZnVuY3Rpb25cbiAgICogQ2F1c2VzIG9uZSBvciBtb3JlIGFjdGl2ZSBwbHVnaW5zIHRvIHJlLWluaXRpYWxpemUsIHJlc2V0dGluZyBldmVudCBsaXN0ZW5lcnMsIHJlY2FsY3VsYXRpbmcgcG9zaXRpb25zLCBldGMuXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBwbHVnaW5zIC0gb3B0aW9uYWwgc3RyaW5nIG9mIGFuIGluZGl2aWR1YWwgcGx1Z2luIGtleSwgYXR0YWluZWQgYnkgY2FsbGluZyBgJChlbGVtZW50KS5kYXRhKCdwbHVnaW5OYW1lJylgLCBvciBzdHJpbmcgb2YgYSBwbHVnaW4gY2xhc3MgaS5lLiBgJ2Ryb3Bkb3duJ2BcbiAgICogQGRlZmF1bHQgSWYgbm8gYXJndW1lbnQgaXMgcGFzc2VkLCByZWZsb3cgYWxsIGN1cnJlbnRseSBhY3RpdmUgcGx1Z2lucy5cbiAgICovXG4gICByZUluaXQ6IGZ1bmN0aW9uKHBsdWdpbnMpe1xuICAgICB2YXIgaXNKUSA9IHBsdWdpbnMgaW5zdGFuY2VvZiAkO1xuICAgICB0cnl7XG4gICAgICAgaWYoaXNKUSl7XG4gICAgICAgICBwbHVnaW5zLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgICAgICAgJCh0aGlzKS5kYXRhKCd6ZlBsdWdpbicpLl9pbml0KCk7XG4gICAgICAgICB9KTtcbiAgICAgICB9ZWxzZXtcbiAgICAgICAgIHZhciB0eXBlID0gdHlwZW9mIHBsdWdpbnMsXG4gICAgICAgICBfdGhpcyA9IHRoaXMsXG4gICAgICAgICBmbnMgPSB7XG4gICAgICAgICAgICdvYmplY3QnOiBmdW5jdGlvbihwbGdzKXtcbiAgICAgICAgICAgICBwbGdzLmZvckVhY2goZnVuY3Rpb24ocCl7XG4gICAgICAgICAgICAgICBwID0gaHlwaGVuYXRlKHApO1xuICAgICAgICAgICAgICAgJCgnW2RhdGEtJysgcCArJ10nKS5mb3VuZGF0aW9uKCdfaW5pdCcpO1xuICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICB9LFxuICAgICAgICAgICAnc3RyaW5nJzogZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICBwbHVnaW5zID0gaHlwaGVuYXRlKHBsdWdpbnMpO1xuICAgICAgICAgICAgICQoJ1tkYXRhLScrIHBsdWdpbnMgKyddJykuZm91bmRhdGlvbignX2luaXQnKTtcbiAgICAgICAgICAgfSxcbiAgICAgICAgICAgJ3VuZGVmaW5lZCc6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgdGhpc1snb2JqZWN0J10oT2JqZWN0LmtleXMoX3RoaXMuX3BsdWdpbnMpKTtcbiAgICAgICAgICAgfVxuICAgICAgICAgfTtcbiAgICAgICAgIGZuc1t0eXBlXShwbHVnaW5zKTtcbiAgICAgICB9XG4gICAgIH1jYXRjaChlcnIpe1xuICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgfWZpbmFsbHl7XG4gICAgICAgcmV0dXJuIHBsdWdpbnM7XG4gICAgIH1cbiAgIH0sXG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemUgcGx1Z2lucyBvbiBhbnkgZWxlbWVudHMgd2l0aGluIGBlbGVtYCAoYW5kIGBlbGVtYCBpdHNlbGYpIHRoYXQgYXJlbid0IGFscmVhZHkgaW5pdGlhbGl6ZWQuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBlbGVtIC0galF1ZXJ5IG9iamVjdCBjb250YWluaW5nIHRoZSBlbGVtZW50IHRvIGNoZWNrIGluc2lkZS4gQWxzbyBjaGVja3MgdGhlIGVsZW1lbnQgaXRzZWxmLCB1bmxlc3MgaXQncyB0aGUgYGRvY3VtZW50YCBvYmplY3QuXG4gICAqIEBwYXJhbSB7U3RyaW5nfEFycmF5fSBwbHVnaW5zIC0gQSBsaXN0IG9mIHBsdWdpbnMgdG8gaW5pdGlhbGl6ZS4gTGVhdmUgdGhpcyBvdXQgdG8gaW5pdGlhbGl6ZSBldmVyeXRoaW5nLlxuICAgKi9cbiAgcmVmbG93OiBmdW5jdGlvbihlbGVtLCBwbHVnaW5zKSB7XG5cbiAgICAvLyBJZiBwbHVnaW5zIGlzIHVuZGVmaW5lZCwganVzdCBncmFiIGV2ZXJ5dGhpbmdcbiAgICBpZiAodHlwZW9mIHBsdWdpbnMgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBwbHVnaW5zID0gT2JqZWN0LmtleXModGhpcy5fcGx1Z2lucyk7XG4gICAgfVxuICAgIC8vIElmIHBsdWdpbnMgaXMgYSBzdHJpbmcsIGNvbnZlcnQgaXQgdG8gYW4gYXJyYXkgd2l0aCBvbmUgaXRlbVxuICAgIGVsc2UgaWYgKHR5cGVvZiBwbHVnaW5zID09PSAnc3RyaW5nJykge1xuICAgICAgcGx1Z2lucyA9IFtwbHVnaW5zXTtcbiAgICB9XG5cbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgLy8gSXRlcmF0ZSB0aHJvdWdoIGVhY2ggcGx1Z2luXG4gICAgJC5lYWNoKHBsdWdpbnMsIGZ1bmN0aW9uKGksIG5hbWUpIHtcbiAgICAgIC8vIEdldCB0aGUgY3VycmVudCBwbHVnaW5cbiAgICAgIHZhciBwbHVnaW4gPSBfdGhpcy5fcGx1Z2luc1tuYW1lXTtcblxuICAgICAgLy8gTG9jYWxpemUgdGhlIHNlYXJjaCB0byBhbGwgZWxlbWVudHMgaW5zaWRlIGVsZW0sIGFzIHdlbGwgYXMgZWxlbSBpdHNlbGYsIHVubGVzcyBlbGVtID09PSBkb2N1bWVudFxuICAgICAgdmFyICRlbGVtID0gJChlbGVtKS5maW5kKCdbZGF0YS0nK25hbWUrJ10nKS5hZGRCYWNrKCdbZGF0YS0nK25hbWUrJ10nKTtcblxuICAgICAgLy8gRm9yIGVhY2ggcGx1Z2luIGZvdW5kLCBpbml0aWFsaXplIGl0XG4gICAgICAkZWxlbS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgJGVsID0gJCh0aGlzKSxcbiAgICAgICAgICAgIG9wdHMgPSB7fTtcbiAgICAgICAgLy8gRG9uJ3QgZG91YmxlLWRpcCBvbiBwbHVnaW5zXG4gICAgICAgIGlmICgkZWwuZGF0YSgnemZQbHVnaW4nKSkge1xuICAgICAgICAgIGNvbnNvbGUud2FybihcIlRyaWVkIHRvIGluaXRpYWxpemUgXCIrbmFtZStcIiBvbiBhbiBlbGVtZW50IHRoYXQgYWxyZWFkeSBoYXMgYSBGb3VuZGF0aW9uIHBsdWdpbi5cIik7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoJGVsLmF0dHIoJ2RhdGEtb3B0aW9ucycpKXtcbiAgICAgICAgICB2YXIgdGhpbmcgPSAkZWwuYXR0cignZGF0YS1vcHRpb25zJykuc3BsaXQoJzsnKS5mb3JFYWNoKGZ1bmN0aW9uKGUsIGkpe1xuICAgICAgICAgICAgdmFyIG9wdCA9IGUuc3BsaXQoJzonKS5tYXAoZnVuY3Rpb24oZWwpeyByZXR1cm4gZWwudHJpbSgpOyB9KTtcbiAgICAgICAgICAgIGlmKG9wdFswXSkgb3B0c1tvcHRbMF1dID0gcGFyc2VWYWx1ZShvcHRbMV0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHRyeXtcbiAgICAgICAgICAkZWwuZGF0YSgnemZQbHVnaW4nLCBuZXcgcGx1Z2luKCQodGhpcyksIG9wdHMpKTtcbiAgICAgICAgfWNhdGNoKGVyKXtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGVyKTtcbiAgICAgICAgfWZpbmFsbHl7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSxcbiAgZ2V0Rm5OYW1lOiBmdW5jdGlvbk5hbWUsXG5cbiAgYWRkVG9KcXVlcnk6IGZ1bmN0aW9uKCQpIHtcbiAgICAvLyBUT0RPOiBjb25zaWRlciBub3QgbWFraW5nIHRoaXMgYSBqUXVlcnkgZnVuY3Rpb25cbiAgICAvLyBUT0RPOiBuZWVkIHdheSB0byByZWZsb3cgdnMuIHJlLWluaXRpYWxpemVcbiAgICAvKipcbiAgICAgKiBUaGUgRm91bmRhdGlvbiBqUXVlcnkgbWV0aG9kLlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfEFycmF5fSBtZXRob2QgLSBBbiBhY3Rpb24gdG8gcGVyZm9ybSBvbiB0aGUgY3VycmVudCBqUXVlcnkgb2JqZWN0LlxuICAgICAqL1xuICAgIHZhciBmb3VuZGF0aW9uID0gZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgICB2YXIgdHlwZSA9IHR5cGVvZiBtZXRob2QsXG4gICAgICAgICAgJG5vSlMgPSAkKCcubm8tanMnKTtcblxuICAgICAgaWYoJG5vSlMubGVuZ3RoKXtcbiAgICAgICAgJG5vSlMucmVtb3ZlQ2xhc3MoJ25vLWpzJyk7XG4gICAgICB9XG5cbiAgICAgIGlmKHR5cGUgPT09ICd1bmRlZmluZWQnKXsvL25lZWRzIHRvIGluaXRpYWxpemUgdGhlIEZvdW5kYXRpb24gb2JqZWN0LCBvciBhbiBpbmRpdmlkdWFsIHBsdWdpbi5cbiAgICAgICAgTWVkaWFRdWVyeS5faW5pdCgpO1xuICAgICAgICBGb3VuZGF0aW9uLnJlZmxvdyh0aGlzKTtcbiAgICAgIH1lbHNlIGlmKHR5cGUgPT09ICdzdHJpbmcnKXsvL2FuIGluZGl2aWR1YWwgbWV0aG9kIHRvIGludm9rZSBvbiBhIHBsdWdpbiBvciBncm91cCBvZiBwbHVnaW5zXG4gICAgICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTsvL2NvbGxlY3QgYWxsIHRoZSBhcmd1bWVudHMsIGlmIG5lY2Vzc2FyeVxuICAgICAgICB2YXIgcGx1Z0NsYXNzID0gdGhpcy5kYXRhKCd6ZlBsdWdpbicpOy8vZGV0ZXJtaW5lIHRoZSBjbGFzcyBvZiBwbHVnaW5cblxuICAgICAgICBpZihwbHVnQ2xhc3MgIT09IHVuZGVmaW5lZCAmJiBwbHVnQ2xhc3NbbWV0aG9kXSAhPT0gdW5kZWZpbmVkKXsvL21ha2Ugc3VyZSBib3RoIHRoZSBjbGFzcyBhbmQgbWV0aG9kIGV4aXN0XG4gICAgICAgICAgaWYodGhpcy5sZW5ndGggPT09IDEpey8vaWYgdGhlcmUncyBvbmx5IG9uZSwgY2FsbCBpdCBkaXJlY3RseS5cbiAgICAgICAgICAgICAgcGx1Z0NsYXNzW21ldGhvZF0uYXBwbHkocGx1Z0NsYXNzLCBhcmdzKTtcbiAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHRoaXMuZWFjaChmdW5jdGlvbihpLCBlbCl7Ly9vdGhlcndpc2UgbG9vcCB0aHJvdWdoIHRoZSBqUXVlcnkgY29sbGVjdGlvbiBhbmQgaW52b2tlIHRoZSBtZXRob2Qgb24gZWFjaFxuICAgICAgICAgICAgICBwbHVnQ2xhc3NbbWV0aG9kXS5hcHBseSgkKGVsKS5kYXRhKCd6ZlBsdWdpbicpLCBhcmdzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfWVsc2V7Ly9lcnJvciBmb3Igbm8gY2xhc3Mgb3Igbm8gbWV0aG9kXG4gICAgICAgICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwiV2UncmUgc29ycnksICdcIiArIG1ldGhvZCArIFwiJyBpcyBub3QgYW4gYXZhaWxhYmxlIG1ldGhvZCBmb3IgXCIgKyAocGx1Z0NsYXNzID8gZnVuY3Rpb25OYW1lKHBsdWdDbGFzcykgOiAndGhpcyBlbGVtZW50JykgKyAnLicpO1xuICAgICAgICB9XG4gICAgICB9ZWxzZXsvL2Vycm9yIGZvciBpbnZhbGlkIGFyZ3VtZW50IHR5cGVcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgV2UncmUgc29ycnksICR7dHlwZX0gaXMgbm90IGEgdmFsaWQgcGFyYW1ldGVyLiBZb3UgbXVzdCB1c2UgYSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSBtZXRob2QgeW91IHdpc2ggdG8gaW52b2tlLmApO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICAkLmZuLmZvdW5kYXRpb24gPSBmb3VuZGF0aW9uO1xuICAgIHJldHVybiAkO1xuICB9XG59O1xuXG5Gb3VuZGF0aW9uLnV0aWwgPSB7XG4gIC8qKlxuICAgKiBGdW5jdGlvbiBmb3IgYXBwbHlpbmcgYSBkZWJvdW5jZSBlZmZlY3QgdG8gYSBmdW5jdGlvbiBjYWxsLlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyAtIEZ1bmN0aW9uIHRvIGJlIGNhbGxlZCBhdCBlbmQgb2YgdGltZW91dC5cbiAgICogQHBhcmFtIHtOdW1iZXJ9IGRlbGF5IC0gVGltZSBpbiBtcyB0byBkZWxheSB0aGUgY2FsbCBvZiBgZnVuY2AuXG4gICAqIEByZXR1cm5zIGZ1bmN0aW9uXG4gICAqL1xuICB0aHJvdHRsZTogZnVuY3Rpb24gKGZ1bmMsIGRlbGF5KSB7XG4gICAgdmFyIHRpbWVyID0gbnVsbDtcblxuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgY29udGV4dCA9IHRoaXMsIGFyZ3MgPSBhcmd1bWVudHM7XG5cbiAgICAgIGlmICh0aW1lciA9PT0gbnVsbCkge1xuICAgICAgICB0aW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgICAgICAgdGltZXIgPSBudWxsO1xuICAgICAgICB9LCBkZWxheSk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxufTtcblxud2luZG93LkZvdW5kYXRpb24gPSBGb3VuZGF0aW9uO1xuXG4vLyBQb2x5ZmlsbCBmb3IgcmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4oZnVuY3Rpb24oKSB7XG4gIGlmICghRGF0ZS5ub3cgfHwgIXdpbmRvdy5EYXRlLm5vdylcbiAgICB3aW5kb3cuRGF0ZS5ub3cgPSBEYXRlLm5vdyA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gbmV3IERhdGUoKS5nZXRUaW1lKCk7IH07XG5cbiAgdmFyIHZlbmRvcnMgPSBbJ3dlYmtpdCcsICdtb3onXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB2ZW5kb3JzLmxlbmd0aCAmJiAhd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZTsgKytpKSB7XG4gICAgICB2YXIgdnAgPSB2ZW5kb3JzW2ldO1xuICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSA9IHdpbmRvd1t2cCsnUmVxdWVzdEFuaW1hdGlvbkZyYW1lJ107XG4gICAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUgPSAod2luZG93W3ZwKydDYW5jZWxBbmltYXRpb25GcmFtZSddXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8fCB3aW5kb3dbdnArJ0NhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZSddKTtcbiAgfVxuICBpZiAoL2lQKGFkfGhvbmV8b2QpLipPUyA2Ly50ZXN0KHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50KVxuICAgIHx8ICF3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8ICF3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUpIHtcbiAgICB2YXIgbGFzdFRpbWUgPSAwO1xuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgICAgICB2YXIgbm93ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgdmFyIG5leHRUaW1lID0gTWF0aC5tYXgobGFzdFRpbWUgKyAxNiwgbm93KTtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7IGNhbGxiYWNrKGxhc3RUaW1lID0gbmV4dFRpbWUpOyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0VGltZSAtIG5vdyk7XG4gICAgfTtcbiAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUgPSBjbGVhclRpbWVvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIFBvbHlmaWxsIGZvciBwZXJmb3JtYW5jZS5ub3csIHJlcXVpcmVkIGJ5IHJBRlxuICAgKi9cbiAgaWYoIXdpbmRvdy5wZXJmb3JtYW5jZSB8fCAhd2luZG93LnBlcmZvcm1hbmNlLm5vdyl7XG4gICAgd2luZG93LnBlcmZvcm1hbmNlID0ge1xuICAgICAgc3RhcnQ6IERhdGUubm93KCksXG4gICAgICBub3c6IGZ1bmN0aW9uKCl7IHJldHVybiBEYXRlLm5vdygpIC0gdGhpcy5zdGFydDsgfVxuICAgIH07XG4gIH1cbn0pKCk7XG5pZiAoIUZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kKSB7XG4gIEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kID0gZnVuY3Rpb24ob1RoaXMpIHtcbiAgICBpZiAodHlwZW9mIHRoaXMgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIC8vIGNsb3Nlc3QgdGhpbmcgcG9zc2libGUgdG8gdGhlIEVDTUFTY3JpcHQgNVxuICAgICAgLy8gaW50ZXJuYWwgSXNDYWxsYWJsZSBmdW5jdGlvblxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQgLSB3aGF0IGlzIHRyeWluZyB0byBiZSBib3VuZCBpcyBub3QgY2FsbGFibGUnKTtcbiAgICB9XG5cbiAgICB2YXIgYUFyZ3MgICA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSksXG4gICAgICAgIGZUb0JpbmQgPSB0aGlzLFxuICAgICAgICBmTk9QICAgID0gZnVuY3Rpb24oKSB7fSxcbiAgICAgICAgZkJvdW5kICA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBmVG9CaW5kLmFwcGx5KHRoaXMgaW5zdGFuY2VvZiBmTk9QXG4gICAgICAgICAgICAgICAgID8gdGhpc1xuICAgICAgICAgICAgICAgICA6IG9UaGlzLFxuICAgICAgICAgICAgICAgICBhQXJncy5jb25jYXQoQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKSkpO1xuICAgICAgICB9O1xuXG4gICAgaWYgKHRoaXMucHJvdG90eXBlKSB7XG4gICAgICAvLyBuYXRpdmUgZnVuY3Rpb25zIGRvbid0IGhhdmUgYSBwcm90b3R5cGVcbiAgICAgIGZOT1AucHJvdG90eXBlID0gdGhpcy5wcm90b3R5cGU7XG4gICAgfVxuICAgIGZCb3VuZC5wcm90b3R5cGUgPSBuZXcgZk5PUCgpO1xuXG4gICAgcmV0dXJuIGZCb3VuZDtcbiAgfTtcbn1cbi8vIFBvbHlmaWxsIHRvIGdldCB0aGUgbmFtZSBvZiBhIGZ1bmN0aW9uIGluIElFOVxuZnVuY3Rpb24gZnVuY3Rpb25OYW1lKGZuKSB7XG4gIGlmIChGdW5jdGlvbi5wcm90b3R5cGUubmFtZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdmFyIGZ1bmNOYW1lUmVnZXggPSAvZnVuY3Rpb25cXHMoW14oXXsxLH0pXFwoLztcbiAgICB2YXIgcmVzdWx0cyA9IChmdW5jTmFtZVJlZ2V4KS5leGVjKChmbikudG9TdHJpbmcoKSk7XG4gICAgcmV0dXJuIChyZXN1bHRzICYmIHJlc3VsdHMubGVuZ3RoID4gMSkgPyByZXN1bHRzWzFdLnRyaW0oKSA6IFwiXCI7XG4gIH1cbiAgZWxzZSBpZiAoZm4ucHJvdG90eXBlID09PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gZm4uY29uc3RydWN0b3IubmFtZTtcbiAgfVxuICBlbHNlIHtcbiAgICByZXR1cm4gZm4ucHJvdG90eXBlLmNvbnN0cnVjdG9yLm5hbWU7XG4gIH1cbn1cbmZ1bmN0aW9uIHBhcnNlVmFsdWUoc3RyKXtcbiAgaWYgKCd0cnVlJyA9PT0gc3RyKSByZXR1cm4gdHJ1ZTtcbiAgZWxzZSBpZiAoJ2ZhbHNlJyA9PT0gc3RyKSByZXR1cm4gZmFsc2U7XG4gIGVsc2UgaWYgKCFpc05hTihzdHIgKiAxKSkgcmV0dXJuIHBhcnNlRmxvYXQoc3RyKTtcbiAgcmV0dXJuIHN0cjtcbn1cbi8vIENvbnZlcnQgUGFzY2FsQ2FzZSB0byBrZWJhYi1jYXNlXG4vLyBUaGFuayB5b3U6IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzg5NTU1ODBcbmZ1bmN0aW9uIGh5cGhlbmF0ZShzdHIpIHtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC8oW2Etel0pKFtBLVpdKS9nLCAnJDEtJDInKS50b0xvd2VyQ2FzZSgpO1xufVxuXG5leHBvcnQge0ZvdW5kYXRpb259O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi5jb3JlLmpzIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IHsgdHJhbnNpdGlvbmVuZCB9IGZyb20gJy4vZm91bmRhdGlvbi51dGlsLmNvcmUnO1xuXG4vKipcbiAqIE1vdGlvbiBtb2R1bGUuXG4gKiBAbW9kdWxlIGZvdW5kYXRpb24ubW90aW9uXG4gKi9cblxuY29uc3QgaW5pdENsYXNzZXMgICA9IFsnbXVpLWVudGVyJywgJ211aS1sZWF2ZSddO1xuY29uc3QgYWN0aXZlQ2xhc3NlcyA9IFsnbXVpLWVudGVyLWFjdGl2ZScsICdtdWktbGVhdmUtYWN0aXZlJ107XG5cbmNvbnN0IE1vdGlvbiA9IHtcbiAgYW5pbWF0ZUluOiBmdW5jdGlvbihlbGVtZW50LCBhbmltYXRpb24sIGNiKSB7XG4gICAgYW5pbWF0ZSh0cnVlLCBlbGVtZW50LCBhbmltYXRpb24sIGNiKTtcbiAgfSxcblxuICBhbmltYXRlT3V0OiBmdW5jdGlvbihlbGVtZW50LCBhbmltYXRpb24sIGNiKSB7XG4gICAgYW5pbWF0ZShmYWxzZSwgZWxlbWVudCwgYW5pbWF0aW9uLCBjYik7XG4gIH1cbn1cblxuZnVuY3Rpb24gTW92ZShkdXJhdGlvbiwgZWxlbSwgZm4pe1xuICB2YXIgYW5pbSwgcHJvZywgc3RhcnQgPSBudWxsO1xuICAvLyBjb25zb2xlLmxvZygnY2FsbGVkJyk7XG5cbiAgaWYgKGR1cmF0aW9uID09PSAwKSB7XG4gICAgZm4uYXBwbHkoZWxlbSk7XG4gICAgZWxlbS50cmlnZ2VyKCdmaW5pc2hlZC56Zi5hbmltYXRlJywgW2VsZW1dKS50cmlnZ2VySGFuZGxlcignZmluaXNoZWQuemYuYW5pbWF0ZScsIFtlbGVtXSk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgZnVuY3Rpb24gbW92ZSh0cyl7XG4gICAgaWYoIXN0YXJ0KSBzdGFydCA9IHRzO1xuICAgIC8vIGNvbnNvbGUubG9nKHN0YXJ0LCB0cyk7XG4gICAgcHJvZyA9IHRzIC0gc3RhcnQ7XG4gICAgZm4uYXBwbHkoZWxlbSk7XG5cbiAgICBpZihwcm9nIDwgZHVyYXRpb24peyBhbmltID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShtb3ZlLCBlbGVtKTsgfVxuICAgIGVsc2V7XG4gICAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUoYW5pbSk7XG4gICAgICBlbGVtLnRyaWdnZXIoJ2ZpbmlzaGVkLnpmLmFuaW1hdGUnLCBbZWxlbV0pLnRyaWdnZXJIYW5kbGVyKCdmaW5pc2hlZC56Zi5hbmltYXRlJywgW2VsZW1dKTtcbiAgICB9XG4gIH1cbiAgYW5pbSA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUobW92ZSk7XG59XG5cbi8qKlxuICogQW5pbWF0ZXMgYW4gZWxlbWVudCBpbiBvciBvdXQgdXNpbmcgYSBDU1MgdHJhbnNpdGlvbiBjbGFzcy5cbiAqIEBmdW5jdGlvblxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gaXNJbiAtIERlZmluZXMgaWYgdGhlIGFuaW1hdGlvbiBpcyBpbiBvciBvdXQuXG4gKiBAcGFyYW0ge09iamVjdH0gZWxlbWVudCAtIGpRdWVyeSBvciBIVE1MIG9iamVjdCB0byBhbmltYXRlLlxuICogQHBhcmFtIHtTdHJpbmd9IGFuaW1hdGlvbiAtIENTUyBjbGFzcyB0byB1c2UuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYiAtIENhbGxiYWNrIHRvIHJ1biB3aGVuIGFuaW1hdGlvbiBpcyBmaW5pc2hlZC5cbiAqL1xuZnVuY3Rpb24gYW5pbWF0ZShpc0luLCBlbGVtZW50LCBhbmltYXRpb24sIGNiKSB7XG4gIGVsZW1lbnQgPSAkKGVsZW1lbnQpLmVxKDApO1xuXG4gIGlmICghZWxlbWVudC5sZW5ndGgpIHJldHVybjtcblxuICB2YXIgaW5pdENsYXNzID0gaXNJbiA/IGluaXRDbGFzc2VzWzBdIDogaW5pdENsYXNzZXNbMV07XG4gIHZhciBhY3RpdmVDbGFzcyA9IGlzSW4gPyBhY3RpdmVDbGFzc2VzWzBdIDogYWN0aXZlQ2xhc3Nlc1sxXTtcblxuICAvLyBTZXQgdXAgdGhlIGFuaW1hdGlvblxuICByZXNldCgpO1xuXG4gIGVsZW1lbnRcbiAgICAuYWRkQ2xhc3MoYW5pbWF0aW9uKVxuICAgIC5jc3MoJ3RyYW5zaXRpb24nLCAnbm9uZScpO1xuXG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgZWxlbWVudC5hZGRDbGFzcyhpbml0Q2xhc3MpO1xuICAgIGlmIChpc0luKSBlbGVtZW50LnNob3coKTtcbiAgfSk7XG5cbiAgLy8gU3RhcnQgdGhlIGFuaW1hdGlvblxuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgIGVsZW1lbnRbMF0ub2Zmc2V0V2lkdGg7XG4gICAgZWxlbWVudFxuICAgICAgLmNzcygndHJhbnNpdGlvbicsICcnKVxuICAgICAgLmFkZENsYXNzKGFjdGl2ZUNsYXNzKTtcbiAgfSk7XG5cbiAgLy8gQ2xlYW4gdXAgdGhlIGFuaW1hdGlvbiB3aGVuIGl0IGZpbmlzaGVzXG4gIGVsZW1lbnQub25lKHRyYW5zaXRpb25lbmQoZWxlbWVudCksIGZpbmlzaCk7XG5cbiAgLy8gSGlkZXMgdGhlIGVsZW1lbnQgKGZvciBvdXQgYW5pbWF0aW9ucyksIHJlc2V0cyB0aGUgZWxlbWVudCwgYW5kIHJ1bnMgYSBjYWxsYmFja1xuICBmdW5jdGlvbiBmaW5pc2goKSB7XG4gICAgaWYgKCFpc0luKSBlbGVtZW50LmhpZGUoKTtcbiAgICByZXNldCgpO1xuICAgIGlmIChjYikgY2IuYXBwbHkoZWxlbWVudCk7XG4gIH1cblxuICAvLyBSZXNldHMgdHJhbnNpdGlvbnMgYW5kIHJlbW92ZXMgbW90aW9uLXNwZWNpZmljIGNsYXNzZXNcbiAgZnVuY3Rpb24gcmVzZXQoKSB7XG4gICAgZWxlbWVudFswXS5zdHlsZS50cmFuc2l0aW9uRHVyYXRpb24gPSAwO1xuICAgIGVsZW1lbnQucmVtb3ZlQ2xhc3MoYCR7aW5pdENsYXNzfSAke2FjdGl2ZUNsYXNzfSAke2FuaW1hdGlvbn1gKTtcbiAgfVxufVxuXG5leHBvcnQge01vdmUsIE1vdGlvbn07XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24udXRpbC5tb3Rpb24uanMiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5pbXBvcnQgeyBLZXlib2FyZCB9IGZyb20gJy4vZm91bmRhdGlvbi51dGlsLmtleWJvYXJkJztcbmltcG9ydCB7IE1lZGlhUXVlcnkgfSBmcm9tICcuL2ZvdW5kYXRpb24udXRpbC5tZWRpYVF1ZXJ5JztcbmltcG9ydCB7IHRyYW5zaXRpb25lbmQgfSBmcm9tICcuL2ZvdW5kYXRpb24udXRpbC5jb3JlJztcbmltcG9ydCB7IFBsdWdpbiB9IGZyb20gJy4vZm91bmRhdGlvbi5wbHVnaW4nO1xuXG5pbXBvcnQgeyBUcmlnZ2VycyB9IGZyb20gJy4vZm91bmRhdGlvbi51dGlsLnRyaWdnZXJzJztcblxuLyoqXG4gKiBPZmZDYW52YXMgbW9kdWxlLlxuICogQG1vZHVsZSBmb3VuZGF0aW9uLm9mZmNhbnZhc1xuICogQHJlcXVpcmVzIGZvdW5kYXRpb24udXRpbC5rZXlib2FyZFxuICogQHJlcXVpcmVzIGZvdW5kYXRpb24udXRpbC5tZWRpYVF1ZXJ5XG4gKiBAcmVxdWlyZXMgZm91bmRhdGlvbi51dGlsLnRyaWdnZXJzXG4gKi9cblxuY2xhc3MgT2ZmQ2FudmFzIGV4dGVuZHMgUGx1Z2luIHtcbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgYW4gb2ZmLWNhbnZhcyB3cmFwcGVyLlxuICAgKiBAY2xhc3NcbiAgICogQG5hbWUgT2ZmQ2FudmFzXG4gICAqIEBmaXJlcyBPZmZDYW52YXMjaW5pdFxuICAgKiBAcGFyYW0ge09iamVjdH0gZWxlbWVudCAtIGpRdWVyeSBvYmplY3QgdG8gaW5pdGlhbGl6ZS5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBPdmVycmlkZXMgdG8gdGhlIGRlZmF1bHQgcGx1Z2luIHNldHRpbmdzLlxuICAgKi9cbiAgX3NldHVwKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICB0aGlzLmNsYXNzTmFtZSA9ICdPZmZDYW52YXMnOyAvLyBpZTkgYmFjayBjb21wYXRcbiAgICB0aGlzLiRlbGVtZW50ID0gZWxlbWVudDtcbiAgICB0aGlzLm9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgT2ZmQ2FudmFzLmRlZmF1bHRzLCB0aGlzLiRlbGVtZW50LmRhdGEoKSwgb3B0aW9ucyk7XG4gICAgdGhpcy5jb250ZW50Q2xhc3NlcyA9IHsgYmFzZTogW10sIHJldmVhbDogW10gfTtcbiAgICB0aGlzLiRsYXN0VHJpZ2dlciA9ICQoKTtcbiAgICB0aGlzLiR0cmlnZ2VycyA9ICQoKTtcbiAgICB0aGlzLnBvc2l0aW9uID0gJ2xlZnQnO1xuICAgIHRoaXMuJGNvbnRlbnQgPSAkKCk7XG4gICAgdGhpcy5uZXN0ZWQgPSAhISh0aGlzLm9wdGlvbnMubmVzdGVkKTtcblxuICAgIC8vIERlZmluZXMgdGhlIENTUyB0cmFuc2l0aW9uL3Bvc2l0aW9uIGNsYXNzZXMgb2YgdGhlIG9mZi1jYW52YXMgY29udGVudCBjb250YWluZXIuXG4gICAgJChbJ3B1c2gnLCAnb3ZlcmxhcCddKS5lYWNoKChpbmRleCwgdmFsKSA9PiB7XG4gICAgICB0aGlzLmNvbnRlbnRDbGFzc2VzLmJhc2UucHVzaCgnaGFzLXRyYW5zaXRpb24tJyt2YWwpO1xuICAgIH0pO1xuICAgICQoWydsZWZ0JywgJ3JpZ2h0JywgJ3RvcCcsICdib3R0b20nXSkuZWFjaCgoaW5kZXgsIHZhbCkgPT4ge1xuICAgICAgdGhpcy5jb250ZW50Q2xhc3Nlcy5iYXNlLnB1c2goJ2hhcy1wb3NpdGlvbi0nK3ZhbCk7XG4gICAgICB0aGlzLmNvbnRlbnRDbGFzc2VzLnJldmVhbC5wdXNoKCdoYXMtcmV2ZWFsLScrdmFsKTtcbiAgICB9KTtcblxuICAgIC8vIFRyaWdnZXJzIGluaXQgaXMgaWRlbXBvdGVudCwganVzdCBuZWVkIHRvIG1ha2Ugc3VyZSBpdCBpcyBpbml0aWFsaXplZFxuICAgIFRyaWdnZXJzLmluaXQoJCk7XG4gICAgTWVkaWFRdWVyeS5faW5pdCgpO1xuXG4gICAgdGhpcy5faW5pdCgpO1xuICAgIHRoaXMuX2V2ZW50cygpO1xuXG4gICAgS2V5Ym9hcmQucmVnaXN0ZXIoJ09mZkNhbnZhcycsIHtcbiAgICAgICdFU0NBUEUnOiAnY2xvc2UnXG4gICAgfSk7XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyB0aGUgb2ZmLWNhbnZhcyB3cmFwcGVyIGJ5IGFkZGluZyB0aGUgZXhpdCBvdmVybGF5IChpZiBuZWVkZWQpLlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9pbml0KCkge1xuICAgIHZhciBpZCA9IHRoaXMuJGVsZW1lbnQuYXR0cignaWQnKTtcblxuICAgIHRoaXMuJGVsZW1lbnQuYXR0cignYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuXG4gICAgLy8gRmluZCBvZmYtY2FudmFzIGNvbnRlbnQsIGVpdGhlciBieSBJRCAoaWYgc3BlY2lmaWVkKSwgYnkgc2libGluZ3Mgb3IgYnkgY2xvc2VzdCBzZWxlY3RvciAoZmFsbGJhY2spXG4gICAgaWYgKHRoaXMub3B0aW9ucy5jb250ZW50SWQpIHtcbiAgICAgIHRoaXMuJGNvbnRlbnQgPSAkKCcjJyt0aGlzLm9wdGlvbnMuY29udGVudElkKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuJGVsZW1lbnQuc2libGluZ3MoJ1tkYXRhLW9mZi1jYW52YXMtY29udGVudF0nKS5sZW5ndGgpIHtcbiAgICAgIHRoaXMuJGNvbnRlbnQgPSB0aGlzLiRlbGVtZW50LnNpYmxpbmdzKCdbZGF0YS1vZmYtY2FudmFzLWNvbnRlbnRdJykuZmlyc3QoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy4kY29udGVudCA9IHRoaXMuJGVsZW1lbnQuY2xvc2VzdCgnW2RhdGEtb2ZmLWNhbnZhcy1jb250ZW50XScpLmZpcnN0KCk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLm9wdGlvbnMuY29udGVudElkKSB7XG4gICAgICAvLyBBc3N1bWUgdGhhdCB0aGUgb2ZmLWNhbnZhcyBlbGVtZW50IGlzIG5lc3RlZCBpZiBpdCBpc24ndCBhIHNpYmxpbmcgb2YgdGhlIGNvbnRlbnRcbiAgICAgIHRoaXMubmVzdGVkID0gdGhpcy4kZWxlbWVudC5zaWJsaW5ncygnW2RhdGEtb2ZmLWNhbnZhcy1jb250ZW50XScpLmxlbmd0aCA9PT0gMDtcblxuICAgIH0gZWxzZSBpZiAodGhpcy5vcHRpb25zLmNvbnRlbnRJZCAmJiB0aGlzLm9wdGlvbnMubmVzdGVkID09PSBudWxsKSB7XG4gICAgICAvLyBXYXJuaW5nIGlmIHVzaW5nIGNvbnRlbnQgSUQgd2l0aG91dCBzZXR0aW5nIHRoZSBuZXN0ZWQgb3B0aW9uXG4gICAgICAvLyBPbmNlIHRoZSBlbGVtZW50IGlzIG5lc3RlZCBpdCBpcyByZXF1aXJlZCB0byB3b3JrIHByb3Blcmx5IGluIHRoaXMgY2FzZVxuICAgICAgY29uc29sZS53YXJuKCdSZW1lbWJlciB0byB1c2UgdGhlIG5lc3RlZCBvcHRpb24gaWYgdXNpbmcgdGhlIGNvbnRlbnQgSUQgb3B0aW9uIScpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm5lc3RlZCA9PT0gdHJ1ZSkge1xuICAgICAgLy8gRm9yY2UgdHJhbnNpdGlvbiBvdmVybGFwIGlmIG5lc3RlZFxuICAgICAgdGhpcy5vcHRpb25zLnRyYW5zaXRpb24gPSAnb3ZlcmxhcCc7XG4gICAgICAvLyBSZW1vdmUgYXBwcm9wcmlhdGUgY2xhc3NlcyBpZiBhbHJlYWR5IGFzc2lnbmVkIGluIG1hcmt1cFxuICAgICAgdGhpcy4kZWxlbWVudC5yZW1vdmVDbGFzcygnaXMtdHJhbnNpdGlvbi1wdXNoJyk7XG4gICAgfVxuXG4gICAgdGhpcy4kZWxlbWVudC5hZGRDbGFzcyhgaXMtdHJhbnNpdGlvbi0ke3RoaXMub3B0aW9ucy50cmFuc2l0aW9ufSBpcy1jbG9zZWRgKTtcblxuICAgIC8vIEZpbmQgdHJpZ2dlcnMgdGhhdCBhZmZlY3QgdGhpcyBlbGVtZW50IGFuZCBhZGQgYXJpYS1leHBhbmRlZCB0byB0aGVtXG4gICAgdGhpcy4kdHJpZ2dlcnMgPSAkKGRvY3VtZW50KVxuICAgICAgLmZpbmQoJ1tkYXRhLW9wZW49XCInK2lkKydcIl0sIFtkYXRhLWNsb3NlPVwiJytpZCsnXCJdLCBbZGF0YS10b2dnbGU9XCInK2lkKydcIl0nKVxuICAgICAgLmF0dHIoJ2FyaWEtZXhwYW5kZWQnLCAnZmFsc2UnKVxuICAgICAgLmF0dHIoJ2FyaWEtY29udHJvbHMnLCBpZCk7XG5cbiAgICAvLyBHZXQgcG9zaXRpb24gYnkgY2hlY2tpbmcgZm9yIHJlbGF0ZWQgQ1NTIGNsYXNzXG4gICAgdGhpcy5wb3NpdGlvbiA9IHRoaXMuJGVsZW1lbnQuaXMoJy5wb3NpdGlvbi1sZWZ0LCAucG9zaXRpb24tdG9wLCAucG9zaXRpb24tcmlnaHQsIC5wb3NpdGlvbi1ib3R0b20nKSA/IHRoaXMuJGVsZW1lbnQuYXR0cignY2xhc3MnKS5tYXRjaCgvcG9zaXRpb25cXC0obGVmdHx0b3B8cmlnaHR8Ym90dG9tKS8pWzFdIDogdGhpcy5wb3NpdGlvbjtcblxuICAgIC8vIEFkZCBhbiBvdmVybGF5IG92ZXIgdGhlIGNvbnRlbnQgaWYgbmVjZXNzYXJ5XG4gICAgaWYgKHRoaXMub3B0aW9ucy5jb250ZW50T3ZlcmxheSA9PT0gdHJ1ZSkge1xuICAgICAgdmFyIG92ZXJsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIHZhciBvdmVybGF5UG9zaXRpb24gPSAkKHRoaXMuJGVsZW1lbnQpLmNzcyhcInBvc2l0aW9uXCIpID09PSAnZml4ZWQnID8gJ2lzLW92ZXJsYXktZml4ZWQnIDogJ2lzLW92ZXJsYXktYWJzb2x1dGUnO1xuICAgICAgb3ZlcmxheS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2pzLW9mZi1jYW52YXMtb3ZlcmxheSAnICsgb3ZlcmxheVBvc2l0aW9uKTtcbiAgICAgIHRoaXMuJG92ZXJsYXkgPSAkKG92ZXJsYXkpO1xuICAgICAgaWYob3ZlcmxheVBvc2l0aW9uID09PSAnaXMtb3ZlcmxheS1maXhlZCcpIHtcbiAgICAgICAgJCh0aGlzLiRvdmVybGF5KS5pbnNlcnRBZnRlcih0aGlzLiRlbGVtZW50KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuJGNvbnRlbnQuYXBwZW5kKHRoaXMuJG92ZXJsYXkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMub3B0aW9ucy5pc1JldmVhbGVkID0gdGhpcy5vcHRpb25zLmlzUmV2ZWFsZWQgfHwgbmV3IFJlZ0V4cCh0aGlzLm9wdGlvbnMucmV2ZWFsQ2xhc3MsICdnJykudGVzdCh0aGlzLiRlbGVtZW50WzBdLmNsYXNzTmFtZSk7XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmlzUmV2ZWFsZWQgPT09IHRydWUpIHtcbiAgICAgIHRoaXMub3B0aW9ucy5yZXZlYWxPbiA9IHRoaXMub3B0aW9ucy5yZXZlYWxPbiB8fCB0aGlzLiRlbGVtZW50WzBdLmNsYXNzTmFtZS5tYXRjaCgvKHJldmVhbC1mb3ItbWVkaXVtfHJldmVhbC1mb3ItbGFyZ2UpL2cpWzBdLnNwbGl0KCctJylbMl07XG4gICAgICB0aGlzLl9zZXRNUUNoZWNrZXIoKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLnRyYW5zaXRpb25UaW1lKSB7XG4gICAgICB0aGlzLiRlbGVtZW50LmNzcygndHJhbnNpdGlvbi1kdXJhdGlvbicsIHRoaXMub3B0aW9ucy50cmFuc2l0aW9uVGltZSk7XG4gICAgfVxuXG4gICAgLy8gSW5pdGFsbHkgcmVtb3ZlIGFsbCB0cmFuc2l0aW9uL3Bvc2l0aW9uIENTUyBjbGFzc2VzIGZyb20gb2ZmLWNhbnZhcyBjb250ZW50IGNvbnRhaW5lci5cbiAgICB0aGlzLl9yZW1vdmVDb250ZW50Q2xhc3NlcygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgZXZlbnQgaGFuZGxlcnMgdG8gdGhlIG9mZi1jYW52YXMgd3JhcHBlciBhbmQgdGhlIGV4aXQgb3ZlcmxheS5cbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfZXZlbnRzKCkge1xuICAgIHRoaXMuJGVsZW1lbnQub2ZmKCcuemYudHJpZ2dlciAuemYub2ZmY2FudmFzJykub24oe1xuICAgICAgJ29wZW4uemYudHJpZ2dlcic6IHRoaXMub3Blbi5iaW5kKHRoaXMpLFxuICAgICAgJ2Nsb3NlLnpmLnRyaWdnZXInOiB0aGlzLmNsb3NlLmJpbmQodGhpcyksXG4gICAgICAndG9nZ2xlLnpmLnRyaWdnZXInOiB0aGlzLnRvZ2dsZS5iaW5kKHRoaXMpLFxuICAgICAgJ2tleWRvd24uemYub2ZmY2FudmFzJzogdGhpcy5faGFuZGxlS2V5Ym9hcmQuYmluZCh0aGlzKVxuICAgIH0pO1xuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5jbG9zZU9uQ2xpY2sgPT09IHRydWUpIHtcbiAgICAgIHZhciAkdGFyZ2V0ID0gdGhpcy5vcHRpb25zLmNvbnRlbnRPdmVybGF5ID8gdGhpcy4kb3ZlcmxheSA6IHRoaXMuJGNvbnRlbnQ7XG4gICAgICAkdGFyZ2V0Lm9uKHsnY2xpY2suemYub2ZmY2FudmFzJzogdGhpcy5jbG9zZS5iaW5kKHRoaXMpfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFwcGxpZXMgZXZlbnQgbGlzdGVuZXIgZm9yIGVsZW1lbnRzIHRoYXQgd2lsbCByZXZlYWwgYXQgY2VydGFpbiBicmVha3BvaW50cy5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9zZXRNUUNoZWNrZXIoKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICQod2luZG93KS5vbignY2hhbmdlZC56Zi5tZWRpYXF1ZXJ5JywgZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoTWVkaWFRdWVyeS5hdExlYXN0KF90aGlzLm9wdGlvbnMucmV2ZWFsT24pKSB7XG4gICAgICAgIF90aGlzLnJldmVhbCh0cnVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIF90aGlzLnJldmVhbChmYWxzZSk7XG4gICAgICB9XG4gICAgfSkub25lKCdsb2FkLnpmLm9mZmNhbnZhcycsIGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKE1lZGlhUXVlcnkuYXRMZWFzdChfdGhpcy5vcHRpb25zLnJldmVhbE9uKSkge1xuICAgICAgICBfdGhpcy5yZXZlYWwodHJ1ZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyB0aGUgQ1NTIHRyYW5zaXRpb24vcG9zaXRpb24gY2xhc3NlcyBvZiB0aGUgb2ZmLWNhbnZhcyBjb250ZW50IGNvbnRhaW5lci5cbiAgICogUmVtb3ZpbmcgdGhlIGNsYXNzZXMgaXMgaW1wb3J0YW50IHdoZW4gYW5vdGhlciBvZmYtY2FudmFzIGdldHMgb3BlbmVkIHRoYXQgdXNlcyB0aGUgc2FtZSBjb250ZW50IGNvbnRhaW5lci5cbiAgICogQHBhcmFtIHtCb29sZWFufSBoYXNSZXZlYWwgLSB0cnVlIGlmIHJlbGF0ZWQgb2ZmLWNhbnZhcyBlbGVtZW50IGlzIHJldmVhbGVkLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX3JlbW92ZUNvbnRlbnRDbGFzc2VzKGhhc1JldmVhbCkge1xuICAgIGlmICh0eXBlb2YgaGFzUmV2ZWFsICE9PSAnYm9vbGVhbicpIHtcbiAgICAgIHRoaXMuJGNvbnRlbnQucmVtb3ZlQ2xhc3ModGhpcy5jb250ZW50Q2xhc3Nlcy5iYXNlLmpvaW4oJyAnKSk7XG4gICAgfSBlbHNlIGlmIChoYXNSZXZlYWwgPT09IGZhbHNlKSB7XG4gICAgICB0aGlzLiRjb250ZW50LnJlbW92ZUNsYXNzKGBoYXMtcmV2ZWFsLSR7dGhpcy5wb3NpdGlvbn1gKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQWRkcyB0aGUgQ1NTIHRyYW5zaXRpb24vcG9zaXRpb24gY2xhc3NlcyBvZiB0aGUgb2ZmLWNhbnZhcyBjb250ZW50IGNvbnRhaW5lciwgYmFzZWQgb24gdGhlIG9wZW5pbmcgb2ZmLWNhbnZhcyBlbGVtZW50LlxuICAgKiBCZWZvcmVoYW5kIGFueSB0cmFuc2l0aW9uL3Bvc2l0aW9uIGNsYXNzIGdldHMgcmVtb3ZlZC5cbiAgICogQHBhcmFtIHtCb29sZWFufSBoYXNSZXZlYWwgLSB0cnVlIGlmIHJlbGF0ZWQgb2ZmLWNhbnZhcyBlbGVtZW50IGlzIHJldmVhbGVkLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2FkZENvbnRlbnRDbGFzc2VzKGhhc1JldmVhbCkge1xuICAgIHRoaXMuX3JlbW92ZUNvbnRlbnRDbGFzc2VzKGhhc1JldmVhbCk7XG4gICAgaWYgKHR5cGVvZiBoYXNSZXZlYWwgIT09ICdib29sZWFuJykge1xuICAgICAgdGhpcy4kY29udGVudC5hZGRDbGFzcyhgaGFzLXRyYW5zaXRpb24tJHt0aGlzLm9wdGlvbnMudHJhbnNpdGlvbn0gaGFzLXBvc2l0aW9uLSR7dGhpcy5wb3NpdGlvbn1gKTtcbiAgICB9IGVsc2UgaWYgKGhhc1JldmVhbCA9PT0gdHJ1ZSkge1xuICAgICAgdGhpcy4kY29udGVudC5hZGRDbGFzcyhgaGFzLXJldmVhbC0ke3RoaXMucG9zaXRpb259YCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgdGhlIHJldmVhbGluZy9oaWRpbmcgdGhlIG9mZi1jYW52YXMgYXQgYnJlYWtwb2ludHMsIG5vdCB0aGUgc2FtZSBhcyBvcGVuLlxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IGlzUmV2ZWFsZWQgLSB0cnVlIGlmIGVsZW1lbnQgc2hvdWxkIGJlIHJldmVhbGVkLlxuICAgKiBAZnVuY3Rpb25cbiAgICovXG4gIHJldmVhbChpc1JldmVhbGVkKSB7XG4gICAgaWYgKGlzUmV2ZWFsZWQpIHtcbiAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgIHRoaXMuaXNSZXZlYWxlZCA9IHRydWU7XG4gICAgICB0aGlzLiRlbGVtZW50LmF0dHIoJ2FyaWEtaGlkZGVuJywgJ2ZhbHNlJyk7XG4gICAgICB0aGlzLiRlbGVtZW50Lm9mZignb3Blbi56Zi50cmlnZ2VyIHRvZ2dsZS56Zi50cmlnZ2VyJyk7XG4gICAgICB0aGlzLiRlbGVtZW50LnJlbW92ZUNsYXNzKCdpcy1jbG9zZWQnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pc1JldmVhbGVkID0gZmFsc2U7XG4gICAgICB0aGlzLiRlbGVtZW50LmF0dHIoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcbiAgICAgIHRoaXMuJGVsZW1lbnQub2ZmKCdvcGVuLnpmLnRyaWdnZXIgdG9nZ2xlLnpmLnRyaWdnZXInKS5vbih7XG4gICAgICAgICdvcGVuLnpmLnRyaWdnZXInOiB0aGlzLm9wZW4uYmluZCh0aGlzKSxcbiAgICAgICAgJ3RvZ2dsZS56Zi50cmlnZ2VyJzogdGhpcy50b2dnbGUuYmluZCh0aGlzKVxuICAgICAgfSk7XG4gICAgICB0aGlzLiRlbGVtZW50LmFkZENsYXNzKCdpcy1jbG9zZWQnKTtcbiAgICB9XG4gICAgdGhpcy5fYWRkQ29udGVudENsYXNzZXMoaXNSZXZlYWxlZCk7XG4gIH1cblxuICAvKipcbiAgICogU3RvcHMgc2Nyb2xsaW5nIG9mIHRoZSBib2R5IHdoZW4gb2ZmY2FudmFzIGlzIG9wZW4gb24gbW9iaWxlIFNhZmFyaSBhbmQgb3RoZXIgdHJvdWJsZXNvbWUgYnJvd3NlcnMuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfc3RvcFNjcm9sbGluZyhldmVudCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8vIFRha2VuIGFuZCBhZGFwdGVkIGZyb20gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xNjg4OTQ0Ny9wcmV2ZW50LWZ1bGwtcGFnZS1zY3JvbGxpbmctaW9zXG4gIC8vIE9ubHkgcmVhbGx5IHdvcmtzIGZvciB5LCBub3Qgc3VyZSBob3cgdG8gZXh0ZW5kIHRvIHggb3IgaWYgd2UgbmVlZCB0by5cbiAgX3JlY29yZFNjcm9sbGFibGUoZXZlbnQpIHtcbiAgICBsZXQgZWxlbSA9IHRoaXM7IC8vIGNhbGxlZCBmcm9tIGV2ZW50IGhhbmRsZXIgY29udGV4dCB3aXRoIHRoaXMgYXMgZWxlbVxuXG4gICAgIC8vIElmIHRoZSBlbGVtZW50IGlzIHNjcm9sbGFibGUgKGNvbnRlbnQgb3ZlcmZsb3dzKSwgdGhlbi4uLlxuICAgIGlmIChlbGVtLnNjcm9sbEhlaWdodCAhPT0gZWxlbS5jbGllbnRIZWlnaHQpIHtcbiAgICAgIC8vIElmIHdlJ3JlIGF0IHRoZSB0b3AsIHNjcm9sbCBkb3duIG9uZSBwaXhlbCB0byBhbGxvdyBzY3JvbGxpbmcgdXBcbiAgICAgIGlmIChlbGVtLnNjcm9sbFRvcCA9PT0gMCkge1xuICAgICAgICBlbGVtLnNjcm9sbFRvcCA9IDE7XG4gICAgICB9XG4gICAgICAvLyBJZiB3ZSdyZSBhdCB0aGUgYm90dG9tLCBzY3JvbGwgdXAgb25lIHBpeGVsIHRvIGFsbG93IHNjcm9sbGluZyBkb3duXG4gICAgICBpZiAoZWxlbS5zY3JvbGxUb3AgPT09IGVsZW0uc2Nyb2xsSGVpZ2h0IC0gZWxlbS5jbGllbnRIZWlnaHQpIHtcbiAgICAgICAgZWxlbS5zY3JvbGxUb3AgPSBlbGVtLnNjcm9sbEhlaWdodCAtIGVsZW0uY2xpZW50SGVpZ2h0IC0gMTtcbiAgICAgIH1cbiAgICB9XG4gICAgZWxlbS5hbGxvd1VwID0gZWxlbS5zY3JvbGxUb3AgPiAwO1xuICAgIGVsZW0uYWxsb3dEb3duID0gZWxlbS5zY3JvbGxUb3AgPCAoZWxlbS5zY3JvbGxIZWlnaHQgLSBlbGVtLmNsaWVudEhlaWdodCk7XG4gICAgZWxlbS5sYXN0WSA9IGV2ZW50Lm9yaWdpbmFsRXZlbnQucGFnZVk7XG4gIH1cblxuICBfc3RvcFNjcm9sbFByb3BhZ2F0aW9uKGV2ZW50KSB7XG4gICAgbGV0IGVsZW0gPSB0aGlzOyAvLyBjYWxsZWQgZnJvbSBldmVudCBoYW5kbGVyIGNvbnRleHQgd2l0aCB0aGlzIGFzIGVsZW1cbiAgICBsZXQgdXAgPSBldmVudC5wYWdlWSA8IGVsZW0ubGFzdFk7XG4gICAgbGV0IGRvd24gPSAhdXA7XG4gICAgZWxlbS5sYXN0WSA9IGV2ZW50LnBhZ2VZO1xuXG4gICAgaWYoKHVwICYmIGVsZW0uYWxsb3dVcCkgfHwgKGRvd24gJiYgZWxlbS5hbGxvd0Rvd24pKSB7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogT3BlbnMgdGhlIG9mZi1jYW52YXMgbWVudS5cbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudCAtIEV2ZW50IG9iamVjdCBwYXNzZWQgZnJvbSBsaXN0ZW5lci5cbiAgICogQHBhcmFtIHtqUXVlcnl9IHRyaWdnZXIgLSBlbGVtZW50IHRoYXQgdHJpZ2dlcmVkIHRoZSBvZmYtY2FudmFzIHRvIG9wZW4uXG4gICAqIEBmaXJlcyBPZmZDYW52YXMjb3BlbmVkXG4gICAqL1xuICBvcGVuKGV2ZW50LCB0cmlnZ2VyKSB7XG4gICAgaWYgKHRoaXMuJGVsZW1lbnQuaGFzQ2xhc3MoJ2lzLW9wZW4nKSB8fCB0aGlzLmlzUmV2ZWFsZWQpIHsgcmV0dXJuOyB9XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIGlmICh0cmlnZ2VyKSB7XG4gICAgICB0aGlzLiRsYXN0VHJpZ2dlciA9IHRyaWdnZXI7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5mb3JjZVRvID09PSAndG9wJykge1xuICAgICAgd2luZG93LnNjcm9sbFRvKDAsIDApO1xuICAgIH0gZWxzZSBpZiAodGhpcy5vcHRpb25zLmZvcmNlVG8gPT09ICdib3R0b20nKSB7XG4gICAgICB3aW5kb3cuc2Nyb2xsVG8oMCxkb2N1bWVudC5ib2R5LnNjcm9sbEhlaWdodCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy50cmFuc2l0aW9uVGltZSAmJiB0aGlzLm9wdGlvbnMudHJhbnNpdGlvbiAhPT0gJ292ZXJsYXAnKSB7XG4gICAgICB0aGlzLiRlbGVtZW50LnNpYmxpbmdzKCdbZGF0YS1vZmYtY2FudmFzLWNvbnRlbnRdJykuY3NzKCd0cmFuc2l0aW9uLWR1cmF0aW9uJywgdGhpcy5vcHRpb25zLnRyYW5zaXRpb25UaW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy4kZWxlbWVudC5zaWJsaW5ncygnW2RhdGEtb2ZmLWNhbnZhcy1jb250ZW50XScpLmNzcygndHJhbnNpdGlvbi1kdXJhdGlvbicsICcnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGaXJlcyB3aGVuIHRoZSBvZmYtY2FudmFzIG1lbnUgb3BlbnMuXG4gICAgICogQGV2ZW50IE9mZkNhbnZhcyNvcGVuZWRcbiAgICAgKi9cbiAgICB0aGlzLiRlbGVtZW50LmFkZENsYXNzKCdpcy1vcGVuJykucmVtb3ZlQ2xhc3MoJ2lzLWNsb3NlZCcpO1xuXG4gICAgdGhpcy4kdHJpZ2dlcnMuYXR0cignYXJpYS1leHBhbmRlZCcsICd0cnVlJyk7XG4gICAgdGhpcy4kZWxlbWVudC5hdHRyKCdhcmlhLWhpZGRlbicsICdmYWxzZScpXG4gICAgICAgIC50cmlnZ2VyKCdvcGVuZWQuemYub2ZmY2FudmFzJyk7XG5cbiAgICB0aGlzLiRjb250ZW50LmFkZENsYXNzKCdpcy1vcGVuLScgKyB0aGlzLnBvc2l0aW9uKTtcblxuICAgIC8vIElmIGBjb250ZW50U2Nyb2xsYCBpcyBzZXQgdG8gZmFsc2UsIGFkZCBjbGFzcyBhbmQgZGlzYWJsZSBzY3JvbGxpbmcgb24gdG91Y2ggZGV2aWNlcy5cbiAgICBpZiAodGhpcy5vcHRpb25zLmNvbnRlbnRTY3JvbGwgPT09IGZhbHNlKSB7XG4gICAgICAkKCdib2R5JykuYWRkQ2xhc3MoJ2lzLW9mZi1jYW52YXMtb3BlbicpLm9uKCd0b3VjaG1vdmUnLCB0aGlzLl9zdG9wU2Nyb2xsaW5nKTtcbiAgICAgIHRoaXMuJGVsZW1lbnQub24oJ3RvdWNoc3RhcnQnLCB0aGlzLl9yZWNvcmRTY3JvbGxhYmxlKTtcbiAgICAgIHRoaXMuJGVsZW1lbnQub24oJ3RvdWNobW92ZScsIHRoaXMuX3N0b3BTY3JvbGxQcm9wYWdhdGlvbik7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5jb250ZW50T3ZlcmxheSA9PT0gdHJ1ZSkge1xuICAgICAgdGhpcy4kb3ZlcmxheS5hZGRDbGFzcygnaXMtdmlzaWJsZScpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMuY2xvc2VPbkNsaWNrID09PSB0cnVlICYmIHRoaXMub3B0aW9ucy5jb250ZW50T3ZlcmxheSA9PT0gdHJ1ZSkge1xuICAgICAgdGhpcy4kb3ZlcmxheS5hZGRDbGFzcygnaXMtY2xvc2FibGUnKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmF1dG9Gb2N1cyA9PT0gdHJ1ZSkge1xuICAgICAgdGhpcy4kZWxlbWVudC5vbmUodHJhbnNpdGlvbmVuZCh0aGlzLiRlbGVtZW50KSwgZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICghX3RoaXMuJGVsZW1lbnQuaGFzQ2xhc3MoJ2lzLW9wZW4nKSkge1xuICAgICAgICAgIHJldHVybjsgLy8gZXhpdCBpZiBwcmVtYXR1cmVseSBjbG9zZWRcbiAgICAgICAgfVxuICAgICAgICB2YXIgY2FudmFzRm9jdXMgPSBfdGhpcy4kZWxlbWVudC5maW5kKCdbZGF0YS1hdXRvZm9jdXNdJyk7XG4gICAgICAgIGlmIChjYW52YXNGb2N1cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhbnZhc0ZvY3VzLmVxKDApLmZvY3VzKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfdGhpcy4kZWxlbWVudC5maW5kKCdhLCBidXR0b24nKS5lcSgwKS5mb2N1cygpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLnRyYXBGb2N1cyA9PT0gdHJ1ZSkge1xuICAgICAgdGhpcy4kY29udGVudC5hdHRyKCd0YWJpbmRleCcsICctMScpO1xuICAgICAgS2V5Ym9hcmQudHJhcEZvY3VzKHRoaXMuJGVsZW1lbnQpO1xuICAgIH1cblxuICAgIHRoaXMuX2FkZENvbnRlbnRDbGFzc2VzKCk7XG4gIH1cblxuICAvKipcbiAgICogQ2xvc2VzIHRoZSBvZmYtY2FudmFzIG1lbnUuXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYiAtIG9wdGlvbmFsIGNiIHRvIGZpcmUgYWZ0ZXIgY2xvc3VyZS5cbiAgICogQGZpcmVzIE9mZkNhbnZhcyNjbG9zZWRcbiAgICovXG4gIGNsb3NlKGNiKSB7XG4gICAgaWYgKCF0aGlzLiRlbGVtZW50Lmhhc0NsYXNzKCdpcy1vcGVuJykgfHwgdGhpcy5pc1JldmVhbGVkKSB7IHJldHVybjsgfVxuXG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIHRoaXMuJGVsZW1lbnQucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKTtcblxuICAgIHRoaXMuJGVsZW1lbnQuYXR0cignYXJpYS1oaWRkZW4nLCAndHJ1ZScpXG4gICAgICAvKipcbiAgICAgICAqIEZpcmVzIHdoZW4gdGhlIG9mZi1jYW52YXMgbWVudSBvcGVucy5cbiAgICAgICAqIEBldmVudCBPZmZDYW52YXMjY2xvc2VkXG4gICAgICAgKi9cbiAgICAgICAgLnRyaWdnZXIoJ2Nsb3NlZC56Zi5vZmZjYW52YXMnKTtcblxuICAgIHRoaXMuJGNvbnRlbnQucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4tbGVmdCBpcy1vcGVuLXRvcCBpcy1vcGVuLXJpZ2h0IGlzLW9wZW4tYm90dG9tJyk7XG5cbiAgICAvLyBJZiBgY29udGVudFNjcm9sbGAgaXMgc2V0IHRvIGZhbHNlLCByZW1vdmUgY2xhc3MgYW5kIHJlLWVuYWJsZSBzY3JvbGxpbmcgb24gdG91Y2ggZGV2aWNlcy5cbiAgICBpZiAodGhpcy5vcHRpb25zLmNvbnRlbnRTY3JvbGwgPT09IGZhbHNlKSB7XG4gICAgICAkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ2lzLW9mZi1jYW52YXMtb3BlbicpLm9mZigndG91Y2htb3ZlJywgdGhpcy5fc3RvcFNjcm9sbGluZyk7XG4gICAgICB0aGlzLiRlbGVtZW50Lm9mZigndG91Y2hzdGFydCcsIHRoaXMuX3JlY29yZFNjcm9sbGFibGUpO1xuICAgICAgdGhpcy4kZWxlbWVudC5vZmYoJ3RvdWNobW92ZScsIHRoaXMuX3N0b3BTY3JvbGxQcm9wYWdhdGlvbik7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5jb250ZW50T3ZlcmxheSA9PT0gdHJ1ZSkge1xuICAgICAgdGhpcy4kb3ZlcmxheS5yZW1vdmVDbGFzcygnaXMtdmlzaWJsZScpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMuY2xvc2VPbkNsaWNrID09PSB0cnVlICYmIHRoaXMub3B0aW9ucy5jb250ZW50T3ZlcmxheSA9PT0gdHJ1ZSkge1xuICAgICAgdGhpcy4kb3ZlcmxheS5yZW1vdmVDbGFzcygnaXMtY2xvc2FibGUnKTtcbiAgICB9XG5cbiAgICB0aGlzLiR0cmlnZ2Vycy5hdHRyKCdhcmlhLWV4cGFuZGVkJywgJ2ZhbHNlJyk7XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLnRyYXBGb2N1cyA9PT0gdHJ1ZSkge1xuICAgICAgdGhpcy4kY29udGVudC5yZW1vdmVBdHRyKCd0YWJpbmRleCcpO1xuICAgICAgS2V5Ym9hcmQucmVsZWFzZUZvY3VzKHRoaXMuJGVsZW1lbnQpO1xuICAgIH1cblxuICAgIC8vIExpc3RlbiB0byB0cmFuc2l0aW9uRW5kIGFuZCBhZGQgY2xhc3Mgd2hlbiBkb25lLlxuICAgIHRoaXMuJGVsZW1lbnQub25lKHRyYW5zaXRpb25lbmQodGhpcy4kZWxlbWVudCksIGZ1bmN0aW9uKGUpIHtcbiAgICAgIF90aGlzLiRlbGVtZW50LmFkZENsYXNzKCdpcy1jbG9zZWQnKTtcbiAgICAgIF90aGlzLl9yZW1vdmVDb250ZW50Q2xhc3NlcygpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFRvZ2dsZXMgdGhlIG9mZi1jYW52YXMgbWVudSBvcGVuIG9yIGNsb3NlZC5cbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudCAtIEV2ZW50IG9iamVjdCBwYXNzZWQgZnJvbSBsaXN0ZW5lci5cbiAgICogQHBhcmFtIHtqUXVlcnl9IHRyaWdnZXIgLSBlbGVtZW50IHRoYXQgdHJpZ2dlcmVkIHRoZSBvZmYtY2FudmFzIHRvIG9wZW4uXG4gICAqL1xuICB0b2dnbGUoZXZlbnQsIHRyaWdnZXIpIHtcbiAgICBpZiAodGhpcy4kZWxlbWVudC5oYXNDbGFzcygnaXMtb3BlbicpKSB7XG4gICAgICB0aGlzLmNsb3NlKGV2ZW50LCB0cmlnZ2VyKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aGlzLm9wZW4oZXZlbnQsIHRyaWdnZXIpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIGtleWJvYXJkIGlucHV0IHdoZW4gZGV0ZWN0ZWQuIFdoZW4gdGhlIGVzY2FwZSBrZXkgaXMgcHJlc3NlZCwgdGhlIG9mZi1jYW52YXMgbWVudSBjbG9zZXMsIGFuZCBmb2N1cyBpcyByZXN0b3JlZCB0byB0aGUgZWxlbWVudCB0aGF0IG9wZW5lZCB0aGUgbWVudS5cbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfaGFuZGxlS2V5Ym9hcmQoZSkge1xuICAgIEtleWJvYXJkLmhhbmRsZUtleShlLCAnT2ZmQ2FudmFzJywge1xuICAgICAgY2xvc2U6ICgpID0+IHtcbiAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICB0aGlzLiRsYXN0VHJpZ2dlci5mb2N1cygpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0sXG4gICAgICBoYW5kbGVkOiAoKSA9PiB7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXN0cm95cyB0aGUgb2ZmY2FudmFzIHBsdWdpbi5cbiAgICogQGZ1bmN0aW9uXG4gICAqL1xuICBfZGVzdHJveSgpIHtcbiAgICB0aGlzLmNsb3NlKCk7XG4gICAgdGhpcy4kZWxlbWVudC5vZmYoJy56Zi50cmlnZ2VyIC56Zi5vZmZjYW52YXMnKTtcbiAgICB0aGlzLiRvdmVybGF5Lm9mZignLnpmLm9mZmNhbnZhcycpO1xuICB9XG59XG5cbk9mZkNhbnZhcy5kZWZhdWx0cyA9IHtcbiAgLyoqXG4gICAqIEFsbG93IHRoZSB1c2VyIHRvIGNsaWNrIG91dHNpZGUgb2YgdGhlIG1lbnUgdG8gY2xvc2UgaXQuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBkZWZhdWx0IHRydWVcbiAgICovXG4gIGNsb3NlT25DbGljazogdHJ1ZSxcblxuICAvKipcbiAgICogQWRkcyBhbiBvdmVybGF5IG9uIHRvcCBvZiBgW2RhdGEtb2ZmLWNhbnZhcy1jb250ZW50XWAuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBkZWZhdWx0IHRydWVcbiAgICovXG4gIGNvbnRlbnRPdmVybGF5OiB0cnVlLFxuXG4gIC8qKlxuICAgKiBUYXJnZXQgYW4gb2ZmLWNhbnZhcyBjb250ZW50IGNvbnRhaW5lciBieSBJRCB0aGF0IG1heSBiZSBwbGFjZWQgYW55d2hlcmUuIElmIG51bGwgdGhlIGNsb3Nlc3QgY29udGVudCBjb250YWluZXIgd2lsbCBiZSB0YWtlbi5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7P3N0cmluZ31cbiAgICogQGRlZmF1bHQgbnVsbFxuICAgKi9cbiAgY29udGVudElkOiBudWxsLFxuXG4gIC8qKlxuICAgKiBEZWZpbmUgdGhlIG9mZi1jYW52YXMgZWxlbWVudCBpcyBuZXN0ZWQgaW4gYW4gb2ZmLWNhbnZhcyBjb250ZW50LiBUaGlzIGlzIHJlcXVpcmVkIHdoZW4gdXNpbmcgdGhlIGNvbnRlbnRJZCBvcHRpb24gZm9yIGEgbmVzdGVkIGVsZW1lbnQuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBkZWZhdWx0IG51bGxcbiAgICovXG4gIG5lc3RlZDogbnVsbCxcblxuICAvKipcbiAgICogRW5hYmxlL2Rpc2FibGUgc2Nyb2xsaW5nIG9mIHRoZSBtYWluIGNvbnRlbnQgd2hlbiBhbiBvZmYgY2FudmFzIHBhbmVsIGlzIG9wZW4uXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBkZWZhdWx0IHRydWVcbiAgICovXG4gIGNvbnRlbnRTY3JvbGw6IHRydWUsXG5cbiAgLyoqXG4gICAqIEFtb3VudCBvZiB0aW1lIGluIG1zIHRoZSBvcGVuIGFuZCBjbG9zZSB0cmFuc2l0aW9uIHJlcXVpcmVzLiBJZiBub25lIHNlbGVjdGVkLCBwdWxscyBmcm9tIGJvZHkgc3R5bGUuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge251bWJlcn1cbiAgICogQGRlZmF1bHQgbnVsbFxuICAgKi9cbiAgdHJhbnNpdGlvblRpbWU6IG51bGwsXG5cbiAgLyoqXG4gICAqIFR5cGUgb2YgdHJhbnNpdGlvbiBmb3IgdGhlIG9mZmNhbnZhcyBtZW51LiBPcHRpb25zIGFyZSAncHVzaCcsICdkZXRhY2hlZCcgb3IgJ3NsaWRlJy5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKiBAZGVmYXVsdCBwdXNoXG4gICAqL1xuICB0cmFuc2l0aW9uOiAncHVzaCcsXG5cbiAgLyoqXG4gICAqIEZvcmNlIHRoZSBwYWdlIHRvIHNjcm9sbCB0byB0b3Agb3IgYm90dG9tIG9uIG9wZW4uXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUgez9zdHJpbmd9XG4gICAqIEBkZWZhdWx0IG51bGxcbiAgICovXG4gIGZvcmNlVG86IG51bGwsXG5cbiAgLyoqXG4gICAqIEFsbG93IHRoZSBvZmZjYW52YXMgdG8gcmVtYWluIG9wZW4gZm9yIGNlcnRhaW4gYnJlYWtwb2ludHMuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBkZWZhdWx0IGZhbHNlXG4gICAqL1xuICBpc1JldmVhbGVkOiBmYWxzZSxcblxuICAvKipcbiAgICogQnJlYWtwb2ludCBhdCB3aGljaCB0byByZXZlYWwuIEpTIHdpbGwgdXNlIGEgUmVnRXhwIHRvIHRhcmdldCBzdGFuZGFyZCBjbGFzc2VzLCBpZiBjaGFuZ2luZyBjbGFzc25hbWVzLCBwYXNzIHlvdXIgY2xhc3Mgd2l0aCB0aGUgYHJldmVhbENsYXNzYCBvcHRpb24uXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUgez9zdHJpbmd9XG4gICAqIEBkZWZhdWx0IG51bGxcbiAgICovXG4gIHJldmVhbE9uOiBudWxsLFxuXG4gIC8qKlxuICAgKiBGb3JjZSBmb2N1cyB0byB0aGUgb2ZmY2FudmFzIG9uIG9wZW4uIElmIHRydWUsIHdpbGwgZm9jdXMgdGhlIG9wZW5pbmcgdHJpZ2dlciBvbiBjbG9zZS5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQGRlZmF1bHQgdHJ1ZVxuICAgKi9cbiAgYXV0b0ZvY3VzOiB0cnVlLFxuXG4gIC8qKlxuICAgKiBDbGFzcyB1c2VkIHRvIGZvcmNlIGFuIG9mZmNhbnZhcyB0byByZW1haW4gb3Blbi4gRm91bmRhdGlvbiBkZWZhdWx0cyBmb3IgdGhpcyBhcmUgYHJldmVhbC1mb3ItbGFyZ2VgICYgYHJldmVhbC1mb3ItbWVkaXVtYC5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKiBAZGVmYXVsdCByZXZlYWwtZm9yLVxuICAgKiBAdG9kbyBpbXByb3ZlIHRoZSByZWdleCB0ZXN0aW5nIGZvciB0aGlzLlxuICAgKi9cbiAgcmV2ZWFsQ2xhc3M6ICdyZXZlYWwtZm9yLScsXG5cbiAgLyoqXG4gICAqIFRyaWdnZXJzIG9wdGlvbmFsIGZvY3VzIHRyYXBwaW5nIHdoZW4gb3BlbmluZyBhbiBvZmZjYW52YXMuIFNldHMgdGFiaW5kZXggb2YgW2RhdGEtb2ZmLWNhbnZhcy1jb250ZW50XSB0byAtMSBmb3IgYWNjZXNzaWJpbGl0eSBwdXJwb3Nlcy5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQGRlZmF1bHQgZmFsc2VcbiAgICovXG4gIHRyYXBGb2N1czogZmFsc2Vcbn1cblxuZXhwb3J0IHtPZmZDYW52YXN9O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi5vZmZjYW52YXMuanMiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5pbXBvcnQgeyBLZXlib2FyZCB9IGZyb20gJy4vZm91bmRhdGlvbi51dGlsLmtleWJvYXJkJztcbmltcG9ydCB7IG9uSW1hZ2VzTG9hZGVkIH0gZnJvbSAnLi9mb3VuZGF0aW9uLnV0aWwuaW1hZ2VMb2FkZXInO1xuaW1wb3J0IHsgUGx1Z2luIH0gZnJvbSAnLi9mb3VuZGF0aW9uLnBsdWdpbic7XG4vKipcbiAqIFRhYnMgbW9kdWxlLlxuICogQG1vZHVsZSBmb3VuZGF0aW9uLnRhYnNcbiAqIEByZXF1aXJlcyBmb3VuZGF0aW9uLnV0aWwua2V5Ym9hcmRcbiAqIEByZXF1aXJlcyBmb3VuZGF0aW9uLnV0aWwuaW1hZ2VMb2FkZXIgaWYgdGFicyBjb250YWluIGltYWdlc1xuICovXG5cbmNsYXNzIFRhYnMgZXh0ZW5kcyBQbHVnaW4ge1xuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBpbnN0YW5jZSBvZiB0YWJzLlxuICAgKiBAY2xhc3NcbiAgICogQG5hbWUgVGFic1xuICAgKiBAZmlyZXMgVGFicyNpbml0XG4gICAqIEBwYXJhbSB7alF1ZXJ5fSBlbGVtZW50IC0galF1ZXJ5IG9iamVjdCB0byBtYWtlIGludG8gdGFicy5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBPdmVycmlkZXMgdG8gdGhlIGRlZmF1bHQgcGx1Z2luIHNldHRpbmdzLlxuICAgKi9cbiAgX3NldHVwKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICB0aGlzLiRlbGVtZW50ID0gZWxlbWVudDtcbiAgICB0aGlzLm9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgVGFicy5kZWZhdWx0cywgdGhpcy4kZWxlbWVudC5kYXRhKCksIG9wdGlvbnMpO1xuICAgIHRoaXMuY2xhc3NOYW1lID0gJ1RhYnMnOyAvLyBpZTkgYmFjayBjb21wYXRcblxuICAgIHRoaXMuX2luaXQoKTtcbiAgICBLZXlib2FyZC5yZWdpc3RlcignVGFicycsIHtcbiAgICAgICdFTlRFUic6ICdvcGVuJyxcbiAgICAgICdTUEFDRSc6ICdvcGVuJyxcbiAgICAgICdBUlJPV19SSUdIVCc6ICduZXh0JyxcbiAgICAgICdBUlJPV19VUCc6ICdwcmV2aW91cycsXG4gICAgICAnQVJST1dfRE9XTic6ICduZXh0JyxcbiAgICAgICdBUlJPV19MRUZUJzogJ3ByZXZpb3VzJ1xuICAgICAgLy8gJ1RBQic6ICduZXh0JyxcbiAgICAgIC8vICdTSElGVF9UQUInOiAncHJldmlvdXMnXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZXMgdGhlIHRhYnMgYnkgc2hvd2luZyBhbmQgZm9jdXNpbmcgKGlmIGF1dG9Gb2N1cz10cnVlKSB0aGUgcHJlc2V0IGFjdGl2ZSB0YWIuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfaW5pdCgpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgdGhpcy4kZWxlbWVudC5hdHRyKHsncm9sZSc6ICd0YWJsaXN0J30pO1xuICAgIHRoaXMuJHRhYlRpdGxlcyA9IHRoaXMuJGVsZW1lbnQuZmluZChgLiR7dGhpcy5vcHRpb25zLmxpbmtDbGFzc31gKTtcbiAgICB0aGlzLiR0YWJDb250ZW50ID0gJChgW2RhdGEtdGFicy1jb250ZW50PVwiJHt0aGlzLiRlbGVtZW50WzBdLmlkfVwiXWApO1xuXG4gICAgdGhpcy4kdGFiVGl0bGVzLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgIHZhciAkZWxlbSA9ICQodGhpcyksXG4gICAgICAgICAgJGxpbmsgPSAkZWxlbS5maW5kKCdhJyksXG4gICAgICAgICAgaXNBY3RpdmUgPSAkZWxlbS5oYXNDbGFzcyhgJHtfdGhpcy5vcHRpb25zLmxpbmtBY3RpdmVDbGFzc31gKSxcbiAgICAgICAgICBoYXNoID0gJGxpbmsuYXR0cignZGF0YS10YWJzLXRhcmdldCcpIHx8ICRsaW5rWzBdLmhhc2guc2xpY2UoMSksXG4gICAgICAgICAgbGlua0lkID0gJGxpbmtbMF0uaWQgPyAkbGlua1swXS5pZCA6IGAke2hhc2h9LWxhYmVsYCxcbiAgICAgICAgICAkdGFiQ29udGVudCA9ICQoYCMke2hhc2h9YCk7XG5cbiAgICAgICRlbGVtLmF0dHIoeydyb2xlJzogJ3ByZXNlbnRhdGlvbid9KTtcblxuICAgICAgJGxpbmsuYXR0cih7XG4gICAgICAgICdyb2xlJzogJ3RhYicsXG4gICAgICAgICdhcmlhLWNvbnRyb2xzJzogaGFzaCxcbiAgICAgICAgJ2FyaWEtc2VsZWN0ZWQnOiBpc0FjdGl2ZSxcbiAgICAgICAgJ2lkJzogbGlua0lkLFxuICAgICAgICAndGFiaW5kZXgnOiBpc0FjdGl2ZSA/ICcwJyA6ICctMSdcbiAgICAgIH0pO1xuXG4gICAgICAkdGFiQ29udGVudC5hdHRyKHtcbiAgICAgICAgJ3JvbGUnOiAndGFicGFuZWwnLFxuICAgICAgICAnYXJpYS1sYWJlbGxlZGJ5JzogbGlua0lkXG4gICAgICB9KTtcblxuICAgICAgaWYoIWlzQWN0aXZlKSB7XG4gICAgICAgICR0YWJDb250ZW50LmF0dHIoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcbiAgICAgIH1cblxuICAgICAgaWYoaXNBY3RpdmUgJiYgX3RoaXMub3B0aW9ucy5hdXRvRm9jdXMpe1xuICAgICAgICAkKHdpbmRvdykubG9hZChmdW5jdGlvbigpIHtcbiAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7IHNjcm9sbFRvcDogJGVsZW0ub2Zmc2V0KCkudG9wIH0sIF90aGlzLm9wdGlvbnMuZGVlcExpbmtTbXVkZ2VEZWxheSwgKCkgPT4ge1xuICAgICAgICAgICAgJGxpbmsuZm9jdXMoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYodGhpcy5vcHRpb25zLm1hdGNoSGVpZ2h0KSB7XG4gICAgICB2YXIgJGltYWdlcyA9IHRoaXMuJHRhYkNvbnRlbnQuZmluZCgnaW1nJyk7XG5cbiAgICAgIGlmICgkaW1hZ2VzLmxlbmd0aCkge1xuICAgICAgICBvbkltYWdlc0xvYWRlZCgkaW1hZ2VzLCB0aGlzLl9zZXRIZWlnaHQuYmluZCh0aGlzKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9zZXRIZWlnaHQoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAgLy9jdXJyZW50IGNvbnRleHQtYm91bmQgZnVuY3Rpb24gdG8gb3BlbiB0YWJzIG9uIHBhZ2UgbG9hZCBvciBoaXN0b3J5IHBvcHN0YXRlXG4gICAgdGhpcy5fY2hlY2tEZWVwTGluayA9ICgpID0+IHtcbiAgICAgIHZhciBhbmNob3IgPSB3aW5kb3cubG9jYXRpb24uaGFzaDtcbiAgICAgIC8vbmVlZCBhIGhhc2ggYW5kIGEgcmVsZXZhbnQgYW5jaG9yIGluIHRoaXMgdGFic2V0XG4gICAgICBpZihhbmNob3IubGVuZ3RoKSB7XG4gICAgICAgIHZhciAkbGluayA9IHRoaXMuJGVsZW1lbnQuZmluZCgnW2hyZWYkPVwiJythbmNob3IrJ1wiXScpO1xuICAgICAgICBpZiAoJGxpbmsubGVuZ3RoKSB7XG4gICAgICAgICAgdGhpcy5zZWxlY3RUYWIoJChhbmNob3IpLCB0cnVlKTtcblxuICAgICAgICAgIC8vcm9sbCB1cCBhIGxpdHRsZSB0byBzaG93IHRoZSB0aXRsZXNcbiAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLmRlZXBMaW5rU211ZGdlKSB7XG4gICAgICAgICAgICB2YXIgb2Zmc2V0ID0gdGhpcy4kZWxlbWVudC5vZmZzZXQoKTtcbiAgICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHsgc2Nyb2xsVG9wOiBvZmZzZXQudG9wIH0sIHRoaXMub3B0aW9ucy5kZWVwTGlua1NtdWRnZURlbGF5KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvKipcbiAgICAgICAgICAgICogRmlyZXMgd2hlbiB0aGUgenBsdWdpbiBoYXMgZGVlcGxpbmtlZCBhdCBwYWdlbG9hZFxuICAgICAgICAgICAgKiBAZXZlbnQgVGFicyNkZWVwbGlua1xuICAgICAgICAgICAgKi9cbiAgICAgICAgICAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKCdkZWVwbGluay56Zi50YWJzJywgWyRsaW5rLCAkKGFuY2hvcildKTtcbiAgICAgICAgIH1cbiAgICAgICB9XG4gICAgIH1cblxuICAgIC8vdXNlIGJyb3dzZXIgdG8gb3BlbiBhIHRhYiwgaWYgaXQgZXhpc3RzIGluIHRoaXMgdGFic2V0XG4gICAgaWYgKHRoaXMub3B0aW9ucy5kZWVwTGluaykge1xuICAgICAgdGhpcy5fY2hlY2tEZWVwTGluaygpO1xuICAgIH1cblxuICAgIHRoaXMuX2V2ZW50cygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgZXZlbnQgaGFuZGxlcnMgZm9yIGl0ZW1zIHdpdGhpbiB0aGUgdGFicy5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9ldmVudHMoKSB7XG4gICAgdGhpcy5fYWRkS2V5SGFuZGxlcigpO1xuICAgIHRoaXMuX2FkZENsaWNrSGFuZGxlcigpO1xuICAgIHRoaXMuX3NldEhlaWdodE1xSGFuZGxlciA9IG51bGw7XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLm1hdGNoSGVpZ2h0KSB7XG4gICAgICB0aGlzLl9zZXRIZWlnaHRNcUhhbmRsZXIgPSB0aGlzLl9zZXRIZWlnaHQuYmluZCh0aGlzKTtcblxuICAgICAgJCh3aW5kb3cpLm9uKCdjaGFuZ2VkLnpmLm1lZGlhcXVlcnknLCB0aGlzLl9zZXRIZWlnaHRNcUhhbmRsZXIpO1xuICAgIH1cblxuICAgIGlmKHRoaXMub3B0aW9ucy5kZWVwTGluaykge1xuICAgICAgJCh3aW5kb3cpLm9uKCdwb3BzdGF0ZScsIHRoaXMuX2NoZWNrRGVlcExpbmspO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGNsaWNrIGhhbmRsZXJzIGZvciBpdGVtcyB3aXRoaW4gdGhlIHRhYnMuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfYWRkQ2xpY2tIYW5kbGVyKCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICB0aGlzLiRlbGVtZW50XG4gICAgICAub2ZmKCdjbGljay56Zi50YWJzJylcbiAgICAgIC5vbignY2xpY2suemYudGFicycsIGAuJHt0aGlzLm9wdGlvbnMubGlua0NsYXNzfWAsIGZ1bmN0aW9uKGUpe1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIF90aGlzLl9oYW5kbGVUYWJDaGFuZ2UoJCh0aGlzKSk7XG4gICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGtleWJvYXJkIGV2ZW50IGhhbmRsZXJzIGZvciBpdGVtcyB3aXRoaW4gdGhlIHRhYnMuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfYWRkS2V5SGFuZGxlcigpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgdGhpcy4kdGFiVGl0bGVzLm9mZigna2V5ZG93bi56Zi50YWJzJykub24oJ2tleWRvd24uemYudGFicycsIGZ1bmN0aW9uKGUpe1xuICAgICAgaWYgKGUud2hpY2ggPT09IDkpIHJldHVybjtcblxuXG4gICAgICB2YXIgJGVsZW1lbnQgPSAkKHRoaXMpLFxuICAgICAgICAkZWxlbWVudHMgPSAkZWxlbWVudC5wYXJlbnQoJ3VsJykuY2hpbGRyZW4oJ2xpJyksXG4gICAgICAgICRwcmV2RWxlbWVudCxcbiAgICAgICAgJG5leHRFbGVtZW50O1xuXG4gICAgICAkZWxlbWVudHMuZWFjaChmdW5jdGlvbihpKSB7XG4gICAgICAgIGlmICgkKHRoaXMpLmlzKCRlbGVtZW50KSkge1xuICAgICAgICAgIGlmIChfdGhpcy5vcHRpb25zLndyYXBPbktleXMpIHtcbiAgICAgICAgICAgICRwcmV2RWxlbWVudCA9IGkgPT09IDAgPyAkZWxlbWVudHMubGFzdCgpIDogJGVsZW1lbnRzLmVxKGktMSk7XG4gICAgICAgICAgICAkbmV4dEVsZW1lbnQgPSBpID09PSAkZWxlbWVudHMubGVuZ3RoIC0xID8gJGVsZW1lbnRzLmZpcnN0KCkgOiAkZWxlbWVudHMuZXEoaSsxKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJHByZXZFbGVtZW50ID0gJGVsZW1lbnRzLmVxKE1hdGgubWF4KDAsIGktMSkpO1xuICAgICAgICAgICAgJG5leHRFbGVtZW50ID0gJGVsZW1lbnRzLmVxKE1hdGgubWluKGkrMSwgJGVsZW1lbnRzLmxlbmd0aC0xKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIC8vIGhhbmRsZSBrZXlib2FyZCBldmVudCB3aXRoIGtleWJvYXJkIHV0aWxcbiAgICAgIEtleWJvYXJkLmhhbmRsZUtleShlLCAnVGFicycsIHtcbiAgICAgICAgb3BlbjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgJGVsZW1lbnQuZmluZCgnW3JvbGU9XCJ0YWJcIl0nKS5mb2N1cygpO1xuICAgICAgICAgIF90aGlzLl9oYW5kbGVUYWJDaGFuZ2UoJGVsZW1lbnQpO1xuICAgICAgICB9LFxuICAgICAgICBwcmV2aW91czogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgJHByZXZFbGVtZW50LmZpbmQoJ1tyb2xlPVwidGFiXCJdJykuZm9jdXMoKTtcbiAgICAgICAgICBfdGhpcy5faGFuZGxlVGFiQ2hhbmdlKCRwcmV2RWxlbWVudCk7XG4gICAgICAgIH0sXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICRuZXh0RWxlbWVudC5maW5kKCdbcm9sZT1cInRhYlwiXScpLmZvY3VzKCk7XG4gICAgICAgICAgX3RoaXMuX2hhbmRsZVRhYkNoYW5nZSgkbmV4dEVsZW1lbnQpO1xuICAgICAgICB9LFxuICAgICAgICBoYW5kbGVkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogT3BlbnMgdGhlIHRhYiBgJHRhcmdldENvbnRlbnRgIGRlZmluZWQgYnkgYCR0YXJnZXRgLiBDb2xsYXBzZXMgYWN0aXZlIHRhYi5cbiAgICogQHBhcmFtIHtqUXVlcnl9ICR0YXJnZXQgLSBUYWIgdG8gb3Blbi5cbiAgICogQHBhcmFtIHtib29sZWFufSBoaXN0b3J5SGFuZGxlZCAtIGJyb3dzZXIgaGFzIGFscmVhZHkgaGFuZGxlZCBhIGhpc3RvcnkgdXBkYXRlXG4gICAqIEBmaXJlcyBUYWJzI2NoYW5nZVxuICAgKiBAZnVuY3Rpb25cbiAgICovXG4gIF9oYW5kbGVUYWJDaGFuZ2UoJHRhcmdldCwgaGlzdG9yeUhhbmRsZWQpIHtcblxuICAgIC8qKlxuICAgICAqIENoZWNrIGZvciBhY3RpdmUgY2xhc3Mgb24gdGFyZ2V0LiBDb2xsYXBzZSBpZiBleGlzdHMuXG4gICAgICovXG4gICAgaWYgKCR0YXJnZXQuaGFzQ2xhc3MoYCR7dGhpcy5vcHRpb25zLmxpbmtBY3RpdmVDbGFzc31gKSkge1xuICAgICAgICBpZih0aGlzLm9wdGlvbnMuYWN0aXZlQ29sbGFwc2UpIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbGxhcHNlVGFiKCR0YXJnZXQpO1xuXG4gICAgICAgICAgIC8qKlxuICAgICAgICAgICAgKiBGaXJlcyB3aGVuIHRoZSB6cGx1Z2luIGhhcyBzdWNjZXNzZnVsbHkgY29sbGFwc2VkIHRhYnMuXG4gICAgICAgICAgICAqIEBldmVudCBUYWJzI2NvbGxhcHNlXG4gICAgICAgICAgICAqL1xuICAgICAgICAgICAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKCdjb2xsYXBzZS56Zi50YWJzJywgWyR0YXJnZXRdKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyICRvbGRUYWIgPSB0aGlzLiRlbGVtZW50LlxuICAgICAgICAgIGZpbmQoYC4ke3RoaXMub3B0aW9ucy5saW5rQ2xhc3N9LiR7dGhpcy5vcHRpb25zLmxpbmtBY3RpdmVDbGFzc31gKSxcbiAgICAgICAgICAkdGFiTGluayA9ICR0YXJnZXQuZmluZCgnW3JvbGU9XCJ0YWJcIl0nKSxcbiAgICAgICAgICBoYXNoID0gJHRhYkxpbmsuYXR0cignZGF0YS10YWJzLXRhcmdldCcpIHx8ICR0YWJMaW5rWzBdLmhhc2guc2xpY2UoMSksXG4gICAgICAgICAgJHRhcmdldENvbnRlbnQgPSB0aGlzLiR0YWJDb250ZW50LmZpbmQoYCMke2hhc2h9YCk7XG5cbiAgICAvL2Nsb3NlIG9sZCB0YWJcbiAgICB0aGlzLl9jb2xsYXBzZVRhYigkb2xkVGFiKTtcblxuICAgIC8vb3BlbiBuZXcgdGFiXG4gICAgdGhpcy5fb3BlblRhYigkdGFyZ2V0KTtcblxuICAgIC8vZWl0aGVyIHJlcGxhY2Ugb3IgdXBkYXRlIGJyb3dzZXIgaGlzdG9yeVxuICAgIGlmICh0aGlzLm9wdGlvbnMuZGVlcExpbmsgJiYgIWhpc3RvcnlIYW5kbGVkKSB7XG4gICAgICB2YXIgYW5jaG9yID0gJHRhcmdldC5maW5kKCdhJykuYXR0cignaHJlZicpO1xuXG4gICAgICBpZiAodGhpcy5vcHRpb25zLnVwZGF0ZUhpc3RvcnkpIHtcbiAgICAgICAgaGlzdG9yeS5wdXNoU3RhdGUoe30sICcnLCBhbmNob3IpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaGlzdG9yeS5yZXBsYWNlU3RhdGUoe30sICcnLCBhbmNob3IpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZpcmVzIHdoZW4gdGhlIHBsdWdpbiBoYXMgc3VjY2Vzc2Z1bGx5IGNoYW5nZWQgdGFicy5cbiAgICAgKiBAZXZlbnQgVGFicyNjaGFuZ2VcbiAgICAgKi9cbiAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoJ2NoYW5nZS56Zi50YWJzJywgWyR0YXJnZXQsICR0YXJnZXRDb250ZW50XSk7XG5cbiAgICAvL2ZpcmUgdG8gY2hpbGRyZW4gYSBtdXRhdGlvbiBldmVudFxuICAgICR0YXJnZXRDb250ZW50LmZpbmQoXCJbZGF0YS1tdXRhdGVdXCIpLnRyaWdnZXIoXCJtdXRhdGVtZS56Zi50cmlnZ2VyXCIpO1xuICB9XG5cbiAgLyoqXG4gICAqIE9wZW5zIHRoZSB0YWIgYCR0YXJnZXRDb250ZW50YCBkZWZpbmVkIGJ5IGAkdGFyZ2V0YC5cbiAgICogQHBhcmFtIHtqUXVlcnl9ICR0YXJnZXQgLSBUYWIgdG8gT3Blbi5cbiAgICogQGZ1bmN0aW9uXG4gICAqL1xuICBfb3BlblRhYigkdGFyZ2V0KSB7XG4gICAgICB2YXIgJHRhYkxpbmsgPSAkdGFyZ2V0LmZpbmQoJ1tyb2xlPVwidGFiXCJdJyksXG4gICAgICAgICAgaGFzaCA9ICR0YWJMaW5rLmF0dHIoJ2RhdGEtdGFicy10YXJnZXQnKSB8fCAkdGFiTGlua1swXS5oYXNoLnNsaWNlKDEpLFxuICAgICAgICAgICR0YXJnZXRDb250ZW50ID0gdGhpcy4kdGFiQ29udGVudC5maW5kKGAjJHtoYXNofWApO1xuXG4gICAgICAkdGFyZ2V0LmFkZENsYXNzKGAke3RoaXMub3B0aW9ucy5saW5rQWN0aXZlQ2xhc3N9YCk7XG5cbiAgICAgICR0YWJMaW5rLmF0dHIoe1xuICAgICAgICAnYXJpYS1zZWxlY3RlZCc6ICd0cnVlJyxcbiAgICAgICAgJ3RhYmluZGV4JzogJzAnXG4gICAgICB9KTtcblxuICAgICAgJHRhcmdldENvbnRlbnRcbiAgICAgICAgLmFkZENsYXNzKGAke3RoaXMub3B0aW9ucy5wYW5lbEFjdGl2ZUNsYXNzfWApLnJlbW92ZUF0dHIoJ2FyaWEtaGlkZGVuJyk7XG4gIH1cblxuICAvKipcbiAgICogQ29sbGFwc2VzIGAkdGFyZ2V0Q29udGVudGAgZGVmaW5lZCBieSBgJHRhcmdldGAuXG4gICAqIEBwYXJhbSB7alF1ZXJ5fSAkdGFyZ2V0IC0gVGFiIHRvIE9wZW4uXG4gICAqIEBmdW5jdGlvblxuICAgKi9cbiAgX2NvbGxhcHNlVGFiKCR0YXJnZXQpIHtcbiAgICB2YXIgJHRhcmdldF9hbmNob3IgPSAkdGFyZ2V0XG4gICAgICAucmVtb3ZlQ2xhc3MoYCR7dGhpcy5vcHRpb25zLmxpbmtBY3RpdmVDbGFzc31gKVxuICAgICAgLmZpbmQoJ1tyb2xlPVwidGFiXCJdJylcbiAgICAgIC5hdHRyKHtcbiAgICAgICAgJ2FyaWEtc2VsZWN0ZWQnOiAnZmFsc2UnLFxuICAgICAgICAndGFiaW5kZXgnOiAtMVxuICAgICAgfSk7XG5cbiAgICAkKGAjJHskdGFyZ2V0X2FuY2hvci5hdHRyKCdhcmlhLWNvbnRyb2xzJyl9YClcbiAgICAgIC5yZW1vdmVDbGFzcyhgJHt0aGlzLm9wdGlvbnMucGFuZWxBY3RpdmVDbGFzc31gKVxuICAgICAgLmF0dHIoeyAnYXJpYS1oaWRkZW4nOiAndHJ1ZScgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBQdWJsaWMgbWV0aG9kIGZvciBzZWxlY3RpbmcgYSBjb250ZW50IHBhbmUgdG8gZGlzcGxheS5cbiAgICogQHBhcmFtIHtqUXVlcnkgfCBTdHJpbmd9IGVsZW0gLSBqUXVlcnkgb2JqZWN0IG9yIHN0cmluZyBvZiB0aGUgaWQgb2YgdGhlIHBhbmUgdG8gZGlzcGxheS5cbiAgICogQHBhcmFtIHtib29sZWFufSBoaXN0b3J5SGFuZGxlZCAtIGJyb3dzZXIgaGFzIGFscmVhZHkgaGFuZGxlZCBhIGhpc3RvcnkgdXBkYXRlXG4gICAqIEBmdW5jdGlvblxuICAgKi9cbiAgc2VsZWN0VGFiKGVsZW0sIGhpc3RvcnlIYW5kbGVkKSB7XG4gICAgdmFyIGlkU3RyO1xuXG4gICAgaWYgKHR5cGVvZiBlbGVtID09PSAnb2JqZWN0Jykge1xuICAgICAgaWRTdHIgPSBlbGVtWzBdLmlkO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZFN0ciA9IGVsZW07XG4gICAgfVxuXG4gICAgaWYgKGlkU3RyLmluZGV4T2YoJyMnKSA8IDApIHtcbiAgICAgIGlkU3RyID0gYCMke2lkU3RyfWA7XG4gICAgfVxuXG4gICAgdmFyICR0YXJnZXQgPSB0aGlzLiR0YWJUaXRsZXMuZmluZChgW2hyZWYkPVwiJHtpZFN0cn1cIl1gKS5wYXJlbnQoYC4ke3RoaXMub3B0aW9ucy5saW5rQ2xhc3N9YCk7XG5cbiAgICB0aGlzLl9oYW5kbGVUYWJDaGFuZ2UoJHRhcmdldCwgaGlzdG9yeUhhbmRsZWQpO1xuICB9O1xuICAvKipcbiAgICogU2V0cyB0aGUgaGVpZ2h0IG9mIGVhY2ggcGFuZWwgdG8gdGhlIGhlaWdodCBvZiB0aGUgdGFsbGVzdCBwYW5lbC5cbiAgICogSWYgZW5hYmxlZCBpbiBvcHRpb25zLCBnZXRzIGNhbGxlZCBvbiBtZWRpYSBxdWVyeSBjaGFuZ2UuXG4gICAqIElmIGxvYWRpbmcgY29udGVudCB2aWEgZXh0ZXJuYWwgc291cmNlLCBjYW4gYmUgY2FsbGVkIGRpcmVjdGx5IG9yIHdpdGggX3JlZmxvdy5cbiAgICogSWYgZW5hYmxlZCB3aXRoIGBkYXRhLW1hdGNoLWhlaWdodD1cInRydWVcImAsIHRhYnMgc2V0cyB0byBlcXVhbCBoZWlnaHRcbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfc2V0SGVpZ2h0KCkge1xuICAgIHZhciBtYXggPSAwLFxuICAgICAgICBfdGhpcyA9IHRoaXM7IC8vIExvY2sgZG93biB0aGUgYHRoaXNgIHZhbHVlIGZvciB0aGUgcm9vdCB0YWJzIG9iamVjdFxuXG4gICAgdGhpcy4kdGFiQ29udGVudFxuICAgICAgLmZpbmQoYC4ke3RoaXMub3B0aW9ucy5wYW5lbENsYXNzfWApXG4gICAgICAuY3NzKCdoZWlnaHQnLCAnJylcbiAgICAgIC5lYWNoKGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBwYW5lbCA9ICQodGhpcyksXG4gICAgICAgICAgICBpc0FjdGl2ZSA9IHBhbmVsLmhhc0NsYXNzKGAke190aGlzLm9wdGlvbnMucGFuZWxBY3RpdmVDbGFzc31gKTsgLy8gZ2V0IHRoZSBvcHRpb25zIGZyb20gdGhlIHBhcmVudCBpbnN0ZWFkIG9mIHRyeWluZyB0byBnZXQgdGhlbSBmcm9tIHRoZSBjaGlsZFxuXG4gICAgICAgIGlmICghaXNBY3RpdmUpIHtcbiAgICAgICAgICBwYW5lbC5jc3Moeyd2aXNpYmlsaXR5JzogJ2hpZGRlbicsICdkaXNwbGF5JzogJ2Jsb2NrJ30pO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHRlbXAgPSB0aGlzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcblxuICAgICAgICBpZiAoIWlzQWN0aXZlKSB7XG4gICAgICAgICAgcGFuZWwuY3NzKHtcbiAgICAgICAgICAgICd2aXNpYmlsaXR5JzogJycsXG4gICAgICAgICAgICAnZGlzcGxheSc6ICcnXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBtYXggPSB0ZW1wID4gbWF4ID8gdGVtcCA6IG1heDtcbiAgICAgIH0pXG4gICAgICAuY3NzKCdoZWlnaHQnLCBgJHttYXh9cHhgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXN0cm95cyBhbiBpbnN0YW5jZSBvZiBhbiB0YWJzLlxuICAgKiBAZmlyZXMgVGFicyNkZXN0cm95ZWRcbiAgICovXG4gIF9kZXN0cm95KCkge1xuICAgIHRoaXMuJGVsZW1lbnRcbiAgICAgIC5maW5kKGAuJHt0aGlzLm9wdGlvbnMubGlua0NsYXNzfWApXG4gICAgICAub2ZmKCcuemYudGFicycpLmhpZGUoKS5lbmQoKVxuICAgICAgLmZpbmQoYC4ke3RoaXMub3B0aW9ucy5wYW5lbENsYXNzfWApXG4gICAgICAuaGlkZSgpO1xuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5tYXRjaEhlaWdodCkge1xuICAgICAgaWYgKHRoaXMuX3NldEhlaWdodE1xSGFuZGxlciAhPSBudWxsKSB7XG4gICAgICAgICAkKHdpbmRvdykub2ZmKCdjaGFuZ2VkLnpmLm1lZGlhcXVlcnknLCB0aGlzLl9zZXRIZWlnaHRNcUhhbmRsZXIpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMuZGVlcExpbmspIHtcbiAgICAgICQod2luZG93KS5vZmYoJ3BvcHN0YXRlJywgdGhpcy5fY2hlY2tEZWVwTGluayk7XG4gICAgfVxuXG4gIH1cbn1cblxuVGFicy5kZWZhdWx0cyA9IHtcbiAgLyoqXG4gICAqIEFsbG93cyB0aGUgd2luZG93IHRvIHNjcm9sbCB0byBjb250ZW50IG9mIHBhbmUgc3BlY2lmaWVkIGJ5IGhhc2ggYW5jaG9yXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBkZWZhdWx0IGZhbHNlXG4gICAqL1xuICBkZWVwTGluazogZmFsc2UsXG5cbiAgLyoqXG4gICAqIEFkanVzdCB0aGUgZGVlcCBsaW5rIHNjcm9sbCB0byBtYWtlIHN1cmUgdGhlIHRvcCBvZiB0aGUgdGFiIHBhbmVsIGlzIHZpc2libGVcbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQGRlZmF1bHQgZmFsc2VcbiAgICovXG4gIGRlZXBMaW5rU211ZGdlOiBmYWxzZSxcblxuICAvKipcbiAgICogQW5pbWF0aW9uIHRpbWUgKG1zKSBmb3IgdGhlIGRlZXAgbGluayBhZGp1c3RtZW50XG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge251bWJlcn1cbiAgICogQGRlZmF1bHQgMzAwXG4gICAqL1xuICBkZWVwTGlua1NtdWRnZURlbGF5OiAzMDAsXG5cbiAgLyoqXG4gICAqIFVwZGF0ZSB0aGUgYnJvd3NlciBoaXN0b3J5IHdpdGggdGhlIG9wZW4gdGFiXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBkZWZhdWx0IGZhbHNlXG4gICAqL1xuICB1cGRhdGVIaXN0b3J5OiBmYWxzZSxcblxuICAvKipcbiAgICogQWxsb3dzIHRoZSB3aW5kb3cgdG8gc2Nyb2xsIHRvIGNvbnRlbnQgb2YgYWN0aXZlIHBhbmUgb24gbG9hZCBpZiBzZXQgdG8gdHJ1ZS5cbiAgICogTm90IHJlY29tbWVuZGVkIGlmIG1vcmUgdGhhbiBvbmUgdGFiIHBhbmVsIHBlciBwYWdlLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgKi9cbiAgYXV0b0ZvY3VzOiBmYWxzZSxcblxuICAvKipcbiAgICogQWxsb3dzIGtleWJvYXJkIGlucHV0IHRvICd3cmFwJyBhcm91bmQgdGhlIHRhYiBsaW5rcy5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQGRlZmF1bHQgdHJ1ZVxuICAgKi9cbiAgd3JhcE9uS2V5czogdHJ1ZSxcblxuICAvKipcbiAgICogQWxsb3dzIHRoZSB0YWIgY29udGVudCBwYW5lcyB0byBtYXRjaCBoZWlnaHRzIGlmIHNldCB0byB0cnVlLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgKi9cbiAgbWF0Y2hIZWlnaHQ6IGZhbHNlLFxuXG4gIC8qKlxuICAgKiBBbGxvd3MgYWN0aXZlIHRhYnMgdG8gY29sbGFwc2Ugd2hlbiBjbGlja2VkLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgKi9cbiAgYWN0aXZlQ29sbGFwc2U6IGZhbHNlLFxuXG4gIC8qKlxuICAgKiBDbGFzcyBhcHBsaWVkIHRvIGBsaWAncyBpbiB0YWIgbGluayBsaXN0LlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqIEBkZWZhdWx0ICd0YWJzLXRpdGxlJ1xuICAgKi9cbiAgbGlua0NsYXNzOiAndGFicy10aXRsZScsXG5cbiAgLyoqXG4gICAqIENsYXNzIGFwcGxpZWQgdG8gdGhlIGFjdGl2ZSBgbGlgIGluIHRhYiBsaW5rIGxpc3QuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge3N0cmluZ31cbiAgICogQGRlZmF1bHQgJ2lzLWFjdGl2ZSdcbiAgICovXG4gIGxpbmtBY3RpdmVDbGFzczogJ2lzLWFjdGl2ZScsXG5cbiAgLyoqXG4gICAqIENsYXNzIGFwcGxpZWQgdG8gdGhlIGNvbnRlbnQgY29udGFpbmVycy5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKiBAZGVmYXVsdCAndGFicy1wYW5lbCdcbiAgICovXG4gIHBhbmVsQ2xhc3M6ICd0YWJzLXBhbmVsJyxcblxuICAvKipcbiAgICogQ2xhc3MgYXBwbGllZCB0byB0aGUgYWN0aXZlIGNvbnRlbnQgY29udGFpbmVyLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqIEBkZWZhdWx0ICdpcy1hY3RpdmUnXG4gICAqL1xuICBwYW5lbEFjdGl2ZUNsYXNzOiAnaXMtYWN0aXZlJ1xufTtcblxuZXhwb3J0IHtUYWJzfTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24udGFicy5qcyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcblxuLyoqXG4gKiBSdW5zIGEgY2FsbGJhY2sgZnVuY3Rpb24gd2hlbiBpbWFnZXMgYXJlIGZ1bGx5IGxvYWRlZC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBpbWFnZXMgLSBJbWFnZShzKSB0byBjaGVjayBpZiBsb2FkZWQuXG4gKiBAcGFyYW0ge0Z1bmN9IGNhbGxiYWNrIC0gRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIGltYWdlIGlzIGZ1bGx5IGxvYWRlZC5cbiAqL1xuZnVuY3Rpb24gb25JbWFnZXNMb2FkZWQoaW1hZ2VzLCBjYWxsYmFjayl7XG4gIHZhciBzZWxmID0gdGhpcyxcbiAgICAgIHVubG9hZGVkID0gaW1hZ2VzLmxlbmd0aDtcblxuICBpZiAodW5sb2FkZWQgPT09IDApIHtcbiAgICBjYWxsYmFjaygpO1xuICB9XG5cbiAgaW1hZ2VzLmVhY2goZnVuY3Rpb24oKXtcbiAgICAvLyBDaGVjayBpZiBpbWFnZSBpcyBsb2FkZWRcbiAgICBpZiAodGhpcy5jb21wbGV0ZSAmJiB0aGlzLm5hdHVyYWxXaWR0aCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBzaW5nbGVJbWFnZUxvYWRlZCgpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIC8vIElmIHRoZSBhYm92ZSBjaGVjayBmYWlsZWQsIHNpbXVsYXRlIGxvYWRpbmcgb24gZGV0YWNoZWQgZWxlbWVudC5cbiAgICAgIHZhciBpbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgICAgLy8gU3RpbGwgY291bnQgaW1hZ2UgYXMgbG9hZGVkIGlmIGl0IGZpbmFsaXplcyB3aXRoIGFuIGVycm9yLlxuICAgICAgdmFyIGV2ZW50cyA9IFwibG9hZC56Zi5pbWFnZXMgZXJyb3IuemYuaW1hZ2VzXCI7XG4gICAgICAkKGltYWdlKS5vbmUoZXZlbnRzLCBmdW5jdGlvbiBtZShldmVudCl7XG4gICAgICAgIC8vIFVuYmluZCB0aGUgZXZlbnQgbGlzdGVuZXJzLiBXZSdyZSB1c2luZyAnb25lJyBidXQgb25seSBvbmUgb2YgdGhlIHR3byBldmVudHMgd2lsbCBoYXZlIGZpcmVkLlxuICAgICAgICAkKHRoaXMpLm9mZihldmVudHMsIG1lKTtcbiAgICAgICAgc2luZ2xlSW1hZ2VMb2FkZWQoKTtcbiAgICAgIH0pO1xuICAgICAgaW1hZ2Uuc3JjID0gJCh0aGlzKS5hdHRyKCdzcmMnKTtcbiAgICB9XG4gIH0pO1xuXG4gIGZ1bmN0aW9uIHNpbmdsZUltYWdlTG9hZGVkKCkge1xuICAgIHVubG9hZGVkLS07XG4gICAgaWYgKHVubG9hZGVkID09PSAwKSB7XG4gICAgICBjYWxsYmFjaygpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgeyBvbkltYWdlc0xvYWRlZCB9O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi51dGlsLmltYWdlTG9hZGVyLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==