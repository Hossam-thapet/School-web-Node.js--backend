const catchAsync = require('./catchAsync');
const AppError = require('./AppError');
const { Model } = require('mongoose');





exports.GetModel = (Model , option)=>catchAsync(async(req,res,next)=>{
    let queryModel = Model.find();
    if(option) queryModel = Model.find(option);
    const doc = await queryModel ;
    if (!doc) return next(new AppError("no result ", 200));
    res.status(200).json({
        state:"success",
        items : doc.length,
        data:{doc}
    })
});
exports.createModel= Model =>catchAsync(async(req,res,next)=>{
    if(!req.body.user) req.body.user= req.user.id ;
    const doc = await Model.create(req.body);
    res.status(201).json({
        state:"success",
        data:{doc:doc}
    })
});

exports.AllModels= (Model,Options )=>catchAsync(async(req,res,next)=>{
    console.log("here")
    let query =  Model.find();
    if(Options)  query = query.populate(Options);
    const doc = await query ;
    
    res.status(200).json({
        state:"success",
        items:doc.length,
        data:{doc:doc}
    });
});

exports.GetOne = (Model,Options)=>catchAsync(async(req,res,next)=>{
    console.log("not here")
    let query = Model.findById(req.params.id);
    if(Options) query = query.populate(Options);
    const doc = await query
    res.status(200).json({
        state:"success",
        data:{doc:doc}
    });


});

exports.deleteModel = Model=>catchAsync(async(req,res,next)=>{
    const doc = await Model.findByIdAndUpdate(req.params.id, {active:false},{
        new:true
    });
    res.status(204).json({
        state:"success",
        data: {doc:doc}
    });
});

exports.updateModel = Model=>catchAsync(async(req,res,next)=>{
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body,{
        new:true,
        runValidators:true
    });
    res.status(200).json({
        state:"success",
        data: {doc:doc}
    });
});

exports.Statics =(Model,Option) =>catchAsync(async(req,res,next)=>{
    const statics = await Model.aggregate([
        {
            $match:{total:Option}
        }
    ]);
    res.status(200).json({
        state:"success",
        items:statics.length,
        data:{doc:statics}
    })
    });

