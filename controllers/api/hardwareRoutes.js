const router = require('express').Router();
const { User, GameUser, Controller, ConsoleUser } = require('../../models');
const { findByPk } = require('../../models/User');
const withAuth = require('../../utils/auth');


router.get('/', async (req, res) => {
    const currentUser = {user_id: 6, logged_in: true};
    // const currentUser = req.session;
    try {
        // console.log('starting hardware req');
        const userData = await User.findByPk(currentUser.user_id, {
            attributes: { exclude: "password" },
            include: [{ model: Controller }, { model: ConsoleUser }, { model: GameUser }]
        })
        res.status(200).json(userData);
    } catch (error) {
        return res.status(400).json(error);
    }
});

//in future, clean this up so you can only view the hardware of your friends
router.get('/:id', async (req, res) => {
    const currentUser = {user_id: 6, logged_in: true};
    // const currentUser = req.session;
    try {
        console.log('starting hardware req');
        const userData = await User.findByPk(req.params.id, {
            attributes: { exclude: "password" },
            include: [{ model: Controller }, { model: ConsoleUser }, { model: GameUser }]
        })
        res.status(200).json(userData);
    } catch (error) {
        return res.status(400).json(error);
    }
});

router.delete('/games/:game_id', withAuth, async (req,res) => {
    const currentUser = {user_id: 6, logged_in: true};
    // const currentUser = req.session.user_id;
    try {
        // console.log(req.session.user_id);
        const gameUserData = await GameUser.destroy({
          where: {
            user_id: currentUser.user_id,
            game_id: req.params.game_id
          },
        });
        // console.log('delete finished');
        if(!gameUserData) return res.status(404).json({ message: 'The logged in user does not have this game' });
        // console.log(gameUserData);
        res.status(200).json(gameUserData);
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
});

router.delete('/consoles/:console_id', withAuth, async (req,res) => {
    const currentUser = {user_id: 6, logged_in: true};
    // const currentUser = req.session.user_id;
    try {
        const consoleUserData = await ConsoleUser.destroy({
          where: {
            user_id: currentUser.user_id,
            console_id: req.params.console_id
          },
        });
        if(!consoleUserData) return res.status(404).json({ message: 'The logged in user does not have this console' });
        return res.status(200).json(consoleUserData)
    } catch (error) {
        return res.status(400).json(error);
    }

});

router.delete('/controllers/:controller_id', withAuth, async (req,res) => {
    const currentUser = {user_id: 6, logged_in: true};
    // const currentUser = req.session;
    //how can I unhook the Controller and User without accessing the controller user table directly?
    try {
        const controller = await Controller.findByPk(req.params.controller_id);
        if(!controller) return res.status(404).json({ message: "controller not found"});
        // console.log(controller);
        const controllerRemoved = await controller.removeUser(currentUser.user_id);
        if(!controllerRemoved) return res.status(404).json({message:'user does not have controller'});
        const userList = await controller.getUsers();
        // console.log(userList)
        if(userList===undefined||userList.length==0){
            await controller.destroy();
            return res.status(200).json({message:"controller removed from user and destroyed as there were no users remaining that owned it"})
        }
        return res.status(200).json(controllerRemoved)
    } catch (error) {
        return res.status(400).json(error);
    }
});

router.post('/games/:game_id', withAuth, async (req,res) => {
    const currentUser = {user_id: 6, logged_in: true};
    // const currentUser = req.session;
    try {
        const gameUserData = await GameUser.create({
            user_id: currentUser.user_id,
            game_id: req.params.game_id,
        });
        return res.status(200).json(gameUserData)
    } catch (error) {
        return res.status(400).json(error);
    }
});

router.post('/consoles/:console_id', withAuth, async (req,res) => {
    const currentUser = {user_id: 6, logged_in: true};
    // const currentUser = req.session;
    try {
        const consoleUserData = await ConsoleUser.create({
            user_id: currentUser.user_id,
            console_id: req.params.console_id,
        });
        return res.status(200).json(consoleUserData)
    } catch (error) {
        return res.status(400).json(error);
    }
});

router.post('/controllers/:desc', withAuth, async (req,res) => {
    const currentUser = {user_id: 6, logged_in: true};
    // const currentUser = req.session;
    try {
        const controllerData = await Controller.create({
            description:req.params.desc
        });
        const userController = await controllerData.addUser(currentUser.user_id);
        return res.status(200).json({controllerData, userController})
    } catch (error) {
        return res.status(400).json(error);
    }
});

router.put('/controllers/:id', withAuth, async (req,res) => {
    const currentUser = {user_id: 6, logged_in: true};
    // const currentUser = req.session;
    try {
        const controllerData = await Controller.findByPk(req.params.id);
        const userAdded = await controllerData.addUser(currentUser.user_id);
        return res.status(200).json({controllerData, userAdded})
    } catch (error) {
        return res.status(400).json(error);
    }
})

// router.post('/', withAuth, async (req, res) => {
//   try {
//     const newProject = await Project.create({
//       ...req.body,
//       user_id: req.session.user_id,
//     });

//     res.status(200).json(newProject);
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
