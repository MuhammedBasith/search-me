import { error as formatError } from '../utils/responseFormatter.js';

/**
 * Global error handling middleware
 */
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err.message);
  
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  
  // Format the error response
  const errorResponse = formatError(statusCode, message, err.errors || null);
  
  // Send the response
  res.status(statusCode).json(errorResponse);
};

export default errorHandler; 