The `window` object provides access to the browser's history through the `history` object.

## Basic navigation

```
window.history.back()
window.history.forward()
```
### Moving to a specific point

```
window.history.go(9)
window.history.go(-5)
```

## Properties

```
window.history.length // number of entries
```

## Manipulating history

```
history.pushState(); // Changes the referrer in the HTTP header that gets created after the state is changed.  It will change to the URL of the window object at the time the new XHR object is created.
history.replaceState(); // Works the exact same as `pushState` but overwrites the current history entry instead of creating a new one.
```

#### pushState(stateObj, title, URL)

`stateObj` - A JavaScript object that is anything that can be serialized, but is limited to 640k characters.  This is retrieved anytime the user changes state (see `popstate`).

`title` - Currently ignored, could be used in the future.

`URL` - This is what will be displayed in the browser's address bar, but it won't be loaded or even verified.  If it's relative, it will resolve to the current URL.  It must be the same origin as the current URL or `pushState` will throw an exception.  This is an optional parameter and will default to the current URL.

##### vs. hash fragments ("#foo")

- Setting `window.location` will only keep you in the same document if you _only_ modify the hash rather than the URL.

- The `stateObj` lets you associate arbitrary data with the history entry.  `window.location` would require a complex query string.

- `pushState` never causes the `hashchange` event to fire, even if only the hash changes.

### `popstate`

`popstate` is an event that's fired every time the active history entry changes between history entries **for the same document**.  If the event is modified by a call to `pushState` or `replaceState`, then the `popstate` event's state contains the history entry's `stateObj`.  The event is not triggered by a call to `pushState` or `replaceState`, but by browser actions (hitting the back button) or `history.back()` and `history.go()`.

### Current state

If the browser reloads, it will receive the `onload` event without `popstate` firing.  The current state is stored in `history.state`.