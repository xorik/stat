<template lang="pug">
  div
    .row
      label.col
        b Total
      b.col.text-center
        | {{ mins | time }}
        | /
        | {{ total | time }}

      .col.text-right
        b(:style="{color: textColor}") {{ diff | time }}
    .row
      .col
        ProgressBar(v-if="value !== null" :value="value" :big="true")
        .progress(v-else="")
    hr
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import ProgressBar from '@/components/ProgressBar.vue'
import ProgressColor from '@/components/ProgressColor'
import time from '@/filters/time'

@Component({
    components: { ProgressBar },
    filters: { time },
})
export default class TotalStat extends Vue {
  @Prop({type: Number, required: true}) public value!: number
  @Prop({type: Number, required: true}) public mins!: number
  @Prop({type: Number, required: true}) public total!: number
  @Prop({type: Number, required: true}) public diff!: number

  get textColor(): string {
      return ProgressColor(this.diff / 300 + 1)
  }
}
</script>
