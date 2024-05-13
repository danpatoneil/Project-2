const User = require('./User');
const Controller = require('./Controller');
const Party = require('./Party');
const Friend = require('./Friend');
const ConsoleController = require('./ConsoleController');
const GameUser = require('./GameUser');
const ConsoleUser = require('./ConsoleUser');

User.hasMany(Party, {
    foreignKey: 'owner_id',
    onDelete: 'CASCADE'
});

Party.belongsTo(User, {
    foreignKey: 'owner_id'
});

User.belongsToMany(Party, {
    through: 'Party-Goers'
})

Party.belongsToMany(User, {
    through: 'Party-Goers'
})

User.belongsToMany(Controller, {
    through: 'User-Controllers'
});

Controller.belongsToMany(User, {
    through: 'User-Controllers'
});

User.hasMany(Friend, {
    foreignKey: 'user_id1',
    onDelete: 'CASCADE'
});

User.hasMany(Friend, {
    foreignKey: 'user_id2',
    onDelete: 'CASCADE'
});

Friend.belongsTo(User, {
    foreignKey: 'user_id1'
});

Friend.belongsTo(User, {
    foreignKey: 'user_id2'
});

ConsoleController.belongsTo(Controller, {
    foreignKey: 'controller_id'
});

Controller.hasMany(ConsoleController, {
    foreignKey: 'controller_id'
});

// ConsoleUser.belongsTo(User, {
//     foreignKey: 'user_id'
// });

// User.hasMany(ConsoleUser, {
//     foreignKey: 'user_id',
//     onDelete: 'CASCADE'
// });

// GameUser.belongsTo(User, {
//     foreignKey: 'user_id'
// });

// User.hasMany(GameUser, {
//     foreignKey: 'user_id',
//     onDelete: 'CASCADE'
// });


module.exports = { User, Controller, Party, Friend, GameUser, ConsoleUser, ConsoleController };
