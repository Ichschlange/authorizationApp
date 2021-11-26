const express = require("express");
const mongoose = require("mongoose");
const router = require("./authRouter");

const app = express();
const PORT = process.env.PORT || 3000;
const mongo_URL = "mongodb+srv:/";

app.use(express.json());
app.use("/auth", router);

const start = async() => {
    try{
        await mongoose.connect(mongo_URL);
        app.listen(PORT, () => {
            console.log("Server started on " + PORT);
        });
    } catch(e){
        console.log(e);
    }
}

start();