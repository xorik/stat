<template lang="pug">
  div
    .row
      label.col {{ title }}
      .col.text-right(v-if="visible") {{ stat.done | time }}
    .row
      .col
        ProgressBar(
          v-if="visible"
          :target="stat.plan"
          :value="stat.done"
          :max="max"
        )
        .progress(v-else="")
    hr
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import ProgressBar from '@/components/ProgressBar.vue'
import time from '@/filters/time'
import { Stat } from '@/service/TimeCalc'

const WEEK_DAYS = 'Monday_Tuesday_Wednesday_Thursday_Friday_Saturday_Sunday'.split('_')

@Component({
  components: { ProgressBar },
  filters: { time },
})
export default class DailyStat extends Vue {
  @Prop({
    type: Number,
    required: true,
  })
  public dayIndex!: number

  @Prop({
    type: Number,
    required: true,
  })
  public max!: number

  @Prop({
    required: true,
  })
  public stat!: Stat

  public title: string = WEEK_DAYS[this.dayIndex]

  get visible(): boolean {
    return this.stat.plan > 0 || this.stat.done > 0
  }
}
</script>
