import prompts from "prompts";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { magenta, lightCyan, green, blue, red, reset } from "kolorist";

const templates = [
  {
    name: "single",
    display: "Single Output (Single CSS and Single JS Output)",
    color: green,
    variants: [
      {
        name: "single-tw",
        display: "Tailwind",
        color: lightCyan,
      },
      {
        name: "single-bs",
        display: "Bootstrap",
        color: magenta,
      },
    ],
  },
  {
    name: "multi",
    display: "Multiple Output (Multiple CSS and Multiple JS Output)",
    color: blue,
  },
];

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
          }
    ],
    {
        onCancel: () => {
            throw new Error(red('X ') + 'initialization cancelled')
        }
    }
  );
} catch(cancelled) {
  console.log(red("Error: " + cancelled.message));
}

const template = (result.variant || result["project-type"].name);
let direct = path.resolve(
  fileURLToPath(import.meta.url),
  "../",
  "templates",
  `template-${template}`
);

console.log(process.cwd());

console.log(direct);
