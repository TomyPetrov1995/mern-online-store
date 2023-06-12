import Category from "../models/Category.js";
import Brand from "../models/Brand.js";

export const createBrand = async (req,res) => {
    try{
        if (!req.body) return res.json({message:"Пустые данные"});
        const{name,category} = req.body;

        //FIND CATEGORY
        const currentCategory = await Category.findById({_id:category});

        //FIND CREATED BRAND
        const createdBrand = await Brand.findOne({name});
        if (createdBrand) return res.json({message : "Бренд с таким названием существует"});

        // //CREATE CATEGORY
        const brand = await new Brand({name,category:currentCategory._id});
        await brand.save();

        res.json({brand,message : "Бренд удачно создана"})
    }catch (e) {
        console.log(e);
        res.json({message : "Не удалось создать бренд"})
    }
}

export const getAllBrands = async (req,res) => {
    try{
        const brands = await Brand.find().populate("category").exec();
        if (!brands) return res.json({message : "Бренды не найдены"})
        res.json({brands,message : "Бренды найдены"})

    }catch (e) {
        console.log(e);
        res.json({message : "Бренды не найдены"})
    }
}

export const getOneBrand = async (req,res) => {
    try{
        const brand = await Brand.findById({_id:req.params.id}).populate("category").exec();

        if (!brand) return res.json({message : "Бренд не найдена"})
        res.json({brand,message : "Бренд найдена"})
    }catch (e) {
        console.log(e);
        res.json({message : "Бренд не найдена"})
    }
}