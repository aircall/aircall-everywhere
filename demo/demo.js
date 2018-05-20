/* demo.js */
import AircallPhone from 'aircallPhone';

console.log('demo time!');

const ap = new AircallPhone({
  domToLoadPhone: '#phone',
  phoneUrl: 'https://phone.aircall-staging.com',
  afterPhoneLoaded: () => {
    console.log('SDK finished loading :) yeepee');
  }
});
