/* 3rd Party Modules */
import pc from "picocolors";


/* Types */
import { baseLogs } from "../types/types";


export function logResult(inputText: string, logType: baseLogs): boolean {
  switch (logType) {
    case "info":
      console.log(`${pc.cyan("[INFO]")} ${inputText}`);
      break;
    case "success":
      console.log(`${pc.green("[SUCCESS]")} ${inputText}`);
      break;
    case "warning":
      console.log(`${pc.yellow("[WARNING]")} ${inputText}`);
      break;
    case "error":
      console.log(`${pc.red("[ERROR]")} ${inputText}`);
      break;
    default:
      console.log(pc.white(inputText));
      break;
  }
  return true;
}
