const router = require("express").Router();
const { Friend, User } = require("../../models");
// const withAuth = require('../../utils/auth');

router.get("/:id", async (req, res) => {
  try {
    const friendList = await User.findByPk(req.params.id, {
      include: [{ model: User, as: "friends" }],
    });
    const friendIDs = friendList.friends.map((user) => user.dataValues.id);
    res.status(200).json(friendIDs);
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.get('/find/:input', async (req, res) => {
    //pulled from emailregex.com
    // const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // try {
    //     // console.log(req.params);
    //     if(req.params.input){
    //         if(emailRegex.test(req.params.input)){

    //         }
    //         else{

    //         }
    //     }
    //     res.status(200).json();
    // } catch (error) {
    //     return res.status(400).json(error);
    // }
})

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
