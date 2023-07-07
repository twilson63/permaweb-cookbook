// add new strings json file for new languages
const zhStrings = require("./strings/zh.json");
const esStrings = require("./strings/es.json");

// Start adding new languages by making a new language object inside the array
const languages = [
  {
    display: "简体中文",
    name: "Mandarin Chinese",
    code: "zh",
    strings: zhStrings,
  },
  {
    display: "Español",
    name: "Spanish",
    code: "es",
    strings: esStrings,
  }
];

module.exports = {
  languages
};