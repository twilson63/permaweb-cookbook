const path = require("path");
const { Octokit } = require("@octokit/core");
const { translateTextToLanguage, addMarkdownFormatting } = require("./languages/utils");
const { languages } = require("./languages/def");
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

      for (const language of languages) {
        // Translate the content to the specified language using the OpenAI API client
        const translatedContent = await translateTextToLanguage(language.name, decodedFileContent);

        // Getting relative path of file in `src` folder
        const relativePath = file.split("docs/src");

        // Creating new file path for translated file using relative path
        const translatedFilePath = path.join(`docs/src/${language.code}`, relativePath[1]);

        // Adding frontmatter to translation
        const markdownTranslatedContent =
          addMarkdownFormatting(language.code, translatedContent);

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
            message: `Translate ${translatedFilePath} to ${language.name}`,
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
            message: `Translate ${translatedFilePath} to ${language.name}`,
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

        console.log(`${language.name} Translation complete for file: ${file}`);
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

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
