/* demo.js */
import AircallPhone from 'aircall-everywhere';

import './reset.scss';
import './demo.scss';

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
    const phone = new AircallPhone({
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
