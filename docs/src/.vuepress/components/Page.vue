<script setup>
import PageMeta from '@theme/PageMeta.vue'
import PageNav from '@theme/PageNav.vue'
</script>

<template>
  <main class="cookbook-content">
    <slot name="top" />

    <div class="cookbook-content row">

      <div class="col-12 col-xl-9">
        <Content />

        <PageMeta />

        <PageNav />
      </div>

    </div>
  </main>
</template>

<style lang="scss">
.cookbook-content {

  img {
    max-width: 100%;
  }

  pre, pre[class*=language-] {
    line-height: 1.375;
    padding: 1.3rem 1.5rem;
    margin: 0.85rem 0;
    border-radius: 6px;
    overflow: auto;
  }

  pre code, pre[class*=language-] code {
    color: #fff;
    padding: 0;
    background-color: transparent!important;
    border-radius: 0;
    overflow-wrap: unset;
    -webkit-font-smoothing: auto;
    -moz-osx-font-smoothing: auto;
  }


  h1, h2, h3, h4, h5, h6 {
    margin-top: calc(0rem - var(--navbar-height));
    padding-top: calc(1rem + var(--navbar-height));
    margin-bottom: 0;
  }
}
</style>