const User = require("./models/user");
const Role = require("./models/role");
const bcrypt = require("bcryptjs");
const {validationResult} = require("express-validator");
const jwt = require("jsonwebtoken");
const {secretKey} = require("./config");

const genAccessToken = (id, roles) => {
    const load = {
        id,
        roles
    }
    return jwt.sign(load, secretKey, {expiresIn: "1h"});
}

class authController
{
    async registration(req, res) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty())
            {
                return res.status(400).json({message: "Error while registration: ", errors});
            }
            const {username, password} = req.body;
            const newUser = await User.findOne({username});
            if (newUser)
            {
                res.status(400).json("Username is already used");
            }
            const hashPass = bcrypt.hashSync(password, 9);
            const userRole = await Role.findOne({value: "USER"});
            const user = new User({username, password: hashPass, roles: [userRole.value]});
            
            await user.save();
            return res.json({message: "User created"});
        } catch (e) {
            res.status(400).json("registration error")
            console.log(e);
        }
    }

    async login(req, res) {
        try {
            const {username, password} = req.body;
            const user = await User.findOne({username});
            if(!user)
            {
                res.status(404).json("User not found");
            }
            const validationPasswords = bcrypt.compareSync(password, user.password);
            if(!validationPasswords)
            {
                res.status(400).json("Password incorrect");
            }
            const token = genAccessToken(user._id, user.roles);
            return res.json({token});
        } catch (e) {
            res.status(400).json("login error")
            console.log(e);
        }
    }

    async users(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = new authController();