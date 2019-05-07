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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ({

/***/ "../../index.js":
/*!****************************************************************!*\
  !*** /Users/mass/Documents/GitHub/aircall-everywhere/index.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_javascripts_aircallPhone_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/javascripts/aircallPhone.js */ "../../src/javascripts/aircallPhone.js");


/* harmony default export */ __webpack_exports__["default"] = (_src_javascripts_aircallPhone_js__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "../../src/javascripts/aircallPhone.js":
/*!***************************************************************************************!*\
  !*** /Users/mass/Documents/GitHub/aircall-everywhere/src/javascripts/aircallPhone.js ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class AircallPhone {
  constructor(opts = {}) {
    // internal vars
    // window object of loaded aircall phone
    this.phoneWindow = null;
    this.integrationSettings = {};
    this.userSettings = {};
    this.eventsRegistered = {};

    this.phoneLoginState = false;

    const URL_REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;

    // options passed
    this.phoneUrl =
      opts.phoneUrl !== undefined && URL_REGEX.test(opts.phoneUrl) === true
        ? opts.phoneUrl
        : 'https://phone.aircall.io';
    this.domToLoadPhone = opts.domToLoadPhone;
    this.integrationToLoad = opts.integrationToLoad;

    // 3 different sizes: big/small/auto
    this.size = opts.size || 'big';

    this.onLogin = () => {
      if (typeof opts.onLogin === 'function' && this.phoneLoginState === false) {
        this.phoneLoginState = true;
        const data = {
          user: this.userSettings
        };
        if (Object.keys(this.integrationSettings).length > 0) {
          data.settings = this.integrationSettings;
        }
        opts.onLogin(data);
      }
    };

    this.onLogout = () => {
      if (typeof opts.onLogout === 'function') {
        opts.onLogout();
      }
    };
    // local window
    this.w = opts.window || window;

    // launch postmessage listener
    this._messageListener();

    // load phone in specified dom
    if (!!this.domToLoadPhone) {
      this._createPhoneIframe();
    }
  }

  _resetData() {
    this.phoneWindow = null;
    this.integrationSettings = {};
    this.userSettings = {};
    this.phoneLoginState = false;
  }

  _createPhoneIframe() {
    let sizeStyle = '';
    switch (this.size) {
      case 'big':
        sizeStyle = 'height:666px; width:376px;';
        break;
      case 'small':
        sizeStyle = 'height:600px; width:376px;';
        break;
      case 'auto':
        sizeStyle = 'height:100%; width:100%;';
        break;
    }

    // we get the passed dom
    try {
      const el = document.querySelector(this.domToLoadPhone);
      el.innerHTML = `<iframe allow="microphone; autoplay" src="${this.getUrlToLoad()}" style="${sizeStyle}"></iframe>`;
    } catch (e) {
      // couldnt query the dom wanted
      console.error(
        `[AircallEverywhere] [iframe creation] ${this.domToLoadPhone} not be found. Error:`,
        e
      );
    }
  }

  _messageListener() {
    this.w.addEventListener(
      'message',
      event => {
        console.info('[AircallEverywhere] [event listener] received event', event);
        // we test if our format object is present. if not, we stop
        const matchPrefixRegex = /^apm_phone_/;
        if (!event.data || !event.data.name || !matchPrefixRegex.test(event.data.name)) {
          return false;
        }

        // initialisation message
        if (event.data.name === 'apm_phone_loaded') {
          this._handleInitMessage(event);
          return;
        }

        // integration settings sent by phone
        if (event.data.name === 'apm_phone_integration_settings' && !!event.data.value) {
          this.integrationSettings = event.data.value;
          // init callback after settings received
          this.onLogin();
          return;
        }

        // phone logout
        if (event.data.name === 'apm_phone_logout') {
          // we clean data related to user
          this._resetData();
          this.onLogout();
          return;
        }

        // loop over events registered
        for (const eventName in this.eventsRegistered) {
          if (event.data.name === `apm_phone_${eventName}`) {
            // event triggered => we execute callback
            this.eventsRegistered[eventName](event.data.value);
          }
        }
      },
      false
    );
  }

  _handleInitMessage(event) {
    // we keep the source
    this.phoneWindow = {
      source: event.source,
      origin: event.origin
    };

    if (!!event.data.value) {
      this.userSettings = event.data.value;
    }

    // we answer init
    this.phoneWindow.source.postMessage({ name: 'apm_app_isready' }, this.phoneWindow.origin);

    // we ask for integration settings
    if (!!this.integrationToLoad) {
      this.phoneWindow.source.postMessage(
        { name: 'apm_app_get_settings', value: this.integrationToLoad },
        this.phoneWindow.origin
      );
    } else {
      // init callback now if present
      this.onLogin();
    }
  }

  getUrlToLoad() {
    return `${this.phoneUrl}?integration=generic`;
  }

  on(eventName, callback) {
    if (!eventName || typeof callback !== 'function') {
      throw new Error(
        '[AircallEverywhere] [on function] Invalid parameters format. Expected non empty string and function'
      );
    }
    this.eventsRegistered[eventName] = callback;
  }

  _handleSendError(error, callback) {
    if (!error || !error.code) {
      // should not happen, unknown error
      error = {
        code: 'unknown_error'
      };
    }
    // errors sent by the phone for specific events are not handled since they should have their code AND message
    if (!!error && !error.message) {
      switch (error.code) {
        case 'unknown_error':
          error.message = 'Unknown error. Contact aircall developers dev@aircall.io';
          break;
        case 'no_event_name':
          error.message = 'Invalid parameter eventName. Expected an non empty string';
          break;
        case 'not_ready':
          error.message =
            'Aircall Phone has not been identified yet or is not ready. Wait for "onLogin" callback';
          break;
        case 'no_answer':
          error.message = 'No answer from the phone. Check if the phone is logged in';
          break;
        case 'invalid_response':
          error.message =
            'Invalid response from the phone. Contact aircall developers dev@aircall.io';
          break;
        default:
          // specific error without a message. Should not happen
          error.message = 'Generic error message';
          break;
      }
    }

    // we log the error
    console.error(`[AircallEverywhere] [send function] ${error.message}`);

    // we send the callback with the error
    if (typeof callback === 'function') {
      callback(false, error);
    }
  }

  send(eventName, data, callback) {
    if (typeof data === 'function' && !callback) {
      callback = data;
      data = undefined;
    }

    if (!eventName) {
      this._handleSendError({ code: 'no_event_name' }, callback);
      return false;
    }

    if (!!this.phoneWindow && !!this.phoneWindow.source) {
      let responseTimeout = null;
      let timeoutLimit = 500;

      // we send the message
      this.phoneWindow.source.postMessage(
        { name: `apm_app_${eventName}`, value: data },
        this.phoneWindow.origin
      );

      // we wait for a response to this message
      this.on(`${eventName}_response`, response => {
        // we have a response, we remove listener and return the callback
        this.removeListener(`${eventName}_response`);
        clearTimeout(responseTimeout);
        // we evaluate response
        if (!!response && response.success === false) {
          // phone answers with an error
          this._handleSendError(
            { code: response.errorCode, message: response.errorMessage },
            callback
          );
        } else if (!!response && response.success === true) {
          // phone answer a succes with its response
          if (typeof callback === 'function') {
            callback(true, response.data);
          }
        } else {
          // phone answer is invalid
          this._handleSendError({ code: 'invalid_response' }, callback);
        }
      });

      responseTimeout = setTimeout(() => {
        // if no response, we remove listener
        this.removeListener(`${eventName}_response`);

        this._handleSendError({ code: 'no_answer' }, callback);
      }, timeoutLimit);
    } else {
      this._handleSendError({ code: 'not_ready' }, callback);
      return false;
    }
  }

  removeListener(eventName) {
    if (!this.eventsRegistered[eventName]) {
      return false;
    }

    Object.keys(this.eventsRegistered)
      .filter(key => key === eventName)
      .forEach(key => delete this.eventsRegistered[key]);
    return true;
  }

  isLoggedIn(callback) {
    // we simply send an event and send its result.
    this.send('is_logged_in', success => {
      callback(success);
    });
  }
}

/* harmony default export */ __webpack_exports__["default"] = (AircallPhone);


/***/ }),

/***/ 1:
/*!**********************************************************************!*\
  !*** multi /Users/mass/Documents/GitHub/aircall-everywhere/index.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/mass/Documents/GitHub/aircall-everywhere/index.js */"../../index.js");


/***/ })

/******/ });
//# sourceMappingURL=aircall-everywhere.js.map