const router = require('express').Router();
const { User } = require('../../models');
const withAuth = require('../../utils/auth');

//
router.get('/:id', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.params.id, {
            attributes: {
                exclude: "password"
            }
        })
        // console.log(userData.dataValues);
        res.status(200).json(userData.dataValues);
    } catch (error) {
            res.status(400).json(error);
    }
});
// New User Signup Route
router.post("/signup", async (req, res) => {
  try {
    const dbNewUserData = new User();
    dbNewUserData.username = req.body.username;
    dbNewUserData.email = req.body.email;
    dbNewUserData.password = req.body.password;

// add a new user
router.post('/signup/', async (req, res) => {
    console.log('users/signup called')
  try {
    const userData = await User.create(req.body);
    console.log(req.body);
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json({id:userData.dataValues.id, username:userData.dataValues.username, email:userData.dataValues.email});
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { username: req.body.username } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = userData.checkPassword(req.body.password);
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: {id:userData.id, username:userData.username}, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', withAuth, (req, res) => {
    if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
