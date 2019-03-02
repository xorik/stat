<template lang="pug">
  div
    .row
      label.col
        b Total
      b.col.text-center
        | {{ value | time }}
        | /
        | {{ max | time }}

      .col.text-right
        b(:style="{color: textColor}") {{ diff | time }}
    .row
      .col
        ProgressBar(
          :value="value"
          :target="target"
          :max="max"
          :big="true"
        )
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
  @Prop({
    type: Number,
    required: true,
  })
  public value!: number

  @Prop({
    type: Number,
    required: true,
  })
  public target!: number

  @Prop({
    type: Number,
    required: true,
  })
  public max!: number

  // @Prop({
  //   type: Number,
  //   required: true,
  // })
  // public diff!: number

  get diff(): number {
    return this.value - this.target
  }

  get textColor(): string {
      return ProgressColor(this.diff / 300 + 1)
  }
}
</script>
