# Translation

## Add a new language
To add a new language, add an object to the `language` array in `def.js`. The structure of the object is as follow:
```js
{
  display: "Español", // Name of the language displayed in UI
  name: "Spanish", // Name of the language in English, used by OpenAI translation
  code: "es", // 2 letter language code (ISO 639‑1)
  strings: esStrings, // JSON object of translated UI element strings
}
```
Create a new `.json` file under the `strings` folder with the 2 letter language code as the name of the file. If you wish to let OpenAI handle the translation, set the content of the file to `{}`. Otherwise, if you wish to translate some of the strings manually, add the key and it's translated string to the json object. The keys can be found in the english string file `en.json`.

Create a folder with the name set as the 2 letter language code under the `src` folder.

## OpenAI translation
Start by creating a `.env` file in the root of the `docs` folder. Set the content as follow.
```
OPENAI_API_KEY={YOUR API KEY HERE}
```

Run the following command to start the translation process in the `docs` directory.
```bash
node ./translateLocal.js
```