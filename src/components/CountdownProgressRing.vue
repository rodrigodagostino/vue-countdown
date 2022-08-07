<template>
  <div class="progress-ring-container">
    <svg class="progress-ring" :width="ringDiameter" :height="ringDiameter">
      <defs>
        <linearGradient id="gradient" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="50%" stop-color="var(--emerald-400)" />
          <stop offset="100%" stop-color="var(--teal-600)" />
        </linearGradient>
      </defs>
      <circle
        class="progress-ring__track"
        :stroke-width="ringStrokeWidth"
        :stroke-dasharray="ringStrokeDasharray"
        :r="ringDiameter / 2 - ringStrokeWidth / 2"
        :cx="ringDiameter / 2"
        :cy="ringDiameter / 2"
      />
      <circle
        class="progress-ring__track-active-segment"
        stroke="url(#gradient)"
        :stroke-width="ringStrokeWidth"
        :stroke-dasharray="ringStrokeDasharray"
        :stroke-dashoffset="ringStrokeDashoffset"
        :r="ringDiameter / 2 - ringStrokeWidth / 2"
        :cx="ringDiameter / 2"
        :cy="ringDiameter / 2"
      />
    </svg>
    <div
      class="progress-ring__track-inner-shadow"
      :style="{
        width: `${ringDiameter - ringStrokeWidth * 2}px`,
        height: `${ringDiameter - ringStrokeWidth * 2}px`,
      }"
    ></div>
    <div
      class="progress-ring__track-outer-shadow"
      :style="{ width: `${ringDiameter}px`, height: `${ringDiameter}px` }"
    ></div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  initialTime: Number,
  currentTime: Number,
  diameter: String,
  strokeWidth: String,
})

const ringDiameter = +props.diameter
const ringStrokeWidth = +props.strokeWidth
const ringStrokeDasharray = (ringDiameter - ringStrokeWidth) * Math.PI
const ringStrokeDashoffset = computed(() => {
  if (props.initialTime) {
    const progressPercentage = (props.currentTime * 100) / props.initialTime
    return (ringStrokeDasharray / 100) * (100 - progressPercentage)
  }
  return null
})
</script>

<style scoped lang="scss">
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
    transition: stroke-dashoffset 1s linear;
  }

  &__track-active-segment {
    stroke-linecap: round;
    fill: transparent;
    transform: rotate(-90deg);
    transform-origin: center;
    transition: stroke-dashoffset 1s linear;
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
