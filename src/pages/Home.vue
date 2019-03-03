<template lang="pug">
  div
    TotalStat(
      :value="doneByNow"
      :target="stat.plannedByNow"
      :max="totalPlan"
    )

    DailyStat(
      v-for="(s, index) in stat.days"
      :key="index"
      :dayIndex="index"
      :max="maxPlan"
      :stat="s"
    )
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import ProgressBar from '@/components/ProgressBar.vue'
import TotalStat from '@/components/TotalStat.vue'
import DailyStat from '@/components/DailyStat.vue'
import { Stat, WeeklyStat } from '@/service/TimeCalc'
import { app } from '@/store'

@Component({
  components: {ProgressBar, TotalStat, DailyStat},
})
export default class App extends Vue {
  get stat(): WeeklyStat {
    return app.stat
  }

  get doneByNow(): number {
    return this.stat.days.reduce((prev: number, current: Stat): number => prev + current.done, 0)
  }

  get maxPlan(): number {
    const dailyMax: number[] = this.stat.days.map((s: Stat): number => Math.max(s.plan, s.done))

    return Math.max(0, ...dailyMax)
  }

  get totalPlan(): number {
    return this.stat.days.reduce((prev: number, current: Stat): number => prev + current.plan, 0)
  }
}
</script>
