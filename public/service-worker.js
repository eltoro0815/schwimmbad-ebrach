importScripts("/precache-manifest.33eef389f4adc9ab2a3ee3ff181c3cad.js", "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

// custom service-worker.js
if (workbox) {
    // adjust log level for displaying workbox logs
    workbox.core.setLogLevel(workbox.core.LOG_LEVELS.debug)

    // apply precaching. In the built version, the precacheManifest will
    // be imported using importScripts (as is workbox itself) and we can 
    // precache this. This is all we need for precaching
    workbox.precaching.precacheAndRoute(self.__precacheManifest);

    // Make sure to return a specific response for all navigation requests.
    // Since we have a SPA here, this should be index.html always.
    // https://stackoverflow.com/questions/49963982/vue-router-history-mode-with-pwa-in-offline-mode

    // workbox.routing.registerNavigationRoute('/index.html')
    // we do not use this to be able to simple test a get route

    // Setup cache strategy for Google Fonts. They consist of two parts, a static one
    // coming from fonts.gstatic.com (strategy CacheFirst) and a more ferquently updated on
    // from fonts.googleapis.com. Hence, split in two registerroutes
    workbox.routing.registerRoute(
        /^https:\/\/fonts\.googleapis\.com/,
        new workbox.strategies.StaleWhileRevalidate({
            cacheName: 'google-fonts-stylesheets',
        })
    )

    workbox.routing.registerRoute(
        /^https:\/\/fonts\.gstatic\.com/,
        new workbox.strategies.CacheFirst({
            cacheName: 'google-fonts-webfonts',
            plugins: [
                new workbox.cacheableResponse.Plugin({
                    statuses: [0, 200],
                }),
                new workbox.expiration.Plugin({
                    maxAgeSeconds: 60 * 60 * 24 * 365,
                    maxEntries: 30,
                }),
            ],
        })
    )

    workbox.routing.registerRoute(
        /^https:\/\/stackpath\.bootstrapcdn\.com/,
        new workbox.strategies.StaleWhileRevalidate({
            cacheName: 'fontawesome',
        })
    );
}

// This code listens for the user's confirmation to update the app.
self.addEventListener('message', (event) => {
    if (!event.data) {
        return;
    }

    switch (event.data) {
        case 'skipWaiting':
            self.skipWaiting();
            break;
        default:
            // NOOP
            break;
    }
})

// Listen to Push
self.addEventListener('push', (event) => {

    if (!event.data) {
        return;
    }

    let data = {};

    try {
        data = event.data.json();
    }
    catch {
        data.title = "TestTitle";
        data.body = event.data.text();
        data.icon = "/img/icons/android-chrome-192x192.png";
    }


    const options = {
        body: data.body,
        icon: data.icon,
        badge: "/img/icons/kiosk-badge-96x96.png",
    }

    event.waitUntil(self.registration.showNotification(data.title, options));

})

// Close Notification if you click on it
self.addEventListener('notificationclick', function (event) {

    const clickedNotification = event.notification;
    clickedNotification.close();

    event.waitUntil(
        clients.openWindow('https://schwimmbad-ebrach.de/')
    );
})
