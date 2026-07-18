/**
 * Supabase external app data layer.
 *
 * Magic's primary datastore is the bundled MySQL (DB_DRIVER=mysql in .env).
 * Supabase is used here as an EXTERNAL Postgres for your own application
 * features / Auth / Storage. It is NOT the backing store for Magic core.
 *
 * Usage:
 *   npm install @supabase/supabase-js dotenv
 *   node supabase-client.mjs
 *
 * Reads these vars from .env (see .env "Supabase (EXTERNAL app data layer)" section):
 *   SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY,
 *   SUPABASE_DB_CONNECTION_STRING
 */
import { createClient } from "@supabase/supabase-js";
import { config as loadEnv } from "dotenv";
import { Client } from "pg";
import { readFileSync } from "node:fs";

loadEnv();

const SUPABASE_URL = process.env.SUPABASE_URL;
const ANON_KEY = process.env.SUPABASE_ANON_KEY;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const DB_CONNECTION_STRING = process.env.SUPABASE_DB_CONNECTION_STRING;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error(
    "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. Check the Supabase section in .env."
  );
  process.exit(1);
}

export const supabaseAnon = createClient(SUPABASE_URL, ANON_KEY ?? "");
export const supabaseAdmin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

/** Verify connectivity to the Supabase Postgres database. */
export async function checkDatabase() {
  if (!DB_CONNECTION_STRING) {
    throw new Error("SUPABASE_DB_CONNECTION_STRING is not set in .env");
  }
  const client = new Client({ connectionString: DB_CONNECTION_STRING });
  await client.connect();
  const res = await client.query("select version()");
  await client.end();
  return res.rows[0].version;
}

// Allow running directly: `node supabase-client.mjs`
if (import.meta.url === `file://${process.argv[1]}`) {
  try {
    const version = await checkDatabase();
    console.log("Supabase Postgres connected:");
    console.log(version);
    console.log("Supabase URL:", SUPABASE_URL);
  } catch (err) {
    console.error("Supabase connection failed:", err.message);
    process.exit(1);
  }
}
