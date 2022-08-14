<script setup>
import { computed } from 'vue'
import { debounce } from 'lodash'
import store from '@/store'
import BaseButton from './BaseButton.vue'

const currentStatus = computed(() => store.getters.currentStatus())
const currentTime = computed(() => store.getters.currentTime())
const displayedTime = computed(() => {
  return {
    hours: formatNumber(Math.floor(currentTime.value / 1000 / 60 / 60)),
    minutes: formatNumber(Math.floor((currentTime.value / 1000 / 60) % 60)),
    seconds: formatNumber(Math.ceil(currentTime.value / 1000) % 60),
  }
})
const MILLISECONDS = {
  HOUR: 3600000,
  MINUTE: 60000,
  SECOND: 1000,
}

const setDisplayedTimeAsInitialAndCurrentTime = debounce((event, units) => {
  const hoursInMS = displayedTime.value.hours * MILLISECONDS.HOUR
  const minutesInMS = displayedTime.value.minutes * MILLISECONDS.MINUTE
  const secondsInMS = displayedTime.value.seconds * MILLISECONDS.SECOND

  let totalInMS = 0
  switch (units) {
    case 'hours':
      totalInMS =
        event.target.value * MILLISECONDS.HOUR + minutesInMS + secondsInMS
      break
    case 'minutes':
      totalInMS =
        hoursInMS + event.target.value * MILLISECONDS.MINUTE + secondsInMS
      break
    case 'seconds':
      totalInMS =
        hoursInMS + minutesInMS + event.target.value * MILLISECONDS.SECOND
      break
  }
  store.mutations.pauseTimer()
  store.mutations.setInitialTime(totalInMS)
  store.mutations.setCurrentTime(totalInMS)
}, 800)

const formatNumber = (num) => (num < 10 ? `0${num}` : num)

const checkIsNumber = (event) => {
  const keyCode = event.keyCode
  if (
    (!keyCode >= 48 && !keyCode <= 57) ||
    (!keyCode >= 96 && !keyCode <= 105)
  ) {
    event.preventDefault()
  }
}
</script>

<template>
  <div class="column">
    <BaseButton
      icon-classes="fas fa-chevron-up"
      variation="flat"
      @click="store.mutations.increaseTime(MILLISECONDS.HOUR)"
    />
    <input
      type="text"
      class="time-units"
      :value="displayedTime.hours"
      maxlength="2"
      :disabled="currentStatus === 'running'"
      @focus="$event.target.select()"
      @keydown="checkIsNumber"
      @input="setDisplayedTimeAsInitialAndCurrentTime($event, 'hours')"
    />
    <BaseButton
      icon-classes="fas fa-chevron-down"
      variation="flat"
      @click="store.mutations.decreaseTime(MILLISECONDS.HOUR)"
    />
    <span class="time-label">H</span>
  </div>
  <div class="column">
    <div class="separator">:</div>
  </div>
  <div class="column">
    <BaseButton
      icon-classes="fas fa-chevron-up"
      variation="flat"
      @click="store.mutations.increaseTime(MILLISECONDS.MINUTE)"
    />
    <input
      type="text"
      class="time-units"
      :value="displayedTime.minutes"
      maxlength="2"
      :disabled="currentStatus === 'running'"
      @focus="$event.target.select()"
      @keydown="checkIsNumber"
      @input="setDisplayedTimeAsInitialAndCurrentTime($event, 'minutes')"
    />
    <BaseButton
      icon-classes="fas fa-chevron-down"
      variation="flat"
      @click="store.mutations.decreaseTime(MILLISECONDS.MINUTE)"
    />
    <span class="time-label">M</span>
  </div>
  <div class="column">
    <div class="separator">:</div>
  </div>
  <div class="column">
    <BaseButton
      icon-classes="fas fa-chevron-up"
      variation="flat"
      @click="store.mutations.increaseTime(MILLISECONDS.SECOND)"
    />
    <input
      type="text"
      class="time-units"
      :value="displayedTime.seconds"
      maxlength="2"
      :disabled="currentStatus === 'running'"
      @focus="$event.target.select()"
      @keydown="checkIsNumber"
      @input="setDisplayedTimeAsInitialAndCurrentTime($event, 'seconds')"
    />
    <BaseButton
      icon-classes="fas fa-chevron-down"
      variation="flat"
      @click="store.mutations.decreaseTime(MILLISECONDS.SECOND)"
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
