import allowedOrigins from './allowedOrigins';

export const websocketConfig = {
  cors: {
    origin: {
      origin: allowedOrigins,
      methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
      credentials: true,
    },
  },
  port: 3500,
};
