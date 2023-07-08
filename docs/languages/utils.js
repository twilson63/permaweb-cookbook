const enStrings = require("./strings/en.json");
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

// Translate en strings file
async function translateEnStringJsonFile(lang) {
  // Create config for OpenAi and create instance
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const content = JSON.stringify(enStrings);

  const prompt = `As a linguistics professor who is an expert in English and ${lang}, translate the following json file to ${lang} while maintaining and translating the context in which the terms, phrases and sections have been created in the original text and keep in mind that the reader is familiar with some initial information about Arweave and blockchain infrastructure:\n\n${content}`;

  // Use the OpenAI API client to translate the text to Spanish
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo-16k",
    messages: [{ role: "user", content: prompt }],
    max_tokens: 4096,
  });
  return response.data.choices[0].message.content;
}

// Function to translate text using OpenAI
async function translateTextToLanguage(lang, content) {
  // Create config for OpenAi and create instance
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  // Define the prompt for translation to the specified language
  const prompt = `As a linguistics professor who is an expert in English and ${lang}, translate the following markdown text to ${lang} while maintaining and translating the context in which the terms, phrases and sections have been created in the original text and keep in mind that the reader is familiar with some initial information about Arweave and blockchain infrastructure:\n\n${content}`;

  // console.log("OpenAPI instance", openai);

  // Use the OpenAI API client to translate the text to Spanish
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo-16k",
    messages: [{ role: "user", content: prompt }],
    max_tokens: 4096,
  });
  return response.data.choices[0].message.content;
};

// Adds locale frontmatter to text
function addMarkdownFormatting(langCode, text) {
  const frontmatter = `---
locale: ${langCode}
---
`;
  const markdownContent = `${frontmatter}${text}`;

  return markdownContent;
}

module.exports = {
  translateTextToLanguage,
  translateEnStringJsonFile,
  addMarkdownFormatting,
}