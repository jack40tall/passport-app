"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var passport_1 = __importDefault(require("passport"));
var envconfig_1 = __importDefault(require("./config/envconfig"));
var AZURE_AD_SUCCESS = envconfig_1.default.AZURE_AD_SUCCESS, AZURE_AD_FAILURE = envconfig_1.default.AZURE_AD_FAILURE, AZURE_TENANT_ID = envconfig_1.default.AZURE_TENANT_ID;
exports.router = express_1.Router();
exports.router.get('/logout', function (req, res) {
    req.session.destroy(function () {
        req.logout();
        console.log('logged out');
    });
    res.sendStatus(200);
});
//passport.authenticate() makes a call to the verifyCallback function in config/passport.js
//@ts-ignore
exports.router.get('/login', passport_1.default.authenticate('azuread-openidconnect', { failureRedirect: AZURE_AD_FAILURE, tenantIdOrName: AZURE_TENANT_ID }), function (req, res) {
    console.log('in login');
    res.send(req);
});
exports.router.get('/user', function (req, res) {
    console.log('in /user route');
    if (req.user) {
        return res.status(200).send(req.user);
    }
    return res.status(404).send('No established session authenticated.');
});
/* Post Routes */
exports.router.post('/auth/openid/return', passport_1.default.authenticate('azuread-openidconnect', { failureRedirect: AZURE_AD_FAILURE }), function (req, res) {
    res.redirect(AZURE_AD_SUCCESS);
});
