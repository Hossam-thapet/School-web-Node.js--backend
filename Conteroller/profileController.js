const User = require('./../Model/userModel')
const catchAsync = require('./../uti/catchAsync')
const AppError = require('./../uti/AppError')
const factory = require ('./../uti/refactory')



const filetrObj = (obj, ...fields)=>{
    const newObj = {};
    Object.keys(obj).forEach(el=>{
    if(fields.includes(el)) newObj[el]= obj[el];
   
})
return newObj ;
} 


exports.GetMe = catchAsync(async(req,res,next)=>{
    const user = await User.findById(req.user.id);
    if (!user)return next (new AppError('login or Sign Up if you have no accunt',401));
    res.status(200).json({
        state:"success",
        data:{user:user}
    })
})

exports.updateUser= catchAsync(async (req,res,next)=>{
    theFilter = filetrObj(req.body,'name','email')
   const user = await User.findByIdAndUpdate(req.user.id,theFilter,
       {new:true ,runValidators:true});
       console.log(theFilter);
       res.status(200).json({
           state:"success",
           data:{user:user}
       })
});

exports.deleteUser= factory.deleteModel(User);