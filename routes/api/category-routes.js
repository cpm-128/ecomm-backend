const router = require('express').Router();
const { Category, Product } = require('../../models');

// ==============================
// CRUD OPERATIONS
// The `/api/categories` endpoint
// ==============================

// GET all categories
router.get('/', (req, res) => {
  // find all categories
  Category.findAll({
    // be sure to include its associated Products
    include: [
      {
        model: Product,
        attributes: ['id' , 'product_name' , 'price' , 'stock' , 'category_id']
      }
    ]
  })
  // Promise that captures the response from the db call
  .then(dbAllCategoryData => res.json(dbAllCategoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
