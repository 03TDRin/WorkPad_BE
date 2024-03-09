const uri = require("express").Router();
const bcrypt = require("bcrypt");
const Account = require("../Model/AccountModel.js")
const e = require("express");

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
        const userEmail = req.body.email;

        if (!userEmail) {
            return res.status(400).json({ Status: "Fault" });
        }

        const account = await Account.findOne({ Email: userEmail });

        if (account) {
            return res.json({ Status: "Success", Name: account.Name });
        } else {
            return res.status(404).json({ Status: "Not Found" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ Status: "Fault" });
    }
});

uri.post('/update_prioritize', async (req, res) => {
    try {
        const { id, newPrioritize } = req.body;
        if (!id || newPrioritize === undefined) {
            return res.status(400).json({ Status: 'Fault'});
        }

        const account = await Account.findOneAndUpdate(
            { 'Notes._id': id },
            { $set: { 'Notes.$.Prioritize': newPrioritize } },
            { new: true }
        );

        if (account) {
            return res.json({ Status: 'Success' });
        } else {
            return res.status(404).json({ Status: 'Not Found' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ Status: 'Fault' });
    }
});

uri.post('/update_title', async (req, res) => {
    try {
        const { id, newTitle } = req.body;
        if (!id || !newTitle) {
            return res.status(400).json({ Status: 'Fault' });
        }

        const account = await Account.findOneAndUpdate(
            { 'Notes._id': id },
            { $set: { 'Notes.$.Title': newTitle } },
            { new: true }
        );

        if (account) {
            return res.json({ Status: 'Success'});
        } else {
            return res.status(404).json({ Status: 'Not Found' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ Status: 'Fault' });
    }
});

module.exports = uri;