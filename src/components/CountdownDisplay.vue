<script setup>
import BaseButton from './BaseButton.vue'

defineProps({
  displayedTime: Object,
})
defineEmits([ 'setTimeUnits', 'increaseTimeUnits', 'decreaseTimeUnits' ])

const checkIsNumber = event => {
  if ( event.keyCode < 48 || event.keyCode > 57 ) {
    event.preventDefault()
  }
}
</script>

<template>
  <div class="column">
    <BaseButton
      @click="$emit('increaseTimeUnits', 'hours')"
      icon-classes="fas fa-chevron-up"
      variation="flat"
    />
    <input
      type="text"
      class="time-units"
      :value="displayedTime.hours"
      @keydown="checkIsNumber"
      @input="$emit('setTimeUnits', 'hours', $event.target.value)"
    />
    <BaseButton
      @click="$emit('decreaseTimeUnits', 'hours')"
      icon-classes="fas fa-chevron-down"
      variation="flat"
    />
    <span class="time-label">H</span>
  </div>
  <div class="column">
    <div class="separator">:</div>
  </div>
  <div class="column">
    <BaseButton
      @click="$emit('increaseTimeUnits', 'minutes')"
      icon-classes="fas fa-chevron-up"
      variation="flat"
    />
    <input
      type="text"
      class="time-units"
      :value="displayedTime.minutes"
      @keydown="checkIsNumber"
      @input="$emit('setTimeUnits', 'minutes', $event.target.value)"
    />
    <BaseButton
      @click="$emit('decreaseTimeUnits', 'minutes')"
      icon-classes="fas fa-chevron-down"
      variation="flat"
    />
    <span class="time-label">M</span>
  </div>
  <div class="column">
    <div class="separator">:</div>
  </div>
  <div class="column">
    <BaseButton
      @click="$emit('increaseTimeUnits', 'seconds')"
      icon-classes="fas fa-chevron-up"
      variation="flat"
    />
    <input
      type="text"
      class="time-units"
      :value="displayedTime.seconds"
      @keydown="checkIsNumber"
      @input="$emit('setTimeUnits', 'seconds', $event.target.value)"
    />
    <BaseButton
      @click="$emit('decreaseTimeUnits', 'seconds')"
      icon-classes="fas fa-chevron-down"
      variation="flat"
    />
    <span class="time-label">S</span>
  </div>
</template>

<style lang="scss">
.time-units {
  font-family: var(--font-main);
  font-size: 2.5rem;
  text-align: center;
  max-width: 4rem;
  background-color: transparent;
  border-color: transparent;
}

.button-increase,
.button-decrease {
  border-color: transparent;
}

.time-label {
  font-family: var(--font-main);
  font-size: 0.875rem;
  text-transform: uppercase;
}

.separator {
  font-size: 2.5rem;
  margin-top: 2.6875rem;
}
</style>
