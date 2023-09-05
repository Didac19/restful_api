const db = require("../models");

const create = async (title, body, userId, categories) => {
  try {
    console.log(categories);
    const newArticle = await db.article.create({ title, body, userId });

    if(newArticle){
      await newArticle.setCategories(categories);
    }

    return newArticle;
  } catch (error) {
    return error.message || "failed to create article";
  }
};
const getAll = async () => {
  try {
    let Articles = await db.article.findAll(
    {
       include: {
        model: db.User, required: true, as: "User", attributes: ["id", "name", "email"],
    },
    attributes:{
      exclude:['createdAt', 'updatedAt']
    },
    include: ["categories"]
    });

    return Articles;
  } catch (error) {
    console.error(error);
    return error.message || "failed to get all articles";
  }
};


const get = async (id) => {
  try {
    let Article = await db.article.findByPk(id);
    return Article;
  } catch (error) {
    throw { status: 500, message: "failed to get article" };
  }
};

const update = async (id, title, body) => {
  try {
    const updatedArticle = await db.article.update(
      { title, body },
      { where: { id } }
    );
    return updatedArticle;
  } catch (error) {
    return error.message || "failed to update article";
  }
};

const destroy = async (id) => {
  try {
    const deletedArticle = await db.article.destroy({ where: { id } });
    return deletedArticle;
  } catch (error) {
    return error.message || "failed to create article";
  }
};

module.exports = { create, destroy, get, getAll, update };
