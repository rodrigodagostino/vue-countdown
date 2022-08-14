<script setup>
import { ref, computed, watch } from 'vue'
import store from '@/store'

const props = defineProps({
  diameter: {
    type: Number,
    default: 300,
  },
  strokeWidth: {
    type: Number,
    default: 16,
  },
})

const currentStatus = computed(() => store.getters.currentStatus())
const initialTime = computed(() => store.getters.initialTime())
const currentTime = computed(() => store.getters.currentTime())

const strokeDasharray = (props.diameter - props.strokeWidth) * Math.PI
const strokeDashoffset = computed(() => {
  if (!initialTime.value) return null
  const progressPercentage = (currentTime.value * 100) / initialTime.value
  return (strokeDasharray / 100) * (100 - progressPercentage)
})
const trackActiveSegmentTransition = ref('stroke-dashoffset 100ms linear')

watch(
  () => currentStatus.value,
  (newState) => {
    trackActiveSegmentTransition.value = `stroke-dashoffset ${
      newState === 'idle' ? '1s' : '100ms'
    } linear`
  }
)
</script>

<template>
  <div class="progress-ring-container">
    <svg class="progress-ring" :width="diameter" :height="diameter">
      <defs>
        <linearGradient id="gradient" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="50%" stop-color="var(--emerald-400)" />
          <stop offset="100%" stop-color="var(--teal-600)" />
        </linearGradient>
      </defs>
      <circle
        class="progress-ring__track"
        :stroke-width="strokeWidth"
        :stroke-dasharray="strokeDasharray"
        :r="diameter / 2 - strokeWidth / 2"
        :cx="diameter / 2"
        :cy="diameter / 2"
      />
      <circle
        class="progress-ring__track-active-segment"
        stroke="url(#gradient)"
        :stroke-width="strokeWidth"
        :stroke-dasharray="strokeDasharray"
        :stroke-dashoffset="strokeDashoffset"
        :r="diameter / 2 - strokeWidth / 2"
        :cx="diameter / 2"
        :cy="diameter / 2"
      />
    </svg>
    <div
      class="progress-ring__track-inner-shadow"
      :style="{
        width: `${diameter - strokeWidth * 2}px`,
        height: `${diameter - strokeWidth * 2}px`,
      }"
    ></div>
    <div
      class="progress-ring__track-outer-shadow"
      :style="{ width: `${diameter}px`, height: `${diameter}px` }"
    ></div>
  </div>
</template>

<style lang="scss">
.progress-ring-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: -1;
  padding: 1rem;
  border-radius: 50%;
  box-shadow: -1rem -1rem 1.5rem 0.125rem rgba(255, 255, 255, 0.6),
    inset 1px 1px 1px rgba(255, 255, 255, 0.6),
    inset -1px -1px 1px rgba(0, 0, 0, 0.05),
    1rem 1rem 1.5rem 0.125rem rgba(0, 0, 0, 0.15);
}

.progress-ring {
  vertical-align: middle;

  &__track {
    stroke: rgba(0, 0, 0, 0.1);
    stroke-linecap: round;
    fill: transparent;
  }

  &__track-active-segment {
    stroke-linecap: round;
    fill: transparent;
    transform: rotate(-90deg);
    transform-origin: center;
    transition: v-bind(trackActiveSegmentTransition);
  }

  &__track-inner-shadow,
  &__track-outer-shadow {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    z-index: -1;
  }

  &__track-inner-shadow {
    box-shadow: -2px -2px 4px 1px rgba(255, 255, 255, 0.6),
      inset 1px 1px 1px rgba(255, 255, 255, 0.6),
      inset -1px -1px 1px rgba(0, 0, 0, 0.05),
      2px 2px 4px 1px rgba(0, 0, 0, 0.1);
  }

  &__track-outer-shadow {
    box-shadow: -1px -1px 1px rgba(0, 0, 0, 0.05),
      inset -2px -2px 4px rgba(255, 255, 255, 0.6),
      inset 2px 2px 4px rgba(0, 0, 0, 0.1), 1px 1px 1px rgba(255, 255, 255, 0.6);
  }
}
</style>
