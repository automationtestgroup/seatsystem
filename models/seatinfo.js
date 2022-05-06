'use strict';
module.exports = (sequelize, DataTypes) => {
  const Seatinfo = sequelize.define('Seatinfo', {
    number: {
      type:DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "座席番号は必ず入力して下さい。"
        }
      }
    },
    x: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: { msg: "整数を入力下さい。"},
        min: {
          args: [0],
          msg: "ゼロ以上の値が必要です。"
        }
      }
    },
    y: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: { msg: "整数を入力下さい。"},
        min: {
          args: [0],
          msg: "ゼロ以上の値が必要です。"
        }
      }
    }
  }, {});
  Seatinfo.associate = function(models) {
    // associations can be defined here
  };
  return Seatinfo;
};