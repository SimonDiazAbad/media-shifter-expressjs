import { UserRoles } from "@media-shifter/commons";
import { db } from ".";
import { UserDbInsert, users } from "./schemas/user.schema";

async function main() {
  console.log("🟡 Seeding...");

  const testAdmin: UserDbInsert = {
    // @ts-expect-error
    id: "00000000-0000-0000-0000-000000000000",
    email: "admin@media-shifter.com",
    name: "Admin aDMIN",
    password: "admin",
    role: UserRoles.ADMIN,
  };

  const testUser: UserDbInsert = {
    // @ts-expect-error
    id: "00000000-0000-0000-0000-000000000001",
    email: "user@media-shifter.com",
    name: "Test User",
    password: "test",
    role: UserRoles.User,
  };

  await db.insert(users).values([testUser, testAdmin]);

  console.log("🟢 Seeding complete");

  process.exit(0);
}

try {
  main();
} catch (err) {
  console.error("There was an error", err);
  process.exit(1);
}
