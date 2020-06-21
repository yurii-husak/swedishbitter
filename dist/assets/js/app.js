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

//
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

(0, _jquery2.default)(".ba-symptoms-testimonials").on("click", "a", function (event) {
    event.preventDefault(); //опустошим стандартную обработку
    var id = (0, _jquery2.default)(this).attr('href'),
        //заберем айдишник блока с параметром URL
    top = (0, _jquery2.default)(id).offset().top; //определим высоту от начала страницы до якоря
    (0, _jquery2.default)('body,html').animate({ scrollTop: top }, 1000); //сделаем прокрутку за 1 с
});

(0, _jquery2.default)('[data-fancybox]').fancybox({
    touch: false
});

//Loader
window.onload = function () {
    document.body.classList.add('loaded_hiding');
    window.setTimeout(function () {
        document.body.classList.add('loaded');
        document.body.classList.remove('loaded_hiding');
    }, 1000);
};

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZDdlZTRmYzMyZWFlMzc3NGY2NjMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwialF1ZXJ5XCIiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi51dGlsLmNvcmUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi51dGlsLm1lZGlhUXVlcnkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi51dGlsLmtleWJvYXJkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24udXRpbC50cmlnZ2Vycy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLnBsdWdpbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2pzL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2hhdC1pbnB1dC9kaXN0L3doYXQtaW5wdXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9qcy9saWIvZm91bmRhdGlvbi1leHBsaWNpdC1waWVjZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi5jb3JlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24udXRpbC5tb3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi5vZmZjYW52YXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi50YWJzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24udXRpbC5pbWFnZUxvYWRlci5qcyJdLCJuYW1lcyI6WyJydGwiLCJhdHRyIiwiR2V0WW9EaWdpdHMiLCJsZW5ndGgiLCJuYW1lc3BhY2UiLCJNYXRoIiwicm91bmQiLCJwb3ciLCJyYW5kb20iLCJ0b1N0cmluZyIsInNsaWNlIiwidHJhbnNpdGlvbmVuZCIsIiRlbGVtIiwidHJhbnNpdGlvbnMiLCJlbGVtIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiZW5kIiwidCIsInN0eWxlIiwic2V0VGltZW91dCIsInRyaWdnZXJIYW5kbGVyIiwiZGVmYXVsdFF1ZXJpZXMiLCJsYW5kc2NhcGUiLCJwb3J0cmFpdCIsInJldGluYSIsIm1hdGNoTWVkaWEiLCJ3aW5kb3ciLCJzdHlsZU1lZGlhIiwibWVkaWEiLCJzY3JpcHQiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsImluZm8iLCJ0eXBlIiwiaWQiLCJwYXJlbnROb2RlIiwiaW5zZXJ0QmVmb3JlIiwiZ2V0Q29tcHV0ZWRTdHlsZSIsImN1cnJlbnRTdHlsZSIsIm1hdGNoTWVkaXVtIiwidGV4dCIsInN0eWxlU2hlZXQiLCJjc3NUZXh0IiwidGV4dENvbnRlbnQiLCJ3aWR0aCIsIm1hdGNoZXMiLCJNZWRpYVF1ZXJ5IiwicXVlcmllcyIsImN1cnJlbnQiLCJfaW5pdCIsInNlbGYiLCIkbWV0YSIsImFwcGVuZFRvIiwiaGVhZCIsImV4dHJhY3RlZFN0eWxlcyIsImNzcyIsIm5hbWVkUXVlcmllcyIsInBhcnNlU3R5bGVUb09iamVjdCIsImtleSIsImhhc093blByb3BlcnR5IiwicHVzaCIsIm5hbWUiLCJ2YWx1ZSIsIl9nZXRDdXJyZW50U2l6ZSIsIl93YXRjaGVyIiwiYXRMZWFzdCIsInNpemUiLCJxdWVyeSIsImdldCIsImlzIiwidHJpbSIsInNwbGl0IiwiaSIsIm1hdGNoZWQiLCJvZmYiLCJvbiIsIm5ld1NpemUiLCJjdXJyZW50U2l6ZSIsInRyaWdnZXIiLCJzdHIiLCJzdHlsZU9iamVjdCIsInJlZHVjZSIsInJldCIsInBhcmFtIiwicGFydHMiLCJyZXBsYWNlIiwidmFsIiwiZGVjb2RlVVJJQ29tcG9uZW50IiwidW5kZWZpbmVkIiwiQXJyYXkiLCJpc0FycmF5Iiwia2V5Q29kZXMiLCJjb21tYW5kcyIsImZpbmRGb2N1c2FibGUiLCIkZWxlbWVudCIsImZpbmQiLCJmaWx0ZXIiLCJwYXJzZUtleSIsImV2ZW50Iiwid2hpY2giLCJrZXlDb2RlIiwiU3RyaW5nIiwiZnJvbUNoYXJDb2RlIiwidG9VcHBlckNhc2UiLCJzaGlmdEtleSIsImN0cmxLZXkiLCJhbHRLZXkiLCJLZXlib2FyZCIsImtleXMiLCJnZXRLZXlDb2RlcyIsImhhbmRsZUtleSIsImNvbXBvbmVudCIsImZ1bmN0aW9ucyIsImNvbW1hbmRMaXN0IiwiY21kcyIsImNvbW1hbmQiLCJmbiIsImNvbnNvbGUiLCJ3YXJuIiwibHRyIiwiJCIsImV4dGVuZCIsInJldHVyblZhbHVlIiwiYXBwbHkiLCJoYW5kbGVkIiwidW5oYW5kbGVkIiwicmVnaXN0ZXIiLCJjb21wb25lbnROYW1lIiwidHJhcEZvY3VzIiwiJGZvY3VzYWJsZSIsIiRmaXJzdEZvY3VzYWJsZSIsImVxIiwiJGxhc3RGb2N1c2FibGUiLCJ0YXJnZXQiLCJwcmV2ZW50RGVmYXVsdCIsImZvY3VzIiwicmVsZWFzZUZvY3VzIiwia2NzIiwiayIsImtjIiwiTXV0YXRpb25PYnNlcnZlciIsInByZWZpeGVzIiwidHJpZ2dlcnMiLCJlbCIsImRhdGEiLCJmb3JFYWNoIiwiVHJpZ2dlcnMiLCJMaXN0ZW5lcnMiLCJCYXNpYyIsIkdsb2JhbCIsIkluaXRpYWxpemVycyIsIm9wZW5MaXN0ZW5lciIsImNsb3NlTGlzdGVuZXIiLCJ0b2dnbGVMaXN0ZW5lciIsImNsb3NlYWJsZUxpc3RlbmVyIiwiZSIsInN0b3BQcm9wYWdhdGlvbiIsImFuaW1hdGlvbiIsIk1vdGlvbiIsImFuaW1hdGVPdXQiLCJmYWRlT3V0IiwidG9nZ2xlRm9jdXNMaXN0ZW5lciIsImFkZE9wZW5MaXN0ZW5lciIsImFkZENsb3NlTGlzdGVuZXIiLCJhZGRUb2dnbGVMaXN0ZW5lciIsImFkZENsb3NlYWJsZUxpc3RlbmVyIiwiYWRkVG9nZ2xlRm9jdXNMaXN0ZW5lciIsInJlc2l6ZUxpc3RlbmVyIiwiJG5vZGVzIiwiZWFjaCIsInNjcm9sbExpc3RlbmVyIiwiY2xvc2VNZUxpc3RlbmVyIiwicGx1Z2luSWQiLCJwbHVnaW4iLCJwbHVnaW5zIiwibm90IiwiX3RoaXMiLCJhZGRDbG9zZW1lTGlzdGVuZXIiLCJwbHVnaW5OYW1lIiwieWV0aUJveGVzIiwicGx1Z05hbWVzIiwiY29uY2F0IiwiZXJyb3IiLCJsaXN0ZW5lcnMiLCJtYXAiLCJqb2luIiwiZGVib3VuY2VHbG9iYWxMaXN0ZW5lciIsImRlYm91bmNlIiwibGlzdGVuZXIiLCJ0aW1lciIsImFyZ3MiLCJwcm90b3R5cGUiLCJjYWxsIiwiYXJndW1lbnRzIiwiY2xlYXJUaW1lb3V0IiwiYWRkUmVzaXplTGlzdGVuZXIiLCJhZGRTY3JvbGxMaXN0ZW5lciIsImFkZE11dGF0aW9uRXZlbnRzTGlzdGVuZXIiLCJsaXN0ZW5pbmdFbGVtZW50c011dGF0aW9uIiwibXV0YXRpb25SZWNvcmRzTGlzdCIsIiR0YXJnZXQiLCJhdHRyaWJ1dGVOYW1lIiwicGFnZVlPZmZzZXQiLCJjbG9zZXN0IiwiZWxlbWVudE9ic2VydmVyIiwib2JzZXJ2ZSIsImF0dHJpYnV0ZXMiLCJjaGlsZExpc3QiLCJjaGFyYWN0ZXJEYXRhIiwic3VidHJlZSIsImF0dHJpYnV0ZUZpbHRlciIsImFkZFNpbXBsZUxpc3RlbmVycyIsIiRkb2N1bWVudCIsImFkZEdsb2JhbExpc3RlbmVycyIsImluaXQiLCJGb3VuZGF0aW9uIiwidHJpZ2dlcnNJbml0aWFsaXplZCIsInJlYWR5U3RhdGUiLCJJSGVhcllvdSIsIlBsdWdpbiIsImVsZW1lbnQiLCJvcHRpb25zIiwiX3NldHVwIiwiZ2V0UGx1Z2luTmFtZSIsInV1aWQiLCJfZGVzdHJveSIsInJlbW92ZUF0dHIiLCJyZW1vdmVEYXRhIiwicHJvcCIsImh5cGhlbmF0ZSIsInRvTG93ZXJDYXNlIiwib2JqIiwiY29uc3RydWN0b3IiLCJjbGFzc05hbWUiLCJmb3VuZGF0aW9uIiwiYWRkQ2xhc3MiLCJ0YWJfaWQiLCJyZW1vdmVDbGFzcyIsImhpZGUiLCJmYWRlSW4iLCJjbGljayIsImdldFNjcmlwdCIsInRleHRTdGF0dXMiLCJqcXhociIsInRlc3RpbW9uaWFsX2NhdCIsImFjdGlvbiIsInRlc3RpbW9uaWFsQ2F0IiwicG9zdCIsImJhX2FqYXgiLCJyZXNwb25zZSIsImh0bWwiLCJ0b3AiLCJvZmZzZXQiLCJhbmltYXRlIiwic2Nyb2xsVG9wIiwiZmFuY3lib3giLCJ0b3VjaCIsIm9ubG9hZCIsImJvZHkiLCJjbGFzc0xpc3QiLCJhZGQiLCJyZW1vdmUiLCJhZGRUb0pxdWVyeSIsIk9mZkNhbnZhcyIsIlRhYnMiLCJtb2R1bGUiLCJleHBvcnRzIiwiRk9VTkRBVElPTl9WRVJTSU9OIiwidmVyc2lvbiIsIl9wbHVnaW5zIiwiX3V1aWRzIiwiZnVuY3Rpb25OYW1lIiwiYXR0ck5hbWUiLCJyZWdpc3RlclBsdWdpbiIsInVucmVnaXN0ZXJQbHVnaW4iLCJzcGxpY2UiLCJpbmRleE9mIiwicmVJbml0IiwiaXNKUSIsImZucyIsInBsZ3MiLCJwIiwiT2JqZWN0IiwiZXJyIiwicmVmbG93IiwiYWRkQmFjayIsIiRlbCIsIm9wdHMiLCJ0aGluZyIsIm9wdCIsInBhcnNlVmFsdWUiLCJlciIsImdldEZuTmFtZSIsIm1ldGhvZCIsIiRub0pTIiwicGx1Z0NsYXNzIiwiUmVmZXJlbmNlRXJyb3IiLCJUeXBlRXJyb3IiLCJ1dGlsIiwidGhyb3R0bGUiLCJmdW5jIiwiZGVsYXkiLCJjb250ZXh0IiwiRGF0ZSIsIm5vdyIsImdldFRpbWUiLCJ2ZW5kb3JzIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwidnAiLCJjYW5jZWxBbmltYXRpb25GcmFtZSIsInRlc3QiLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJsYXN0VGltZSIsImNhbGxiYWNrIiwibmV4dFRpbWUiLCJtYXgiLCJwZXJmb3JtYW5jZSIsInN0YXJ0IiwiRnVuY3Rpb24iLCJiaW5kIiwib1RoaXMiLCJhQXJncyIsImZUb0JpbmQiLCJmTk9QIiwiZkJvdW5kIiwiZnVuY05hbWVSZWdleCIsInJlc3VsdHMiLCJleGVjIiwiaXNOYU4iLCJwYXJzZUZsb2F0IiwiaW5pdENsYXNzZXMiLCJhY3RpdmVDbGFzc2VzIiwiYW5pbWF0ZUluIiwiY2IiLCJNb3ZlIiwiZHVyYXRpb24iLCJhbmltIiwicHJvZyIsIm1vdmUiLCJ0cyIsImlzSW4iLCJpbml0Q2xhc3MiLCJhY3RpdmVDbGFzcyIsInJlc2V0Iiwic2hvdyIsIm9mZnNldFdpZHRoIiwib25lIiwiZmluaXNoIiwidHJhbnNpdGlvbkR1cmF0aW9uIiwiZGVmYXVsdHMiLCJjb250ZW50Q2xhc3NlcyIsImJhc2UiLCJyZXZlYWwiLCIkbGFzdFRyaWdnZXIiLCIkdHJpZ2dlcnMiLCJwb3NpdGlvbiIsIiRjb250ZW50IiwibmVzdGVkIiwiaW5kZXgiLCJfZXZlbnRzIiwiY29udGVudElkIiwic2libGluZ3MiLCJmaXJzdCIsInRyYW5zaXRpb24iLCJtYXRjaCIsImNvbnRlbnRPdmVybGF5Iiwib3ZlcmxheSIsIm92ZXJsYXlQb3NpdGlvbiIsInNldEF0dHJpYnV0ZSIsIiRvdmVybGF5IiwiaW5zZXJ0QWZ0ZXIiLCJhcHBlbmQiLCJpc1JldmVhbGVkIiwiUmVnRXhwIiwicmV2ZWFsQ2xhc3MiLCJyZXZlYWxPbiIsIl9zZXRNUUNoZWNrZXIiLCJ0cmFuc2l0aW9uVGltZSIsIl9yZW1vdmVDb250ZW50Q2xhc3NlcyIsIm9wZW4iLCJjbG9zZSIsInRvZ2dsZSIsIl9oYW5kbGVLZXlib2FyZCIsImNsb3NlT25DbGljayIsImhhc1JldmVhbCIsIl9hZGRDb250ZW50Q2xhc3NlcyIsInNjcm9sbEhlaWdodCIsImNsaWVudEhlaWdodCIsImFsbG93VXAiLCJhbGxvd0Rvd24iLCJsYXN0WSIsIm9yaWdpbmFsRXZlbnQiLCJwYWdlWSIsInVwIiwiZG93biIsImhhc0NsYXNzIiwiZm9yY2VUbyIsInNjcm9sbFRvIiwiY29udGVudFNjcm9sbCIsIl9zdG9wU2Nyb2xsaW5nIiwiX3JlY29yZFNjcm9sbGFibGUiLCJfc3RvcFNjcm9sbFByb3BhZ2F0aW9uIiwiYXV0b0ZvY3VzIiwiY2FudmFzRm9jdXMiLCIkdGFiVGl0bGVzIiwibGlua0NsYXNzIiwiJHRhYkNvbnRlbnQiLCIkbGluayIsImlzQWN0aXZlIiwibGlua0FjdGl2ZUNsYXNzIiwiaGFzaCIsImxpbmtJZCIsImxvYWQiLCJkZWVwTGlua1NtdWRnZURlbGF5IiwibWF0Y2hIZWlnaHQiLCIkaW1hZ2VzIiwiX3NldEhlaWdodCIsIl9jaGVja0RlZXBMaW5rIiwiYW5jaG9yIiwibG9jYXRpb24iLCJzZWxlY3RUYWIiLCJkZWVwTGlua1NtdWRnZSIsImRlZXBMaW5rIiwiX2FkZEtleUhhbmRsZXIiLCJfYWRkQ2xpY2tIYW5kbGVyIiwiX3NldEhlaWdodE1xSGFuZGxlciIsIl9oYW5kbGVUYWJDaGFuZ2UiLCIkZWxlbWVudHMiLCJwYXJlbnQiLCJjaGlsZHJlbiIsIiRwcmV2RWxlbWVudCIsIiRuZXh0RWxlbWVudCIsIndyYXBPbktleXMiLCJsYXN0IiwibWluIiwicHJldmlvdXMiLCJuZXh0IiwiaGlzdG9yeUhhbmRsZWQiLCJhY3RpdmVDb2xsYXBzZSIsIl9jb2xsYXBzZVRhYiIsIiRvbGRUYWIiLCIkdGFiTGluayIsIiR0YXJnZXRDb250ZW50IiwiX29wZW5UYWIiLCJ1cGRhdGVIaXN0b3J5IiwiaGlzdG9yeSIsInB1c2hTdGF0ZSIsInJlcGxhY2VTdGF0ZSIsInBhbmVsQWN0aXZlQ2xhc3MiLCIkdGFyZ2V0X2FuY2hvciIsImlkU3RyIiwicGFuZWxDbGFzcyIsInBhbmVsIiwidGVtcCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImhlaWdodCIsIm9uSW1hZ2VzTG9hZGVkIiwiaW1hZ2VzIiwidW5sb2FkZWQiLCJjb21wbGV0ZSIsIm5hdHVyYWxXaWR0aCIsInNpbmdsZUltYWdlTG9hZGVkIiwiaW1hZ2UiLCJJbWFnZSIsImV2ZW50cyIsIm1lIiwic3JjIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLEtBQUs7UUFDTDtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOztRQUVBO1FBQ0E7Ozs7Ozs7QUM3REEsd0I7Ozs7Ozs7QUNBYTs7Ozs7OztBQUViOzs7Ozs7QUFFQTs7QUFFRTs7O0FBR0YsU0FBU0EsR0FBVCxHQUFlO0FBQ2IsU0FBTyxzQkFBRSxNQUFGLEVBQVVDLElBQVYsQ0FBZSxLQUFmLE1BQTBCLEtBQWpDO0FBQ0Q7O0FBRUQ7Ozs7Ozs7O0FBUUEsU0FBU0MsV0FBVCxDQUFxQkMsTUFBckIsRUFBNkJDLFNBQTdCLEVBQXVDO0FBQ3JDRCxXQUFTQSxVQUFVLENBQW5CO0FBQ0EsU0FBT0UsS0FBS0MsS0FBTCxDQUFZRCxLQUFLRSxHQUFMLENBQVMsRUFBVCxFQUFhSixTQUFTLENBQXRCLElBQTJCRSxLQUFLRyxNQUFMLEtBQWdCSCxLQUFLRSxHQUFMLENBQVMsRUFBVCxFQUFhSixNQUFiLENBQXZELEVBQThFTSxRQUE5RSxDQUF1RixFQUF2RixFQUEyRkMsS0FBM0YsQ0FBaUcsQ0FBakcsS0FBdUdOLGtCQUFnQkEsU0FBaEIsR0FBOEIsRUFBckksQ0FBUDtBQUNEOztBQUVELFNBQVNPLGFBQVQsQ0FBdUJDLEtBQXZCLEVBQTZCO0FBQzNCLE1BQUlDLGNBQWM7QUFDaEIsa0JBQWMsZUFERTtBQUVoQix3QkFBb0IscUJBRko7QUFHaEIscUJBQWlCLGVBSEQ7QUFJaEIsbUJBQWU7QUFKQyxHQUFsQjtBQU1BLE1BQUlDLE9BQU9DLFNBQVNDLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBWDtBQUFBLE1BQ0lDLEdBREo7O0FBR0EsT0FBSyxJQUFJQyxDQUFULElBQWNMLFdBQWQsRUFBMEI7QUFDeEIsUUFBSSxPQUFPQyxLQUFLSyxLQUFMLENBQVdELENBQVgsQ0FBUCxLQUF5QixXQUE3QixFQUF5QztBQUN2Q0QsWUFBTUosWUFBWUssQ0FBWixDQUFOO0FBQ0Q7QUFDRjtBQUNELE1BQUdELEdBQUgsRUFBTztBQUNMLFdBQU9BLEdBQVA7QUFDRCxHQUZELE1BRUs7QUFDSEEsVUFBTUcsV0FBVyxZQUFVO0FBQ3pCUixZQUFNUyxjQUFOLENBQXFCLGVBQXJCLEVBQXNDLENBQUNULEtBQUQsQ0FBdEM7QUFDRCxLQUZLLEVBRUgsQ0FGRyxDQUFOO0FBR0EsV0FBTyxlQUFQO0FBQ0Q7QUFDRjs7UUFFT1osRyxHQUFBQSxHO1FBQUtFLFcsR0FBQUEsVztRQUFhUyxhLEdBQUFBLGE7Ozs7Ozs7QUNuRGI7Ozs7Ozs7OztBQUViOzs7Ozs7QUFFQTtBQUNBLElBQU1XLGlCQUFpQjtBQUNyQixhQUFZLGFBRFM7QUFFckJDLGFBQVksMENBRlM7QUFHckJDLFlBQVcseUNBSFU7QUFJckJDLFVBQVMseURBQ1AsbURBRE8sR0FFUCxtREFGTyxHQUdQLDhDQUhPLEdBSVAsMkNBSk8sR0FLUDtBQVRtQixDQUF2Qjs7QUFhQTtBQUNBO0FBQ0EsSUFBSUMsYUFBYUMsT0FBT0QsVUFBUCxJQUFzQixZQUFXO0FBQ2hEOztBQUVBOztBQUNBLE1BQUlFLGFBQWNELE9BQU9DLFVBQVAsSUFBcUJELE9BQU9FLEtBQTlDOztBQUVBO0FBQ0EsTUFBSSxDQUFDRCxVQUFMLEVBQWlCO0FBQ2YsUUFBSVQsUUFBVUosU0FBU0MsYUFBVCxDQUF1QixPQUF2QixDQUFkO0FBQUEsUUFDQWMsU0FBY2YsU0FBU2dCLG9CQUFULENBQThCLFFBQTlCLEVBQXdDLENBQXhDLENBRGQ7QUFBQSxRQUVBQyxPQUFjLElBRmQ7O0FBSUFiLFVBQU1jLElBQU4sR0FBYyxVQUFkO0FBQ0FkLFVBQU1lLEVBQU4sR0FBYyxtQkFBZDs7QUFFQUosY0FBVUEsT0FBT0ssVUFBakIsSUFBK0JMLE9BQU9LLFVBQVAsQ0FBa0JDLFlBQWxCLENBQStCakIsS0FBL0IsRUFBc0NXLE1BQXRDLENBQS9COztBQUVBO0FBQ0FFLFdBQVEsc0JBQXNCTCxNQUF2QixJQUFrQ0EsT0FBT1UsZ0JBQVAsQ0FBd0JsQixLQUF4QixFQUErQixJQUEvQixDQUFsQyxJQUEwRUEsTUFBTW1CLFlBQXZGOztBQUVBVixpQkFBYTtBQUNYVyxpQkFEVyx1QkFDQ1YsS0FERCxFQUNRO0FBQ2pCLFlBQUlXLG1CQUFpQlgsS0FBakIsMkNBQUo7O0FBRUE7QUFDQSxZQUFJVixNQUFNc0IsVUFBVixFQUFzQjtBQUNwQnRCLGdCQUFNc0IsVUFBTixDQUFpQkMsT0FBakIsR0FBMkJGLElBQTNCO0FBQ0QsU0FGRCxNQUVPO0FBQ0xyQixnQkFBTXdCLFdBQU4sR0FBb0JILElBQXBCO0FBQ0Q7O0FBRUQ7QUFDQSxlQUFPUixLQUFLWSxLQUFMLEtBQWUsS0FBdEI7QUFDRDtBQWJVLEtBQWI7QUFlRDs7QUFFRCxTQUFPLFVBQVNmLEtBQVQsRUFBZ0I7QUFDckIsV0FBTztBQUNMZ0IsZUFBU2pCLFdBQVdXLFdBQVgsQ0FBdUJWLFNBQVMsS0FBaEMsQ0FESjtBQUVMQSxhQUFPQSxTQUFTO0FBRlgsS0FBUDtBQUlELEdBTEQ7QUFNRCxDQTNDcUMsRUFBdEM7O0FBNkNBLElBQUlpQixhQUFhO0FBQ2ZDLFdBQVMsRUFETTs7QUFHZkMsV0FBUyxFQUhNOztBQUtmOzs7OztBQUtBQyxPQVZlLG1CQVVQO0FBQ04sUUFBSUMsT0FBTyxJQUFYO0FBQ0EsUUFBSUMsUUFBUSxzQkFBRSxvQkFBRixDQUFaO0FBQ0EsUUFBRyxDQUFDQSxNQUFNaEQsTUFBVixFQUFpQjtBQUNmLDRCQUFFLDhCQUFGLEVBQWtDaUQsUUFBbEMsQ0FBMkNyQyxTQUFTc0MsSUFBcEQ7QUFDRDs7QUFFRCxRQUFJQyxrQkFBa0Isc0JBQUUsZ0JBQUYsRUFBb0JDLEdBQXBCLENBQXdCLGFBQXhCLENBQXRCO0FBQ0EsUUFBSUMsWUFBSjs7QUFFQUEsbUJBQWVDLG1CQUFtQkgsZUFBbkIsQ0FBZjs7QUFFQSxTQUFLLElBQUlJLEdBQVQsSUFBZ0JGLFlBQWhCLEVBQThCO0FBQzVCLFVBQUdBLGFBQWFHLGNBQWIsQ0FBNEJELEdBQTVCLENBQUgsRUFBcUM7QUFDbkNSLGFBQUtILE9BQUwsQ0FBYWEsSUFBYixDQUFrQjtBQUNoQkMsZ0JBQU1ILEdBRFU7QUFFaEJJLGtEQUFzQ04sYUFBYUUsR0FBYixDQUF0QztBQUZnQixTQUFsQjtBQUlEO0FBQ0Y7O0FBRUQsU0FBS1YsT0FBTCxHQUFlLEtBQUtlLGVBQUwsRUFBZjs7QUFFQSxTQUFLQyxRQUFMO0FBQ0QsR0FsQ2M7OztBQW9DZjs7Ozs7O0FBTUFDLFNBMUNlLG1CQTBDUEMsSUExQ08sRUEwQ0Q7QUFDWixRQUFJQyxRQUFRLEtBQUtDLEdBQUwsQ0FBU0YsSUFBVCxDQUFaOztBQUVBLFFBQUlDLEtBQUosRUFBVztBQUNULGFBQU96QyxXQUFXeUMsS0FBWCxFQUFrQnRCLE9BQXpCO0FBQ0Q7O0FBRUQsV0FBTyxLQUFQO0FBQ0QsR0FsRGM7OztBQW9EZjs7Ozs7O0FBTUF3QixJQTFEZSxjQTBEWkgsSUExRFksRUEwRE47QUFDUEEsV0FBT0EsS0FBS0ksSUFBTCxHQUFZQyxLQUFaLENBQWtCLEdBQWxCLENBQVA7QUFDQSxRQUFHTCxLQUFLL0QsTUFBTCxHQUFjLENBQWQsSUFBbUIrRCxLQUFLLENBQUwsTUFBWSxNQUFsQyxFQUEwQztBQUN4QyxVQUFHQSxLQUFLLENBQUwsTUFBWSxLQUFLSCxlQUFMLEVBQWYsRUFBdUMsT0FBTyxJQUFQO0FBQ3hDLEtBRkQsTUFFTztBQUNMLGFBQU8sS0FBS0UsT0FBTCxDQUFhQyxLQUFLLENBQUwsQ0FBYixDQUFQO0FBQ0Q7QUFDRCxXQUFPLEtBQVA7QUFDRCxHQWxFYzs7O0FBb0VmOzs7Ozs7QUFNQUUsS0ExRWUsZUEwRVhGLElBMUVXLEVBMEVMO0FBQ1IsU0FBSyxJQUFJTSxDQUFULElBQWMsS0FBS3pCLE9BQW5CLEVBQTRCO0FBQzFCLFVBQUcsS0FBS0EsT0FBTCxDQUFhWSxjQUFiLENBQTRCYSxDQUE1QixDQUFILEVBQW1DO0FBQ2pDLFlBQUlMLFFBQVEsS0FBS3BCLE9BQUwsQ0FBYXlCLENBQWIsQ0FBWjtBQUNBLFlBQUlOLFNBQVNDLE1BQU1OLElBQW5CLEVBQXlCLE9BQU9NLE1BQU1MLEtBQWI7QUFDMUI7QUFDRjs7QUFFRCxXQUFPLElBQVA7QUFDRCxHQW5GYzs7O0FBcUZmOzs7Ozs7QUFNQUMsaUJBM0ZlLDZCQTJGRztBQUNoQixRQUFJVSxPQUFKOztBQUVBLFNBQUssSUFBSUQsSUFBSSxDQUFiLEVBQWdCQSxJQUFJLEtBQUt6QixPQUFMLENBQWE1QyxNQUFqQyxFQUF5Q3FFLEdBQXpDLEVBQThDO0FBQzVDLFVBQUlMLFFBQVEsS0FBS3BCLE9BQUwsQ0FBYXlCLENBQWIsQ0FBWjs7QUFFQSxVQUFJOUMsV0FBV3lDLE1BQU1MLEtBQWpCLEVBQXdCakIsT0FBNUIsRUFBcUM7QUFDbkM0QixrQkFBVU4sS0FBVjtBQUNEO0FBQ0Y7O0FBRUQsUUFBSSxRQUFPTSxPQUFQLHlDQUFPQSxPQUFQLE9BQW1CLFFBQXZCLEVBQWlDO0FBQy9CLGFBQU9BLFFBQVFaLElBQWY7QUFDRCxLQUZELE1BRU87QUFDTCxhQUFPWSxPQUFQO0FBQ0Q7QUFDRixHQTNHYzs7O0FBNkdmOzs7OztBQUtBVCxVQWxIZSxzQkFrSEo7QUFBQTs7QUFDVCwwQkFBRXJDLE1BQUYsRUFBVStDLEdBQVYsQ0FBYyxzQkFBZCxFQUFzQ0MsRUFBdEMsQ0FBeUMsc0JBQXpDLEVBQWlFLFlBQU07QUFDckUsVUFBSUMsVUFBVSxNQUFLYixlQUFMLEVBQWQ7QUFBQSxVQUFzQ2MsY0FBYyxNQUFLN0IsT0FBekQ7O0FBRUEsVUFBSTRCLFlBQVlDLFdBQWhCLEVBQTZCO0FBQzNCO0FBQ0EsY0FBSzdCLE9BQUwsR0FBZTRCLE9BQWY7O0FBRUE7QUFDQSw4QkFBRWpELE1BQUYsRUFBVW1ELE9BQVYsQ0FBa0IsdUJBQWxCLEVBQTJDLENBQUNGLE9BQUQsRUFBVUMsV0FBVixDQUEzQztBQUNEO0FBQ0YsS0FWRDtBQVdEO0FBOUhjLENBQWpCOztBQW1JQTtBQUNBLFNBQVNwQixrQkFBVCxDQUE0QnNCLEdBQTVCLEVBQWlDO0FBQy9CLE1BQUlDLGNBQWMsRUFBbEI7O0FBRUEsTUFBSSxPQUFPRCxHQUFQLEtBQWUsUUFBbkIsRUFBNkI7QUFDM0IsV0FBT0MsV0FBUDtBQUNEOztBQUVERCxRQUFNQSxJQUFJVCxJQUFKLEdBQVc1RCxLQUFYLENBQWlCLENBQWpCLEVBQW9CLENBQUMsQ0FBckIsQ0FBTixDQVArQixDQU9BOztBQUUvQixNQUFJLENBQUNxRSxHQUFMLEVBQVU7QUFDUixXQUFPQyxXQUFQO0FBQ0Q7O0FBRURBLGdCQUFjRCxJQUFJUixLQUFKLENBQVUsR0FBVixFQUFlVSxNQUFmLENBQXNCLFVBQVNDLEdBQVQsRUFBY0MsS0FBZCxFQUFxQjtBQUN2RCxRQUFJQyxRQUFRRCxNQUFNRSxPQUFOLENBQWMsS0FBZCxFQUFxQixHQUFyQixFQUEwQmQsS0FBMUIsQ0FBZ0MsR0FBaEMsQ0FBWjtBQUNBLFFBQUliLE1BQU0wQixNQUFNLENBQU4sQ0FBVjtBQUNBLFFBQUlFLE1BQU1GLE1BQU0sQ0FBTixDQUFWO0FBQ0ExQixVQUFNNkIsbUJBQW1CN0IsR0FBbkIsQ0FBTjs7QUFFQTtBQUNBO0FBQ0E0QixVQUFNQSxRQUFRRSxTQUFSLEdBQW9CLElBQXBCLEdBQTJCRCxtQkFBbUJELEdBQW5CLENBQWpDOztBQUVBLFFBQUksQ0FBQ0osSUFBSXZCLGNBQUosQ0FBbUJELEdBQW5CLENBQUwsRUFBOEI7QUFDNUJ3QixVQUFJeEIsR0FBSixJQUFXNEIsR0FBWDtBQUNELEtBRkQsTUFFTyxJQUFJRyxNQUFNQyxPQUFOLENBQWNSLElBQUl4QixHQUFKLENBQWQsQ0FBSixFQUE2QjtBQUNsQ3dCLFVBQUl4QixHQUFKLEVBQVNFLElBQVQsQ0FBYzBCLEdBQWQ7QUFDRCxLQUZNLE1BRUE7QUFDTEosVUFBSXhCLEdBQUosSUFBVyxDQUFDd0IsSUFBSXhCLEdBQUosQ0FBRCxFQUFXNEIsR0FBWCxDQUFYO0FBQ0Q7QUFDRCxXQUFPSixHQUFQO0FBQ0QsR0FsQmEsRUFrQlgsRUFsQlcsQ0FBZDs7QUFvQkEsU0FBT0YsV0FBUDtBQUNEOztRQUVPbEMsVSxHQUFBQSxVOzs7Ozs7O0FDek9SOzs7Ozs7OztBQVFhOzs7Ozs7O0FBRWI7Ozs7QUFDQTs7OztBQUVBLElBQU02QyxXQUFXO0FBQ2YsS0FBRyxLQURZO0FBRWYsTUFBSSxPQUZXO0FBR2YsTUFBSSxRQUhXO0FBSWYsTUFBSSxPQUpXO0FBS2YsTUFBSSxLQUxXO0FBTWYsTUFBSSxNQU5XO0FBT2YsTUFBSSxZQVBXO0FBUWYsTUFBSSxVQVJXO0FBU2YsTUFBSSxhQVRXO0FBVWYsTUFBSTtBQVZXLENBQWpCOztBQWFBLElBQUlDLFdBQVcsRUFBZjs7QUFFQTtBQUNBLFNBQVNDLGFBQVQsQ0FBdUJDLFFBQXZCLEVBQWlDO0FBQy9CLE1BQUcsQ0FBQ0EsUUFBSixFQUFjO0FBQUMsV0FBTyxLQUFQO0FBQWU7QUFDOUIsU0FBT0EsU0FBU0MsSUFBVCxDQUFjLDhLQUFkLEVBQThMQyxNQUE5TCxDQUFxTSxZQUFXO0FBQ3JOLFFBQUksQ0FBQyxzQkFBRSxJQUFGLEVBQVEzQixFQUFSLENBQVcsVUFBWCxDQUFELElBQTJCLHNCQUFFLElBQUYsRUFBUXBFLElBQVIsQ0FBYSxVQUFiLElBQTJCLENBQTFELEVBQTZEO0FBQUUsYUFBTyxLQUFQO0FBQWUsS0FEdUksQ0FDdEk7QUFDL0UsV0FBTyxJQUFQO0FBQ0QsR0FITSxDQUFQO0FBSUQ7O0FBRUQsU0FBU2dHLFFBQVQsQ0FBa0JDLEtBQWxCLEVBQXlCO0FBQ3ZCLE1BQUl4QyxNQUFNaUMsU0FBU08sTUFBTUMsS0FBTixJQUFlRCxNQUFNRSxPQUE5QixLQUEwQ0MsT0FBT0MsWUFBUCxDQUFvQkosTUFBTUMsS0FBMUIsRUFBaUNJLFdBQWpDLEVBQXBEOztBQUVBO0FBQ0E3QyxRQUFNQSxJQUFJMkIsT0FBSixDQUFZLEtBQVosRUFBbUIsRUFBbkIsQ0FBTjs7QUFFQSxNQUFJYSxNQUFNTSxRQUFWLEVBQW9COUMsaUJBQWVBLEdBQWY7QUFDcEIsTUFBSXdDLE1BQU1PLE9BQVYsRUFBbUIvQyxnQkFBY0EsR0FBZDtBQUNuQixNQUFJd0MsTUFBTVEsTUFBVixFQUFrQmhELGVBQWFBLEdBQWI7O0FBRWxCO0FBQ0FBLFFBQU1BLElBQUkyQixPQUFKLENBQVksSUFBWixFQUFrQixFQUFsQixDQUFOOztBQUVBLFNBQU8zQixHQUFQO0FBQ0Q7O0FBRUQsSUFBSWlELFdBQVc7QUFDYkMsUUFBTUMsWUFBWWxCLFFBQVosQ0FETzs7QUFHYjs7Ozs7O0FBTUFNLFlBQVVBLFFBVEc7O0FBV2I7Ozs7OztBQU1BYSxXQWpCYSxxQkFpQkhaLEtBakJHLEVBaUJJYSxTQWpCSixFQWlCZUMsU0FqQmYsRUFpQjBCO0FBQ3JDLFFBQUlDLGNBQWNyQixTQUFTbUIsU0FBVCxDQUFsQjtBQUFBLFFBQ0VYLFVBQVUsS0FBS0gsUUFBTCxDQUFjQyxLQUFkLENBRFo7QUFBQSxRQUVFZ0IsSUFGRjtBQUFBLFFBR0VDLE9BSEY7QUFBQSxRQUlFQyxFQUpGOztBQU1BLFFBQUksQ0FBQ0gsV0FBTCxFQUFrQixPQUFPSSxRQUFRQyxJQUFSLENBQWEsd0JBQWIsQ0FBUDs7QUFFbEIsUUFBSSxPQUFPTCxZQUFZTSxHQUFuQixLQUEyQixXQUEvQixFQUE0QztBQUFFO0FBQzFDTCxhQUFPRCxXQUFQLENBRHdDLENBQ3BCO0FBQ3ZCLEtBRkQsTUFFTztBQUFFO0FBQ0wsVUFBSSwwQkFBSixFQUFXQyxPQUFPTSxpQkFBRUMsTUFBRixDQUFTLEVBQVQsRUFBYVIsWUFBWU0sR0FBekIsRUFBOEJOLFlBQVlqSCxHQUExQyxDQUFQLENBQVgsS0FFS2tILE9BQU9NLGlCQUFFQyxNQUFGLENBQVMsRUFBVCxFQUFhUixZQUFZakgsR0FBekIsRUFBOEJpSCxZQUFZTSxHQUExQyxDQUFQO0FBQ1I7QUFDREosY0FBVUQsS0FBS2QsT0FBTCxDQUFWOztBQUVBZ0IsU0FBS0osVUFBVUcsT0FBVixDQUFMO0FBQ0EsUUFBSUMsTUFBTSxPQUFPQSxFQUFQLEtBQWMsVUFBeEIsRUFBb0M7QUFBRTtBQUNwQyxVQUFJTSxjQUFjTixHQUFHTyxLQUFILEVBQWxCO0FBQ0EsVUFBSVgsVUFBVVksT0FBVixJQUFxQixPQUFPWixVQUFVWSxPQUFqQixLQUE2QixVQUF0RCxFQUFrRTtBQUFFO0FBQ2hFWixrQkFBVVksT0FBVixDQUFrQkYsV0FBbEI7QUFDSDtBQUNGLEtBTEQsTUFLTztBQUNMLFVBQUlWLFVBQVVhLFNBQVYsSUFBdUIsT0FBT2IsVUFBVWEsU0FBakIsS0FBK0IsVUFBMUQsRUFBc0U7QUFBRTtBQUNwRWIsa0JBQVVhLFNBQVY7QUFDSDtBQUNGO0FBQ0YsR0E5Q1k7OztBQWdEYjs7Ozs7O0FBTUFoQyxpQkFBZUEsYUF0REY7O0FBd0RiOzs7Ozs7QUFNQWlDLFVBOURhLG9CQThESkMsYUE5REksRUE4RFdiLElBOURYLEVBOERpQjtBQUM1QnRCLGFBQVNtQyxhQUFULElBQTBCYixJQUExQjtBQUNELEdBaEVZOzs7QUFtRWI7QUFDQTtBQUNBOzs7O0FBSUFjLFdBekVhLHFCQXlFSGxDLFFBekVHLEVBeUVPO0FBQ2xCLFFBQUltQyxhQUFhcEMsY0FBY0MsUUFBZCxDQUFqQjtBQUFBLFFBQ0lvQyxrQkFBa0JELFdBQVdFLEVBQVgsQ0FBYyxDQUFkLENBRHRCO0FBQUEsUUFFSUMsaUJBQWlCSCxXQUFXRSxFQUFYLENBQWMsQ0FBQyxDQUFmLENBRnJCOztBQUlBckMsYUFBU25CLEVBQVQsQ0FBWSxzQkFBWixFQUFvQyxVQUFTdUIsS0FBVCxFQUFnQjtBQUNsRCxVQUFJQSxNQUFNbUMsTUFBTixLQUFpQkQsZUFBZSxDQUFmLENBQWpCLElBQXNDbkMsU0FBU0MsS0FBVCxNQUFvQixLQUE5RCxFQUFxRTtBQUNuRUEsY0FBTW9DLGNBQU47QUFDQUosd0JBQWdCSyxLQUFoQjtBQUNELE9BSEQsTUFJSyxJQUFJckMsTUFBTW1DLE1BQU4sS0FBaUJILGdCQUFnQixDQUFoQixDQUFqQixJQUF1Q2pDLFNBQVNDLEtBQVQsTUFBb0IsV0FBL0QsRUFBNEU7QUFDL0VBLGNBQU1vQyxjQUFOO0FBQ0FGLHVCQUFlRyxLQUFmO0FBQ0Q7QUFDRixLQVREO0FBVUQsR0F4Rlk7O0FBeUZiOzs7O0FBSUFDLGNBN0ZhLHdCQTZGQTFDLFFBN0ZBLEVBNkZVO0FBQ3JCQSxhQUFTcEIsR0FBVCxDQUFhLHNCQUFiO0FBQ0Q7QUEvRlksQ0FBZjs7QUFrR0E7Ozs7QUFJQSxTQUFTbUMsV0FBVCxDQUFxQjRCLEdBQXJCLEVBQTBCO0FBQ3hCLE1BQUlDLElBQUksRUFBUjtBQUNBLE9BQUssSUFBSUMsRUFBVCxJQUFlRixHQUFmO0FBQW9CQyxNQUFFRCxJQUFJRSxFQUFKLENBQUYsSUFBYUYsSUFBSUUsRUFBSixDQUFiO0FBQXBCLEdBQ0EsT0FBT0QsQ0FBUDtBQUNEOztRQUVPL0IsUSxHQUFBQSxROzs7Ozs7O0FDaktLOzs7Ozs7Ozs7QUFFYjs7OztBQUNBOzs7O0FBRUEsSUFBTWlDLG1CQUFvQixZQUFZO0FBQ3BDLE1BQUlDLFdBQVcsQ0FBQyxRQUFELEVBQVcsS0FBWCxFQUFrQixHQUFsQixFQUF1QixJQUF2QixFQUE2QixFQUE3QixDQUFmO0FBQ0EsT0FBSyxJQUFJckUsSUFBRSxDQUFYLEVBQWNBLElBQUlxRSxTQUFTMUksTUFBM0IsRUFBbUNxRSxHQUFuQyxFQUF3QztBQUN0QyxRQUFPcUUsU0FBU3JFLENBQVQsQ0FBSCx5QkFBb0M3QyxNQUF4QyxFQUFnRDtBQUM5QyxhQUFPQSxPQUFVa0gsU0FBU3JFLENBQVQsQ0FBVixzQkFBUDtBQUNEO0FBQ0Y7QUFDRCxTQUFPLEtBQVA7QUFDRCxDQVJ5QixFQUExQjs7QUFVQSxJQUFNc0UsV0FBVyxTQUFYQSxRQUFXLENBQUNDLEVBQUQsRUFBSzlHLElBQUwsRUFBYztBQUM3QjhHLEtBQUdDLElBQUgsQ0FBUS9HLElBQVIsRUFBY3NDLEtBQWQsQ0FBb0IsR0FBcEIsRUFBeUIwRSxPQUF6QixDQUFpQyxjQUFNO0FBQ3JDLGdDQUFNL0csRUFBTixFQUFhRCxTQUFTLE9BQVQsR0FBbUIsU0FBbkIsR0FBK0IsZ0JBQTVDLEVBQWlFQSxJQUFqRSxrQkFBb0YsQ0FBQzhHLEVBQUQsQ0FBcEY7QUFDRCxHQUZEO0FBR0QsQ0FKRDs7QUFNQSxJQUFJRyxXQUFXO0FBQ2JDLGFBQVc7QUFDVEMsV0FBTyxFQURFO0FBRVRDLFlBQVE7QUFGQyxHQURFO0FBS2JDLGdCQUFjO0FBTEQsQ0FBZjs7QUFRQUosU0FBU0MsU0FBVCxDQUFtQkMsS0FBbkIsR0FBNEI7QUFDMUJHLGdCQUFjLHdCQUFXO0FBQ3ZCVCxhQUFTLHNCQUFFLElBQUYsQ0FBVCxFQUFrQixNQUFsQjtBQUNELEdBSHlCO0FBSTFCVSxpQkFBZSx5QkFBVztBQUN4QixRQUFJdEgsS0FBSyxzQkFBRSxJQUFGLEVBQVE4RyxJQUFSLENBQWEsT0FBYixDQUFUO0FBQ0EsUUFBSTlHLEVBQUosRUFBUTtBQUNONEcsZUFBUyxzQkFBRSxJQUFGLENBQVQsRUFBa0IsT0FBbEI7QUFDRCxLQUZELE1BR0s7QUFDSCw0QkFBRSxJQUFGLEVBQVFoRSxPQUFSLENBQWdCLGtCQUFoQjtBQUNEO0FBQ0YsR0FaeUI7QUFhMUIyRSxrQkFBZ0IsMEJBQVc7QUFDekIsUUFBSXZILEtBQUssc0JBQUUsSUFBRixFQUFROEcsSUFBUixDQUFhLFFBQWIsQ0FBVDtBQUNBLFFBQUk5RyxFQUFKLEVBQVE7QUFDTjRHLGVBQVMsc0JBQUUsSUFBRixDQUFULEVBQWtCLFFBQWxCO0FBQ0QsS0FGRCxNQUVPO0FBQ0wsNEJBQUUsSUFBRixFQUFRaEUsT0FBUixDQUFnQixtQkFBaEI7QUFDRDtBQUNGLEdBcEJ5QjtBQXFCMUI0RSxxQkFBbUIsMkJBQVNDLENBQVQsRUFBWTtBQUM3QkEsTUFBRUMsZUFBRjtBQUNBLFFBQUlDLFlBQVksc0JBQUUsSUFBRixFQUFRYixJQUFSLENBQWEsVUFBYixDQUFoQjs7QUFFQSxRQUFHYSxjQUFjLEVBQWpCLEVBQW9CO0FBQ2xCQyw2QkFBT0MsVUFBUCxDQUFrQixzQkFBRSxJQUFGLENBQWxCLEVBQTJCRixTQUEzQixFQUFzQyxZQUFXO0FBQy9DLDhCQUFFLElBQUYsRUFBUS9FLE9BQVIsQ0FBZ0IsV0FBaEI7QUFDRCxPQUZEO0FBR0QsS0FKRCxNQUlLO0FBQ0gsNEJBQUUsSUFBRixFQUFRa0YsT0FBUixHQUFrQmxGLE9BQWxCLENBQTBCLFdBQTFCO0FBQ0Q7QUFDRixHQWhDeUI7QUFpQzFCbUYsdUJBQXFCLCtCQUFXO0FBQzlCLFFBQUkvSCxLQUFLLHNCQUFFLElBQUYsRUFBUThHLElBQVIsQ0FBYSxjQUFiLENBQVQ7QUFDQSxnQ0FBTTlHLEVBQU4sRUFBWWIsY0FBWixDQUEyQixtQkFBM0IsRUFBZ0QsQ0FBQyxzQkFBRSxJQUFGLENBQUQsQ0FBaEQ7QUFDRDtBQXBDeUIsQ0FBNUI7O0FBdUNBO0FBQ0E2SCxTQUFTSSxZQUFULENBQXNCWSxlQUF0QixHQUF3QyxVQUFDdEosS0FBRCxFQUFXO0FBQ2pEQSxRQUFNOEQsR0FBTixDQUFVLGtCQUFWLEVBQThCd0UsU0FBU0MsU0FBVCxDQUFtQkMsS0FBbkIsQ0FBeUJHLFlBQXZEO0FBQ0EzSSxRQUFNK0QsRUFBTixDQUFTLGtCQUFULEVBQTZCLGFBQTdCLEVBQTRDdUUsU0FBU0MsU0FBVCxDQUFtQkMsS0FBbkIsQ0FBeUJHLFlBQXJFO0FBQ0QsQ0FIRDs7QUFLQTtBQUNBO0FBQ0FMLFNBQVNJLFlBQVQsQ0FBc0JhLGdCQUF0QixHQUF5QyxVQUFDdkosS0FBRCxFQUFXO0FBQ2xEQSxRQUFNOEQsR0FBTixDQUFVLGtCQUFWLEVBQThCd0UsU0FBU0MsU0FBVCxDQUFtQkMsS0FBbkIsQ0FBeUJJLGFBQXZEO0FBQ0E1SSxRQUFNK0QsRUFBTixDQUFTLGtCQUFULEVBQTZCLGNBQTdCLEVBQTZDdUUsU0FBU0MsU0FBVCxDQUFtQkMsS0FBbkIsQ0FBeUJJLGFBQXRFO0FBQ0QsQ0FIRDs7QUFLQTtBQUNBTixTQUFTSSxZQUFULENBQXNCYyxpQkFBdEIsR0FBMEMsVUFBQ3hKLEtBQUQsRUFBVztBQUNuREEsUUFBTThELEdBQU4sQ0FBVSxrQkFBVixFQUE4QndFLFNBQVNDLFNBQVQsQ0FBbUJDLEtBQW5CLENBQXlCSyxjQUF2RDtBQUNBN0ksUUFBTStELEVBQU4sQ0FBUyxrQkFBVCxFQUE2QixlQUE3QixFQUE4Q3VFLFNBQVNDLFNBQVQsQ0FBbUJDLEtBQW5CLENBQXlCSyxjQUF2RTtBQUNELENBSEQ7O0FBS0E7QUFDQVAsU0FBU0ksWUFBVCxDQUFzQmUsb0JBQXRCLEdBQTZDLFVBQUN6SixLQUFELEVBQVc7QUFDdERBLFFBQU04RCxHQUFOLENBQVUsa0JBQVYsRUFBOEJ3RSxTQUFTQyxTQUFULENBQW1CQyxLQUFuQixDQUF5Qk0saUJBQXZEO0FBQ0E5SSxRQUFNK0QsRUFBTixDQUFTLGtCQUFULEVBQTZCLG1DQUE3QixFQUFrRXVFLFNBQVNDLFNBQVQsQ0FBbUJDLEtBQW5CLENBQXlCTSxpQkFBM0Y7QUFDRCxDQUhEOztBQUtBO0FBQ0FSLFNBQVNJLFlBQVQsQ0FBc0JnQixzQkFBdEIsR0FBK0MsVUFBQzFKLEtBQUQsRUFBVztBQUN4REEsUUFBTThELEdBQU4sQ0FBVSxrQ0FBVixFQUE4Q3dFLFNBQVNDLFNBQVQsQ0FBbUJDLEtBQW5CLENBQXlCYSxtQkFBdkU7QUFDQXJKLFFBQU0rRCxFQUFOLENBQVMsa0NBQVQsRUFBNkMscUJBQTdDLEVBQW9FdUUsU0FBU0MsU0FBVCxDQUFtQkMsS0FBbkIsQ0FBeUJhLG1CQUE3RjtBQUNELENBSEQ7O0FBT0E7QUFDQWYsU0FBU0MsU0FBVCxDQUFtQkUsTUFBbkIsR0FBNkI7QUFDM0JrQixrQkFBZ0Isd0JBQVNDLE1BQVQsRUFBaUI7QUFDL0IsUUFBRyxDQUFDNUIsZ0JBQUosRUFBcUI7QUFBQztBQUNwQjRCLGFBQU9DLElBQVAsQ0FBWSxZQUFVO0FBQ3BCLDhCQUFFLElBQUYsRUFBUXBKLGNBQVIsQ0FBdUIscUJBQXZCO0FBQ0QsT0FGRDtBQUdEO0FBQ0Q7QUFDQW1KLFdBQU92SyxJQUFQLENBQVksYUFBWixFQUEyQixRQUEzQjtBQUNELEdBVDBCO0FBVTNCeUssa0JBQWdCLHdCQUFTRixNQUFULEVBQWlCO0FBQy9CLFFBQUcsQ0FBQzVCLGdCQUFKLEVBQXFCO0FBQUM7QUFDcEI0QixhQUFPQyxJQUFQLENBQVksWUFBVTtBQUNwQiw4QkFBRSxJQUFGLEVBQVFwSixjQUFSLENBQXVCLHFCQUF2QjtBQUNELE9BRkQ7QUFHRDtBQUNEO0FBQ0FtSixXQUFPdkssSUFBUCxDQUFZLGFBQVosRUFBMkIsUUFBM0I7QUFDRCxHQWxCMEI7QUFtQjNCMEssbUJBQWlCLHlCQUFTaEIsQ0FBVCxFQUFZaUIsUUFBWixFQUFxQjtBQUNwQyxRQUFJQyxTQUFTbEIsRUFBRXZKLFNBQUYsQ0FBWW1FLEtBQVosQ0FBa0IsR0FBbEIsRUFBdUIsQ0FBdkIsQ0FBYjtBQUNBLFFBQUl1RyxVQUFVLGlDQUFXRCxNQUFYLFFBQXNCRSxHQUF0QixzQkFBNkNILFFBQTdDLFFBQWQ7O0FBRUFFLFlBQVFMLElBQVIsQ0FBYSxZQUFVO0FBQ3JCLFVBQUlPLFFBQVEsc0JBQUUsSUFBRixDQUFaO0FBQ0FBLFlBQU0zSixjQUFOLENBQXFCLGtCQUFyQixFQUF5QyxDQUFDMkosS0FBRCxDQUF6QztBQUNELEtBSEQ7QUFJRDs7QUFHSDtBQTlCNkIsQ0FBN0IsQ0ErQkE5QixTQUFTSSxZQUFULENBQXNCMkIsa0JBQXRCLEdBQTJDLFVBQVNDLFVBQVQsRUFBcUI7QUFDOUQsTUFBSUMsWUFBWSxzQkFBRSxpQkFBRixDQUFoQjtBQUFBLE1BQ0lDLFlBQVksQ0FBQyxVQUFELEVBQWEsU0FBYixFQUF3QixRQUF4QixDQURoQjs7QUFHQSxNQUFHRixVQUFILEVBQWM7QUFDWixRQUFHLE9BQU9BLFVBQVAsS0FBc0IsUUFBekIsRUFBa0M7QUFDaENFLGdCQUFVeEgsSUFBVixDQUFlc0gsVUFBZjtBQUNELEtBRkQsTUFFTSxJQUFHLFFBQU9BLFVBQVAseUNBQU9BLFVBQVAsT0FBc0IsUUFBdEIsSUFBa0MsT0FBT0EsV0FBVyxDQUFYLENBQVAsS0FBeUIsUUFBOUQsRUFBdUU7QUFDM0VFLGdCQUFVQyxNQUFWLENBQWlCSCxVQUFqQjtBQUNELEtBRkssTUFFRDtBQUNIN0QsY0FBUWlFLEtBQVIsQ0FBYyw4QkFBZDtBQUNEO0FBQ0Y7QUFDRCxNQUFHSCxVQUFVaEwsTUFBYixFQUFvQjtBQUNsQixRQUFJb0wsWUFBWUgsVUFBVUksR0FBVixDQUFjLFVBQUMzSCxJQUFELEVBQVU7QUFDdEMsNkJBQXFCQSxJQUFyQjtBQUNELEtBRmUsRUFFYjRILElBRmEsQ0FFUixHQUZRLENBQWhCOztBQUlBLDBCQUFFOUosTUFBRixFQUFVK0MsR0FBVixDQUFjNkcsU0FBZCxFQUF5QjVHLEVBQXpCLENBQTRCNEcsU0FBNUIsRUFBdUNyQyxTQUFTQyxTQUFULENBQW1CRSxNQUFuQixDQUEwQnNCLGVBQWpFO0FBQ0Q7QUFDRixDQXBCRDs7QUFzQkEsU0FBU2Usc0JBQVQsQ0FBZ0NDLFFBQWhDLEVBQTBDN0csT0FBMUMsRUFBbUQ4RyxRQUFuRCxFQUE2RDtBQUMzRCxNQUFJQyxjQUFKO0FBQUEsTUFBV0MsT0FBT3JHLE1BQU1zRyxTQUFOLENBQWdCckwsS0FBaEIsQ0FBc0JzTCxJQUF0QixDQUEyQkMsU0FBM0IsRUFBc0MsQ0FBdEMsQ0FBbEI7QUFDQSx3QkFBRXRLLE1BQUYsRUFBVStDLEdBQVYsQ0FBY0ksT0FBZCxFQUF1QkgsRUFBdkIsQ0FBMEJHLE9BQTFCLEVBQW1DLFVBQVM2RSxDQUFULEVBQVk7QUFDN0MsUUFBSWtDLEtBQUosRUFBVztBQUFFSyxtQkFBYUwsS0FBYjtBQUFzQjtBQUNuQ0EsWUFBUXpLLFdBQVcsWUFBVTtBQUMzQndLLGVBQVNqRSxLQUFULENBQWUsSUFBZixFQUFxQm1FLElBQXJCO0FBQ0QsS0FGTyxFQUVMSCxZQUFZLEVBRlAsQ0FBUixDQUY2QyxDQUkxQjtBQUNwQixHQUxEO0FBTUQ7O0FBRUR6QyxTQUFTSSxZQUFULENBQXNCNkMsaUJBQXRCLEdBQTBDLFVBQVNSLFFBQVQsRUFBa0I7QUFDMUQsTUFBSW5CLFNBQVMsc0JBQUUsZUFBRixDQUFiO0FBQ0EsTUFBR0EsT0FBT3JLLE1BQVYsRUFBaUI7QUFDZnVMLDJCQUF1QkMsUUFBdkIsRUFBaUMsbUJBQWpDLEVBQXNEekMsU0FBU0MsU0FBVCxDQUFtQkUsTUFBbkIsQ0FBMEJrQixjQUFoRixFQUFnR0MsTUFBaEc7QUFDRDtBQUNGLENBTEQ7O0FBT0F0QixTQUFTSSxZQUFULENBQXNCOEMsaUJBQXRCLEdBQTBDLFVBQVNULFFBQVQsRUFBa0I7QUFDMUQsTUFBSW5CLFNBQVMsc0JBQUUsZUFBRixDQUFiO0FBQ0EsTUFBR0EsT0FBT3JLLE1BQVYsRUFBaUI7QUFDZnVMLDJCQUF1QkMsUUFBdkIsRUFBaUMsbUJBQWpDLEVBQXNEekMsU0FBU0MsU0FBVCxDQUFtQkUsTUFBbkIsQ0FBMEJxQixjQUFoRixFQUFnR0YsTUFBaEc7QUFDRDtBQUNGLENBTEQ7O0FBT0F0QixTQUFTSSxZQUFULENBQXNCK0MseUJBQXRCLEdBQWtELFVBQVN6TCxLQUFULEVBQWdCO0FBQ2hFLE1BQUcsQ0FBQ2dJLGdCQUFKLEVBQXFCO0FBQUUsV0FBTyxLQUFQO0FBQWU7QUFDdEMsTUFBSTRCLFNBQVM1SixNQUFNbUYsSUFBTixDQUFXLDZDQUFYLENBQWI7O0FBRUE7QUFDQSxNQUFJdUcsNEJBQTRCLFNBQTVCQSx5QkFBNEIsQ0FBVUMsbUJBQVYsRUFBK0I7QUFDN0QsUUFBSUMsVUFBVSxzQkFBRUQsb0JBQW9CLENBQXBCLEVBQXVCbEUsTUFBekIsQ0FBZDs7QUFFQTtBQUNBLFlBQVFrRSxvQkFBb0IsQ0FBcEIsRUFBdUJ0SyxJQUEvQjtBQUNFLFdBQUssWUFBTDtBQUNFLFlBQUl1SyxRQUFRdk0sSUFBUixDQUFhLGFBQWIsTUFBZ0MsUUFBaEMsSUFBNENzTSxvQkFBb0IsQ0FBcEIsRUFBdUJFLGFBQXZCLEtBQXlDLGFBQXpGLEVBQXdHO0FBQ3RHRCxrQkFBUW5MLGNBQVIsQ0FBdUIscUJBQXZCLEVBQThDLENBQUNtTCxPQUFELEVBQVU3SyxPQUFPK0ssV0FBakIsQ0FBOUM7QUFDRDtBQUNELFlBQUlGLFFBQVF2TSxJQUFSLENBQWEsYUFBYixNQUFnQyxRQUFoQyxJQUE0Q3NNLG9CQUFvQixDQUFwQixFQUF1QkUsYUFBdkIsS0FBeUMsYUFBekYsRUFBd0c7QUFDdEdELGtCQUFRbkwsY0FBUixDQUF1QixxQkFBdkIsRUFBOEMsQ0FBQ21MLE9BQUQsQ0FBOUM7QUFDQTtBQUNGLFlBQUlELG9CQUFvQixDQUFwQixFQUF1QkUsYUFBdkIsS0FBeUMsT0FBN0MsRUFBc0Q7QUFDcERELGtCQUFRRyxPQUFSLENBQWdCLGVBQWhCLEVBQWlDMU0sSUFBakMsQ0FBc0MsYUFBdEMsRUFBb0QsUUFBcEQ7QUFDQXVNLGtCQUFRRyxPQUFSLENBQWdCLGVBQWhCLEVBQWlDdEwsY0FBakMsQ0FBZ0QscUJBQWhELEVBQXVFLENBQUNtTCxRQUFRRyxPQUFSLENBQWdCLGVBQWhCLENBQUQsQ0FBdkU7QUFDRDtBQUNEOztBQUVGLFdBQUssV0FBTDtBQUNFSCxnQkFBUUcsT0FBUixDQUFnQixlQUFoQixFQUFpQzFNLElBQWpDLENBQXNDLGFBQXRDLEVBQW9ELFFBQXBEO0FBQ0F1TSxnQkFBUUcsT0FBUixDQUFnQixlQUFoQixFQUFpQ3RMLGNBQWpDLENBQWdELHFCQUFoRCxFQUF1RSxDQUFDbUwsUUFBUUcsT0FBUixDQUFnQixlQUFoQixDQUFELENBQXZFO0FBQ0E7O0FBRUY7QUFDRSxlQUFPLEtBQVA7QUFDRjtBQXJCRjtBQXVCRCxHQTNCRDs7QUE2QkEsTUFBSW5DLE9BQU9ySyxNQUFYLEVBQW1CO0FBQ2pCO0FBQ0EsU0FBSyxJQUFJcUUsSUFBSSxDQUFiLEVBQWdCQSxLQUFLZ0csT0FBT3JLLE1BQVAsR0FBZ0IsQ0FBckMsRUFBd0NxRSxHQUF4QyxFQUE2QztBQUMzQyxVQUFJb0ksa0JBQWtCLElBQUloRSxnQkFBSixDQUFxQjBELHlCQUFyQixDQUF0QjtBQUNBTSxzQkFBZ0JDLE9BQWhCLENBQXdCckMsT0FBT2hHLENBQVAsQ0FBeEIsRUFBbUMsRUFBRXNJLFlBQVksSUFBZCxFQUFvQkMsV0FBVyxJQUEvQixFQUFxQ0MsZUFBZSxLQUFwRCxFQUEyREMsU0FBUyxJQUFwRSxFQUEwRUMsaUJBQWlCLENBQUMsYUFBRCxFQUFnQixPQUFoQixDQUEzRixFQUFuQztBQUNEO0FBQ0Y7QUFDRixDQXpDRDs7QUEyQ0FoRSxTQUFTSSxZQUFULENBQXNCNkQsa0JBQXRCLEdBQTJDLFlBQVc7QUFDcEQsTUFBSUMsWUFBWSxzQkFBRXJNLFFBQUYsQ0FBaEI7O0FBRUFtSSxXQUFTSSxZQUFULENBQXNCWSxlQUF0QixDQUFzQ2tELFNBQXRDO0FBQ0FsRSxXQUFTSSxZQUFULENBQXNCYSxnQkFBdEIsQ0FBdUNpRCxTQUF2QztBQUNBbEUsV0FBU0ksWUFBVCxDQUFzQmMsaUJBQXRCLENBQXdDZ0QsU0FBeEM7QUFDQWxFLFdBQVNJLFlBQVQsQ0FBc0JlLG9CQUF0QixDQUEyQytDLFNBQTNDO0FBQ0FsRSxXQUFTSSxZQUFULENBQXNCZ0Isc0JBQXRCLENBQTZDOEMsU0FBN0M7QUFFRCxDQVREOztBQVdBbEUsU0FBU0ksWUFBVCxDQUFzQitELGtCQUF0QixHQUEyQyxZQUFXO0FBQ3BELE1BQUlELFlBQVksc0JBQUVyTSxRQUFGLENBQWhCO0FBQ0FtSSxXQUFTSSxZQUFULENBQXNCK0MseUJBQXRCLENBQWdEZSxTQUFoRDtBQUNBbEUsV0FBU0ksWUFBVCxDQUFzQjZDLGlCQUF0QjtBQUNBakQsV0FBU0ksWUFBVCxDQUFzQjhDLGlCQUF0QjtBQUNBbEQsV0FBU0ksWUFBVCxDQUFzQjJCLGtCQUF0QjtBQUNELENBTkQ7O0FBU0EvQixTQUFTb0UsSUFBVCxHQUFnQixVQUFTOUYsQ0FBVCxFQUFZK0YsVUFBWixFQUF3QjtBQUN0QyxNQUFJLE9BQU8vRixFQUFFZ0csbUJBQVQsS0FBa0MsV0FBdEMsRUFBbUQ7QUFDakQsUUFBSUosWUFBWTVGLEVBQUV6RyxRQUFGLENBQWhCOztBQUVBLFFBQUdBLFNBQVMwTSxVQUFULEtBQXdCLFVBQTNCLEVBQXVDO0FBQ3JDdkUsZUFBU0ksWUFBVCxDQUFzQjZELGtCQUF0QjtBQUNBakUsZUFBU0ksWUFBVCxDQUFzQitELGtCQUF0QjtBQUNELEtBSEQsTUFHTztBQUNMN0YsUUFBRTdGLE1BQUYsRUFBVWdELEVBQVYsQ0FBYSxNQUFiLEVBQXFCLFlBQU07QUFDekJ1RSxpQkFBU0ksWUFBVCxDQUFzQjZELGtCQUF0QjtBQUNBakUsaUJBQVNJLFlBQVQsQ0FBc0IrRCxrQkFBdEI7QUFDRCxPQUhEO0FBSUQ7O0FBR0Q3RixNQUFFZ0csbUJBQUYsR0FBd0IsSUFBeEI7QUFDRDs7QUFFRCxNQUFHRCxVQUFILEVBQWU7QUFDYkEsZUFBV3JFLFFBQVgsR0FBc0JBLFFBQXRCO0FBQ0E7QUFDQXFFLGVBQVdHLFFBQVgsR0FBc0J4RSxTQUFTSSxZQUFULENBQXNCK0Qsa0JBQTVDO0FBQ0Q7QUFDRixDQXZCRDs7UUF5QlFuRSxRLEdBQUFBLFE7Ozs7Ozs7QUMzUUs7Ozs7Ozs7OztBQUViOzs7O0FBQ0E7Ozs7OztBQUVBO0FBQ0E7QUFDQTtJQUNNeUUsTTtBQUVKLGtCQUFZQyxPQUFaLEVBQXFCQyxPQUFyQixFQUE4QjtBQUFBOztBQUM1QixTQUFLQyxNQUFMLENBQVlGLE9BQVosRUFBcUJDLE9BQXJCO0FBQ0EsUUFBSTNDLGFBQWE2QyxjQUFjLElBQWQsQ0FBakI7QUFDQSxTQUFLQyxJQUFMLEdBQVksaUNBQVksQ0FBWixFQUFlOUMsVUFBZixDQUFaOztBQUVBLFFBQUcsQ0FBQyxLQUFLcEYsUUFBTCxDQUFjN0YsSUFBZCxXQUEyQmlMLFVBQTNCLENBQUosRUFBNkM7QUFBRSxXQUFLcEYsUUFBTCxDQUFjN0YsSUFBZCxXQUEyQmlMLFVBQTNCLEVBQXlDLEtBQUs4QyxJQUE5QztBQUFzRDtBQUNyRyxRQUFHLENBQUMsS0FBS2xJLFFBQUwsQ0FBY2tELElBQWQsQ0FBbUIsVUFBbkIsQ0FBSixFQUFtQztBQUFFLFdBQUtsRCxRQUFMLENBQWNrRCxJQUFkLENBQW1CLFVBQW5CLEVBQStCLElBQS9CO0FBQXVDO0FBQzVFOzs7O0FBSUEsU0FBS2xELFFBQUwsQ0FBY2hCLE9BQWQsY0FBaUNvRyxVQUFqQztBQUNEOzs7OzhCQUVTO0FBQ1IsV0FBSytDLFFBQUw7QUFDQSxVQUFJL0MsYUFBYTZDLGNBQWMsSUFBZCxDQUFqQjtBQUNBLFdBQUtqSSxRQUFMLENBQWNvSSxVQUFkLFdBQWlDaEQsVUFBakMsRUFBK0NpRCxVQUEvQyxDQUEwRCxVQUExRDtBQUNJOzs7O0FBREosT0FLS3JKLE9BTEwsbUJBSzZCb0csVUFMN0I7QUFNQSxXQUFJLElBQUlrRCxJQUFSLElBQWdCLElBQWhCLEVBQXFCO0FBQ25CLGFBQUtBLElBQUwsSUFBYSxJQUFiLENBRG1CLENBQ0Q7QUFDbkI7QUFDRjs7Ozs7O0FBR0g7QUFDQTs7O0FBQ0EsU0FBU0MsU0FBVCxDQUFtQnRKLEdBQW5CLEVBQXdCO0FBQ3RCLFNBQU9BLElBQUlNLE9BQUosQ0FBWSxpQkFBWixFQUErQixPQUEvQixFQUF3Q2lKLFdBQXhDLEVBQVA7QUFDRDs7QUFFRCxTQUFTUCxhQUFULENBQXVCUSxHQUF2QixFQUE0QjtBQUMxQixNQUFHLE9BQU9BLElBQUlDLFdBQUosQ0FBZ0IzSyxJQUF2QixLQUFpQyxXQUFwQyxFQUFpRDtBQUMvQyxXQUFPd0ssVUFBVUUsSUFBSUMsV0FBSixDQUFnQjNLLElBQTFCLENBQVA7QUFDRCxHQUZELE1BRU87QUFDTCxXQUFPd0ssVUFBVUUsSUFBSUUsU0FBZCxDQUFQO0FBQ0Q7QUFDRjs7UUFFT2QsTSxHQUFBQSxNOzs7Ozs7Ozs7Ozs7Ozs7O0FDckRSOzs7O0FBRUE7Ozs7QUFRQTs7OztBQU5BaE0sT0FBTzZGLENBQVAsR0FBV0EsZ0JBQVg7O0FBRUE7O0FBRUE7QUFDQTs7O0FBR0Esc0JBQUV6RyxRQUFGLEVBQVkyTixVQUFaOztBQUVBO0FBQ0Esc0JBQUUsWUFBRixFQUFnQjFJLE1BQWhCLENBQXVCLFFBQXZCLEVBQWlDMkksUUFBakMsQ0FBMEMsWUFBMUM7QUFDQSxzQkFBRSxnQkFBRixFQUFvQjNJLE1BQXBCLENBQTJCLFFBQTNCLEVBQXFDMkksUUFBckMsQ0FBOEMsbUJBQTlDOztBQUVBLHNCQUFFLDhCQUFGLEVBQWtDaEssRUFBbEMsQ0FBcUMsT0FBckMsRUFBOEMsVUFBVXVCLEtBQVYsRUFBaUI7QUFDM0QsUUFBSTBJLFNBQVMsc0JBQUUsSUFBRixFQUFRM08sSUFBUixDQUFhLFNBQWIsQ0FBYjtBQUNBLDBCQUFFLHNCQUFGLEVBQTBCOEYsSUFBMUIsQ0FBK0IsZ0JBQS9CLEVBQWlEOEksV0FBakQsQ0FBNkQsbUJBQTdELEVBQWtGQyxJQUFsRjtBQUNBLDBCQUFFLHNCQUFGLEVBQTBCL0ksSUFBMUIsQ0FBK0IsWUFBL0IsRUFBNkM4SSxXQUE3QyxDQUF5RCxZQUF6RDtBQUNBLDBCQUFFLElBQUYsRUFBUUYsUUFBUixDQUFpQixZQUFqQjtBQUNBLDBCQUFFLGlCQUFpQkMsTUFBbkIsRUFBMkJELFFBQTNCLENBQW9DLG1CQUFwQyxFQUF5REksTUFBekQ7QUFDQSxXQUFPLEtBQVA7QUFDSCxDQVBEOztBQVNBOztBQUVBLHNCQUFFLGFBQUYsRUFBaUIvSSxNQUFqQixDQUF3QixRQUF4QixFQUFrQzJJLFFBQWxDLENBQTJDLFdBQTNDO0FBQ0Esc0JBQUUsd0NBQUYsRUFBNEMzSSxNQUE1QyxDQUFtRCxRQUFuRCxFQUE2RC9GLElBQTdELENBQWtFLGVBQWxFLEVBQW1GLElBQW5GOztBQUVBLHNCQUFFLDRCQUFGLEVBQWdDK08sS0FBaEMsQ0FBc0MsWUFBVTtBQUM1Q3hILHFCQUFFeUgsU0FBRixDQUFhLDhDQUFiLEVBQTZELFVBQVVqRyxJQUFWLEVBQWdCa0csVUFBaEIsRUFBNEJDLEtBQTVCLEVBQW9DLENBRWhHLENBRkQ7QUFHSCxDQUpEOztBQU1BLElBQUlDLHdCQUFKOztBQUVBLHNCQUFFLFlBQVU7QUFDUiwwQkFBRSw0QkFBRixFQUFnQ0osS0FBaEMsQ0FBc0MsWUFBVTtBQUM1Q0ksMEJBQWtCLHNCQUFFLElBQUYsRUFBUXBHLElBQVIsQ0FBYSxrQkFBYixDQUFsQjs7QUFFQSxZQUFJQSxPQUFPO0FBQ1BxRyxvQkFBUSx5QkFERDtBQUVQQyw0QkFBZ0JGO0FBRlQsU0FBWDtBQUlBNUgseUJBQUUrSCxJQUFGLENBQU9DLE9BQVAsRUFBZ0J4RyxJQUFoQixFQUFzQixVQUFTeUcsUUFBVCxFQUFrQjtBQUNwQyxrQ0FBRSxtQ0FBRixFQUF1Q0MsSUFBdkMsQ0FBNENELFFBQTVDO0FBQ0gsU0FGRDtBQUdILEtBVkQ7QUFXSCxDQVpEOztBQWNBLHNCQUFFLDJCQUFGLEVBQStCOUssRUFBL0IsQ0FBa0MsT0FBbEMsRUFBMEMsR0FBMUMsRUFBK0MsVUFBVXVCLEtBQVYsRUFBaUI7QUFDNURBLFVBQU1vQyxjQUFOLEdBRDRELENBQ3BDO0FBQ3hCLFFBQUlwRyxLQUFNLHNCQUFFLElBQUYsRUFBUWpDLElBQVIsQ0FBYSxNQUFiLENBQVY7QUFBQSxRQUFnQztBQUM1QjBQLFVBQU0sc0JBQUV6TixFQUFGLEVBQU0wTixNQUFOLEdBQWVELEdBRHpCLENBRjRELENBRzlCO0FBQzlCLDBCQUFFLFdBQUYsRUFBZUUsT0FBZixDQUF1QixFQUFDQyxXQUFXSCxHQUFaLEVBQXZCLEVBQXlDLElBQXpDLEVBSjRELENBSVo7QUFDbkQsQ0FMRDs7QUFPQSxzQkFBRSxpQkFBRixFQUFxQkksUUFBckIsQ0FBOEI7QUFDMUJDLFdBQU87QUFEbUIsQ0FBOUI7O0FBSUE7QUFDQXJPLE9BQU9zTyxNQUFQLEdBQWdCLFlBQVk7QUFDeEJsUCxhQUFTbVAsSUFBVCxDQUFjQyxTQUFkLENBQXdCQyxHQUF4QixDQUE0QixlQUE1QjtBQUNBek8sV0FBT1AsVUFBUCxDQUFrQixZQUFZO0FBQzFCTCxpQkFBU21QLElBQVQsQ0FBY0MsU0FBZCxDQUF3QkMsR0FBeEIsQ0FBNEIsUUFBNUI7QUFDQXJQLGlCQUFTbVAsSUFBVCxDQUFjQyxTQUFkLENBQXdCRSxNQUF4QixDQUErQixlQUEvQjtBQUNILEtBSEQsRUFHRyxJQUhIO0FBSUgsQ0FORCxDOzs7Ozs7QUNsRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLElBQXlEO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELG9DQUFvQztBQUNwQztBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSx3Q0FBd0M7QUFDeEM7QUFDQTtBQUNBO0FBQ0EsTUFBTTs7QUFFTjtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLGdCQUFnQjs7QUFFdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7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aGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA2KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBkN2VlNGZjMzJlYWUzNzc0ZjY2MyIsIm1vZHVsZS5leHBvcnRzID0galF1ZXJ5O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwialF1ZXJ5XCJcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5cbi8vIENvcmUgRm91bmRhdGlvbiBVdGlsaXRpZXMsIHV0aWxpemVkIGluIGEgbnVtYmVyIG9mIHBsYWNlcy5cblxuICAvKipcbiAgICogUmV0dXJucyBhIGJvb2xlYW4gZm9yIFJUTCBzdXBwb3J0XG4gICAqL1xuZnVuY3Rpb24gcnRsKCkge1xuICByZXR1cm4gJCgnaHRtbCcpLmF0dHIoJ2RpcicpID09PSAncnRsJztcbn1cblxuLyoqXG4gKiByZXR1cm5zIGEgcmFuZG9tIGJhc2UtMzYgdWlkIHdpdGggbmFtZXNwYWNpbmdcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtOdW1iZXJ9IGxlbmd0aCAtIG51bWJlciBvZiByYW5kb20gYmFzZS0zNiBkaWdpdHMgZGVzaXJlZC4gSW5jcmVhc2UgZm9yIG1vcmUgcmFuZG9tIHN0cmluZ3MuXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlIC0gbmFtZSBvZiBwbHVnaW4gdG8gYmUgaW5jb3Jwb3JhdGVkIGluIHVpZCwgb3B0aW9uYWwuXG4gKiBAZGVmYXVsdCB7U3RyaW5nfSAnJyAtIGlmIG5vIHBsdWdpbiBuYW1lIGlzIHByb3ZpZGVkLCBub3RoaW5nIGlzIGFwcGVuZGVkIHRvIHRoZSB1aWQuXG4gKiBAcmV0dXJucyB7U3RyaW5nfSAtIHVuaXF1ZSBpZFxuICovXG5mdW5jdGlvbiBHZXRZb0RpZ2l0cyhsZW5ndGgsIG5hbWVzcGFjZSl7XG4gIGxlbmd0aCA9IGxlbmd0aCB8fCA2O1xuICByZXR1cm4gTWF0aC5yb3VuZCgoTWF0aC5wb3coMzYsIGxlbmd0aCArIDEpIC0gTWF0aC5yYW5kb20oKSAqIE1hdGgucG93KDM2LCBsZW5ndGgpKSkudG9TdHJpbmcoMzYpLnNsaWNlKDEpICsgKG5hbWVzcGFjZSA/IGAtJHtuYW1lc3BhY2V9YCA6ICcnKTtcbn1cblxuZnVuY3Rpb24gdHJhbnNpdGlvbmVuZCgkZWxlbSl7XG4gIHZhciB0cmFuc2l0aW9ucyA9IHtcbiAgICAndHJhbnNpdGlvbic6ICd0cmFuc2l0aW9uZW5kJyxcbiAgICAnV2Via2l0VHJhbnNpdGlvbic6ICd3ZWJraXRUcmFuc2l0aW9uRW5kJyxcbiAgICAnTW96VHJhbnNpdGlvbic6ICd0cmFuc2l0aW9uZW5kJyxcbiAgICAnT1RyYW5zaXRpb24nOiAnb3RyYW5zaXRpb25lbmQnXG4gIH07XG4gIHZhciBlbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXG4gICAgICBlbmQ7XG5cbiAgZm9yICh2YXIgdCBpbiB0cmFuc2l0aW9ucyl7XG4gICAgaWYgKHR5cGVvZiBlbGVtLnN0eWxlW3RdICE9PSAndW5kZWZpbmVkJyl7XG4gICAgICBlbmQgPSB0cmFuc2l0aW9uc1t0XTtcbiAgICB9XG4gIH1cbiAgaWYoZW5kKXtcbiAgICByZXR1cm4gZW5kO1xuICB9ZWxzZXtcbiAgICBlbmQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAkZWxlbS50cmlnZ2VySGFuZGxlcigndHJhbnNpdGlvbmVuZCcsIFskZWxlbV0pO1xuICAgIH0sIDEpO1xuICAgIHJldHVybiAndHJhbnNpdGlvbmVuZCc7XG4gIH1cbn1cblxuZXhwb3J0IHtydGwsIEdldFlvRGlnaXRzLCB0cmFuc2l0aW9uZW5kfTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24udXRpbC5jb3JlLmpzIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuXG4vLyBEZWZhdWx0IHNldCBvZiBtZWRpYSBxdWVyaWVzXG5jb25zdCBkZWZhdWx0UXVlcmllcyA9IHtcbiAgJ2RlZmF1bHQnIDogJ29ubHkgc2NyZWVuJyxcbiAgbGFuZHNjYXBlIDogJ29ubHkgc2NyZWVuIGFuZCAob3JpZW50YXRpb246IGxhbmRzY2FwZSknLFxuICBwb3J0cmFpdCA6ICdvbmx5IHNjcmVlbiBhbmQgKG9yaWVudGF0aW9uOiBwb3J0cmFpdCknLFxuICByZXRpbmEgOiAnb25seSBzY3JlZW4gYW5kICgtd2Via2l0LW1pbi1kZXZpY2UtcGl4ZWwtcmF0aW86IDIpLCcgK1xuICAgICdvbmx5IHNjcmVlbiBhbmQgKG1pbi0tbW96LWRldmljZS1waXhlbC1yYXRpbzogMiksJyArXG4gICAgJ29ubHkgc2NyZWVuIGFuZCAoLW8tbWluLWRldmljZS1waXhlbC1yYXRpbzogMi8xKSwnICtcbiAgICAnb25seSBzY3JlZW4gYW5kIChtaW4tZGV2aWNlLXBpeGVsLXJhdGlvOiAyKSwnICtcbiAgICAnb25seSBzY3JlZW4gYW5kIChtaW4tcmVzb2x1dGlvbjogMTkyZHBpKSwnICtcbiAgICAnb25seSBzY3JlZW4gYW5kIChtaW4tcmVzb2x1dGlvbjogMmRwcHgpJ1xuICB9O1xuXG5cbi8vIG1hdGNoTWVkaWEoKSBwb2x5ZmlsbCAtIFRlc3QgYSBDU1MgbWVkaWEgdHlwZS9xdWVyeSBpbiBKUy5cbi8vIEF1dGhvcnMgJiBjb3B5cmlnaHQgKGMpIDIwMTI6IFNjb3R0IEplaGwsIFBhdWwgSXJpc2gsIE5pY2hvbGFzIFpha2FzLCBEYXZpZCBLbmlnaHQuIER1YWwgTUlUL0JTRCBsaWNlbnNlXG5sZXQgbWF0Y2hNZWRpYSA9IHdpbmRvdy5tYXRjaE1lZGlhIHx8IChmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIC8vIEZvciBicm93c2VycyB0aGF0IHN1cHBvcnQgbWF0Y2hNZWRpdW0gYXBpIHN1Y2ggYXMgSUUgOSBhbmQgd2Via2l0XG4gIHZhciBzdHlsZU1lZGlhID0gKHdpbmRvdy5zdHlsZU1lZGlhIHx8IHdpbmRvdy5tZWRpYSk7XG5cbiAgLy8gRm9yIHRob3NlIHRoYXQgZG9uJ3Qgc3VwcG9ydCBtYXRjaE1lZGl1bVxuICBpZiAoIXN0eWxlTWVkaWEpIHtcbiAgICB2YXIgc3R5bGUgICA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyksXG4gICAgc2NyaXB0ICAgICAgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2NyaXB0JylbMF0sXG4gICAgaW5mbyAgICAgICAgPSBudWxsO1xuXG4gICAgc3R5bGUudHlwZSAgPSAndGV4dC9jc3MnO1xuICAgIHN0eWxlLmlkICAgID0gJ21hdGNobWVkaWFqcy10ZXN0JztcblxuICAgIHNjcmlwdCAmJiBzY3JpcHQucGFyZW50Tm9kZSAmJiBzY3JpcHQucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoc3R5bGUsIHNjcmlwdCk7XG5cbiAgICAvLyAnc3R5bGUuY3VycmVudFN0eWxlJyBpcyB1c2VkIGJ5IElFIDw9IDggYW5kICd3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZScgZm9yIGFsbCBvdGhlciBicm93c2Vyc1xuICAgIGluZm8gPSAoJ2dldENvbXB1dGVkU3R5bGUnIGluIHdpbmRvdykgJiYgd2luZG93LmdldENvbXB1dGVkU3R5bGUoc3R5bGUsIG51bGwpIHx8IHN0eWxlLmN1cnJlbnRTdHlsZTtcblxuICAgIHN0eWxlTWVkaWEgPSB7XG4gICAgICBtYXRjaE1lZGl1bShtZWRpYSkge1xuICAgICAgICB2YXIgdGV4dCA9IGBAbWVkaWEgJHttZWRpYX17ICNtYXRjaG1lZGlhanMtdGVzdCB7IHdpZHRoOiAxcHg7IH0gfWA7XG5cbiAgICAgICAgLy8gJ3N0eWxlLnN0eWxlU2hlZXQnIGlzIHVzZWQgYnkgSUUgPD0gOCBhbmQgJ3N0eWxlLnRleHRDb250ZW50JyBmb3IgYWxsIG90aGVyIGJyb3dzZXJzXG4gICAgICAgIGlmIChzdHlsZS5zdHlsZVNoZWV0KSB7XG4gICAgICAgICAgc3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gdGV4dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzdHlsZS50ZXh0Q29udGVudCA9IHRleHQ7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBUZXN0IGlmIG1lZGlhIHF1ZXJ5IGlzIHRydWUgb3IgZmFsc2VcbiAgICAgICAgcmV0dXJuIGluZm8ud2lkdGggPT09ICcxcHgnO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbihtZWRpYSkge1xuICAgIHJldHVybiB7XG4gICAgICBtYXRjaGVzOiBzdHlsZU1lZGlhLm1hdGNoTWVkaXVtKG1lZGlhIHx8ICdhbGwnKSxcbiAgICAgIG1lZGlhOiBtZWRpYSB8fCAnYWxsJ1xuICAgIH07XG4gIH1cbn0pKCk7XG5cbnZhciBNZWRpYVF1ZXJ5ID0ge1xuICBxdWVyaWVzOiBbXSxcblxuICBjdXJyZW50OiAnJyxcblxuICAvKipcbiAgICogSW5pdGlhbGl6ZXMgdGhlIG1lZGlhIHF1ZXJ5IGhlbHBlciwgYnkgZXh0cmFjdGluZyB0aGUgYnJlYWtwb2ludCBsaXN0IGZyb20gdGhlIENTUyBhbmQgYWN0aXZhdGluZyB0aGUgYnJlYWtwb2ludCB3YXRjaGVyLlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9pbml0KCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB2YXIgJG1ldGEgPSAkKCdtZXRhLmZvdW5kYXRpb24tbXEnKTtcbiAgICBpZighJG1ldGEubGVuZ3RoKXtcbiAgICAgICQoJzxtZXRhIGNsYXNzPVwiZm91bmRhdGlvbi1tcVwiPicpLmFwcGVuZFRvKGRvY3VtZW50LmhlYWQpO1xuICAgIH1cblxuICAgIHZhciBleHRyYWN0ZWRTdHlsZXMgPSAkKCcuZm91bmRhdGlvbi1tcScpLmNzcygnZm9udC1mYW1pbHknKTtcbiAgICB2YXIgbmFtZWRRdWVyaWVzO1xuXG4gICAgbmFtZWRRdWVyaWVzID0gcGFyc2VTdHlsZVRvT2JqZWN0KGV4dHJhY3RlZFN0eWxlcyk7XG5cbiAgICBmb3IgKHZhciBrZXkgaW4gbmFtZWRRdWVyaWVzKSB7XG4gICAgICBpZihuYW1lZFF1ZXJpZXMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICBzZWxmLnF1ZXJpZXMucHVzaCh7XG4gICAgICAgICAgbmFtZToga2V5LFxuICAgICAgICAgIHZhbHVlOiBgb25seSBzY3JlZW4gYW5kIChtaW4td2lkdGg6ICR7bmFtZWRRdWVyaWVzW2tleV19KWBcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5jdXJyZW50ID0gdGhpcy5fZ2V0Q3VycmVudFNpemUoKTtcblxuICAgIHRoaXMuX3dhdGNoZXIoKTtcbiAgfSxcblxuICAvKipcbiAgICogQ2hlY2tzIGlmIHRoZSBzY3JlZW4gaXMgYXQgbGVhc3QgYXMgd2lkZSBhcyBhIGJyZWFrcG9pbnQuXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcGFyYW0ge1N0cmluZ30gc2l6ZSAtIE5hbWUgb2YgdGhlIGJyZWFrcG9pbnQgdG8gY2hlY2suXG4gICAqIEByZXR1cm5zIHtCb29sZWFufSBgdHJ1ZWAgaWYgdGhlIGJyZWFrcG9pbnQgbWF0Y2hlcywgYGZhbHNlYCBpZiBpdCdzIHNtYWxsZXIuXG4gICAqL1xuICBhdExlYXN0KHNpemUpIHtcbiAgICB2YXIgcXVlcnkgPSB0aGlzLmdldChzaXplKTtcblxuICAgIGlmIChxdWVyeSkge1xuICAgICAgcmV0dXJuIG1hdGNoTWVkaWEocXVlcnkpLm1hdGNoZXM7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9LFxuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgdGhlIHNjcmVlbiBtYXRjaGVzIHRvIGEgYnJlYWtwb2ludC5cbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBzaXplIC0gTmFtZSBvZiB0aGUgYnJlYWtwb2ludCB0byBjaGVjaywgZWl0aGVyICdzbWFsbCBvbmx5JyBvciAnc21hbGwnLiBPbWl0dGluZyAnb25seScgZmFsbHMgYmFjayB0byB1c2luZyBhdExlYXN0KCkgbWV0aG9kLlxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gYHRydWVgIGlmIHRoZSBicmVha3BvaW50IG1hdGNoZXMsIGBmYWxzZWAgaWYgaXQgZG9lcyBub3QuXG4gICAqL1xuICBpcyhzaXplKSB7XG4gICAgc2l6ZSA9IHNpemUudHJpbSgpLnNwbGl0KCcgJyk7XG4gICAgaWYoc2l6ZS5sZW5ndGggPiAxICYmIHNpemVbMV0gPT09ICdvbmx5Jykge1xuICAgICAgaWYoc2l6ZVswXSA9PT0gdGhpcy5fZ2V0Q3VycmVudFNpemUoKSkgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmF0TGVhc3Qoc2l6ZVswXSk7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfSxcblxuICAvKipcbiAgICogR2V0cyB0aGUgbWVkaWEgcXVlcnkgb2YgYSBicmVha3BvaW50LlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHBhcmFtIHtTdHJpbmd9IHNpemUgLSBOYW1lIG9mIHRoZSBicmVha3BvaW50IHRvIGdldC5cbiAgICogQHJldHVybnMge1N0cmluZ3xudWxsfSAtIFRoZSBtZWRpYSBxdWVyeSBvZiB0aGUgYnJlYWtwb2ludCwgb3IgYG51bGxgIGlmIHRoZSBicmVha3BvaW50IGRvZXNuJ3QgZXhpc3QuXG4gICAqL1xuICBnZXQoc2l6ZSkge1xuICAgIGZvciAodmFyIGkgaW4gdGhpcy5xdWVyaWVzKSB7XG4gICAgICBpZih0aGlzLnF1ZXJpZXMuaGFzT3duUHJvcGVydHkoaSkpIHtcbiAgICAgICAgdmFyIHF1ZXJ5ID0gdGhpcy5xdWVyaWVzW2ldO1xuICAgICAgICBpZiAoc2l6ZSA9PT0gcXVlcnkubmFtZSkgcmV0dXJuIHF1ZXJ5LnZhbHVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9LFxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBjdXJyZW50IGJyZWFrcG9pbnQgbmFtZSBieSB0ZXN0aW5nIGV2ZXJ5IGJyZWFrcG9pbnQgYW5kIHJldHVybmluZyB0aGUgbGFzdCBvbmUgdG8gbWF0Y2ggKHRoZSBiaWdnZXN0IG9uZSkuXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcmV0dXJucyB7U3RyaW5nfSBOYW1lIG9mIHRoZSBjdXJyZW50IGJyZWFrcG9pbnQuXG4gICAqL1xuICBfZ2V0Q3VycmVudFNpemUoKSB7XG4gICAgdmFyIG1hdGNoZWQ7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucXVlcmllcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHF1ZXJ5ID0gdGhpcy5xdWVyaWVzW2ldO1xuXG4gICAgICBpZiAobWF0Y2hNZWRpYShxdWVyeS52YWx1ZSkubWF0Y2hlcykge1xuICAgICAgICBtYXRjaGVkID0gcXVlcnk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBtYXRjaGVkID09PSAnb2JqZWN0Jykge1xuICAgICAgcmV0dXJuIG1hdGNoZWQubmFtZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG1hdGNoZWQ7XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBBY3RpdmF0ZXMgdGhlIGJyZWFrcG9pbnQgd2F0Y2hlciwgd2hpY2ggZmlyZXMgYW4gZXZlbnQgb24gdGhlIHdpbmRvdyB3aGVuZXZlciB0aGUgYnJlYWtwb2ludCBjaGFuZ2VzLlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF93YXRjaGVyKCkge1xuICAgICQod2luZG93KS5vZmYoJ3Jlc2l6ZS56Zi5tZWRpYXF1ZXJ5Jykub24oJ3Jlc2l6ZS56Zi5tZWRpYXF1ZXJ5JywgKCkgPT4ge1xuICAgICAgdmFyIG5ld1NpemUgPSB0aGlzLl9nZXRDdXJyZW50U2l6ZSgpLCBjdXJyZW50U2l6ZSA9IHRoaXMuY3VycmVudDtcblxuICAgICAgaWYgKG5ld1NpemUgIT09IGN1cnJlbnRTaXplKSB7XG4gICAgICAgIC8vIENoYW5nZSB0aGUgY3VycmVudCBtZWRpYSBxdWVyeVxuICAgICAgICB0aGlzLmN1cnJlbnQgPSBuZXdTaXplO1xuXG4gICAgICAgIC8vIEJyb2FkY2FzdCB0aGUgbWVkaWEgcXVlcnkgY2hhbmdlIG9uIHRoZSB3aW5kb3dcbiAgICAgICAgJCh3aW5kb3cpLnRyaWdnZXIoJ2NoYW5nZWQuemYubWVkaWFxdWVyeScsIFtuZXdTaXplLCBjdXJyZW50U2l6ZV0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59O1xuXG5cblxuLy8gVGhhbmsgeW91OiBodHRwczovL2dpdGh1Yi5jb20vc2luZHJlc29yaHVzL3F1ZXJ5LXN0cmluZ1xuZnVuY3Rpb24gcGFyc2VTdHlsZVRvT2JqZWN0KHN0cikge1xuICB2YXIgc3R5bGVPYmplY3QgPSB7fTtcblxuICBpZiAodHlwZW9mIHN0ciAhPT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gc3R5bGVPYmplY3Q7XG4gIH1cblxuICBzdHIgPSBzdHIudHJpbSgpLnNsaWNlKDEsIC0xKTsgLy8gYnJvd3NlcnMgcmUtcXVvdGUgc3RyaW5nIHN0eWxlIHZhbHVlc1xuXG4gIGlmICghc3RyKSB7XG4gICAgcmV0dXJuIHN0eWxlT2JqZWN0O1xuICB9XG5cbiAgc3R5bGVPYmplY3QgPSBzdHIuc3BsaXQoJyYnKS5yZWR1Y2UoZnVuY3Rpb24ocmV0LCBwYXJhbSkge1xuICAgIHZhciBwYXJ0cyA9IHBhcmFtLnJlcGxhY2UoL1xcKy9nLCAnICcpLnNwbGl0KCc9Jyk7XG4gICAgdmFyIGtleSA9IHBhcnRzWzBdO1xuICAgIHZhciB2YWwgPSBwYXJ0c1sxXTtcbiAgICBrZXkgPSBkZWNvZGVVUklDb21wb25lbnQoa2V5KTtcblxuICAgIC8vIG1pc3NpbmcgYD1gIHNob3VsZCBiZSBgbnVsbGA6XG4gICAgLy8gaHR0cDovL3czLm9yZy9UUi8yMDEyL1dELXVybC0yMDEyMDUyNC8jY29sbGVjdC11cmwtcGFyYW1ldGVyc1xuICAgIHZhbCA9IHZhbCA9PT0gdW5kZWZpbmVkID8gbnVsbCA6IGRlY29kZVVSSUNvbXBvbmVudCh2YWwpO1xuXG4gICAgaWYgKCFyZXQuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgcmV0W2tleV0gPSB2YWw7XG4gICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KHJldFtrZXldKSkge1xuICAgICAgcmV0W2tleV0ucHVzaCh2YWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXRba2V5XSA9IFtyZXRba2V5XSwgdmFsXTtcbiAgICB9XG4gICAgcmV0dXJuIHJldDtcbiAgfSwge30pO1xuXG4gIHJldHVybiBzdHlsZU9iamVjdDtcbn1cblxuZXhwb3J0IHtNZWRpYVF1ZXJ5fTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24udXRpbC5tZWRpYVF1ZXJ5LmpzIiwiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqXG4gKiBUaGlzIHV0aWwgd2FzIGNyZWF0ZWQgYnkgTWFyaXVzIE9sYmVydHogKlxuICogUGxlYXNlIHRoYW5rIE1hcml1cyBvbiBHaXRIdWIgL293bGJlcnR6ICpcbiAqIG9yIHRoZSB3ZWIgaHR0cDovL3d3dy5tYXJpdXNvbGJlcnR6LmRlLyAqXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IHsgcnRsIGFzIFJ0bCB9IGZyb20gJy4vZm91bmRhdGlvbi51dGlsLmNvcmUnO1xuXG5jb25zdCBrZXlDb2RlcyA9IHtcbiAgOTogJ1RBQicsXG4gIDEzOiAnRU5URVInLFxuICAyNzogJ0VTQ0FQRScsXG4gIDMyOiAnU1BBQ0UnLFxuICAzNTogJ0VORCcsXG4gIDM2OiAnSE9NRScsXG4gIDM3OiAnQVJST1dfTEVGVCcsXG4gIDM4OiAnQVJST1dfVVAnLFxuICAzOTogJ0FSUk9XX1JJR0hUJyxcbiAgNDA6ICdBUlJPV19ET1dOJ1xufVxuXG52YXIgY29tbWFuZHMgPSB7fVxuXG4vLyBGdW5jdGlvbnMgcHVsbGVkIG91dCB0byBiZSByZWZlcmVuY2VhYmxlIGZyb20gaW50ZXJuYWxzXG5mdW5jdGlvbiBmaW5kRm9jdXNhYmxlKCRlbGVtZW50KSB7XG4gIGlmKCEkZWxlbWVudCkge3JldHVybiBmYWxzZTsgfVxuICByZXR1cm4gJGVsZW1lbnQuZmluZCgnYVtocmVmXSwgYXJlYVtocmVmXSwgaW5wdXQ6bm90KFtkaXNhYmxlZF0pLCBzZWxlY3Q6bm90KFtkaXNhYmxlZF0pLCB0ZXh0YXJlYTpub3QoW2Rpc2FibGVkXSksIGJ1dHRvbjpub3QoW2Rpc2FibGVkXSksIGlmcmFtZSwgb2JqZWN0LCBlbWJlZCwgKlt0YWJpbmRleF0sICpbY29udGVudGVkaXRhYmxlXScpLmZpbHRlcihmdW5jdGlvbigpIHtcbiAgICBpZiAoISQodGhpcykuaXMoJzp2aXNpYmxlJykgfHwgJCh0aGlzKS5hdHRyKCd0YWJpbmRleCcpIDwgMCkgeyByZXR1cm4gZmFsc2U7IH0gLy9vbmx5IGhhdmUgdmlzaWJsZSBlbGVtZW50cyBhbmQgdGhvc2UgdGhhdCBoYXZlIGEgdGFiaW5kZXggZ3JlYXRlciBvciBlcXVhbCAwXG4gICAgcmV0dXJuIHRydWU7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBwYXJzZUtleShldmVudCkge1xuICB2YXIga2V5ID0ga2V5Q29kZXNbZXZlbnQud2hpY2ggfHwgZXZlbnQua2V5Q29kZV0gfHwgU3RyaW5nLmZyb21DaGFyQ29kZShldmVudC53aGljaCkudG9VcHBlckNhc2UoKTtcblxuICAvLyBSZW1vdmUgdW4tcHJpbnRhYmxlIGNoYXJhY3RlcnMsIGUuZy4gZm9yIGBmcm9tQ2hhckNvZGVgIGNhbGxzIGZvciBDVFJMIG9ubHkgZXZlbnRzXG4gIGtleSA9IGtleS5yZXBsYWNlKC9cXFcrLywgJycpO1xuXG4gIGlmIChldmVudC5zaGlmdEtleSkga2V5ID0gYFNISUZUXyR7a2V5fWA7XG4gIGlmIChldmVudC5jdHJsS2V5KSBrZXkgPSBgQ1RSTF8ke2tleX1gO1xuICBpZiAoZXZlbnQuYWx0S2V5KSBrZXkgPSBgQUxUXyR7a2V5fWA7XG5cbiAgLy8gUmVtb3ZlIHRyYWlsaW5nIHVuZGVyc2NvcmUsIGluIGNhc2Ugb25seSBtb2RpZmllcnMgd2VyZSB1c2VkIChlLmcuIG9ubHkgYENUUkxfQUxUYClcbiAga2V5ID0ga2V5LnJlcGxhY2UoL18kLywgJycpO1xuXG4gIHJldHVybiBrZXk7XG59XG5cbnZhciBLZXlib2FyZCA9IHtcbiAga2V5czogZ2V0S2V5Q29kZXMoa2V5Q29kZXMpLFxuXG4gIC8qKlxuICAgKiBQYXJzZXMgdGhlIChrZXlib2FyZCkgZXZlbnQgYW5kIHJldHVybnMgYSBTdHJpbmcgdGhhdCByZXByZXNlbnRzIGl0cyBrZXlcbiAgICogQ2FuIGJlIHVzZWQgbGlrZSBGb3VuZGF0aW9uLnBhcnNlS2V5KGV2ZW50KSA9PT0gRm91bmRhdGlvbi5rZXlzLlNQQUNFXG4gICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IC0gdGhlIGV2ZW50IGdlbmVyYXRlZCBieSB0aGUgZXZlbnQgaGFuZGxlclxuICAgKiBAcmV0dXJuIFN0cmluZyBrZXkgLSBTdHJpbmcgdGhhdCByZXByZXNlbnRzIHRoZSBrZXkgcHJlc3NlZFxuICAgKi9cbiAgcGFyc2VLZXk6IHBhcnNlS2V5LFxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIHRoZSBnaXZlbiAoa2V5Ym9hcmQpIGV2ZW50XG4gICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IC0gdGhlIGV2ZW50IGdlbmVyYXRlZCBieSB0aGUgZXZlbnQgaGFuZGxlclxuICAgKiBAcGFyYW0ge1N0cmluZ30gY29tcG9uZW50IC0gRm91bmRhdGlvbiBjb21wb25lbnQncyBuYW1lLCBlLmcuIFNsaWRlciBvciBSZXZlYWxcbiAgICogQHBhcmFtIHtPYmplY3RzfSBmdW5jdGlvbnMgLSBjb2xsZWN0aW9uIG9mIGZ1bmN0aW9ucyB0aGF0IGFyZSB0byBiZSBleGVjdXRlZFxuICAgKi9cbiAgaGFuZGxlS2V5KGV2ZW50LCBjb21wb25lbnQsIGZ1bmN0aW9ucykge1xuICAgIHZhciBjb21tYW5kTGlzdCA9IGNvbW1hbmRzW2NvbXBvbmVudF0sXG4gICAgICBrZXlDb2RlID0gdGhpcy5wYXJzZUtleShldmVudCksXG4gICAgICBjbWRzLFxuICAgICAgY29tbWFuZCxcbiAgICAgIGZuO1xuXG4gICAgaWYgKCFjb21tYW5kTGlzdCkgcmV0dXJuIGNvbnNvbGUud2FybignQ29tcG9uZW50IG5vdCBkZWZpbmVkIScpO1xuXG4gICAgaWYgKHR5cGVvZiBjb21tYW5kTGlzdC5sdHIgPT09ICd1bmRlZmluZWQnKSB7IC8vIHRoaXMgY29tcG9uZW50IGRvZXMgbm90IGRpZmZlcmVudGlhdGUgYmV0d2VlbiBsdHIgYW5kIHJ0bFxuICAgICAgICBjbWRzID0gY29tbWFuZExpc3Q7IC8vIHVzZSBwbGFpbiBsaXN0XG4gICAgfSBlbHNlIHsgLy8gbWVyZ2UgbHRyIGFuZCBydGw6IGlmIGRvY3VtZW50IGlzIHJ0bCwgcnRsIG92ZXJ3cml0ZXMgbHRyIGFuZCB2aWNlIHZlcnNhXG4gICAgICAgIGlmIChSdGwoKSkgY21kcyA9ICQuZXh0ZW5kKHt9LCBjb21tYW5kTGlzdC5sdHIsIGNvbW1hbmRMaXN0LnJ0bCk7XG5cbiAgICAgICAgZWxzZSBjbWRzID0gJC5leHRlbmQoe30sIGNvbW1hbmRMaXN0LnJ0bCwgY29tbWFuZExpc3QubHRyKTtcbiAgICB9XG4gICAgY29tbWFuZCA9IGNtZHNba2V5Q29kZV07XG5cbiAgICBmbiA9IGZ1bmN0aW9uc1tjb21tYW5kXTtcbiAgICBpZiAoZm4gJiYgdHlwZW9mIGZuID09PSAnZnVuY3Rpb24nKSB7IC8vIGV4ZWN1dGUgZnVuY3Rpb24gIGlmIGV4aXN0c1xuICAgICAgdmFyIHJldHVyblZhbHVlID0gZm4uYXBwbHkoKTtcbiAgICAgIGlmIChmdW5jdGlvbnMuaGFuZGxlZCB8fCB0eXBlb2YgZnVuY3Rpb25zLmhhbmRsZWQgPT09ICdmdW5jdGlvbicpIHsgLy8gZXhlY3V0ZSBmdW5jdGlvbiB3aGVuIGV2ZW50IHdhcyBoYW5kbGVkXG4gICAgICAgICAgZnVuY3Rpb25zLmhhbmRsZWQocmV0dXJuVmFsdWUpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoZnVuY3Rpb25zLnVuaGFuZGxlZCB8fCB0eXBlb2YgZnVuY3Rpb25zLnVuaGFuZGxlZCA9PT0gJ2Z1bmN0aW9uJykgeyAvLyBleGVjdXRlIGZ1bmN0aW9uIHdoZW4gZXZlbnQgd2FzIG5vdCBoYW5kbGVkXG4gICAgICAgICAgZnVuY3Rpb25zLnVuaGFuZGxlZCgpO1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICogRmluZHMgYWxsIGZvY3VzYWJsZSBlbGVtZW50cyB3aXRoaW4gdGhlIGdpdmVuIGAkZWxlbWVudGBcbiAgICogQHBhcmFtIHtqUXVlcnl9ICRlbGVtZW50IC0galF1ZXJ5IG9iamVjdCB0byBzZWFyY2ggd2l0aGluXG4gICAqIEByZXR1cm4ge2pRdWVyeX0gJGZvY3VzYWJsZSAtIGFsbCBmb2N1c2FibGUgZWxlbWVudHMgd2l0aGluIGAkZWxlbWVudGBcbiAgICovXG5cbiAgZmluZEZvY3VzYWJsZTogZmluZEZvY3VzYWJsZSxcblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgY29tcG9uZW50IG5hbWUgbmFtZVxuICAgKiBAcGFyYW0ge09iamVjdH0gY29tcG9uZW50IC0gRm91bmRhdGlvbiBjb21wb25lbnQsIGUuZy4gU2xpZGVyIG9yIFJldmVhbFxuICAgKiBAcmV0dXJuIFN0cmluZyBjb21wb25lbnROYW1lXG4gICAqL1xuXG4gIHJlZ2lzdGVyKGNvbXBvbmVudE5hbWUsIGNtZHMpIHtcbiAgICBjb21tYW5kc1tjb21wb25lbnROYW1lXSA9IGNtZHM7XG4gIH0sXG5cblxuICAvLyBUT0RPOTQzODogVGhlc2UgcmVmZXJlbmNlcyB0byBLZXlib2FyZCBuZWVkIHRvIG5vdCByZXF1aXJlIGdsb2JhbC4gV2lsbCAndGhpcycgd29yayBpbiB0aGlzIGNvbnRleHQ/XG4gIC8vXG4gIC8qKlxuICAgKiBUcmFwcyB0aGUgZm9jdXMgaW4gdGhlIGdpdmVuIGVsZW1lbnQuXG4gICAqIEBwYXJhbSAge2pRdWVyeX0gJGVsZW1lbnQgIGpRdWVyeSBvYmplY3QgdG8gdHJhcCB0aGUgZm91Y3MgaW50by5cbiAgICovXG4gIHRyYXBGb2N1cygkZWxlbWVudCkge1xuICAgIHZhciAkZm9jdXNhYmxlID0gZmluZEZvY3VzYWJsZSgkZWxlbWVudCksXG4gICAgICAgICRmaXJzdEZvY3VzYWJsZSA9ICRmb2N1c2FibGUuZXEoMCksXG4gICAgICAgICRsYXN0Rm9jdXNhYmxlID0gJGZvY3VzYWJsZS5lcSgtMSk7XG5cbiAgICAkZWxlbWVudC5vbigna2V5ZG93bi56Zi50cmFwZm9jdXMnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgaWYgKGV2ZW50LnRhcmdldCA9PT0gJGxhc3RGb2N1c2FibGVbMF0gJiYgcGFyc2VLZXkoZXZlbnQpID09PSAnVEFCJykge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAkZmlyc3RGb2N1c2FibGUuZm9jdXMoKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGV2ZW50LnRhcmdldCA9PT0gJGZpcnN0Rm9jdXNhYmxlWzBdICYmIHBhcnNlS2V5KGV2ZW50KSA9PT0gJ1NISUZUX1RBQicpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgJGxhc3RGb2N1c2FibGUuZm9jdXMoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSxcbiAgLyoqXG4gICAqIFJlbGVhc2VzIHRoZSB0cmFwcGVkIGZvY3VzIGZyb20gdGhlIGdpdmVuIGVsZW1lbnQuXG4gICAqIEBwYXJhbSAge2pRdWVyeX0gJGVsZW1lbnQgIGpRdWVyeSBvYmplY3QgdG8gcmVsZWFzZSB0aGUgZm9jdXMgZm9yLlxuICAgKi9cbiAgcmVsZWFzZUZvY3VzKCRlbGVtZW50KSB7XG4gICAgJGVsZW1lbnQub2ZmKCdrZXlkb3duLnpmLnRyYXBmb2N1cycpO1xuICB9XG59XG5cbi8qXG4gKiBDb25zdGFudHMgZm9yIGVhc2llciBjb21wYXJpbmcuXG4gKiBDYW4gYmUgdXNlZCBsaWtlIEZvdW5kYXRpb24ucGFyc2VLZXkoZXZlbnQpID09PSBGb3VuZGF0aW9uLmtleXMuU1BBQ0VcbiAqL1xuZnVuY3Rpb24gZ2V0S2V5Q29kZXMoa2NzKSB7XG4gIHZhciBrID0ge307XG4gIGZvciAodmFyIGtjIGluIGtjcykga1trY3Nba2NdXSA9IGtjc1trY107XG4gIHJldHVybiBrO1xufVxuXG5leHBvcnQge0tleWJvYXJkfTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24udXRpbC5rZXlib2FyZC5qcyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcbmltcG9ydCB7IE1vdGlvbiB9IGZyb20gJy4vZm91bmRhdGlvbi51dGlsLm1vdGlvbic7XG5cbmNvbnN0IE11dGF0aW9uT2JzZXJ2ZXIgPSAoZnVuY3Rpb24gKCkge1xuICB2YXIgcHJlZml4ZXMgPSBbJ1dlYktpdCcsICdNb3onLCAnTycsICdNcycsICcnXTtcbiAgZm9yICh2YXIgaT0wOyBpIDwgcHJlZml4ZXMubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoYCR7cHJlZml4ZXNbaV19TXV0YXRpb25PYnNlcnZlcmAgaW4gd2luZG93KSB7XG4gICAgICByZXR1cm4gd2luZG93W2Ake3ByZWZpeGVzW2ldfU11dGF0aW9uT2JzZXJ2ZXJgXTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufSgpKTtcblxuY29uc3QgdHJpZ2dlcnMgPSAoZWwsIHR5cGUpID0+IHtcbiAgZWwuZGF0YSh0eXBlKS5zcGxpdCgnICcpLmZvckVhY2goaWQgPT4ge1xuICAgICQoYCMke2lkfWApWyB0eXBlID09PSAnY2xvc2UnID8gJ3RyaWdnZXInIDogJ3RyaWdnZXJIYW5kbGVyJ10oYCR7dHlwZX0uemYudHJpZ2dlcmAsIFtlbF0pO1xuICB9KTtcbn07XG5cbnZhciBUcmlnZ2VycyA9IHtcbiAgTGlzdGVuZXJzOiB7XG4gICAgQmFzaWM6IHt9LFxuICAgIEdsb2JhbDoge31cbiAgfSxcbiAgSW5pdGlhbGl6ZXJzOiB7fVxufVxuXG5UcmlnZ2Vycy5MaXN0ZW5lcnMuQmFzaWMgID0ge1xuICBvcGVuTGlzdGVuZXI6IGZ1bmN0aW9uKCkge1xuICAgIHRyaWdnZXJzKCQodGhpcyksICdvcGVuJyk7XG4gIH0sXG4gIGNsb3NlTGlzdGVuZXI6IGZ1bmN0aW9uKCkge1xuICAgIGxldCBpZCA9ICQodGhpcykuZGF0YSgnY2xvc2UnKTtcbiAgICBpZiAoaWQpIHtcbiAgICAgIHRyaWdnZXJzKCQodGhpcyksICdjbG9zZScpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICQodGhpcykudHJpZ2dlcignY2xvc2UuemYudHJpZ2dlcicpO1xuICAgIH1cbiAgfSxcbiAgdG9nZ2xlTGlzdGVuZXI6IGZ1bmN0aW9uKCkge1xuICAgIGxldCBpZCA9ICQodGhpcykuZGF0YSgndG9nZ2xlJyk7XG4gICAgaWYgKGlkKSB7XG4gICAgICB0cmlnZ2VycygkKHRoaXMpLCAndG9nZ2xlJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICQodGhpcykudHJpZ2dlcigndG9nZ2xlLnpmLnRyaWdnZXInKTtcbiAgICB9XG4gIH0sXG4gIGNsb3NlYWJsZUxpc3RlbmVyOiBmdW5jdGlvbihlKSB7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBsZXQgYW5pbWF0aW9uID0gJCh0aGlzKS5kYXRhKCdjbG9zYWJsZScpO1xuXG4gICAgaWYoYW5pbWF0aW9uICE9PSAnJyl7XG4gICAgICBNb3Rpb24uYW5pbWF0ZU91dCgkKHRoaXMpLCBhbmltYXRpb24sIGZ1bmN0aW9uKCkge1xuICAgICAgICAkKHRoaXMpLnRyaWdnZXIoJ2Nsb3NlZC56ZicpO1xuICAgICAgfSk7XG4gICAgfWVsc2V7XG4gICAgICAkKHRoaXMpLmZhZGVPdXQoKS50cmlnZ2VyKCdjbG9zZWQuemYnKTtcbiAgICB9XG4gIH0sXG4gIHRvZ2dsZUZvY3VzTGlzdGVuZXI6IGZ1bmN0aW9uKCkge1xuICAgIGxldCBpZCA9ICQodGhpcykuZGF0YSgndG9nZ2xlLWZvY3VzJyk7XG4gICAgJChgIyR7aWR9YCkudHJpZ2dlckhhbmRsZXIoJ3RvZ2dsZS56Zi50cmlnZ2VyJywgWyQodGhpcyldKTtcbiAgfVxufTtcblxuLy8gRWxlbWVudHMgd2l0aCBbZGF0YS1vcGVuXSB3aWxsIHJldmVhbCBhIHBsdWdpbiB0aGF0IHN1cHBvcnRzIGl0IHdoZW4gY2xpY2tlZC5cblRyaWdnZXJzLkluaXRpYWxpemVycy5hZGRPcGVuTGlzdGVuZXIgPSAoJGVsZW0pID0+IHtcbiAgJGVsZW0ub2ZmKCdjbGljay56Zi50cmlnZ2VyJywgVHJpZ2dlcnMuTGlzdGVuZXJzLkJhc2ljLm9wZW5MaXN0ZW5lcik7XG4gICRlbGVtLm9uKCdjbGljay56Zi50cmlnZ2VyJywgJ1tkYXRhLW9wZW5dJywgVHJpZ2dlcnMuTGlzdGVuZXJzLkJhc2ljLm9wZW5MaXN0ZW5lcik7XG59XG5cbi8vIEVsZW1lbnRzIHdpdGggW2RhdGEtY2xvc2VdIHdpbGwgY2xvc2UgYSBwbHVnaW4gdGhhdCBzdXBwb3J0cyBpdCB3aGVuIGNsaWNrZWQuXG4vLyBJZiB1c2VkIHdpdGhvdXQgYSB2YWx1ZSBvbiBbZGF0YS1jbG9zZV0sIHRoZSBldmVudCB3aWxsIGJ1YmJsZSwgYWxsb3dpbmcgaXQgdG8gY2xvc2UgYSBwYXJlbnQgY29tcG9uZW50LlxuVHJpZ2dlcnMuSW5pdGlhbGl6ZXJzLmFkZENsb3NlTGlzdGVuZXIgPSAoJGVsZW0pID0+IHtcbiAgJGVsZW0ub2ZmKCdjbGljay56Zi50cmlnZ2VyJywgVHJpZ2dlcnMuTGlzdGVuZXJzLkJhc2ljLmNsb3NlTGlzdGVuZXIpO1xuICAkZWxlbS5vbignY2xpY2suemYudHJpZ2dlcicsICdbZGF0YS1jbG9zZV0nLCBUcmlnZ2Vycy5MaXN0ZW5lcnMuQmFzaWMuY2xvc2VMaXN0ZW5lcik7XG59XG5cbi8vIEVsZW1lbnRzIHdpdGggW2RhdGEtdG9nZ2xlXSB3aWxsIHRvZ2dsZSBhIHBsdWdpbiB0aGF0IHN1cHBvcnRzIGl0IHdoZW4gY2xpY2tlZC5cblRyaWdnZXJzLkluaXRpYWxpemVycy5hZGRUb2dnbGVMaXN0ZW5lciA9ICgkZWxlbSkgPT4ge1xuICAkZWxlbS5vZmYoJ2NsaWNrLnpmLnRyaWdnZXInLCBUcmlnZ2Vycy5MaXN0ZW5lcnMuQmFzaWMudG9nZ2xlTGlzdGVuZXIpO1xuICAkZWxlbS5vbignY2xpY2suemYudHJpZ2dlcicsICdbZGF0YS10b2dnbGVdJywgVHJpZ2dlcnMuTGlzdGVuZXJzLkJhc2ljLnRvZ2dsZUxpc3RlbmVyKTtcbn1cblxuLy8gRWxlbWVudHMgd2l0aCBbZGF0YS1jbG9zYWJsZV0gd2lsbCByZXNwb25kIHRvIGNsb3NlLnpmLnRyaWdnZXIgZXZlbnRzLlxuVHJpZ2dlcnMuSW5pdGlhbGl6ZXJzLmFkZENsb3NlYWJsZUxpc3RlbmVyID0gKCRlbGVtKSA9PiB7XG4gICRlbGVtLm9mZignY2xvc2UuemYudHJpZ2dlcicsIFRyaWdnZXJzLkxpc3RlbmVycy5CYXNpYy5jbG9zZWFibGVMaXN0ZW5lcik7XG4gICRlbGVtLm9uKCdjbG9zZS56Zi50cmlnZ2VyJywgJ1tkYXRhLWNsb3NlYWJsZV0sIFtkYXRhLWNsb3NhYmxlXScsIFRyaWdnZXJzLkxpc3RlbmVycy5CYXNpYy5jbG9zZWFibGVMaXN0ZW5lcik7XG59XG5cbi8vIEVsZW1lbnRzIHdpdGggW2RhdGEtdG9nZ2xlLWZvY3VzXSB3aWxsIHJlc3BvbmQgdG8gY29taW5nIGluIGFuZCBvdXQgb2YgZm9jdXNcblRyaWdnZXJzLkluaXRpYWxpemVycy5hZGRUb2dnbGVGb2N1c0xpc3RlbmVyID0gKCRlbGVtKSA9PiB7XG4gICRlbGVtLm9mZignZm9jdXMuemYudHJpZ2dlciBibHVyLnpmLnRyaWdnZXInLCBUcmlnZ2Vycy5MaXN0ZW5lcnMuQmFzaWMudG9nZ2xlRm9jdXNMaXN0ZW5lcik7XG4gICRlbGVtLm9uKCdmb2N1cy56Zi50cmlnZ2VyIGJsdXIuemYudHJpZ2dlcicsICdbZGF0YS10b2dnbGUtZm9jdXNdJywgVHJpZ2dlcnMuTGlzdGVuZXJzLkJhc2ljLnRvZ2dsZUZvY3VzTGlzdGVuZXIpO1xufVxuXG5cblxuLy8gTW9yZSBHbG9iYWwvY29tcGxleCBsaXN0ZW5lcnMgYW5kIHRyaWdnZXJzXG5UcmlnZ2Vycy5MaXN0ZW5lcnMuR2xvYmFsICA9IHtcbiAgcmVzaXplTGlzdGVuZXI6IGZ1bmN0aW9uKCRub2Rlcykge1xuICAgIGlmKCFNdXRhdGlvbk9ic2VydmVyKXsvL2ZhbGxiYWNrIGZvciBJRSA5XG4gICAgICAkbm9kZXMuZWFjaChmdW5jdGlvbigpe1xuICAgICAgICAkKHRoaXMpLnRyaWdnZXJIYW5kbGVyKCdyZXNpemVtZS56Zi50cmlnZ2VyJyk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgLy90cmlnZ2VyIGFsbCBsaXN0ZW5pbmcgZWxlbWVudHMgYW5kIHNpZ25hbCBhIHJlc2l6ZSBldmVudFxuICAgICRub2Rlcy5hdHRyKCdkYXRhLWV2ZW50cycsIFwicmVzaXplXCIpO1xuICB9LFxuICBzY3JvbGxMaXN0ZW5lcjogZnVuY3Rpb24oJG5vZGVzKSB7XG4gICAgaWYoIU11dGF0aW9uT2JzZXJ2ZXIpey8vZmFsbGJhY2sgZm9yIElFIDlcbiAgICAgICRub2Rlcy5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICAgICQodGhpcykudHJpZ2dlckhhbmRsZXIoJ3Njcm9sbG1lLnpmLnRyaWdnZXInKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICAvL3RyaWdnZXIgYWxsIGxpc3RlbmluZyBlbGVtZW50cyBhbmQgc2lnbmFsIGEgc2Nyb2xsIGV2ZW50XG4gICAgJG5vZGVzLmF0dHIoJ2RhdGEtZXZlbnRzJywgXCJzY3JvbGxcIik7XG4gIH0sXG4gIGNsb3NlTWVMaXN0ZW5lcjogZnVuY3Rpb24oZSwgcGx1Z2luSWQpe1xuICAgIGxldCBwbHVnaW4gPSBlLm5hbWVzcGFjZS5zcGxpdCgnLicpWzBdO1xuICAgIGxldCBwbHVnaW5zID0gJChgW2RhdGEtJHtwbHVnaW59XWApLm5vdChgW2RhdGEteWV0aS1ib3g9XCIke3BsdWdpbklkfVwiXWApO1xuXG4gICAgcGx1Z2lucy5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICBsZXQgX3RoaXMgPSAkKHRoaXMpO1xuICAgICAgX3RoaXMudHJpZ2dlckhhbmRsZXIoJ2Nsb3NlLnpmLnRyaWdnZXInLCBbX3RoaXNdKTtcbiAgICB9KTtcbiAgfVxufVxuXG4vLyBHbG9iYWwsIHBhcnNlcyB3aG9sZSBkb2N1bWVudC5cblRyaWdnZXJzLkluaXRpYWxpemVycy5hZGRDbG9zZW1lTGlzdGVuZXIgPSBmdW5jdGlvbihwbHVnaW5OYW1lKSB7XG4gIHZhciB5ZXRpQm94ZXMgPSAkKCdbZGF0YS15ZXRpLWJveF0nKSxcbiAgICAgIHBsdWdOYW1lcyA9IFsnZHJvcGRvd24nLCAndG9vbHRpcCcsICdyZXZlYWwnXTtcblxuICBpZihwbHVnaW5OYW1lKXtcbiAgICBpZih0eXBlb2YgcGx1Z2luTmFtZSA9PT0gJ3N0cmluZycpe1xuICAgICAgcGx1Z05hbWVzLnB1c2gocGx1Z2luTmFtZSk7XG4gICAgfWVsc2UgaWYodHlwZW9mIHBsdWdpbk5hbWUgPT09ICdvYmplY3QnICYmIHR5cGVvZiBwbHVnaW5OYW1lWzBdID09PSAnc3RyaW5nJyl7XG4gICAgICBwbHVnTmFtZXMuY29uY2F0KHBsdWdpbk5hbWUpO1xuICAgIH1lbHNle1xuICAgICAgY29uc29sZS5lcnJvcignUGx1Z2luIG5hbWVzIG11c3QgYmUgc3RyaW5ncycpO1xuICAgIH1cbiAgfVxuICBpZih5ZXRpQm94ZXMubGVuZ3RoKXtcbiAgICBsZXQgbGlzdGVuZXJzID0gcGx1Z05hbWVzLm1hcCgobmFtZSkgPT4ge1xuICAgICAgcmV0dXJuIGBjbG9zZW1lLnpmLiR7bmFtZX1gO1xuICAgIH0pLmpvaW4oJyAnKTtcblxuICAgICQod2luZG93KS5vZmYobGlzdGVuZXJzKS5vbihsaXN0ZW5lcnMsIFRyaWdnZXJzLkxpc3RlbmVycy5HbG9iYWwuY2xvc2VNZUxpc3RlbmVyKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBkZWJvdW5jZUdsb2JhbExpc3RlbmVyKGRlYm91bmNlLCB0cmlnZ2VyLCBsaXN0ZW5lcikge1xuICBsZXQgdGltZXIsIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDMpO1xuICAkKHdpbmRvdykub2ZmKHRyaWdnZXIpLm9uKHRyaWdnZXIsIGZ1bmN0aW9uKGUpIHtcbiAgICBpZiAodGltZXIpIHsgY2xlYXJUaW1lb3V0KHRpbWVyKTsgfVxuICAgIHRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgbGlzdGVuZXIuYXBwbHkobnVsbCwgYXJncyk7XG4gICAgfSwgZGVib3VuY2UgfHwgMTApOy8vZGVmYXVsdCB0aW1lIHRvIGVtaXQgc2Nyb2xsIGV2ZW50XG4gIH0pO1xufVxuXG5UcmlnZ2Vycy5Jbml0aWFsaXplcnMuYWRkUmVzaXplTGlzdGVuZXIgPSBmdW5jdGlvbihkZWJvdW5jZSl7XG4gIGxldCAkbm9kZXMgPSAkKCdbZGF0YS1yZXNpemVdJyk7XG4gIGlmKCRub2Rlcy5sZW5ndGgpe1xuICAgIGRlYm91bmNlR2xvYmFsTGlzdGVuZXIoZGVib3VuY2UsICdyZXNpemUuemYudHJpZ2dlcicsIFRyaWdnZXJzLkxpc3RlbmVycy5HbG9iYWwucmVzaXplTGlzdGVuZXIsICRub2Rlcyk7XG4gIH1cbn1cblxuVHJpZ2dlcnMuSW5pdGlhbGl6ZXJzLmFkZFNjcm9sbExpc3RlbmVyID0gZnVuY3Rpb24oZGVib3VuY2Upe1xuICBsZXQgJG5vZGVzID0gJCgnW2RhdGEtc2Nyb2xsXScpO1xuICBpZigkbm9kZXMubGVuZ3RoKXtcbiAgICBkZWJvdW5jZUdsb2JhbExpc3RlbmVyKGRlYm91bmNlLCAnc2Nyb2xsLnpmLnRyaWdnZXInLCBUcmlnZ2Vycy5MaXN0ZW5lcnMuR2xvYmFsLnNjcm9sbExpc3RlbmVyLCAkbm9kZXMpO1xuICB9XG59XG5cblRyaWdnZXJzLkluaXRpYWxpemVycy5hZGRNdXRhdGlvbkV2ZW50c0xpc3RlbmVyID0gZnVuY3Rpb24oJGVsZW0pIHtcbiAgaWYoIU11dGF0aW9uT2JzZXJ2ZXIpeyByZXR1cm4gZmFsc2U7IH1cbiAgbGV0ICRub2RlcyA9ICRlbGVtLmZpbmQoJ1tkYXRhLXJlc2l6ZV0sIFtkYXRhLXNjcm9sbF0sIFtkYXRhLW11dGF0ZV0nKTtcblxuICAvL2VsZW1lbnQgY2FsbGJhY2tcbiAgdmFyIGxpc3RlbmluZ0VsZW1lbnRzTXV0YXRpb24gPSBmdW5jdGlvbiAobXV0YXRpb25SZWNvcmRzTGlzdCkge1xuICAgIHZhciAkdGFyZ2V0ID0gJChtdXRhdGlvblJlY29yZHNMaXN0WzBdLnRhcmdldCk7XG5cbiAgICAvL3RyaWdnZXIgdGhlIGV2ZW50IGhhbmRsZXIgZm9yIHRoZSBlbGVtZW50IGRlcGVuZGluZyBvbiB0eXBlXG4gICAgc3dpdGNoIChtdXRhdGlvblJlY29yZHNMaXN0WzBdLnR5cGUpIHtcbiAgICAgIGNhc2UgXCJhdHRyaWJ1dGVzXCI6XG4gICAgICAgIGlmICgkdGFyZ2V0LmF0dHIoXCJkYXRhLWV2ZW50c1wiKSA9PT0gXCJzY3JvbGxcIiAmJiBtdXRhdGlvblJlY29yZHNMaXN0WzBdLmF0dHJpYnV0ZU5hbWUgPT09IFwiZGF0YS1ldmVudHNcIikge1xuICAgICAgICAgICR0YXJnZXQudHJpZ2dlckhhbmRsZXIoJ3Njcm9sbG1lLnpmLnRyaWdnZXInLCBbJHRhcmdldCwgd2luZG93LnBhZ2VZT2Zmc2V0XSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCR0YXJnZXQuYXR0cihcImRhdGEtZXZlbnRzXCIpID09PSBcInJlc2l6ZVwiICYmIG11dGF0aW9uUmVjb3Jkc0xpc3RbMF0uYXR0cmlidXRlTmFtZSA9PT0gXCJkYXRhLWV2ZW50c1wiKSB7XG4gICAgICAgICAgJHRhcmdldC50cmlnZ2VySGFuZGxlcigncmVzaXplbWUuemYudHJpZ2dlcicsIFskdGFyZ2V0XSk7XG4gICAgICAgICB9XG4gICAgICAgIGlmIChtdXRhdGlvblJlY29yZHNMaXN0WzBdLmF0dHJpYnV0ZU5hbWUgPT09IFwic3R5bGVcIikge1xuICAgICAgICAgICR0YXJnZXQuY2xvc2VzdChcIltkYXRhLW11dGF0ZV1cIikuYXR0cihcImRhdGEtZXZlbnRzXCIsXCJtdXRhdGVcIik7XG4gICAgICAgICAgJHRhcmdldC5jbG9zZXN0KFwiW2RhdGEtbXV0YXRlXVwiKS50cmlnZ2VySGFuZGxlcignbXV0YXRlbWUuemYudHJpZ2dlcicsIFskdGFyZ2V0LmNsb3Nlc3QoXCJbZGF0YS1tdXRhdGVdXCIpXSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgXCJjaGlsZExpc3RcIjpcbiAgICAgICAgJHRhcmdldC5jbG9zZXN0KFwiW2RhdGEtbXV0YXRlXVwiKS5hdHRyKFwiZGF0YS1ldmVudHNcIixcIm11dGF0ZVwiKTtcbiAgICAgICAgJHRhcmdldC5jbG9zZXN0KFwiW2RhdGEtbXV0YXRlXVwiKS50cmlnZ2VySGFuZGxlcignbXV0YXRlbWUuemYudHJpZ2dlcicsIFskdGFyZ2V0LmNsb3Nlc3QoXCJbZGF0YS1tdXRhdGVdXCIpXSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAvL25vdGhpbmdcbiAgICB9XG4gIH07XG5cbiAgaWYgKCRub2Rlcy5sZW5ndGgpIHtcbiAgICAvL2ZvciBlYWNoIGVsZW1lbnQgdGhhdCBuZWVkcyB0byBsaXN0ZW4gZm9yIHJlc2l6aW5nLCBzY3JvbGxpbmcsIG9yIG11dGF0aW9uIGFkZCBhIHNpbmdsZSBvYnNlcnZlclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDw9ICRub2Rlcy5sZW5ndGggLSAxOyBpKyspIHtcbiAgICAgIHZhciBlbGVtZW50T2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihsaXN0ZW5pbmdFbGVtZW50c011dGF0aW9uKTtcbiAgICAgIGVsZW1lbnRPYnNlcnZlci5vYnNlcnZlKCRub2Rlc1tpXSwgeyBhdHRyaWJ1dGVzOiB0cnVlLCBjaGlsZExpc3Q6IHRydWUsIGNoYXJhY3RlckRhdGE6IGZhbHNlLCBzdWJ0cmVlOiB0cnVlLCBhdHRyaWJ1dGVGaWx0ZXI6IFtcImRhdGEtZXZlbnRzXCIsIFwic3R5bGVcIl0gfSk7XG4gICAgfVxuICB9XG59XG5cblRyaWdnZXJzLkluaXRpYWxpemVycy5hZGRTaW1wbGVMaXN0ZW5lcnMgPSBmdW5jdGlvbigpIHtcbiAgbGV0ICRkb2N1bWVudCA9ICQoZG9jdW1lbnQpO1xuXG4gIFRyaWdnZXJzLkluaXRpYWxpemVycy5hZGRPcGVuTGlzdGVuZXIoJGRvY3VtZW50KTtcbiAgVHJpZ2dlcnMuSW5pdGlhbGl6ZXJzLmFkZENsb3NlTGlzdGVuZXIoJGRvY3VtZW50KTtcbiAgVHJpZ2dlcnMuSW5pdGlhbGl6ZXJzLmFkZFRvZ2dsZUxpc3RlbmVyKCRkb2N1bWVudCk7XG4gIFRyaWdnZXJzLkluaXRpYWxpemVycy5hZGRDbG9zZWFibGVMaXN0ZW5lcigkZG9jdW1lbnQpO1xuICBUcmlnZ2Vycy5Jbml0aWFsaXplcnMuYWRkVG9nZ2xlRm9jdXNMaXN0ZW5lcigkZG9jdW1lbnQpO1xuXG59XG5cblRyaWdnZXJzLkluaXRpYWxpemVycy5hZGRHbG9iYWxMaXN0ZW5lcnMgPSBmdW5jdGlvbigpIHtcbiAgbGV0ICRkb2N1bWVudCA9ICQoZG9jdW1lbnQpO1xuICBUcmlnZ2Vycy5Jbml0aWFsaXplcnMuYWRkTXV0YXRpb25FdmVudHNMaXN0ZW5lcigkZG9jdW1lbnQpO1xuICBUcmlnZ2Vycy5Jbml0aWFsaXplcnMuYWRkUmVzaXplTGlzdGVuZXIoKTtcbiAgVHJpZ2dlcnMuSW5pdGlhbGl6ZXJzLmFkZFNjcm9sbExpc3RlbmVyKCk7XG4gIFRyaWdnZXJzLkluaXRpYWxpemVycy5hZGRDbG9zZW1lTGlzdGVuZXIoKTtcbn1cblxuXG5UcmlnZ2Vycy5pbml0ID0gZnVuY3Rpb24oJCwgRm91bmRhdGlvbikge1xuICBpZiAodHlwZW9mKCQudHJpZ2dlcnNJbml0aWFsaXplZCkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgbGV0ICRkb2N1bWVudCA9ICQoZG9jdW1lbnQpO1xuXG4gICAgaWYoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gXCJjb21wbGV0ZVwiKSB7XG4gICAgICBUcmlnZ2Vycy5Jbml0aWFsaXplcnMuYWRkU2ltcGxlTGlzdGVuZXJzKCk7XG4gICAgICBUcmlnZ2Vycy5Jbml0aWFsaXplcnMuYWRkR2xvYmFsTGlzdGVuZXJzKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICQod2luZG93KS5vbignbG9hZCcsICgpID0+IHtcbiAgICAgICAgVHJpZ2dlcnMuSW5pdGlhbGl6ZXJzLmFkZFNpbXBsZUxpc3RlbmVycygpO1xuICAgICAgICBUcmlnZ2Vycy5Jbml0aWFsaXplcnMuYWRkR2xvYmFsTGlzdGVuZXJzKCk7XG4gICAgICB9KTtcbiAgICB9XG5cblxuICAgICQudHJpZ2dlcnNJbml0aWFsaXplZCA9IHRydWU7XG4gIH1cblxuICBpZihGb3VuZGF0aW9uKSB7XG4gICAgRm91bmRhdGlvbi5UcmlnZ2VycyA9IFRyaWdnZXJzO1xuICAgIC8vIExlZ2FjeSBpbmNsdWRlZCB0byBiZSBiYWNrd2FyZHMgY29tcGF0aWJsZSBmb3Igbm93LlxuICAgIEZvdW5kYXRpb24uSUhlYXJZb3UgPSBUcmlnZ2Vycy5Jbml0aWFsaXplcnMuYWRkR2xvYmFsTGlzdGVuZXJzXG4gIH1cbn1cblxuZXhwb3J0IHtUcmlnZ2Vyc307XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLnV0aWwudHJpZ2dlcnMuanMiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5pbXBvcnQgeyBHZXRZb0RpZ2l0cyB9IGZyb20gJy4vZm91bmRhdGlvbi51dGlsLmNvcmUnO1xuXG4vLyBBYnN0cmFjdCBjbGFzcyBmb3IgcHJvdmlkaW5nIGxpZmVjeWNsZSBob29rcy4gRXhwZWN0IHBsdWdpbnMgdG8gZGVmaW5lIEFUIExFQVNUXG4vLyB7ZnVuY3Rpb259IF9zZXR1cCAocmVwbGFjZXMgcHJldmlvdXMgY29uc3RydWN0b3IpLFxuLy8ge2Z1bmN0aW9ufSBfZGVzdHJveSAocmVwbGFjZXMgcHJldmlvdXMgZGVzdHJveSlcbmNsYXNzIFBsdWdpbiB7XG5cbiAgY29uc3RydWN0b3IoZWxlbWVudCwgb3B0aW9ucykge1xuICAgIHRoaXMuX3NldHVwKGVsZW1lbnQsIG9wdGlvbnMpO1xuICAgIHZhciBwbHVnaW5OYW1lID0gZ2V0UGx1Z2luTmFtZSh0aGlzKTtcbiAgICB0aGlzLnV1aWQgPSBHZXRZb0RpZ2l0cyg2LCBwbHVnaW5OYW1lKTtcblxuICAgIGlmKCF0aGlzLiRlbGVtZW50LmF0dHIoYGRhdGEtJHtwbHVnaW5OYW1lfWApKXsgdGhpcy4kZWxlbWVudC5hdHRyKGBkYXRhLSR7cGx1Z2luTmFtZX1gLCB0aGlzLnV1aWQpOyB9XG4gICAgaWYoIXRoaXMuJGVsZW1lbnQuZGF0YSgnemZQbHVnaW4nKSl7IHRoaXMuJGVsZW1lbnQuZGF0YSgnemZQbHVnaW4nLCB0aGlzKTsgfVxuICAgIC8qKlxuICAgICAqIEZpcmVzIHdoZW4gdGhlIHBsdWdpbiBoYXMgaW5pdGlhbGl6ZWQuXG4gICAgICogQGV2ZW50IFBsdWdpbiNpbml0XG4gICAgICovXG4gICAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKGBpbml0LnpmLiR7cGx1Z2luTmFtZX1gKTtcbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5fZGVzdHJveSgpO1xuICAgIHZhciBwbHVnaW5OYW1lID0gZ2V0UGx1Z2luTmFtZSh0aGlzKTtcbiAgICB0aGlzLiRlbGVtZW50LnJlbW92ZUF0dHIoYGRhdGEtJHtwbHVnaW5OYW1lfWApLnJlbW92ZURhdGEoJ3pmUGx1Z2luJylcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEZpcmVzIHdoZW4gdGhlIHBsdWdpbiBoYXMgYmVlbiBkZXN0cm95ZWQuXG4gICAgICAgICAqIEBldmVudCBQbHVnaW4jZGVzdHJveWVkXG4gICAgICAgICAqL1xuICAgICAgICAudHJpZ2dlcihgZGVzdHJveWVkLnpmLiR7cGx1Z2luTmFtZX1gKTtcbiAgICBmb3IodmFyIHByb3AgaW4gdGhpcyl7XG4gICAgICB0aGlzW3Byb3BdID0gbnVsbDsvL2NsZWFuIHVwIHNjcmlwdCB0byBwcmVwIGZvciBnYXJiYWdlIGNvbGxlY3Rpb24uXG4gICAgfVxuICB9XG59XG5cbi8vIENvbnZlcnQgUGFzY2FsQ2FzZSB0byBrZWJhYi1jYXNlXG4vLyBUaGFuayB5b3U6IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzg5NTU1ODBcbmZ1bmN0aW9uIGh5cGhlbmF0ZShzdHIpIHtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC8oW2Etel0pKFtBLVpdKS9nLCAnJDEtJDInKS50b0xvd2VyQ2FzZSgpO1xufVxuXG5mdW5jdGlvbiBnZXRQbHVnaW5OYW1lKG9iaikge1xuICBpZih0eXBlb2Yob2JqLmNvbnN0cnVjdG9yLm5hbWUpICE9PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybiBoeXBoZW5hdGUob2JqLmNvbnN0cnVjdG9yLm5hbWUpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBoeXBoZW5hdGUob2JqLmNsYXNzTmFtZSk7XG4gIH1cbn1cblxuZXhwb3J0IHtQbHVnaW59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi5wbHVnaW4uanMiLCJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xyXG5cclxuaW1wb3J0IHdoYXRJbnB1dCBmcm9tICd3aGF0LWlucHV0JztcclxuXHJcbndpbmRvdy4kID0gJDtcclxuXHJcbi8vIGltcG9ydCBGb3VuZGF0aW9uIGZyb20gJ2ZvdW5kYXRpb24tc2l0ZXMnO1xyXG5cclxuLy8gSWYgeW91IHdhbnQgdG8gcGljayBhbmQgY2hvb3NlIHdoaWNoIG1vZHVsZXMgdG8gaW5jbHVkZSwgY29tbWVudCBvdXQgdGhlIGFib3ZlIGFuZCB1bmNvbW1lbnRcclxuLy8gdGhlIGxpbmUgYmVsb3dcclxuaW1wb3J0ICcuL2xpYi9mb3VuZGF0aW9uLWV4cGxpY2l0LXBpZWNlcyc7XHJcblxyXG4kKGRvY3VtZW50KS5mb3VuZGF0aW9uKCk7XHJcblxyXG4vL1xyXG4kKCcudGFiLWlubmVyJykuZmlsdGVyKCc6Zmlyc3QnKS5hZGRDbGFzcygnYWN0aXZlLXRhYicpO1xyXG4kKCcuYmEtdGFiLWNpcmNsZScpLmZpbHRlcignOmZpcnN0JykuYWRkQ2xhc3MoJ2FjdGl2ZS10YWItY2lyY2xlJyk7XHJcblxyXG4kKCcuYmEtc3ltcHRvbXMtdGFicyAudGFiLWlubmVyJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICBsZXQgdGFiX2lkID0gJCh0aGlzKS5hdHRyKCdkYXRhLWlkJyk7XHJcbiAgICAkKCcuYmEtc3ltcHRvbXMtY29udGVudCcpLmZpbmQoJy5iYS10YWItY2lyY2xlJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZS10YWItY2lyY2xlJykuaGlkZSgpO1xyXG4gICAgJCgnLmJhLXN5bXB0b21zLWNvbnRlbnQnKS5maW5kKCcudGFiLWlubmVyJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZS10YWInKTtcclxuICAgICQodGhpcykuYWRkQ2xhc3MoJ2FjdGl2ZS10YWInKTtcclxuICAgICQoJyN0YWItY2lyY2xlLScgKyB0YWJfaWQpLmFkZENsYXNzKCdhY3RpdmUtdGFiLWNpcmNsZScpLmZhZGVJbigpO1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59KVxyXG5cclxuLy8gVGFic1xyXG5cclxuJCgnLnRhYnMtdGl0bGUnKS5maWx0ZXIoJzpmaXJzdCcpLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcclxuJCgnLnRhYnMtdGl0bGUgLmJhLXRlc3RpbW9uaWFsLWNhdC1idXR0b24nKS5maWx0ZXIoJzpmaXJzdCcpLmF0dHIoJ2FyaWEtc2VsZWN0ZWQnLCB0cnVlKTtcclxuXHJcbiQoJy5iYS10ZXN0aW1vbmlhbC1jYXQtYnV0dG9uJykuY2xpY2soZnVuY3Rpb24oKXtcclxuICAgICQuZ2V0U2NyaXB0KCBcIi93cC1jb250ZW50L3RoZW1lcy9zd2VkaXNoYml0dGVyL2xvYWRtb3JlLmpzXCIsIGZ1bmN0aW9uKCBkYXRhLCB0ZXh0U3RhdHVzLCBqcXhociApIHtcclxuXHJcbiAgICB9KTtcclxufSk7XHJcblxyXG5sZXQgdGVzdGltb25pYWxfY2F0O1xyXG5cclxuJChmdW5jdGlvbigpe1xyXG4gICAgJCgnLmJhLXRlc3RpbW9uaWFsLWNhdC1idXR0b24nKS5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgICAgIHRlc3RpbW9uaWFsX2NhdCA9ICQodGhpcykuZGF0YSgndGVzdGltb25pYWxzLWNhdCcpO1xyXG5cclxuICAgICAgICBsZXQgZGF0YSA9IHtcclxuICAgICAgICAgICAgYWN0aW9uOiAnc2ltcGxlX3Rlc3RpbW9uaWFsX3ZpZXcnLFxyXG4gICAgICAgICAgICB0ZXN0aW1vbmlhbENhdDogdGVzdGltb25pYWxfY2F0XHJcbiAgICAgICAgfTtcclxuICAgICAgICAkLnBvc3QoYmFfYWpheCwgZGF0YSwgZnVuY3Rpb24ocmVzcG9uc2Upe1xyXG4gICAgICAgICAgICAkKCcuYmEtdGVzdGltb25pYWxzLWNvbnRlbnRfX3dyYXBwZXInKS5odG1sKHJlc3BvbnNlKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59KTtcclxuXHJcbiQoXCIuYmEtc3ltcHRvbXMtdGVzdGltb25pYWxzXCIpLm9uKFwiY2xpY2tcIixcImFcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpOyAvL9C+0L/Rg9GB0YLQvtGI0LjQvCDRgdGC0LDQvdC00LDRgNGC0L3Rg9GOINC+0LHRgNCw0LHQvtGC0LrRg1xyXG4gICAgdmFyIGlkICA9ICQodGhpcykuYXR0cignaHJlZicpLCAvL9C30LDQsdC10YDQtdC8INCw0LnQtNC40YjQvdC40Log0LHQu9C+0LrQsCDRgSDQv9Cw0YDQsNC80LXRgtGA0L7QvCBVUkxcclxuICAgICAgICB0b3AgPSAkKGlkKS5vZmZzZXQoKS50b3A7IC8v0L7Qv9GA0LXQtNC10LvQuNC8INCy0YvRgdC+0YLRgyDQvtGCINC90LDRh9Cw0LvQsCDRgdGC0YDQsNC90LjRhtGLINC00L4g0Y/QutC+0YDRj1xyXG4gICAgJCgnYm9keSxodG1sJykuYW5pbWF0ZSh7c2Nyb2xsVG9wOiB0b3B9LCAxMDAwKTsgLy/RgdC00LXQu9Cw0LXQvCDQv9GA0L7QutGA0YPRgtC60YMg0LfQsCAxINGBXHJcbn0pO1xyXG5cclxuJCgnW2RhdGEtZmFuY3lib3hdJykuZmFuY3lib3goe1xyXG4gICAgdG91Y2g6IGZhbHNlXHJcbn0pO1xyXG5cclxuLy9Mb2FkZXJcclxud2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgnbG9hZGVkX2hpZGluZycpO1xyXG4gICAgd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgnbG9hZGVkJyk7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdsb2FkZWRfaGlkaW5nJyk7XHJcbiAgICB9LCAxMDAwKTtcclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hc3NldHMvanMvYXBwLmpzIiwiLyoqXG4gKiB3aGF0LWlucHV0IC0gQSBnbG9iYWwgdXRpbGl0eSBmb3IgdHJhY2tpbmcgdGhlIGN1cnJlbnQgaW5wdXQgbWV0aG9kIChtb3VzZSwga2V5Ym9hcmQgb3IgdG91Y2gpLlxuICogQHZlcnNpb24gdjQuMy4xXG4gKiBAbGluayBodHRwczovL2dpdGh1Yi5jb20vdGVuMXNldmVuL3doYXQtaW5wdXRcbiAqIEBsaWNlbnNlIE1JVFxuICovXG4oZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShcIndoYXRJbnB1dFwiLCBbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJ3aGF0SW5wdXRcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wid2hhdElucHV0XCJdID0gZmFjdG9yeSgpO1xufSkodGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gLyoqKioqKi8gKGZ1bmN0aW9uKG1vZHVsZXMpIHsgLy8gd2VicGFja0Jvb3RzdHJhcFxuLyoqKioqKi8gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4vKioqKioqLyBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbi8qKioqKiovIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbi8qKioqKiovIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4vKioqKioqLyBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4vKioqKioqLyBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4vKioqKioqLyBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuLyoqKioqKi8gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4vKioqKioqLyBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuLyoqKioqKi8gXHRcdFx0ZXhwb3J0czoge30sXG4vKioqKioqLyBcdFx0XHRpZDogbW9kdWxlSWQsXG4vKioqKioqLyBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4vKioqKioqLyBcdFx0fTtcblxuLyoqKioqKi8gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuLyoqKioqKi8gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4vKioqKioqLyBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuLyoqKioqKi8gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4vKioqKioqLyBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbi8qKioqKiovIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4vKioqKioqLyBcdH1cblxuXG4vKioqKioqLyBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbi8qKioqKiovIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuLyoqKioqKi8gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4vKioqKioqLyBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLyoqKioqKi8gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcbi8qKioqKiovIH0pXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKioqKi8gKFtcbi8qIDAgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHRtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcblx0ICAvKlxuXHQgICAqIHZhcmlhYmxlc1xuXHQgICAqL1xuXG5cdCAgLy8gbGFzdCB1c2VkIGlucHV0IHR5cGVcblx0ICB2YXIgY3VycmVudElucHV0ID0gJ2luaXRpYWwnO1xuXG5cdCAgLy8gbGFzdCB1c2VkIGlucHV0IGludGVudFxuXHQgIHZhciBjdXJyZW50SW50ZW50ID0gbnVsbDtcblxuXHQgIC8vIGNhY2hlIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudFxuXHQgIHZhciBkb2MgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG5cblx0ICAvLyBmb3JtIGlucHV0IHR5cGVzXG5cdCAgdmFyIGZvcm1JbnB1dHMgPSBbJ2lucHV0JywgJ3NlbGVjdCcsICd0ZXh0YXJlYSddO1xuXG5cdCAgdmFyIGZ1bmN0aW9uTGlzdCA9IFtdO1xuXG5cdCAgLy8gbGlzdCBvZiBtb2RpZmllciBrZXlzIGNvbW1vbmx5IHVzZWQgd2l0aCB0aGUgbW91c2UgYW5kXG5cdCAgLy8gY2FuIGJlIHNhZmVseSBpZ25vcmVkIHRvIHByZXZlbnQgZmFsc2Uga2V5Ym9hcmQgZGV0ZWN0aW9uXG5cdCAgdmFyIGlnbm9yZU1hcCA9IFsxNiwgLy8gc2hpZnRcblx0ICAxNywgLy8gY29udHJvbFxuXHQgIDE4LCAvLyBhbHRcblx0ICA5MSwgLy8gV2luZG93cyBrZXkgLyBsZWZ0IEFwcGxlIGNtZFxuXHQgIDkzIC8vIFdpbmRvd3MgbWVudSAvIHJpZ2h0IEFwcGxlIGNtZFxuXHQgIF07XG5cblx0ICAvLyBsaXN0IG9mIGtleXMgZm9yIHdoaWNoIHdlIGNoYW5nZSBpbnRlbnQgZXZlbiBmb3IgZm9ybSBpbnB1dHNcblx0ICB2YXIgY2hhbmdlSW50ZW50TWFwID0gWzkgLy8gdGFiXG5cdCAgXTtcblxuXHQgIC8vIG1hcHBpbmcgb2YgZXZlbnRzIHRvIGlucHV0IHR5cGVzXG5cdCAgdmFyIGlucHV0TWFwID0ge1xuXHQgICAga2V5ZG93bjogJ2tleWJvYXJkJyxcblx0ICAgIGtleXVwOiAna2V5Ym9hcmQnLFxuXHQgICAgbW91c2Vkb3duOiAnbW91c2UnLFxuXHQgICAgbW91c2Vtb3ZlOiAnbW91c2UnLFxuXHQgICAgTVNQb2ludGVyRG93bjogJ3BvaW50ZXInLFxuXHQgICAgTVNQb2ludGVyTW92ZTogJ3BvaW50ZXInLFxuXHQgICAgcG9pbnRlcmRvd246ICdwb2ludGVyJyxcblx0ICAgIHBvaW50ZXJtb3ZlOiAncG9pbnRlcicsXG5cdCAgICB0b3VjaHN0YXJ0OiAndG91Y2gnXG5cdCAgfTtcblxuXHQgIC8vIGFycmF5IG9mIGFsbCB1c2VkIGlucHV0IHR5cGVzXG5cdCAgdmFyIGlucHV0VHlwZXMgPSBbXTtcblxuXHQgIC8vIGJvb2xlYW46IHRydWUgaWYgdG91Y2ggYnVmZmVyIGlzIGFjdGl2ZVxuXHQgIHZhciBpc0J1ZmZlcmluZyA9IGZhbHNlO1xuXG5cdCAgLy8gYm9vbGVhbjogdHJ1ZSBpZiB0aGUgcGFnZSBpcyBiZWluZyBzY3JvbGxlZFxuXHQgIHZhciBpc1Njcm9sbGluZyA9IGZhbHNlO1xuXG5cdCAgLy8gc3RvcmUgY3VycmVudCBtb3VzZSBwb3NpdGlvblxuXHQgIHZhciBtb3VzZVBvcyA9IHtcblx0ICAgIHg6IG51bGwsXG5cdCAgICB5OiBudWxsXG5cdCAgfTtcblxuXHQgIC8vIG1hcCBvZiBJRSAxMCBwb2ludGVyIGV2ZW50c1xuXHQgIHZhciBwb2ludGVyTWFwID0ge1xuXHQgICAgMjogJ3RvdWNoJyxcblx0ICAgIDM6ICd0b3VjaCcsIC8vIHRyZWF0IHBlbiBsaWtlIHRvdWNoXG5cdCAgICA0OiAnbW91c2UnXG5cdCAgfTtcblxuXHQgIHZhciBzdXBwb3J0c1Bhc3NpdmUgPSBmYWxzZTtcblxuXHQgIHRyeSB7XG5cdCAgICB2YXIgb3B0cyA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgJ3Bhc3NpdmUnLCB7XG5cdCAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuXHQgICAgICAgIHN1cHBvcnRzUGFzc2l2ZSA9IHRydWU7XG5cdCAgICAgIH1cblx0ICAgIH0pO1xuXG5cdCAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndGVzdCcsIG51bGwsIG9wdHMpO1xuXHQgIH0gY2F0Y2ggKGUpIHt9XG5cblx0ICAvKlxuXHQgICAqIHNldCB1cFxuXHQgICAqL1xuXG5cdCAgdmFyIHNldFVwID0gZnVuY3Rpb24gc2V0VXAoKSB7XG5cdCAgICAvLyBhZGQgY29ycmVjdCBtb3VzZSB3aGVlbCBldmVudCBtYXBwaW5nIHRvIGBpbnB1dE1hcGBcblx0ICAgIGlucHV0TWFwW2RldGVjdFdoZWVsKCldID0gJ21vdXNlJztcblxuXHQgICAgYWRkTGlzdGVuZXJzKCk7XG5cdCAgICBzZXRJbnB1dCgpO1xuXHQgIH07XG5cblx0ICAvKlxuXHQgICAqIGV2ZW50c1xuXHQgICAqL1xuXG5cdCAgdmFyIGFkZExpc3RlbmVycyA9IGZ1bmN0aW9uIGFkZExpc3RlbmVycygpIHtcblx0ICAgIC8vIGBwb2ludGVybW92ZWAsIGBNU1BvaW50ZXJNb3ZlYCwgYG1vdXNlbW92ZWAgYW5kIG1vdXNlIHdoZWVsIGV2ZW50IGJpbmRpbmdcblx0ICAgIC8vIGNhbiBvbmx5IGRlbW9uc3RyYXRlIHBvdGVudGlhbCwgYnV0IG5vdCBhY3R1YWwsIGludGVyYWN0aW9uXG5cdCAgICAvLyBhbmQgYXJlIHRyZWF0ZWQgc2VwYXJhdGVseVxuXHQgICAgdmFyIG9wdGlvbnMgPSBzdXBwb3J0c1Bhc3NpdmUgPyB7IHBhc3NpdmU6IHRydWUgfSA6IGZhbHNlO1xuXG5cdCAgICAvLyBwb2ludGVyIGV2ZW50cyAobW91c2UsIHBlbiwgdG91Y2gpXG5cdCAgICBpZiAod2luZG93LlBvaW50ZXJFdmVudCkge1xuXHQgICAgICBkb2MuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcmRvd24nLCB1cGRhdGVJbnB1dCk7XG5cdCAgICAgIGRvYy5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVybW92ZScsIHNldEludGVudCk7XG5cdCAgICB9IGVsc2UgaWYgKHdpbmRvdy5NU1BvaW50ZXJFdmVudCkge1xuXHQgICAgICBkb2MuYWRkRXZlbnRMaXN0ZW5lcignTVNQb2ludGVyRG93bicsIHVwZGF0ZUlucHV0KTtcblx0ICAgICAgZG9jLmFkZEV2ZW50TGlzdGVuZXIoJ01TUG9pbnRlck1vdmUnLCBzZXRJbnRlbnQpO1xuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgLy8gbW91c2UgZXZlbnRzXG5cdCAgICAgIGRvYy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB1cGRhdGVJbnB1dCk7XG5cdCAgICAgIGRvYy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBzZXRJbnRlbnQpO1xuXG5cdCAgICAgIC8vIHRvdWNoIGV2ZW50c1xuXHQgICAgICBpZiAoJ29udG91Y2hzdGFydCcgaW4gd2luZG93KSB7XG5cdCAgICAgICAgZG9jLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0b3VjaEJ1ZmZlciwgb3B0aW9ucyk7XG5cdCAgICAgICAgZG9jLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdG91Y2hCdWZmZXIpO1xuXHQgICAgICB9XG5cdCAgICB9XG5cblx0ICAgIC8vIG1vdXNlIHdoZWVsXG5cdCAgICBkb2MuYWRkRXZlbnRMaXN0ZW5lcihkZXRlY3RXaGVlbCgpLCBzZXRJbnRlbnQsIG9wdGlvbnMpO1xuXG5cdCAgICAvLyBrZXlib2FyZCBldmVudHNcblx0ICAgIGRvYy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdXBkYXRlSW5wdXQpO1xuXHQgICAgZG9jLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgdXBkYXRlSW5wdXQpO1xuXHQgIH07XG5cblx0ICAvLyBjaGVja3MgY29uZGl0aW9ucyBiZWZvcmUgdXBkYXRpbmcgbmV3IGlucHV0XG5cdCAgdmFyIHVwZGF0ZUlucHV0ID0gZnVuY3Rpb24gdXBkYXRlSW5wdXQoZXZlbnQpIHtcblx0ICAgIC8vIG9ubHkgZXhlY3V0ZSBpZiB0aGUgdG91Y2ggYnVmZmVyIHRpbWVyIGlzbid0IHJ1bm5pbmdcblx0ICAgIGlmICghaXNCdWZmZXJpbmcpIHtcblx0ICAgICAgdmFyIGV2ZW50S2V5ID0gZXZlbnQud2hpY2g7XG5cdCAgICAgIHZhciB2YWx1ZSA9IGlucHV0TWFwW2V2ZW50LnR5cGVdO1xuXHQgICAgICBpZiAodmFsdWUgPT09ICdwb2ludGVyJykgdmFsdWUgPSBwb2ludGVyVHlwZShldmVudCk7XG5cblx0ICAgICAgaWYgKGN1cnJlbnRJbnB1dCAhPT0gdmFsdWUgfHwgY3VycmVudEludGVudCAhPT0gdmFsdWUpIHtcblx0ICAgICAgICB2YXIgYWN0aXZlRWxlbSA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG5cdCAgICAgICAgdmFyIGFjdGl2ZUlucHV0ID0gZmFsc2U7XG5cdCAgICAgICAgdmFyIG5vdEZvcm1JbnB1dCA9IGFjdGl2ZUVsZW0gJiYgYWN0aXZlRWxlbS5ub2RlTmFtZSAmJiBmb3JtSW5wdXRzLmluZGV4T2YoYWN0aXZlRWxlbS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpKSA9PT0gLTE7XG5cblx0ICAgICAgICBpZiAobm90Rm9ybUlucHV0IHx8IGNoYW5nZUludGVudE1hcC5pbmRleE9mKGV2ZW50S2V5KSAhPT0gLTEpIHtcblx0ICAgICAgICAgIGFjdGl2ZUlucHV0ID0gdHJ1ZTtcblx0ICAgICAgICB9XG5cblx0ICAgICAgICBpZiAodmFsdWUgPT09ICd0b3VjaCcgfHxcblx0ICAgICAgICAvLyBpZ25vcmUgbW91c2UgbW9kaWZpZXIga2V5c1xuXHQgICAgICAgIHZhbHVlID09PSAnbW91c2UnIHx8XG5cdCAgICAgICAgLy8gZG9uJ3Qgc3dpdGNoIGlmIHRoZSBjdXJyZW50IGVsZW1lbnQgaXMgYSBmb3JtIGlucHV0XG5cdCAgICAgICAgdmFsdWUgPT09ICdrZXlib2FyZCcgJiYgZXZlbnRLZXkgJiYgYWN0aXZlSW5wdXQgJiYgaWdub3JlTWFwLmluZGV4T2YoZXZlbnRLZXkpID09PSAtMSkge1xuXHQgICAgICAgICAgLy8gc2V0IHRoZSBjdXJyZW50IGFuZCBjYXRjaC1hbGwgdmFyaWFibGVcblx0ICAgICAgICAgIGN1cnJlbnRJbnB1dCA9IGN1cnJlbnRJbnRlbnQgPSB2YWx1ZTtcblxuXHQgICAgICAgICAgc2V0SW5wdXQoKTtcblx0ICAgICAgICB9XG5cdCAgICAgIH1cblx0ICAgIH1cblx0ICB9O1xuXG5cdCAgLy8gdXBkYXRlcyB0aGUgZG9jIGFuZCBgaW5wdXRUeXBlc2AgYXJyYXkgd2l0aCBuZXcgaW5wdXRcblx0ICB2YXIgc2V0SW5wdXQgPSBmdW5jdGlvbiBzZXRJbnB1dCgpIHtcblx0ICAgIGRvYy5zZXRBdHRyaWJ1dGUoJ2RhdGEtd2hhdGlucHV0JywgY3VycmVudElucHV0KTtcblx0ICAgIGRvYy5zZXRBdHRyaWJ1dGUoJ2RhdGEtd2hhdGludGVudCcsIGN1cnJlbnRJbnB1dCk7XG5cblx0ICAgIGlmIChpbnB1dFR5cGVzLmluZGV4T2YoY3VycmVudElucHV0KSA9PT0gLTEpIHtcblx0ICAgICAgaW5wdXRUeXBlcy5wdXNoKGN1cnJlbnRJbnB1dCk7XG5cdCAgICAgIGRvYy5jbGFzc05hbWUgKz0gJyB3aGF0aW5wdXQtdHlwZXMtJyArIGN1cnJlbnRJbnB1dDtcblx0ICAgIH1cblxuXHQgICAgZmlyZUZ1bmN0aW9ucygnaW5wdXQnKTtcblx0ICB9O1xuXG5cdCAgLy8gdXBkYXRlcyBpbnB1dCBpbnRlbnQgZm9yIGBtb3VzZW1vdmVgIGFuZCBgcG9pbnRlcm1vdmVgXG5cdCAgdmFyIHNldEludGVudCA9IGZ1bmN0aW9uIHNldEludGVudChldmVudCkge1xuXHQgICAgLy8gdGVzdCB0byBzZWUgaWYgYG1vdXNlbW92ZWAgaGFwcGVuZWQgcmVsYXRpdmUgdG8gdGhlIHNjcmVlblxuXHQgICAgLy8gdG8gZGV0ZWN0IHNjcm9sbGluZyB2ZXJzdXMgbW91c2Vtb3ZlXG5cdCAgICBpZiAobW91c2VQb3NbJ3gnXSAhPT0gZXZlbnQuc2NyZWVuWCB8fCBtb3VzZVBvc1sneSddICE9PSBldmVudC5zY3JlZW5ZKSB7XG5cdCAgICAgIGlzU2Nyb2xsaW5nID0gZmFsc2U7XG5cblx0ICAgICAgbW91c2VQb3NbJ3gnXSA9IGV2ZW50LnNjcmVlblg7XG5cdCAgICAgIG1vdXNlUG9zWyd5J10gPSBldmVudC5zY3JlZW5ZO1xuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgaXNTY3JvbGxpbmcgPSB0cnVlO1xuXHQgICAgfVxuXG5cdCAgICAvLyBvbmx5IGV4ZWN1dGUgaWYgdGhlIHRvdWNoIGJ1ZmZlciB0aW1lciBpc24ndCBydW5uaW5nXG5cdCAgICAvLyBvciBzY3JvbGxpbmcgaXNuJ3QgaGFwcGVuaW5nXG5cdCAgICBpZiAoIWlzQnVmZmVyaW5nICYmICFpc1Njcm9sbGluZykge1xuXHQgICAgICB2YXIgdmFsdWUgPSBpbnB1dE1hcFtldmVudC50eXBlXTtcblx0ICAgICAgaWYgKHZhbHVlID09PSAncG9pbnRlcicpIHZhbHVlID0gcG9pbnRlclR5cGUoZXZlbnQpO1xuXG5cdCAgICAgIGlmIChjdXJyZW50SW50ZW50ICE9PSB2YWx1ZSkge1xuXHQgICAgICAgIGN1cnJlbnRJbnRlbnQgPSB2YWx1ZTtcblxuXHQgICAgICAgIGRvYy5zZXRBdHRyaWJ1dGUoJ2RhdGEtd2hhdGludGVudCcsIGN1cnJlbnRJbnRlbnQpO1xuXG5cdCAgICAgICAgZmlyZUZ1bmN0aW9ucygnaW50ZW50Jyk7XG5cdCAgICAgIH1cblx0ICAgIH1cblx0ICB9O1xuXG5cdCAgLy8gYnVmZmVycyB0b3VjaCBldmVudHMgYmVjYXVzZSB0aGV5IGZyZXF1ZW50bHkgYWxzbyBmaXJlIG1vdXNlIGV2ZW50c1xuXHQgIHZhciB0b3VjaEJ1ZmZlciA9IGZ1bmN0aW9uIHRvdWNoQnVmZmVyKGV2ZW50KSB7XG5cdCAgICBpZiAoZXZlbnQudHlwZSA9PT0gJ3RvdWNoc3RhcnQnKSB7XG5cdCAgICAgIGlzQnVmZmVyaW5nID0gZmFsc2U7XG5cblx0ICAgICAgLy8gc2V0IHRoZSBjdXJyZW50IGlucHV0XG5cdCAgICAgIHVwZGF0ZUlucHV0KGV2ZW50KTtcblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgIGlzQnVmZmVyaW5nID0gdHJ1ZTtcblx0ICAgIH1cblx0ICB9O1xuXG5cdCAgdmFyIGZpcmVGdW5jdGlvbnMgPSBmdW5jdGlvbiBmaXJlRnVuY3Rpb25zKHR5cGUpIHtcblx0ICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBmdW5jdGlvbkxpc3QubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcblx0ICAgICAgaWYgKGZ1bmN0aW9uTGlzdFtpXS50eXBlID09PSB0eXBlKSB7XG5cdCAgICAgICAgZnVuY3Rpb25MaXN0W2ldLmZuLmNhbGwodW5kZWZpbmVkLCBjdXJyZW50SW50ZW50KTtcblx0ICAgICAgfVxuXHQgICAgfVxuXHQgIH07XG5cblx0ICAvKlxuXHQgICAqIHV0aWxpdGllc1xuXHQgICAqL1xuXG5cdCAgdmFyIHBvaW50ZXJUeXBlID0gZnVuY3Rpb24gcG9pbnRlclR5cGUoZXZlbnQpIHtcblx0ICAgIGlmICh0eXBlb2YgZXZlbnQucG9pbnRlclR5cGUgPT09ICdudW1iZXInKSB7XG5cdCAgICAgIHJldHVybiBwb2ludGVyTWFwW2V2ZW50LnBvaW50ZXJUeXBlXTtcblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgIC8vIHRyZWF0IHBlbiBsaWtlIHRvdWNoXG5cdCAgICAgIHJldHVybiBldmVudC5wb2ludGVyVHlwZSA9PT0gJ3BlbicgPyAndG91Y2gnIDogZXZlbnQucG9pbnRlclR5cGU7XG5cdCAgICB9XG5cdCAgfTtcblxuXHQgIC8vIGRldGVjdCB2ZXJzaW9uIG9mIG1vdXNlIHdoZWVsIGV2ZW50IHRvIHVzZVxuXHQgIC8vIHZpYSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9FdmVudHMvd2hlZWxcblx0ICB2YXIgZGV0ZWN0V2hlZWwgPSBmdW5jdGlvbiBkZXRlY3RXaGVlbCgpIHtcblx0ICAgIHZhciB3aGVlbFR5cGUgPSB2b2lkIDA7XG5cblx0ICAgIC8vIE1vZGVybiBicm93c2VycyBzdXBwb3J0IFwid2hlZWxcIlxuXHQgICAgaWYgKCdvbndoZWVsJyBpbiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSkge1xuXHQgICAgICB3aGVlbFR5cGUgPSAnd2hlZWwnO1xuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgLy8gV2Via2l0IGFuZCBJRSBzdXBwb3J0IGF0IGxlYXN0IFwibW91c2V3aGVlbFwiXG5cdCAgICAgIC8vIG9yIGFzc3VtZSB0aGF0IHJlbWFpbmluZyBicm93c2VycyBhcmUgb2xkZXIgRmlyZWZveFxuXHQgICAgICB3aGVlbFR5cGUgPSBkb2N1bWVudC5vbm1vdXNld2hlZWwgIT09IHVuZGVmaW5lZCA/ICdtb3VzZXdoZWVsJyA6ICdET01Nb3VzZVNjcm9sbCc7XG5cdCAgICB9XG5cblx0ICAgIHJldHVybiB3aGVlbFR5cGU7XG5cdCAgfTtcblxuXHQgIHZhciBvYmpQb3MgPSBmdW5jdGlvbiBvYmpQb3MobWF0Y2gpIHtcblx0ICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBmdW5jdGlvbkxpc3QubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcblx0ICAgICAgaWYgKGZ1bmN0aW9uTGlzdFtpXS5mbiA9PT0gbWF0Y2gpIHtcblx0ICAgICAgICByZXR1cm4gaTtcblx0ICAgICAgfVxuXHQgICAgfVxuXHQgIH07XG5cblx0ICAvKlxuXHQgICAqIGluaXRcblx0ICAgKi9cblxuXHQgIC8vIGRvbid0IHN0YXJ0IHNjcmlwdCB1bmxlc3MgYnJvd3NlciBjdXRzIHRoZSBtdXN0YXJkXG5cdCAgLy8gKGFsc28gcGFzc2VzIGlmIHBvbHlmaWxscyBhcmUgdXNlZClcblx0ICBpZiAoJ2FkZEV2ZW50TGlzdGVuZXInIGluIHdpbmRvdyAmJiBBcnJheS5wcm90b3R5cGUuaW5kZXhPZikge1xuXHQgICAgc2V0VXAoKTtcblx0ICB9XG5cblx0ICAvKlxuXHQgICAqIGFwaVxuXHQgICAqL1xuXG5cdCAgcmV0dXJuIHtcblx0ICAgIC8vIHJldHVybnMgc3RyaW5nOiB0aGUgY3VycmVudCBpbnB1dCB0eXBlXG5cdCAgICAvLyBvcHQ6ICdsb29zZSd8J3N0cmljdCdcblx0ICAgIC8vICdzdHJpY3QnIChkZWZhdWx0KTogcmV0dXJucyB0aGUgc2FtZSB2YWx1ZSBhcyB0aGUgYGRhdGEtd2hhdGlucHV0YCBhdHRyaWJ1dGVcblx0ICAgIC8vICdsb29zZSc6IGluY2x1ZGVzIGBkYXRhLXdoYXRpbnRlbnRgIHZhbHVlIGlmIGl0J3MgbW9yZSBjdXJyZW50IHRoYW4gYGRhdGEtd2hhdGlucHV0YFxuXHQgICAgYXNrOiBmdW5jdGlvbiBhc2sob3B0KSB7XG5cdCAgICAgIHJldHVybiBvcHQgPT09ICdsb29zZScgPyBjdXJyZW50SW50ZW50IDogY3VycmVudElucHV0O1xuXHQgICAgfSxcblxuXHQgICAgLy8gcmV0dXJucyBhcnJheTogYWxsIHRoZSBkZXRlY3RlZCBpbnB1dCB0eXBlc1xuXHQgICAgdHlwZXM6IGZ1bmN0aW9uIHR5cGVzKCkge1xuXHQgICAgICByZXR1cm4gaW5wdXRUeXBlcztcblx0ICAgIH0sXG5cblx0ICAgIC8vIG92ZXJ3cml0ZXMgaWdub3JlZCBrZXlzIHdpdGggcHJvdmlkZWQgYXJyYXlcblx0ICAgIGlnbm9yZUtleXM6IGZ1bmN0aW9uIGlnbm9yZUtleXMoYXJyKSB7XG5cdCAgICAgIGlnbm9yZU1hcCA9IGFycjtcblx0ICAgIH0sXG5cblx0ICAgIC8vIGF0dGFjaCBmdW5jdGlvbnMgdG8gaW5wdXQgYW5kIGludGVudCBcImV2ZW50c1wiXG5cdCAgICAvLyBmdW5jdDogZnVuY3Rpb24gdG8gZmlyZSBvbiBjaGFuZ2Vcblx0ICAgIC8vIGV2ZW50VHlwZTogJ2lucHV0J3wnaW50ZW50J1xuXHQgICAgcmVnaXN0ZXJPbkNoYW5nZTogZnVuY3Rpb24gcmVnaXN0ZXJPbkNoYW5nZShmbiwgZXZlbnRUeXBlKSB7XG5cdCAgICAgIGZ1bmN0aW9uTGlzdC5wdXNoKHtcblx0ICAgICAgICBmbjogZm4sXG5cdCAgICAgICAgdHlwZTogZXZlbnRUeXBlIHx8ICdpbnB1dCdcblx0ICAgICAgfSk7XG5cdCAgICB9LFxuXG5cdCAgICB1blJlZ2lzdGVyT25DaGFuZ2U6IGZ1bmN0aW9uIHVuUmVnaXN0ZXJPbkNoYW5nZShmbikge1xuXHQgICAgICB2YXIgcG9zaXRpb24gPSBvYmpQb3MoZm4pO1xuXG5cdCAgICAgIGlmIChwb3NpdGlvbikge1xuXHQgICAgICAgIGZ1bmN0aW9uTGlzdC5zcGxpY2UocG9zaXRpb24sIDEpO1xuXHQgICAgICB9XG5cdCAgICB9XG5cdCAgfTtcblx0fSgpO1xuXG4vKioqLyB9XG4vKioqKioqLyBdKVxufSk7XG47XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvd2hhdC1pbnB1dC9kaXN0L3doYXQtaW5wdXQuanNcbi8vIG1vZHVsZSBpZCA9IDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcclxuaW1wb3J0IHsgRm91bmRhdGlvbiB9IGZyb20gJ2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi5jb3JlJztcclxuLy8gaW1wb3J0IHsgcnRsLCBHZXRZb0RpZ2l0cywgdHJhbnNpdGlvbmVuZCB9IGZyb20gJ2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi51dGlsLmNvcmUnO1xyXG4vLyBpbXBvcnQgeyBCb3ggfSBmcm9tICdmb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24udXRpbC5ib3gnXHJcbi8vIGltcG9ydCB7IG9uSW1hZ2VzTG9hZGVkIH0gZnJvbSAnZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLnV0aWwuaW1hZ2VMb2FkZXInO1xyXG5pbXBvcnQgeyBLZXlib2FyZCB9IGZyb20gJ2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi51dGlsLmtleWJvYXJkJztcclxuaW1wb3J0IHsgTWVkaWFRdWVyeSB9IGZyb20gJ2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi51dGlsLm1lZGlhUXVlcnknO1xyXG4vLyBpbXBvcnQgeyBNb3Rpb24sIE1vdmUgfSBmcm9tICdmb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24udXRpbC5tb3Rpb24nO1xyXG4vLyBpbXBvcnQgeyBOZXN0IH0gZnJvbSAnZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLnV0aWwubmVzdCc7XHJcbi8vIGltcG9ydCB7IFRpbWVyIH0gZnJvbSAnZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLnV0aWwudGltZXInO1xyXG4vLyBpbXBvcnQgeyBUb3VjaCB9IGZyb20gJ2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi51dGlsLnRvdWNoJztcclxuaW1wb3J0IHsgVHJpZ2dlcnMgfSBmcm9tICdmb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24udXRpbC50cmlnZ2Vycyc7XHJcbi8vIGltcG9ydCB7IEFiaWRlIH0gZnJvbSAnZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLmFiaWRlJztcclxuLy8gaW1wb3J0IHsgQWNjb3JkaW9uIH0gZnJvbSAnZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLmFjY29yZGlvbic7XHJcbi8vIGltcG9ydCB7IEFjY29yZGlvbk1lbnUgfSBmcm9tICdmb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24uYWNjb3JkaW9uTWVudSc7XHJcbi8vIGltcG9ydCB7IERyaWxsZG93biB9IGZyb20gJ2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi5kcmlsbGRvd24nO1xyXG4vLyBpbXBvcnQgeyBEcm9wZG93biB9IGZyb20gJ2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi5kcm9wZG93bic7XHJcbi8vIGltcG9ydCB7IERyb3Bkb3duTWVudSB9IGZyb20gJ2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi5kcm9wZG93bk1lbnUnO1xyXG4vLyBpbXBvcnQgeyBFcXVhbGl6ZXIgfSBmcm9tICdmb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24uZXF1YWxpemVyJztcclxuLy8gaW1wb3J0IHsgSW50ZXJjaGFuZ2UgfSBmcm9tICdmb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24uaW50ZXJjaGFuZ2UnO1xyXG4vLyBpbXBvcnQgeyBNYWdlbGxhbiB9IGZyb20gJ2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi5tYWdlbGxhbic7XHJcbmltcG9ydCB7IE9mZkNhbnZhcyB9IGZyb20gJ2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi5vZmZjYW52YXMnO1xyXG4vLyBpbXBvcnQgeyBPcmJpdCB9IGZyb20gJ2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi5vcmJpdCc7XHJcbi8vIGltcG9ydCB7IFJlc3BvbnNpdmVNZW51IH0gZnJvbSAnZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLnJlc3BvbnNpdmVNZW51JztcclxuLy8gaW1wb3J0IHsgUmVzcG9uc2l2ZVRvZ2dsZSB9IGZyb20gJ2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi5yZXNwb25zaXZlVG9nZ2xlJztcclxuLy8gaW1wb3J0IHsgUmV2ZWFsIH0gZnJvbSAnZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLnJldmVhbCc7XHJcbi8vIGltcG9ydCB7IFNsaWRlciB9IGZyb20gJ2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi5zbGlkZXInO1xyXG4vLyBpbXBvcnQgeyBTbW9vdGhTY3JvbGwgfSBmcm9tICdmb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24uc21vb3RoU2Nyb2xsJztcclxuLy8gaW1wb3J0IHsgU3RpY2t5IH0gZnJvbSAnZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLnN0aWNreSc7XHJcbmltcG9ydCB7IFRhYnMgfSBmcm9tICdmb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24udGFicyc7XHJcbi8vIGltcG9ydCB7IFRvZ2dsZXIgfSBmcm9tICdmb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24udG9nZ2xlcic7XHJcbi8vIGltcG9ydCB7IFRvb2x0aXAgfSBmcm9tICdmb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24udG9vbHRpcCc7XHJcbi8vIGltcG9ydCB7IFJlc3BvbnNpdmVBY2NvcmRpb25UYWJzIH0gZnJvbSAnZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLnJlc3BvbnNpdmVBY2NvcmRpb25UYWJzJztcclxuXHJcblxyXG5Gb3VuZGF0aW9uLmFkZFRvSnF1ZXJ5KCQpO1xyXG5cclxuLy8gQWRkIEZvdW5kYXRpb24gVXRpbHMgdG8gRm91bmRhdGlvbiBnbG9iYWwgbmFtZXNwYWNlIGZvciBiYWNrd2FyZHNcclxuLy8gY29tcGF0aWJpbGl0eS5cclxuXHJcbi8vIEZvdW5kYXRpb24ucnRsID0gcnRsO1xyXG4vLyBGb3VuZGF0aW9uLkdldFlvRGlnaXRzID0gR2V0WW9EaWdpdHM7XHJcbi8vIEZvdW5kYXRpb24udHJhbnNpdGlvbmVuZCA9IHRyYW5zaXRpb25lbmQ7XHJcbi8vXHJcbi8vIEZvdW5kYXRpb24uQm94ID0gQm94O1xyXG4vLyBGb3VuZGF0aW9uLm9uSW1hZ2VzTG9hZGVkID0gb25JbWFnZXNMb2FkZWQ7XHJcbkZvdW5kYXRpb24uS2V5Ym9hcmQgPSBLZXlib2FyZDtcclxuRm91bmRhdGlvbi5NZWRpYVF1ZXJ5ID0gTWVkaWFRdWVyeTtcclxuLy8gRm91bmRhdGlvbi5Nb3Rpb24gPSBNb3Rpb247XHJcbi8vIEZvdW5kYXRpb24uTW92ZSA9IE1vdmU7XHJcbi8vIEZvdW5kYXRpb24uTmVzdCA9IE5lc3Q7XHJcbi8vIEZvdW5kYXRpb24uVGltZXIgPSBUaW1lcjtcclxuXHJcbi8vIFRvdWNoIGFuZCBUcmlnZ2VycyBwcmV2aW91c2x5IHdlcmUgYWxtb3N0IHB1cmVseSBzZWRlIGVmZmVjdCBkcml2ZW4sXHJcbi8vIHNvIG5vIC8vIG5lZWQgdG8gYWRkIGl0IHRvIEZvdW5kYXRpb24sIGp1c3QgaW5pdCB0aGVtLlxyXG5cclxuLy8gVG91Y2guaW5pdCgkKTtcclxuXHJcblRyaWdnZXJzLmluaXQoJCwgRm91bmRhdGlvbik7XHJcbi8vXHJcbi8vIEZvdW5kYXRpb24ucGx1Z2luKEFiaWRlLCAnQWJpZGUnKTtcclxuLy9cclxuLy8gRm91bmRhdGlvbi5wbHVnaW4oQWNjb3JkaW9uLCAnQWNjb3JkaW9uJyk7XHJcbi8vXHJcbi8vIEZvdW5kYXRpb24ucGx1Z2luKEFjY29yZGlvbk1lbnUsICdBY2NvcmRpb25NZW51Jyk7XHJcbi8vXHJcbi8vIEZvdW5kYXRpb24ucGx1Z2luKERyaWxsZG93biwgJ0RyaWxsZG93bicpO1xyXG4vL1xyXG4vLyBGb3VuZGF0aW9uLnBsdWdpbihEcm9wZG93biwgJ0Ryb3Bkb3duJyk7XHJcbi8vXHJcbi8vIEZvdW5kYXRpb24ucGx1Z2luKERyb3Bkb3duTWVudSwgJ0Ryb3Bkb3duTWVudScpO1xyXG4vL1xyXG4vLyBGb3VuZGF0aW9uLnBsdWdpbihFcXVhbGl6ZXIsICdFcXVhbGl6ZXInKTtcclxuLy9cclxuLy8gRm91bmRhdGlvbi5wbHVnaW4oSW50ZXJjaGFuZ2UsICdJbnRlcmNoYW5nZScpO1xyXG4vL1xyXG4vLyBGb3VuZGF0aW9uLnBsdWdpbihNYWdlbGxhbiwgJ01hZ2VsbGFuJyk7XHJcbi8vXHJcbkZvdW5kYXRpb24ucGx1Z2luKE9mZkNhbnZhcywgJ09mZkNhbnZhcycpO1xyXG4vL1xyXG4vLyBGb3VuZGF0aW9uLnBsdWdpbihPcmJpdCwgJ09yYml0Jyk7XHJcbi8vXHJcbi8vIEZvdW5kYXRpb24ucGx1Z2luKFJlc3BvbnNpdmVNZW51LCAnUmVzcG9uc2l2ZU1lbnUnKTtcclxuLy9cclxuLy8gRm91bmRhdGlvbi5wbHVnaW4oUmVzcG9uc2l2ZVRvZ2dsZSwgJ1Jlc3BvbnNpdmVUb2dnbGUnKTtcclxuLy9cclxuLy8gRm91bmRhdGlvbi5wbHVnaW4oUmV2ZWFsLCAnUmV2ZWFsJyk7XHJcbi8vXHJcbi8vIEZvdW5kYXRpb24ucGx1Z2luKFNsaWRlciwgJ1NsaWRlcicpO1xyXG4vL1xyXG4vLyBGb3VuZGF0aW9uLnBsdWdpbihTbW9vdGhTY3JvbGwsICdTbW9vdGhTY3JvbGwnKTtcclxuLy9cclxuLy8gRm91bmRhdGlvbi5wbHVnaW4oU3RpY2t5LCAnU3RpY2t5Jyk7XHJcbi8vXHJcbkZvdW5kYXRpb24ucGx1Z2luKFRhYnMsICdUYWJzJyk7XHJcbi8vXHJcbi8vIEZvdW5kYXRpb24ucGx1Z2luKFRvZ2dsZXIsICdUb2dnbGVyJyk7XHJcbi8vXHJcbi8vIEZvdW5kYXRpb24ucGx1Z2luKFRvb2x0aXAsICdUb29sdGlwJyk7XHJcbi8vXHJcbi8vIEZvdW5kYXRpb24ucGx1Z2luKFJlc3BvbnNpdmVBY2NvcmRpb25UYWJzLCAnUmVzcG9uc2l2ZUFjY29yZGlvblRhYnMnKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRm91bmRhdGlvbjtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2Fzc2V0cy9qcy9saWIvZm91bmRhdGlvbi1leHBsaWNpdC1waWVjZXMuanMiLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcbmltcG9ydCB7IEdldFlvRGlnaXRzIH0gZnJvbSAnLi9mb3VuZGF0aW9uLnV0aWwuY29yZSc7XG5pbXBvcnQgeyBNZWRpYVF1ZXJ5IH0gZnJvbSAnLi9mb3VuZGF0aW9uLnV0aWwubWVkaWFRdWVyeSc7XG5cbnZhciBGT1VOREFUSU9OX1ZFUlNJT04gPSAnNi40LjMnO1xuXG4vLyBHbG9iYWwgRm91bmRhdGlvbiBvYmplY3Rcbi8vIFRoaXMgaXMgYXR0YWNoZWQgdG8gdGhlIHdpbmRvdywgb3IgdXNlZCBhcyBhIG1vZHVsZSBmb3IgQU1EL0Jyb3dzZXJpZnlcbnZhciBGb3VuZGF0aW9uID0ge1xuICB2ZXJzaW9uOiBGT1VOREFUSU9OX1ZFUlNJT04sXG5cbiAgLyoqXG4gICAqIFN0b3JlcyBpbml0aWFsaXplZCBwbHVnaW5zLlxuICAgKi9cbiAgX3BsdWdpbnM6IHt9LFxuXG4gIC8qKlxuICAgKiBTdG9yZXMgZ2VuZXJhdGVkIHVuaXF1ZSBpZHMgZm9yIHBsdWdpbiBpbnN0YW5jZXNcbiAgICovXG4gIF91dWlkczogW10sXG5cbiAgLyoqXG4gICAqIERlZmluZXMgYSBGb3VuZGF0aW9uIHBsdWdpbiwgYWRkaW5nIGl0IHRvIHRoZSBgRm91bmRhdGlvbmAgbmFtZXNwYWNlIGFuZCB0aGUgbGlzdCBvZiBwbHVnaW5zIHRvIGluaXRpYWxpemUgd2hlbiByZWZsb3dpbmcuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwbHVnaW4gLSBUaGUgY29uc3RydWN0b3Igb2YgdGhlIHBsdWdpbi5cbiAgICovXG4gIHBsdWdpbjogZnVuY3Rpb24ocGx1Z2luLCBuYW1lKSB7XG4gICAgLy8gT2JqZWN0IGtleSB0byB1c2Ugd2hlbiBhZGRpbmcgdG8gZ2xvYmFsIEZvdW5kYXRpb24gb2JqZWN0XG4gICAgLy8gRXhhbXBsZXM6IEZvdW5kYXRpb24uUmV2ZWFsLCBGb3VuZGF0aW9uLk9mZkNhbnZhc1xuICAgIHZhciBjbGFzc05hbWUgPSAobmFtZSB8fCBmdW5jdGlvbk5hbWUocGx1Z2luKSk7XG4gICAgLy8gT2JqZWN0IGtleSB0byB1c2Ugd2hlbiBzdG9yaW5nIHRoZSBwbHVnaW4sIGFsc28gdXNlZCB0byBjcmVhdGUgdGhlIGlkZW50aWZ5aW5nIGRhdGEgYXR0cmlidXRlIGZvciB0aGUgcGx1Z2luXG4gICAgLy8gRXhhbXBsZXM6IGRhdGEtcmV2ZWFsLCBkYXRhLW9mZi1jYW52YXNcbiAgICB2YXIgYXR0ck5hbWUgID0gaHlwaGVuYXRlKGNsYXNzTmFtZSk7XG5cbiAgICAvLyBBZGQgdG8gdGhlIEZvdW5kYXRpb24gb2JqZWN0IGFuZCB0aGUgcGx1Z2lucyBsaXN0IChmb3IgcmVmbG93aW5nKVxuICAgIHRoaXMuX3BsdWdpbnNbYXR0ck5hbWVdID0gdGhpc1tjbGFzc05hbWVdID0gcGx1Z2luO1xuICB9LFxuICAvKipcbiAgICogQGZ1bmN0aW9uXG4gICAqIFBvcHVsYXRlcyB0aGUgX3V1aWRzIGFycmF5IHdpdGggcG9pbnRlcnMgdG8gZWFjaCBpbmRpdmlkdWFsIHBsdWdpbiBpbnN0YW5jZS5cbiAgICogQWRkcyB0aGUgYHpmUGx1Z2luYCBkYXRhLWF0dHJpYnV0ZSB0byBwcm9ncmFtbWF0aWNhbGx5IGNyZWF0ZWQgcGx1Z2lucyB0byBhbGxvdyB1c2Ugb2YgJChzZWxlY3RvcikuZm91bmRhdGlvbihtZXRob2QpIGNhbGxzLlxuICAgKiBBbHNvIGZpcmVzIHRoZSBpbml0aWFsaXphdGlvbiBldmVudCBmb3IgZWFjaCBwbHVnaW4sIGNvbnNvbGlkYXRpbmcgcmVwZXRpdGl2ZSBjb2RlLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGx1Z2luIC0gYW4gaW5zdGFuY2Ugb2YgYSBwbHVnaW4sIHVzdWFsbHkgYHRoaXNgIGluIGNvbnRleHQuXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIC0gdGhlIG5hbWUgb2YgdGhlIHBsdWdpbiwgcGFzc2VkIGFzIGEgY2FtZWxDYXNlZCBzdHJpbmcuXG4gICAqIEBmaXJlcyBQbHVnaW4jaW5pdFxuICAgKi9cbiAgcmVnaXN0ZXJQbHVnaW46IGZ1bmN0aW9uKHBsdWdpbiwgbmFtZSl7XG4gICAgdmFyIHBsdWdpbk5hbWUgPSBuYW1lID8gaHlwaGVuYXRlKG5hbWUpIDogZnVuY3Rpb25OYW1lKHBsdWdpbi5jb25zdHJ1Y3RvcikudG9Mb3dlckNhc2UoKTtcbiAgICBwbHVnaW4udXVpZCA9IEdldFlvRGlnaXRzKDYsIHBsdWdpbk5hbWUpO1xuXG4gICAgaWYoIXBsdWdpbi4kZWxlbWVudC5hdHRyKGBkYXRhLSR7cGx1Z2luTmFtZX1gKSl7IHBsdWdpbi4kZWxlbWVudC5hdHRyKGBkYXRhLSR7cGx1Z2luTmFtZX1gLCBwbHVnaW4udXVpZCk7IH1cbiAgICBpZighcGx1Z2luLiRlbGVtZW50LmRhdGEoJ3pmUGx1Z2luJykpeyBwbHVnaW4uJGVsZW1lbnQuZGF0YSgnemZQbHVnaW4nLCBwbHVnaW4pOyB9XG4gICAgICAgICAgLyoqXG4gICAgICAgICAgICogRmlyZXMgd2hlbiB0aGUgcGx1Z2luIGhhcyBpbml0aWFsaXplZC5cbiAgICAgICAgICAgKiBAZXZlbnQgUGx1Z2luI2luaXRcbiAgICAgICAgICAgKi9cbiAgICBwbHVnaW4uJGVsZW1lbnQudHJpZ2dlcihgaW5pdC56Zi4ke3BsdWdpbk5hbWV9YCk7XG5cbiAgICB0aGlzLl91dWlkcy5wdXNoKHBsdWdpbi51dWlkKTtcblxuICAgIHJldHVybjtcbiAgfSxcbiAgLyoqXG4gICAqIEBmdW5jdGlvblxuICAgKiBSZW1vdmVzIHRoZSBwbHVnaW5zIHV1aWQgZnJvbSB0aGUgX3V1aWRzIGFycmF5LlxuICAgKiBSZW1vdmVzIHRoZSB6ZlBsdWdpbiBkYXRhIGF0dHJpYnV0ZSwgYXMgd2VsbCBhcyB0aGUgZGF0YS1wbHVnaW4tbmFtZSBhdHRyaWJ1dGUuXG4gICAqIEFsc28gZmlyZXMgdGhlIGRlc3Ryb3llZCBldmVudCBmb3IgdGhlIHBsdWdpbiwgY29uc29saWRhdGluZyByZXBldGl0aXZlIGNvZGUuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwbHVnaW4gLSBhbiBpbnN0YW5jZSBvZiBhIHBsdWdpbiwgdXN1YWxseSBgdGhpc2AgaW4gY29udGV4dC5cbiAgICogQGZpcmVzIFBsdWdpbiNkZXN0cm95ZWRcbiAgICovXG4gIHVucmVnaXN0ZXJQbHVnaW46IGZ1bmN0aW9uKHBsdWdpbil7XG4gICAgdmFyIHBsdWdpbk5hbWUgPSBoeXBoZW5hdGUoZnVuY3Rpb25OYW1lKHBsdWdpbi4kZWxlbWVudC5kYXRhKCd6ZlBsdWdpbicpLmNvbnN0cnVjdG9yKSk7XG5cbiAgICB0aGlzLl91dWlkcy5zcGxpY2UodGhpcy5fdXVpZHMuaW5kZXhPZihwbHVnaW4udXVpZCksIDEpO1xuICAgIHBsdWdpbi4kZWxlbWVudC5yZW1vdmVBdHRyKGBkYXRhLSR7cGx1Z2luTmFtZX1gKS5yZW1vdmVEYXRhKCd6ZlBsdWdpbicpXG4gICAgICAgICAgLyoqXG4gICAgICAgICAgICogRmlyZXMgd2hlbiB0aGUgcGx1Z2luIGhhcyBiZWVuIGRlc3Ryb3llZC5cbiAgICAgICAgICAgKiBAZXZlbnQgUGx1Z2luI2Rlc3Ryb3llZFxuICAgICAgICAgICAqL1xuICAgICAgICAgIC50cmlnZ2VyKGBkZXN0cm95ZWQuemYuJHtwbHVnaW5OYW1lfWApO1xuICAgIGZvcih2YXIgcHJvcCBpbiBwbHVnaW4pe1xuICAgICAgcGx1Z2luW3Byb3BdID0gbnVsbDsvL2NsZWFuIHVwIHNjcmlwdCB0byBwcmVwIGZvciBnYXJiYWdlIGNvbGxlY3Rpb24uXG4gICAgfVxuICAgIHJldHVybjtcbiAgfSxcblxuICAvKipcbiAgICogQGZ1bmN0aW9uXG4gICAqIENhdXNlcyBvbmUgb3IgbW9yZSBhY3RpdmUgcGx1Z2lucyB0byByZS1pbml0aWFsaXplLCByZXNldHRpbmcgZXZlbnQgbGlzdGVuZXJzLCByZWNhbGN1bGF0aW5nIHBvc2l0aW9ucywgZXRjLlxuICAgKiBAcGFyYW0ge1N0cmluZ30gcGx1Z2lucyAtIG9wdGlvbmFsIHN0cmluZyBvZiBhbiBpbmRpdmlkdWFsIHBsdWdpbiBrZXksIGF0dGFpbmVkIGJ5IGNhbGxpbmcgYCQoZWxlbWVudCkuZGF0YSgncGx1Z2luTmFtZScpYCwgb3Igc3RyaW5nIG9mIGEgcGx1Z2luIGNsYXNzIGkuZS4gYCdkcm9wZG93bidgXG4gICAqIEBkZWZhdWx0IElmIG5vIGFyZ3VtZW50IGlzIHBhc3NlZCwgcmVmbG93IGFsbCBjdXJyZW50bHkgYWN0aXZlIHBsdWdpbnMuXG4gICAqL1xuICAgcmVJbml0OiBmdW5jdGlvbihwbHVnaW5zKXtcbiAgICAgdmFyIGlzSlEgPSBwbHVnaW5zIGluc3RhbmNlb2YgJDtcbiAgICAgdHJ5e1xuICAgICAgIGlmKGlzSlEpe1xuICAgICAgICAgcGx1Z2lucy5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICQodGhpcykuZGF0YSgnemZQbHVnaW4nKS5faW5pdCgpO1xuICAgICAgICAgfSk7XG4gICAgICAgfWVsc2V7XG4gICAgICAgICB2YXIgdHlwZSA9IHR5cGVvZiBwbHVnaW5zLFxuICAgICAgICAgX3RoaXMgPSB0aGlzLFxuICAgICAgICAgZm5zID0ge1xuICAgICAgICAgICAnb2JqZWN0JzogZnVuY3Rpb24ocGxncyl7XG4gICAgICAgICAgICAgcGxncy5mb3JFYWNoKGZ1bmN0aW9uKHApe1xuICAgICAgICAgICAgICAgcCA9IGh5cGhlbmF0ZShwKTtcbiAgICAgICAgICAgICAgICQoJ1tkYXRhLScrIHAgKyddJykuZm91bmRhdGlvbignX2luaXQnKTtcbiAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgfSxcbiAgICAgICAgICAgJ3N0cmluZyc6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgcGx1Z2lucyA9IGh5cGhlbmF0ZShwbHVnaW5zKTtcbiAgICAgICAgICAgICAkKCdbZGF0YS0nKyBwbHVnaW5zICsnXScpLmZvdW5kYXRpb24oJ19pbml0Jyk7XG4gICAgICAgICAgIH0sXG4gICAgICAgICAgICd1bmRlZmluZWQnOiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgIHRoaXNbJ29iamVjdCddKE9iamVjdC5rZXlzKF90aGlzLl9wbHVnaW5zKSk7XG4gICAgICAgICAgIH1cbiAgICAgICAgIH07XG4gICAgICAgICBmbnNbdHlwZV0ocGx1Z2lucyk7XG4gICAgICAgfVxuICAgICB9Y2F0Y2goZXJyKXtcbiAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgIH1maW5hbGx5e1xuICAgICAgIHJldHVybiBwbHVnaW5zO1xuICAgICB9XG4gICB9LFxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIHBsdWdpbnMgb24gYW55IGVsZW1lbnRzIHdpdGhpbiBgZWxlbWAgKGFuZCBgZWxlbWAgaXRzZWxmKSB0aGF0IGFyZW4ndCBhbHJlYWR5IGluaXRpYWxpemVkLlxuICAgKiBAcGFyYW0ge09iamVjdH0gZWxlbSAtIGpRdWVyeSBvYmplY3QgY29udGFpbmluZyB0aGUgZWxlbWVudCB0byBjaGVjayBpbnNpZGUuIEFsc28gY2hlY2tzIHRoZSBlbGVtZW50IGl0c2VsZiwgdW5sZXNzIGl0J3MgdGhlIGBkb2N1bWVudGAgb2JqZWN0LlxuICAgKiBAcGFyYW0ge1N0cmluZ3xBcnJheX0gcGx1Z2lucyAtIEEgbGlzdCBvZiBwbHVnaW5zIHRvIGluaXRpYWxpemUuIExlYXZlIHRoaXMgb3V0IHRvIGluaXRpYWxpemUgZXZlcnl0aGluZy5cbiAgICovXG4gIHJlZmxvdzogZnVuY3Rpb24oZWxlbSwgcGx1Z2lucykge1xuXG4gICAgLy8gSWYgcGx1Z2lucyBpcyB1bmRlZmluZWQsIGp1c3QgZ3JhYiBldmVyeXRoaW5nXG4gICAgaWYgKHR5cGVvZiBwbHVnaW5zID09PSAndW5kZWZpbmVkJykge1xuICAgICAgcGx1Z2lucyA9IE9iamVjdC5rZXlzKHRoaXMuX3BsdWdpbnMpO1xuICAgIH1cbiAgICAvLyBJZiBwbHVnaW5zIGlzIGEgc3RyaW5nLCBjb252ZXJ0IGl0IHRvIGFuIGFycmF5IHdpdGggb25lIGl0ZW1cbiAgICBlbHNlIGlmICh0eXBlb2YgcGx1Z2lucyA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHBsdWdpbnMgPSBbcGx1Z2luc107XG4gICAgfVxuXG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIC8vIEl0ZXJhdGUgdGhyb3VnaCBlYWNoIHBsdWdpblxuICAgICQuZWFjaChwbHVnaW5zLCBmdW5jdGlvbihpLCBuYW1lKSB7XG4gICAgICAvLyBHZXQgdGhlIGN1cnJlbnQgcGx1Z2luXG4gICAgICB2YXIgcGx1Z2luID0gX3RoaXMuX3BsdWdpbnNbbmFtZV07XG5cbiAgICAgIC8vIExvY2FsaXplIHRoZSBzZWFyY2ggdG8gYWxsIGVsZW1lbnRzIGluc2lkZSBlbGVtLCBhcyB3ZWxsIGFzIGVsZW0gaXRzZWxmLCB1bmxlc3MgZWxlbSA9PT0gZG9jdW1lbnRcbiAgICAgIHZhciAkZWxlbSA9ICQoZWxlbSkuZmluZCgnW2RhdGEtJytuYW1lKyddJykuYWRkQmFjaygnW2RhdGEtJytuYW1lKyddJyk7XG5cbiAgICAgIC8vIEZvciBlYWNoIHBsdWdpbiBmb3VuZCwgaW5pdGlhbGl6ZSBpdFxuICAgICAgJGVsZW0uZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyICRlbCA9ICQodGhpcyksXG4gICAgICAgICAgICBvcHRzID0ge307XG4gICAgICAgIC8vIERvbid0IGRvdWJsZS1kaXAgb24gcGx1Z2luc1xuICAgICAgICBpZiAoJGVsLmRhdGEoJ3pmUGx1Z2luJykpIHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oXCJUcmllZCB0byBpbml0aWFsaXplIFwiK25hbWUrXCIgb24gYW4gZWxlbWVudCB0aGF0IGFscmVhZHkgaGFzIGEgRm91bmRhdGlvbiBwbHVnaW4uXCIpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKCRlbC5hdHRyKCdkYXRhLW9wdGlvbnMnKSl7XG4gICAgICAgICAgdmFyIHRoaW5nID0gJGVsLmF0dHIoJ2RhdGEtb3B0aW9ucycpLnNwbGl0KCc7JykuZm9yRWFjaChmdW5jdGlvbihlLCBpKXtcbiAgICAgICAgICAgIHZhciBvcHQgPSBlLnNwbGl0KCc6JykubWFwKGZ1bmN0aW9uKGVsKXsgcmV0dXJuIGVsLnRyaW0oKTsgfSk7XG4gICAgICAgICAgICBpZihvcHRbMF0pIG9wdHNbb3B0WzBdXSA9IHBhcnNlVmFsdWUob3B0WzFdKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB0cnl7XG4gICAgICAgICAgJGVsLmRhdGEoJ3pmUGx1Z2luJywgbmV3IHBsdWdpbigkKHRoaXMpLCBvcHRzKSk7XG4gICAgICAgIH1jYXRjaChlcil7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihlcik7XG4gICAgICAgIH1maW5hbGx5e1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG4gIGdldEZuTmFtZTogZnVuY3Rpb25OYW1lLFxuXG4gIGFkZFRvSnF1ZXJ5OiBmdW5jdGlvbigkKSB7XG4gICAgLy8gVE9ETzogY29uc2lkZXIgbm90IG1ha2luZyB0aGlzIGEgalF1ZXJ5IGZ1bmN0aW9uXG4gICAgLy8gVE9ETzogbmVlZCB3YXkgdG8gcmVmbG93IHZzLiByZS1pbml0aWFsaXplXG4gICAgLyoqXG4gICAgICogVGhlIEZvdW5kYXRpb24galF1ZXJ5IG1ldGhvZC5cbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xBcnJheX0gbWV0aG9kIC0gQW4gYWN0aW9uIHRvIHBlcmZvcm0gb24gdGhlIGN1cnJlbnQgalF1ZXJ5IG9iamVjdC5cbiAgICAgKi9cbiAgICB2YXIgZm91bmRhdGlvbiA9IGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgICAgdmFyIHR5cGUgPSB0eXBlb2YgbWV0aG9kLFxuICAgICAgICAgICRub0pTID0gJCgnLm5vLWpzJyk7XG5cbiAgICAgIGlmKCRub0pTLmxlbmd0aCl7XG4gICAgICAgICRub0pTLnJlbW92ZUNsYXNzKCduby1qcycpO1xuICAgICAgfVxuXG4gICAgICBpZih0eXBlID09PSAndW5kZWZpbmVkJyl7Ly9uZWVkcyB0byBpbml0aWFsaXplIHRoZSBGb3VuZGF0aW9uIG9iamVjdCwgb3IgYW4gaW5kaXZpZHVhbCBwbHVnaW4uXG4gICAgICAgIE1lZGlhUXVlcnkuX2luaXQoKTtcbiAgICAgICAgRm91bmRhdGlvbi5yZWZsb3codGhpcyk7XG4gICAgICB9ZWxzZSBpZih0eXBlID09PSAnc3RyaW5nJyl7Ly9hbiBpbmRpdmlkdWFsIG1ldGhvZCB0byBpbnZva2Ugb24gYSBwbHVnaW4gb3IgZ3JvdXAgb2YgcGx1Z2luc1xuICAgICAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7Ly9jb2xsZWN0IGFsbCB0aGUgYXJndW1lbnRzLCBpZiBuZWNlc3NhcnlcbiAgICAgICAgdmFyIHBsdWdDbGFzcyA9IHRoaXMuZGF0YSgnemZQbHVnaW4nKTsvL2RldGVybWluZSB0aGUgY2xhc3Mgb2YgcGx1Z2luXG5cbiAgICAgICAgaWYocGx1Z0NsYXNzICE9PSB1bmRlZmluZWQgJiYgcGx1Z0NsYXNzW21ldGhvZF0gIT09IHVuZGVmaW5lZCl7Ly9tYWtlIHN1cmUgYm90aCB0aGUgY2xhc3MgYW5kIG1ldGhvZCBleGlzdFxuICAgICAgICAgIGlmKHRoaXMubGVuZ3RoID09PSAxKXsvL2lmIHRoZXJlJ3Mgb25seSBvbmUsIGNhbGwgaXQgZGlyZWN0bHkuXG4gICAgICAgICAgICAgIHBsdWdDbGFzc1ttZXRob2RdLmFwcGx5KHBsdWdDbGFzcywgYXJncyk7XG4gICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB0aGlzLmVhY2goZnVuY3Rpb24oaSwgZWwpey8vb3RoZXJ3aXNlIGxvb3AgdGhyb3VnaCB0aGUgalF1ZXJ5IGNvbGxlY3Rpb24gYW5kIGludm9rZSB0aGUgbWV0aG9kIG9uIGVhY2hcbiAgICAgICAgICAgICAgcGx1Z0NsYXNzW21ldGhvZF0uYXBwbHkoJChlbCkuZGF0YSgnemZQbHVnaW4nKSwgYXJncyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1lbHNley8vZXJyb3IgZm9yIG5vIGNsYXNzIG9yIG5vIG1ldGhvZFxuICAgICAgICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcIldlJ3JlIHNvcnJ5LCAnXCIgKyBtZXRob2QgKyBcIicgaXMgbm90IGFuIGF2YWlsYWJsZSBtZXRob2QgZm9yIFwiICsgKHBsdWdDbGFzcyA/IGZ1bmN0aW9uTmFtZShwbHVnQ2xhc3MpIDogJ3RoaXMgZWxlbWVudCcpICsgJy4nKTtcbiAgICAgICAgfVxuICAgICAgfWVsc2V7Ly9lcnJvciBmb3IgaW52YWxpZCBhcmd1bWVudCB0eXBlXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYFdlJ3JlIHNvcnJ5LCAke3R5cGV9IGlzIG5vdCBhIHZhbGlkIHBhcmFtZXRlci4gWW91IG11c3QgdXNlIGEgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgbWV0aG9kIHlvdSB3aXNoIHRvIGludm9rZS5gKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgJC5mbi5mb3VuZGF0aW9uID0gZm91bmRhdGlvbjtcbiAgICByZXR1cm4gJDtcbiAgfVxufTtcblxuRm91bmRhdGlvbi51dGlsID0ge1xuICAvKipcbiAgICogRnVuY3Rpb24gZm9yIGFwcGx5aW5nIGEgZGVib3VuY2UgZWZmZWN0IHRvIGEgZnVuY3Rpb24gY2FsbC5cbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgLSBGdW5jdGlvbiB0byBiZSBjYWxsZWQgYXQgZW5kIG9mIHRpbWVvdXQuXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBkZWxheSAtIFRpbWUgaW4gbXMgdG8gZGVsYXkgdGhlIGNhbGwgb2YgYGZ1bmNgLlxuICAgKiBAcmV0dXJucyBmdW5jdGlvblxuICAgKi9cbiAgdGhyb3R0bGU6IGZ1bmN0aW9uIChmdW5jLCBkZWxheSkge1xuICAgIHZhciB0aW1lciA9IG51bGw7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIGNvbnRleHQgPSB0aGlzLCBhcmdzID0gYXJndW1lbnRzO1xuXG4gICAgICBpZiAodGltZXIgPT09IG51bGwpIHtcbiAgICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgICAgICAgIHRpbWVyID0gbnVsbDtcbiAgICAgICAgfSwgZGVsYXkpO1xuICAgICAgfVxuICAgIH07XG4gIH1cbn07XG5cbndpbmRvdy5Gb3VuZGF0aW9uID0gRm91bmRhdGlvbjtcblxuLy8gUG9seWZpbGwgZm9yIHJlcXVlc3RBbmltYXRpb25GcmFtZVxuKGZ1bmN0aW9uKCkge1xuICBpZiAoIURhdGUubm93IHx8ICF3aW5kb3cuRGF0ZS5ub3cpXG4gICAgd2luZG93LkRhdGUubm93ID0gRGF0ZS5ub3cgPSBmdW5jdGlvbigpIHsgcmV0dXJuIG5ldyBEYXRlKCkuZ2V0VGltZSgpOyB9O1xuXG4gIHZhciB2ZW5kb3JzID0gWyd3ZWJraXQnLCAnbW96J107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdmVuZG9ycy5sZW5ndGggJiYgIXdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWU7ICsraSkge1xuICAgICAgdmFyIHZwID0gdmVuZG9yc1tpXTtcbiAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSB3aW5kb3dbdnArJ1JlcXVlc3RBbmltYXRpb25GcmFtZSddO1xuICAgICAgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lID0gKHdpbmRvd1t2cCsnQ2FuY2VsQW5pbWF0aW9uRnJhbWUnXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfHwgd2luZG93W3ZwKydDYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWUnXSk7XG4gIH1cbiAgaWYgKC9pUChhZHxob25lfG9kKS4qT1MgNi8udGVzdCh3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudClcbiAgICB8fCAhd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCAhd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lKSB7XG4gICAgdmFyIGxhc3RUaW1lID0gMDtcbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIG5vdyA9IERhdGUubm93KCk7XG4gICAgICAgIHZhciBuZXh0VGltZSA9IE1hdGgubWF4KGxhc3RUaW1lICsgMTYsIG5vdyk7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkgeyBjYWxsYmFjayhsYXN0VGltZSA9IG5leHRUaW1lKTsgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dFRpbWUgLSBub3cpO1xuICAgIH07XG4gICAgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lID0gY2xlYXJUaW1lb3V0O1xuICB9XG4gIC8qKlxuICAgKiBQb2x5ZmlsbCBmb3IgcGVyZm9ybWFuY2Uubm93LCByZXF1aXJlZCBieSByQUZcbiAgICovXG4gIGlmKCF3aW5kb3cucGVyZm9ybWFuY2UgfHwgIXdpbmRvdy5wZXJmb3JtYW5jZS5ub3cpe1xuICAgIHdpbmRvdy5wZXJmb3JtYW5jZSA9IHtcbiAgICAgIHN0YXJ0OiBEYXRlLm5vdygpLFxuICAgICAgbm93OiBmdW5jdGlvbigpeyByZXR1cm4gRGF0ZS5ub3coKSAtIHRoaXMuc3RhcnQ7IH1cbiAgICB9O1xuICB9XG59KSgpO1xuaWYgKCFGdW5jdGlvbi5wcm90b3R5cGUuYmluZCkge1xuICBGdW5jdGlvbi5wcm90b3R5cGUuYmluZCA9IGZ1bmN0aW9uKG9UaGlzKSB7XG4gICAgaWYgKHR5cGVvZiB0aGlzICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAvLyBjbG9zZXN0IHRoaW5nIHBvc3NpYmxlIHRvIHRoZSBFQ01BU2NyaXB0IDVcbiAgICAgIC8vIGludGVybmFsIElzQ2FsbGFibGUgZnVuY3Rpb25cbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0Z1bmN0aW9uLnByb3RvdHlwZS5iaW5kIC0gd2hhdCBpcyB0cnlpbmcgdG8gYmUgYm91bmQgaXMgbm90IGNhbGxhYmxlJyk7XG4gICAgfVxuXG4gICAgdmFyIGFBcmdzICAgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpLFxuICAgICAgICBmVG9CaW5kID0gdGhpcyxcbiAgICAgICAgZk5PUCAgICA9IGZ1bmN0aW9uKCkge30sXG4gICAgICAgIGZCb3VuZCAgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gZlRvQmluZC5hcHBseSh0aGlzIGluc3RhbmNlb2YgZk5PUFxuICAgICAgICAgICAgICAgICA/IHRoaXNcbiAgICAgICAgICAgICAgICAgOiBvVGhpcyxcbiAgICAgICAgICAgICAgICAgYUFyZ3MuY29uY2F0KEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cykpKTtcbiAgICAgICAgfTtcblxuICAgIGlmICh0aGlzLnByb3RvdHlwZSkge1xuICAgICAgLy8gbmF0aXZlIGZ1bmN0aW9ucyBkb24ndCBoYXZlIGEgcHJvdG90eXBlXG4gICAgICBmTk9QLnByb3RvdHlwZSA9IHRoaXMucHJvdG90eXBlO1xuICAgIH1cbiAgICBmQm91bmQucHJvdG90eXBlID0gbmV3IGZOT1AoKTtcblxuICAgIHJldHVybiBmQm91bmQ7XG4gIH07XG59XG4vLyBQb2x5ZmlsbCB0byBnZXQgdGhlIG5hbWUgb2YgYSBmdW5jdGlvbiBpbiBJRTlcbmZ1bmN0aW9uIGZ1bmN0aW9uTmFtZShmbikge1xuICBpZiAoRnVuY3Rpb24ucHJvdG90eXBlLm5hbWUgPT09IHVuZGVmaW5lZCkge1xuICAgIHZhciBmdW5jTmFtZVJlZ2V4ID0gL2Z1bmN0aW9uXFxzKFteKF17MSx9KVxcKC87XG4gICAgdmFyIHJlc3VsdHMgPSAoZnVuY05hbWVSZWdleCkuZXhlYygoZm4pLnRvU3RyaW5nKCkpO1xuICAgIHJldHVybiAocmVzdWx0cyAmJiByZXN1bHRzLmxlbmd0aCA+IDEpID8gcmVzdWx0c1sxXS50cmltKCkgOiBcIlwiO1xuICB9XG4gIGVsc2UgaWYgKGZuLnByb3RvdHlwZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIGZuLmNvbnN0cnVjdG9yLm5hbWU7XG4gIH1cbiAgZWxzZSB7XG4gICAgcmV0dXJuIGZuLnByb3RvdHlwZS5jb25zdHJ1Y3Rvci5uYW1lO1xuICB9XG59XG5mdW5jdGlvbiBwYXJzZVZhbHVlKHN0cil7XG4gIGlmICgndHJ1ZScgPT09IHN0cikgcmV0dXJuIHRydWU7XG4gIGVsc2UgaWYgKCdmYWxzZScgPT09IHN0cikgcmV0dXJuIGZhbHNlO1xuICBlbHNlIGlmICghaXNOYU4oc3RyICogMSkpIHJldHVybiBwYXJzZUZsb2F0KHN0cik7XG4gIHJldHVybiBzdHI7XG59XG4vLyBDb252ZXJ0IFBhc2NhbENhc2UgdG8ga2ViYWItY2FzZVxuLy8gVGhhbmsgeW91OiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS84OTU1NTgwXG5mdW5jdGlvbiBoeXBoZW5hdGUoc3RyKSB7XG4gIHJldHVybiBzdHIucmVwbGFjZSgvKFthLXpdKShbQS1aXSkvZywgJyQxLSQyJykudG9Mb3dlckNhc2UoKTtcbn1cblxuZXhwb3J0IHtGb3VuZGF0aW9ufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24uY29yZS5qcyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcbmltcG9ydCB7IHRyYW5zaXRpb25lbmQgfSBmcm9tICcuL2ZvdW5kYXRpb24udXRpbC5jb3JlJztcblxuLyoqXG4gKiBNb3Rpb24gbW9kdWxlLlxuICogQG1vZHVsZSBmb3VuZGF0aW9uLm1vdGlvblxuICovXG5cbmNvbnN0IGluaXRDbGFzc2VzICAgPSBbJ211aS1lbnRlcicsICdtdWktbGVhdmUnXTtcbmNvbnN0IGFjdGl2ZUNsYXNzZXMgPSBbJ211aS1lbnRlci1hY3RpdmUnLCAnbXVpLWxlYXZlLWFjdGl2ZSddO1xuXG5jb25zdCBNb3Rpb24gPSB7XG4gIGFuaW1hdGVJbjogZnVuY3Rpb24oZWxlbWVudCwgYW5pbWF0aW9uLCBjYikge1xuICAgIGFuaW1hdGUodHJ1ZSwgZWxlbWVudCwgYW5pbWF0aW9uLCBjYik7XG4gIH0sXG5cbiAgYW5pbWF0ZU91dDogZnVuY3Rpb24oZWxlbWVudCwgYW5pbWF0aW9uLCBjYikge1xuICAgIGFuaW1hdGUoZmFsc2UsIGVsZW1lbnQsIGFuaW1hdGlvbiwgY2IpO1xuICB9XG59XG5cbmZ1bmN0aW9uIE1vdmUoZHVyYXRpb24sIGVsZW0sIGZuKXtcbiAgdmFyIGFuaW0sIHByb2csIHN0YXJ0ID0gbnVsbDtcbiAgLy8gY29uc29sZS5sb2coJ2NhbGxlZCcpO1xuXG4gIGlmIChkdXJhdGlvbiA9PT0gMCkge1xuICAgIGZuLmFwcGx5KGVsZW0pO1xuICAgIGVsZW0udHJpZ2dlcignZmluaXNoZWQuemYuYW5pbWF0ZScsIFtlbGVtXSkudHJpZ2dlckhhbmRsZXIoJ2ZpbmlzaGVkLnpmLmFuaW1hdGUnLCBbZWxlbV0pO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGZ1bmN0aW9uIG1vdmUodHMpe1xuICAgIGlmKCFzdGFydCkgc3RhcnQgPSB0cztcbiAgICAvLyBjb25zb2xlLmxvZyhzdGFydCwgdHMpO1xuICAgIHByb2cgPSB0cyAtIHN0YXJ0O1xuICAgIGZuLmFwcGx5KGVsZW0pO1xuXG4gICAgaWYocHJvZyA8IGR1cmF0aW9uKXsgYW5pbSA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUobW92ZSwgZWxlbSk7IH1cbiAgICBlbHNle1xuICAgICAgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lKGFuaW0pO1xuICAgICAgZWxlbS50cmlnZ2VyKCdmaW5pc2hlZC56Zi5hbmltYXRlJywgW2VsZW1dKS50cmlnZ2VySGFuZGxlcignZmluaXNoZWQuemYuYW5pbWF0ZScsIFtlbGVtXSk7XG4gICAgfVxuICB9XG4gIGFuaW0gPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKG1vdmUpO1xufVxuXG4vKipcbiAqIEFuaW1hdGVzIGFuIGVsZW1lbnQgaW4gb3Igb3V0IHVzaW5nIGEgQ1NTIHRyYW5zaXRpb24gY2xhc3MuXG4gKiBAZnVuY3Rpb25cbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGlzSW4gLSBEZWZpbmVzIGlmIHRoZSBhbmltYXRpb24gaXMgaW4gb3Igb3V0LlxuICogQHBhcmFtIHtPYmplY3R9IGVsZW1lbnQgLSBqUXVlcnkgb3IgSFRNTCBvYmplY3QgdG8gYW5pbWF0ZS5cbiAqIEBwYXJhbSB7U3RyaW5nfSBhbmltYXRpb24gLSBDU1MgY2xhc3MgdG8gdXNlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2IgLSBDYWxsYmFjayB0byBydW4gd2hlbiBhbmltYXRpb24gaXMgZmluaXNoZWQuXG4gKi9cbmZ1bmN0aW9uIGFuaW1hdGUoaXNJbiwgZWxlbWVudCwgYW5pbWF0aW9uLCBjYikge1xuICBlbGVtZW50ID0gJChlbGVtZW50KS5lcSgwKTtcblxuICBpZiAoIWVsZW1lbnQubGVuZ3RoKSByZXR1cm47XG5cbiAgdmFyIGluaXRDbGFzcyA9IGlzSW4gPyBpbml0Q2xhc3Nlc1swXSA6IGluaXRDbGFzc2VzWzFdO1xuICB2YXIgYWN0aXZlQ2xhc3MgPSBpc0luID8gYWN0aXZlQ2xhc3Nlc1swXSA6IGFjdGl2ZUNsYXNzZXNbMV07XG5cbiAgLy8gU2V0IHVwIHRoZSBhbmltYXRpb25cbiAgcmVzZXQoKTtcblxuICBlbGVtZW50XG4gICAgLmFkZENsYXNzKGFuaW1hdGlvbilcbiAgICAuY3NzKCd0cmFuc2l0aW9uJywgJ25vbmUnKTtcblxuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgIGVsZW1lbnQuYWRkQ2xhc3MoaW5pdENsYXNzKTtcbiAgICBpZiAoaXNJbikgZWxlbWVudC5zaG93KCk7XG4gIH0pO1xuXG4gIC8vIFN0YXJ0IHRoZSBhbmltYXRpb25cbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICBlbGVtZW50WzBdLm9mZnNldFdpZHRoO1xuICAgIGVsZW1lbnRcbiAgICAgIC5jc3MoJ3RyYW5zaXRpb24nLCAnJylcbiAgICAgIC5hZGRDbGFzcyhhY3RpdmVDbGFzcyk7XG4gIH0pO1xuXG4gIC8vIENsZWFuIHVwIHRoZSBhbmltYXRpb24gd2hlbiBpdCBmaW5pc2hlc1xuICBlbGVtZW50Lm9uZSh0cmFuc2l0aW9uZW5kKGVsZW1lbnQpLCBmaW5pc2gpO1xuXG4gIC8vIEhpZGVzIHRoZSBlbGVtZW50IChmb3Igb3V0IGFuaW1hdGlvbnMpLCByZXNldHMgdGhlIGVsZW1lbnQsIGFuZCBydW5zIGEgY2FsbGJhY2tcbiAgZnVuY3Rpb24gZmluaXNoKCkge1xuICAgIGlmICghaXNJbikgZWxlbWVudC5oaWRlKCk7XG4gICAgcmVzZXQoKTtcbiAgICBpZiAoY2IpIGNiLmFwcGx5KGVsZW1lbnQpO1xuICB9XG5cbiAgLy8gUmVzZXRzIHRyYW5zaXRpb25zIGFuZCByZW1vdmVzIG1vdGlvbi1zcGVjaWZpYyBjbGFzc2VzXG4gIGZ1bmN0aW9uIHJlc2V0KCkge1xuICAgIGVsZW1lbnRbMF0uc3R5bGUudHJhbnNpdGlvbkR1cmF0aW9uID0gMDtcbiAgICBlbGVtZW50LnJlbW92ZUNsYXNzKGAke2luaXRDbGFzc30gJHthY3RpdmVDbGFzc30gJHthbmltYXRpb259YCk7XG4gIH1cbn1cblxuZXhwb3J0IHtNb3ZlLCBNb3Rpb259O1xuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLnV0aWwubW90aW9uLmpzIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IHsgS2V5Ym9hcmQgfSBmcm9tICcuL2ZvdW5kYXRpb24udXRpbC5rZXlib2FyZCc7XG5pbXBvcnQgeyBNZWRpYVF1ZXJ5IH0gZnJvbSAnLi9mb3VuZGF0aW9uLnV0aWwubWVkaWFRdWVyeSc7XG5pbXBvcnQgeyB0cmFuc2l0aW9uZW5kIH0gZnJvbSAnLi9mb3VuZGF0aW9uLnV0aWwuY29yZSc7XG5pbXBvcnQgeyBQbHVnaW4gfSBmcm9tICcuL2ZvdW5kYXRpb24ucGx1Z2luJztcblxuaW1wb3J0IHsgVHJpZ2dlcnMgfSBmcm9tICcuL2ZvdW5kYXRpb24udXRpbC50cmlnZ2Vycyc7XG5cbi8qKlxuICogT2ZmQ2FudmFzIG1vZHVsZS5cbiAqIEBtb2R1bGUgZm91bmRhdGlvbi5vZmZjYW52YXNcbiAqIEByZXF1aXJlcyBmb3VuZGF0aW9uLnV0aWwua2V5Ym9hcmRcbiAqIEByZXF1aXJlcyBmb3VuZGF0aW9uLnV0aWwubWVkaWFRdWVyeVxuICogQHJlcXVpcmVzIGZvdW5kYXRpb24udXRpbC50cmlnZ2Vyc1xuICovXG5cbmNsYXNzIE9mZkNhbnZhcyBleHRlbmRzIFBsdWdpbiB7XG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IGluc3RhbmNlIG9mIGFuIG9mZi1jYW52YXMgd3JhcHBlci5cbiAgICogQGNsYXNzXG4gICAqIEBuYW1lIE9mZkNhbnZhc1xuICAgKiBAZmlyZXMgT2ZmQ2FudmFzI2luaXRcbiAgICogQHBhcmFtIHtPYmplY3R9IGVsZW1lbnQgLSBqUXVlcnkgb2JqZWN0IHRvIGluaXRpYWxpemUuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gT3ZlcnJpZGVzIHRvIHRoZSBkZWZhdWx0IHBsdWdpbiBzZXR0aW5ncy5cbiAgICovXG4gIF9zZXR1cChlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgdGhpcy5jbGFzc05hbWUgPSAnT2ZmQ2FudmFzJzsgLy8gaWU5IGJhY2sgY29tcGF0XG4gICAgdGhpcy4kZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgdGhpcy5vcHRpb25zID0gJC5leHRlbmQoe30sIE9mZkNhbnZhcy5kZWZhdWx0cywgdGhpcy4kZWxlbWVudC5kYXRhKCksIG9wdGlvbnMpO1xuICAgIHRoaXMuY29udGVudENsYXNzZXMgPSB7IGJhc2U6IFtdLCByZXZlYWw6IFtdIH07XG4gICAgdGhpcy4kbGFzdFRyaWdnZXIgPSAkKCk7XG4gICAgdGhpcy4kdHJpZ2dlcnMgPSAkKCk7XG4gICAgdGhpcy5wb3NpdGlvbiA9ICdsZWZ0JztcbiAgICB0aGlzLiRjb250ZW50ID0gJCgpO1xuICAgIHRoaXMubmVzdGVkID0gISEodGhpcy5vcHRpb25zLm5lc3RlZCk7XG5cbiAgICAvLyBEZWZpbmVzIHRoZSBDU1MgdHJhbnNpdGlvbi9wb3NpdGlvbiBjbGFzc2VzIG9mIHRoZSBvZmYtY2FudmFzIGNvbnRlbnQgY29udGFpbmVyLlxuICAgICQoWydwdXNoJywgJ292ZXJsYXAnXSkuZWFjaCgoaW5kZXgsIHZhbCkgPT4ge1xuICAgICAgdGhpcy5jb250ZW50Q2xhc3Nlcy5iYXNlLnB1c2goJ2hhcy10cmFuc2l0aW9uLScrdmFsKTtcbiAgICB9KTtcbiAgICAkKFsnbGVmdCcsICdyaWdodCcsICd0b3AnLCAnYm90dG9tJ10pLmVhY2goKGluZGV4LCB2YWwpID0+IHtcbiAgICAgIHRoaXMuY29udGVudENsYXNzZXMuYmFzZS5wdXNoKCdoYXMtcG9zaXRpb24tJyt2YWwpO1xuICAgICAgdGhpcy5jb250ZW50Q2xhc3Nlcy5yZXZlYWwucHVzaCgnaGFzLXJldmVhbC0nK3ZhbCk7XG4gICAgfSk7XG5cbiAgICAvLyBUcmlnZ2VycyBpbml0IGlzIGlkZW1wb3RlbnQsIGp1c3QgbmVlZCB0byBtYWtlIHN1cmUgaXQgaXMgaW5pdGlhbGl6ZWRcbiAgICBUcmlnZ2Vycy5pbml0KCQpO1xuICAgIE1lZGlhUXVlcnkuX2luaXQoKTtcblxuICAgIHRoaXMuX2luaXQoKTtcbiAgICB0aGlzLl9ldmVudHMoKTtcblxuICAgIEtleWJvYXJkLnJlZ2lzdGVyKCdPZmZDYW52YXMnLCB7XG4gICAgICAnRVNDQVBFJzogJ2Nsb3NlJ1xuICAgIH0pO1xuXG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZXMgdGhlIG9mZi1jYW52YXMgd3JhcHBlciBieSBhZGRpbmcgdGhlIGV4aXQgb3ZlcmxheSAoaWYgbmVlZGVkKS5cbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfaW5pdCgpIHtcbiAgICB2YXIgaWQgPSB0aGlzLiRlbGVtZW50LmF0dHIoJ2lkJyk7XG5cbiAgICB0aGlzLiRlbGVtZW50LmF0dHIoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcblxuICAgIC8vIEZpbmQgb2ZmLWNhbnZhcyBjb250ZW50LCBlaXRoZXIgYnkgSUQgKGlmIHNwZWNpZmllZCksIGJ5IHNpYmxpbmdzIG9yIGJ5IGNsb3Nlc3Qgc2VsZWN0b3IgKGZhbGxiYWNrKVxuICAgIGlmICh0aGlzLm9wdGlvbnMuY29udGVudElkKSB7XG4gICAgICB0aGlzLiRjb250ZW50ID0gJCgnIycrdGhpcy5vcHRpb25zLmNvbnRlbnRJZCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLiRlbGVtZW50LnNpYmxpbmdzKCdbZGF0YS1vZmYtY2FudmFzLWNvbnRlbnRdJykubGVuZ3RoKSB7XG4gICAgICB0aGlzLiRjb250ZW50ID0gdGhpcy4kZWxlbWVudC5zaWJsaW5ncygnW2RhdGEtb2ZmLWNhbnZhcy1jb250ZW50XScpLmZpcnN0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuJGNvbnRlbnQgPSB0aGlzLiRlbGVtZW50LmNsb3Nlc3QoJ1tkYXRhLW9mZi1jYW52YXMtY29udGVudF0nKS5maXJzdCgpO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5vcHRpb25zLmNvbnRlbnRJZCkge1xuICAgICAgLy8gQXNzdW1lIHRoYXQgdGhlIG9mZi1jYW52YXMgZWxlbWVudCBpcyBuZXN0ZWQgaWYgaXQgaXNuJ3QgYSBzaWJsaW5nIG9mIHRoZSBjb250ZW50XG4gICAgICB0aGlzLm5lc3RlZCA9IHRoaXMuJGVsZW1lbnQuc2libGluZ3MoJ1tkYXRhLW9mZi1jYW52YXMtY29udGVudF0nKS5sZW5ndGggPT09IDA7XG5cbiAgICB9IGVsc2UgaWYgKHRoaXMub3B0aW9ucy5jb250ZW50SWQgJiYgdGhpcy5vcHRpb25zLm5lc3RlZCA9PT0gbnVsbCkge1xuICAgICAgLy8gV2FybmluZyBpZiB1c2luZyBjb250ZW50IElEIHdpdGhvdXQgc2V0dGluZyB0aGUgbmVzdGVkIG9wdGlvblxuICAgICAgLy8gT25jZSB0aGUgZWxlbWVudCBpcyBuZXN0ZWQgaXQgaXMgcmVxdWlyZWQgdG8gd29yayBwcm9wZXJseSBpbiB0aGlzIGNhc2VcbiAgICAgIGNvbnNvbGUud2FybignUmVtZW1iZXIgdG8gdXNlIHRoZSBuZXN0ZWQgb3B0aW9uIGlmIHVzaW5nIHRoZSBjb250ZW50IElEIG9wdGlvbiEnKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5uZXN0ZWQgPT09IHRydWUpIHtcbiAgICAgIC8vIEZvcmNlIHRyYW5zaXRpb24gb3ZlcmxhcCBpZiBuZXN0ZWRcbiAgICAgIHRoaXMub3B0aW9ucy50cmFuc2l0aW9uID0gJ292ZXJsYXAnO1xuICAgICAgLy8gUmVtb3ZlIGFwcHJvcHJpYXRlIGNsYXNzZXMgaWYgYWxyZWFkeSBhc3NpZ25lZCBpbiBtYXJrdXBcbiAgICAgIHRoaXMuJGVsZW1lbnQucmVtb3ZlQ2xhc3MoJ2lzLXRyYW5zaXRpb24tcHVzaCcpO1xuICAgIH1cblxuICAgIHRoaXMuJGVsZW1lbnQuYWRkQ2xhc3MoYGlzLXRyYW5zaXRpb24tJHt0aGlzLm9wdGlvbnMudHJhbnNpdGlvbn0gaXMtY2xvc2VkYCk7XG5cbiAgICAvLyBGaW5kIHRyaWdnZXJzIHRoYXQgYWZmZWN0IHRoaXMgZWxlbWVudCBhbmQgYWRkIGFyaWEtZXhwYW5kZWQgdG8gdGhlbVxuICAgIHRoaXMuJHRyaWdnZXJzID0gJChkb2N1bWVudClcbiAgICAgIC5maW5kKCdbZGF0YS1vcGVuPVwiJytpZCsnXCJdLCBbZGF0YS1jbG9zZT1cIicraWQrJ1wiXSwgW2RhdGEtdG9nZ2xlPVwiJytpZCsnXCJdJylcbiAgICAgIC5hdHRyKCdhcmlhLWV4cGFuZGVkJywgJ2ZhbHNlJylcbiAgICAgIC5hdHRyKCdhcmlhLWNvbnRyb2xzJywgaWQpO1xuXG4gICAgLy8gR2V0IHBvc2l0aW9uIGJ5IGNoZWNraW5nIGZvciByZWxhdGVkIENTUyBjbGFzc1xuICAgIHRoaXMucG9zaXRpb24gPSB0aGlzLiRlbGVtZW50LmlzKCcucG9zaXRpb24tbGVmdCwgLnBvc2l0aW9uLXRvcCwgLnBvc2l0aW9uLXJpZ2h0LCAucG9zaXRpb24tYm90dG9tJykgPyB0aGlzLiRlbGVtZW50LmF0dHIoJ2NsYXNzJykubWF0Y2goL3Bvc2l0aW9uXFwtKGxlZnR8dG9wfHJpZ2h0fGJvdHRvbSkvKVsxXSA6IHRoaXMucG9zaXRpb247XG5cbiAgICAvLyBBZGQgYW4gb3ZlcmxheSBvdmVyIHRoZSBjb250ZW50IGlmIG5lY2Vzc2FyeVxuICAgIGlmICh0aGlzLm9wdGlvbnMuY29udGVudE92ZXJsYXkgPT09IHRydWUpIHtcbiAgICAgIHZhciBvdmVybGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICB2YXIgb3ZlcmxheVBvc2l0aW9uID0gJCh0aGlzLiRlbGVtZW50KS5jc3MoXCJwb3NpdGlvblwiKSA9PT0gJ2ZpeGVkJyA/ICdpcy1vdmVybGF5LWZpeGVkJyA6ICdpcy1vdmVybGF5LWFic29sdXRlJztcbiAgICAgIG92ZXJsYXkuc2V0QXR0cmlidXRlKCdjbGFzcycsICdqcy1vZmYtY2FudmFzLW92ZXJsYXkgJyArIG92ZXJsYXlQb3NpdGlvbik7XG4gICAgICB0aGlzLiRvdmVybGF5ID0gJChvdmVybGF5KTtcbiAgICAgIGlmKG92ZXJsYXlQb3NpdGlvbiA9PT0gJ2lzLW92ZXJsYXktZml4ZWQnKSB7XG4gICAgICAgICQodGhpcy4kb3ZlcmxheSkuaW5zZXJ0QWZ0ZXIodGhpcy4kZWxlbWVudCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLiRjb250ZW50LmFwcGVuZCh0aGlzLiRvdmVybGF5KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLm9wdGlvbnMuaXNSZXZlYWxlZCA9IHRoaXMub3B0aW9ucy5pc1JldmVhbGVkIHx8IG5ldyBSZWdFeHAodGhpcy5vcHRpb25zLnJldmVhbENsYXNzLCAnZycpLnRlc3QodGhpcy4kZWxlbWVudFswXS5jbGFzc05hbWUpO1xuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5pc1JldmVhbGVkID09PSB0cnVlKSB7XG4gICAgICB0aGlzLm9wdGlvbnMucmV2ZWFsT24gPSB0aGlzLm9wdGlvbnMucmV2ZWFsT24gfHwgdGhpcy4kZWxlbWVudFswXS5jbGFzc05hbWUubWF0Y2goLyhyZXZlYWwtZm9yLW1lZGl1bXxyZXZlYWwtZm9yLWxhcmdlKS9nKVswXS5zcGxpdCgnLScpWzJdO1xuICAgICAgdGhpcy5fc2V0TVFDaGVja2VyKCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy50cmFuc2l0aW9uVGltZSkge1xuICAgICAgdGhpcy4kZWxlbWVudC5jc3MoJ3RyYW5zaXRpb24tZHVyYXRpb24nLCB0aGlzLm9wdGlvbnMudHJhbnNpdGlvblRpbWUpO1xuICAgIH1cblxuICAgIC8vIEluaXRhbGx5IHJlbW92ZSBhbGwgdHJhbnNpdGlvbi9wb3NpdGlvbiBDU1MgY2xhc3NlcyBmcm9tIG9mZi1jYW52YXMgY29udGVudCBjb250YWluZXIuXG4gICAgdGhpcy5fcmVtb3ZlQ29udGVudENsYXNzZXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGV2ZW50IGhhbmRsZXJzIHRvIHRoZSBvZmYtY2FudmFzIHdyYXBwZXIgYW5kIHRoZSBleGl0IG92ZXJsYXkuXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2V2ZW50cygpIHtcbiAgICB0aGlzLiRlbGVtZW50Lm9mZignLnpmLnRyaWdnZXIgLnpmLm9mZmNhbnZhcycpLm9uKHtcbiAgICAgICdvcGVuLnpmLnRyaWdnZXInOiB0aGlzLm9wZW4uYmluZCh0aGlzKSxcbiAgICAgICdjbG9zZS56Zi50cmlnZ2VyJzogdGhpcy5jbG9zZS5iaW5kKHRoaXMpLFxuICAgICAgJ3RvZ2dsZS56Zi50cmlnZ2VyJzogdGhpcy50b2dnbGUuYmluZCh0aGlzKSxcbiAgICAgICdrZXlkb3duLnpmLm9mZmNhbnZhcyc6IHRoaXMuX2hhbmRsZUtleWJvYXJkLmJpbmQodGhpcylcbiAgICB9KTtcblxuICAgIGlmICh0aGlzLm9wdGlvbnMuY2xvc2VPbkNsaWNrID09PSB0cnVlKSB7XG4gICAgICB2YXIgJHRhcmdldCA9IHRoaXMub3B0aW9ucy5jb250ZW50T3ZlcmxheSA/IHRoaXMuJG92ZXJsYXkgOiB0aGlzLiRjb250ZW50O1xuICAgICAgJHRhcmdldC5vbih7J2NsaWNrLnpmLm9mZmNhbnZhcyc6IHRoaXMuY2xvc2UuYmluZCh0aGlzKX0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBsaWVzIGV2ZW50IGxpc3RlbmVyIGZvciBlbGVtZW50cyB0aGF0IHdpbGwgcmV2ZWFsIGF0IGNlcnRhaW4gYnJlYWtwb2ludHMuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfc2V0TVFDaGVja2VyKCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAkKHdpbmRvdykub24oJ2NoYW5nZWQuemYubWVkaWFxdWVyeScsIGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKE1lZGlhUXVlcnkuYXRMZWFzdChfdGhpcy5vcHRpb25zLnJldmVhbE9uKSkge1xuICAgICAgICBfdGhpcy5yZXZlYWwodHJ1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBfdGhpcy5yZXZlYWwoZmFsc2UpO1xuICAgICAgfVxuICAgIH0pLm9uZSgnbG9hZC56Zi5vZmZjYW52YXMnLCBmdW5jdGlvbigpIHtcbiAgICAgIGlmIChNZWRpYVF1ZXJ5LmF0TGVhc3QoX3RoaXMub3B0aW9ucy5yZXZlYWxPbikpIHtcbiAgICAgICAgX3RoaXMucmV2ZWFsKHRydWUpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgdGhlIENTUyB0cmFuc2l0aW9uL3Bvc2l0aW9uIGNsYXNzZXMgb2YgdGhlIG9mZi1jYW52YXMgY29udGVudCBjb250YWluZXIuXG4gICAqIFJlbW92aW5nIHRoZSBjbGFzc2VzIGlzIGltcG9ydGFudCB3aGVuIGFub3RoZXIgb2ZmLWNhbnZhcyBnZXRzIG9wZW5lZCB0aGF0IHVzZXMgdGhlIHNhbWUgY29udGVudCBjb250YWluZXIuXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gaGFzUmV2ZWFsIC0gdHJ1ZSBpZiByZWxhdGVkIG9mZi1jYW52YXMgZWxlbWVudCBpcyByZXZlYWxlZC5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9yZW1vdmVDb250ZW50Q2xhc3NlcyhoYXNSZXZlYWwpIHtcbiAgICBpZiAodHlwZW9mIGhhc1JldmVhbCAhPT0gJ2Jvb2xlYW4nKSB7XG4gICAgICB0aGlzLiRjb250ZW50LnJlbW92ZUNsYXNzKHRoaXMuY29udGVudENsYXNzZXMuYmFzZS5qb2luKCcgJykpO1xuICAgIH0gZWxzZSBpZiAoaGFzUmV2ZWFsID09PSBmYWxzZSkge1xuICAgICAgdGhpcy4kY29udGVudC5yZW1vdmVDbGFzcyhgaGFzLXJldmVhbC0ke3RoaXMucG9zaXRpb259YCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgdGhlIENTUyB0cmFuc2l0aW9uL3Bvc2l0aW9uIGNsYXNzZXMgb2YgdGhlIG9mZi1jYW52YXMgY29udGVudCBjb250YWluZXIsIGJhc2VkIG9uIHRoZSBvcGVuaW5nIG9mZi1jYW52YXMgZWxlbWVudC5cbiAgICogQmVmb3JlaGFuZCBhbnkgdHJhbnNpdGlvbi9wb3NpdGlvbiBjbGFzcyBnZXRzIHJlbW92ZWQuXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gaGFzUmV2ZWFsIC0gdHJ1ZSBpZiByZWxhdGVkIG9mZi1jYW52YXMgZWxlbWVudCBpcyByZXZlYWxlZC5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9hZGRDb250ZW50Q2xhc3NlcyhoYXNSZXZlYWwpIHtcbiAgICB0aGlzLl9yZW1vdmVDb250ZW50Q2xhc3NlcyhoYXNSZXZlYWwpO1xuICAgIGlmICh0eXBlb2YgaGFzUmV2ZWFsICE9PSAnYm9vbGVhbicpIHtcbiAgICAgIHRoaXMuJGNvbnRlbnQuYWRkQ2xhc3MoYGhhcy10cmFuc2l0aW9uLSR7dGhpcy5vcHRpb25zLnRyYW5zaXRpb259IGhhcy1wb3NpdGlvbi0ke3RoaXMucG9zaXRpb259YCk7XG4gICAgfSBlbHNlIGlmIChoYXNSZXZlYWwgPT09IHRydWUpIHtcbiAgICAgIHRoaXMuJGNvbnRlbnQuYWRkQ2xhc3MoYGhhcy1yZXZlYWwtJHt0aGlzLnBvc2l0aW9ufWApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIHRoZSByZXZlYWxpbmcvaGlkaW5nIHRoZSBvZmYtY2FudmFzIGF0IGJyZWFrcG9pbnRzLCBub3QgdGhlIHNhbWUgYXMgb3Blbi5cbiAgICogQHBhcmFtIHtCb29sZWFufSBpc1JldmVhbGVkIC0gdHJ1ZSBpZiBlbGVtZW50IHNob3VsZCBiZSByZXZlYWxlZC5cbiAgICogQGZ1bmN0aW9uXG4gICAqL1xuICByZXZlYWwoaXNSZXZlYWxlZCkge1xuICAgIGlmIChpc1JldmVhbGVkKSB7XG4gICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICB0aGlzLmlzUmV2ZWFsZWQgPSB0cnVlO1xuICAgICAgdGhpcy4kZWxlbWVudC5hdHRyKCdhcmlhLWhpZGRlbicsICdmYWxzZScpO1xuICAgICAgdGhpcy4kZWxlbWVudC5vZmYoJ29wZW4uemYudHJpZ2dlciB0b2dnbGUuemYudHJpZ2dlcicpO1xuICAgICAgdGhpcy4kZWxlbWVudC5yZW1vdmVDbGFzcygnaXMtY2xvc2VkJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaXNSZXZlYWxlZCA9IGZhbHNlO1xuICAgICAgdGhpcy4kZWxlbWVudC5hdHRyKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG4gICAgICB0aGlzLiRlbGVtZW50Lm9mZignb3Blbi56Zi50cmlnZ2VyIHRvZ2dsZS56Zi50cmlnZ2VyJykub24oe1xuICAgICAgICAnb3Blbi56Zi50cmlnZ2VyJzogdGhpcy5vcGVuLmJpbmQodGhpcyksXG4gICAgICAgICd0b2dnbGUuemYudHJpZ2dlcic6IHRoaXMudG9nZ2xlLmJpbmQodGhpcylcbiAgICAgIH0pO1xuICAgICAgdGhpcy4kZWxlbWVudC5hZGRDbGFzcygnaXMtY2xvc2VkJyk7XG4gICAgfVxuICAgIHRoaXMuX2FkZENvbnRlbnRDbGFzc2VzKGlzUmV2ZWFsZWQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFN0b3BzIHNjcm9sbGluZyBvZiB0aGUgYm9keSB3aGVuIG9mZmNhbnZhcyBpcyBvcGVuIG9uIG1vYmlsZSBTYWZhcmkgYW5kIG90aGVyIHRyb3VibGVzb21lIGJyb3dzZXJzLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX3N0b3BTY3JvbGxpbmcoZXZlbnQpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvLyBUYWtlbiBhbmQgYWRhcHRlZCBmcm9tIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTY4ODk0NDcvcHJldmVudC1mdWxsLXBhZ2Utc2Nyb2xsaW5nLWlvc1xuICAvLyBPbmx5IHJlYWxseSB3b3JrcyBmb3IgeSwgbm90IHN1cmUgaG93IHRvIGV4dGVuZCB0byB4IG9yIGlmIHdlIG5lZWQgdG8uXG4gIF9yZWNvcmRTY3JvbGxhYmxlKGV2ZW50KSB7XG4gICAgbGV0IGVsZW0gPSB0aGlzOyAvLyBjYWxsZWQgZnJvbSBldmVudCBoYW5kbGVyIGNvbnRleHQgd2l0aCB0aGlzIGFzIGVsZW1cblxuICAgICAvLyBJZiB0aGUgZWxlbWVudCBpcyBzY3JvbGxhYmxlIChjb250ZW50IG92ZXJmbG93cyksIHRoZW4uLi5cbiAgICBpZiAoZWxlbS5zY3JvbGxIZWlnaHQgIT09IGVsZW0uY2xpZW50SGVpZ2h0KSB7XG4gICAgICAvLyBJZiB3ZSdyZSBhdCB0aGUgdG9wLCBzY3JvbGwgZG93biBvbmUgcGl4ZWwgdG8gYWxsb3cgc2Nyb2xsaW5nIHVwXG4gICAgICBpZiAoZWxlbS5zY3JvbGxUb3AgPT09IDApIHtcbiAgICAgICAgZWxlbS5zY3JvbGxUb3AgPSAxO1xuICAgICAgfVxuICAgICAgLy8gSWYgd2UncmUgYXQgdGhlIGJvdHRvbSwgc2Nyb2xsIHVwIG9uZSBwaXhlbCB0byBhbGxvdyBzY3JvbGxpbmcgZG93blxuICAgICAgaWYgKGVsZW0uc2Nyb2xsVG9wID09PSBlbGVtLnNjcm9sbEhlaWdodCAtIGVsZW0uY2xpZW50SGVpZ2h0KSB7XG4gICAgICAgIGVsZW0uc2Nyb2xsVG9wID0gZWxlbS5zY3JvbGxIZWlnaHQgLSBlbGVtLmNsaWVudEhlaWdodCAtIDE7XG4gICAgICB9XG4gICAgfVxuICAgIGVsZW0uYWxsb3dVcCA9IGVsZW0uc2Nyb2xsVG9wID4gMDtcbiAgICBlbGVtLmFsbG93RG93biA9IGVsZW0uc2Nyb2xsVG9wIDwgKGVsZW0uc2Nyb2xsSGVpZ2h0IC0gZWxlbS5jbGllbnRIZWlnaHQpO1xuICAgIGVsZW0ubGFzdFkgPSBldmVudC5vcmlnaW5hbEV2ZW50LnBhZ2VZO1xuICB9XG5cbiAgX3N0b3BTY3JvbGxQcm9wYWdhdGlvbihldmVudCkge1xuICAgIGxldCBlbGVtID0gdGhpczsgLy8gY2FsbGVkIGZyb20gZXZlbnQgaGFuZGxlciBjb250ZXh0IHdpdGggdGhpcyBhcyBlbGVtXG4gICAgbGV0IHVwID0gZXZlbnQucGFnZVkgPCBlbGVtLmxhc3RZO1xuICAgIGxldCBkb3duID0gIXVwO1xuICAgIGVsZW0ubGFzdFkgPSBldmVudC5wYWdlWTtcblxuICAgIGlmKCh1cCAmJiBlbGVtLmFsbG93VXApIHx8IChkb3duICYmIGVsZW0uYWxsb3dEb3duKSkge1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE9wZW5zIHRoZSBvZmYtY2FudmFzIG1lbnUuXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnQgLSBFdmVudCBvYmplY3QgcGFzc2VkIGZyb20gbGlzdGVuZXIuXG4gICAqIEBwYXJhbSB7alF1ZXJ5fSB0cmlnZ2VyIC0gZWxlbWVudCB0aGF0IHRyaWdnZXJlZCB0aGUgb2ZmLWNhbnZhcyB0byBvcGVuLlxuICAgKiBAZmlyZXMgT2ZmQ2FudmFzI29wZW5lZFxuICAgKi9cbiAgb3BlbihldmVudCwgdHJpZ2dlcikge1xuICAgIGlmICh0aGlzLiRlbGVtZW50Lmhhc0NsYXNzKCdpcy1vcGVuJykgfHwgdGhpcy5pc1JldmVhbGVkKSB7IHJldHVybjsgfVxuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICBpZiAodHJpZ2dlcikge1xuICAgICAgdGhpcy4kbGFzdFRyaWdnZXIgPSB0cmlnZ2VyO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMuZm9yY2VUbyA9PT0gJ3RvcCcpIHtcbiAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCAwKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMub3B0aW9ucy5mb3JjZVRvID09PSAnYm90dG9tJykge1xuICAgICAgd2luZG93LnNjcm9sbFRvKDAsZG9jdW1lbnQuYm9keS5zY3JvbGxIZWlnaHQpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMudHJhbnNpdGlvblRpbWUgJiYgdGhpcy5vcHRpb25zLnRyYW5zaXRpb24gIT09ICdvdmVybGFwJykge1xuICAgICAgdGhpcy4kZWxlbWVudC5zaWJsaW5ncygnW2RhdGEtb2ZmLWNhbnZhcy1jb250ZW50XScpLmNzcygndHJhbnNpdGlvbi1kdXJhdGlvbicsIHRoaXMub3B0aW9ucy50cmFuc2l0aW9uVGltZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuJGVsZW1lbnQuc2libGluZ3MoJ1tkYXRhLW9mZi1jYW52YXMtY29udGVudF0nKS5jc3MoJ3RyYW5zaXRpb24tZHVyYXRpb24nLCAnJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRmlyZXMgd2hlbiB0aGUgb2ZmLWNhbnZhcyBtZW51IG9wZW5zLlxuICAgICAqIEBldmVudCBPZmZDYW52YXMjb3BlbmVkXG4gICAgICovXG4gICAgdGhpcy4kZWxlbWVudC5hZGRDbGFzcygnaXMtb3BlbicpLnJlbW92ZUNsYXNzKCdpcy1jbG9zZWQnKTtcblxuICAgIHRoaXMuJHRyaWdnZXJzLmF0dHIoJ2FyaWEtZXhwYW5kZWQnLCAndHJ1ZScpO1xuICAgIHRoaXMuJGVsZW1lbnQuYXR0cignYXJpYS1oaWRkZW4nLCAnZmFsc2UnKVxuICAgICAgICAudHJpZ2dlcignb3BlbmVkLnpmLm9mZmNhbnZhcycpO1xuXG4gICAgdGhpcy4kY29udGVudC5hZGRDbGFzcygnaXMtb3Blbi0nICsgdGhpcy5wb3NpdGlvbik7XG5cbiAgICAvLyBJZiBgY29udGVudFNjcm9sbGAgaXMgc2V0IHRvIGZhbHNlLCBhZGQgY2xhc3MgYW5kIGRpc2FibGUgc2Nyb2xsaW5nIG9uIHRvdWNoIGRldmljZXMuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5jb250ZW50U2Nyb2xsID09PSBmYWxzZSkge1xuICAgICAgJCgnYm9keScpLmFkZENsYXNzKCdpcy1vZmYtY2FudmFzLW9wZW4nKS5vbigndG91Y2htb3ZlJywgdGhpcy5fc3RvcFNjcm9sbGluZyk7XG4gICAgICB0aGlzLiRlbGVtZW50Lm9uKCd0b3VjaHN0YXJ0JywgdGhpcy5fcmVjb3JkU2Nyb2xsYWJsZSk7XG4gICAgICB0aGlzLiRlbGVtZW50Lm9uKCd0b3VjaG1vdmUnLCB0aGlzLl9zdG9wU2Nyb2xsUHJvcGFnYXRpb24pO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMuY29udGVudE92ZXJsYXkgPT09IHRydWUpIHtcbiAgICAgIHRoaXMuJG92ZXJsYXkuYWRkQ2xhc3MoJ2lzLXZpc2libGUnKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmNsb3NlT25DbGljayA9PT0gdHJ1ZSAmJiB0aGlzLm9wdGlvbnMuY29udGVudE92ZXJsYXkgPT09IHRydWUpIHtcbiAgICAgIHRoaXMuJG92ZXJsYXkuYWRkQ2xhc3MoJ2lzLWNsb3NhYmxlJyk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5hdXRvRm9jdXMgPT09IHRydWUpIHtcbiAgICAgIHRoaXMuJGVsZW1lbnQub25lKHRyYW5zaXRpb25lbmQodGhpcy4kZWxlbWVudCksIGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoIV90aGlzLiRlbGVtZW50Lmhhc0NsYXNzKCdpcy1vcGVuJykpIHtcbiAgICAgICAgICByZXR1cm47IC8vIGV4aXQgaWYgcHJlbWF0dXJlbHkgY2xvc2VkXG4gICAgICAgIH1cbiAgICAgICAgdmFyIGNhbnZhc0ZvY3VzID0gX3RoaXMuJGVsZW1lbnQuZmluZCgnW2RhdGEtYXV0b2ZvY3VzXScpO1xuICAgICAgICBpZiAoY2FudmFzRm9jdXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjYW52YXNGb2N1cy5lcSgwKS5mb2N1cygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgX3RoaXMuJGVsZW1lbnQuZmluZCgnYSwgYnV0dG9uJykuZXEoMCkuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy50cmFwRm9jdXMgPT09IHRydWUpIHtcbiAgICAgIHRoaXMuJGNvbnRlbnQuYXR0cigndGFiaW5kZXgnLCAnLTEnKTtcbiAgICAgIEtleWJvYXJkLnRyYXBGb2N1cyh0aGlzLiRlbGVtZW50KTtcbiAgICB9XG5cbiAgICB0aGlzLl9hZGRDb250ZW50Q2xhc3NlcygpO1xuICB9XG5cbiAgLyoqXG4gICAqIENsb3NlcyB0aGUgb2ZmLWNhbnZhcyBtZW51LlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2IgLSBvcHRpb25hbCBjYiB0byBmaXJlIGFmdGVyIGNsb3N1cmUuXG4gICAqIEBmaXJlcyBPZmZDYW52YXMjY2xvc2VkXG4gICAqL1xuICBjbG9zZShjYikge1xuICAgIGlmICghdGhpcy4kZWxlbWVudC5oYXNDbGFzcygnaXMtb3BlbicpIHx8IHRoaXMuaXNSZXZlYWxlZCkgeyByZXR1cm47IH1cblxuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICB0aGlzLiRlbGVtZW50LnJlbW92ZUNsYXNzKCdpcy1vcGVuJyk7XG5cbiAgICB0aGlzLiRlbGVtZW50LmF0dHIoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKVxuICAgICAgLyoqXG4gICAgICAgKiBGaXJlcyB3aGVuIHRoZSBvZmYtY2FudmFzIG1lbnUgb3BlbnMuXG4gICAgICAgKiBAZXZlbnQgT2ZmQ2FudmFzI2Nsb3NlZFxuICAgICAgICovXG4gICAgICAgIC50cmlnZ2VyKCdjbG9zZWQuemYub2ZmY2FudmFzJyk7XG5cbiAgICB0aGlzLiRjb250ZW50LnJlbW92ZUNsYXNzKCdpcy1vcGVuLWxlZnQgaXMtb3Blbi10b3AgaXMtb3Blbi1yaWdodCBpcy1vcGVuLWJvdHRvbScpO1xuXG4gICAgLy8gSWYgYGNvbnRlbnRTY3JvbGxgIGlzIHNldCB0byBmYWxzZSwgcmVtb3ZlIGNsYXNzIGFuZCByZS1lbmFibGUgc2Nyb2xsaW5nIG9uIHRvdWNoIGRldmljZXMuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5jb250ZW50U2Nyb2xsID09PSBmYWxzZSkge1xuICAgICAgJCgnYm9keScpLnJlbW92ZUNsYXNzKCdpcy1vZmYtY2FudmFzLW9wZW4nKS5vZmYoJ3RvdWNobW92ZScsIHRoaXMuX3N0b3BTY3JvbGxpbmcpO1xuICAgICAgdGhpcy4kZWxlbWVudC5vZmYoJ3RvdWNoc3RhcnQnLCB0aGlzLl9yZWNvcmRTY3JvbGxhYmxlKTtcbiAgICAgIHRoaXMuJGVsZW1lbnQub2ZmKCd0b3VjaG1vdmUnLCB0aGlzLl9zdG9wU2Nyb2xsUHJvcGFnYXRpb24pO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMuY29udGVudE92ZXJsYXkgPT09IHRydWUpIHtcbiAgICAgIHRoaXMuJG92ZXJsYXkucmVtb3ZlQ2xhc3MoJ2lzLXZpc2libGUnKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmNsb3NlT25DbGljayA9PT0gdHJ1ZSAmJiB0aGlzLm9wdGlvbnMuY29udGVudE92ZXJsYXkgPT09IHRydWUpIHtcbiAgICAgIHRoaXMuJG92ZXJsYXkucmVtb3ZlQ2xhc3MoJ2lzLWNsb3NhYmxlJyk7XG4gICAgfVxuXG4gICAgdGhpcy4kdHJpZ2dlcnMuYXR0cignYXJpYS1leHBhbmRlZCcsICdmYWxzZScpO1xuXG4gICAgaWYgKHRoaXMub3B0aW9ucy50cmFwRm9jdXMgPT09IHRydWUpIHtcbiAgICAgIHRoaXMuJGNvbnRlbnQucmVtb3ZlQXR0cigndGFiaW5kZXgnKTtcbiAgICAgIEtleWJvYXJkLnJlbGVhc2VGb2N1cyh0aGlzLiRlbGVtZW50KTtcbiAgICB9XG5cbiAgICAvLyBMaXN0ZW4gdG8gdHJhbnNpdGlvbkVuZCBhbmQgYWRkIGNsYXNzIHdoZW4gZG9uZS5cbiAgICB0aGlzLiRlbGVtZW50Lm9uZSh0cmFuc2l0aW9uZW5kKHRoaXMuJGVsZW1lbnQpLCBmdW5jdGlvbihlKSB7XG4gICAgICBfdGhpcy4kZWxlbWVudC5hZGRDbGFzcygnaXMtY2xvc2VkJyk7XG4gICAgICBfdGhpcy5fcmVtb3ZlQ29udGVudENsYXNzZXMoKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUb2dnbGVzIHRoZSBvZmYtY2FudmFzIG1lbnUgb3BlbiBvciBjbG9zZWQuXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnQgLSBFdmVudCBvYmplY3QgcGFzc2VkIGZyb20gbGlzdGVuZXIuXG4gICAqIEBwYXJhbSB7alF1ZXJ5fSB0cmlnZ2VyIC0gZWxlbWVudCB0aGF0IHRyaWdnZXJlZCB0aGUgb2ZmLWNhbnZhcyB0byBvcGVuLlxuICAgKi9cbiAgdG9nZ2xlKGV2ZW50LCB0cmlnZ2VyKSB7XG4gICAgaWYgKHRoaXMuJGVsZW1lbnQuaGFzQ2xhc3MoJ2lzLW9wZW4nKSkge1xuICAgICAgdGhpcy5jbG9zZShldmVudCwgdHJpZ2dlcik7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhpcy5vcGVuKGV2ZW50LCB0cmlnZ2VyKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyBrZXlib2FyZCBpbnB1dCB3aGVuIGRldGVjdGVkLiBXaGVuIHRoZSBlc2NhcGUga2V5IGlzIHByZXNzZWQsIHRoZSBvZmYtY2FudmFzIG1lbnUgY2xvc2VzLCBhbmQgZm9jdXMgaXMgcmVzdG9yZWQgdG8gdGhlIGVsZW1lbnQgdGhhdCBvcGVuZWQgdGhlIG1lbnUuXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2hhbmRsZUtleWJvYXJkKGUpIHtcbiAgICBLZXlib2FyZC5oYW5kbGVLZXkoZSwgJ09mZkNhbnZhcycsIHtcbiAgICAgIGNsb3NlOiAoKSA9PiB7XG4gICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgdGhpcy4kbGFzdFRyaWdnZXIuZm9jdXMoKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9LFxuICAgICAgaGFuZGxlZDogKCkgPT4ge1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogRGVzdHJveXMgdGhlIG9mZmNhbnZhcyBwbHVnaW4uXG4gICAqIEBmdW5jdGlvblxuICAgKi9cbiAgX2Rlc3Ryb3koKSB7XG4gICAgdGhpcy5jbG9zZSgpO1xuICAgIHRoaXMuJGVsZW1lbnQub2ZmKCcuemYudHJpZ2dlciAuemYub2ZmY2FudmFzJyk7XG4gICAgdGhpcy4kb3ZlcmxheS5vZmYoJy56Zi5vZmZjYW52YXMnKTtcbiAgfVxufVxuXG5PZmZDYW52YXMuZGVmYXVsdHMgPSB7XG4gIC8qKlxuICAgKiBBbGxvdyB0aGUgdXNlciB0byBjbGljayBvdXRzaWRlIG9mIHRoZSBtZW51IHRvIGNsb3NlIGl0LlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAZGVmYXVsdCB0cnVlXG4gICAqL1xuICBjbG9zZU9uQ2xpY2s6IHRydWUsXG5cbiAgLyoqXG4gICAqIEFkZHMgYW4gb3ZlcmxheSBvbiB0b3Agb2YgYFtkYXRhLW9mZi1jYW52YXMtY29udGVudF1gLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAZGVmYXVsdCB0cnVlXG4gICAqL1xuICBjb250ZW50T3ZlcmxheTogdHJ1ZSxcblxuICAvKipcbiAgICogVGFyZ2V0IGFuIG9mZi1jYW52YXMgY29udGVudCBjb250YWluZXIgYnkgSUQgdGhhdCBtYXkgYmUgcGxhY2VkIGFueXdoZXJlLiBJZiBudWxsIHRoZSBjbG9zZXN0IGNvbnRlbnQgY29udGFpbmVyIHdpbGwgYmUgdGFrZW4uXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUgez9zdHJpbmd9XG4gICAqIEBkZWZhdWx0IG51bGxcbiAgICovXG4gIGNvbnRlbnRJZDogbnVsbCxcblxuICAvKipcbiAgICogRGVmaW5lIHRoZSBvZmYtY2FudmFzIGVsZW1lbnQgaXMgbmVzdGVkIGluIGFuIG9mZi1jYW52YXMgY29udGVudC4gVGhpcyBpcyByZXF1aXJlZCB3aGVuIHVzaW5nIHRoZSBjb250ZW50SWQgb3B0aW9uIGZvciBhIG5lc3RlZCBlbGVtZW50LlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAZGVmYXVsdCBudWxsXG4gICAqL1xuICBuZXN0ZWQ6IG51bGwsXG5cbiAgLyoqXG4gICAqIEVuYWJsZS9kaXNhYmxlIHNjcm9sbGluZyBvZiB0aGUgbWFpbiBjb250ZW50IHdoZW4gYW4gb2ZmIGNhbnZhcyBwYW5lbCBpcyBvcGVuLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAZGVmYXVsdCB0cnVlXG4gICAqL1xuICBjb250ZW50U2Nyb2xsOiB0cnVlLFxuXG4gIC8qKlxuICAgKiBBbW91bnQgb2YgdGltZSBpbiBtcyB0aGUgb3BlbiBhbmQgY2xvc2UgdHJhbnNpdGlvbiByZXF1aXJlcy4gSWYgbm9uZSBzZWxlY3RlZCwgcHVsbHMgZnJvbSBib2R5IHN0eWxlLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtudW1iZXJ9XG4gICAqIEBkZWZhdWx0IG51bGxcbiAgICovXG4gIHRyYW5zaXRpb25UaW1lOiBudWxsLFxuXG4gIC8qKlxuICAgKiBUeXBlIG9mIHRyYW5zaXRpb24gZm9yIHRoZSBvZmZjYW52YXMgbWVudS4gT3B0aW9ucyBhcmUgJ3B1c2gnLCAnZGV0YWNoZWQnIG9yICdzbGlkZScuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge3N0cmluZ31cbiAgICogQGRlZmF1bHQgcHVzaFxuICAgKi9cbiAgdHJhbnNpdGlvbjogJ3B1c2gnLFxuXG4gIC8qKlxuICAgKiBGb3JjZSB0aGUgcGFnZSB0byBzY3JvbGwgdG8gdG9wIG9yIGJvdHRvbSBvbiBvcGVuLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHs/c3RyaW5nfVxuICAgKiBAZGVmYXVsdCBudWxsXG4gICAqL1xuICBmb3JjZVRvOiBudWxsLFxuXG4gIC8qKlxuICAgKiBBbGxvdyB0aGUgb2ZmY2FudmFzIHRvIHJlbWFpbiBvcGVuIGZvciBjZXJ0YWluIGJyZWFrcG9pbnRzLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgKi9cbiAgaXNSZXZlYWxlZDogZmFsc2UsXG5cbiAgLyoqXG4gICAqIEJyZWFrcG9pbnQgYXQgd2hpY2ggdG8gcmV2ZWFsLiBKUyB3aWxsIHVzZSBhIFJlZ0V4cCB0byB0YXJnZXQgc3RhbmRhcmQgY2xhc3NlcywgaWYgY2hhbmdpbmcgY2xhc3NuYW1lcywgcGFzcyB5b3VyIGNsYXNzIHdpdGggdGhlIGByZXZlYWxDbGFzc2Agb3B0aW9uLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHs/c3RyaW5nfVxuICAgKiBAZGVmYXVsdCBudWxsXG4gICAqL1xuICByZXZlYWxPbjogbnVsbCxcblxuICAvKipcbiAgICogRm9yY2UgZm9jdXMgdG8gdGhlIG9mZmNhbnZhcyBvbiBvcGVuLiBJZiB0cnVlLCB3aWxsIGZvY3VzIHRoZSBvcGVuaW5nIHRyaWdnZXIgb24gY2xvc2UuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBkZWZhdWx0IHRydWVcbiAgICovXG4gIGF1dG9Gb2N1czogdHJ1ZSxcblxuICAvKipcbiAgICogQ2xhc3MgdXNlZCB0byBmb3JjZSBhbiBvZmZjYW52YXMgdG8gcmVtYWluIG9wZW4uIEZvdW5kYXRpb24gZGVmYXVsdHMgZm9yIHRoaXMgYXJlIGByZXZlYWwtZm9yLWxhcmdlYCAmIGByZXZlYWwtZm9yLW1lZGl1bWAuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge3N0cmluZ31cbiAgICogQGRlZmF1bHQgcmV2ZWFsLWZvci1cbiAgICogQHRvZG8gaW1wcm92ZSB0aGUgcmVnZXggdGVzdGluZyBmb3IgdGhpcy5cbiAgICovXG4gIHJldmVhbENsYXNzOiAncmV2ZWFsLWZvci0nLFxuXG4gIC8qKlxuICAgKiBUcmlnZ2VycyBvcHRpb25hbCBmb2N1cyB0cmFwcGluZyB3aGVuIG9wZW5pbmcgYW4gb2ZmY2FudmFzLiBTZXRzIHRhYmluZGV4IG9mIFtkYXRhLW9mZi1jYW52YXMtY29udGVudF0gdG8gLTEgZm9yIGFjY2Vzc2liaWxpdHkgcHVycG9zZXMuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBkZWZhdWx0IGZhbHNlXG4gICAqL1xuICB0cmFwRm9jdXM6IGZhbHNlXG59XG5cbmV4cG9ydCB7T2ZmQ2FudmFzfTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24ub2ZmY2FudmFzLmpzIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IHsgS2V5Ym9hcmQgfSBmcm9tICcuL2ZvdW5kYXRpb24udXRpbC5rZXlib2FyZCc7XG5pbXBvcnQgeyBvbkltYWdlc0xvYWRlZCB9IGZyb20gJy4vZm91bmRhdGlvbi51dGlsLmltYWdlTG9hZGVyJztcbmltcG9ydCB7IFBsdWdpbiB9IGZyb20gJy4vZm91bmRhdGlvbi5wbHVnaW4nO1xuLyoqXG4gKiBUYWJzIG1vZHVsZS5cbiAqIEBtb2R1bGUgZm91bmRhdGlvbi50YWJzXG4gKiBAcmVxdWlyZXMgZm91bmRhdGlvbi51dGlsLmtleWJvYXJkXG4gKiBAcmVxdWlyZXMgZm91bmRhdGlvbi51dGlsLmltYWdlTG9hZGVyIGlmIHRhYnMgY29udGFpbiBpbWFnZXNcbiAqL1xuXG5jbGFzcyBUYWJzIGV4dGVuZHMgUGx1Z2luIHtcbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgdGFicy5cbiAgICogQGNsYXNzXG4gICAqIEBuYW1lIFRhYnNcbiAgICogQGZpcmVzIFRhYnMjaW5pdFxuICAgKiBAcGFyYW0ge2pRdWVyeX0gZWxlbWVudCAtIGpRdWVyeSBvYmplY3QgdG8gbWFrZSBpbnRvIHRhYnMuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gT3ZlcnJpZGVzIHRvIHRoZSBkZWZhdWx0IHBsdWdpbiBzZXR0aW5ncy5cbiAgICovXG4gIF9zZXR1cChlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgdGhpcy4kZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgdGhpcy5vcHRpb25zID0gJC5leHRlbmQoe30sIFRhYnMuZGVmYXVsdHMsIHRoaXMuJGVsZW1lbnQuZGF0YSgpLCBvcHRpb25zKTtcbiAgICB0aGlzLmNsYXNzTmFtZSA9ICdUYWJzJzsgLy8gaWU5IGJhY2sgY29tcGF0XG5cbiAgICB0aGlzLl9pbml0KCk7XG4gICAgS2V5Ym9hcmQucmVnaXN0ZXIoJ1RhYnMnLCB7XG4gICAgICAnRU5URVInOiAnb3BlbicsXG4gICAgICAnU1BBQ0UnOiAnb3BlbicsXG4gICAgICAnQVJST1dfUklHSFQnOiAnbmV4dCcsXG4gICAgICAnQVJST1dfVVAnOiAncHJldmlvdXMnLFxuICAgICAgJ0FSUk9XX0RPV04nOiAnbmV4dCcsXG4gICAgICAnQVJST1dfTEVGVCc6ICdwcmV2aW91cydcbiAgICAgIC8vICdUQUInOiAnbmV4dCcsXG4gICAgICAvLyAnU0hJRlRfVEFCJzogJ3ByZXZpb3VzJ1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemVzIHRoZSB0YWJzIGJ5IHNob3dpbmcgYW5kIGZvY3VzaW5nIChpZiBhdXRvRm9jdXM9dHJ1ZSkgdGhlIHByZXNldCBhY3RpdmUgdGFiLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2luaXQoKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIHRoaXMuJGVsZW1lbnQuYXR0cih7J3JvbGUnOiAndGFibGlzdCd9KTtcbiAgICB0aGlzLiR0YWJUaXRsZXMgPSB0aGlzLiRlbGVtZW50LmZpbmQoYC4ke3RoaXMub3B0aW9ucy5saW5rQ2xhc3N9YCk7XG4gICAgdGhpcy4kdGFiQ29udGVudCA9ICQoYFtkYXRhLXRhYnMtY29udGVudD1cIiR7dGhpcy4kZWxlbWVudFswXS5pZH1cIl1gKTtcblxuICAgIHRoaXMuJHRhYlRpdGxlcy5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICB2YXIgJGVsZW0gPSAkKHRoaXMpLFxuICAgICAgICAgICRsaW5rID0gJGVsZW0uZmluZCgnYScpLFxuICAgICAgICAgIGlzQWN0aXZlID0gJGVsZW0uaGFzQ2xhc3MoYCR7X3RoaXMub3B0aW9ucy5saW5rQWN0aXZlQ2xhc3N9YCksXG4gICAgICAgICAgaGFzaCA9ICRsaW5rLmF0dHIoJ2RhdGEtdGFicy10YXJnZXQnKSB8fCAkbGlua1swXS5oYXNoLnNsaWNlKDEpLFxuICAgICAgICAgIGxpbmtJZCA9ICRsaW5rWzBdLmlkID8gJGxpbmtbMF0uaWQgOiBgJHtoYXNofS1sYWJlbGAsXG4gICAgICAgICAgJHRhYkNvbnRlbnQgPSAkKGAjJHtoYXNofWApO1xuXG4gICAgICAkZWxlbS5hdHRyKHsncm9sZSc6ICdwcmVzZW50YXRpb24nfSk7XG5cbiAgICAgICRsaW5rLmF0dHIoe1xuICAgICAgICAncm9sZSc6ICd0YWInLFxuICAgICAgICAnYXJpYS1jb250cm9scyc6IGhhc2gsXG4gICAgICAgICdhcmlhLXNlbGVjdGVkJzogaXNBY3RpdmUsXG4gICAgICAgICdpZCc6IGxpbmtJZCxcbiAgICAgICAgJ3RhYmluZGV4JzogaXNBY3RpdmUgPyAnMCcgOiAnLTEnXG4gICAgICB9KTtcblxuICAgICAgJHRhYkNvbnRlbnQuYXR0cih7XG4gICAgICAgICdyb2xlJzogJ3RhYnBhbmVsJyxcbiAgICAgICAgJ2FyaWEtbGFiZWxsZWRieSc6IGxpbmtJZFxuICAgICAgfSk7XG5cbiAgICAgIGlmKCFpc0FjdGl2ZSkge1xuICAgICAgICAkdGFiQ29udGVudC5hdHRyKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG4gICAgICB9XG5cbiAgICAgIGlmKGlzQWN0aXZlICYmIF90aGlzLm9wdGlvbnMuYXV0b0ZvY3VzKXtcbiAgICAgICAgJCh3aW5kb3cpLmxvYWQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoeyBzY3JvbGxUb3A6ICRlbGVtLm9mZnNldCgpLnRvcCB9LCBfdGhpcy5vcHRpb25zLmRlZXBMaW5rU211ZGdlRGVsYXksICgpID0+IHtcbiAgICAgICAgICAgICRsaW5rLmZvY3VzKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmKHRoaXMub3B0aW9ucy5tYXRjaEhlaWdodCkge1xuICAgICAgdmFyICRpbWFnZXMgPSB0aGlzLiR0YWJDb250ZW50LmZpbmQoJ2ltZycpO1xuXG4gICAgICBpZiAoJGltYWdlcy5sZW5ndGgpIHtcbiAgICAgICAgb25JbWFnZXNMb2FkZWQoJGltYWdlcywgdGhpcy5fc2V0SGVpZ2h0LmJpbmQodGhpcykpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fc2V0SGVpZ2h0KCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgIC8vY3VycmVudCBjb250ZXh0LWJvdW5kIGZ1bmN0aW9uIHRvIG9wZW4gdGFicyBvbiBwYWdlIGxvYWQgb3IgaGlzdG9yeSBwb3BzdGF0ZVxuICAgIHRoaXMuX2NoZWNrRGVlcExpbmsgPSAoKSA9PiB7XG4gICAgICB2YXIgYW5jaG9yID0gd2luZG93LmxvY2F0aW9uLmhhc2g7XG4gICAgICAvL25lZWQgYSBoYXNoIGFuZCBhIHJlbGV2YW50IGFuY2hvciBpbiB0aGlzIHRhYnNldFxuICAgICAgaWYoYW5jaG9yLmxlbmd0aCkge1xuICAgICAgICB2YXIgJGxpbmsgPSB0aGlzLiRlbGVtZW50LmZpbmQoJ1tocmVmJD1cIicrYW5jaG9yKydcIl0nKTtcbiAgICAgICAgaWYgKCRsaW5rLmxlbmd0aCkge1xuICAgICAgICAgIHRoaXMuc2VsZWN0VGFiKCQoYW5jaG9yKSwgdHJ1ZSk7XG5cbiAgICAgICAgICAvL3JvbGwgdXAgYSBsaXR0bGUgdG8gc2hvdyB0aGUgdGl0bGVzXG4gICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5kZWVwTGlua1NtdWRnZSkge1xuICAgICAgICAgICAgdmFyIG9mZnNldCA9IHRoaXMuJGVsZW1lbnQub2Zmc2V0KCk7XG4gICAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7IHNjcm9sbFRvcDogb2Zmc2V0LnRvcCB9LCB0aGlzLm9wdGlvbnMuZGVlcExpbmtTbXVkZ2VEZWxheSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLyoqXG4gICAgICAgICAgICAqIEZpcmVzIHdoZW4gdGhlIHpwbHVnaW4gaGFzIGRlZXBsaW5rZWQgYXQgcGFnZWxvYWRcbiAgICAgICAgICAgICogQGV2ZW50IFRhYnMjZGVlcGxpbmtcbiAgICAgICAgICAgICovXG4gICAgICAgICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlcignZGVlcGxpbmsuemYudGFicycsIFskbGluaywgJChhbmNob3IpXSk7XG4gICAgICAgICB9XG4gICAgICAgfVxuICAgICB9XG5cbiAgICAvL3VzZSBicm93c2VyIHRvIG9wZW4gYSB0YWIsIGlmIGl0IGV4aXN0cyBpbiB0aGlzIHRhYnNldFxuICAgIGlmICh0aGlzLm9wdGlvbnMuZGVlcExpbmspIHtcbiAgICAgIHRoaXMuX2NoZWNrRGVlcExpbmsoKTtcbiAgICB9XG5cbiAgICB0aGlzLl9ldmVudHMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGV2ZW50IGhhbmRsZXJzIGZvciBpdGVtcyB3aXRoaW4gdGhlIHRhYnMuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfZXZlbnRzKCkge1xuICAgIHRoaXMuX2FkZEtleUhhbmRsZXIoKTtcbiAgICB0aGlzLl9hZGRDbGlja0hhbmRsZXIoKTtcbiAgICB0aGlzLl9zZXRIZWlnaHRNcUhhbmRsZXIgPSBudWxsO1xuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5tYXRjaEhlaWdodCkge1xuICAgICAgdGhpcy5fc2V0SGVpZ2h0TXFIYW5kbGVyID0gdGhpcy5fc2V0SGVpZ2h0LmJpbmQodGhpcyk7XG5cbiAgICAgICQod2luZG93KS5vbignY2hhbmdlZC56Zi5tZWRpYXF1ZXJ5JywgdGhpcy5fc2V0SGVpZ2h0TXFIYW5kbGVyKTtcbiAgICB9XG5cbiAgICBpZih0aGlzLm9wdGlvbnMuZGVlcExpbmspIHtcbiAgICAgICQod2luZG93KS5vbigncG9wc3RhdGUnLCB0aGlzLl9jaGVja0RlZXBMaW5rKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBjbGljayBoYW5kbGVycyBmb3IgaXRlbXMgd2l0aGluIHRoZSB0YWJzLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2FkZENsaWNrSGFuZGxlcigpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgdGhpcy4kZWxlbWVudFxuICAgICAgLm9mZignY2xpY2suemYudGFicycpXG4gICAgICAub24oJ2NsaWNrLnpmLnRhYnMnLCBgLiR7dGhpcy5vcHRpb25zLmxpbmtDbGFzc31gLCBmdW5jdGlvbihlKXtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBfdGhpcy5faGFuZGxlVGFiQ2hhbmdlKCQodGhpcykpO1xuICAgICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBrZXlib2FyZCBldmVudCBoYW5kbGVycyBmb3IgaXRlbXMgd2l0aGluIHRoZSB0YWJzLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2FkZEtleUhhbmRsZXIoKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIHRoaXMuJHRhYlRpdGxlcy5vZmYoJ2tleWRvd24uemYudGFicycpLm9uKCdrZXlkb3duLnpmLnRhYnMnLCBmdW5jdGlvbihlKXtcbiAgICAgIGlmIChlLndoaWNoID09PSA5KSByZXR1cm47XG5cblxuICAgICAgdmFyICRlbGVtZW50ID0gJCh0aGlzKSxcbiAgICAgICAgJGVsZW1lbnRzID0gJGVsZW1lbnQucGFyZW50KCd1bCcpLmNoaWxkcmVuKCdsaScpLFxuICAgICAgICAkcHJldkVsZW1lbnQsXG4gICAgICAgICRuZXh0RWxlbWVudDtcblxuICAgICAgJGVsZW1lbnRzLmVhY2goZnVuY3Rpb24oaSkge1xuICAgICAgICBpZiAoJCh0aGlzKS5pcygkZWxlbWVudCkpIHtcbiAgICAgICAgICBpZiAoX3RoaXMub3B0aW9ucy53cmFwT25LZXlzKSB7XG4gICAgICAgICAgICAkcHJldkVsZW1lbnQgPSBpID09PSAwID8gJGVsZW1lbnRzLmxhc3QoKSA6ICRlbGVtZW50cy5lcShpLTEpO1xuICAgICAgICAgICAgJG5leHRFbGVtZW50ID0gaSA9PT0gJGVsZW1lbnRzLmxlbmd0aCAtMSA/ICRlbGVtZW50cy5maXJzdCgpIDogJGVsZW1lbnRzLmVxKGkrMSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICRwcmV2RWxlbWVudCA9ICRlbGVtZW50cy5lcShNYXRoLm1heCgwLCBpLTEpKTtcbiAgICAgICAgICAgICRuZXh0RWxlbWVudCA9ICRlbGVtZW50cy5lcShNYXRoLm1pbihpKzEsICRlbGVtZW50cy5sZW5ndGgtMSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICAvLyBoYW5kbGUga2V5Ym9hcmQgZXZlbnQgd2l0aCBrZXlib2FyZCB1dGlsXG4gICAgICBLZXlib2FyZC5oYW5kbGVLZXkoZSwgJ1RhYnMnLCB7XG4gICAgICAgIG9wZW46IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICRlbGVtZW50LmZpbmQoJ1tyb2xlPVwidGFiXCJdJykuZm9jdXMoKTtcbiAgICAgICAgICBfdGhpcy5faGFuZGxlVGFiQ2hhbmdlKCRlbGVtZW50KTtcbiAgICAgICAgfSxcbiAgICAgICAgcHJldmlvdXM6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICRwcmV2RWxlbWVudC5maW5kKCdbcm9sZT1cInRhYlwiXScpLmZvY3VzKCk7XG4gICAgICAgICAgX3RoaXMuX2hhbmRsZVRhYkNoYW5nZSgkcHJldkVsZW1lbnQpO1xuICAgICAgICB9LFxuICAgICAgICBuZXh0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAkbmV4dEVsZW1lbnQuZmluZCgnW3JvbGU9XCJ0YWJcIl0nKS5mb2N1cygpO1xuICAgICAgICAgIF90aGlzLl9oYW5kbGVUYWJDaGFuZ2UoJG5leHRFbGVtZW50KTtcbiAgICAgICAgfSxcbiAgICAgICAgaGFuZGxlZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIE9wZW5zIHRoZSB0YWIgYCR0YXJnZXRDb250ZW50YCBkZWZpbmVkIGJ5IGAkdGFyZ2V0YC4gQ29sbGFwc2VzIGFjdGl2ZSB0YWIuXG4gICAqIEBwYXJhbSB7alF1ZXJ5fSAkdGFyZ2V0IC0gVGFiIHRvIG9wZW4uXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gaGlzdG9yeUhhbmRsZWQgLSBicm93c2VyIGhhcyBhbHJlYWR5IGhhbmRsZWQgYSBoaXN0b3J5IHVwZGF0ZVxuICAgKiBAZmlyZXMgVGFicyNjaGFuZ2VcbiAgICogQGZ1bmN0aW9uXG4gICAqL1xuICBfaGFuZGxlVGFiQ2hhbmdlKCR0YXJnZXQsIGhpc3RvcnlIYW5kbGVkKSB7XG5cbiAgICAvKipcbiAgICAgKiBDaGVjayBmb3IgYWN0aXZlIGNsYXNzIG9uIHRhcmdldC4gQ29sbGFwc2UgaWYgZXhpc3RzLlxuICAgICAqL1xuICAgIGlmICgkdGFyZ2V0Lmhhc0NsYXNzKGAke3RoaXMub3B0aW9ucy5saW5rQWN0aXZlQ2xhc3N9YCkpIHtcbiAgICAgICAgaWYodGhpcy5vcHRpb25zLmFjdGl2ZUNvbGxhcHNlKSB7XG4gICAgICAgICAgICB0aGlzLl9jb2xsYXBzZVRhYigkdGFyZ2V0KTtcblxuICAgICAgICAgICAvKipcbiAgICAgICAgICAgICogRmlyZXMgd2hlbiB0aGUgenBsdWdpbiBoYXMgc3VjY2Vzc2Z1bGx5IGNvbGxhcHNlZCB0YWJzLlxuICAgICAgICAgICAgKiBAZXZlbnQgVGFicyNjb2xsYXBzZVxuICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlcignY29sbGFwc2UuemYudGFicycsIFskdGFyZ2V0XSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciAkb2xkVGFiID0gdGhpcy4kZWxlbWVudC5cbiAgICAgICAgICBmaW5kKGAuJHt0aGlzLm9wdGlvbnMubGlua0NsYXNzfS4ke3RoaXMub3B0aW9ucy5saW5rQWN0aXZlQ2xhc3N9YCksXG4gICAgICAgICAgJHRhYkxpbmsgPSAkdGFyZ2V0LmZpbmQoJ1tyb2xlPVwidGFiXCJdJyksXG4gICAgICAgICAgaGFzaCA9ICR0YWJMaW5rLmF0dHIoJ2RhdGEtdGFicy10YXJnZXQnKSB8fCAkdGFiTGlua1swXS5oYXNoLnNsaWNlKDEpLFxuICAgICAgICAgICR0YXJnZXRDb250ZW50ID0gdGhpcy4kdGFiQ29udGVudC5maW5kKGAjJHtoYXNofWApO1xuXG4gICAgLy9jbG9zZSBvbGQgdGFiXG4gICAgdGhpcy5fY29sbGFwc2VUYWIoJG9sZFRhYik7XG5cbiAgICAvL29wZW4gbmV3IHRhYlxuICAgIHRoaXMuX29wZW5UYWIoJHRhcmdldCk7XG5cbiAgICAvL2VpdGhlciByZXBsYWNlIG9yIHVwZGF0ZSBicm93c2VyIGhpc3RvcnlcbiAgICBpZiAodGhpcy5vcHRpb25zLmRlZXBMaW5rICYmICFoaXN0b3J5SGFuZGxlZCkge1xuICAgICAgdmFyIGFuY2hvciA9ICR0YXJnZXQuZmluZCgnYScpLmF0dHIoJ2hyZWYnKTtcblxuICAgICAgaWYgKHRoaXMub3B0aW9ucy51cGRhdGVIaXN0b3J5KSB7XG4gICAgICAgIGhpc3RvcnkucHVzaFN0YXRlKHt9LCAnJywgYW5jaG9yKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGhpc3RvcnkucmVwbGFjZVN0YXRlKHt9LCAnJywgYW5jaG9yKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGaXJlcyB3aGVuIHRoZSBwbHVnaW4gaGFzIHN1Y2Nlc3NmdWxseSBjaGFuZ2VkIHRhYnMuXG4gICAgICogQGV2ZW50IFRhYnMjY2hhbmdlXG4gICAgICovXG4gICAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKCdjaGFuZ2UuemYudGFicycsIFskdGFyZ2V0LCAkdGFyZ2V0Q29udGVudF0pO1xuXG4gICAgLy9maXJlIHRvIGNoaWxkcmVuIGEgbXV0YXRpb24gZXZlbnRcbiAgICAkdGFyZ2V0Q29udGVudC5maW5kKFwiW2RhdGEtbXV0YXRlXVwiKS50cmlnZ2VyKFwibXV0YXRlbWUuemYudHJpZ2dlclwiKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBPcGVucyB0aGUgdGFiIGAkdGFyZ2V0Q29udGVudGAgZGVmaW5lZCBieSBgJHRhcmdldGAuXG4gICAqIEBwYXJhbSB7alF1ZXJ5fSAkdGFyZ2V0IC0gVGFiIHRvIE9wZW4uXG4gICAqIEBmdW5jdGlvblxuICAgKi9cbiAgX29wZW5UYWIoJHRhcmdldCkge1xuICAgICAgdmFyICR0YWJMaW5rID0gJHRhcmdldC5maW5kKCdbcm9sZT1cInRhYlwiXScpLFxuICAgICAgICAgIGhhc2ggPSAkdGFiTGluay5hdHRyKCdkYXRhLXRhYnMtdGFyZ2V0JykgfHwgJHRhYkxpbmtbMF0uaGFzaC5zbGljZSgxKSxcbiAgICAgICAgICAkdGFyZ2V0Q29udGVudCA9IHRoaXMuJHRhYkNvbnRlbnQuZmluZChgIyR7aGFzaH1gKTtcblxuICAgICAgJHRhcmdldC5hZGRDbGFzcyhgJHt0aGlzLm9wdGlvbnMubGlua0FjdGl2ZUNsYXNzfWApO1xuXG4gICAgICAkdGFiTGluay5hdHRyKHtcbiAgICAgICAgJ2FyaWEtc2VsZWN0ZWQnOiAndHJ1ZScsXG4gICAgICAgICd0YWJpbmRleCc6ICcwJ1xuICAgICAgfSk7XG5cbiAgICAgICR0YXJnZXRDb250ZW50XG4gICAgICAgIC5hZGRDbGFzcyhgJHt0aGlzLm9wdGlvbnMucGFuZWxBY3RpdmVDbGFzc31gKS5yZW1vdmVBdHRyKCdhcmlhLWhpZGRlbicpO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbGxhcHNlcyBgJHRhcmdldENvbnRlbnRgIGRlZmluZWQgYnkgYCR0YXJnZXRgLlxuICAgKiBAcGFyYW0ge2pRdWVyeX0gJHRhcmdldCAtIFRhYiB0byBPcGVuLlxuICAgKiBAZnVuY3Rpb25cbiAgICovXG4gIF9jb2xsYXBzZVRhYigkdGFyZ2V0KSB7XG4gICAgdmFyICR0YXJnZXRfYW5jaG9yID0gJHRhcmdldFxuICAgICAgLnJlbW92ZUNsYXNzKGAke3RoaXMub3B0aW9ucy5saW5rQWN0aXZlQ2xhc3N9YClcbiAgICAgIC5maW5kKCdbcm9sZT1cInRhYlwiXScpXG4gICAgICAuYXR0cih7XG4gICAgICAgICdhcmlhLXNlbGVjdGVkJzogJ2ZhbHNlJyxcbiAgICAgICAgJ3RhYmluZGV4JzogLTFcbiAgICAgIH0pO1xuXG4gICAgJChgIyR7JHRhcmdldF9hbmNob3IuYXR0cignYXJpYS1jb250cm9scycpfWApXG4gICAgICAucmVtb3ZlQ2xhc3MoYCR7dGhpcy5vcHRpb25zLnBhbmVsQWN0aXZlQ2xhc3N9YClcbiAgICAgIC5hdHRyKHsgJ2FyaWEtaGlkZGVuJzogJ3RydWUnIH0pXG4gIH1cblxuICAvKipcbiAgICogUHVibGljIG1ldGhvZCBmb3Igc2VsZWN0aW5nIGEgY29udGVudCBwYW5lIHRvIGRpc3BsYXkuXG4gICAqIEBwYXJhbSB7alF1ZXJ5IHwgU3RyaW5nfSBlbGVtIC0galF1ZXJ5IG9iamVjdCBvciBzdHJpbmcgb2YgdGhlIGlkIG9mIHRoZSBwYW5lIHRvIGRpc3BsYXkuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gaGlzdG9yeUhhbmRsZWQgLSBicm93c2VyIGhhcyBhbHJlYWR5IGhhbmRsZWQgYSBoaXN0b3J5IHVwZGF0ZVxuICAgKiBAZnVuY3Rpb25cbiAgICovXG4gIHNlbGVjdFRhYihlbGVtLCBoaXN0b3J5SGFuZGxlZCkge1xuICAgIHZhciBpZFN0cjtcblxuICAgIGlmICh0eXBlb2YgZWxlbSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGlkU3RyID0gZWxlbVswXS5pZDtcbiAgICB9IGVsc2Uge1xuICAgICAgaWRTdHIgPSBlbGVtO1xuICAgIH1cblxuICAgIGlmIChpZFN0ci5pbmRleE9mKCcjJykgPCAwKSB7XG4gICAgICBpZFN0ciA9IGAjJHtpZFN0cn1gO1xuICAgIH1cblxuICAgIHZhciAkdGFyZ2V0ID0gdGhpcy4kdGFiVGl0bGVzLmZpbmQoYFtocmVmJD1cIiR7aWRTdHJ9XCJdYCkucGFyZW50KGAuJHt0aGlzLm9wdGlvbnMubGlua0NsYXNzfWApO1xuXG4gICAgdGhpcy5faGFuZGxlVGFiQ2hhbmdlKCR0YXJnZXQsIGhpc3RvcnlIYW5kbGVkKTtcbiAgfTtcbiAgLyoqXG4gICAqIFNldHMgdGhlIGhlaWdodCBvZiBlYWNoIHBhbmVsIHRvIHRoZSBoZWlnaHQgb2YgdGhlIHRhbGxlc3QgcGFuZWwuXG4gICAqIElmIGVuYWJsZWQgaW4gb3B0aW9ucywgZ2V0cyBjYWxsZWQgb24gbWVkaWEgcXVlcnkgY2hhbmdlLlxuICAgKiBJZiBsb2FkaW5nIGNvbnRlbnQgdmlhIGV4dGVybmFsIHNvdXJjZSwgY2FuIGJlIGNhbGxlZCBkaXJlY3RseSBvciB3aXRoIF9yZWZsb3cuXG4gICAqIElmIGVuYWJsZWQgd2l0aCBgZGF0YS1tYXRjaC1oZWlnaHQ9XCJ0cnVlXCJgLCB0YWJzIHNldHMgdG8gZXF1YWwgaGVpZ2h0XG4gICAqIEBmdW5jdGlvblxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX3NldEhlaWdodCgpIHtcbiAgICB2YXIgbWF4ID0gMCxcbiAgICAgICAgX3RoaXMgPSB0aGlzOyAvLyBMb2NrIGRvd24gdGhlIGB0aGlzYCB2YWx1ZSBmb3IgdGhlIHJvb3QgdGFicyBvYmplY3RcblxuICAgIHRoaXMuJHRhYkNvbnRlbnRcbiAgICAgIC5maW5kKGAuJHt0aGlzLm9wdGlvbnMucGFuZWxDbGFzc31gKVxuICAgICAgLmNzcygnaGVpZ2h0JywgJycpXG4gICAgICAuZWFjaChmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgcGFuZWwgPSAkKHRoaXMpLFxuICAgICAgICAgICAgaXNBY3RpdmUgPSBwYW5lbC5oYXNDbGFzcyhgJHtfdGhpcy5vcHRpb25zLnBhbmVsQWN0aXZlQ2xhc3N9YCk7IC8vIGdldCB0aGUgb3B0aW9ucyBmcm9tIHRoZSBwYXJlbnQgaW5zdGVhZCBvZiB0cnlpbmcgdG8gZ2V0IHRoZW0gZnJvbSB0aGUgY2hpbGRcblxuICAgICAgICBpZiAoIWlzQWN0aXZlKSB7XG4gICAgICAgICAgcGFuZWwuY3NzKHsndmlzaWJpbGl0eSc6ICdoaWRkZW4nLCAnZGlzcGxheSc6ICdibG9jayd9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB0ZW1wID0gdGhpcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQ7XG5cbiAgICAgICAgaWYgKCFpc0FjdGl2ZSkge1xuICAgICAgICAgIHBhbmVsLmNzcyh7XG4gICAgICAgICAgICAndmlzaWJpbGl0eSc6ICcnLFxuICAgICAgICAgICAgJ2Rpc3BsYXknOiAnJ1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgbWF4ID0gdGVtcCA+IG1heCA/IHRlbXAgOiBtYXg7XG4gICAgICB9KVxuICAgICAgLmNzcygnaGVpZ2h0JywgYCR7bWF4fXB4YCk7XG4gIH1cblxuICAvKipcbiAgICogRGVzdHJveXMgYW4gaW5zdGFuY2Ugb2YgYW4gdGFicy5cbiAgICogQGZpcmVzIFRhYnMjZGVzdHJveWVkXG4gICAqL1xuICBfZGVzdHJveSgpIHtcbiAgICB0aGlzLiRlbGVtZW50XG4gICAgICAuZmluZChgLiR7dGhpcy5vcHRpb25zLmxpbmtDbGFzc31gKVxuICAgICAgLm9mZignLnpmLnRhYnMnKS5oaWRlKCkuZW5kKClcbiAgICAgIC5maW5kKGAuJHt0aGlzLm9wdGlvbnMucGFuZWxDbGFzc31gKVxuICAgICAgLmhpZGUoKTtcblxuICAgIGlmICh0aGlzLm9wdGlvbnMubWF0Y2hIZWlnaHQpIHtcbiAgICAgIGlmICh0aGlzLl9zZXRIZWlnaHRNcUhhbmRsZXIgIT0gbnVsbCkge1xuICAgICAgICAgJCh3aW5kb3cpLm9mZignY2hhbmdlZC56Zi5tZWRpYXF1ZXJ5JywgdGhpcy5fc2V0SGVpZ2h0TXFIYW5kbGVyKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmRlZXBMaW5rKSB7XG4gICAgICAkKHdpbmRvdykub2ZmKCdwb3BzdGF0ZScsIHRoaXMuX2NoZWNrRGVlcExpbmspO1xuICAgIH1cblxuICB9XG59XG5cblRhYnMuZGVmYXVsdHMgPSB7XG4gIC8qKlxuICAgKiBBbGxvd3MgdGhlIHdpbmRvdyB0byBzY3JvbGwgdG8gY29udGVudCBvZiBwYW5lIHNwZWNpZmllZCBieSBoYXNoIGFuY2hvclxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgKi9cbiAgZGVlcExpbms6IGZhbHNlLFxuXG4gIC8qKlxuICAgKiBBZGp1c3QgdGhlIGRlZXAgbGluayBzY3JvbGwgdG8gbWFrZSBzdXJlIHRoZSB0b3Agb2YgdGhlIHRhYiBwYW5lbCBpcyB2aXNpYmxlXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBkZWZhdWx0IGZhbHNlXG4gICAqL1xuICBkZWVwTGlua1NtdWRnZTogZmFsc2UsXG5cbiAgLyoqXG4gICAqIEFuaW1hdGlvbiB0aW1lIChtcykgZm9yIHRoZSBkZWVwIGxpbmsgYWRqdXN0bWVudFxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtudW1iZXJ9XG4gICAqIEBkZWZhdWx0IDMwMFxuICAgKi9cbiAgZGVlcExpbmtTbXVkZ2VEZWxheTogMzAwLFxuXG4gIC8qKlxuICAgKiBVcGRhdGUgdGhlIGJyb3dzZXIgaGlzdG9yeSB3aXRoIHRoZSBvcGVuIHRhYlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgKi9cbiAgdXBkYXRlSGlzdG9yeTogZmFsc2UsXG5cbiAgLyoqXG4gICAqIEFsbG93cyB0aGUgd2luZG93IHRvIHNjcm9sbCB0byBjb250ZW50IG9mIGFjdGl2ZSBwYW5lIG9uIGxvYWQgaWYgc2V0IHRvIHRydWUuXG4gICAqIE5vdCByZWNvbW1lbmRlZCBpZiBtb3JlIHRoYW4gb25lIHRhYiBwYW5lbCBwZXIgcGFnZS5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQGRlZmF1bHQgZmFsc2VcbiAgICovXG4gIGF1dG9Gb2N1czogZmFsc2UsXG5cbiAgLyoqXG4gICAqIEFsbG93cyBrZXlib2FyZCBpbnB1dCB0byAnd3JhcCcgYXJvdW5kIHRoZSB0YWIgbGlua3MuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBkZWZhdWx0IHRydWVcbiAgICovXG4gIHdyYXBPbktleXM6IHRydWUsXG5cbiAgLyoqXG4gICAqIEFsbG93cyB0aGUgdGFiIGNvbnRlbnQgcGFuZXMgdG8gbWF0Y2ggaGVpZ2h0cyBpZiBzZXQgdG8gdHJ1ZS5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQGRlZmF1bHQgZmFsc2VcbiAgICovXG4gIG1hdGNoSGVpZ2h0OiBmYWxzZSxcblxuICAvKipcbiAgICogQWxsb3dzIGFjdGl2ZSB0YWJzIHRvIGNvbGxhcHNlIHdoZW4gY2xpY2tlZC5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQGRlZmF1bHQgZmFsc2VcbiAgICovXG4gIGFjdGl2ZUNvbGxhcHNlOiBmYWxzZSxcblxuICAvKipcbiAgICogQ2xhc3MgYXBwbGllZCB0byBgbGlgJ3MgaW4gdGFiIGxpbmsgbGlzdC5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKiBAZGVmYXVsdCAndGFicy10aXRsZSdcbiAgICovXG4gIGxpbmtDbGFzczogJ3RhYnMtdGl0bGUnLFxuXG4gIC8qKlxuICAgKiBDbGFzcyBhcHBsaWVkIHRvIHRoZSBhY3RpdmUgYGxpYCBpbiB0YWIgbGluayBsaXN0LlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqIEBkZWZhdWx0ICdpcy1hY3RpdmUnXG4gICAqL1xuICBsaW5rQWN0aXZlQ2xhc3M6ICdpcy1hY3RpdmUnLFxuXG4gIC8qKlxuICAgKiBDbGFzcyBhcHBsaWVkIHRvIHRoZSBjb250ZW50IGNvbnRhaW5lcnMuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge3N0cmluZ31cbiAgICogQGRlZmF1bHQgJ3RhYnMtcGFuZWwnXG4gICAqL1xuICBwYW5lbENsYXNzOiAndGFicy1wYW5lbCcsXG5cbiAgLyoqXG4gICAqIENsYXNzIGFwcGxpZWQgdG8gdGhlIGFjdGl2ZSBjb250ZW50IGNvbnRhaW5lci5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKiBAZGVmYXVsdCAnaXMtYWN0aXZlJ1xuICAgKi9cbiAgcGFuZWxBY3RpdmVDbGFzczogJ2lzLWFjdGl2ZSdcbn07XG5cbmV4cG9ydCB7VGFic307XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLnRhYnMuanMiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5cbi8qKlxuICogUnVucyBhIGNhbGxiYWNrIGZ1bmN0aW9uIHdoZW4gaW1hZ2VzIGFyZSBmdWxseSBsb2FkZWQuXG4gKiBAcGFyYW0ge09iamVjdH0gaW1hZ2VzIC0gSW1hZ2UocykgdG8gY2hlY2sgaWYgbG9hZGVkLlxuICogQHBhcmFtIHtGdW5jfSBjYWxsYmFjayAtIEZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiBpbWFnZSBpcyBmdWxseSBsb2FkZWQuXG4gKi9cbmZ1bmN0aW9uIG9uSW1hZ2VzTG9hZGVkKGltYWdlcywgY2FsbGJhY2spe1xuICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICB1bmxvYWRlZCA9IGltYWdlcy5sZW5ndGg7XG5cbiAgaWYgKHVubG9hZGVkID09PSAwKSB7XG4gICAgY2FsbGJhY2soKTtcbiAgfVxuXG4gIGltYWdlcy5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgLy8gQ2hlY2sgaWYgaW1hZ2UgaXMgbG9hZGVkXG4gICAgaWYgKHRoaXMuY29tcGxldGUgJiYgdGhpcy5uYXR1cmFsV2lkdGggIT09IHVuZGVmaW5lZCkge1xuICAgICAgc2luZ2xlSW1hZ2VMb2FkZWQoKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAvLyBJZiB0aGUgYWJvdmUgY2hlY2sgZmFpbGVkLCBzaW11bGF0ZSBsb2FkaW5nIG9uIGRldGFjaGVkIGVsZW1lbnQuXG4gICAgICB2YXIgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICAgIC8vIFN0aWxsIGNvdW50IGltYWdlIGFzIGxvYWRlZCBpZiBpdCBmaW5hbGl6ZXMgd2l0aCBhbiBlcnJvci5cbiAgICAgIHZhciBldmVudHMgPSBcImxvYWQuemYuaW1hZ2VzIGVycm9yLnpmLmltYWdlc1wiO1xuICAgICAgJChpbWFnZSkub25lKGV2ZW50cywgZnVuY3Rpb24gbWUoZXZlbnQpe1xuICAgICAgICAvLyBVbmJpbmQgdGhlIGV2ZW50IGxpc3RlbmVycy4gV2UncmUgdXNpbmcgJ29uZScgYnV0IG9ubHkgb25lIG9mIHRoZSB0d28gZXZlbnRzIHdpbGwgaGF2ZSBmaXJlZC5cbiAgICAgICAgJCh0aGlzKS5vZmYoZXZlbnRzLCBtZSk7XG4gICAgICAgIHNpbmdsZUltYWdlTG9hZGVkKCk7XG4gICAgICB9KTtcbiAgICAgIGltYWdlLnNyYyA9ICQodGhpcykuYXR0cignc3JjJyk7XG4gICAgfVxuICB9KTtcblxuICBmdW5jdGlvbiBzaW5nbGVJbWFnZUxvYWRlZCgpIHtcbiAgICB1bmxvYWRlZC0tO1xuICAgIGlmICh1bmxvYWRlZCA9PT0gMCkge1xuICAgICAgY2FsbGJhY2soKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IHsgb25JbWFnZXNMb2FkZWQgfTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24udXRpbC5pbWFnZUxvYWRlci5qcyJdLCJzb3VyY2VSb290IjoiIn0=