const express = require('express');
const studentController= require('./../Conteroller/studentController')
const userController = require('./../Conteroller/userController')
const materialController = require('./../Conteroller/materialController')
const gradeController = require('./../Conteroller/gradeController')
const router = express.Router();


router.route('/a').get(userController.protect,userController.restrictTo('manager','teacher'),gradeController.statics_A)
router.route('/b').get(userController.protect,userController.restrictTo('manager','teacher'),gradeController.statics_B)
router.route('/c').get(userController.protect,userController.restrictTo('manager','teacher'),gradeController.statics_C)
router.route('/d').get(userController.protect,userController.restrictTo('manager','teacher'),gradeController.statics_D)
router.route('/f').get(userController.protect,userController.restrictTo('manager','teacher'),gradeController.statics_F)
router.route('/success').get(userController.protect,userController.restrictTo('manager','teacher'),gradeController.statics_success)


module.exports = router;