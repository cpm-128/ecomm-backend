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

// POST tag
router.post('/', (req, res) => {
  /* req.body should look like this...
    {
      tag_name: "rock music",
    }
  */
 Tag.create(req.body)
 .then(dbCreateTagData => res.json(dbCreateTagData))
 .catch(err => {
  console.log(err);
  res.status(500).json(err);
 });
});

// PUT a tag name by id
router.put('/:id', (req, res) => {
  /* req.body should look like this...
    {
      tag_name: "rock music",
    }
  */
  Tag.update(req.body , {
    where: {
      id: req.params.id
    }
  })
  .then(dbUpdateSingleTag => {
    if (!dbUpdateSingleTag) {
      res.status(404).json({ message: 'No tag found with this id.' });
      return;
    }
    res.json(dbUpdateSingleTag);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// DELETE a single tag
router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbDeleteSingleTag => {
    if (!dbDeleteSingleTag) {
      res.status(404).json({ message: 'No tag found with this id.' });
      return;
    }
    res.json(dbDeleteSingleTag);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
