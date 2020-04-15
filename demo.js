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
/*!**********************************************************************!*\
  !*** /Users/xave/Documents/Projects/aircall-everywhere/demo/demo.js ***!
  \**********************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var aircall_everywhere__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aircall-everywhere */ "../../dist/index.js");
/* harmony import */ var aircall_everywhere__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(aircall_everywhere__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _reset_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./reset.scss */ "../../demo/reset.scss");
/* harmony import */ var _reset_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_reset_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _demo_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./demo.scss */ "../../demo/demo.scss");
/* harmony import */ var _demo_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_demo_scss__WEBPACK_IMPORTED_MODULE_2__);
/* demo.js */





console.log('demo time!');

// Show phone
const setPhoneVisibility = visible => {
  const phoneContainer = document.querySelector('#phone-container');
  if (!!visible) {
    phoneContainer.classList.remove('d-none');
  } else {
    phoneContainer.classList.add('d-none');
  }
};

// toogle phone
const togglePhoneVisibility = () => {
  const phoneContainer = document.querySelector('#phone-container');
  if (phoneContainer.classList.contains('d-none')) {
    setPhoneVisibility(true);
  } else {
    setPhoneVisibility(false);
  }
};

// write a mesage in an alert box
const setStatusMessage = (selector, type, message) => {
  const statusBox = document.querySelector(selector);
  statusBox.classList.remove('alert-danger', 'alert-success', 'alert-warning');
  statusBox.classList.add(`alert-${type}`);
  statusBox.textContent = message;
};

// write a payload and label in a code box
const setStatusData = (selector, data, label) => {
  const dataBox = document.querySelector(selector);
  const toPrettify = `${label}\n${JSON.stringify(data, null, 2)}`;
  dataBox.innerHTML = window.PR.prettyPrintOne(toPrettify);
};

// for call flow events, create an item with message and payload
const addCallLog = (id, payload, log) => {
  // we remove waiting text
  const waitingText = document.querySelector('#waiting-events');
  if (waitingText) {
    waitingText.remove();
  }
  // we add item
  const logBox = document.querySelector('#call-events-log');
  const d = document.createElement('div');
  const currentTime = new Date(Date.now());
  const htmlBlock = `<input type="checkbox" id="${id}-${payload.call_id}"><label for="${id}-${
    payload.call_id
  }"><span>${currentTime.toLocaleTimeString()}: ${log}</span><pre class="prettyprint"><code>${window.PR.prettyPrintOne(
    JSON.stringify(payload, null, 2)
  )}</code></pre></label>`;
  d.innerHTML = htmlBlock;
  logBox.appendChild(d);
};

// our buttons elements
const loadPhoneButton = document.querySelector('#load-phone-button');
const dialButton = document.querySelector('#dial-button');
const isLoginButton = document.querySelector('#is-login-button');

