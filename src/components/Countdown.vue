<template>
	<div class="container">
		<h1>{{ message }}</h1>
		<form class="timer" @submit.prevent="toggleTimerAction">
			<div class="row">
				<ProgressRing :initialTime="initialTime" :currentTime="currentTime" />
				<div class="column">
					<BaseButton
						@click="increaseTimeUnits('hours')"
						icon-classes="fas fa-chevron-up"
						variation="text-neutral"
					/>
					<input type="text" class="time-units" v-model="displayedTime.hours" />
					<BaseButton
						@click="decreaseTimeUnits('hours')"
						icon-classes="fas fa-chevron-down"
						variation="text-neutral"
					/>
					<span class="time-label">Hours</span>
				</div>
				<div class="column">
					<div class="separator">:</div>
				</div>
				<div class="column">
					<BaseButton
						@click="increaseTimeUnits('minutes')"
						icon-classes="fas fa-chevron-up"
						variation="text-neutral"
					/>
					<input type="text" class="time-units" v-model="displayedTime.minutes" />
					<BaseButton
						@click="decreaseTimeUnits('minutes')"
						icon-classes="fas fa-chevron-down"
						variation="text-neutral"
					/>
					<span class="time-label">Min</span>
				</div>
				<div class="column">
					<div class="separator">:</div>
				</div>
				<div class="column">
					<BaseButton
						@click="increaseTimeUnits('seconds')"
						icon-classes="fas fa-chevron-up"
						variation="text-neutral"
					/>
					<input type="text" class="time-units" v-model="displayedTime.seconds" />
					<BaseButton
						@click="decreaseTimeUnits('seconds')"
						icon-classes="fas fa-chevron-down"
						variation="text-neutral"
					/>
					<span class="time-label">Sec</span>
				</div>
			</div>
			<div class="row">
				<BaseButton type="submit" :icon-classes="toggleActionButtonIconClasses" />
			</div>
		</form>
	</div>
</template>

<script>
import BaseButton from './BaseButton.vue'
import ProgressRing from './ProgressRing.vue'
import { ref, reactive, computed, watch } from 'vue'

export default {
	components: {
		BaseButton,
		ProgressRing,
	},
	setup() {
		const message = ref( 'Countdown' )
		const currentState = ref( 'idle' )
		const initialTime = ref( null )
		const currentTime = ref( null )
		const displayedTime = reactive( {
			hours: '00',
			minutes: '00',
			seconds: '00',
		} )
		let intervalId = null

		const setInitialTime = () => initialTime.value = displayedTimeToMS()

		const setCurrentTime = () => currentTime.value = displayedTimeToMS()

		watch( currentTime, () => {
			if ( currentTime.value <= 0 ) {
				pauseTimer()
				currentState.value = 'idle'
			}
			setDisplayedTime()
		} )

		const setDisplayedTime = () => {
			displayedTime.hours = formatNumber( Math.floor( currentTime.value / 1000 / 60 / 60 ) )
			displayedTime.minutes = formatNumber( Math.floor( currentTime.value / 1000 / 60 % 60 ) )
			displayedTime.seconds = formatNumber( currentTime.value / 1000 % 60 )
		}

		const displayedTimeToMS = () => {
			const hoursInMS = displayedTime.hours * 60 * 60 * 1000
			const minutesInMS = displayedTime.minutes * 60 * 1000
			const secondsInMS = displayedTime.seconds * 1000
			return hoursInMS + minutesInMS + secondsInMS
		}

		watch( displayedTime, newValue => {
			if ( +newValue.hours < 0 || newValue.hours === '' ) displayedTime.hours = '00'
			if ( +newValue.minutes > 59 ) displayedTime.minutes = '59'
			if ( +newValue.minutes < 0 || newValue.minutes === '' ) displayedTime.minutes = '00'
			if ( +newValue.seconds > 59 ) displayedTime.seconds = '59'
			if ( +newValue.seconds < 0 || newValue.seconds === '' ) displayedTime.seconds = '00'
		} )

		/**
		 * Timer controls
		 */
		const increaseTimeUnits = units => {
			if ( currentState.value === 'running' ) pauseTimer()
			const increasedValue = +displayedTime[ units ] + 1
			if ( increasedValue > 59 && ( units === 'minutes' || units === 'seconds' ) ) {
				return
			}
			displayedTime[ units ] = formatNumber( increasedValue )
			setInitialTime()
			setCurrentTime()
		}

		const decreaseTimeUnits = units => {
			if ( currentState.value === 'running' ) pauseTimer()
			const decreasedValue = +displayedTime[ units ] - 1
			if ( decreasedValue >= 0 ) {
				displayedTime[ units ] = formatNumber( decreasedValue )
				setInitialTime()
				setCurrentTime()
			}
		}

		const toggleActionButtonIconClasses = computed( () => {
			if ( currentState.value === 'idle' ) {
				return 'fas fa-play'
			}
			return 'fas fa-pause'
		} )

		const startTimer = () => {
			if ( initialTime.value === null ) {
				setInitialTime()
				setCurrentTime()
			}
			currentState.value = 'running'
			intervalId = setInterval( () => {
				currentTime.value -= 1000
			}, 1000 )
		}

		const pauseTimer = () => {
			currentState.value = 'idle'
			clearInterval( intervalId )
		}

		const toggleTimerAction = () => {
			if ( currentState.value === 'idle' ) {
				startTimer()
			} else {
				pauseTimer()
			}
		}

		/**
		 * Utilities
		 */
		const formatNumber = num => num < 10 ? `0${ num }` : num

		return {
			message,
			currentState,
			displayedTime,
			toggleActionButtonIconClasses,
			toggleTimerAction,
			initialTime,
			currentTime,
			increaseTimeUnits,
			decreaseTimeUnits,
		}
	},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.timer {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 2rem;
	padding: 2rem;
}

.row {
	display: flex;
	position: relative;
}

.column {
	display: flex;
	flex-direction: column;
	align-items: center;
}

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
	margin-top: 1.325em;
}
</style>
