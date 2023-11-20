const mongoose=require('mongoose')
const validator=require('validator')
const userSchema=mongoose.Schema({
    userName:{type:String, required:true},
    email:{
        type:String, 
        required:true, 
        validate(val){
            if(!validator.isEmail(val)){
                throw Error ('Not a Valid Email')
            }
        },
        unique:true 
    },
    gender:{type:String, required:true},
    status:{type:String, required:true, enum:['Active', 'In-Active']},
    dateCreated:Date,
    dateUpdated:Date
})
const UserModel=mongoose.model('user', userSchema)
module.exports=UserModel