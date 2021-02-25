const express = require('express');
const materialController= require('./../Conteroller/materialController')
const userController= require('./../Conteroller/userController')
const profileController= require('./../Conteroller/profileController')

const router =express.Router();

router
.route('/').get(userController.protect,profileController.GetMe)
router
.route('/updateme').patch(userController.protect,profileController.updateUser)
router
.route('/deleteme').patch(userController.protect,profileController.deleteUser)


module.exports = router;