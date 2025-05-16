import { defineConfig } from 'drizzle-kit';
import { config } from 'dotenv';

// Charger les variables d'environnement
config();

export default defineConfig({
  schema: './src/lib/server/db/schema.ts',
  dialect: 'sqlite',
  out: './drizzle',
  dbCredentials: {
    url: './sqlite.db'
  },
  verbose: true,
  strict: true
});
