<template lang="pug">
  div
    button.btn.btn-dark.border.border-secondary(@click="switchLock()")
      i.fas.fa-lock.fa-lg(v-if="locked")
      i.fas.fa-lock-open.fa-lg(v-else)

    video(loop style="display: none")
      source(:src="src" type="video/mp4")
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import videoSrc from '@/../node_modules/nosleep.js/src/media'

@Component
export default class NoSleepButton extends Vue {
  private locked = false
  private src: string = videoSrc

  public switchLock(): void {
    const video: HTMLMediaElement = document.getElementsByTagName('video')[0]
    if (this.locked) {
      video.pause()
    } else {
      video.play()
    }

    this.locked = !this.locked
  }
}
</script>
