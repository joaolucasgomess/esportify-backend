import "dotenv/config";
import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

const pool = new Pool({
    connectionString: process.env.DB_URL!,
});

export const db = drizzle({ client: pool, schema: schema });

// async function main() {
//     const cnpjValid1: typeof cnpjValid.$inferInsert = {
//         id: generatedId(),
//         cnpj: "11111111111111",
//     };

//     const cnpjValid2: typeof cnpjValid.$inferInsert = {
//         id: generatedId(),
//         cnpj: "22222222222222",
//     };

//     await db.insert(cnpjValid).values(cnpjValid1);
//     await db.insert(cnpjValid).values(cnpjValid2);
// }

// main();
