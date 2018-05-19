const URL_REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;
const DEFAULT_URL = 'https://phone.aircall.io';

class Aircall {
  constructor(opts = {}) {
    // class vars
    this.phoneWindow = null;
    this.integrationSettings = null;
    this.eventsRegistered = {};
    this.integrationToLoad = opts.integrationToLoad || null;
    this.afterPhoneLoaded = opts.afterPhoneLoaded;

    this.messageListener();
  }

  getUrlToLoad(phoneUrl) {
    if (phoneUrl && URL_REGEX.test(phoneUrl)) {
      return phoneUrl + '?integration=generic';
    }
    return DEFAULT_URL + '?integration=generic';
  }

  messageListener() {
    window.addEventListener(
      'message',
      event => {
        // we test if our format object is present. if not, we stop
        if (!event.data.name) {
          return;
        }

        // initialisation message
        if (event.data.name === 'apm_phone_loaded') {
          this.handleInitMessage(event);
          return;
        }

        // integration settings sent by phone
        if (event.data.name === 'apm_phone_integration_settings') {
          this.integrationSettings = event.data.value;
          // init callback after settings received
          if (typeof this.afterPhoneLoaded === 'function') {
            this.afterPhoneLoaded();
          }
          return;
        }

        // loop over events registered
        for (var eventName in this.eventsRegistered) {
          if (event.data.name === 'apm_phone_' + eventName) {
            // event triggered => we execute callback
            this.eventsRegistered[eventName](event.data.value);
          }
        }
      },
      false
    );
  }

  handleInitMessage(event) {
    // we keep the source
    this.phoneWindow = {
      source: event.source,
      origin: event.origin
    };

    // we answer init
    this.phoneWindow.source.postMessage({ name: 'apm_app_isready' }, this.phoneWindow.origin);

    // we ask for integration settings
    if (this.integrationToLoad) {
      this.phoneWindow.source.postMessage(
        { name: 'apm_app_get_settings', value: this.integrationToLoad },
        this.phoneWindow.origin
      );
    } else {
      // init callback now if present
      if (typeof this.afterPhoneLoaded === 'function') {
        this.afterPhoneLoaded();
      }
    }
  }

  getSetting(settingName) {
    return this.integrationSettings[settingName];
  }

  on(eventName, callback) {
    this.eventsRegistered[eventName] = callback;
  }

  send(eventName, data) {
    this.phoneWindow.source.postMessage(
      { name: 'apm_app_' + eventName, value: data },
      this.phoneWindow.origin
    );
  }
}

export default Aircall;
