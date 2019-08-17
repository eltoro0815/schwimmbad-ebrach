<template>
  <div class="vld-parent">
    <loading
      :active.sync="isLoading"
      :canCancel="canCancel"
      :is-full-page="fullPage"
      :height="height"
      :width="width"
      :color="color"
      :loader="loader"
      :background-color="bgColor"
    ></loading>

    <div>
      <div class="container mt-2">
        <h1 class="text-center text-white">
          <div v-if="initDone">Der Kiosk im Schwimmbad Ebrach ist gerade {{ statusText }}!</div>

          <div v-if="hasError">Der Service ist im Moment nicht verfübar!</div>
        </h1>
        <div class="container mt-5">
          <button
            @click="toggle"
            class="btn btn-block btn-lg"
            v-bind:class="{' btn-danger' : isopen, ' btn-success' : !isopen}"
          >
            <h1>Klicken um auf {{changingText}} zu wechseln</h1>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Import component
import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  name: "AdminForm",

  components: {
    Loading
  },

  data() {
    return {
      isopen: false,
      initDone: false,
      hasError: false,

      isLoading: false,
      fullPage: true,
      canCancel: false,
      useSlot: false,
      loader: "spinner",
      color: "#ff7f00",
      bgColor: "#ffffff",
      height: 128,
      width: 128
    };
  },
  created() {
    this.isLoading = true;
    this.axios
      .get("/api/isopen")
      .then(response => {
        this.isopen = response.data.isopen;
        this.initDone = true;
        this.updateBodyColor();
        this.isLoading = false;
      })
      .catch(error => {
        this.hasError = true;
        this.isLoading = false;
      });
  },

  updated() {
    this.updateBodyColor();
  },

  computed: {
    statusText() {
      return this.isopen ? "geöffnet" : "geschlossen";
    },

    changingText() {
      return this.isopen ? "geschlossen" : "geöffnet";
    },

    bodyColor() {
      return this.isopen ? "#28a745" : "#dc3545";
    }
  },

  methods: {
    updateBodyColor() {
      document.body.style.backgroundColor = this.bodyColor;
    },

    toggle() {
      this.$bvModal
        .msgBoxConfirm("Wirklich auf '" + this.changingText + "' wechseln und Nachrichten an alle schicken?", {
          okTitle: "Ja, auf '" + this.changingText + "' wechseln und Nachrichten an alle schicken!",
          cancelTitle: "Nein, abbrechen!",
          buttonSize: 'lg',
        })
        .then(value => {
          //this.boxOne = value;
          if (value === true) {
            this.isLoading = true;
            this.axios.put("api/toggle").then(() => {
              this.isopen = !this.isopen;
              this.isLoading = false;
            });
          }
        })
        .catch(err => {
          // An error occurred
        });
    }
  }
};
</script>

<style>
.btn-block {
  padding: 10% 0;
}
</style>