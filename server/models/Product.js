import {Schema,model} from "mongoose";

const productSchema = new Schema({
    title:{type:String,required:true,unique:true},
    price:{type:Number,required: true},
    description:{type:String,required:true},
    category:{type:Schema.Types.ObjectId,ref : "Category"},
    brand:{type:Schema.Types.ObjectId,ref:"Brand"},
    viewsCount:{type:Number,default:0},
    images:{type:Array}
},
    {timestamps:true});

export default model("Product",productSchema)