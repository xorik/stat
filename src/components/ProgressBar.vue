<template lang="pug">
  div.progress
    span.progress-value
      | {{displayValue}} %
    .progress-bar(:style="style")

</template>
<script>
import ProgressColor from "./ProgressColor";

export default {
  props: ["value"],

  computed: {
    displayValue: function() {
      return (this.value * 100).toFixed(1);
    },

    style: function() {
      return {
        width: this.value * 100 + "%",
        backgroundColor: ProgressColor(this.value)
      };
    }
  }
};
</script>
<style lang="scss">
.progress {
  span.progress-value {
    position: absolute;
    text-align: center;
    left: 0;
    right: 0;
    color: #fff;
  }
}
</style>
