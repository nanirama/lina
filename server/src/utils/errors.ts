/**
 * Error types used by express controllers. Maps errors to their idiomatic HTTP codes.
 *
 */
export class GeneralError extends Error {
  constructor(message: string) {
    super();
    this.message = message;
  }

  /**
   *
   * @returns HTTP status code corresponding to error
   */
  getCode() {
    if (this instanceof BadRequestError) {
      return 400;
    }
    if (this instanceof UnauthorizedError) {
      return 401;
    }
    if (this instanceof ForbiddenError) {
      return 403;
    }
    if (this instanceof NotFoundError) {
      return 404;
    }
    if (this instanceof UserExistsError) {
      return 409;
    }
    return 500;
  }
}

export class BadRequestError extends GeneralError { }
export class UnauthorizedError extends GeneralError { }
export class ForbiddenError extends GeneralError { }
export class NotFoundError extends GeneralError { }
export class UserExistsError extends GeneralError { }
