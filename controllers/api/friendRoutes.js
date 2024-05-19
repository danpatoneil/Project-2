const router = require("express").Router();
const { User, Friend } = require("../../models");
const { findByPk } = require("../../models/User");
const withAuth = require('../../utils/auth');

//returns a list of users without passwords that are friends with the logged in user
router.get("/", withAuth, async (req, res) => {
    const currentSession = { user_id: 6, logged_in: true };
    //const currentSession = req.session;
  try {
    const user = await User.findByPk(currentSession.user_id)
    const friends = await user.getFriends({attributes:{exclude: 'password'}});
    res.status(200).json(friends);
  } catch (error) {
    return res.status(400).json(error);
  }
});

//returns a list of users whose email or username match the given input
router.get("/:input", withAuth, async (req, res) => {
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

// add user id to logged in user's friends list
router.post('/:id', withAuth, async (req, res) => {
    const currentUser = {user_id: 6, logged_in: true};
  try {
    //check if user is their own friend, or if the id is already on their friends list
    if(currentUser.user_id==req.params.id) return res.status(400).json({message:"You cannot be friends with yourself"});
    const user = await User.findByPk(currentUser.user_id);
    const friends = await user.getFriends()
    const friendIDs = await friends.map(user=> user.dataValues.id)
    if(friendIDs.includes(parseInt(req.params.id))) return res.status(400).json({message:"You are already friends with this user"});
    const friend = await User.findByPk(req.params.id,{
        attributes: {exclude: 'password'}
    });
    await friend.addFriend(user.dataValues.id);
    await user.addFriend(req.params.id)
    return res.status(200).json(friend);
  } catch (err) {
    return res.status(400).json({message: "We seem to have run into some kind of error. Try resubmitting this with the ID number of a user who is not the logged in user and who is not yet friends with them."});
  }
});

// router.delete('/:id', withAuth, async (req, res) => {
router.delete('/:id', withAuth, async (req, res) => {
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
