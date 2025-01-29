import { InternalServerError, MethodNotAllowedError } from "./errors";

const controller = {
  onNoMatchHandler: () => {
    const publicErrorObject = new MethodNotAllowedError();
    return Response.json(publicErrorObject, {
      status: publicErrorObject.statusCode,
    });
  },
  onErrorHandler: (error: unknown, statusCode?: number) => {
    const publicErrorObject = new InternalServerError({
      cause: error,
      statusCode,
    });

    console.error(publicErrorObject);

    return Response.json(publicErrorObject, {
      status: publicErrorObject.statusCode,
    });
  },
};

export default controller;
