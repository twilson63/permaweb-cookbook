z# Part 2: Adding Language Translation to the Renderer

In this part of the tutorial, you will learn how to add a language translation service to the renderer you created in Part 1. We will use the MyMemory translation API to translate the fetched text content from Arweave.

### Step 7: Add a target language constant

First, open the `renderer.html` file from Part 1. Inside the `<script>` tag, add a new constant called `target_language` to specify the target language for the translation. For example, to translate the text into Spanish, set the constant to "es":

javascriptCopy code

```
const target_language = "es"; // target language for translation, e.g., 'es' for Spanish
```

### Step 8: Create the fetchTranslation function

Next, create an `async` function called `fetchTranslation` that takes three parameters: the text to be translated, the source language, and the target language. This function will make a request to the MyMemory translation API and return the translated text:

javascriptCopy code

```
async function fetchTranslation(text, sourceLanguage, targetLanguage) {
  const apiurl = "https://api.mymemory.translated.net/get";
  const queryParams = new URLSearchParams({
    q: text,
    langpair: `${sourceLanguage}|${targetLanguage}`,
  });

  const response = await fetch(`${apiurl}?${queryParams.toString()}`);
  const data = await response.json();

  return data;
}

```

### Step 9: Integrate the fetchTranslation function

Modify the `fetchTextFromArweave(txid)` call inside the script to chain another `.then()` method that calls the `fetchTranslation` function. Then, update the content of the `contentDiv` with the translated text:

javascriptCopy code

```
fetchTextFromArweave(txid)
  .then((text) => {
    return fetchTranslation(text, "en", target_language);
  })
  .then((translatedData) => {
    console.log("translated data:", translatedData);
    contentDiv.innerHTML = `<p>${translatedData.responseData.translatedText}</p>`;
  })
  .catch((error) => {
    console.error(error);
    contentDiv.innerHTML = `<p>Error: ${error.message}</p>`;
  });

```

### Step 10: Save and redeploy the renderer

After making these changes, save your `renderer.html` file. Redeploy the updated renderer to Arweave using the Bundlr CLI as you did in Part 1, Step 5:

bashCopy code

`npx bundlr upload renderer.html -c arweave -h https://node2.bundlr.network -w ./wallet.json`

### Step 11: Test your updated renderer

To test your updated renderer with language translation, append a `tx` query parameter with the valid Arweave transaction ID of your deployed `hello-world.txt` to the URL:

`https://arweave.net/your-renderer-transaction-id?tx=hello-world-transaction-id`

Replace `your-renderer-transaction-id` with the actual transaction ID of your redeployed renderer, and `hello-world-transaction-id` with the transaction ID of your deployed `hello-world.txt` file.

Now, when you access the renderer with a valid Arweave transaction ID, it should display the translated text content.
