<script setup>
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";
import {
  getLanguagePath,
  getCurrentLanguage,
  languages,
  useI18NStr,
} from "../composables/useI18N";
import { useThemeLocaleData } from "@vuepress/theme-default/lib/client/composables/index.js";

defineEmits(["toggle"]);

const route = useRoute();
const themeLocale = useThemeLocaleData();
const get_i18n_str = useI18NStr();

const isDropdownOpen = ref(false);

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const languageLinks = computed(() => {
  const links = {};
  for (let lang in languages) {
    const langDisplay = languages[lang].display;
    console.log(route.path);
    const path = getLanguagePath(
      route.path,
      lang,
      getCurrentLanguage(route.path)
    );
    links[langDisplay] = path;
  }
  return links;
});
</script>

<template>
  <div class="cookbook-translate-button">
    <div
      class="toggle-button"
      :title="themeLocale.toggleTranslate"
      role="button"
      tabindex="0"
      @click="toggleDropdown"
    >
      <div class="cb-icon language"></div>
      {{ get_i18n_str("language", "Language") }}
    </div>
    <ul v-if="isDropdownOpen" class="language-dropdown">
      <a v-for="(link, lang) in languageLinks" :key="lang" :href="link">
        {{ lang }}
      </a>
    </ul>
  </div>
</template>

<style lang="scss">
.cookbook-translate-button {
  position: relative;
  display: inline-block;
  font-weight: 500;
}

.toggle-button {
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;

  .lang-icon {
    width: 20px;
    height: 20px;
    mask: url("/icons/language.svg") no-repeat center;
    background-color: var(--c-text);
  }

  &:hover {
    opacity: 0.8;
  }
}

.language-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 10px;
  padding: 5px;
  color: #000;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  list-style: none;
  z-index: 1;
  display: inline-block;

  & > a {
    display: block;
    padding: 5px 10px;
    white-space: nowrap;

    &:hover {
      background-color: #f5f5f5;
    }
  }
}
</style>
