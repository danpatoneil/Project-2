const router = require("express").Router();
const { User, Friend } = require("../../models");
const withAuth = require('../../utils/auth');

//returns a list of user objects that consist of the user's id, username, and email
// need to figure out how to only have it return id's of users that are friends with a logged in user
router.get("/:id", async (req, res) => {
  try {
    const friendList = await User.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: "friends",
          attributes: ["id", "username", "email"],
        },
      ],
    });
    const friends = friendList.friends.map((user) => {
      const { id, username, email } = user.dataValues;
      return { id, username, email };
    });
    // console.log(friends)
    res.status(200).json(friends);
  } catch (error) {
    return res.status(400).json(error);
  }
});

//returns a list of users whose email or username match the given input
router.get("/find/:input", async (req, res) => {
  try {
    if (req.params.input) {
      const listEmail = await User.findAll({
        attributes: { exclude: "password" },
        where: {
          email: req.params.input,
        },
      });
      const listUsername = await User.findAll({
        attributes: { exclude: "password" },
        where: {
          username: req.params.input,
        },
      });
      const totalList = listEmail.concat(listUsername);
      if (totalList.length == 0) {
        return res
          .status(404)
          .json({ message: "No user with that username or email found" });
      }
      return res.status(200).json(totalList);
    }
  } catch (error) {
    // console.log('something went wrong')
    return res.status(400).json(error);
  }
});

router.post('/:id', async (req, res) => {
    const currentUser = {user_id: 6, logged_in: true};
  try {
    // console.log(req.body)
    const newFriend = await Friend.create({
      friend_id: req.params.id,
      user_id: currentUser.user_id,
    });
    await Friend.create({
      user_id: req.params.id,
      friend_id: currentUser.user_id,
    });

    return res.status(200).json(newFriend);
  } catch (err) {
    return res.status(400).json(err);
  }
});

// router.delete('/:id', withAuth, async (req, res) => {
router.delete('/:id', async (req, res) => {
    const currentUser = {user_id: 6, logged_in: true};
  try {
    const friendData = await Friend.destroy({
      where: {
        friend_id: req.params.id,
        user_id: currentUser.user_id,
      },
    });
    const friendDataInverse = await Friend.destroy({
      where: {
        user_id: req.params.id,
        friend_id: currentUser.user_id,
      },
    });

    if (!friendData&&!friendDataInverse) {
      res.status(404).json({ message: 'You are not friends with this user' });
      return;
    }

    res.status(200).json(friendData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
