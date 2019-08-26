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

function firstWindowClient() {
    return clients.matchAll({ type: 'window' }).then(function (windowClients) {
        return windowClients.length ? windowClients[0] : Promise.reject("No clients");
    });
}

// This code listens for the user's confirmation to update the app.
self.addEventListener('message', (event) => {

    console.log("SW Received Message: " + event.data);

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
        tag: 'message-group-1',
        renotify: true
    }

    event.waitUntil(self.registration.showNotification(data.title, options));

    event.waitUntil(send_refresh_message_to_all_clients());
})

// Close Notification if you click on it
self.addEventListener('notificationclick', function (event) {

    var notification = event.notification;

    event.notification.close();

    var promise = Promise.resolve();

    // Try to focus
    promise =
        promise.then(function () { return firstWindowClient(); })
            .then(function (client) { return client.focus(); });
        

    // If focus fails, open window
    promise = promise.catch(function () { clients.openWindow("https://schwimmbad-ebrach.de/"); });

    event.waitUntil(promise);
})

function send_refresh_message_to_client(client) {
    return new Promise(function (resolve, reject) {
        var msg_chan = new MessageChannel();

        msg_chan.port1.onmessage = function (event) {
            if (event.data.error) {
                reject(event.data.error);
            } else {
                resolve(event.data);
            }
        };

        client.postMessage("[REFRESH]", [msg_chan.port2]);
    });
}

function send_refresh_message_to_all_clients() {
    clients.matchAll({ includeUncontrolled: true }).then(clients => {
        clients.forEach(client => {
            send_refresh_message_to_client(client);
        })
    })
}