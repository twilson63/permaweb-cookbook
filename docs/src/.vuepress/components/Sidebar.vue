<script setup>
// import NavbarItems from '@theme/NavbarItems.vue'
import SidebarItems from '@theme/SidebarItems.vue'
</script>

<template>
  <aside class="cookbook-sidebar">
    <SidebarItems />
  </aside>
</template>

<style lang="scss">
.cookbook-sidebar {
  position: sticky;
  top: 30px;

  .sidebar-items {
    text-align: right;

    .sidebar-item-children {

      .sidebar-item:not(.active) {
        opacity: 0.5;
      }

    }
  }

  ul {
    padding: 0;
    list-style: none;
  }
}
</style>