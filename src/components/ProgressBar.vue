<template lang="pug">
  div.progress(:class="{big: big}")
    span.progress-value
      | {{displayValue}} %
    .progress-bar(:style="style")

</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import ProgressColor from './ProgressColor'

@Component
export default class ProgressBar extends Vue {
  @Prop({type: Number, required: true}) public value!: number
  @Prop({type: Boolean, required: false, default: false}) public big!: boolean

  get displayValue(): string {
    return (this.value * 100).toFixed(1)
  }

  get style(): object {
    return {
      width: (this.value / 1.2) * 100 + '%',
      backgroundColor: ProgressColor(this.value),
    }
  }
}
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

  &.big {
    height: 1.8rem;
    font-size: 1rem;
    font-weight: bold;

    span.progress-value {
      line-height: 1.8rem;
    }
  }
}
</style>
