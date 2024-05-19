const router = require("express").Router();
const sequelize = require("../../config/connection");
const { Party, User, PartyGoer } = require("../../models");
const { findAll } = require("../../models/User");
const withAuth = require("../../utils/auth");

//returns a list of all the parties that the logged in user owns
router.get("/owned", withAuth, async (req, res) => {
  try {
    const user = await User.findByPk(req.session.user_id);
    const parties = await user.getParties();
    return res.status(200).json(parties);
  } catch (err) {
    return res.status(400).json(err);
  }
});

// returns a list of all the parties that the logged in user is invited to
router.get("/invited/", withAuth, async (req, res) => {
  try {
    const invitedList = await sequelize.query(
      `SELECT party_id, name FROM partygoers LEFT JOIN party ON party.id = partygoers.party_id WHERE user_id = ?`,
      {replacements:[req.session.user_id]}
    );
    const [list] = invitedList
    res.status(200).json(list);
  } catch (err) {
    console.error(err)
    res.status(400).json(err);
  }
});

//returns a list of all partygoers of the given party.
router.get("/attendees/:id", withAuth, async (req, res) => {
  try {
    const party = await Party.findByPk(req.params.id);
    const attendees = await party.getUsers({
      attributes: { exclude: "password" },
    });
    let attendeeIDList = attendees.map((user) => user.dataValues.id);
    attendeeIDList.push(party.dataValues.owner_id);
    if (!attendeeIDList.includes(req.session.user_id))
      return res
        .status(500)
        .json({ message: "You do not have permission to view this party" });
    return res.status(200).json({ party, attendees });
  } catch (err) {
    res.status(400).json(err);
  }
});

//adds an attendee to the party specified by the id in the url. Fails if user does not own the party. Json should look like
// {
//     "user_id":0
// }
router.post("/attendees/:id", withAuth, async (req, res) => {
  try {
    console.log(req.params);
    const party = await Party.findByPk(req.params.id);
    console.log(party.dataValues);
    if (party.dataValues.owner_id != req.session.user_id)
      return res
        .status(400)
        .json({ message: "Logged in user does not own this party" });
    if (party.dataValues.owner_id == req.body.user_id)
      return res
        .status(400)
        .json({ message: "Logged in user cannot be added to their own party" });
    const partyAdd = await party.addUser(req.body.user_id);
    return res.status(200).json(partyAdd);
  } catch (err) {
    res.status(400).json(err);
  }
});

// adds a new party with the description from the body of the req as the name, format should be
// {
//     "name":"whatever"
// }
// logged in user will be the owner
router.post("/", withAuth, async (req, res) => {
  try {
    const newParty = await Party.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    return res.status(200).json(newParty);
  } catch (err) {
    return res.status(400).json(err);
  }
});

//deletes party with the given ID if the logged in user owns it
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const partyData = await Party.destroy({
      where: {
        id: req.params.id,
        owner_id: req.session.user_id,
      },
    });

    if (!partyData) {
      res
        .status(404)
        .json({
          message: "No party found with this id that belongs to this owner!",
        });
      return;
    }

    return res.status(200).json(partyData);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//changes the name of the party with the given ID if the user owns it, input should look like
// {
//     "name" : "whatever"
// }
router.put("/name/:id", withAuth, async (req, res) => {
  try {
    const party = await Party.findByPk(req.params.id);
    if (party.dataValues.owner_id != req.session.user_id)
      return res
        .status(400)
        .json({ message: "Logged in user does not own this party" });
    const partyData = await party.update(req.body);
    return res.status(200).json(partyData);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
