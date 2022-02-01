"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStats = exports.FindAllUser = exports.FindUserById = exports.DeleteUser = exports.UpdateUser = void 0;
const tslib_1 = require("tslib");
const crypto_js_1 = require("crypto-js");
const User_1 = (0, tslib_1.__importDefault)(require("../models/User"));
let UpdateUser = async (req, res, next) => {
    if (req.body.password) {
        req.body.password = crypto_js_1.AES.encrypt(req.body.password, process.env.AEC_KEY).toString();
    }
    try {
        const updatedUser = await User_1.default.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, { new: true });
        res.status(200).send(updatedUser);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
exports.UpdateUser = UpdateUser;
let DeleteUser = async (req, res, next) => {
    try {
        await User_1.default.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted !");
    }
    catch (err) {
        res.status(500).json(err);
    }
};
exports.DeleteUser = DeleteUser;
let FindUserById = async (req, res, next) => {
    try {
        let user = await User_1.default.findById(req.params.id);
        !user;
        res.status(400).json("Invalid User");
        res.status(200).json(user);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
exports.FindUserById = FindUserById;
let FindAllUser = async (req, res, next) => {
    const query = req.query.new;
    try {
        const users = query
            ? await User_1.default.find().sort({ _id: -1 }).limit(5)
            : await User_1.default.find();
        res.status(200).json(users);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
exports.FindAllUser = FindAllUser;
let UserStats = async (req, res, next) => {
    const date = new Date();
    const lastyear = new Date(date.setFullYear(date.getFullYear() - 1));
    try {
        const data = await User_1.default.aggregate([
            { $match: { createdAt: { $gte: lastyear } } },
            {
                $project: {
                    month: { $month: "$createdAt" },
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 }
                }
            }
        ]);
        res.status(200).json(data);
    }
    catch (err) {
        res.status(500).json(err.message);
    }
};
exports.UserStats = UserStats;
