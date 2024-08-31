import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { ENV } from "./env";

const pool = new Pool({
  host: ENV.DB_HOST,
  port: Number(ENV.DB_PORT),
  database: ENV.DB_DATABASE,
  user: ENV.DB_USER,
  password: ENV.DB_PASSWORD,
});

export const db = drizzle(pool);
