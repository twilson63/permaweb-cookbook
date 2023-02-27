<script setup>
import NavbarBrand from '@theme/NavbarBrand.vue'
import NavbarItems from '@theme/NavbarItems.vue'
import ToggleColorModeButton from '@theme/ToggleColorModeButton.vue'
import ToggleSidebarButton from '@theme/ToggleSidebarButton.vue'
import { computed, onMounted, ref } from 'vue'
import { useThemeLocaleData } from '@vuepress/theme-default/lib/client/composables/index.js'
defineEmits(['toggle-sidebar'])
const themeLocale = useThemeLocaleData()
const navbar = ref<HTMLElement | null>(null)
const navbarBrand = ref<HTMLElement | null>(null)
const linksWrapperMaxWidth = ref(0)
const linksWrapperStyle = computed(() => {
  if (!linksWrapperMaxWidth.value) {
    return {}
  }
  return {
    maxWidth: linksWrapperMaxWidth.value + 'px',
  }
})
// avoid overlapping of long title and long navbar links
onMounted(() => {
  // TODO: migrate to css var
  // refer to _variables.scss
  const MOBILE_DESKTOP_BREAKPOINT = 719
  const navbarHorizontalPadding =
    getCssValue(navbar.value, 'paddingLeft') +
    getCssValue(navbar.value, 'paddingRight')
  const handleLinksWrapWidth = () => {
    if (window.innerWidth < MOBILE_DESKTOP_BREAKPOINT) {
      linksWrapperMaxWidth.value = 0
    } else {
      linksWrapperMaxWidth.value =
        navbar.value?.offsetWidth -
        navbarHorizontalPadding -
        (navbarBrand.value?.offsetWidth || 0)
    }
  }
  handleLinksWrapWidth()
  window.addEventListener('resize', handleLinksWrapWidth, false)
  window.addEventListener('orientationchange', handleLinksWrapWidth, false)
})
function getCssValue(el, property) {
  // NOTE: Known bug, will return 'auto' if style value is 'auto'
  const val = el?.ownerDocument?.defaultView?.getComputedStyle(el, null)?.[
    property
  ]
  const num = Number.parseInt(val, 10)
  return Number.isNaN(num) ? 0 : num
}
</script>

<template>
  <header ref="navbar" class="cookbook-navbar row justify-content-between">
    <ToggleSidebarButton @toggle="$emit('toggle-sidebar')" />

    <div class="col-3">
      <span ref="navbarBrand">
        <NavbarBrand />
      </span>
    </div>

    <div class="col-1 offset-7">
      <ToggleColorModeButton v-if="themeLocale.colorModeSwitch" />
    </div>

    <div class="col-1">
      <span>Github</span>
    </div>
    
    <!-- <div class=" navbar-items-wrapper" :style="linksWrapperStyle">
      <slot name="before" />
      
      <slot name="after" />
      <ToggleColorModeButton v-if="themeLocale.colorModeSwitch" />
      <NavbarSearch />
    </div> -->
  </header>
</template>

<style lang="scss">
.cookbook-navbar {
  // display: flex;
  padding-top: 67px;
}
</style>