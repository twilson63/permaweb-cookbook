<template>
  <div class="collapsible-code">
    <button
      class="collapsible-code__trigger"
      :class="{ 'collapsible-code__trigger--expanded': isExpanded }"
      @click="toggle"
      :aria-expanded="isExpanded"
      :aria-controls="`collapsible-code-${id}`"
    >
      <span class="collapsible-code__title">
        <slot name="title">{{ title }}</slot>
      </span>
      <svg
        class="collapsible-code__icon"
        :class="{ 'collapsible-code__icon--expanded': isExpanded }"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M6 12L10 8L6 4"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>

    <div
      :id="`collapsible-code-${id}`"
      class="collapsible-code__content"
      :class="{ 'collapsible-code__content--expanded': isExpanded }"
      :aria-hidden="!isExpanded"
    >
      <div class="collapsible-code__inner">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CollapsibleCode',
  props: {
    title: {
      type: String,
      default: 'Click to expand'
    },
    defaultExpanded: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isExpanded: this.defaultExpanded,
      id: Math.random().toString(36).substr(2, 9)
    };
  },
  methods: {
    toggle() {
      this.isExpanded = !this.isExpanded;
    }
  }
};
</script>

<style scoped>
/* Clean Architecture: Container owns borders, buttons handle interactions */

.collapsible-code {
  border: 1px solid var(--c-border);
  border-radius: 6px;
  margin: 1rem 0;
  overflow: hidden;
  background: var(--c-bg);
}

.collapsible-code__trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0.75rem 1rem;
  background: var(--c-bg-soft);
  border: none; /* No borders - container handles all borders */
  cursor: pointer;
  font-family: inherit;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--c-text);
  transition: all 0.2s ease;
  text-align: left;
  min-height: 44px;
  box-sizing: border-box;
  /* Prevent cursor flicker during transform animations */
  will-change: transform;
}

.collapsible-code__trigger:hover {
  background: var(--c-bg-soft-up);
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.collapsible-code__trigger:focus {
  outline: 2px solid var(--c-text);
  outline-offset: 2px;
}

.collapsible-code__trigger:active {
  transform: translateY(1px);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.collapsible-code__trigger--expanded {
  background: var(--c-bg-soft-up);
  /* NO bottom border - this was causing the double border issue */
}

.collapsible-code__title {
  font-weight: 600;
  color: var(--c-text);
  cursor: inherit; /* Ensure title inherits pointer cursor */
  user-select: none; /* Prevent text selection on clicks */
}

.collapsible-code__icon {
  flex-shrink: 0;
  transition: transform 0.2s ease;
  color: var(--c-text-lighter);
  cursor: inherit; /* Ensure icon inherits pointer cursor */
  pointer-events: none; /* Prevent any potential interference */
}

.collapsible-code__icon--expanded {
  transform: rotate(90deg);
}

.collapsible-code__content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.collapsible-code__content--expanded {
  max-height: 2000px;
}

.collapsible-code__inner {
  padding: 0;
}

.collapsible-code__inner > :first-child {
  margin-top: 0;
}

.collapsible-code__inner > :last-child {
  margin-bottom: 0;
}

/* Flush code blocks with clean targeting */
.collapsible-code div[class*='language-'] {
  margin: 0 !important;
  border-radius: 0 !important;
  border: none !important;
}

.collapsible-code div[class*='language-'] pre {
  margin: 0 !important;
  border-radius: 0 !important;
}
</style>

<!-- Minimal global overrides for container-generated components -->
<style>
/* Clean container styling - matches component architecture */
.custom-container-collapsible-code {
  border: 1px solid var(--c-border) !important;
  background: var(--c-bg) !important;
}

/* Ensure full clickability for container components */
.custom-container-collapsible-code .collapsible-code__trigger {
  width: 100%;
  min-height: 44px;
  cursor: pointer;
}

/* Ensure all child elements inherit cursor behavior */
.custom-container-collapsible-code .collapsible-code__trigger * {
  cursor: inherit;
}

.custom-container-collapsible-code .collapsible-code__title {
  user-select: none;
}

.custom-container-collapsible-code .collapsible-code__icon {
  pointer-events: none;
}

/* Clean flush code blocks for container components */
.custom-container-collapsible-code div[class*='language-'] {
  margin: 0 !important;
  border-radius: 0 !important;
  border: none !important;
}

.custom-container-collapsible-code div[class*='language-'] pre {
  margin: 0 !important;
  border-radius: 0 !important;
}
</style>
