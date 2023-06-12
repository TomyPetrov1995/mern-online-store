import Product from "../models/Product.js";
export const createProduct = async (req,res) => {
    try{
        if (!req.body) return res.json({message:"Пустые данные"});

        let images = [];
        const {title,price,description,category,brand} = req.body;
        const imageUrl = `${req.file.originalname}`;
        await images.push(imageUrl)

        //FIND CREATED PRODUCT
        const createdProduct = await Product.findOne({title});
        if (createdProduct) return res.json({message : "Продукт с таким названием существует"});

        //CREATE PRODUCT
        const product = await new Product({title,price,description,category,brand,images});
        await product.save();
        return  res.json({product,message : "Продукт удачно создана"})
    }catch (e) {
        console.log(e);
        res.json({message : "Не удалось создать Продукт"})
    }
}

export const getAllProducts = async (req,res) => {
    try{

        const products = await Product.find().populate("category").populate("brand").exec();

        if (!products) return res.json({message : "Продукты не найдены"});

        return  res.json({products})
    }catch (e) {
        console.log(e);
        res.json({message : "Продукты не найдены"})
    }
}

export const getOneProduct = async (req,res) => {
    try{
        const product = await Product.findByIdAndUpdate(
            {_id:req.params.id},
            {$inc : {viewsCount :1}},
            {returnDocument : "after"}).populate("category").populate("brand").exec()

        if (!product) return res.json({message : "Продукт не найден"});

        return  res.json({product})
    }catch (e) {
        console.log(e);
        res.json({message : "Продукт не найден"})
    }
}

export const updateProduct =  async (req,res) => {
    try{
        if (!req.body) return res.json({message:"Пустые данные"});
        const imageUrl = `${req.file.originalname}`;

        const product = await Product.findByIdAndUpdate(
            {_id:req.params.id},
            {$push : {images : imageUrl}},
            {returnDocument : "after"}
        );

        return  res.json({product,message : "Продукт найден"})
    }catch (e) {
        console.log(e);
        res.json({message : "Продукт не найден"})
    }
}

