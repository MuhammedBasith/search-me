/**
 * Format success response
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Success message
 * @param {object} data - Response data
 * @returns {object} - Formatted response object
 */
const success = (statusCode = 200, message = 'Success', data = {}) => {
  return {
    status: 'success',
    statusCode,
    message,
    data,
  };
};

/**
 * Format error response
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Error message
 * @param {object} errors - Detailed errors
 * @returns {object} - Formatted error object
 */
const error = (statusCode = 500, message = 'Error', errors = null) => {
  return {
    status: 'error',
    statusCode,
    message,
    errors,
  };
};

export { success, error }; 