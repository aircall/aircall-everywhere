# How to use the Aircall SDK in any CRM ?

## Include this project in your dependency

`npm install aircall-sdk`

## Constructor & getUrlToLoad

You need to create an instance to use the library. The constructor has a settings argument:

* `afterPhoneLoaded`: Callback function after the phone is fully loaded and the connexion between the phone and the CRM is established
* `integrationToLoad`: You can specify a CRM from which specific settings can be retrieved. Only `zendesk` available for now.
* `domToLoadPhone`: You must specify in which element you want to load the phone. Query selector string.

Example:

```javascript
import AircallPhone from 'aircall-sdk';

const aircallPhone = new AircallPhone({
  afterPhoneLoaded: () => {
    console.log('phone loaded');
    doStuff();
  },
  domToLoadPhone: '#phone',
  integrationToLoad: 'zendesk'
});

const url = aircallPhone.getUrlToLoad();

renderPhoneView(url);
```

## getSetting

You can retrieve specific integration settings with `getSetting`.
Example with `zendesk`:

```javascript
const redirectToTicket = aircallPhone.getSetting('display_ticket');
```

## on & send

You can send messages to the phone and listen messages coming from it.

### events from the phone:

* `incoming_call`: the phone is ringing
* `call_end_ringtone`: the ringtone has ended. It can mean the incoming call was taken or missed.
* `redirect_event`: event coming from specific CRM settings if it has been enabled in the Aircall Dashboard. Only `zendesk` is supported for now. This event data has this schema:
  ```javascript
  {
    type: 'Zendesk::User' | 'Zendesk::Ticket'
    id: <userId> | <ticketId>
  }
  ```

### events the phone listens to:

* `dial_number`: with `{phone_number: <number>}` argument, you can ask the phone to dial the number.
* `exit_keyboard`: with no argument, you can ask the phone to exit the keyboard view if it is on.

Full Example:

```javascript
import Aircall from 'aircall-sdk';

const aircallPhone = new AircallPhone({
  afterPhoneLoaded: () => {
    console.log('phone loaded');
    doStuff();
  },
  domToLoadPhone: '#phone',
  integrationToLoad: 'zendesk'
});

aircallPhone.on('incoming_call', () => {
  putPhonePopupInFront();
});

myCRM.on('phone_button_clicked_event', number => {
  aircallPhone.send('dial_number', { phone_number: number });
});
```

more events to come...
