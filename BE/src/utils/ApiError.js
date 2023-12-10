const { StatusCodes, getReasonPhrase } = require('http-status-codes');

class ApiError extends Error {
  #status;

  constructor(
    status,
    message = getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)
  ) {
    super(message);
    this.#status = status;
  }

  static badRequest(message) {
    return new ApiError(StatusCodes.BAD_REQUEST, message);
  }

  static forbidden() {
    return new ApiError(StatusCodes.FORBIDDEN, getReasonPhrase(StatusCodes.FORBIDDEN));
  }
}

module.exports = { ApiError };
