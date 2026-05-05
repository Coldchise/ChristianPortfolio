import { migrate } from "drizzle-orm/postgres-js/migrator";
import { db } from "./drizzle";

async function runMigrations() {
  console.log("Running migrations from ./src/database/migration ...");
  await migrate(db, { migrationsFolder: "./src/database/migration" });
  console.log("Migrations complete.");
  process.exit(0);
}

runMigrations().catch((err) => {
  console.error(err);
  process.exit(1);
});
