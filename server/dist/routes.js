"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var passport_1 = __importDefault(require("passport"));
var passwordUtils_1 = require("./passwordUtils");
var database_1 = require("./config/database");
exports.router = express_1.Router();
exports.router.get('/logged_in', function (req, res) {
    console.log('in logged in');
    res.send(req.user);
});
exports.router.get('/logout', function (req, res) {
    req.session.destroy(function () {
        req.logout();
    });
});
var isAuthenticatedMiddleware = function (req, res, next) {
    if (req.isAuthenticated())
        return next();
    return res.sendStatus(401);
};
/* Post Routes */
//passport.authenticate() makes a call to the verifyCallback function in config/passport.js
exports.router.post('/login', passport_1.default.authenticate('local'), function (req, res) {
    // console.log('req.user: \n', req.user)
    res.send(req.user);
});
exports.router.post('/register', function (req, res) {
    var saltHash = passwordUtils_1.genPassword(req.body.password);
    var salt = saltHash.salt;
    var hash = saltHash.hash;
    var username = req.body.username;
    // TODO: Does this get typing
    var newUser = new database_1.User({
        username: username,
        hash: hash,
        salt: salt,
    });
    //TODO: Are promises okay?
    newUser.save()
        .then(function (user) {
        // console.log(user)
    });
});
