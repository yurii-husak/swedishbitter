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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
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

var _foundationUtil = __webpack_require__(10);

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

module.exports = __webpack_require__(6);


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

var _whatInput = __webpack_require__(7);

var _whatInput2 = _interopRequireDefault(_whatInput);

__webpack_require__(8);

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

/***/ }),
/* 7 */
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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

var _foundation = __webpack_require__(9);

var _foundationUtil = __webpack_require__(3);

var _foundationUtil2 = __webpack_require__(2);

var _foundationUtil3 = __webpack_require__(4);

var _foundation2 = __webpack_require__(11);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { Orbit } from 'foundation-sites/js/foundation.orbit';
// import { ResponsiveMenu } from 'foundation-sites/js/foundation.responsiveMenu';
// import { ResponsiveToggle } from 'foundation-sites/js/foundation.responsiveToggle';
// import { Reveal } from 'foundation-sites/js/foundation.reveal';
// import { Slider } from 'foundation-sites/js/foundation.slider';
// import { SmoothScroll } from 'foundation-sites/js/foundation.smoothScroll';
// import { Sticky } from 'foundation-sites/js/foundation.sticky';
// import { Tabs } from 'foundation-sites/js/foundation.tabs';
// import { Toggler } from 'foundation-sites/js/foundation.toggler';
// import { Tooltip } from 'foundation-sites/js/foundation.tooltip';
// import { ResponsiveAccordionTabs } from 'foundation-sites/js/foundation.responsiveAccordionTabs';


// import { Motion, Move } from 'foundation-sites/js/foundation.util.motion';
// import { Nest } from 'foundation-sites/js/foundation.util.nest';
// import { Timer } from 'foundation-sites/js/foundation.util.timer';
// import { Touch } from 'foundation-sites/js/foundation.util.touch';

// import { rtl, GetYoDigits, transitionend } from 'foundation-sites/js/foundation.util.core';
// import { Box } from 'foundation-sites/js/foundation.util.box'
// import { onImagesLoaded } from 'foundation-sites/js/foundation.util.imageLoader';
_foundation.Foundation.addToJquery(_jquery2.default);

// Add Foundation Utils to Foundation global namespace for backwards
// compatibility.

// Foundation.rtl = rtl;
// Foundation.GetYoDigits = GetYoDigits;
// Foundation.transitionend = transitionend;
//
// Foundation.Box = Box;
// Foundation.onImagesLoaded = onImagesLoaded;

// import { Abide } from 'foundation-sites/js/foundation.abide';
// import { Accordion } from 'foundation-sites/js/foundation.accordion';
// import { AccordionMenu } from 'foundation-sites/js/foundation.accordionMenu';
// import { Drilldown } from 'foundation-sites/js/foundation.drilldown';
// import { Dropdown } from 'foundation-sites/js/foundation.dropdown';
// import { DropdownMenu } from 'foundation-sites/js/foundation.dropdownMenu';
// import { Equalizer } from 'foundation-sites/js/foundation.equalizer';
// import { Interchange } from 'foundation-sites/js/foundation.interchange';
// import { Magellan } from 'foundation-sites/js/foundation.magellan';
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
// Foundation.plugin(Tabs, 'Tabs');
//
// Foundation.plugin(Toggler, 'Toggler');
//
// Foundation.plugin(Tooltip, 'Tooltip');
//
// Foundation.plugin(ResponsiveAccordionTabs, 'ResponsiveAccordionTabs');

module.exports = _foundation.Foundation;

/***/ }),
/* 9 */
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
/* 10 */
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
/* 11 */
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

