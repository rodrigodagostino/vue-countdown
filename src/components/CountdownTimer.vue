<script setup>
import { ref, computed, watch } from 'vue'
import store from '@/store'
import BaseButton from './BaseButton.vue'
import CountdownDisplay from './CountdownTimerDisplay.vue'
import CountdownProgressRing from './CountdownTimerProgressRing.vue'

const currentStatus = computed(() => store.getters.currentStatus())
const currentTime = computed(() => store.getters.currentTime())
const buzzer = ref(null)

watch(currentTime, () => {
  if (currentTime.value <= 0 && currentStatus.value === 'running') {
    buzzer.value.play()
  }
})

const actionButtonIconClasses = computed(() =>
  currentStatus.value === 'idle' ? 'fas fa-play' : 'fas fa-pause'
)

const toggleTimerAction = () =>
  currentStatus.value === 'idle'
    ? store.mutations.startTimer()
    : store.mutations.pauseTimer()
</script>

<template>
  <form class="countdown" @submit.prevent="toggleTimerAction">
    <div class="countdown-tracking row">
      <CountdownProgressRing :diameter="300" :stroke-width="16" />
      <CountdownDisplay />
    </div>
    <div class="countdown-actions row">
      <BaseButton
        icon-classes="fas fa-undo-alt"
        variation="fill"
        @click="store.mutations.resetTimer"
      />
      <BaseButton
        type="submit"
        :icon-classes="actionButtonIconClasses"
        variation="fill"
        size="medium"
      />
    </div>
    <audio ref="buzzer" controls>
      <source src="../assets/ding-dong.wav" type="audio/wav" />
    </audio>
  </form>
</template>

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
