const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// ========================
// CRUD OPERATIONS
// The `/api/tags` endpoint
// ========================

// GET all tags
router.get('/', (req, res) => {
  // find all tags
  Tag.findAll({
    // be sure to include its associated Product data
    include: [
      {
        model: Product,
        attributes: ['id' , 'product_name' , 'price' , 'stock' , 'category_id']
      }
    ]
  })
  // Promise that captures the response from the db call
  .then(dbAllTagData => res.json(dbAllTagData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// GET single tag
router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  Tag.findOne({
    where: {
      id: req.params.id
    },
    // be sure to include its associated Product data
    include: [
      {
        model: Product,
        attributes: ['id' , 'product_name' , 'price' , 'stock' , 'category_id']
      }
    ]
  })
  .then(dbSingleTagData => {
    if (!dbSingleTagData) {
      res.status(400).json({ message: 'No tag found with this id.' });
      return;
    }
    res.json(dbSingleTagData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  // create a new tag
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
