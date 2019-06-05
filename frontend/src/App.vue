<template>
  <div id="app">
    <IsOpenMessage/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import IsOpenMessage from "./components/IsOpenMessage.vue";

@Component({
  components: {
    IsOpenMessage
  }
})
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  margin-top: 60px;
}
</style>
