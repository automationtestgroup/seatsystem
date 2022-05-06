'use strict';
module.exports = (sequelize, DataTypes) => {
  const Seat = sequelize.define('Seat', {
    number: {
      type:DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "座席は必ず入力して下さい。"
        }
      }
    },
    adid: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "UserIDは必ず入力下さい。"
        }
      }
    }
  }, {});
  Seat.associate = function(models) {
    // associations can be defined here
  };
  return Seat;
};