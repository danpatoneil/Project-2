const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class GameUser extends Model {}

GameUser.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: "user",
        key: "id",
      },
    },
    game_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "gameUser",
  }
);

module.exports = GameUser;
