const categoryService = require('../services/CategoryService.js');

const getAll = async (req, res)=>{
    const categories = await categoryService.getAll();
    if(categories){
        res.status(200).send({status: 'ok', data: categories});
    }
    else{
        res.status(404).send({status:'failed', data: error});
    }
}
const get = async (req, res)=>{
    let id = req.params.categoryId;
    try {
        const category = await categoryService.get(id);
        res.status(200).send(
                {status: 'ok', data: category}
            );
    } catch (error) {
        res.status(error.status||500).send({status:'failed', data: {error: error.message} }); 
    }
   
}

const create = async (req, res)=>{

    const {name} = req.body;

    
   
    const createdCategory = await categoryService.create(name);
    if  (createdCategory){
        res.status(201).send({status: 'OK', message: 'category created', data: createdCategory});
    }else{
            res.status(400).send({status: 'failed', data: {error: error.message}});
    }
    
    
   
};
const update = async (req, res)=>{

    const id = req.params.categoryId;
    const {name} = req.body;

    const updatedCategory = await categoryService.update(id, name);

    if  (updatedCategory){
        res.status(201).send({status: 'OK', message: 'category updated', data: updatedCategory});
    }else{
        res.status(400).send({status: 'failed', data: null});
    }
};
const destroy = async (req, res)=>{

    const id = req.params.categoryId;

    const deletedCategory = await categoryService.destroy(id);

    if  (deletedCategory){
        res.status(201).send({status: 'OK', message: 'category deleted', data: deletedCategory});
    }else{
        res.status(400).send({status: 'failed', data: { error: error.message }});
    }

};
module.exports = {
    get, getAll, create, destroy, update
}
