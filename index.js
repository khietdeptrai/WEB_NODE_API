const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user")

dotenv.config();

//Add mongodb database
//Add into .env file for reduce length of code when add mongodb link
//MongoDB link format: NameDatabase-Pass-Server-NameCollection
mongoose
.connect(process.env.MONGO_URL)
.then(()=>console.log("Database Connect Successfull!"))
.catch((err) => {
    console.log(err);
});

app.use(express.json());
app.use("/api/users", userRoute);

app.listen(process.env.PORT || 3000, () => {
    console.log("Backend server is running!");
});