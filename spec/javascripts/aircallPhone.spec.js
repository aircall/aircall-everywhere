/* tests index */
import AircallWorkspace from '../../src/javascripts/aircallWorkspace.js';
import { HTMLElements, querySpy } from '../mocks.js';

jest.useFakeTimers();

describe('Aircall SDK Library', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    document.querySelector = querySpy;
  });

  it('should be initialized', () => {
    const ap = new AircallWorkspace();
    expect(ap).toBeDefined();
  });

  describe('constructor', () => {
    it('should set the options passed', () => {
      const ap = new AircallWorkspace({
        workspaceUrl: 'https://workspace.aircall-staging.com',
        path: 'zendesk',
        domToLoadWorkspace: '#workspace',
        integrationToLoad: 'zendesk',
        size: 'small',
        onLogin: () => {
          console.log('loaded');
        },
        onLogout: () => {
          console.log('logged out');
        },
        debug: false,
      });
      expect(ap.workspaceUrl).toBeDefined();
      expect(ap.path).toBeDefined();
      expect(ap.domToLoadWorkspace).toBeDefined();
      expect(ap.integrationToLoad).toBeDefined();
      expect(ap.size).toBeDefined();
      expect(ap.debug).toBeDefined();
      expect(ap.debug).toEqual(false);
    });

    it('should default debug mode to true', () => {
      const ap = new AircallWorkspace();
      expect(ap.debug).toBeDefined();
      expect(ap.debug).toEqual(true);
    });

    it('should launch _messageListener', () => {
      jest.spyOn(AircallWorkspace.prototype, '_messageListener').mockImplementation();
      const ap = new AircallWorkspace();
      expect(AircallWorkspace.prototype._messageListener).toHaveBeenCalled();
    });

    it('should launch _createWorkspaceIframe if a dom is specified', () => {
      jest.spyOn(AircallWorkspace.prototype, '_createWorkspaceIframe').mockImplementation();
      const ap = new AircallWorkspace({
        domToLoadWorkspace: '#workspace',
      });
      expect(AircallWorkspace.prototype._createWorkspaceIframe).toHaveBeenCalled();
    });

    it('should set a specific url if it is a valid url', () => {
      const ap = new AircallWorkspace({
        workspaceUrl: 'https://toto.toto.com',
      });
      expect(ap.workspaceUrl).toEqual('https://toto.toto.com');
    });
  });

  describe('_resetData function', () => {
    let ap;

    beforeEach(() => (ap = new AircallWorkspace()));

    it('should exists', () => {
      expect(ap._resetData).toBeDefined();
    });

    it('should reset specific data about workspace instance', () => {
      ap.workspaceWindow = {};
      ap.integrationSettings = {
        toto: 'tata',
      };
      ap.userSettings = {
        email: 'toto@toto.fr',
      };
      ap.workspaceLoginState = true;
      ap.path = 'salesforce';
      ap._resetData();
      expect(ap.workspaceWindow).toBe(null);
      expect(ap.path).toBe(null);
      expect(ap.integrationSettings).toEqual({});
      expect(ap.userSettings).toEqual({});
      expect(ap.workspaceLoginState).toBe(false);
    });
  });

  describe('_createWorkspaceIframe function', () => {
    let ap;

    beforeEach(() => (ap = new AircallWorkspace()));

    it('should exists', () => {
      expect(ap._createWorkspaceIframe).toBeDefined();
    });

    it('should set an iframe inside the specified dom', () => {
      ap.domToLoadWorkspace = '#workspace';
      ap._createWorkspaceIframe();
      expect(HTMLElements['#workspace'].innerHTML).toEqual(
        '<iframe allow="microphone; autoplay; clipboard-read; clipboard-write; hid" src="https://workspace.aircall.io?integration=generic" style="height:666px; width:376px;"></iframe>'
      );
    });

    it('should set an iframe with small size depending on the size option', () => {
      ap.domToLoadWorkspace = '#workspace';
      ap.size = 'small';
      ap._createWorkspaceIframe();
      expect(HTMLElements['#workspace'].innerHTML).toEqual(
        '<iframe allow="microphone; autoplay; clipboard-read; clipboard-write; hid" src="https://workspace.aircall.io?integration=generic" style="height:600px; width:376px;"></iframe>'
      );
    });

    it('should set an iframe with auto size depending on the size option', () => {
      ap.domToLoadWorkspace = '#workspace';
      ap.size = 'auto';
      ap._createWorkspaceIframe();
      expect(HTMLElements['#workspace'].innerHTML).toEqual(
        '<iframe allow="microphone; autoplay; clipboard-read; clipboard-write; hid" src="https://workspace.aircall.io?integration=generic" style="height:100%; width:100%;"></iframe>'
      );
    });

    it('should throw an error if dom doesnt exist', () => {
      ap.domToLoadWorkspace = '#workspace';
      document.querySelector = () => {
        return null;
      };
      expect(ap._createWorkspaceIframe).toThrow();
    });
  });

  describe('_messageListener function', () => {
    it('should exists', () => {
      const ap = new AircallWorkspace();
      expect(ap._messageListener).toBeDefined();
    });

    it('should add an event listener', () => {
      const win = {
        addEventListener: (type, callback, bool) => {},
      };

      jest.spyOn(win, 'addEventListener').mockImplementation();

      const ap = new AircallWorkspace({ window: win });
      expect(win.addEventListener).toHaveBeenCalled();
    });

    it('should return if event received is not in specified format', (done) => {
      const win = {
        addEventListener: (type, callback, bool) => {
          setTimeout(() => {
            if (callback({ data: 'toto' }) === false) {
              done();
            }
          }, 100);
        },
      };

      const ap = new AircallWorkspace({ window: win });
      jest.advanceTimersByTime(101);
    });

    it('should launch _handleInitMessage if init message received', () => {
      const win = {
        addEventListener: (type, callback, bool) => {
          setTimeout(() => {
            callback({ data: { name: 'apm_phone_loaded' } });
          }, 100);
        },
      };

      const ap = new AircallWorkspace({ window: win });
      jest.spyOn(ap, '_handleInitMessage').mockImplementation();
      jest.advanceTimersByTime(101);
      expect(ap._handleInitMessage).toHaveBeenCalled();
    });

    it('should set integration settings if settings event received', () => {
      const win = {
        addEventListener: (type, callback, bool) => {
          setTimeout(() => {
            callback({ data: { name: 'apm_phone_integration_settings', value: { foo: 'bar' } } });
          }, 100);
        },
      };

      const ap = new AircallWorkspace({ window: win });
      jest.advanceTimersByTime(101);
      expect(ap.integrationSettings).toEqual({ foo: 'bar' });
    });

    it('should launch onLogin callback if defined after integration settings received, with integration data', (done) => {
      const win = {
        addEventListener: (type, callback, bool) => {
          setTimeout(() => {
            callback({ data: { name: 'apm_phone_integration_settings', value: { foo: 'bar' } } });
          }, 100);
        },
      };

      const ap = new AircallWorkspace({
        window: win,
        onLogin: (data) => {
          if (data.settings.foo === 'bar') {
            done();
          }
        },
      });
      jest.advanceTimersByTime(101);
    });

    it('should launch _resetData function if logout event received', () => {
      const win = {
        addEventListener: (type, callback, bool) => {
          setTimeout(() => {
            callback({ data: { name: 'apm_phone_logout' } });
          }, 100);
        },
      };

      const ap = new AircallWorkspace({
        window: win,
      });
      jest.spyOn(ap, '_resetData').mockImplementation();
      jest.advanceTimersByTime(101);
      expect(ap._resetData).toHaveBeenCalled();
    });

    it('should launch onLogout callback if logout event received', (done) => {
      const win = {
        addEventListener: (type, callback, bool) => {
          setTimeout(() => {
            callback({ data: { name: 'apm_phone_logout' } });
          }, 100);
        },
      };

      const ap = new AircallWorkspace({
        window: win,
        onLogout: () => {
          done();
        },
      });
      jest.advanceTimersByTime(101);
    });

    it('should loop on registered events and trigger registered callback if event is a match', (done) => {
      const win = {
        addEventListener: (type, callback, bool) => {
          setTimeout(() => {
            callback({ data: { name: 'apm_phone_my_event' } });
          }, 100);
        },
      };
      const ap = new AircallWorkspace({ window: win });
      ap.eventsRegistered = {
        my_event: () => {
          done();
        },
        my_other_event: () => {
          done();
        },
      };
      jest.advanceTimersByTime(101);
    });
  });

  describe('_handleInitMessage function', () => {
    let ap;

    beforeEach(() => (ap = new AircallWorkspace()));

    it('should exists', () => {
      expect(ap._handleInitMessage).toBeDefined();
    });

    it('should send a postmessage that it is ready', (done) => {
      ap._handleInitMessage({
        data: {},
        origin: '*',
        source: {
          postMessage: (event, target) => {
            if (event.name === 'apm_app_isready') {
              done();
            }
          },
        },
      });
    });

    it('should send a postmessage that it is ready with path when defined', (done) => {
      ap.path = 'salesforce';
      ap._handleInitMessage({
        data: {},
        origin: '*',
        source: {
          postMessage: (event, target) => {
            if (event.name === 'apm_app_isready' && event.path === 'salesforce') {
              done();
            }
          },
        },
      });
    });

    it('should ask for integration settings if there is an integration to load', (done) => {
      ap.integrationToLoad = 'salesforce';
      ap._handleInitMessage({
        data: {},
        origin: '*',
        source: {
          postMessage: (event, target) => {
            if (event.name === 'apm_app_get_settings' && event.value === 'salesforce') {
              done();
            }
          },
        },
      });
    });

    it('should launch onLogin callback if there is no integration to load, with user data', (done) => {
      const app = new AircallWorkspace({
        onLogin: (settings) => {
          if (settings.user.email === 'toto@toto.fr') {
            done();
          }
        },
      });

      app._handleInitMessage({
        data: {
          value: {
            email: 'toto@toto.fr',
          },
        },
        origin: '*',
        source: {
          postMessage: (event, target) => {},
        },
      });
    });
  });

  describe('getUrlToLoad function', () => {
    let ap;

    beforeEach(() => (ap = new AircallWorkspace()));

    it('should exists', () => {
      expect(ap.getUrlToLoad).toBeDefined();
    });
  });

  describe('on function', () => {
    let ap;

    beforeEach(() => (ap = new AircallWorkspace()));

    it('should exists', () => {
      expect(ap.on).toBeDefined();
    });

    it('should register callback for a specific name', () => {
      ap.on('my_event', () => {});
      expect(ap.eventsRegistered['my_event']).toEqual(expect.any(Function));
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

  describe('_handleSendError function', () => {
    let ap;

    beforeEach(() => {
      ap = new AircallWorkspace();
      jest.spyOn(console, 'error').mockImplementation();
    });

    it('should exists', () => {
      expect(ap._handleSendError).toBeDefined();
    });

    it('should log correct standard error message for error code no_event_name', () => {
      ap._handleSendError({ code: 'no_event_name' });
      expect(console.error).toHaveBeenCalledWith(
        '[AircallEverywhere] [send function] Invalid parameter eventName. Expected an non empty string'
      );
    });

    it('should log correct standard error message for error code not_ready', () => {
      ap._handleSendError({ code: 'not_ready' });
      expect(console.error).toHaveBeenCalledWith(
        '[AircallEverywhere] [send function] Aircall Workspace has not been identified yet or is not ready. Wait for "onLogin" callback'
      );
    });

    it('should log correct standard error message for error code no_answer', () => {
      ap._handleSendError({ code: 'no_answer' });
      expect(console.error).toHaveBeenCalledWith(
        '[AircallEverywhere] [send function] No answer from the workspace. Check if the workspace is logged in'
      );
    });

    it('should log correct standard error message for error code invalid_response', () => {
      ap._handleSendError({ code: 'invalid_response' });
      expect(console.error).toHaveBeenCalledWith(
        '[AircallEverywhere] [send function] Invalid response from the workspace. Contact aircall developers dev@aircall.io'
      );
    });

    it('should log an error message even with no error code', () => {
      ap._handleSendError({});
      expect(console.error).toHaveBeenCalledWith(
        '[AircallEverywhere] [send function] Unknown error. Contact aircall developers dev@aircall.io'
      );
    });

    it('should log an error message even with no error', () => {
      ap._handleSendError();
      expect(console.error).toHaveBeenCalledWith(
        '[AircallEverywhere] [send function] Unknown error. Contact aircall developers dev@aircall.io'
      );
    });

    it('should log an error message with a full specific error provided', () => {
      ap._handleSendError({ code: 'my_code', message: 'My specific message' });
      expect(console.error).toHaveBeenCalledWith(
        '[AircallEverywhere] [send function] My specific message'
      );
    });

    it('should log a genericerror message with a specific error without message', () => {
      ap._handleSendError({ code: 'my_code' });
      expect(console.error).toHaveBeenCalledWith(
        '[AircallEverywhere] [send function] Generic error message'
      );
    });

    it('should execute callback with false and the error object as parameters', (done) => {
      ap._handleSendError({ code: 'not_ready' }, (success, data) => {
        if (
          success === false &&
          data.code === 'not_ready' &&
          data.message ===
            'Aircall Workspace has not been identified yet or is not ready. Wait for "onLogin" callback'
        ) {
          done();
        }
      });
    });
  });

  describe('send function', () => {
    let ap;

    beforeEach(() => {
      ap = new AircallWorkspace({ debug: false });
      ap.workspaceWindow = {
        origin: '*',
        source: {
          postMessage: (event, target) => {},
        },
      };
    });

    it('should exists', () => {
      expect(ap.send).toBeDefined();
    });

    it('should send a postMessage with the right event name', (done) => {
      ap.workspaceWindow = {
        origin: '*',
        source: {
          postMessage: (event, target) => {
            if (event.name === 'apm_app_my_event' && event.value.foo === 'bar') {
              done();
            }
          },
        },
      };
      ap.send('my_event', { foo: 'bar' });
    });

    it('should listen for a response to the sent event', () => {
      ap.send('my_event', { foo: 'bar' });
      expect(ap.eventsRegistered.my_event_response).toBeDefined();
    });

    it('should timeout if no response sent by the workspace', () => {
      ap.send('my_event', { foo: 'bar' });
      jest.spyOn(ap, '_handleSendError').mockImplementation();
      jest.advanceTimersByTime(2001);
      expect(ap._handleSendError).toHaveBeenCalledWith({ code: 'no_answer' }, undefined);
    });

    it('should remove listener for response after timeout', () => {
      ap.send('my_event', { foo: 'bar' });
      jest.advanceTimersByTime(2001);
      expect(ap.eventsRegistered.my_event_response).not.toBeDefined();
    });

    it('should remove listener on event response', () => {
      ap.send('my_event', { foo: 'bar' });
      ap.eventsRegistered.my_event_response();

      expect(ap.eventsRegistered.my_event_response).not.toBeDefined();
    });

    it('should call _handleSendError on errorful event response', () => {
      ap.send('my_event', { foo: 'bar' });
      jest.spyOn(ap, '_handleSendError').mockImplementation();
      ap.eventsRegistered.my_event_response({
        success: false,
        errorCode: 'tata',
        errorMessage: 'error message',
      });
      expect(ap._handleSendError).toHaveBeenCalledWith(
        { code: 'tata', message: 'error message' },
        undefined
      );
    });

    it('should call _handleSendError on malformed event response', () => {
      ap.send('my_event', { foo: 'bar' });
      jest.spyOn(ap, '_handleSendError').mockImplementation();
      ap.eventsRegistered.my_event_response({ foo: 'bar' });
      expect(ap._handleSendError).toHaveBeenCalledWith({ code: 'invalid_response' }, undefined);
    });

    it('should launch calbback on successful event response', (done) => {
      ap.send('my_event', { toto: 'tata' }, (success, res) => {
        if (success === true && res.foo === 'bar') {
          done();
        }
      });
      ap.eventsRegistered.my_event_response({ success: true, data: { foo: 'bar' } });
    });

    it('should return and call _handleSendError without eventName', () => {
      jest.spyOn(ap, '_handleSendError').mockImplementation();
      expect(ap.send(null)).toBe(false);
      expect(ap._handleSendError).toHaveBeenCalledWith({ code: 'no_event_name' }, undefined);
    });

    it('should return and call _handleSendError without workspaceWindow defined', () => {
      jest.spyOn(ap, '_handleSendError').mockImplementation();
      ap.workspaceWindow = {};
      expect(ap.send('toto')).toBe(false);
      expect(ap._handleSendError).toHaveBeenCalledWith({ code: 'not_ready' }, undefined);
    });

    it('should use second argument as callback if it is a function and no 3rd one', (done) => {
      ap.workspaceWindow = {};
      ap.send('toto', () => {
        done();
      });
    });
  });

  describe('removeListener function', () => {
    let ap;

    beforeEach(() => (ap = new AircallWorkspace()));

    it('should exists', () => {
      expect(ap.removeListener).toBeDefined();
    });

    it('should return false if listener to remove doesnt exists', () => {
      expect(ap.removeListener('fake_event')).toBe(false);
    });

    it('should return true if listener to remove exists', () => {
      ap.eventsRegistered = {
        toto: () => {},
        tata: () => {},
      };
      expect(ap.removeListener('toto')).toBe(true);
    });

    it('should remove the listener if it exists', () => {
      ap.eventsRegistered = {
        toto: 1,
        tata: 2,
      };
      ap.removeListener('toto');
      expect(ap.eventsRegistered).toEqual({ tata: 2 });
    });
  });

  describe('isLoggedIn function', () => {
    let ap;

    beforeEach(() => (ap = new AircallWorkspace({ debug: false })));

    it('should exists', () => {
      expect(ap.isLoggedIn).toBeDefined();
    });

    it('should send an event to the workspace', () => {
      let cb = () => {};
      jest.spyOn(ap, 'send').mockImplementation();
      ap.isLoggedIn(cb);
      expect(ap.send).toHaveBeenCalledWith('is_logged_in', expect.any(Function));
    });

    it('should execute callback with response from the workspace', (done) => {
      let cb = () => {
        done();
      };
      ap.isLoggedIn(cb);
    });
  });

  describe('_log function', () => {
    beforeEach(() => {
      jest.spyOn(console, 'error').mockImplementation();
      jest.spyOn(console, 'info').mockImplementation();
    });

    it('should exist', () => {
      const ap = new AircallWorkspace();
      expect(ap._log).toBeDefined();
    });

    it('when `debug`=true, prints passed args with specified console action', () => {
      const ap = new AircallWorkspace({ debug: true });
      ap._log('info', 'some info');
      ap._log('error', 'some error');

      expect(console.info).toHaveBeenCalledWith('some info');
      expect(console.error).toHaveBeenCalledWith('some error');
    });

    it('can print multiple arguments', () => {
      const ap = new AircallWorkspace({ debug: true });
      ap._log('info', 'some info', 'some more info');

      expect(console.info).toHaveBeenCalledWith('some info', 'some more info');
    });

    it('defaults to info() if incorrect action is passed', () => {
      const ap = new AircallWorkspace({ debug: true });
      ap._log('foo', 'some info');

      expect(console.info).toHaveBeenCalledWith('some info');
    });

    it('throws error when non-string action is passed', () => {
      const ap = new AircallWorkspace({ debug: true });

      expect(() => ap._log(() => {}, 'some info')).toThrow();
    });

    it('when `debug`=false, it does not print to console', () => {
      const ap = new AircallWorkspace({ debug: false });
      ap._log('info', 'some info');
      ap._log('error', 'some error');

      expect(console.info).toHaveBeenCalledTimes(0);
      expect(console.error).toHaveBeenCalledTimes(0);
    });
  });
});
