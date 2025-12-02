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

Translated sidebars are stored in the `sidebars` folder. Create a new file with the name set as the 2 letter language code. Check out the [official vuepress documentation](https://ecosystem.vuejs.press/themes/default/config.html#sidebar) for more information about sidebars configuration.

## Translate script

A convenience script at `languages/translate.mjs` can auto-translate UI strings, sidebars, and documentation files using OpenRouter / GPT. 

> :warning: This script is intended to help bootstrap a new language, but the output will likely need manual review and editing. Please do not use the machine translation for production use without reviewing the output first.

### Prerequisites

Set your API key as OPENROUTER_API_KEY (env or .env file at repo root).
  
### Usage

With language code:

```
npm run translate -- es
```

Or with full language object:

```
npm run translate -- '{"name":"Spanish","display":"Español","code":"es","path":"/es/"}'
```

Behavior:
- Translates `languages/strings/en.json` → `languages/strings/<code>.json`
- Translates `languages/sidebars/en.js` → `languages/sidebars/<code>.js` (updates links to include language path)
- Walks `src/` and writes translated markdown to `src/<code>/...`, skipping blacklisted folders and files that already exist in the target language
- Adds the new language to `languages/def.js` if not present