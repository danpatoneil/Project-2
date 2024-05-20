const router = require("express").Router();
const { User, GameUser, Controller, ConsoleUser } = require("../../models");
const { findByPk } = require("../../models/User");
const withAuth = require("../../utils/auth");

//get all the hardware for the logged in user
router.get("/", withAuth, async (req, res) => {
  try {
    // console.log('starting hardware req');
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: "password" },
      include: [
        { model: Controller },
        { model: ConsoleUser },
        { model: GameUser },
      ],
    });
    return res.status(200).json(userData);
  } catch (error) {
    return res.status(400).json(error);
  }
});

// get the hardware of a given user id, but only if they are friends with the logged in user
router.get("/:id", withAuth, async (req, res) => {
  try {
    if(!req.params.id==req.session.user_id){
    const friendCheck = await User.findByPk(req.session.user_id)
      .then((loggedInUser) => loggedInUser.getFriends())
      .then((friendList) => friendList.map((user) => user.dataValues.id))
      .then((friendIDs) => friendIDs.includes(parseInt(req.params.id)));
    if (!friendCheck)
      return res
        .status(500)
        .json({
          message:
            "you can't see the hardware of a user who you aren't friends with",
        });}
    const userData = await User.findByPk(req.params.id, {
      attributes: { exclude: "password" },
      include: [
        { model: Controller },
        { model: ConsoleUser },
        { model: GameUser },
      ],
    });
    res.status(200).json(userData);
  } catch (error) {
    return res.status(400).json(error);
  }
});

//delete a game from the logged in user by ID
router.delete("/games/:game_id", withAuth, async (req, res) => {
  try {
    // console.log(req.session.user_id);
    const gameUserData = await GameUser.destroy({
      where: {
        user_id: req.session.user_id,
        game_id: req.params.game_id,
      },
    });
    // console.log('delete finished');
    if (!gameUserData)
      return res
        .status(404)
        .json({ message: "The logged in user does not have this game" });
    // console.log(gameUserData);
    res.status(200).json(gameUserData);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});


//delete a console from the logged in user by ID
router.delete("/consoles/:console_id", withAuth, async (req, res) => {
  try {
    const consoleUserData = await ConsoleUser.destroy({
      where: {
        user_id: req.session.user_id,
        console_id: req.params.console_id,
      },
    });
    if (!consoleUserData)
      return res
        .status(404)
        .json({ message: "The logged in user does not have this console" });
    return res.status(200).json(consoleUserData);
  } catch (error) {
    return res.status(400).json(error);
  }
});


//delete a controller from the logged in user by ID. If there is no one else connected to that controller, delete the controller too
router.delete("/controllers/:controller_id", withAuth, async (req, res) => {
  try {
    const controller = await Controller.findByPk(req.params.controller_id);
    if (!controller)
      return res.status(404).json({ message: "controller not found" });
    // console.log(controller);
    const controllerRemoved = await controller.removeUser(req.session.user_id);
    if (!controllerRemoved)
      return res.status(404).json({ message: "user does not have controller" });
    const userList = await controller.getUsers();
    // console.log(userList)
    if (userList === undefined || userList.length == 0) {
      await controller.destroy();
      return res
        .status(200)
        .json({
          message:
            "controller removed from user and destroyed as there were no users remaining that owned it",
        });
    }
    return res.status(200).json(controllerRemoved);
  } catch (error) {
    return res.status(400).json(error);
  }
});

//add a game to the logged in user by ID
router.post("/games/:game_id", withAuth, async (req, res) => {
  try {
    const gameUserData = await GameUser.create({
      user_id: req.session.user_id,
      game_id: req.params.game_id,
    });
    return res.status(200).json(gameUserData);
  } catch (error) {
    return res.status(400).json(error);
  }
});

//add a console to the logged in user by ID
router.post("/consoles/:console_id", withAuth, async (req, res) => {
  try {
    const consoleUserData = await ConsoleUser.create({
      user_id: req.session.user_id,
      console_id: req.params.console_id,
    });
    return res.status(200).json(consoleUserData);
  } catch (error) {
    return res.status(400).json(error);
  }
});

//add a controller to the logged in user by ID
router.post("/controllers/:desc", withAuth, async (req, res) => {
  try {
    const controllerData = await Controller.create({
      description: req.params.desc,
    });
    const userController = await controllerData.addUser(req.session.user_id);
    return res.status(200).json({ controllerData, userController });
  } catch (error) {
    return res.status(400).json(error);
  }
});

// add a controller specified by id to the logged in user
router.put("/controllers/:id", withAuth, async (req, res) => {
  try {
    const controllerData = await Controller.findByPk(req.params.id);
    const userAdded = await controllerData.addUser(req.session.user_id);
    return res.status(200).json({ controllerData, userAdded });
  } catch (error) {
    return res.status(400).json(error);
  }
});

module.exports = router;
