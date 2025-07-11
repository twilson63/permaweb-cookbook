import { useData } from 'vitepress';
import enStrings from '../../../languages/strings/en.json' assert { type: 'json' };
import esStrings from '../../../languages/strings/es.json' assert { type: 'json' };
import zhStrings from '../../../languages/strings/zh.json' assert { type: 'json' };
import idStrings from '../../../languages/strings/id.json' assert { type: 'json' };

// Define languages array similar to the original def.js
const languagesArray = [
  {
    display: "Español",
    name: "Spanish",
    code: "es",
    strings: esStrings,
  },
  {
    display: "简体中文",
    name: "Mandarin Chinese",
    code: "zh",
    strings: zhStrings,
  },
  {
    display: "Bahasa Indonesia",
    name: "Indonesian",
    code: "id",
    strings: idStrings,
  },
];

export const languages = languagesArray.reduce((langs, currentLang) => {
  langs[currentLang.display] = `${currentLang.code}/`;
  return langs;
}, {
  "English": "/"
});

const i18n_strs = languagesArray.reduce((langs, currentLang) => {
  langs[currentLang.code] = currentLang.strings;
  return langs;
}, {});

export const get_i18n_str = (langCode="en", key, fallbackStr) => {
  const engStr = enStrings[key] || fallbackStr;
  if (langCode === "en") return engStr;
  return i18n_strs[langCode][key] || engStr;
}

export const useI18NStr = () => {
  const { page } = useData();
  return (key, fallbackStr) => get_i18n_str(page.value.frontmatter.locale, key, fallbackStr);
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