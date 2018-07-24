<template lang="pug">
  div
    .row
      label.col {{ title }}
      .col.text-right {{ mins | time }}
    .row
      .col
        ProgressBar(v-if="value !== null" :value="value")
        .progress(v-else="" style="opacity: 0.3")
    hr
</template>

<script>
import ProgressBar from "@/components/ProgressBar";
import time from "@/filters/time";

const WEEK_DAYS = "Monday_Tuesday_Wednesday_Thursday_Friday_Saturday_Sunday".split(
  "_"
);

export default {
  components: { ProgressBar },

  filters: { time },
  props: ["dayIndex", "value", "mins"],

  data: function() {
    return {
      title: this.dayIndex !== undefined ? WEEK_DAYS[this.dayIndex] : "Total"
    };
  }
};
</script>
