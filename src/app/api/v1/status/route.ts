import controller from "../../../../../infra/controller";
import database from "../../../../../infra/database";

export async function GET() {
  try {
    const updatedAt = new Date().toISOString();

    const databaseVersionResult = await database.query("SHOW server_version;");
    const databaseVersionValue = databaseVersionResult.rows[0].server_version;

    const databaseMaxConnectionsResult = await database.query(
      "SHOW max_connections;",
    );
    const databaseMaxConnectionsValue =
      databaseMaxConnectionsResult.rows[0].max_connections;

    const databaseName = process.env.POSTGRES_DB;
    const databaseOpenedConnectionsResult = await database.query({
      text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
      values: [databaseName],
    });
    const databaseOpenedConnectionsValue =
      databaseOpenedConnectionsResult.rows[0].count;

    return Response.json({
      updated_at: updatedAt,
      dependencies: {
        database: {
          version: databaseVersionValue,
          max_connections: parseInt(databaseMaxConnectionsValue),
          opened_connections: databaseOpenedConnectionsValue,
        },
      },
    });
  } catch (error) {
    return controller.onErrorHandler(error);
  }
}

export async function POST() {
  return controller.onNoMatchHandler();
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
