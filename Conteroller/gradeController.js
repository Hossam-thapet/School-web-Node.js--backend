const factory = require('./../uti/refactory');
const catchAsync= require('./../uti/catchAsync');
const grade = require('./../Model/gradeModel');
const refactory = require('./../uti/refactory')



exports.putGrade=refactory.createModel(grade);
exports.GetGrades = factory.AllModels(grade);
exports.GetGrade = factory.GetOne(grade);
exports.deleteGrade = factory.deleteModel(grade);
exports.updateGrade = factory.updateModel(grade)

exports.statics_F=factory.Statics(grade,{$lt:50})
exports.statics_D=factory.Statics(grade,{$gte: 50, $lt: 65})
exports.statics_C=factory.Statics(grade,{$gte: 65, $lt: 75})
exports.statics_B=factory.Statics(grade,{$gte: 75, $lt: 85})
exports.statics_A=factory.Statics(grade,{$gte: 85, $lte: 100})
exports.statics_success=factory.Statics(grade,{$gte: 50, $lte: 100})


