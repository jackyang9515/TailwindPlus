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
    await userSchema.find({}, (err, users) => {
        if (err) {
            console.log(err);
        } else {
            res.status(200).json(users);
        }
    });


});

app.listen(port, () => {
    // perform a database connection when server starts
    console.log(`Server is running on port: ${port}`);
});