const router = require('express').Router();
const { Comment } = require('../../models');
  
router.get('/:postId', async (req, res) => {
    try {
      const foundComments = await Comment.findAll({ where: { post_id: req.params.postId } });
      return res.json(foundComments)
    } catch (error) {
      return res.status(500).json({message: 'Error getting comments'})
    }
});

// create new comment
router.post('/', async (req, res) => {
  const {post_id, body} = req.body
  const user_id = req.session.user_id
  
  if(!user_id || !post_id || !body ) {
    return res.status(400).send({message: 'user_id, post_id, and body can not be null'})
  }

  if(typeof post_id !== 'string' || typeof body !== 'string' ) {
    return res.status(400).send({message: 'post_id and body must be strings'})
  }
  try {
    const createdComment = await Comment.create({user_id, post_id, body});
    return res.json(createdComment)
  } catch (error) {
    return res.status(500).json({message: 'Error creating Comment'})
  }
});

router.delete('/:id', async (req, res) => {
    // delete a comment by its `id` 
    const commentId = req.params.id
  
    const deletedComment = await Comment.destroy(
      {
        where: {
          id: commentId
        },
      }
    );
    return res.json(deletedComment)
  });


module.exports = router;
