require("dotenv").config();
const express = require("express");
const connect = require("./config/db");

const { login, register,verify } = require("./controllers/auth.controller");

const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());



app.post("/login", login);
app.post("/register", register);
app.get("/confirm/:token", verify);

app.listen(5000, async () => {
  try {
    await connect()
    console.log("listening on port 5000.....");
  } catch (err) {
    console.log(err);
  }
});
