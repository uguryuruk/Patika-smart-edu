const express = require('express');
const {body} = require('express-validator');
//internal
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const User = require('../models/User');

const router=express.Router();

//root/users/
//data validation for register
/**
 * Name should not be empty
 * Email should be unique
 * Email should be email format
 * password should not be empty
 * TODO: add role validator-does not work now :)
 */
router.route('/signup').post([
body('name').not().isEmpty().withMessage('Please Enter Your Name'),
body('role').not().isIn(['student','teacher']).withMessage('Please enter a valid role'),
body('email').isEmail().withMessage('Please Enter a Valid Email')
.custom((userEmail) => {
    //asynce çevirmek gerekebilir.
    return User.findOne({email:userEmail}).then((user) => {
        if(user){
            return Promise.reject('Email is already exists!');
        }
    })
    
}),
body('password').not().isEmpty().withMessage('Please Enter a Password'),



],authController.createUser);
router.route('/login').post(authController.loginUser);
router.route('/logout').get(authController.logoutUser);
router.route('/:id').delete(authController.logoutUser);
//checks if the user is logged in- URL protection
router.route('/dashboard').get(authMiddleware,authController.getDashboardPage);

module.exports=router;