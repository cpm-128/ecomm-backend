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

// GET single category
router.get('/:id', (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id
    },
  // be sure to include its associated Products
  include: [
    {
      model: Product,
      attributes: ['id' , 'product_name' , 'price' , 'stock' , 'category_id']
    }
  ]
  })
  .then(dbSingleCategoryData => {
    if (!dbSingleCategoryData) {
      res.status(400).json({ message: 'No category found with this id.' });
      return;
    }
    res.json(dbSingleCategoryData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// POST new category
router.post('/', (req, res) => {
  /* req.body should look like this...
    {
      category_name: "Bicycles"
    }
  */
  Category.create(req.body)
  .then(dbCreateCategoryData => res.json(dbCreateCategoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// PUT a category name by id
router.put('/:id', (req, res) => {
  /* req.body should look like this...
    {
      category_name: "Tricycles"
    }
  */
  Category.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then(dbUpdateSingleCategroy => {
    if (!dbUpdateSingleCategroy) {
      res.status(404).json({ message: 'No category found with this id.' });
      return;
    }
    res.json(dbUpdateSingleCategroy);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// DELETE a single category by id
router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbDeleteSingleCategory => {
    if (!dbDeleteSingleCategory) {
      res.status(404).json({ message: 'No category found with this id.' });
      return;
    }
    res.json(dbDeleteSingleCategory);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
