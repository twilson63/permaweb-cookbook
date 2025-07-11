<script setup lang="ts">
import { useData } from 'vitepress'
import { computed, ref } from 'vue'
import type { ComputedRef } from 'vue'
import { useI18NStr } from "../composables/useI18N";

const { page, theme } = useData()

const useEditNavLink = (): ComputedRef<null | { text: string; link: string }> => {
  return computed(() => {
    const showEditLink = page.value.frontmatter.editLink ?? theme.value.editLink ?? true
    if (!showEditLink) {
      return null
    }

    const {
      repo,
      docsRepo = repo,
      docsBranch = 'main',
      docsDir = '',
      editLinkText,
    } = theme.value

    if (!docsRepo) return null

    // VitePress doesn't have resolveEditLink utility, so we'll construct it manually
    const editLink = `${docsRepo}/edit/${docsBranch}/${docsDir}/${page.value.relativePath}`

    if (!editLink) return null

    return {
      text: editLinkText ?? 'Edit page',
      link: editLink,
    }
  })
}

const useLastUpdated = (): ComputedRef<null | string> => {
  return computed(() => {
    const showLastUpdated = page.value.frontmatter.lastUpdated ?? theme.value.lastUpdated ?? true

    if (!showLastUpdated) return null

    if (!page.value.lastUpdated) return null

    const updatedDate = new Date(page.value.lastUpdated)

    return updatedDate.toLocaleString()
  })
}

const useContributors = () => {
  return computed(() => {
    const showContributors = page.value.frontmatter.contributors ?? theme.value.contributors ?? true

    if (!showContributors) return null

    // VitePress doesn't provide git contributors by default
    // This would need to be implemented separately if needed
    return [];
  })
}

const get_i18n_str = useI18NStr();
const editNavLink = useEditNavLink()
const lastUpdated = useLastUpdated()
const contributors = useContributors()
</script>

<template>
  <footer class="page-meta">
    <div class="meta-item-container">
      <div class="meta-item contributors">
        <span class="meta-item-label">{{ get_i18n_str("contributors", "Contributors") }}: </span>
        <span class="meta-item-info">
          <template
            v-if="contributors && contributors.length"
            v-for="(contributor, index) in contributors" :key="index">
            <span class="contributor" :title="`email: ${contributor.email}`">
              {{ contributor.name }}
            </span>
            <template v-if="index !== contributors.length - 1">, </template>
          </template>
        </span>
      </div>

      <div class="meta-item last-updated">
        <span class="meta-item-label">{{ get_i18n_str("last-updated", "Last Updated") }}: </span>
        <ClientOnly v-if="lastUpdated">
          <span class="meta-item-info">{{ lastUpdated }}</span>
        </ClientOnly>
      </div>
    </div>

    <div v-if="editNavLink">
      <a :href="editNavLink.link" target="_blank" class="edit-link">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Edit / Edit_Pencil_01"> <path class="text-stroke" id="Vector" d="M12 8.00012L4 16.0001V20.0001L8 20.0001L16 12.0001M12 8.00012L14.8686 5.13146L14.8704 5.12976C15.2652 4.73488 15.463 4.53709 15.691 4.46301C15.8919 4.39775 16.1082 4.39775 16.3091 4.46301C16.5369 4.53704 16.7345 4.7346 17.1288 5.12892L18.8686 6.86872C19.2646 7.26474 19.4627 7.46284 19.5369 7.69117C19.6022 7.89201 19.6021 8.10835 19.5369 8.3092C19.4628 8.53736 19.265 8.73516 18.8695 9.13061L18.8686 9.13146L16 12.0001M12 8.00012L16 12.0001" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g></svg>
        {{ get_i18n_str("edit", "Edit") }}
      </a>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.page-meta {
  display: flex;
  justify-content: space-between;

  .meta-item-container {
    flex: 1;
    display: flex;
    justify-content: space-between;

    .meta-item {
      flex: 1;
      margin: 0;
    }

    .contributors {
      margin-right: 20px;
    }
  }

  .meta-item-label {
    display: block;
    margin-bottom: 6px;
    color: var(--c-text);
    font-weight: 500;
  }

  .edit-link {
    display: flex;
    align-items: center;

    background: var(--c-text-accent);
    color: var(--c-text);
    border-radius: 8px;
    padding: 7px 10px;
    text-align: center;

    margin: 0;
    margin-left: 20px;

    svg {
      margin-right: 5px;
    }
  }
}
</style>