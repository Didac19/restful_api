const userController = require('../../../controllers/UserController');
const {Router} = require('express');


const router = Router();

router.get('/', userController.getAll);
router.get('/:userId', userController.get);
router.post('/', userController.create);
router.put('/:userId', userController.update);
router.delete('/:userId', userController.destroy);

module.exports = router;



