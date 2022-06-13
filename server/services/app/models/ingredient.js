"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Ingredient extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Ingredient.belongsTo(models.Item, { foreignKey: "itemId" });
        }
    }
    Ingredient.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        args: true,
                        msg: "Ingredient name cannot be empty",
                    },
                    notNull: {
                        args: true,
                        msg: "Ingredient name is required",
                    },
                },
            },
            itemId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "Items",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
        },
        {
            sequelize,
            modelName: "Ingredient",
        }
    );
    return Ingredient;
};
