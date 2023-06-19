<script setup>
import Home from "@theme/Home.vue";
import Topbar from "../components/Topbar.vue";
import Navbar from "../components/Navbar.vue";
import Page from "../components/Page.vue";
import Sidebar from "../components/Sidebar.vue";
import Onboarding from "../components/Onboarding.vue";
import { usePageData, usePageFrontmatter } from "@vuepress/client";
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useRouter } from "vue-router";
import {
  useScrollPromise,
  useSidebarItems,
  useThemeLocaleData,
} from "@vuepress/theme-default/lib/client/composables/index.js";

const page = usePageData();
const frontmatter = usePageFrontmatter();
const themeLocale = useThemeLocaleData();

// onboardig
const shouldShowOnboarding = computed(
  () => frontmatter.value.onboarding === true
);

// navbar
const shouldShowNavbar = computed(
  () => frontmatter.value.navbar !== false && themeLocale.value.navbar !== false
);

// sidebar
const sidebarItems = useSidebarItems();
const isSidebarOpen = ref(false);
const toggleSidebar = (to) => {
  isSidebarOpen.value = typeof to === "boolean" ? to : !isSidebarOpen.value;
};
const touchStart = { x: 0, y: 0 };
const onTouchStart = (e) => {
  touchStart.x = e.changedTouches[0].clientX;
  touchStart.y = e.changedTouches[0].clientY;
};
const onTouchEnd = (e) => {
  const dx = e.changedTouches[0].clientX - touchStart.x;
  const dy = e.changedTouches[0].clientY - touchStart.y;
  if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
    if (dx > 0 && touchStart.x <= 80) {
      toggleSidebar(true);
    } else {
      toggleSidebar(false);
    }
  }
};

// classes
const containerClass = computed(() => [
  {
    "no-navbar": !shouldShowNavbar.value,
    "no-sidebar": !sidebarItems.value.length,
    "sidebar-open": isSidebarOpen.value,
  },
  frontmatter.value.pageClass,
]);

// close sidebar after navigation
let unregisterRouterHook;
onMounted(() => {
  const router = useRouter();
  unregisterRouterHook = router.afterEach(() => {
    toggleSidebar(false);
  });
});
onUnmounted(() => {
  unregisterRouterHook();
});

// handle scrollBehavior with transition
const scrollPromise = useScrollPromise();
const onBeforeEnter = scrollPromise.resolve;
const onBeforeLeave = scrollPromise.pending;
</script>

<template>
  <Topbar />
  <div
    class="cookbook-theme-container container-xxl"
    :class="containerClass"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
  >
    <Navbar
      v-if="shouldShowNavbar"
      class="d-none d-md-flex"
      @toggle-sidebar="toggleSidebar"
    >
      <template #before>
        <slot name="navbar-before" />
      </template>
      <template #after>
        <slot name="navbar-after" />
      </template>
    </Navbar>

    <Navbar
      v-if="shouldShowNavbar"
      class="d-md-none fixed"
      :fixed="true"
      @toggle-sidebar="toggleSidebar"
    />

    <Onboarding v-if="shouldShowOnboarding" />

    <div class="row">
      <div class="col-12">
        <h2
          id="documentation"
          class="header"
          style="border: none; padding-top: 30px; margin: 20px 0 25px"
        >
          {{ frontmatter.locale === "es" ? "Documentación" : "Documentation" }}
        </h2>
      </div>

      <div class="col-md-3">
        <Sidebar @close-sidebar="toggleSidebar(false)">
          <template #top>
            <slot name="sidebar-top" />
          </template>
          <template #bottom>
            <slot name="sidebar-bottom" />
          </template>
        </Sidebar>
      </div>

      <div class="col-12 col-md-9">
        <slot name="page">
          <Home v-if="frontmatter.home" />

          <Transition
            v-else
            name="fade-slide-y"
            mode="out-in"
            @before-enter="onBeforeEnter"
            @before-leave="onBeforeLeave"
          >
            <Page :key="page.path">
              <template #top>
                <slot name="page-top" />
              </template>
              <template #content-top>
                <slot name="page-content-top" />
              </template>
              <template #content-bottom>
                <slot name="page-content-bottom" />
              </template>
              <template #bottom>
                <slot name="page-bottom" />
              </template>
            </Page>
          </Transition>
        </slot>
      </div>
    </div>

    <p class="footer-text">
      <span>{{
        frontmatter.locale === "es" ? "Creado con " : "Built with "
      }}</span>
      <span class="heart">&#10084;&#65039;</span>
      <span>{{
        frontmatter.locale === "es"
          ? " por la comunidad de Arweave. Obtén más información en "
          : " by the Arweave community. Learn more at "
      }}</span>
      <a target="_blank" href="https://arweave.org">Arweave.org</a>
    </p>
  </div>
</template>

<style lang="scss">
@import "../styles/bootstrap.scss";

.cookbook-theme-container {
  @include media-breakpoint-up(md) {
    padding-left: var(--bs-gutter-x);
    padding-right: var(--bs-gutter-x);
  }

  .footer-text {
    margin: var(--bs-gutter-x) 0 calc(var(--bs-gutter-x) * 0.5);
    text-align: center;
    color: var(--c-text);

    *:not(.heart):not(a) {
      opacity: 0.3;
    }
  }
}
</style>
