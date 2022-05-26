require("dotenv").config();
const express = require('express');
const app = express();
const MongoStore = require('connect-mongo');
var cors = require('cors');
const port = 8000 || process.env.PORT;
const session = require('express-session');
const db = require('./config/mongoose');
app.use(cors());
app.use(express.urlencoded());
const router = require("./routes/index.js");
app.use(session({
    name: 'login_form',
    // TODO change the secret before deployment in production mode
    secret: 'blahsomething123456',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create({
        mongoUrl: process.env.DB,
    
    })
}));
app.use("/",router);
app.listen(port, function(err){
    if(err){
        console.log(err);
    }
    else {
        console.log("Server listening at port", port);
    }
})