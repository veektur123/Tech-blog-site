const router = require('express').Router();
const { User } = require('../../models');

router.post('/login', async (req, res) => {
  try {
    // Find the user who matches the posted e-mail address
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // Verify the posted password with the password store in the database
    const validPassword = userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // Create session variables based on the logged in user
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    // Remove the session variables
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    return res.json(users)
  } catch (error) {
    return res.status(500).json({message: 'Error getting users'})
  }
});

router.get('/:id', async (req, res) => {
  try {
    const foundUser = await User.findOne({ where: { id: req.params.id } });
    return res.json(foundUser)
  } catch (error) {
    return res.status(500).json({message: 'Error getting user'})
  }
});

// create new user
router.post('/', async (req, res) => {
  const {name, email, password} = req.body
  
  if(!name || !email || !password ) {
    return res.status(400).send({message: 'name, email, and password can not be null'})
  }

  if(typeof name !== 'string' || typeof email !== 'string' || typeof password !== 'string' ) {
    return res.status(400).send({message: 'name, email, and password must be strings'})
  }
  try {
    const createdUser = await User.create({name, email, password});
    return res.json(createdUser)
  } catch (error) {
    return res.status(500).json({message: 'Error creating user'})
  }
});


module.exports = router;
