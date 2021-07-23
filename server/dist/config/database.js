"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var envconfig_1 = __importDefault(require("./envconfig"));
var DB_URL = envconfig_1.default.DB_URL;
var connection = mongoose_1.default.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
var UserSchema = new mongoose_1.default.Schema({
    username: String,
    hash: String,
    salt: String
});
exports.User = mongoose_1.default.model('User', UserSchema);
exports.default = connection;
