<template lang="pug">
  div
    .row
      label.col {{ title }}
      .col.text-right(v-if="value !== null") {{ mins | time }}
    .row
      .col
        ProgressBar(v-if="value !== null" :value="value")
        .progress(v-else="")
    hr
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import ProgressBar from '@/components/ProgressBar.vue'
import time from '@/filters/time'

const WEEK_DAYS = 'Monday_Tuesday_Wednesday_Thursday_Friday_Saturday_Sunday'.split('_')

@Component({
  components: { ProgressBar },
  filters: { time },
})
export default class DailyStat extends Vue {
  @Prop({type: Number, required: true}) public dayIndex!: number
  @Prop({type: Number, required: false}) public value!: number
  @Prop({type: Number, required: true}) public mins!: number

  public title: string = WEEK_DAYS[this.dayIndex]
}
</script>
