const mongoose = require('mongoose');
const Schema=mongoose.Schema;
const slugify = require('slugify');

const CourseSchema = new Schema({
    name: {
        type: String,
        unique:true,
        required:true
    },
    description: {
        type: String,
        required:true,
        trim:true,
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    slug:{
        type:String,
        unique:true,
    },
    //foreign key:
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }
});

CourseSchema.pre('validate',function (next) {
    //this leri yakalamak için function kullandık.
    this.slug=slugify(this.name,{
        lower:true,
        strict:true  //sadece string karakterleri alır.
    });
    next();  //sıradaki middleware geçer.
})
//modele çevirme:
const Course=mongoose.model('Course',CourseSchema);

//exporting
module.exports=Course;