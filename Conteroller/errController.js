const AppError = require('./../uti/AppError')


const handleCastError= err=>{
    const message = `not a valid id ${err.value} `;
    return new AppError(message,404)
}
const handleValidatorError = err=>{
    const errors = Object.values(err.errors).map(el=>el.message);
    const message = `Invalid input ${errors.join(', ')}`
return new AppError(message, 401);
}

const cliError=(err,res) => {
    console.log("operattional")
    if(err.isOpreational){
    res.status(err.statusCode).json({
    state:err.status ,
    message :err.message
});
}else{
    console.log("not operational")
    res.status(500).json({
        state:"failed" ,
        message :"something went very"
});
}
}
const DevError=(err,res)=> { 
     res.status(err.statusCode).json({
    state:err.status,
    error:err ,
    message:err.message,
    stack :err.stack
});
}
module.exports = (err,req,res,next)=>{
   err.statusCode = err.statusCode || 500 ;
    err.status = err.status ||"error";
    if(process.env.NODE_ENV === "development"){
      
        console.log(err.name);
    DevError(err,res);
    }
    else if (process.env.NODE_ENV !== "development"){ 
       let error = {...err}
          console.log(err);  
          if(err.name === 'CastError') error = handleCastError(error);
          if(err.name === 'ValidationError') error = handleValidatorError(error);
           
        cliError(error,res);
    }
}