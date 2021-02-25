const express = require('express')
const userController = require('./../Conteroller/userController')

const router = express.Router();

router.route('/forgotpassword')
.post(userController.forgotPassword)
// router.route('/resetpassword')
// .patch(userController.resetPassword)

router.route('/signup')
.post(userController.signUp)

router.route('/login')
.post(userController.logIn)

router.route('/').get(userController.getUsers)
router
.route('/:id')
.get(userController.getUser)

module.exports= router;