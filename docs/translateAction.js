const fs = require("fs");
const path = require("path");
const { Octokit } = require("@octokit/core");
const { promisify } = require("util");
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

async function main() {
  console.log(`Fetching latest pull request...`);
  // Get the latest push to the main branch
  const pullRequest = await getLatestPullRequest();

  if (pullRequest) {
    console.log(`Checking for modified docs files...`);
    //   // Get the modified files from the push
    const modifiedFiles = await getModifiedFiles(pullRequest);
    //   for (const file in modifiedFiles) {
    //     console.log(`This is the file ${file.filename}`);
    //   }
    for (const file of modifiedFiles) {
      console.log(`Reading file content for ${file}...`);
      // Reading file content
      const fileContent = await octokit.request(
        "GET /repos/{owner}/{repo}/contents/{path}",
        {
          owner: "ropats16",
          repo: "permaweb-cookbook",
          path: file,
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
          },
        }
      );

      console.log(`Here's the response: ${fileContent} for ${file}...`);
      // const fileContent = await readFileAsync(file, "utf-8");

      // Define the prompt for translation to Spanish
      const prompt = `As a linguistics professor who is an expert in English and Spanish, translate the following markdown text to Spanish while maintaining and translating the context in which the terms, phrases and sections have been created in the original text and keep in mind that the reader is familiar with some initial information about Arweave and blockchain infrastructure:\n\n${fileContent}`;

      console.log(`Writing translated file...`);
      // Translate the content to Spanish using the OpenAI API client
      const translatedContent = await translateTextToSpanish(prompt);

      const { relativePath } = file.split("docs/src");

      // Write the translated file to the "es" subfolder
      const translatedFilePath = path.join("docs/src/es", relativePath);

      // Check if path exists
      ensureDirectoryExists(translatedFilePath);

      // Create path for file
      // const translatedFilePath = path.join(translatedFolderPath, file);

      console.log(`Writing translated file to ${translatedFilePath}...`);

      const markdownTranslatedContent =
        addMarkdownFormatting(translatedContent);

      // // Write content to file
      await writeFileAsync(
        translatedFilePath,
        markdownTranslatedContent,
        "utf-8"
      );

      console.log(`Translation complete for file: ${filePath}`);
    }
    console.log(`Translation of all files completed`);
  }
}

async function getLatestPullRequest() {
  const owner = "ropats16";
  const repo = "permaweb-cookbook";

  // Get the latest push to the main branch
  const response = await octokit.request("GET /repos/{owner}/{repo}/pulls", {
    owner,
    repo,
    state: "closed",
    sort: "updated",
    direction: "desc",
    per_page: 1,
  });

  const pullRequests = response.data;

  if (pullRequests.length > 0 && pullRequests[0].merged_at) {
    console.log(
      `**********************This is latest PR number ${pullRequests[0].number} ***************`
    );
    return pullRequests[0];
  }

  return null;
}

async function getModifiedFiles(pullRequest) {
  const owner = "ropats16";
  const repo = "permaweb-cookbook";

  const subfoldersToRead = [
    "concepts",
    "getting-started",
    "guides",
    "kits",
    "references",
  ];

  // Get the files modified in the push
  const response = await octokit.request(
    "GET /repos/{owner}/{repo}/pulls/{pull_number}/files",
    {
      owner,
      repo,
      pull_number: pullRequest.number,
    }
  );

  let filePaths = [];

  for (const file of response.data.filter(
    (file) => file.status === "modified"
  )) {
    if (
      file.filename === "docs/src/index.md" ||
      subfoldersToRead.some((subfolder) =>
        file.filename.startsWith(`docs/src/${subfolder}`)
      )
    ) {
      filePaths = [...filePaths, file.filename];
      console.log(
        `//////////////The file at this path was changed: ${file.filename}/////////////`
      );
    }
  }

  return filePaths;
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

function ensureDirectoryExists(filePath) {
  const directoryPath = filePath.substring(0, path.lastIndexOf("/") + 1);
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
