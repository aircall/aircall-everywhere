# How to use the Aircall Everywhere in any CRM ?

## Include this project in your dependency

`npm install -s aircall-everywhere`

## Constructor

You need to create an instance to use the library. The constructor has a settings argument:

- `onLogin`: Callback function after the workspace is fully loaded, logged in, and the connexion between the workspace and the CRM is established. This callback will triggers everytime the user logs again. User details and integration settings if any are passed as parameters.
- `onLogout`: Callback function after the user logs out of the workspace. It will triggers everytime the user logs out.
- `integrationToLoad`: You can specify a CRM from which specific settings can be retrieved. Only `zendesk` or `hubspot` available for now. You can ignore this if you have your own CRM.
- `domToLoadWorkspace`: You must specify in which element you want to load the workspace. Query selector string.
- `size`: You can specify a preset for the size of the workspace loaded. 3 possibilities:
  - `big`: 666px by 376px. Recommanded and default value
  - `small`: 600px by 376px
  - `auto`: 100% width and height. Not recommanded
- `debug`: Enables or disables logging. Defaults to `true`.

Example:

```javascript
import AircallWorkspace from 'aircall-everywhere';

const aircallWorkspace = new AircallWorkspace({
  onLogin: (settings) => {
    console.log('workspace loaded');
    doStuff();
  },
  onLogout: () => {},
  domToLoadWorkspace: '#workspace',
  integrationToLoad: 'zendesk',
  size: 'big',
});
```

Settings passed in the `onLogin` callback contains info about the user and integration and looks like this:

```javascript
{
  user: {
    email: 'john@company.com',
    first_name: 'John',
    last_name: 'Smith',
    company_name: 'Super Company Inc'
  },
  settings: {
    <specific_integration_settings>
  }
}
```

## isLoggedIn method

In addition to the `onLogin` and `onLogout` callbacks, a `isLoggedIn` method is provided that will directly asks the workspace about its status. The result is a boolean.

Example:

```javascript
aircallWorkspace.isLoggedIn((res) => {
  console.log('login status:', res);
});
```

## on & send

You can send messages to the workspace and listen messages coming from it.

### events from the workspace:

All events from the workspace with the payload associated:

- `incoming_call`: there is an incoming call, ringing.
  ```javascript
  {
    from: '+15557543010',
    to: '+15551234567',
    call_id: 12345
  }
  ```
- `call_end_ringtone`: the ringtone has ended. This event is only triggered for incoming calls.
  ```javascript
  {
    answer_status: 'answered | disconnected | refused',
    call_id: 12345
  }
  ```
- `outgoing_call`: an outgoing call has started
  ```javascript
  {
    from: '+15557543010',
    to: '+15551234567',
    call_id: 12345
  }
  ```
- `outgoing_answered`: an outgoing call has been answered
  ```javascript
  {
    call_id: 12345;
  }
  ```
- `call_ended`: a call has been ended
  ```javascript
  {
    duration: 20,
    call_id: 12345
  }
  ```
- `comment_saved`: a comment has been saved about a call
  ```javascript
  {
    comment: 'This is a comment',
    call_id: 12345
  }
  ```
- `external_dial`: a dial has been made from outside of the workspace (api/extension)
  ```javascript
  {
    phone_number: '+15557543010';
  }
  ```
- `powerdialer_updated`: a powerdialer campaign has been updated (via extension). There is no payload.
- `redirect_event`: event coming from specific CRM settings if it has been enabled in the Aircall Dashboard. Only `zendesk` and `hubspot` is supported for now. This event data has this schema:
  ```javascript
  {
    type: 'Zendesk::User' | 'Zendesk::Ticket'
    id: <userId> | <ticketId>
  }
  ```

`call_id` parameter is a number per call.
`duration` is in seconds.
All numbers are sent in the `e.164` format.

Example:

```javascript
aircallWorkspace.on('incoming_call', (callInfos) => {
  console.log(`Call from ${callInfos.from} to ${callInfos.to}`);
  doStuff();
});
```

### events the workspace listens to:

Example:

```javascript
aircallWorkspace.send('dial_number', { phone_number: number }, (success, data) => {
  console.log('success of dial:', success);
});
```

The callback of the `send` method has two arguments:

- success of the request
- if the request is successful, data from the response sent by the workspace
- if the request is not successful, an error object with an error code and error message:

All generic errors from `send`:

- `no_event_name`: the event name sent is not valid
- `not_ready`: Workspace is not loaded or logged in yet
- `no_answer`: Workspace didn't answer, most likely not logged in
- `does_not_exists`: The event sent does not exists
- `invalid_response`: Workspace sent an malformed answer, should not happen
- `unknown_error`: Should not happen

List of events:

- `dial_number`: with `{phone_number: <number>}` argument, you can ask the workspace to dial the number.
  Specific errors for this event:

  - `in_call`: Workspace is on a call, retry after the call is ended

- `exit_keyboard`: with no argument, you can ask the workspace to exit the keyboard view if it is on.
  Specific errors for this event:
  - `in_call`: Workspace is on a call, retry after the call is ended
  - `not_in_keyboard`: Workspace is not on keyboard screen, so it can't exit the keyboard :D

more events to come...

## removeListener method

You can remove a listener added by `on` with this method.

## `<iframe>` authorizations

Please be aware that `aircall-everywhere` will generate an iframe with following `allow` attributes.

```html
<iframe
  allow="microphone; autoplay; clipboard-read; clipboard-write; hid"
  src="https://workspace.aircall.io?integration=generic"
  style="height:100%; width:100%;"
>
</iframe>
```

If you need to embed `aircall-everywhere` in an `<iframe>` you own, please be sure to propagate the `allow` attributes like so

```html
<!-- your iframe -->
<iframe src="your src here" allow="camera; microphone; clipboard-read; clipboard-write; hid">
  <!-- iframe generated by aircall-everywhere -->
  <iframe
    allow="microphone; autoplay; clipboard-read; clipboard-write; hid"
    src="https://workspace.aircall.io?integration=generic"
    style="height:100%; width:100%;"
  >
  </iframe>
</iframe>
```

The clipboard API is not accessible through `<iframe>` since Chrome v81 and a policy has been added since Chrome v85. That's why `aircall-everywhere` needs these attributes. More info [here](https://www.chromestatus.com/feature/5767075295395840).

# Development

You can run the demo webpage with:
`yarn start`

tests are available:
`yarn test`
`yarn test-watch`

to create a new version:
`yarn version --patch|--minor|--major` and create a PR.
The CI will publish a new version after a github release.

# Code coverage

A code coverage report is available [here](https://aircall.github.io/aircall-everywhere/tests/).
