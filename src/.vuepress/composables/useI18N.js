import { usePageFrontmatter } from '@vuepress/client';

export const languages = __LANGUAGES__.reduce((langs, currentLang) => {
  langs[currentLang.display] = `${currentLang.code}/`;
  return langs;
}, {
  "English": "/"
});

const i18n_strs = __LANGUAGES__.reduce((langs, currentLang) => {
  langs[currentLang.code] = currentLang.strings;
  return langs;
}, {});

export const get_i18n_str = (langCode="en", key, fallbackStr) => {
  const engStr = __ENSTRS__[key] || fallbackStr;
  if (langCode === "en") return engStr;
  return i18n_strs[langCode][key] || engStr;
}

export const useI18NStr = () => {
  const frontmatter = usePageFrontmatter();
  return (key, fallbackStr) => get_i18n_str(frontmatter.value.locale, key, fallbackStr);
};

export const getCurrentLanguage = (path) => {
  const currentPath = path;
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
  } else if (pathSegments.length < 2 && pathSegments[0] !== "") {
    const language = Object.keys(languages).find(
      (lang) => `${pathSegments[0]}/` === languages[lang]
    );
    if (language) {
      return language;
    }
  }

  return "English";
};

export const getLanguagePath = (path, selectedLanguage, currentLanguage="English") => {
  if (selectedLanguage === currentLanguage) return path;

  const currentPath = path;
  const selectedLanguagePath = languages[selectedLanguage];

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

  return newPath;
};