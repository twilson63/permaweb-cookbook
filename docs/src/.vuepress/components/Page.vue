<script setup>
import PageMeta from '@theme/PageMeta.vue'
import PageNav from '@theme/PageNav.vue'
</script>

<template>
  <main>
    <slot name="top" />

    <div class="cookbook-content row">
      <slot name="content-top" />

      <div class="col-12 col-xl-8">
        <Content />
      </div>

      <slot name="content-bottom" />
    </div>

    <PageMeta />

    <PageNav />

    <slot name="bottom" />
  </main>
</template>