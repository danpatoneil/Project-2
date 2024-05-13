const sequelize = require('../config/connection');
const { User, Party, Friend, Controller, ConsoleController, ConsoleUser, GameUser } = require('../models');

const userData = require('./userData.json');
const partyData = require('./partyData.json');
const controllerData = require('./controllerData.json');

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

  for (let i = 0; i < 12; i++) {
    await Friend.create({
      friend_id: users[Math.floor(Math.random() * users.length)].id,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  for (let i = 0; i < 12; i++) {
    await ConsoleController.create({
        console_id: Math.floor(Math.random() * 15),
        controller_id: controllers[Math.floor(Math.random() * controllers.length)].id,
    });
  }

  for (let i = 0; i < 12; i++) {
    await ConsoleUser.create({
      console_id: Math.floor(Math.random() * 15),
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  for (let i = 0; i < 12; i++) {
    await GameUser.create({
      game_id: Math.floor(Math.random() * 150),
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
