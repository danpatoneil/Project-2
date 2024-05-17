const router = require("express").Router();
const sequelize = require("../../config/connection");
const { Party, User } = require("../../models");
const { findAll } = require("../../models/User");
const withAuth = require("../../utils/auth");

router.get("/:id", withAuth, async (req, res) => {
  const currentSession = { user_id: 6, logged_in: true };
  //const currentSession = req.session;
  try {
    // const partyData = await Party.findByPk(req.params.id, {
    //     include:{
    //         model:User,
    //         through: 'PartyGoers'
    //     },
    //     attributes: ['id', 'username', 'email']
    // })
    // const partyData = await Party.findAll({
    //     where: {
    //         id: req.params.id
    //     },
    //     include: [{
    //         model: User,
    //         through: 'PartyGoers',
    //         attributes: ['username']
    //     }]
    // })
    const partyData = await sequelize.query(`SELECT PartyGoers.party_id, User.username, User.email FROM PartyGoers LEFT JOIN User ON User.id = PartyGoers.user_id WHERE PartyGoers.party_id = ?;`, {replacements:[req.params.id]})
    
    return res.status(200).json(partyData);
  } catch (err) {
    console.error(err)
    res.status(400).json(err);
  }
});

router.get("/invited", withAuth, async (req, res) => {
  const currentSession = { user_id: 6, logged_in: true };
  //const currentSession = req.session;
  try {
    const users = await User.findAll();
    console.log(users);
    const partyList = [];
    for (const user of users) {
      console.log("checking user");
      console.log(user.dataValues.username);
      partyList.push(await user.getParties());
    }
    console.log(partyList);
    res.status(200).json(partyList);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/", withAuth, async (req, res) => {
  const currentSession = { user_id: 6, logged_in: true };
  //const currentSession = req.session;
  try {
    const newParty = await Party.create({
      ...req.body,
      user_id: currentSession.user_id,
    });

    res.status(200).json(newParty);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", withAuth, async (req, res) => {
  const currentSession = { user_id: 6, logged_in: true };
  //const currentSession = req.session;
  try {
    const partyData = await Project.destroy({
      where: {
        id: req.params.id,
        user_id: currentSession.user_id,
      },
    });

    if (!partyData) {
      res.status(404).json({ message: "No project found with this id!" });
      return;
    }

    res.status(200).json(partyData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", withAuth, async (req, res) => {
  const currentSession = { user_id: 6, logged_in: true };
  //const currentSession = req.session;
});

module.exports = router;
