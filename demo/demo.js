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
  statusBox.classList.remove('alert-danger', 'alert-success');
  statusBox.classList.add(`alert-${type}`);
  statusBox.textContent = message;
};

const setStatusData = (selector, data) => {
  const dataBox = document.querySelector(selector);
  dataBox.innerHTML = window.PR.prettyPrintOne(JSON.stringify(data, null, 2));
};

const loadPhoneButton = document.querySelector('#load-phone-button');

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

    const ap = new AircallPhone({
      domToLoadPhone: '#phone',
      onLogin: settings => {
        // we set data and status
        setStatusData('#user-info', settings);
        setStatusMessage('#phone-loading', 'success', 'Phone is loaded and ready to use!');
      },
      onLogout: () => {
        // we reset data and status
        setStatusData('#user-info', 'user settings...');
        setStatusMessage('#phone-loading', 'danger', 'Phone is not loaded or logged in');
      }
    });

    let inCallAlert = document.querySelector('#in-call');
    let notInCallAlert = document.querySelector('#not-in-call');
    ap.on('incoming_call', callInfos => {
      console.log('incoming call:', callInfos);
      inCallAlert.classList.remove('d-none');
      notInCallAlert.classList.add('d-none');
    });

    ap.on('outgoing_call', callInfos => {
      console.log('outgoing call:', callInfos);
    });

    ap.on('call_end_ringtone', status => {
      console.log('ringtone:', status);
      inCallAlert.classList.add('d-none');
      notInCallAlert.classList.remove('d-none');
    });

    let dialButton = document.querySelector('#dial-button');
    let dialSuccessAlert = document.querySelector('#dial-number-success');
    let dialErrorAlert = document.querySelector('#dial-number-error');
    dialButton.addEventListener(
      'click',
      () => {
        ap.send('dial_number', { phone_number: '+33123456789' }, (success, data) => {
          if (success) {
            dialSuccessAlert.classList.remove('d-none');
          } else {
            dialErrorAlert.textContent = 'Error : ' + data.message;
            dialErrorAlert.classList.remove('d-none');
          }

          setTimeout(() => {
            dialSuccessAlert.classList.add('d-none');
            dialErrorAlert.classList.add('d-none');
          }, 2000);
        });
      },
      false
    );

    let isLoginButton = document.querySelector('#is-login-button');
    let isLoggedInAlert = document.querySelector('#is-logged-in');
    let isLoggedOutAlert = document.querySelector('#is-logged-out');
    isLoginButton.addEventListener(
      'click',
      () => {
        ap.isLoggedIn(res => {
          res
            ? isLoggedInAlert.classList.remove('d-none')
            : isLoggedOutAlert.classList.remove('d-none');
          setTimeout(() => {
            isLoggedInAlert.classList.add('d-none');
            isLoggedOutAlert.classList.add('d-none');
          }, 2000);
        });
      },
      false
    );
  },
  false
);
