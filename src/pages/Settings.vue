<template lang="pug">
  div
    h5 Settings
    .form-row.form-group
      .col-md-2 Working hours:
      .col
        input.form-control(
          type="number"
          v-model="data.workingHours[0]"
        )
      .col
        input.form-control(
          type="number"
          v-model="data.workingHours[1]"
        )

    h6 Total planned time: {{ planMins | time }}
    .form-row.form-group(v-for="(day, index) in days")
      .col-md-2.col-12 {{day}}
      .col
        input.custom-range(
          type="range"
          min="0"
          max="720"
          step="30"
          v-model.number="data.plan[index]"
        )
      .col-auto.text-right {{ data.plan[index] | time }}

    div.text-right
      button.btn.btn-primary(@click="save") Save

</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import SettingsService, { Settings } from '@/service/SettingsService'
import time from '@/filters/time'

@Component({
    filters: { time },
})
export default class SettingsPage extends Vue {
  public data: Settings = SettingsService.get()
  public days: string[] = 'Monday_Tuesday_Wednesday_Thursday_Friday_Saturday_Sunday'.split('_')

  public save(): void {
    SettingsService.save(this.data)
  }

  get planMins(): number {
    return this.data.plan.reduce((accum: number, current: number): number => accum + current, 0)
  }
}
</script>
