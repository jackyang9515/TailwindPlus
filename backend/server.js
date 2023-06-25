import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import config from "./config.js";
import userSchema from "./structure/userStructure.js";

mongoose.set('strictQuery', false);
mongoose.connect(config.MONGODB_URL, { useNewUrlParser: true }, () => {
  console.log("Start to connect to MongoDB!");
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

const app = express(); 
const port = config.PORT;

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
    await db.collection("Cars").insertOne({username: "Jack2", password: "123", email: "jack123@gmail.com"});
    db.collection("Cars", function(err, collection){
        collection.find().toArray(function(err, data){
            console.log(data); // it will print your collection data
        })
    });
    await userSchema.find().then((data) => {
        res.send(data);
    });

});

app.listen(port, () => {
    // perform a database connection when server starts
    console.log(`Server is running on port: ${port}`);
});