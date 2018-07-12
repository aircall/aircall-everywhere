class AircallPhone {
  constructor(opts = {}) {
    // internal vars
    // window object of loaded aircall phone
    this.phoneWindow = null;
    this.integrationSettings = {};
    this.eventsRegistered = {};

    const URL_REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;
    this.phoneStarted = false;

    // options passed
    this.phoneUrl =
      opts.phoneUrl !== undefined && URL_REGEX.test(opts.phoneUrl) === true
        ? opts.phoneUrl
        : 'https://phone.aircall.io';
    this.domToLoadPhone = opts.domToLoadPhone;
    this.integrationToLoad = opts.integrationToLoad;
    this.afterPhoneLoaded = () => {
      if (this.phoneStarted === false && typeof opts.afterPhoneLoaded === 'function') {
        this.phoneStarted = true;
        opts.afterPhoneLoaded();
      }
    };
    // local window
    this.w = opts.window || window;

    // launch postmessage listener
    this._messageListener();

    // load phone in specified dom
    if (!!this.domToLoadPhone) {
      this._createPhoneIframe();
    }
  }

  _createPhoneIframe() {
    // we get the passed dom
    try {
      const el = document.querySelector(this.domToLoadPhone);
      el.innerHTML = `<iframe allow="microphone; autoplay" src="${this.getUrlToLoad()}" style="height:666px; width:376px;"></iframe>`;
    } catch (e) {
      // couldnt query the dom wanted
      console.error(`[AircallSDK] ${this.domToLoadPhone} not be found. Error:`, e);
    }
  }

  _messageListener() {
    this.w.addEventListener(
      'message',
      event => {
        console.log('[AircallSDK] received event', event);
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
          this.afterPhoneLoaded();
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
    this.phoneWindow = {
      source: event.source,
      origin: event.origin
    };

    // we answer init
    this.phoneWindow.source.postMessage({ name: 'apm_app_isready' }, this.phoneWindow.origin);

    // we ask for integration settings
    if (!!this.integrationToLoad) {
      this.phoneWindow.source.postMessage(
        { name: 'apm_app_get_settings', value: this.integrationToLoad },
        this.phoneWindow.origin
      );
    } else {
      // init callback now if present
      this.afterPhoneLoaded();
    }
  }

  getUrlToLoad() {
    return `${this.phoneUrl}?integration=generic`;
  }

  getSetting(settingName) {
    return this.integrationSettings[settingName];
  }

  on(eventName, callback) {
    if (!eventName || typeof callback !== 'function') {
      throw new Error(
        '[AircallEverywhere] Invalid parameters format. Expected non empty string and function'
      );
    }
    this.eventsRegistered[eventName] = callback;
  }

  send(eventName, data) {
    if (!eventName) {
      throw new Error(
        '[AircallEverywhere] Invalid parameter eventName. Expected an non empty string'
      );
    }
    this.phoneWindow.source.postMessage(
      { name: `apm_app_${eventName}`, value: data },
      this.phoneWindow.origin
    );
  }
}

export default AircallPhone;
