<script setup lang="ts">
import AutoLink from '@theme/AutoLink.vue'
import { usePageFrontmatter } from '@vuepress/client'
import { isPlainObject, isString } from '@vuepress/shared'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import type {
  DefaultThemeNormalPageFrontmatter,
  NavLink,
  ResolvedSidebarItem,
} from '../../shared/index.js'
import { useNavLink, useSidebarItems } from '@vuepress/theme-default/client'

/**
 * Resolve `prev` or `next` config from frontmatter
 */
const resolveFromFrontmatterConfig = (
  conf: unknown
): null | false | NavLink => {
  if (conf === false) {
    return null
  }

  if (isString(conf)) {
    return useNavLink(conf)
  }

  if (isPlainObject<NavLink>(conf)) {
    return conf
  }

  return false
}

const flattenSidebar = (
  items: ResolvedSidebarItem[],
  result: NavLink[] = []
) => {
  for (const item of items) {
    if (item.link) {
      result.push(item as NavLink)
    }
    if (item.children) {
      flattenSidebar(item.children, result)
    }
  }
  return result
}

const resolveFromSidebarItems = (
  sidebarItems: ResolvedSidebarItem[],
  currentPath: string,
  offset: number
): null | NavLink => {
  const flat = flattenSidebar(sidebarItems)
  const index = flat.findIndex((item) => item.link === currentPath)

  if (index === -1) {
    return null
  }

  return flat[index + offset] ?? null
}

const frontmatter = usePageFrontmatter<DefaultThemeNormalPageFrontmatter>()
const sidebarItems = useSidebarItems()
const route = useRoute()

const prevNavLink = computed(() => {
  const prevConfig = resolveFromFrontmatterConfig(frontmatter.value.prev)
  if (prevConfig !== false) {
    return prevConfig
  }

  return resolveFromSidebarItems(sidebarItems.value, route.path, -1)
})

const nextNavLink = computed(() => {
  const nextConfig = resolveFromFrontmatterConfig(frontmatter.value.next)
  if (nextConfig !== false) {
    return nextConfig
  }

  return resolveFromSidebarItems(sidebarItems.value, route.path, 1)
})
</script>

<template>
  <nav v-if="prevNavLink || nextNavLink" class="page-nav">
    <p class="inner">
      <span v-if="prevNavLink" class="prev">
        <AutoLink :item="prevNavLink" />
      </span>

      <span v-if="nextNavLink" class="next">
        <AutoLink :item="nextNavLink" />
      </span>
    </p>
  </nav>
</template>
