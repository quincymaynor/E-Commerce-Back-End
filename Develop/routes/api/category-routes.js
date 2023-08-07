const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// get all category data
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    })
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
  });

  // get category data by id
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that id' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create new category
router.post('/', (req, res) => {
  Category.create(req.body)
  .then((newCategory) => {
    res.json(newCategory);
  })
  .catch((err) => {
    res.json(err);
  });
});

// update category by id
router.put('/:id', async (req, res) => {
  try{
    const updatedCategory = await Category.update(
      req.body,
      {
        where: {
          category_id: req.params.id,
        },
      }
    )
      // .then((updatedCategory) => {
      //   res.json(updatedCategory);
      // })
      if (!updatedCategory[0]){
        res.status(404).json({message: "No category found with that id"})
      }
      res.status(200).json(updatedCategory)  
  } catch(err) {
      console.log(err);
      res.json(err);
    };
});

// delete category by id
router.delete('/:id', async  (req, res) => {
    try {
      const categoryData = await Category.destroy({
        where: {
          category_id: req.params.id,
        },
      });
  
      if (!categoryData) {
        res.status(404).json({ message: 'No category found with that id' });
        return;
      }
  
      res.status(200).json(categoryData);
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router;
