<template>
		<svg class="progress-ring" :width="ringDiameter" :height="ringDiameter">
			<circle
				class="progress-ring__circle"
				stroke="var(--gray-100)"
				fill="transparent"
				:stroke-width="ringStrokeWidth"
				:stroke-dasharray="ringStrokeDasharray"
				:r="ringDiameter / 2 - ringStrokeWidth / 2"
				:cx="ringDiameter / 2"
				:cy="ringDiameter / 2"
			/>
			<circle
				class="progress-ring__circle"
				stroke="var(--color-main)"
				fill="transparent"
				:stroke-width="ringStrokeWidth"
				:stroke-dasharray="ringStrokeDasharray"
				:stroke-dashoffset="ringStrokeDashoffset"
				:r="ringDiameter / 2 - ringStrokeWidth / 2"
				:cx="ringDiameter / 2"
				:cy="ringDiameter / 2"
			/>
		</svg>
</template>

<script>
import { computed } from 'vue'

export default {
	props: {
		initialTime: Number,
		currentTime: Number,
	},
	setup( props ) {
		const ringDiameter = 320
		const ringStrokeWidth = 12
		const ringStrokeDasharray = ( ringDiameter - ringStrokeWidth ) * Math.PI
		const ringStrokeDashoffset = computed( () => {
			if ( props.initialTime ) {
				const progressPercentage = props.currentTime * 100 / props.initialTime
				return ringStrokeDasharray / 100 * ( 100 - progressPercentage )
			}
			return null
		} )

		return {
			ringDiameter,
			ringStrokeWidth,
			ringStrokeDasharray,
			ringStrokeDashoffset,
		}
	},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.progress-ring {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%) rotate(-90deg);
	z-index: -1;

	&__circle {
		transition: stroke-dashoffset 1s linear;
	}
}
</style>
