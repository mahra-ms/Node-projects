import { readFile } from 'node:fs/promises';


const inputFile = process.argv[2];

function showError(message) {
  console.error('Error: ' + message);
  process.exitCode = 1;
}

function formatJson(text, fileName) {
  let data;

  try {
    
    data = JSON.parse(text);
  } catch (err) {
    console.error('Invalid JSON in ' + fileName);
    console.error(err.message);
    return null;
  }

 
  return JSON.stringify(data, null, 2);
}

async function main() {
  if (!inputFile) {
    showError('Please provide the file name');
    return;
  }

  let fileContent;

  try {
   
    fileContent = await readFile(inputFile, 'utf8');
  } catch (err) {
    console.error(err.message + ' - could not read JSON file');
    return;
  }

  const prettyJson = formatJson(fileContent, inputFile);

  if (prettyJson === null) return;

  console.log(prettyJson);
}

main();