import {Schema,model} from "mongoose";

const userSchema = new Schema({
    email:{type:String,unique:true,required:true},
    password:{type:String,required: true},
    name:{type:String,unique:true,required:true},
    role:{type:String,default:"user"},
    avatar:{type:String,default: ""}
});

export default model("User",userSchema);