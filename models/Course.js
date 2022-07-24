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
    //foreign key: Çourse category
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    //foreign key: Creator Teacher
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
}
//instead of createdAt
// ,{timestamps:true}

);

CourseSchema.pre('validate',function (next) {
    //we have used 'function' instead of arrow in order to catch 'this'.
    this.slug=slugify(this.name,{
        lower:true,
        strict:true  //only strings.
    });
    next();  //jump to the next middleware.
})
//modeling:
const Course=mongoose.model('Course',CourseSchema);

//exporting
module.exports=Course;