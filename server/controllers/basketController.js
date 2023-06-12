import Basket from "../models/Basket.js";

export const create = async (req,res) => {
    try{
        const products = [];
        const basket = await new Basket({user : req.user.id,products});
        await basket.save();

        res.json(basket)
    }catch (e) {
        console.log(e)
    }
}

export const getBasket = async (req,res) => {
    try{
        const basket = await Basket.findOne({user : req.user.id}).populate("user").exec();

        res.json({basket})
    }catch (e) {
        console.log(e)
    }
}

export const addProduct = async (req,res) => {
    try{
        const product = req.body;

        //Get current BASKET
        const currentBasket = await Basket.findOne({user:req.user.id});

        const currentProduct =await currentBasket.products.find(({_id}) => _id === product._id );

        if (currentProduct){
            return res.json({basket:currentBasket,message : "Товар уже добавлен в корзину"})
        }

        let basket = await Basket.findOneAndUpdate({user : req.user.id},
            // {products : []},
            {$push : {products : product}},
            {returnDocument : "after"});
        return res.json({basket,message : "Товар добавлен в корзину"})
    }catch (e) {
        console.log(e)
    }
}


export const updateProduct = async (req,res) => {
    try{
        const product = req.body;

        //Get current BASKET
        const currentBasket = await Basket.findOne({user:req.user.id});
        //GET CURRENT PRODUCT BY ID
        const currentProduct =await currentBasket.products.find(({_id}) => _id === product._id );

        //FIND INDEX TO currentBasket
        const index = await currentBasket.products.indexOf(currentProduct);

        //ADD ALL PRICE IN PRODUCT
        const allPrice =await product.quantity * product.price;
        product["allPrice"] = allPrice;

        //REPLACE PRODUCT BY INDEX
        currentBasket.products[index] = product;

        let basket = await Basket.findOneAndUpdate({user : req.user.id},
            {products : currentBasket.products},
            {returnDocument : "after"});

        return res.json({basket,product,message : "Товар добавлен в корзину"})
    }catch (e) {
        console.log(e)
    }
}
export const removeProduct = async (req,res) => {
    try{
        //FIND CURRENT BASKET
        const basket = await Basket.findOne({user : req.user.id});


        //REMOVE PRODUCT
        const updateProducts = await basket.products.filter((item) => item._id !== req.params.id);

        //UPDATE BASKET
        const updateBasket = await Basket.findOneAndUpdate({user : req.user.id},
            {products:updateProducts},
            {returnDocument : "after"});


        res.json({basket : updateBasket})
    }catch (e) {
        console.log(e)
    }
}