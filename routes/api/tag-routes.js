const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');
// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
     console.log(`\n Getting all Tag data \n`)

      const tagData = await Tag.findAll({
        include: [{model: Product, through: ProductTag, as: 'tagged-products'}] 
      })
      res.status(200).json(tagData);

    } catch (err) {
      res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
     console.log(`\n Getting data with id: ${req.params.id} \n`)

      const tagData = await Tag.findByPk(req.params.id, {
        //JOIN with Product
        include: [{ model: Product, through: ProductTag, as: 'tagged-products'}]
      })

    //if wrong tag id is entered
    if (!tagData) {
      res.status(404).json({message: 'No tags found with this id!'});
    } else {
      res.status(200).json(tagData);
    }

  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    console.log(`\n Adding new tag: ${req.body.tag_name} \n`)
    const tagData = await Tag.create(req.body);

    res.status(200).json(tagData);

  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try{
    const tagData = await Tag.update(
      { tag_name: req.body.tag_name},
       { returning: true, where:{ id: req.params.id} }
    )
    res.status(200).json(tagData)
    } catch (err) {
      res.status(500).json(err);
    }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  }).then(tagData => {
      if (!tagData) {
        res.status(404).json({ message: 'No Tag found by that ID.' });
        return;
      }
      res.json(tagData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
