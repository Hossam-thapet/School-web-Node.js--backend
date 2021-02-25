const crybto = require('crypto')
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true , "you must have a name"] ,
        minlength:[2 , "name must be more than 2 characters"],
        maxlength: [20 , "name must be less than 10 characters"],
        trim:true
    } ,
   
    email:{
        type:String,
        required:[true , "you must input your email"],
        validate:[validator.isEmail,"email is not valid"]

    },
    photo:String,
    password:{
        type:String,
        minlength: [8,"too short password"],
        required: [ true , "you must input your password"],
    },
    confirm:{
        type:String,
        required:[true , "confirm your password"],
        validate : {validator:function(el){
            return el=== this.password;
        },
        message: "password and confirm are not the same !!"
        },
    },
    active:{
        type:Boolean,
        default:true ,
    },
    role :{
        type:String,
        enum:['student', 'teacher', 'manager'],
        default:'student'
    },
    
    changePasswordAfter:Date ,
    passwordResetToken:String,
    resetTokenExpierd:Date,
   
        },
        {
            toJSON:{virtuals:true},
            toObject:{virtuals:true},
        }
        );

userSchema.virtual('grades',{
    ref:'grade',
    foreignField:'student',
    localField:'_id'
})

// userSchema.pre(/^find/,function(next){
//     this
// })

userSchema.pre('save', async function(next){
    if(!this.isModified('password'))return next();
    this.password = await bcrypt.hash(this.password, 10)
    this.confirm = undefined ;
});
userSchema.methods.correctPassword=async function(givenPassword , userPassword){
   return await bcrypt.compare(givenPassword,userPassword)
}
userSchema.methods.timeChangePassword= function(JWTTimeStamp){
    if(this.changePasswordAfter){
        console.log(JWTTimeStamp);
        const changeTimeStamp = parseInt(this.changePasswordAfter.getTime()/1000 ,10);
        console.log(JWTTimeStamp , changeTimeStamp);
        return  JWTTimeStamp < changeTimeStamp
    }
    return false ;
}
userSchema.methods.careatePasswordResetToken= function(){
    const resetToken = crybto.randomBytes(32).toString('hex');

    this.passwordResetToken = crybto.createHash('sha256').update(resetToken).digest('hex');
    this.passwordResetExpired = Date.now()+10*60*1000 ;
    console.log(resetToken , this.passwordResetToken)
    return resetToken;
}

userSchema.pre(/^find/,function(next){
    this.find({active:{$ne:false}});
    next();
})

const user = mongoose.model('user',userSchema);
module.exports = user ;