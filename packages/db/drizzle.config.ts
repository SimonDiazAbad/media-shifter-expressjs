import { defineConfig } from "drizzle-kit";
import { DB_ENV } from "./src/env";

export default defineConfig({
  schema: "./src/schemas/index.ts",
  out: "./drizzle",
  dialect: "postgresql", // 'postgresql' | 'mysql' | 'sqlite'
  dbCredentials: {
    host: DB_ENV.DB_HOST,
    port: Number(DB_ENV.DB_PORT),
    user: DB_ENV.DB_USER,
    password: DB_ENV.DB_PASSWORD,
    database: DB_ENV.DB_DATABASE,
  },
});
