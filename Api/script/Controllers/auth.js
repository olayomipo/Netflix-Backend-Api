"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUser = exports.PostUser = void 0;
const tslib_1 = require("tslib");
const User_1 = (0, tslib_1.__importDefault)(require("../models/User"));
const crypto_js_1 = require("crypto-js");
const jsonwebtoken_1 = require("jsonwebtoken");
let PostUser = async (req, res, next) => {
    const newUser = new User_1.default({
        username: req.body.username,
        email: req.body.email,
        password: crypto_js_1.AES.encrypt(req.body.password, process.env.AEC_KEY).toString()
    });
    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
exports.PostUser = PostUser;
let LoginUser = async (req, res, next) => {
    try {
        const user = await User_1.default.findOne({ username: req.body.username });
        !user && res.status(401).json(" Wrong Password or username! ");
        const hashedPassword = crypto_js_1.AES.decrypt(user.password, process.env.AEC_KEY);
        const paxxword = hashedPassword.toString(crypto_js_1.enc.Utf8);
        paxxword !== req.body.password &&
            res.status(401).json(" Wrong Credentials! ");
        const accessToken = (0, jsonwebtoken_1.sign)({
            id: user._id,
            isAdmin: user.isAdmin
        }, process.env.JWT_KEY, { expiresIn: "5d" });
        const { password, ...others } = user._doc;
        res.status(200).json({ ...others, accessToken });
    }
    catch (err) {
        res.status(500).json(err);
    }
};
exports.LoginUser = LoginUser;
