class AppError extends Error{
    constructor(message , statusCode){
    super();
    this.message = message;
    this.statusCode = statusCode ;
    this.status = `${statusCode}`.startsWith('4') ? 'Fail' : 'error';
    this.isOpreational =true ;
    Error.captureStackTrace(this , this.constructor);

}
}

module.exports = AppError ;