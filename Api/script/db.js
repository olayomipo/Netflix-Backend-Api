"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = (0, tslib_1.__importDefault)(require("mongoose"));
const url = "mongodb://localhost:27017/Netflix-clone";
const uri = "mongodb+srv://Lily-Crown999:Lily-Crown999@cluster0.ynj90.mongodb.net/Url-Shortenerz?retryWrites=true&w=majority";
function connectDB() {
    mongoose_1.default.connect(url, (err) => {
        if (err) {
            console.log(err.message);
        }
        else {
            console.log(`Successfully Connected! at %s`, url);
        }
    });
}
exports.connectDB = connectDB;
