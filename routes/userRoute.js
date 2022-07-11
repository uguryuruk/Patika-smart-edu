const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

const router=express.Router();

//root/categories/
router.route('/signup').post(authController.createUser);
router.route('/login').post(authController.loginUser);
router.route('/logout').get(authController.logoutUser);
//checks if the user is logged in- URL protection
router.route('/dashboard').get(authMiddleware,authController.getDashboardPage);

module.exports=router;