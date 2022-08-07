<template>
  <form class="countdown" @submit.prevent="toggleTimerAction">
    <div class="countdown-time row">
      <CountdownProgressRing
        :initial-time="initialTime"
        :current-time="currentTime"
        diameter="300"
        stroke-width="16"
      />
      <CountdownDisplay
        :displayed-time="displayedTime"
        @set-time-units="setTimeUnits"
        @increase-time-units="increaseTimeUnits"
        @decrease-time-units="decreaseTimeUnits"
      />
    </div>
    <div class="countdown-actions row">
      <BaseButton
        @click="resetTimer"
        icon-classes="fas fa-undo-alt"
        variation="fill"
      />
      <BaseButton
        type="submit"
        :icon-classes="toggleActionButtonIconClasses"
        variation="fill"
        size="medium"
      />
    </div>
    <audio ref="audio" controls>
      <source src="../assets/ding-dong.wav" type="audio/wav" />
    </audio>
  </form>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'
import BaseButton from './BaseButton.vue'
import CountdownDisplay from './CountdownDisplay.vue'
import CountdownProgressRing from './CountdownProgressRing.vue'

const currentState = ref('idle')
const initialTime = ref(0)
const currentTime = ref(0)
const displayedTime = reactive({
  hours: '00',
  minutes: '00',
  seconds: '00',
})
let intervalId = null
const audio = ref(null)

const setInitialTime = () => (initialTime.value = displayedTimeToMS())

const setCurrentTime = () => (currentTime.value = displayedTimeToMS())

watch(currentTime, () => {
  if (currentTime.value <= 0 && currentState.value === 'running') {
    pauseTimer()
    audio.value.play()
  }
  setDisplayedTime()
})

const setDisplayedTime = () => {
  displayedTime.hours = formatNumber(
    Math.floor(currentTime.value / 1000 / 60 / 60)
  )
  displayedTime.minutes = formatNumber(
    Math.floor((currentTime.value / 1000 / 60) % 60)
  )
  displayedTime.seconds = formatNumber((currentTime.value / 1000) % 60)
}

const displayedTimeToMS = () => {
  const hoursInMS = displayedTime.hours * 60 * 60 * 1000
  const minutesInMS = displayedTime.minutes * 60 * 1000
  const secondsInMS = displayedTime.seconds * 1000
  return hoursInMS + minutesInMS + secondsInMS
}

watch(displayedTime, (newValue) => {
  if (+newValue.hours < 0 || newValue.hours === '') setTimeUnits('hours', 0)
  if (+newValue.minutes < 0 || newValue.minutes === '')
    setTimeUnits('minutes', 0)
  if (+newValue.seconds < 0 || newValue.seconds === '')
    setTimeUnits('seconds', 0)
})

const setTimeUnits = (units, value) => {
  if (currentState.value === 'running') pauseTimer()
  displayedTime[units] = value <= 59 ? formatNumber(value) : 59
  setInitialTime()
  setCurrentTime()
}

/**
 * Timer controls
 */
const increaseTimeUnits = (units) => {
  if (currentState.value === 'running') pauseTimer()
  const increasedValue = +displayedTime[units] + 1
  if (increasedValue > 59) {
    if (units === 'minutes')
      displayedTime['hours'] = formatNumber(+displayedTime['hours'] + 1)
    if (units === 'seconds')
      displayedTime['minutes'] = formatNumber(+displayedTime['minutes'] + 1)
    displayedTime[units] = formatNumber(0)
    return
  }
  displayedTime[units] = formatNumber(increasedValue)
  setInitialTime()
  setCurrentTime()
}

const decreaseTimeUnits = (units) => {
  if (currentState.value === 'running') pauseTimer()
  const decreasedValue = +displayedTime[units] - 1
  if (decreasedValue >= 0) {
    displayedTime[units] = formatNumber(decreasedValue)
    setInitialTime()
    setCurrentTime()
  }
}

const toggleActionButtonIconClasses = computed(() => {
  if (currentState.value === 'idle') {
    return 'fas fa-play'
  }
  return 'fas fa-pause'
})

const startTimer = () => {
  if (!initialTime.value || !currentTime.value) {
    return
  }
  currentState.value = 'running'
  intervalId = setInterval(() => {
    currentTime.value -= 1000
  }, 1000)
}

const pauseTimer = () => {
  currentState.value = 'idle'
  clearInterval(intervalId)
}

const toggleTimerAction = () =>
  currentState.value === 'idle' ? startTimer() : pauseTimer()

const resetTimer = () => (currentTime.value = initialTime.value)

/**
 * Utilities
 */
const formatNumber = (num) => (num < 10 ? `0${num}` : num)
</script>

<style lang="scss">
.countdown {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  padding: 2rem;
}

.countdown-actions {
  align-items: center;
  gap: 1.5rem;

  &::after {
    content: '';
    width: 3rem;
    height: 2.75rem;
  }
}

.row {
  display: flex;
  position: relative;

  &:nth-child(2) {
    margin-top: 5rem;
  }
}

.column {
  display: flex;
  flex-direction: column;
  align-items: center;
}

audio {
  display: none;
}
</style>
