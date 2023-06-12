import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import path from "path";
import fs from "fs";
const generateToken = (email,id)=> {
    return jwt.sign({email,id},
        process.env.SECRET_KEY,
        {expiresIn: "24h"})
}
export const register = async (req,res) => {
    try{
        if (!req.body) return res.json({message:"Пустые данные"})

       let {email,password,name,role} = req.body;

        //compare email
        const candidate =await User.findOne({email});
        if (candidate) return res.json({message : "пользователь с таким именем существует"})

        //HASH PASSWORD
        const hashPassword = await bcrypt.hash(password,10);

        //CREATE USER
        const user = new User({email,password:hashPassword,name});
        await user.save();


        //CREATE TOKEN
        const token = await generateToken(email,user._id);

        res.json({
            token,
            user,
            message:"Регистрация прошла успешно."
        })

    }catch (e) {
        console.log(e);
        return res.json({message: "Пользователь не зарегистрирован"})
    }
}

export const login = async (req,res) => {

    try{
        if (!req.body) return res.json({message:"Net dannyx"})

        const {email,password} = req.body;

        //CREATE USER
        const user = await User.findOne({email});
        if (!user){
            return res.json({message : "Пользователь не найден"})
        }

        //COMPARE PASSWORD
        const comparePassword = await bcrypt.compare(password,user.password);
        if (!comparePassword){
            return res.json({message : "Доступ запрещен"})
        }

        const token = await generateToken(user.email,user.id);

        return res.json({token,user,message:"Авторизация прошла успешно"})

    }catch (e) {
        console.log(e);
        return res.json({message:"Ошибка авторизации"})
    }
}

export const check = async (req,res) => {
    try{
        //FIND USER
        const user = await User.findById({_id:req.user.id});


        if (!user) {
            return res.json({
                message: 'Такого юзера не существует.',
            })
        }

        //CREATE JWT
        const token = await generateToken(user.email,user.id);
        res.json({user,token})
    }catch (e) {
        console.log(e);
        res.json({ message: 'Нет доступа.' })
    }
}

export const updateUser = async (req,res) => {
    try{
        const{email,name,password,avatar} = req.body;

        let avatarUrl = `${req.file?.originalname}` || "fdsfs";

        console.log(avatarUrl)
        const currentUser = await User.findById({_id:req.user.id});


        const user = await User.findByIdAndUpdate({_id:req.user.id},
                {email, name,avatar:avatarUrl},
                {new : true});


        res.json({user,message:"Обновление прошло успешно"})

    }catch (e) {
        console.log(e);
        res.json({ message: 'Нет доступа.' })
    }
}