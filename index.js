//Importing modules
const express = require('express');
const app = express();
const dotenv = require("dotenv");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var cors = require('cors');
//Importing routes
const authRoute = require("./routes/auth");
const verify = require("./routes/verifyToken");
//Variables
const port = 3000;


//Config
dotenv.config();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
//cors
app.use(cors());

//connecting to db
mongoose.connect( process.env.DB_CONNECT, {useNewUrlParser: true, useUnifiedTopology: true}, () =>
    console.log("connected to DB")
);

//Index GET
app.get("/", (req, res) => {
    res.send("API running");
});



//Token test POST
app.post("/token-server", verify, async (req, res) => {
    res.json({ msg: req.user });
});




//middleware
app.use(express.json());
//Route middleware
app.use("/api/user", authRoute);


app.listen(port, () => console.log(`the server is running on port ${port}`));
