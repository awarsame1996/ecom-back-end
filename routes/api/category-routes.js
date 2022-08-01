const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
	try {
		const categoriesData = await Category.findAll({
			// JOIN with products
			include: [{ model: Product }],
		});
		res.status(200).json(categoriesData);
	} catch (err) {
		//console log error if status = 500
		res.status(500).json(err);
	}
});

router.get('/:id', async (req, res) => {
	// find one category by its `id` value
	// be sure to include its associated Products
	try {
		const CategoryData = await Category.findByPk(req.params.id, {
			include: [{ model: Product }],
		});
		if (!CategoryData) {
			res
				.status(404)
				.json({ message: 'product does not exist with this id' });
			return;
		}
		res.status(200).json(CategoryData);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.post('/', async (req, res) => {
	// create a new category
	/* req.body should look like this...
    {
      category_name: "pants",
    }
	 
  */
	// create a new category
	try {
		const data = await Category.create(req.body);
		res.status(200).json(data);
	} catch (err) {
		res.status(400).json({ message: 'unable to create category' });
	}
});

router.put('/:id', async (req, res) => {
	// update a category by its `id` value
	try {
		await Category.update(req.body, {
			where: {
				id: req.params.id,
			},
		});
		res.status(200).json({ success: true });
	} catch (err) {
		res.status(400).json({ message: 'unable to update category' });
	}
});

router.delete('/:id', async (req, res) => {
	// delete a category by its `id` value
	try {
		const data = await Category.destroy({
			where: {
				id: req.params.id,
			},
		});

		if (!data) {
			res
				.status(404)
				.json({ message: 'category does not exist with this id' });
			return;
		}

		res.status(200).json({ success: true });
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
