const User = require('./User');
const Controller = require('./Controller');
const Party = require('./Party');
const Friend = require('./Friend');
const ConsoleController = require('./ConsoleController');
const GameUser = require('./GameUser');
const ConsoleUser = require('./ConsoleUser');

//user is connected to party in two ways, one for the owner of the party and one for the party goers
User.hasMany(Party, {
    foreignKey: 'owner_id',
    onDelete: 'CASCADE'
});

Party.belongsTo(User, {
    foreignKey: 'owner_id'
});

User.belongsToMany(Party, {
    through: 'partygoers'
})

Party.belongsToMany(User, {
    through: 'partygoers'
})
//controller seems like it should be m:1 but we wanted to incorporate the ability to have multiple users share one controller
User.belongsToMany(Controller, {
    through: 'UserControllers'
});

Controller.belongsToMany(User, {
    through: 'UserControllers'
});

//user is connected to user with friend as a junction table
User.belongsToMany(User, {
    foreignKey: "user_id",
    through: "friend",
    as: "user"
});

User.belongsToMany(User, {
    foreignKey: "friend_id",
    through: "friend",
    as: "friends"
});

ConsoleController.belongsTo(Controller, {
    foreignKey: 'controller_id'
});

Controller.hasMany(ConsoleController, {
    foreignKey: 'controller_id'
});

ConsoleUser.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasMany(ConsoleUser, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

GameUser.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasMany(GameUser, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});


module.exports = { User, Controller, Party, Friend, GameUser, ConsoleUser, ConsoleController };