// loading phone button clicked
loadPhoneButton.addEventListener(
  'click',
  () => {
    // we show the phone
    // phone icon
    const phoneButtonIcon = document.querySelector('#phone-aircall');
    phoneButtonIcon.classList.remove('d-none');
    // phone visibility
    setPhoneVisibility(true);

    // we add listener to toogle via icon
    phoneButtonIcon.addEventListener('click', () => {
      togglePhoneVisibility();
    });

    // we don't allow to load phone again
    loadPhoneButton.disabled = true;
    // we allow the send events to phone related buttons
    dialButton.disabled = false;
    isLoginButton.disabled = false;

    // we load the phone via the library
    const phone = new aircall_everywhere__WEBPACK_IMPORTED_MODULE_0___default.a({
      domToLoadPhone: '#phone',
      onLogin: settings => {
        // we set data and status
        setStatusData('#user-info', settings, '// user informations');
        setStatusMessage('#phone-loading', 'success', 'Phone is loaded and ready to use!');
      },
      onLogout: () => {
        // we reset data and status
        setStatusData('#user-info', '', '// user informations');
        setStatusMessage('#phone-loading', 'danger', 'Phone is not loaded or logged in');
      }
    });

    // listeners
    // incoming call
    phone.on('incoming_call', callInfos => {
      setPhoneVisibility(true);
      const message = `Incoming call from ${callInfos.from} to ${callInfos.to} ringing!`;
      addCallLog('incoming_call', callInfos, message);
      setStatusMessage('#call-events', 'success', message);
    });

    // ringtone ended
    phone.on('call_end_ringtone', callInfos => {
      const message = `Ringing ended. call was ${callInfos.answer_status}`;
      addCallLog('call_end_ringtone', callInfos, message);
      setStatusMessage(
        '#call-events',
        callInfos.answer_status === 'answered' ? 'success' : 'warning',
        message
      );
    });

    // call ended
    phone.on('call_ended', callInfos => {
      const message = `Call ended. Lasted ${callInfos.duration} seconds`;
      addCallLog('call_ended', callInfos, message);
      setStatusMessage('#call-events', 'warning', message);
    });

    // comment saved
    phone.on('comment_saved', callInfos => {
      const message = 'Comment about the last call saved';
      addCallLog('comment_saved', callInfos, message);
      setStatusMessage('#call-events', 'success', message);
    });

    // outgoing call
    phone.on('outgoing_call', callInfos => {
      const message = `Outgoing call from ${callInfos.from} to ${callInfos.to} ...`;
      addCallLog('outgoing_call', callInfos, message);
      setStatusMessage('#call-events', 'success', message);
    });

    // outgoing call answered
    phone.on('outgoing_answered', callInfos => {
      const message = 'Outgoing call answered!';
      addCallLog('outgoing_answered', callInfos, message);
      setStatusMessage('#call-events', 'success', message);
    });

    // dial button clicked
    dialButton.addEventListener(
      'click',
      () => {
        phone.send('dial_number', { phone_number: '+33123456789' }, (success, data) => {
          setPhoneVisibility(true);
          setStatusData('#dial-info', data, `// first argument\n${success}\n// second argument`);
          !!success
            ? setStatusMessage('#send-event-status-box', 'success', 'Dialing action was a success!')
            : setStatusMessage('#send-event-status-box', 'danger', data.message);
        });
      },
      false
    );

    // is logged in button clicked
    isLoginButton.addEventListener(
      'click',
      () => {
        phone.isLoggedIn(response => {
          setStatusData('#is-login-info', response, `// isLoggedIn result`);
          response
            ? setStatusMessage('#send-event-status-box', 'success', 'User is logged in')
            : setStatusMessage('#send-event-status-box', 'danger', 'User is logged out');
        });
      },
      false
    );
  },
  false
);


/***/ }),

/***/ "../../demo/demo.scss":
/*!************************************************************************!*\
  !*** /Users/xave/Documents/Projects/aircall-everywhere/demo/demo.scss ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/lib/loader.js!./demo.scss */ "../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/lib/loader.js!../../demo/demo.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../node_modules/style-loader/lib/addStyles.js */ "../../node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "../../demo/reset.scss":
/*!*************************************************************************!*\
  !*** /Users/xave/Documents/Projects/aircall-everywhere/demo/reset.scss ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/lib/loader.js!./reset.scss */ "../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/lib/loader.js!../../demo/reset.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../node_modules/style-loader/lib/addStyles.js */ "../../node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "../../dist/index.js":
