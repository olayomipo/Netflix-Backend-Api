"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsonwebtoken_1 = (0, tslib_1.__importDefault)(require("jsonwebtoken"));
const VerifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jsonwebtoken_1.default.verify(token, process.env.JWT_KEY, (err, user) => {
            if (err)
                res.status(403).json("Token is not valid !");
            req.user = user;
            next();
        });
    }
    else {
        return res.status(401).json("You are not authenticated !");
    }
};
const VerifyTokenAndAuth = (req, res, next) => {
    VerifyToken(req, res, () => {
        if (req.user.id === req.param.id || req.user.isAdmin !== null) {
            next();
        }
        else {
            res.status(403).json("You are not allowed to do that!");
        }
    });
};
const VerifyTokenAndAdmin = (req, res, next) => {
    VerifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        }
        else {
            res.status(403).json("You are not allowed to do that!");
        }
    });
};
exports.default = { VerifyToken, VerifyTokenAndAuth, VerifyTokenAndAdmin };
