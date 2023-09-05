const userService = require('../services/UserService');

const getAll = async (req, res)=>{
    const users = await userService.getAll();
    if(users){
        res.status(200).send({status: 'ok', data: users});
    }
    else{
        res.status(404).send({status:'failed', data: error});
    }
}
const get = async (req, res)=>{
    let id = req.params.userId;
    try {
        const user = await userService.get(id);
        res.status(200).send({status: 'ok', data: user});
    } catch (error) {
        res.status(error.status||500).send({status:'failed', data: {error: error.message} }); 
    }
   
}

const create = async (req, res)=>{

    const {name, email, password, phone} = req.body;

    if(!name){
        res.status(400).send({status: 'failed', message: 'name should not be empty', data: null});
    }
    else if(!email){
        res.status(400).send({status: 'failed', message: 'email should not be empty', data: null});
    }
    else if(!password){
        res.status(400).send({status: 'failed', message: 'password should not be empty', data: null});
    }
    else if(!phone){
        res.status(400).send({status: 'failed', message: 'phone should not be empty', data: null});
    }
    
    else{
        const createdUser = await userService.create(name, email, password, phone);
        if  (createdUser){
            res.status(201).send({status: 'OK', message: 'user created', data: createdUser});
        }else{
            res.status(400).send({status: 'failed', data: {error: error.message}});
        }
    }
    
   
};
const update = async (req, res)=>{

    const id = req.params.userId;
    const {name, email, password, phone} = req.body;

    const updatedUser = await userService.update(id, name, email, phone, password);

    if  (updatedUser){
        res.status(201).send({status: 'OK', message: 'user updated', data: updatedUser});
    }else{
        res.status(400).send({status: 'failed', data: null});
    }
};
const destroy = async (req, res)=>{

    const id = req.params.userId;

    const deletedUser = await userService.destroy(id);

    if  (deletedUser){
        res.status(201).send({status: 'OK', message: 'user deleted', data: deletedUser});
    }else{
        res.status(400).send({status: 'failed', data: { error: error.message }});
    }

};
module.exports = {
    get, getAll, create, destroy, update
}
