const articleService = require("../services/ArticleService");

const getAll = async (req, res) => {
  const articles = await articleService.getAll();
  if (articles) {
    res.status(200).send({ status: "ok", data: articles });
  } else {
    res.status(404).send({ status: "failed", data: error });
  }
};
const get = async (req, res) => {
  let id = req.params.articleId;
  try {
    const article = await articleService.get(id);
    res.status(200).send({ status: "ok", data: article });
  } catch (error) {
    res
      .status(error.status || 500)
      .send({ status: "failed", data: { error: error.message } });
  }
};

const create = async (req, res) => {
  const { title, body, userId, categories } = req.body;

  if (!title) {
    res.status(400).send({
      status: "failed",
      message: "title should not be empty",
      data: null,
    });
  } else if (!body) {
    res.status(400).send({
      status: "failed",
      message: "body should not be empty",
      data: null,
    });
  } else if (!userId) {
    res.status(400).send({
      status: "failed",
      message: "userId should not be empty",
      data: null,
    });
  } else {
    const createdArticle = await articleService.create(
      title,
      body,
      userId,
      categories
    );
    if (createdArticle) {
      res.status(201).send({
        status: "OK",
        message: "article created",
        data: createdArticle,
      });
    } else {
      res
        .status(400)
        .send({ status: "failed", data: { error: error.message } });
    }
  }
};
const update = async (req, res) => {
  const id = req.params.articleId;
  const { title, body } = req.body;

  const updatedArticle = await articleService.update(id, title, body);

  if (updatedArticle) {
    res
      .status(201)
      .send({ status: "OK", message: "article updated", data: updatedArticle });
  } else {
    res.status(400).send({ status: "failed", data: null });
  }
};
const destroy = async (req, res) => {
  try {
    const id = req.params.articleId;

    const deletedArticle = await articleService.destroy(id);

    if (deletedArticle) {
      res
        .status(200)
        .send({
          status: "OK",
          message: "article deleted",
          data: deletedArticle,
        });
    }
  } catch (error) {
    res.status(400).send({ status: "failed", data: { error: error.message } });
  }
};
module.exports = {
  get,
  getAll,
  create,
  destroy,
  update,
};
