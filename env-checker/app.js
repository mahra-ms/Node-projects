
const variableNames = process.argv.slice(2);

function showError(message) {
  console.error("Error:", message);
  process.exitCode = 1;
}

function findMissingVariables(names) {
  const missing = [];

  for (const name of names) {
    if (!process.env[name]) {
      missing.push(name);
    }
  }

  return missing;
}

function showSuccess(names) {
  for (const name of names) {
    console.log(`Set: ${name}`);
  }

  console.log("All required environment variables are set.");
}

function main() {
  if (variableNames.length === 0) {
    showError("Please provide at least one environment variable name.");
    return;
  }

  const missingVariables = findMissingVariables(variableNames);


  if (missingVariables.length > 0) {
    showError(
      `Missing environment variables: ${missingVariables.join(", ")}`
    );
    return;
  }

  showSuccess(variableNames);
}

main();