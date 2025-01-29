export type Status = {
  updated_at: string;
  dependencies: {
    database: {
      version: string;
      max_connections: number;
      opened_connections: number;
    };
  };
};

export interface ErrorInterface {
  cause: unknown;
  message?: string;
  statusCode?: number;
}
