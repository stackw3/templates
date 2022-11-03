module.exports = {
  // Type check TypeScript files
  "**/*.(ts|tsx)": () => "npx tsc --noEmit",

  // Lint and format TypeScript and JS files
  "**/*.(ts|tsx|js)": (filenames) => [
    `npx eslint --fix ${filenames.join(" ")}`,
    // `npx stylelint ${filenames.join(" ")}`,
    `npx prettier --write ${filenames.join(" ")}`
  ],

  // Format MarkDown and JSON
  "**/*.(md|json)": (filenames) => `npx prettier --write ${filenames.join(" ")}`
};
