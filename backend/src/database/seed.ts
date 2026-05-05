import { readdir, readFile } from "fs/promises";
import { join, resolve } from "path";
import postgres from "postgres";

const sql = postgres(process.env.DATABASE_URL!);

async function seed() {
  const seedDir = resolve("seed");
  const files = (await readdir(seedDir))
    .filter((f: string) => f.endsWith(".sql"))
    .sort();

  if (files.length === 0) {
    console.log("No SQL files found in seed/");
    await sql.end();
    return;
  }

  for (const file of files) {
    const filePath = join(seedDir, file);
    const query = await readFile(filePath, "utf-8");
    console.log(`Running seed: ${file}`);
    await sql.unsafe(query);
  }

  console.log("Seed complete.");
  await sql.end();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
