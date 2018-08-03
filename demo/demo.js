/* demo.js */
import AircallPhone from 'aircall-everywhere';

console.log('demo time!');

const loadPhoneButton = document.querySelector('#load-phone-button');
loadPhoneButton.addEventListener(
  'click',
  () => {
    let loadedPhoneAlert = document.querySelector('#phone-loaded');
    let notLoadePhoneAlert = document.querySelector('#phone-not-loaded');
    let userInfoText = document.querySelector('#user-info');
    loadPhoneButton.disabled = true;
    const ap = new AircallPhone({
      domToLoadPhone: '#phone',
      onLogin: settings => {
        userInfoText.textContent = JSON.stringify(settings, null, 4);
        loadedPhoneAlert.classList.remove('d-none');
        notLoadePhoneAlert.classList.add('d-none');
      },
      onLogout: () => {
        loadedPhoneAlert.classList.add('d-none');
        notLoadePhoneAlert.classList.remove('d-none');
        userInfoText.textContent = ' ';
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
