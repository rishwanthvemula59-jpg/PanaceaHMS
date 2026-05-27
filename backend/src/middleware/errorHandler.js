/**
 * Centralized global error handling middleware for Express
 */
export function errorHandler(err, req, res, next) {
  console.error('Unhandled Server Error:', {
    message: err.message,
    stack: err.stack,
    path: req.originalUrl,
    method: req.method
  });

  const statusCode = err.status || err.statusCode || 500;
  const message = err.message || 'An unexpected error occurred on the server.';

  res.status(statusCode).json({
    success: false,
    message: process.env.NODE_ENV === 'production' && statusCode === 500
      ? 'Internal Server Error'
      : message
  });
}
