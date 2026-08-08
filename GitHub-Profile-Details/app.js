const input = process.argv[2];

if (!input) {
  console.log("Please enter the user profile");
  process.exit(1);
}
async function main() {
  try {
    const res = await fetch(`https://api.github.com/users/${input}`);
    if (!res.ok) {
      console.log("NO User Found");
      return;
    }
    const user = await res.json();

    console.log("Name:", user.name || "not set");
    console.log("Username:", user.login);
    console.log("Profile:", user.html_url);
    console.log("Public repos:", user.public_repos);
    console.log("Followers:", user.followers);
  } catch (err) {
    console.error(err.message, "error")
  }
}
main();