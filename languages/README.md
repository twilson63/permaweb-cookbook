# Translation

## Add a new language
To add a new language, add an object to the `language` array in `def.js`. The structure of the object is as follow:
```js
{
  display: "Español", // Name of the language displayed in UI
  name: "Spanish", // Name of the language in English, used by OpenAI translation
  path: "/es/", // Base path for the language
  code: "es", // 2 letter language code (ISO 639‑1)
  strings: esStrings, // JSON object of translated UI element strings
  sidebar: esSidebar, // Sidebar object for the language
}
```
Create a new `.json` file under the `strings` folder with the 2 letter language code as the name of the file. If you wish to let OpenAI handle the translation, set the content of the file to `{}`. Otherwise, if you wish to translate some of the strings manually, add the key and it's translated string to the json object. The keys can be found in the english string file `en.json`.

Create a folder with the name set as the 2 letter language code under the `src` folder.

## Sidebars

Translated sidebars are stored in the `sidebars` folder. Create a new file with the name set as the 2 letter language code. To add a sidebar, you will need to export the sidebar object in `sidebars/index.js`. Afterwards, import the sidebar object in `config.js` and set it to the corresponding locale under `theme.locales['/langcode/'].sidebar`.