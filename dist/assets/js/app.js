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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNjk4MDQzZjc3NzJiNjNlYTU0NDgiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwialF1ZXJ5XCIiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi51dGlsLmNvcmUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi51dGlsLm1lZGlhUXVlcnkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi51dGlsLmtleWJvYXJkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24udXRpbC50cmlnZ2Vycy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLnBsdWdpbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2pzL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2hhdC1pbnB1dC9kaXN0L3doYXQtaW5wdXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9qcy9saWIvZm91bmRhdGlvbi1leHBsaWNpdC1waWVjZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi5jb3JlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24udXRpbC5tb3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi5vZmZjYW52YXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi50YWJzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24udXRpbC5pbWFnZUxvYWRlci5qcyJdLCJuYW1lcyI6WyJydGwiLCJhdHRyIiwiR2V0WW9EaWdpdHMiLCJsZW5ndGgiLCJuYW1lc3BhY2UiLCJNYXRoIiwicm91bmQiLCJwb3ciLCJyYW5kb20iLCJ0b1N0cmluZyIsInNsaWNlIiwidHJhbnNpdGlvbmVuZCIsIiRlbGVtIiwidHJhbnNpdGlvbnMiLCJlbGVtIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiZW5kIiwidCIsInN0eWxlIiwic2V0VGltZW91dCIsInRyaWdnZXJIYW5kbGVyIiwiZGVmYXVsdFF1ZXJpZXMiLCJsYW5kc2NhcGUiLCJwb3J0cmFpdCIsInJldGluYSIsIm1hdGNoTWVkaWEiLCJ3aW5kb3ciLCJzdHlsZU1lZGlhIiwibWVkaWEiLCJzY3JpcHQiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsImluZm8iLCJ0eXBlIiwiaWQiLCJwYXJlbnROb2RlIiwiaW5zZXJ0QmVmb3JlIiwiZ2V0Q29tcHV0ZWRTdHlsZSIsImN1cnJlbnRTdHlsZSIsIm1hdGNoTWVkaXVtIiwidGV4dCIsInN0eWxlU2hlZXQiLCJjc3NUZXh0IiwidGV4dENvbnRlbnQiLCJ3aWR0aCIsIm1hdGNoZXMiLCJNZWRpYVF1ZXJ5IiwicXVlcmllcyIsImN1cnJlbnQiLCJfaW5pdCIsInNlbGYiLCIkbWV0YSIsImFwcGVuZFRvIiwiaGVhZCIsImV4dHJhY3RlZFN0eWxlcyIsImNzcyIsIm5hbWVkUXVlcmllcyIsInBhcnNlU3R5bGVUb09iamVjdCIsImtleSIsImhhc093blByb3BlcnR5IiwicHVzaCIsIm5hbWUiLCJ2YWx1ZSIsIl9nZXRDdXJyZW50U2l6ZSIsIl93YXRjaGVyIiwiYXRMZWFzdCIsInNpemUiLCJxdWVyeSIsImdldCIsImlzIiwidHJpbSIsInNwbGl0IiwiaSIsIm1hdGNoZWQiLCJvZmYiLCJvbiIsIm5ld1NpemUiLCJjdXJyZW50U2l6ZSIsInRyaWdnZXIiLCJzdHIiLCJzdHlsZU9iamVjdCIsInJlZHVjZSIsInJldCIsInBhcmFtIiwicGFydHMiLCJyZXBsYWNlIiwidmFsIiwiZGVjb2RlVVJJQ29tcG9uZW50IiwidW5kZWZpbmVkIiwiQXJyYXkiLCJpc0FycmF5Iiwia2V5Q29kZXMiLCJjb21tYW5kcyIsImZpbmRGb2N1c2FibGUiLCIkZWxlbWVudCIsImZpbmQiLCJmaWx0ZXIiLCJwYXJzZUtleSIsImV2ZW50Iiwid2hpY2giLCJrZXlDb2RlIiwiU3RyaW5nIiwiZnJvbUNoYXJDb2RlIiwidG9VcHBlckNhc2UiLCJzaGlmdEtleSIsImN0cmxLZXkiLCJhbHRLZXkiLCJLZXlib2FyZCIsImtleXMiLCJnZXRLZXlDb2RlcyIsImhhbmRsZUtleSIsImNvbXBvbmVudCIsImZ1bmN0aW9ucyIsImNvbW1hbmRMaXN0IiwiY21kcyIsImNvbW1hbmQiLCJmbiIsImNvbnNvbGUiLCJ3YXJuIiwibHRyIiwiJCIsImV4dGVuZCIsInJldHVyblZhbHVlIiwiYXBwbHkiLCJoYW5kbGVkIiwidW5oYW5kbGVkIiwicmVnaXN0ZXIiLCJjb21wb25lbnROYW1lIiwidHJhcEZvY3VzIiwiJGZvY3VzYWJsZSIsIiRmaXJzdEZvY3VzYWJsZSIsImVxIiwiJGxhc3RGb2N1c2FibGUiLCJ0YXJnZXQiLCJwcmV2ZW50RGVmYXVsdCIsImZvY3VzIiwicmVsZWFzZUZvY3VzIiwia2NzIiwiayIsImtjIiwiTXV0YXRpb25PYnNlcnZlciIsInByZWZpeGVzIiwidHJpZ2dlcnMiLCJlbCIsImRhdGEiLCJmb3JFYWNoIiwiVHJpZ2dlcnMiLCJMaXN0ZW5lcnMiLCJCYXNpYyIsIkdsb2JhbCIsIkluaXRpYWxpemVycyIsIm9wZW5MaXN0ZW5lciIsImNsb3NlTGlzdGVuZXIiLCJ0b2dnbGVMaXN0ZW5lciIsImNsb3NlYWJsZUxpc3RlbmVyIiwiZSIsInN0b3BQcm9wYWdhdGlvbiIsImFuaW1hdGlvbiIsIk1vdGlvbiIsImFuaW1hdGVPdXQiLCJmYWRlT3V0IiwidG9nZ2xlRm9jdXNMaXN0ZW5lciIsImFkZE9wZW5MaXN0ZW5lciIsImFkZENsb3NlTGlzdGVuZXIiLCJhZGRUb2dnbGVMaXN0ZW5lciIsImFkZENsb3NlYWJsZUxpc3RlbmVyIiwiYWRkVG9nZ2xlRm9jdXNMaXN0ZW5lciIsInJlc2l6ZUxpc3RlbmVyIiwiJG5vZGVzIiwiZWFjaCIsInNjcm9sbExpc3RlbmVyIiwiY2xvc2VNZUxpc3RlbmVyIiwicGx1Z2luSWQiLCJwbHVnaW4iLCJwbHVnaW5zIiwibm90IiwiX3RoaXMiLCJhZGRDbG9zZW1lTGlzdGVuZXIiLCJwbHVnaW5OYW1lIiwieWV0aUJveGVzIiwicGx1Z05hbWVzIiwiY29uY2F0IiwiZXJyb3IiLCJsaXN0ZW5lcnMiLCJtYXAiLCJqb2luIiwiZGVib3VuY2VHbG9iYWxMaXN0ZW5lciIsImRlYm91bmNlIiwibGlzdGVuZXIiLCJ0aW1lciIsImFyZ3MiLCJwcm90b3R5cGUiLCJjYWxsIiwiYXJndW1lbnRzIiwiY2xlYXJUaW1lb3V0IiwiYWRkUmVzaXplTGlzdGVuZXIiLCJhZGRTY3JvbGxMaXN0ZW5lciIsImFkZE11dGF0aW9uRXZlbnRzTGlzdGVuZXIiLCJsaXN0ZW5pbmdFbGVtZW50c011dGF0aW9uIiwibXV0YXRpb25SZWNvcmRzTGlzdCIsIiR0YXJnZXQiLCJhdHRyaWJ1dGVOYW1lIiwicGFnZVlPZmZzZXQiLCJjbG9zZXN0IiwiZWxlbWVudE9ic2VydmVyIiwib2JzZXJ2ZSIsImF0dHJpYnV0ZXMiLCJjaGlsZExpc3QiLCJjaGFyYWN0ZXJEYXRhIiwic3VidHJlZSIsImF0dHJpYnV0ZUZpbHRlciIsImFkZFNpbXBsZUxpc3RlbmVycyIsIiRkb2N1bWVudCIsImFkZEdsb2JhbExpc3RlbmVycyIsImluaXQiLCJGb3VuZGF0aW9uIiwidHJpZ2dlcnNJbml0aWFsaXplZCIsInJlYWR5U3RhdGUiLCJJSGVhcllvdSIsIlBsdWdpbiIsImVsZW1lbnQiLCJvcHRpb25zIiwiX3NldHVwIiwiZ2V0UGx1Z2luTmFtZSIsInV1aWQiLCJfZGVzdHJveSIsInJlbW92ZUF0dHIiLCJyZW1vdmVEYXRhIiwicHJvcCIsImh5cGhlbmF0ZSIsInRvTG93ZXJDYXNlIiwib2JqIiwiY29uc3RydWN0b3IiLCJjbGFzc05hbWUiLCJmb3VuZGF0aW9uIiwiYWRkQ2xhc3MiLCJ0YWJfaWQiLCJyZW1vdmVDbGFzcyIsImhpZGUiLCJmYWRlSW4iLCJjbGljayIsImdldFNjcmlwdCIsInRleHRTdGF0dXMiLCJqcXhociIsInRlc3RpbW9uaWFsX2NhdCIsImFjdGlvbiIsInRlc3RpbW9uaWFsQ2F0IiwicG9zdCIsImJhX2FqYXgiLCJyZXNwb25zZSIsImh0bWwiLCJ0b3AiLCJvZmZzZXQiLCJhbmltYXRlIiwic2Nyb2xsVG9wIiwiZmFuY3lib3giLCJ0b3VjaCIsImFkZFRvSnF1ZXJ5IiwiT2ZmQ2FudmFzIiwiVGFicyIsIm1vZHVsZSIsImV4cG9ydHMiLCJGT1VOREFUSU9OX1ZFUlNJT04iLCJ2ZXJzaW9uIiwiX3BsdWdpbnMiLCJfdXVpZHMiLCJmdW5jdGlvbk5hbWUiLCJhdHRyTmFtZSIsInJlZ2lzdGVyUGx1Z2luIiwidW5yZWdpc3RlclBsdWdpbiIsInNwbGljZSIsImluZGV4T2YiLCJyZUluaXQiLCJpc0pRIiwiZm5zIiwicGxncyIsInAiLCJPYmplY3QiLCJlcnIiLCJyZWZsb3ciLCJhZGRCYWNrIiwiJGVsIiwib3B0cyIsInRoaW5nIiwib3B0IiwicGFyc2VWYWx1ZSIsImVyIiwiZ2V0Rm5OYW1lIiwibWV0aG9kIiwiJG5vSlMiLCJwbHVnQ2xhc3MiLCJSZWZlcmVuY2VFcnJvciIsIlR5cGVFcnJvciIsInV0aWwiLCJ0aHJvdHRsZSIsImZ1bmMiLCJkZWxheSIsImNvbnRleHQiLCJEYXRlIiwibm93IiwiZ2V0VGltZSIsInZlbmRvcnMiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJ2cCIsImNhbmNlbEFuaW1hdGlvbkZyYW1lIiwidGVzdCIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsImxhc3RUaW1lIiwiY2FsbGJhY2siLCJuZXh0VGltZSIsIm1heCIsInBlcmZvcm1hbmNlIiwic3RhcnQiLCJGdW5jdGlvbiIsImJpbmQiLCJvVGhpcyIsImFBcmdzIiwiZlRvQmluZCIsImZOT1AiLCJmQm91bmQiLCJmdW5jTmFtZVJlZ2V4IiwicmVzdWx0cyIsImV4ZWMiLCJpc05hTiIsInBhcnNlRmxvYXQiLCJpbml0Q2xhc3NlcyIsImFjdGl2ZUNsYXNzZXMiLCJhbmltYXRlSW4iLCJjYiIsIk1vdmUiLCJkdXJhdGlvbiIsImFuaW0iLCJwcm9nIiwibW92ZSIsInRzIiwiaXNJbiIsImluaXRDbGFzcyIsImFjdGl2ZUNsYXNzIiwicmVzZXQiLCJzaG93Iiwib2Zmc2V0V2lkdGgiLCJvbmUiLCJmaW5pc2giLCJ0cmFuc2l0aW9uRHVyYXRpb24iLCJkZWZhdWx0cyIsImNvbnRlbnRDbGFzc2VzIiwiYmFzZSIsInJldmVhbCIsIiRsYXN0VHJpZ2dlciIsIiR0cmlnZ2VycyIsInBvc2l0aW9uIiwiJGNvbnRlbnQiLCJuZXN0ZWQiLCJpbmRleCIsIl9ldmVudHMiLCJjb250ZW50SWQiLCJzaWJsaW5ncyIsImZpcnN0IiwidHJhbnNpdGlvbiIsIm1hdGNoIiwiY29udGVudE92ZXJsYXkiLCJvdmVybGF5Iiwib3ZlcmxheVBvc2l0aW9uIiwic2V0QXR0cmlidXRlIiwiJG92ZXJsYXkiLCJpbnNlcnRBZnRlciIsImFwcGVuZCIsImlzUmV2ZWFsZWQiLCJSZWdFeHAiLCJyZXZlYWxDbGFzcyIsInJldmVhbE9uIiwiX3NldE1RQ2hlY2tlciIsInRyYW5zaXRpb25UaW1lIiwiX3JlbW92ZUNvbnRlbnRDbGFzc2VzIiwib3BlbiIsImNsb3NlIiwidG9nZ2xlIiwiX2hhbmRsZUtleWJvYXJkIiwiY2xvc2VPbkNsaWNrIiwiaGFzUmV2ZWFsIiwiX2FkZENvbnRlbnRDbGFzc2VzIiwic2Nyb2xsSGVpZ2h0IiwiY2xpZW50SGVpZ2h0IiwiYWxsb3dVcCIsImFsbG93RG93biIsImxhc3RZIiwib3JpZ2luYWxFdmVudCIsInBhZ2VZIiwidXAiLCJkb3duIiwiaGFzQ2xhc3MiLCJmb3JjZVRvIiwic2Nyb2xsVG8iLCJib2R5IiwiY29udGVudFNjcm9sbCIsIl9zdG9wU2Nyb2xsaW5nIiwiX3JlY29yZFNjcm9sbGFibGUiLCJfc3RvcFNjcm9sbFByb3BhZ2F0aW9uIiwiYXV0b0ZvY3VzIiwiY2FudmFzRm9jdXMiLCIkdGFiVGl0bGVzIiwibGlua0NsYXNzIiwiJHRhYkNvbnRlbnQiLCIkbGluayIsImlzQWN0aXZlIiwibGlua0FjdGl2ZUNsYXNzIiwiaGFzaCIsImxpbmtJZCIsImxvYWQiLCJkZWVwTGlua1NtdWRnZURlbGF5IiwibWF0Y2hIZWlnaHQiLCIkaW1hZ2VzIiwiX3NldEhlaWdodCIsIl9jaGVja0RlZXBMaW5rIiwiYW5jaG9yIiwibG9jYXRpb24iLCJzZWxlY3RUYWIiLCJkZWVwTGlua1NtdWRnZSIsImRlZXBMaW5rIiwiX2FkZEtleUhhbmRsZXIiLCJfYWRkQ2xpY2tIYW5kbGVyIiwiX3NldEhlaWdodE1xSGFuZGxlciIsIl9oYW5kbGVUYWJDaGFuZ2UiLCIkZWxlbWVudHMiLCJwYXJlbnQiLCJjaGlsZHJlbiIsIiRwcmV2RWxlbWVudCIsIiRuZXh0RWxlbWVudCIsIndyYXBPbktleXMiLCJsYXN0IiwibWluIiwicHJldmlvdXMiLCJuZXh0IiwiaGlzdG9yeUhhbmRsZWQiLCJhY3RpdmVDb2xsYXBzZSIsIl9jb2xsYXBzZVRhYiIsIiRvbGRUYWIiLCIkdGFiTGluayIsIiR0YXJnZXRDb250ZW50IiwiX29wZW5UYWIiLCJ1cGRhdGVIaXN0b3J5IiwiaGlzdG9yeSIsInB1c2hTdGF0ZSIsInJlcGxhY2VTdGF0ZSIsInBhbmVsQWN0aXZlQ2xhc3MiLCIkdGFyZ2V0X2FuY2hvciIsImlkU3RyIiwicGFuZWxDbGFzcyIsInBhbmVsIiwidGVtcCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImhlaWdodCIsIm9uSW1hZ2VzTG9hZGVkIiwiaW1hZ2VzIiwidW5sb2FkZWQiLCJjb21wbGV0ZSIsIm5hdHVyYWxXaWR0aCIsInNpbmdsZUltYWdlTG9hZGVkIiwiaW1hZ2UiLCJJbWFnZSIsImV2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QUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLHdDQUF3QztBQUN4QztBQUNBO0FBQ0E7QUFDQSxNQUFNOztBQUVOO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0MsZ0JBQWdCOztBQUV0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0EsK0NBQStDLFNBQVM7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsK0NBQStDLFNBQVM7QUFD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QUdBLE1BQUlvYyxhQUFhLENBQWpCLEVBQW9CO0FBQ2xCbEo7QUFDRDs7QUFFRGlKLFNBQU83UixJQUFQLENBQVksWUFBVTtBQUNwQjtBQUNBLFFBQUksS0FBSytSLFFBQUwsSUFBaUIsS0FBS0MsWUFBTCxLQUFzQmpYLFNBQTNDLEVBQXNEO0FBQ3BEa1g7QUFDRCxLQUZELE1BR0s7QUFDSDtBQUNBLFVBQUlDLFFBQVEsSUFBSUMsS0FBSixFQUFaO0FBQ0E7QUFDQSxVQUFJQyxTQUFTLGdDQUFiO0FBQ0EsNEJBQUVGLEtBQUYsRUFBU3JILEdBQVQsQ0FBYXVILE1BQWIsRUFBcUIsU0FBU0MsRUFBVCxDQUFZNVcsS0FBWixFQUFrQjtBQUNyQztBQUNBLDhCQUFFLElBQUYsRUFBUXhCLEdBQVIsQ0FBWW1ZLE1BQVosRUFBb0JDLEVBQXBCO0FBQ0FKO0FBQ0QsT0FKRDtBQUtBQyxZQUFNSSxHQUFOLEdBQVksc0JBQUUsSUFBRixFQUFROWMsSUFBUixDQUFhLEtBQWIsQ0FBWjtBQUNEO0FBQ0YsR0FqQkQ7O0FBbUJBLFdBQVN5YyxpQkFBVCxHQUE2QjtBQUMzQkg7QUFDQSxRQUFJQSxhQUFhLENBQWpCLEVBQW9CO0FBQ2xCbEo7QUFDRDtBQUNGO0FBQ0Y7O1FBRVFnSixjLEdBQUFBLGMiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNjk4MDQzZjc3NzJiNjNlYTU0NDgiLCJtb2R1bGUuZXhwb3J0cyA9IGpRdWVyeTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImpRdWVyeVwiXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuXG4vLyBDb3JlIEZvdW5kYXRpb24gVXRpbGl0aWVzLCB1dGlsaXplZCBpbiBhIG51bWJlciBvZiBwbGFjZXMuXG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBib29sZWFuIGZvciBSVEwgc3VwcG9ydFxuICAgKi9cbmZ1bmN0aW9uIHJ0bCgpIHtcbiAgcmV0dXJuICQoJ2h0bWwnKS5hdHRyKCdkaXInKSA9PT0gJ3J0bCc7XG59XG5cbi8qKlxuICogcmV0dXJucyBhIHJhbmRvbSBiYXNlLTM2IHVpZCB3aXRoIG5hbWVzcGFjaW5nXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7TnVtYmVyfSBsZW5ndGggLSBudW1iZXIgb2YgcmFuZG9tIGJhc2UtMzYgZGlnaXRzIGRlc2lyZWQuIEluY3JlYXNlIGZvciBtb3JlIHJhbmRvbSBzdHJpbmdzLlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVzcGFjZSAtIG5hbWUgb2YgcGx1Z2luIHRvIGJlIGluY29ycG9yYXRlZCBpbiB1aWQsIG9wdGlvbmFsLlxuICogQGRlZmF1bHQge1N0cmluZ30gJycgLSBpZiBubyBwbHVnaW4gbmFtZSBpcyBwcm92aWRlZCwgbm90aGluZyBpcyBhcHBlbmRlZCB0byB0aGUgdWlkLlxuICogQHJldHVybnMge1N0cmluZ30gLSB1bmlxdWUgaWRcbiAqL1xuZnVuY3Rpb24gR2V0WW9EaWdpdHMobGVuZ3RoLCBuYW1lc3BhY2Upe1xuICBsZW5ndGggPSBsZW5ndGggfHwgNjtcbiAgcmV0dXJuIE1hdGgucm91bmQoKE1hdGgucG93KDM2LCBsZW5ndGggKyAxKSAtIE1hdGgucmFuZG9tKCkgKiBNYXRoLnBvdygzNiwgbGVuZ3RoKSkpLnRvU3RyaW5nKDM2KS5zbGljZSgxKSArIChuYW1lc3BhY2UgPyBgLSR7bmFtZXNwYWNlfWAgOiAnJyk7XG59XG5cbmZ1bmN0aW9uIHRyYW5zaXRpb25lbmQoJGVsZW0pe1xuICB2YXIgdHJhbnNpdGlvbnMgPSB7XG4gICAgJ3RyYW5zaXRpb24nOiAndHJhbnNpdGlvbmVuZCcsXG4gICAgJ1dlYmtpdFRyYW5zaXRpb24nOiAnd2Via2l0VHJhbnNpdGlvbkVuZCcsXG4gICAgJ01velRyYW5zaXRpb24nOiAndHJhbnNpdGlvbmVuZCcsXG4gICAgJ09UcmFuc2l0aW9uJzogJ290cmFuc2l0aW9uZW5kJ1xuICB9O1xuICB2YXIgZWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxuICAgICAgZW5kO1xuXG4gIGZvciAodmFyIHQgaW4gdHJhbnNpdGlvbnMpe1xuICAgIGlmICh0eXBlb2YgZWxlbS5zdHlsZVt0XSAhPT0gJ3VuZGVmaW5lZCcpe1xuICAgICAgZW5kID0gdHJhbnNpdGlvbnNbdF07XG4gICAgfVxuICB9XG4gIGlmKGVuZCl7XG4gICAgcmV0dXJuIGVuZDtcbiAgfWVsc2V7XG4gICAgZW5kID0gc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgJGVsZW0udHJpZ2dlckhhbmRsZXIoJ3RyYW5zaXRpb25lbmQnLCBbJGVsZW1dKTtcbiAgICB9LCAxKTtcbiAgICByZXR1cm4gJ3RyYW5zaXRpb25lbmQnO1xuICB9XG59XG5cbmV4cG9ydCB7cnRsLCBHZXRZb0RpZ2l0cywgdHJhbnNpdGlvbmVuZH07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLnV0aWwuY29yZS5qcyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcblxuLy8gRGVmYXVsdCBzZXQgb2YgbWVkaWEgcXVlcmllc1xuY29uc3QgZGVmYXVsdFF1ZXJpZXMgPSB7XG4gICdkZWZhdWx0JyA6ICdvbmx5IHNjcmVlbicsXG4gIGxhbmRzY2FwZSA6ICdvbmx5IHNjcmVlbiBhbmQgKG9yaWVudGF0aW9uOiBsYW5kc2NhcGUpJyxcbiAgcG9ydHJhaXQgOiAnb25seSBzY3JlZW4gYW5kIChvcmllbnRhdGlvbjogcG9ydHJhaXQpJyxcbiAgcmV0aW5hIDogJ29ubHkgc2NyZWVuIGFuZCAoLXdlYmtpdC1taW4tZGV2aWNlLXBpeGVsLXJhdGlvOiAyKSwnICtcbiAgICAnb25seSBzY3JlZW4gYW5kIChtaW4tLW1vei1kZXZpY2UtcGl4ZWwtcmF0aW86IDIpLCcgK1xuICAgICdvbmx5IHNjcmVlbiBhbmQgKC1vLW1pbi1kZXZpY2UtcGl4ZWwtcmF0aW86IDIvMSksJyArXG4gICAgJ29ubHkgc2NyZWVuIGFuZCAobWluLWRldmljZS1waXhlbC1yYXRpbzogMiksJyArXG4gICAgJ29ubHkgc2NyZWVuIGFuZCAobWluLXJlc29sdXRpb246IDE5MmRwaSksJyArXG4gICAgJ29ubHkgc2NyZWVuIGFuZCAobWluLXJlc29sdXRpb246IDJkcHB4KSdcbiAgfTtcblxuXG4vLyBtYXRjaE1lZGlhKCkgcG9seWZpbGwgLSBUZXN0IGEgQ1NTIG1lZGlhIHR5cGUvcXVlcnkgaW4gSlMuXG4vLyBBdXRob3JzICYgY29weXJpZ2h0IChjKSAyMDEyOiBTY290dCBKZWhsLCBQYXVsIElyaXNoLCBOaWNob2xhcyBaYWthcywgRGF2aWQgS25pZ2h0LiBEdWFsIE1JVC9CU0QgbGljZW5zZVxubGV0IG1hdGNoTWVkaWEgPSB3aW5kb3cubWF0Y2hNZWRpYSB8fCAoZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICAvLyBGb3IgYnJvd3NlcnMgdGhhdCBzdXBwb3J0IG1hdGNoTWVkaXVtIGFwaSBzdWNoIGFzIElFIDkgYW5kIHdlYmtpdFxuICB2YXIgc3R5bGVNZWRpYSA9ICh3aW5kb3cuc3R5bGVNZWRpYSB8fCB3aW5kb3cubWVkaWEpO1xuXG4gIC8vIEZvciB0aG9zZSB0aGF0IGRvbid0IHN1cHBvcnQgbWF0Y2hNZWRpdW1cbiAgaWYgKCFzdHlsZU1lZGlhKSB7XG4gICAgdmFyIHN0eWxlICAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpLFxuICAgIHNjcmlwdCAgICAgID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NjcmlwdCcpWzBdLFxuICAgIGluZm8gICAgICAgID0gbnVsbDtcblxuICAgIHN0eWxlLnR5cGUgID0gJ3RleHQvY3NzJztcbiAgICBzdHlsZS5pZCAgICA9ICdtYXRjaG1lZGlhanMtdGVzdCc7XG5cbiAgICBzY3JpcHQgJiYgc2NyaXB0LnBhcmVudE5vZGUgJiYgc2NyaXB0LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHN0eWxlLCBzY3JpcHQpO1xuXG4gICAgLy8gJ3N0eWxlLmN1cnJlbnRTdHlsZScgaXMgdXNlZCBieSBJRSA8PSA4IGFuZCAnd2luZG93LmdldENvbXB1dGVkU3R5bGUnIGZvciBhbGwgb3RoZXIgYnJvd3NlcnNcbiAgICBpbmZvID0gKCdnZXRDb21wdXRlZFN0eWxlJyBpbiB3aW5kb3cpICYmIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHN0eWxlLCBudWxsKSB8fCBzdHlsZS5jdXJyZW50U3R5bGU7XG5cbiAgICBzdHlsZU1lZGlhID0ge1xuICAgICAgbWF0Y2hNZWRpdW0obWVkaWEpIHtcbiAgICAgICAgdmFyIHRleHQgPSBgQG1lZGlhICR7bWVkaWF9eyAjbWF0Y2htZWRpYWpzLXRlc3QgeyB3aWR0aDogMXB4OyB9IH1gO1xuXG4gICAgICAgIC8vICdzdHlsZS5zdHlsZVNoZWV0JyBpcyB1c2VkIGJ5IElFIDw9IDggYW5kICdzdHlsZS50ZXh0Q29udGVudCcgZm9yIGFsbCBvdGhlciBicm93c2Vyc1xuICAgICAgICBpZiAoc3R5bGUuc3R5bGVTaGVldCkge1xuICAgICAgICAgIHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IHRleHQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3R5bGUudGV4dENvbnRlbnQgPSB0ZXh0O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVGVzdCBpZiBtZWRpYSBxdWVyeSBpcyB0cnVlIG9yIGZhbHNlXG4gICAgICAgIHJldHVybiBpbmZvLndpZHRoID09PSAnMXB4JztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24obWVkaWEpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbWF0Y2hlczogc3R5bGVNZWRpYS5tYXRjaE1lZGl1bShtZWRpYSB8fCAnYWxsJyksXG4gICAgICBtZWRpYTogbWVkaWEgfHwgJ2FsbCdcbiAgICB9O1xuICB9XG59KSgpO1xuXG52YXIgTWVkaWFRdWVyeSA9IHtcbiAgcXVlcmllczogW10sXG5cbiAgY3VycmVudDogJycsXG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemVzIHRoZSBtZWRpYSBxdWVyeSBoZWxwZXIsIGJ5IGV4dHJhY3RpbmcgdGhlIGJyZWFrcG9pbnQgbGlzdCBmcm9tIHRoZSBDU1MgYW5kIGFjdGl2YXRpbmcgdGhlIGJyZWFrcG9pbnQgd2F0Y2hlci5cbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfaW5pdCgpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdmFyICRtZXRhID0gJCgnbWV0YS5mb3VuZGF0aW9uLW1xJyk7XG4gICAgaWYoISRtZXRhLmxlbmd0aCl7XG4gICAgICAkKCc8bWV0YSBjbGFzcz1cImZvdW5kYXRpb24tbXFcIj4nKS5hcHBlbmRUbyhkb2N1bWVudC5oZWFkKTtcbiAgICB9XG5cbiAgICB2YXIgZXh0cmFjdGVkU3R5bGVzID0gJCgnLmZvdW5kYXRpb24tbXEnKS5jc3MoJ2ZvbnQtZmFtaWx5Jyk7XG4gICAgdmFyIG5hbWVkUXVlcmllcztcblxuICAgIG5hbWVkUXVlcmllcyA9IHBhcnNlU3R5bGVUb09iamVjdChleHRyYWN0ZWRTdHlsZXMpO1xuXG4gICAgZm9yICh2YXIga2V5IGluIG5hbWVkUXVlcmllcykge1xuICAgICAgaWYobmFtZWRRdWVyaWVzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgc2VsZi5xdWVyaWVzLnB1c2goe1xuICAgICAgICAgIG5hbWU6IGtleSxcbiAgICAgICAgICB2YWx1ZTogYG9ubHkgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAke25hbWVkUXVlcmllc1trZXldfSlgXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuY3VycmVudCA9IHRoaXMuX2dldEN1cnJlbnRTaXplKCk7XG5cbiAgICB0aGlzLl93YXRjaGVyKCk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiB0aGUgc2NyZWVuIGlzIGF0IGxlYXN0IGFzIHdpZGUgYXMgYSBicmVha3BvaW50LlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHBhcmFtIHtTdHJpbmd9IHNpemUgLSBOYW1lIG9mIHRoZSBicmVha3BvaW50IHRvIGNoZWNrLlxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gYHRydWVgIGlmIHRoZSBicmVha3BvaW50IG1hdGNoZXMsIGBmYWxzZWAgaWYgaXQncyBzbWFsbGVyLlxuICAgKi9cbiAgYXRMZWFzdChzaXplKSB7XG4gICAgdmFyIHF1ZXJ5ID0gdGhpcy5nZXQoc2l6ZSk7XG5cbiAgICBpZiAocXVlcnkpIHtcbiAgICAgIHJldHVybiBtYXRjaE1lZGlhKHF1ZXJ5KS5tYXRjaGVzO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfSxcblxuICAvKipcbiAgICogQ2hlY2tzIGlmIHRoZSBzY3JlZW4gbWF0Y2hlcyB0byBhIGJyZWFrcG9pbnQuXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcGFyYW0ge1N0cmluZ30gc2l6ZSAtIE5hbWUgb2YgdGhlIGJyZWFrcG9pbnQgdG8gY2hlY2ssIGVpdGhlciAnc21hbGwgb25seScgb3IgJ3NtYWxsJy4gT21pdHRpbmcgJ29ubHknIGZhbGxzIGJhY2sgdG8gdXNpbmcgYXRMZWFzdCgpIG1ldGhvZC5cbiAgICogQHJldHVybnMge0Jvb2xlYW59IGB0cnVlYCBpZiB0aGUgYnJlYWtwb2ludCBtYXRjaGVzLCBgZmFsc2VgIGlmIGl0IGRvZXMgbm90LlxuICAgKi9cbiAgaXMoc2l6ZSkge1xuICAgIHNpemUgPSBzaXplLnRyaW0oKS5zcGxpdCgnICcpO1xuICAgIGlmKHNpemUubGVuZ3RoID4gMSAmJiBzaXplWzFdID09PSAnb25seScpIHtcbiAgICAgIGlmKHNpemVbMF0gPT09IHRoaXMuX2dldEN1cnJlbnRTaXplKCkpIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5hdExlYXN0KHNpemVbMF0pO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIG1lZGlhIHF1ZXJ5IG9mIGEgYnJlYWtwb2ludC5cbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBzaXplIC0gTmFtZSBvZiB0aGUgYnJlYWtwb2ludCB0byBnZXQuXG4gICAqIEByZXR1cm5zIHtTdHJpbmd8bnVsbH0gLSBUaGUgbWVkaWEgcXVlcnkgb2YgdGhlIGJyZWFrcG9pbnQsIG9yIGBudWxsYCBpZiB0aGUgYnJlYWtwb2ludCBkb2Vzbid0IGV4aXN0LlxuICAgKi9cbiAgZ2V0KHNpemUpIHtcbiAgICBmb3IgKHZhciBpIGluIHRoaXMucXVlcmllcykge1xuICAgICAgaWYodGhpcy5xdWVyaWVzLmhhc093blByb3BlcnR5KGkpKSB7XG4gICAgICAgIHZhciBxdWVyeSA9IHRoaXMucXVlcmllc1tpXTtcbiAgICAgICAgaWYgKHNpemUgPT09IHF1ZXJ5Lm5hbWUpIHJldHVybiBxdWVyeS52YWx1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfSxcblxuICAvKipcbiAgICogR2V0cyB0aGUgY3VycmVudCBicmVha3BvaW50IG5hbWUgYnkgdGVzdGluZyBldmVyeSBicmVha3BvaW50IGFuZCByZXR1cm5pbmcgdGhlIGxhc3Qgb25lIHRvIG1hdGNoICh0aGUgYmlnZ2VzdCBvbmUpLlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHByaXZhdGVcbiAgICogQHJldHVybnMge1N0cmluZ30gTmFtZSBvZiB0aGUgY3VycmVudCBicmVha3BvaW50LlxuICAgKi9cbiAgX2dldEN1cnJlbnRTaXplKCkge1xuICAgIHZhciBtYXRjaGVkO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnF1ZXJpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBxdWVyeSA9IHRoaXMucXVlcmllc1tpXTtcblxuICAgICAgaWYgKG1hdGNoTWVkaWEocXVlcnkudmFsdWUpLm1hdGNoZXMpIHtcbiAgICAgICAgbWF0Y2hlZCA9IHF1ZXJ5O1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0eXBlb2YgbWF0Y2hlZCA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHJldHVybiBtYXRjaGVkLm5hbWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBtYXRjaGVkO1xuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICogQWN0aXZhdGVzIHRoZSBicmVha3BvaW50IHdhdGNoZXIsIHdoaWNoIGZpcmVzIGFuIGV2ZW50IG9uIHRoZSB3aW5kb3cgd2hlbmV2ZXIgdGhlIGJyZWFrcG9pbnQgY2hhbmdlcy5cbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfd2F0Y2hlcigpIHtcbiAgICAkKHdpbmRvdykub2ZmKCdyZXNpemUuemYubWVkaWFxdWVyeScpLm9uKCdyZXNpemUuemYubWVkaWFxdWVyeScsICgpID0+IHtcbiAgICAgIHZhciBuZXdTaXplID0gdGhpcy5fZ2V0Q3VycmVudFNpemUoKSwgY3VycmVudFNpemUgPSB0aGlzLmN1cnJlbnQ7XG5cbiAgICAgIGlmIChuZXdTaXplICE9PSBjdXJyZW50U2l6ZSkge1xuICAgICAgICAvLyBDaGFuZ2UgdGhlIGN1cnJlbnQgbWVkaWEgcXVlcnlcbiAgICAgICAgdGhpcy5jdXJyZW50ID0gbmV3U2l6ZTtcblxuICAgICAgICAvLyBCcm9hZGNhc3QgdGhlIG1lZGlhIHF1ZXJ5IGNoYW5nZSBvbiB0aGUgd2luZG93XG4gICAgICAgICQod2luZG93KS50cmlnZ2VyKCdjaGFuZ2VkLnpmLm1lZGlhcXVlcnknLCBbbmV3U2l6ZSwgY3VycmVudFNpemVdKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufTtcblxuXG5cbi8vIFRoYW5rIHlvdTogaHR0cHM6Ly9naXRodWIuY29tL3NpbmRyZXNvcmh1cy9xdWVyeS1zdHJpbmdcbmZ1bmN0aW9uIHBhcnNlU3R5bGVUb09iamVjdChzdHIpIHtcbiAgdmFyIHN0eWxlT2JqZWN0ID0ge307XG5cbiAgaWYgKHR5cGVvZiBzdHIgIT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHN0eWxlT2JqZWN0O1xuICB9XG5cbiAgc3RyID0gc3RyLnRyaW0oKS5zbGljZSgxLCAtMSk7IC8vIGJyb3dzZXJzIHJlLXF1b3RlIHN0cmluZyBzdHlsZSB2YWx1ZXNcblxuICBpZiAoIXN0cikge1xuICAgIHJldHVybiBzdHlsZU9iamVjdDtcbiAgfVxuXG4gIHN0eWxlT2JqZWN0ID0gc3RyLnNwbGl0KCcmJykucmVkdWNlKGZ1bmN0aW9uKHJldCwgcGFyYW0pIHtcbiAgICB2YXIgcGFydHMgPSBwYXJhbS5yZXBsYWNlKC9cXCsvZywgJyAnKS5zcGxpdCgnPScpO1xuICAgIHZhciBrZXkgPSBwYXJ0c1swXTtcbiAgICB2YXIgdmFsID0gcGFydHNbMV07XG4gICAga2V5ID0gZGVjb2RlVVJJQ29tcG9uZW50KGtleSk7XG5cbiAgICAvLyBtaXNzaW5nIGA9YCBzaG91bGQgYmUgYG51bGxgOlxuICAgIC8vIGh0dHA6Ly93My5vcmcvVFIvMjAxMi9XRC11cmwtMjAxMjA1MjQvI2NvbGxlY3QtdXJsLXBhcmFtZXRlcnNcbiAgICB2YWwgPSB2YWwgPT09IHVuZGVmaW5lZCA/IG51bGwgOiBkZWNvZGVVUklDb21wb25lbnQodmFsKTtcblxuICAgIGlmICghcmV0Lmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgIHJldFtrZXldID0gdmFsO1xuICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShyZXRba2V5XSkpIHtcbiAgICAgIHJldFtrZXldLnB1c2godmFsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0W2tleV0gPSBbcmV0W2tleV0sIHZhbF07XG4gICAgfVxuICAgIHJldHVybiByZXQ7XG4gIH0sIHt9KTtcblxuICByZXR1cm4gc3R5bGVPYmplY3Q7XG59XG5cbmV4cG9ydCB7TWVkaWFRdWVyeX07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLnV0aWwubWVkaWFRdWVyeS5qcyIsIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKlxuICogVGhpcyB1dGlsIHdhcyBjcmVhdGVkIGJ5IE1hcml1cyBPbGJlcnR6ICpcbiAqIFBsZWFzZSB0aGFuayBNYXJpdXMgb24gR2l0SHViIC9vd2xiZXJ0eiAqXG4gKiBvciB0aGUgd2ViIGh0dHA6Ly93d3cubWFyaXVzb2xiZXJ0ei5kZS8gKlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcbmltcG9ydCB7IHJ0bCBhcyBSdGwgfSBmcm9tICcuL2ZvdW5kYXRpb24udXRpbC5jb3JlJztcblxuY29uc3Qga2V5Q29kZXMgPSB7XG4gIDk6ICdUQUInLFxuICAxMzogJ0VOVEVSJyxcbiAgMjc6ICdFU0NBUEUnLFxuICAzMjogJ1NQQUNFJyxcbiAgMzU6ICdFTkQnLFxuICAzNjogJ0hPTUUnLFxuICAzNzogJ0FSUk9XX0xFRlQnLFxuICAzODogJ0FSUk9XX1VQJyxcbiAgMzk6ICdBUlJPV19SSUdIVCcsXG4gIDQwOiAnQVJST1dfRE9XTidcbn1cblxudmFyIGNvbW1hbmRzID0ge31cblxuLy8gRnVuY3Rpb25zIHB1bGxlZCBvdXQgdG8gYmUgcmVmZXJlbmNlYWJsZSBmcm9tIGludGVybmFsc1xuZnVuY3Rpb24gZmluZEZvY3VzYWJsZSgkZWxlbWVudCkge1xuICBpZighJGVsZW1lbnQpIHtyZXR1cm4gZmFsc2U7IH1cbiAgcmV0dXJuICRlbGVtZW50LmZpbmQoJ2FbaHJlZl0sIGFyZWFbaHJlZl0sIGlucHV0Om5vdChbZGlzYWJsZWRdKSwgc2VsZWN0Om5vdChbZGlzYWJsZWRdKSwgdGV4dGFyZWE6bm90KFtkaXNhYmxlZF0pLCBidXR0b246bm90KFtkaXNhYmxlZF0pLCBpZnJhbWUsIG9iamVjdCwgZW1iZWQsICpbdGFiaW5kZXhdLCAqW2NvbnRlbnRlZGl0YWJsZV0nKS5maWx0ZXIoZnVuY3Rpb24oKSB7XG4gICAgaWYgKCEkKHRoaXMpLmlzKCc6dmlzaWJsZScpIHx8ICQodGhpcykuYXR0cigndGFiaW5kZXgnKSA8IDApIHsgcmV0dXJuIGZhbHNlOyB9IC8vb25seSBoYXZlIHZpc2libGUgZWxlbWVudHMgYW5kIHRob3NlIHRoYXQgaGF2ZSBhIHRhYmluZGV4IGdyZWF0ZXIgb3IgZXF1YWwgMFxuICAgIHJldHVybiB0cnVlO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gcGFyc2VLZXkoZXZlbnQpIHtcbiAgdmFyIGtleSA9IGtleUNvZGVzW2V2ZW50LndoaWNoIHx8IGV2ZW50LmtleUNvZGVdIHx8IFN0cmluZy5mcm9tQ2hhckNvZGUoZXZlbnQud2hpY2gpLnRvVXBwZXJDYXNlKCk7XG5cbiAgLy8gUmVtb3ZlIHVuLXByaW50YWJsZSBjaGFyYWN0ZXJzLCBlLmcuIGZvciBgZnJvbUNoYXJDb2RlYCBjYWxscyBmb3IgQ1RSTCBvbmx5IGV2ZW50c1xuICBrZXkgPSBrZXkucmVwbGFjZSgvXFxXKy8sICcnKTtcblxuICBpZiAoZXZlbnQuc2hpZnRLZXkpIGtleSA9IGBTSElGVF8ke2tleX1gO1xuICBpZiAoZXZlbnQuY3RybEtleSkga2V5ID0gYENUUkxfJHtrZXl9YDtcbiAgaWYgKGV2ZW50LmFsdEtleSkga2V5ID0gYEFMVF8ke2tleX1gO1xuXG4gIC8vIFJlbW92ZSB0cmFpbGluZyB1bmRlcnNjb3JlLCBpbiBjYXNlIG9ubHkgbW9kaWZpZXJzIHdlcmUgdXNlZCAoZS5nLiBvbmx5IGBDVFJMX0FMVGApXG4gIGtleSA9IGtleS5yZXBsYWNlKC9fJC8sICcnKTtcblxuICByZXR1cm4ga2V5O1xufVxuXG52YXIgS2V5Ym9hcmQgPSB7XG4gIGtleXM6IGdldEtleUNvZGVzKGtleUNvZGVzKSxcblxuICAvKipcbiAgICogUGFyc2VzIHRoZSAoa2V5Ym9hcmQpIGV2ZW50IGFuZCByZXR1cm5zIGEgU3RyaW5nIHRoYXQgcmVwcmVzZW50cyBpdHMga2V5XG4gICAqIENhbiBiZSB1c2VkIGxpa2UgRm91bmRhdGlvbi5wYXJzZUtleShldmVudCkgPT09IEZvdW5kYXRpb24ua2V5cy5TUEFDRVxuICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudCAtIHRoZSBldmVudCBnZW5lcmF0ZWQgYnkgdGhlIGV2ZW50IGhhbmRsZXJcbiAgICogQHJldHVybiBTdHJpbmcga2V5IC0gU3RyaW5nIHRoYXQgcmVwcmVzZW50cyB0aGUga2V5IHByZXNzZWRcbiAgICovXG4gIHBhcnNlS2V5OiBwYXJzZUtleSxcblxuICAvKipcbiAgICogSGFuZGxlcyB0aGUgZ2l2ZW4gKGtleWJvYXJkKSBldmVudFxuICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudCAtIHRoZSBldmVudCBnZW5lcmF0ZWQgYnkgdGhlIGV2ZW50IGhhbmRsZXJcbiAgICogQHBhcmFtIHtTdHJpbmd9IGNvbXBvbmVudCAtIEZvdW5kYXRpb24gY29tcG9uZW50J3MgbmFtZSwgZS5nLiBTbGlkZXIgb3IgUmV2ZWFsXG4gICAqIEBwYXJhbSB7T2JqZWN0c30gZnVuY3Rpb25zIC0gY29sbGVjdGlvbiBvZiBmdW5jdGlvbnMgdGhhdCBhcmUgdG8gYmUgZXhlY3V0ZWRcbiAgICovXG4gIGhhbmRsZUtleShldmVudCwgY29tcG9uZW50LCBmdW5jdGlvbnMpIHtcbiAgICB2YXIgY29tbWFuZExpc3QgPSBjb21tYW5kc1tjb21wb25lbnRdLFxuICAgICAga2V5Q29kZSA9IHRoaXMucGFyc2VLZXkoZXZlbnQpLFxuICAgICAgY21kcyxcbiAgICAgIGNvbW1hbmQsXG4gICAgICBmbjtcblxuICAgIGlmICghY29tbWFuZExpc3QpIHJldHVybiBjb25zb2xlLndhcm4oJ0NvbXBvbmVudCBub3QgZGVmaW5lZCEnKTtcblxuICAgIGlmICh0eXBlb2YgY29tbWFuZExpc3QubHRyID09PSAndW5kZWZpbmVkJykgeyAvLyB0aGlzIGNvbXBvbmVudCBkb2VzIG5vdCBkaWZmZXJlbnRpYXRlIGJldHdlZW4gbHRyIGFuZCBydGxcbiAgICAgICAgY21kcyA9IGNvbW1hbmRMaXN0OyAvLyB1c2UgcGxhaW4gbGlzdFxuICAgIH0gZWxzZSB7IC8vIG1lcmdlIGx0ciBhbmQgcnRsOiBpZiBkb2N1bWVudCBpcyBydGwsIHJ0bCBvdmVyd3JpdGVzIGx0ciBhbmQgdmljZSB2ZXJzYVxuICAgICAgICBpZiAoUnRsKCkpIGNtZHMgPSAkLmV4dGVuZCh7fSwgY29tbWFuZExpc3QubHRyLCBjb21tYW5kTGlzdC5ydGwpO1xuXG4gICAgICAgIGVsc2UgY21kcyA9ICQuZXh0ZW5kKHt9LCBjb21tYW5kTGlzdC5ydGwsIGNvbW1hbmRMaXN0Lmx0cik7XG4gICAgfVxuICAgIGNvbW1hbmQgPSBjbWRzW2tleUNvZGVdO1xuXG4gICAgZm4gPSBmdW5jdGlvbnNbY29tbWFuZF07XG4gICAgaWYgKGZuICYmIHR5cGVvZiBmbiA9PT0gJ2Z1bmN0aW9uJykgeyAvLyBleGVjdXRlIGZ1bmN0aW9uICBpZiBleGlzdHNcbiAgICAgIHZhciByZXR1cm5WYWx1ZSA9IGZuLmFwcGx5KCk7XG4gICAgICBpZiAoZnVuY3Rpb25zLmhhbmRsZWQgfHwgdHlwZW9mIGZ1bmN0aW9ucy5oYW5kbGVkID09PSAnZnVuY3Rpb24nKSB7IC8vIGV4ZWN1dGUgZnVuY3Rpb24gd2hlbiBldmVudCB3YXMgaGFuZGxlZFxuICAgICAgICAgIGZ1bmN0aW9ucy5oYW5kbGVkKHJldHVyblZhbHVlKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGZ1bmN0aW9ucy51bmhhbmRsZWQgfHwgdHlwZW9mIGZ1bmN0aW9ucy51bmhhbmRsZWQgPT09ICdmdW5jdGlvbicpIHsgLy8gZXhlY3V0ZSBmdW5jdGlvbiB3aGVuIGV2ZW50IHdhcyBub3QgaGFuZGxlZFxuICAgICAgICAgIGZ1bmN0aW9ucy51bmhhbmRsZWQoKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIEZpbmRzIGFsbCBmb2N1c2FibGUgZWxlbWVudHMgd2l0aGluIHRoZSBnaXZlbiBgJGVsZW1lbnRgXG4gICAqIEBwYXJhbSB7alF1ZXJ5fSAkZWxlbWVudCAtIGpRdWVyeSBvYmplY3QgdG8gc2VhcmNoIHdpdGhpblxuICAgKiBAcmV0dXJuIHtqUXVlcnl9ICRmb2N1c2FibGUgLSBhbGwgZm9jdXNhYmxlIGVsZW1lbnRzIHdpdGhpbiBgJGVsZW1lbnRgXG4gICAqL1xuXG4gIGZpbmRGb2N1c2FibGU6IGZpbmRGb2N1c2FibGUsXG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGNvbXBvbmVudCBuYW1lIG5hbWVcbiAgICogQHBhcmFtIHtPYmplY3R9IGNvbXBvbmVudCAtIEZvdW5kYXRpb24gY29tcG9uZW50LCBlLmcuIFNsaWRlciBvciBSZXZlYWxcbiAgICogQHJldHVybiBTdHJpbmcgY29tcG9uZW50TmFtZVxuICAgKi9cblxuICByZWdpc3Rlcihjb21wb25lbnROYW1lLCBjbWRzKSB7XG4gICAgY29tbWFuZHNbY29tcG9uZW50TmFtZV0gPSBjbWRzO1xuICB9LFxuXG5cbiAgLy8gVE9ETzk0Mzg6IFRoZXNlIHJlZmVyZW5jZXMgdG8gS2V5Ym9hcmQgbmVlZCB0byBub3QgcmVxdWlyZSBnbG9iYWwuIFdpbGwgJ3RoaXMnIHdvcmsgaW4gdGhpcyBjb250ZXh0P1xuICAvL1xuICAvKipcbiAgICogVHJhcHMgdGhlIGZvY3VzIGluIHRoZSBnaXZlbiBlbGVtZW50LlxuICAgKiBAcGFyYW0gIHtqUXVlcnl9ICRlbGVtZW50ICBqUXVlcnkgb2JqZWN0IHRvIHRyYXAgdGhlIGZvdWNzIGludG8uXG4gICAqL1xuICB0cmFwRm9jdXMoJGVsZW1lbnQpIHtcbiAgICB2YXIgJGZvY3VzYWJsZSA9IGZpbmRGb2N1c2FibGUoJGVsZW1lbnQpLFxuICAgICAgICAkZmlyc3RGb2N1c2FibGUgPSAkZm9jdXNhYmxlLmVxKDApLFxuICAgICAgICAkbGFzdEZvY3VzYWJsZSA9ICRmb2N1c2FibGUuZXEoLTEpO1xuXG4gICAgJGVsZW1lbnQub24oJ2tleWRvd24uemYudHJhcGZvY3VzJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgIGlmIChldmVudC50YXJnZXQgPT09ICRsYXN0Rm9jdXNhYmxlWzBdICYmIHBhcnNlS2V5KGV2ZW50KSA9PT0gJ1RBQicpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgJGZpcnN0Rm9jdXNhYmxlLmZvY3VzKCk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChldmVudC50YXJnZXQgPT09ICRmaXJzdEZvY3VzYWJsZVswXSAmJiBwYXJzZUtleShldmVudCkgPT09ICdTSElGVF9UQUInKSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICRsYXN0Rm9jdXNhYmxlLmZvY3VzKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0sXG4gIC8qKlxuICAgKiBSZWxlYXNlcyB0aGUgdHJhcHBlZCBmb2N1cyBmcm9tIHRoZSBnaXZlbiBlbGVtZW50LlxuICAgKiBAcGFyYW0gIHtqUXVlcnl9ICRlbGVtZW50ICBqUXVlcnkgb2JqZWN0IHRvIHJlbGVhc2UgdGhlIGZvY3VzIGZvci5cbiAgICovXG4gIHJlbGVhc2VGb2N1cygkZWxlbWVudCkge1xuICAgICRlbGVtZW50Lm9mZigna2V5ZG93bi56Zi50cmFwZm9jdXMnKTtcbiAgfVxufVxuXG4vKlxuICogQ29uc3RhbnRzIGZvciBlYXNpZXIgY29tcGFyaW5nLlxuICogQ2FuIGJlIHVzZWQgbGlrZSBGb3VuZGF0aW9uLnBhcnNlS2V5KGV2ZW50KSA9PT0gRm91bmRhdGlvbi5rZXlzLlNQQUNFXG4gKi9cbmZ1bmN0aW9uIGdldEtleUNvZGVzKGtjcykge1xuICB2YXIgayA9IHt9O1xuICBmb3IgKHZhciBrYyBpbiBrY3MpIGtba2NzW2tjXV0gPSBrY3Nba2NdO1xuICByZXR1cm4gaztcbn1cblxuZXhwb3J0IHtLZXlib2FyZH07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLnV0aWwua2V5Ym9hcmQuanMiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5pbXBvcnQgeyBNb3Rpb24gfSBmcm9tICcuL2ZvdW5kYXRpb24udXRpbC5tb3Rpb24nO1xuXG5jb25zdCBNdXRhdGlvbk9ic2VydmVyID0gKGZ1bmN0aW9uICgpIHtcbiAgdmFyIHByZWZpeGVzID0gWydXZWJLaXQnLCAnTW96JywgJ08nLCAnTXMnLCAnJ107XG4gIGZvciAodmFyIGk9MDsgaSA8IHByZWZpeGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGAke3ByZWZpeGVzW2ldfU11dGF0aW9uT2JzZXJ2ZXJgIGluIHdpbmRvdykge1xuICAgICAgcmV0dXJuIHdpbmRvd1tgJHtwcmVmaXhlc1tpXX1NdXRhdGlvbk9ic2VydmVyYF07XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn0oKSk7XG5cbmNvbnN0IHRyaWdnZXJzID0gKGVsLCB0eXBlKSA9PiB7XG4gIGVsLmRhdGEodHlwZSkuc3BsaXQoJyAnKS5mb3JFYWNoKGlkID0+IHtcbiAgICAkKGAjJHtpZH1gKVsgdHlwZSA9PT0gJ2Nsb3NlJyA/ICd0cmlnZ2VyJyA6ICd0cmlnZ2VySGFuZGxlciddKGAke3R5cGV9LnpmLnRyaWdnZXJgLCBbZWxdKTtcbiAgfSk7XG59O1xuXG52YXIgVHJpZ2dlcnMgPSB7XG4gIExpc3RlbmVyczoge1xuICAgIEJhc2ljOiB7fSxcbiAgICBHbG9iYWw6IHt9XG4gIH0sXG4gIEluaXRpYWxpemVyczoge31cbn1cblxuVHJpZ2dlcnMuTGlzdGVuZXJzLkJhc2ljICA9IHtcbiAgb3Blbkxpc3RlbmVyOiBmdW5jdGlvbigpIHtcbiAgICB0cmlnZ2VycygkKHRoaXMpLCAnb3BlbicpO1xuICB9LFxuICBjbG9zZUxpc3RlbmVyOiBmdW5jdGlvbigpIHtcbiAgICBsZXQgaWQgPSAkKHRoaXMpLmRhdGEoJ2Nsb3NlJyk7XG4gICAgaWYgKGlkKSB7XG4gICAgICB0cmlnZ2VycygkKHRoaXMpLCAnY2xvc2UnKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAkKHRoaXMpLnRyaWdnZXIoJ2Nsb3NlLnpmLnRyaWdnZXInKTtcbiAgICB9XG4gIH0sXG4gIHRvZ2dsZUxpc3RlbmVyOiBmdW5jdGlvbigpIHtcbiAgICBsZXQgaWQgPSAkKHRoaXMpLmRhdGEoJ3RvZ2dsZScpO1xuICAgIGlmIChpZCkge1xuICAgICAgdHJpZ2dlcnMoJCh0aGlzKSwgJ3RvZ2dsZScpO1xuICAgIH0gZWxzZSB7XG4gICAgICAkKHRoaXMpLnRyaWdnZXIoJ3RvZ2dsZS56Zi50cmlnZ2VyJyk7XG4gICAgfVxuICB9LFxuICBjbG9zZWFibGVMaXN0ZW5lcjogZnVuY3Rpb24oZSkge1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgbGV0IGFuaW1hdGlvbiA9ICQodGhpcykuZGF0YSgnY2xvc2FibGUnKTtcblxuICAgIGlmKGFuaW1hdGlvbiAhPT0gJycpe1xuICAgICAgTW90aW9uLmFuaW1hdGVPdXQoJCh0aGlzKSwgYW5pbWF0aW9uLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJCh0aGlzKS50cmlnZ2VyKCdjbG9zZWQuemYnKTtcbiAgICAgIH0pO1xuICAgIH1lbHNle1xuICAgICAgJCh0aGlzKS5mYWRlT3V0KCkudHJpZ2dlcignY2xvc2VkLnpmJyk7XG4gICAgfVxuICB9LFxuICB0b2dnbGVGb2N1c0xpc3RlbmVyOiBmdW5jdGlvbigpIHtcbiAgICBsZXQgaWQgPSAkKHRoaXMpLmRhdGEoJ3RvZ2dsZS1mb2N1cycpO1xuICAgICQoYCMke2lkfWApLnRyaWdnZXJIYW5kbGVyKCd0b2dnbGUuemYudHJpZ2dlcicsIFskKHRoaXMpXSk7XG4gIH1cbn07XG5cbi8vIEVsZW1lbnRzIHdpdGggW2RhdGEtb3Blbl0gd2lsbCByZXZlYWwgYSBwbHVnaW4gdGhhdCBzdXBwb3J0cyBpdCB3aGVuIGNsaWNrZWQuXG5UcmlnZ2Vycy5Jbml0aWFsaXplcnMuYWRkT3Blbkxpc3RlbmVyID0gKCRlbGVtKSA9PiB7XG4gICRlbGVtLm9mZignY2xpY2suemYudHJpZ2dlcicsIFRyaWdnZXJzLkxpc3RlbmVycy5CYXNpYy5vcGVuTGlzdGVuZXIpO1xuICAkZWxlbS5vbignY2xpY2suemYudHJpZ2dlcicsICdbZGF0YS1vcGVuXScsIFRyaWdnZXJzLkxpc3RlbmVycy5CYXNpYy5vcGVuTGlzdGVuZXIpO1xufVxuXG4vLyBFbGVtZW50cyB3aXRoIFtkYXRhLWNsb3NlXSB3aWxsIGNsb3NlIGEgcGx1Z2luIHRoYXQgc3VwcG9ydHMgaXQgd2hlbiBjbGlja2VkLlxuLy8gSWYgdXNlZCB3aXRob3V0IGEgdmFsdWUgb24gW2RhdGEtY2xvc2VdLCB0aGUgZXZlbnQgd2lsbCBidWJibGUsIGFsbG93aW5nIGl0IHRvIGNsb3NlIGEgcGFyZW50IGNvbXBvbmVudC5cblRyaWdnZXJzLkluaXRpYWxpemVycy5hZGRDbG9zZUxpc3RlbmVyID0gKCRlbGVtKSA9PiB7XG4gICRlbGVtLm9mZignY2xpY2suemYudHJpZ2dlcicsIFRyaWdnZXJzLkxpc3RlbmVycy5CYXNpYy5jbG9zZUxpc3RlbmVyKTtcbiAgJGVsZW0ub24oJ2NsaWNrLnpmLnRyaWdnZXInLCAnW2RhdGEtY2xvc2VdJywgVHJpZ2dlcnMuTGlzdGVuZXJzLkJhc2ljLmNsb3NlTGlzdGVuZXIpO1xufVxuXG4vLyBFbGVtZW50cyB3aXRoIFtkYXRhLXRvZ2dsZV0gd2lsbCB0b2dnbGUgYSBwbHVnaW4gdGhhdCBzdXBwb3J0cyBpdCB3aGVuIGNsaWNrZWQuXG5UcmlnZ2Vycy5Jbml0aWFsaXplcnMuYWRkVG9nZ2xlTGlzdGVuZXIgPSAoJGVsZW0pID0+IHtcbiAgJGVsZW0ub2ZmKCdjbGljay56Zi50cmlnZ2VyJywgVHJpZ2dlcnMuTGlzdGVuZXJzLkJhc2ljLnRvZ2dsZUxpc3RlbmVyKTtcbiAgJGVsZW0ub24oJ2NsaWNrLnpmLnRyaWdnZXInLCAnW2RhdGEtdG9nZ2xlXScsIFRyaWdnZXJzLkxpc3RlbmVycy5CYXNpYy50b2dnbGVMaXN0ZW5lcik7XG59XG5cbi8vIEVsZW1lbnRzIHdpdGggW2RhdGEtY2xvc2FibGVdIHdpbGwgcmVzcG9uZCB0byBjbG9zZS56Zi50cmlnZ2VyIGV2ZW50cy5cblRyaWdnZXJzLkluaXRpYWxpemVycy5hZGRDbG9zZWFibGVMaXN0ZW5lciA9ICgkZWxlbSkgPT4ge1xuICAkZWxlbS5vZmYoJ2Nsb3NlLnpmLnRyaWdnZXInLCBUcmlnZ2Vycy5MaXN0ZW5lcnMuQmFzaWMuY2xvc2VhYmxlTGlzdGVuZXIpO1xuICAkZWxlbS5vbignY2xvc2UuemYudHJpZ2dlcicsICdbZGF0YS1jbG9zZWFibGVdLCBbZGF0YS1jbG9zYWJsZV0nLCBUcmlnZ2Vycy5MaXN0ZW5lcnMuQmFzaWMuY2xvc2VhYmxlTGlzdGVuZXIpO1xufVxuXG4vLyBFbGVtZW50cyB3aXRoIFtkYXRhLXRvZ2dsZS1mb2N1c10gd2lsbCByZXNwb25kIHRvIGNvbWluZyBpbiBhbmQgb3V0IG9mIGZvY3VzXG5UcmlnZ2Vycy5Jbml0aWFsaXplcnMuYWRkVG9nZ2xlRm9jdXNMaXN0ZW5lciA9ICgkZWxlbSkgPT4ge1xuICAkZWxlbS5vZmYoJ2ZvY3VzLnpmLnRyaWdnZXIgYmx1ci56Zi50cmlnZ2VyJywgVHJpZ2dlcnMuTGlzdGVuZXJzLkJhc2ljLnRvZ2dsZUZvY3VzTGlzdGVuZXIpO1xuICAkZWxlbS5vbignZm9jdXMuemYudHJpZ2dlciBibHVyLnpmLnRyaWdnZXInLCAnW2RhdGEtdG9nZ2xlLWZvY3VzXScsIFRyaWdnZXJzLkxpc3RlbmVycy5CYXNpYy50b2dnbGVGb2N1c0xpc3RlbmVyKTtcbn1cblxuXG5cbi8vIE1vcmUgR2xvYmFsL2NvbXBsZXggbGlzdGVuZXJzIGFuZCB0cmlnZ2Vyc1xuVHJpZ2dlcnMuTGlzdGVuZXJzLkdsb2JhbCAgPSB7XG4gIHJlc2l6ZUxpc3RlbmVyOiBmdW5jdGlvbigkbm9kZXMpIHtcbiAgICBpZighTXV0YXRpb25PYnNlcnZlcil7Ly9mYWxsYmFjayBmb3IgSUUgOVxuICAgICAgJG5vZGVzLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgICAgJCh0aGlzKS50cmlnZ2VySGFuZGxlcigncmVzaXplbWUuemYudHJpZ2dlcicpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIC8vdHJpZ2dlciBhbGwgbGlzdGVuaW5nIGVsZW1lbnRzIGFuZCBzaWduYWwgYSByZXNpemUgZXZlbnRcbiAgICAkbm9kZXMuYXR0cignZGF0YS1ldmVudHMnLCBcInJlc2l6ZVwiKTtcbiAgfSxcbiAgc2Nyb2xsTGlzdGVuZXI6IGZ1bmN0aW9uKCRub2Rlcykge1xuICAgIGlmKCFNdXRhdGlvbk9ic2VydmVyKXsvL2ZhbGxiYWNrIGZvciBJRSA5XG4gICAgICAkbm9kZXMuZWFjaChmdW5jdGlvbigpe1xuICAgICAgICAkKHRoaXMpLnRyaWdnZXJIYW5kbGVyKCdzY3JvbGxtZS56Zi50cmlnZ2VyJyk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgLy90cmlnZ2VyIGFsbCBsaXN0ZW5pbmcgZWxlbWVudHMgYW5kIHNpZ25hbCBhIHNjcm9sbCBldmVudFxuICAgICRub2Rlcy5hdHRyKCdkYXRhLWV2ZW50cycsIFwic2Nyb2xsXCIpO1xuICB9LFxuICBjbG9zZU1lTGlzdGVuZXI6IGZ1bmN0aW9uKGUsIHBsdWdpbklkKXtcbiAgICBsZXQgcGx1Z2luID0gZS5uYW1lc3BhY2Uuc3BsaXQoJy4nKVswXTtcbiAgICBsZXQgcGx1Z2lucyA9ICQoYFtkYXRhLSR7cGx1Z2lufV1gKS5ub3QoYFtkYXRhLXlldGktYm94PVwiJHtwbHVnaW5JZH1cIl1gKTtcblxuICAgIHBsdWdpbnMuZWFjaChmdW5jdGlvbigpe1xuICAgICAgbGV0IF90aGlzID0gJCh0aGlzKTtcbiAgICAgIF90aGlzLnRyaWdnZXJIYW5kbGVyKCdjbG9zZS56Zi50cmlnZ2VyJywgW190aGlzXSk7XG4gICAgfSk7XG4gIH1cbn1cblxuLy8gR2xvYmFsLCBwYXJzZXMgd2hvbGUgZG9jdW1lbnQuXG5UcmlnZ2Vycy5Jbml0aWFsaXplcnMuYWRkQ2xvc2VtZUxpc3RlbmVyID0gZnVuY3Rpb24ocGx1Z2luTmFtZSkge1xuICB2YXIgeWV0aUJveGVzID0gJCgnW2RhdGEteWV0aS1ib3hdJyksXG4gICAgICBwbHVnTmFtZXMgPSBbJ2Ryb3Bkb3duJywgJ3Rvb2x0aXAnLCAncmV2ZWFsJ107XG5cbiAgaWYocGx1Z2luTmFtZSl7XG4gICAgaWYodHlwZW9mIHBsdWdpbk5hbWUgPT09ICdzdHJpbmcnKXtcbiAgICAgIHBsdWdOYW1lcy5wdXNoKHBsdWdpbk5hbWUpO1xuICAgIH1lbHNlIGlmKHR5cGVvZiBwbHVnaW5OYW1lID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgcGx1Z2luTmFtZVswXSA9PT0gJ3N0cmluZycpe1xuICAgICAgcGx1Z05hbWVzLmNvbmNhdChwbHVnaW5OYW1lKTtcbiAgICB9ZWxzZXtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ1BsdWdpbiBuYW1lcyBtdXN0IGJlIHN0cmluZ3MnKTtcbiAgICB9XG4gIH1cbiAgaWYoeWV0aUJveGVzLmxlbmd0aCl7XG4gICAgbGV0IGxpc3RlbmVycyA9IHBsdWdOYW1lcy5tYXAoKG5hbWUpID0+IHtcbiAgICAgIHJldHVybiBgY2xvc2VtZS56Zi4ke25hbWV9YDtcbiAgICB9KS5qb2luKCcgJyk7XG5cbiAgICAkKHdpbmRvdykub2ZmKGxpc3RlbmVycykub24obGlzdGVuZXJzLCBUcmlnZ2Vycy5MaXN0ZW5lcnMuR2xvYmFsLmNsb3NlTWVMaXN0ZW5lcik7XG4gIH1cbn1cblxuZnVuY3Rpb24gZGVib3VuY2VHbG9iYWxMaXN0ZW5lcihkZWJvdW5jZSwgdHJpZ2dlciwgbGlzdGVuZXIpIHtcbiAgbGV0IHRpbWVyLCBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAzKTtcbiAgJCh3aW5kb3cpLm9mZih0cmlnZ2VyKS5vbih0cmlnZ2VyLCBmdW5jdGlvbihlKSB7XG4gICAgaWYgKHRpbWVyKSB7IGNsZWFyVGltZW91dCh0aW1lcik7IH1cbiAgICB0aW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgIGxpc3RlbmVyLmFwcGx5KG51bGwsIGFyZ3MpO1xuICAgIH0sIGRlYm91bmNlIHx8IDEwKTsvL2RlZmF1bHQgdGltZSB0byBlbWl0IHNjcm9sbCBldmVudFxuICB9KTtcbn1cblxuVHJpZ2dlcnMuSW5pdGlhbGl6ZXJzLmFkZFJlc2l6ZUxpc3RlbmVyID0gZnVuY3Rpb24oZGVib3VuY2Upe1xuICBsZXQgJG5vZGVzID0gJCgnW2RhdGEtcmVzaXplXScpO1xuICBpZigkbm9kZXMubGVuZ3RoKXtcbiAgICBkZWJvdW5jZUdsb2JhbExpc3RlbmVyKGRlYm91bmNlLCAncmVzaXplLnpmLnRyaWdnZXInLCBUcmlnZ2Vycy5MaXN0ZW5lcnMuR2xvYmFsLnJlc2l6ZUxpc3RlbmVyLCAkbm9kZXMpO1xuICB9XG59XG5cblRyaWdnZXJzLkluaXRpYWxpemVycy5hZGRTY3JvbGxMaXN0ZW5lciA9IGZ1bmN0aW9uKGRlYm91bmNlKXtcbiAgbGV0ICRub2RlcyA9ICQoJ1tkYXRhLXNjcm9sbF0nKTtcbiAgaWYoJG5vZGVzLmxlbmd0aCl7XG4gICAgZGVib3VuY2VHbG9iYWxMaXN0ZW5lcihkZWJvdW5jZSwgJ3Njcm9sbC56Zi50cmlnZ2VyJywgVHJpZ2dlcnMuTGlzdGVuZXJzLkdsb2JhbC5zY3JvbGxMaXN0ZW5lciwgJG5vZGVzKTtcbiAgfVxufVxuXG5UcmlnZ2Vycy5Jbml0aWFsaXplcnMuYWRkTXV0YXRpb25FdmVudHNMaXN0ZW5lciA9IGZ1bmN0aW9uKCRlbGVtKSB7XG4gIGlmKCFNdXRhdGlvbk9ic2VydmVyKXsgcmV0dXJuIGZhbHNlOyB9XG4gIGxldCAkbm9kZXMgPSAkZWxlbS5maW5kKCdbZGF0YS1yZXNpemVdLCBbZGF0YS1zY3JvbGxdLCBbZGF0YS1tdXRhdGVdJyk7XG5cbiAgLy9lbGVtZW50IGNhbGxiYWNrXG4gIHZhciBsaXN0ZW5pbmdFbGVtZW50c011dGF0aW9uID0gZnVuY3Rpb24gKG11dGF0aW9uUmVjb3Jkc0xpc3QpIHtcbiAgICB2YXIgJHRhcmdldCA9ICQobXV0YXRpb25SZWNvcmRzTGlzdFswXS50YXJnZXQpO1xuXG4gICAgLy90cmlnZ2VyIHRoZSBldmVudCBoYW5kbGVyIGZvciB0aGUgZWxlbWVudCBkZXBlbmRpbmcgb24gdHlwZVxuICAgIHN3aXRjaCAobXV0YXRpb25SZWNvcmRzTGlzdFswXS50eXBlKSB7XG4gICAgICBjYXNlIFwiYXR0cmlidXRlc1wiOlxuICAgICAgICBpZiAoJHRhcmdldC5hdHRyKFwiZGF0YS1ldmVudHNcIikgPT09IFwic2Nyb2xsXCIgJiYgbXV0YXRpb25SZWNvcmRzTGlzdFswXS5hdHRyaWJ1dGVOYW1lID09PSBcImRhdGEtZXZlbnRzXCIpIHtcbiAgICAgICAgICAkdGFyZ2V0LnRyaWdnZXJIYW5kbGVyKCdzY3JvbGxtZS56Zi50cmlnZ2VyJywgWyR0YXJnZXQsIHdpbmRvdy5wYWdlWU9mZnNldF0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICgkdGFyZ2V0LmF0dHIoXCJkYXRhLWV2ZW50c1wiKSA9PT0gXCJyZXNpemVcIiAmJiBtdXRhdGlvblJlY29yZHNMaXN0WzBdLmF0dHJpYnV0ZU5hbWUgPT09IFwiZGF0YS1ldmVudHNcIikge1xuICAgICAgICAgICR0YXJnZXQudHJpZ2dlckhhbmRsZXIoJ3Jlc2l6ZW1lLnpmLnRyaWdnZXInLCBbJHRhcmdldF0pO1xuICAgICAgICAgfVxuICAgICAgICBpZiAobXV0YXRpb25SZWNvcmRzTGlzdFswXS5hdHRyaWJ1dGVOYW1lID09PSBcInN0eWxlXCIpIHtcbiAgICAgICAgICAkdGFyZ2V0LmNsb3Nlc3QoXCJbZGF0YS1tdXRhdGVdXCIpLmF0dHIoXCJkYXRhLWV2ZW50c1wiLFwibXV0YXRlXCIpO1xuICAgICAgICAgICR0YXJnZXQuY2xvc2VzdChcIltkYXRhLW11dGF0ZV1cIikudHJpZ2dlckhhbmRsZXIoJ211dGF0ZW1lLnpmLnRyaWdnZXInLCBbJHRhcmdldC5jbG9zZXN0KFwiW2RhdGEtbXV0YXRlXVwiKV0pO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIFwiY2hpbGRMaXN0XCI6XG4gICAgICAgICR0YXJnZXQuY2xvc2VzdChcIltkYXRhLW11dGF0ZV1cIikuYXR0cihcImRhdGEtZXZlbnRzXCIsXCJtdXRhdGVcIik7XG4gICAgICAgICR0YXJnZXQuY2xvc2VzdChcIltkYXRhLW11dGF0ZV1cIikudHJpZ2dlckhhbmRsZXIoJ211dGF0ZW1lLnpmLnRyaWdnZXInLCBbJHRhcmdldC5jbG9zZXN0KFwiW2RhdGEtbXV0YXRlXVwiKV0pO1xuICAgICAgICBicmVhaztcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgLy9ub3RoaW5nXG4gICAgfVxuICB9O1xuXG4gIGlmICgkbm9kZXMubGVuZ3RoKSB7XG4gICAgLy9mb3IgZWFjaCBlbGVtZW50IHRoYXQgbmVlZHMgdG8gbGlzdGVuIGZvciByZXNpemluZywgc2Nyb2xsaW5nLCBvciBtdXRhdGlvbiBhZGQgYSBzaW5nbGUgb2JzZXJ2ZXJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8PSAkbm9kZXMubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICB2YXIgZWxlbWVudE9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIobGlzdGVuaW5nRWxlbWVudHNNdXRhdGlvbik7XG4gICAgICBlbGVtZW50T2JzZXJ2ZXIub2JzZXJ2ZSgkbm9kZXNbaV0sIHsgYXR0cmlidXRlczogdHJ1ZSwgY2hpbGRMaXN0OiB0cnVlLCBjaGFyYWN0ZXJEYXRhOiBmYWxzZSwgc3VidHJlZTogdHJ1ZSwgYXR0cmlidXRlRmlsdGVyOiBbXCJkYXRhLWV2ZW50c1wiLCBcInN0eWxlXCJdIH0pO1xuICAgIH1cbiAgfVxufVxuXG5UcmlnZ2Vycy5Jbml0aWFsaXplcnMuYWRkU2ltcGxlTGlzdGVuZXJzID0gZnVuY3Rpb24oKSB7XG4gIGxldCAkZG9jdW1lbnQgPSAkKGRvY3VtZW50KTtcblxuICBUcmlnZ2Vycy5Jbml0aWFsaXplcnMuYWRkT3Blbkxpc3RlbmVyKCRkb2N1bWVudCk7XG4gIFRyaWdnZXJzLkluaXRpYWxpemVycy5hZGRDbG9zZUxpc3RlbmVyKCRkb2N1bWVudCk7XG4gIFRyaWdnZXJzLkluaXRpYWxpemVycy5hZGRUb2dnbGVMaXN0ZW5lcigkZG9jdW1lbnQpO1xuICBUcmlnZ2Vycy5Jbml0aWFsaXplcnMuYWRkQ2xvc2VhYmxlTGlzdGVuZXIoJGRvY3VtZW50KTtcbiAgVHJpZ2dlcnMuSW5pdGlhbGl6ZXJzLmFkZFRvZ2dsZUZvY3VzTGlzdGVuZXIoJGRvY3VtZW50KTtcblxufVxuXG5UcmlnZ2Vycy5Jbml0aWFsaXplcnMuYWRkR2xvYmFsTGlzdGVuZXJzID0gZnVuY3Rpb24oKSB7XG4gIGxldCAkZG9jdW1lbnQgPSAkKGRvY3VtZW50KTtcbiAgVHJpZ2dlcnMuSW5pdGlhbGl6ZXJzLmFkZE11dGF0aW9uRXZlbnRzTGlzdGVuZXIoJGRvY3VtZW50KTtcbiAgVHJpZ2dlcnMuSW5pdGlhbGl6ZXJzLmFkZFJlc2l6ZUxpc3RlbmVyKCk7XG4gIFRyaWdnZXJzLkluaXRpYWxpemVycy5hZGRTY3JvbGxMaXN0ZW5lcigpO1xuICBUcmlnZ2Vycy5Jbml0aWFsaXplcnMuYWRkQ2xvc2VtZUxpc3RlbmVyKCk7XG59XG5cblxuVHJpZ2dlcnMuaW5pdCA9IGZ1bmN0aW9uKCQsIEZvdW5kYXRpb24pIHtcbiAgaWYgKHR5cGVvZigkLnRyaWdnZXJzSW5pdGlhbGl6ZWQpID09PSAndW5kZWZpbmVkJykge1xuICAgIGxldCAkZG9jdW1lbnQgPSAkKGRvY3VtZW50KTtcblxuICAgIGlmKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09IFwiY29tcGxldGVcIikge1xuICAgICAgVHJpZ2dlcnMuSW5pdGlhbGl6ZXJzLmFkZFNpbXBsZUxpc3RlbmVycygpO1xuICAgICAgVHJpZ2dlcnMuSW5pdGlhbGl6ZXJzLmFkZEdsb2JhbExpc3RlbmVycygpO1xuICAgIH0gZWxzZSB7XG4gICAgICAkKHdpbmRvdykub24oJ2xvYWQnLCAoKSA9PiB7XG4gICAgICAgIFRyaWdnZXJzLkluaXRpYWxpemVycy5hZGRTaW1wbGVMaXN0ZW5lcnMoKTtcbiAgICAgICAgVHJpZ2dlcnMuSW5pdGlhbGl6ZXJzLmFkZEdsb2JhbExpc3RlbmVycygpO1xuICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICAkLnRyaWdnZXJzSW5pdGlhbGl6ZWQgPSB0cnVlO1xuICB9XG5cbiAgaWYoRm91bmRhdGlvbikge1xuICAgIEZvdW5kYXRpb24uVHJpZ2dlcnMgPSBUcmlnZ2VycztcbiAgICAvLyBMZWdhY3kgaW5jbHVkZWQgdG8gYmUgYmFja3dhcmRzIGNvbXBhdGlibGUgZm9yIG5vdy5cbiAgICBGb3VuZGF0aW9uLklIZWFyWW91ID0gVHJpZ2dlcnMuSW5pdGlhbGl6ZXJzLmFkZEdsb2JhbExpc3RlbmVyc1xuICB9XG59XG5cbmV4cG9ydCB7VHJpZ2dlcnN9O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi51dGlsLnRyaWdnZXJzLmpzIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IHsgR2V0WW9EaWdpdHMgfSBmcm9tICcuL2ZvdW5kYXRpb24udXRpbC5jb3JlJztcblxuLy8gQWJzdHJhY3QgY2xhc3MgZm9yIHByb3ZpZGluZyBsaWZlY3ljbGUgaG9va3MuIEV4cGVjdCBwbHVnaW5zIHRvIGRlZmluZSBBVCBMRUFTVFxuLy8ge2Z1bmN0aW9ufSBfc2V0dXAgKHJlcGxhY2VzIHByZXZpb3VzIGNvbnN0cnVjdG9yKSxcbi8vIHtmdW5jdGlvbn0gX2Rlc3Ryb3kgKHJlcGxhY2VzIHByZXZpb3VzIGRlc3Ryb3kpXG5jbGFzcyBQbHVnaW4ge1xuXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICB0aGlzLl9zZXR1cChlbGVtZW50LCBvcHRpb25zKTtcbiAgICB2YXIgcGx1Z2luTmFtZSA9IGdldFBsdWdpbk5hbWUodGhpcyk7XG4gICAgdGhpcy51dWlkID0gR2V0WW9EaWdpdHMoNiwgcGx1Z2luTmFtZSk7XG5cbiAgICBpZighdGhpcy4kZWxlbWVudC5hdHRyKGBkYXRhLSR7cGx1Z2luTmFtZX1gKSl7IHRoaXMuJGVsZW1lbnQuYXR0cihgZGF0YS0ke3BsdWdpbk5hbWV9YCwgdGhpcy51dWlkKTsgfVxuICAgIGlmKCF0aGlzLiRlbGVtZW50LmRhdGEoJ3pmUGx1Z2luJykpeyB0aGlzLiRlbGVtZW50LmRhdGEoJ3pmUGx1Z2luJywgdGhpcyk7IH1cbiAgICAvKipcbiAgICAgKiBGaXJlcyB3aGVuIHRoZSBwbHVnaW4gaGFzIGluaXRpYWxpemVkLlxuICAgICAqIEBldmVudCBQbHVnaW4jaW5pdFxuICAgICAqL1xuICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlcihgaW5pdC56Zi4ke3BsdWdpbk5hbWV9YCk7XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHRoaXMuX2Rlc3Ryb3koKTtcbiAgICB2YXIgcGx1Z2luTmFtZSA9IGdldFBsdWdpbk5hbWUodGhpcyk7XG4gICAgdGhpcy4kZWxlbWVudC5yZW1vdmVBdHRyKGBkYXRhLSR7cGx1Z2luTmFtZX1gKS5yZW1vdmVEYXRhKCd6ZlBsdWdpbicpXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBGaXJlcyB3aGVuIHRoZSBwbHVnaW4gaGFzIGJlZW4gZGVzdHJveWVkLlxuICAgICAgICAgKiBAZXZlbnQgUGx1Z2luI2Rlc3Ryb3llZFxuICAgICAgICAgKi9cbiAgICAgICAgLnRyaWdnZXIoYGRlc3Ryb3llZC56Zi4ke3BsdWdpbk5hbWV9YCk7XG4gICAgZm9yKHZhciBwcm9wIGluIHRoaXMpe1xuICAgICAgdGhpc1twcm9wXSA9IG51bGw7Ly9jbGVhbiB1cCBzY3JpcHQgdG8gcHJlcCBmb3IgZ2FyYmFnZSBjb2xsZWN0aW9uLlxuICAgIH1cbiAgfVxufVxuXG4vLyBDb252ZXJ0IFBhc2NhbENhc2UgdG8ga2ViYWItY2FzZVxuLy8gVGhhbmsgeW91OiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS84OTU1NTgwXG5mdW5jdGlvbiBoeXBoZW5hdGUoc3RyKSB7XG4gIHJldHVybiBzdHIucmVwbGFjZSgvKFthLXpdKShbQS1aXSkvZywgJyQxLSQyJykudG9Mb3dlckNhc2UoKTtcbn1cblxuZnVuY3Rpb24gZ2V0UGx1Z2luTmFtZShvYmopIHtcbiAgaWYodHlwZW9mKG9iai5jb25zdHJ1Y3Rvci5uYW1lKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm4gaHlwaGVuYXRlKG9iai5jb25zdHJ1Y3Rvci5uYW1lKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gaHlwaGVuYXRlKG9iai5jbGFzc05hbWUpO1xuICB9XG59XG5cbmV4cG9ydCB7UGx1Z2lufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24ucGx1Z2luLmpzIiwiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcclxuXHJcbmltcG9ydCB3aGF0SW5wdXQgZnJvbSAnd2hhdC1pbnB1dCc7XHJcblxyXG53aW5kb3cuJCA9ICQ7XHJcblxyXG4vLyBpbXBvcnQgRm91bmRhdGlvbiBmcm9tICdmb3VuZGF0aW9uLXNpdGVzJztcclxuXHJcbi8vIElmIHlvdSB3YW50IHRvIHBpY2sgYW5kIGNob29zZSB3aGljaCBtb2R1bGVzIHRvIGluY2x1ZGUsIGNvbW1lbnQgb3V0IHRoZSBhYm92ZSBhbmQgdW5jb21tZW50XHJcbi8vIHRoZSBsaW5lIGJlbG93XHJcbmltcG9ydCAnLi9saWIvZm91bmRhdGlvbi1leHBsaWNpdC1waWVjZXMnO1xyXG5cclxuJChkb2N1bWVudCkuZm91bmRhdGlvbigpO1xyXG5cclxuJCgnLnRhYi1pbm5lcicpLmZpbHRlcignOmZpcnN0JykuYWRkQ2xhc3MoJ2FjdGl2ZS10YWInKTtcclxuJCgnLmJhLXRhYi1jaXJjbGUnKS5maWx0ZXIoJzpmaXJzdCcpLmFkZENsYXNzKCdhY3RpdmUtdGFiLWNpcmNsZScpO1xyXG5cclxuJCgnLmJhLXN5bXB0b21zLXRhYnMgLnRhYi1pbm5lcicpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgbGV0IHRhYl9pZCA9ICQodGhpcykuYXR0cignZGF0YS1pZCcpO1xyXG4gICAgJCgnLmJhLXN5bXB0b21zLWNvbnRlbnQnKS5maW5kKCcuYmEtdGFiLWNpcmNsZScpLnJlbW92ZUNsYXNzKCdhY3RpdmUtdGFiLWNpcmNsZScpLmhpZGUoKTtcclxuICAgICQoJy5iYS1zeW1wdG9tcy1jb250ZW50JykuZmluZCgnLnRhYi1pbm5lcicpLnJlbW92ZUNsYXNzKCdhY3RpdmUtdGFiJyk7XHJcbiAgICAkKHRoaXMpLmFkZENsYXNzKCdhY3RpdmUtdGFiJyk7XHJcbiAgICAkKCcjdGFiLWNpcmNsZS0nICsgdGFiX2lkKS5hZGRDbGFzcygnYWN0aXZlLXRhYi1jaXJjbGUnKS5mYWRlSW4oKTtcclxuICAgIHJldHVybiBmYWxzZTtcclxufSlcclxuXHJcbi8vIFRhYnNcclxuXHJcbiQoJy50YWJzLXRpdGxlJykuZmlsdGVyKCc6Zmlyc3QnKS5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiQoJy50YWJzLXRpdGxlIC5iYS10ZXN0aW1vbmlhbC1jYXQtYnV0dG9uJykuZmlsdGVyKCc6Zmlyc3QnKS5hdHRyKCdhcmlhLXNlbGVjdGVkJywgdHJ1ZSk7XHJcblxyXG4kKCcuYmEtdGVzdGltb25pYWwtY2F0LWJ1dHRvbicpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAkLmdldFNjcmlwdCggXCIvd3AtY29udGVudC90aGVtZXMvc3dlZGlzaGJpdHRlci9sb2FkbW9yZS5qc1wiLCBmdW5jdGlvbiggZGF0YSwgdGV4dFN0YXR1cywganF4aHIgKSB7XHJcblxyXG4gICAgfSk7XHJcbn0pO1xyXG5cclxubGV0IHRlc3RpbW9uaWFsX2NhdDtcclxuXHJcbiQoZnVuY3Rpb24oKXtcclxuICAgICQoJy5iYS10ZXN0aW1vbmlhbC1jYXQtYnV0dG9uJykuY2xpY2soZnVuY3Rpb24oKXtcclxuICAgICAgICB0ZXN0aW1vbmlhbF9jYXQgPSAkKHRoaXMpLmRhdGEoJ3Rlc3RpbW9uaWFscy1jYXQnKTtcclxuXHJcbiAgICAgICAgbGV0IGRhdGEgPSB7XHJcbiAgICAgICAgICAgIGFjdGlvbjogJ3NpbXBsZV90ZXN0aW1vbmlhbF92aWV3JyxcclxuICAgICAgICAgICAgdGVzdGltb25pYWxDYXQ6IHRlc3RpbW9uaWFsX2NhdFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgJC5wb3N0KGJhX2FqYXgsIGRhdGEsIGZ1bmN0aW9uKHJlc3BvbnNlKXtcclxuICAgICAgICAgICAgJCgnLmJhLXRlc3RpbW9uaWFscy1jb250ZW50X193cmFwcGVyJykuaHRtbChyZXNwb25zZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufSk7XHJcblxyXG4kKFwiLmJhLXN5bXB0b21zLXRlc3RpbW9uaWFsc1wiKS5vbihcImNsaWNrXCIsXCJhXCIsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTsgLy/QvtC/0YPRgdGC0L7RiNC40Lwg0YHRgtCw0L3QtNCw0YDRgtC90YPRjiDQvtCx0YDQsNCx0L7RgtC60YNcclxuICAgIHZhciBpZCAgPSAkKHRoaXMpLmF0dHIoJ2hyZWYnKSwgLy/Qt9Cw0LHQtdGA0LXQvCDQsNC50LTQuNGI0L3QuNC6INCx0LvQvtC60LAg0YEg0L/QsNGA0LDQvNC10YLRgNC+0LwgVVJMXHJcbiAgICAgICAgdG9wID0gJChpZCkub2Zmc2V0KCkudG9wOyAvL9C+0L/RgNC10LTQtdC70LjQvCDQstGL0YHQvtGC0YMg0L7RgiDQvdCw0YfQsNC70LAg0YHRgtGA0LDQvdC40YbRiyDQtNC+INGP0LrQvtGA0Y9cclxuICAgICQoJ2JvZHksaHRtbCcpLmFuaW1hdGUoe3Njcm9sbFRvcDogdG9wfSwgMTAwMCk7IC8v0YHQtNC10LvQsNC10Lwg0L/RgNC+0LrRgNGD0YLQutGDINC30LAgMSDRgVxyXG59KTtcclxuXHJcbiQoJ1tkYXRhLWZhbmN5Ym94XScpLmZhbmN5Ym94KHtcclxuICAgIHRvdWNoOiBmYWxzZVxyXG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXNzZXRzL2pzL2FwcC5qcyIsIi8qKlxuICogd2hhdC1pbnB1dCAtIEEgZ2xvYmFsIHV0aWxpdHkgZm9yIHRyYWNraW5nIHRoZSBjdXJyZW50IGlucHV0IG1ldGhvZCAobW91c2UsIGtleWJvYXJkIG9yIHRvdWNoKS5cbiAqIEB2ZXJzaW9uIHY0LjMuMVxuICogQGxpbmsgaHR0cHM6Ly9naXRodWIuY29tL3RlbjFzZXZlbi93aGF0LWlucHV0XG4gKiBAbGljZW5zZSBNSVRcbiAqL1xuKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoXCJ3aGF0SW5wdXRcIiwgW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wid2hhdElucHV0XCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIndoYXRJbnB1dFwiXSA9IGZhY3RvcnkoKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIC8qKioqKiovIChmdW5jdGlvbihtb2R1bGVzKSB7IC8vIHdlYnBhY2tCb290c3RyYXBcbi8qKioqKiovIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuLyoqKioqKi8gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4vKioqKioqLyBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4vKioqKioqLyBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuLyoqKioqKi8gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuLyoqKioqKi8gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuLyoqKioqKi8gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbi8qKioqKiovIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuLyoqKioqKi8gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbi8qKioqKiovIFx0XHRcdGV4cG9ydHM6IHt9LFxuLyoqKioqKi8gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuLyoqKioqKi8gXHRcdFx0bG9hZGVkOiBmYWxzZVxuLyoqKioqKi8gXHRcdH07XG5cbi8qKioqKiovIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbi8qKioqKiovIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuLyoqKioqKi8gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbi8qKioqKiovIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuLyoqKioqKi8gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4vKioqKioqLyBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuLyoqKioqKi8gXHR9XG5cblxuLyoqKioqKi8gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4vKioqKioqLyBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbi8qKioqKiovIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuLyoqKioqKi8gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8qKioqKiovIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG4vKioqKioqLyB9KVxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKioqKiovIChbXG4vKiAwICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG5cdCAgLypcblx0ICAgKiB2YXJpYWJsZXNcblx0ICAgKi9cblxuXHQgIC8vIGxhc3QgdXNlZCBpbnB1dCB0eXBlXG5cdCAgdmFyIGN1cnJlbnRJbnB1dCA9ICdpbml0aWFsJztcblxuXHQgIC8vIGxhc3QgdXNlZCBpbnB1dCBpbnRlbnRcblx0ICB2YXIgY3VycmVudEludGVudCA9IG51bGw7XG5cblx0ICAvLyBjYWNoZSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnRcblx0ICB2YXIgZG9jID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuXG5cdCAgLy8gZm9ybSBpbnB1dCB0eXBlc1xuXHQgIHZhciBmb3JtSW5wdXRzID0gWydpbnB1dCcsICdzZWxlY3QnLCAndGV4dGFyZWEnXTtcblxuXHQgIHZhciBmdW5jdGlvbkxpc3QgPSBbXTtcblxuXHQgIC8vIGxpc3Qgb2YgbW9kaWZpZXIga2V5cyBjb21tb25seSB1c2VkIHdpdGggdGhlIG1vdXNlIGFuZFxuXHQgIC8vIGNhbiBiZSBzYWZlbHkgaWdub3JlZCB0byBwcmV2ZW50IGZhbHNlIGtleWJvYXJkIGRldGVjdGlvblxuXHQgIHZhciBpZ25vcmVNYXAgPSBbMTYsIC8vIHNoaWZ0XG5cdCAgMTcsIC8vIGNvbnRyb2xcblx0ICAxOCwgLy8gYWx0XG5cdCAgOTEsIC8vIFdpbmRvd3Mga2V5IC8gbGVmdCBBcHBsZSBjbWRcblx0ICA5MyAvLyBXaW5kb3dzIG1lbnUgLyByaWdodCBBcHBsZSBjbWRcblx0ICBdO1xuXG5cdCAgLy8gbGlzdCBvZiBrZXlzIGZvciB3aGljaCB3ZSBjaGFuZ2UgaW50ZW50IGV2ZW4gZm9yIGZvcm0gaW5wdXRzXG5cdCAgdmFyIGNoYW5nZUludGVudE1hcCA9IFs5IC8vIHRhYlxuXHQgIF07XG5cblx0ICAvLyBtYXBwaW5nIG9mIGV2ZW50cyB0byBpbnB1dCB0eXBlc1xuXHQgIHZhciBpbnB1dE1hcCA9IHtcblx0ICAgIGtleWRvd246ICdrZXlib2FyZCcsXG5cdCAgICBrZXl1cDogJ2tleWJvYXJkJyxcblx0ICAgIG1vdXNlZG93bjogJ21vdXNlJyxcblx0ICAgIG1vdXNlbW92ZTogJ21vdXNlJyxcblx0ICAgIE1TUG9pbnRlckRvd246ICdwb2ludGVyJyxcblx0ICAgIE1TUG9pbnRlck1vdmU6ICdwb2ludGVyJyxcblx0ICAgIHBvaW50ZXJkb3duOiAncG9pbnRlcicsXG5cdCAgICBwb2ludGVybW92ZTogJ3BvaW50ZXInLFxuXHQgICAgdG91Y2hzdGFydDogJ3RvdWNoJ1xuXHQgIH07XG5cblx0ICAvLyBhcnJheSBvZiBhbGwgdXNlZCBpbnB1dCB0eXBlc1xuXHQgIHZhciBpbnB1dFR5cGVzID0gW107XG5cblx0ICAvLyBib29sZWFuOiB0cnVlIGlmIHRvdWNoIGJ1ZmZlciBpcyBhY3RpdmVcblx0ICB2YXIgaXNCdWZmZXJpbmcgPSBmYWxzZTtcblxuXHQgIC8vIGJvb2xlYW46IHRydWUgaWYgdGhlIHBhZ2UgaXMgYmVpbmcgc2Nyb2xsZWRcblx0ICB2YXIgaXNTY3JvbGxpbmcgPSBmYWxzZTtcblxuXHQgIC8vIHN0b3JlIGN1cnJlbnQgbW91c2UgcG9zaXRpb25cblx0ICB2YXIgbW91c2VQb3MgPSB7XG5cdCAgICB4OiBudWxsLFxuXHQgICAgeTogbnVsbFxuXHQgIH07XG5cblx0ICAvLyBtYXAgb2YgSUUgMTAgcG9pbnRlciBldmVudHNcblx0ICB2YXIgcG9pbnRlck1hcCA9IHtcblx0ICAgIDI6ICd0b3VjaCcsXG5cdCAgICAzOiAndG91Y2gnLCAvLyB0cmVhdCBwZW4gbGlrZSB0b3VjaFxuXHQgICAgNDogJ21vdXNlJ1xuXHQgIH07XG5cblx0ICB2YXIgc3VwcG9ydHNQYXNzaXZlID0gZmFsc2U7XG5cblx0ICB0cnkge1xuXHQgICAgdmFyIG9wdHMgPSBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sICdwYXNzaXZlJywge1xuXHQgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcblx0ICAgICAgICBzdXBwb3J0c1Bhc3NpdmUgPSB0cnVlO1xuXHQgICAgICB9XG5cdCAgICB9KTtcblxuXHQgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Rlc3QnLCBudWxsLCBvcHRzKTtcblx0ICB9IGNhdGNoIChlKSB7fVxuXG5cdCAgLypcblx0ICAgKiBzZXQgdXBcblx0ICAgKi9cblxuXHQgIHZhciBzZXRVcCA9IGZ1bmN0aW9uIHNldFVwKCkge1xuXHQgICAgLy8gYWRkIGNvcnJlY3QgbW91c2Ugd2hlZWwgZXZlbnQgbWFwcGluZyB0byBgaW5wdXRNYXBgXG5cdCAgICBpbnB1dE1hcFtkZXRlY3RXaGVlbCgpXSA9ICdtb3VzZSc7XG5cblx0ICAgIGFkZExpc3RlbmVycygpO1xuXHQgICAgc2V0SW5wdXQoKTtcblx0ICB9O1xuXG5cdCAgLypcblx0ICAgKiBldmVudHNcblx0ICAgKi9cblxuXHQgIHZhciBhZGRMaXN0ZW5lcnMgPSBmdW5jdGlvbiBhZGRMaXN0ZW5lcnMoKSB7XG5cdCAgICAvLyBgcG9pbnRlcm1vdmVgLCBgTVNQb2ludGVyTW92ZWAsIGBtb3VzZW1vdmVgIGFuZCBtb3VzZSB3aGVlbCBldmVudCBiaW5kaW5nXG5cdCAgICAvLyBjYW4gb25seSBkZW1vbnN0cmF0ZSBwb3RlbnRpYWwsIGJ1dCBub3QgYWN0dWFsLCBpbnRlcmFjdGlvblxuXHQgICAgLy8gYW5kIGFyZSB0cmVhdGVkIHNlcGFyYXRlbHlcblx0ICAgIHZhciBvcHRpb25zID0gc3VwcG9ydHNQYXNzaXZlID8geyBwYXNzaXZlOiB0cnVlIH0gOiBmYWxzZTtcblxuXHQgICAgLy8gcG9pbnRlciBldmVudHMgKG1vdXNlLCBwZW4sIHRvdWNoKVxuXHQgICAgaWYgKHdpbmRvdy5Qb2ludGVyRXZlbnQpIHtcblx0ICAgICAgZG9jLmFkZEV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJkb3duJywgdXBkYXRlSW5wdXQpO1xuXHQgICAgICBkb2MuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcm1vdmUnLCBzZXRJbnRlbnQpO1xuXHQgICAgfSBlbHNlIGlmICh3aW5kb3cuTVNQb2ludGVyRXZlbnQpIHtcblx0ICAgICAgZG9jLmFkZEV2ZW50TGlzdGVuZXIoJ01TUG9pbnRlckRvd24nLCB1cGRhdGVJbnB1dCk7XG5cdCAgICAgIGRvYy5hZGRFdmVudExpc3RlbmVyKCdNU1BvaW50ZXJNb3ZlJywgc2V0SW50ZW50KTtcblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgIC8vIG1vdXNlIGV2ZW50c1xuXHQgICAgICBkb2MuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdXBkYXRlSW5wdXQpO1xuXHQgICAgICBkb2MuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgc2V0SW50ZW50KTtcblxuXHQgICAgICAvLyB0b3VjaCBldmVudHNcblx0ICAgICAgaWYgKCdvbnRvdWNoc3RhcnQnIGluIHdpbmRvdykge1xuXHQgICAgICAgIGRvYy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdG91Y2hCdWZmZXIsIG9wdGlvbnMpO1xuXHQgICAgICAgIGRvYy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRvdWNoQnVmZmVyKTtcblx0ICAgICAgfVxuXHQgICAgfVxuXG5cdCAgICAvLyBtb3VzZSB3aGVlbFxuXHQgICAgZG9jLmFkZEV2ZW50TGlzdGVuZXIoZGV0ZWN0V2hlZWwoKSwgc2V0SW50ZW50LCBvcHRpb25zKTtcblxuXHQgICAgLy8ga2V5Ym9hcmQgZXZlbnRzXG5cdCAgICBkb2MuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHVwZGF0ZUlucHV0KTtcblx0ICAgIGRvYy5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIHVwZGF0ZUlucHV0KTtcblx0ICB9O1xuXG5cdCAgLy8gY2hlY2tzIGNvbmRpdGlvbnMgYmVmb3JlIHVwZGF0aW5nIG5ldyBpbnB1dFxuXHQgIHZhciB1cGRhdGVJbnB1dCA9IGZ1bmN0aW9uIHVwZGF0ZUlucHV0KGV2ZW50KSB7XG5cdCAgICAvLyBvbmx5IGV4ZWN1dGUgaWYgdGhlIHRvdWNoIGJ1ZmZlciB0aW1lciBpc24ndCBydW5uaW5nXG5cdCAgICBpZiAoIWlzQnVmZmVyaW5nKSB7XG5cdCAgICAgIHZhciBldmVudEtleSA9IGV2ZW50LndoaWNoO1xuXHQgICAgICB2YXIgdmFsdWUgPSBpbnB1dE1hcFtldmVudC50eXBlXTtcblx0ICAgICAgaWYgKHZhbHVlID09PSAncG9pbnRlcicpIHZhbHVlID0gcG9pbnRlclR5cGUoZXZlbnQpO1xuXG5cdCAgICAgIGlmIChjdXJyZW50SW5wdXQgIT09IHZhbHVlIHx8IGN1cnJlbnRJbnRlbnQgIT09IHZhbHVlKSB7XG5cdCAgICAgICAgdmFyIGFjdGl2ZUVsZW0gPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuXHQgICAgICAgIHZhciBhY3RpdmVJbnB1dCA9IGZhbHNlO1xuXHQgICAgICAgIHZhciBub3RGb3JtSW5wdXQgPSBhY3RpdmVFbGVtICYmIGFjdGl2ZUVsZW0ubm9kZU5hbWUgJiYgZm9ybUlucHV0cy5pbmRleE9mKGFjdGl2ZUVsZW0ubm9kZU5hbWUudG9Mb3dlckNhc2UoKSkgPT09IC0xO1xuXG5cdCAgICAgICAgaWYgKG5vdEZvcm1JbnB1dCB8fCBjaGFuZ2VJbnRlbnRNYXAuaW5kZXhPZihldmVudEtleSkgIT09IC0xKSB7XG5cdCAgICAgICAgICBhY3RpdmVJbnB1dCA9IHRydWU7XG5cdCAgICAgICAgfVxuXG5cdCAgICAgICAgaWYgKHZhbHVlID09PSAndG91Y2gnIHx8XG5cdCAgICAgICAgLy8gaWdub3JlIG1vdXNlIG1vZGlmaWVyIGtleXNcblx0ICAgICAgICB2YWx1ZSA9PT0gJ21vdXNlJyB8fFxuXHQgICAgICAgIC8vIGRvbid0IHN3aXRjaCBpZiB0aGUgY3VycmVudCBlbGVtZW50IGlzIGEgZm9ybSBpbnB1dFxuXHQgICAgICAgIHZhbHVlID09PSAna2V5Ym9hcmQnICYmIGV2ZW50S2V5ICYmIGFjdGl2ZUlucHV0ICYmIGlnbm9yZU1hcC5pbmRleE9mKGV2ZW50S2V5KSA9PT0gLTEpIHtcblx0ICAgICAgICAgIC8vIHNldCB0aGUgY3VycmVudCBhbmQgY2F0Y2gtYWxsIHZhcmlhYmxlXG5cdCAgICAgICAgICBjdXJyZW50SW5wdXQgPSBjdXJyZW50SW50ZW50ID0gdmFsdWU7XG5cblx0ICAgICAgICAgIHNldElucHV0KCk7XG5cdCAgICAgICAgfVxuXHQgICAgICB9XG5cdCAgICB9XG5cdCAgfTtcblxuXHQgIC8vIHVwZGF0ZXMgdGhlIGRvYyBhbmQgYGlucHV0VHlwZXNgIGFycmF5IHdpdGggbmV3IGlucHV0XG5cdCAgdmFyIHNldElucHV0ID0gZnVuY3Rpb24gc2V0SW5wdXQoKSB7XG5cdCAgICBkb2Muc2V0QXR0cmlidXRlKCdkYXRhLXdoYXRpbnB1dCcsIGN1cnJlbnRJbnB1dCk7XG5cdCAgICBkb2Muc2V0QXR0cmlidXRlKCdkYXRhLXdoYXRpbnRlbnQnLCBjdXJyZW50SW5wdXQpO1xuXG5cdCAgICBpZiAoaW5wdXRUeXBlcy5pbmRleE9mKGN1cnJlbnRJbnB1dCkgPT09IC0xKSB7XG5cdCAgICAgIGlucHV0VHlwZXMucHVzaChjdXJyZW50SW5wdXQpO1xuXHQgICAgICBkb2MuY2xhc3NOYW1lICs9ICcgd2hhdGlucHV0LXR5cGVzLScgKyBjdXJyZW50SW5wdXQ7XG5cdCAgICB9XG5cblx0ICAgIGZpcmVGdW5jdGlvbnMoJ2lucHV0Jyk7XG5cdCAgfTtcblxuXHQgIC8vIHVwZGF0ZXMgaW5wdXQgaW50ZW50IGZvciBgbW91c2Vtb3ZlYCBhbmQgYHBvaW50ZXJtb3ZlYFxuXHQgIHZhciBzZXRJbnRlbnQgPSBmdW5jdGlvbiBzZXRJbnRlbnQoZXZlbnQpIHtcblx0ICAgIC8vIHRlc3QgdG8gc2VlIGlmIGBtb3VzZW1vdmVgIGhhcHBlbmVkIHJlbGF0aXZlIHRvIHRoZSBzY3JlZW5cblx0ICAgIC8vIHRvIGRldGVjdCBzY3JvbGxpbmcgdmVyc3VzIG1vdXNlbW92ZVxuXHQgICAgaWYgKG1vdXNlUG9zWyd4J10gIT09IGV2ZW50LnNjcmVlblggfHwgbW91c2VQb3NbJ3knXSAhPT0gZXZlbnQuc2NyZWVuWSkge1xuXHQgICAgICBpc1Njcm9sbGluZyA9IGZhbHNlO1xuXG5cdCAgICAgIG1vdXNlUG9zWyd4J10gPSBldmVudC5zY3JlZW5YO1xuXHQgICAgICBtb3VzZVBvc1sneSddID0gZXZlbnQuc2NyZWVuWTtcblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgIGlzU2Nyb2xsaW5nID0gdHJ1ZTtcblx0ICAgIH1cblxuXHQgICAgLy8gb25seSBleGVjdXRlIGlmIHRoZSB0b3VjaCBidWZmZXIgdGltZXIgaXNuJ3QgcnVubmluZ1xuXHQgICAgLy8gb3Igc2Nyb2xsaW5nIGlzbid0IGhhcHBlbmluZ1xuXHQgICAgaWYgKCFpc0J1ZmZlcmluZyAmJiAhaXNTY3JvbGxpbmcpIHtcblx0ICAgICAgdmFyIHZhbHVlID0gaW5wdXRNYXBbZXZlbnQudHlwZV07XG5cdCAgICAgIGlmICh2YWx1ZSA9PT0gJ3BvaW50ZXInKSB2YWx1ZSA9IHBvaW50ZXJUeXBlKGV2ZW50KTtcblxuXHQgICAgICBpZiAoY3VycmVudEludGVudCAhPT0gdmFsdWUpIHtcblx0ICAgICAgICBjdXJyZW50SW50ZW50ID0gdmFsdWU7XG5cblx0ICAgICAgICBkb2Muc2V0QXR0cmlidXRlKCdkYXRhLXdoYXRpbnRlbnQnLCBjdXJyZW50SW50ZW50KTtcblxuXHQgICAgICAgIGZpcmVGdW5jdGlvbnMoJ2ludGVudCcpO1xuXHQgICAgICB9XG5cdCAgICB9XG5cdCAgfTtcblxuXHQgIC8vIGJ1ZmZlcnMgdG91Y2ggZXZlbnRzIGJlY2F1c2UgdGhleSBmcmVxdWVudGx5IGFsc28gZmlyZSBtb3VzZSBldmVudHNcblx0ICB2YXIgdG91Y2hCdWZmZXIgPSBmdW5jdGlvbiB0b3VjaEJ1ZmZlcihldmVudCkge1xuXHQgICAgaWYgKGV2ZW50LnR5cGUgPT09ICd0b3VjaHN0YXJ0Jykge1xuXHQgICAgICBpc0J1ZmZlcmluZyA9IGZhbHNlO1xuXG5cdCAgICAgIC8vIHNldCB0aGUgY3VycmVudCBpbnB1dFxuXHQgICAgICB1cGRhdGVJbnB1dChldmVudCk7XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICBpc0J1ZmZlcmluZyA9IHRydWU7XG5cdCAgICB9XG5cdCAgfTtcblxuXHQgIHZhciBmaXJlRnVuY3Rpb25zID0gZnVuY3Rpb24gZmlyZUZ1bmN0aW9ucyh0eXBlKSB7XG5cdCAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gZnVuY3Rpb25MaXN0Lmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG5cdCAgICAgIGlmIChmdW5jdGlvbkxpc3RbaV0udHlwZSA9PT0gdHlwZSkge1xuXHQgICAgICAgIGZ1bmN0aW9uTGlzdFtpXS5mbi5jYWxsKHVuZGVmaW5lZCwgY3VycmVudEludGVudCk7XG5cdCAgICAgIH1cblx0ICAgIH1cblx0ICB9O1xuXG5cdCAgLypcblx0ICAgKiB1dGlsaXRpZXNcblx0ICAgKi9cblxuXHQgIHZhciBwb2ludGVyVHlwZSA9IGZ1bmN0aW9uIHBvaW50ZXJUeXBlKGV2ZW50KSB7XG5cdCAgICBpZiAodHlwZW9mIGV2ZW50LnBvaW50ZXJUeXBlID09PSAnbnVtYmVyJykge1xuXHQgICAgICByZXR1cm4gcG9pbnRlck1hcFtldmVudC5wb2ludGVyVHlwZV07XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICAvLyB0cmVhdCBwZW4gbGlrZSB0b3VjaFxuXHQgICAgICByZXR1cm4gZXZlbnQucG9pbnRlclR5cGUgPT09ICdwZW4nID8gJ3RvdWNoJyA6IGV2ZW50LnBvaW50ZXJUeXBlO1xuXHQgICAgfVxuXHQgIH07XG5cblx0ICAvLyBkZXRlY3QgdmVyc2lvbiBvZiBtb3VzZSB3aGVlbCBldmVudCB0byB1c2Vcblx0ICAvLyB2aWEgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvRXZlbnRzL3doZWVsXG5cdCAgdmFyIGRldGVjdFdoZWVsID0gZnVuY3Rpb24gZGV0ZWN0V2hlZWwoKSB7XG5cdCAgICB2YXIgd2hlZWxUeXBlID0gdm9pZCAwO1xuXG5cdCAgICAvLyBNb2Rlcm4gYnJvd3NlcnMgc3VwcG9ydCBcIndoZWVsXCJcblx0ICAgIGlmICgnb253aGVlbCcgaW4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JykpIHtcblx0ICAgICAgd2hlZWxUeXBlID0gJ3doZWVsJztcblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgIC8vIFdlYmtpdCBhbmQgSUUgc3VwcG9ydCBhdCBsZWFzdCBcIm1vdXNld2hlZWxcIlxuXHQgICAgICAvLyBvciBhc3N1bWUgdGhhdCByZW1haW5pbmcgYnJvd3NlcnMgYXJlIG9sZGVyIEZpcmVmb3hcblx0ICAgICAgd2hlZWxUeXBlID0gZG9jdW1lbnQub25tb3VzZXdoZWVsICE9PSB1bmRlZmluZWQgPyAnbW91c2V3aGVlbCcgOiAnRE9NTW91c2VTY3JvbGwnO1xuXHQgICAgfVxuXG5cdCAgICByZXR1cm4gd2hlZWxUeXBlO1xuXHQgIH07XG5cblx0ICB2YXIgb2JqUG9zID0gZnVuY3Rpb24gb2JqUG9zKG1hdGNoKSB7XG5cdCAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gZnVuY3Rpb25MaXN0Lmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG5cdCAgICAgIGlmIChmdW5jdGlvbkxpc3RbaV0uZm4gPT09IG1hdGNoKSB7XG5cdCAgICAgICAgcmV0dXJuIGk7XG5cdCAgICAgIH1cblx0ICAgIH1cblx0ICB9O1xuXG5cdCAgLypcblx0ICAgKiBpbml0XG5cdCAgICovXG5cblx0ICAvLyBkb24ndCBzdGFydCBzY3JpcHQgdW5sZXNzIGJyb3dzZXIgY3V0cyB0aGUgbXVzdGFyZFxuXHQgIC8vIChhbHNvIHBhc3NlcyBpZiBwb2x5ZmlsbHMgYXJlIHVzZWQpXG5cdCAgaWYgKCdhZGRFdmVudExpc3RlbmVyJyBpbiB3aW5kb3cgJiYgQXJyYXkucHJvdG90eXBlLmluZGV4T2YpIHtcblx0ICAgIHNldFVwKCk7XG5cdCAgfVxuXG5cdCAgLypcblx0ICAgKiBhcGlcblx0ICAgKi9cblxuXHQgIHJldHVybiB7XG5cdCAgICAvLyByZXR1cm5zIHN0cmluZzogdGhlIGN1cnJlbnQgaW5wdXQgdHlwZVxuXHQgICAgLy8gb3B0OiAnbG9vc2UnfCdzdHJpY3QnXG5cdCAgICAvLyAnc3RyaWN0JyAoZGVmYXVsdCk6IHJldHVybnMgdGhlIHNhbWUgdmFsdWUgYXMgdGhlIGBkYXRhLXdoYXRpbnB1dGAgYXR0cmlidXRlXG5cdCAgICAvLyAnbG9vc2UnOiBpbmNsdWRlcyBgZGF0YS13aGF0aW50ZW50YCB2YWx1ZSBpZiBpdCdzIG1vcmUgY3VycmVudCB0aGFuIGBkYXRhLXdoYXRpbnB1dGBcblx0ICAgIGFzazogZnVuY3Rpb24gYXNrKG9wdCkge1xuXHQgICAgICByZXR1cm4gb3B0ID09PSAnbG9vc2UnID8gY3VycmVudEludGVudCA6IGN1cnJlbnRJbnB1dDtcblx0ICAgIH0sXG5cblx0ICAgIC8vIHJldHVybnMgYXJyYXk6IGFsbCB0aGUgZGV0ZWN0ZWQgaW5wdXQgdHlwZXNcblx0ICAgIHR5cGVzOiBmdW5jdGlvbiB0eXBlcygpIHtcblx0ICAgICAgcmV0dXJuIGlucHV0VHlwZXM7XG5cdCAgICB9LFxuXG5cdCAgICAvLyBvdmVyd3JpdGVzIGlnbm9yZWQga2V5cyB3aXRoIHByb3ZpZGVkIGFycmF5XG5cdCAgICBpZ25vcmVLZXlzOiBmdW5jdGlvbiBpZ25vcmVLZXlzKGFycikge1xuXHQgICAgICBpZ25vcmVNYXAgPSBhcnI7XG5cdCAgICB9LFxuXG5cdCAgICAvLyBhdHRhY2ggZnVuY3Rpb25zIHRvIGlucHV0IGFuZCBpbnRlbnQgXCJldmVudHNcIlxuXHQgICAgLy8gZnVuY3Q6IGZ1bmN0aW9uIHRvIGZpcmUgb24gY2hhbmdlXG5cdCAgICAvLyBldmVudFR5cGU6ICdpbnB1dCd8J2ludGVudCdcblx0ICAgIHJlZ2lzdGVyT25DaGFuZ2U6IGZ1bmN0aW9uIHJlZ2lzdGVyT25DaGFuZ2UoZm4sIGV2ZW50VHlwZSkge1xuXHQgICAgICBmdW5jdGlvbkxpc3QucHVzaCh7XG5cdCAgICAgICAgZm46IGZuLFxuXHQgICAgICAgIHR5cGU6IGV2ZW50VHlwZSB8fCAnaW5wdXQnXG5cdCAgICAgIH0pO1xuXHQgICAgfSxcblxuXHQgICAgdW5SZWdpc3Rlck9uQ2hhbmdlOiBmdW5jdGlvbiB1blJlZ2lzdGVyT25DaGFuZ2UoZm4pIHtcblx0ICAgICAgdmFyIHBvc2l0aW9uID0gb2JqUG9zKGZuKTtcblxuXHQgICAgICBpZiAocG9zaXRpb24pIHtcblx0ICAgICAgICBmdW5jdGlvbkxpc3Quc3BsaWNlKHBvc2l0aW9uLCAxKTtcblx0ICAgICAgfVxuXHQgICAgfVxuXHQgIH07XG5cdH0oKTtcblxuLyoqKi8gfVxuLyoqKioqKi8gXSlcbn0pO1xuO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3doYXQtaW5wdXQvZGlzdC93aGF0LWlucHV0LmpzXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XHJcbmltcG9ydCB7IEZvdW5kYXRpb24gfSBmcm9tICdmb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24uY29yZSc7XHJcbi8vIGltcG9ydCB7IHJ0bCwgR2V0WW9EaWdpdHMsIHRyYW5zaXRpb25lbmQgfSBmcm9tICdmb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24udXRpbC5jb3JlJztcclxuLy8gaW1wb3J0IHsgQm94IH0gZnJvbSAnZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLnV0aWwuYm94J1xyXG4vLyBpbXBvcnQgeyBvbkltYWdlc0xvYWRlZCB9IGZyb20gJ2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi51dGlsLmltYWdlTG9hZGVyJztcclxuaW1wb3J0IHsgS2V5Ym9hcmQgfSBmcm9tICdmb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24udXRpbC5rZXlib2FyZCc7XHJcbmltcG9ydCB7IE1lZGlhUXVlcnkgfSBmcm9tICdmb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24udXRpbC5tZWRpYVF1ZXJ5JztcclxuLy8gaW1wb3J0IHsgTW90aW9uLCBNb3ZlIH0gZnJvbSAnZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLnV0aWwubW90aW9uJztcclxuLy8gaW1wb3J0IHsgTmVzdCB9IGZyb20gJ2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi51dGlsLm5lc3QnO1xyXG4vLyBpbXBvcnQgeyBUaW1lciB9IGZyb20gJ2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi51dGlsLnRpbWVyJztcclxuLy8gaW1wb3J0IHsgVG91Y2ggfSBmcm9tICdmb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24udXRpbC50b3VjaCc7XHJcbmltcG9ydCB7IFRyaWdnZXJzIH0gZnJvbSAnZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLnV0aWwudHJpZ2dlcnMnO1xyXG4vLyBpbXBvcnQgeyBBYmlkZSB9IGZyb20gJ2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi5hYmlkZSc7XHJcbi8vIGltcG9ydCB7IEFjY29yZGlvbiB9IGZyb20gJ2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi5hY2NvcmRpb24nO1xyXG4vLyBpbXBvcnQgeyBBY2NvcmRpb25NZW51IH0gZnJvbSAnZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLmFjY29yZGlvbk1lbnUnO1xyXG4vLyBpbXBvcnQgeyBEcmlsbGRvd24gfSBmcm9tICdmb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24uZHJpbGxkb3duJztcclxuLy8gaW1wb3J0IHsgRHJvcGRvd24gfSBmcm9tICdmb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24uZHJvcGRvd24nO1xyXG4vLyBpbXBvcnQgeyBEcm9wZG93bk1lbnUgfSBmcm9tICdmb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24uZHJvcGRvd25NZW51JztcclxuLy8gaW1wb3J0IHsgRXF1YWxpemVyIH0gZnJvbSAnZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLmVxdWFsaXplcic7XHJcbi8vIGltcG9ydCB7IEludGVyY2hhbmdlIH0gZnJvbSAnZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLmludGVyY2hhbmdlJztcclxuLy8gaW1wb3J0IHsgTWFnZWxsYW4gfSBmcm9tICdmb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24ubWFnZWxsYW4nO1xyXG5pbXBvcnQgeyBPZmZDYW52YXMgfSBmcm9tICdmb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24ub2ZmY2FudmFzJztcclxuLy8gaW1wb3J0IHsgT3JiaXQgfSBmcm9tICdmb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24ub3JiaXQnO1xyXG4vLyBpbXBvcnQgeyBSZXNwb25zaXZlTWVudSB9IGZyb20gJ2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi5yZXNwb25zaXZlTWVudSc7XHJcbi8vIGltcG9ydCB7IFJlc3BvbnNpdmVUb2dnbGUgfSBmcm9tICdmb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24ucmVzcG9uc2l2ZVRvZ2dsZSc7XHJcbi8vIGltcG9ydCB7IFJldmVhbCB9IGZyb20gJ2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi5yZXZlYWwnO1xyXG4vLyBpbXBvcnQgeyBTbGlkZXIgfSBmcm9tICdmb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24uc2xpZGVyJztcclxuLy8gaW1wb3J0IHsgU21vb3RoU2Nyb2xsIH0gZnJvbSAnZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLnNtb290aFNjcm9sbCc7XHJcbi8vIGltcG9ydCB7IFN0aWNreSB9IGZyb20gJ2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi5zdGlja3knO1xyXG5pbXBvcnQgeyBUYWJzIH0gZnJvbSAnZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLnRhYnMnO1xyXG4vLyBpbXBvcnQgeyBUb2dnbGVyIH0gZnJvbSAnZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLnRvZ2dsZXInO1xyXG4vLyBpbXBvcnQgeyBUb29sdGlwIH0gZnJvbSAnZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLnRvb2x0aXAnO1xyXG4vLyBpbXBvcnQgeyBSZXNwb25zaXZlQWNjb3JkaW9uVGFicyB9IGZyb20gJ2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi5yZXNwb25zaXZlQWNjb3JkaW9uVGFicyc7XHJcblxyXG5cclxuRm91bmRhdGlvbi5hZGRUb0pxdWVyeSgkKTtcclxuXHJcbi8vIEFkZCBGb3VuZGF0aW9uIFV0aWxzIHRvIEZvdW5kYXRpb24gZ2xvYmFsIG5hbWVzcGFjZSBmb3IgYmFja3dhcmRzXHJcbi8vIGNvbXBhdGliaWxpdHkuXHJcblxyXG4vLyBGb3VuZGF0aW9uLnJ0bCA9IHJ0bDtcclxuLy8gRm91bmRhdGlvbi5HZXRZb0RpZ2l0cyA9IEdldFlvRGlnaXRzO1xyXG4vLyBGb3VuZGF0aW9uLnRyYW5zaXRpb25lbmQgPSB0cmFuc2l0aW9uZW5kO1xyXG4vL1xyXG4vLyBGb3VuZGF0aW9uLkJveCA9IEJveDtcclxuLy8gRm91bmRhdGlvbi5vbkltYWdlc0xvYWRlZCA9IG9uSW1hZ2VzTG9hZGVkO1xyXG5Gb3VuZGF0aW9uLktleWJvYXJkID0gS2V5Ym9hcmQ7XHJcbkZvdW5kYXRpb24uTWVkaWFRdWVyeSA9IE1lZGlhUXVlcnk7XHJcbi8vIEZvdW5kYXRpb24uTW90aW9uID0gTW90aW9uO1xyXG4vLyBGb3VuZGF0aW9uLk1vdmUgPSBNb3ZlO1xyXG4vLyBGb3VuZGF0aW9uLk5lc3QgPSBOZXN0O1xyXG4vLyBGb3VuZGF0aW9uLlRpbWVyID0gVGltZXI7XHJcblxyXG4vLyBUb3VjaCBhbmQgVHJpZ2dlcnMgcHJldmlvdXNseSB3ZXJlIGFsbW9zdCBwdXJlbHkgc2VkZSBlZmZlY3QgZHJpdmVuLFxyXG4vLyBzbyBubyAvLyBuZWVkIHRvIGFkZCBpdCB0byBGb3VuZGF0aW9uLCBqdXN0IGluaXQgdGhlbS5cclxuXHJcbi8vIFRvdWNoLmluaXQoJCk7XHJcblxyXG5UcmlnZ2Vycy5pbml0KCQsIEZvdW5kYXRpb24pO1xyXG4vL1xyXG4vLyBGb3VuZGF0aW9uLnBsdWdpbihBYmlkZSwgJ0FiaWRlJyk7XHJcbi8vXHJcbi8vIEZvdW5kYXRpb24ucGx1Z2luKEFjY29yZGlvbiwgJ0FjY29yZGlvbicpO1xyXG4vL1xyXG4vLyBGb3VuZGF0aW9uLnBsdWdpbihBY2NvcmRpb25NZW51LCAnQWNjb3JkaW9uTWVudScpO1xyXG4vL1xyXG4vLyBGb3VuZGF0aW9uLnBsdWdpbihEcmlsbGRvd24sICdEcmlsbGRvd24nKTtcclxuLy9cclxuLy8gRm91bmRhdGlvbi5wbHVnaW4oRHJvcGRvd24sICdEcm9wZG93bicpO1xyXG4vL1xyXG4vLyBGb3VuZGF0aW9uLnBsdWdpbihEcm9wZG93bk1lbnUsICdEcm9wZG93bk1lbnUnKTtcclxuLy9cclxuLy8gRm91bmRhdGlvbi5wbHVnaW4oRXF1YWxpemVyLCAnRXF1YWxpemVyJyk7XHJcbi8vXHJcbi8vIEZvdW5kYXRpb24ucGx1Z2luKEludGVyY2hhbmdlLCAnSW50ZXJjaGFuZ2UnKTtcclxuLy9cclxuLy8gRm91bmRhdGlvbi5wbHVnaW4oTWFnZWxsYW4sICdNYWdlbGxhbicpO1xyXG4vL1xyXG5Gb3VuZGF0aW9uLnBsdWdpbihPZmZDYW52YXMsICdPZmZDYW52YXMnKTtcclxuLy9cclxuLy8gRm91bmRhdGlvbi5wbHVnaW4oT3JiaXQsICdPcmJpdCcpO1xyXG4vL1xyXG4vLyBGb3VuZGF0aW9uLnBsdWdpbihSZXNwb25zaXZlTWVudSwgJ1Jlc3BvbnNpdmVNZW51Jyk7XHJcbi8vXHJcbi8vIEZvdW5kYXRpb24ucGx1Z2luKFJlc3BvbnNpdmVUb2dnbGUsICdSZXNwb25zaXZlVG9nZ2xlJyk7XHJcbi8vXHJcbi8vIEZvdW5kYXRpb24ucGx1Z2luKFJldmVhbCwgJ1JldmVhbCcpO1xyXG4vL1xyXG4vLyBGb3VuZGF0aW9uLnBsdWdpbihTbGlkZXIsICdTbGlkZXInKTtcclxuLy9cclxuLy8gRm91bmRhdGlvbi5wbHVnaW4oU21vb3RoU2Nyb2xsLCAnU21vb3RoU2Nyb2xsJyk7XHJcbi8vXHJcbi8vIEZvdW5kYXRpb24ucGx1Z2luKFN0aWNreSwgJ1N0aWNreScpO1xyXG4vL1xyXG5Gb3VuZGF0aW9uLnBsdWdpbihUYWJzLCAnVGFicycpO1xyXG4vL1xyXG4vLyBGb3VuZGF0aW9uLnBsdWdpbihUb2dnbGVyLCAnVG9nZ2xlcicpO1xyXG4vL1xyXG4vLyBGb3VuZGF0aW9uLnBsdWdpbihUb29sdGlwLCAnVG9vbHRpcCcpO1xyXG4vL1xyXG4vLyBGb3VuZGF0aW9uLnBsdWdpbihSZXNwb25zaXZlQWNjb3JkaW9uVGFicywgJ1Jlc3BvbnNpdmVBY2NvcmRpb25UYWJzJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEZvdW5kYXRpb247XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hc3NldHMvanMvbGliL2ZvdW5kYXRpb24tZXhwbGljaXQtcGllY2VzLmpzIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5pbXBvcnQgeyBHZXRZb0RpZ2l0cyB9IGZyb20gJy4vZm91bmRhdGlvbi51dGlsLmNvcmUnO1xuaW1wb3J0IHsgTWVkaWFRdWVyeSB9IGZyb20gJy4vZm91bmRhdGlvbi51dGlsLm1lZGlhUXVlcnknO1xuXG52YXIgRk9VTkRBVElPTl9WRVJTSU9OID0gJzYuNC4zJztcblxuLy8gR2xvYmFsIEZvdW5kYXRpb24gb2JqZWN0XG4vLyBUaGlzIGlzIGF0dGFjaGVkIHRvIHRoZSB3aW5kb3csIG9yIHVzZWQgYXMgYSBtb2R1bGUgZm9yIEFNRC9Ccm93c2VyaWZ5XG52YXIgRm91bmRhdGlvbiA9IHtcbiAgdmVyc2lvbjogRk9VTkRBVElPTl9WRVJTSU9OLFxuXG4gIC8qKlxuICAgKiBTdG9yZXMgaW5pdGlhbGl6ZWQgcGx1Z2lucy5cbiAgICovXG4gIF9wbHVnaW5zOiB7fSxcblxuICAvKipcbiAgICogU3RvcmVzIGdlbmVyYXRlZCB1bmlxdWUgaWRzIGZvciBwbHVnaW4gaW5zdGFuY2VzXG4gICAqL1xuICBfdXVpZHM6IFtdLFxuXG4gIC8qKlxuICAgKiBEZWZpbmVzIGEgRm91bmRhdGlvbiBwbHVnaW4sIGFkZGluZyBpdCB0byB0aGUgYEZvdW5kYXRpb25gIG5hbWVzcGFjZSBhbmQgdGhlIGxpc3Qgb2YgcGx1Z2lucyB0byBpbml0aWFsaXplIHdoZW4gcmVmbG93aW5nLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGx1Z2luIC0gVGhlIGNvbnN0cnVjdG9yIG9mIHRoZSBwbHVnaW4uXG4gICAqL1xuICBwbHVnaW46IGZ1bmN0aW9uKHBsdWdpbiwgbmFtZSkge1xuICAgIC8vIE9iamVjdCBrZXkgdG8gdXNlIHdoZW4gYWRkaW5nIHRvIGdsb2JhbCBGb3VuZGF0aW9uIG9iamVjdFxuICAgIC8vIEV4YW1wbGVzOiBGb3VuZGF0aW9uLlJldmVhbCwgRm91bmRhdGlvbi5PZmZDYW52YXNcbiAgICB2YXIgY2xhc3NOYW1lID0gKG5hbWUgfHwgZnVuY3Rpb25OYW1lKHBsdWdpbikpO1xuICAgIC8vIE9iamVjdCBrZXkgdG8gdXNlIHdoZW4gc3RvcmluZyB0aGUgcGx1Z2luLCBhbHNvIHVzZWQgdG8gY3JlYXRlIHRoZSBpZGVudGlmeWluZyBkYXRhIGF0dHJpYnV0ZSBmb3IgdGhlIHBsdWdpblxuICAgIC8vIEV4YW1wbGVzOiBkYXRhLXJldmVhbCwgZGF0YS1vZmYtY2FudmFzXG4gICAgdmFyIGF0dHJOYW1lICA9IGh5cGhlbmF0ZShjbGFzc05hbWUpO1xuXG4gICAgLy8gQWRkIHRvIHRoZSBGb3VuZGF0aW9uIG9iamVjdCBhbmQgdGhlIHBsdWdpbnMgbGlzdCAoZm9yIHJlZmxvd2luZylcbiAgICB0aGlzLl9wbHVnaW5zW2F0dHJOYW1lXSA9IHRoaXNbY2xhc3NOYW1lXSA9IHBsdWdpbjtcbiAgfSxcbiAgLyoqXG4gICAqIEBmdW5jdGlvblxuICAgKiBQb3B1bGF0ZXMgdGhlIF91dWlkcyBhcnJheSB3aXRoIHBvaW50ZXJzIHRvIGVhY2ggaW5kaXZpZHVhbCBwbHVnaW4gaW5zdGFuY2UuXG4gICAqIEFkZHMgdGhlIGB6ZlBsdWdpbmAgZGF0YS1hdHRyaWJ1dGUgdG8gcHJvZ3JhbW1hdGljYWxseSBjcmVhdGVkIHBsdWdpbnMgdG8gYWxsb3cgdXNlIG9mICQoc2VsZWN0b3IpLmZvdW5kYXRpb24obWV0aG9kKSBjYWxscy5cbiAgICogQWxzbyBmaXJlcyB0aGUgaW5pdGlhbGl6YXRpb24gZXZlbnQgZm9yIGVhY2ggcGx1Z2luLCBjb25zb2xpZGF0aW5nIHJlcGV0aXRpdmUgY29kZS5cbiAgICogQHBhcmFtIHtPYmplY3R9IHBsdWdpbiAtIGFuIGluc3RhbmNlIG9mIGEgcGx1Z2luLCB1c3VhbGx5IGB0aGlzYCBpbiBjb250ZXh0LlxuICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSAtIHRoZSBuYW1lIG9mIHRoZSBwbHVnaW4sIHBhc3NlZCBhcyBhIGNhbWVsQ2FzZWQgc3RyaW5nLlxuICAgKiBAZmlyZXMgUGx1Z2luI2luaXRcbiAgICovXG4gIHJlZ2lzdGVyUGx1Z2luOiBmdW5jdGlvbihwbHVnaW4sIG5hbWUpe1xuICAgIHZhciBwbHVnaW5OYW1lID0gbmFtZSA/IGh5cGhlbmF0ZShuYW1lKSA6IGZ1bmN0aW9uTmFtZShwbHVnaW4uY29uc3RydWN0b3IpLnRvTG93ZXJDYXNlKCk7XG4gICAgcGx1Z2luLnV1aWQgPSBHZXRZb0RpZ2l0cyg2LCBwbHVnaW5OYW1lKTtcblxuICAgIGlmKCFwbHVnaW4uJGVsZW1lbnQuYXR0cihgZGF0YS0ke3BsdWdpbk5hbWV9YCkpeyBwbHVnaW4uJGVsZW1lbnQuYXR0cihgZGF0YS0ke3BsdWdpbk5hbWV9YCwgcGx1Z2luLnV1aWQpOyB9XG4gICAgaWYoIXBsdWdpbi4kZWxlbWVudC5kYXRhKCd6ZlBsdWdpbicpKXsgcGx1Z2luLiRlbGVtZW50LmRhdGEoJ3pmUGx1Z2luJywgcGx1Z2luKTsgfVxuICAgICAgICAgIC8qKlxuICAgICAgICAgICAqIEZpcmVzIHdoZW4gdGhlIHBsdWdpbiBoYXMgaW5pdGlhbGl6ZWQuXG4gICAgICAgICAgICogQGV2ZW50IFBsdWdpbiNpbml0XG4gICAgICAgICAgICovXG4gICAgcGx1Z2luLiRlbGVtZW50LnRyaWdnZXIoYGluaXQuemYuJHtwbHVnaW5OYW1lfWApO1xuXG4gICAgdGhpcy5fdXVpZHMucHVzaChwbHVnaW4udXVpZCk7XG5cbiAgICByZXR1cm47XG4gIH0sXG4gIC8qKlxuICAgKiBAZnVuY3Rpb25cbiAgICogUmVtb3ZlcyB0aGUgcGx1Z2lucyB1dWlkIGZyb20gdGhlIF91dWlkcyBhcnJheS5cbiAgICogUmVtb3ZlcyB0aGUgemZQbHVnaW4gZGF0YSBhdHRyaWJ1dGUsIGFzIHdlbGwgYXMgdGhlIGRhdGEtcGx1Z2luLW5hbWUgYXR0cmlidXRlLlxuICAgKiBBbHNvIGZpcmVzIHRoZSBkZXN0cm95ZWQgZXZlbnQgZm9yIHRoZSBwbHVnaW4sIGNvbnNvbGlkYXRpbmcgcmVwZXRpdGl2ZSBjb2RlLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGx1Z2luIC0gYW4gaW5zdGFuY2Ugb2YgYSBwbHVnaW4sIHVzdWFsbHkgYHRoaXNgIGluIGNvbnRleHQuXG4gICAqIEBmaXJlcyBQbHVnaW4jZGVzdHJveWVkXG4gICAqL1xuICB1bnJlZ2lzdGVyUGx1Z2luOiBmdW5jdGlvbihwbHVnaW4pe1xuICAgIHZhciBwbHVnaW5OYW1lID0gaHlwaGVuYXRlKGZ1bmN0aW9uTmFtZShwbHVnaW4uJGVsZW1lbnQuZGF0YSgnemZQbHVnaW4nKS5jb25zdHJ1Y3RvcikpO1xuXG4gICAgdGhpcy5fdXVpZHMuc3BsaWNlKHRoaXMuX3V1aWRzLmluZGV4T2YocGx1Z2luLnV1aWQpLCAxKTtcbiAgICBwbHVnaW4uJGVsZW1lbnQucmVtb3ZlQXR0cihgZGF0YS0ke3BsdWdpbk5hbWV9YCkucmVtb3ZlRGF0YSgnemZQbHVnaW4nKVxuICAgICAgICAgIC8qKlxuICAgICAgICAgICAqIEZpcmVzIHdoZW4gdGhlIHBsdWdpbiBoYXMgYmVlbiBkZXN0cm95ZWQuXG4gICAgICAgICAgICogQGV2ZW50IFBsdWdpbiNkZXN0cm95ZWRcbiAgICAgICAgICAgKi9cbiAgICAgICAgICAudHJpZ2dlcihgZGVzdHJveWVkLnpmLiR7cGx1Z2luTmFtZX1gKTtcbiAgICBmb3IodmFyIHByb3AgaW4gcGx1Z2luKXtcbiAgICAgIHBsdWdpbltwcm9wXSA9IG51bGw7Ly9jbGVhbiB1cCBzY3JpcHQgdG8gcHJlcCBmb3IgZ2FyYmFnZSBjb2xsZWN0aW9uLlxuICAgIH1cbiAgICByZXR1cm47XG4gIH0sXG5cbiAgLyoqXG4gICAqIEBmdW5jdGlvblxuICAgKiBDYXVzZXMgb25lIG9yIG1vcmUgYWN0aXZlIHBsdWdpbnMgdG8gcmUtaW5pdGlhbGl6ZSwgcmVzZXR0aW5nIGV2ZW50IGxpc3RlbmVycywgcmVjYWxjdWxhdGluZyBwb3NpdGlvbnMsIGV0Yy5cbiAgICogQHBhcmFtIHtTdHJpbmd9IHBsdWdpbnMgLSBvcHRpb25hbCBzdHJpbmcgb2YgYW4gaW5kaXZpZHVhbCBwbHVnaW4ga2V5LCBhdHRhaW5lZCBieSBjYWxsaW5nIGAkKGVsZW1lbnQpLmRhdGEoJ3BsdWdpbk5hbWUnKWAsIG9yIHN0cmluZyBvZiBhIHBsdWdpbiBjbGFzcyBpLmUuIGAnZHJvcGRvd24nYFxuICAgKiBAZGVmYXVsdCBJZiBubyBhcmd1bWVudCBpcyBwYXNzZWQsIHJlZmxvdyBhbGwgY3VycmVudGx5IGFjdGl2ZSBwbHVnaW5zLlxuICAgKi9cbiAgIHJlSW5pdDogZnVuY3Rpb24ocGx1Z2lucyl7XG4gICAgIHZhciBpc0pRID0gcGx1Z2lucyBpbnN0YW5jZW9mICQ7XG4gICAgIHRyeXtcbiAgICAgICBpZihpc0pRKXtcbiAgICAgICAgIHBsdWdpbnMuZWFjaChmdW5jdGlvbigpe1xuICAgICAgICAgICAkKHRoaXMpLmRhdGEoJ3pmUGx1Z2luJykuX2luaXQoKTtcbiAgICAgICAgIH0pO1xuICAgICAgIH1lbHNle1xuICAgICAgICAgdmFyIHR5cGUgPSB0eXBlb2YgcGx1Z2lucyxcbiAgICAgICAgIF90aGlzID0gdGhpcyxcbiAgICAgICAgIGZucyA9IHtcbiAgICAgICAgICAgJ29iamVjdCc6IGZ1bmN0aW9uKHBsZ3Mpe1xuICAgICAgICAgICAgIHBsZ3MuZm9yRWFjaChmdW5jdGlvbihwKXtcbiAgICAgICAgICAgICAgIHAgPSBoeXBoZW5hdGUocCk7XG4gICAgICAgICAgICAgICAkKCdbZGF0YS0nKyBwICsnXScpLmZvdW5kYXRpb24oJ19pbml0Jyk7XG4gICAgICAgICAgICAgfSk7XG4gICAgICAgICAgIH0sXG4gICAgICAgICAgICdzdHJpbmcnOiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgIHBsdWdpbnMgPSBoeXBoZW5hdGUocGx1Z2lucyk7XG4gICAgICAgICAgICAgJCgnW2RhdGEtJysgcGx1Z2lucyArJ10nKS5mb3VuZGF0aW9uKCdfaW5pdCcpO1xuICAgICAgICAgICB9LFxuICAgICAgICAgICAndW5kZWZpbmVkJzogZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICB0aGlzWydvYmplY3QnXShPYmplY3Qua2V5cyhfdGhpcy5fcGx1Z2lucykpO1xuICAgICAgICAgICB9XG4gICAgICAgICB9O1xuICAgICAgICAgZm5zW3R5cGVdKHBsdWdpbnMpO1xuICAgICAgIH1cbiAgICAgfWNhdGNoKGVycil7XG4gICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICB9ZmluYWxseXtcbiAgICAgICByZXR1cm4gcGx1Z2lucztcbiAgICAgfVxuICAgfSxcblxuICAvKipcbiAgICogSW5pdGlhbGl6ZSBwbHVnaW5zIG9uIGFueSBlbGVtZW50cyB3aXRoaW4gYGVsZW1gIChhbmQgYGVsZW1gIGl0c2VsZikgdGhhdCBhcmVuJ3QgYWxyZWFkeSBpbml0aWFsaXplZC5cbiAgICogQHBhcmFtIHtPYmplY3R9IGVsZW0gLSBqUXVlcnkgb2JqZWN0IGNvbnRhaW5pbmcgdGhlIGVsZW1lbnQgdG8gY2hlY2sgaW5zaWRlLiBBbHNvIGNoZWNrcyB0aGUgZWxlbWVudCBpdHNlbGYsIHVubGVzcyBpdCdzIHRoZSBgZG9jdW1lbnRgIG9iamVjdC5cbiAgICogQHBhcmFtIHtTdHJpbmd8QXJyYXl9IHBsdWdpbnMgLSBBIGxpc3Qgb2YgcGx1Z2lucyB0byBpbml0aWFsaXplLiBMZWF2ZSB0aGlzIG91dCB0byBpbml0aWFsaXplIGV2ZXJ5dGhpbmcuXG4gICAqL1xuICByZWZsb3c6IGZ1bmN0aW9uKGVsZW0sIHBsdWdpbnMpIHtcblxuICAgIC8vIElmIHBsdWdpbnMgaXMgdW5kZWZpbmVkLCBqdXN0IGdyYWIgZXZlcnl0aGluZ1xuICAgIGlmICh0eXBlb2YgcGx1Z2lucyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHBsdWdpbnMgPSBPYmplY3Qua2V5cyh0aGlzLl9wbHVnaW5zKTtcbiAgICB9XG4gICAgLy8gSWYgcGx1Z2lucyBpcyBhIHN0cmluZywgY29udmVydCBpdCB0byBhbiBhcnJheSB3aXRoIG9uZSBpdGVtXG4gICAgZWxzZSBpZiAodHlwZW9mIHBsdWdpbnMgPT09ICdzdHJpbmcnKSB7XG4gICAgICBwbHVnaW5zID0gW3BsdWdpbnNdO1xuICAgIH1cblxuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAvLyBJdGVyYXRlIHRocm91Z2ggZWFjaCBwbHVnaW5cbiAgICAkLmVhY2gocGx1Z2lucywgZnVuY3Rpb24oaSwgbmFtZSkge1xuICAgICAgLy8gR2V0IHRoZSBjdXJyZW50IHBsdWdpblxuICAgICAgdmFyIHBsdWdpbiA9IF90aGlzLl9wbHVnaW5zW25hbWVdO1xuXG4gICAgICAvLyBMb2NhbGl6ZSB0aGUgc2VhcmNoIHRvIGFsbCBlbGVtZW50cyBpbnNpZGUgZWxlbSwgYXMgd2VsbCBhcyBlbGVtIGl0c2VsZiwgdW5sZXNzIGVsZW0gPT09IGRvY3VtZW50XG4gICAgICB2YXIgJGVsZW0gPSAkKGVsZW0pLmZpbmQoJ1tkYXRhLScrbmFtZSsnXScpLmFkZEJhY2soJ1tkYXRhLScrbmFtZSsnXScpO1xuXG4gICAgICAvLyBGb3IgZWFjaCBwbHVnaW4gZm91bmQsIGluaXRpYWxpemUgaXRcbiAgICAgICRlbGVtLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciAkZWwgPSAkKHRoaXMpLFxuICAgICAgICAgICAgb3B0cyA9IHt9O1xuICAgICAgICAvLyBEb24ndCBkb3VibGUtZGlwIG9uIHBsdWdpbnNcbiAgICAgICAgaWYgKCRlbC5kYXRhKCd6ZlBsdWdpbicpKSB7XG4gICAgICAgICAgY29uc29sZS53YXJuKFwiVHJpZWQgdG8gaW5pdGlhbGl6ZSBcIituYW1lK1wiIG9uIGFuIGVsZW1lbnQgdGhhdCBhbHJlYWR5IGhhcyBhIEZvdW5kYXRpb24gcGx1Z2luLlwiKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZigkZWwuYXR0cignZGF0YS1vcHRpb25zJykpe1xuICAgICAgICAgIHZhciB0aGluZyA9ICRlbC5hdHRyKCdkYXRhLW9wdGlvbnMnKS5zcGxpdCgnOycpLmZvckVhY2goZnVuY3Rpb24oZSwgaSl7XG4gICAgICAgICAgICB2YXIgb3B0ID0gZS5zcGxpdCgnOicpLm1hcChmdW5jdGlvbihlbCl7IHJldHVybiBlbC50cmltKCk7IH0pO1xuICAgICAgICAgICAgaWYob3B0WzBdKSBvcHRzW29wdFswXV0gPSBwYXJzZVZhbHVlKG9wdFsxXSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdHJ5e1xuICAgICAgICAgICRlbC5kYXRhKCd6ZlBsdWdpbicsIG5ldyBwbHVnaW4oJCh0aGlzKSwgb3B0cykpO1xuICAgICAgICB9Y2F0Y2goZXIpe1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXIpO1xuICAgICAgICB9ZmluYWxseXtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxuICBnZXRGbk5hbWU6IGZ1bmN0aW9uTmFtZSxcblxuICBhZGRUb0pxdWVyeTogZnVuY3Rpb24oJCkge1xuICAgIC8vIFRPRE86IGNvbnNpZGVyIG5vdCBtYWtpbmcgdGhpcyBhIGpRdWVyeSBmdW5jdGlvblxuICAgIC8vIFRPRE86IG5lZWQgd2F5IHRvIHJlZmxvdyB2cy4gcmUtaW5pdGlhbGl6ZVxuICAgIC8qKlxuICAgICAqIFRoZSBGb3VuZGF0aW9uIGpRdWVyeSBtZXRob2QuXG4gICAgICogQHBhcmFtIHtTdHJpbmd8QXJyYXl9IG1ldGhvZCAtIEFuIGFjdGlvbiB0byBwZXJmb3JtIG9uIHRoZSBjdXJyZW50IGpRdWVyeSBvYmplY3QuXG4gICAgICovXG4gICAgdmFyIGZvdW5kYXRpb24gPSBmdW5jdGlvbihtZXRob2QpIHtcbiAgICAgIHZhciB0eXBlID0gdHlwZW9mIG1ldGhvZCxcbiAgICAgICAgICAkbm9KUyA9ICQoJy5uby1qcycpO1xuXG4gICAgICBpZigkbm9KUy5sZW5ndGgpe1xuICAgICAgICAkbm9KUy5yZW1vdmVDbGFzcygnbm8tanMnKTtcbiAgICAgIH1cblxuICAgICAgaWYodHlwZSA9PT0gJ3VuZGVmaW5lZCcpey8vbmVlZHMgdG8gaW5pdGlhbGl6ZSB0aGUgRm91bmRhdGlvbiBvYmplY3QsIG9yIGFuIGluZGl2aWR1YWwgcGx1Z2luLlxuICAgICAgICBNZWRpYVF1ZXJ5Ll9pbml0KCk7XG4gICAgICAgIEZvdW5kYXRpb24ucmVmbG93KHRoaXMpO1xuICAgICAgfWVsc2UgaWYodHlwZSA9PT0gJ3N0cmluZycpey8vYW4gaW5kaXZpZHVhbCBtZXRob2QgdG8gaW52b2tlIG9uIGEgcGx1Z2luIG9yIGdyb3VwIG9mIHBsdWdpbnNcbiAgICAgICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpOy8vY29sbGVjdCBhbGwgdGhlIGFyZ3VtZW50cywgaWYgbmVjZXNzYXJ5XG4gICAgICAgIHZhciBwbHVnQ2xhc3MgPSB0aGlzLmRhdGEoJ3pmUGx1Z2luJyk7Ly9kZXRlcm1pbmUgdGhlIGNsYXNzIG9mIHBsdWdpblxuXG4gICAgICAgIGlmKHBsdWdDbGFzcyAhPT0gdW5kZWZpbmVkICYmIHBsdWdDbGFzc1ttZXRob2RdICE9PSB1bmRlZmluZWQpey8vbWFrZSBzdXJlIGJvdGggdGhlIGNsYXNzIGFuZCBtZXRob2QgZXhpc3RcbiAgICAgICAgICBpZih0aGlzLmxlbmd0aCA9PT0gMSl7Ly9pZiB0aGVyZSdzIG9ubHkgb25lLCBjYWxsIGl0IGRpcmVjdGx5LlxuICAgICAgICAgICAgICBwbHVnQ2xhc3NbbWV0aG9kXS5hcHBseShwbHVnQ2xhc3MsIGFyZ3MpO1xuICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdGhpcy5lYWNoKGZ1bmN0aW9uKGksIGVsKXsvL290aGVyd2lzZSBsb29wIHRocm91Z2ggdGhlIGpRdWVyeSBjb2xsZWN0aW9uIGFuZCBpbnZva2UgdGhlIG1ldGhvZCBvbiBlYWNoXG4gICAgICAgICAgICAgIHBsdWdDbGFzc1ttZXRob2RdLmFwcGx5KCQoZWwpLmRhdGEoJ3pmUGx1Z2luJyksIGFyZ3MpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9ZWxzZXsvL2Vycm9yIGZvciBubyBjbGFzcyBvciBubyBtZXRob2RcbiAgICAgICAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJXZSdyZSBzb3JyeSwgJ1wiICsgbWV0aG9kICsgXCInIGlzIG5vdCBhbiBhdmFpbGFibGUgbWV0aG9kIGZvciBcIiArIChwbHVnQ2xhc3MgPyBmdW5jdGlvbk5hbWUocGx1Z0NsYXNzKSA6ICd0aGlzIGVsZW1lbnQnKSArICcuJyk7XG4gICAgICAgIH1cbiAgICAgIH1lbHNley8vZXJyb3IgZm9yIGludmFsaWQgYXJndW1lbnQgdHlwZVxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBXZSdyZSBzb3JyeSwgJHt0eXBlfSBpcyBub3QgYSB2YWxpZCBwYXJhbWV0ZXIuIFlvdSBtdXN0IHVzZSBhIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIG1ldGhvZCB5b3Ugd2lzaCB0byBpbnZva2UuYCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgICQuZm4uZm91bmRhdGlvbiA9IGZvdW5kYXRpb247XG4gICAgcmV0dXJuICQ7XG4gIH1cbn07XG5cbkZvdW5kYXRpb24udXRpbCA9IHtcbiAgLyoqXG4gICAqIEZ1bmN0aW9uIGZvciBhcHBseWluZyBhIGRlYm91bmNlIGVmZmVjdCB0byBhIGZ1bmN0aW9uIGNhbGwuXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIC0gRnVuY3Rpb24gdG8gYmUgY2FsbGVkIGF0IGVuZCBvZiB0aW1lb3V0LlxuICAgKiBAcGFyYW0ge051bWJlcn0gZGVsYXkgLSBUaW1lIGluIG1zIHRvIGRlbGF5IHRoZSBjYWxsIG9mIGBmdW5jYC5cbiAgICogQHJldHVybnMgZnVuY3Rpb25cbiAgICovXG4gIHRocm90dGxlOiBmdW5jdGlvbiAoZnVuYywgZGVsYXkpIHtcbiAgICB2YXIgdGltZXIgPSBudWxsO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBjb250ZXh0ID0gdGhpcywgYXJncyA9IGFyZ3VtZW50cztcblxuICAgICAgaWYgKHRpbWVyID09PSBudWxsKSB7XG4gICAgICAgIHRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICAgICAgICB0aW1lciA9IG51bGw7XG4gICAgICAgIH0sIGRlbGF5KTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG59O1xuXG53aW5kb3cuRm91bmRhdGlvbiA9IEZvdW5kYXRpb247XG5cbi8vIFBvbHlmaWxsIGZvciByZXF1ZXN0QW5pbWF0aW9uRnJhbWVcbihmdW5jdGlvbigpIHtcbiAgaWYgKCFEYXRlLm5vdyB8fCAhd2luZG93LkRhdGUubm93KVxuICAgIHdpbmRvdy5EYXRlLm5vdyA9IERhdGUubm93ID0gZnVuY3Rpb24oKSB7IHJldHVybiBuZXcgRGF0ZSgpLmdldFRpbWUoKTsgfTtcblxuICB2YXIgdmVuZG9ycyA9IFsnd2Via2l0JywgJ21veiddO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHZlbmRvcnMubGVuZ3RoICYmICF3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lOyArK2kpIHtcbiAgICAgIHZhciB2cCA9IHZlbmRvcnNbaV07XG4gICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gd2luZG93W3ZwKydSZXF1ZXN0QW5pbWF0aW9uRnJhbWUnXTtcbiAgICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSA9ICh3aW5kb3dbdnArJ0NhbmNlbEFuaW1hdGlvbkZyYW1lJ11cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHx8IHdpbmRvd1t2cCsnQ2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lJ10pO1xuICB9XG4gIGlmICgvaVAoYWR8aG9uZXxvZCkuKk9TIDYvLnRlc3Qod2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQpXG4gICAgfHwgIXdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgIXdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSkge1xuICAgIHZhciBsYXN0VGltZSA9IDA7XG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciBub3cgPSBEYXRlLm5vdygpO1xuICAgICAgICB2YXIgbmV4dFRpbWUgPSBNYXRoLm1heChsYXN0VGltZSArIDE2LCBub3cpO1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW5jdGlvbigpIHsgY2FsbGJhY2sobGFzdFRpbWUgPSBuZXh0VGltZSk7IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG5leHRUaW1lIC0gbm93KTtcbiAgICB9O1xuICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSA9IGNsZWFyVGltZW91dDtcbiAgfVxuICAvKipcbiAgICogUG9seWZpbGwgZm9yIHBlcmZvcm1hbmNlLm5vdywgcmVxdWlyZWQgYnkgckFGXG4gICAqL1xuICBpZighd2luZG93LnBlcmZvcm1hbmNlIHx8ICF3aW5kb3cucGVyZm9ybWFuY2Uubm93KXtcbiAgICB3aW5kb3cucGVyZm9ybWFuY2UgPSB7XG4gICAgICBzdGFydDogRGF0ZS5ub3coKSxcbiAgICAgIG5vdzogZnVuY3Rpb24oKXsgcmV0dXJuIERhdGUubm93KCkgLSB0aGlzLnN0YXJ0OyB9XG4gICAgfTtcbiAgfVxufSkoKTtcbmlmICghRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQpIHtcbiAgRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQgPSBmdW5jdGlvbihvVGhpcykge1xuICAgIGlmICh0eXBlb2YgdGhpcyAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgLy8gY2xvc2VzdCB0aGluZyBwb3NzaWJsZSB0byB0aGUgRUNNQVNjcmlwdCA1XG4gICAgICAvLyBpbnRlcm5hbCBJc0NhbGxhYmxlIGZ1bmN0aW9uXG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdGdW5jdGlvbi5wcm90b3R5cGUuYmluZCAtIHdoYXQgaXMgdHJ5aW5nIHRvIGJlIGJvdW5kIGlzIG5vdCBjYWxsYWJsZScpO1xuICAgIH1cblxuICAgIHZhciBhQXJncyAgID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSxcbiAgICAgICAgZlRvQmluZCA9IHRoaXMsXG4gICAgICAgIGZOT1AgICAgPSBmdW5jdGlvbigpIHt9LFxuICAgICAgICBmQm91bmQgID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIGZUb0JpbmQuYXBwbHkodGhpcyBpbnN0YW5jZW9mIGZOT1BcbiAgICAgICAgICAgICAgICAgPyB0aGlzXG4gICAgICAgICAgICAgICAgIDogb1RoaXMsXG4gICAgICAgICAgICAgICAgIGFBcmdzLmNvbmNhdChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpKSk7XG4gICAgICAgIH07XG5cbiAgICBpZiAodGhpcy5wcm90b3R5cGUpIHtcbiAgICAgIC8vIG5hdGl2ZSBmdW5jdGlvbnMgZG9uJ3QgaGF2ZSBhIHByb3RvdHlwZVxuICAgICAgZk5PUC5wcm90b3R5cGUgPSB0aGlzLnByb3RvdHlwZTtcbiAgICB9XG4gICAgZkJvdW5kLnByb3RvdHlwZSA9IG5ldyBmTk9QKCk7XG5cbiAgICByZXR1cm4gZkJvdW5kO1xuICB9O1xufVxuLy8gUG9seWZpbGwgdG8gZ2V0IHRoZSBuYW1lIG9mIGEgZnVuY3Rpb24gaW4gSUU5XG5mdW5jdGlvbiBmdW5jdGlvbk5hbWUoZm4pIHtcbiAgaWYgKEZ1bmN0aW9uLnByb3RvdHlwZS5uYW1lID09PSB1bmRlZmluZWQpIHtcbiAgICB2YXIgZnVuY05hbWVSZWdleCA9IC9mdW5jdGlvblxccyhbXihdezEsfSlcXCgvO1xuICAgIHZhciByZXN1bHRzID0gKGZ1bmNOYW1lUmVnZXgpLmV4ZWMoKGZuKS50b1N0cmluZygpKTtcbiAgICByZXR1cm4gKHJlc3VsdHMgJiYgcmVzdWx0cy5sZW5ndGggPiAxKSA/IHJlc3VsdHNbMV0udHJpbSgpIDogXCJcIjtcbiAgfVxuICBlbHNlIGlmIChmbi5wcm90b3R5cGUgPT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBmbi5jb25zdHJ1Y3Rvci5uYW1lO1xuICB9XG4gIGVsc2Uge1xuICAgIHJldHVybiBmbi5wcm90b3R5cGUuY29uc3RydWN0b3IubmFtZTtcbiAgfVxufVxuZnVuY3Rpb24gcGFyc2VWYWx1ZShzdHIpe1xuICBpZiAoJ3RydWUnID09PSBzdHIpIHJldHVybiB0cnVlO1xuICBlbHNlIGlmICgnZmFsc2UnID09PSBzdHIpIHJldHVybiBmYWxzZTtcbiAgZWxzZSBpZiAoIWlzTmFOKHN0ciAqIDEpKSByZXR1cm4gcGFyc2VGbG9hdChzdHIpO1xuICByZXR1cm4gc3RyO1xufVxuLy8gQ29udmVydCBQYXNjYWxDYXNlIHRvIGtlYmFiLWNhc2Vcbi8vIFRoYW5rIHlvdTogaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvODk1NTU4MFxuZnVuY3Rpb24gaHlwaGVuYXRlKHN0cikge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoLyhbYS16XSkoW0EtWl0pL2csICckMS0kMicpLnRvTG93ZXJDYXNlKCk7XG59XG5cbmV4cG9ydCB7Rm91bmRhdGlvbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLmNvcmUuanMiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5pbXBvcnQgeyB0cmFuc2l0aW9uZW5kIH0gZnJvbSAnLi9mb3VuZGF0aW9uLnV0aWwuY29yZSc7XG5cbi8qKlxuICogTW90aW9uIG1vZHVsZS5cbiAqIEBtb2R1bGUgZm91bmRhdGlvbi5tb3Rpb25cbiAqL1xuXG5jb25zdCBpbml0Q2xhc3NlcyAgID0gWydtdWktZW50ZXInLCAnbXVpLWxlYXZlJ107XG5jb25zdCBhY3RpdmVDbGFzc2VzID0gWydtdWktZW50ZXItYWN0aXZlJywgJ211aS1sZWF2ZS1hY3RpdmUnXTtcblxuY29uc3QgTW90aW9uID0ge1xuICBhbmltYXRlSW46IGZ1bmN0aW9uKGVsZW1lbnQsIGFuaW1hdGlvbiwgY2IpIHtcbiAgICBhbmltYXRlKHRydWUsIGVsZW1lbnQsIGFuaW1hdGlvbiwgY2IpO1xuICB9LFxuXG4gIGFuaW1hdGVPdXQ6IGZ1bmN0aW9uKGVsZW1lbnQsIGFuaW1hdGlvbiwgY2IpIHtcbiAgICBhbmltYXRlKGZhbHNlLCBlbGVtZW50LCBhbmltYXRpb24sIGNiKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBNb3ZlKGR1cmF0aW9uLCBlbGVtLCBmbil7XG4gIHZhciBhbmltLCBwcm9nLCBzdGFydCA9IG51bGw7XG4gIC8vIGNvbnNvbGUubG9nKCdjYWxsZWQnKTtcblxuICBpZiAoZHVyYXRpb24gPT09IDApIHtcbiAgICBmbi5hcHBseShlbGVtKTtcbiAgICBlbGVtLnRyaWdnZXIoJ2ZpbmlzaGVkLnpmLmFuaW1hdGUnLCBbZWxlbV0pLnRyaWdnZXJIYW5kbGVyKCdmaW5pc2hlZC56Zi5hbmltYXRlJywgW2VsZW1dKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBmdW5jdGlvbiBtb3ZlKHRzKXtcbiAgICBpZighc3RhcnQpIHN0YXJ0ID0gdHM7XG4gICAgLy8gY29uc29sZS5sb2coc3RhcnQsIHRzKTtcbiAgICBwcm9nID0gdHMgLSBzdGFydDtcbiAgICBmbi5hcHBseShlbGVtKTtcblxuICAgIGlmKHByb2cgPCBkdXJhdGlvbil7IGFuaW0gPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKG1vdmUsIGVsZW0pOyB9XG4gICAgZWxzZXtcbiAgICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZShhbmltKTtcbiAgICAgIGVsZW0udHJpZ2dlcignZmluaXNoZWQuemYuYW5pbWF0ZScsIFtlbGVtXSkudHJpZ2dlckhhbmRsZXIoJ2ZpbmlzaGVkLnpmLmFuaW1hdGUnLCBbZWxlbV0pO1xuICAgIH1cbiAgfVxuICBhbmltID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShtb3ZlKTtcbn1cblxuLyoqXG4gKiBBbmltYXRlcyBhbiBlbGVtZW50IGluIG9yIG91dCB1c2luZyBhIENTUyB0cmFuc2l0aW9uIGNsYXNzLlxuICogQGZ1bmN0aW9uXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtCb29sZWFufSBpc0luIC0gRGVmaW5lcyBpZiB0aGUgYW5pbWF0aW9uIGlzIGluIG9yIG91dC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBlbGVtZW50IC0galF1ZXJ5IG9yIEhUTUwgb2JqZWN0IHRvIGFuaW1hdGUuXG4gKiBAcGFyYW0ge1N0cmluZ30gYW5pbWF0aW9uIC0gQ1NTIGNsYXNzIHRvIHVzZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNiIC0gQ2FsbGJhY2sgdG8gcnVuIHdoZW4gYW5pbWF0aW9uIGlzIGZpbmlzaGVkLlxuICovXG5mdW5jdGlvbiBhbmltYXRlKGlzSW4sIGVsZW1lbnQsIGFuaW1hdGlvbiwgY2IpIHtcbiAgZWxlbWVudCA9ICQoZWxlbWVudCkuZXEoMCk7XG5cbiAgaWYgKCFlbGVtZW50Lmxlbmd0aCkgcmV0dXJuO1xuXG4gIHZhciBpbml0Q2xhc3MgPSBpc0luID8gaW5pdENsYXNzZXNbMF0gOiBpbml0Q2xhc3Nlc1sxXTtcbiAgdmFyIGFjdGl2ZUNsYXNzID0gaXNJbiA/IGFjdGl2ZUNsYXNzZXNbMF0gOiBhY3RpdmVDbGFzc2VzWzFdO1xuXG4gIC8vIFNldCB1cCB0aGUgYW5pbWF0aW9uXG4gIHJlc2V0KCk7XG5cbiAgZWxlbWVudFxuICAgIC5hZGRDbGFzcyhhbmltYXRpb24pXG4gICAgLmNzcygndHJhbnNpdGlvbicsICdub25lJyk7XG5cbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICBlbGVtZW50LmFkZENsYXNzKGluaXRDbGFzcyk7XG4gICAgaWYgKGlzSW4pIGVsZW1lbnQuc2hvdygpO1xuICB9KTtcblxuICAvLyBTdGFydCB0aGUgYW5pbWF0aW9uXG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgZWxlbWVudFswXS5vZmZzZXRXaWR0aDtcbiAgICBlbGVtZW50XG4gICAgICAuY3NzKCd0cmFuc2l0aW9uJywgJycpXG4gICAgICAuYWRkQ2xhc3MoYWN0aXZlQ2xhc3MpO1xuICB9KTtcblxuICAvLyBDbGVhbiB1cCB0aGUgYW5pbWF0aW9uIHdoZW4gaXQgZmluaXNoZXNcbiAgZWxlbWVudC5vbmUodHJhbnNpdGlvbmVuZChlbGVtZW50KSwgZmluaXNoKTtcblxuICAvLyBIaWRlcyB0aGUgZWxlbWVudCAoZm9yIG91dCBhbmltYXRpb25zKSwgcmVzZXRzIHRoZSBlbGVtZW50LCBhbmQgcnVucyBhIGNhbGxiYWNrXG4gIGZ1bmN0aW9uIGZpbmlzaCgpIHtcbiAgICBpZiAoIWlzSW4pIGVsZW1lbnQuaGlkZSgpO1xuICAgIHJlc2V0KCk7XG4gICAgaWYgKGNiKSBjYi5hcHBseShlbGVtZW50KTtcbiAgfVxuXG4gIC8vIFJlc2V0cyB0cmFuc2l0aW9ucyBhbmQgcmVtb3ZlcyBtb3Rpb24tc3BlY2lmaWMgY2xhc3Nlc1xuICBmdW5jdGlvbiByZXNldCgpIHtcbiAgICBlbGVtZW50WzBdLnN0eWxlLnRyYW5zaXRpb25EdXJhdGlvbiA9IDA7XG4gICAgZWxlbWVudC5yZW1vdmVDbGFzcyhgJHtpbml0Q2xhc3N9ICR7YWN0aXZlQ2xhc3N9ICR7YW5pbWF0aW9ufWApO1xuICB9XG59XG5cbmV4cG9ydCB7TW92ZSwgTW90aW9ufTtcblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi51dGlsLm1vdGlvbi5qcyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcbmltcG9ydCB7IEtleWJvYXJkIH0gZnJvbSAnLi9mb3VuZGF0aW9uLnV0aWwua2V5Ym9hcmQnO1xuaW1wb3J0IHsgTWVkaWFRdWVyeSB9IGZyb20gJy4vZm91bmRhdGlvbi51dGlsLm1lZGlhUXVlcnknO1xuaW1wb3J0IHsgdHJhbnNpdGlvbmVuZCB9IGZyb20gJy4vZm91bmRhdGlvbi51dGlsLmNvcmUnO1xuaW1wb3J0IHsgUGx1Z2luIH0gZnJvbSAnLi9mb3VuZGF0aW9uLnBsdWdpbic7XG5cbmltcG9ydCB7IFRyaWdnZXJzIH0gZnJvbSAnLi9mb3VuZGF0aW9uLnV0aWwudHJpZ2dlcnMnO1xuXG4vKipcbiAqIE9mZkNhbnZhcyBtb2R1bGUuXG4gKiBAbW9kdWxlIGZvdW5kYXRpb24ub2ZmY2FudmFzXG4gKiBAcmVxdWlyZXMgZm91bmRhdGlvbi51dGlsLmtleWJvYXJkXG4gKiBAcmVxdWlyZXMgZm91bmRhdGlvbi51dGlsLm1lZGlhUXVlcnlcbiAqIEByZXF1aXJlcyBmb3VuZGF0aW9uLnV0aWwudHJpZ2dlcnNcbiAqL1xuXG5jbGFzcyBPZmZDYW52YXMgZXh0ZW5kcyBQbHVnaW4ge1xuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBpbnN0YW5jZSBvZiBhbiBvZmYtY2FudmFzIHdyYXBwZXIuXG4gICAqIEBjbGFzc1xuICAgKiBAbmFtZSBPZmZDYW52YXNcbiAgICogQGZpcmVzIE9mZkNhbnZhcyNpbml0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBlbGVtZW50IC0galF1ZXJ5IG9iamVjdCB0byBpbml0aWFsaXplLlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIE92ZXJyaWRlcyB0byB0aGUgZGVmYXVsdCBwbHVnaW4gc2V0dGluZ3MuXG4gICAqL1xuICBfc2V0dXAoZWxlbWVudCwgb3B0aW9ucykge1xuICAgIHRoaXMuY2xhc3NOYW1lID0gJ09mZkNhbnZhcyc7IC8vIGllOSBiYWNrIGNvbXBhdFxuICAgIHRoaXMuJGVsZW1lbnQgPSBlbGVtZW50O1xuICAgIHRoaXMub3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCBPZmZDYW52YXMuZGVmYXVsdHMsIHRoaXMuJGVsZW1lbnQuZGF0YSgpLCBvcHRpb25zKTtcbiAgICB0aGlzLmNvbnRlbnRDbGFzc2VzID0geyBiYXNlOiBbXSwgcmV2ZWFsOiBbXSB9O1xuICAgIHRoaXMuJGxhc3RUcmlnZ2VyID0gJCgpO1xuICAgIHRoaXMuJHRyaWdnZXJzID0gJCgpO1xuICAgIHRoaXMucG9zaXRpb24gPSAnbGVmdCc7XG4gICAgdGhpcy4kY29udGVudCA9ICQoKTtcbiAgICB0aGlzLm5lc3RlZCA9ICEhKHRoaXMub3B0aW9ucy5uZXN0ZWQpO1xuXG4gICAgLy8gRGVmaW5lcyB0aGUgQ1NTIHRyYW5zaXRpb24vcG9zaXRpb24gY2xhc3NlcyBvZiB0aGUgb2ZmLWNhbnZhcyBjb250ZW50IGNvbnRhaW5lci5cbiAgICAkKFsncHVzaCcsICdvdmVybGFwJ10pLmVhY2goKGluZGV4LCB2YWwpID0+IHtcbiAgICAgIHRoaXMuY29udGVudENsYXNzZXMuYmFzZS5wdXNoKCdoYXMtdHJhbnNpdGlvbi0nK3ZhbCk7XG4gICAgfSk7XG4gICAgJChbJ2xlZnQnLCAncmlnaHQnLCAndG9wJywgJ2JvdHRvbSddKS5lYWNoKChpbmRleCwgdmFsKSA9PiB7XG4gICAgICB0aGlzLmNvbnRlbnRDbGFzc2VzLmJhc2UucHVzaCgnaGFzLXBvc2l0aW9uLScrdmFsKTtcbiAgICAgIHRoaXMuY29udGVudENsYXNzZXMucmV2ZWFsLnB1c2goJ2hhcy1yZXZlYWwtJyt2YWwpO1xuICAgIH0pO1xuXG4gICAgLy8gVHJpZ2dlcnMgaW5pdCBpcyBpZGVtcG90ZW50LCBqdXN0IG5lZWQgdG8gbWFrZSBzdXJlIGl0IGlzIGluaXRpYWxpemVkXG4gICAgVHJpZ2dlcnMuaW5pdCgkKTtcbiAgICBNZWRpYVF1ZXJ5Ll9pbml0KCk7XG5cbiAgICB0aGlzLl9pbml0KCk7XG4gICAgdGhpcy5fZXZlbnRzKCk7XG5cbiAgICBLZXlib2FyZC5yZWdpc3RlcignT2ZmQ2FudmFzJywge1xuICAgICAgJ0VTQ0FQRSc6ICdjbG9zZSdcbiAgICB9KTtcblxuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemVzIHRoZSBvZmYtY2FudmFzIHdyYXBwZXIgYnkgYWRkaW5nIHRoZSBleGl0IG92ZXJsYXkgKGlmIG5lZWRlZCkuXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2luaXQoKSB7XG4gICAgdmFyIGlkID0gdGhpcy4kZWxlbWVudC5hdHRyKCdpZCcpO1xuXG4gICAgdGhpcy4kZWxlbWVudC5hdHRyKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG5cbiAgICAvLyBGaW5kIG9mZi1jYW52YXMgY29udGVudCwgZWl0aGVyIGJ5IElEIChpZiBzcGVjaWZpZWQpLCBieSBzaWJsaW5ncyBvciBieSBjbG9zZXN0IHNlbGVjdG9yIChmYWxsYmFjaylcbiAgICBpZiAodGhpcy5vcHRpb25zLmNvbnRlbnRJZCkge1xuICAgICAgdGhpcy4kY29udGVudCA9ICQoJyMnK3RoaXMub3B0aW9ucy5jb250ZW50SWQpO1xuICAgIH0gZWxzZSBpZiAodGhpcy4kZWxlbWVudC5zaWJsaW5ncygnW2RhdGEtb2ZmLWNhbnZhcy1jb250ZW50XScpLmxlbmd0aCkge1xuICAgICAgdGhpcy4kY29udGVudCA9IHRoaXMuJGVsZW1lbnQuc2libGluZ3MoJ1tkYXRhLW9mZi1jYW52YXMtY29udGVudF0nKS5maXJzdCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLiRjb250ZW50ID0gdGhpcy4kZWxlbWVudC5jbG9zZXN0KCdbZGF0YS1vZmYtY2FudmFzLWNvbnRlbnRdJykuZmlyc3QoKTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMub3B0aW9ucy5jb250ZW50SWQpIHtcbiAgICAgIC8vIEFzc3VtZSB0aGF0IHRoZSBvZmYtY2FudmFzIGVsZW1lbnQgaXMgbmVzdGVkIGlmIGl0IGlzbid0IGEgc2libGluZyBvZiB0aGUgY29udGVudFxuICAgICAgdGhpcy5uZXN0ZWQgPSB0aGlzLiRlbGVtZW50LnNpYmxpbmdzKCdbZGF0YS1vZmYtY2FudmFzLWNvbnRlbnRdJykubGVuZ3RoID09PSAwO1xuXG4gICAgfSBlbHNlIGlmICh0aGlzLm9wdGlvbnMuY29udGVudElkICYmIHRoaXMub3B0aW9ucy5uZXN0ZWQgPT09IG51bGwpIHtcbiAgICAgIC8vIFdhcm5pbmcgaWYgdXNpbmcgY29udGVudCBJRCB3aXRob3V0IHNldHRpbmcgdGhlIG5lc3RlZCBvcHRpb25cbiAgICAgIC8vIE9uY2UgdGhlIGVsZW1lbnQgaXMgbmVzdGVkIGl0IGlzIHJlcXVpcmVkIHRvIHdvcmsgcHJvcGVybHkgaW4gdGhpcyBjYXNlXG4gICAgICBjb25zb2xlLndhcm4oJ1JlbWVtYmVyIHRvIHVzZSB0aGUgbmVzdGVkIG9wdGlvbiBpZiB1c2luZyB0aGUgY29udGVudCBJRCBvcHRpb24hJyk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMubmVzdGVkID09PSB0cnVlKSB7XG4gICAgICAvLyBGb3JjZSB0cmFuc2l0aW9uIG92ZXJsYXAgaWYgbmVzdGVkXG4gICAgICB0aGlzLm9wdGlvbnMudHJhbnNpdGlvbiA9ICdvdmVybGFwJztcbiAgICAgIC8vIFJlbW92ZSBhcHByb3ByaWF0ZSBjbGFzc2VzIGlmIGFscmVhZHkgYXNzaWduZWQgaW4gbWFya3VwXG4gICAgICB0aGlzLiRlbGVtZW50LnJlbW92ZUNsYXNzKCdpcy10cmFuc2l0aW9uLXB1c2gnKTtcbiAgICB9XG5cbiAgICB0aGlzLiRlbGVtZW50LmFkZENsYXNzKGBpcy10cmFuc2l0aW9uLSR7dGhpcy5vcHRpb25zLnRyYW5zaXRpb259IGlzLWNsb3NlZGApO1xuXG4gICAgLy8gRmluZCB0cmlnZ2VycyB0aGF0IGFmZmVjdCB0aGlzIGVsZW1lbnQgYW5kIGFkZCBhcmlhLWV4cGFuZGVkIHRvIHRoZW1cbiAgICB0aGlzLiR0cmlnZ2VycyA9ICQoZG9jdW1lbnQpXG4gICAgICAuZmluZCgnW2RhdGEtb3Blbj1cIicraWQrJ1wiXSwgW2RhdGEtY2xvc2U9XCInK2lkKydcIl0sIFtkYXRhLXRvZ2dsZT1cIicraWQrJ1wiXScpXG4gICAgICAuYXR0cignYXJpYS1leHBhbmRlZCcsICdmYWxzZScpXG4gICAgICAuYXR0cignYXJpYS1jb250cm9scycsIGlkKTtcblxuICAgIC8vIEdldCBwb3NpdGlvbiBieSBjaGVja2luZyBmb3IgcmVsYXRlZCBDU1MgY2xhc3NcbiAgICB0aGlzLnBvc2l0aW9uID0gdGhpcy4kZWxlbWVudC5pcygnLnBvc2l0aW9uLWxlZnQsIC5wb3NpdGlvbi10b3AsIC5wb3NpdGlvbi1yaWdodCwgLnBvc2l0aW9uLWJvdHRvbScpID8gdGhpcy4kZWxlbWVudC5hdHRyKCdjbGFzcycpLm1hdGNoKC9wb3NpdGlvblxcLShsZWZ0fHRvcHxyaWdodHxib3R0b20pLylbMV0gOiB0aGlzLnBvc2l0aW9uO1xuXG4gICAgLy8gQWRkIGFuIG92ZXJsYXkgb3ZlciB0aGUgY29udGVudCBpZiBuZWNlc3NhcnlcbiAgICBpZiAodGhpcy5vcHRpb25zLmNvbnRlbnRPdmVybGF5ID09PSB0cnVlKSB7XG4gICAgICB2YXIgb3ZlcmxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgdmFyIG92ZXJsYXlQb3NpdGlvbiA9ICQodGhpcy4kZWxlbWVudCkuY3NzKFwicG9zaXRpb25cIikgPT09ICdmaXhlZCcgPyAnaXMtb3ZlcmxheS1maXhlZCcgOiAnaXMtb3ZlcmxheS1hYnNvbHV0ZSc7XG4gICAgICBvdmVybGF5LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnanMtb2ZmLWNhbnZhcy1vdmVybGF5ICcgKyBvdmVybGF5UG9zaXRpb24pO1xuICAgICAgdGhpcy4kb3ZlcmxheSA9ICQob3ZlcmxheSk7XG4gICAgICBpZihvdmVybGF5UG9zaXRpb24gPT09ICdpcy1vdmVybGF5LWZpeGVkJykge1xuICAgICAgICAkKHRoaXMuJG92ZXJsYXkpLmluc2VydEFmdGVyKHRoaXMuJGVsZW1lbnQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy4kY29udGVudC5hcHBlbmQodGhpcy4kb3ZlcmxheSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5vcHRpb25zLmlzUmV2ZWFsZWQgPSB0aGlzLm9wdGlvbnMuaXNSZXZlYWxlZCB8fCBuZXcgUmVnRXhwKHRoaXMub3B0aW9ucy5yZXZlYWxDbGFzcywgJ2cnKS50ZXN0KHRoaXMuJGVsZW1lbnRbMF0uY2xhc3NOYW1lKTtcblxuICAgIGlmICh0aGlzLm9wdGlvbnMuaXNSZXZlYWxlZCA9PT0gdHJ1ZSkge1xuICAgICAgdGhpcy5vcHRpb25zLnJldmVhbE9uID0gdGhpcy5vcHRpb25zLnJldmVhbE9uIHx8IHRoaXMuJGVsZW1lbnRbMF0uY2xhc3NOYW1lLm1hdGNoKC8ocmV2ZWFsLWZvci1tZWRpdW18cmV2ZWFsLWZvci1sYXJnZSkvZylbMF0uc3BsaXQoJy0nKVsyXTtcbiAgICAgIHRoaXMuX3NldE1RQ2hlY2tlcigpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMudHJhbnNpdGlvblRpbWUpIHtcbiAgICAgIHRoaXMuJGVsZW1lbnQuY3NzKCd0cmFuc2l0aW9uLWR1cmF0aW9uJywgdGhpcy5vcHRpb25zLnRyYW5zaXRpb25UaW1lKTtcbiAgICB9XG5cbiAgICAvLyBJbml0YWxseSByZW1vdmUgYWxsIHRyYW5zaXRpb24vcG9zaXRpb24gQ1NTIGNsYXNzZXMgZnJvbSBvZmYtY2FudmFzIGNvbnRlbnQgY29udGFpbmVyLlxuICAgIHRoaXMuX3JlbW92ZUNvbnRlbnRDbGFzc2VzKCk7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBldmVudCBoYW5kbGVycyB0byB0aGUgb2ZmLWNhbnZhcyB3cmFwcGVyIGFuZCB0aGUgZXhpdCBvdmVybGF5LlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9ldmVudHMoKSB7XG4gICAgdGhpcy4kZWxlbWVudC5vZmYoJy56Zi50cmlnZ2VyIC56Zi5vZmZjYW52YXMnKS5vbih7XG4gICAgICAnb3Blbi56Zi50cmlnZ2VyJzogdGhpcy5vcGVuLmJpbmQodGhpcyksXG4gICAgICAnY2xvc2UuemYudHJpZ2dlcic6IHRoaXMuY2xvc2UuYmluZCh0aGlzKSxcbiAgICAgICd0b2dnbGUuemYudHJpZ2dlcic6IHRoaXMudG9nZ2xlLmJpbmQodGhpcyksXG4gICAgICAna2V5ZG93bi56Zi5vZmZjYW52YXMnOiB0aGlzLl9oYW5kbGVLZXlib2FyZC5iaW5kKHRoaXMpXG4gICAgfSk7XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmNsb3NlT25DbGljayA9PT0gdHJ1ZSkge1xuICAgICAgdmFyICR0YXJnZXQgPSB0aGlzLm9wdGlvbnMuY29udGVudE92ZXJsYXkgPyB0aGlzLiRvdmVybGF5IDogdGhpcy4kY29udGVudDtcbiAgICAgICR0YXJnZXQub24oeydjbGljay56Zi5vZmZjYW52YXMnOiB0aGlzLmNsb3NlLmJpbmQodGhpcyl9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQXBwbGllcyBldmVudCBsaXN0ZW5lciBmb3IgZWxlbWVudHMgdGhhdCB3aWxsIHJldmVhbCBhdCBjZXJ0YWluIGJyZWFrcG9pbnRzLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX3NldE1RQ2hlY2tlcigpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgJCh3aW5kb3cpLm9uKCdjaGFuZ2VkLnpmLm1lZGlhcXVlcnknLCBmdW5jdGlvbigpIHtcbiAgICAgIGlmIChNZWRpYVF1ZXJ5LmF0TGVhc3QoX3RoaXMub3B0aW9ucy5yZXZlYWxPbikpIHtcbiAgICAgICAgX3RoaXMucmV2ZWFsKHRydWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgX3RoaXMucmV2ZWFsKGZhbHNlKTtcbiAgICAgIH1cbiAgICB9KS5vbmUoJ2xvYWQuemYub2ZmY2FudmFzJywgZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoTWVkaWFRdWVyeS5hdExlYXN0KF90aGlzLm9wdGlvbnMucmV2ZWFsT24pKSB7XG4gICAgICAgIF90aGlzLnJldmVhbCh0cnVlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIHRoZSBDU1MgdHJhbnNpdGlvbi9wb3NpdGlvbiBjbGFzc2VzIG9mIHRoZSBvZmYtY2FudmFzIGNvbnRlbnQgY29udGFpbmVyLlxuICAgKiBSZW1vdmluZyB0aGUgY2xhc3NlcyBpcyBpbXBvcnRhbnQgd2hlbiBhbm90aGVyIG9mZi1jYW52YXMgZ2V0cyBvcGVuZWQgdGhhdCB1c2VzIHRoZSBzYW1lIGNvbnRlbnQgY29udGFpbmVyLlxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IGhhc1JldmVhbCAtIHRydWUgaWYgcmVsYXRlZCBvZmYtY2FudmFzIGVsZW1lbnQgaXMgcmV2ZWFsZWQuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfcmVtb3ZlQ29udGVudENsYXNzZXMoaGFzUmV2ZWFsKSB7XG4gICAgaWYgKHR5cGVvZiBoYXNSZXZlYWwgIT09ICdib29sZWFuJykge1xuICAgICAgdGhpcy4kY29udGVudC5yZW1vdmVDbGFzcyh0aGlzLmNvbnRlbnRDbGFzc2VzLmJhc2Uuam9pbignICcpKTtcbiAgICB9IGVsc2UgaWYgKGhhc1JldmVhbCA9PT0gZmFsc2UpIHtcbiAgICAgIHRoaXMuJGNvbnRlbnQucmVtb3ZlQ2xhc3MoYGhhcy1yZXZlYWwtJHt0aGlzLnBvc2l0aW9ufWApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIHRoZSBDU1MgdHJhbnNpdGlvbi9wb3NpdGlvbiBjbGFzc2VzIG9mIHRoZSBvZmYtY2FudmFzIGNvbnRlbnQgY29udGFpbmVyLCBiYXNlZCBvbiB0aGUgb3BlbmluZyBvZmYtY2FudmFzIGVsZW1lbnQuXG4gICAqIEJlZm9yZWhhbmQgYW55IHRyYW5zaXRpb24vcG9zaXRpb24gY2xhc3MgZ2V0cyByZW1vdmVkLlxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IGhhc1JldmVhbCAtIHRydWUgaWYgcmVsYXRlZCBvZmYtY2FudmFzIGVsZW1lbnQgaXMgcmV2ZWFsZWQuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfYWRkQ29udGVudENsYXNzZXMoaGFzUmV2ZWFsKSB7XG4gICAgdGhpcy5fcmVtb3ZlQ29udGVudENsYXNzZXMoaGFzUmV2ZWFsKTtcbiAgICBpZiAodHlwZW9mIGhhc1JldmVhbCAhPT0gJ2Jvb2xlYW4nKSB7XG4gICAgICB0aGlzLiRjb250ZW50LmFkZENsYXNzKGBoYXMtdHJhbnNpdGlvbi0ke3RoaXMub3B0aW9ucy50cmFuc2l0aW9ufSBoYXMtcG9zaXRpb24tJHt0aGlzLnBvc2l0aW9ufWApO1xuICAgIH0gZWxzZSBpZiAoaGFzUmV2ZWFsID09PSB0cnVlKSB7XG4gICAgICB0aGlzLiRjb250ZW50LmFkZENsYXNzKGBoYXMtcmV2ZWFsLSR7dGhpcy5wb3NpdGlvbn1gKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyB0aGUgcmV2ZWFsaW5nL2hpZGluZyB0aGUgb2ZmLWNhbnZhcyBhdCBicmVha3BvaW50cywgbm90IHRoZSBzYW1lIGFzIG9wZW4uXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gaXNSZXZlYWxlZCAtIHRydWUgaWYgZWxlbWVudCBzaG91bGQgYmUgcmV2ZWFsZWQuXG4gICAqIEBmdW5jdGlvblxuICAgKi9cbiAgcmV2ZWFsKGlzUmV2ZWFsZWQpIHtcbiAgICBpZiAoaXNSZXZlYWxlZCkge1xuICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgdGhpcy5pc1JldmVhbGVkID0gdHJ1ZTtcbiAgICAgIHRoaXMuJGVsZW1lbnQuYXR0cignYXJpYS1oaWRkZW4nLCAnZmFsc2UnKTtcbiAgICAgIHRoaXMuJGVsZW1lbnQub2ZmKCdvcGVuLnpmLnRyaWdnZXIgdG9nZ2xlLnpmLnRyaWdnZXInKTtcbiAgICAgIHRoaXMuJGVsZW1lbnQucmVtb3ZlQ2xhc3MoJ2lzLWNsb3NlZCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmlzUmV2ZWFsZWQgPSBmYWxzZTtcbiAgICAgIHRoaXMuJGVsZW1lbnQuYXR0cignYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuICAgICAgdGhpcy4kZWxlbWVudC5vZmYoJ29wZW4uemYudHJpZ2dlciB0b2dnbGUuemYudHJpZ2dlcicpLm9uKHtcbiAgICAgICAgJ29wZW4uemYudHJpZ2dlcic6IHRoaXMub3Blbi5iaW5kKHRoaXMpLFxuICAgICAgICAndG9nZ2xlLnpmLnRyaWdnZXInOiB0aGlzLnRvZ2dsZS5iaW5kKHRoaXMpXG4gICAgICB9KTtcbiAgICAgIHRoaXMuJGVsZW1lbnQuYWRkQ2xhc3MoJ2lzLWNsb3NlZCcpO1xuICAgIH1cbiAgICB0aGlzLl9hZGRDb250ZW50Q2xhc3Nlcyhpc1JldmVhbGVkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdG9wcyBzY3JvbGxpbmcgb2YgdGhlIGJvZHkgd2hlbiBvZmZjYW52YXMgaXMgb3BlbiBvbiBtb2JpbGUgU2FmYXJpIGFuZCBvdGhlciB0cm91Ymxlc29tZSBicm93c2Vycy5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9zdG9wU2Nyb2xsaW5nKGV2ZW50KSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLy8gVGFrZW4gYW5kIGFkYXB0ZWQgZnJvbSBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzE2ODg5NDQ3L3ByZXZlbnQtZnVsbC1wYWdlLXNjcm9sbGluZy1pb3NcbiAgLy8gT25seSByZWFsbHkgd29ya3MgZm9yIHksIG5vdCBzdXJlIGhvdyB0byBleHRlbmQgdG8geCBvciBpZiB3ZSBuZWVkIHRvLlxuICBfcmVjb3JkU2Nyb2xsYWJsZShldmVudCkge1xuICAgIGxldCBlbGVtID0gdGhpczsgLy8gY2FsbGVkIGZyb20gZXZlbnQgaGFuZGxlciBjb250ZXh0IHdpdGggdGhpcyBhcyBlbGVtXG5cbiAgICAgLy8gSWYgdGhlIGVsZW1lbnQgaXMgc2Nyb2xsYWJsZSAoY29udGVudCBvdmVyZmxvd3MpLCB0aGVuLi4uXG4gICAgaWYgKGVsZW0uc2Nyb2xsSGVpZ2h0ICE9PSBlbGVtLmNsaWVudEhlaWdodCkge1xuICAgICAgLy8gSWYgd2UncmUgYXQgdGhlIHRvcCwgc2Nyb2xsIGRvd24gb25lIHBpeGVsIHRvIGFsbG93IHNjcm9sbGluZyB1cFxuICAgICAgaWYgKGVsZW0uc2Nyb2xsVG9wID09PSAwKSB7XG4gICAgICAgIGVsZW0uc2Nyb2xsVG9wID0gMTtcbiAgICAgIH1cbiAgICAgIC8vIElmIHdlJ3JlIGF0IHRoZSBib3R0b20sIHNjcm9sbCB1cCBvbmUgcGl4ZWwgdG8gYWxsb3cgc2Nyb2xsaW5nIGRvd25cbiAgICAgIGlmIChlbGVtLnNjcm9sbFRvcCA9PT0gZWxlbS5zY3JvbGxIZWlnaHQgLSBlbGVtLmNsaWVudEhlaWdodCkge1xuICAgICAgICBlbGVtLnNjcm9sbFRvcCA9IGVsZW0uc2Nyb2xsSGVpZ2h0IC0gZWxlbS5jbGllbnRIZWlnaHQgLSAxO1xuICAgICAgfVxuICAgIH1cbiAgICBlbGVtLmFsbG93VXAgPSBlbGVtLnNjcm9sbFRvcCA+IDA7XG4gICAgZWxlbS5hbGxvd0Rvd24gPSBlbGVtLnNjcm9sbFRvcCA8IChlbGVtLnNjcm9sbEhlaWdodCAtIGVsZW0uY2xpZW50SGVpZ2h0KTtcbiAgICBlbGVtLmxhc3RZID0gZXZlbnQub3JpZ2luYWxFdmVudC5wYWdlWTtcbiAgfVxuXG4gIF9zdG9wU2Nyb2xsUHJvcGFnYXRpb24oZXZlbnQpIHtcbiAgICBsZXQgZWxlbSA9IHRoaXM7IC8vIGNhbGxlZCBmcm9tIGV2ZW50IGhhbmRsZXIgY29udGV4dCB3aXRoIHRoaXMgYXMgZWxlbVxuICAgIGxldCB1cCA9IGV2ZW50LnBhZ2VZIDwgZWxlbS5sYXN0WTtcbiAgICBsZXQgZG93biA9ICF1cDtcbiAgICBlbGVtLmxhc3RZID0gZXZlbnQucGFnZVk7XG5cbiAgICBpZigodXAgJiYgZWxlbS5hbGxvd1VwKSB8fCAoZG93biAmJiBlbGVtLmFsbG93RG93bikpIHtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH0gZWxzZSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBPcGVucyB0aGUgb2ZmLWNhbnZhcyBtZW51LlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50IC0gRXZlbnQgb2JqZWN0IHBhc3NlZCBmcm9tIGxpc3RlbmVyLlxuICAgKiBAcGFyYW0ge2pRdWVyeX0gdHJpZ2dlciAtIGVsZW1lbnQgdGhhdCB0cmlnZ2VyZWQgdGhlIG9mZi1jYW52YXMgdG8gb3Blbi5cbiAgICogQGZpcmVzIE9mZkNhbnZhcyNvcGVuZWRcbiAgICovXG4gIG9wZW4oZXZlbnQsIHRyaWdnZXIpIHtcbiAgICBpZiAodGhpcy4kZWxlbWVudC5oYXNDbGFzcygnaXMtb3BlbicpIHx8IHRoaXMuaXNSZXZlYWxlZCkgeyByZXR1cm47IH1cbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgaWYgKHRyaWdnZXIpIHtcbiAgICAgIHRoaXMuJGxhc3RUcmlnZ2VyID0gdHJpZ2dlcjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmZvcmNlVG8gPT09ICd0b3AnKSB7XG4gICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgMCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLm9wdGlvbnMuZm9yY2VUbyA9PT0gJ2JvdHRvbScpIHtcbiAgICAgIHdpbmRvdy5zY3JvbGxUbygwLGRvY3VtZW50LmJvZHkuc2Nyb2xsSGVpZ2h0KTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLnRyYW5zaXRpb25UaW1lICYmIHRoaXMub3B0aW9ucy50cmFuc2l0aW9uICE9PSAnb3ZlcmxhcCcpIHtcbiAgICAgIHRoaXMuJGVsZW1lbnQuc2libGluZ3MoJ1tkYXRhLW9mZi1jYW52YXMtY29udGVudF0nKS5jc3MoJ3RyYW5zaXRpb24tZHVyYXRpb24nLCB0aGlzLm9wdGlvbnMudHJhbnNpdGlvblRpbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLiRlbGVtZW50LnNpYmxpbmdzKCdbZGF0YS1vZmYtY2FudmFzLWNvbnRlbnRdJykuY3NzKCd0cmFuc2l0aW9uLWR1cmF0aW9uJywgJycpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZpcmVzIHdoZW4gdGhlIG9mZi1jYW52YXMgbWVudSBvcGVucy5cbiAgICAgKiBAZXZlbnQgT2ZmQ2FudmFzI29wZW5lZFxuICAgICAqL1xuICAgIHRoaXMuJGVsZW1lbnQuYWRkQ2xhc3MoJ2lzLW9wZW4nKS5yZW1vdmVDbGFzcygnaXMtY2xvc2VkJyk7XG5cbiAgICB0aGlzLiR0cmlnZ2Vycy5hdHRyKCdhcmlhLWV4cGFuZGVkJywgJ3RydWUnKTtcbiAgICB0aGlzLiRlbGVtZW50LmF0dHIoJ2FyaWEtaGlkZGVuJywgJ2ZhbHNlJylcbiAgICAgICAgLnRyaWdnZXIoJ29wZW5lZC56Zi5vZmZjYW52YXMnKTtcblxuICAgIHRoaXMuJGNvbnRlbnQuYWRkQ2xhc3MoJ2lzLW9wZW4tJyArIHRoaXMucG9zaXRpb24pO1xuXG4gICAgLy8gSWYgYGNvbnRlbnRTY3JvbGxgIGlzIHNldCB0byBmYWxzZSwgYWRkIGNsYXNzIGFuZCBkaXNhYmxlIHNjcm9sbGluZyBvbiB0b3VjaCBkZXZpY2VzLlxuICAgIGlmICh0aGlzLm9wdGlvbnMuY29udGVudFNjcm9sbCA9PT0gZmFsc2UpIHtcbiAgICAgICQoJ2JvZHknKS5hZGRDbGFzcygnaXMtb2ZmLWNhbnZhcy1vcGVuJykub24oJ3RvdWNobW92ZScsIHRoaXMuX3N0b3BTY3JvbGxpbmcpO1xuICAgICAgdGhpcy4kZWxlbWVudC5vbigndG91Y2hzdGFydCcsIHRoaXMuX3JlY29yZFNjcm9sbGFibGUpO1xuICAgICAgdGhpcy4kZWxlbWVudC5vbigndG91Y2htb3ZlJywgdGhpcy5fc3RvcFNjcm9sbFByb3BhZ2F0aW9uKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmNvbnRlbnRPdmVybGF5ID09PSB0cnVlKSB7XG4gICAgICB0aGlzLiRvdmVybGF5LmFkZENsYXNzKCdpcy12aXNpYmxlJyk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5jbG9zZU9uQ2xpY2sgPT09IHRydWUgJiYgdGhpcy5vcHRpb25zLmNvbnRlbnRPdmVybGF5ID09PSB0cnVlKSB7XG4gICAgICB0aGlzLiRvdmVybGF5LmFkZENsYXNzKCdpcy1jbG9zYWJsZScpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMuYXV0b0ZvY3VzID09PSB0cnVlKSB7XG4gICAgICB0aGlzLiRlbGVtZW50Lm9uZSh0cmFuc2l0aW9uZW5kKHRoaXMuJGVsZW1lbnQpLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCFfdGhpcy4kZWxlbWVudC5oYXNDbGFzcygnaXMtb3BlbicpKSB7XG4gICAgICAgICAgcmV0dXJuOyAvLyBleGl0IGlmIHByZW1hdHVyZWx5IGNsb3NlZFxuICAgICAgICB9XG4gICAgICAgIHZhciBjYW52YXNGb2N1cyA9IF90aGlzLiRlbGVtZW50LmZpbmQoJ1tkYXRhLWF1dG9mb2N1c10nKTtcbiAgICAgICAgaWYgKGNhbnZhc0ZvY3VzLmxlbmd0aCkge1xuICAgICAgICAgICAgY2FudmFzRm9jdXMuZXEoMCkuZm9jdXMoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIF90aGlzLiRlbGVtZW50LmZpbmQoJ2EsIGJ1dHRvbicpLmVxKDApLmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMudHJhcEZvY3VzID09PSB0cnVlKSB7XG4gICAgICB0aGlzLiRjb250ZW50LmF0dHIoJ3RhYmluZGV4JywgJy0xJyk7XG4gICAgICBLZXlib2FyZC50cmFwRm9jdXModGhpcy4kZWxlbWVudCk7XG4gICAgfVxuXG4gICAgdGhpcy5fYWRkQ29udGVudENsYXNzZXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbG9zZXMgdGhlIG9mZi1jYW52YXMgbWVudS5cbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNiIC0gb3B0aW9uYWwgY2IgdG8gZmlyZSBhZnRlciBjbG9zdXJlLlxuICAgKiBAZmlyZXMgT2ZmQ2FudmFzI2Nsb3NlZFxuICAgKi9cbiAgY2xvc2UoY2IpIHtcbiAgICBpZiAoIXRoaXMuJGVsZW1lbnQuaGFzQ2xhc3MoJ2lzLW9wZW4nKSB8fCB0aGlzLmlzUmV2ZWFsZWQpIHsgcmV0dXJuOyB9XG5cbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgdGhpcy4kZWxlbWVudC5yZW1vdmVDbGFzcygnaXMtb3BlbicpO1xuXG4gICAgdGhpcy4kZWxlbWVudC5hdHRyKCdhcmlhLWhpZGRlbicsICd0cnVlJylcbiAgICAgIC8qKlxuICAgICAgICogRmlyZXMgd2hlbiB0aGUgb2ZmLWNhbnZhcyBtZW51IG9wZW5zLlxuICAgICAgICogQGV2ZW50IE9mZkNhbnZhcyNjbG9zZWRcbiAgICAgICAqL1xuICAgICAgICAudHJpZ2dlcignY2xvc2VkLnpmLm9mZmNhbnZhcycpO1xuXG4gICAgdGhpcy4kY29udGVudC5yZW1vdmVDbGFzcygnaXMtb3Blbi1sZWZ0IGlzLW9wZW4tdG9wIGlzLW9wZW4tcmlnaHQgaXMtb3Blbi1ib3R0b20nKTtcblxuICAgIC8vIElmIGBjb250ZW50U2Nyb2xsYCBpcyBzZXQgdG8gZmFsc2UsIHJlbW92ZSBjbGFzcyBhbmQgcmUtZW5hYmxlIHNjcm9sbGluZyBvbiB0b3VjaCBkZXZpY2VzLlxuICAgIGlmICh0aGlzLm9wdGlvbnMuY29udGVudFNjcm9sbCA9PT0gZmFsc2UpIHtcbiAgICAgICQoJ2JvZHknKS5yZW1vdmVDbGFzcygnaXMtb2ZmLWNhbnZhcy1vcGVuJykub2ZmKCd0b3VjaG1vdmUnLCB0aGlzLl9zdG9wU2Nyb2xsaW5nKTtcbiAgICAgIHRoaXMuJGVsZW1lbnQub2ZmKCd0b3VjaHN0YXJ0JywgdGhpcy5fcmVjb3JkU2Nyb2xsYWJsZSk7XG4gICAgICB0aGlzLiRlbGVtZW50Lm9mZigndG91Y2htb3ZlJywgdGhpcy5fc3RvcFNjcm9sbFByb3BhZ2F0aW9uKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmNvbnRlbnRPdmVybGF5ID09PSB0cnVlKSB7XG4gICAgICB0aGlzLiRvdmVybGF5LnJlbW92ZUNsYXNzKCdpcy12aXNpYmxlJyk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5jbG9zZU9uQ2xpY2sgPT09IHRydWUgJiYgdGhpcy5vcHRpb25zLmNvbnRlbnRPdmVybGF5ID09PSB0cnVlKSB7XG4gICAgICB0aGlzLiRvdmVybGF5LnJlbW92ZUNsYXNzKCdpcy1jbG9zYWJsZScpO1xuICAgIH1cblxuICAgIHRoaXMuJHRyaWdnZXJzLmF0dHIoJ2FyaWEtZXhwYW5kZWQnLCAnZmFsc2UnKTtcblxuICAgIGlmICh0aGlzLm9wdGlvbnMudHJhcEZvY3VzID09PSB0cnVlKSB7XG4gICAgICB0aGlzLiRjb250ZW50LnJlbW92ZUF0dHIoJ3RhYmluZGV4Jyk7XG4gICAgICBLZXlib2FyZC5yZWxlYXNlRm9jdXModGhpcy4kZWxlbWVudCk7XG4gICAgfVxuXG4gICAgLy8gTGlzdGVuIHRvIHRyYW5zaXRpb25FbmQgYW5kIGFkZCBjbGFzcyB3aGVuIGRvbmUuXG4gICAgdGhpcy4kZWxlbWVudC5vbmUodHJhbnNpdGlvbmVuZCh0aGlzLiRlbGVtZW50KSwgZnVuY3Rpb24oZSkge1xuICAgICAgX3RoaXMuJGVsZW1lbnQuYWRkQ2xhc3MoJ2lzLWNsb3NlZCcpO1xuICAgICAgX3RoaXMuX3JlbW92ZUNvbnRlbnRDbGFzc2VzKCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogVG9nZ2xlcyB0aGUgb2ZmLWNhbnZhcyBtZW51IG9wZW4gb3IgY2xvc2VkLlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50IC0gRXZlbnQgb2JqZWN0IHBhc3NlZCBmcm9tIGxpc3RlbmVyLlxuICAgKiBAcGFyYW0ge2pRdWVyeX0gdHJpZ2dlciAtIGVsZW1lbnQgdGhhdCB0cmlnZ2VyZWQgdGhlIG9mZi1jYW52YXMgdG8gb3Blbi5cbiAgICovXG4gIHRvZ2dsZShldmVudCwgdHJpZ2dlcikge1xuICAgIGlmICh0aGlzLiRlbGVtZW50Lmhhc0NsYXNzKCdpcy1vcGVuJykpIHtcbiAgICAgIHRoaXMuY2xvc2UoZXZlbnQsIHRyaWdnZXIpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRoaXMub3BlbihldmVudCwgdHJpZ2dlcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMga2V5Ym9hcmQgaW5wdXQgd2hlbiBkZXRlY3RlZC4gV2hlbiB0aGUgZXNjYXBlIGtleSBpcyBwcmVzc2VkLCB0aGUgb2ZmLWNhbnZhcyBtZW51IGNsb3NlcywgYW5kIGZvY3VzIGlzIHJlc3RvcmVkIHRvIHRoZSBlbGVtZW50IHRoYXQgb3BlbmVkIHRoZSBtZW51LlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9oYW5kbGVLZXlib2FyZChlKSB7XG4gICAgS2V5Ym9hcmQuaGFuZGxlS2V5KGUsICdPZmZDYW52YXMnLCB7XG4gICAgICBjbG9zZTogKCkgPT4ge1xuICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgIHRoaXMuJGxhc3RUcmlnZ2VyLmZvY3VzKCk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSxcbiAgICAgIGhhbmRsZWQ6ICgpID0+IHtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIERlc3Ryb3lzIHRoZSBvZmZjYW52YXMgcGx1Z2luLlxuICAgKiBAZnVuY3Rpb25cbiAgICovXG4gIF9kZXN0cm95KCkge1xuICAgIHRoaXMuY2xvc2UoKTtcbiAgICB0aGlzLiRlbGVtZW50Lm9mZignLnpmLnRyaWdnZXIgLnpmLm9mZmNhbnZhcycpO1xuICAgIHRoaXMuJG92ZXJsYXkub2ZmKCcuemYub2ZmY2FudmFzJyk7XG4gIH1cbn1cblxuT2ZmQ2FudmFzLmRlZmF1bHRzID0ge1xuICAvKipcbiAgICogQWxsb3cgdGhlIHVzZXIgdG8gY2xpY2sgb3V0c2lkZSBvZiB0aGUgbWVudSB0byBjbG9zZSBpdC5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQGRlZmF1bHQgdHJ1ZVxuICAgKi9cbiAgY2xvc2VPbkNsaWNrOiB0cnVlLFxuXG4gIC8qKlxuICAgKiBBZGRzIGFuIG92ZXJsYXkgb24gdG9wIG9mIGBbZGF0YS1vZmYtY2FudmFzLWNvbnRlbnRdYC5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQGRlZmF1bHQgdHJ1ZVxuICAgKi9cbiAgY29udGVudE92ZXJsYXk6IHRydWUsXG5cbiAgLyoqXG4gICAqIFRhcmdldCBhbiBvZmYtY2FudmFzIGNvbnRlbnQgY29udGFpbmVyIGJ5IElEIHRoYXQgbWF5IGJlIHBsYWNlZCBhbnl3aGVyZS4gSWYgbnVsbCB0aGUgY2xvc2VzdCBjb250ZW50IGNvbnRhaW5lciB3aWxsIGJlIHRha2VuLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHs/c3RyaW5nfVxuICAgKiBAZGVmYXVsdCBudWxsXG4gICAqL1xuICBjb250ZW50SWQ6IG51bGwsXG5cbiAgLyoqXG4gICAqIERlZmluZSB0aGUgb2ZmLWNhbnZhcyBlbGVtZW50IGlzIG5lc3RlZCBpbiBhbiBvZmYtY2FudmFzIGNvbnRlbnQuIFRoaXMgaXMgcmVxdWlyZWQgd2hlbiB1c2luZyB0aGUgY29udGVudElkIG9wdGlvbiBmb3IgYSBuZXN0ZWQgZWxlbWVudC5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQGRlZmF1bHQgbnVsbFxuICAgKi9cbiAgbmVzdGVkOiBudWxsLFxuXG4gIC8qKlxuICAgKiBFbmFibGUvZGlzYWJsZSBzY3JvbGxpbmcgb2YgdGhlIG1haW4gY29udGVudCB3aGVuIGFuIG9mZiBjYW52YXMgcGFuZWwgaXMgb3Blbi5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQGRlZmF1bHQgdHJ1ZVxuICAgKi9cbiAgY29udGVudFNjcm9sbDogdHJ1ZSxcblxuICAvKipcbiAgICogQW1vdW50IG9mIHRpbWUgaW4gbXMgdGhlIG9wZW4gYW5kIGNsb3NlIHRyYW5zaXRpb24gcmVxdWlyZXMuIElmIG5vbmUgc2VsZWN0ZWQsIHB1bGxzIGZyb20gYm9keSBzdHlsZS5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgKiBAZGVmYXVsdCBudWxsXG4gICAqL1xuICB0cmFuc2l0aW9uVGltZTogbnVsbCxcblxuICAvKipcbiAgICogVHlwZSBvZiB0cmFuc2l0aW9uIGZvciB0aGUgb2ZmY2FudmFzIG1lbnUuIE9wdGlvbnMgYXJlICdwdXNoJywgJ2RldGFjaGVkJyBvciAnc2xpZGUnLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqIEBkZWZhdWx0IHB1c2hcbiAgICovXG4gIHRyYW5zaXRpb246ICdwdXNoJyxcblxuICAvKipcbiAgICogRm9yY2UgdGhlIHBhZ2UgdG8gc2Nyb2xsIHRvIHRvcCBvciBib3R0b20gb24gb3Blbi5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7P3N0cmluZ31cbiAgICogQGRlZmF1bHQgbnVsbFxuICAgKi9cbiAgZm9yY2VUbzogbnVsbCxcblxuICAvKipcbiAgICogQWxsb3cgdGhlIG9mZmNhbnZhcyB0byByZW1haW4gb3BlbiBmb3IgY2VydGFpbiBicmVha3BvaW50cy5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQGRlZmF1bHQgZmFsc2VcbiAgICovXG4gIGlzUmV2ZWFsZWQ6IGZhbHNlLFxuXG4gIC8qKlxuICAgKiBCcmVha3BvaW50IGF0IHdoaWNoIHRvIHJldmVhbC4gSlMgd2lsbCB1c2UgYSBSZWdFeHAgdG8gdGFyZ2V0IHN0YW5kYXJkIGNsYXNzZXMsIGlmIGNoYW5naW5nIGNsYXNzbmFtZXMsIHBhc3MgeW91ciBjbGFzcyB3aXRoIHRoZSBgcmV2ZWFsQ2xhc3NgIG9wdGlvbi5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7P3N0cmluZ31cbiAgICogQGRlZmF1bHQgbnVsbFxuICAgKi9cbiAgcmV2ZWFsT246IG51bGwsXG5cbiAgLyoqXG4gICAqIEZvcmNlIGZvY3VzIHRvIHRoZSBvZmZjYW52YXMgb24gb3Blbi4gSWYgdHJ1ZSwgd2lsbCBmb2N1cyB0aGUgb3BlbmluZyB0cmlnZ2VyIG9uIGNsb3NlLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAZGVmYXVsdCB0cnVlXG4gICAqL1xuICBhdXRvRm9jdXM6IHRydWUsXG5cbiAgLyoqXG4gICAqIENsYXNzIHVzZWQgdG8gZm9yY2UgYW4gb2ZmY2FudmFzIHRvIHJlbWFpbiBvcGVuLiBGb3VuZGF0aW9uIGRlZmF1bHRzIGZvciB0aGlzIGFyZSBgcmV2ZWFsLWZvci1sYXJnZWAgJiBgcmV2ZWFsLWZvci1tZWRpdW1gLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqIEBkZWZhdWx0IHJldmVhbC1mb3ItXG4gICAqIEB0b2RvIGltcHJvdmUgdGhlIHJlZ2V4IHRlc3RpbmcgZm9yIHRoaXMuXG4gICAqL1xuICByZXZlYWxDbGFzczogJ3JldmVhbC1mb3ItJyxcblxuICAvKipcbiAgICogVHJpZ2dlcnMgb3B0aW9uYWwgZm9jdXMgdHJhcHBpbmcgd2hlbiBvcGVuaW5nIGFuIG9mZmNhbnZhcy4gU2V0cyB0YWJpbmRleCBvZiBbZGF0YS1vZmYtY2FudmFzLWNvbnRlbnRdIHRvIC0xIGZvciBhY2Nlc3NpYmlsaXR5IHB1cnBvc2VzLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgKi9cbiAgdHJhcEZvY3VzOiBmYWxzZVxufVxuXG5leHBvcnQge09mZkNhbnZhc307XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLm9mZmNhbnZhcy5qcyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcbmltcG9ydCB7IEtleWJvYXJkIH0gZnJvbSAnLi9mb3VuZGF0aW9uLnV0aWwua2V5Ym9hcmQnO1xuaW1wb3J0IHsgb25JbWFnZXNMb2FkZWQgfSBmcm9tICcuL2ZvdW5kYXRpb24udXRpbC5pbWFnZUxvYWRlcic7XG5pbXBvcnQgeyBQbHVnaW4gfSBmcm9tICcuL2ZvdW5kYXRpb24ucGx1Z2luJztcbi8qKlxuICogVGFicyBtb2R1bGUuXG4gKiBAbW9kdWxlIGZvdW5kYXRpb24udGFic1xuICogQHJlcXVpcmVzIGZvdW5kYXRpb24udXRpbC5rZXlib2FyZFxuICogQHJlcXVpcmVzIGZvdW5kYXRpb24udXRpbC5pbWFnZUxvYWRlciBpZiB0YWJzIGNvbnRhaW4gaW1hZ2VzXG4gKi9cblxuY2xhc3MgVGFicyBleHRlbmRzIFBsdWdpbiB7XG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IGluc3RhbmNlIG9mIHRhYnMuXG4gICAqIEBjbGFzc1xuICAgKiBAbmFtZSBUYWJzXG4gICAqIEBmaXJlcyBUYWJzI2luaXRcbiAgICogQHBhcmFtIHtqUXVlcnl9IGVsZW1lbnQgLSBqUXVlcnkgb2JqZWN0IHRvIG1ha2UgaW50byB0YWJzLlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIE92ZXJyaWRlcyB0byB0aGUgZGVmYXVsdCBwbHVnaW4gc2V0dGluZ3MuXG4gICAqL1xuICBfc2V0dXAoZWxlbWVudCwgb3B0aW9ucykge1xuICAgIHRoaXMuJGVsZW1lbnQgPSBlbGVtZW50O1xuICAgIHRoaXMub3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCBUYWJzLmRlZmF1bHRzLCB0aGlzLiRlbGVtZW50LmRhdGEoKSwgb3B0aW9ucyk7XG4gICAgdGhpcy5jbGFzc05hbWUgPSAnVGFicyc7IC8vIGllOSBiYWNrIGNvbXBhdFxuXG4gICAgdGhpcy5faW5pdCgpO1xuICAgIEtleWJvYXJkLnJlZ2lzdGVyKCdUYWJzJywge1xuICAgICAgJ0VOVEVSJzogJ29wZW4nLFxuICAgICAgJ1NQQUNFJzogJ29wZW4nLFxuICAgICAgJ0FSUk9XX1JJR0hUJzogJ25leHQnLFxuICAgICAgJ0FSUk9XX1VQJzogJ3ByZXZpb3VzJyxcbiAgICAgICdBUlJPV19ET1dOJzogJ25leHQnLFxuICAgICAgJ0FSUk9XX0xFRlQnOiAncHJldmlvdXMnXG4gICAgICAvLyAnVEFCJzogJ25leHQnLFxuICAgICAgLy8gJ1NISUZUX1RBQic6ICdwcmV2aW91cydcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyB0aGUgdGFicyBieSBzaG93aW5nIGFuZCBmb2N1c2luZyAoaWYgYXV0b0ZvY3VzPXRydWUpIHRoZSBwcmVzZXQgYWN0aXZlIHRhYi5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9pbml0KCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICB0aGlzLiRlbGVtZW50LmF0dHIoeydyb2xlJzogJ3RhYmxpc3QnfSk7XG4gICAgdGhpcy4kdGFiVGl0bGVzID0gdGhpcy4kZWxlbWVudC5maW5kKGAuJHt0aGlzLm9wdGlvbnMubGlua0NsYXNzfWApO1xuICAgIHRoaXMuJHRhYkNvbnRlbnQgPSAkKGBbZGF0YS10YWJzLWNvbnRlbnQ9XCIke3RoaXMuJGVsZW1lbnRbMF0uaWR9XCJdYCk7XG5cbiAgICB0aGlzLiR0YWJUaXRsZXMuZWFjaChmdW5jdGlvbigpe1xuICAgICAgdmFyICRlbGVtID0gJCh0aGlzKSxcbiAgICAgICAgICAkbGluayA9ICRlbGVtLmZpbmQoJ2EnKSxcbiAgICAgICAgICBpc0FjdGl2ZSA9ICRlbGVtLmhhc0NsYXNzKGAke190aGlzLm9wdGlvbnMubGlua0FjdGl2ZUNsYXNzfWApLFxuICAgICAgICAgIGhhc2ggPSAkbGluay5hdHRyKCdkYXRhLXRhYnMtdGFyZ2V0JykgfHwgJGxpbmtbMF0uaGFzaC5zbGljZSgxKSxcbiAgICAgICAgICBsaW5rSWQgPSAkbGlua1swXS5pZCA/ICRsaW5rWzBdLmlkIDogYCR7aGFzaH0tbGFiZWxgLFxuICAgICAgICAgICR0YWJDb250ZW50ID0gJChgIyR7aGFzaH1gKTtcblxuICAgICAgJGVsZW0uYXR0cih7J3JvbGUnOiAncHJlc2VudGF0aW9uJ30pO1xuXG4gICAgICAkbGluay5hdHRyKHtcbiAgICAgICAgJ3JvbGUnOiAndGFiJyxcbiAgICAgICAgJ2FyaWEtY29udHJvbHMnOiBoYXNoLFxuICAgICAgICAnYXJpYS1zZWxlY3RlZCc6IGlzQWN0aXZlLFxuICAgICAgICAnaWQnOiBsaW5rSWQsXG4gICAgICAgICd0YWJpbmRleCc6IGlzQWN0aXZlID8gJzAnIDogJy0xJ1xuICAgICAgfSk7XG5cbiAgICAgICR0YWJDb250ZW50LmF0dHIoe1xuICAgICAgICAncm9sZSc6ICd0YWJwYW5lbCcsXG4gICAgICAgICdhcmlhLWxhYmVsbGVkYnknOiBsaW5rSWRcbiAgICAgIH0pO1xuXG4gICAgICBpZighaXNBY3RpdmUpIHtcbiAgICAgICAgJHRhYkNvbnRlbnQuYXR0cignYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuICAgICAgfVxuXG4gICAgICBpZihpc0FjdGl2ZSAmJiBfdGhpcy5vcHRpb25zLmF1dG9Gb2N1cyl7XG4gICAgICAgICQod2luZG93KS5sb2FkKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHsgc2Nyb2xsVG9wOiAkZWxlbS5vZmZzZXQoKS50b3AgfSwgX3RoaXMub3B0aW9ucy5kZWVwTGlua1NtdWRnZURlbGF5LCAoKSA9PiB7XG4gICAgICAgICAgICAkbGluay5mb2N1cygpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZih0aGlzLm9wdGlvbnMubWF0Y2hIZWlnaHQpIHtcbiAgICAgIHZhciAkaW1hZ2VzID0gdGhpcy4kdGFiQ29udGVudC5maW5kKCdpbWcnKTtcblxuICAgICAgaWYgKCRpbWFnZXMubGVuZ3RoKSB7XG4gICAgICAgIG9uSW1hZ2VzTG9hZGVkKCRpbWFnZXMsIHRoaXMuX3NldEhlaWdodC5iaW5kKHRoaXMpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX3NldEhlaWdodCgpO1xuICAgICAgfVxuICAgIH1cblxuICAgICAvL2N1cnJlbnQgY29udGV4dC1ib3VuZCBmdW5jdGlvbiB0byBvcGVuIHRhYnMgb24gcGFnZSBsb2FkIG9yIGhpc3RvcnkgcG9wc3RhdGVcbiAgICB0aGlzLl9jaGVja0RlZXBMaW5rID0gKCkgPT4ge1xuICAgICAgdmFyIGFuY2hvciA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoO1xuICAgICAgLy9uZWVkIGEgaGFzaCBhbmQgYSByZWxldmFudCBhbmNob3IgaW4gdGhpcyB0YWJzZXRcbiAgICAgIGlmKGFuY2hvci5sZW5ndGgpIHtcbiAgICAgICAgdmFyICRsaW5rID0gdGhpcy4kZWxlbWVudC5maW5kKCdbaHJlZiQ9XCInK2FuY2hvcisnXCJdJyk7XG4gICAgICAgIGlmICgkbGluay5sZW5ndGgpIHtcbiAgICAgICAgICB0aGlzLnNlbGVjdFRhYigkKGFuY2hvciksIHRydWUpO1xuXG4gICAgICAgICAgLy9yb2xsIHVwIGEgbGl0dGxlIHRvIHNob3cgdGhlIHRpdGxlc1xuICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMuZGVlcExpbmtTbXVkZ2UpIHtcbiAgICAgICAgICAgIHZhciBvZmZzZXQgPSB0aGlzLiRlbGVtZW50Lm9mZnNldCgpO1xuICAgICAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoeyBzY3JvbGxUb3A6IG9mZnNldC50b3AgfSwgdGhpcy5vcHRpb25zLmRlZXBMaW5rU211ZGdlRGVsYXkpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8qKlxuICAgICAgICAgICAgKiBGaXJlcyB3aGVuIHRoZSB6cGx1Z2luIGhhcyBkZWVwbGlua2VkIGF0IHBhZ2Vsb2FkXG4gICAgICAgICAgICAqIEBldmVudCBUYWJzI2RlZXBsaW5rXG4gICAgICAgICAgICAqL1xuICAgICAgICAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoJ2RlZXBsaW5rLnpmLnRhYnMnLCBbJGxpbmssICQoYW5jaG9yKV0pO1xuICAgICAgICAgfVxuICAgICAgIH1cbiAgICAgfVxuXG4gICAgLy91c2UgYnJvd3NlciB0byBvcGVuIGEgdGFiLCBpZiBpdCBleGlzdHMgaW4gdGhpcyB0YWJzZXRcbiAgICBpZiAodGhpcy5vcHRpb25zLmRlZXBMaW5rKSB7XG4gICAgICB0aGlzLl9jaGVja0RlZXBMaW5rKCk7XG4gICAgfVxuXG4gICAgdGhpcy5fZXZlbnRzKCk7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBldmVudCBoYW5kbGVycyBmb3IgaXRlbXMgd2l0aGluIHRoZSB0YWJzLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2V2ZW50cygpIHtcbiAgICB0aGlzLl9hZGRLZXlIYW5kbGVyKCk7XG4gICAgdGhpcy5fYWRkQ2xpY2tIYW5kbGVyKCk7XG4gICAgdGhpcy5fc2V0SGVpZ2h0TXFIYW5kbGVyID0gbnVsbDtcblxuICAgIGlmICh0aGlzLm9wdGlvbnMubWF0Y2hIZWlnaHQpIHtcbiAgICAgIHRoaXMuX3NldEhlaWdodE1xSGFuZGxlciA9IHRoaXMuX3NldEhlaWdodC5iaW5kKHRoaXMpO1xuXG4gICAgICAkKHdpbmRvdykub24oJ2NoYW5nZWQuemYubWVkaWFxdWVyeScsIHRoaXMuX3NldEhlaWdodE1xSGFuZGxlcik7XG4gICAgfVxuXG4gICAgaWYodGhpcy5vcHRpb25zLmRlZXBMaW5rKSB7XG4gICAgICAkKHdpbmRvdykub24oJ3BvcHN0YXRlJywgdGhpcy5fY2hlY2tEZWVwTGluayk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgY2xpY2sgaGFuZGxlcnMgZm9yIGl0ZW1zIHdpdGhpbiB0aGUgdGFicy5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9hZGRDbGlja0hhbmRsZXIoKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIHRoaXMuJGVsZW1lbnRcbiAgICAgIC5vZmYoJ2NsaWNrLnpmLnRhYnMnKVxuICAgICAgLm9uKCdjbGljay56Zi50YWJzJywgYC4ke3RoaXMub3B0aW9ucy5saW5rQ2xhc3N9YCwgZnVuY3Rpb24oZSl7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgX3RoaXMuX2hhbmRsZVRhYkNoYW5nZSgkKHRoaXMpKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMga2V5Ym9hcmQgZXZlbnQgaGFuZGxlcnMgZm9yIGl0ZW1zIHdpdGhpbiB0aGUgdGFicy5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9hZGRLZXlIYW5kbGVyKCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICB0aGlzLiR0YWJUaXRsZXMub2ZmKCdrZXlkb3duLnpmLnRhYnMnKS5vbigna2V5ZG93bi56Zi50YWJzJywgZnVuY3Rpb24oZSl7XG4gICAgICBpZiAoZS53aGljaCA9PT0gOSkgcmV0dXJuO1xuXG5cbiAgICAgIHZhciAkZWxlbWVudCA9ICQodGhpcyksXG4gICAgICAgICRlbGVtZW50cyA9ICRlbGVtZW50LnBhcmVudCgndWwnKS5jaGlsZHJlbignbGknKSxcbiAgICAgICAgJHByZXZFbGVtZW50LFxuICAgICAgICAkbmV4dEVsZW1lbnQ7XG5cbiAgICAgICRlbGVtZW50cy5lYWNoKGZ1bmN0aW9uKGkpIHtcbiAgICAgICAgaWYgKCQodGhpcykuaXMoJGVsZW1lbnQpKSB7XG4gICAgICAgICAgaWYgKF90aGlzLm9wdGlvbnMud3JhcE9uS2V5cykge1xuICAgICAgICAgICAgJHByZXZFbGVtZW50ID0gaSA9PT0gMCA/ICRlbGVtZW50cy5sYXN0KCkgOiAkZWxlbWVudHMuZXEoaS0xKTtcbiAgICAgICAgICAgICRuZXh0RWxlbWVudCA9IGkgPT09ICRlbGVtZW50cy5sZW5ndGggLTEgPyAkZWxlbWVudHMuZmlyc3QoKSA6ICRlbGVtZW50cy5lcShpKzEpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkcHJldkVsZW1lbnQgPSAkZWxlbWVudHMuZXEoTWF0aC5tYXgoMCwgaS0xKSk7XG4gICAgICAgICAgICAkbmV4dEVsZW1lbnQgPSAkZWxlbWVudHMuZXEoTWF0aC5taW4oaSsxLCAkZWxlbWVudHMubGVuZ3RoLTEpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgLy8gaGFuZGxlIGtleWJvYXJkIGV2ZW50IHdpdGgga2V5Ym9hcmQgdXRpbFxuICAgICAgS2V5Ym9hcmQuaGFuZGxlS2V5KGUsICdUYWJzJywge1xuICAgICAgICBvcGVuOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAkZWxlbWVudC5maW5kKCdbcm9sZT1cInRhYlwiXScpLmZvY3VzKCk7XG4gICAgICAgICAgX3RoaXMuX2hhbmRsZVRhYkNoYW5nZSgkZWxlbWVudCk7XG4gICAgICAgIH0sXG4gICAgICAgIHByZXZpb3VzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAkcHJldkVsZW1lbnQuZmluZCgnW3JvbGU9XCJ0YWJcIl0nKS5mb2N1cygpO1xuICAgICAgICAgIF90aGlzLl9oYW5kbGVUYWJDaGFuZ2UoJHByZXZFbGVtZW50KTtcbiAgICAgICAgfSxcbiAgICAgICAgbmV4dDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgJG5leHRFbGVtZW50LmZpbmQoJ1tyb2xlPVwidGFiXCJdJykuZm9jdXMoKTtcbiAgICAgICAgICBfdGhpcy5faGFuZGxlVGFiQ2hhbmdlKCRuZXh0RWxlbWVudCk7XG4gICAgICAgIH0sXG4gICAgICAgIGhhbmRsZWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBPcGVucyB0aGUgdGFiIGAkdGFyZ2V0Q29udGVudGAgZGVmaW5lZCBieSBgJHRhcmdldGAuIENvbGxhcHNlcyBhY3RpdmUgdGFiLlxuICAgKiBAcGFyYW0ge2pRdWVyeX0gJHRhcmdldCAtIFRhYiB0byBvcGVuLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IGhpc3RvcnlIYW5kbGVkIC0gYnJvd3NlciBoYXMgYWxyZWFkeSBoYW5kbGVkIGEgaGlzdG9yeSB1cGRhdGVcbiAgICogQGZpcmVzIFRhYnMjY2hhbmdlXG4gICAqIEBmdW5jdGlvblxuICAgKi9cbiAgX2hhbmRsZVRhYkNoYW5nZSgkdGFyZ2V0LCBoaXN0b3J5SGFuZGxlZCkge1xuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgZm9yIGFjdGl2ZSBjbGFzcyBvbiB0YXJnZXQuIENvbGxhcHNlIGlmIGV4aXN0cy5cbiAgICAgKi9cbiAgICBpZiAoJHRhcmdldC5oYXNDbGFzcyhgJHt0aGlzLm9wdGlvbnMubGlua0FjdGl2ZUNsYXNzfWApKSB7XG4gICAgICAgIGlmKHRoaXMub3B0aW9ucy5hY3RpdmVDb2xsYXBzZSkge1xuICAgICAgICAgICAgdGhpcy5fY29sbGFwc2VUYWIoJHRhcmdldCk7XG5cbiAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAqIEZpcmVzIHdoZW4gdGhlIHpwbHVnaW4gaGFzIHN1Y2Nlc3NmdWxseSBjb2xsYXBzZWQgdGFicy5cbiAgICAgICAgICAgICogQGV2ZW50IFRhYnMjY29sbGFwc2VcbiAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoJ2NvbGxhcHNlLnpmLnRhYnMnLCBbJHRhcmdldF0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgJG9sZFRhYiA9IHRoaXMuJGVsZW1lbnQuXG4gICAgICAgICAgZmluZChgLiR7dGhpcy5vcHRpb25zLmxpbmtDbGFzc30uJHt0aGlzLm9wdGlvbnMubGlua0FjdGl2ZUNsYXNzfWApLFxuICAgICAgICAgICR0YWJMaW5rID0gJHRhcmdldC5maW5kKCdbcm9sZT1cInRhYlwiXScpLFxuICAgICAgICAgIGhhc2ggPSAkdGFiTGluay5hdHRyKCdkYXRhLXRhYnMtdGFyZ2V0JykgfHwgJHRhYkxpbmtbMF0uaGFzaC5zbGljZSgxKSxcbiAgICAgICAgICAkdGFyZ2V0Q29udGVudCA9IHRoaXMuJHRhYkNvbnRlbnQuZmluZChgIyR7aGFzaH1gKTtcblxuICAgIC8vY2xvc2Ugb2xkIHRhYlxuICAgIHRoaXMuX2NvbGxhcHNlVGFiKCRvbGRUYWIpO1xuXG4gICAgLy9vcGVuIG5ldyB0YWJcbiAgICB0aGlzLl9vcGVuVGFiKCR0YXJnZXQpO1xuXG4gICAgLy9laXRoZXIgcmVwbGFjZSBvciB1cGRhdGUgYnJvd3NlciBoaXN0b3J5XG4gICAgaWYgKHRoaXMub3B0aW9ucy5kZWVwTGluayAmJiAhaGlzdG9yeUhhbmRsZWQpIHtcbiAgICAgIHZhciBhbmNob3IgPSAkdGFyZ2V0LmZpbmQoJ2EnKS5hdHRyKCdocmVmJyk7XG5cbiAgICAgIGlmICh0aGlzLm9wdGlvbnMudXBkYXRlSGlzdG9yeSkge1xuICAgICAgICBoaXN0b3J5LnB1c2hTdGF0ZSh7fSwgJycsIGFuY2hvcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBoaXN0b3J5LnJlcGxhY2VTdGF0ZSh7fSwgJycsIGFuY2hvcik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRmlyZXMgd2hlbiB0aGUgcGx1Z2luIGhhcyBzdWNjZXNzZnVsbHkgY2hhbmdlZCB0YWJzLlxuICAgICAqIEBldmVudCBUYWJzI2NoYW5nZVxuICAgICAqL1xuICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlcignY2hhbmdlLnpmLnRhYnMnLCBbJHRhcmdldCwgJHRhcmdldENvbnRlbnRdKTtcblxuICAgIC8vZmlyZSB0byBjaGlsZHJlbiBhIG11dGF0aW9uIGV2ZW50XG4gICAgJHRhcmdldENvbnRlbnQuZmluZChcIltkYXRhLW11dGF0ZV1cIikudHJpZ2dlcihcIm11dGF0ZW1lLnpmLnRyaWdnZXJcIik7XG4gIH1cblxuICAvKipcbiAgICogT3BlbnMgdGhlIHRhYiBgJHRhcmdldENvbnRlbnRgIGRlZmluZWQgYnkgYCR0YXJnZXRgLlxuICAgKiBAcGFyYW0ge2pRdWVyeX0gJHRhcmdldCAtIFRhYiB0byBPcGVuLlxuICAgKiBAZnVuY3Rpb25cbiAgICovXG4gIF9vcGVuVGFiKCR0YXJnZXQpIHtcbiAgICAgIHZhciAkdGFiTGluayA9ICR0YXJnZXQuZmluZCgnW3JvbGU9XCJ0YWJcIl0nKSxcbiAgICAgICAgICBoYXNoID0gJHRhYkxpbmsuYXR0cignZGF0YS10YWJzLXRhcmdldCcpIHx8ICR0YWJMaW5rWzBdLmhhc2guc2xpY2UoMSksXG4gICAgICAgICAgJHRhcmdldENvbnRlbnQgPSB0aGlzLiR0YWJDb250ZW50LmZpbmQoYCMke2hhc2h9YCk7XG5cbiAgICAgICR0YXJnZXQuYWRkQ2xhc3MoYCR7dGhpcy5vcHRpb25zLmxpbmtBY3RpdmVDbGFzc31gKTtcblxuICAgICAgJHRhYkxpbmsuYXR0cih7XG4gICAgICAgICdhcmlhLXNlbGVjdGVkJzogJ3RydWUnLFxuICAgICAgICAndGFiaW5kZXgnOiAnMCdcbiAgICAgIH0pO1xuXG4gICAgICAkdGFyZ2V0Q29udGVudFxuICAgICAgICAuYWRkQ2xhc3MoYCR7dGhpcy5vcHRpb25zLnBhbmVsQWN0aXZlQ2xhc3N9YCkucmVtb3ZlQXR0cignYXJpYS1oaWRkZW4nKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb2xsYXBzZXMgYCR0YXJnZXRDb250ZW50YCBkZWZpbmVkIGJ5IGAkdGFyZ2V0YC5cbiAgICogQHBhcmFtIHtqUXVlcnl9ICR0YXJnZXQgLSBUYWIgdG8gT3Blbi5cbiAgICogQGZ1bmN0aW9uXG4gICAqL1xuICBfY29sbGFwc2VUYWIoJHRhcmdldCkge1xuICAgIHZhciAkdGFyZ2V0X2FuY2hvciA9ICR0YXJnZXRcbiAgICAgIC5yZW1vdmVDbGFzcyhgJHt0aGlzLm9wdGlvbnMubGlua0FjdGl2ZUNsYXNzfWApXG4gICAgICAuZmluZCgnW3JvbGU9XCJ0YWJcIl0nKVxuICAgICAgLmF0dHIoe1xuICAgICAgICAnYXJpYS1zZWxlY3RlZCc6ICdmYWxzZScsXG4gICAgICAgICd0YWJpbmRleCc6IC0xXG4gICAgICB9KTtcblxuICAgICQoYCMkeyR0YXJnZXRfYW5jaG9yLmF0dHIoJ2FyaWEtY29udHJvbHMnKX1gKVxuICAgICAgLnJlbW92ZUNsYXNzKGAke3RoaXMub3B0aW9ucy5wYW5lbEFjdGl2ZUNsYXNzfWApXG4gICAgICAuYXR0cih7ICdhcmlhLWhpZGRlbic6ICd0cnVlJyB9KVxuICB9XG5cbiAgLyoqXG4gICAqIFB1YmxpYyBtZXRob2QgZm9yIHNlbGVjdGluZyBhIGNvbnRlbnQgcGFuZSB0byBkaXNwbGF5LlxuICAgKiBAcGFyYW0ge2pRdWVyeSB8IFN0cmluZ30gZWxlbSAtIGpRdWVyeSBvYmplY3Qgb3Igc3RyaW5nIG9mIHRoZSBpZCBvZiB0aGUgcGFuZSB0byBkaXNwbGF5LlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IGhpc3RvcnlIYW5kbGVkIC0gYnJvd3NlciBoYXMgYWxyZWFkeSBoYW5kbGVkIGEgaGlzdG9yeSB1cGRhdGVcbiAgICogQGZ1bmN0aW9uXG4gICAqL1xuICBzZWxlY3RUYWIoZWxlbSwgaGlzdG9yeUhhbmRsZWQpIHtcbiAgICB2YXIgaWRTdHI7XG5cbiAgICBpZiAodHlwZW9mIGVsZW0gPT09ICdvYmplY3QnKSB7XG4gICAgICBpZFN0ciA9IGVsZW1bMF0uaWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlkU3RyID0gZWxlbTtcbiAgICB9XG5cbiAgICBpZiAoaWRTdHIuaW5kZXhPZignIycpIDwgMCkge1xuICAgICAgaWRTdHIgPSBgIyR7aWRTdHJ9YDtcbiAgICB9XG5cbiAgICB2YXIgJHRhcmdldCA9IHRoaXMuJHRhYlRpdGxlcy5maW5kKGBbaHJlZiQ9XCIke2lkU3RyfVwiXWApLnBhcmVudChgLiR7dGhpcy5vcHRpb25zLmxpbmtDbGFzc31gKTtcblxuICAgIHRoaXMuX2hhbmRsZVRhYkNoYW5nZSgkdGFyZ2V0LCBoaXN0b3J5SGFuZGxlZCk7XG4gIH07XG4gIC8qKlxuICAgKiBTZXRzIHRoZSBoZWlnaHQgb2YgZWFjaCBwYW5lbCB0byB0aGUgaGVpZ2h0IG9mIHRoZSB0YWxsZXN0IHBhbmVsLlxuICAgKiBJZiBlbmFibGVkIGluIG9wdGlvbnMsIGdldHMgY2FsbGVkIG9uIG1lZGlhIHF1ZXJ5IGNoYW5nZS5cbiAgICogSWYgbG9hZGluZyBjb250ZW50IHZpYSBleHRlcm5hbCBzb3VyY2UsIGNhbiBiZSBjYWxsZWQgZGlyZWN0bHkgb3Igd2l0aCBfcmVmbG93LlxuICAgKiBJZiBlbmFibGVkIHdpdGggYGRhdGEtbWF0Y2gtaGVpZ2h0PVwidHJ1ZVwiYCwgdGFicyBzZXRzIHRvIGVxdWFsIGhlaWdodFxuICAgKiBAZnVuY3Rpb25cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9zZXRIZWlnaHQoKSB7XG4gICAgdmFyIG1heCA9IDAsXG4gICAgICAgIF90aGlzID0gdGhpczsgLy8gTG9jayBkb3duIHRoZSBgdGhpc2AgdmFsdWUgZm9yIHRoZSByb290IHRhYnMgb2JqZWN0XG5cbiAgICB0aGlzLiR0YWJDb250ZW50XG4gICAgICAuZmluZChgLiR7dGhpcy5vcHRpb25zLnBhbmVsQ2xhc3N9YClcbiAgICAgIC5jc3MoJ2hlaWdodCcsICcnKVxuICAgICAgLmVhY2goZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIHBhbmVsID0gJCh0aGlzKSxcbiAgICAgICAgICAgIGlzQWN0aXZlID0gcGFuZWwuaGFzQ2xhc3MoYCR7X3RoaXMub3B0aW9ucy5wYW5lbEFjdGl2ZUNsYXNzfWApOyAvLyBnZXQgdGhlIG9wdGlvbnMgZnJvbSB0aGUgcGFyZW50IGluc3RlYWQgb2YgdHJ5aW5nIHRvIGdldCB0aGVtIGZyb20gdGhlIGNoaWxkXG5cbiAgICAgICAgaWYgKCFpc0FjdGl2ZSkge1xuICAgICAgICAgIHBhbmVsLmNzcyh7J3Zpc2liaWxpdHknOiAnaGlkZGVuJywgJ2Rpc3BsYXknOiAnYmxvY2snfSk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgdGVtcCA9IHRoaXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0O1xuXG4gICAgICAgIGlmICghaXNBY3RpdmUpIHtcbiAgICAgICAgICBwYW5lbC5jc3Moe1xuICAgICAgICAgICAgJ3Zpc2liaWxpdHknOiAnJyxcbiAgICAgICAgICAgICdkaXNwbGF5JzogJydcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIG1heCA9IHRlbXAgPiBtYXggPyB0ZW1wIDogbWF4O1xuICAgICAgfSlcbiAgICAgIC5jc3MoJ2hlaWdodCcsIGAke21heH1weGApO1xuICB9XG5cbiAgLyoqXG4gICAqIERlc3Ryb3lzIGFuIGluc3RhbmNlIG9mIGFuIHRhYnMuXG4gICAqIEBmaXJlcyBUYWJzI2Rlc3Ryb3llZFxuICAgKi9cbiAgX2Rlc3Ryb3koKSB7XG4gICAgdGhpcy4kZWxlbWVudFxuICAgICAgLmZpbmQoYC4ke3RoaXMub3B0aW9ucy5saW5rQ2xhc3N9YClcbiAgICAgIC5vZmYoJy56Zi50YWJzJykuaGlkZSgpLmVuZCgpXG4gICAgICAuZmluZChgLiR7dGhpcy5vcHRpb25zLnBhbmVsQ2xhc3N9YClcbiAgICAgIC5oaWRlKCk7XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLm1hdGNoSGVpZ2h0KSB7XG4gICAgICBpZiAodGhpcy5fc2V0SGVpZ2h0TXFIYW5kbGVyICE9IG51bGwpIHtcbiAgICAgICAgICQod2luZG93KS5vZmYoJ2NoYW5nZWQuemYubWVkaWFxdWVyeScsIHRoaXMuX3NldEhlaWdodE1xSGFuZGxlcik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5kZWVwTGluaykge1xuICAgICAgJCh3aW5kb3cpLm9mZigncG9wc3RhdGUnLCB0aGlzLl9jaGVja0RlZXBMaW5rKTtcbiAgICB9XG5cbiAgfVxufVxuXG5UYWJzLmRlZmF1bHRzID0ge1xuICAvKipcbiAgICogQWxsb3dzIHRoZSB3aW5kb3cgdG8gc2Nyb2xsIHRvIGNvbnRlbnQgb2YgcGFuZSBzcGVjaWZpZWQgYnkgaGFzaCBhbmNob3JcbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQGRlZmF1bHQgZmFsc2VcbiAgICovXG4gIGRlZXBMaW5rOiBmYWxzZSxcblxuICAvKipcbiAgICogQWRqdXN0IHRoZSBkZWVwIGxpbmsgc2Nyb2xsIHRvIG1ha2Ugc3VyZSB0aGUgdG9wIG9mIHRoZSB0YWIgcGFuZWwgaXMgdmlzaWJsZVxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgKi9cbiAgZGVlcExpbmtTbXVkZ2U6IGZhbHNlLFxuXG4gIC8qKlxuICAgKiBBbmltYXRpb24gdGltZSAobXMpIGZvciB0aGUgZGVlcCBsaW5rIGFkanVzdG1lbnRcbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgKiBAZGVmYXVsdCAzMDBcbiAgICovXG4gIGRlZXBMaW5rU211ZGdlRGVsYXk6IDMwMCxcblxuICAvKipcbiAgICogVXBkYXRlIHRoZSBicm93c2VyIGhpc3Rvcnkgd2l0aCB0aGUgb3BlbiB0YWJcbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQGRlZmF1bHQgZmFsc2VcbiAgICovXG4gIHVwZGF0ZUhpc3Rvcnk6IGZhbHNlLFxuXG4gIC8qKlxuICAgKiBBbGxvd3MgdGhlIHdpbmRvdyB0byBzY3JvbGwgdG8gY29udGVudCBvZiBhY3RpdmUgcGFuZSBvbiBsb2FkIGlmIHNldCB0byB0cnVlLlxuICAgKiBOb3QgcmVjb21tZW5kZWQgaWYgbW9yZSB0aGFuIG9uZSB0YWIgcGFuZWwgcGVyIHBhZ2UuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBkZWZhdWx0IGZhbHNlXG4gICAqL1xuICBhdXRvRm9jdXM6IGZhbHNlLFxuXG4gIC8qKlxuICAgKiBBbGxvd3Mga2V5Ym9hcmQgaW5wdXQgdG8gJ3dyYXAnIGFyb3VuZCB0aGUgdGFiIGxpbmtzLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAZGVmYXVsdCB0cnVlXG4gICAqL1xuICB3cmFwT25LZXlzOiB0cnVlLFxuXG4gIC8qKlxuICAgKiBBbGxvd3MgdGhlIHRhYiBjb250ZW50IHBhbmVzIHRvIG1hdGNoIGhlaWdodHMgaWYgc2V0IHRvIHRydWUuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBkZWZhdWx0IGZhbHNlXG4gICAqL1xuICBtYXRjaEhlaWdodDogZmFsc2UsXG5cbiAgLyoqXG4gICAqIEFsbG93cyBhY3RpdmUgdGFicyB0byBjb2xsYXBzZSB3aGVuIGNsaWNrZWQuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBkZWZhdWx0IGZhbHNlXG4gICAqL1xuICBhY3RpdmVDb2xsYXBzZTogZmFsc2UsXG5cbiAgLyoqXG4gICAqIENsYXNzIGFwcGxpZWQgdG8gYGxpYCdzIGluIHRhYiBsaW5rIGxpc3QuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge3N0cmluZ31cbiAgICogQGRlZmF1bHQgJ3RhYnMtdGl0bGUnXG4gICAqL1xuICBsaW5rQ2xhc3M6ICd0YWJzLXRpdGxlJyxcblxuICAvKipcbiAgICogQ2xhc3MgYXBwbGllZCB0byB0aGUgYWN0aXZlIGBsaWAgaW4gdGFiIGxpbmsgbGlzdC5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKiBAZGVmYXVsdCAnaXMtYWN0aXZlJ1xuICAgKi9cbiAgbGlua0FjdGl2ZUNsYXNzOiAnaXMtYWN0aXZlJyxcblxuICAvKipcbiAgICogQ2xhc3MgYXBwbGllZCB0byB0aGUgY29udGVudCBjb250YWluZXJzLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqIEBkZWZhdWx0ICd0YWJzLXBhbmVsJ1xuICAgKi9cbiAgcGFuZWxDbGFzczogJ3RhYnMtcGFuZWwnLFxuXG4gIC8qKlxuICAgKiBDbGFzcyBhcHBsaWVkIHRvIHRoZSBhY3RpdmUgY29udGVudCBjb250YWluZXIuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge3N0cmluZ31cbiAgICogQGRlZmF1bHQgJ2lzLWFjdGl2ZSdcbiAgICovXG4gIHBhbmVsQWN0aXZlQ2xhc3M6ICdpcy1hY3RpdmUnXG59O1xuXG5leHBvcnQge1RhYnN9O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi50YWJzLmpzIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuXG4vKipcbiAqIFJ1bnMgYSBjYWxsYmFjayBmdW5jdGlvbiB3aGVuIGltYWdlcyBhcmUgZnVsbHkgbG9hZGVkLlxuICogQHBhcmFtIHtPYmplY3R9IGltYWdlcyAtIEltYWdlKHMpIHRvIGNoZWNrIGlmIGxvYWRlZC5cbiAqIEBwYXJhbSB7RnVuY30gY2FsbGJhY2sgLSBGdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gaW1hZ2UgaXMgZnVsbHkgbG9hZGVkLlxuICovXG5mdW5jdGlvbiBvbkltYWdlc0xvYWRlZChpbWFnZXMsIGNhbGxiYWNrKXtcbiAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgdW5sb2FkZWQgPSBpbWFnZXMubGVuZ3RoO1xuXG4gIGlmICh1bmxvYWRlZCA9PT0gMCkge1xuICAgIGNhbGxiYWNrKCk7XG4gIH1cblxuICBpbWFnZXMuZWFjaChmdW5jdGlvbigpe1xuICAgIC8vIENoZWNrIGlmIGltYWdlIGlzIGxvYWRlZFxuICAgIGlmICh0aGlzLmNvbXBsZXRlICYmIHRoaXMubmF0dXJhbFdpZHRoICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHNpbmdsZUltYWdlTG9hZGVkKCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgLy8gSWYgdGhlIGFib3ZlIGNoZWNrIGZhaWxlZCwgc2ltdWxhdGUgbG9hZGluZyBvbiBkZXRhY2hlZCBlbGVtZW50LlxuICAgICAgdmFyIGltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgICAvLyBTdGlsbCBjb3VudCBpbWFnZSBhcyBsb2FkZWQgaWYgaXQgZmluYWxpemVzIHdpdGggYW4gZXJyb3IuXG4gICAgICB2YXIgZXZlbnRzID0gXCJsb2FkLnpmLmltYWdlcyBlcnJvci56Zi5pbWFnZXNcIjtcbiAgICAgICQoaW1hZ2UpLm9uZShldmVudHMsIGZ1bmN0aW9uIG1lKGV2ZW50KXtcbiAgICAgICAgLy8gVW5iaW5kIHRoZSBldmVudCBsaXN0ZW5lcnMuIFdlJ3JlIHVzaW5nICdvbmUnIGJ1dCBvbmx5IG9uZSBvZiB0aGUgdHdvIGV2ZW50cyB3aWxsIGhhdmUgZmlyZWQuXG4gICAgICAgICQodGhpcykub2ZmKGV2ZW50cywgbWUpO1xuICAgICAgICBzaW5nbGVJbWFnZUxvYWRlZCgpO1xuICAgICAgfSk7XG4gICAgICBpbWFnZS5zcmMgPSAkKHRoaXMpLmF0dHIoJ3NyYycpO1xuICAgIH1cbiAgfSk7XG5cbiAgZnVuY3Rpb24gc2luZ2xlSW1hZ2VMb2FkZWQoKSB7XG4gICAgdW5sb2FkZWQtLTtcbiAgICBpZiAodW5sb2FkZWQgPT09IDApIHtcbiAgICAgIGNhbGxiYWNrKCk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCB7IG9uSW1hZ2VzTG9hZGVkIH07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLnV0aWwuaW1hZ2VMb2FkZXIuanMiXSwic291cmNlUm9vdCI6IiJ9