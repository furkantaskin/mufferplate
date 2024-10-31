#!/usr/bin/env node

const prompts = require("prompts");
const fs = require("fs");
const path = require("path");
const kolorist = require("kolorist");

const {
  magenta,
  lightGreen,
  green,
  blue,
  yellow,
  lightCyan,
  lightBlue,
  red,
  reset,
  cyan,
} = kolorist;

function isEmpty(path) {
  const files = fs.readdirSync(path);
  return files.length === 0 || (files.length === 1 && files[0] === ".git");
}

function emptyDir(dir) {
  if (!fs.existsSync(dir)) {
    return;
  }
  for (const file of fs.readdirSync(dir)) {
    if (file === ".git") {
      continue;
    }
    fs.rmSync(path.resolve(dir, file), {
      recursive: true,
      force: true,
    });
  }
}

const templates = [
  {
    name: "vite",
    display: "Use mufferplate with Vite ⚡",
    color: yellow,
  },
  {
    name: "rsbuild",
    display: "Use mufferplate with Rsbuild 🦀",
    color: lightCyan,
  },
  {
    name: "single",
    display: "Single Output (Deprecated)",
    color: magenta,
    variants: [
      {
        name: "single-tw-css",
        display: "Tailwind (Plain CSS)",
        color: lightCyan,
      },
      {
        name: "single-tw-scss",
        display: "Tailwind (With Sass)",
        color: blue,
      },
      {
        name: "single-bs",
        display: "Bootstrap",
        color: magenta,
      },
      {
        name: "single-custom",
        display: "Mufferplate Utilities",
        color: lightGreen,
      },
    ],
  },
  {
    name: "multi",
    display:
      "Multiple Output (Deprecated)",
    color: lightBlue,
  },
];

async function main() {
  let result;

  try {
    result = await prompts(
      [
        {
          type: "select",
          name: "project-type",
          initial: 0,
          message: "Choose a project template",
          choices: templates.map((project) => {
            const projectColor = project.color;
            return {
              title: projectColor(project.display || project.name),
              value: project,
            };
          }),
        },
        {
          type: (project) => (project && project.variants ? "select" : null),
          name: "variant",
          message: reset("Select a variant:"),
          choices: (project) =>
            project.variants.map((variant) => {
              const variantColor = variant.color;
              return {
                title: variantColor(variant.display || variant.name),
                value: variant.name,
              };
            }),
        },
      ],
      {
        onCancel: () => {
          throw new Error(red("X ") + "initialization cancelled");
        },
      }
    );
  } catch (cancelled) {
    console.log(red("Error: " + cancelled.message));
  }

  try {
    const templateDir = result.variant || result["project-type"].name;
    let sourceDir = path.resolve(
      __dirname,
      "templates",
      `template-${templateDir}`
    );
    const currentDir = process.cwd();

    if (!isEmpty(currentDir)) {
      const clearDir = await prompts({
        type: "confirm",
        name: "value",
        message:
          "Current directory is not empty. Do you want to clean the current directory: ",
        initial: false,
      });
      if (clearDir.value) {
        console.log(magenta("Cleaning the current directory..."));
        emptyDir(currentDir);
      } else {
        console.log(magenta("Skipping the cleaning process..."));
      }
    }

    fs.cpSync(sourceDir, currentDir, { recursive: true });

    fs.renameSync(
      path.join(currentDir, "_gitignore"),
      path.join(currentDir, ".gitignore")
    );

    console.log(green("Files installed successfully."));
    console.log(cyan("Run install and dev commands for your runtime or package manager"));
  } catch (error) {
    console.log(red("There is an error: ", error));
  }
}

main(); // Call the async function to start execution
