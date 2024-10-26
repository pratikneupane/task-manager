class HttpError extends Error {
  public statusCode: number;
  public errors?: any;

  constructor(statusCode: number, message: string, errors?: any) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    Object.setPrototypeOf(this, HttpError.prototype);
  }
}

const createHttpError = {
  BadRequest: (message: string = "Bad Request", errors?: any) =>
    new HttpError(400, message, errors),

  Unauthorized: (message: string = "Unauthorized", errors?: any) =>
    new HttpError(401, message, errors),

  Forbidden: (message: string = "Forbidden", errors?: any) =>
    new HttpError(403, message, errors),

  NotFound: (message: string = "Not Found", errors?: any) =>
    new HttpError(404, message, errors),

  Conflict: (message: string = "Conflict", errors?: any) =>
    new HttpError(409, message, errors),

  InternalServerError: (
    message: string = "Internal Server Error",
    errors?: any
  ) => new HttpError(500, message, errors),

  Custom: (statusCode: number, message: string, errors?: any) =>
    new HttpError(statusCode, message, errors),
};

export default createHttpError;
