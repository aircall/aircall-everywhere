/* tests index */
import AircallPhone from '../../src/javascripts/aircallPhone.js';
import { HTMLElements, querySpy } from '../mocks.js';

describe('Aircall SDK Library', () => {
  beforeEach(() => {
    document.querySelector = querySpy;
  });
  it('should be initialized', () => {
    const ap = new AircallPhone();
    expect(ap).toBeDefined();
  });

  describe('constructor', () => {
    it('should set the options passed', () => {
      const ap = new AircallPhone({
        phoneUrl: 'https://phone.aircall-staging.com',
        domToLoadPhone: '#phone',
        integrationToLoad: 'zendesk',
        afterPhoneLoaded: () => {
          console.log('loaded');
        }
      });
      expect(ap.phoneUrl).toBeDefined();
      expect(ap.domToLoadPhone).toBeDefined();
      expect(ap.integrationToLoad).toBeDefined();
      expect(ap.afterPhoneLoaded).toBeDefined();
    });

    it('should launch _messageListener', () => {
      spyOn(AircallPhone.prototype, '_messageListener');
      const ap = new AircallPhone();
      expect(AircallPhone.prototype._messageListener).toHaveBeenCalled();
    });

    it('should launch _createPhoneIframe if a dom is specified', () => {
      spyOn(AircallPhone.prototype, '_createPhoneIframe');
      const ap = new AircallPhone({
        domToLoadPhone: '#phone'
      });
      expect(AircallPhone.prototype._createPhoneIframe).toHaveBeenCalled();
    });

    it('should set a specific url if it is a valid url', () => {
      const ap = new AircallPhone({
        phoneUrl: 'https://toto.toto.com'
      });
      expect(ap.phoneUrl).toEqual('https://toto.toto.com');
    });
  });

  describe('_createPhoneIframe function', () => {
    let ap;
    beforeEach(() => {
      ap = new AircallPhone();
    });
    it('should exists', () => {
      expect(ap._createPhoneIframe).toBeDefined();
    });

    it('should set an iframe inside the specified dom', () => {
      ap.domToLoadPhone = '#phone';
      ap._createPhoneIframe();
      expect(HTMLElements['#phone'].innerHTML).toEqual(
        '<iframe allow="microphone; autoplay" src="https://phone.aircall.io?integration=generic" style="height:666px; width:376px;"></iframe>'
      );
    });

    it('should throw an error if dom doesnt exist', () => {
      ap.domToLoadPhone = '#phone';
      document.querySelector = () => {
        return null;
      };
      expect(ap._createPhoneIframe).toThrow();
    });
  });

  describe('_messageListener function', () => {
    beforeEach(() => {
      jasmine.clock().install();
    });

    afterEach(() => {
      jasmine.clock().uninstall();
    });
    it('should exists', () => {
      const ap = new AircallPhone();
      expect(ap._messageListener).toBeDefined();
    });

    it('should add an event listener', () => {
      const win = {
        addEventListener: (type, callback, bool) => {}
      };

      spyOn(win, 'addEventListener');

      const ap = new AircallPhone({ window: win });
      expect(win.addEventListener).toHaveBeenCalled();
    });

    it('should return if event received is not in specified format', done => {
      const win = {
        addEventListener: (type, callback, bool) => {
          setTimeout(() => {
            if (callback({ data: 'toto' }) === false) {
              done();
            }
          }, 100);
        }
      };

      const ap = new AircallPhone({ window: win });
      jasmine.clock().tick(101);
    });

    it('should launch _handleInitMessage if init message received', () => {
      const win = {
        addEventListener: (type, callback, bool) => {
          setTimeout(() => {
            callback({ data: { name: 'apm_phone_loaded' } });
          }, 100);
        }
      };

      const ap = new AircallPhone({ window: win });
      spyOn(ap, '_handleInitMessage');
      jasmine.clock().tick(101);
      expect(ap._handleInitMessage).toHaveBeenCalled();
    });

    it('should set integration settings if settings event received', () => {
      const win = {
        addEventListener: (type, callback, bool) => {
          setTimeout(() => {
            callback({ data: { name: 'apm_phone_integration_settings', value: { foo: 'bar' } } });
          }, 100);
        }
      };

      const ap = new AircallPhone({ window: win });
      jasmine.clock().tick(101);
      expect(ap.integrationSettings).toEqual({ foo: 'bar' });
    });

    it('should launch afterPhoneLoaded callback if defined after integration settings received', done => {
      const win = {
        addEventListener: (type, callback, bool) => {
          setTimeout(() => {
            callback({ data: { name: 'apm_phone_integration_settings', value: { foo: 'bar' } } });
          }, 100);
        }
      };

      const ap = new AircallPhone({
        window: win,
        afterPhoneLoaded: () => {
          done();
        }
      });
      jasmine.clock().tick(101);
    });

    it('should loop on registered events and trigger registered callback if event is a match', done => {
      const win = {
        addEventListener: (type, callback, bool) => {
          setTimeout(() => {
            callback({ data: { name: 'apm_phone_my_event' } });
          }, 100);
        }
      };
      const ap = new AircallPhone({ window: win });
      ap.eventsRegistered = {
        my_event: () => {
          done();
        },
        my_other_event: () => {
          done();
        }
      };
      jasmine.clock().tick(101);
    });
  });

  describe('_handleInitMessage function', () => {
    let ap;
    beforeEach(() => {
      ap = new AircallPhone();
    });
    it('should exists', () => {
      expect(ap._handleInitMessage).toBeDefined();
    });

    it('should send a postmessage that it is ready', done => {
      ap._handleInitMessage({
        origin: '*',
        source: {
          postMessage: (event, target) => {
            if (event.name === 'apm_app_isready') {
              done();
            }
          }
        }
      });
    });

    it('should ask for integration settings if there is an integration to load', done => {
      ap.integrationToLoad = 'salesforce';
      ap._handleInitMessage({
        origin: '*',
        source: {
          postMessage: (event, target) => {
            if (event.name === 'apm_app_get_settings' && event.value === 'salesforce') {
              done();
            }
          }
        }
      });
    });

    it('should launch afterPhoneLoaded callback if there is no integration to load', done => {
      ap.afterPhoneLoaded = () => {
        done();
      };
      ap._handleInitMessage({
        origin: '*',
        source: {
          postMessage: (event, target) => {}
        }
      });
    });
  });

  describe('getUrlToLoad function', () => {
    let ap;
    beforeEach(() => {
      ap = new AircallPhone();
    });
    it('should exists', () => {
      expect(ap.getUrlToLoad).toBeDefined();
    });
  });

  describe('getSetting function', () => {
    let ap;
    beforeEach(() => {
      ap = new AircallPhone();
    });
    it('should exists', () => {
      expect(ap.getSetting).toBeDefined();
    });

    it('should return a specific setting', () => {
      ap.integrationSettings = {
        toto: 'tata',
        foo: 'bar'
      };
      expect(ap.getSetting('toto')).toEqual('tata');
      expect(ap.getSetting('foo')).toEqual('bar');
    });

    it('should return undefined for a non existent setting', () => {
      ap.integrationSettings = {
        toto: 'tata',
        foo: 'bar'
      };
      expect(ap.getSetting('fizz')).toEqual(undefined);
    });
  });

  describe('on function', () => {
    let ap;
    beforeEach(() => {
      ap = new AircallPhone();
    });
    it('should exists', () => {
      expect(ap.on).toBeDefined();
    });

    it('should register callback for a specific name', () => {
      ap.on('my_event', () => {});
      expect(ap.eventsRegistered['my_event']).toEqual(jasmine.any(Function));
    });

    it('should throw an error if empty string is specified as event', () => {
      expect(() => {
        ap.on('', () => {});
      }).toThrow();
    });

    it('should throw an error if callback is not a function', () => {
      expect(() => {
        ap.on('my_event', 'toto');
      }).toThrow();
    });
  });

  describe('send function', () => {
    let ap;
    beforeEach(() => {
      ap = new AircallPhone();
    });
    it('should exists', () => {
      expect(ap.send).toBeDefined();
    });

    it('should send a postMessage with the right event name', done => {
      ap.phoneWindow = {
        origin: '*',
        source: {
          postMessage: (event, target) => {
            if (event.name === 'apm_app_my_event' && event.value.foo === 'bar') {
              done();
            }
          }
        }
      };
      ap.send('my_event', { foo: 'bar' });
    });

    it('should throw an error if eventName is an empty string', () => {
      expect(() => {
        ap.send('');
      }).toThrow();
    });

    it('should throw an error if eventName is null', () => {
      expect(() => {
        ap.send(null, { foo: 'bar' });
      }).toThrow();
    });
  });

  describe('removeListener function', () => {
    let ap;
    beforeEach(() => {
      ap = new AircallPhone();
    });
    it('should exists', () => {
      expect(ap.removeListener).toBeDefined();
    });
  });

  describe('isLoggedIn function', () => {
    let ap;
    beforeEach(() => {
      ap = new AircallPhone();
    });
    it('should exists', () => {
      expect(ap.isLoggedIn).toBeDefined();
    });
  });
});
