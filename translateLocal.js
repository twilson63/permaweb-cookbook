const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const { translateTextToLanguage, addMarkdownFormatting, translateEnStringJsonFile } = require("./languages/utils");
const { languages } = require("./languages/def")

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

  // Read and translate the files
  const docsPath = path.join(__dirname, "/src");

  // Loop through languages and translate all files
  for (const language of languages) {
    // translate strings
    const translatedStringFilePath = path.join(__dirname, `/languages/strings/${language.code}.json`);
    const translatedJson = await translateEnStringJsonFile(language.name);
    const translateJsonObj = JSON.parse(translatedJson);

    // look for existing string json file
    let originalJson = {};
    try {
      const originalJsonContent = await readFileAsync(translatedStringFilePath, "utf-8");
      originalJson = JSON.parse(originalJsonContent);
    } catch (e) {
      console.error(`Error while reading json file: ${translatedStringFilePath}`);
      throw e;
    }

    // merge original and new json object, keep original json values as priority
    const mergedObj = { ...translateJsonObj, ...originalJson };

    await writeFileAsync(
      translatedStringFilePath,
      JSON.stringify(mergedObj, null, 2),
      "utf-8"
    );

    // Translate index.md file
    await processIndexFile(language, docsPath);

    for (const subfolder of subfoldersToRead) {
      const subfolderPath = path.join(docsPath, subfolder);

      if (fs.existsSync(subfolderPath)) {
        // Checks whether subfolder has files or further subfolders
        // and processes accordingly
        await processFilesInSubfolder(language, docsPath, subfolderPath, subfolder);
      }
    }

    console.log(`Translation of all files in ${language.name} completed`);
  }
  
  console.log(`Translation of all files completed`);
}

async function processFilesInSubfolder(
  language,
  rootPath,
  folderPath,
  relativeFolderPath
) {
  const files = fs.readdirSync(folderPath);

  for (const file of files) {
    const filePath = path.join(folderPath, file);
    const stat = fs.statSync(filePath);

    if (stat.isFile()) {
      // Write the translated file to the language's subfolder
      const translatedFolderPath = path.join(
        rootPath,
        language.code,
        relativeFolderPath
      );

      // Check if path exists
      ensureDirectoryExists(translatedFolderPath);

      // Create path for file
      const translatedFilePath = path.join(translatedFolderPath, file);

      // check if translated file already exists, skip file if so
      if (fs.existsSync(translatedFilePath)) {
        console.log(`${translatedFilePath} already exist. Skipping...`);
        continue;
      }

      console.log(`Translating file ${filePath}...`);
      // Read the content of each file
      const fileContent = await readFileAsync(filePath, "utf-8");
      
      // Translate the content to Spanish using the OpenAI API client
      const translatedContent = await translateTextToLanguage(language.name, fileContent);

      console.log(`Writing translated file: ${translatedFilePath}`);

      const markdownTranslatedContent =
        addMarkdownFormatting(language.code, translatedContent);

      // Write content to file
      await writeFileAsync(
        translatedFilePath,
        markdownTranslatedContent,
        "utf-8"
      );

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
          language,
          rootPath,
          subfolderPath,
          subfolderRelativePath
        );
      }
    }
  }
}

async function processIndexFile(language, rootPath) {
  const filePath = path.join(rootPath, "index.md");

  console.log(`Translating file ${filePath}...`);

  // Read the content of each file
  const fileContent = await readFileAsync(filePath, "utf-8");

  // Translate the content to the specified language using the OpenAI API client
  const translatedContent = await translateTextToLanguage(language.name, fileContent);
  const markdownTranslatedContent = addMarkdownFormatting(language.code, translatedContent);

  // Write the translated file to the "es" subfolder
  const translatedFilePath = path.join(rootPath, language.code, "index.md");

  console.log(`Writing translated file: ${translatedFilePath}`);

  // Write content to file
  await writeFileAsync(translatedFilePath, markdownTranslatedContent, "utf-8");

  console.log(`Translation complete for file: ${filePath}`);
}

function ensureDirectoryExists(directoryPath) {
  // Create the directory if it doesn't exist
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath, { recursive: true });
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
