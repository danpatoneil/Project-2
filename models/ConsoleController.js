const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class ConsoleController extends Model {}

ConsoleController.init(
  {
    controller_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: "controller",
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
    modelName: "consoleController",
  }
);

module.exports = ConsoleController;
