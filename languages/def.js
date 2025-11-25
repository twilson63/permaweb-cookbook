// UI elements strings json file for new languages
const enStrings = require("./strings/en.json");
const esStrings = require("./strings/es.json");
const zhStrings = require("./strings/zh.json");
const idStrings = require("./strings/id.json");
const jaStrings = require("./strings/ja.json");

const enSidebar = require("./sidebars/en.js");
const esSidebar = require("./sidebars/es.js");
const jaSidebar = require("./sidebars/ja.js");
const idSidebar = require("./sidebars/id.js");
const zhSidebar = require("./sidebars/zh.js");

// Start adding new languages by making a new language object inside the array
// display: Name of the language displayed in UI
// path: Base path for the language
// code: Language specific code
// name: Name of the language in English, used by OpenAI translation
// strings: JSON object of translated UI element strings
// sidebar: sidebar object for the language (if different from default)
const languages = [
  {
    display: "English",
    name: "English",
    code: "en",
    path: "/",
    strings: enStrings,
    sidebar: enSidebar,
  },
  {
    display: "Español",
    name: "Spanish",
    code: "es",
    path: "/es/",
    strings: esStrings,
    sidebar: esSidebar,
  },
  {
    display: "繁體中文",
    name: "Traditional Chinese",
    code: "zhTW",
    path: "/zhTW/",
  },
  {
    display: "简体中文",
    name: "Mandarin Chinese",
    code: "zh",
    path: "/zh/",
    strings: zhStrings,
    sidebar: zhSidebar,
  },
  {
    display: "Bahasa Indonesia",
    name: "Indonesian",
    code: "id",
    path: "/id/",
    strings: idStrings,
    sidebar: idSidebar,
  },
  {
    display: "日本語",
    name: "Japanese",
    code: "ja",
    path: "/ja/",
    strings: jaStrings,
    sidebar: jaSidebar,
  },
];

const i18n_strs = languages.reduce((langs, currentLang) => {
  langs[currentLang.code] = currentLang.strings;
  return langs;
}, {});

const get_i18n_str = (langCode="en", key, fallbackStr) => {
  const engStr = enStrings[key] || fallbackStr;
  if (langCode === "en") return engStr;
  return i18n_strs[langCode][key] || engStr;
}

module.exports = {
  languages,
  get_i18n_str
};