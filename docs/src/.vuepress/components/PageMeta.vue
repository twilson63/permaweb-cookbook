<script setup lang="ts">
import AutoLink from '@theme/AutoLink.vue'
import { usePageData, usePageFrontmatter } from '@vuepress/client';

import { computed, ref } from 'vue'
import type { ComputedRef } from 'vue'
import type {
  DefaultThemeNormalPageFrontmatter,
  DefaultThemePageData,
  NavLink,
} from '@vuepress/theme-default/lib/shared/index.js'
import { useThemeLocaleData } from '@vuepress/theme-default/lib/client/composables/index.js'
import { resolveEditLink } from '@vuepress/theme-default/lib/client/utils/index.js'

import { useContributors as useGithubContributors } from '../composables/useContributors';

// fetch github contributors
// const githubContributors = useGithubContributors();

const useEditNavLink = (): ComputedRef<null | NavLink> => {
  const themeLocale = useThemeLocaleData()
  const page = usePageData<DefaultThemePageData>()
  const frontmatter = usePageFrontmatter<DefaultThemeNormalPageFrontmatter>()

  return computed(() => {
    const showEditLink =
      frontmatter.value.editLink ?? themeLocale.value.editLink ?? true
    if (!showEditLink) {
      return null
    }

    const {
      repo,
      docsRepo = repo,
      docsBranch = 'main',
      docsDir = '',
      editLinkText,
    } = themeLocale.value

    if (!docsRepo) return null

    const editLink = resolveEditLink({
      docsRepo,
      docsBranch,
      docsDir,
      filePathRelative: page.value.filePathRelative,
      editLinkPattern:
        frontmatter.value.editLinkPattern ?? themeLocale.value.editLinkPattern,
    })

    if (!editLink) return null

    return {
      text: editLinkText ?? 'Edit page',
      link: editLink,
    }
  })
}

const useLastUpdated = (): ComputedRef<null | string> => {
  const themeLocale = useThemeLocaleData()
  const page = usePageData<DefaultThemePageData>()
  const frontmatter = usePageFrontmatter<DefaultThemeNormalPageFrontmatter>()

  return computed(() => {
    const showLastUpdated =
      frontmatter.value.lastUpdated ?? themeLocale.value.lastUpdated ?? true

    if (!showLastUpdated) return null

    if (!page.value.git?.updatedTime) return null

    const updatedDate = new Date(page.value.git?.updatedTime)

    return updatedDate.toLocaleString()
  })
}

const useContributors = () => {
  const themeLocale = useThemeLocaleData()
  const page = usePageData<DefaultThemePageData>()
  const frontmatter = usePageFrontmatter<DefaultThemeNormalPageFrontmatter>()

  return computed(() => {
    const showContributors =
      frontmatter.value.contributors ?? themeLocale.value.contributors ?? true

    if (!showContributors) return null

    const contributors = page.value.git?.contributors ?? [];
    return contributors;
    // return contributors.map((contributor) => {
    //   const githubContributor = githubContributorsValue.find(
    //     (c) => c.name === contributor.name
    //   );

    //   return {
    //     ...contributor,
    //     ...githubContributor,
    //   };
    // });
  })
}

const themeLocale = useThemeLocaleData()
const editNavLink = useEditNavLink()
const lastUpdated = useLastUpdated()
const contributors = useContributors()
</script>

<template>
  <footer class="page-meta">
    <div class="meta-item-container">
      <div
        v-if="contributors && contributors.length"
        class="meta-item contributors"
      >
        <span class="meta-item-label">{{ themeLocale.contributorsText }}: </span>
        <span class="meta-item-info">
          <template v-for="(contributor, index) in contributors" :key="index">
            <span class="contributor" :title="`email: ${contributor.email}`">
              {{ contributor.name.substring(0, 1).toUpperCase() }}
            </span>
          </template>
        </span>
      </div>

      <div v-if="lastUpdated" class="meta-item last-updated">
        <span class="meta-item-label">{{ themeLocale.lastUpdatedText }}: </span>
        <ClientOnly>
          <span class="meta-item-info">{{ lastUpdated }}</span>
        </ClientOnly>
      </div>
    </div>

    <div v-if="editNavLink">
      <a :href="editNavLink.link" target="_blank" class="edit-link">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Edit / Edit_Pencil_01"> <path class="text-stroke" id="Vector" d="M12 8.00012L4 16.0001V20.0001L8 20.0001L16 12.0001M12 8.00012L14.8686 5.13146L14.8704 5.12976C15.2652 4.73488 15.463 4.53709 15.691 4.46301C15.8919 4.39775 16.1082 4.39775 16.3091 4.46301C16.5369 4.53704 16.7345 4.7346 17.1288 5.12892L18.8686 6.86872C19.2646 7.26474 19.4627 7.46284 19.5369 7.69117C19.6022 7.89201 19.6021 8.10835 19.5369 8.3092C19.4628 8.53736 19.265 8.73516 18.8695 9.13061L18.8686 9.13146L16 12.0001M12 8.00012L16 12.0001" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g></svg>
        Edit
      </a>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.page-meta {
  display: flex;
  justify-content: space-between;

  .contributor {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-align: center;

    border-radius: 50%;
    border: 1px solid var(--c-border-dark);
    height: 24px;
    width: 24px;
    font-size: 12px;
    font-weight: bold;
    
    &:not(:last-child) {
      margin-right: 10px;
    }
  }

  .meta-item-container {
    flex: 1;
    display: flex;
    justify-content: space-between;

    .meta-item {
      flex: 1;
      margin: 0;
    }
    
    // @media (max-width: 419px) {
    //   flex-direction: column;
      
    //   .meta-item {
    //     margin-bottom: 10px;
    //   }
    // }
  }

  .meta-item {
    margin-right: 40px;
  }

  .meta-item-label {
    display: block;
    margin-bottom: 10px;
    color: var(--c-text);
    font-weight: 500;
  }

  .edit-link {
    display: flex;
    align-items: center;

    background: var(--c-text-accent);
    color: var(--c-text);
    // border: 2px solid var(--c-tip-text-accent);
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