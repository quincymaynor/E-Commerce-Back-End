const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// get all tag data
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }, { model: ProductTag }],
    })
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get tag data by id
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk((req.params.id), {
      include: [{ model: Product }, { model: ProductTag }],
    })
    if(!tagData){
      res.status(404).json({message: "No tag found with this id"})
      return
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create new tag
router.post('/', (req, res) => {
  Tag.create(req.body)
  .then((newTag) => {
    res.json(newTag);
  })
  .catch((err) => {
    res.json(err);
  });
});

// update a tag by id
router.put('/:id', async (req, res) => {
  try{
    const updatedTag = await Tag.update(
      req.body,
      {
        where: {
          tag_id: req.params.id,
        },
      }
    )
      // .then((updatedCategory) => {
      //   res.json(updatedCategory);
      // })
      if (!updatedTag[0]){
        res.status(404).json({message: "No tag found with that id"})
      }
      res.status(200).json(updatedTag)  
  } catch(err) {
      console.log(err);
      res.json(err);
    };

  // Tag.update(
  //   {
  //     tag_name: req.body.tag_name,
  //   },
  //   {
  //     where: {
  //       tag_id: req.params.tag_id,
  //     },
  //   }
  // )
  //   .then((updatedTag) => {
  //     res.json(updatedTag);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     res.json(err);
  //   });
});

// delete a tag by id
router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with that id' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
