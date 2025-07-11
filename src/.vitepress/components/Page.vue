<script setup>
import PageMeta from './PageMeta.vue';
</script>

<template>
  <main class="cookbook-content">
    <slot name="top" />

    <div class="cookbook-content row">
      <div class="col-12 col-xl-9"> 
        <PageMeta />
        
        <Content />

        <!-- VitePress will automatically handle page navigation -->
      </div>
    </div>
  </main>
</template>

<style lang="scss">
.cookbook-content {
  padding-bottom: 1rem;

  img {
    max-width: 100%;
  }

  pre,
  pre[class*='language-'] {
    line-height: 1.375;
    padding: 1.3rem 1.5rem;
    margin: 0.85rem 0;
    border-radius: 6px;
    overflow: auto;
  }

  pre code,
  pre[class*='language-'] code {
    color: #fff;
    padding: 0;
    background-color: transparent !important;
    border-radius: 0;
    overflow-wrap: unset;
    -webkit-font-smoothing: auto;
    -moz-osx-font-smoothing: auto;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: calc(0rem - var(--navbar-height));
    padding-top: calc(1rem + var(--navbar-height));
    margin-bottom: 0;
  }

  .page-meta,
  .page-nav {
    padding: 1.5rem 0 3rem;
  }

  @media (max-width: 419px) {
    div[class*='language-'] {
      margin: 0.85rem calc(var(--bs-gutter-x) * -0.5);
      border-radius: 0;
    }

    .code-group__nav {
      margin-left: calc(var(--bs-gutter-x) * -0.5);
      margin-right: calc(var(--bs-gutter-x) * -0.5);
    }
  }
}
</style>
