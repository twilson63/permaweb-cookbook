const path = require("path");
const { Octokit } = require("@octokit/core");
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

// Init Octokit (utility to interact with GitHub API)
const octokit = new Octokit({ auth: process.env.SPECIAL_ACCESS_TOKEN });

async function main() {
  console.log(`Fetching latest pull request...`);
  // Get the latest push to the main branch
  const pullRequest = await getLatestPullRequest();

  if (pullRequest) {
    console.log(`Checking for modified docs files...`);
    // Get the modified files from the push
    // Selects only from "concepts", "getting-started", "guides", "kits", "references" folders
    // Or the main "index.md" file
    const modifiedFiles = await getModifiedFiles(pullRequest);

    // Looping over modified files
    for (const file of modifiedFiles) {
      console.log(`Reading file content for ${file}...`);
      // Reading file content
      const fileContent = await octokit.request(
        "GET /repos/{owner}/{repo}/contents/{path}",
        {
          owner: "twilson63",
          repo: "permaweb-cookbook",
          path: file,
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
          },
        }
      );

      // File content is decoded from `base64` to `string`
      const decodedFileContent = atob(fileContent.data.content);

      console.log(`Here's the response: ${decodedFileContent} for ${file}...`);

      // Define the prompt for translation to Spanish
      const prompt = `As a linguistics professor who is an expert in English and Spanish, translate the following markdown text to Spanish while maintaining and translating the context in which the terms, phrases and sections have been created in the original text and keep in mind that the reader is familiar with some initial information about Arweave and blockchain infrastructure:\n\n${decodedFileContent}`;

      // Translate the content to Spanish using the OpenAI API client
      const translatedContent = await translateTextToSpanish(prompt);

      // Getting relative path of file in `src` folder
      const relativePath = file.split("docs/src");

      // Creating new file path for translated file using relative path
      const translatedFilePath = path.join("docs/src/es", relativePath[1]);

      // Adding frontmatter to translation
      const markdownTranslatedContent =
        addMarkdownFormatting(translatedContent);

      console.log(`Writing translated file to ${translatedFilePath}...`);

      // Check if file path for translated file already exists
      const dirStatus = await ensureDirectoryExists(translatedFilePath);

      // If file path does not exist, create new file
      // Else, overwrite existing file (linked using the SHA)
      if (dirStatus.exists === false) {
        console.log("Creating new file...");
        await octokit.request("PUT /repos/{owner}/{repo}/contents/{path}", {
          owner: "twilson63",
          repo: "permaweb-cookbook",
          path: translatedFilePath,
          message: `Translate ${translatedFilePath} to Spanish`,
          committer: {
            name: "ropats16",
            email: "rohitcpathare@gmail.com",
          },
          content: btoa(markdownTranslatedContent),
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
          },
        });
      } else if (dirStatus.exists === true) {
        console.log("Overwriting existing file...");
        await octokit.request("PUT /repos/{owner}/{repo}/contents/{path}", {
          owner: "twilson63",
          repo: "permaweb-cookbook",
          path: translatedFilePath,
          message: `Translate ${translatedFilePath} to Spanish`,
          committer: {
            name: "ropats16",
            email: "rohitcpathare@gmail.com",
          },
          content: btoa(markdownTranslatedContent),
          sha: dirStatus.sha,
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
          },
        });
      }

      console.log(`Translation complete for file: ${file}`);
    }
    console.log(`Translation of all files completed`);
  }
}

// Get latest pull request
async function getLatestPullRequest() {
  const owner = "twilson63";
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
    return pullRequests[0];
  }

  return null;
}

// Get modified files from selected folders
async function getModifiedFiles(pullRequest) {
  const owner = "twilson63";
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
    }
  }

  return filePaths;
}

// Function to translate text using OpenAI
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
  return response.data.choices[0].message.content;
}

// Function to check if translated file path already exists
async function ensureDirectoryExists(filePath) {
  console.log(`Checking if ${filePath} exists...`);
  // Reading file content
  try {
    const fileContent = await octokit.request(
      "GET /repos/{owner}/{repo}/contents/{path}",
      {
        owner: "twilson63",
        repo: "permaweb-cookbook",
        path: filePath,
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );
    return { exists: true, sha: fileContent.data.sha };
  } catch (error) {
    console.log("Error fetching file because:", error.message);
    return { exists: false, sha: null };
  }
}

// Adds locale frontmatter to text
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
