import jwt from "jsonwebtoken";

export default async (req,res,next) =>{
    try {
        const token = (req.headers.authorization || "").replace(/^Bearer\s/,"");
        if (!token){
            return res.json({message : "Net dostupa"});
        }else {
            const decoded = jwt.verify(token,process.env.SECRET_KEY);
            req.user = decoded;
            next()
        }

    }catch (e) {
        console.log(e)
    }
}