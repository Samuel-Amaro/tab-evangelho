import { runner, RunnerOption } from "node-pg-migrate";
import { Client } from "pg";
import database from "../../../../../infra/database";
import { resolve } from "path";

async function migrations(method: "GET" | "POST") {
  let dbClient: Client | undefined;

  try {
    dbClient = await database.getNewClient();

    const defaultMigrationOptions: RunnerOption = {
      dbClient: dbClient,
      dryRun: true,
      dir: resolve("infra", "migrations"),
      direction: "up",
      verbose: true,
      migrationsTable: "pgmigrations",
    };

    if (method === "GET") {
      return await runner(defaultMigrationOptions);
    }

    const migratedMigrations = await runner({
      ...defaultMigrationOptions,
      dryRun: false,
    });

    return migratedMigrations;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await dbClient?.end();
  }
}

export async function POST() {
  const migratedMigrations = await migrations("POST");

  if (migratedMigrations.length > 0) {
    return Response.json(migratedMigrations, { status: 201 });
  }

  return Response.json(migratedMigrations);
}

export async function GET() {
  return Response.json(await migrations("GET"));
}
