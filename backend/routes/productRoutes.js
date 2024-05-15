const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middlewares/auth');
const upload = require('../utils/fileUpload');

// Product routes
router.post('/', authMiddleware.isAuthenticated,upload.single('image'), productController.createProduct);
router.get('/', authMiddleware.isAuthenticated, productController.getAllProducts);
router.put('/:id', authMiddleware.isAdmin ,upload.single('image'), productController.updateProduct);
router.delete('/:id', authMiddleware.isAdmin, productController.deleteProduct);

module.exports = router;