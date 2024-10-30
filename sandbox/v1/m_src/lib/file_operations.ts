import path from "node:path";
import fs from "node:fs";

import { ROOT_DIR } from "./constants.js";
import { logResult } from "./io_functions.js";

export function mergeFiles(filePaths: string[]): string[] | null | undefined {
  let getDir = "";
  let files;
  for (const filePath of filePaths) {
    if (!fs.existsSync(path.join(ROOT_DIR, filePath)))
      logResult(`File not found: ${filePath}`, "error");
    else {
      if (!fs.statSync(filePath).isFile()) {
        getDir = filePath;
        logResult(
          `Directory detected: ${getDir}. Other file declarations will be ignored\n`,
          "info"
        );
        break;
      }
    }
  }
  try {
    if (filePaths !== null) {
      let newMap: string[] = [];
      if (getDir !== "") {
        files = fs
          .readdirSync(path.join(ROOT_DIR, getDir))
          .filter(
            (file) =>
              path.extname(file) === ".js" || path.extname(file) === ".ts"
          );
        newMap = files.map((filePath) => path.join(ROOT_DIR, getDir, filePath));
      } else {
        newMap = filePaths.map((file) => path.join(ROOT_DIR, file));
      }
      return newMap;
    }
  } catch (err) {
    logResult(
      `Caught error on gettting directory information. Error: ${err}`,
      "error"
    );
    return null;
  }
}

export function emptyDir(dir: string, exclude: string[] = []) {
  if (!fs.existsSync(dir)) {
    return;
  }
  for (const file of fs.readdirSync(dir)) {
    if (file === ".git" || exclude.includes(file)) {
      continue;
    }
    fs.rmSync(path.resolve(dir, file), {
      recursive: true,
      force: true,
    });
  }
}

export function calculateSize(file: string): string{
  const fileSizeInBytes = fs.statSync(file).size;

  let fileSize;
  if (fileSizeInBytes < 1024 * 1024) {
    fileSize = (fileSizeInBytes / 1024).toFixed(2) + " KB";
  } else {
    fileSize = (fileSizeInBytes / (1024 * 1024)).toFixed(2) + " MB";
  }
  return fileSize;
}