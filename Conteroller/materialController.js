const factory = require('./../uti/refactory');
const Material = require('./../Model/materialModel')
const catchAsync = require('./../uti/catchAsync')

exports.AddMaterial = factory.createModel(Material);
exports.GetMaterials = factory.AllModels(Material);
exports.GetMaterial = factory.GetOne(Material);
exports.deleteMaterial = factory.deleteModel(Material);
exports.updateMaterial = factory.updateModel(Material);