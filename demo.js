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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "../../demo/demo.js":
/*!********************************************************************!*\
  !*** /Users/mass/Documents/GitHub/aircall-everywhere/demo/demo.js ***!
  \********************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var aircall_everywhere__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aircall-everywhere */ "../../index.js");
/* demo.js */


console.log('demo time!');

const loadPhoneButton = document.querySelector('#load-phone-button');
loadPhoneButton.addEventListener(
  'click',
  () => {
    let loadedPhoneAlert = document.querySelector('#phone-loaded');
    let notLoadePhoneAlert = document.querySelector('#phone-not-loaded');
    loadPhoneButton.disabled = true;
    const ap = new aircall_everywhere__WEBPACK_IMPORTED_MODULE_0__["default"]({
      domToLoadPhone: '#phone',
      afterPhoneLoaded: () => {
        loadedPhoneAlert.classList.remove('d-none');
        notLoadePhoneAlert.classList.add('d-none');
      }
    });
    let inCallAlert = document.querySelector('#in-call');
    let notInCallAlert = document.querySelector('#not-in-call');
    ap.on('incoming_call', () => {
      inCallAlert.classList.remove('d-none');
      notInCallAlert.classList.add('d-none');
    });

    ap.on('call_end_ringtone', () => {
      inCallAlert.classList.add('d-none');
      notInCallAlert.classList.remove('d-none');
    });

    let dialButton = document.querySelector('#dial-button');
    dialButton.addEventListener(
      'click',
      () => {
        ap.send('dial_number', { phone_number: '+33123456789' });
      },
      false
    );
  },
  false
);


/***/ }),

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
    this.eventsRegistered = {};

    const URL_REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;
    this.phoneStarted = false;

    // options passed
    this.phoneUrl =
      opts.phoneUrl !== undefined && URL_REGEX.test(opts.phoneUrl) === true
        ? opts.phoneUrl
        : 'https://phone.aircall.io';
    this.domToLoadPhone = opts.domToLoadPhone;
    this.integrationToLoad = opts.integrationToLoad;
    this.afterPhoneLoaded = () => {
      if (this.phoneStarted === false && typeof opts.afterPhoneLoaded === 'function') {
        this.phoneStarted = true;
        opts.afterPhoneLoaded();
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

  _createPhoneIframe() {
    // we get the passed dom
    try {
      const el = document.querySelector(this.domToLoadPhone);
      el.innerHTML = `<iframe allow="microphone; autoplay" src="${this.getUrlToLoad()}" style="height:666px; width:376px;"></iframe>`;
    } catch (e) {
      // couldnt query the dom wanted
      console.error(`[AircallSDK] ${this.domToLoadPhone} not be found. Error:`, e);
    }
  }

  _messageListener() {
    this.w.addEventListener(
      'message',
      event => {
        console.log('[AircallSDK] received event', event);
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
          this.afterPhoneLoaded();
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
      this.afterPhoneLoaded();
    }
  }

  getUrlToLoad() {
    return `${this.phoneUrl}?integration=generic`;
  }

  getSetting(settingName) {
    return this.integrationSettings[settingName];
  }

  on(eventName, callback) {
    if (!eventName || typeof callback !== 'function') {
      throw new Error(
        '[AircallEverywhere] Invalid parameters format. Expected non empty string and function'
      );
    }
    this.eventsRegistered[eventName] = callback;
  }

  send(eventName, data) {
    if (!eventName) {
      throw new Error(
        '[AircallEverywhere] Invalid parameter eventName. Expected an non empty string'
      );
    }
    this.phoneWindow.source.postMessage(
      { name: `apm_app_${eventName}`, value: data },
      this.phoneWindow.origin
    );
  }
}

/* harmony default export */ __webpack_exports__["default"] = (AircallPhone);


/***/ }),

/***/ 0:
/*!**************************************************************************!*\
  !*** multi /Users/mass/Documents/GitHub/aircall-everywhere/demo/demo.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/mass/Documents/GitHub/aircall-everywhere/demo/demo.js */"../../demo/demo.js");


/***/ })

/******/ });
//# sourceMappingURL=demo.js.map