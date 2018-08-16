<template lang="pug">
  .container
    .btn-group
      router-link.btn.btn-secondary(to="/") Home
      router-link.btn.btn-secondary(to="/settings") Settings

    router-view
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({})
</script>

<style lang="scss">
// $grid-gutter-width: 20px;
@import "~bootswatch/dist/cyborg/variables";
@import "~bootstrap/scss/bootstrap";
@import "~bootswatch/dist/cyborg/bootswatch";
</style>
