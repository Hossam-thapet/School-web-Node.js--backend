const express = require ('express');
const mongoose = require ('mongoose');
const dotenv= require('dotenv')
const userRouter = require('./Routes/userRoute');
const searchRouter = require('./Routes/searchRoute');
const materialRouter = require('./Routes/materialRoute');
const staticsRouter = require('./Routes/staticsRoute');
const gradeRoute = require('./Routes/gradeRoute');
const profileRoute = require('./Routes/profileRoute');
const AppError = require ('./uti/AppError');
const globalHandleerror = require('./Conteroller/errController');



const app = express();
app.use(express.json());
dotenv.config({path:'./data.env'});
const DB = process.env.DATABASE.replace('<password>',process.env.DATABASE_PASSWORD);
mongoose.connect(DB, {
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false,
    useUnifiedTopology: true 
}).then(()=>{
    console.log("Connected to Data-Base")
})
const port = 3000;
app.listen(port , ()=>{
    console.log("Connected to the server")
});
console.log(process.env.NODE_ENV);
app.use('/school/api/users',userRouter);
app.use('/school/api/search',searchRouter);
app.use('/school/api/grade',gradeRoute);
app.use('/school/api/material',materialRouter);
app.use('/school/api/statics',staticsRouter);

app.use('/school/api/profile',profileRoute);


app.all('*',(req,res,next)=>{
    next(new AppError(`this path is not defined ${req.originalUrl}`, 500 ));
});
app.use(globalHandleerror);

module.exports = app ;