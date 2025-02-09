import controller from "../../../../../infra/controller";
import migrator from "@/models/migrator";

async function migrations(method: "GET" | "POST") {
  if (method === "GET") {
    return await migrator.listPendingMigrations();
  }

  const migratedMigrations = await migrator.runPendingMigrations();

  return migratedMigrations;
}

export async function POST() {
  try {
    const migratedMigrations = await migrations("POST");

    if (migratedMigrations.length > 0) {
      return Response.json(migratedMigrations, { status: 201 });
    }

    return Response.json(migratedMigrations);
  } catch (error) {
    return controller.onErrorHandler(error);
  }
}

export async function GET() {
  try {
    return Response.json(await migrations("GET"));
  } catch (error) {
    return controller.onErrorHandler(error);
  }
}

export async function PUT() {
  return controller.onNoMatchHandler();
}

export async function PATCH() {
  return controller.onNoMatchHandler();
}

export async function DELETE() {
  return controller.onNoMatchHandler();
}

export async function HEAD() {
  return controller.onNoMatchHandler();
}

export async function OPTIONS() {
  return controller.onNoMatchHandler();
}
