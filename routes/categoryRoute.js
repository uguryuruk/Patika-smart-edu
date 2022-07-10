const express = require('express');
const categoryController = require('../controllers/categoryController');


const router=express.Router();

//root/categories/
router.route('/').post(categoryController.createCategory);


module.exports=router;