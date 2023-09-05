const db = require('../../../models');
const {Router} = require('express');
const router = Router();


//GET 
router.get('/', (req, res) => {
    res.send({title: 'accessing main route', message:'main route'})
})

router.get('/all', async (req, res) => {
    try {
        let users = await db.User.findAll();
        res.status(200).send({message: 'users found', users: users});
    } catch (error) {
        res.status(400).send({message: 'could not get users', status: 'error'});
    }
})

router.get('/:id', async(req, res) => {
    try {
        let id = req.params.id;
        let user = await db.User.findByPk(id)
        res.status(200).send({message: 'user found', user: user});
    } catch (error) {
        res.status(404).send({message: 'user not found', status: 'error'});
    }
})
//POST
router.post('/new', async (req, res) => {                                                                                                                                                                                                                                  
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    let phone = req.body.phone;
    console.log(name, email, password, phone);
    try {
        await db.User.create({name, email, password, phone});
        res.status(200).send({message:'user created', status: 'success'});
    }
    catch(err){
        console.log(err);
        res.status(400).send({message:'could not create user', status: 'error'});
    }
});
//PUT
router.put('/:id', async (req, res)=>{
    try {
        let id = req.params.id;
        let {name, email, password, phone} = req.body;
        await db.User.update(
            {name, email, password, phone}, 
            {where:{id}})

        res.status(201).send({message: 'user updated', status: 'success'});
    } catch (error) {
        res.status(404).send({message: 'Could not update user', status: 'error'});
    }
})
//DELETE
router.delete('/:id', async (req, res)=>{
    try {
        let id = req.params.id;
        await db.User.destroy({where:{id}});
        res.status(200).send({message: 'user deleted', status: 'success'});
    } catch (error) {
        res.status(400).send({message: 'could not delete user', status: 'error'});
    }
});
module.exports=router;