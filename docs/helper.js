const fs = require("fs");
const path = require("path");
import { Octokit } from "@octokit/core";
const { promisify } = require("util");
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

async function main() {
  const subfoldersToRead = [
    "concepts",
    "getting-started",
    "guides",
    "kits",
    "references",
  ];

  // Get the latest push to the main branch
  const push = await getLatestPushToMainBranch();

  // Read and translate the files
  const docsPath = path.join(__dirname, "/src");

  if (push) {
    // Get the modified files from the push
    const modifiedFiles = await getModifiedFiles(push);
    for (const file in modifiedFiles) {
      console.log(`This is the file ${file.filename}`);
    }
  }

  // for (const subfolder of subfoldersToRead) {
  //   const subfolderPath = path.join(docsPath, subfolder);

  //   if (fs.existsSync(subfolderPath)) {
  //     // Checks whether subfolder has files or further subfolders
  //     // and processes accordingly
  //     await processFilesInSubfolder(docsPath, subfolderPath, subfolder);
  //   }
  // }
  console.log(`Translation of all files completed`);
}

async function getLatestPushToMainBranch() {
  const owner = "ropats16";
  const repo = "permaweb-cookbook";
  const branch = "main";

  // Get the latest push to the main branch
  const response = await octokit.request("GET /repos/{owner}/{repo}/commits", {
    owner,
    repo,
    sha: branch,
    per_page: 1,
  });

  const commits = response.data;

  if (commits.length > 0) {
    return commits[0];
  }

  return null;
}

async function getModifiedFiles(push) {
  const owner = "ropats16";
  const repo = "permaweb-cookbook";
  const { sha } = push;

  // Get the files modified in the push
  const response = await octokit.request(
    "GET /repos/{owner}/{repo}/commits/{ref}/files",
    {
      owner,
      repo,
      ref: sha,
    }
  );

  return response.data;
}

async function processFilesInSubfolder(
  rootPath,
  folderPath,
  relativeFolderPath
) {
  const files = fs.readdirSync(folderPath);

  for (const file of files) {
    const filePath = path.join(folderPath, file);
    const stat = fs.statSync(filePath);

    if (stat.isFile()) {
      console.log(`Translating file ${filePath}...`);
      // Read the content of each file
      // const fileContent = await readFileAsync(filePath, "utf-8");

      // Define the prompt for translation to Spanish
      // const prompt = `As a linguistics professor who is an expert in English and Spanish, translate the following markdown text to Spanish while maintaining and translating the context in which the terms, phrases and sections have been created in the original text and keep in mind that the reader is familiar with some initial information about Arweave and blockchain infrastructure:\n\n${fileContent}`;

      // Translate the content to Spanish using the OpenAI API client
      // const translatedContent = await translateTextToSpanish(prompt);

      // Write the translated file to the "es" subfolder
      const translatedFolderPath = path.join(
        rootPath,
        "es",
        relativeFolderPath
      );

      // Check if path exists
      ensureDirectoryExists(translatedFolderPath);

      // Create path for file
      // const translatedFilePath = path.join(translatedFolderPath, file);

      // console.log(`Writing translated file: ${translatedFilePath}`);

      // const markdownTranslatedContent =
      // addMarkdownFormatting(translatedContent);

      // // Write content to file
      // await writeFileAsync(
      //   translatedFilePath,
      //   markdownTranslatedContent,
      //   "utf-8"
      // );

      console.log(`Translation complete for file: ${filePath}`);
    } else if (stat.isDirectory()) {
      // Recursively process files in subfolders
      const subfolderPath = path.join(folderPath, file);
      const subfolderRelativePath = path.join(relativeFolderPath, file);

      console.log(`Reading from subfolder ${subfolderPath}...`);

      if (fs.existsSync(subfolderPath)) {
        // Checks whether subfolder has files or further subfolders
        // and processes accordingly
        await processFilesInSubfolder(
          rootPath,
          subfolderPath,
          subfolderRelativePath
        );
      }
    }
  }
}

async function translateTextToSpanish(text) {
  // Create config for OpenAi and create instance
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  // console.log("OpenAPI instance", openai);

  // Use the OpenAI API client to translate the text to Spanish
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo-16k",
    messages: [{ role: "user", content: text }],
    max_tokens: 4096,
  });

  // return response.choices[0].text.trim();
  console.log("This is res", response.data.choices[0].message.content);
  return response.data.choices[0].message.content;
}

function ensureDirectoryExists(directoryPath) {
  // Create the directory if it doesn't exist
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath, { recursive: true });
  }
}

function addMarkdownFormatting(text) {
  const frontmatter = `---
locale: es
---
`;

  const markdownContent = `${frontmatter}${text}`;

  return markdownContent;
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
