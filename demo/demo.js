/* demo.js */
import AircallPhone from 'aircall-everywhere';

console.log('demo time!');

const setPhoneVisibility = visible => {
  const phoneContainer = document.querySelector('#phone-container');
  if (!!visible) {
    phoneContainer.classList.remove('d-none');
  } else {
    phoneContainer.classList.add('d-none');
  }
};

const togglePhoneVisibility = () => {
  const phoneContainer = document.querySelector('#phone-container');
  if (phoneContainer.classList.contains('d-none')) {
    setPhoneVisibility(true);
  } else {
    setPhoneVisibility(false);
  }
};

const setStatusMessage = (selector, type, message) => {
  const statusBox = document.querySelector(selector);
  statusBox.classList.remove('alert-danger', 'alert-success', 'alert-warning', 'alert-info');
  statusBox.classList.add(`alert-${type}`);
  statusBox.textContent = message;
};

const setStatusData = (selector, data, label) => {
  const dataBox = document.querySelector(selector);
  const toPrettify = `${label}\n${JSON.stringify(data, null, 2)}`;
  dataBox.innerHTML = window.PR.prettyPrintOne(toPrettify);
};

const addLogLine = (selector, log) => {
  const logBox = document.querySelector(selector);
  const currentTime = new Date(Date.now());
  logBox.textContent = `${logBox.textContent}\n${currentTime.toLocaleTimeString()} - ${log}`;
};

const loadPhoneButton = document.querySelector('#load-phone-button');
const dialButton = document.querySelector('#dial-button');
const isLoginButton = document.querySelector('#is-login-button');

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

    const ap = new AircallPhone({
      domToLoadPhone: '#phone',
      phoneUrl: 'https://deploy-preview-2609--phone-preview.netlify.com/',
      onLogin: settings => {
        // we set data and status
        setStatusData('#user-info', settings, '//user informations');
        setStatusMessage('#phone-loading', 'success', 'Phone is loaded and ready to use!');
      },
      onLogout: () => {
        // we reset data and status
        setStatusData('#user-info', '', '//user informations');
        setStatusMessage('#phone-loading', 'danger', 'Phone is not loaded or logged in');
      }
    });

    ap.on('incoming_call', callInfos => {
      setPhoneVisibility(true);
      setStatusData('#call-info', callInfos, '// Incoming call');
      const message = `Incoming call from ${callInfos.from} to ${callInfos.to} ringing!`;
      addLogLine('#call-info-logs', message);
      setStatusMessage('#call-events', 'success', message);
    });

    ap.on('call_end_ringtone', callInfos => {
      setStatusData('#call-info', callInfos, '// Ringing ended');
      const message = `Ringing ended. call was ${callInfos.answer_status}`;
      addLogLine('#call-info-logs', message);
      setStatusMessage(
        '#call-events',
        callInfos.answer_status === 'answered' ? 'success' : 'warning',
        message
      );
    });

    ap.on('call_ended', callInfos => {
      setStatusData('#call-info', callInfos, '// Call ended');
      const message = `Call ended. Lasted ${callInfos.duration} seconds`;
      addLogLine('#call-info-logs', message);
      setStatusMessage('#call-events', 'warning', message);
    });

    ap.on('comment_saved', callInfos => {
      setStatusData('#call-info', callInfos, '// Comment on call');
      const message = 'Comment about the last call saved';
      addLogLine('#call-info-logs', message);
      setStatusMessage('#call-events', 'success', message);
    });

    ap.on('outgoing_call', callInfos => {
      setStatusData('#call-info', callInfos, '// Outgoing call');
      const message = `Outgoing call from ${callInfos.from} to ${callInfos.to} ...`;
      addLogLine('#call-info-logs', message);
      setStatusMessage('#call-events', 'success', message);
    });

    ap.on('outgoing_answered', callInfos => {
      setStatusData('#call-info', callInfos, '// Outgoing call');
      const message = 'Outgoing call answered!';
      addLogLine('#call-info-logs', message);
      setStatusMessage('#call-events', 'success', message);
    });

    dialButton.addEventListener(
      'click',
      () => {
        ap.send('dial_number', { phone_number: '+33123456789' }, (success, data) => {
          if (success) {
            setStatusMessage('#send-event-status-box', 'success', 'Success!');
          } else {
            setStatusMessage('#send-event-status-box', 'danger', data.message);
          }
        });
      },
      false
    );

    isLoginButton.addEventListener(
      'click',
      () => {
        ap.isLoggedIn(res => {
          res
            ? setStatusMessage('#send-event-status-box', 'info', 'Logged in')
            : setStatusMessage('#send-event-status-box', 'info', 'Logged out');
        });
      },
      false
    );
  },
  false
);
