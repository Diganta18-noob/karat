const path = require("node:path");
const { spawn } = require("node:child_process");
const choices = ["01-pagination", "02-fetch-details", "03-context", "04-birthdates", "05-debounce", "06-lazy", "07-product-search", "08-fetch-users"];
const choice = process.argv[2] || choices[0];
if (!choices.includes(choice)) {
  console.log("Choose one of:\n" + choices.join("\n"));
  process.exitCode = 1;
} else {
  const child = spawn(process.execPath, [path.resolve(__dirname, "../../node_modules/vite/bin/vite.js"), "--host", "0.0.0.0"], {cwd: path.join(__dirname, choice), stdio: "inherit"});
  child.on("exit", code => { process.exitCode = code || 0; });
}
