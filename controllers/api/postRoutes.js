const router = require('express').Router();
const { Post } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll();
    return res.json(posts)
  } catch (error) {
    return res.status(500).json({message: 'Error getting posts'})
  }
});

router.get('/:id', async (req, res) => {
  try {
    const foundPost = await Post.findOne({ where: { id: req.params.id } });
    return res.json(foundPost)
  } catch (error) {
    return res.status(500).json({message: 'Error getting post'})
  }
});

// create new post
router.post('/', async (req, res) => {
  const {title, description} = req.body
  const user_id = req.session.user_id
  
  if(!title || !description || !user_id ) {
    return res.status(400).send({message: 'title, description, and user_id can not be null'})
  }

  if(typeof title !== 'string' || typeof description !== 'string') {
    return res.status(400).send({message: 'title, description, and user_id must be strings'})
  }
  try {
    const createdPost = await Post.create({title, description, user_id});
    return res.json(createdPost)
  } catch (error) {
    return res.status(500).json({message: 'Error creating Post'})
  }
});

// update post
router.put('/:id', async (req, res) => {
    const {title, description} = req.body
  
    if(!title || !description ) {
      return res.status(400).send({message: 'title and description can not be null'})
    }
  
    if(typeof title !== 'string' || typeof description !== 'string' ) {
      return res.status(400).send({message: 'title and description must be strings'})
    }
    try {
        await Post.update(req.body, {
            where: {
                id: req.params.id,
            },
        })
        return res.json({message: 'Post successfully updated'})
    } catch (error) {
        return res.status(500).json({message: 'Error updating Post'})
    }
});

router.delete('/:id', async (req, res) => {
    // delete a post by its `id` 
    const postId = req.params.id
  
    const deletedPost = await Post.destroy(
      {
        where: {
          id: postId
        },
      }
    );
    return res.json(deletedPost)
  });


module.exports = router;
