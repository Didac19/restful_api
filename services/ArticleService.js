const db = require("../models");

const create = async (title, body, userId, categories) => {
  try {
    console.log(categories);
    const newArticle = await db.Article.create({ title, body, UserId: userId });

    if (newArticle) {
      await newArticle.setCategories(categories);
    }

    return newArticle;
  } catch (error) {
    return error.message || "failed to create Article";
  }
};
const getAll = async () => {
  try {
    let Articles = await db.Article.findAll({
      include: [
        {
          model: db.User,
          required: true,
          as: "User",
          attributes: ["id", "name", "email"],
        },
        {
          model: db.Category,
          required: true,
          as: "Categories",
          attributes: ["id", "name"],
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      // include: ["Categories"]
    });

    return Articles;
  } catch (error) {
    console.error(error);
    return error.message || "failed to get all Articles";
  }
};

const get = async (id) => {
  try {
    let Article = await db.Article.findByPk(id);
    return Article;
  } catch (error) {
    throw { status: 500, message: "failed to get Article" };
  }
};

const update = async (id, title, body) => {
  try {
    const updatedArticle = await db.Article.update(
      { title, body },
      { where: { id } }
    );
    return updatedArticle;
  } catch (error) {
    return error.message || "failed to update Article";
  }
};

const destroy = async (id) => {
  try {
    const deletedArticle = await db.Article.destroy({ where: { id } });
    return deletedArticle;
  } catch (error) {
    return error.message || "failed to create Article";
  }
};

module.exports = { create, destroy, get, getAll, update };