/*!***********************************************************************!*\
  !*** /Users/xave/Documents/Projects/aircall-everywhere/dist/index.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports=function(e){var n={};function t(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,t),r.l=!0,r.exports}return t.m=e,t.c=n,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:o})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(t.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)t.d(o,r,function(n){return e[n]}.bind(null,r));return o},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=0)}([function(e,n,t){e.exports=t(1)},function(e,n,t){"use strict";function o(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function r(e,n){for(var t=0;t<n.length;t++){var o=n[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}t.r(n);var i=function(){function e(){var n=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{debug:!0};o(this,e),this.phoneWindow=null,this.integrationSettings={},this.userSettings={},this.eventsRegistered={},this.phoneLoginState=!1;var r=/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;this.phoneUrl=void 0!==t.phoneUrl&&!0===r.test(t.phoneUrl)?t.phoneUrl:"https://phone.aircall.io",this.domToLoadPhone=t.domToLoadPhone,this.integrationToLoad=t.integrationToLoad,this.debug=t.debug,this.size=t.size||"big",this.onLogin=function(){if("function"==typeof t.onLogin&&!1===n.phoneLoginState){n.phoneLoginState=!0;var e={user:n.userSettings};Object.keys(n.integrationSettings).length>0&&(e.settings=n.integrationSettings),t.onLogin(e)}},this.onLogout=function(){"function"==typeof t.onLogout&&t.onLogout()},this.w=t.window||window,this._messageListener(),this.domToLoadPhone&&this._createPhoneIframe()}var n,t,i;return n=e,(t=[{key:"_resetData",value:function(){this.phoneWindow=null,this.integrationSettings={},this.userSettings={},this.phoneLoginState=!1}},{key:"_createPhoneIframe",value:function(){var e="";switch(this.size){case"big":e="height:666px; width:376px;";break;case"small":e="height:600px; width:376px;";break;case"auto":e="height:100%; width:100%;"}try{document.querySelector(this.domToLoadPhone).innerHTML='<iframe allow="microphone; autoplay" src="'.concat(this.getUrlToLoad(),'" style="').concat(e,'"></iframe>')}catch(e){this._log("error","[AircallEverywhere] [iframe creation] ".concat(this.domToLoadPhone," not be found. Error:"),e)}}},{key:"_messageListener",value:function(){var e=this;this.w.addEventListener("message",(function(n){if(e._log("info","[AircallEverywhere] [event listener] received event",n),!n.data||!n.data.name||!/^apm_phone_/.test(n.data.name))return!1;if("apm_phone_loaded"!==n.data.name){if("apm_phone_integration_settings"===n.data.name&&n.data.value)return e.integrationSettings=n.data.value,void e.onLogin();if("apm_phone_logout"===n.data.name)return e._resetData(),void e.onLogout();for(var t in e.eventsRegistered)n.data.name==="apm_phone_".concat(t)&&e.eventsRegistered[t](n.data.value)}else e._handleInitMessage(n)}),!1)}},{key:"_handleInitMessage",value:function(e){this.phoneWindow={source:e.source,origin:e.origin},e.data.value&&(this.userSettings=e.data.value),this.phoneWindow.source.postMessage({name:"apm_app_isready"},this.phoneWindow.origin),this.integrationToLoad?this.phoneWindow.source.postMessage({name:"apm_app_get_settings",value:this.integrationToLoad},this.phoneWindow.origin):this.onLogin()}},{key:"_log",value:function(e){var n,t;if("string"!=typeof e)throw new Error("[AircallEverywhere] [_log] Must provide valid console action");if(this.debug){for(var o=arguments.length,r=new Array(o>1?o-1:0),i=1;i<o;i++)r[i-1]=arguments[i];console[e]?(n=console)[e].apply(n,r):(t=console).info.apply(t,r)}}},{key:"getUrlToLoad",value:function(){return"".concat(this.phoneUrl,"?integration=generic")}},{key:"on",value:function(e,n){if(!e||"function"!=typeof n)throw new Error("[AircallEverywhere] [on function] Invalid parameters format. Expected non empty string and function");this.eventsRegistered[e]=n}},{key:"_handleSendError",value:function(e,n){if(e&&e.code||(e={code:"unknown_error"}),e&&!e.message)switch(e.code){case"unknown_error":e.message="Unknown error. Contact aircall developers dev@aircall.io";break;case"no_event_name":e.message="Invalid parameter eventName. Expected an non empty string";break;case"not_ready":e.message='Aircall Phone has not been identified yet or is not ready. Wait for "onLogin" callback';break;case"no_answer":e.message="No answer from the phone. Check if the phone is logged in";break;case"invalid_response":e.message="Invalid response from the phone. Contact aircall developers dev@aircall.io";break;default:e.message="Generic error message"}this._log("error","[AircallEverywhere] [send function] ".concat(e.message)),"function"==typeof n&&n(!1,e)}},{key:"send",value:function(e,n,t){var o=this;if("function"!=typeof n||t||(t=n,n=void 0),!e)return this._handleSendError({code:"no_event_name"},t),!1;if(!this.phoneWindow||!this.phoneWindow.source)return this._handleSendError({code:"not_ready"},t),!1;var r=null;this.phoneWindow.source.postMessage({name:"apm_app_".concat(e),value:n},this.phoneWindow.origin),this.on("".concat(e,"_response"),(function(n){o.removeListener("".concat(e,"_response")),clearTimeout(r),n&&!1===n.success?o._handleSendError({code:n.errorCode,message:n.errorMessage},t):n&&!0===n.success?"function"==typeof t&&t(!0,n.data):o._handleSendError({code:"invalid_response"},t)})),r=setTimeout((function(){o.removeListener("".concat(e,"_response")),o._handleSendError({code:"no_answer"},t)}),500)}},{key:"removeListener",value:function(e){var n=this;return!!this.eventsRegistered[e]&&(Object.keys(this.eventsRegistered).filter((function(n){return n===e})).forEach((function(e){return delete n.eventsRegistered[e]})),!0)}},{key:"isLoggedIn",value:function(e){this.send("is_logged_in",(function(n){e(n)}))}}])&&r(n.prototype,t),i&&r(n,i),e}();n.default=i}]);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/lib/loader.js!../../demo/demo.scss":
/*!*******************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/xave/Documents/Projects/aircall-everywhere/node_modules/css-loader/dist/cjs.js!/Users/xave/Documents/Projects/aircall-everywhere/node_modules/sass-loader/lib/loader.js!/Users/xave/Documents/Projects/aircall-everywhere/demo/demo.scss ***!
  \*******************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "../../node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, "/* VARIABLES */\n/* FONTS */\n@font-face {\n  font-family: 'Fellix';\n  src: url(\"https://cdn.aircall.io/fonts/Fellix-Light.otf\") format(\"opentype\");\n  font-weight: 300;\n  font-style: normal; }\n\n@font-face {\n  font-family: 'Fellix';\n  src: url(\"https://cdn.aircall.io/fonts/Fellix-Regular.otf\") format(\"opentype\");\n  font-weight: 500;\n  font-style: normal; }\n\n@font-face {\n  font-family: 'Fellix';\n  src: url(\"https://cdn.aircall.io/fonts/Fellix-Medium.otf\") format(\"opentype\");\n  font-weight: 600;\n  font-style: normal; }\n\n@font-face {\n  font-family: 'Fellix';\n  src: url(\"https://cdn.aircall.io/fonts/Fellix-SemiBold.otf\") format(\"opentype\");\n  font-weight: 700;\n  font-style: normal; }\n\n/* GLOBAL */\n* {\n  box-sizing: border-box; }\n  * ::-moz-selection {\n    background: rgba(162, 228, 184, 0.3); }\n  * ::selection {\n    background: rgba(162, 228, 184, 0.3); }\n\nhtml,\nbody {\n  height: 100%;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased; }\n\nbody {\n  font-family: 'Fellix', Helvetica, Arial, sans-serif;\n  font-size: 15px;\n  color: #4b5054;\n  line-height: 1.4; }\n\nh1,\nh2,\nh3 {\n  font-weight: 700;\n  color: #000000; }\n\nh1 {\n  font-size: 42px; }\n\nh2 {\n  font-size: 32px; }\n\nh3 {\n  font-size: 20px; }\n\n.d-none {\n  display: none !important; }\n\n.d-flex {\n  display: flex !important; }\n\n/* HEADER */\nnav {\n  height: 90px;\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  display: flex;\n  background-color: #fff;\n  padding: 10px 2vw;\n  justify-content: space-between;\n  box-shadow: 0 1px 1px #f4f4f4;\n  z-index: 10; }\n  nav .nav-content {\n    display: flex;\n    align-items: center; }\n    nav .nav-content a {\n      margin: 0 1vw;\n      text-decoration: none;\n      font-weight: 600;\n      color: #4b5054;\n      transition: color 0.1s ease-in-out; }\n      nav .nav-content a:hover {\n        color: #00b388; }\n      nav .nav-content a#link-aircall {\n        display: flex; }\n        nav .nav-content a#link-aircall img {\n          margin: auto 0;\n          position: relative; }\n      nav .nav-content a#phone-aircall {\n        width: 30px;\n        display: flex;\n        cursor: pointer; }\n        nav .nav-content a#phone-aircall img {\n          width: 30px;\n          margin: auto; }\n\n/* PHONE */\n#phone-container {\n  position: fixed;\n  top: 65px;\n  right: 10px;\n  z-index: 30; }\n  #phone-container .arrow-up {\n    position: absolute;\n    right: 3.3vw;\n    top: -5px;\n    width: 0;\n    height: 0;\n    border-left: 5px solid transparent;\n    border-right: 5px solid transparent;\n    border-bottom: 5px solid #afafa9; }\n  #phone-container #phone {\n    border-radius: 4px;\n    background-color: #fff;\n    border: 1px solid #afafa9;\n    overflow: hidden;\n    box-shadow: 0 5px 10px #10182060; }\n    #phone-container #phone iframe {\n      border-radius: 4px; }\n\n/* CONTENT */\n.jumbotron {\n  padding: 180px 10vw 0; }\n  .jumbotron h1 {\n    text-align: center;\n    color: #000000; }\n  .jumbotron p {\n    margin-top: 20px;\n    font-size: 20px;\n    text-align: center; }\n\ncode {\n  padding: 2px 4px;\n  background: #f4f4f4;\n  border-radius: 4px;\n  font-family: \"Operator\", Menlo, DejaVu Sans Mono, Monaco, Consolas, \"Courier New\", monospace;\n  font-size: 0.9em; }\n\npre {\n  font-family: \"Operator\", Menlo, DejaVu Sans Mono, Monaco, Consolas, \"Courier New\", monospace; }\n  pre.prettyprint {\n    width: 100% !important;\n    margin: 0 !important;\n    padding: 16px !important;\n    border-radius: 4px !important;\n    background: #40464d;\n    color: #d9d9d6;\n    overflow: hidden; }\n    pre.prettyprint code {\n      background: transparent; }\n\n.container {\n  position: relative;\n  padding: 3vw;\n  max-width: 1200px;\n  margin: auto; }\n  .container h2 {\n    margin-top: 40px; }\n    .container h2::before {\n      display: block;\n      height: 1px;\n      width: 100%;\n      margin-bottom: 40px;\n      background: #f4f4f4;\n      content: ''; }\n  .container a {\n    color: #00b388;\n    text-decoration: none;\n    font-weight: 600;\n    transition: color 0.1s ease-in-out; }\n    .container a:hover {\n      color: #006c5b; }\n  .container .row {\n    display: flex;\n    align-items: stretch;\n    padding: 20px 0; }\n    .container .row:last-child {\n      padding-bottom: 0; }\n    .container .row .left {\n      position: relative;\n      width: 60%;\n      padding-right: 4vw; }\n      .container .row .left p {\n        margin-bottom: 1em; }\n      .container .row .left pre.prettyprint {\n        background-color: #40464d !important;\n        width: auto !important;\n        flex-grow: 1; }\n      .container .row .left .button {\n        margin-bottom: 20px; }\n    .container .row .right {\n      width: 40%; }\n  .container #installation {\n    padding-top: 40px; }\n  .container #waiting-events {\n    margin: 40px 0; }\n  .container #dial-button {\n    margin-top: 40px; }\n  .container #call-events-log label {\n    position: relative;\n    display: block;\n    margin: 20px 0; }\n    .container #call-events-log label > span {\n      display: block;\n      background-color: #003b4c;\n      font-family: \"Operator\", Menlo, DejaVu Sans Mono, Monaco, Consolas, \"Courier New\", monospace;\n      color: #fff;\n      padding: 10px 40px 10px 30px;\n      position: relative;\n      cursor: pointer; }\n      .container #call-events-log label > span::after {\n        position: absolute;\n        content: '+';\n        color: #fff;\n        right: 30px;\n        top: 10px; }\n  .container #call-events-log pre.prettyprint {\n    display: none;\n    height: 0;\n    overflow: hidden; }\n  .container #call-events-log input {\n    display: none; }\n    .container #call-events-log input:checked + label pre.prettyprint {\n      height: auto;\n      display: block; }\n    .container #call-events-log input:checked + label > span::after {\n      content: '-'; }\n\n.button {\n  display: block;\n  background-color: #00b388;\n  color: #fff;\n  font-weight: 600;\n  font-size: 15px;\n  border: none;\n  border-radius: 4px;\n  padding: 12px 20px;\n  cursor: pointer;\n  outline: none;\n  transition: background-color 0.1s ease-in-out; }\n  .button:hover {\n    background-color: #006c5b; }\n  .button:disabled {\n    background-color: #afafa9;\n    color: #fff;\n    cursor: not-allowed; }\n\n.alert {\n  margin: 20px auto;\n  padding: 10px 14px;\n  font-size: 0.95em;\n  border-radius: 4px; }\n  .alert.alert-success {\n    color: #00b388;\n    box-shadow: 0 0 0 1px #00b388; }\n  .alert.alert-danger {\n    color: #ff5c39;\n    box-shadow: 0 0 0 1px #ff5c39; }\n  .alert.alert-warning {\n    color: #ff854c;\n    box-shadow: 0 0 0 1px #ff854c; }\n\n@media only screen and (max-width: 800px) {\n  .container .row {\n    flex-direction: column; }\n    .container .row .left {\n      width: 100%;\n      padding: 0; }\n    .container .row .right {\n      width: 100%; } }\n", ""]);



