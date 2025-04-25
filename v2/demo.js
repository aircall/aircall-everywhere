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

/***/ "../../demo_v2/demo.js":
/*!*******************************************************************************!*\
  !*** /home/runner/work/aircall-everywhere/aircall-everywhere/demo_v2/demo.js ***!
  \*******************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var aircall_everywhere__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aircall-everywhere */ "../../index.js");
/* harmony import */ var _reset_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./reset.scss */ "../../demo_v2/reset.scss");
/* harmony import */ var _reset_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_reset_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _demo_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./demo.scss */ "../../demo_v2/demo.scss");
/* harmony import */ var _demo_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_demo_scss__WEBPACK_IMPORTED_MODULE_2__);
/* demo.js */





console.log('demo time!');

// Show workspace
const setAircallWorkspaceVisibility = (visible) => {
  const workspaceContainer = document.querySelector('#workspace-container');
  if (!!visible) {
    workspaceContainer.classList.remove('d-none');
  } else {
    workspaceContainer.classList.add('d-none');
  }
};

// toogle workspace
const toggleWorkspaceVisibility = () => {
  const workspaceContainer = document.querySelector('#workspace-container');
  if (workspaceContainer.classList.contains('d-none')) {
    setAircallWorkspaceVisibility(true);
  } else {
    setAircallWorkspaceVisibility(false);
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
const loadWorkspaceButton = document.querySelector('#load-workspace-button');
const dialButton = document.querySelector('#dial-button');
const isLoginButton = document.querySelector('#is-login-button');

// loading workspace button clicked
loadWorkspaceButton.addEventListener(
  'click',
  () => {
    // we show the workspace
    // workspace icon
    const workspaceButtonIcon = document.querySelector('#workspace-aircall');
    workspaceButtonIcon.classList.remove('d-none');
    // workspace visibility
    setAircallWorkspaceVisibility(true);

    // we add listener to toogle via icon
    workspaceButtonIcon.addEventListener('click', () => {
      toggleWorkspaceVisibility();
    });

    // we don't allow to load workspace again
    loadWorkspaceButton.disabled = true;
    // we allow the send events to workspace related buttons
    dialButton.disabled = false;
    isLoginButton.disabled = false;

    // we load the workspace via the library
    const aircallWorkspace = new aircall_everywhere__WEBPACK_IMPORTED_MODULE_0__["default"]({
      domToLoadWorkspace: '#workspace',
      onLogin: (settings) => {
        // we set data and status
        setStatusData('#user-info', settings, '// user informations');
        setStatusMessage('#workspace-loading', 'success', 'Workspace is loaded and ready to use!');
      },
      onLogout: () => {
        // we reset data and status
        setStatusData('#user-info', '', '// user informations');
        setStatusMessage('#workspace-loading', 'danger', 'Workspace is not loaded or logged in');
      },
    });

    // listeners
    // incoming call
    aircallWorkspace.on('incoming_call', (callInfos) => {
      setAircallWorkspaceVisibility(true);
      const message = `Incoming call from ${callInfos.from} to ${callInfos.to} ringing!`;
      addCallLog('incoming_call', callInfos, message);
      setStatusMessage('#call-events', 'success', message);
    });

    // ringtone ended
    aircallWorkspace.on('call_end_ringtone', (callInfos) => {
      const message = `Ringing ended. call was ${callInfos.answer_status}`;
      addCallLog('call_end_ringtone', callInfos, message);
      setStatusMessage(
        '#call-events',
        callInfos.answer_status === 'answered' ? 'success' : 'warning',
        message
      );
    });

    // call ended
    aircallWorkspace.on('call_ended', (callInfos) => {
      const message = `Call ended. Lasted ${callInfos.duration} seconds`;
      addCallLog('call_ended', callInfos, message);
      setStatusMessage('#call-events', 'warning', message);
    });

    // comment saved
    aircallWorkspace.on('comment_saved', (callInfos) => {
      const message = 'Comment about the last call saved';
      addCallLog('comment_saved', callInfos, message);
      setStatusMessage('#call-events', 'success', message);
    });

    // outgoing call
    aircallWorkspace.on('outgoing_call', (callInfos) => {
      const message = `Outgoing call from ${callInfos.from} to ${callInfos.to} ...`;
      addCallLog('outgoing_call', callInfos, message);
      setStatusMessage('#call-events', 'success', message);
    });

    // outgoing call answered
    aircallWorkspace.on('outgoing_answered', (callInfos) => {
      const message = 'Outgoing call answered!';
      addCallLog('outgoing_answered', callInfos, message);
      setStatusMessage('#call-events', 'success', message);
    });

    // dial button clicked
    dialButton.addEventListener(
      'click',
      () => {
        aircallWorkspace.send('dial_number', { phone_number: '+33123456789' }, (success, data) => {
          setAircallWorkspaceVisibility(true);
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
        aircallWorkspace.isLoggedIn((response) => {
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

/***/ "../../demo_v2/demo.scss":
/*!*********************************************************************************!*\
  !*** /home/runner/work/aircall-everywhere/aircall-everywhere/demo_v2/demo.scss ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js??ref--5-2!./demo.scss */ "../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js?!../../demo_v2/demo.scss");

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

/***/ "../../demo_v2/reset.scss":
/*!**********************************************************************************!*\
  !*** /home/runner/work/aircall-everywhere/aircall-everywhere/demo_v2/reset.scss ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js??ref--5-2!./reset.scss */ "../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js?!../../demo_v2/reset.scss");

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

/***/ "../../index.js":
/*!************************************************************************!*\
  !*** /home/runner/work/aircall-everywhere/aircall-everywhere/index.js ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_javascripts_aircallWorkspace_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/javascripts/aircallWorkspace.js */ "../../src/javascripts/aircallWorkspace.js");


/* harmony default export */ __webpack_exports__["default"] = (_src_javascripts_aircallWorkspace_js__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js?!../../demo_v2/demo.scss":
/*!************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /home/runner/work/aircall-everywhere/aircall-everywhere/node_modules/css-loader/dist/cjs.js!/home/runner/work/aircall-everywhere/aircall-everywhere/node_modules/sass-loader/dist/cjs.js??ref--5-2!/home/runner/work/aircall-everywhere/aircall-everywhere/demo_v2/demo.scss ***!
  \************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "../../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(true);
// Module
___CSS_LOADER_EXPORT___.push([module.i, "/* VARIABLES */\n/* FONTS */\n@font-face {\n  font-family: \"Fellix\";\n  src: url(\"https://cdn.aircall.io/fonts/Fellix-Light.otf\") format(\"opentype\");\n  font-weight: 300;\n  font-style: normal;\n}\n@font-face {\n  font-family: \"Fellix\";\n  src: url(\"https://cdn.aircall.io/fonts/Fellix-Regular.otf\") format(\"opentype\");\n  font-weight: 500;\n  font-style: normal;\n}\n@font-face {\n  font-family: \"Fellix\";\n  src: url(\"https://cdn.aircall.io/fonts/Fellix-Medium.otf\") format(\"opentype\");\n  font-weight: 600;\n  font-style: normal;\n}\n@font-face {\n  font-family: \"Fellix\";\n  src: url(\"https://cdn.aircall.io/fonts/Fellix-SemiBold.otf\") format(\"opentype\");\n  font-weight: 700;\n  font-style: normal;\n}\n/* GLOBAL */\n* {\n  box-sizing: border-box;\n}\n* ::-moz-selection {\n  background: rgba(162, 228, 184, 0.3);\n}\n* ::selection {\n  background: rgba(162, 228, 184, 0.3);\n}\n\nhtml,\nbody {\n  height: 100%;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n}\n\nbody {\n  font-family: \"Fellix\", Helvetica, Arial, sans-serif;\n  font-size: 15px;\n  color: #4b5054;\n  line-height: 1.4;\n}\n\nh1,\nh2,\nh3 {\n  font-weight: 700;\n  color: #000000;\n}\n\nh1 {\n  font-size: 42px;\n}\n\nh2 {\n  font-size: 32px;\n}\n\nh3 {\n  font-size: 20px;\n}\n\n.d-none {\n  display: none !important;\n}\n\n.d-flex {\n  display: flex !important;\n}\n\n/* HEADER */\nnav {\n  height: 90px;\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  display: flex;\n  background-color: #fff;\n  padding: 10px 2vw;\n  justify-content: space-between;\n  box-shadow: 0 1px 1px #f4f4f4;\n  z-index: 10;\n}\nnav .nav-content {\n  display: flex;\n  align-items: center;\n}\nnav .nav-content a {\n  margin: 0 1vw;\n  text-decoration: none;\n  font-weight: 600;\n  color: #4b5054;\n  transition: color 0.1s ease-in-out;\n}\nnav .nav-content a:hover {\n  color: #00b388;\n}\nnav .nav-content a#link-aircall {\n  display: flex;\n}\nnav .nav-content a#link-aircall img {\n  margin: auto 0;\n  position: relative;\n}\nnav .nav-content a#workspace-aircall {\n  width: 30px;\n  display: flex;\n  cursor: pointer;\n}\nnav .nav-content a#workspace-aircall img {\n  width: 30px;\n  margin: auto;\n}\n\n/* PHONE */\n#workspace-container {\n  position: fixed;\n  top: 65px;\n  right: 10px;\n  z-index: 30;\n}\n#workspace-container .arrow-up {\n  position: absolute;\n  right: 3.3vw;\n  top: -5px;\n  width: 0;\n  height: 0;\n  border-left: 5px solid transparent;\n  border-right: 5px solid transparent;\n  border-bottom: 5px solid #afafa9;\n}\n#workspace-container #workspace {\n  border-radius: 4px;\n  background-color: #fff;\n  border: 1px solid #afafa9;\n  overflow: hidden;\n  box-shadow: 0 5px 10px rgba(16, 24, 32, 0.3764705882);\n}\n#workspace-container #workspace iframe {\n  border-radius: 4px;\n}\n\n/* CONTENT */\n.jumbotron {\n  padding: 180px 10vw 0;\n}\n.jumbotron h1 {\n  text-align: center;\n  color: #000000;\n}\n.jumbotron p {\n  margin-top: 20px;\n  font-size: 20px;\n  text-align: center;\n}\n\ncode {\n  padding: 2px 4px;\n  background: #f4f4f4;\n  border-radius: 4px;\n  font-family: \"Operator\", Menlo, DejaVu Sans Mono, Monaco, Consolas, \"Courier New\", monospace;\n  font-size: 0.9em;\n}\n\npre {\n  font-family: \"Operator\", Menlo, DejaVu Sans Mono, Monaco, Consolas, \"Courier New\", monospace;\n}\npre.prettyprint {\n  width: 100% !important;\n  margin: 0 !important;\n  padding: 16px !important;\n  border-radius: 4px !important;\n  background: #40464d;\n  color: #d9d9d6;\n  overflow: hidden;\n}\npre.prettyprint code {\n  background: transparent;\n}\n\n.container {\n  position: relative;\n  padding: 3vw;\n  max-width: 1200px;\n  margin: auto;\n}\n.container h2 {\n  margin-top: 40px;\n}\n.container h2::before {\n  display: block;\n  height: 1px;\n  width: 100%;\n  margin-bottom: 40px;\n  background: #f4f4f4;\n  content: \"\";\n}\n.container a {\n  color: #00b388;\n  text-decoration: none;\n  font-weight: 600;\n  transition: color 0.1s ease-in-out;\n}\n.container a:hover {\n  color: #006c5b;\n}\n.container .row {\n  display: flex;\n  align-items: stretch;\n  padding: 20px 0;\n}\n.container .row:last-child {\n  padding-bottom: 0;\n}\n.container .row .left {\n  position: relative;\n  width: 60%;\n  padding-right: 4vw;\n}\n.container .row .left p {\n  margin-bottom: 1em;\n}\n.container .row .left pre.prettyprint {\n  background-color: #40464d !important;\n  width: auto !important;\n  flex-grow: 1;\n}\n.container .row .left .button {\n  margin-bottom: 20px;\n}\n.container .row .right {\n  width: 40%;\n}\n.container #installation {\n  padding-top: 40px;\n}\n.container #waiting-events {\n  margin: 40px 0;\n}\n.container #dial-button {\n  margin-top: 40px;\n}\n.container #call-events-log label {\n  position: relative;\n  display: block;\n  margin: 20px 0;\n}\n.container #call-events-log label > span {\n  display: block;\n  background-color: #003b4c;\n  font-family: \"Operator\", Menlo, DejaVu Sans Mono, Monaco, Consolas, \"Courier New\", monospace;\n  color: #fff;\n  padding: 10px 40px 10px 30px;\n  position: relative;\n  cursor: pointer;\n}\n.container #call-events-log label > span::after {\n  position: absolute;\n  content: \"+\";\n  color: #fff;\n  right: 30px;\n  top: 10px;\n}\n.container #call-events-log pre.prettyprint {\n  display: none;\n  height: 0;\n  overflow: hidden;\n}\n.container #call-events-log input {\n  display: none;\n}\n.container #call-events-log input:checked + label pre.prettyprint {\n  height: auto;\n  display: block;\n}\n.container #call-events-log input:checked + label > span::after {\n  content: \"-\";\n}\n\n.button {\n  display: block;\n  background-color: #00b388;\n  color: #fff;\n  font-weight: 600;\n  font-size: 15px;\n  border: none;\n  border-radius: 4px;\n  padding: 12px 20px;\n  cursor: pointer;\n  outline: none;\n  transition: background-color 0.1s ease-in-out;\n}\n.button:hover {\n  background-color: #006c5b;\n}\n.button:disabled {\n  background-color: #afafa9;\n  color: #fff;\n  cursor: not-allowed;\n}\n\n.alert {\n  margin: 20px auto;\n  padding: 10px 14px;\n  font-size: 0.95em;\n  border-radius: 4px;\n}\n.alert.alert-success {\n  color: #00b388;\n  box-shadow: 0 0 0 1px #00b388;\n}\n.alert.alert-danger {\n  color: #ff5c39;\n  box-shadow: 0 0 0 1px #ff5c39;\n}\n.alert.alert-warning {\n  color: #ff854c;\n  box-shadow: 0 0 0 1px #ff854c;\n}\n\n@media only screen and (max-width: 800px) {\n  .container .row {\n    flex-direction: column;\n  }\n  .container .row .left {\n    width: 100%;\n    padding: 0;\n  }\n  .container .row .right {\n    width: 100%;\n  }\n}", "",{"version":3,"sources":["webpack://../../demo_v2/demo.scss"],"names":[],"mappings":"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","sourcesContent":["/* VARIABLES */\n\n$green: #00b388;\n$duck: #006c5b;\n$smoke: #afafa9;\n$midnight: #101820;\n$neon: #307fe2;\n$red: #ff5c39;\n$orange: #ff854c;\n$white: #fff;\n$smoke-lighten-80: #f4f4f4;\n\n$cyan: #003b4c;\n$cyan-dark: #00242d;\n\n$code-background: #40464d;\n$code-font-color: #d9d9d6;\n\n$border-radius: 4px;\n\n/* FONTS */\n\n$font-family-color: #4b5054;\n$font-family-title-color: #000000;\n\n$font-family-sans-serif: 'Fellix', sans-serif !default;\n$font-family-monospace: 'Operator', Menlo, DejaVu Sans Mono, Monaco, Consolas, 'Courier New',\n  monospace !default;\n\n$font-size-h1: 42px;\n$font-size-h2: 32px;\n$font-size-h3: 20px;\n$font-size-base: 15px;\n\n@font-face {\n  font-family: 'Fellix';\n  src: url('https://cdn.aircall.io/fonts/Fellix-Light.otf') format('opentype');\n  font-weight: 300;\n  font-style: normal;\n}\n\n@font-face {\n  font-family: 'Fellix';\n  src: url('https://cdn.aircall.io/fonts/Fellix-Regular.otf') format('opentype');\n  font-weight: 500;\n  font-style: normal;\n}\n\n@font-face {\n  font-family: 'Fellix';\n  src: url('https://cdn.aircall.io/fonts/Fellix-Medium.otf') format('opentype');\n  font-weight: 600;\n  font-style: normal;\n}\n\n@font-face {\n  font-family: 'Fellix';\n  src: url('https://cdn.aircall.io/fonts/Fellix-SemiBold.otf') format('opentype');\n  font-weight: 700;\n  font-style: normal;\n}\n\n/* GLOBAL */\n* {\n  box-sizing: border-box;\n  ::-moz-selection {\n    background: rgba(162, 228, 184, 0.3);\n  }\n  ::selection {\n    background: rgba(162, 228, 184, 0.3);\n  }\n}\n\nhtml,\nbody {\n  height: 100%;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n}\n\nbody {\n  font-family: 'Fellix', Helvetica, Arial, sans-serif;\n  font-size: $font-size-base;\n  color: $font-family-color;\n  line-height: 1.4;\n}\n\nh1,\nh2,\nh3 {\n  font-weight: 700;\n  color: $font-family-title-color;\n}\n\nh1 {\n  font-size: $font-size-h1;\n}\n\nh2 {\n  font-size: $font-size-h2;\n}\n\nh3 {\n  font-size: $font-size-h3;\n}\n\n.d-none {\n  display: none !important;\n}\n\n.d-flex {\n  display: flex !important;\n}\n\n/* HEADER */\n$nav-height: 90px;\nnav {\n  height: $nav-height;\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  display: flex;\n  background-color: $white;\n  padding: 10px 2vw;\n  justify-content: space-between;\n  box-shadow: 0 1px 1px $smoke-lighten-80;\n  z-index: 10;\n\n  .nav-content {\n    display: flex;\n    align-items: center;\n\n    a {\n      margin: 0 1vw;\n      text-decoration: none;\n      font-weight: 600;\n      color: $font-family-color;\n      transition: color 0.1s ease-in-out;\n\n      &:hover {\n        color: $green;\n      }\n\n      &#link-aircall {\n        display: flex;\n        img {\n          margin: auto 0;\n          position: relative;\n        }\n      }\n\n      &#workspace-aircall {\n        width: 30px;\n        display: flex;\n        cursor: pointer;\n\n        img {\n          width: 30px;\n          margin: auto;\n        }\n      }\n    }\n  }\n}\n\n/* PHONE */\n\n#workspace-container {\n  position: fixed;\n  top: 65px;\n  right: 10px;\n  z-index: 30;\n\n  .arrow-up {\n    position: absolute;\n    right: 3.3vw;\n    top: -5px;\n    width: 0;\n    height: 0;\n    border-left: 5px solid transparent;\n    border-right: 5px solid transparent;\n    border-bottom: 5px solid $smoke;\n  }\n\n  #workspace {\n    border-radius: $border-radius;\n    background-color: $white;\n    border: 1px solid $smoke;\n    overflow: hidden;\n    box-shadow: 0 5px 10px #10182060;\n\n    iframe {\n      border-radius: $border-radius;\n    }\n  }\n}\n\n/* CONTENT */\n\n// Jumbotron\n.jumbotron {\n  padding: $nav-height * 2 10vw 0;\n\n  h1 {\n    text-align: center;\n    color: $font-family-title-color;\n  }\n\n  p {\n    margin-top: 20px;\n    font-size: $font-size-h3;\n    text-align: center;\n  }\n}\n\ncode {\n  padding: 2px 4px;\n  background: $smoke-lighten-80;\n  border-radius: $border-radius;\n  font-family: $font-family-monospace;\n  font-size: 0.9em;\n}\n\n// Code snippets\npre {\n  font-family: $font-family-monospace;\n\n  &.prettyprint {\n    width: 100% !important;\n    margin: 0 !important;\n    padding: 16px !important;\n    border-radius: $border-radius !important;\n    background: $code-background;\n    color: $code-font-color;\n    overflow: hidden;\n\n    code {\n      background: transparent;\n    }\n  }\n}\n\n// Container\n.container {\n  position: relative;\n  padding: 3vw;\n  max-width: 1200px;\n  margin: auto;\n\n  h2 {\n    margin-top: 40px;\n\n    &::before {\n      display: block;\n      height: 1px;\n      width: 100%;\n      margin-bottom: 40px;\n      background: $smoke-lighten-80;\n      content: '';\n    }\n  }\n\n  a {\n    color: $green;\n    text-decoration: none;\n    font-weight: 600;\n    transition: color 0.1s ease-in-out;\n\n    &:hover {\n      color: $duck;\n    }\n  }\n\n  // rows\n  .row {\n    display: flex;\n    align-items: stretch;\n    padding: 20px 0;\n\n    &:last-child {\n      padding-bottom: 0;\n    }\n\n    .left {\n      position: relative;\n      width: 60%;\n      padding-right: 4vw;\n\n      p {\n        margin-bottom: 1em;\n      }\n\n      pre.prettyprint {\n        background-color: $code-background !important;\n        width: auto !important;\n        flex-grow: 1;\n      }\n\n      .button {\n        margin-bottom: 20px;\n      }\n    }\n\n    .right {\n      width: 40%;\n    }\n  }\n\n  // specific stuff\n  #installation {\n    padding-top: 40px;\n  }\n\n  #waiting-events {\n    margin: 40px 0;\n  }\n\n  #dial-button {\n    margin-top: 40px;\n  }\n\n  // call events logs\n  #call-events-log {\n    label {\n      position: relative;\n      display: block;\n      margin: 20px 0;\n\n      > span {\n        display: block;\n        background-color: $cyan;\n        font-family: $font-family-monospace;\n        color: $white;\n        padding: 10px 40px 10px 30px;\n        position: relative;\n        cursor: pointer;\n\n        &::after {\n          position: absolute;\n          content: '+';\n          color: $white;\n          right: 30px;\n          top: 10px;\n        }\n      }\n    }\n\n    pre.prettyprint {\n      display: none;\n      height: 0;\n      overflow: hidden;\n    }\n\n    input {\n      display: none;\n\n      &:checked + label {\n        pre.prettyprint {\n          height: auto;\n          display: block;\n        }\n\n        > span::after {\n          content: '-';\n        }\n      }\n    }\n  }\n}\n\n// Buttons\n.button {\n  display: block;\n  background-color: $green;\n  color: $white;\n  font-weight: 600;\n  font-size: $font-size-base;\n  border: none;\n  border-radius: $border-radius;\n  padding: 12px 20px;\n  cursor: pointer;\n  outline: none;\n  transition: background-color 0.1s ease-in-out;\n\n  &:hover {\n    background-color: $duck;\n  }\n\n  &:disabled {\n    background-color: $smoke;\n    color: $white;\n    cursor: not-allowed;\n  }\n}\n\n// Alerts\n.alert {\n  margin: 20px auto;\n  padding: 10px 14px;\n  font-size: 0.95em;\n  border-radius: $border-radius;\n\n  &.alert-success {\n    color: $green;\n    box-shadow: 0 0 0 1px $green;\n  }\n\n  &.alert-danger {\n    color: $red;\n    box-shadow: 0 0 0 1px $red;\n  }\n\n  &.alert-warning {\n    color: $orange;\n    box-shadow: 0 0 0 1px $orange;\n  }\n}\n\n@media only screen and (max-width: 800px) {\n  .container .row {\n    flex-direction: column;\n\n    .left {\n      width: 100%;\n      padding: 0;\n    }\n\n    .right {\n      width: 100%;\n    }\n  }\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js?!../../demo_v2/reset.scss":
/*!*************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /home/runner/work/aircall-everywhere/aircall-everywhere/node_modules/css-loader/dist/cjs.js!/home/runner/work/aircall-everywhere/aircall-everywhere/node_modules/sass-loader/dist/cjs.js??ref--5-2!/home/runner/work/aircall-everywhere/aircall-everywhere/demo_v2/reset.scss ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "../../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(true);
// Module
___CSS_LOADER_EXPORT___.push([module.i, "/* http://meyerweb.com/eric/tools/css/reset/ \n   v2.0 | 20110126\n   License: none (public domain)\n*/\nhtml,\nbody,\ndiv,\nspan,\napplet,\nobject,\niframe,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\np,\nblockquote,\npre,\na,\nabbr,\nacronym,\naddress,\nbig,\ncite,\ncode,\ndel,\ndfn,\nem,\nimg,\nins,\nkbd,\nq,\ns,\nsamp,\nsmall,\nstrike,\nstrong,\nsub,\nsup,\ntt,\nvar,\nb,\nu,\ni,\ncenter,\ndl,\ndt,\ndd,\nol,\nul,\nli,\nfieldset,\nform,\nlabel,\nlegend,\ntable,\ncaption,\ntbody,\ntfoot,\nthead,\ntr,\nth,\ntd,\narticle,\naside,\ncanvas,\ndetails,\nembed,\nfigure,\nfigcaption,\nfooter,\nheader,\nhgroup,\nmenu,\nnav,\noutput,\nruby,\nsection,\nsummary,\ntime,\nmark,\naudio,\nvideo {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font-size: 100%;\n  font: inherit;\n  vertical-align: baseline;\n}\n\n/* HTML5 display-role reset for older browsers */\narticle,\naside,\ndetails,\nfigcaption,\nfigure,\nfooter,\nheader,\nhgroup,\nmenu,\nnav,\nsection {\n  display: block;\n}\n\nbody {\n  line-height: 1;\n}\n\nol,\nul {\n  list-style: none;\n}\n\nblockquote,\nq {\n  quotes: none;\n}\n\nblockquote:before,\nblockquote:after,\nq:before,\nq:after {\n  content: \"\";\n  content: none;\n}\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}", "",{"version":3,"sources":["webpack://../../demo_v2/reset.scss"],"names":[],"mappings":"AAAA;;;CAAA;AAKA;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;EAiFE,SAAA;EACA,UAAA;EACA,SAAA;EACA,eAAA;EACA,aAAA;EACA,wBAAA;AAAF;;AAEA,gDAAA;AACA;;;;;;;;;;;EAWE,cAAA;AACF;;AACA;EACE,cAAA;AAEF;;AAAA;;EAEE,gBAAA;AAGF;;AADA;;EAEE,YAAA;AAIF;;AAFA;;;;EAIE,WAAA;EACA,aAAA;AAKF;;AAHA;EACE,yBAAA;EACA,iBAAA;AAMF","sourcesContent":["/* http://meyerweb.com/eric/tools/css/reset/ \n   v2.0 | 20110126\n   License: none (public domain)\n*/\n\nhtml,\nbody,\ndiv,\nspan,\napplet,\nobject,\niframe,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\np,\nblockquote,\npre,\na,\nabbr,\nacronym,\naddress,\nbig,\ncite,\ncode,\ndel,\ndfn,\nem,\nimg,\nins,\nkbd,\nq,\ns,\nsamp,\nsmall,\nstrike,\nstrong,\nsub,\nsup,\ntt,\nvar,\nb,\nu,\ni,\ncenter,\ndl,\ndt,\ndd,\nol,\nul,\nli,\nfieldset,\nform,\nlabel,\nlegend,\ntable,\ncaption,\ntbody,\ntfoot,\nthead,\ntr,\nth,\ntd,\narticle,\naside,\ncanvas,\ndetails,\nembed,\nfigure,\nfigcaption,\nfooter,\nheader,\nhgroup,\nmenu,\nnav,\noutput,\nruby,\nsection,\nsummary,\ntime,\nmark,\naudio,\nvideo {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font-size: 100%;\n  font: inherit;\n  vertical-align: baseline;\n}\n/* HTML5 display-role reset for older browsers */\narticle,\naside,\ndetails,\nfigcaption,\nfigure,\nfooter,\nheader,\nhgroup,\nmenu,\nnav,\nsection {\n  display: block;\n}\nbody {\n  line-height: 1;\n}\nol,\nul {\n  list-style: none;\n}\nblockquote,\nq {\n  quotes: none;\n}\nblockquote:before,\nblockquote:after,\nq:before,\nq:after {\n  content: '';\n  content: none;\n}\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n"],"sourceRoot":""}]);
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

/***/ "../../src/javascripts/aircallWorkspace.js":
/*!***************************************************************************************************!*\
  !*** /home/runner/work/aircall-everywhere/aircall-everywhere/src/javascripts/aircallWorkspace.js ***!
  \***************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class AircallWorkspace {
  constructor(opts = { debug: true }) {
    // internal vars
    // window object of loaded aircall phone
    this.workspaceWindow = null;
    this.integrationSettings = {};
    this.path = null;
    this.userSettings = {};
    this.eventsRegistered = {};

    this.workspaceLoginState = false;

    const URL_REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;

    // options passed
    this.workspaceUrl =
      opts.workspaceUrl !== undefined && URL_REGEX.test(opts.workspaceUrl) === true
        ? opts.workspaceUrl
        : 'https://workspace.aircall.io';
    this.domToLoadWorkspace = opts.domToLoadWorkspace;
    this.integrationToLoad = opts.integrationToLoad;
    this.path = opts.path;
    this.debug = opts.debug;

    // 3 different sizes: big/small/auto
    this.size = opts.size || 'big';

    this.onLogin = () => {
      if (typeof opts.onLogin === 'function' && this.workspaceLoginState === false) {
        this.workspaceLoginState = true;
        const data = {
          user: this.userSettings,
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

    // load workspace in specified dom
    if (!!this.domToLoadWorkspace) {
      this._createWorkspaceIframe();
    }
  }

  _resetData() {
    this.workspaceWindow = null;
    this.path = null;
    this.integrationSettings = {};
    this.userSettings = {};
    this.workspaceLoginState = false;
  }

  _createWorkspaceIframe() {
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
      const el = document.querySelector(this.domToLoadWorkspace);
      el.innerHTML = `<iframe allow="microphone; autoplay; clipboard-read; clipboard-write; hid" src="${this.getUrlToLoad()}" style="${sizeStyle}"></iframe>`;
    } catch (e) {
      // couldnt query the dom wanted
      this._log(
        'error',
        `[AircallEverywhere] [iframe creation] ${this.domToLoadWorkspace} not be found. Error:`,
        e
      );
    }
  }

  _messageListener() {
    this.w.addEventListener(
      'message',
      (event) => {
        this._log('info', '[AircallEverywhere] [event listener] received event', event);
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
    this.workspaceWindow = {
      source: event.source,
      origin: event.origin,
    };

    if (!!event.data.value) {
      this.userSettings = event.data.value;
    }

    // we answer init
    this.workspaceWindow.source.postMessage(
      { name: 'apm_app_isready', path: this.path },
      this.workspaceWindow.origin
    );

    // we ask for integration settings
    if (!!this.integrationToLoad) {
      this.workspaceWindow.source.postMessage(
        { name: 'apm_app_get_settings', value: this.integrationToLoad },
        this.workspaceWindow.origin
      );
    } else {
      // init callback now if present
      this.onLogin();
    }
  }

  _log(action, ...restArguments) {
    if (typeof action !== 'string') {
      throw new Error('[AircallEverywhere] [_log] Must provide valid console action');
    }

    // logging turned off, don't do anything
    if (!this.debug) {
      return;
    }

    // if valid action, execute with given args, otherwise default to info
    console[action] ? console[action](...restArguments) : console.info(...restArguments);
  }

  getUrlToLoad() {
    return `${this.workspaceUrl}?integration=generic`;
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
        code: 'unknown_error',
      };
    }
    // errors sent by the workspace for specific events are not handled since they should have their code AND message
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
            'Aircall Workspace has not been identified yet or is not ready. Wait for "onLogin" callback';
          break;
        case 'no_answer':
          error.message = 'No answer from the workspace. Check if the workspace is logged in';
          break;
        case 'invalid_response':
          error.message =
            'Invalid response from the workspace. Contact aircall developers dev@aircall.io';
          break;
        default:
          // specific error without a message. Should not happen
          error.message = 'Generic error message';
          break;
      }
    }

    // we log the error
    this._log('error', `[AircallEverywhere] [send function] ${error.message}`);

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

    if (!!this.workspaceWindow && !!this.workspaceWindow.source) {
      let responseTimeout = null;
      let timeoutLimit = 2000;

      // we send the message
      this.workspaceWindow.source.postMessage(
        { name: `apm_app_${eventName}`, value: data },
        this.workspaceWindow.origin
      );

      // we wait for a response to this message
      this.on(`${eventName}_response`, (response) => {
        // we have a response, we remove listener and return the callback
        this.removeListener(`${eventName}_response`);
        clearTimeout(responseTimeout);
        // we evaluate response
        if (!!response && response.success === false) {
          // workspace answers with an error
          this._handleSendError(
            { code: response.errorCode, message: response.errorMessage },
            callback
          );
        } else if (!!response && response.success === true) {
          // workspace answer a succes with its response
          if (typeof callback === 'function') {
            callback(true, response.data);
          }
        } else {
          // workspace answer is invalid
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
      .filter((key) => key === eventName)
      .forEach((key) => delete this.eventsRegistered[key]);
    return true;
  }

  isLoggedIn(callback) {
    // we simply send an event and send its result.
    this.send('is_logged_in', (success) => {
      callback(success);
    });
  }
}

/* harmony default export */ __webpack_exports__["default"] = (AircallWorkspace);


/***/ }),

/***/ 0:
/*!*************************************************************************************!*\
  !*** multi /home/runner/work/aircall-everywhere/aircall-everywhere/demo_v2/demo.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/runner/work/aircall-everywhere/aircall-everywhere/demo_v2/demo.js */"../../demo_v2/demo.js");


/***/ })

/******/ });
//# sourceMappingURL=demo.js.map