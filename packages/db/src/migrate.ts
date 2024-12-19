import { migrate } from "drizzle-orm/node-postgres/migrator";
import { db } from ".";

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
