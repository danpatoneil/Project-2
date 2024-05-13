const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Controller extends Model {}


Controller.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'controller',
    }
  );

  module.exports = Controller;
