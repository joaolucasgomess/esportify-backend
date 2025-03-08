import 'dotenv/config';
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { cnpjValidTable } from './schema';
import { generatedId } from '../services/idGenerator';

const pool = new Pool({
  connectionString: process.env.DB_URL!,
});

const db = drizzle({ client: pool });

async function main() {
  const cnpjValid1: typeof cnpjValidTable.$inferInsert = {
    id: generatedId(),
    cnpj: '11111111111111'
  };

  const cnpjValid2: typeof cnpjValidTable.$inferInsert = {
    id: generatedId(),
    cnpj: '22222222222222'
  };

  await db.insert(cnpjValidTable).values(cnpjValid1);
  await db.insert(cnpjValidTable).values(cnpjValid2);
}

main();