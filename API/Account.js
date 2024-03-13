const uri = require("express").Router();
const bcrypt = require("bcrypt");
const Account = require("../Model/AccountModel.js")
const e = require("express");
const NoteModel = require("../Model/NoteModel.js");

const HashPassword = async (Password) => {
    const Hash = await bcrypt.hash(Password, 10);
    return Hash;
  };
  
  const ComparePassword = async (Password, PasswordHash) => {
    const isMath = await bcrypt.compare(Password, PasswordHash);
    return isMath;
  };

uri.post("/Signup", async (req, res) =>{
const NewAccount = new Account({
    Name: req.body.Name,
    Email: req.body.Email,
    Password: await HashPassword(req.body.Password),
  });
  res.send(NewAccount);
  await NewAccount.save();
});

uri.post('/login', async (req, res) => {
    try {
        const userEmail = req.body.email;
        const userPassword = req.body.password;

        const user = await Account.findOne({ Email: userEmail });

        if (!user) {

            return res.json({ Status: 'Wrong Email' });
        }
        const isPasswordValid = await bcrypt.compare(userPassword, user.password);

        if (isPasswordValid) {
            return res.json({ Status: 'Success' });
        } else {
            return res.json({ Status: 'Wrong Password' });
        }
    } catch (error) {
        console.error(error);
        return res.json({ Status: 'Fault' });
    }
});

uri.post('/get_user_info', async (req, res) => {
    try {
        console.log(req.body.email);
        const account = await Account.findOne({ Email: req.body.email });
        if (account) {
            return res.json({ Status: "Success", Name: account.Name });
        } else {
            return res.json({ Status: "Not Found" });
        }
    } catch (error) {
        console.error(error);
        return res.json({ Status: "Fault" });
    }
});

uri.post('/get_user_notes', async (req, res) => {
    const NoteForEmail = await NoteModel.find({ EmailCreate: req.body.Email})
    if(!NoteForEmail || NoteForEmail.length === 0){
        res.json ({Status :"Not Found"})
    }else{
        res.json(NoteForEmail)
    }
});

uri.post('/update_prioritize', async (req, res) => {
        const account = await Notes.updateOne(
            { _id: req.body.id },
            { $set: {Prioritize: res.body.newPrioritize } },
        );
        return res.json({Status : "Success"});
});

uri.post('/update_title', async (req, res) => {
        const account = await Notes.updateOne(
            { _id: req.body.id },
            { $set: {Title: res.body.newTitle } },
        );  
        return res.json({Status : "Success"})
});

module.exports = uri;