export const ENV = {
  DB_HOST: process.env.DB_HOST || "localhost",
  DB_PORT: process.env.DB_PORT || "5432",
  DB_USER: process.env.DB_USER || "username",
  DB_PASSWORD: process.env.DB_PASSWORD || "password",
  DB_DATABASE: process.env.DB_DATABASE || "postgres",
  NODE_ENV: process.env.NODE_ENV || "DEV",
};
