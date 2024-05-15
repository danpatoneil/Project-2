const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Friend extends Model {}

Friend.init(
  {
    user_id1: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "user",
        key: "id",
      },
    },
    user_id2: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "user",
        key: "id",
      },
      validate: {
        checkSameID(user_id2) {
            console.log(user_id2);
          if(this.user_id1 === user_id2){
              throw new Error('User IDs cannot be identical');
          }
        },
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

module.exports = Friend;
