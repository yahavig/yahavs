import { readFile } from "fs/promises";
import { join } from "path";

export function getSiteConfig() {
  return readFile(join(process.cwd(), "content", "site.json"), "utf-8").then(JSON.parse);
}
