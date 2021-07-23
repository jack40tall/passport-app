"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var passport_1 = __importDefault(require("passport"));
var passport_local_1 = require("passport-local");
var database_1 = require("./database");
var passwordUtils_1 = __importDefault(require("../passwordUtils"));
// TODO: How to define connections? Is it good practice to import each individually?
// const User = connection.models.User
/* Example of how to customize field names */
// const customFields = {
//   usernameField: 'uname',
//   passwordField: 'pw'
// }
var verifyCallback = function (username, password, done) {
    // console.log('In VerifyCallback')
    // TODO: How to define user
    database_1.User.findOne({ username: username })
        .then(function (user) {
        if (!user) {
            return done(null, false);
        }
        var isValid = passwordUtils_1.default(password, user.hash, user.salt);
        if (isValid) {
            return done(null, user);
        }
        else {
            return done(null, false);
        }
    })
        .catch(function (err) {
        done(err);
    });
};
// passport.use(new OIDCStrategy({
//   identityMetadata: config.creds.identityMetadata,
//   clientID: config.creds.clientID,
//   responseType: config.creds.responseType,
//   responseMode: config.creds.responseMode,
//   redirectUrl: config.creds.redirectUrl,
//   allowHttpForRedirectUrl: config.creds.allowHttpForRedirectUrl,
//   clientSecret: config.creds.clientSecret,
//   validateIssuer: config.creds.validateIssuer,
//   isB2C: config.creds.isB2C,
//   issuer: config.creds.issuer,
//   passReqToCallback: config.creds.passReqToCallback,
//   scope: config.creds.scope,
//   loggingLevel: config.creds.loggingLevel,
//   loggingNoPII: config.creds.loggingNoPII,
//   nonceLifetime: config.creds.nonceLifetime,
//   nonceMaxAmount: config.creds.nonceMaxAmount,
//   useCookieInsteadOfSession: config.creds.useCookieInsteadOfSession,
//   cookieSameSite: config.creds.cookieSameSite, // boolean
//   cookieEncryptionKeys: config.creds.cookieEncryptionKeys,
//   clockSkew: config.creds.clockSkew,
//   proxy: { port: 'proxyport', host: 'proxyhost', protocol: 'http' },
// },
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
//     });
//   });
// }
// ));
var strategy = new passport_local_1.Strategy(verifyCallback);
passport_1.default.use(strategy);
// TODO: How to handle user.id
passport_1.default.serializeUser(function (user, done) {
    done(null, user.id);
});
passport_1.default.deserializeUser(function (userId, done) {
    database_1.User.findById(userId)
        .then(function (user) {
        done(null, user);
    })
        .catch(function (err) { return done(err); });
});
