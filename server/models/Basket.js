import {Schema,model} from "mongoose";

const basketSchema = new Schema({
    user:{type : Schema.Types.ObjectId,ref : "User"},
    products : {type: []}
},
    {timestamps :true});

export default model("Basket",basketSchema)