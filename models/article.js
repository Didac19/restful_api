"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Article.belongsTo(models.User);
      Article.belongsToMany(models.Category, {
        through: "articleCategories",
        as: "Categories",
        onDelete: "CASCADE",
      });
    }
  }
  Article.init(
    {
      title: DataTypes.STRING,
      body: DataTypes.TEXT,
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Article",
    },
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  );
  return Article;
};
