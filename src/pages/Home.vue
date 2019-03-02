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
import { State } from 'vuex-class'
import ProgressBar from '@/components/ProgressBar.vue'
import TotalStat from '@/components/TotalStat.vue'
import DailyStat from '@/components/DailyStat.vue'
import { Settings } from '@/service/SettingsService'
import TimeCalc, { Stat, WeeklyStat } from '@/service/TimeCalc'
import TogglStatCalculator from '@/service/toggl/TogglStatCalculator'

const UPDATE_INTERVAL = 10 * 1000

let timer = 0

@Component({
  components: {ProgressBar, TotalStat, DailyStat},
})
export default class App extends Vue {
  @State
  protected settings!: Settings
  protected stat: WeeklyStat = {
    days: [],
    plannedByNow: 0,
  }

  public created(): void {
    this.update()
    timer = setInterval(() => {
      this.update()
    }, UPDATE_INTERVAL)
  }

  public destroyed(): void {
    clearInterval(timer)
  }

  public update(): void {
    const togglStat = TogglStatCalculator.calcStat()
    this.stat = TimeCalc.getProgress(this.settings.plan, togglStat, this.settings.workingHours)
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
