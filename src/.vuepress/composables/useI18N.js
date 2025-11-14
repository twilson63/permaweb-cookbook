import { usePageFrontmatter } from "@vuepress/client";

/**
 * An object containing language information excluding strings and sidebar.
 * @typedef {Object} LanguageInfo
 * @property {string} name - The language name.
 * @property {string} display - The display name for the language.
 * @property {string} path - The base path for the language.
 */
export const languages = __LANGUAGES__.reduce((langs, lang) => {
  const { code, strings, sidebar, ...langInfo } = lang;
  langs[lang.code] = langInfo;
  return langs;
}, {});

const i18n_strs = __LANGUAGES__.reduce((langs, currentLang) => {
  langs[currentLang.code] = currentLang.strings;
  return langs;
}, {});

export const get_i18n_str = (langCode = "en", key, fallbackStr) => {
  const engStr = __ENSTRS__[key] || fallbackStr;
  if (langCode === "en") return engStr;
  return i18n_strs[langCode][key] || engStr;
};

export const useI18NStr = () => {
  const frontmatter = usePageFrontmatter();
  return (key, fallbackStr) =>
    get_i18n_str(frontmatter.value.locale, key, fallbackStr);
};

/**
 * Get the current language based on the path.
 * @param {string} path - The current path.
 * @returns {string} The current language display name.
 */
export const getCurrentLanguage = (path) => {
  if (!path) return "en";

  const pathSegments = path.split("/").filter((segment) => segment !== "");

  // Check if path starts with a language code
  if (pathSegments.length > 0) {
    const potentialLangPath = `/${pathSegments[0]}/`;
    const languageCode = Object.keys(languages).find(
      (code) => languages[code].path === potentialLangPath
    );
    if (languageCode) {
      return languageCode;
    }
  }

  return "en";
};

/**
 * Get the path for the selected language based on the current path and language.
 * @param {string} path - The current path.
 * @param {string} selectedLanguageCode - The language code to switch to.
 * @param {string} currentLanguageCode - The current language code (default is "en").
 * @returns {string} The new path with the selected language.
 */
export const getLanguagePath = (
  path,
  selectedLanguageCode,
  currentLanguageCode = "en"
) => {
  if (selectedLanguageCode === currentLanguageCode || !path) return path;

  const selectedLanguage = languages[selectedLanguageCode];
  if (!selectedLanguage) return path;

  const currentLanguage = languages[currentLanguageCode];

  // Switching from English to another language
  if (currentLanguageCode === "en") {
    // Remove leading slash in language path to avoid double slashes
    const langPath = selectedLanguage.path.slice(0, -1);
    return `${langPath}${path}`;
  }

  // Switching between two non-English languages
  return path.replace(
    new RegExp(`^${currentLanguage.path}`),
    selectedLanguage.path
  );
};
