const productService = require('../services/productService');

const createProduct = async (req, res) => {
  try {
    const productData = req.body;
    let userIds = [];
    if (productData.assignedTo) {
      userIds = productData.assignedTo.split(',');
    }
    // Validate input data
    if (!productData.name || !productData.sku ||
      !productData.description || !productData.category) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    productData.source = req.user.role === 'admin' ? 'ADMIN' : 'USER';
    productData.logo = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;


    const newProduct = await productService.createProduct(productData);
    if (userIds && userIds.length > 0)
      await productService.assignProductToUsers(newProduct._id, userIds);

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const role = req.user.role === 'admin' ? 'ADMIN' : 'USER';
    const userId = req.user.userId;
    const products = await productService.getAllProducts(role, userId);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedProductData = req.body;
    let userIds = [];
    if (updatedProductData.assignedTo) {
      userIds = updatedProductData.assignedTo.split(',');
    }

    if (req.file) {
      updatedProductData.logo = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    }

    const updatedProduct = await productService.updateProduct(productId, updatedProductData);
    if (userIds && userIds.length > 0)
      await productService.assignProductToUsers(updatedProduct._id, userIds);
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    await productService.deleteProduct(productId);
    res.status(200).json({ productId });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct
};