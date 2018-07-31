/* demo.js */
import AircallPhone from 'aircall-everywhere';

console.log('demo time!');

const loadPhoneButton = document.querySelector('#load-phone-button');
loadPhoneButton.addEventListener(
  'click',
  () => {
    let loadedPhoneAlert = document.querySelector('#phone-loaded');
    let notLoadePhoneAlert = document.querySelector('#phone-not-loaded');
    loadPhoneButton.disabled = true;
    const ap = new AircallPhone({
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
      console.log('end ringtone');
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
