<template lang="pug">
  .container
    ul.nav.nav-pills
      li.nav-item
        router-link.nav-link(to="/") Home
      li.nav-item
        router-link.nav-link(to="/settings") Settings

    router-view
</template>

<script>
export default {};
</script>

<style lang="scss">
// $grid-gutter-width: 20px;
@import "~bootswatch/dist/sandstone/variables";
@import "~bootstrap/scss/bootstrap";
@import "~bootswatch/dist/sandstone/bootswatch";
</style>
