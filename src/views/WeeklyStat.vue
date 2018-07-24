<template lang="pug">
  div
    DailyStat(:value="stat.totalStat" :mins="totalMins")
    DailyStat(v-for="(s, index) in stat.dailyStat" :dayIndex="index" :value="s" :mins="daily[index]")
</template>

<script>
import DailyStat from "@/components/DailyStat";
import TimeCalc from "@/service/TimeCalc";
import store from "@/store";

export default {
  components: { DailyStat },

  computed: {
    daily: function() {
      return store.state.stat;
    },

    stat: function() {
      return TimeCalc.getProgress(
        store.state.settings.plan,
        store.state.stat,
        store.state.settings.workingHours
      );
    },

    totalMins: function() {
      return this.daily.reduce((accum, current) => accum + current, 0);
    }
  }
};
</script>
