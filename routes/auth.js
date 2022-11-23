const router = require("express").Router();
const User = require("../models/User"); 
const CryptoJS = require("crypto-js");


//REGISTER
router.post("/register", async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        //password: req.body.password, //normal password req
        password: CryptoJS.AES.encrypt(
            req.body.password, 
            process.env.PASS_SEC
        ).toString(), //encrypt password
    });
    
    try {
        const saveUser = await newUser.save();
        res.status(201).json(saveUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

//LOG IN
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        !user && res.status(401).json("Wrong Credentials!")

        const hashPassword = CryptoJS.AES.decrypt(
            user.password, 
            process.env.PASS_SEC
        );
        const originalpassword = hashPassword.toString(CryptoJS.enc.Utf8);

        originalpassword !== req.body.password && res.status(401).json("Wrong Credentials!");

        const { password, ...others } = user;

        res.status(200).json(others);
    } catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;