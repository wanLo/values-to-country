<template>
  <div class="flex flex-grow justify-center items-start">
    <div
      class="w-24 text-xs sm:text-sm text-gray-700 sm:whitespace-no-wrap text-right"
    >
      {{ left }}
    </div>
    <div class="mx-2 w-full relative">
      <div
        v-if="rangeValue !== null"
        :style="rangeValueCSS"
        style="left: var(--range-value); bottom: 2.1rem"
        class="absolute text-sm text-gray-700 w-8 rounded-full text-center select-none"
      >
        {{ rangeValue }}
      </div>
      <input
        :value="rangeValue"
        type="range"
        :min="rangeMin"
        :max="rangeMax"
        :step="rangeStep"
        :class="rangeValue !== null ? 'range-visible' : 'range-invisible'"
        class="w-full"
        @input="$emit('update:rangeValue', parseFloat($event.target.value))"
      />
    </div>
    <div class="w-24 text-xs sm:text-sm text-gray-700 sm:whitespace-no-wrap">
      {{ right }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Range',
  props: {
    labelLeft: {
      type: String,
      default: '',
    },
    labelRight: {
      type: String,
      default: '',
    },
    rangeValue: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      rangeMin: 1,
      rangeMax: 10,
      rangeStep: 1,
    }
  },
  computed: {
    rangeValueCSS() {
      return {
        /*'--range-value':
          'calc(' +
          this.rangeValue +
          '% + ' +
          (this.rangeValue * 0.5 + 0.75) +
          'rem)',*/
          '--range-value':
          'calc(' +
          this.rangeValue * 10.1 +
          '% + ' +
          (-2) +
          'rem)',
      }
    },
    left() {
      if (this.labelLeft !== '') return this.labelLeft
      if (this.language === 'de') return 'Gar Nicht'
      else return 'Not at all'
    },
    right() {
      if (this.labelRight !== '') return this.labelRight
      if (this.language === 'de') return 'Sehr'
      else return 'Very much'
    },
  },
}
</script>

<style scoped>
.range-visible::-moz-range-thumb {
  visibility: visible;
}
.range-visible::-webkit-slider-thumb {
  visibility: visible;
}
.range-visible::-ms-thumb {
  visibility: visible;
}
.range-invisible::-moz-range-thumb {
  visibility: hidden;
}
.range-invisible::-webkit-slider-thumb {
  visibility: hidden;
}
.range-invisible::-ms-thumb {
  visibility: hidden;
}
</style>
