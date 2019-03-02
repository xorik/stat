<template lang="pug">
  div.progress(:class="{big: big}")
    span.progress-value
      | {{displayValue}} %
    .progress-bar(:style="style")
    .progress-bar.bg-secondary.progress-bar-striped(v-if="showTarget" :style="{width: targetWidth}")

</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import progressColor from './ProgressColor'

@Component
export default class ProgressBar extends Vue {
  @Prop({
    type: Number,
    required: true,
  })
  public value!: number

  @Prop({
    type: Number,
    required: true,
  })
  public max!: number

  @Prop({
    type: Number,
    required: true,
  })
  public target!: number

  @Prop({
    type: Boolean,
    required: false,
    default: false,
  })
  public big!: boolean

  get displayValue(): string {
    if (this.target === 0) {
      return '100'
    }

    return (this.value / this.target * 100).toFixed(1)
  }

  get style(): object {
    return {
      width: (this.value / this.max) * 100 + '%',
      backgroundColor: progressColor(this.value / this.target),
    }
  }

  get showTarget(): boolean {
    return this.value < this.target
  }

  get targetWidth(): string {

    return ((this.target - this.value) / this.max) * 100 + '%'
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
