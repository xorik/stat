<template lang="pug">
  div
    //Navbar
    .container-fluid
      router-view
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator'
  // import Navbar from '@/components/navbar/Navbar.vue'

  @Component({
    // components: { Navbar },
  })
  export default class App extends Vue {

  }
</script>

<style lang="scss">
  $grid-gutter-width: 20px;
  @import "~bootswatch/dist/cyborg/variables";
  @import "~bootstrap/scss/bootstrap";
  @import "~bootswatch/dist/cyborg/bootswatch";
</style>
