const mongoose = require('mongoose');
const gradeSchema = new mongoose.Schema({

arabic:{
        type:Number,
        required:[true , "input arabic grade"],
        max: [50,"grade must be less than or equal 50 "],
        min:[0, "grade must be more or equal 0"],
        message:"must input grade of material" },
        
        english:{
        type:Number,
        required:[true , "input english grade"],
        max: [50,"grade must be less than or equal 50 "],
        min:[0, "grade must be more or equal 0"],
        message:"must input grade of material" },

        math:{
        type:Number,
        required:[true , "input math grade"],
        max: [50,"grade must be less than or equal 50 "],
        min:[0, "grade must be more or equal 0"],
        message:"must input grade of material" },

        bio:{
        type:Number,
        required:[true , "input bio grade"],
        max: [50,"grade must be less than or equal 50 "],
        min:[0, "grade must be more or equal 0"],
        message:"must input grade of material" },
        
        chemistry:{
        type:Number,
        required:[true , "input chemistry grade"],
        max: [50,"grade must be less than or equal 50 "],
        min:[0, "grade must be more or equal 0"],
        message:"must input grade of material" },

        total:Number,
        student:{
                type:mongoose.Schema.ObjectId,
                ref:'user',
                required:[true , "you must input the student id"]
                },
        },
        {
        toJSON:{virtuals:true},
        toObject:{virtuals:true}
        }
      );

gradeSchema.pre(/^find/,function(next){
        this.populate({
                path:'student',
                select:'name'
        });
        next();
});


gradeSchema.pre('save', function(){
        const total = this.arabic+this.math+this.bio+this.chemistry+this.english;
        const persentage = (total*100/250) ;
        return this.total =persentage;
})
gradeSchema.virtual ('the-grade').get(function(){
   const total = this.total;
  
  if(total < 50) return "F" ;
  if(total >= 50 || total < 65) return "D" 
  if(total >= 65 || total < 75) return "C"
  if(total >= 75 || total < 85) return "B"  
  if(total >= 85 || total < 100) return "A" 
     
 });

const grade = mongoose.model('grade',gradeSchema);
module.exports = grade;