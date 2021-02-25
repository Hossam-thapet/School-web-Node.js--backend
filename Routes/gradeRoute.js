const express = require('express');
const gradeController = require('./../Conteroller/gradeController');

const userController = require('./../Conteroller/userController');

const router = express.Router();

router.get('/',userController.protect,userController.restrictTo('teacher','manager'), gradeController.GetGrades);
router.post('/put',userController.protect,userController.restrictTo('teacher'), gradeController.putGrade);
router
.route('/:id')
.get(userController.protect,userController.restrictTo('teacher'), gradeController.GetGrade)
.patch(userController.protect,userController.restrictTo('teacher'), gradeController.updateGrade)
.delete(userController.protect,userController.restrictTo('teacher'), gradeController.deleteGrade);

module.exports = router;