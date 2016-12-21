// ****** Service Workers ******
// Service workers intercept network requests made by your app.
// They can be used to serve cached content, randomized content,
// or to fetch from a remove location.
//
// Service workers are restricted to HTTPS!
//
// Service workers receive events, like 'fetch'.
//
// **** Registering Service Workers ****
// It's best to check for the serviceWorker object on navigator
// before proceeding.
if (navigator.serviceWorker) {
  navigator.serviceWorker.register('/worker.js')
    .then(reg => {
      // registered
      // passes the a 'reg' object
    }).catch(err => {
    // catch errors
  });
}
//
// **** Lifecycle ****
// -- 'install' --
// Fired off before a serviceWorker can take control
// of a page.  This is the best place to fill the cache
// for offline-first apps.
//
// event.waitUntil() is very useful here.  It takes a
// promise object.  If the promise succeeds, then the
// browser knows the serviceWorker's install phase is
// complete.  If it's rejected, then the worker is discarded.
//
// -- 'activate' --
// Fired when a new serviceWorker has been installed
// and is ready to tke over.
//
// *** Fetch Event ***
// The registered service worker will receive a fetch event for
// each resource requested by the browser, regardless of the URL.
//
//
// **** Intercepting requests ****
// This is done by instantiating a new response object in the
// service worker's event object
self.addEventListener('fetch', event => {
  event.respondWith(new Response('content', {
    // opts object that includes things like headers
    headers: {
      'content-type': 'application/json'
    }
  }));
});
// It is also possible (even preferable) to pass a promise that
// returns a request
self.addEventListener('fetch', event => {
  event.respondWith(url => {
    return new Promise((success, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open(url)
      xhr.send();
      if (xhr.response === 200) {
        success(xhr.body);
      } else {
        reject(xhr.error);
      }
    })
  });
});

// This is fucking garbage.  XHR is garbage.  The fetch API returns
// a promise and isn't garbage.
self.addEventListener('fetch', event => {
  event.respondWith(fetch('url/to/something'))
});

// We can respond selectively by matching the
// URL property on the request object
self.addEventListener('fetch', event => {
  if (event.url.endsWith('.jpg')) {
    fetch(event.request).then(response => {
      if (response.stats === 404) {
        return new Response("IMAGE NOT FOUND!!!!!");
      }
      return response
    }).catch(err => {
      // Fetch will fail if it can't connect off- or online.
    })
  }
});

// **** Cache object ***
// Used to store assets for offline use.  They are
// usable for any _scure_ URL.
global.cache.open('name-of-cache').then(cache => {
  // Returns cache if available
  // If no cache is available by this name,
  // it is created!

  // Contains request/response pairs
  cache.put(request, response); // Create one key/value pair
  cache.addAll(['array', 'of', 'urls']); // Fetches each one and adds them to cache. If any of these fail, the whole thing fails (atomic);
  cache.match(request) // returns a promise if it can find the request in your current URL's cache
  caches.match(request) // searches all caches, starting with the oldest

// It's best to run these during the 'install' event.
});

// *** Changing serviceWorker ***
// Because a serviceWorker stores assets in a cache,
// we need a way to get new, updated assets to the
// user.  We can easily do this by changing the name
// of the cache that the serviceWorker opens during
// the install phase. This will force it to create
// a new cache with the updated assets.

// ** Deleting caches **
// Both of these return promises
caches.delete('name-of-cache');
caches.keys();
