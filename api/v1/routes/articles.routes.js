const {Router} = require('express');

const articleController = require('../../../controllers/ArticleController');
const router = Router();

router.get('/', articleController.getAll);
router.get('/:articleId', articleController.get);
router.post('/', articleController.create);
router.put('/:articleId', articleController.update);
router.delete('/:articleId', articleController.destroy);



module.exports = router;
