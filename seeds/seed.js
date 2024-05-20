const sequelize = require("../config/connection");
const { index } = require("../controllers/api/igdb/platformDictionary");
const {
  User,
  Party,
  Controller,
  Friend,
  ConsoleController,
  ConsoleUser,
  GameUser,
} = require("../models");
//
const userData = require("./userData.json");
const partyData = require("./partyData.json");
const controllerData = require("./controllerData.json");
const friendData = require("./friendData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  // add new users
  const users = await User.bulkCreate(userData, {
    validate: true,
    individualHooks: true,
    returning: true,
  });

  for (const party of partyData) {
    // console.log(party)
    // generate new party
    const owner_id = users[Math.floor(Math.random() * users.length)].id;
    const newParty = await Party.create({
      ...party,
      owner_id: owner_id,
    });
    // console.log(newParty)
    const uniqueIDs = [];
    // generate 3 unique id's
    do {
      const newID = users[Math.floor(Math.random() * users.length)].id;
      if (!uniqueIDs.includes(newID) && newID !== owner_id)
        uniqueIDs.push(newID);
    } while (uniqueIDs.length < 3);
    // console.log(`${uniqueIDs.length} unique id's generated`)
    // add unique id's as users to party junction table
    for (const id of uniqueIDs) {
      // console.log(`adding user ${id} to party ${newParty.id}`);
      newParty.addUser(id);
    }
    // console.log("party is");
    // console.log(newParty);
    // console.log("unique ID's are");
    // console.log(uniqueIDs);
    // console.log("user list is");
    // console.log(await newParty.getUsers())
  }
  // bulk create new controllers
  const controllers = await Controller.bulkCreate(controllerData, {
    validate: true,
    individualHooks: true,
    returning: true,
  });

  // add a new user to each controller
  for (const controller of controllers) {
    await controller.addUser(
      users[Math.floor(Math.random() * users.length)].id
    );
  }
  // bulk create friends list
  await Friend.bulkCreate(friendData, {
    validate: true,
    individualHooks: true,
    returning: true,
  });

  const keysArray = Array.from(index.keys());
  // bulk create controllers, assign random controller to each console
  const rollCC = Math.floor(Math.random() * (keysArray.length - 16));
  console.log('keysArray is '+keysArray.length)
  for (let i = 0; i < 10; i++) {
    // console.log(rollCC);
    // console.log(index.get(keysArray[rollCC]));
    await ConsoleController.create({
      console_id: keysArray[rollCC + i],
      controller_id:controllers[Math.floor(Math.random() * controllers.length)].id,
    });
  }

  //create one consoleUser field for a random console id and a random user id
  for (const user of users) {
    const roll = Math.floor(Math.random() * (keysArray.length - 16));
    for (let i = 0; i < 4; i++) {
    //   console.log(user.id);
    //   console.log(keysArray.length);
    //   console.log(roll + i);
    //   console.log(keysArray[roll + i]);
    //   console.log(index.get(keysArray[roll + i]));
    //   console.log(
    //     "attempting to Create user" +
    //       user.id +
    //       "with console" +
    //       keysArray[roll + i]
    //   );
      await ConsoleUser.create({
        console_id: keysArray[roll + i],
        user_id: user.id,
      });
    }
  }
  //create one gameUser field for a random game id and a random user id
  for (const user of users) {
    const roll = Math.floor(Math.random() * 500);
    for (let i = 0; i < 10; i++) {
      // console.log(user.id);
      // console.log(roll+i*3);
      await GameUser.create({
        user_id: user.id,
        game_id: roll + i * 3,
      });
    }
  }

  //example code for my find a friend by id
  //   const user1 = await User.findByPk(1, {
  //     include: [
  //         {model: User, as :"friends"}
  //     ]
  //   });
  //   for (const user of user1.friends) {
  //     // console.log(user.dataValues.username);
  //   }

  process.exit(0);
};

seedDatabase();
