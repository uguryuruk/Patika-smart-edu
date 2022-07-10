const express = require('express');
const authController = require('../controllers/authController');


const router=express.Router();

//root/categories/
router.route('/signup').post(authController.createUser);


module.exports=router;