/***/ }),

/***/ "../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/lib/loader.js!../../demo/reset.scss":
/*!********************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/xave/Documents/Projects/aircall-everywhere/node_modules/css-loader/dist/cjs.js!/Users/xave/Documents/Projects/aircall-everywhere/node_modules/sass-loader/lib/loader.js!/Users/xave/Documents/Projects/aircall-everywhere/demo/reset.scss ***!
  \********************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "../../node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, "/* http://meyerweb.com/eric/tools/css/reset/ \n   v2.0 | 20110126\n   License: none (public domain)\n*/\nhtml,\nbody,\ndiv,\nspan,\napplet,\nobject,\niframe,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\np,\nblockquote,\npre,\na,\nabbr,\nacronym,\naddress,\nbig,\ncite,\ncode,\ndel,\ndfn,\nem,\nimg,\nins,\nkbd,\nq,\ns,\nsamp,\nsmall,\nstrike,\nstrong,\nsub,\nsup,\ntt,\nvar,\nb,\nu,\ni,\ncenter,\ndl,\ndt,\ndd,\nol,\nul,\nli,\nfieldset,\nform,\nlabel,\nlegend,\ntable,\ncaption,\ntbody,\ntfoot,\nthead,\ntr,\nth,\ntd,\narticle,\naside,\ncanvas,\ndetails,\nembed,\nfigure,\nfigcaption,\nfooter,\nheader,\nhgroup,\nmenu,\nnav,\noutput,\nruby,\nsection,\nsummary,\ntime,\nmark,\naudio,\nvideo {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font-size: 100%;\n  font: inherit;\n  vertical-align: baseline; }\n\n/* HTML5 display-role reset for older browsers */\narticle,\naside,\ndetails,\nfigcaption,\nfigure,\nfooter,\nheader,\nhgroup,\nmenu,\nnav,\nsection {\n  display: block; }\n\nbody {\n  line-height: 1; }\n\nol,\nul {\n  list-style: none; }\n\nblockquote,\nq {\n  quotes: none; }\n\nblockquote:before,\nblockquote:after,\nq:before,\nq:after {\n  content: '';\n  content: none; }\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0; }\n", ""]);



