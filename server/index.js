import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import {config} from "dotenv";
import connection from "./config/db.js";
config();
import postRoutes from "./routes/post.js";
import userRouter from "./routes/user.js";

const app = express();
const port = process.env.PORT || 5000;


app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cors());

app.use("/posts",postRoutes);
app.use("/user",userRouter);


app.listen(port,async()=>{
    try {
        await connection;
        console.log(`Running on port http://localhost:${port} with mongodb`);
    } catch (error) {
        console.log(error.message);
    }
})
