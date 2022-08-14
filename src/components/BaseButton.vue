<script setup>
const props = defineProps({
  href: {
    type: String,
    required: false,
    default: null,
  },
  target: {
    type: String,
    required: false,
    default: null,
  },
  type: {
    type: String,
    required: false,
    default: 'button',
  },
  variation: {
    type: String,
    required: false,
    default: 'flat',
  },
  size: {
    type: String,
    required: false,
    default: null,
  },
  iconClasses: {
    type: String,
    required: false,
    default: null,
  },
  textClasses: {
    type: String,
    required: false,
    default: null,
  },
})

const tag = props.href ? 'a' : 'button'

const buttonClasses = {
  'button--fill': props.variation === 'fill',
  'button--flat': props.variation === 'flat',
  'button--small': props.size === 'small',
  'button--medium': props.size === 'medium',
  'button--large': props.size === 'large',
}
</script>

<template>
  <component
    :is="tag"
    :href="href"
    :target="target"
    :type="type"
    class="button"
    :class="buttonClasses"
  >
    <i v-if="iconClasses" :class="iconClasses"></i>
    <span v-if="$slots.default" :class="textClasses">
      <slot />
    </span>
  </component>
</template>

<style scoped>
.button {
  font-family: var(--font-main);
  font-weight: 600;
  text-transform: uppercase;
  cursor: pointer;
  border: none;
  border-radius: 0.75em;
  padding: 0.875em 1em;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.24s ease, box-shadow 0.12s ease;
}

.button i + span {
  margin-left: 0.5rem;
}

.button--fill {
  background-color: var(--gray-100);
  box-shadow: -0.25em -0.25em 0.5em 0.125em rgba(255, 255, 255, 0.6),
    inset 1px 1px 1px rgba(255, 255, 255, 0.6),
    /* The next line is only used to allow the box-shadow transition to work */
      inset 0.125em 0.125em 0.5em transparent,
    inset -1px -1px 1px rgba(0, 0, 0, 0.05),
    inset -2px -2px 1rem -0.5rem rgba(255, 255, 255, 1),
    0.25em 0.25em 0.5em 0.125em rgba(0, 0, 0, 0.15);
}

.button--fill:focus,
.button--fill:hover {
  color: var(--emerald-400);
}

.button--fill:active {
  box-shadow: -0.125em -0.125em 0.25em 0 rgba(255, 255, 255, 0.6),
    inset 1px 1px 1px rgba(255, 255, 255, 0.6),
    inset 0.125em 0.125em 0.5em rgba(0, 0, 0, 0.1),
    inset -1px -1px 1px rgba(0, 0, 0, 0.1),
    inset -0.125em -0.125em 0.5em rgba(255, 255, 255, 1),
    0.125em 0.125em 0.25em 0 rgba(0, 0, 0, 0.1);
}

.button--flat {
}

.button--flat:focus,
.button--flat:hover {
  color: var(--emerald-400);
}

.button--small {
  font-size: 0.75rem;
}

.button--medium {
  font-size: 1.5rem;
}

.button--large {
  font-size: 2.5rem;
}
</style>
