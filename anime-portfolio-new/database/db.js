import { Pool } from 'pg';

/*
  Database connection helper.  Reads the connection string from
  environment variables and exports a query function.  If no
  DATABASE_URL is provided the exported `query` will throw; the
  server can fall back to in‑memory storage instead.
*/
let pool = null;
if (process.env.DATABASE_URL) {
  pool = new Pool({ connectionString: process.env.DATABASE_URL });
}

export const query = async (text, params) => {
  if (!pool) throw new Error('Database not configured');
  const res = await pool.query(text, params);
  return res;
};