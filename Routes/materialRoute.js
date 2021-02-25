const express = require('express');
const materialController= require('./../Conteroller/materialController')
const userController= require('./../Conteroller/userController')

const router =express.Router();

router
.route('/')
.post(userController.protect,userController.restrictTo('manager'),materialController.AddMaterial)
.get(materialController.GetMaterials)

router
.route('/:id')
.get(materialController.GetMaterial)
.delete(userController.protect,userController.restrictTo('manager'),materialController.deleteMaterial)
.patch(userController.protect,userController.restrictTo('manager'),materialController.updateMaterial)


module.exports = router;