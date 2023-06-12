import {check} from "express-validator";

export const registerValidation = [
    check("email").isEmail().withMessage("Должно быть email").trim().notEmpty().normalizeEmail(),
    check("password","пароль должен быть не меньше 5 символов").trim().isLength({min:8,max:20}),
    check("name").trim()
]