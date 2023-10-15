const express = require('express');
const {
  getArticles,
  getArticle,
  createArticle,
  deleteArticle,
  updateArticle,
} = require('../controllers/articleController');
const requireAuth = require('../middleware/requireAuth')

const router = express.Router();

// require auth for all article routes
router.use(requireAuth)

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
