const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class ConsoleUser extends Model {}

ConsoleUser.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: "user",
        key: "id",
      },
    },
    console_id: {
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
    modelName: "consoleUser",
  }
);

module.exports = ConsoleUser;
