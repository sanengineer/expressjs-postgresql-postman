"use strict";
const { Model } = require("sequelize");
var bcrypt = require("bcrypt-nodejs");

module.exports = (sequelize, DataTypes) => {
  // class User extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  // static associate(models) {
  // define association here
  //   }
  // };
  // User.init({
  //   username: DataTypes.STRING,
  //   password: DataTypes.STRING
  // }, {
  //   sequelize,
  //   modelName: 'User',
  // });

  const Usr = sequelize.define(
    "User",
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
    }
  );
  Usr.beforeSave((user, options) => {
    if (user.changed("password")) {
      user.password = bcrypt.hashSync(
        user.password,
        bcrypt.genSaltSync(10),
        null
      );
    }
  });
  Usr.prototype.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
      if (err) {
        return cb(err);
      }
      cb(null, isMatch);
    });
  };
  Usr.associate = function (models) {
    // associations can be defined here
  };

  return Usr;
};
