/* demo.js */
import AircallWorkspace from 'aircall-everywhere';

import './reset.scss';
import './demo.scss';

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
    const aircallWorkspace = new AircallWorkspace({
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
