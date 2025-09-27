// Utility functions for the backend

// Date formatting utilities
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const formatDateTime = (date) => {
  return new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Time ago utility
const timeAgo = (date) => {
  const now = new Date();
  const diffTime = Math.abs(now - new Date(date));
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 1) {
    return 'Yesterday';
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  } else if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
  } else {
    const months = Math.floor(diffDays / 30);
    return `${months} month${months > 1 ? 's' : ''} ago`;
  }
};

// Validation utilities
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePhone = (phone) => {
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  return phoneRegex.test(phone) && phone.length >= 10;
};

// Sanitize input
const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  return input
    .trim()
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]+>/g, ''); // Remove HTML tags
};

// Generate unique filename
const generateUniqueFilename = (originalName) => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2);
  const extension = originalName.split('.').pop();
  return `${timestamp}-${random}.${extension}`;
};

// Generate QR code URL
const generateQRCodeURL = (itemId, frontendURL = 'http://localhost:3000') => {
  return `${frontendURL}/items/${itemId}`;
};

// Pagination helper
const getPaginationParams = (page = 1, limit = 20, maxLimit = 100) => {
  const pageNum = Math.max(1, parseInt(page));
  const limitNum = Math.min(maxLimit, Math.max(1, parseInt(limit)));
  const skip = (pageNum - 1) * limitNum;
  
  return {
    page: pageNum,
    limit: limitNum,
    skip
  };
};

// Build search query
const buildSearchQuery = (searchTerm, type, status = 'active') => {
  const query = { status };
  
  if (type && ['lost', 'found'].includes(type)) {
    query.type = type;
  }
  
  if (searchTerm && searchTerm.trim()) {
    query.$or = [
      { itemName: { $regex: searchTerm, $options: 'i' } },
      { description: { $regex: searchTerm, $options: 'i' } },
      { location: { $regex: searchTerm, $options: 'i' } },
      { name: { $regex: searchTerm, $options: 'i' } },
      { tags: { $in: [new RegExp(searchTerm, 'i')] } }
    ];
  }
  
  return query;
};

// Response formatter
const formatResponse = (success, message, data = null, error = null) => {
  const response = { success, message };
  
  if (data !== null) {
    response.data = data;
  }
  
  if (error && process.env.NODE_ENV === 'development') {
    response.error = error;
  }
  
  return response;
};

// Success response helper
const sendSuccess = (res, statusCode = 200, message = 'Success', data = null) => {
  return res.status(statusCode).json(formatResponse(true, message, data));
};

// Error response helper
const sendError = (res, statusCode = 500, message = 'Server Error', error = null) => {
  return res.status(statusCode).json(formatResponse(false, message, null, error));
};

// Async handler wrapper
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Log request middleware
const logRequest = (req, res, next) => {
  console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
  next();
};

module.exports = {
  formatDate,
  formatDateTime,
  timeAgo,
  validateEmail,
  validatePhone,
  sanitizeInput,
  generateUniqueFilename,
  generateQRCodeURL,
  getPaginationParams,
  buildSearchQuery,
  formatResponse,
  sendSuccess,
  sendError,
  asyncHandler,
  logRequest
};