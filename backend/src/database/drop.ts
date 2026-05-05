import postgres from "postgres";

const sql = postgres(process.env.DATABASE_URL!);

async function drop() {
  console.log("Dropping all tables...");

  // Order matters — child tables before parent tables (FK constraints)
  await sql`DROP TABLE IF EXISTS refresh_tokens CASCADE`;
  await sql`DROP TABLE IF EXISTS users CASCADE`;
  await sql`DROP TABLE IF EXISTS messages CASCADE`;
  await sql`DROP TABLE IF EXISTS projects CASCADE`;
  await sql`DROP TABLE IF EXISTS __drizzle_migrations CASCADE`;

  console.log("All tables dropped.");
  await sql.end();
}

drop().catch((err) => {
  console.error(err);
  process.exit(1);
});
