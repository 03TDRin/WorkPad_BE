const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const account = require("./API/Account.js");
const bcrypt = require("bcrypt");
const app = express();

mongoose.connect("mongodb+srv://TanPhuoc:11112222@pusen.7tdtd7c.mongodb.net/WorkPad?retryWrites=true&w=majority&appName=PUsen");

app.use(express.json());
app.use(cors())

const db = mongoose.connection;
db.once('open', () => {
    console.log('Kết nối MongoDB thành công');
});
app.use("/Account",account)
app.listen(9900, () => {
  console.log("Server is running!");
});