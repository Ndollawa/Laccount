
type ErrorCode = {
  message: string;
  status: number;
  description?: string; // Optional description
};

export const errorCodes: Record<string, ErrorCode> = {
  "ERR_400": {
    message: "Bad Request",
    status: 400,
    description: "The server could not understand the request due to invalid syntax."
  },
  "ERR_401": {
    message: "Unauthorized",
    status: 401,
    description: "Authentication is required and has failed or has not yet been provided."
  },
  "ERR_403": {
    message: "Forbidden",
    status: 403,
    description: "You do not have permission to access the requested resource."
  },
  "ERR_404": {
    message: "Not Found",
    status: 404,
    description: "The requested resource could not be found on the server."
  },
  "ERR_500": {
    message: "Internal Server Error",
    status: 500,
    description: "The server has encountered a situation it doesn't know how to handle."
  },
  "ERR_502": {
    message: "Bad Gateway",
    status: 502,
    description: "The server was acting as a gateway and received an invalid response."
  },
  "ERR_503": {
    message: "Service Unavailable",
    status: 503,
    description: "The server is not ready to handle the request. Please try again later."
  },
  // Add more error codes as needed
};

