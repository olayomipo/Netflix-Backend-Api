"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieSchema = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = (0, tslib_1.__importDefault)(require("mongoose"));
exports.MovieSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    desc: {
        type: String,
    },
    Image: {
        type: String,
    },
    ImageTitle: {
        type: String,
    },
    ImageSm: {
        type: String,
    },
    trailer: {
        type: String,
    },
    video: {
        type: String,
    },
    year: {
        type: String,
    },
    limit: {
        type: Number,
    },
    genre: {
        type: String,
    },
    isSeries: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });
const Movie = mongoose_1.default.model("Movie", exports.MovieSchema);
exports.default = Movie;
