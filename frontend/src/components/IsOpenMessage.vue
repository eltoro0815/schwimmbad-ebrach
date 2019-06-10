<template>
  <div>
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

    <div v-if="initDone">
      <button
        type="submit"
        class="btn btn-lg btn-block"
        v-bind:class="{'btn-success' : isopen, 'btn-danger' : !isopen}"
        @click="toggle"
      >
        <div class="container">
          <div class="row">
            <div class="col-3 align-self-center"></div>
            <div class="col-6">
              <div class="container">Das Schwimmbad Ebrach ist gerade {{ statusText }}</div>
            </div>

            <div class="col-3 align-self-center"></div>
          </div>
        </div>
      </button>
    </div>


    <div v-if="hasError">
      <button
        type="submit"
        class="btn btn-lg btn-block btn-danger"
      >
      Der Service ist im Moment nicht verfübar
      </button>
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
  name: "IsOpenMessage",

  components: {
    Loading
  },

  data() {
    return {
      isopen: false,
      initDone: false,
      hasError: false,

      // Loading
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
    this.axios
      .get("/api/isopen")
      .then(response => {
        this.isopen = response.data.isopen;
        this.initDone = true;
      })
      .catch(error => {
        this.hasError = true;
      });
  },

  methods: {
    toggle() {
      this.isLoading = true;

      this.axios.put("/api/toggle");
    }
  },

  computed: {
    statusText() {
      return this.isopen ? "geöffnet" : "geschlossen";
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="bootstrap/dist/css/bootstrap.min.css">
</style>