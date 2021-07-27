"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var passport_1 = __importDefault(require("passport"));
var passport_azure_ad_1 = require("passport-azure-ad");
var envconfig_1 = __importDefault(require("./envconfig"));
var AZURE_ID_META_DATA = envconfig_1.default.AZURE_ID_META_DATA, AZURE_CLIENT_ID = envconfig_1.default.AZURE_CLIENT_ID, AZURE_CLIENT_SECRET = envconfig_1.default.AZURE_CLIENT_SECRET, AZURE_REDIRECT_URL = envconfig_1.default.AZURE_REDIRECT_URL;
// TODO: How to define connections? Is it good practice to import each individually?
// const User = connection.models.User
/* Example of how to customize field names */
// const customFields = {
//   usernameField: 'uname',
//   passwordField: 'pw'
// }
// function(iss, sub, profile, accessToken, refreshToken, done) {
//   if (!profile.oid) {
//     return done(new Error("No oid found"), null);
//   }
//   // asynchronous verification, for effect...
//   process.nextTick(function () {
//     findByOid(profile.oid, function(err, user) {
//       if (err) {
//         return done(err);
//       }
//       if (!user) {
//         // "Auto-registration"
//         users.push(profile);
//         return done(null, profile);
//       }
//       return done(null, user);
//     })
//   })
// }
// TODO: Why am i getting a typing error
var verifyFn = function (_req, _iss, _sub, profile, _accessToken, _refreshToken, done) {
    if (profile) {
        return done(null, profile.oid);
    }
    return done(null, false);
};
var strategy = new passport_azure_ad_1.OIDCStrategy({
    identityMetadata: AZURE_ID_META_DATA,
    clientID: AZURE_CLIENT_ID,
    clientSecret: AZURE_CLIENT_SECRET,
    responseType: 'code id_token',
    responseMode: 'form_post',
    redirectUrl: AZURE_REDIRECT_URL,
    allowHttpForRedirectUrl: true,
    validateIssuer: false,
    // issuer: 'horrocksengineersinc.onmicrosoft.com', // Only need if AZURE_ID_META_DATA url is set to a common endpoint
    passReqToCallback: true,
    useCookieInsteadOfSession: false,
    // cookieEncryptionKeys: [
    //   { key: '12345678901234567890123456789012', iv: '123456789012' },
    //   { key: 'abcdefghijklmnopqrstuvwxyzabcdef', iv: 'abcdefghijkl' }
    // ],
    scope: ['profile'],
    // Setting loggingLevel to info provides a lot of info that can be used when debugging.
    loggingLevel: 'info',
    nonceLifetime: 60 * 60 * 24,
    nonceMaxAmount: 5
}, verifyFn);
passport_1.default.use(strategy);
// TODO: Typings are off here.
passport_1.default.serializeUser(function (user, done) {
    console.log('serializeUser: ', user);
    // Second argument passed to session
    // req.session.passport.user = secondArgument
    // Generally smart to serialize as little info as possible.
    // Leads to better performance.
    // Also prevents data from becoming stale.
    done(null, user);
});
// First parameter is from session
// req.session.passport.user = firstParameter
// It is then assigned to req.user
// This is called on every request because we want to be
// sure to have accurate, up to do info.
// req.user = User.findOneById(req.session.passport.user)
// TODO: Typings are off here.
passport_1.default.deserializeUser(function (user, done) {
    console.log("deserialize: ", user);
    done(null, user);
});
