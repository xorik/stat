<template lang="pug">
  div
    h3 Settings
    .form-row.form-group
      .col-md-2 Working hours:
      .col
        input.form-control(type="text" v-model="data.workingHours[0]")
      .col
        input.form-control(type="text" v-model="data.workingHours[1]")
    .form-row.form-group(v-for="(day, index) in days")
      .col-md-2.col-12 {{day}}
      .col
        TimeRange(v-model="data.plan[index]")
      .col-auto.text-right {{data.plan[index] | time }}

    div.text-right
      button.btn.btn-primary(@click="save") Save

</template>
<script>
import time from "@/filters/time";
import TimeRange from "@/components/TimeRange";
import store from "@/store";

export default {
  components: { TimeRange },

  filters: { time },

  data() {
    return {
      data: store.state.settings,
      days: "Monday_Tuesday_Wednesday_Thursday_Friday_Saturday_Sunday".split(
        "_"
      )
    };
  },

  methods: {
    save: function() {
      store.commit("saveSettings", this.data);
    }
  }
};
</script>
