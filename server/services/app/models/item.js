'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Item.belongsTo(models.Category, { foreignKey: 'categoryId' });
      Item.belongsTo(models.User, { foreignKey: 'authorId' });
      Item.hasMany(models.Ingredient, { foreignKey: 'itemId' });
    }
  }
  Item.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Item name cannot be empty'
        },
        notNull: {
          args: true,
          msg: 'Item name is required'
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Item description cannot be empty'
        },
        notNull: {
          args: true,
          msg: 'Item description is required'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: 7000,
          msg: 'Item price cannot be less than 7000'
        },
        notEmpty: {
          args: true,
          msg: 'Item price cannot be empty'
        },
        notNull: {
          args: true,
          msg: 'Item price is required'
        }
      },
      get() {
        const price = this.getDataValue('price');
        return price ? price.toLocaleString("id-ID", {style:"currency", currency:"IDR"}) : null;
      }
    },
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Item image url cannot be empty'
        },
        notNull: {
          args: true,
          msg: 'Item image url is required'
        },
      }
    },
    authorId: {
      type: DataTypes.INTEGER,
    },
    categoryId: {
      type: DataTypes.INTEGER
    } 
  }, {
    sequelize,
    modelName: 'Item',
  });
  return Item;
};