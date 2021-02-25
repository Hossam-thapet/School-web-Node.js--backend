const express = require('express');
const studentController= require('./../Conteroller/studentController')
const userController = require('./../Conteroller/userController')
const materialController = require('./../Conteroller/materialController')
const router = express.Router();


router.route('/').get(userController.protect,userController.getAll)
router.route('/students').get(userController.getStudents);
router.route('/manager').get(userController.getManager);
router.route('/teachers').get(userController.getTeacher)


module.exports = router;