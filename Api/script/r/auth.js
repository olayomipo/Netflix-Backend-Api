"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostUser = void 0;
const tslib_1 = require("tslib");
const User_1 = (0, tslib_1.__importDefault)(require("../models/User"));
let PostUser = async (req, res, next) => {
    try {
        let user = await User_1.default.create(req.body);
        res.json(user);
    }
    catch (err) {
        console.error(err);
        res.status(500).json('Error 500 Server Error 😰🤧😭 ');
    }
};
exports.PostUser = PostUser;
