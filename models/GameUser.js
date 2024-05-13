const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class GameUser extends Model {}

GameUser.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "friend",
  }
);

module.exports = GameUser;
