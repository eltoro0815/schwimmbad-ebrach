<template>
  <div>
    <div class="container mt-2">
      <h1 class="text-center text-white">
        <div v-if="initDone">Der Kiosk im Schwimmbad Ebrach ist gerade {{ statusText }}!</div>

        <div v-if="hasError">Der Service ist im Moment nicht verfübar!</div>
      </h1>

      <div class="container mt-5 text-center">
        <img src="/img/qr-code.png" class="img-fluid" alt="QR Code" />
      </div>
      <h5 class="text-center text-white mt-2">QR-Code zum Teilen der App</h5>
    </div>
  </div>
</template>

<script>
export default {
  name: "IsOpenMessage",

  data() {
    return {
      isopen: false,
      initDone: false,
      hasError: false
    };
  },
  created() {
    this.axios
      .get("/api/isopen")
      .then(response => {
        this.isopen = response.data.isopen;
        this.initDone = true;

        this.updateBodyColor();
      })
      .catch(error => {
        this.hasError = true;
      });
  },

  updated() {
    this.updateBodyColor();
  },

  computed: {
    statusText() {
      return this.isopen ? "geöffnet" : "geschlossen";
    },

    bodyColor() {
      return this.isopen ? "#28a745" : "#dc3545";
    }
  },

  methods: {
    updateBodyColor() {
      document.body.style.backgroundColor = this.bodyColor;
    }
  }
};
</script>

<style>
</style>