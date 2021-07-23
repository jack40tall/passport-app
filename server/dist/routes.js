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
// TODO: Should I always include next and/or call it, even when it isn't used?
// TODO: Should put app.use(middleware) or include it here?
// router.get('/logged_in', cookieParser(), (req, res, next) => {
//   console.log('logged_in', req)
// })
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
    // res.redirect('/login')
});
// Get Routes
// router.get('/', (req, res, next) => {
//   res.send('<h1>Home<h1/><p>Please <a href="/register">register</a></p>')
// })
// router.get('/login', (req, res, next) => {
//   const form = '<h1>Login Page</h1><form method="POST" action="/login">\
//   Enter Username:<br><input types="text" name="username"\
//   <br>Enter Password:<br><input types="password" name="password">\
//   <br><br><input type="submit" value="Submit"></form>'
//   res.send(form)
// })
// router.get('/register', (req, res, next) => {
//   const form = '<h1>Register Pages</h1><form method="post" action="register">\
//   Enter Username:<br><input type="text" name="username">\
//   <br>Enter Password:<br><input type="password" name="password">\
//   <br><br><input type="submit" balue="Submit"></form>'
//   res.send(form)
// })
// router.get('/protected-route', isAuthenticatedMiddleware, (req, res, next) => {
//   if (req.isAuthenticated()) {
//     res.send('<h1>You are authenticated</h1><p><a href="/logout">Logoout and reload</a></p>')
//   } else {
//     res.send('<h1>You are not authenticated</h1><p><a href="/login">Login</a></p>')
//   }
// })
// router.get('/logout', (req, res, next) => {
//   req.logout()
//   res.redirect('/protected-route')
// })
// router.get('/login-success', (req, res, next) => {
//   res.send('<p>You successfully logged in. --> <a href="/protected-route">Go to protected route</a></p>')
// })
// router.get('/login-failure', (req, res, next) => {
//   res.send('<p>You entered the wrong password.')
// })
// router.get('/*', (_, res) => {
//   res.sendFile(path.join(__dirname, '../../client/build', 'index.html'))
// })
