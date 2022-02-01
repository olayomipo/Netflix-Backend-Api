"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = (0, tslib_1.__importDefault)(require("mongoose"));
exports.UserSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        default: ""
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });
const User = mongoose_1.default.model("User", exports.UserSchema);
exports.default = User;
