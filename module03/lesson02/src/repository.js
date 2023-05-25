import { fileURLToPath } from "url";
import { writeFile, readFile } from "fs/promises";

export const save = async (data) => {
  // não tem __filename, __dirname
  const databaseFile = fileURLToPath(new URL("./../db.json", import.meta.url));
  const currentData = JSON.parse(await readFile(databaseFile));
  currentData.push(data);

  await writeFile(databaseFile, JSON.stringify(currentData));
};
