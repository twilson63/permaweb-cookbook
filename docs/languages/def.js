// UI elements strings json file for new languages
const enStrings = require("./strings/en.json");
const esStrings = require("./strings/es.json");
const zhStrings = require("./strings/zh.json");
const idStrings = require("./strings/id.json");

// Start adding new languages by making a new language object inside the array
// display: Name of the language displayed in UI
// code: Language specific code
// name: Name of the language in English, used by OpenAI translation
// strings: JSON object of translated UI element strings
const languages = [
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