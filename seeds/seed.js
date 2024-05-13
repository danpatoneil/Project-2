const sequelize = require('../config/connection');
const { User, Party, Controller, Friend, ConsoleController, ConsoleUser, GameUser } = require('../models');
//
const userData = require('./userData.json');
const partyData = require('./partyData.json');
const controllerData = require('./controllerData.json');
const friendData = require('./friendData.json');
const consoleControllerData = require('./consoleControllerData.json');
// const gameUserData = require('./gameUserData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });


  for (const party of partyData) {
    await Party.create({
      ...party,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  const controllers = await Controller.bulkCreate(controllerData, {
    individualHooks: true,
    returning: true,
  });

  await Friend.bulkCreate(friendData, {
    individualHooks: true,
    returning: true,
  })

  for(const consoleController of consoleControllerData){
    await ConsoleController.create({
      ...consoleController,
      controller_id: controllers[Math.floor(Math.random() * controllers.length)].id,
    });
  }

  for (const user of users) {
    const roll = Math.floor(Math.random() * 15);
    for (let i = 0; i < 3; i++) {
        // console.log(user.id);
        // console.log(roll+i);
        await ConsoleUser.create({
            console_id: roll+i,
            user_id: user.id,
        })
    }
  }
  for (const user of users) {
    const roll = Math.floor(Math.random() * 500);
    for (let i = 0; i < 3; i++) {
        console.log(user.id);
        console.log(roll+i*3);
        await GameUser.create({
            user_id: user.id,
            game_id: roll+i*3,
        })
    }
  }
  process.exit(0);
};

seedDatabase();
