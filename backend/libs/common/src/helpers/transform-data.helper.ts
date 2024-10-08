import { HttpException, HttpStatus } from '@nestjs/common';
import { Prisma } from '@prisma/client';

// import { RpcException } from '@nestjs/microservices';
// import { Timestamp } from 'google-protobuf/google/protobuf/timestamp_pb';

// Convert Google Protobuf Timestamp to JavaScript Date
// export function timestampToDate(timestamp: Timestamp): Date {
//   const milliseconds =
//     timestamp.getSeconds() * 1000 + timestamp.getNanos() / 1000000;
//   return new Date(milliseconds);
// }

// Convert JavaScript Date to Google Protobuf Timestamp
// export function dateToTimestamp(date: Date): Timestamp {
//   const timestamp = new Timestamp();
//   timestamp.setSeconds(Math.floor(date.getTime() / 1000));
//   timestamp.setNanos(date.getMilliseconds() * 1000000);
//   return timestamp;
// }

// export const transformDateToTimestamp = (object: any) => {
//   if (!object) return null;
//   const newObj = {
//     ...object,
//     createdAt:
//       object.createdAt instanceof Date
//         ? dateToTimestamp(object.createdAt)
//         : null,
//     updatedAt:
//       object.updatedAt instanceof Date
//         ? dateToTimestamp(object.updatedAt)
//         : null,
//   };
//   return newObj;
// };

// export const transformTimestampToDate = (object: any) => {
//   // Check if object is empty
//   if (!object) return null;
//   const newObj = {
//     ...object,
//     createdAt:
//       object.createdAt instanceof Date
//         ? timestampToDate(object.createdAt)
//         : null,
//     updatedAt:
//       object.updatedAt instanceof Date
//         ? timestampToDate(object.createdAt)
//         : null,
//   };
//   return newObj;
// };

export const handleError = (error: any) => {
  let statusCode = HttpStatus.INTERNAL_SERVER_ERROR; // Default status code

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      // Unique constraint failed
      case 'P2002':
        statusCode = HttpStatus.CONFLICT; // 409 Conflict
        break;

      // Record to update not found
      case 'P2025':
        statusCode = HttpStatus.NOT_FOUND; // 404 Not Found
        break;

      // Record already exists
      case 'P2001':
        statusCode = HttpStatus.NOT_FOUND; // 404 Not Found
        break;

      // Foreign key constraint failed
      case 'P2003':
        statusCode = HttpStatus.BAD_REQUEST; // 400 Bad Request
        break;

      // Value out of range for the type
      case 'P2004':
        statusCode = HttpStatus.BAD_REQUEST; // 400 Bad Request
        break;

      // Invalid constraint
      case 'P2005':
        statusCode = HttpStatus.BAD_REQUEST; // 400 Bad Request
        break;

      // Query does not return data
      case 'P2006':
        statusCode = HttpStatus.BAD_REQUEST; // 400 Bad Request
        break;

      // Query validation error
      case 'P2007':
        statusCode = HttpStatus.BAD_REQUEST; // 400 Bad Request
        break;

      // Record not found for the relation
      case 'P2008':
        statusCode = HttpStatus.NOT_FOUND; // 404 Not Found
        break;

      // Transaction failed
      case 'P2014':
        statusCode = HttpStatus.BAD_REQUEST; // 400 Bad Request
        break;

      // Missing required value
      case 'P2015':
        statusCode = HttpStatus.BAD_REQUEST; // 400 Bad Request
        break;

      // Too many nested operations
      case 'P2016':
        statusCode = HttpStatus.BAD_REQUEST; // 400 Bad Request
        break;

      // Field is not a valid scalar
      case 'P2021':
        statusCode = HttpStatus.BAD_REQUEST; // 400 Bad Request
        break;

      // Database connection error
      case 'P2022':
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR; // 500 Internal Server Error
        break;

      // Foreign key constraint failed
      case 'P2023':
        statusCode = HttpStatus.BAD_REQUEST; // 400 Bad Request
        break;

      // Constraint violation error
      case 'P2024':
        statusCode = HttpStatus.BAD_REQUEST; // 400 Bad Request
        break;

      // Timeout error
      case 'P2034':
        statusCode = HttpStatus.REQUEST_TIMEOUT; // 408 Request Timeout
        break;

      // Operation failed due to relation violations
      case 'P2036':
        statusCode = HttpStatus.BAD_REQUEST; // 400 Bad Request
        break;

      // Default for unknown codes
      default:
        statusCode = HttpStatus.BAD_REQUEST; // 400 Bad Request
        break;
    }
  } else if (error instanceof Prisma.PrismaClientInitializationError) {
    // Handle errors that occur during initialization
    statusCode = HttpStatus.INTERNAL_SERVER_ERROR; // 500 Internal Server Error
  } else if (error instanceof Prisma.PrismaClientRustPanicError) {
    // Handle cases where the Prisma engine panics
    statusCode = HttpStatus.INTERNAL_SERVER_ERROR; // 500 Internal Server Error
  } else if (error instanceof Prisma.PrismaClientUnknownRequestError) {
    // Handle unknown client request errors
    statusCode = HttpStatus.INTERNAL_SERVER_ERROR; // 500 Internal Server Error
  }

  throw new HttpException(
    error.message || 'An unexpected error occurred',
    statusCode,
  );
};

export const splitRt = (rt: string) => {
  const [refreshTokenId, refreshToken] = rt.split(' ');
  return { refreshTokenId, refreshToken };
};
