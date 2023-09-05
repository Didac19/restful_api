const db = require("../models");

const create = async (name) => {
  try {
    const newCategory = await db.Category.create({ name });
    return newCategory;
  } catch (error) {
    return error.message || "failed to create Category";
  }
};
const getAll = async () => {
  try {
    let categories = await db.Category.findAll();

    return categories;
  } catch (error) {
    console.error(error);
    return error.message || "failed to get all categories";
  }
};


const get = async (id) => {
  try {
    let category = await db.Category.findByPk(id);
    return category;
  } catch (error) {
    throw { status: 500, message: "failed to get Category" };
  }
};

const update = async (id, name) => {
  try {
    const updatedCategory = await db.Category.update(
      { name },
      { where: { id } }
    );
    return updatedCategory;
  } catch (error) {
    return error.message || "failed to update Category";
  }
};

const destroy = async (id) => {
  try {
    const deletedCategory = await db.Category.destroy({ where: { id } });
    return deletedCategory;
  } catch (error) {
    return error.message || "failed to create Category";
  }
};

module.exports = { create, destroy, get, getAll, update };
