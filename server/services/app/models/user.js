'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Item, { foreignKey: 'authorId' });
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'User name cannot be empty'
        },
        notNull: {
          args: true,
          msg: 'User name is required'
        },
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'User email cannot be empty'
        },
        notNull: {
          args: true,
          msg: 'User email is required'
        },
        isEmail: {
          args: true,
          msg: 'User email is not valid'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'User password cannot be empty'
        },
        notNull: {
          args: true,
          msg: 'User password is required'
        },
        len: {
          args: [6, 50],
          msg: 'User password must be at least 6 characters'
        }
      }
    },
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate(user => {
    user.password = hashPassword(user.password);
  });
  return User;
};