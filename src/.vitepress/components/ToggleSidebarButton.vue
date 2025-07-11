<script setup lang="ts">
defineEmits(['toggle']);

// Use a simple title instead of VuePress theme locale
const title = 'Toggle sidebar';
</script>

<template>
  <div
    class="cookbook-sidebar-button"
    :title="title"
    aria-expanded="false"
    role="button"
    tabindex="0"
    @click="$emit('toggle')"
  >
    <div class="icon" aria-hidden="true">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
</template>

<style lang="scss">
.cookbook-sidebar-button {
  cursor: pointer;

  .icon {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 1rem;
    height: 1.25rem;
    cursor: inherit;

    span {
      display: inline-block;
      width: 100%;
      height: 2px;
      border-radius: 2px;
      background-color: var(--c-text);
      transition: transform var(--t-transform);

      &:nth-child(2) {
        margin: 3px 0;
      }
    }
  }
}
</style>
