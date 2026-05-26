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
/*!****************************************************************************!*\
  !*** /home/runner/work/aircall-everywhere/aircall-everywhere/demo/demo.js ***!
  \****************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var aircall_everywhere__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aircall-everywhere */ "../../node_modules/aircall-everywhere/dist/index.js");
/* harmony import */ var aircall_everywhere__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(aircall_everywhere__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _reset_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./reset.scss */ "../../demo/reset.scss");
/* harmony import */ var _reset_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_reset_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _demo_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./demo.scss */ "../../demo/demo.scss");
/* harmony import */ var _demo_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_demo_scss__WEBPACK_IMPORTED_MODULE_2__);
/* demo.js */





// Show phone
const setPhoneVisibility = (visible) => {
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
      onLogin: (settings) => {
        // we set data and status
        setStatusData('#user-info', settings, '// user informations');
        setStatusMessage('#phone-loading', 'success', 'Phone is loaded and ready to use!');
      },
      onLogout: () => {
        // we reset data and status
        setStatusData('#user-info', '', '// user informations');
        setStatusMessage('#phone-loading', 'danger', 'Phone is not loaded or logged in');
      },
    });

    // listeners
    // incoming call
    phone.on('incoming_call', (callInfos) => {
      setPhoneVisibility(true);
      const message = `Incoming call from ${callInfos.from} to ${callInfos.to} ringing!`;
      addCallLog('incoming_call', callInfos, message);
      setStatusMessage('#call-events', 'success', message);
    });

    // ringtone ended
    phone.on('call_end_ringtone', (callInfos) => {
      const message = `Ringing ended. call was ${callInfos.answer_status}`;
      addCallLog('call_end_ringtone', callInfos, message);
      setStatusMessage(
        '#call-events',
        callInfos.answer_status === 'answered' ? 'success' : 'warning',
        message
      );
    });

    // call ended
    phone.on('call_ended', (callInfos) => {
      const message = `Call ended. Lasted ${callInfos.duration} seconds`;
      addCallLog('call_ended', callInfos, message);
      setStatusMessage('#call-events', 'warning', message);
    });

    // comment saved
    phone.on('comment_saved', (callInfos) => {
      const message = 'Comment about the last call saved';
      addCallLog('comment_saved', callInfos, message);
      setStatusMessage('#call-events', 'success', message);
    });

    // outgoing call
    phone.on('outgoing_call', (callInfos) => {
      const message = `Outgoing call from ${callInfos.from} to ${callInfos.to} ...`;
      addCallLog('outgoing_call', callInfos, message);
      setStatusMessage('#call-events', 'success', message);
    });

    // outgoing call answered
    phone.on('outgoing_answered', (callInfos) => {
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
        phone.isLoggedIn((response) => {
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
/*!******************************************************************************!*\
  !*** /home/runner/work/aircall-everywhere/aircall-everywhere/demo/demo.scss ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js??ref--5-2!./demo.scss */ "../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js?!../../demo/demo.scss");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ "../../demo/reset.scss":
/*!*******************************************************************************!*\
  !*** /home/runner/work/aircall-everywhere/aircall-everywhere/demo/reset.scss ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js??ref--5-2!./reset.scss */ "../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js?!../../demo/reset.scss");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ "../../node_modules/aircall-everywhere/dist/index.js":
/*!*************************************************************************************************************!*\
  !*** /home/runner/work/aircall-everywhere/aircall-everywhere/node_modules/aircall-everywhere/dist/index.js ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports=function(e){var n={};function t(o){if(n[o])return n[o].exports;var i=n[o]={i:o,l:!1,exports:{}};return e[o].call(i.exports,i,i.exports,t),i.l=!0,i.exports}return t.m=e,t.c=n,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:o})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(t.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var i in e)t.d(o,i,function(n){return e[n]}.bind(null,i));return o},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=0)}([function(e,n,t){e.exports=t(1)},function(e,n,t){"use strict";function o(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function i(e,n){for(var t=0;t<n.length;t++){var o=n[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}t.r(n);var r=function(){function e(){var n=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{debug:!0};o(this,e),this.phoneWindow=null,this.integrationSettings={},this.path=null,this.userSettings={},this.eventsRegistered={},this.phoneLoginState=!1;var i=/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;this.phoneUrl=void 0!==t.phoneUrl&&!0===i.test(t.phoneUrl)?t.phoneUrl:"https://phone.aircall.io",this.domToLoadPhone=t.domToLoadPhone,this.integrationToLoad=t.integrationToLoad,this.path=t.path,this.debug=t.debug,this.size=t.size||"big",this.onLogin=function(){if("function"==typeof t.onLogin&&!1===n.phoneLoginState){n.phoneLoginState=!0;var e={user:n.userSettings};Object.keys(n.integrationSettings).length>0&&(e.settings=n.integrationSettings),t.onLogin(e)}},this.onLogout=function(){"function"==typeof t.onLogout&&t.onLogout()},this.w=t.window||window,this._messageListener(),this.domToLoadPhone&&this._createPhoneIframe()}var n,t,r;return n=e,(t=[{key:"_resetData",value:function(){this.phoneWindow=null,this.path=null,this.integrationSettings={},this.userSettings={},this.phoneLoginState=!1}},{key:"_createPhoneIframe",value:function(){var e="";switch(this.size){case"big":e="height:666px; width:376px;";break;case"small":e="height:600px; width:376px;";break;case"auto":e="height:100%; width:100%;"}try{document.querySelector(this.domToLoadPhone).innerHTML='<iframe allow="microphone; autoplay; clipboard-read; clipboard-write; hid" src="'.concat(this.getUrlToLoad(),'" style="').concat(e,'"></iframe>')}catch(e){this._log("error","[AircallEverywhere] [iframe creation] ".concat(this.domToLoadPhone," not be found. Error:"),e)}}},{key:"_messageListener",value:function(){var e=this;this.w.addEventListener("message",(function(n){if(e._log("info","[AircallEverywhere] [event listener] received event",n),!n.data||!n.data.name||!/^apm_phone_/.test(n.data.name))return!1;if("apm_phone_loaded"!==n.data.name){if("apm_phone_integration_settings"===n.data.name&&n.data.value)return e.integrationSettings=n.data.value,void e.onLogin();if("apm_phone_logout"===n.data.name)return e._resetData(),void e.onLogout();for(var t in e.eventsRegistered)n.data.name==="apm_phone_".concat(t)&&e.eventsRegistered[t](n.data.value)}else e._handleInitMessage(n)}),!1)}},{key:"_handleInitMessage",value:function(e){this.phoneWindow={source:e.source,origin:e.origin},e.data.value&&(this.userSettings=e.data.value),this.phoneWindow.source.postMessage({name:"apm_app_isready",path:this.path},this.phoneWindow.origin),this.integrationToLoad?this.phoneWindow.source.postMessage({name:"apm_app_get_settings",value:this.integrationToLoad},this.phoneWindow.origin):this.onLogin()}},{key:"_log",value:function(e){var n,t;if("string"!=typeof e)throw new Error("[AircallEverywhere] [_log] Must provide valid console action");if(this.debug){for(var o=arguments.length,i=new Array(o>1?o-1:0),r=1;r<o;r++)i[r-1]=arguments[r];console[e]?(n=console)[e].apply(n,i):(t=console).info.apply(t,i)}}},{key:"getUrlToLoad",value:function(){return"".concat(this.phoneUrl,"?integration=generic")}},{key:"on",value:function(e,n){if(!e||"function"!=typeof n)throw new Error("[AircallEverywhere] [on function] Invalid parameters format. Expected non empty string and function");this.eventsRegistered[e]=n}},{key:"_handleSendError",value:function(e,n){if(e&&e.code||(e={code:"unknown_error"}),e&&!e.message)switch(e.code){case"unknown_error":e.message="Unknown error. Contact aircall developers dev@aircall.io";break;case"no_event_name":e.message="Invalid parameter eventName. Expected an non empty string";break;case"not_ready":e.message='Aircall Phone has not been identified yet or is not ready. Wait for "onLogin" callback';break;case"no_answer":e.message="No answer from the phone. Check if the phone is logged in";break;case"invalid_response":e.message="Invalid response from the phone. Contact aircall developers dev@aircall.io";break;default:e.message="Generic error message"}this._log("error","[AircallEverywhere] [send function] ".concat(e.message)),"function"==typeof n&&n(!1,e)}},{key:"send",value:function(e,n,t){var o=this;if("function"!=typeof n||t||(t=n,n=void 0),!e)return this._handleSendError({code:"no_event_name"},t),!1;if(!this.phoneWindow||!this.phoneWindow.source)return this._handleSendError({code:"not_ready"},t),!1;var i=null;this.phoneWindow.source.postMessage({name:"apm_app_".concat(e),value:n},this.phoneWindow.origin),this.on("".concat(e,"_response"),(function(n){o.removeListener("".concat(e,"_response")),clearTimeout(i),n&&!1===n.success?o._handleSendError({code:n.errorCode,message:n.errorMessage},t):n&&!0===n.success?"function"==typeof t&&t(!0,n.data):o._handleSendError({code:"invalid_response"},t)})),i=setTimeout((function(){o.removeListener("".concat(e,"_response")),o._handleSendError({code:"no_answer"},t)}),2e3)}},{key:"removeListener",value:function(e){var n=this;return!!this.eventsRegistered[e]&&(Object.keys(this.eventsRegistered).filter((function(n){return n===e})).forEach((function(e){return delete n.eventsRegistered[e]})),!0)}},{key:"isLoggedIn",value:function(e){this.send("is_logged_in",(function(n){e(n)}))}}])&&i(n.prototype,t),r&&i(n,r),e}();n.default=r}]);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js?!../../demo/demo.scss":
/*!*********************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /home/runner/work/aircall-everywhere/aircall-everywhere/node_modules/css-loader/dist/cjs.js!/home/runner/work/aircall-everywhere/aircall-everywhere/node_modules/sass-loader/dist/cjs.js??ref--5-2!/home/runner/work/aircall-everywhere/aircall-everywhere/demo/demo.scss ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "../../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(true);
// Module
___CSS_LOADER_EXPORT___.push([module.i, "/* VARIABLES */\n/* FONTS */\n@font-face {\n  font-family: \"Fellix\";\n  src: url(\"https://cdn.aircall.io/fonts/Fellix-Light.otf\") format(\"opentype\");\n  font-weight: 300;\n  font-style: normal;\n}\n@font-face {\n  font-family: \"Fellix\";\n  src: url(\"https://cdn.aircall.io/fonts/Fellix-Regular.otf\") format(\"opentype\");\n  font-weight: 500;\n  font-style: normal;\n}\n@font-face {\n  font-family: \"Fellix\";\n  src: url(\"https://cdn.aircall.io/fonts/Fellix-Medium.otf\") format(\"opentype\");\n  font-weight: 600;\n  font-style: normal;\n}\n@font-face {\n  font-family: \"Fellix\";\n  src: url(\"https://cdn.aircall.io/fonts/Fellix-SemiBold.otf\") format(\"opentype\");\n  font-weight: 700;\n  font-style: normal;\n}\n/* GLOBAL */\n* {\n  box-sizing: border-box;\n}\n* ::-moz-selection {\n  background: rgba(162, 228, 184, 0.3);\n}\n* ::selection {\n  background: rgba(162, 228, 184, 0.3);\n}\n\nhtml,\nbody {\n  height: 100%;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n}\n\nbody {\n  font-family: \"Fellix\", Helvetica, Arial, sans-serif;\n  font-size: 15px;\n  color: #4b5054;\n  line-height: 1.4;\n}\n\nh1,\nh2,\nh3 {\n  font-weight: 700;\n  color: #000000;\n}\n\nh1 {\n  font-size: 42px;\n}\n\nh2 {\n  font-size: 32px;\n}\n\nh3 {\n  font-size: 20px;\n}\n\n.d-none {\n  display: none !important;\n}\n\n.d-flex {\n  display: flex !important;\n}\n\n/* HEADER */\nnav {\n  height: 90px;\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  display: flex;\n  background-color: #fff;\n  padding: 10px 2vw;\n  justify-content: space-between;\n  box-shadow: 0 1px 1px #f4f4f4;\n  z-index: 10;\n}\nnav .nav-content {\n  display: flex;\n  align-items: center;\n}\nnav .nav-content a {\n  margin: 0 1vw;\n  text-decoration: none;\n  font-weight: 600;\n  color: #4b5054;\n  transition: color 0.1s ease-in-out;\n}\nnav .nav-content a:hover {\n  color: #00b388;\n}\nnav .nav-content a#link-aircall {\n  display: flex;\n}\nnav .nav-content a#link-aircall img {\n  margin: auto 0;\n  position: relative;\n}\nnav .nav-content a#phone-aircall {\n  width: 30px;\n  display: flex;\n  cursor: pointer;\n}\nnav .nav-content a#phone-aircall img {\n  width: 30px;\n  margin: auto;\n}\n\n/* PHONE */\n#phone-container {\n  position: fixed;\n  top: 65px;\n  right: 10px;\n  z-index: 30;\n}\n#phone-container .arrow-up {\n  position: absolute;\n  right: 3.3vw;\n  top: -5px;\n  width: 0;\n  height: 0;\n  border-left: 5px solid transparent;\n  border-right: 5px solid transparent;\n  border-bottom: 5px solid #afafa9;\n}\n#phone-container #phone {\n  border-radius: 4px;\n  background-color: #fff;\n  border: 1px solid #afafa9;\n  overflow: hidden;\n  box-shadow: 0 5px 10px rgba(16, 24, 32, 0.3764705882);\n}\n#phone-container #phone iframe {\n  border-radius: 4px;\n}\n\n/* CONTENT */\n.jumbotron {\n  padding: 180px 10vw 0;\n}\n.jumbotron h1 {\n  text-align: center;\n  color: #000000;\n}\n.jumbotron p {\n  margin-top: 20px;\n  font-size: 20px;\n  text-align: center;\n}\n\ncode {\n  padding: 2px 4px;\n  background: #f4f4f4;\n  border-radius: 4px;\n  font-family: \"Operator\", Menlo, DejaVu Sans Mono, Monaco, Consolas, \"Courier New\", monospace;\n  font-size: 0.9em;\n}\n\npre {\n  font-family: \"Operator\", Menlo, DejaVu Sans Mono, Monaco, Consolas, \"Courier New\", monospace;\n}\npre.prettyprint {\n  width: 100% !important;\n  margin: 0 !important;\n  padding: 16px !important;\n  border-radius: 4px !important;\n  background: #40464d;\n  color: #d9d9d6;\n  overflow: hidden;\n}\npre.prettyprint code {\n  background: transparent;\n}\n\n.container {\n  position: relative;\n  padding: 3vw;\n  max-width: 1200px;\n  margin: auto;\n}\n.container h2 {\n  margin-top: 40px;\n}\n.container h2::before {\n  display: block;\n  height: 1px;\n  width: 100%;\n  margin-bottom: 40px;\n  background: #f4f4f4;\n  content: \"\";\n}\n.container a {\n  color: #00b388;\n  text-decoration: none;\n  font-weight: 600;\n  transition: color 0.1s ease-in-out;\n}\n.container a:hover {\n  color: #006c5b;\n}\n.container .row {\n  display: flex;\n  align-items: stretch;\n  padding: 20px 0;\n}\n.container .row:last-child {\n  padding-bottom: 0;\n}\n.container .row .left {\n  position: relative;\n  width: 60%;\n  padding-right: 4vw;\n}\n.container .row .left p {\n  margin-bottom: 1em;\n}\n.container .row .left pre.prettyprint {\n  background-color: #40464d !important;\n  width: auto !important;\n  flex-grow: 1;\n}\n.container .row .left .button {\n  margin-bottom: 20px;\n}\n.container .row .right {\n  width: 40%;\n}\n.container #installation {\n  padding-top: 40px;\n}\n.container #waiting-events {\n  margin: 40px 0;\n}\n.container #dial-button {\n  margin-top: 40px;\n}\n.container #call-events-log label {\n  position: relative;\n  display: block;\n  margin: 20px 0;\n}\n.container #call-events-log label > span {\n  display: block;\n  background-color: #003b4c;\n  font-family: \"Operator\", Menlo, DejaVu Sans Mono, Monaco, Consolas, \"Courier New\", monospace;\n  color: #fff;\n  padding: 10px 40px 10px 30px;\n  position: relative;\n  cursor: pointer;\n}\n.container #call-events-log label > span::after {\n  position: absolute;\n  content: \"+\";\n  color: #fff;\n  right: 30px;\n  top: 10px;\n}\n.container #call-events-log pre.prettyprint {\n  display: none;\n  height: 0;\n  overflow: hidden;\n}\n.container #call-events-log input {\n  display: none;\n}\n.container #call-events-log input:checked + label pre.prettyprint {\n  height: auto;\n  display: block;\n}\n.container #call-events-log input:checked + label > span::after {\n  content: \"-\";\n}\n\n.button {\n  display: block;\n  background-color: #00b388;\n  color: #fff;\n  font-weight: 600;\n  font-size: 15px;\n  border: none;\n  border-radius: 4px;\n  padding: 12px 20px;\n  cursor: pointer;\n  outline: none;\n  transition: background-color 0.1s ease-in-out;\n}\n.button:hover {\n  background-color: #006c5b;\n}\n.button:disabled {\n  background-color: #afafa9;\n  color: #fff;\n  cursor: not-allowed;\n}\n\n.alert {\n  margin: 20px auto;\n  padding: 10px 14px;\n  font-size: 0.95em;\n  border-radius: 4px;\n}\n.alert.alert-success {\n  color: #00b388;\n  box-shadow: 0 0 0 1px #00b388;\n}\n.alert.alert-danger {\n  color: #ff5c39;\n  box-shadow: 0 0 0 1px #ff5c39;\n}\n.alert.alert-warning {\n  color: #ff854c;\n  box-shadow: 0 0 0 1px #ff854c;\n}\n\n@media only screen and (max-width: 800px) {\n  .container .row {\n    flex-direction: column;\n  }\n  .container .row .left {\n    width: 100%;\n    padding: 0;\n  }\n  .container .row .right {\n    width: 100%;\n  }\n}", "",{"version":3,"sources":["webpack://../../demo/demo.scss"],"names":[],"mappings":"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","sourcesContent":["/* VARIABLES */\n\n$green: #00b388;\n$duck: #006c5b;\n$smoke: #afafa9;\n$midnight: #101820;\n$neon: #307fe2;\n$red: #ff5c39;\n$orange: #ff854c;\n$white: #fff;\n$smoke-lighten-80: #f4f4f4;\n\n$cyan: #003b4c;\n$cyan-dark: #00242d;\n\n$code-background: #40464d;\n$code-font-color: #d9d9d6;\n\n$border-radius: 4px;\n\n/* FONTS */\n\n$font-family-color: #4b5054;\n$font-family-title-color: #000000;\n\n$font-family-sans-serif: 'Fellix', sans-serif !default;\n$font-family-monospace: 'Operator', Menlo, DejaVu Sans Mono, Monaco, Consolas, 'Courier New',\n  monospace !default;\n\n$font-size-h1: 42px;\n$font-size-h2: 32px;\n$font-size-h3: 20px;\n$font-size-base: 15px;\n\n@font-face {\n  font-family: 'Fellix';\n  src: url('https://cdn.aircall.io/fonts/Fellix-Light.otf') format('opentype');\n  font-weight: 300;\n  font-style: normal;\n}\n\n@font-face {\n  font-family: 'Fellix';\n  src: url('https://cdn.aircall.io/fonts/Fellix-Regular.otf') format('opentype');\n  font-weight: 500;\n  font-style: normal;\n}\n\n@font-face {\n  font-family: 'Fellix';\n  src: url('https://cdn.aircall.io/fonts/Fellix-Medium.otf') format('opentype');\n  font-weight: 600;\n  font-style: normal;\n}\n\n@font-face {\n  font-family: 'Fellix';\n  src: url('https://cdn.aircall.io/fonts/Fellix-SemiBold.otf') format('opentype');\n  font-weight: 700;\n  font-style: normal;\n}\n\n/* GLOBAL */\n* {\n  box-sizing: border-box;\n  ::-moz-selection {\n    background: rgba(162, 228, 184, 0.3);\n  }\n  ::selection {\n    background: rgba(162, 228, 184, 0.3);\n  }\n}\n\nhtml,\nbody {\n  height: 100%;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n}\n\nbody {\n  font-family: 'Fellix', Helvetica, Arial, sans-serif;\n  font-size: $font-size-base;\n  color: $font-family-color;\n  line-height: 1.4;\n}\n\nh1,\nh2,\nh3 {\n  font-weight: 700;\n  color: $font-family-title-color;\n}\n\nh1 {\n  font-size: $font-size-h1;\n}\n\nh2 {\n  font-size: $font-size-h2;\n}\n\nh3 {\n  font-size: $font-size-h3;\n}\n\n.d-none {\n  display: none !important;\n}\n\n.d-flex {\n  display: flex !important;\n}\n\n/* HEADER */\n$nav-height: 90px;\nnav {\n  height: $nav-height;\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  display: flex;\n  background-color: $white;\n  padding: 10px 2vw;\n  justify-content: space-between;\n  box-shadow: 0 1px 1px $smoke-lighten-80;\n  z-index: 10;\n\n  .nav-content {\n    display: flex;\n    align-items: center;\n\n    a {\n      margin: 0 1vw;\n      text-decoration: none;\n      font-weight: 600;\n      color: $font-family-color;\n      transition: color 0.1s ease-in-out;\n\n      &:hover {\n        color: $green;\n      }\n\n      &#link-aircall {\n        display: flex;\n        img {\n          margin: auto 0;\n          position: relative;\n        }\n      }\n\n      &#phone-aircall {\n        width: 30px;\n        display: flex;\n        cursor: pointer;\n\n        img {\n          width: 30px;\n          margin: auto;\n        }\n      }\n    }\n  }\n}\n\n/* PHONE */\n\n#phone-container {\n  position: fixed;\n  top: 65px;\n  right: 10px;\n  z-index: 30;\n\n  .arrow-up {\n    position: absolute;\n    right: 3.3vw;\n    top: -5px;\n    width: 0;\n    height: 0;\n    border-left: 5px solid transparent;\n    border-right: 5px solid transparent;\n    border-bottom: 5px solid $smoke;\n  }\n\n  #phone {\n    border-radius: $border-radius;\n    background-color: $white;\n    border: 1px solid $smoke;\n    overflow: hidden;\n    box-shadow: 0 5px 10px #10182060;\n\n    iframe {\n      border-radius: $border-radius;\n    }\n  }\n}\n\n/* CONTENT */\n\n// Jumbotron\n.jumbotron {\n  padding: $nav-height * 2 10vw 0;\n\n  h1 {\n    text-align: center;\n    color: $font-family-title-color;\n  }\n\n  p {\n    margin-top: 20px;\n    font-size: $font-size-h3;\n    text-align: center;\n  }\n}\n\ncode {\n  padding: 2px 4px;\n  background: $smoke-lighten-80;\n  border-radius: $border-radius;\n  font-family: $font-family-monospace;\n  font-size: 0.9em;\n}\n\n// Code snippets\npre {\n  font-family: $font-family-monospace;\n\n  &.prettyprint {\n    width: 100% !important;\n    margin: 0 !important;\n    padding: 16px !important;\n    border-radius: $border-radius !important;\n    background: $code-background;\n    color: $code-font-color;\n    overflow: hidden;\n\n    code {\n      background: transparent;\n    }\n  }\n}\n\n// Container\n.container {\n  position: relative;\n  padding: 3vw;\n  max-width: 1200px;\n  margin: auto;\n\n  h2 {\n    margin-top: 40px;\n\n    &::before {\n      display: block;\n      height: 1px;\n      width: 100%;\n      margin-bottom: 40px;\n      background: $smoke-lighten-80;\n      content: '';\n    }\n  }\n\n  a {\n    color: $green;\n    text-decoration: none;\n    font-weight: 600;\n    transition: color 0.1s ease-in-out;\n\n    &:hover {\n      color: $duck;\n    }\n  }\n\n  // rows\n  .row {\n    display: flex;\n    align-items: stretch;\n    padding: 20px 0;\n\n    &:last-child {\n      padding-bottom: 0;\n    }\n\n    .left {\n      position: relative;\n      width: 60%;\n      padding-right: 4vw;\n\n      p {\n        margin-bottom: 1em;\n      }\n\n      pre.prettyprint {\n        background-color: $code-background !important;\n        width: auto !important;\n        flex-grow: 1;\n      }\n\n      .button {\n        margin-bottom: 20px;\n      }\n    }\n\n    .right {\n      width: 40%;\n    }\n  }\n\n  // specific stuff\n  #installation {\n    padding-top: 40px;\n  }\n\n  #waiting-events {\n    margin: 40px 0;\n  }\n\n  #dial-button {\n    margin-top: 40px;\n  }\n\n  // call events logs\n  #call-events-log {\n    label {\n      position: relative;\n      display: block;\n      margin: 20px 0;\n\n      > span {\n        display: block;\n        background-color: $cyan;\n        font-family: $font-family-monospace;\n        color: $white;\n        padding: 10px 40px 10px 30px;\n        position: relative;\n        cursor: pointer;\n\n        &::after {\n          position: absolute;\n          content: '+';\n          color: $white;\n          right: 30px;\n          top: 10px;\n        }\n      }\n    }\n\n    pre.prettyprint {\n      display: none;\n      height: 0;\n      overflow: hidden;\n    }\n\n    input {\n      display: none;\n\n      &:checked + label {\n        pre.prettyprint {\n          height: auto;\n          display: block;\n        }\n\n        > span::after {\n          content: '-';\n        }\n      }\n    }\n  }\n}\n\n// Buttons\n.button {\n  display: block;\n  background-color: $green;\n  color: $white;\n  font-weight: 600;\n  font-size: $font-size-base;\n  border: none;\n  border-radius: $border-radius;\n  padding: 12px 20px;\n  cursor: pointer;\n  outline: none;\n  transition: background-color 0.1s ease-in-out;\n\n  &:hover {\n    background-color: $duck;\n  }\n\n  &:disabled {\n    background-color: $smoke;\n    color: $white;\n    cursor: not-allowed;\n  }\n}\n\n// Alerts\n.alert {\n  margin: 20px auto;\n  padding: 10px 14px;\n  font-size: 0.95em;\n  border-radius: $border-radius;\n\n  &.alert-success {\n    color: $green;\n    box-shadow: 0 0 0 1px $green;\n  }\n\n  &.alert-danger {\n    color: $red;\n    box-shadow: 0 0 0 1px $red;\n  }\n\n  &.alert-warning {\n    color: $orange;\n    box-shadow: 0 0 0 1px $orange;\n  }\n}\n\n@media only screen and (max-width: 800px) {\n  .container .row {\n    flex-direction: column;\n\n    .left {\n      width: 100%;\n      padding: 0;\n    }\n\n    .right {\n      width: 100%;\n    }\n  }\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js?!../../demo/reset.scss":
/*!**********************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /home/runner/work/aircall-everywhere/aircall-everywhere/node_modules/css-loader/dist/cjs.js!/home/runner/work/aircall-everywhere/aircall-everywhere/node_modules/sass-loader/dist/cjs.js??ref--5-2!/home/runner/work/aircall-everywhere/aircall-everywhere/demo/reset.scss ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "../../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(true);
// Module
___CSS_LOADER_EXPORT___.push([module.i, "/* http://meyerweb.com/eric/tools/css/reset/ \n   v2.0 | 20110126\n   License: none (public domain)\n*/\nhtml,\nbody,\ndiv,\nspan,\napplet,\nobject,\niframe,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\np,\nblockquote,\npre,\na,\nabbr,\nacronym,\naddress,\nbig,\ncite,\ncode,\ndel,\ndfn,\nem,\nimg,\nins,\nkbd,\nq,\ns,\nsamp,\nsmall,\nstrike,\nstrong,\nsub,\nsup,\ntt,\nvar,\nb,\nu,\ni,\ncenter,\ndl,\ndt,\ndd,\nol,\nul,\nli,\nfieldset,\nform,\nlabel,\nlegend,\ntable,\ncaption,\ntbody,\ntfoot,\nthead,\ntr,\nth,\ntd,\narticle,\naside,\ncanvas,\ndetails,\nembed,\nfigure,\nfigcaption,\nfooter,\nheader,\nhgroup,\nmenu,\nnav,\noutput,\nruby,\nsection,\nsummary,\ntime,\nmark,\naudio,\nvideo {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font-size: 100%;\n  font: inherit;\n  vertical-align: baseline;\n}\n\n/* HTML5 display-role reset for older browsers */\narticle,\naside,\ndetails,\nfigcaption,\nfigure,\nfooter,\nheader,\nhgroup,\nmenu,\nnav,\nsection {\n  display: block;\n}\n\nbody {\n  line-height: 1;\n}\n\nol,\nul {\n  list-style: none;\n}\n\nblockquote,\nq {\n  quotes: none;\n}\n\nblockquote:before,\nblockquote:after,\nq:before,\nq:after {\n  content: \"\";\n  content: none;\n}\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}", "",{"version":3,"sources":["webpack://../../demo/reset.scss"],"names":[],"mappings":"AAAA;;;CAAA;AAKA;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;EAiFE,SAAA;EACA,UAAA;EACA,SAAA;EACA,eAAA;EACA,aAAA;EACA,wBAAA;AAAF;;AAEA,gDAAA;AACA;;;;;;;;;;;EAWE,cAAA;AACF;;AACA;EACE,cAAA;AAEF;;AAAA;;EAEE,gBAAA;AAGF;;AADA;;EAEE,YAAA;AAIF;;AAFA;;;;EAIE,WAAA;EACA,aAAA;AAKF;;AAHA;EACE,yBAAA;EACA,iBAAA;AAMF","sourcesContent":["/* http://meyerweb.com/eric/tools/css/reset/ \n   v2.0 | 20110126\n   License: none (public domain)\n*/\n\nhtml,\nbody,\ndiv,\nspan,\napplet,\nobject,\niframe,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\np,\nblockquote,\npre,\na,\nabbr,\nacronym,\naddress,\nbig,\ncite,\ncode,\ndel,\ndfn,\nem,\nimg,\nins,\nkbd,\nq,\ns,\nsamp,\nsmall,\nstrike,\nstrong,\nsub,\nsup,\ntt,\nvar,\nb,\nu,\ni,\ncenter,\ndl,\ndt,\ndd,\nol,\nul,\nli,\nfieldset,\nform,\nlabel,\nlegend,\ntable,\ncaption,\ntbody,\ntfoot,\nthead,\ntr,\nth,\ntd,\narticle,\naside,\ncanvas,\ndetails,\nembed,\nfigure,\nfigcaption,\nfooter,\nheader,\nhgroup,\nmenu,\nnav,\noutput,\nruby,\nsection,\nsummary,\ntime,\nmark,\naudio,\nvideo {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font-size: 100%;\n  font: inherit;\n  vertical-align: baseline;\n}\n/* HTML5 display-role reset for older browsers */\narticle,\naside,\ndetails,\nfigcaption,\nfigure,\nfooter,\nheader,\nhgroup,\nmenu,\nnav,\nsection {\n  display: block;\n}\nbody {\n  line-height: 1;\n}\nol,\nul {\n  list-style: none;\n}\nblockquote,\nq {\n  quotes: none;\n}\nblockquote:before,\nblockquote:after,\nq:before,\nq:after {\n  content: '';\n  content: none;\n}\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../../node_modules/css-loader/dist/runtime/api.js":
/*!***********************************************************************************************************!*\
  !*** /home/runner/work/aircall-everywhere/aircall-everywhere/node_modules/css-loader/dist/runtime/api.js ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || '').concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),

/***/ "../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!**********************************************************************************************************************************!*\
  !*** /home/runner/work/aircall-everywhere/aircall-everywhere/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \**********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : undefined;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ 0:
/*!**********************************************************************************!*\
  !*** multi /home/runner/work/aircall-everywhere/aircall-everywhere/demo/demo.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/runner/work/aircall-everywhere/aircall-everywhere/demo/demo.js */"../../demo/demo.js");


/***/ })

/******/ });
//# sourceMappingURL=demo.js.map