import { defineConfig } from "drizzle-kit";
import { ENV } from "./src/env";

export default defineConfig({
  schema: "./src/schemas/index.ts",
  out: "./drizzle",
  dialect: "postgresql", // 'postgresql' | 'mysql' | 'sqlite'
  dbCredentials: {
    host: ENV.DB_HOST,
    port: Number(ENV.DB_PORT),
    user: ENV.DB_USER,
    password: ENV.DB_PASSWORD,
    database: ENV.DB_DATABASE,
  },
});
