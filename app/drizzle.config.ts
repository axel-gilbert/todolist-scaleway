import { defineConfig } from 'drizzle-kit';
import { config } from 'dotenv';

// Charger les variables d'environnement
config();

export default defineConfig({
  schema: './src/lib/server/db/schema.ts',
  dialect: 'postgresql',
  out: './drizzle',
  dbCredentials: {
    host: process.env.POSTGRES_HOST || 'localhost',
    port: process.env.POSTGRES_PORT ? parseInt(process.env.POSTGRES_PORT) : 5432,
    user: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'postgres',
    database: process.env.POSTGRES_DB || 'todolist',
  },
  verbose: true,
  strict: true
});
