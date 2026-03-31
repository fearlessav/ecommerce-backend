const express = require('express');
const router = express.Router();

// Mock database for demonstration
let products = [];  

// GET endpoint to retrieve all products
router.get('/', (req, res) => {
    res.json(products);
});

// POST endpoint to create a new product
router.post('/', (req, res) => {
    const newProduct = req.body;
    products.push(newProduct);
    res.status(201).json(newProduct);
});

// PUT endpoint to update a product
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const updatedProduct = req.body;
    products = products.map(product => product.id === id ? updatedProduct : product);
    res.json(updatedProduct);
});

// DELETE endpoint to remove a product
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    products = products.filter(product => product.id !== id);
    res.status(204).send();
});

module.exports = router;