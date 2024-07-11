const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware.js'); // Import your authentication middleware
const Visitor = require('../models/visitor');

// POST a new visitor (protected route)
router.post('/', async (req, res) => {
  const visitor = new Visitor(req.body);
  try {
    await visitor.save();
    res.status(201).send(visitor);
  } catch (error) {
    res.status(400).send(error);
  }
});

// GET all visitors (protected route)
router.get('/', async (req, res) => {
  try {
    const visitors = await Visitor.find();
    res.status(200).send(visitors);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

module.exports = router;
