import { readdir } from "fs/promises";

import path from "path";

const input = process.argv[2];

const folderPath = input || process.cwd();

try {
  let fileCount = 0;
  let folderCount = 0;
  const items = await readdir(folderPath, { withFileTypes: true });

  for (const item of items) {
    if (item.isFile()) fileCount++;
    else if (item.isDirectory()) folderCount++;
  }

  console.log("Folder : ", path.basename(folderPath));
  console.log("Path : ", path.resolve(folderPath));
  console.log("File : ", fileCount);
  console.log("Folder : ", folderCount);
} catch (err) {
  console.error(err);
}