var _foundation = __webpack_require__(12);

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
/* 12 */
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

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOGQwODZhMTc0MmEwM2MxMDlkZTYiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwialF1ZXJ5XCIiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi51dGlsLmNvcmUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi51dGlsLm1lZGlhUXVlcnkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi51dGlsLmtleWJvYXJkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24udXRpbC50cmlnZ2Vycy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2pzL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2hhdC1pbnB1dC9kaXN0L3doYXQtaW5wdXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9qcy9saWIvZm91bmRhdGlvbi1leHBsaWNpdC1waWVjZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi5jb3JlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24udXRpbC5tb3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi5vZmZjYW52YXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi5wbHVnaW4uanMiXSwibmFtZXMiOlsicnRsIiwiYXR0ciIsIkdldFlvRGlnaXRzIiwibGVuZ3RoIiwibmFtZXNwYWNlIiwiTWF0aCIsInJvdW5kIiwicG93IiwicmFuZG9tIiwidG9TdHJpbmciLCJzbGljZSIsInRyYW5zaXRpb25lbmQiLCIkZWxlbSIsInRyYW5zaXRpb25zIiwiZWxlbSIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImVuZCIsInQiLCJzdHlsZSIsInNldFRpbWVvdXQiLCJ0cmlnZ2VySGFuZGxlciIsImRlZmF1bHRRdWVyaWVzIiwibGFuZHNjYXBlIiwicG9ydHJhaXQiLCJyZXRpbmEiLCJtYXRjaE1lZGlhIiwid2luZG93Iiwic3R5bGVNZWRpYSIsIm1lZGlhIiwic2NyaXB0IiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJpbmZvIiwidHlwZSIsImlkIiwicGFyZW50Tm9kZSIsImluc2VydEJlZm9yZSIsImdldENvbXB1dGVkU3R5bGUiLCJjdXJyZW50U3R5bGUiLCJtYXRjaE1lZGl1bSIsInRleHQiLCJzdHlsZVNoZWV0IiwiY3NzVGV4dCIsInRleHRDb250ZW50Iiwid2lkdGgiLCJtYXRjaGVzIiwiTWVkaWFRdWVyeSIsInF1ZXJpZXMiLCJjdXJyZW50IiwiX2luaXQiLCJzZWxmIiwiJG1ldGEiLCJhcHBlbmRUbyIsImhlYWQiLCJleHRyYWN0ZWRTdHlsZXMiLCJjc3MiLCJuYW1lZFF1ZXJpZXMiLCJwYXJzZVN0eWxlVG9PYmplY3QiLCJrZXkiLCJoYXNPd25Qcm9wZXJ0eSIsInB1c2giLCJuYW1lIiwidmFsdWUiLCJfZ2V0Q3VycmVudFNpemUiLCJfd2F0Y2hlciIsImF0TGVhc3QiLCJzaXplIiwicXVlcnkiLCJnZXQiLCJpcyIsInRyaW0iLCJzcGxpdCIsImkiLCJtYXRjaGVkIiwib2ZmIiwib24iLCJuZXdTaXplIiwiY3VycmVudFNpemUiLCJ0cmlnZ2VyIiwic3RyIiwic3R5bGVPYmplY3QiLCJyZWR1Y2UiLCJyZXQiLCJwYXJhbSIsInBhcnRzIiwicmVwbGFjZSIsInZhbCIsImRlY29kZVVSSUNvbXBvbmVudCIsInVuZGVmaW5lZCIsIkFycmF5IiwiaXNBcnJheSIsImtleUNvZGVzIiwiY29tbWFuZHMiLCJmaW5kRm9jdXNhYmxlIiwiJGVsZW1lbnQiLCJmaW5kIiwiZmlsdGVyIiwicGFyc2VLZXkiLCJldmVudCIsIndoaWNoIiwia2V5Q29kZSIsIlN0cmluZyIsImZyb21DaGFyQ29kZSIsInRvVXBwZXJDYXNlIiwic2hpZnRLZXkiLCJjdHJsS2V5IiwiYWx0S2V5IiwiS2V5Ym9hcmQiLCJrZXlzIiwiZ2V0S2V5Q29kZXMiLCJoYW5kbGVLZXkiLCJjb21wb25lbnQiLCJmdW5jdGlvbnMiLCJjb21tYW5kTGlzdCIsImNtZHMiLCJjb21tYW5kIiwiZm4iLCJjb25zb2xlIiwid2FybiIsImx0ciIsIiQiLCJleHRlbmQiLCJyZXR1cm5WYWx1ZSIsImFwcGx5IiwiaGFuZGxlZCIsInVuaGFuZGxlZCIsInJlZ2lzdGVyIiwiY29tcG9uZW50TmFtZSIsInRyYXBGb2N1cyIsIiRmb2N1c2FibGUiLCIkZmlyc3RGb2N1c2FibGUiLCJlcSIsIiRsYXN0Rm9jdXNhYmxlIiwidGFyZ2V0IiwicHJldmVudERlZmF1bHQiLCJmb2N1cyIsInJlbGVhc2VGb2N1cyIsImtjcyIsImsiLCJrYyIsIk11dGF0aW9uT2JzZXJ2ZXIiLCJwcmVmaXhlcyIsInRyaWdnZXJzIiwiZWwiLCJkYXRhIiwiZm9yRWFjaCIsIlRyaWdnZXJzIiwiTGlzdGVuZXJzIiwiQmFzaWMiLCJHbG9iYWwiLCJJbml0aWFsaXplcnMiLCJvcGVuTGlzdGVuZXIiLCJjbG9zZUxpc3RlbmVyIiwidG9nZ2xlTGlzdGVuZXIiLCJjbG9zZWFibGVMaXN0ZW5lciIsImUiLCJzdG9wUHJvcGFnYXRpb24iLCJhbmltYXRpb24iLCJNb3Rpb24iLCJhbmltYXRlT3V0IiwiZmFkZU91dCIsInRvZ2dsZUZvY3VzTGlzdGVuZXIiLCJhZGRPcGVuTGlzdGVuZXIiLCJhZGRDbG9zZUxpc3RlbmVyIiwiYWRkVG9nZ2xlTGlzdGVuZXIiLCJhZGRDbG9zZWFibGVMaXN0ZW5lciIsImFkZFRvZ2dsZUZvY3VzTGlzdGVuZXIiLCJyZXNpemVMaXN0ZW5lciIsIiRub2RlcyIsImVhY2giLCJzY3JvbGxMaXN0ZW5lciIsImNsb3NlTWVMaXN0ZW5lciIsInBsdWdpbklkIiwicGx1Z2luIiwicGx1Z2lucyIsIm5vdCIsIl90aGlzIiwiYWRkQ2xvc2VtZUxpc3RlbmVyIiwicGx1Z2luTmFtZSIsInlldGlCb3hlcyIsInBsdWdOYW1lcyIsImNvbmNhdCIsImVycm9yIiwibGlzdGVuZXJzIiwibWFwIiwiam9pbiIsImRlYm91bmNlR2xvYmFsTGlzdGVuZXIiLCJkZWJvdW5jZSIsImxpc3RlbmVyIiwidGltZXIiLCJhcmdzIiwicHJvdG90eXBlIiwiY2FsbCIsImFyZ3VtZW50cyIsImNsZWFyVGltZW91dCIsImFkZFJlc2l6ZUxpc3RlbmVyIiwiYWRkU2Nyb2xsTGlzdGVuZXIiLCJhZGRNdXRhdGlvbkV2ZW50c0xpc3RlbmVyIiwibGlzdGVuaW5nRWxlbWVudHNNdXRhdGlvbiIsIm11dGF0aW9uUmVjb3Jkc0xpc3QiLCIkdGFyZ2V0IiwiYXR0cmlidXRlTmFtZSIsInBhZ2VZT2Zmc2V0IiwiY2xvc2VzdCIsImVsZW1lbnRPYnNlcnZlciIsIm9ic2VydmUiLCJhdHRyaWJ1dGVzIiwiY2hpbGRMaXN0IiwiY2hhcmFjdGVyRGF0YSIsInN1YnRyZWUiLCJhdHRyaWJ1dGVGaWx0ZXIiLCJhZGRTaW1wbGVMaXN0ZW5lcnMiLCIkZG9jdW1lbnQiLCJhZGRHbG9iYWxMaXN0ZW5lcnMiLCJpbml0IiwiRm91bmRhdGlvbiIsInRyaWdnZXJzSW5pdGlhbGl6ZWQiLCJyZWFkeVN0YXRlIiwiSUhlYXJZb3UiLCJmb3VuZGF0aW9uIiwiYWRkQ2xhc3MiLCJ0YWJfaWQiLCJyZW1vdmVDbGFzcyIsImhpZGUiLCJmYWRlSW4iLCJhZGRUb0pxdWVyeSIsIk9mZkNhbnZhcyIsIm1vZHVsZSIsImV4cG9ydHMiLCJGT1VOREFUSU9OX1ZFUlNJT04iLCJ2ZXJzaW9uIiwiX3BsdWdpbnMiLCJfdXVpZHMiLCJjbGFzc05hbWUiLCJmdW5jdGlvbk5hbWUiLCJhdHRyTmFtZSIsImh5cGhlbmF0ZSIsInJlZ2lzdGVyUGx1Z2luIiwiY29uc3RydWN0b3IiLCJ0b0xvd2VyQ2FzZSIsInV1aWQiLCJ1bnJlZ2lzdGVyUGx1Z2luIiwic3BsaWNlIiwiaW5kZXhPZiIsInJlbW92ZUF0dHIiLCJyZW1vdmVEYXRhIiwicHJvcCIsInJlSW5pdCIsImlzSlEiLCJmbnMiLCJwbGdzIiwicCIsIk9iamVjdCIsImVyciIsInJlZmxvdyIsImFkZEJhY2siLCIkZWwiLCJvcHRzIiwidGhpbmciLCJvcHQiLCJwYXJzZVZhbHVlIiwiZXIiLCJnZXRGbk5hbWUiLCJtZXRob2QiLCIkbm9KUyIsInBsdWdDbGFzcyIsIlJlZmVyZW5jZUVycm9yIiwiVHlwZUVycm9yIiwidXRpbCIsInRocm90dGxlIiwiZnVuYyIsImRlbGF5IiwiY29udGV4dCIsIkRhdGUiLCJub3ciLCJnZXRUaW1lIiwidmVuZG9ycyIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsInZwIiwiY2FuY2VsQW5pbWF0aW9uRnJhbWUiLCJ0ZXN0IiwibmF2aWdhdG9yIiwidXNlckFnZW50IiwibGFzdFRpbWUiLCJjYWxsYmFjayIsIm5leHRUaW1lIiwibWF4IiwicGVyZm9ybWFuY2UiLCJzdGFydCIsIkZ1bmN0aW9uIiwiYmluZCIsIm9UaGlzIiwiYUFyZ3MiLCJmVG9CaW5kIiwiZk5PUCIsImZCb3VuZCIsImZ1bmNOYW1lUmVnZXgiLCJyZXN1bHRzIiwiZXhlYyIsImlzTmFOIiwicGFyc2VGbG9hdCIsImluaXRDbGFzc2VzIiwiYWN0aXZlQ2xhc3NlcyIsImFuaW1hdGVJbiIsImVsZW1lbnQiLCJjYiIsImFuaW1hdGUiLCJNb3ZlIiwiZHVyYXRpb24iLCJhbmltIiwicHJvZyIsIm1vdmUiLCJ0cyIsImlzSW4iLCJpbml0Q2xhc3MiLCJhY3RpdmVDbGFzcyIsInJlc2V0Iiwic2hvdyIsIm9mZnNldFdpZHRoIiwib25lIiwiZmluaXNoIiwidHJhbnNpdGlvbkR1cmF0aW9uIiwib3B0aW9ucyIsImRlZmF1bHRzIiwiY29udGVudENsYXNzZXMiLCJiYXNlIiwicmV2ZWFsIiwiJGxhc3RUcmlnZ2VyIiwiJHRyaWdnZXJzIiwicG9zaXRpb24iLCIkY29udGVudCIsIm5lc3RlZCIsImluZGV4IiwiX2V2ZW50cyIsImNvbnRlbnRJZCIsInNpYmxpbmdzIiwiZmlyc3QiLCJ0cmFuc2l0aW9uIiwibWF0Y2giLCJjb250ZW50T3ZlcmxheSIsIm92ZXJsYXkiLCJvdmVybGF5UG9zaXRpb24iLCJzZXRBdHRyaWJ1dGUiLCIkb3ZlcmxheSIsImluc2VydEFmdGVyIiwiYXBwZW5kIiwiaXNSZXZlYWxlZCIsIlJlZ0V4cCIsInJldmVhbENsYXNzIiwicmV2ZWFsT24iLCJfc2V0TVFDaGVja2VyIiwidHJhbnNpdGlvblRpbWUiLCJfcmVtb3ZlQ29udGVudENsYXNzZXMiLCJvcGVuIiwiY2xvc2UiLCJ0b2dnbGUiLCJfaGFuZGxlS2V5Ym9hcmQiLCJjbG9zZU9uQ2xpY2siLCJoYXNSZXZlYWwiLCJfYWRkQ29udGVudENsYXNzZXMiLCJzY3JvbGxIZWlnaHQiLCJjbGllbnRIZWlnaHQiLCJzY3JvbGxUb3AiLCJhbGxvd1VwIiwiYWxsb3dEb3duIiwibGFzdFkiLCJvcmlnaW5hbEV2ZW50IiwicGFnZVkiLCJ1cCIsImRvd24iLCJoYXNDbGFzcyIsImZvcmNlVG8iLCJzY3JvbGxUbyIsImJvZHkiLCJjb250ZW50U2Nyb2xsIiwiX3N0b3BTY3JvbGxpbmciLCJfcmVjb3JkU2Nyb2xsYWJsZSIsIl9zdG9wU2Nyb2xsUHJvcGFnYXRpb24iLCJhdXRvRm9jdXMiLCJjYW52YXNGb2N1cyIsIlBsdWdpbiIsIl9zZXR1cCIsImdldFBsdWdpbk5hbWUiLCJfZGVzdHJveSIsIm9iaiJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7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QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSx3Q0FBd0M7QUFDeEM7QUFDQTtBQUNBO0FBQ0EsTUFBTTs7QUFFTjtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLGdCQUFnQjs7QUFFdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBOztBQUVBO0FB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dHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDUpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDhkMDg2YTE3NDJhMDNjMTA5ZGU2IiwibW9kdWxlLmV4cG9ydHMgPSBqUXVlcnk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJqUXVlcnlcIlxuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcblxuLy8gQ29yZSBGb3VuZGF0aW9uIFV0aWxpdGllcywgdXRpbGl6ZWQgaW4gYSBudW1iZXIgb2YgcGxhY2VzLlxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgYm9vbGVhbiBmb3IgUlRMIHN1cHBvcnRcbiAgICovXG5mdW5jdGlvbiBydGwoKSB7XG4gIHJldHVybiAkKCdodG1sJykuYXR0cignZGlyJykgPT09ICdydGwnO1xufVxuXG4vKipcbiAqIHJldHVybnMgYSByYW5kb20gYmFzZS0zNiB1aWQgd2l0aCBuYW1lc3BhY2luZ1xuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge051bWJlcn0gbGVuZ3RoIC0gbnVtYmVyIG9mIHJhbmRvbSBiYXNlLTM2IGRpZ2l0cyBkZXNpcmVkLiBJbmNyZWFzZSBmb3IgbW9yZSByYW5kb20gc3RyaW5ncy5cbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lc3BhY2UgLSBuYW1lIG9mIHBsdWdpbiB0byBiZSBpbmNvcnBvcmF0ZWQgaW4gdWlkLCBvcHRpb25hbC5cbiAqIEBkZWZhdWx0IHtTdHJpbmd9ICcnIC0gaWYgbm8gcGx1Z2luIG5hbWUgaXMgcHJvdmlkZWQsIG5vdGhpbmcgaXMgYXBwZW5kZWQgdG8gdGhlIHVpZC5cbiAqIEByZXR1cm5zIHtTdHJpbmd9IC0gdW5pcXVlIGlkXG4gKi9cbmZ1bmN0aW9uIEdldFlvRGlnaXRzKGxlbmd0aCwgbmFtZXNwYWNlKXtcbiAgbGVuZ3RoID0gbGVuZ3RoIHx8IDY7XG4gIHJldHVybiBNYXRoLnJvdW5kKChNYXRoLnBvdygzNiwgbGVuZ3RoICsgMSkgLSBNYXRoLnJhbmRvbSgpICogTWF0aC5wb3coMzYsIGxlbmd0aCkpKS50b1N0cmluZygzNikuc2xpY2UoMSkgKyAobmFtZXNwYWNlID8gYC0ke25hbWVzcGFjZX1gIDogJycpO1xufVxuXG5mdW5jdGlvbiB0cmFuc2l0aW9uZW5kKCRlbGVtKXtcbiAgdmFyIHRyYW5zaXRpb25zID0ge1xuICAgICd0cmFuc2l0aW9uJzogJ3RyYW5zaXRpb25lbmQnLFxuICAgICdXZWJraXRUcmFuc2l0aW9uJzogJ3dlYmtpdFRyYW5zaXRpb25FbmQnLFxuICAgICdNb3pUcmFuc2l0aW9uJzogJ3RyYW5zaXRpb25lbmQnLFxuICAgICdPVHJhbnNpdGlvbic6ICdvdHJhbnNpdGlvbmVuZCdcbiAgfTtcbiAgdmFyIGVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcbiAgICAgIGVuZDtcblxuICBmb3IgKHZhciB0IGluIHRyYW5zaXRpb25zKXtcbiAgICBpZiAodHlwZW9mIGVsZW0uc3R5bGVbdF0gIT09ICd1bmRlZmluZWQnKXtcbiAgICAgIGVuZCA9IHRyYW5zaXRpb25zW3RdO1xuICAgIH1cbiAgfVxuICBpZihlbmQpe1xuICAgIHJldHVybiBlbmQ7XG4gIH1lbHNle1xuICAgIGVuZCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICRlbGVtLnRyaWdnZXJIYW5kbGVyKCd0cmFuc2l0aW9uZW5kJywgWyRlbGVtXSk7XG4gICAgfSwgMSk7XG4gICAgcmV0dXJuICd0cmFuc2l0aW9uZW5kJztcbiAgfVxufVxuXG5leHBvcnQge3J0bCwgR2V0WW9EaWdpdHMsIHRyYW5zaXRpb25lbmR9O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi51dGlsLmNvcmUuanMiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5cbi8vIERlZmF1bHQgc2V0IG9mIG1lZGlhIHF1ZXJpZXNcbmNvbnN0IGRlZmF1bHRRdWVyaWVzID0ge1xuICAnZGVmYXVsdCcgOiAnb25seSBzY3JlZW4nLFxuICBsYW5kc2NhcGUgOiAnb25seSBzY3JlZW4gYW5kIChvcmllbnRhdGlvbjogbGFuZHNjYXBlKScsXG4gIHBvcnRyYWl0IDogJ29ubHkgc2NyZWVuIGFuZCAob3JpZW50YXRpb246IHBvcnRyYWl0KScsXG4gIHJldGluYSA6ICdvbmx5IHNjcmVlbiBhbmQgKC13ZWJraXQtbWluLWRldmljZS1waXhlbC1yYXRpbzogMiksJyArXG4gICAgJ29ubHkgc2NyZWVuIGFuZCAobWluLS1tb3otZGV2aWNlLXBpeGVsLXJhdGlvOiAyKSwnICtcbiAgICAnb25seSBzY3JlZW4gYW5kICgtby1taW4tZGV2aWNlLXBpeGVsLXJhdGlvOiAyLzEpLCcgK1xuICAgICdvbmx5IHNjcmVlbiBhbmQgKG1pbi1kZXZpY2UtcGl4ZWwtcmF0aW86IDIpLCcgK1xuICAgICdvbmx5IHNjcmVlbiBhbmQgKG1pbi1yZXNvbHV0aW9uOiAxOTJkcGkpLCcgK1xuICAgICdvbmx5IHNjcmVlbiBhbmQgKG1pbi1yZXNvbHV0aW9uOiAyZHBweCknXG4gIH07XG5cblxuLy8gbWF0Y2hNZWRpYSgpIHBvbHlmaWxsIC0gVGVzdCBhIENTUyBtZWRpYSB0eXBlL3F1ZXJ5IGluIEpTLlxuLy8gQXV0aG9ycyAmIGNvcHlyaWdodCAoYykgMjAxMjogU2NvdHQgSmVobCwgUGF1bCBJcmlzaCwgTmljaG9sYXMgWmFrYXMsIERhdmlkIEtuaWdodC4gRHVhbCBNSVQvQlNEIGxpY2Vuc2VcbmxldCBtYXRjaE1lZGlhID0gd2luZG93Lm1hdGNoTWVkaWEgfHwgKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgLy8gRm9yIGJyb3dzZXJzIHRoYXQgc3VwcG9ydCBtYXRjaE1lZGl1bSBhcGkgc3VjaCBhcyBJRSA5IGFuZCB3ZWJraXRcbiAgdmFyIHN0eWxlTWVkaWEgPSAod2luZG93LnN0eWxlTWVkaWEgfHwgd2luZG93Lm1lZGlhKTtcblxuICAvLyBGb3IgdGhvc2UgdGhhdCBkb24ndCBzdXBwb3J0IG1hdGNoTWVkaXVtXG4gIGlmICghc3R5bGVNZWRpYSkge1xuICAgIHZhciBzdHlsZSAgID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKSxcbiAgICBzY3JpcHQgICAgICA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzY3JpcHQnKVswXSxcbiAgICBpbmZvICAgICAgICA9IG51bGw7XG5cbiAgICBzdHlsZS50eXBlICA9ICd0ZXh0L2Nzcyc7XG4gICAgc3R5bGUuaWQgICAgPSAnbWF0Y2htZWRpYWpzLXRlc3QnO1xuXG4gICAgc2NyaXB0ICYmIHNjcmlwdC5wYXJlbnROb2RlICYmIHNjcmlwdC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShzdHlsZSwgc2NyaXB0KTtcblxuICAgIC8vICdzdHlsZS5jdXJyZW50U3R5bGUnIGlzIHVzZWQgYnkgSUUgPD0gOCBhbmQgJ3dpbmRvdy5nZXRDb21wdXRlZFN0eWxlJyBmb3IgYWxsIG90aGVyIGJyb3dzZXJzXG4gICAgaW5mbyA9ICgnZ2V0Q29tcHV0ZWRTdHlsZScgaW4gd2luZG93KSAmJiB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShzdHlsZSwgbnVsbCkgfHwgc3R5bGUuY3VycmVudFN0eWxlO1xuXG4gICAgc3R5bGVNZWRpYSA9IHtcbiAgICAgIG1hdGNoTWVkaXVtKG1lZGlhKSB7XG4gICAgICAgIHZhciB0ZXh0ID0gYEBtZWRpYSAke21lZGlhfXsgI21hdGNobWVkaWFqcy10ZXN0IHsgd2lkdGg6IDFweDsgfSB9YDtcblxuICAgICAgICAvLyAnc3R5bGUuc3R5bGVTaGVldCcgaXMgdXNlZCBieSBJRSA8PSA4IGFuZCAnc3R5bGUudGV4dENvbnRlbnQnIGZvciBhbGwgb3RoZXIgYnJvd3NlcnNcbiAgICAgICAgaWYgKHN0eWxlLnN0eWxlU2hlZXQpIHtcbiAgICAgICAgICBzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSB0ZXh0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN0eWxlLnRleHRDb250ZW50ID0gdGV4dDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFRlc3QgaWYgbWVkaWEgcXVlcnkgaXMgdHJ1ZSBvciBmYWxzZVxuICAgICAgICByZXR1cm4gaW5mby53aWR0aCA9PT0gJzFweCc7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uKG1lZGlhKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG1hdGNoZXM6IHN0eWxlTWVkaWEubWF0Y2hNZWRpdW0obWVkaWEgfHwgJ2FsbCcpLFxuICAgICAgbWVkaWE6IG1lZGlhIHx8ICdhbGwnXG4gICAgfTtcbiAgfVxufSkoKTtcblxudmFyIE1lZGlhUXVlcnkgPSB7XG4gIHF1ZXJpZXM6IFtdLFxuXG4gIGN1cnJlbnQ6ICcnLFxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyB0aGUgbWVkaWEgcXVlcnkgaGVscGVyLCBieSBleHRyYWN0aW5nIHRoZSBicmVha3BvaW50IGxpc3QgZnJvbSB0aGUgQ1NTIGFuZCBhY3RpdmF0aW5nIHRoZSBicmVha3BvaW50IHdhdGNoZXIuXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2luaXQoKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHZhciAkbWV0YSA9ICQoJ21ldGEuZm91bmRhdGlvbi1tcScpO1xuICAgIGlmKCEkbWV0YS5sZW5ndGgpe1xuICAgICAgJCgnPG1ldGEgY2xhc3M9XCJmb3VuZGF0aW9uLW1xXCI+JykuYXBwZW5kVG8oZG9jdW1lbnQuaGVhZCk7XG4gICAgfVxuXG4gICAgdmFyIGV4dHJhY3RlZFN0eWxlcyA9ICQoJy5mb3VuZGF0aW9uLW1xJykuY3NzKCdmb250LWZhbWlseScpO1xuICAgIHZhciBuYW1lZFF1ZXJpZXM7XG5cbiAgICBuYW1lZFF1ZXJpZXMgPSBwYXJzZVN0eWxlVG9PYmplY3QoZXh0cmFjdGVkU3R5bGVzKTtcblxuICAgIGZvciAodmFyIGtleSBpbiBuYW1lZFF1ZXJpZXMpIHtcbiAgICAgIGlmKG5hbWVkUXVlcmllcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgIHNlbGYucXVlcmllcy5wdXNoKHtcbiAgICAgICAgICBuYW1lOiBrZXksXG4gICAgICAgICAgdmFsdWU6IGBvbmx5IHNjcmVlbiBhbmQgKG1pbi13aWR0aDogJHtuYW1lZFF1ZXJpZXNba2V5XX0pYFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmN1cnJlbnQgPSB0aGlzLl9nZXRDdXJyZW50U2l6ZSgpO1xuXG4gICAgdGhpcy5fd2F0Y2hlcigpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgdGhlIHNjcmVlbiBpcyBhdCBsZWFzdCBhcyB3aWRlIGFzIGEgYnJlYWtwb2ludC5cbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBzaXplIC0gTmFtZSBvZiB0aGUgYnJlYWtwb2ludCB0byBjaGVjay5cbiAgICogQHJldHVybnMge0Jvb2xlYW59IGB0cnVlYCBpZiB0aGUgYnJlYWtwb2ludCBtYXRjaGVzLCBgZmFsc2VgIGlmIGl0J3Mgc21hbGxlci5cbiAgICovXG4gIGF0TGVhc3Qoc2l6ZSkge1xuICAgIHZhciBxdWVyeSA9IHRoaXMuZ2V0KHNpemUpO1xuXG4gICAgaWYgKHF1ZXJ5KSB7XG4gICAgICByZXR1cm4gbWF0Y2hNZWRpYShxdWVyeSkubWF0Y2hlcztcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH0sXG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiB0aGUgc2NyZWVuIG1hdGNoZXMgdG8gYSBicmVha3BvaW50LlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHBhcmFtIHtTdHJpbmd9IHNpemUgLSBOYW1lIG9mIHRoZSBicmVha3BvaW50IHRvIGNoZWNrLCBlaXRoZXIgJ3NtYWxsIG9ubHknIG9yICdzbWFsbCcuIE9taXR0aW5nICdvbmx5JyBmYWxscyBiYWNrIHRvIHVzaW5nIGF0TGVhc3QoKSBtZXRob2QuXG4gICAqIEByZXR1cm5zIHtCb29sZWFufSBgdHJ1ZWAgaWYgdGhlIGJyZWFrcG9pbnQgbWF0Y2hlcywgYGZhbHNlYCBpZiBpdCBkb2VzIG5vdC5cbiAgICovXG4gIGlzKHNpemUpIHtcbiAgICBzaXplID0gc2l6ZS50cmltKCkuc3BsaXQoJyAnKTtcbiAgICBpZihzaXplLmxlbmd0aCA+IDEgJiYgc2l6ZVsxXSA9PT0gJ29ubHknKSB7XG4gICAgICBpZihzaXplWzBdID09PSB0aGlzLl9nZXRDdXJyZW50U2l6ZSgpKSByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuYXRMZWFzdChzaXplWzBdKTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9LFxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBtZWRpYSBxdWVyeSBvZiBhIGJyZWFrcG9pbnQuXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcGFyYW0ge1N0cmluZ30gc2l6ZSAtIE5hbWUgb2YgdGhlIGJyZWFrcG9pbnQgdG8gZ2V0LlxuICAgKiBAcmV0dXJucyB7U3RyaW5nfG51bGx9IC0gVGhlIG1lZGlhIHF1ZXJ5IG9mIHRoZSBicmVha3BvaW50LCBvciBgbnVsbGAgaWYgdGhlIGJyZWFrcG9pbnQgZG9lc24ndCBleGlzdC5cbiAgICovXG4gIGdldChzaXplKSB7XG4gICAgZm9yICh2YXIgaSBpbiB0aGlzLnF1ZXJpZXMpIHtcbiAgICAgIGlmKHRoaXMucXVlcmllcy5oYXNPd25Qcm9wZXJ0eShpKSkge1xuICAgICAgICB2YXIgcXVlcnkgPSB0aGlzLnF1ZXJpZXNbaV07XG4gICAgICAgIGlmIChzaXplID09PSBxdWVyeS5uYW1lKSByZXR1cm4gcXVlcnkudmFsdWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIGN1cnJlbnQgYnJlYWtwb2ludCBuYW1lIGJ5IHRlc3RpbmcgZXZlcnkgYnJlYWtwb2ludCBhbmQgcmV0dXJuaW5nIHRoZSBsYXN0IG9uZSB0byBtYXRjaCAodGhlIGJpZ2dlc3Qgb25lKS5cbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwcml2YXRlXG4gICAqIEByZXR1cm5zIHtTdHJpbmd9IE5hbWUgb2YgdGhlIGN1cnJlbnQgYnJlYWtwb2ludC5cbiAgICovXG4gIF9nZXRDdXJyZW50U2l6ZSgpIHtcbiAgICB2YXIgbWF0Y2hlZDtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5xdWVyaWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgcXVlcnkgPSB0aGlzLnF1ZXJpZXNbaV07XG5cbiAgICAgIGlmIChtYXRjaE1lZGlhKHF1ZXJ5LnZhbHVlKS5tYXRjaGVzKSB7XG4gICAgICAgIG1hdGNoZWQgPSBxdWVyeTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIG1hdGNoZWQgPT09ICdvYmplY3QnKSB7XG4gICAgICByZXR1cm4gbWF0Y2hlZC5uYW1lO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbWF0Y2hlZDtcbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIEFjdGl2YXRlcyB0aGUgYnJlYWtwb2ludCB3YXRjaGVyLCB3aGljaCBmaXJlcyBhbiBldmVudCBvbiB0aGUgd2luZG93IHdoZW5ldmVyIHRoZSBicmVha3BvaW50IGNoYW5nZXMuXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX3dhdGNoZXIoKSB7XG4gICAgJCh3aW5kb3cpLm9mZigncmVzaXplLnpmLm1lZGlhcXVlcnknKS5vbigncmVzaXplLnpmLm1lZGlhcXVlcnknLCAoKSA9PiB7XG4gICAgICB2YXIgbmV3U2l6ZSA9IHRoaXMuX2dldEN1cnJlbnRTaXplKCksIGN1cnJlbnRTaXplID0gdGhpcy5jdXJyZW50O1xuXG4gICAgICBpZiAobmV3U2l6ZSAhPT0gY3VycmVudFNpemUpIHtcbiAgICAgICAgLy8gQ2hhbmdlIHRoZSBjdXJyZW50IG1lZGlhIHF1ZXJ5XG4gICAgICAgIHRoaXMuY3VycmVudCA9IG5ld1NpemU7XG5cbiAgICAgICAgLy8gQnJvYWRjYXN0IHRoZSBtZWRpYSBxdWVyeSBjaGFuZ2Ugb24gdGhlIHdpbmRvd1xuICAgICAgICAkKHdpbmRvdykudHJpZ2dlcignY2hhbmdlZC56Zi5tZWRpYXF1ZXJ5JywgW25ld1NpemUsIGN1cnJlbnRTaXplXSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn07XG5cblxuXG4vLyBUaGFuayB5b3U6IGh0dHBzOi8vZ2l0aHViLmNvbS9zaW5kcmVzb3JodXMvcXVlcnktc3RyaW5nXG5mdW5jdGlvbiBwYXJzZVN0eWxlVG9PYmplY3Qoc3RyKSB7XG4gIHZhciBzdHlsZU9iamVjdCA9IHt9O1xuXG4gIGlmICh0eXBlb2Ygc3RyICE9PSAnc3RyaW5nJykge1xuICAgIHJldHVybiBzdHlsZU9iamVjdDtcbiAgfVxuXG4gIHN0ciA9IHN0ci50cmltKCkuc2xpY2UoMSwgLTEpOyAvLyBicm93c2VycyByZS1xdW90ZSBzdHJpbmcgc3R5bGUgdmFsdWVzXG5cbiAgaWYgKCFzdHIpIHtcbiAgICByZXR1cm4gc3R5bGVPYmplY3Q7XG4gIH1cblxuICBzdHlsZU9iamVjdCA9IHN0ci5zcGxpdCgnJicpLnJlZHVjZShmdW5jdGlvbihyZXQsIHBhcmFtKSB7XG4gICAgdmFyIHBhcnRzID0gcGFyYW0ucmVwbGFjZSgvXFwrL2csICcgJykuc3BsaXQoJz0nKTtcbiAgICB2YXIga2V5ID0gcGFydHNbMF07XG4gICAgdmFyIHZhbCA9IHBhcnRzWzFdO1xuICAgIGtleSA9IGRlY29kZVVSSUNvbXBvbmVudChrZXkpO1xuXG4gICAgLy8gbWlzc2luZyBgPWAgc2hvdWxkIGJlIGBudWxsYDpcbiAgICAvLyBodHRwOi8vdzMub3JnL1RSLzIwMTIvV0QtdXJsLTIwMTIwNTI0LyNjb2xsZWN0LXVybC1wYXJhbWV0ZXJzXG4gICAgdmFsID0gdmFsID09PSB1bmRlZmluZWQgPyBudWxsIDogZGVjb2RlVVJJQ29tcG9uZW50KHZhbCk7XG5cbiAgICBpZiAoIXJldC5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICByZXRba2V5XSA9IHZhbDtcbiAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkocmV0W2tleV0pKSB7XG4gICAgICByZXRba2V5XS5wdXNoKHZhbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldFtrZXldID0gW3JldFtrZXldLCB2YWxdO1xuICAgIH1cbiAgICByZXR1cm4gcmV0O1xuICB9LCB7fSk7XG5cbiAgcmV0dXJuIHN0eWxlT2JqZWN0O1xufVxuXG5leHBvcnQge01lZGlhUXVlcnl9O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi51dGlsLm1lZGlhUXVlcnkuanMiLCIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpcbiAqIFRoaXMgdXRpbCB3YXMgY3JlYXRlZCBieSBNYXJpdXMgT2xiZXJ0eiAqXG4gKiBQbGVhc2UgdGhhbmsgTWFyaXVzIG9uIEdpdEh1YiAvb3dsYmVydHogKlxuICogb3IgdGhlIHdlYiBodHRwOi8vd3d3Lm1hcml1c29sYmVydHouZGUvICpcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4ndXNlIHN0cmljdCc7XG5cbmltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5pbXBvcnQgeyBydGwgYXMgUnRsIH0gZnJvbSAnLi9mb3VuZGF0aW9uLnV0aWwuY29yZSc7XG5cbmNvbnN0IGtleUNvZGVzID0ge1xuICA5OiAnVEFCJyxcbiAgMTM6ICdFTlRFUicsXG4gIDI3OiAnRVNDQVBFJyxcbiAgMzI6ICdTUEFDRScsXG4gIDM1OiAnRU5EJyxcbiAgMzY6ICdIT01FJyxcbiAgMzc6ICdBUlJPV19MRUZUJyxcbiAgMzg6ICdBUlJPV19VUCcsXG4gIDM5OiAnQVJST1dfUklHSFQnLFxuICA0MDogJ0FSUk9XX0RPV04nXG59XG5cbnZhciBjb21tYW5kcyA9IHt9XG5cbi8vIEZ1bmN0aW9ucyBwdWxsZWQgb3V0IHRvIGJlIHJlZmVyZW5jZWFibGUgZnJvbSBpbnRlcm5hbHNcbmZ1bmN0aW9uIGZpbmRGb2N1c2FibGUoJGVsZW1lbnQpIHtcbiAgaWYoISRlbGVtZW50KSB7cmV0dXJuIGZhbHNlOyB9XG4gIHJldHVybiAkZWxlbWVudC5maW5kKCdhW2hyZWZdLCBhcmVhW2hyZWZdLCBpbnB1dDpub3QoW2Rpc2FibGVkXSksIHNlbGVjdDpub3QoW2Rpc2FibGVkXSksIHRleHRhcmVhOm5vdChbZGlzYWJsZWRdKSwgYnV0dG9uOm5vdChbZGlzYWJsZWRdKSwgaWZyYW1lLCBvYmplY3QsIGVtYmVkLCAqW3RhYmluZGV4XSwgKltjb250ZW50ZWRpdGFibGVdJykuZmlsdGVyKGZ1bmN0aW9uKCkge1xuICAgIGlmICghJCh0aGlzKS5pcygnOnZpc2libGUnKSB8fCAkKHRoaXMpLmF0dHIoJ3RhYmluZGV4JykgPCAwKSB7IHJldHVybiBmYWxzZTsgfSAvL29ubHkgaGF2ZSB2aXNpYmxlIGVsZW1lbnRzIGFuZCB0aG9zZSB0aGF0IGhhdmUgYSB0YWJpbmRleCBncmVhdGVyIG9yIGVxdWFsIDBcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHBhcnNlS2V5KGV2ZW50KSB7XG4gIHZhciBrZXkgPSBrZXlDb2Rlc1tldmVudC53aGljaCB8fCBldmVudC5rZXlDb2RlXSB8fCBTdHJpbmcuZnJvbUNoYXJDb2RlKGV2ZW50LndoaWNoKS50b1VwcGVyQ2FzZSgpO1xuXG4gIC8vIFJlbW92ZSB1bi1wcmludGFibGUgY2hhcmFjdGVycywgZS5nLiBmb3IgYGZyb21DaGFyQ29kZWAgY2FsbHMgZm9yIENUUkwgb25seSBldmVudHNcbiAga2V5ID0ga2V5LnJlcGxhY2UoL1xcVysvLCAnJyk7XG5cbiAgaWYgKGV2ZW50LnNoaWZ0S2V5KSBrZXkgPSBgU0hJRlRfJHtrZXl9YDtcbiAgaWYgKGV2ZW50LmN0cmxLZXkpIGtleSA9IGBDVFJMXyR7a2V5fWA7XG4gIGlmIChldmVudC5hbHRLZXkpIGtleSA9IGBBTFRfJHtrZXl9YDtcblxuICAvLyBSZW1vdmUgdHJhaWxpbmcgdW5kZXJzY29yZSwgaW4gY2FzZSBvbmx5IG1vZGlmaWVycyB3ZXJlIHVzZWQgKGUuZy4gb25seSBgQ1RSTF9BTFRgKVxuICBrZXkgPSBrZXkucmVwbGFjZSgvXyQvLCAnJyk7XG5cbiAgcmV0dXJuIGtleTtcbn1cblxudmFyIEtleWJvYXJkID0ge1xuICBrZXlzOiBnZXRLZXlDb2RlcyhrZXlDb2RlcyksXG5cbiAgLyoqXG4gICAqIFBhcnNlcyB0aGUgKGtleWJvYXJkKSBldmVudCBhbmQgcmV0dXJucyBhIFN0cmluZyB0aGF0IHJlcHJlc2VudHMgaXRzIGtleVxuICAgKiBDYW4gYmUgdXNlZCBsaWtlIEZvdW5kYXRpb24ucGFyc2VLZXkoZXZlbnQpID09PSBGb3VuZGF0aW9uLmtleXMuU1BBQ0VcbiAgICogQHBhcmFtIHtFdmVudH0gZXZlbnQgLSB0aGUgZXZlbnQgZ2VuZXJhdGVkIGJ5IHRoZSBldmVudCBoYW5kbGVyXG4gICAqIEByZXR1cm4gU3RyaW5nIGtleSAtIFN0cmluZyB0aGF0IHJlcHJlc2VudHMgdGhlIGtleSBwcmVzc2VkXG4gICAqL1xuICBwYXJzZUtleTogcGFyc2VLZXksXG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgdGhlIGdpdmVuIChrZXlib2FyZCkgZXZlbnRcbiAgICogQHBhcmFtIHtFdmVudH0gZXZlbnQgLSB0aGUgZXZlbnQgZ2VuZXJhdGVkIGJ5IHRoZSBldmVudCBoYW5kbGVyXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBjb21wb25lbnQgLSBGb3VuZGF0aW9uIGNvbXBvbmVudCdzIG5hbWUsIGUuZy4gU2xpZGVyIG9yIFJldmVhbFxuICAgKiBAcGFyYW0ge09iamVjdHN9IGZ1bmN0aW9ucyAtIGNvbGxlY3Rpb24gb2YgZnVuY3Rpb25zIHRoYXQgYXJlIHRvIGJlIGV4ZWN1dGVkXG4gICAqL1xuICBoYW5kbGVLZXkoZXZlbnQsIGNvbXBvbmVudCwgZnVuY3Rpb25zKSB7XG4gICAgdmFyIGNvbW1hbmRMaXN0ID0gY29tbWFuZHNbY29tcG9uZW50XSxcbiAgICAgIGtleUNvZGUgPSB0aGlzLnBhcnNlS2V5KGV2ZW50KSxcbiAgICAgIGNtZHMsXG4gICAgICBjb21tYW5kLFxuICAgICAgZm47XG5cbiAgICBpZiAoIWNvbW1hbmRMaXN0KSByZXR1cm4gY29uc29sZS53YXJuKCdDb21wb25lbnQgbm90IGRlZmluZWQhJyk7XG5cbiAgICBpZiAodHlwZW9mIGNvbW1hbmRMaXN0Lmx0ciA9PT0gJ3VuZGVmaW5lZCcpIHsgLy8gdGhpcyBjb21wb25lbnQgZG9lcyBub3QgZGlmZmVyZW50aWF0ZSBiZXR3ZWVuIGx0ciBhbmQgcnRsXG4gICAgICAgIGNtZHMgPSBjb21tYW5kTGlzdDsgLy8gdXNlIHBsYWluIGxpc3RcbiAgICB9IGVsc2UgeyAvLyBtZXJnZSBsdHIgYW5kIHJ0bDogaWYgZG9jdW1lbnQgaXMgcnRsLCBydGwgb3ZlcndyaXRlcyBsdHIgYW5kIHZpY2UgdmVyc2FcbiAgICAgICAgaWYgKFJ0bCgpKSBjbWRzID0gJC5leHRlbmQoe30sIGNvbW1hbmRMaXN0Lmx0ciwgY29tbWFuZExpc3QucnRsKTtcblxuICAgICAgICBlbHNlIGNtZHMgPSAkLmV4dGVuZCh7fSwgY29tbWFuZExpc3QucnRsLCBjb21tYW5kTGlzdC5sdHIpO1xuICAgIH1cbiAgICBjb21tYW5kID0gY21kc1trZXlDb2RlXTtcblxuICAgIGZuID0gZnVuY3Rpb25zW2NvbW1hbmRdO1xuICAgIGlmIChmbiAmJiB0eXBlb2YgZm4gPT09ICdmdW5jdGlvbicpIHsgLy8gZXhlY3V0ZSBmdW5jdGlvbiAgaWYgZXhpc3RzXG4gICAgICB2YXIgcmV0dXJuVmFsdWUgPSBmbi5hcHBseSgpO1xuICAgICAgaWYgKGZ1bmN0aW9ucy5oYW5kbGVkIHx8IHR5cGVvZiBmdW5jdGlvbnMuaGFuZGxlZCA9PT0gJ2Z1bmN0aW9uJykgeyAvLyBleGVjdXRlIGZ1bmN0aW9uIHdoZW4gZXZlbnQgd2FzIGhhbmRsZWRcbiAgICAgICAgICBmdW5jdGlvbnMuaGFuZGxlZChyZXR1cm5WYWx1ZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChmdW5jdGlvbnMudW5oYW5kbGVkIHx8IHR5cGVvZiBmdW5jdGlvbnMudW5oYW5kbGVkID09PSAnZnVuY3Rpb24nKSB7IC8vIGV4ZWN1dGUgZnVuY3Rpb24gd2hlbiBldmVudCB3YXMgbm90IGhhbmRsZWRcbiAgICAgICAgICBmdW5jdGlvbnMudW5oYW5kbGVkKCk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBGaW5kcyBhbGwgZm9jdXNhYmxlIGVsZW1lbnRzIHdpdGhpbiB0aGUgZ2l2ZW4gYCRlbGVtZW50YFxuICAgKiBAcGFyYW0ge2pRdWVyeX0gJGVsZW1lbnQgLSBqUXVlcnkgb2JqZWN0IHRvIHNlYXJjaCB3aXRoaW5cbiAgICogQHJldHVybiB7alF1ZXJ5fSAkZm9jdXNhYmxlIC0gYWxsIGZvY3VzYWJsZSBlbGVtZW50cyB3aXRoaW4gYCRlbGVtZW50YFxuICAgKi9cblxuICBmaW5kRm9jdXNhYmxlOiBmaW5kRm9jdXNhYmxlLFxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBjb21wb25lbnQgbmFtZSBuYW1lXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjb21wb25lbnQgLSBGb3VuZGF0aW9uIGNvbXBvbmVudCwgZS5nLiBTbGlkZXIgb3IgUmV2ZWFsXG4gICAqIEByZXR1cm4gU3RyaW5nIGNvbXBvbmVudE5hbWVcbiAgICovXG5cbiAgcmVnaXN0ZXIoY29tcG9uZW50TmFtZSwgY21kcykge1xuICAgIGNvbW1hbmRzW2NvbXBvbmVudE5hbWVdID0gY21kcztcbiAgfSxcblxuXG4gIC8vIFRPRE85NDM4OiBUaGVzZSByZWZlcmVuY2VzIHRvIEtleWJvYXJkIG5lZWQgdG8gbm90IHJlcXVpcmUgZ2xvYmFsLiBXaWxsICd0aGlzJyB3b3JrIGluIHRoaXMgY29udGV4dD9cbiAgLy9cbiAgLyoqXG4gICAqIFRyYXBzIHRoZSBmb2N1cyBpbiB0aGUgZ2l2ZW4gZWxlbWVudC5cbiAgICogQHBhcmFtICB7alF1ZXJ5fSAkZWxlbWVudCAgalF1ZXJ5IG9iamVjdCB0byB0cmFwIHRoZSBmb3VjcyBpbnRvLlxuICAgKi9cbiAgdHJhcEZvY3VzKCRlbGVtZW50KSB7XG4gICAgdmFyICRmb2N1c2FibGUgPSBmaW5kRm9jdXNhYmxlKCRlbGVtZW50KSxcbiAgICAgICAgJGZpcnN0Rm9jdXNhYmxlID0gJGZvY3VzYWJsZS5lcSgwKSxcbiAgICAgICAgJGxhc3RGb2N1c2FibGUgPSAkZm9jdXNhYmxlLmVxKC0xKTtcblxuICAgICRlbGVtZW50Lm9uKCdrZXlkb3duLnpmLnRyYXBmb2N1cycsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICBpZiAoZXZlbnQudGFyZ2V0ID09PSAkbGFzdEZvY3VzYWJsZVswXSAmJiBwYXJzZUtleShldmVudCkgPT09ICdUQUInKSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICRmaXJzdEZvY3VzYWJsZS5mb2N1cygpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoZXZlbnQudGFyZ2V0ID09PSAkZmlyc3RGb2N1c2FibGVbMF0gJiYgcGFyc2VLZXkoZXZlbnQpID09PSAnU0hJRlRfVEFCJykge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAkbGFzdEZvY3VzYWJsZS5mb2N1cygpO1xuICAgICAgfVxuICAgIH0pO1xuICB9LFxuICAvKipcbiAgICogUmVsZWFzZXMgdGhlIHRyYXBwZWQgZm9jdXMgZnJvbSB0aGUgZ2l2ZW4gZWxlbWVudC5cbiAgICogQHBhcmFtICB7alF1ZXJ5fSAkZWxlbWVudCAgalF1ZXJ5IG9iamVjdCB0byByZWxlYXNlIHRoZSBmb2N1cyBmb3IuXG4gICAqL1xuICByZWxlYXNlRm9jdXMoJGVsZW1lbnQpIHtcbiAgICAkZWxlbWVudC5vZmYoJ2tleWRvd24uemYudHJhcGZvY3VzJyk7XG4gIH1cbn1cblxuLypcbiAqIENvbnN0YW50cyBmb3IgZWFzaWVyIGNvbXBhcmluZy5cbiAqIENhbiBiZSB1c2VkIGxpa2UgRm91bmRhdGlvbi5wYXJzZUtleShldmVudCkgPT09IEZvdW5kYXRpb24ua2V5cy5TUEFDRVxuICovXG5mdW5jdGlvbiBnZXRLZXlDb2RlcyhrY3MpIHtcbiAgdmFyIGsgPSB7fTtcbiAgZm9yICh2YXIga2MgaW4ga2NzKSBrW2tjc1trY11dID0ga2NzW2tjXTtcbiAgcmV0dXJuIGs7XG59XG5cbmV4cG9ydCB7S2V5Ym9hcmR9O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi51dGlsLmtleWJvYXJkLmpzIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IHsgTW90aW9uIH0gZnJvbSAnLi9mb3VuZGF0aW9uLnV0aWwubW90aW9uJztcblxuY29uc3QgTXV0YXRpb25PYnNlcnZlciA9IChmdW5jdGlvbiAoKSB7XG4gIHZhciBwcmVmaXhlcyA9IFsnV2ViS2l0JywgJ01veicsICdPJywgJ01zJywgJyddO1xuICBmb3IgKHZhciBpPTA7IGkgPCBwcmVmaXhlcy5sZW5ndGg7IGkrKykge1xuICAgIGlmIChgJHtwcmVmaXhlc1tpXX1NdXRhdGlvbk9ic2VydmVyYCBpbiB3aW5kb3cpIHtcbiAgICAgIHJldHVybiB3aW5kb3dbYCR7cHJlZml4ZXNbaV19TXV0YXRpb25PYnNlcnZlcmBdO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59KCkpO1xuXG5jb25zdCB0cmlnZ2VycyA9IChlbCwgdHlwZSkgPT4ge1xuICBlbC5kYXRhKHR5cGUpLnNwbGl0KCcgJykuZm9yRWFjaChpZCA9PiB7XG4gICAgJChgIyR7aWR9YClbIHR5cGUgPT09ICdjbG9zZScgPyAndHJpZ2dlcicgOiAndHJpZ2dlckhhbmRsZXInXShgJHt0eXBlfS56Zi50cmlnZ2VyYCwgW2VsXSk7XG4gIH0pO1xufTtcblxudmFyIFRyaWdnZXJzID0ge1xuICBMaXN0ZW5lcnM6IHtcbiAgICBCYXNpYzoge30sXG4gICAgR2xvYmFsOiB7fVxuICB9LFxuICBJbml0aWFsaXplcnM6IHt9XG59XG5cblRyaWdnZXJzLkxpc3RlbmVycy5CYXNpYyAgPSB7XG4gIG9wZW5MaXN0ZW5lcjogZnVuY3Rpb24oKSB7XG4gICAgdHJpZ2dlcnMoJCh0aGlzKSwgJ29wZW4nKTtcbiAgfSxcbiAgY2xvc2VMaXN0ZW5lcjogZnVuY3Rpb24oKSB7XG4gICAgbGV0IGlkID0gJCh0aGlzKS5kYXRhKCdjbG9zZScpO1xuICAgIGlmIChpZCkge1xuICAgICAgdHJpZ2dlcnMoJCh0aGlzKSwgJ2Nsb3NlJyk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgJCh0aGlzKS50cmlnZ2VyKCdjbG9zZS56Zi50cmlnZ2VyJyk7XG4gICAgfVxuICB9LFxuICB0b2dnbGVMaXN0ZW5lcjogZnVuY3Rpb24oKSB7XG4gICAgbGV0IGlkID0gJCh0aGlzKS5kYXRhKCd0b2dnbGUnKTtcbiAgICBpZiAoaWQpIHtcbiAgICAgIHRyaWdnZXJzKCQodGhpcyksICd0b2dnbGUnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgJCh0aGlzKS50cmlnZ2VyKCd0b2dnbGUuemYudHJpZ2dlcicpO1xuICAgIH1cbiAgfSxcbiAgY2xvc2VhYmxlTGlzdGVuZXI6IGZ1bmN0aW9uKGUpIHtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGxldCBhbmltYXRpb24gPSAkKHRoaXMpLmRhdGEoJ2Nsb3NhYmxlJyk7XG5cbiAgICBpZihhbmltYXRpb24gIT09ICcnKXtcbiAgICAgIE1vdGlvbi5hbmltYXRlT3V0KCQodGhpcyksIGFuaW1hdGlvbiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICQodGhpcykudHJpZ2dlcignY2xvc2VkLnpmJyk7XG4gICAgICB9KTtcbiAgICB9ZWxzZXtcbiAgICAgICQodGhpcykuZmFkZU91dCgpLnRyaWdnZXIoJ2Nsb3NlZC56ZicpO1xuICAgIH1cbiAgfSxcbiAgdG9nZ2xlRm9jdXNMaXN0ZW5lcjogZnVuY3Rpb24oKSB7XG4gICAgbGV0IGlkID0gJCh0aGlzKS5kYXRhKCd0b2dnbGUtZm9jdXMnKTtcbiAgICAkKGAjJHtpZH1gKS50cmlnZ2VySGFuZGxlcigndG9nZ2xlLnpmLnRyaWdnZXInLCBbJCh0aGlzKV0pO1xuICB9XG59O1xuXG4vLyBFbGVtZW50cyB3aXRoIFtkYXRhLW9wZW5dIHdpbGwgcmV2ZWFsIGEgcGx1Z2luIHRoYXQgc3VwcG9ydHMgaXQgd2hlbiBjbGlja2VkLlxuVHJpZ2dlcnMuSW5pdGlhbGl6ZXJzLmFkZE9wZW5MaXN0ZW5lciA9ICgkZWxlbSkgPT4ge1xuICAkZWxlbS5vZmYoJ2NsaWNrLnpmLnRyaWdnZXInLCBUcmlnZ2Vycy5MaXN0ZW5lcnMuQmFzaWMub3Blbkxpc3RlbmVyKTtcbiAgJGVsZW0ub24oJ2NsaWNrLnpmLnRyaWdnZXInLCAnW2RhdGEtb3Blbl0nLCBUcmlnZ2Vycy5MaXN0ZW5lcnMuQmFzaWMub3Blbkxpc3RlbmVyKTtcbn1cblxuLy8gRWxlbWVudHMgd2l0aCBbZGF0YS1jbG9zZV0gd2lsbCBjbG9zZSBhIHBsdWdpbiB0aGF0IHN1cHBvcnRzIGl0IHdoZW4gY2xpY2tlZC5cbi8vIElmIHVzZWQgd2l0aG91dCBhIHZhbHVlIG9uIFtkYXRhLWNsb3NlXSwgdGhlIGV2ZW50IHdpbGwgYnViYmxlLCBhbGxvd2luZyBpdCB0byBjbG9zZSBhIHBhcmVudCBjb21wb25lbnQuXG5UcmlnZ2Vycy5Jbml0aWFsaXplcnMuYWRkQ2xvc2VMaXN0ZW5lciA9ICgkZWxlbSkgPT4ge1xuICAkZWxlbS5vZmYoJ2NsaWNrLnpmLnRyaWdnZXInLCBUcmlnZ2Vycy5MaXN0ZW5lcnMuQmFzaWMuY2xvc2VMaXN0ZW5lcik7XG4gICRlbGVtLm9uKCdjbGljay56Zi50cmlnZ2VyJywgJ1tkYXRhLWNsb3NlXScsIFRyaWdnZXJzLkxpc3RlbmVycy5CYXNpYy5jbG9zZUxpc3RlbmVyKTtcbn1cblxuLy8gRWxlbWVudHMgd2l0aCBbZGF0YS10b2dnbGVdIHdpbGwgdG9nZ2xlIGEgcGx1Z2luIHRoYXQgc3VwcG9ydHMgaXQgd2hlbiBjbGlja2VkLlxuVHJpZ2dlcnMuSW5pdGlhbGl6ZXJzLmFkZFRvZ2dsZUxpc3RlbmVyID0gKCRlbGVtKSA9PiB7XG4gICRlbGVtLm9mZignY2xpY2suemYudHJpZ2dlcicsIFRyaWdnZXJzLkxpc3RlbmVycy5CYXNpYy50b2dnbGVMaXN0ZW5lcik7XG4gICRlbGVtLm9uKCdjbGljay56Zi50cmlnZ2VyJywgJ1tkYXRhLXRvZ2dsZV0nLCBUcmlnZ2Vycy5MaXN0ZW5lcnMuQmFzaWMudG9nZ2xlTGlzdGVuZXIpO1xufVxuXG4vLyBFbGVtZW50cyB3aXRoIFtkYXRhLWNsb3NhYmxlXSB3aWxsIHJlc3BvbmQgdG8gY2xvc2UuemYudHJpZ2dlciBldmVudHMuXG5UcmlnZ2Vycy5Jbml0aWFsaXplcnMuYWRkQ2xvc2VhYmxlTGlzdGVuZXIgPSAoJGVsZW0pID0+IHtcbiAgJGVsZW0ub2ZmKCdjbG9zZS56Zi50cmlnZ2VyJywgVHJpZ2dlcnMuTGlzdGVuZXJzLkJhc2ljLmNsb3NlYWJsZUxpc3RlbmVyKTtcbiAgJGVsZW0ub24oJ2Nsb3NlLnpmLnRyaWdnZXInLCAnW2RhdGEtY2xvc2VhYmxlXSwgW2RhdGEtY2xvc2FibGVdJywgVHJpZ2dlcnMuTGlzdGVuZXJzLkJhc2ljLmNsb3NlYWJsZUxpc3RlbmVyKTtcbn1cblxuLy8gRWxlbWVudHMgd2l0aCBbZGF0YS10b2dnbGUtZm9jdXNdIHdpbGwgcmVzcG9uZCB0byBjb21pbmcgaW4gYW5kIG91dCBvZiBmb2N1c1xuVHJpZ2dlcnMuSW5pdGlhbGl6ZXJzLmFkZFRvZ2dsZUZvY3VzTGlzdGVuZXIgPSAoJGVsZW0pID0+IHtcbiAgJGVsZW0ub2ZmKCdmb2N1cy56Zi50cmlnZ2VyIGJsdXIuemYudHJpZ2dlcicsIFRyaWdnZXJzLkxpc3RlbmVycy5CYXNpYy50b2dnbGVGb2N1c0xpc3RlbmVyKTtcbiAgJGVsZW0ub24oJ2ZvY3VzLnpmLnRyaWdnZXIgYmx1ci56Zi50cmlnZ2VyJywgJ1tkYXRhLXRvZ2dsZS1mb2N1c10nLCBUcmlnZ2Vycy5MaXN0ZW5lcnMuQmFzaWMudG9nZ2xlRm9jdXNMaXN0ZW5lcik7XG59XG5cblxuXG4vLyBNb3JlIEdsb2JhbC9jb21wbGV4IGxpc3RlbmVycyBhbmQgdHJpZ2dlcnNcblRyaWdnZXJzLkxpc3RlbmVycy5HbG9iYWwgID0ge1xuICByZXNpemVMaXN0ZW5lcjogZnVuY3Rpb24oJG5vZGVzKSB7XG4gICAgaWYoIU11dGF0aW9uT2JzZXJ2ZXIpey8vZmFsbGJhY2sgZm9yIElFIDlcbiAgICAgICRub2Rlcy5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICAgICQodGhpcykudHJpZ2dlckhhbmRsZXIoJ3Jlc2l6ZW1lLnpmLnRyaWdnZXInKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICAvL3RyaWdnZXIgYWxsIGxpc3RlbmluZyBlbGVtZW50cyBhbmQgc2lnbmFsIGEgcmVzaXplIGV2ZW50XG4gICAgJG5vZGVzLmF0dHIoJ2RhdGEtZXZlbnRzJywgXCJyZXNpemVcIik7XG4gIH0sXG4gIHNjcm9sbExpc3RlbmVyOiBmdW5jdGlvbigkbm9kZXMpIHtcbiAgICBpZighTXV0YXRpb25PYnNlcnZlcil7Ly9mYWxsYmFjayBmb3IgSUUgOVxuICAgICAgJG5vZGVzLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgICAgJCh0aGlzKS50cmlnZ2VySGFuZGxlcignc2Nyb2xsbWUuemYudHJpZ2dlcicpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIC8vdHJpZ2dlciBhbGwgbGlzdGVuaW5nIGVsZW1lbnRzIGFuZCBzaWduYWwgYSBzY3JvbGwgZXZlbnRcbiAgICAkbm9kZXMuYXR0cignZGF0YS1ldmVudHMnLCBcInNjcm9sbFwiKTtcbiAgfSxcbiAgY2xvc2VNZUxpc3RlbmVyOiBmdW5jdGlvbihlLCBwbHVnaW5JZCl7XG4gICAgbGV0IHBsdWdpbiA9IGUubmFtZXNwYWNlLnNwbGl0KCcuJylbMF07XG4gICAgbGV0IHBsdWdpbnMgPSAkKGBbZGF0YS0ke3BsdWdpbn1dYCkubm90KGBbZGF0YS15ZXRpLWJveD1cIiR7cGx1Z2luSWR9XCJdYCk7XG5cbiAgICBwbHVnaW5zLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgIGxldCBfdGhpcyA9ICQodGhpcyk7XG4gICAgICBfdGhpcy50cmlnZ2VySGFuZGxlcignY2xvc2UuemYudHJpZ2dlcicsIFtfdGhpc10pO1xuICAgIH0pO1xuICB9XG59XG5cbi8vIEdsb2JhbCwgcGFyc2VzIHdob2xlIGRvY3VtZW50LlxuVHJpZ2dlcnMuSW5pdGlhbGl6ZXJzLmFkZENsb3NlbWVMaXN0ZW5lciA9IGZ1bmN0aW9uKHBsdWdpbk5hbWUpIHtcbiAgdmFyIHlldGlCb3hlcyA9ICQoJ1tkYXRhLXlldGktYm94XScpLFxuICAgICAgcGx1Z05hbWVzID0gWydkcm9wZG93bicsICd0b29sdGlwJywgJ3JldmVhbCddO1xuXG4gIGlmKHBsdWdpbk5hbWUpe1xuICAgIGlmKHR5cGVvZiBwbHVnaW5OYW1lID09PSAnc3RyaW5nJyl7XG4gICAgICBwbHVnTmFtZXMucHVzaChwbHVnaW5OYW1lKTtcbiAgICB9ZWxzZSBpZih0eXBlb2YgcGx1Z2luTmFtZSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIHBsdWdpbk5hbWVbMF0gPT09ICdzdHJpbmcnKXtcbiAgICAgIHBsdWdOYW1lcy5jb25jYXQocGx1Z2luTmFtZSk7XG4gICAgfWVsc2V7XG4gICAgICBjb25zb2xlLmVycm9yKCdQbHVnaW4gbmFtZXMgbXVzdCBiZSBzdHJpbmdzJyk7XG4gICAgfVxuICB9XG4gIGlmKHlldGlCb3hlcy5sZW5ndGgpe1xuICAgIGxldCBsaXN0ZW5lcnMgPSBwbHVnTmFtZXMubWFwKChuYW1lKSA9PiB7XG4gICAgICByZXR1cm4gYGNsb3NlbWUuemYuJHtuYW1lfWA7XG4gICAgfSkuam9pbignICcpO1xuXG4gICAgJCh3aW5kb3cpLm9mZihsaXN0ZW5lcnMpLm9uKGxpc3RlbmVycywgVHJpZ2dlcnMuTGlzdGVuZXJzLkdsb2JhbC5jbG9zZU1lTGlzdGVuZXIpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGRlYm91bmNlR2xvYmFsTGlzdGVuZXIoZGVib3VuY2UsIHRyaWdnZXIsIGxpc3RlbmVyKSB7XG4gIGxldCB0aW1lciwgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMyk7XG4gICQod2luZG93KS5vZmYodHJpZ2dlcikub24odHJpZ2dlciwgZnVuY3Rpb24oZSkge1xuICAgIGlmICh0aW1lcikgeyBjbGVhclRpbWVvdXQodGltZXIpOyB9XG4gICAgdGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICBsaXN0ZW5lci5hcHBseShudWxsLCBhcmdzKTtcbiAgICB9LCBkZWJvdW5jZSB8fCAxMCk7Ly9kZWZhdWx0IHRpbWUgdG8gZW1pdCBzY3JvbGwgZXZlbnRcbiAgfSk7XG59XG5cblRyaWdnZXJzLkluaXRpYWxpemVycy5hZGRSZXNpemVMaXN0ZW5lciA9IGZ1bmN0aW9uKGRlYm91bmNlKXtcbiAgbGV0ICRub2RlcyA9ICQoJ1tkYXRhLXJlc2l6ZV0nKTtcbiAgaWYoJG5vZGVzLmxlbmd0aCl7XG4gICAgZGVib3VuY2VHbG9iYWxMaXN0ZW5lcihkZWJvdW5jZSwgJ3Jlc2l6ZS56Zi50cmlnZ2VyJywgVHJpZ2dlcnMuTGlzdGVuZXJzLkdsb2JhbC5yZXNpemVMaXN0ZW5lciwgJG5vZGVzKTtcbiAgfVxufVxuXG5UcmlnZ2Vycy5Jbml0aWFsaXplcnMuYWRkU2Nyb2xsTGlzdGVuZXIgPSBmdW5jdGlvbihkZWJvdW5jZSl7XG4gIGxldCAkbm9kZXMgPSAkKCdbZGF0YS1zY3JvbGxdJyk7XG4gIGlmKCRub2Rlcy5sZW5ndGgpe1xuICAgIGRlYm91bmNlR2xvYmFsTGlzdGVuZXIoZGVib3VuY2UsICdzY3JvbGwuemYudHJpZ2dlcicsIFRyaWdnZXJzLkxpc3RlbmVycy5HbG9iYWwuc2Nyb2xsTGlzdGVuZXIsICRub2Rlcyk7XG4gIH1cbn1cblxuVHJpZ2dlcnMuSW5pdGlhbGl6ZXJzLmFkZE11dGF0aW9uRXZlbnRzTGlzdGVuZXIgPSBmdW5jdGlvbigkZWxlbSkge1xuICBpZighTXV0YXRpb25PYnNlcnZlcil7IHJldHVybiBmYWxzZTsgfVxuICBsZXQgJG5vZGVzID0gJGVsZW0uZmluZCgnW2RhdGEtcmVzaXplXSwgW2RhdGEtc2Nyb2xsXSwgW2RhdGEtbXV0YXRlXScpO1xuXG4gIC8vZWxlbWVudCBjYWxsYmFja1xuICB2YXIgbGlzdGVuaW5nRWxlbWVudHNNdXRhdGlvbiA9IGZ1bmN0aW9uIChtdXRhdGlvblJlY29yZHNMaXN0KSB7XG4gICAgdmFyICR0YXJnZXQgPSAkKG11dGF0aW9uUmVjb3Jkc0xpc3RbMF0udGFyZ2V0KTtcblxuICAgIC8vdHJpZ2dlciB0aGUgZXZlbnQgaGFuZGxlciBmb3IgdGhlIGVsZW1lbnQgZGVwZW5kaW5nIG9uIHR5cGVcbiAgICBzd2l0Y2ggKG11dGF0aW9uUmVjb3Jkc0xpc3RbMF0udHlwZSkge1xuICAgICAgY2FzZSBcImF0dHJpYnV0ZXNcIjpcbiAgICAgICAgaWYgKCR0YXJnZXQuYXR0cihcImRhdGEtZXZlbnRzXCIpID09PSBcInNjcm9sbFwiICYmIG11dGF0aW9uUmVjb3Jkc0xpc3RbMF0uYXR0cmlidXRlTmFtZSA9PT0gXCJkYXRhLWV2ZW50c1wiKSB7XG4gICAgICAgICAgJHRhcmdldC50cmlnZ2VySGFuZGxlcignc2Nyb2xsbWUuemYudHJpZ2dlcicsIFskdGFyZ2V0LCB3aW5kb3cucGFnZVlPZmZzZXRdKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoJHRhcmdldC5hdHRyKFwiZGF0YS1ldmVudHNcIikgPT09IFwicmVzaXplXCIgJiYgbXV0YXRpb25SZWNvcmRzTGlzdFswXS5hdHRyaWJ1dGVOYW1lID09PSBcImRhdGEtZXZlbnRzXCIpIHtcbiAgICAgICAgICAkdGFyZ2V0LnRyaWdnZXJIYW5kbGVyKCdyZXNpemVtZS56Zi50cmlnZ2VyJywgWyR0YXJnZXRdKTtcbiAgICAgICAgIH1cbiAgICAgICAgaWYgKG11dGF0aW9uUmVjb3Jkc0xpc3RbMF0uYXR0cmlidXRlTmFtZSA9PT0gXCJzdHlsZVwiKSB7XG4gICAgICAgICAgJHRhcmdldC5jbG9zZXN0KFwiW2RhdGEtbXV0YXRlXVwiKS5hdHRyKFwiZGF0YS1ldmVudHNcIixcIm11dGF0ZVwiKTtcbiAgICAgICAgICAkdGFyZ2V0LmNsb3Nlc3QoXCJbZGF0YS1tdXRhdGVdXCIpLnRyaWdnZXJIYW5kbGVyKCdtdXRhdGVtZS56Zi50cmlnZ2VyJywgWyR0YXJnZXQuY2xvc2VzdChcIltkYXRhLW11dGF0ZV1cIildKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBcImNoaWxkTGlzdFwiOlxuICAgICAgICAkdGFyZ2V0LmNsb3Nlc3QoXCJbZGF0YS1tdXRhdGVdXCIpLmF0dHIoXCJkYXRhLWV2ZW50c1wiLFwibXV0YXRlXCIpO1xuICAgICAgICAkdGFyZ2V0LmNsb3Nlc3QoXCJbZGF0YS1tdXRhdGVdXCIpLnRyaWdnZXJIYW5kbGVyKCdtdXRhdGVtZS56Zi50cmlnZ2VyJywgWyR0YXJnZXQuY2xvc2VzdChcIltkYXRhLW11dGF0ZV1cIildKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIC8vbm90aGluZ1xuICAgIH1cbiAgfTtcblxuICBpZiAoJG5vZGVzLmxlbmd0aCkge1xuICAgIC8vZm9yIGVhY2ggZWxlbWVudCB0aGF0IG5lZWRzIHRvIGxpc3RlbiBmb3IgcmVzaXppbmcsIHNjcm9sbGluZywgb3IgbXV0YXRpb24gYWRkIGEgc2luZ2xlIG9ic2VydmVyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPD0gJG5vZGVzLmxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgdmFyIGVsZW1lbnRPYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGxpc3RlbmluZ0VsZW1lbnRzTXV0YXRpb24pO1xuICAgICAgZWxlbWVudE9ic2VydmVyLm9ic2VydmUoJG5vZGVzW2ldLCB7IGF0dHJpYnV0ZXM6IHRydWUsIGNoaWxkTGlzdDogdHJ1ZSwgY2hhcmFjdGVyRGF0YTogZmFsc2UsIHN1YnRyZWU6IHRydWUsIGF0dHJpYnV0ZUZpbHRlcjogW1wiZGF0YS1ldmVudHNcIiwgXCJzdHlsZVwiXSB9KTtcbiAgICB9XG4gIH1cbn1cblxuVHJpZ2dlcnMuSW5pdGlhbGl6ZXJzLmFkZFNpbXBsZUxpc3RlbmVycyA9IGZ1bmN0aW9uKCkge1xuICBsZXQgJGRvY3VtZW50ID0gJChkb2N1bWVudCk7XG5cbiAgVHJpZ2dlcnMuSW5pdGlhbGl6ZXJzLmFkZE9wZW5MaXN0ZW5lcigkZG9jdW1lbnQpO1xuICBUcmlnZ2Vycy5Jbml0aWFsaXplcnMuYWRkQ2xvc2VMaXN0ZW5lcigkZG9jdW1lbnQpO1xuICBUcmlnZ2Vycy5Jbml0aWFsaXplcnMuYWRkVG9nZ2xlTGlzdGVuZXIoJGRvY3VtZW50KTtcbiAgVHJpZ2dlcnMuSW5pdGlhbGl6ZXJzLmFkZENsb3NlYWJsZUxpc3RlbmVyKCRkb2N1bWVudCk7XG4gIFRyaWdnZXJzLkluaXRpYWxpemVycy5hZGRUb2dnbGVGb2N1c0xpc3RlbmVyKCRkb2N1bWVudCk7XG5cbn1cblxuVHJpZ2dlcnMuSW5pdGlhbGl6ZXJzLmFkZEdsb2JhbExpc3RlbmVycyA9IGZ1bmN0aW9uKCkge1xuICBsZXQgJGRvY3VtZW50ID0gJChkb2N1bWVudCk7XG4gIFRyaWdnZXJzLkluaXRpYWxpemVycy5hZGRNdXRhdGlvbkV2ZW50c0xpc3RlbmVyKCRkb2N1bWVudCk7XG4gIFRyaWdnZXJzLkluaXRpYWxpemVycy5hZGRSZXNpemVMaXN0ZW5lcigpO1xuICBUcmlnZ2Vycy5Jbml0aWFsaXplcnMuYWRkU2Nyb2xsTGlzdGVuZXIoKTtcbiAgVHJpZ2dlcnMuSW5pdGlhbGl6ZXJzLmFkZENsb3NlbWVMaXN0ZW5lcigpO1xufVxuXG5cblRyaWdnZXJzLmluaXQgPSBmdW5jdGlvbigkLCBGb3VuZGF0aW9uKSB7XG4gIGlmICh0eXBlb2YoJC50cmlnZ2Vyc0luaXRpYWxpemVkKSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBsZXQgJGRvY3VtZW50ID0gJChkb2N1bWVudCk7XG5cbiAgICBpZihkb2N1bWVudC5yZWFkeVN0YXRlID09PSBcImNvbXBsZXRlXCIpIHtcbiAgICAgIFRyaWdnZXJzLkluaXRpYWxpemVycy5hZGRTaW1wbGVMaXN0ZW5lcnMoKTtcbiAgICAgIFRyaWdnZXJzLkluaXRpYWxpemVycy5hZGRHbG9iYWxMaXN0ZW5lcnMoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgJCh3aW5kb3cpLm9uKCdsb2FkJywgKCkgPT4ge1xuICAgICAgICBUcmlnZ2Vycy5Jbml0aWFsaXplcnMuYWRkU2ltcGxlTGlzdGVuZXJzKCk7XG4gICAgICAgIFRyaWdnZXJzLkluaXRpYWxpemVycy5hZGRHbG9iYWxMaXN0ZW5lcnMoKTtcbiAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgJC50cmlnZ2Vyc0luaXRpYWxpemVkID0gdHJ1ZTtcbiAgfVxuXG4gIGlmKEZvdW5kYXRpb24pIHtcbiAgICBGb3VuZGF0aW9uLlRyaWdnZXJzID0gVHJpZ2dlcnM7XG4gICAgLy8gTGVnYWN5IGluY2x1ZGVkIHRvIGJlIGJhY2t3YXJkcyBjb21wYXRpYmxlIGZvciBub3cuXG4gICAgRm91bmRhdGlvbi5JSGVhcllvdSA9IFRyaWdnZXJzLkluaXRpYWxpemVycy5hZGRHbG9iYWxMaXN0ZW5lcnNcbiAgfVxufVxuXG5leHBvcnQge1RyaWdnZXJzfTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24udXRpbC50cmlnZ2Vycy5qcyIsImltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XHJcblxyXG5pbXBvcnQgd2hhdElucHV0IGZyb20gJ3doYXQtaW5wdXQnO1xyXG5cclxud2luZG93LiQgPSAkO1xyXG5cclxuLy8gaW1wb3J0IEZvdW5kYXRpb24gZnJvbSAnZm91bmRhdGlvbi1zaXRlcyc7XHJcblxyXG4vLyBJZiB5b3Ugd2FudCB0byBwaWNrIGFuZCBjaG9vc2Ugd2hpY2ggbW9kdWxlcyB0byBpbmNsdWRlLCBjb21tZW50IG91dCB0aGUgYWJvdmUgYW5kIHVuY29tbWVudFxyXG4vLyB0aGUgbGluZSBiZWxvd1xyXG5pbXBvcnQgJy4vbGliL2ZvdW5kYXRpb24tZXhwbGljaXQtcGllY2VzJztcclxuXHJcbiQoZG9jdW1lbnQpLmZvdW5kYXRpb24oKTtcclxuXHJcbiQoJy50YWItaW5uZXInKS5maWx0ZXIoJzpmaXJzdCcpLmFkZENsYXNzKCdhY3RpdmUtdGFiJyk7XHJcbiQoJy5iYS10YWItY2lyY2xlJykuZmlsdGVyKCc6Zmlyc3QnKS5hZGRDbGFzcygnYWN0aXZlLXRhYi1jaXJjbGUnKTtcclxuXHJcbiQoJy5iYS1zeW1wdG9tcy10YWJzIC50YWItaW5uZXInKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgIGxldCB0YWJfaWQgPSAkKHRoaXMpLmF0dHIoJ2RhdGEtaWQnKTtcclxuICAgICQoJy5iYS1zeW1wdG9tcy1jb250ZW50JykuZmluZCgnLmJhLXRhYi1jaXJjbGUnKS5yZW1vdmVDbGFzcygnYWN0aXZlLXRhYi1jaXJjbGUnKS5oaWRlKCk7XHJcbiAgICAkKCcuYmEtc3ltcHRvbXMtY29udGVudCcpLmZpbmQoJy50YWItaW5uZXInKS5yZW1vdmVDbGFzcygnYWN0aXZlLXRhYicpO1xyXG4gICAgJCh0aGlzKS5hZGRDbGFzcygnYWN0aXZlLXRhYicpO1xyXG4gICAgJCgnI3RhYi1jaXJjbGUtJyArIHRhYl9pZCkuYWRkQ2xhc3MoJ2FjdGl2ZS10YWItY2lyY2xlJykuZmFkZUluKCk7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn0pXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hc3NldHMvanMvYXBwLmpzIiwiLyoqXG4gKiB3aGF0LWlucHV0IC0gQSBnbG9iYWwgdXRpbGl0eSBmb3IgdHJhY2tpbmcgdGhlIGN1cnJlbnQgaW5wdXQgbWV0aG9kIChtb3VzZSwga2V5Ym9hcmQgb3IgdG91Y2gpLlxuICogQHZlcnNpb24gdjQuMy4xXG4gKiBAbGluayBodHRwczovL2dpdGh1Yi5jb20vdGVuMXNldmVuL3doYXQtaW5wdXRcbiAqIEBsaWNlbnNlIE1JVFxuICovXG4oZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShcIndoYXRJbnB1dFwiLCBbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJ3aGF0SW5wdXRcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wid2hhdElucHV0XCJdID0gZmFjdG9yeSgpO1xufSkodGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gLyoqKioqKi8gKGZ1bmN0aW9uKG1vZHVsZXMpIHsgLy8gd2VicGFja0Jvb3RzdHJhcFxuLyoqKioqKi8gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4vKioqKioqLyBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbi8qKioqKiovIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbi8qKioqKiovIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4vKioqKioqLyBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4vKioqKioqLyBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4vKioqKioqLyBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuLyoqKioqKi8gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4vKioqKioqLyBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuLyoqKioqKi8gXHRcdFx0ZXhwb3J0czoge30sXG4vKioqKioqLyBcdFx0XHRpZDogbW9kdWxlSWQsXG4vKioqKioqLyBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4vKioqKioqLyBcdFx0fTtcblxuLyoqKioqKi8gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuLyoqKioqKi8gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4vKioqKioqLyBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuLyoqKioqKi8gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4vKioqKioqLyBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbi8qKioqKiovIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4vKioqKioqLyBcdH1cblxuXG4vKioqKioqLyBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbi8qKioqKiovIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuLyoqKioqKi8gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4vKioqKioqLyBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLyoqKioqKi8gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcbi8qKioqKiovIH0pXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKioqKi8gKFtcbi8qIDAgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHRtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcblx0ICAvKlxuXHQgICAqIHZhcmlhYmxlc1xuXHQgICAqL1xuXG5cdCAgLy8gbGFzdCB1c2VkIGlucHV0IHR5cGVcblx0ICB2YXIgY3VycmVudElucHV0ID0gJ2luaXRpYWwnO1xuXG5cdCAgLy8gbGFzdCB1c2VkIGlucHV0IGludGVudFxuXHQgIHZhciBjdXJyZW50SW50ZW50ID0gbnVsbDtcblxuXHQgIC8vIGNhY2hlIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudFxuXHQgIHZhciBkb2MgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG5cblx0ICAvLyBmb3JtIGlucHV0IHR5cGVzXG5cdCAgdmFyIGZvcm1JbnB1dHMgPSBbJ2lucHV0JywgJ3NlbGVjdCcsICd0ZXh0YXJlYSddO1xuXG5cdCAgdmFyIGZ1bmN0aW9uTGlzdCA9IFtdO1xuXG5cdCAgLy8gbGlzdCBvZiBtb2RpZmllciBrZXlzIGNvbW1vbmx5IHVzZWQgd2l0aCB0aGUgbW91c2UgYW5kXG5cdCAgLy8gY2FuIGJlIHNhZmVseSBpZ25vcmVkIHRvIHByZXZlbnQgZmFsc2Uga2V5Ym9hcmQgZGV0ZWN0aW9uXG5cdCAgdmFyIGlnbm9yZU1hcCA9IFsxNiwgLy8gc2hpZnRcblx0ICAxNywgLy8gY29udHJvbFxuXHQgIDE4LCAvLyBhbHRcblx0ICA5MSwgLy8gV2luZG93cyBrZXkgLyBsZWZ0IEFwcGxlIGNtZFxuXHQgIDkzIC8vIFdpbmRvd3MgbWVudSAvIHJpZ2h0IEFwcGxlIGNtZFxuXHQgIF07XG5cblx0ICAvLyBsaXN0IG9mIGtleXMgZm9yIHdoaWNoIHdlIGNoYW5nZSBpbnRlbnQgZXZlbiBmb3IgZm9ybSBpbnB1dHNcblx0ICB2YXIgY2hhbmdlSW50ZW50TWFwID0gWzkgLy8gdGFiXG5cdCAgXTtcblxuXHQgIC8vIG1hcHBpbmcgb2YgZXZlbnRzIHRvIGlucHV0IHR5cGVzXG5cdCAgdmFyIGlucHV0TWFwID0ge1xuXHQgICAga2V5ZG93bjogJ2tleWJvYXJkJyxcblx0ICAgIGtleXVwOiAna2V5Ym9hcmQnLFxuXHQgICAgbW91c2Vkb3duOiAnbW91c2UnLFxuXHQgICAgbW91c2Vtb3ZlOiAnbW91c2UnLFxuXHQgICAgTVNQb2ludGVyRG93bjogJ3BvaW50ZXInLFxuXHQgICAgTVNQb2ludGVyTW92ZTogJ3BvaW50ZXInLFxuXHQgICAgcG9pbnRlcmRvd246ICdwb2ludGVyJyxcblx0ICAgIHBvaW50ZXJtb3ZlOiAncG9pbnRlcicsXG5cdCAgICB0b3VjaHN0YXJ0OiAndG91Y2gnXG5cdCAgfTtcblxuXHQgIC8vIGFycmF5IG9mIGFsbCB1c2VkIGlucHV0IHR5cGVzXG5cdCAgdmFyIGlucHV0VHlwZXMgPSBbXTtcblxuXHQgIC8vIGJvb2xlYW46IHRydWUgaWYgdG91Y2ggYnVmZmVyIGlzIGFjdGl2ZVxuXHQgIHZhciBpc0J1ZmZlcmluZyA9IGZhbHNlO1xuXG5cdCAgLy8gYm9vbGVhbjogdHJ1ZSBpZiB0aGUgcGFnZSBpcyBiZWluZyBzY3JvbGxlZFxuXHQgIHZhciBpc1Njcm9sbGluZyA9IGZhbHNlO1xuXG5cdCAgLy8gc3RvcmUgY3VycmVudCBtb3VzZSBwb3NpdGlvblxuXHQgIHZhciBtb3VzZVBvcyA9IHtcblx0ICAgIHg6IG51bGwsXG5cdCAgICB5OiBudWxsXG5cdCAgfTtcblxuXHQgIC8vIG1hcCBvZiBJRSAxMCBwb2ludGVyIGV2ZW50c1xuXHQgIHZhciBwb2ludGVyTWFwID0ge1xuXHQgICAgMjogJ3RvdWNoJyxcblx0ICAgIDM6ICd0b3VjaCcsIC8vIHRyZWF0IHBlbiBsaWtlIHRvdWNoXG5cdCAgICA0OiAnbW91c2UnXG5cdCAgfTtcblxuXHQgIHZhciBzdXBwb3J0c1Bhc3NpdmUgPSBmYWxzZTtcblxuXHQgIHRyeSB7XG5cdCAgICB2YXIgb3B0cyA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgJ3Bhc3NpdmUnLCB7XG5cdCAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuXHQgICAgICAgIHN1cHBvcnRzUGFzc2l2ZSA9IHRydWU7XG5cdCAgICAgIH1cblx0ICAgIH0pO1xuXG5cdCAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndGVzdCcsIG51bGwsIG9wdHMpO1xuXHQgIH0gY2F0Y2ggKGUpIHt9XG5cblx0ICAvKlxuXHQgICAqIHNldCB1cFxuXHQgICAqL1xuXG5cdCAgdmFyIHNldFVwID0gZnVuY3Rpb24gc2V0VXAoKSB7XG5cdCAgICAvLyBhZGQgY29ycmVjdCBtb3VzZSB3aGVlbCBldmVudCBtYXBwaW5nIHRvIGBpbnB1dE1hcGBcblx0ICAgIGlucHV0TWFwW2RldGVjdFdoZWVsKCldID0gJ21vdXNlJztcblxuXHQgICAgYWRkTGlzdGVuZXJzKCk7XG5cdCAgICBzZXRJbnB1dCgpO1xuXHQgIH07XG5cblx0ICAvKlxuXHQgICAqIGV2ZW50c1xuXHQgICAqL1xuXG5cdCAgdmFyIGFkZExpc3RlbmVycyA9IGZ1bmN0aW9uIGFkZExpc3RlbmVycygpIHtcblx0ICAgIC8vIGBwb2ludGVybW92ZWAsIGBNU1BvaW50ZXJNb3ZlYCwgYG1vdXNlbW92ZWAgYW5kIG1vdXNlIHdoZWVsIGV2ZW50IGJpbmRpbmdcblx0ICAgIC8vIGNhbiBvbmx5IGRlbW9uc3RyYXRlIHBvdGVudGlhbCwgYnV0IG5vdCBhY3R1YWwsIGludGVyYWN0aW9uXG5cdCAgICAvLyBhbmQgYXJlIHRyZWF0ZWQgc2VwYXJhdGVseVxuXHQgICAgdmFyIG9wdGlvbnMgPSBzdXBwb3J0c1Bhc3NpdmUgPyB7IHBhc3NpdmU6IHRydWUgfSA6IGZhbHNlO1xuXG5cdCAgICAvLyBwb2ludGVyIGV2ZW50cyAobW91c2UsIHBlbiwgdG91Y2gpXG5cdCAgICBpZiAod2luZG93LlBvaW50ZXJFdmVudCkge1xuXHQgICAgICBkb2MuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcmRvd24nLCB1cGRhdGVJbnB1dCk7XG5cdCAgICAgIGRvYy5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVybW92ZScsIHNldEludGVudCk7XG5cdCAgICB9IGVsc2UgaWYgKHdpbmRvdy5NU1BvaW50ZXJFdmVudCkge1xuXHQgICAgICBkb2MuYWRkRXZlbnRMaXN0ZW5lcignTVNQb2ludGVyRG93bicsIHVwZGF0ZUlucHV0KTtcblx0ICAgICAgZG9jLmFkZEV2ZW50TGlzdGVuZXIoJ01TUG9pbnRlck1vdmUnLCBzZXRJbnRlbnQpO1xuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgLy8gbW91c2UgZXZlbnRzXG5cdCAgICAgIGRvYy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB1cGRhdGVJbnB1dCk7XG5cdCAgICAgIGRvYy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBzZXRJbnRlbnQpO1xuXG5cdCAgICAgIC8vIHRvdWNoIGV2ZW50c1xuXHQgICAgICBpZiAoJ29udG91Y2hzdGFydCcgaW4gd2luZG93KSB7XG5cdCAgICAgICAgZG9jLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0b3VjaEJ1ZmZlciwgb3B0aW9ucyk7XG5cdCAgICAgICAgZG9jLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdG91Y2hCdWZmZXIpO1xuXHQgICAgICB9XG5cdCAgICB9XG5cblx0ICAgIC8vIG1vdXNlIHdoZWVsXG5cdCAgICBkb2MuYWRkRXZlbnRMaXN0ZW5lcihkZXRlY3RXaGVlbCgpLCBzZXRJbnRlbnQsIG9wdGlvbnMpO1xuXG5cdCAgICAvLyBrZXlib2FyZCBldmVudHNcblx0ICAgIGRvYy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdXBkYXRlSW5wdXQpO1xuXHQgICAgZG9jLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgdXBkYXRlSW5wdXQpO1xuXHQgIH07XG5cblx0ICAvLyBjaGVja3MgY29uZGl0aW9ucyBiZWZvcmUgdXBkYXRpbmcgbmV3IGlucHV0XG5cdCAgdmFyIHVwZGF0ZUlucHV0ID0gZnVuY3Rpb24gdXBkYXRlSW5wdXQoZXZlbnQpIHtcblx0ICAgIC8vIG9ubHkgZXhlY3V0ZSBpZiB0aGUgdG91Y2ggYnVmZmVyIHRpbWVyIGlzbid0IHJ1bm5pbmdcblx0ICAgIGlmICghaXNCdWZmZXJpbmcpIHtcblx0ICAgICAgdmFyIGV2ZW50S2V5ID0gZXZlbnQud2hpY2g7XG5cdCAgICAgIHZhciB2YWx1ZSA9IGlucHV0TWFwW2V2ZW50LnR5cGVdO1xuXHQgICAgICBpZiAodmFsdWUgPT09ICdwb2ludGVyJykgdmFsdWUgPSBwb2ludGVyVHlwZShldmVudCk7XG5cblx0ICAgICAgaWYgKGN1cnJlbnRJbnB1dCAhPT0gdmFsdWUgfHwgY3VycmVudEludGVudCAhPT0gdmFsdWUpIHtcblx0ICAgICAgICB2YXIgYWN0aXZlRWxlbSA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG5cdCAgICAgICAgdmFyIGFjdGl2ZUlucHV0ID0gZmFsc2U7XG5cdCAgICAgICAgdmFyIG5vdEZvcm1JbnB1dCA9IGFjdGl2ZUVsZW0gJiYgYWN0aXZlRWxlbS5ub2RlTmFtZSAmJiBmb3JtSW5wdXRzLmluZGV4T2YoYWN0aXZlRWxlbS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpKSA9PT0gLTE7XG5cblx0ICAgICAgICBpZiAobm90Rm9ybUlucHV0IHx8IGNoYW5nZUludGVudE1hcC5pbmRleE9mKGV2ZW50S2V5KSAhPT0gLTEpIHtcblx0ICAgICAgICAgIGFjdGl2ZUlucHV0ID0gdHJ1ZTtcblx0ICAgICAgICB9XG5cblx0ICAgICAgICBpZiAodmFsdWUgPT09ICd0b3VjaCcgfHxcblx0ICAgICAgICAvLyBpZ25vcmUgbW91c2UgbW9kaWZpZXIga2V5c1xuXHQgICAgICAgIHZhbHVlID09PSAnbW91c2UnIHx8XG5cdCAgICAgICAgLy8gZG9uJ3Qgc3dpdGNoIGlmIHRoZSBjdXJyZW50IGVsZW1lbnQgaXMgYSBmb3JtIGlucHV0XG5cdCAgICAgICAgdmFsdWUgPT09ICdrZXlib2FyZCcgJiYgZXZlbnRLZXkgJiYgYWN0aXZlSW5wdXQgJiYgaWdub3JlTWFwLmluZGV4T2YoZXZlbnRLZXkpID09PSAtMSkge1xuXHQgICAgICAgICAgLy8gc2V0IHRoZSBjdXJyZW50IGFuZCBjYXRjaC1hbGwgdmFyaWFibGVcblx0ICAgICAgICAgIGN1cnJlbnRJbnB1dCA9IGN1cnJlbnRJbnRlbnQgPSB2YWx1ZTtcblxuXHQgICAgICAgICAgc2V0SW5wdXQoKTtcblx0ICAgICAgICB9XG5cdCAgICAgIH1cblx0ICAgIH1cblx0ICB9O1xuXG5cdCAgLy8gdXBkYXRlcyB0aGUgZG9jIGFuZCBgaW5wdXRUeXBlc2AgYXJyYXkgd2l0aCBuZXcgaW5wdXRcblx0ICB2YXIgc2V0SW5wdXQgPSBmdW5jdGlvbiBzZXRJbnB1dCgpIHtcblx0ICAgIGRvYy5zZXRBdHRyaWJ1dGUoJ2RhdGEtd2hhdGlucHV0JywgY3VycmVudElucHV0KTtcblx0ICAgIGRvYy5zZXRBdHRyaWJ1dGUoJ2RhdGEtd2hhdGludGVudCcsIGN1cnJlbnRJbnB1dCk7XG5cblx0ICAgIGlmIChpbnB1dFR5cGVzLmluZGV4T2YoY3VycmVudElucHV0KSA9PT0gLTEpIHtcblx0ICAgICAgaW5wdXRUeXBlcy5wdXNoKGN1cnJlbnRJbnB1dCk7XG5cdCAgICAgIGRvYy5jbGFzc05hbWUgKz0gJyB3aGF0aW5wdXQtdHlwZXMtJyArIGN1cnJlbnRJbnB1dDtcblx0ICAgIH1cblxuXHQgICAgZmlyZUZ1bmN0aW9ucygnaW5wdXQnKTtcblx0ICB9O1xuXG5cdCAgLy8gdXBkYXRlcyBpbnB1dCBpbnRlbnQgZm9yIGBtb3VzZW1vdmVgIGFuZCBgcG9pbnRlcm1vdmVgXG5cdCAgdmFyIHNldEludGVudCA9IGZ1bmN0aW9uIHNldEludGVudChldmVudCkge1xuXHQgICAgLy8gdGVzdCB0byBzZWUgaWYgYG1vdXNlbW92ZWAgaGFwcGVuZWQgcmVsYXRpdmUgdG8gdGhlIHNjcmVlblxuXHQgICAgLy8gdG8gZGV0ZWN0IHNjcm9sbGluZyB2ZXJzdXMgbW91c2Vtb3ZlXG5cdCAgICBpZiAobW91c2VQb3NbJ3gnXSAhPT0gZXZlbnQuc2NyZWVuWCB8fCBtb3VzZVBvc1sneSddICE9PSBldmVudC5zY3JlZW5ZKSB7XG5cdCAgICAgIGlzU2Nyb2xsaW5nID0gZmFsc2U7XG5cblx0ICAgICAgbW91c2VQb3NbJ3gnXSA9IGV2ZW50LnNjcmVlblg7XG5cdCAgICAgIG1vdXNlUG9zWyd5J10gPSBldmVudC5zY3JlZW5ZO1xuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgaXNTY3JvbGxpbmcgPSB0cnVlO1xuXHQgICAgfVxuXG5cdCAgICAvLyBvbmx5IGV4ZWN1dGUgaWYgdGhlIHRvdWNoIGJ1ZmZlciB0aW1lciBpc24ndCBydW5uaW5nXG5cdCAgICAvLyBvciBzY3JvbGxpbmcgaXNuJ3QgaGFwcGVuaW5nXG5cdCAgICBpZiAoIWlzQnVmZmVyaW5nICYmICFpc1Njcm9sbGluZykge1xuXHQgICAgICB2YXIgdmFsdWUgPSBpbnB1dE1hcFtldmVudC50eXBlXTtcblx0ICAgICAgaWYgKHZhbHVlID09PSAncG9pbnRlcicpIHZhbHVlID0gcG9pbnRlclR5cGUoZXZlbnQpO1xuXG5cdCAgICAgIGlmIChjdXJyZW50SW50ZW50ICE9PSB2YWx1ZSkge1xuXHQgICAgICAgIGN1cnJlbnRJbnRlbnQgPSB2YWx1ZTtcblxuXHQgICAgICAgIGRvYy5zZXRBdHRyaWJ1dGUoJ2RhdGEtd2hhdGludGVudCcsIGN1cnJlbnRJbnRlbnQpO1xuXG5cdCAgICAgICAgZmlyZUZ1bmN0aW9ucygnaW50ZW50Jyk7XG5cdCAgICAgIH1cblx0ICAgIH1cblx0ICB9O1xuXG5cdCAgLy8gYnVmZmVycyB0b3VjaCBldmVudHMgYmVjYXVzZSB0aGV5IGZyZXF1ZW50bHkgYWxzbyBmaXJlIG1vdXNlIGV2ZW50c1xuXHQgIHZhciB0b3VjaEJ1ZmZlciA9IGZ1bmN0aW9uIHRvdWNoQnVmZmVyKGV2ZW50KSB7XG5cdCAgICBpZiAoZXZlbnQudHlwZSA9PT0gJ3RvdWNoc3RhcnQnKSB7XG5cdCAgICAgIGlzQnVmZmVyaW5nID0gZmFsc2U7XG5cblx0ICAgICAgLy8gc2V0IHRoZSBjdXJyZW50IGlucHV0XG5cdCAgICAgIHVwZGF0ZUlucHV0KGV2ZW50KTtcblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgIGlzQnVmZmVyaW5nID0gdHJ1ZTtcblx0ICAgIH1cblx0ICB9O1xuXG5cdCAgdmFyIGZpcmVGdW5jdGlvbnMgPSBmdW5jdGlvbiBmaXJlRnVuY3Rpb25zKHR5cGUpIHtcblx0ICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBmdW5jdGlvbkxpc3QubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcblx0ICAgICAgaWYgKGZ1bmN0aW9uTGlzdFtpXS50eXBlID09PSB0eXBlKSB7XG5cdCAgICAgICAgZnVuY3Rpb25MaXN0W2ldLmZuLmNhbGwodW5kZWZpbmVkLCBjdXJyZW50SW50ZW50KTtcblx0ICAgICAgfVxuXHQgICAgfVxuXHQgIH07XG5cblx0ICAvKlxuXHQgICAqIHV0aWxpdGllc1xuXHQgICAqL1xuXG5cdCAgdmFyIHBvaW50ZXJUeXBlID0gZnVuY3Rpb24gcG9pbnRlclR5cGUoZXZlbnQpIHtcblx0ICAgIGlmICh0eXBlb2YgZXZlbnQucG9pbnRlclR5cGUgPT09ICdudW1iZXInKSB7XG5cdCAgICAgIHJldHVybiBwb2ludGVyTWFwW2V2ZW50LnBvaW50ZXJUeXBlXTtcblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgIC8vIHRyZWF0IHBlbiBsaWtlIHRvdWNoXG5cdCAgICAgIHJldHVybiBldmVudC5wb2ludGVyVHlwZSA9PT0gJ3BlbicgPyAndG91Y2gnIDogZXZlbnQucG9pbnRlclR5cGU7XG5cdCAgICB9XG5cdCAgfTtcblxuXHQgIC8vIGRldGVjdCB2ZXJzaW9uIG9mIG1vdXNlIHdoZWVsIGV2ZW50IHRvIHVzZVxuXHQgIC8vIHZpYSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9FdmVudHMvd2hlZWxcblx0ICB2YXIgZGV0ZWN0V2hlZWwgPSBmdW5jdGlvbiBkZXRlY3RXaGVlbCgpIHtcblx0ICAgIHZhciB3aGVlbFR5cGUgPSB2b2lkIDA7XG5cblx0ICAgIC8vIE1vZGVybiBicm93c2VycyBzdXBwb3J0IFwid2hlZWxcIlxuXHQgICAgaWYgKCdvbndoZWVsJyBpbiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSkge1xuXHQgICAgICB3aGVlbFR5cGUgPSAnd2hlZWwnO1xuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgLy8gV2Via2l0IGFuZCBJRSBzdXBwb3J0IGF0IGxlYXN0IFwibW91c2V3aGVlbFwiXG5cdCAgICAgIC8vIG9yIGFzc3VtZSB0aGF0IHJlbWFpbmluZyBicm93c2VycyBhcmUgb2xkZXIgRmlyZWZveFxuXHQgICAgICB3aGVlbFR5cGUgPSBkb2N1bWVudC5vbm1vdXNld2hlZWwgIT09IHVuZGVmaW5lZCA/ICdtb3VzZXdoZWVsJyA6ICdET01Nb3VzZVNjcm9sbCc7XG5cdCAgICB9XG5cblx0ICAgIHJldHVybiB3aGVlbFR5cGU7XG5cdCAgfTtcblxuXHQgIHZhciBvYmpQb3MgPSBmdW5jdGlvbiBvYmpQb3MobWF0Y2gpIHtcblx0ICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBmdW5jdGlvbkxpc3QubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcblx0ICAgICAgaWYgKGZ1bmN0aW9uTGlzdFtpXS5mbiA9PT0gbWF0Y2gpIHtcblx0ICAgICAgICByZXR1cm4gaTtcblx0ICAgICAgfVxuXHQgICAgfVxuXHQgIH07XG5cblx0ICAvKlxuXHQgICAqIGluaXRcblx0ICAgKi9cblxuXHQgIC8vIGRvbid0IHN0YXJ0IHNjcmlwdCB1bmxlc3MgYnJvd3NlciBjdXRzIHRoZSBtdXN0YXJkXG5cdCAgLy8gKGFsc28gcGFzc2VzIGlmIHBvbHlmaWxscyBhcmUgdXNlZClcblx0ICBpZiAoJ2FkZEV2ZW50TGlzdGVuZXInIGluIHdpbmRvdyAmJiBBcnJheS5wcm90b3R5cGUuaW5kZXhPZikge1xuXHQgICAgc2V0VXAoKTtcblx0ICB9XG5cblx0ICAvKlxuXHQgICAqIGFwaVxuXHQgICAqL1xuXG5cdCAgcmV0dXJuIHtcblx0ICAgIC8vIHJldHVybnMgc3RyaW5nOiB0aGUgY3VycmVudCBpbnB1dCB0eXBlXG5cdCAgICAvLyBvcHQ6ICdsb29zZSd8J3N0cmljdCdcblx0ICAgIC8vICdzdHJpY3QnIChkZWZhdWx0KTogcmV0dXJucyB0aGUgc2FtZSB2YWx1ZSBhcyB0aGUgYGRhdGEtd2hhdGlucHV0YCBhdHRyaWJ1dGVcblx0ICAgIC8vICdsb29zZSc6IGluY2x1ZGVzIGBkYXRhLXdoYXRpbnRlbnRgIHZhbHVlIGlmIGl0J3MgbW9yZSBjdXJyZW50IHRoYW4gYGRhdGEtd2hhdGlucHV0YFxuXHQgICAgYXNrOiBmdW5jdGlvbiBhc2sob3B0KSB7XG5cdCAgICAgIHJldHVybiBvcHQgPT09ICdsb29zZScgPyBjdXJyZW50SW50ZW50IDogY3VycmVudElucHV0O1xuXHQgICAgfSxcblxuXHQgICAgLy8gcmV0dXJucyBhcnJheTogYWxsIHRoZSBkZXRlY3RlZCBpbnB1dCB0eXBlc1xuXHQgICAgdHlwZXM6IGZ1bmN0aW9uIHR5cGVzKCkge1xuXHQgICAgICByZXR1cm4gaW5wdXRUeXBlcztcblx0ICAgIH0sXG5cblx0ICAgIC8vIG92ZXJ3cml0ZXMgaWdub3JlZCBrZXlzIHdpdGggcHJvdmlkZWQgYXJyYXlcblx0ICAgIGlnbm9yZUtleXM6IGZ1bmN0aW9uIGlnbm9yZUtleXMoYXJyKSB7XG5cdCAgICAgIGlnbm9yZU1hcCA9IGFycjtcblx0ICAgIH0sXG5cblx0ICAgIC8vIGF0dGFjaCBmdW5jdGlvbnMgdG8gaW5wdXQgYW5kIGludGVudCBcImV2ZW50c1wiXG5cdCAgICAvLyBmdW5jdDogZnVuY3Rpb24gdG8gZmlyZSBvbiBjaGFuZ2Vcblx0ICAgIC8vIGV2ZW50VHlwZTogJ2lucHV0J3wnaW50ZW50J1xuXHQgICAgcmVnaXN0ZXJPbkNoYW5nZTogZnVuY3Rpb24gcmVnaXN0ZXJPbkNoYW5nZShmbiwgZXZlbnRUeXBlKSB7XG5cdCAgICAgIGZ1bmN0aW9uTGlzdC5wdXNoKHtcblx0ICAgICAgICBmbjogZm4sXG5cdCAgICAgICAgdHlwZTogZXZlbnRUeXBlIHx8ICdpbnB1dCdcblx0ICAgICAgfSk7XG5cdCAgICB9LFxuXG5cdCAgICB1blJlZ2lzdGVyT25DaGFuZ2U6IGZ1bmN0aW9uIHVuUmVnaXN0ZXJPbkNoYW5nZShmbikge1xuXHQgICAgICB2YXIgcG9zaXRpb24gPSBvYmpQb3MoZm4pO1xuXG5cdCAgICAgIGlmIChwb3NpdGlvbikge1xuXHQgICAgICAgIGZ1bmN0aW9uTGlzdC5zcGxpY2UocG9zaXRpb24sIDEpO1xuXHQgICAgICB9XG5cdCAgICB9XG5cdCAgfTtcblx0fSgpO1xuXG4vKioqLyB9XG4vKioqKioqLyBdKVxufSk7XG47XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvd2hhdC1pbnB1dC9kaXN0L3doYXQtaW5wdXQuanNcbi8vIG1vZHVsZSBpZCA9IDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcclxuaW1wb3J0IHsgRm91bmRhdGlvbiB9IGZyb20gJ2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi5jb3JlJztcclxuLy8gaW1wb3J0IHsgcnRsLCBHZXRZb0RpZ2l0cywgdHJhbnNpdGlvbmVuZCB9IGZyb20gJ2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi51dGlsLmNvcmUnO1xyXG4vLyBpbXBvcnQgeyBCb3ggfSBmcm9tICdmb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24udXRpbC5ib3gnXHJcbi8vIGltcG9ydCB7IG9uSW1hZ2VzTG9hZGVkIH0gZnJvbSAnZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLnV0aWwuaW1hZ2VMb2FkZXInO1xyXG5pbXBvcnQgeyBLZXlib2FyZCB9IGZyb20gJ2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi51dGlsLmtleWJvYXJkJztcclxuaW1wb3J0IHsgTWVkaWFRdWVyeSB9IGZyb20gJ2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi51dGlsLm1lZGlhUXVlcnknO1xyXG4vLyBpbXBvcnQgeyBNb3Rpb24sIE1vdmUgfSBmcm9tICdmb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24udXRpbC5tb3Rpb24nO1xyXG4vLyBpbXBvcnQgeyBOZXN0IH0gZnJvbSAnZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLnV0aWwubmVzdCc7XHJcbi8vIGltcG9ydCB7IFRpbWVyIH0gZnJvbSAnZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLnV0aWwudGltZXInO1xyXG4vLyBpbXBvcnQgeyBUb3VjaCB9IGZyb20gJ2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi51dGlsLnRvdWNoJztcclxuaW1wb3J0IHsgVHJpZ2dlcnMgfSBmcm9tICdmb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24udXRpbC50cmlnZ2Vycyc7XHJcbi8vIGltcG9ydCB7IEFiaWRlIH0gZnJvbSAnZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLmFiaWRlJztcclxuLy8gaW1wb3J0IHsgQWNjb3JkaW9uIH0gZnJvbSAnZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLmFjY29yZGlvbic7XHJcbi8vIGltcG9ydCB7IEFjY29yZGlvbk1lbnUgfSBmcm9tICdmb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24uYWNjb3JkaW9uTWVudSc7XHJcbi8vIGltcG9ydCB7IERyaWxsZG93biB9IGZyb20gJ2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi5kcmlsbGRvd24nO1xyXG4vLyBpbXBvcnQgeyBEcm9wZG93biB9IGZyb20gJ2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi5kcm9wZG93bic7XHJcbi8vIGltcG9ydCB7IERyb3Bkb3duTWVudSB9IGZyb20gJ2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi5kcm9wZG93bk1lbnUnO1xyXG4vLyBpbXBvcnQgeyBFcXVhbGl6ZXIgfSBmcm9tICdmb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24uZXF1YWxpemVyJztcclxuLy8gaW1wb3J0IHsgSW50ZXJjaGFuZ2UgfSBmcm9tICdmb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24uaW50ZXJjaGFuZ2UnO1xyXG4vLyBpbXBvcnQgeyBNYWdlbGxhbiB9IGZyb20gJ2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi5tYWdlbGxhbic7XHJcbmltcG9ydCB7IE9mZkNhbnZhcyB9IGZyb20gJ2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi5vZmZjYW52YXMnO1xyXG4vLyBpbXBvcnQgeyBPcmJpdCB9IGZyb20gJ2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi5vcmJpdCc7XHJcbi8vIGltcG9ydCB7IFJlc3BvbnNpdmVNZW51IH0gZnJvbSAnZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLnJlc3BvbnNpdmVNZW51JztcclxuLy8gaW1wb3J0IHsgUmVzcG9uc2l2ZVRvZ2dsZSB9IGZyb20gJ2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi5yZXNwb25zaXZlVG9nZ2xlJztcclxuLy8gaW1wb3J0IHsgUmV2ZWFsIH0gZnJvbSAnZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLnJldmVhbCc7XHJcbi8vIGltcG9ydCB7IFNsaWRlciB9IGZyb20gJ2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi5zbGlkZXInO1xyXG4vLyBpbXBvcnQgeyBTbW9vdGhTY3JvbGwgfSBmcm9tICdmb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24uc21vb3RoU2Nyb2xsJztcclxuLy8gaW1wb3J0IHsgU3RpY2t5IH0gZnJvbSAnZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLnN0aWNreSc7XHJcbi8vIGltcG9ydCB7IFRhYnMgfSBmcm9tICdmb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24udGFicyc7XHJcbi8vIGltcG9ydCB7IFRvZ2dsZXIgfSBmcm9tICdmb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24udG9nZ2xlcic7XHJcbi8vIGltcG9ydCB7IFRvb2x0aXAgfSBmcm9tICdmb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24udG9vbHRpcCc7XHJcbi8vIGltcG9ydCB7IFJlc3BvbnNpdmVBY2NvcmRpb25UYWJzIH0gZnJvbSAnZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLnJlc3BvbnNpdmVBY2NvcmRpb25UYWJzJztcclxuXHJcblxyXG5Gb3VuZGF0aW9uLmFkZFRvSnF1ZXJ5KCQpO1xyXG5cclxuLy8gQWRkIEZvdW5kYXRpb24gVXRpbHMgdG8gRm91bmRhdGlvbiBnbG9iYWwgbmFtZXNwYWNlIGZvciBiYWNrd2FyZHNcclxuLy8gY29tcGF0aWJpbGl0eS5cclxuXHJcbi8vIEZvdW5kYXRpb24ucnRsID0gcnRsO1xyXG4vLyBGb3VuZGF0aW9uLkdldFlvRGlnaXRzID0gR2V0WW9EaWdpdHM7XHJcbi8vIEZvdW5kYXRpb24udHJhbnNpdGlvbmVuZCA9IHRyYW5zaXRpb25lbmQ7XHJcbi8vXHJcbi8vIEZvdW5kYXRpb24uQm94ID0gQm94O1xyXG4vLyBGb3VuZGF0aW9uLm9uSW1hZ2VzTG9hZGVkID0gb25JbWFnZXNMb2FkZWQ7XHJcbkZvdW5kYXRpb24uS2V5Ym9hcmQgPSBLZXlib2FyZDtcclxuRm91bmRhdGlvbi5NZWRpYVF1ZXJ5ID0gTWVkaWFRdWVyeTtcclxuLy8gRm91bmRhdGlvbi5Nb3Rpb24gPSBNb3Rpb247XHJcbi8vIEZvdW5kYXRpb24uTW92ZSA9IE1vdmU7XHJcbi8vIEZvdW5kYXRpb24uTmVzdCA9IE5lc3Q7XHJcbi8vIEZvdW5kYXRpb24uVGltZXIgPSBUaW1lcjtcclxuXHJcbi8vIFRvdWNoIGFuZCBUcmlnZ2VycyBwcmV2aW91c2x5IHdlcmUgYWxtb3N0IHB1cmVseSBzZWRlIGVmZmVjdCBkcml2ZW4sXHJcbi8vIHNvIG5vIC8vIG5lZWQgdG8gYWRkIGl0IHRvIEZvdW5kYXRpb24sIGp1c3QgaW5pdCB0aGVtLlxyXG5cclxuLy8gVG91Y2guaW5pdCgkKTtcclxuXHJcblRyaWdnZXJzLmluaXQoJCwgRm91bmRhdGlvbik7XHJcbi8vXHJcbi8vIEZvdW5kYXRpb24ucGx1Z2luKEFiaWRlLCAnQWJpZGUnKTtcclxuLy9cclxuLy8gRm91bmRhdGlvbi5wbHVnaW4oQWNjb3JkaW9uLCAnQWNjb3JkaW9uJyk7XHJcbi8vXHJcbi8vIEZvdW5kYXRpb24ucGx1Z2luKEFjY29yZGlvbk1lbnUsICdBY2NvcmRpb25NZW51Jyk7XHJcbi8vXHJcbi8vIEZvdW5kYXRpb24ucGx1Z2luKERyaWxsZG93biwgJ0RyaWxsZG93bicpO1xyXG4vL1xyXG4vLyBGb3VuZGF0aW9uLnBsdWdpbihEcm9wZG93biwgJ0Ryb3Bkb3duJyk7XHJcbi8vXHJcbi8vIEZvdW5kYXRpb24ucGx1Z2luKERyb3Bkb3duTWVudSwgJ0Ryb3Bkb3duTWVudScpO1xyXG4vL1xyXG4vLyBGb3VuZGF0aW9uLnBsdWdpbihFcXVhbGl6ZXIsICdFcXVhbGl6ZXInKTtcclxuLy9cclxuLy8gRm91bmRhdGlvbi5wbHVnaW4oSW50ZXJjaGFuZ2UsICdJbnRlcmNoYW5nZScpO1xyXG4vL1xyXG4vLyBGb3VuZGF0aW9uLnBsdWdpbihNYWdlbGxhbiwgJ01hZ2VsbGFuJyk7XHJcbi8vXHJcbkZvdW5kYXRpb24ucGx1Z2luKE9mZkNhbnZhcywgJ09mZkNhbnZhcycpO1xyXG4vL1xyXG4vLyBGb3VuZGF0aW9uLnBsdWdpbihPcmJpdCwgJ09yYml0Jyk7XHJcbi8vXHJcbi8vIEZvdW5kYXRpb24ucGx1Z2luKFJlc3BvbnNpdmVNZW51LCAnUmVzcG9uc2l2ZU1lbnUnKTtcclxuLy9cclxuLy8gRm91bmRhdGlvbi5wbHVnaW4oUmVzcG9uc2l2ZVRvZ2dsZSwgJ1Jlc3BvbnNpdmVUb2dnbGUnKTtcclxuLy9cclxuLy8gRm91bmRhdGlvbi5wbHVnaW4oUmV2ZWFsLCAnUmV2ZWFsJyk7XHJcbi8vXHJcbi8vIEZvdW5kYXRpb24ucGx1Z2luKFNsaWRlciwgJ1NsaWRlcicpO1xyXG4vL1xyXG4vLyBGb3VuZGF0aW9uLnBsdWdpbihTbW9vdGhTY3JvbGwsICdTbW9vdGhTY3JvbGwnKTtcclxuLy9cclxuLy8gRm91bmRhdGlvbi5wbHVnaW4oU3RpY2t5LCAnU3RpY2t5Jyk7XHJcbi8vXHJcbi8vIEZvdW5kYXRpb24ucGx1Z2luKFRhYnMsICdUYWJzJyk7XHJcbi8vXHJcbi8vIEZvdW5kYXRpb24ucGx1Z2luKFRvZ2dsZXIsICdUb2dnbGVyJyk7XHJcbi8vXHJcbi8vIEZvdW5kYXRpb24ucGx1Z2luKFRvb2x0aXAsICdUb29sdGlwJyk7XHJcbi8vXHJcbi8vIEZvdW5kYXRpb24ucGx1Z2luKFJlc3BvbnNpdmVBY2NvcmRpb25UYWJzLCAnUmVzcG9uc2l2ZUFjY29yZGlvblRhYnMnKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRm91bmRhdGlvbjtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2Fzc2V0cy9qcy9saWIvZm91bmRhdGlvbi1leHBsaWNpdC1waWVjZXMuanMiLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcbmltcG9ydCB7IEdldFlvRGlnaXRzIH0gZnJvbSAnLi9mb3VuZGF0aW9uLnV0aWwuY29yZSc7XG5pbXBvcnQgeyBNZWRpYVF1ZXJ5IH0gZnJvbSAnLi9mb3VuZGF0aW9uLnV0aWwubWVkaWFRdWVyeSc7XG5cbnZhciBGT1VOREFUSU9OX1ZFUlNJT04gPSAnNi40LjMnO1xuXG4vLyBHbG9iYWwgRm91bmRhdGlvbiBvYmplY3Rcbi8vIFRoaXMgaXMgYXR0YWNoZWQgdG8gdGhlIHdpbmRvdywgb3IgdXNlZCBhcyBhIG1vZHVsZSBmb3IgQU1EL0Jyb3dzZXJpZnlcbnZhciBGb3VuZGF0aW9uID0ge1xuICB2ZXJzaW9uOiBGT1VOREFUSU9OX1ZFUlNJT04sXG5cbiAgLyoqXG4gICAqIFN0b3JlcyBpbml0aWFsaXplZCBwbHVnaW5zLlxuICAgKi9cbiAgX3BsdWdpbnM6IHt9LFxuXG4gIC8qKlxuICAgKiBTdG9yZXMgZ2VuZXJhdGVkIHVuaXF1ZSBpZHMgZm9yIHBsdWdpbiBpbnN0YW5jZXNcbiAgICovXG4gIF91dWlkczogW10sXG5cbiAgLyoqXG4gICAqIERlZmluZXMgYSBGb3VuZGF0aW9uIHBsdWdpbiwgYWRkaW5nIGl0IHRvIHRoZSBgRm91bmRhdGlvbmAgbmFtZXNwYWNlIGFuZCB0aGUgbGlzdCBvZiBwbHVnaW5zIHRvIGluaXRpYWxpemUgd2hlbiByZWZsb3dpbmcuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwbHVnaW4gLSBUaGUgY29uc3RydWN0b3Igb2YgdGhlIHBsdWdpbi5cbiAgICovXG4gIHBsdWdpbjogZnVuY3Rpb24ocGx1Z2luLCBuYW1lKSB7XG4gICAgLy8gT2JqZWN0IGtleSB0byB1c2Ugd2hlbiBhZGRpbmcgdG8gZ2xvYmFsIEZvdW5kYXRpb24gb2JqZWN0XG4gICAgLy8gRXhhbXBsZXM6IEZvdW5kYXRpb24uUmV2ZWFsLCBGb3VuZGF0aW9uLk9mZkNhbnZhc1xuICAgIHZhciBjbGFzc05hbWUgPSAobmFtZSB8fCBmdW5jdGlvbk5hbWUocGx1Z2luKSk7XG4gICAgLy8gT2JqZWN0IGtleSB0byB1c2Ugd2hlbiBzdG9yaW5nIHRoZSBwbHVnaW4sIGFsc28gdXNlZCB0byBjcmVhdGUgdGhlIGlkZW50aWZ5aW5nIGRhdGEgYXR0cmlidXRlIGZvciB0aGUgcGx1Z2luXG4gICAgLy8gRXhhbXBsZXM6IGRhdGEtcmV2ZWFsLCBkYXRhLW9mZi1jYW52YXNcbiAgICB2YXIgYXR0ck5hbWUgID0gaHlwaGVuYXRlKGNsYXNzTmFtZSk7XG5cbiAgICAvLyBBZGQgdG8gdGhlIEZvdW5kYXRpb24gb2JqZWN0IGFuZCB0aGUgcGx1Z2lucyBsaXN0IChmb3IgcmVmbG93aW5nKVxuICAgIHRoaXMuX3BsdWdpbnNbYXR0ck5hbWVdID0gdGhpc1tjbGFzc05hbWVdID0gcGx1Z2luO1xuICB9LFxuICAvKipcbiAgICogQGZ1bmN0aW9uXG4gICAqIFBvcHVsYXRlcyB0aGUgX3V1aWRzIGFycmF5IHdpdGggcG9pbnRlcnMgdG8gZWFjaCBpbmRpdmlkdWFsIHBsdWdpbiBpbnN0YW5jZS5cbiAgICogQWRkcyB0aGUgYHpmUGx1Z2luYCBkYXRhLWF0dHJpYnV0ZSB0byBwcm9ncmFtbWF0aWNhbGx5IGNyZWF0ZWQgcGx1Z2lucyB0byBhbGxvdyB1c2Ugb2YgJChzZWxlY3RvcikuZm91bmRhdGlvbihtZXRob2QpIGNhbGxzLlxuICAgKiBBbHNvIGZpcmVzIHRoZSBpbml0aWFsaXphdGlvbiBldmVudCBmb3IgZWFjaCBwbHVnaW4sIGNvbnNvbGlkYXRpbmcgcmVwZXRpdGl2ZSBjb2RlLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGx1Z2luIC0gYW4gaW5zdGFuY2Ugb2YgYSBwbHVnaW4sIHVzdWFsbHkgYHRoaXNgIGluIGNvbnRleHQuXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIC0gdGhlIG5hbWUgb2YgdGhlIHBsdWdpbiwgcGFzc2VkIGFzIGEgY2FtZWxDYXNlZCBzdHJpbmcuXG4gICAqIEBmaXJlcyBQbHVnaW4jaW5pdFxuICAgKi9cbiAgcmVnaXN0ZXJQbHVnaW46IGZ1bmN0aW9uKHBsdWdpbiwgbmFtZSl7XG4gICAgdmFyIHBsdWdpbk5hbWUgPSBuYW1lID8gaHlwaGVuYXRlKG5hbWUpIDogZnVuY3Rpb25OYW1lKHBsdWdpbi5jb25zdHJ1Y3RvcikudG9Mb3dlckNhc2UoKTtcbiAgICBwbHVnaW4udXVpZCA9IEdldFlvRGlnaXRzKDYsIHBsdWdpbk5hbWUpO1xuXG4gICAgaWYoIXBsdWdpbi4kZWxlbWVudC5hdHRyKGBkYXRhLSR7cGx1Z2luTmFtZX1gKSl7IHBsdWdpbi4kZWxlbWVudC5hdHRyKGBkYXRhLSR7cGx1Z2luTmFtZX1gLCBwbHVnaW4udXVpZCk7IH1cbiAgICBpZighcGx1Z2luLiRlbGVtZW50LmRhdGEoJ3pmUGx1Z2luJykpeyBwbHVnaW4uJGVsZW1lbnQuZGF0YSgnemZQbHVnaW4nLCBwbHVnaW4pOyB9XG4gICAgICAgICAgLyoqXG4gICAgICAgICAgICogRmlyZXMgd2hlbiB0aGUgcGx1Z2luIGhhcyBpbml0aWFsaXplZC5cbiAgICAgICAgICAgKiBAZXZlbnQgUGx1Z2luI2luaXRcbiAgICAgICAgICAgKi9cbiAgICBwbHVnaW4uJGVsZW1lbnQudHJpZ2dlcihgaW5pdC56Zi4ke3BsdWdpbk5hbWV9YCk7XG5cbiAgICB0aGlzLl91dWlkcy5wdXNoKHBsdWdpbi51dWlkKTtcblxuICAgIHJldHVybjtcbiAgfSxcbiAgLyoqXG4gICAqIEBmdW5jdGlvblxuICAgKiBSZW1vdmVzIHRoZSBwbHVnaW5zIHV1aWQgZnJvbSB0aGUgX3V1aWRzIGFycmF5LlxuICAgKiBSZW1vdmVzIHRoZSB6ZlBsdWdpbiBkYXRhIGF0dHJpYnV0ZSwgYXMgd2VsbCBhcyB0aGUgZGF0YS1wbHVnaW4tbmFtZSBhdHRyaWJ1dGUuXG4gICAqIEFsc28gZmlyZXMgdGhlIGRlc3Ryb3llZCBldmVudCBmb3IgdGhlIHBsdWdpbiwgY29uc29saWRhdGluZyByZXBldGl0aXZlIGNvZGUuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwbHVnaW4gLSBhbiBpbnN0YW5jZSBvZiBhIHBsdWdpbiwgdXN1YWxseSBgdGhpc2AgaW4gY29udGV4dC5cbiAgICogQGZpcmVzIFBsdWdpbiNkZXN0cm95ZWRcbiAgICovXG4gIHVucmVnaXN0ZXJQbHVnaW46IGZ1bmN0aW9uKHBsdWdpbil7XG4gICAgdmFyIHBsdWdpbk5hbWUgPSBoeXBoZW5hdGUoZnVuY3Rpb25OYW1lKHBsdWdpbi4kZWxlbWVudC5kYXRhKCd6ZlBsdWdpbicpLmNvbnN0cnVjdG9yKSk7XG5cbiAgICB0aGlzLl91dWlkcy5zcGxpY2UodGhpcy5fdXVpZHMuaW5kZXhPZihwbHVnaW4udXVpZCksIDEpO1xuICAgIHBsdWdpbi4kZWxlbWVudC5yZW1vdmVBdHRyKGBkYXRhLSR7cGx1Z2luTmFtZX1gKS5yZW1vdmVEYXRhKCd6ZlBsdWdpbicpXG4gICAgICAgICAgLyoqXG4gICAgICAgICAgICogRmlyZXMgd2hlbiB0aGUgcGx1Z2luIGhhcyBiZWVuIGRlc3Ryb3llZC5cbiAgICAgICAgICAgKiBAZXZlbnQgUGx1Z2luI2Rlc3Ryb3llZFxuICAgICAgICAgICAqL1xuICAgICAgICAgIC50cmlnZ2VyKGBkZXN0cm95ZWQuemYuJHtwbHVnaW5OYW1lfWApO1xuICAgIGZvcih2YXIgcHJvcCBpbiBwbHVnaW4pe1xuICAgICAgcGx1Z2luW3Byb3BdID0gbnVsbDsvL2NsZWFuIHVwIHNjcmlwdCB0byBwcmVwIGZvciBnYXJiYWdlIGNvbGxlY3Rpb24uXG4gICAgfVxuICAgIHJldHVybjtcbiAgfSxcblxuICAvKipcbiAgICogQGZ1bmN0aW9uXG4gICAqIENhdXNlcyBvbmUgb3IgbW9yZSBhY3RpdmUgcGx1Z2lucyB0byByZS1pbml0aWFsaXplLCByZXNldHRpbmcgZXZlbnQgbGlzdGVuZXJzLCByZWNhbGN1bGF0aW5nIHBvc2l0aW9ucywgZXRjLlxuICAgKiBAcGFyYW0ge1N0cmluZ30gcGx1Z2lucyAtIG9wdGlvbmFsIHN0cmluZyBvZiBhbiBpbmRpdmlkdWFsIHBsdWdpbiBrZXksIGF0dGFpbmVkIGJ5IGNhbGxpbmcgYCQoZWxlbWVudCkuZGF0YSgncGx1Z2luTmFtZScpYCwgb3Igc3RyaW5nIG9mIGEgcGx1Z2luIGNsYXNzIGkuZS4gYCdkcm9wZG93bidgXG4gICAqIEBkZWZhdWx0IElmIG5vIGFyZ3VtZW50IGlzIHBhc3NlZCwgcmVmbG93IGFsbCBjdXJyZW50bHkgYWN0aXZlIHBsdWdpbnMuXG4gICAqL1xuICAgcmVJbml0OiBmdW5jdGlvbihwbHVnaW5zKXtcbiAgICAgdmFyIGlzSlEgPSBwbHVnaW5zIGluc3RhbmNlb2YgJDtcbiAgICAgdHJ5e1xuICAgICAgIGlmKGlzSlEpe1xuICAgICAgICAgcGx1Z2lucy5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICQodGhpcykuZGF0YSgnemZQbHVnaW4nKS5faW5pdCgpO1xuICAgICAgICAgfSk7XG4gICAgICAgfWVsc2V7XG4gICAgICAgICB2YXIgdHlwZSA9IHR5cGVvZiBwbHVnaW5zLFxuICAgICAgICAgX3RoaXMgPSB0aGlzLFxuICAgICAgICAgZm5zID0ge1xuICAgICAgICAgICAnb2JqZWN0JzogZnVuY3Rpb24ocGxncyl7XG4gICAgICAgICAgICAgcGxncy5mb3JFYWNoKGZ1bmN0aW9uKHApe1xuICAgICAgICAgICAgICAgcCA9IGh5cGhlbmF0ZShwKTtcbiAgICAgICAgICAgICAgICQoJ1tkYXRhLScrIHAgKyddJykuZm91bmRhdGlvbignX2luaXQnKTtcbiAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgfSxcbiAgICAgICAgICAgJ3N0cmluZyc6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgcGx1Z2lucyA9IGh5cGhlbmF0ZShwbHVnaW5zKTtcbiAgICAgICAgICAgICAkKCdbZGF0YS0nKyBwbHVnaW5zICsnXScpLmZvdW5kYXRpb24oJ19pbml0Jyk7XG4gICAgICAgICAgIH0sXG4gICAgICAgICAgICd1bmRlZmluZWQnOiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgIHRoaXNbJ29iamVjdCddKE9iamVjdC5rZXlzKF90aGlzLl9wbHVnaW5zKSk7XG4gICAgICAgICAgIH1cbiAgICAgICAgIH07XG4gICAgICAgICBmbnNbdHlwZV0ocGx1Z2lucyk7XG4gICAgICAgfVxuICAgICB9Y2F0Y2goZXJyKXtcbiAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgIH1maW5hbGx5e1xuICAgICAgIHJldHVybiBwbHVnaW5zO1xuICAgICB9XG4gICB9LFxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIHBsdWdpbnMgb24gYW55IGVsZW1lbnRzIHdpdGhpbiBgZWxlbWAgKGFuZCBgZWxlbWAgaXRzZWxmKSB0aGF0IGFyZW4ndCBhbHJlYWR5IGluaXRpYWxpemVkLlxuICAgKiBAcGFyYW0ge09iamVjdH0gZWxlbSAtIGpRdWVyeSBvYmplY3QgY29udGFpbmluZyB0aGUgZWxlbWVudCB0byBjaGVjayBpbnNpZGUuIEFsc28gY2hlY2tzIHRoZSBlbGVtZW50IGl0c2VsZiwgdW5sZXNzIGl0J3MgdGhlIGBkb2N1bWVudGAgb2JqZWN0LlxuICAgKiBAcGFyYW0ge1N0cmluZ3xBcnJheX0gcGx1Z2lucyAtIEEgbGlzdCBvZiBwbHVnaW5zIHRvIGluaXRpYWxpemUuIExlYXZlIHRoaXMgb3V0IHRvIGluaXRpYWxpemUgZXZlcnl0aGluZy5cbiAgICovXG4gIHJlZmxvdzogZnVuY3Rpb24oZWxlbSwgcGx1Z2lucykge1xuXG4gICAgLy8gSWYgcGx1Z2lucyBpcyB1bmRlZmluZWQsIGp1c3QgZ3JhYiBldmVyeXRoaW5nXG4gICAgaWYgKHR5cGVvZiBwbHVnaW5zID09PSAndW5kZWZpbmVkJykge1xuICAgICAgcGx1Z2lucyA9IE9iamVjdC5rZXlzKHRoaXMuX3BsdWdpbnMpO1xuICAgIH1cbiAgICAvLyBJZiBwbHVnaW5zIGlzIGEgc3RyaW5nLCBjb252ZXJ0IGl0IHRvIGFuIGFycmF5IHdpdGggb25lIGl0ZW1cbiAgICBlbHNlIGlmICh0eXBlb2YgcGx1Z2lucyA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHBsdWdpbnMgPSBbcGx1Z2luc107XG4gICAgfVxuXG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIC8vIEl0ZXJhdGUgdGhyb3VnaCBlYWNoIHBsdWdpblxuICAgICQuZWFjaChwbHVnaW5zLCBmdW5jdGlvbihpLCBuYW1lKSB7XG4gICAgICAvLyBHZXQgdGhlIGN1cnJlbnQgcGx1Z2luXG4gICAgICB2YXIgcGx1Z2luID0gX3RoaXMuX3BsdWdpbnNbbmFtZV07XG5cbiAgICAgIC8vIExvY2FsaXplIHRoZSBzZWFyY2ggdG8gYWxsIGVsZW1lbnRzIGluc2lkZSBlbGVtLCBhcyB3ZWxsIGFzIGVsZW0gaXRzZWxmLCB1bmxlc3MgZWxlbSA9PT0gZG9jdW1lbnRcbiAgICAgIHZhciAkZWxlbSA9ICQoZWxlbSkuZmluZCgnW2RhdGEtJytuYW1lKyddJykuYWRkQmFjaygnW2RhdGEtJytuYW1lKyddJyk7XG5cbiAgICAgIC8vIEZvciBlYWNoIHBsdWdpbiBmb3VuZCwgaW5pdGlhbGl6ZSBpdFxuICAgICAgJGVsZW0uZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyICRlbCA9ICQodGhpcyksXG4gICAgICAgICAgICBvcHRzID0ge307XG4gICAgICAgIC8vIERvbid0IGRvdWJsZS1kaXAgb24gcGx1Z2luc1xuICAgICAgICBpZiAoJGVsLmRhdGEoJ3pmUGx1Z2luJykpIHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oXCJUcmllZCB0byBpbml0aWFsaXplIFwiK25hbWUrXCIgb24gYW4gZWxlbWVudCB0aGF0IGFscmVhZHkgaGFzIGEgRm91bmRhdGlvbiBwbHVnaW4uXCIpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKCRlbC5hdHRyKCdkYXRhLW9wdGlvbnMnKSl7XG4gICAgICAgICAgdmFyIHRoaW5nID0gJGVsLmF0dHIoJ2RhdGEtb3B0aW9ucycpLnNwbGl0KCc7JykuZm9yRWFjaChmdW5jdGlvbihlLCBpKXtcbiAgICAgICAgICAgIHZhciBvcHQgPSBlLnNwbGl0KCc6JykubWFwKGZ1bmN0aW9uKGVsKXsgcmV0dXJuIGVsLnRyaW0oKTsgfSk7XG4gICAgICAgICAgICBpZihvcHRbMF0pIG9wdHNbb3B0WzBdXSA9IHBhcnNlVmFsdWUob3B0WzFdKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB0cnl7XG4gICAgICAgICAgJGVsLmRhdGEoJ3pmUGx1Z2luJywgbmV3IHBsdWdpbigkKHRoaXMpLCBvcHRzKSk7XG4gICAgICAgIH1jYXRjaChlcil7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihlcik7XG4gICAgICAgIH1maW5hbGx5e1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG4gIGdldEZuTmFtZTogZnVuY3Rpb25OYW1lLFxuXG4gIGFkZFRvSnF1ZXJ5OiBmdW5jdGlvbigkKSB7XG4gICAgLy8gVE9ETzogY29uc2lkZXIgbm90IG1ha2luZyB0aGlzIGEgalF1ZXJ5IGZ1bmN0aW9uXG4gICAgLy8gVE9ETzogbmVlZCB3YXkgdG8gcmVmbG93IHZzLiByZS1pbml0aWFsaXplXG4gICAgLyoqXG4gICAgICogVGhlIEZvdW5kYXRpb24galF1ZXJ5IG1ldGhvZC5cbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xBcnJheX0gbWV0aG9kIC0gQW4gYWN0aW9uIHRvIHBlcmZvcm0gb24gdGhlIGN1cnJlbnQgalF1ZXJ5IG9iamVjdC5cbiAgICAgKi9cbiAgICB2YXIgZm91bmRhdGlvbiA9IGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgICAgdmFyIHR5cGUgPSB0eXBlb2YgbWV0aG9kLFxuICAgICAgICAgICRub0pTID0gJCgnLm5vLWpzJyk7XG5cbiAgICAgIGlmKCRub0pTLmxlbmd0aCl7XG4gICAgICAgICRub0pTLnJlbW92ZUNsYXNzKCduby1qcycpO1xuICAgICAgfVxuXG4gICAgICBpZih0eXBlID09PSAndW5kZWZpbmVkJyl7Ly9uZWVkcyB0byBpbml0aWFsaXplIHRoZSBGb3VuZGF0aW9uIG9iamVjdCwgb3IgYW4gaW5kaXZpZHVhbCBwbHVnaW4uXG4gICAgICAgIE1lZGlhUXVlcnkuX2luaXQoKTtcbiAgICAgICAgRm91bmRhdGlvbi5yZWZsb3codGhpcyk7XG4gICAgICB9ZWxzZSBpZih0eXBlID09PSAnc3RyaW5nJyl7Ly9hbiBpbmRpdmlkdWFsIG1ldGhvZCB0byBpbnZva2Ugb24gYSBwbHVnaW4gb3IgZ3JvdXAgb2YgcGx1Z2luc1xuICAgICAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7Ly9jb2xsZWN0IGFsbCB0aGUgYXJndW1lbnRzLCBpZiBuZWNlc3NhcnlcbiAgICAgICAgdmFyIHBsdWdDbGFzcyA9IHRoaXMuZGF0YSgnemZQbHVnaW4nKTsvL2RldGVybWluZSB0aGUgY2xhc3Mgb2YgcGx1Z2luXG5cbiAgICAgICAgaWYocGx1Z0NsYXNzICE9PSB1bmRlZmluZWQgJiYgcGx1Z0NsYXNzW21ldGhvZF0gIT09IHVuZGVmaW5lZCl7Ly9tYWtlIHN1cmUgYm90aCB0aGUgY2xhc3MgYW5kIG1ldGhvZCBleGlzdFxuICAgICAgICAgIGlmKHRoaXMubGVuZ3RoID09PSAxKXsvL2lmIHRoZXJlJ3Mgb25seSBvbmUsIGNhbGwgaXQgZGlyZWN0bHkuXG4gICAgICAgICAgICAgIHBsdWdDbGFzc1ttZXRob2RdLmFwcGx5KHBsdWdDbGFzcywgYXJncyk7XG4gICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB0aGlzLmVhY2goZnVuY3Rpb24oaSwgZWwpey8vb3RoZXJ3aXNlIGxvb3AgdGhyb3VnaCB0aGUgalF1ZXJ5IGNvbGxlY3Rpb24gYW5kIGludm9rZSB0aGUgbWV0aG9kIG9uIGVhY2hcbiAgICAgICAgICAgICAgcGx1Z0NsYXNzW21ldGhvZF0uYXBwbHkoJChlbCkuZGF0YSgnemZQbHVnaW4nKSwgYXJncyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1lbHNley8vZXJyb3IgZm9yIG5vIGNsYXNzIG9yIG5vIG1ldGhvZFxuICAgICAgICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcIldlJ3JlIHNvcnJ5LCAnXCIgKyBtZXRob2QgKyBcIicgaXMgbm90IGFuIGF2YWlsYWJsZSBtZXRob2QgZm9yIFwiICsgKHBsdWdDbGFzcyA/IGZ1bmN0aW9uTmFtZShwbHVnQ2xhc3MpIDogJ3RoaXMgZWxlbWVudCcpICsgJy4nKTtcbiAgICAgICAgfVxuICAgICAgfWVsc2V7Ly9lcnJvciBmb3IgaW52YWxpZCBhcmd1bWVudCB0eXBlXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYFdlJ3JlIHNvcnJ5LCAke3R5cGV9IGlzIG5vdCBhIHZhbGlkIHBhcmFtZXRlci4gWW91IG11c3QgdXNlIGEgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgbWV0aG9kIHlvdSB3aXNoIHRvIGludm9rZS5gKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgJC5mbi5mb3VuZGF0aW9uID0gZm91bmRhdGlvbjtcbiAgICByZXR1cm4gJDtcbiAgfVxufTtcblxuRm91bmRhdGlvbi51dGlsID0ge1xuICAvKipcbiAgICogRnVuY3Rpb24gZm9yIGFwcGx5aW5nIGEgZGVib3VuY2UgZWZmZWN0IHRvIGEgZnVuY3Rpb24gY2FsbC5cbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgLSBGdW5jdGlvbiB0byBiZSBjYWxsZWQgYXQgZW5kIG9mIHRpbWVvdXQuXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBkZWxheSAtIFRpbWUgaW4gbXMgdG8gZGVsYXkgdGhlIGNhbGwgb2YgYGZ1bmNgLlxuICAgKiBAcmV0dXJucyBmdW5jdGlvblxuICAgKi9cbiAgdGhyb3R0bGU6IGZ1bmN0aW9uIChmdW5jLCBkZWxheSkge1xuICAgIHZhciB0aW1lciA9IG51bGw7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIGNvbnRleHQgPSB0aGlzLCBhcmdzID0gYXJndW1lbnRzO1xuXG4gICAgICBpZiAodGltZXIgPT09IG51bGwpIHtcbiAgICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgICAgICAgIHRpbWVyID0gbnVsbDtcbiAgICAgICAgfSwgZGVsYXkpO1xuICAgICAgfVxuICAgIH07XG4gIH1cbn07XG5cbndpbmRvdy5Gb3VuZGF0aW9uID0gRm91bmRhdGlvbjtcblxuLy8gUG9seWZpbGwgZm9yIHJlcXVlc3RBbmltYXRpb25GcmFtZVxuKGZ1bmN0aW9uKCkge1xuICBpZiAoIURhdGUubm93IHx8ICF3aW5kb3cuRGF0ZS5ub3cpXG4gICAgd2luZG93LkRhdGUubm93ID0gRGF0ZS5ub3cgPSBmdW5jdGlvbigpIHsgcmV0dXJuIG5ldyBEYXRlKCkuZ2V0VGltZSgpOyB9O1xuXG4gIHZhciB2ZW5kb3JzID0gWyd3ZWJraXQnLCAnbW96J107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdmVuZG9ycy5sZW5ndGggJiYgIXdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWU7ICsraSkge1xuICAgICAgdmFyIHZwID0gdmVuZG9yc1tpXTtcbiAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSB3aW5kb3dbdnArJ1JlcXVlc3RBbmltYXRpb25GcmFtZSddO1xuICAgICAgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lID0gKHdpbmRvd1t2cCsnQ2FuY2VsQW5pbWF0aW9uRnJhbWUnXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfHwgd2luZG93W3ZwKydDYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWUnXSk7XG4gIH1cbiAgaWYgKC9pUChhZHxob25lfG9kKS4qT1MgNi8udGVzdCh3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudClcbiAgICB8fCAhd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCAhd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lKSB7XG4gICAgdmFyIGxhc3RUaW1lID0gMDtcbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIG5vdyA9IERhdGUubm93KCk7XG4gICAgICAgIHZhciBuZXh0VGltZSA9IE1hdGgubWF4KGxhc3RUaW1lICsgMTYsIG5vdyk7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkgeyBjYWxsYmFjayhsYXN0VGltZSA9IG5leHRUaW1lKTsgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dFRpbWUgLSBub3cpO1xuICAgIH07XG4gICAgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lID0gY2xlYXJUaW1lb3V0O1xuICB9XG4gIC8qKlxuICAgKiBQb2x5ZmlsbCBmb3IgcGVyZm9ybWFuY2Uubm93LCByZXF1aXJlZCBieSByQUZcbiAgICovXG4gIGlmKCF3aW5kb3cucGVyZm9ybWFuY2UgfHwgIXdpbmRvdy5wZXJmb3JtYW5jZS5ub3cpe1xuICAgIHdpbmRvdy5wZXJmb3JtYW5jZSA9IHtcbiAgICAgIHN0YXJ0OiBEYXRlLm5vdygpLFxuICAgICAgbm93OiBmdW5jdGlvbigpeyByZXR1cm4gRGF0ZS5ub3coKSAtIHRoaXMuc3RhcnQ7IH1cbiAgICB9O1xuICB9XG59KSgpO1xuaWYgKCFGdW5jdGlvbi5wcm90b3R5cGUuYmluZCkge1xuICBGdW5jdGlvbi5wcm90b3R5cGUuYmluZCA9IGZ1bmN0aW9uKG9UaGlzKSB7XG4gICAgaWYgKHR5cGVvZiB0aGlzICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAvLyBjbG9zZXN0IHRoaW5nIHBvc3NpYmxlIHRvIHRoZSBFQ01BU2NyaXB0IDVcbiAgICAgIC8vIGludGVybmFsIElzQ2FsbGFibGUgZnVuY3Rpb25cbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0Z1bmN0aW9uLnByb3RvdHlwZS5iaW5kIC0gd2hhdCBpcyB0cnlpbmcgdG8gYmUgYm91bmQgaXMgbm90IGNhbGxhYmxlJyk7XG4gICAgfVxuXG4gICAgdmFyIGFBcmdzICAgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpLFxuICAgICAgICBmVG9CaW5kID0gdGhpcyxcbiAgICAgICAgZk5PUCAgICA9IGZ1bmN0aW9uKCkge30sXG4gICAgICAgIGZCb3VuZCAgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gZlRvQmluZC5hcHBseSh0aGlzIGluc3RhbmNlb2YgZk5PUFxuICAgICAgICAgICAgICAgICA/IHRoaXNcbiAgICAgICAgICAgICAgICAgOiBvVGhpcyxcbiAgICAgICAgICAgICAgICAgYUFyZ3MuY29uY2F0KEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cykpKTtcbiAgICAgICAgfTtcblxuICAgIGlmICh0aGlzLnByb3RvdHlwZSkge1xuICAgICAgLy8gbmF0aXZlIGZ1bmN0aW9ucyBkb24ndCBoYXZlIGEgcHJvdG90eXBlXG4gICAgICBmTk9QLnByb3RvdHlwZSA9IHRoaXMucHJvdG90eXBlO1xuICAgIH1cbiAgICBmQm91bmQucHJvdG90eXBlID0gbmV3IGZOT1AoKTtcblxuICAgIHJldHVybiBmQm91bmQ7XG4gIH07XG59XG4vLyBQb2x5ZmlsbCB0byBnZXQgdGhlIG5hbWUgb2YgYSBmdW5jdGlvbiBpbiBJRTlcbmZ1bmN0aW9uIGZ1bmN0aW9uTmFtZShmbikge1xuICBpZiAoRnVuY3Rpb24ucHJvdG90eXBlLm5hbWUgPT09IHVuZGVmaW5lZCkge1xuICAgIHZhciBmdW5jTmFtZVJlZ2V4ID0gL2Z1bmN0aW9uXFxzKFteKF17MSx9KVxcKC87XG4gICAgdmFyIHJlc3VsdHMgPSAoZnVuY05hbWVSZWdleCkuZXhlYygoZm4pLnRvU3RyaW5nKCkpO1xuICAgIHJldHVybiAocmVzdWx0cyAmJiByZXN1bHRzLmxlbmd0aCA+IDEpID8gcmVzdWx0c1sxXS50cmltKCkgOiBcIlwiO1xuICB9XG4gIGVsc2UgaWYgKGZuLnByb3RvdHlwZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIGZuLmNvbnN0cnVjdG9yLm5hbWU7XG4gIH1cbiAgZWxzZSB7XG4gICAgcmV0dXJuIGZuLnByb3RvdHlwZS5jb25zdHJ1Y3Rvci5uYW1lO1xuICB9XG59XG5mdW5jdGlvbiBwYXJzZVZhbHVlKHN0cil7XG4gIGlmICgndHJ1ZScgPT09IHN0cikgcmV0dXJuIHRydWU7XG4gIGVsc2UgaWYgKCdmYWxzZScgPT09IHN0cikgcmV0dXJuIGZhbHNlO1xuICBlbHNlIGlmICghaXNOYU4oc3RyICogMSkpIHJldHVybiBwYXJzZUZsb2F0KHN0cik7XG4gIHJldHVybiBzdHI7XG59XG4vLyBDb252ZXJ0IFBhc2NhbENhc2UgdG8ga2ViYWItY2FzZVxuLy8gVGhhbmsgeW91OiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS84OTU1NTgwXG5mdW5jdGlvbiBoeXBoZW5hdGUoc3RyKSB7XG4gIHJldHVybiBzdHIucmVwbGFjZSgvKFthLXpdKShbQS1aXSkvZywgJyQxLSQyJykudG9Mb3dlckNhc2UoKTtcbn1cblxuZXhwb3J0IHtGb3VuZGF0aW9ufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24uY29yZS5qcyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcbmltcG9ydCB7IHRyYW5zaXRpb25lbmQgfSBmcm9tICcuL2ZvdW5kYXRpb24udXRpbC5jb3JlJztcblxuLyoqXG4gKiBNb3Rpb24gbW9kdWxlLlxuICogQG1vZHVsZSBmb3VuZGF0aW9uLm1vdGlvblxuICovXG5cbmNvbnN0IGluaXRDbGFzc2VzICAgPSBbJ211aS1lbnRlcicsICdtdWktbGVhdmUnXTtcbmNvbnN0IGFjdGl2ZUNsYXNzZXMgPSBbJ211aS1lbnRlci1hY3RpdmUnLCAnbXVpLWxlYXZlLWFjdGl2ZSddO1xuXG5jb25zdCBNb3Rpb24gPSB7XG4gIGFuaW1hdGVJbjogZnVuY3Rpb24oZWxlbWVudCwgYW5pbWF0aW9uLCBjYikge1xuICAgIGFuaW1hdGUodHJ1ZSwgZWxlbWVudCwgYW5pbWF0aW9uLCBjYik7XG4gIH0sXG5cbiAgYW5pbWF0ZU91dDogZnVuY3Rpb24oZWxlbWVudCwgYW5pbWF0aW9uLCBjYikge1xuICAgIGFuaW1hdGUoZmFsc2UsIGVsZW1lbnQsIGFuaW1hdGlvbiwgY2IpO1xuICB9XG59XG5cbmZ1bmN0aW9uIE1vdmUoZHVyYXRpb24sIGVsZW0sIGZuKXtcbiAgdmFyIGFuaW0sIHByb2csIHN0YXJ0ID0gbnVsbDtcbiAgLy8gY29uc29sZS5sb2coJ2NhbGxlZCcpO1xuXG4gIGlmIChkdXJhdGlvbiA9PT0gMCkge1xuICAgIGZuLmFwcGx5KGVsZW0pO1xuICAgIGVsZW0udHJpZ2dlcignZmluaXNoZWQuemYuYW5pbWF0ZScsIFtlbGVtXSkudHJpZ2dlckhhbmRsZXIoJ2ZpbmlzaGVkLnpmLmFuaW1hdGUnLCBbZWxlbV0pO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGZ1bmN0aW9uIG1vdmUodHMpe1xuICAgIGlmKCFzdGFydCkgc3RhcnQgPSB0cztcbiAgICAvLyBjb25zb2xlLmxvZyhzdGFydCwgdHMpO1xuICAgIHByb2cgPSB0cyAtIHN0YXJ0O1xuICAgIGZuLmFwcGx5KGVsZW0pO1xuXG4gICAgaWYocHJvZyA8IGR1cmF0aW9uKXsgYW5pbSA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUobW92ZSwgZWxlbSk7IH1cbiAgICBlbHNle1xuICAgICAgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lKGFuaW0pO1xuICAgICAgZWxlbS50cmlnZ2VyKCdmaW5pc2hlZC56Zi5hbmltYXRlJywgW2VsZW1dKS50cmlnZ2VySGFuZGxlcignZmluaXNoZWQuemYuYW5pbWF0ZScsIFtlbGVtXSk7XG4gICAgfVxuICB9XG4gIGFuaW0gPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKG1vdmUpO1xufVxuXG4vKipcbiAqIEFuaW1hdGVzIGFuIGVsZW1lbnQgaW4gb3Igb3V0IHVzaW5nIGEgQ1NTIHRyYW5zaXRpb24gY2xhc3MuXG4gKiBAZnVuY3Rpb25cbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGlzSW4gLSBEZWZpbmVzIGlmIHRoZSBhbmltYXRpb24gaXMgaW4gb3Igb3V0LlxuICogQHBhcmFtIHtPYmplY3R9IGVsZW1lbnQgLSBqUXVlcnkgb3IgSFRNTCBvYmplY3QgdG8gYW5pbWF0ZS5cbiAqIEBwYXJhbSB7U3RyaW5nfSBhbmltYXRpb24gLSBDU1MgY2xhc3MgdG8gdXNlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2IgLSBDYWxsYmFjayB0byBydW4gd2hlbiBhbmltYXRpb24gaXMgZmluaXNoZWQuXG4gKi9cbmZ1bmN0aW9uIGFuaW1hdGUoaXNJbiwgZWxlbWVudCwgYW5pbWF0aW9uLCBjYikge1xuICBlbGVtZW50ID0gJChlbGVtZW50KS5lcSgwKTtcblxuICBpZiAoIWVsZW1lbnQubGVuZ3RoKSByZXR1cm47XG5cbiAgdmFyIGluaXRDbGFzcyA9IGlzSW4gPyBpbml0Q2xhc3Nlc1swXSA6IGluaXRDbGFzc2VzWzFdO1xuICB2YXIgYWN0aXZlQ2xhc3MgPSBpc0luID8gYWN0aXZlQ2xhc3Nlc1swXSA6IGFjdGl2ZUNsYXNzZXNbMV07XG5cbiAgLy8gU2V0IHVwIHRoZSBhbmltYXRpb25cbiAgcmVzZXQoKTtcblxuICBlbGVtZW50XG4gICAgLmFkZENsYXNzKGFuaW1hdGlvbilcbiAgICAuY3NzKCd0cmFuc2l0aW9uJywgJ25vbmUnKTtcblxuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgIGVsZW1lbnQuYWRkQ2xhc3MoaW5pdENsYXNzKTtcbiAgICBpZiAoaXNJbikgZWxlbWVudC5zaG93KCk7XG4gIH0pO1xuXG4gIC8vIFN0YXJ0IHRoZSBhbmltYXRpb25cbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICBlbGVtZW50WzBdLm9mZnNldFdpZHRoO1xuICAgIGVsZW1lbnRcbiAgICAgIC5jc3MoJ3RyYW5zaXRpb24nLCAnJylcbiAgICAgIC5hZGRDbGFzcyhhY3RpdmVDbGFzcyk7XG4gIH0pO1xuXG4gIC8vIENsZWFuIHVwIHRoZSBhbmltYXRpb24gd2hlbiBpdCBmaW5pc2hlc1xuICBlbGVtZW50Lm9uZSh0cmFuc2l0aW9uZW5kKGVsZW1lbnQpLCBmaW5pc2gpO1xuXG4gIC8vIEhpZGVzIHRoZSBlbGVtZW50IChmb3Igb3V0IGFuaW1hdGlvbnMpLCByZXNldHMgdGhlIGVsZW1lbnQsIGFuZCBydW5zIGEgY2FsbGJhY2tcbiAgZnVuY3Rpb24gZmluaXNoKCkge1xuICAgIGlmICghaXNJbikgZWxlbWVudC5oaWRlKCk7XG4gICAgcmVzZXQoKTtcbiAgICBpZiAoY2IpIGNiLmFwcGx5KGVsZW1lbnQpO1xuICB9XG5cbiAgLy8gUmVzZXRzIHRyYW5zaXRpb25zIGFuZCByZW1vdmVzIG1vdGlvbi1zcGVjaWZpYyBjbGFzc2VzXG4gIGZ1bmN0aW9uIHJlc2V0KCkge1xuICAgIGVsZW1lbnRbMF0uc3R5bGUudHJhbnNpdGlvbkR1cmF0aW9uID0gMDtcbiAgICBlbGVtZW50LnJlbW92ZUNsYXNzKGAke2luaXRDbGFzc30gJHthY3RpdmVDbGFzc30gJHthbmltYXRpb259YCk7XG4gIH1cbn1cblxuZXhwb3J0IHtNb3ZlLCBNb3Rpb259O1xuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLnV0aWwubW90aW9uLmpzIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IHsgS2V5Ym9hcmQgfSBmcm9tICcuL2ZvdW5kYXRpb24udXRpbC5rZXlib2FyZCc7XG5pbXBvcnQgeyBNZWRpYVF1ZXJ5IH0gZnJvbSAnLi9mb3VuZGF0aW9uLnV0aWwubWVkaWFRdWVyeSc7XG5pbXBvcnQgeyB0cmFuc2l0aW9uZW5kIH0gZnJvbSAnLi9mb3VuZGF0aW9uLnV0aWwuY29yZSc7XG5pbXBvcnQgeyBQbHVnaW4gfSBmcm9tICcuL2ZvdW5kYXRpb24ucGx1Z2luJztcblxuaW1wb3J0IHsgVHJpZ2dlcnMgfSBmcm9tICcuL2ZvdW5kYXRpb24udXRpbC50cmlnZ2Vycyc7XG5cbi8qKlxuICogT2ZmQ2FudmFzIG1vZHVsZS5cbiAqIEBtb2R1bGUgZm91bmRhdGlvbi5vZmZjYW52YXNcbiAqIEByZXF1aXJlcyBmb3VuZGF0aW9uLnV0aWwua2V5Ym9hcmRcbiAqIEByZXF1aXJlcyBmb3VuZGF0aW9uLnV0aWwubWVkaWFRdWVyeVxuICogQHJlcXVpcmVzIGZvdW5kYXRpb24udXRpbC50cmlnZ2Vyc1xuICovXG5cbmNsYXNzIE9mZkNhbnZhcyBleHRlbmRzIFBsdWdpbiB7XG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IGluc3RhbmNlIG9mIGFuIG9mZi1jYW52YXMgd3JhcHBlci5cbiAgICogQGNsYXNzXG4gICAqIEBuYW1lIE9mZkNhbnZhc1xuICAgKiBAZmlyZXMgT2ZmQ2FudmFzI2luaXRcbiAgICogQHBhcmFtIHtPYmplY3R9IGVsZW1lbnQgLSBqUXVlcnkgb2JqZWN0IHRvIGluaXRpYWxpemUuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gT3ZlcnJpZGVzIHRvIHRoZSBkZWZhdWx0IHBsdWdpbiBzZXR0aW5ncy5cbiAgICovXG4gIF9zZXR1cChlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgdGhpcy5jbGFzc05hbWUgPSAnT2ZmQ2FudmFzJzsgLy8gaWU5IGJhY2sgY29tcGF0XG4gICAgdGhpcy4kZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgdGhpcy5vcHRpb25zID0gJC5leHRlbmQoe30sIE9mZkNhbnZhcy5kZWZhdWx0cywgdGhpcy4kZWxlbWVudC5kYXRhKCksIG9wdGlvbnMpO1xuICAgIHRoaXMuY29udGVudENsYXNzZXMgPSB7IGJhc2U6IFtdLCByZXZlYWw6IFtdIH07XG4gICAgdGhpcy4kbGFzdFRyaWdnZXIgPSAkKCk7XG4gICAgdGhpcy4kdHJpZ2dlcnMgPSAkKCk7XG4gICAgdGhpcy5wb3NpdGlvbiA9ICdsZWZ0JztcbiAgICB0aGlzLiRjb250ZW50ID0gJCgpO1xuICAgIHRoaXMubmVzdGVkID0gISEodGhpcy5vcHRpb25zLm5lc3RlZCk7XG5cbiAgICAvLyBEZWZpbmVzIHRoZSBDU1MgdHJhbnNpdGlvbi9wb3NpdGlvbiBjbGFzc2VzIG9mIHRoZSBvZmYtY2FudmFzIGNvbnRlbnQgY29udGFpbmVyLlxuICAgICQoWydwdXNoJywgJ292ZXJsYXAnXSkuZWFjaCgoaW5kZXgsIHZhbCkgPT4ge1xuICAgICAgdGhpcy5jb250ZW50Q2xhc3Nlcy5iYXNlLnB1c2goJ2hhcy10cmFuc2l0aW9uLScrdmFsKTtcbiAgICB9KTtcbiAgICAkKFsnbGVmdCcsICdyaWdodCcsICd0b3AnLCAnYm90dG9tJ10pLmVhY2goKGluZGV4LCB2YWwpID0+IHtcbiAgICAgIHRoaXMuY29udGVudENsYXNzZXMuYmFzZS5wdXNoKCdoYXMtcG9zaXRpb24tJyt2YWwpO1xuICAgICAgdGhpcy5jb250ZW50Q2xhc3Nlcy5yZXZlYWwucHVzaCgnaGFzLXJldmVhbC0nK3ZhbCk7XG4gICAgfSk7XG5cbiAgICAvLyBUcmlnZ2VycyBpbml0IGlzIGlkZW1wb3RlbnQsIGp1c3QgbmVlZCB0byBtYWtlIHN1cmUgaXQgaXMgaW5pdGlhbGl6ZWRcbiAgICBUcmlnZ2Vycy5pbml0KCQpO1xuICAgIE1lZGlhUXVlcnkuX2luaXQoKTtcblxuICAgIHRoaXMuX2luaXQoKTtcbiAgICB0aGlzLl9ldmVudHMoKTtcblxuICAgIEtleWJvYXJkLnJlZ2lzdGVyKCdPZmZDYW52YXMnLCB7XG4gICAgICAnRVNDQVBFJzogJ2Nsb3NlJ1xuICAgIH0pO1xuXG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZXMgdGhlIG9mZi1jYW52YXMgd3JhcHBlciBieSBhZGRpbmcgdGhlIGV4aXQgb3ZlcmxheSAoaWYgbmVlZGVkKS5cbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfaW5pdCgpIHtcbiAgICB2YXIgaWQgPSB0aGlzLiRlbGVtZW50LmF0dHIoJ2lkJyk7XG5cbiAgICB0aGlzLiRlbGVtZW50LmF0dHIoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcblxuICAgIC8vIEZpbmQgb2ZmLWNhbnZhcyBjb250ZW50LCBlaXRoZXIgYnkgSUQgKGlmIHNwZWNpZmllZCksIGJ5IHNpYmxpbmdzIG9yIGJ5IGNsb3Nlc3Qgc2VsZWN0b3IgKGZhbGxiYWNrKVxuICAgIGlmICh0aGlzLm9wdGlvbnMuY29udGVudElkKSB7XG4gICAgICB0aGlzLiRjb250ZW50ID0gJCgnIycrdGhpcy5vcHRpb25zLmNvbnRlbnRJZCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLiRlbGVtZW50LnNpYmxpbmdzKCdbZGF0YS1vZmYtY2FudmFzLWNvbnRlbnRdJykubGVuZ3RoKSB7XG4gICAgICB0aGlzLiRjb250ZW50ID0gdGhpcy4kZWxlbWVudC5zaWJsaW5ncygnW2RhdGEtb2ZmLWNhbnZhcy1jb250ZW50XScpLmZpcnN0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuJGNvbnRlbnQgPSB0aGlzLiRlbGVtZW50LmNsb3Nlc3QoJ1tkYXRhLW9mZi1jYW52YXMtY29udGVudF0nKS5maXJzdCgpO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5vcHRpb25zLmNvbnRlbnRJZCkge1xuICAgICAgLy8gQXNzdW1lIHRoYXQgdGhlIG9mZi1jYW52YXMgZWxlbWVudCBpcyBuZXN0ZWQgaWYgaXQgaXNuJ3QgYSBzaWJsaW5nIG9mIHRoZSBjb250ZW50XG4gICAgICB0aGlzLm5lc3RlZCA9IHRoaXMuJGVsZW1lbnQuc2libGluZ3MoJ1tkYXRhLW9mZi1jYW52YXMtY29udGVudF0nKS5sZW5ndGggPT09IDA7XG5cbiAgICB9IGVsc2UgaWYgKHRoaXMub3B0aW9ucy5jb250ZW50SWQgJiYgdGhpcy5vcHRpb25zLm5lc3RlZCA9PT0gbnVsbCkge1xuICAgICAgLy8gV2FybmluZyBpZiB1c2luZyBjb250ZW50IElEIHdpdGhvdXQgc2V0dGluZyB0aGUgbmVzdGVkIG9wdGlvblxuICAgICAgLy8gT25jZSB0aGUgZWxlbWVudCBpcyBuZXN0ZWQgaXQgaXMgcmVxdWlyZWQgdG8gd29yayBwcm9wZXJseSBpbiB0aGlzIGNhc2VcbiAgICAgIGNvbnNvbGUud2FybignUmVtZW1iZXIgdG8gdXNlIHRoZSBuZXN0ZWQgb3B0aW9uIGlmIHVzaW5nIHRoZSBjb250ZW50IElEIG9wdGlvbiEnKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5uZXN0ZWQgPT09IHRydWUpIHtcbiAgICAgIC8vIEZvcmNlIHRyYW5zaXRpb24gb3ZlcmxhcCBpZiBuZXN0ZWRcbiAgICAgIHRoaXMub3B0aW9ucy50cmFuc2l0aW9uID0gJ292ZXJsYXAnO1xuICAgICAgLy8gUmVtb3ZlIGFwcHJvcHJpYXRlIGNsYXNzZXMgaWYgYWxyZWFkeSBhc3NpZ25lZCBpbiBtYXJrdXBcbiAgICAgIHRoaXMuJGVsZW1lbnQucmVtb3ZlQ2xhc3MoJ2lzLXRyYW5zaXRpb24tcHVzaCcpO1xuICAgIH1cblxuICAgIHRoaXMuJGVsZW1lbnQuYWRkQ2xhc3MoYGlzLXRyYW5zaXRpb24tJHt0aGlzLm9wdGlvbnMudHJhbnNpdGlvbn0gaXMtY2xvc2VkYCk7XG5cbiAgICAvLyBGaW5kIHRyaWdnZXJzIHRoYXQgYWZmZWN0IHRoaXMgZWxlbWVudCBhbmQgYWRkIGFyaWEtZXhwYW5kZWQgdG8gdGhlbVxuICAgIHRoaXMuJHRyaWdnZXJzID0gJChkb2N1bWVudClcbiAgICAgIC5maW5kKCdbZGF0YS1vcGVuPVwiJytpZCsnXCJdLCBbZGF0YS1jbG9zZT1cIicraWQrJ1wiXSwgW2RhdGEtdG9nZ2xlPVwiJytpZCsnXCJdJylcbiAgICAgIC5hdHRyKCdhcmlhLWV4cGFuZGVkJywgJ2ZhbHNlJylcbiAgICAgIC5hdHRyKCdhcmlhLWNvbnRyb2xzJywgaWQpO1xuXG4gICAgLy8gR2V0IHBvc2l0aW9uIGJ5IGNoZWNraW5nIGZvciByZWxhdGVkIENTUyBjbGFzc1xuICAgIHRoaXMucG9zaXRpb24gPSB0aGlzLiRlbGVtZW50LmlzKCcucG9zaXRpb24tbGVmdCwgLnBvc2l0aW9uLXRvcCwgLnBvc2l0aW9uLXJpZ2h0LCAucG9zaXRpb24tYm90dG9tJykgPyB0aGlzLiRlbGVtZW50LmF0dHIoJ2NsYXNzJykubWF0Y2goL3Bvc2l0aW9uXFwtKGxlZnR8dG9wfHJpZ2h0fGJvdHRvbSkvKVsxXSA6IHRoaXMucG9zaXRpb247XG5cbiAgICAvLyBBZGQgYW4gb3ZlcmxheSBvdmVyIHRoZSBjb250ZW50IGlmIG5lY2Vzc2FyeVxuICAgIGlmICh0aGlzLm9wdGlvbnMuY29udGVudE92ZXJsYXkgPT09IHRydWUpIHtcbiAgICAgIHZhciBvdmVybGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICB2YXIgb3ZlcmxheVBvc2l0aW9uID0gJCh0aGlzLiRlbGVtZW50KS5jc3MoXCJwb3NpdGlvblwiKSA9PT0gJ2ZpeGVkJyA/ICdpcy1vdmVybGF5LWZpeGVkJyA6ICdpcy1vdmVybGF5LWFic29sdXRlJztcbiAgICAgIG92ZXJsYXkuc2V0QXR0cmlidXRlKCdjbGFzcycsICdqcy1vZmYtY2FudmFzLW92ZXJsYXkgJyArIG92ZXJsYXlQb3NpdGlvbik7XG4gICAgICB0aGlzLiRvdmVybGF5ID0gJChvdmVybGF5KTtcbiAgICAgIGlmKG92ZXJsYXlQb3NpdGlvbiA9PT0gJ2lzLW92ZXJsYXktZml4ZWQnKSB7XG4gICAgICAgICQodGhpcy4kb3ZlcmxheSkuaW5zZXJ0QWZ0ZXIodGhpcy4kZWxlbWVudCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLiRjb250ZW50LmFwcGVuZCh0aGlzLiRvdmVybGF5KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLm9wdGlvbnMuaXNSZXZlYWxlZCA9IHRoaXMub3B0aW9ucy5pc1JldmVhbGVkIHx8IG5ldyBSZWdFeHAodGhpcy5vcHRpb25zLnJldmVhbENsYXNzLCAnZycpLnRlc3QodGhpcy4kZWxlbWVudFswXS5jbGFzc05hbWUpO1xuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5pc1JldmVhbGVkID09PSB0cnVlKSB7XG4gICAgICB0aGlzLm9wdGlvbnMucmV2ZWFsT24gPSB0aGlzLm9wdGlvbnMucmV2ZWFsT24gfHwgdGhpcy4kZWxlbWVudFswXS5jbGFzc05hbWUubWF0Y2goLyhyZXZlYWwtZm9yLW1lZGl1bXxyZXZlYWwtZm9yLWxhcmdlKS9nKVswXS5zcGxpdCgnLScpWzJdO1xuICAgICAgdGhpcy5fc2V0TVFDaGVja2VyKCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy50cmFuc2l0aW9uVGltZSkge1xuICAgICAgdGhpcy4kZWxlbWVudC5jc3MoJ3RyYW5zaXRpb24tZHVyYXRpb24nLCB0aGlzLm9wdGlvbnMudHJhbnNpdGlvblRpbWUpO1xuICAgIH1cblxuICAgIC8vIEluaXRhbGx5IHJlbW92ZSBhbGwgdHJhbnNpdGlvbi9wb3NpdGlvbiBDU1MgY2xhc3NlcyBmcm9tIG9mZi1jYW52YXMgY29udGVudCBjb250YWluZXIuXG4gICAgdGhpcy5fcmVtb3ZlQ29udGVudENsYXNzZXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGV2ZW50IGhhbmRsZXJzIHRvIHRoZSBvZmYtY2FudmFzIHdyYXBwZXIgYW5kIHRoZSBleGl0IG92ZXJsYXkuXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2V2ZW50cygpIHtcbiAgICB0aGlzLiRlbGVtZW50Lm9mZignLnpmLnRyaWdnZXIgLnpmLm9mZmNhbnZhcycpLm9uKHtcbiAgICAgICdvcGVuLnpmLnRyaWdnZXInOiB0aGlzLm9wZW4uYmluZCh0aGlzKSxcbiAgICAgICdjbG9zZS56Zi50cmlnZ2VyJzogdGhpcy5jbG9zZS5iaW5kKHRoaXMpLFxuICAgICAgJ3RvZ2dsZS56Zi50cmlnZ2VyJzogdGhpcy50b2dnbGUuYmluZCh0aGlzKSxcbiAgICAgICdrZXlkb3duLnpmLm9mZmNhbnZhcyc6IHRoaXMuX2hhbmRsZUtleWJvYXJkLmJpbmQodGhpcylcbiAgICB9KTtcblxuICAgIGlmICh0aGlzLm9wdGlvbnMuY2xvc2VPbkNsaWNrID09PSB0cnVlKSB7XG4gICAgICB2YXIgJHRhcmdldCA9IHRoaXMub3B0aW9ucy5jb250ZW50T3ZlcmxheSA/IHRoaXMuJG92ZXJsYXkgOiB0aGlzLiRjb250ZW50O1xuICAgICAgJHRhcmdldC5vbih7J2NsaWNrLnpmLm9mZmNhbnZhcyc6IHRoaXMuY2xvc2UuYmluZCh0aGlzKX0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBsaWVzIGV2ZW50IGxpc3RlbmVyIGZvciBlbGVtZW50cyB0aGF0IHdpbGwgcmV2ZWFsIGF0IGNlcnRhaW4gYnJlYWtwb2ludHMuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfc2V0TVFDaGVja2VyKCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAkKHdpbmRvdykub24oJ2NoYW5nZWQuemYubWVkaWFxdWVyeScsIGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKE1lZGlhUXVlcnkuYXRMZWFzdChfdGhpcy5vcHRpb25zLnJldmVhbE9uKSkge1xuICAgICAgICBfdGhpcy5yZXZlYWwodHJ1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBfdGhpcy5yZXZlYWwoZmFsc2UpO1xuICAgICAgfVxuICAgIH0pLm9uZSgnbG9hZC56Zi5vZmZjYW52YXMnLCBmdW5jdGlvbigpIHtcbiAgICAgIGlmIChNZWRpYVF1ZXJ5LmF0TGVhc3QoX3RoaXMub3B0aW9ucy5yZXZlYWxPbikpIHtcbiAgICAgICAgX3RoaXMucmV2ZWFsKHRydWUpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgdGhlIENTUyB0cmFuc2l0aW9uL3Bvc2l0aW9uIGNsYXNzZXMgb2YgdGhlIG9mZi1jYW52YXMgY29udGVudCBjb250YWluZXIuXG4gICAqIFJlbW92aW5nIHRoZSBjbGFzc2VzIGlzIGltcG9ydGFudCB3aGVuIGFub3RoZXIgb2ZmLWNhbnZhcyBnZXRzIG9wZW5lZCB0aGF0IHVzZXMgdGhlIHNhbWUgY29udGVudCBjb250YWluZXIuXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gaGFzUmV2ZWFsIC0gdHJ1ZSBpZiByZWxhdGVkIG9mZi1jYW52YXMgZWxlbWVudCBpcyByZXZlYWxlZC5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9yZW1vdmVDb250ZW50Q2xhc3NlcyhoYXNSZXZlYWwpIHtcbiAgICBpZiAodHlwZW9mIGhhc1JldmVhbCAhPT0gJ2Jvb2xlYW4nKSB7XG4gICAgICB0aGlzLiRjb250ZW50LnJlbW92ZUNsYXNzKHRoaXMuY29udGVudENsYXNzZXMuYmFzZS5qb2luKCcgJykpO1xuICAgIH0gZWxzZSBpZiAoaGFzUmV2ZWFsID09PSBmYWxzZSkge1xuICAgICAgdGhpcy4kY29udGVudC5yZW1vdmVDbGFzcyhgaGFzLXJldmVhbC0ke3RoaXMucG9zaXRpb259YCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgdGhlIENTUyB0cmFuc2l0aW9uL3Bvc2l0aW9uIGNsYXNzZXMgb2YgdGhlIG9mZi1jYW52YXMgY29udGVudCBjb250YWluZXIsIGJhc2VkIG9uIHRoZSBvcGVuaW5nIG9mZi1jYW52YXMgZWxlbWVudC5cbiAgICogQmVmb3JlaGFuZCBhbnkgdHJhbnNpdGlvbi9wb3NpdGlvbiBjbGFzcyBnZXRzIHJlbW92ZWQuXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gaGFzUmV2ZWFsIC0gdHJ1ZSBpZiByZWxhdGVkIG9mZi1jYW52YXMgZWxlbWVudCBpcyByZXZlYWxlZC5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9hZGRDb250ZW50Q2xhc3NlcyhoYXNSZXZlYWwpIHtcbiAgICB0aGlzLl9yZW1vdmVDb250ZW50Q2xhc3NlcyhoYXNSZXZlYWwpO1xuICAgIGlmICh0eXBlb2YgaGFzUmV2ZWFsICE9PSAnYm9vbGVhbicpIHtcbiAgICAgIHRoaXMuJGNvbnRlbnQuYWRkQ2xhc3MoYGhhcy10cmFuc2l0aW9uLSR7dGhpcy5vcHRpb25zLnRyYW5zaXRpb259IGhhcy1wb3NpdGlvbi0ke3RoaXMucG9zaXRpb259YCk7XG4gICAgfSBlbHNlIGlmIChoYXNSZXZlYWwgPT09IHRydWUpIHtcbiAgICAgIHRoaXMuJGNvbnRlbnQuYWRkQ2xhc3MoYGhhcy1yZXZlYWwtJHt0aGlzLnBvc2l0aW9ufWApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIHRoZSByZXZlYWxpbmcvaGlkaW5nIHRoZSBvZmYtY2FudmFzIGF0IGJyZWFrcG9pbnRzLCBub3QgdGhlIHNhbWUgYXMgb3Blbi5cbiAgICogQHBhcmFtIHtCb29sZWFufSBpc1JldmVhbGVkIC0gdHJ1ZSBpZiBlbGVtZW50IHNob3VsZCBiZSByZXZlYWxlZC5cbiAgICogQGZ1bmN0aW9uXG4gICAqL1xuICByZXZlYWwoaXNSZXZlYWxlZCkge1xuICAgIGlmIChpc1JldmVhbGVkKSB7XG4gICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICB0aGlzLmlzUmV2ZWFsZWQgPSB0cnVlO1xuICAgICAgdGhpcy4kZWxlbWVudC5hdHRyKCdhcmlhLWhpZGRlbicsICdmYWxzZScpO1xuICAgICAgdGhpcy4kZWxlbWVudC5vZmYoJ29wZW4uemYudHJpZ2dlciB0b2dnbGUuemYudHJpZ2dlcicpO1xuICAgICAgdGhpcy4kZWxlbWVudC5yZW1vdmVDbGFzcygnaXMtY2xvc2VkJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaXNSZXZlYWxlZCA9IGZhbHNlO1xuICAgICAgdGhpcy4kZWxlbWVudC5hdHRyKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG4gICAgICB0aGlzLiRlbGVtZW50Lm9mZignb3Blbi56Zi50cmlnZ2VyIHRvZ2dsZS56Zi50cmlnZ2VyJykub24oe1xuICAgICAgICAnb3Blbi56Zi50cmlnZ2VyJzogdGhpcy5vcGVuLmJpbmQodGhpcyksXG4gICAgICAgICd0b2dnbGUuemYudHJpZ2dlcic6IHRoaXMudG9nZ2xlLmJpbmQodGhpcylcbiAgICAgIH0pO1xuICAgICAgdGhpcy4kZWxlbWVudC5hZGRDbGFzcygnaXMtY2xvc2VkJyk7XG4gICAgfVxuICAgIHRoaXMuX2FkZENvbnRlbnRDbGFzc2VzKGlzUmV2ZWFsZWQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFN0b3BzIHNjcm9sbGluZyBvZiB0aGUgYm9keSB3aGVuIG9mZmNhbnZhcyBpcyBvcGVuIG9uIG1vYmlsZSBTYWZhcmkgYW5kIG90aGVyIHRyb3VibGVzb21lIGJyb3dzZXJzLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX3N0b3BTY3JvbGxpbmcoZXZlbnQpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvLyBUYWtlbiBhbmQgYWRhcHRlZCBmcm9tIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTY4ODk0NDcvcHJldmVudC1mdWxsLXBhZ2Utc2Nyb2xsaW5nLWlvc1xuICAvLyBPbmx5IHJlYWxseSB3b3JrcyBmb3IgeSwgbm90IHN1cmUgaG93IHRvIGV4dGVuZCB0byB4IG9yIGlmIHdlIG5lZWQgdG8uXG4gIF9yZWNvcmRTY3JvbGxhYmxlKGV2ZW50KSB7XG4gICAgbGV0IGVsZW0gPSB0aGlzOyAvLyBjYWxsZWQgZnJvbSBldmVudCBoYW5kbGVyIGNvbnRleHQgd2l0aCB0aGlzIGFzIGVsZW1cblxuICAgICAvLyBJZiB0aGUgZWxlbWVudCBpcyBzY3JvbGxhYmxlIChjb250ZW50IG92ZXJmbG93cyksIHRoZW4uLi5cbiAgICBpZiAoZWxlbS5zY3JvbGxIZWlnaHQgIT09IGVsZW0uY2xpZW50SGVpZ2h0KSB7XG4gICAgICAvLyBJZiB3ZSdyZSBhdCB0aGUgdG9wLCBzY3JvbGwgZG93biBvbmUgcGl4ZWwgdG8gYWxsb3cgc2Nyb2xsaW5nIHVwXG4gICAgICBpZiAoZWxlbS5zY3JvbGxUb3AgPT09IDApIHtcbiAgICAgICAgZWxlbS5zY3JvbGxUb3AgPSAxO1xuICAgICAgfVxuICAgICAgLy8gSWYgd2UncmUgYXQgdGhlIGJvdHRvbSwgc2Nyb2xsIHVwIG9uZSBwaXhlbCB0byBhbGxvdyBzY3JvbGxpbmcgZG93blxuICAgICAgaWYgKGVsZW0uc2Nyb2xsVG9wID09PSBlbGVtLnNjcm9sbEhlaWdodCAtIGVsZW0uY2xpZW50SGVpZ2h0KSB7XG4gICAgICAgIGVsZW0uc2Nyb2xsVG9wID0gZWxlbS5zY3JvbGxIZWlnaHQgLSBlbGVtLmNsaWVudEhlaWdodCAtIDE7XG4gICAgICB9XG4gICAgfVxuICAgIGVsZW0uYWxsb3dVcCA9IGVsZW0uc2Nyb2xsVG9wID4gMDtcbiAgICBlbGVtLmFsbG93RG93biA9IGVsZW0uc2Nyb2xsVG9wIDwgKGVsZW0uc2Nyb2xsSGVpZ2h0IC0gZWxlbS5jbGllbnRIZWlnaHQpO1xuICAgIGVsZW0ubGFzdFkgPSBldmVudC5vcmlnaW5hbEV2ZW50LnBhZ2VZO1xuICB9XG5cbiAgX3N0b3BTY3JvbGxQcm9wYWdhdGlvbihldmVudCkge1xuICAgIGxldCBlbGVtID0gdGhpczsgLy8gY2FsbGVkIGZyb20gZXZlbnQgaGFuZGxlciBjb250ZXh0IHdpdGggdGhpcyBhcyBlbGVtXG4gICAgbGV0IHVwID0gZXZlbnQucGFnZVkgPCBlbGVtLmxhc3RZO1xuICAgIGxldCBkb3duID0gIXVwO1xuICAgIGVsZW0ubGFzdFkgPSBldmVudC5wYWdlWTtcblxuICAgIGlmKCh1cCAmJiBlbGVtLmFsbG93VXApIHx8IChkb3duICYmIGVsZW0uYWxsb3dEb3duKSkge1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE9wZW5zIHRoZSBvZmYtY2FudmFzIG1lbnUuXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnQgLSBFdmVudCBvYmplY3QgcGFzc2VkIGZyb20gbGlzdGVuZXIuXG4gICAqIEBwYXJhbSB7alF1ZXJ5fSB0cmlnZ2VyIC0gZWxlbWVudCB0aGF0IHRyaWdnZXJlZCB0aGUgb2ZmLWNhbnZhcyB0byBvcGVuLlxuICAgKiBAZmlyZXMgT2ZmQ2FudmFzI29wZW5lZFxuICAgKi9cbiAgb3BlbihldmVudCwgdHJpZ2dlcikge1xuICAgIGlmICh0aGlzLiRlbGVtZW50Lmhhc0NsYXNzKCdpcy1vcGVuJykgfHwgdGhpcy5pc1JldmVhbGVkKSB7IHJldHVybjsgfVxuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICBpZiAodHJpZ2dlcikge1xuICAgICAgdGhpcy4kbGFzdFRyaWdnZXIgPSB0cmlnZ2VyO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMuZm9yY2VUbyA9PT0gJ3RvcCcpIHtcbiAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCAwKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMub3B0aW9ucy5mb3JjZVRvID09PSAnYm90dG9tJykge1xuICAgICAgd2luZG93LnNjcm9sbFRvKDAsZG9jdW1lbnQuYm9keS5zY3JvbGxIZWlnaHQpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMudHJhbnNpdGlvblRpbWUgJiYgdGhpcy5vcHRpb25zLnRyYW5zaXRpb24gIT09ICdvdmVybGFwJykge1xuICAgICAgdGhpcy4kZWxlbWVudC5zaWJsaW5ncygnW2RhdGEtb2ZmLWNhbnZhcy1jb250ZW50XScpLmNzcygndHJhbnNpdGlvbi1kdXJhdGlvbicsIHRoaXMub3B0aW9ucy50cmFuc2l0aW9uVGltZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuJGVsZW1lbnQuc2libGluZ3MoJ1tkYXRhLW9mZi1jYW52YXMtY29udGVudF0nKS5jc3MoJ3RyYW5zaXRpb24tZHVyYXRpb24nLCAnJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRmlyZXMgd2hlbiB0aGUgb2ZmLWNhbnZhcyBtZW51IG9wZW5zLlxuICAgICAqIEBldmVudCBPZmZDYW52YXMjb3BlbmVkXG4gICAgICovXG4gICAgdGhpcy4kZWxlbWVudC5hZGRDbGFzcygnaXMtb3BlbicpLnJlbW92ZUNsYXNzKCdpcy1jbG9zZWQnKTtcblxuICAgIHRoaXMuJHRyaWdnZXJzLmF0dHIoJ2FyaWEtZXhwYW5kZWQnLCAndHJ1ZScpO1xuICAgIHRoaXMuJGVsZW1lbnQuYXR0cignYXJpYS1oaWRkZW4nLCAnZmFsc2UnKVxuICAgICAgICAudHJpZ2dlcignb3BlbmVkLnpmLm9mZmNhbnZhcycpO1xuXG4gICAgdGhpcy4kY29udGVudC5hZGRDbGFzcygnaXMtb3Blbi0nICsgdGhpcy5wb3NpdGlvbik7XG5cbiAgICAvLyBJZiBgY29udGVudFNjcm9sbGAgaXMgc2V0IHRvIGZhbHNlLCBhZGQgY2xhc3MgYW5kIGRpc2FibGUgc2Nyb2xsaW5nIG9uIHRvdWNoIGRldmljZXMuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5jb250ZW50U2Nyb2xsID09PSBmYWxzZSkge1xuICAgICAgJCgnYm9keScpLmFkZENsYXNzKCdpcy1vZmYtY2FudmFzLW9wZW4nKS5vbigndG91Y2htb3ZlJywgdGhpcy5fc3RvcFNjcm9sbGluZyk7XG4gICAgICB0aGlzLiRlbGVtZW50Lm9uKCd0b3VjaHN0YXJ0JywgdGhpcy5fcmVjb3JkU2Nyb2xsYWJsZSk7XG4gICAgICB0aGlzLiRlbGVtZW50Lm9uKCd0b3VjaG1vdmUnLCB0aGlzLl9zdG9wU2Nyb2xsUHJvcGFnYXRpb24pO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMuY29udGVudE92ZXJsYXkgPT09IHRydWUpIHtcbiAgICAgIHRoaXMuJG92ZXJsYXkuYWRkQ2xhc3MoJ2lzLXZpc2libGUnKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmNsb3NlT25DbGljayA9PT0gdHJ1ZSAmJiB0aGlzLm9wdGlvbnMuY29udGVudE92ZXJsYXkgPT09IHRydWUpIHtcbiAgICAgIHRoaXMuJG92ZXJsYXkuYWRkQ2xhc3MoJ2lzLWNsb3NhYmxlJyk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5hdXRvRm9jdXMgPT09IHRydWUpIHtcbiAgICAgIHRoaXMuJGVsZW1lbnQub25lKHRyYW5zaXRpb25lbmQodGhpcy4kZWxlbWVudCksIGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoIV90aGlzLiRlbGVtZW50Lmhhc0NsYXNzKCdpcy1vcGVuJykpIHtcbiAgICAgICAgICByZXR1cm47IC8vIGV4aXQgaWYgcHJlbWF0dXJlbHkgY2xvc2VkXG4gICAgICAgIH1cbiAgICAgICAgdmFyIGNhbnZhc0ZvY3VzID0gX3RoaXMuJGVsZW1lbnQuZmluZCgnW2RhdGEtYXV0b2ZvY3VzXScpO1xuICAgICAgICBpZiAoY2FudmFzRm9jdXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjYW52YXNGb2N1cy5lcSgwKS5mb2N1cygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgX3RoaXMuJGVsZW1lbnQuZmluZCgnYSwgYnV0dG9uJykuZXEoMCkuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy50cmFwRm9jdXMgPT09IHRydWUpIHtcbiAgICAgIHRoaXMuJGNvbnRlbnQuYXR0cigndGFiaW5kZXgnLCAnLTEnKTtcbiAgICAgIEtleWJvYXJkLnRyYXBGb2N1cyh0aGlzLiRlbGVtZW50KTtcbiAgICB9XG5cbiAgICB0aGlzLl9hZGRDb250ZW50Q2xhc3NlcygpO1xuICB9XG5cbiAgLyoqXG4gICAqIENsb3NlcyB0aGUgb2ZmLWNhbnZhcyBtZW51LlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2IgLSBvcHRpb25hbCBjYiB0byBmaXJlIGFmdGVyIGNsb3N1cmUuXG4gICAqIEBmaXJlcyBPZmZDYW52YXMjY2xvc2VkXG4gICAqL1xuICBjbG9zZShjYikge1xuICAgIGlmICghdGhpcy4kZWxlbWVudC5oYXNDbGFzcygnaXMtb3BlbicpIHx8IHRoaXMuaXNSZXZlYWxlZCkgeyByZXR1cm47IH1cblxuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICB0aGlzLiRlbGVtZW50LnJlbW92ZUNsYXNzKCdpcy1vcGVuJyk7XG5cbiAgICB0aGlzLiRlbGVtZW50LmF0dHIoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKVxuICAgICAgLyoqXG4gICAgICAgKiBGaXJlcyB3aGVuIHRoZSBvZmYtY2FudmFzIG1lbnUgb3BlbnMuXG4gICAgICAgKiBAZXZlbnQgT2ZmQ2FudmFzI2Nsb3NlZFxuICAgICAgICovXG4gICAgICAgIC50cmlnZ2VyKCdjbG9zZWQuemYub2ZmY2FudmFzJyk7XG5cbiAgICB0aGlzLiRjb250ZW50LnJlbW92ZUNsYXNzKCdpcy1vcGVuLWxlZnQgaXMtb3Blbi10b3AgaXMtb3Blbi1yaWdodCBpcy1vcGVuLWJvdHRvbScpO1xuXG4gICAgLy8gSWYgYGNvbnRlbnRTY3JvbGxgIGlzIHNldCB0byBmYWxzZSwgcmVtb3ZlIGNsYXNzIGFuZCByZS1lbmFibGUgc2Nyb2xsaW5nIG9uIHRvdWNoIGRldmljZXMuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5jb250ZW50U2Nyb2xsID09PSBmYWxzZSkge1xuICAgICAgJCgnYm9keScpLnJlbW92ZUNsYXNzKCdpcy1vZmYtY2FudmFzLW9wZW4nKS5vZmYoJ3RvdWNobW92ZScsIHRoaXMuX3N0b3BTY3JvbGxpbmcpO1xuICAgICAgdGhpcy4kZWxlbWVudC5vZmYoJ3RvdWNoc3RhcnQnLCB0aGlzLl9yZWNvcmRTY3JvbGxhYmxlKTtcbiAgICAgIHRoaXMuJGVsZW1lbnQub2ZmKCd0b3VjaG1vdmUnLCB0aGlzLl9zdG9wU2Nyb2xsUHJvcGFnYXRpb24pO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMuY29udGVudE92ZXJsYXkgPT09IHRydWUpIHtcbiAgICAgIHRoaXMuJG92ZXJsYXkucmVtb3ZlQ2xhc3MoJ2lzLXZpc2libGUnKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmNsb3NlT25DbGljayA9PT0gdHJ1ZSAmJiB0aGlzLm9wdGlvbnMuY29udGVudE92ZXJsYXkgPT09IHRydWUpIHtcbiAgICAgIHRoaXMuJG92ZXJsYXkucmVtb3ZlQ2xhc3MoJ2lzLWNsb3NhYmxlJyk7XG4gICAgfVxuXG4gICAgdGhpcy4kdHJpZ2dlcnMuYXR0cignYXJpYS1leHBhbmRlZCcsICdmYWxzZScpO1xuXG4gICAgaWYgKHRoaXMub3B0aW9ucy50cmFwRm9jdXMgPT09IHRydWUpIHtcbiAgICAgIHRoaXMuJGNvbnRlbnQucmVtb3ZlQXR0cigndGFiaW5kZXgnKTtcbiAgICAgIEtleWJvYXJkLnJlbGVhc2VGb2N1cyh0aGlzLiRlbGVtZW50KTtcbiAgICB9XG5cbiAgICAvLyBMaXN0ZW4gdG8gdHJhbnNpdGlvbkVuZCBhbmQgYWRkIGNsYXNzIHdoZW4gZG9uZS5cbiAgICB0aGlzLiRlbGVtZW50Lm9uZSh0cmFuc2l0aW9uZW5kKHRoaXMuJGVsZW1lbnQpLCBmdW5jdGlvbihlKSB7XG4gICAgICBfdGhpcy4kZWxlbWVudC5hZGRDbGFzcygnaXMtY2xvc2VkJyk7XG4gICAgICBfdGhpcy5fcmVtb3ZlQ29udGVudENsYXNzZXMoKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUb2dnbGVzIHRoZSBvZmYtY2FudmFzIG1lbnUgb3BlbiBvciBjbG9zZWQuXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnQgLSBFdmVudCBvYmplY3QgcGFzc2VkIGZyb20gbGlzdGVuZXIuXG4gICAqIEBwYXJhbSB7alF1ZXJ5fSB0cmlnZ2VyIC0gZWxlbWVudCB0aGF0IHRyaWdnZXJlZCB0aGUgb2ZmLWNhbnZhcyB0byBvcGVuLlxuICAgKi9cbiAgdG9nZ2xlKGV2ZW50LCB0cmlnZ2VyKSB7XG4gICAgaWYgKHRoaXMuJGVsZW1lbnQuaGFzQ2xhc3MoJ2lzLW9wZW4nKSkge1xuICAgICAgdGhpcy5jbG9zZShldmVudCwgdHJpZ2dlcik7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhpcy5vcGVuKGV2ZW50LCB0cmlnZ2VyKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyBrZXlib2FyZCBpbnB1dCB3aGVuIGRldGVjdGVkLiBXaGVuIHRoZSBlc2NhcGUga2V5IGlzIHByZXNzZWQsIHRoZSBvZmYtY2FudmFzIG1lbnUgY2xvc2VzLCBhbmQgZm9jdXMgaXMgcmVzdG9yZWQgdG8gdGhlIGVsZW1lbnQgdGhhdCBvcGVuZWQgdGhlIG1lbnUuXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2hhbmRsZUtleWJvYXJkKGUpIHtcbiAgICBLZXlib2FyZC5oYW5kbGVLZXkoZSwgJ09mZkNhbnZhcycsIHtcbiAgICAgIGNsb3NlOiAoKSA9PiB7XG4gICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgdGhpcy4kbGFzdFRyaWdnZXIuZm9jdXMoKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9LFxuICAgICAgaGFuZGxlZDogKCkgPT4ge1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogRGVzdHJveXMgdGhlIG9mZmNhbnZhcyBwbHVnaW4uXG4gICAqIEBmdW5jdGlvblxuICAgKi9cbiAgX2Rlc3Ryb3koKSB7XG4gICAgdGhpcy5jbG9zZSgpO1xuICAgIHRoaXMuJGVsZW1lbnQub2ZmKCcuemYudHJpZ2dlciAuemYub2ZmY2FudmFzJyk7XG4gICAgdGhpcy4kb3ZlcmxheS5vZmYoJy56Zi5vZmZjYW52YXMnKTtcbiAgfVxufVxuXG5PZmZDYW52YXMuZGVmYXVsdHMgPSB7XG4gIC8qKlxuICAgKiBBbGxvdyB0aGUgdXNlciB0byBjbGljayBvdXRzaWRlIG9mIHRoZSBtZW51IHRvIGNsb3NlIGl0LlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAZGVmYXVsdCB0cnVlXG4gICAqL1xuICBjbG9zZU9uQ2xpY2s6IHRydWUsXG5cbiAgLyoqXG4gICAqIEFkZHMgYW4gb3ZlcmxheSBvbiB0b3Agb2YgYFtkYXRhLW9mZi1jYW52YXMtY29udGVudF1gLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAZGVmYXVsdCB0cnVlXG4gICAqL1xuICBjb250ZW50T3ZlcmxheTogdHJ1ZSxcblxuICAvKipcbiAgICogVGFyZ2V0IGFuIG9mZi1jYW52YXMgY29udGVudCBjb250YWluZXIgYnkgSUQgdGhhdCBtYXkgYmUgcGxhY2VkIGFueXdoZXJlLiBJZiBudWxsIHRoZSBjbG9zZXN0IGNvbnRlbnQgY29udGFpbmVyIHdpbGwgYmUgdGFrZW4uXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUgez9zdHJpbmd9XG4gICAqIEBkZWZhdWx0IG51bGxcbiAgICovXG4gIGNvbnRlbnRJZDogbnVsbCxcblxuICAvKipcbiAgICogRGVmaW5lIHRoZSBvZmYtY2FudmFzIGVsZW1lbnQgaXMgbmVzdGVkIGluIGFuIG9mZi1jYW52YXMgY29udGVudC4gVGhpcyBpcyByZXF1aXJlZCB3aGVuIHVzaW5nIHRoZSBjb250ZW50SWQgb3B0aW9uIGZvciBhIG5lc3RlZCBlbGVtZW50LlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAZGVmYXVsdCBudWxsXG4gICAqL1xuICBuZXN0ZWQ6IG51bGwsXG5cbiAgLyoqXG4gICAqIEVuYWJsZS9kaXNhYmxlIHNjcm9sbGluZyBvZiB0aGUgbWFpbiBjb250ZW50IHdoZW4gYW4gb2ZmIGNhbnZhcyBwYW5lbCBpcyBvcGVuLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAZGVmYXVsdCB0cnVlXG4gICAqL1xuICBjb250ZW50U2Nyb2xsOiB0cnVlLFxuXG4gIC8qKlxuICAgKiBBbW91bnQgb2YgdGltZSBpbiBtcyB0aGUgb3BlbiBhbmQgY2xvc2UgdHJhbnNpdGlvbiByZXF1aXJlcy4gSWYgbm9uZSBzZWxlY3RlZCwgcHVsbHMgZnJvbSBib2R5IHN0eWxlLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtudW1iZXJ9XG4gICAqIEBkZWZhdWx0IG51bGxcbiAgICovXG4gIHRyYW5zaXRpb25UaW1lOiBudWxsLFxuXG4gIC8qKlxuICAgKiBUeXBlIG9mIHRyYW5zaXRpb24gZm9yIHRoZSBvZmZjYW52YXMgbWVudS4gT3B0aW9ucyBhcmUgJ3B1c2gnLCAnZGV0YWNoZWQnIG9yICdzbGlkZScuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge3N0cmluZ31cbiAgICogQGRlZmF1bHQgcHVzaFxuICAgKi9cbiAgdHJhbnNpdGlvbjogJ3B1c2gnLFxuXG4gIC8qKlxuICAgKiBGb3JjZSB0aGUgcGFnZSB0byBzY3JvbGwgdG8gdG9wIG9yIGJvdHRvbSBvbiBvcGVuLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHs/c3RyaW5nfVxuICAgKiBAZGVmYXVsdCBudWxsXG4gICAqL1xuICBmb3JjZVRvOiBudWxsLFxuXG4gIC8qKlxuICAgKiBBbGxvdyB0aGUgb2ZmY2FudmFzIHRvIHJlbWFpbiBvcGVuIGZvciBjZXJ0YWluIGJyZWFrcG9pbnRzLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgKi9cbiAgaXNSZXZlYWxlZDogZmFsc2UsXG5cbiAgLyoqXG4gICAqIEJyZWFrcG9pbnQgYXQgd2hpY2ggdG8gcmV2ZWFsLiBKUyB3aWxsIHVzZSBhIFJlZ0V4cCB0byB0YXJnZXQgc3RhbmRhcmQgY2xhc3NlcywgaWYgY2hhbmdpbmcgY2xhc3NuYW1lcywgcGFzcyB5b3VyIGNsYXNzIHdpdGggdGhlIGByZXZlYWxDbGFzc2Agb3B0aW9uLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHs/c3RyaW5nfVxuICAgKiBAZGVmYXVsdCBudWxsXG4gICAqL1xuICByZXZlYWxPbjogbnVsbCxcblxuICAvKipcbiAgICogRm9yY2UgZm9jdXMgdG8gdGhlIG9mZmNhbnZhcyBvbiBvcGVuLiBJZiB0cnVlLCB3aWxsIGZvY3VzIHRoZSBvcGVuaW5nIHRyaWdnZXIgb24gY2xvc2UuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBkZWZhdWx0IHRydWVcbiAgICovXG4gIGF1dG9Gb2N1czogdHJ1ZSxcblxuICAvKipcbiAgICogQ2xhc3MgdXNlZCB0byBmb3JjZSBhbiBvZmZjYW52YXMgdG8gcmVtYWluIG9wZW4uIEZvdW5kYXRpb24gZGVmYXVsdHMgZm9yIHRoaXMgYXJlIGByZXZlYWwtZm9yLWxhcmdlYCAmIGByZXZlYWwtZm9yLW1lZGl1bWAuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge3N0cmluZ31cbiAgICogQGRlZmF1bHQgcmV2ZWFsLWZvci1cbiAgICogQHRvZG8gaW1wcm92ZSB0aGUgcmVnZXggdGVzdGluZyBmb3IgdGhpcy5cbiAgICovXG4gIHJldmVhbENsYXNzOiAncmV2ZWFsLWZvci0nLFxuXG4gIC8qKlxuICAgKiBUcmlnZ2VycyBvcHRpb25hbCBmb2N1cyB0cmFwcGluZyB3aGVuIG9wZW5pbmcgYW4gb2ZmY2FudmFzLiBTZXRzIHRhYmluZGV4IG9mIFtkYXRhLW9mZi1jYW52YXMtY29udGVudF0gdG8gLTEgZm9yIGFjY2Vzc2liaWxpdHkgcHVycG9zZXMuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBkZWZhdWx0IGZhbHNlXG4gICAqL1xuICB0cmFwRm9jdXM6IGZhbHNlXG59XG5cbmV4cG9ydCB7T2ZmQ2FudmFzfTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24ub2ZmY2FudmFzLmpzIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IHsgR2V0WW9EaWdpdHMgfSBmcm9tICcuL2ZvdW5kYXRpb24udXRpbC5jb3JlJztcblxuLy8gQWJzdHJhY3QgY2xhc3MgZm9yIHByb3ZpZGluZyBsaWZlY3ljbGUgaG9va3MuIEV4cGVjdCBwbHVnaW5zIHRvIGRlZmluZSBBVCBMRUFTVFxuLy8ge2Z1bmN0aW9ufSBfc2V0dXAgKHJlcGxhY2VzIHByZXZpb3VzIGNvbnN0cnVjdG9yKSxcbi8vIHtmdW5jdGlvbn0gX2Rlc3Ryb3kgKHJlcGxhY2VzIHByZXZpb3VzIGRlc3Ryb3kpXG5jbGFzcyBQbHVnaW4ge1xuXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICB0aGlzLl9zZXR1cChlbGVtZW50LCBvcHRpb25zKTtcbiAgICB2YXIgcGx1Z2luTmFtZSA9IGdldFBsdWdpbk5hbWUodGhpcyk7XG4gICAgdGhpcy51dWlkID0gR2V0WW9EaWdpdHMoNiwgcGx1Z2luTmFtZSk7XG5cbiAgICBpZighdGhpcy4kZWxlbWVudC5hdHRyKGBkYXRhLSR7cGx1Z2luTmFtZX1gKSl7IHRoaXMuJGVsZW1lbnQuYXR0cihgZGF0YS0ke3BsdWdpbk5hbWV9YCwgdGhpcy51dWlkKTsgfVxuICAgIGlmKCF0aGlzLiRlbGVtZW50LmRhdGEoJ3pmUGx1Z2luJykpeyB0aGlzLiRlbGVtZW50LmRhdGEoJ3pmUGx1Z2luJywgdGhpcyk7IH1cbiAgICAvKipcbiAgICAgKiBGaXJlcyB3aGVuIHRoZSBwbHVnaW4gaGFzIGluaXRpYWxpemVkLlxuICAgICAqIEBldmVudCBQbHVnaW4jaW5pdFxuICAgICAqL1xuICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlcihgaW5pdC56Zi4ke3BsdWdpbk5hbWV9YCk7XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHRoaXMuX2Rlc3Ryb3koKTtcbiAgICB2YXIgcGx1Z2luTmFtZSA9IGdldFBsdWdpbk5hbWUodGhpcyk7XG4gICAgdGhpcy4kZWxlbWVudC5yZW1vdmVBdHRyKGBkYXRhLSR7cGx1Z2luTmFtZX1gKS5yZW1vdmVEYXRhKCd6ZlBsdWdpbicpXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBGaXJlcyB3aGVuIHRoZSBwbHVnaW4gaGFzIGJlZW4gZGVzdHJveWVkLlxuICAgICAgICAgKiBAZXZlbnQgUGx1Z2luI2Rlc3Ryb3llZFxuICAgICAgICAgKi9cbiAgICAgICAgLnRyaWdnZXIoYGRlc3Ryb3llZC56Zi4ke3BsdWdpbk5hbWV9YCk7XG4gICAgZm9yKHZhciBwcm9wIGluIHRoaXMpe1xuICAgICAgdGhpc1twcm9wXSA9IG51bGw7Ly9jbGVhbiB1cCBzY3JpcHQgdG8gcHJlcCBmb3IgZ2FyYmFnZSBjb2xsZWN0aW9uLlxuICAgIH1cbiAgfVxufVxuXG4vLyBDb252ZXJ0IFBhc2NhbENhc2UgdG8ga2ViYWItY2FzZVxuLy8gVGhhbmsgeW91OiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS84OTU1NTgwXG5mdW5jdGlvbiBoeXBoZW5hdGUoc3RyKSB7XG4gIHJldHVybiBzdHIucmVwbGFjZSgvKFthLXpdKShbQS1aXSkvZywgJyQxLSQyJykudG9Mb3dlckNhc2UoKTtcbn1cblxuZnVuY3Rpb24gZ2V0UGx1Z2luTmFtZShvYmopIHtcbiAgaWYodHlwZW9mKG9iai5jb25zdHJ1Y3Rvci5uYW1lKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm4gaHlwaGVuYXRlKG9iai5jb25zdHJ1Y3Rvci5uYW1lKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gaHlwaGVuYXRlKG9iai5jbGFzc05hbWUpO1xuICB9XG59XG5cbmV4cG9ydCB7UGx1Z2lufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24ucGx1Z2luLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==