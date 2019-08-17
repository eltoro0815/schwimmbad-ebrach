<template>
  <div>
    <Home />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import Home from "./components/Home.vue";

@Component({
  components: {
    Home
  }
})
export default class App extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="bootstrap/dist/css/bootstrap.css">
</style>

<style src="bootstrap-vue/dist/bootstrap-vue.css">
</style>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}
</style>
