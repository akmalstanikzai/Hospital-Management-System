const express = require('express');
const {
  getArticles,
  getArticle,
  createArticle,
  deleteArticle,
  updateArticle,
} = require('../controllers/articleController');

const router = express.Router();

// GET all articles
router.get('/', getArticles);

// GET a single article
router.get('/:id', getArticle);

// POST a new article
router.post('/', createArticle);

// DELETE an article
router.delete('/:id', deleteArticle);

// UPDATE an article
router.patch('/:id', updateArticle);

module.exports = router;
