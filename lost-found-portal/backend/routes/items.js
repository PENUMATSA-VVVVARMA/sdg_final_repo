const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
  getItemStats,
  searchItems
} = require('../controllers/itemController');

// Validation middleware
const validateItem = [
  body('itemName')
    .trim()
    .notEmpty()
    .withMessage('Item name is required')
    .isLength({ max: 100 })
    .withMessage('Item name cannot exceed 100 characters'),
  
  body('type')
    .notEmpty()
    .withMessage('Type is required')
    .isIn(['lost', 'found'])
    .withMessage('Type must be either lost or found'),
  
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters'),
  
  body('location')
    .trim()
    .notEmpty()
    .withMessage('Location is required')
    .isLength({ max: 100 })
    .withMessage('Location cannot exceed 100 characters'),
  
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Contact name is required')
    .isLength({ max: 50 })
    .withMessage('Name cannot exceed 50 characters'),
  
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please enter a valid email')
    .normalizeEmail(),
  
  body('phone')
    .trim()
    .notEmpty()
    .withMessage('Phone number is required')
    .matches(/^[\d\s\-\+\(\)]+$/)
    .withMessage('Please enter a valid phone number'),
  
  body('date')
    .optional()
    .isISO8601()
    .withMessage('Please enter a valid date'),
  
  body('category')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('Category cannot exceed 50 characters'),
  
  body('status')
    .optional()
    .isIn(['active', 'resolved', 'expired'])
    .withMessage('Status must be active, resolved, or expired'),
  
  body('images')
    .optional()
    .isArray()
    .withMessage('Images must be an array'),
  
  body('images.*')
    .optional()
    .isURL()
    .withMessage('Each image must be a valid URL'),
  
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array'),
  
  body('tags.*')
    .optional()
    .trim()
    .isLength({ max: 30 })
    .withMessage('Each tag cannot exceed 30 characters')
];

// Routes

// GET /api/items/stats - Get statistics (must be before /:id route)
router.get('/stats', getItemStats);

// GET /api/items/search - Search items (must be before /:id route)
router.get('/search', searchItems);

// GET /api/items - Get all items with optional filtering and pagination
router.get('/', getAllItems);

// GET /api/items/:id - Get single item
router.get('/:id', getItemById);

// POST /api/items - Create new item
router.post('/', validateItem, createItem);

// PUT /api/items/:id - Update item
router.put('/:id', validateItem, updateItem);

// DELETE /api/items/:id - Delete item
router.delete('/:id', deleteItem);

module.exports = router;