/** VARS */
const ORIGIN_URL = `${location.protocol}//${location.host}`;
const CACHE_NAME = "anecgame-v2";
const OFFLINE_URL = `${ORIGIN_URL}/offline.html`;
const CACHED_FILES = [
  OFFLINE_URL,
  "https://anecbucket.s3.eu-west-3.amazonaws.com/assets/FavIcon.ico",
  "https://anecbucket.s3.eu-west-3.amazonaws.com/assets/FavIcon.png",
  "https://anecbucket.s3.eu-west-3.amazonaws.com/dist/index.css",
  "https://anecbucket.s3.eu-west-3.amazonaws.com/assets/offline.css",
  "https://anecbucket.s3.eu-west-3.amazonaws.com/assets/Icon.svg",
];
/** FUNCTIONS */

/** Fetch */

const sendOfflinePage = (resolve) => {
  caches.open(CACHE_NAME).then((cache) => {
    cache.match(OFFLINE_URL).then((cachedResponse) => {
      resolve(cachedResponse);
    });
  });
};

const respondWithFetchPromiseNavigate = (event) =>
  new Promise((resolve) => {
    // event.preloadResponse
    //   .then((preloadResponse) => {
    //     if (preloadResponse) {
    //       resolve(preloadResponse);
    //     } else {
    // Always try the network first.
    fetch(event.request)
      .then((networkResponse) => {
        resolve(networkResponse);
      })
      // send cache offline.html
      .catch(() => sendOfflinePage(resolve));
    // }
    // })
    // .catch(() => sendOfflinePage(resolve));
  });

const fetchSW = (event) => {
  // We only want to call event.respondWith() if this is a navigation request
  // for an HTML page.
  if (event.request.mode === "navigate") {
    event.respondWith(respondWithFetchPromiseNavigate(event));
  } else if (CACHED_FILES.includes(event.request.url)) {
    caches.open(CACHE_NAME).then((cache) => {
      cache.add(event.request.url);
    });
    event.respondWith(caches.match(event.request));
  }
};

/*********************************** */

/** Activate */
const deleteOldCaches = () =>
  new Promise((resolve) => {
    caches.keys().then((keys) => {
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            caches.delete(key);
          }
        })
      ).finally(resolve);
    });
  });

const waitUntilActivatePromise = () =>
  new Promise((resolve) => {
    deleteOldCaches().then(() => {
      // Enable navigation preload if it's supported.
      // See https://developers.google.com/web/updates/2017/02/navigation-preload
      // if ("navigationPreload" in self.registration) {
      //   self.registration.navigationPreload.enable().finally(resolve);
      // }
      resolve();
    });
  });

const activate = (event) => {
  event.waitUntil(waitUntilActivatePromise());
  // Tell the active service worker to take control of the page immediately.
  self.clients.claim();
};

/*********************************** */

/** Install */
const waitUntilInstallationPromise = () =>
  new Promise((resolve) => {
    caches.open(CACHE_NAME).then((cache) => {
      cache.addAll(CACHED_FILES).then(resolve);
      // cache.add(OFFLINE_URL).then(resolve);
    });
  });

const installSW = (event) => {
  event.waitUntil(waitUntilInstallationPromise());
  // Force the waiting service worker to become the active service worker.
  self.skipWaiting();
};
/*********************************** */

/** INIT */
self.addEventListener("install", installSW);
self.addEventListener("activate", activate);
self.addEventListener("fetch", fetchSW);
