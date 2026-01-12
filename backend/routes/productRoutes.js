const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET /products - Get products with pagination and search

router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const search = req.query.search || '';

    const query = search 
      ? { $or: [{ name: new RegExp(search, 'i') }, { sku: new RegExp(search, 'i') }] }
      : {};

    const products = await Product.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Product.countDocuments(query);

    res.json({
      products,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      totalItems: total
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /products/stats - Get KPIs
router.get('/stats', async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const inStockItems = await Product.countDocuments({ quantity: { $gt: 0 } });
    const outOfStockItems = await Product.countDocuments({ quantity: 0 });
    const lowStockItems = await Product.countDocuments({ quantity: { $gt: 0, $lt: 5 } });

    res.json({
      totalProducts,
      inStockItems,
      outOfStockItems,
      lowStockItems
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /products/:id - Get single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /products - Add product
router.post('/', async (req, res) => {
  const product = new Product(req.body);
  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /products/:id - Update product
router.put('/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /products/:id - Delete product
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/test',(req,res)=>{

  res.send("<h1>im okay</h1>");
})

module.exports = router;
