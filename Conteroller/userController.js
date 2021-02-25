 const catchAsync = require('../uti/catchAsync');
const User = require('./../Model/userModel');
const factory = require('./../uti/refactory');
const {promisify} = require('util');
const jwt = require('jsonwebtoken');
const AppError = require('../uti/AppError');
const user = require('./../Model/userModel');
const sendEmail = require('./../Conteroller/email');
const grade = require('../Model/gradeModel');
const sendemail = require('./../Conteroller/email');

const signToken =id=>{
    return jwt.sign({id},process.env.SECRET_JWT,{
       expiresIn: process.env.JWT_TIMEEXPIRES
    });
}
createSendToken = catchAsync(async(model , status , res)=>{
    const token = signToken(model._id);
    res.cookie('jwt',token, {
        expires:new Date(Date.now() + process.env.JWT_COOKIE_TIMEEXPIRES*24*60*60*1000),
        // secure:true ,
        httpOnly:true
    })
    res.status(status).json({
        state:"success",
        token:token ,
        data:{doc:model}
    })
})




exports.signUp= catchAsync(async (req,res,next)=>{
const user = await User.create(req.body);

createSendToken(user,201,res);

});
// get users
exports.getUsers =factory.AllModels(User);
exports.getUser = factory.GetOne(User,{path:'grades'});
// search
exports.getManager = factory.GetModel(User, {role:'manager'});
exports.getStudents= factory.GetModel(User,{role:'student'});
exports.getTeacher= factory.GetModel(User,{role:'teacher'});
exports.getAll= factory.GetModel(User);






exports.logIn = catchAsync(async(req,res,next)=>{
    
    const {password , email} = req.body ;
    if(!password || !email) return next(new AppError("please provide a valid eamil and password", 401));

    const user = await User.findOne({email}).select('+password');
    
     if(!user || !(await user.correctPassword(password , user.password)) ){ 
        console.log(password, user.password);
        return next( new AppError("incorrect password or email",401));
}
     createSendToken(user,200,res)
})

exports.protect = catchAsync(async(req,res,next)=>{
    let token ;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token = req.headers.authorization.split(' ')[1];  
    }
     if(!token) return next(new AppError("not loggedin " ,401));
     
     const decoded = await promisify(jwt.verify)( token , process.env.SECRET_JWT);
    const currentuser =await user.findById(decoded.id);
    
    if(!currentuser) return next (new AppError("user is not found", 401));
    
    if(currentuser.timeChangePassword(decoded.iat))
    return next(new AppError("user recently changed his passwod" ,  401));
    req.user = currentuser ;
    
    next();
});
exports.restrictTo =(...roles)=>{
   return (req,res,next)=>{
       if(!roles.includes(req.user.role)){ 
       return next (new AppError("do not have permission to do this operation",403));
    }
       next();
   }
  
}
exports.forgotPassword = catchAsync(async(req,res,next)=>{
    const user = await User.findOne({email:req.body.email});
    if(!user)return next(new AppError("this email is not valid"),401);
    const resetToken =user.careatePasswordResetToken();
    await user.save({validateBeforeSave:false});

    const resetURL =`${req.protocol}://${req.get('host')}/school/api/users/resetpassword/${resetToken}`;

    const message = ` forgot your passwor ? submit a patch request`;

    await sendemail({
        email:user.email,
        subject :"youur password reset token last 10minut",
        message
    });
    res.status(200).json({
        state:'success',
        message:"Token sent to email"
    })
})