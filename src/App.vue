<template>
	<main class="site-main">
		<div class="container">
			<Countdown />
		</div>
	</main>
	<footer class="site-footer">
		<div class="container">
			<a href="https://github.com/rodrigodagostino/vue-countdown-app" target="_blank">
				Made with <img src="@/assets/vue-logo.png" alt="Vue.js logo" /> by Rodrigo D’Agostino
			</a>
		</div>
	</footer>
</template>

<script>
import Countdown from './components/Countdown.vue'

export default {
	name: 'App',
	components: {
		Countdown,
	},
}
</script>

<style lang="scss">
/**
 * Variables
 */
:root {
	--font-main: 'Poppins', Avenir, Helvetica, Arial, sans-serif;

	--emerald-400: #34d399;
	--teal-600: #0d9488;

	--white: #f3f3f5;
	--gray-050: #ededf0;
	--gray-100: #e1e1e6;
	--gray-150: #d2d2da;
	--gray-200: #c3c3ce;
	--gray-300: #a4a6b5;
	--gray-400: #86889d;
	--gray-500: #686a84;
	--gray-600: #585a70;
	--gray-650: #515266;
	--gray-700: #494a5c;
	--gray-750: #414253;
	--gray-800: #393a49;
	--gray-850: #31323f;
	--gray-900: #2a2a35;
	--gray-950: #22222b;
	--black: #15151a;
}

/**
 * Reset styles.
 */
html {
	box-sizing: border-box;
	height: 100%;
}

*,
*::before,
*::after {
	/* Inherit box-sizing to make it easier to change the property for components that leverage other behavior; see http://css-tricks.com/inheriting-box-sizing-probably-slightly-better-best-practice/ */
	box-sizing: inherit;
}

/* Reset margins and paddings on most elements */
body,
h1,
h2,
h3,
h4,
h5,
h6,
ul,
ol,
li,
p,
pre,
blockquote,
figure,
hr {
	margin: 0;
	padding: 0;
}

a {
	color: var(--white);
	transition: outline 0.32s ease;
	outline: 1px dotted transparent;
}

a:focus {
	outline: 1px dotted var(--white);
}

/* Reset forms and buttons */
input,
textarea,
select,
button {
	color: inherit;
	font: inherit;
	letter-spacing: inherit;
}

input,
textarea,
button {
	border: 1px solid gray;
}

button {
	border-radius: 0;
	padding: 0.75em 1em;
	background-color: transparent;
}

button * {
	pointer-events: none;
}

/* Easy responsive for media elements */
embed,
iframe,
img,
object,
video {
	display: block;
	max-width: 100%;
}

/* Useful table styles */
table {
	table-layout: fixed;
	width: 100%;
}

/**
 * Base styles.
 */
body {
	font-family: var(--font-main);
	font-size: 1rem;
	color: var(--gray-600);
	background-color: var(--gray-100);
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	height: 100%;
	text-align: center;
	display: flex;
	justify-content: center;
}

.site {
	display: flex;
	flex-direction: column;
}

.container {
	max-width: 54rem;
	margin: 0 auto;
	padding: 1rem;
	position: relative;
}

.site-main {
	margin-top: 24vh;
}

.site-footer {
	font-size: 0.875rem;
	text-align: center;
	margin-top: auto;
}

.site-footer .container {
	display: flex;
	justify-content: center;
	padding: 1rem 0;
}

.site-footer a {
	color: var(--gray-400);
	text-decoration: none;
	transition: color 0.24s ease;
}

.site-footer a:focus,
.site-footer a:hover {
	color: var(--gray-600);
}

.site-footer img {
	height: 1.25rem;
	width: auto;
	vertical-align: middle;
	margin: 0 0.25rem;
	display: inline-block;
}
</style>
