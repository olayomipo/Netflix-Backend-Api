"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListSchema = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = (0, tslib_1.__importDefault)(require("mongoose"));
exports.ListSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
    },
    genre: {
        type: String,
    },
    content: {
        type: Array,
    }
}, { timestamps: true });
const List = mongoose_1.default.model("List", exports.ListSchema);
exports.default = List;
