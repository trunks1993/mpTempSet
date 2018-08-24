<template>
  <div id="app">
    <MpTemplateSetting/>
  </div>
</template>

<script>
import MpTemplateSetting from '@/views/mpTemplateSetting'

export default {
  name: 'App',
  components: {
    MpTemplateSetting
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
  height: 100vh;
}
</style>
