const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categoriesData = await Category.findAll({
      // JOIN with products     
      include: [ {model: Product} ]
    })
    res.status(200).json(categoriesData);

  } catch (err) {
    //console log error if status = 500
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const CategoryData = await Category.findByPk(req.params.id, {
      include: [ {model: Product}]
    })
    if(!CategoryData){ 
      res
          .status(404)
          .json({message: 'product does not exist with this id'})
      return;
    }
    res.status(200).json(CategoryData);
  }catch (err) { 
    res.status(500).json(err)
  }
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
