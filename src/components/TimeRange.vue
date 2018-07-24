<template lang="pug">
  input.custom-range(type="range" min="0" max="720" step="30" :value="value" @input="update")
</template>

<script>
export default {
  props: ["value"],

  methods: {
    update: function(event) {
      this.$emit("input", parseInt(event.target.value));
    }
  }
};
</script>
