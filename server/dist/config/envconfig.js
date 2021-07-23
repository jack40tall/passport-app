"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var _a = process.env, SERVER_PORT = _a.SERVER_PORT, SECRET = _a.SECRET, DB_URL = _a.DB_URL;
exports.default = { SERVER_PORT: SERVER_PORT, SECRET: SECRET, DB_URL: DB_URL };
