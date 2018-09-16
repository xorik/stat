<template lang="pug">
  i.fas.fa-circle.mx-2(:style="{color: color}")
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import store from '@/store'
import {WebsocketStatus} from '@/service/ReconnectingWebsocket'
import {GREEN, RED, YELLOW} from '@/components/ProgressColor'

@Component
export default class NetworkStatus extends Vue {
  get color(): string {
    const status: WebsocketStatus = store.state.networkStatus

    if (status === 'online') {
      return GREEN
    }

    if (status === 'connecting') {
      return YELLOW
    }

    return RED
  }
}
</script>
