<template>
  <div>
    <IsOpenMessage />
  </div>
</template>

<script>
import IsOpenMessage from "./IsOpenMessage.vue";
import axios from "axios";

export default {
  name: "home",

  components: {
    IsOpenMessage
  },

  data() {
    return {
      notificationsSupported: false,
      notificationsEnabled: false,
      serviceWorkerRegistration: null,
      subscription: null,
      message: null
    };
  },

  methods: {
    enableNotifications() {
      if (this.notificationsSupported && !this.notificationsEnabled) {
        // Ask permission and when granted, create new subscription
        Notification.requestPermission().then(result => {
          // if granted, create new subscription
          if (result === "granted") {
            this.createSubscription()
              .then(sub => {
                console.log(
                  "Home.vue: subscription created on the client",
                  sub
                );
                this.subscription = sub;

                // get new (or existing user) from backend
                return axios.post("api/user", {
                  username: localStorage.getItem("username")
                });
              })
              .then(({ data }) => {
                const { user } = data;
                console.log("Home.vue: user created on the server", user);
                localStorage.setItem("username", user.name);

                // store new subscription on the server
                return axios.post("api/subscription", {
                  subscription: this.subscription,
                  userId: user.id
                });
              })
              .then(() => {
                this.showFirstNotification();
                this.notificationsEnabled = true;
              });
          } else {
            console.log("Home.vue: User did not grant permission");
          }
        });
      }
    },

    createSubscription() {
      if (this.serviceWorkerRegistration === null) {
        return navigator.serviceWorker.ready // returns a Promise, the active SW registration
          .then(swreg => {
            this.serviceWorkerRegistration = swreg;
            return this.subscribe(this.serviceWorkerRegistration);
          });
      } else {
        return this.subscribe(this.serviceWorkerRegistration);
      }
    },

    subscribe(swreg) {
      console.log(
        "Home.vue: create new subscription for this browser on this device"
      );
      // create new subscription for this browser on this device

      const vapidPublicKey = process.env.VUE_APP_VAPID_PUBLIC_KEY;

      const convertedVapidPublicKey = this.urlBase64ToUint8Array(
        vapidPublicKey
      );
      // return the subscription promise, we chain another then where we can send it to the server
      return swreg.pushManager.subscribe({
        userVisibleOnly: true,
        // This is for security. On the backend, we need to do something with the VAPID_PRIVATE_KEY
        // that you can find in .env to make this work in the end
        applicationServerKey: convertedVapidPublicKey
      });
    },

    showFirstNotification() {
      this.serviceWorkerRegistration.showNotification("Benachrichtungen aktiviert!", {
        body: "Sie werden jetzt benachrichtigt, wenn der Kiosk im Schwimmbad Ebrach öffnet:)",
        icon: "/img/icons/android-chrome-192x192.png",
        image: "/img/autumn-forest.png",
        vibrate: [300, 200, 300],
        badge: "/img/icons/plint-badge-96x96.png"
      });
    },

    findSubscription() {
      console.log("Home.vue: get active service worker registration");
      return navigator.serviceWorker.ready.then(swreg => {
        console.log("Home.vue: active service worker registration received");
        this.serviceWorkerRegistration = swreg;
        return this.getSubscription(this.serviceWorkerRegistration);
      });
    },

    getSubscription(swreg) {
      console.log("Home.vue: ask for available subscription");
      return swreg.pushManager.getSubscription();
    },

    urlBase64ToUint8Array(base64String) {
      const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
      const base64 = (base64String + padding)
        .replace(/\-/g, "+")
        .replace(/_/g, "/");

      const rawData = window.atob(base64);
      let outputArray = new Uint8Array(rawData.length);

      for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
      }
      return outputArray;
    }
  },

  created() {
    if ("Notification" in window && "serviceWorker" in navigator) {
      this.notificationsSupported = true;
    }
  },

  mounted() {
    // Find out if the user has a subscription at the moment.
    this.findSubscription().then(sub => {
      if (sub === null) {
        console.log("Home.vue: no active subscription found on the client");

        // Ask the User to enable subscriptions
        this.enableNotifications();
      } else {
        console.log("Active subscription found", sub);
        // retrieve user info from API

        this.notificationsEnabled = true;
        this.subscription = sub;
      }
    });
  }
};
</script>