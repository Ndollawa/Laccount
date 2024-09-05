import { HttpException, HttpStatus } from '@nestjs/common';

// Mapping of custom error codes to HTTP status codes
const errorCodeToHttpStatus: { [key: string]: HttpStatus } = {
  'P2002': HttpStatus.CONFLICT, // Prisma unique constraint violation
  'P2003': HttpStatus.FORBIDDEN, // Prisma foreign key constraint violation
  'P2025': HttpStatus.NOT_FOUND, // Prisma record not found
  '400': HttpStatus.BAD_REQUEST, // Bad request
  '401': HttpStatus.UNAUTHORIZED, // Unauthorized
  '403': HttpStatus.FORBIDDEN, // Forbidden
  '404': HttpStatus.NOT_FOUND, // Not found
  '409': HttpStatus.CONFLICT, // Conflict
  '422': HttpStatus.UNPROCESSABLE_ENTITY, // Unprocessable entity
  '500': HttpStatus.INTERNAL_SERVER_ERROR, // Internal server error
};

export const handleError = (error: any) => {
  const statusCode = errorCodeToHttpStatus[error.code] || HttpStatus.INTERNAL_SERVER_ERROR;
  throw new HttpException(
    {
      statusCode,
      message: error.message || 'An unexpected error occurred',
    },
    statusCode,
  );
};
