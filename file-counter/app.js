import fs from "fs/promises";
import path from "path";


const filePath = process.argv[2];

async function main() {
  
  if (!filePath) {
    console.log("Please provide a file path");
    return;
  }

  try {
    
    const text = await fs.readFile(filePath, "utf8");

    
    let lineCount;
    if (text.length === 0) {
      lineCount = 0;
    } else {
      lineCount = text.split(/\r?\n/).length;
    }

   
    const wordCount = text
      .trim()
      .split(/\s+/)
      .filter(Boolean).length;

    const charCount = text.length;


    console.log("File:", path.basename(filePath));
    console.log("Lines:", lineCount);
    console.log("Words:", wordCount);
    console.log("Characters:", charCount);
  } catch (err) {
   
    console.log("Could not read file:", filePath);
  }
}

main();