<template lang="pug">
  div
    TotalStat(:value="stat.totalStat" :mins="doneMins" :diff="stat.diff" :total="planMins")
    DailyStat(v-for="(s, index) in stat.dailyStat" :key="index" :dayIndex="index" :value="s" :mins="daily[index]")
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import DailyStat from '@/components/DailyStat.vue'
import TotalStat from '@/components/TotalStat.vue'
import TimeCalc from '@/service/TimeCalc'
import store from '@/store'

const UPDATE_INTERVAL = 10 * 1000

@Component({
    components: { DailyStat, TotalStat },
})
export default class WeeklyStat extends Vue {
  protected now: number = 0

  public created(): void {
      setInterval(() => {
          this.now++
      }, UPDATE_INTERVAL)
  }

  get daily(): Array<number | null> {
    return store.state.upworkStat
  }

  get stat(): IStat {
    let x = this.now; // tslint:disable-line
    return TimeCalc.getProgress(
      store.state.settings.plan,
      store.state.upworkStat,
      store.state.settings.workingHours,
    )
  }

  get doneMins(): number {
    return this.daily.reduce((accum: number, current: number | null): number => accum + (current ? current : 0), 0)
  }

  get planMins(): number {
      return store.state.settings.plan.reduce((accum: number, current: number): number => accum + current, 0)
  }
}
</script>
