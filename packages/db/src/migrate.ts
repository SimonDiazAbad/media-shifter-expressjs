import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { ENV } from "./env";

const pool = new Pool({
  host: ENV.DB_HOST,
  port: Number(ENV.DB_PORT),
  database: ENV.DB_DATABASE,
  user: ENV.DB_USER,
  password: ENV.DB_PASSWORD,
});

const db = drizzle(pool);

async function main() {
  console.log("🟡 Migrating...");
  await migrate(db, {
    migrationsFolder: "drizzle",
  });

  console.log("🟢 Migration complete");

  process.exit(0);
}

main().catch((err) => {
  console.error("There was an error", err);
  process.exit(1);
});
