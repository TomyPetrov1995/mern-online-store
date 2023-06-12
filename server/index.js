import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import router from "./routes/index.js";

const app = express();
const PORT = process.env.PORT || 5001;

//MIDDLEWARES
app.use(express.json());
app.use(express.static("uploads"));
app.use(cors());


//ROUTES
app.use("/api",router);
app.use("/uploads",express.static("uploads"));

const start = async ()=>{
    try {
        await mongoose.connect(process.env.DB_NAME)
            .then(() => console.log("DB ok"))
            .catch(e => console.log(e.message))
        app.listen(PORT,err => {
            if (err) throw err;
            console.log(`Server started on ${PORT} port`)
        })
    }catch (e){
        console.log(e)
    }
}
start()