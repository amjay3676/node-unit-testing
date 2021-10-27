const express = require("express");
const User = require("../models/User");
const jwtoken = require("../utils/jsonWebToken");
const hashPassword = require("../utils/hashPassword");
const auth = require("../middleware/auth");
const CustomException = require("../utils/customException");
const router = express.Router();

// @route  POST api/user/register
// @desc   register new user or signin new users
// @access public
router.post("/register", async (req, res) => {
    const { email, password, phone } = req.body;
    try {
        //check if user exist
        const isUserExist = await User.findOne({ email });
        if(isUserExist){
            return res.status(400).json({
                Message: "This email is already registered"
            })
        }
        //hash the password
        let hash = hashPassword.encryptPassword(password);
        let user =  new User({
            email,
            password: hash,
            phone,
        });
        //create token
        const payload = {
            userId : user._id,
            email,
        };
        let token = jwtoken.createJWT(payload);
        console.log(token);
        console.log("check2");
        user.token = token;
        await user.save();

        return res.status(200).json(user);
    } catch (err) {
        return res.status(401).json(err);
    }
})

module.exports = router;