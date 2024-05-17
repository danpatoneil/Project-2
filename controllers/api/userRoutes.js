const router = require('express').Router();
const { User, GameUser, Controller, ConsoleUser } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/:id', async (req, res) => {
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

router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll({
            attributes: {
                exclude: "password"
            }
        })
        // console.log(userData);
        res.status(200).json(userData);
    } catch (error) {
            res.status(400).json(error);
    }
});


// add user delete route if time allows
// router.delete('/')

//add user change route for parameters
// router.put('/', withAuth, async (req, res) => {})

router.post('/', async (req, res) => {
    // req.session.user_id = 6;
    // req.session.logged_in = true;
  try {
    const userData = await User.create(req.body);

    // req.session.save(() => {
    //   req.session.user_id = userData.id;
    //   req.session.logged_in = true;

      res.status(200).json(userData);
    // });
  } catch (err) {
    res.status(400).json(err);
  }
  try {

  } catch (error) {
    res.status(400).json(error);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'error 1' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // req.session.save(() => {
    //   req.session.user_id = userData.id;
    //   req.session.logged_in = true;

      res.json({ user: {id:userData.id, username:userData.username}, message: 'You are now logged in!' });
    // });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', withAuth, (req, res) => {
    const currentUser = {user_id: 6, logged_in: true};
    // const currentUser = req.session;
    if (currentUser.logged_in) {
        // if (1==1) {
    // req.session.destroy(() => {
      res.status(204).end();
    // });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
