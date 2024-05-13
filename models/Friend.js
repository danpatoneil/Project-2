const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Friend extends Model {}

Friend.init(
  {
    user_id1: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id2: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "friend",
    validate: {
      checkFriendOrder() {
        if (this.user_id1 > this.user_id2) {
          const temp = this.user_id1;
          this.user_id1 = this.user_id2;
          this.user_id2 = temp;
        }else if(this.user_id1 = this.user_id2){
            throw new Error('User IDs cannot be identical');
        }
      },
    },
  }
);

module.exports = Friend;
