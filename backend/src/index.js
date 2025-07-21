import dotenv from "dotenv";
import connectDB from "./db/index.js";
import app from './app.js';

dotenv.config({ path: './.env' });  // explicitly mention if inside src

//for debugging -> i did this
// console.log("CLOUDINARY KEY:", process.env.CLOUDINARY_API_KEY);

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`Server is running at PORT : ${process.env.PORT}`);
    });
})
.catch((err)=>{
    console.log("MONGO_DB connection failed !!! ", err);
});

