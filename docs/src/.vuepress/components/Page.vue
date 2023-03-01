<script setup>
import PageMeta from '@theme/PageMeta.vue'
import PageNav from '@theme/PageNav.vue'
</script>

<template>
  <main class="cookbook-content">
    <slot name="top" />

    <div class="cookbook-content row">
      <slot name="content-top" />

      <div class="col-12 col-xl-9">
        <Content />
      </div>

      <slot name="content-bottom" />
    </div>

    <PageMeta />

    <PageNav />

    <slot name="bottom" />
  </main>
</template>

<style lang="scss">
.cookbook-content {

  img {
    max-width: 100%;
  }


  h1, h2, h3, h4, h5, h6 {
    margin-top: calc(0.5rem - var(--navbar-height));
    padding-top: calc(1rem + var(--navbar-height));
    margin-bottom: 0;
  }
}
</style>