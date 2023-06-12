import {Schema,model} from "mongoose";

const BasketProductSchema = new Schema({
    basket :{type:Schema.Types.ObjectId,ref : "Basket"},

})