const {Router} = require('express');

const categoryController = require('../../../controllers/CategoryController');
const router = Router();

router.get('/', categoryController.getAll);
router.get('/:categoryId', categoryController.get);
router.post('/', categoryController.create);
router.put('/:categoryId', categoryController.update);
router.delete('/:categoryId', categoryController.destroy);



module.exports = router;
