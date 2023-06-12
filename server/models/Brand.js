import {Schema,model} from "mongoose";

const brandSchema = new Schema({
    name :{type :String,required:true,unique:true},
    category:{type :Schema.Types.ObjectId,ref:"Category"}
},{
    timestamps:true
});

export default model("Brand",brandSchema);