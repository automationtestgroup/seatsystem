'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    adid: {
      type:DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "UserIDは必ず入力して下さい。"
        }
      }
    },
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "氏名は必ず入力下さい。"
        }
      }
    },
    status: {
      type: DataTypes.STRING
    }
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};