/***/ }),

/***/ "../../node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************************************************************!*\
  !*** /Users/xave/Documents/Projects/aircall-everywhere/node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return '@media ' + item[2] + '{' + content + '}';
      } else {
        return content;
      }
    }).join('');
  }; // import a list of modules into the list


  list.i = function (modules, mediaQuery) {
    if (typeof modules === 'string') {
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    for (var i = 0; i < this.length; i++) {
      var id = this[i][0];

      if (id != null) {
        alreadyImportedModules[id] = true;
      }
    }

    for (i = 0; i < modules.length; i++) {
      var item = modules[i]; // skip already imported module
      // this implementation is not 100% perfect for weird media query combinations
      // when a module is imported multiple times with different media queries.
      // I hope this will never occur (Hey this way we have smaller bundles)

      if (item[0] == null || !alreadyImportedModules[item[0]]) {
        if (mediaQuery && !item[2]) {
          item[2] = mediaQuery;
        } else if (mediaQuery) {
          item[2] = '(' + item[2] + ') and (' + mediaQuery + ')';
        }

        list.push(item);
      }
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || '';
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;
  return '/*# ' + data + ' */';
}

/***/ }),

/***/ "../../node_modules/style-loader/lib/addStyles.js":
/*!****************************************************************************************************!*\
  !*** /Users/xave/Documents/Projects/aircall-everywhere/node_modules/style-loader/lib/addStyles.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target, parent) {
  if (parent){
    return parent.querySelector(target);
  }
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target, parent) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target, parent);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(/*! ./urls */ "../../node_modules/style-loader/lib/urls.js");

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertAt.before, target);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	if(options.attrs.nonce === undefined) {
		var nonce = getNonce();
		if (nonce) {
			options.attrs.nonce = nonce;
		}
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function getNonce() {
	if (false) {}

	return __webpack_require__.nc;
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = typeof options.transform === 'function'
		 ? options.transform(obj.css) 
		 : options.transform.default(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ "../../node_modules/style-loader/lib/urls.js":
/*!***********************************************************************************************!*\
  !*** /Users/xave/Documents/Projects/aircall-everywhere/node_modules/style-loader/lib/urls.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),

/***/ 0:
/*!****************************************************************************!*\
  !*** multi /Users/xave/Documents/Projects/aircall-everywhere/demo/demo.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/xave/Documents/Projects/aircall-everywhere/demo/demo.js */"../../demo/demo.js");


/***/ })

/******/ });
//# sourceMappingURL=demo.js.map