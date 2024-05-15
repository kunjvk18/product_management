const Product = require('../models/Product');
const User = require('../models/User');

// Create a new product
const createProduct = async (data) => {
  try {
    if (data.assignedTo) delete data.assignedTo;

    const product = new Product(data);
    await product.save();
    return product;
  } catch (error) {
    console.log(error)
    throw new Error('Error creating product');
  }
};

// Update an existing product
const updateProduct = async (productId, data) => {
  try {
    if (data.assignedTo) delete data.assignedTo;
    const product = await Product.findByIdAndUpdate(productId, data, { new: true });
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  } catch (error) {
    throw new Error('Error updating product');
  }
};

// Delete an existing product
const deleteProduct = async (productId) => {
  try {
    const product = await Product.findByIdAndDelete(productId);
    if (!product) {
      throw new Error('Product not found');
    }
    await removeProductAssignment(productId)
  } catch (error) {
    throw new Error('Error deleting product');
  }
};

// Get all products
const getAllProducts = async (role, userId) => {
  try {
    let filter = {};

    // If user is not admin, filter products by assignedTo userId
    if (!role.includes("admin")) {
      filter = { assignedTo: { $in: [userId] } };
    }

    const products = await Product.find(filter);
    return products;
  } catch (error) {
    throw new Error('Error fetching products');
  }
};

// Get product by ID
const getProductById = async (productId) => {
  try {
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  } catch (error) {
    throw new Error('Error fetching product');
  }
};

const assignProductToUsers = async (productId, userIds) => {
  try {
    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error('Product not found');
    }

    await removeProductAssignment(productId);

    // Iterate through each user
    for (const userId of userIds) {
      const user = await User.findById(userId);
      if (!user) {
          throw new Error('User not found');
      }

      // Check if the product is already assigned to the user
      if (!user.assignedProducts.includes(productId)) {
          // Assign the product to the user
          user.assignedProducts.push(productId);
          await user.save();
      }
  }
    // Update the product to store the assigned users
    product.assignedTo = userIds;
    await product.save();

    return product;
  } catch (error) {
    throw new Error('Error assigning product');
  }
};

const removeProductAssignment = async (productId) => {
  try {
    const users = await User.find({
      assignedProducts: {
        $in: [productId]
      }
    });

    // Remove the productId from the assignedProducts array of each user
    for (const user of users) {
      user.assignedProducts.pull(productId);
      await user.save();
    }

    return users;
  } catch (error) {
    throw new Error('Error removing product assignment');
  }
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  assignProductToUsers,
  removeProductAssignment
};
