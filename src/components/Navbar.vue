<template lang="pug">
  nav.navbar.navbar-expand.fixed-top.navbar-dark.bg-secondary.my-padding.justify-content-between
    .container-fluid

      router-link.navbar-brand(to="/")
        FontAwesomeIcon(icon="signal" style="transform: rotate(90deg) scaleX(-1)")
        |
        | Stat

      ul.navbar-nav.mr-auto
        router-link.nav-item(to="/settings" tag="li")
          a.nav-link Settings
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

@Component({
  components: {
    FontAwesomeIcon,
  },
})
export default class Navbar extends Vue {
}
</script>

<style type="scss">
  body {
    padding-top: 4rem;
  }

  .navbar.my-padding {
    padding-top: 0.2rem;
    padding-bottom: 0.2rem;
  }
</style>
