"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findMovie = exports.findMovieById = exports.deleteMovie = exports.putMovie = exports.postMovie = void 0;
const tslib_1 = require("tslib");
const Movie_1 = (0, tslib_1.__importDefault)(require("../models/Movie"));
let postMovie = async (req, res, next) => {
    const newMovie = new Movie_1.default(req.body);
    try {
        const savedMovie = await newMovie.save();
        res.status(201).json(savedMovie);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
exports.postMovie = postMovie;
let putMovie = async (req, res, next) => {
    try {
        const updatedMovie = await Movie_1.default.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, { new: true });
        res.status(200).send(updatedMovie);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
exports.putMovie = putMovie;
let deleteMovie = async (req, res, next) => {
    try {
        await Movie_1.default.findByIdAndDelete(req.params.id);
        res.status(200).json("Movie has been deleted !");
    }
    catch (err) {
        res.status(500).json(err);
    }
};
exports.deleteMovie = deleteMovie;
let findMovieById = async (req, res, next) => {
    try {
        const movie = await Movie_1.default.findOne({ userId: req.params.id });
        res.status(200).json(movie);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
exports.findMovieById = findMovieById;
let findMovie = async (req, res, next) => {
    try {
        const movies = await Movie_1.default.find();
        res.status(200).json(movies);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
exports.findMovie = findMovie;
