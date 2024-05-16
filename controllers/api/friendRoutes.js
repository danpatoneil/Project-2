const router = require("express").Router();
const { User } = require("../../models");
// const withAuth = require('../../utils/auth');

//returns a list of user objects that consist of the user's id, username, and email
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
    console.log('something went wrong')
    return res.status(400).json(error);
  }
});

// router.post('/', async (req, res) => {
//   try {
//     // const newProject = await Project.create({
//     //   ...req.body,
//     //   user_id: req.session.user_id,
//     // });

//     // res.status(200).json(newProject);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

// router.delete('/:id', withAuth, async (req, res) => {
//   try {
//     const projectData = await Project.destroy({
//       where: {
//         id: req.params.id,
//         user_id: req.session.user_id,
//       },
//     });

//     if (!projectData) {
//       res.status(404).json({ message: 'No project found with this id!' });
//       return;
//     }

//     res.status(200).json(projectData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
