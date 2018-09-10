<template lang="pug">
  nav.navbar.navbar-expand.fixed-top.navbar-dark.bg-secondary.my-padding.justify-content-between
    .container

      router-link.navbar-brand(to="/")
        i.fas.fa-signal(style="transform: rotate(90deg) scaleX(-1)")
        |
        | Stat

      ul.navbar-nav.mr-auto
        router-link.nav-item(to="/settings" tag="li")
          a.nav-link Settings

      NetworkStatus

      .btn-group.d-flex.d-sm-none
        NoSleepButton
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import NetworkStatus from '@/components/navbar/NetworkStatus.vue'
import NoSleepButton from '@/components/navbar/NoSleepButton.vue'

@Component({
  components: { NetworkStatus, NoSleepButton },
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
