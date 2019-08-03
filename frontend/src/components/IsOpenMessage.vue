<template>
  <div>
    <div class="jumbotron jumbotron-fluid text-white mb-0" v-bind:class="{'bg-success' : isopen, 'bg-danger' : !isopen}">
      <div class="container">
        <h1>
          <div v-if="initDone">Der Kiosk im Schwimmbad Ebrach ist gerade {{ statusText }}</div>

          <div v-if="hasError">Der Service ist im Moment nicht verfübar</div>
        </h1>
      </div>
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
      })
      .catch(error => {
        this.hasError = true;
      });
  },

  computed: {
    statusText() {
      return this.isopen ? "geöffnet" : "geschlossen";
    }
  }
};
</script>

<style>
.jumbotron{
    height: calc(100vh);
}
</style>