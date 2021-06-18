<template>
	<form class="countdown" @submit.prevent="toggleTimerAction">
		<div class="countdown-time row">
			<CountdownProgressRing
				:initialTime="initialTime"
				:currentTime="currentTime"
				diameter="300"
				strokeWidth="16"
			/>
			<div class="column">
				<BaseButton
					@click="increaseTimeUnits('hours')"
					icon-classes="fas fa-chevron-up"
					variation="flat"
				/>
				<input type="text" class="time-units" v-model="displayedTime.hours" />
				<BaseButton
					@click="decreaseTimeUnits('hours')"
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
					@click="increaseTimeUnits('minutes')"
					icon-classes="fas fa-chevron-up"
					variation="flat"
				/>
				<input type="text" class="time-units" v-model="displayedTime.minutes" />
				<BaseButton
					@click="decreaseTimeUnits('minutes')"
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
					@click="increaseTimeUnits('seconds')"
					icon-classes="fas fa-chevron-up"
					variation="flat"
				/>
				<input type="text" class="time-units" v-model="displayedTime.seconds" />
				<BaseButton
					@click="decreaseTimeUnits('seconds')"
					icon-classes="fas fa-chevron-down"
					variation="flat"
				/>
				<span class="time-label">S</span>
			</div>
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

<script>
import BaseButton from './BaseButton.vue'
import CountdownProgressRing from './CountdownProgressRing.vue'
import { ref, reactive, computed, watch } from 'vue'

export default {
	components: {
		BaseButton,
		CountdownProgressRing,
	},
	setup() {
		const currentState = ref( 'idle' )
		const initialTime = ref( 0 )
		const currentTime = ref( 0 )
		const displayedTime = reactive( {
			hours: '00',
			minutes: '00',
			seconds: '00',
		} )
		let intervalId = null
		const audio = ref( null )

		const setInitialTime = () => initialTime.value = displayedTimeToMS()

		const setCurrentTime = () => currentTime.value = displayedTimeToMS()

		watch( currentTime, () => {
			if ( currentTime.value <= 0 ) {
				pauseTimer()
				audio.value.play()
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
			if ( !initialTime.value || !currentTime.value ) {
				return
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

		const toggleTimerAction = () =>
			currentState.value === 'idle' ? startTimer() : pauseTimer()

		const resetTimer = () => currentTime.value = initialTime.value

		/**
		 * Utilities
		 */
		const formatNumber = num => num < 10 ? `0${ num }` : num

		return {
			initialTime,
			currentTime,
			currentState,
			displayedTime,
			audio,
			increaseTimeUnits,
			decreaseTimeUnits,
			toggleActionButtonIconClasses,
			toggleTimerAction,
			resetTimer,
		}
	},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
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
		content: "";
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

audio {
	display: none;
}
</style>
