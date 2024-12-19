import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { DB_ENV } from "./env";

const pool = new Pool({
  host: DB_ENV.DB_HOST,
  port: Number(DB_ENV.DB_PORT),
  database: DB_ENV.DB_DATABASE,
  user: DB_ENV.DB_USER,
  password: DB_ENV.DB_PASSWORD,
});

export const db = drizzle(pool);
