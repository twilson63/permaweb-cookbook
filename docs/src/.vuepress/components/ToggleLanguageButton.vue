<script setup>
import { useThemeLocaleData } from "@vuepress/theme-default/lib/client/composables/index.js";
import { ref } from "vue";

defineEmits(["toggle"]);

const themeLocale = useThemeLocaleData();
const languages = {
  English: "/",
  Español: "es/",
};

const isDropdownOpen = ref(false);

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const updateLanguagePath = (selectedLanguage) => {
  console.log(
    selectedLanguage,
    "Selected language path from updateLanguagePath function"
  );
  const currentPath = window.location.pathname;

  const currentLanguage = getCurrentLanguage();
  console.log(
    currentLanguage,
    "Current language path from updateLanguagePath function"
  );

  if (selectedLanguage === currentLanguage) {
    return currentPath;
  }

  const selectedLanguagePath = languages[selectedLanguage];
  console.log(
    selectedLanguagePath,
    "selected language path from updateLanguagePath function"
  );

  let newPath;

  if (currentLanguage === "English") {
    newPath = currentPath.replace(/^\/(.*)/, `/${selectedLanguagePath}$1`);
  } else if (selectedLanguage === "English") {
    newPath = currentPath.replace(
      new RegExp(`^\/(${Object.values(languages).join("|")})`),
      `${selectedLanguagePath}`
    );
  } else {
    newPath = currentPath.replace(
      new RegExp(`^\/(${Object.values(languages).join("|")})`),
      `/${selectedLanguagePath}`
    );
  }

  console.log(newPath, "new path from updateLanguagePath function");

  location.href = newPath;

  return newPath;
};

const getCurrentLanguage = () => {
  const currentPath = window.location.pathname;
  const pathSegments = currentPath
    .split("/")
    .filter((segment) => segment !== "");

  if (pathSegments.length >= 2) {
    const language = Object.keys(languages).find(
      (lang) => `${pathSegments[0]}/` === languages[lang]
    );
    if (language) {
      return language;
    }
  }

  return "English";
};
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
      Language
    </div>
    <ul v-if="isDropdownOpen" class="language-dropdown">
      <li
        v-for="lang in Object.keys(languages)"
        :key="lang"
        @click="updateLanguagePath(lang)"
      >
        {{ lang }}
      </li>
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
}

.toggle-button:hover {
  text-decoration: underline;
}

.language-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 5px;
  padding: 5px;
  color: #000;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  list-style: none;
  z-index: 1;
  display: inline-block;
}

.language-dropdown li {
  cursor: pointer;
  padding: 5px;
}

.language-dropdown li:hover {
  background-color: #f5f5f5;
}
</style>
