const router = require('express').Router();
const { Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Prevent non logged in users from viewing the homepage
router.get('/', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll();

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('homepage', {
      posts,
      // Pass the logged in flag to the template
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({where: {user_id: req.session.user_id}});

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('dashboard', {
      posts,
      // Pass the logged in flag to the template
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
})

router.get('/create-post', withAuth, async (req, res) => {
  try {
    res.render('createpost');
  } catch (err) {
    res.status(500).json(err);
  }
})

router.get('/post/:postId', withAuth, async (req, res) => {
  try {
    const {postId} = req.params
    const response = await Post.findOne({where: {id: postId}})
    const post = response.get({plain: true})
    const commentResponse = await Comment.findAll({where: {post_id: postId}})
    const comments = commentResponse.map((comment) => comment.get({ plain: true }));
    res.render('commentpost', {post, comments});
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
})

module.exports = router;
