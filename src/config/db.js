const mongoose = require("mongoose");
require('dotenv').config()


module.exports = ()=>{
   return mongoose.connect('mongodb://0.0.0.0:27017/');
}