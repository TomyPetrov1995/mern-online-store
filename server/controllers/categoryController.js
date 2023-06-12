import Category from "../models/Category.js";

export const createCategory = async (req,res) => {
    try{
        if (!req.body) return res.json({message:"Пустые данные"});

        const {name} = req.body;
        const imageUrl = `${req.file.originalname}`;

        //FIND CREATED CATEGORY
        const createdCategory = await Category.findOne({name});
        if (createdCategory) return res.json({message : "Категория с таким названием существует"});

        //CREATE CATEGORY
        const category = await new Category({name,image : imageUrl});
        await category.save();
        res.json({category,message : "Категория удачно создана"})

    }catch (e) {
        console.log(e);
        res.json({message : "Не удалось создать категорию"})
    }
}

export const getAllCategories = async (req,res) => {
    try{
       const categories = await Category.find();
       if (!categories) return res.json({message : "Категории не найдены"})
        res.json({categories,message : "Категории найдены"})

    }catch (e) {
        console.log(e);
        res.json({message : "Категории не найдены"})
    }
}
export const getOneCategory = async (req,res) => {
    try{
        const category = await Category.findById({_id:req.params.id});

        if (!category) return res.json({message : "Категория не найдена"})
        res.json({category,message : "Категория найдена"})

    }catch (e) {
        console.log(e);
        res.json({message : "Категория не найдена"})
    }
}