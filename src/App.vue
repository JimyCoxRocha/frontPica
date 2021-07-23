<template>
  <div id="app">
    <Calculadoraa />

  </div>
</template>

<script>
import Calculadoraa from './login/LoginPage.vue'

export default {
  name: 'App',
  components: {
    Calculadoraa
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
