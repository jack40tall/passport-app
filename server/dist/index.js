"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var envconfig_1 = __importDefault(require("./config/envconfig"));
require("./config/passport");
var connect_mongo_1 = __importDefault(require("connect-mongo"));
var express_session_1 = __importDefault(require("express-session"));
var passport_1 = __importDefault(require("passport"));
var routes_1 = require("./routes");
var SERVER_PORT = envconfig_1.default.SERVER_PORT, SECRET = envconfig_1.default.SECRET, DB_URL = envconfig_1.default.DB_URL;
var app = express_1.default();
app.use(express_session_1.default({
    secret: SECRET,
    store: connect_mongo_1.default.create({
        mongoUrl: DB_URL,
        ttl: 1000 * 60 * 60 * 24
    }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    name: 'jacksonsesh'
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
//!Only used in production
// app.use(express.static(path.join(__dirname, '../../client/build')))
// A safe practice to ensure timeout hasn't occurred since making this request. 
app.use(passport_1.default.initialize());
// Gives us access to the request.session object (also serialize and deserialize)
app.use(passport_1.default.session());
app.use(routes_1.router);
app.listen(SERVER_PORT, function () {
    console.log('Example app listening on port: ', SERVER_PORT);
});
