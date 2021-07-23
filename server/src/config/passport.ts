import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import connection, { User } from './database'
import isValidPassord from '../passwordUtils'

interface UserObj extends Express.User {
  id: string
  username: string,
  hash: string,
  salt: string
}

// TODO: How to define connections? Is it good practice to import each individually?
// const User = connection.models.User

/* Example of how to customize field names */
// const customFields = {
//   usernameField: 'uname',
//   passwordField: 'pw'

// }

const verifyCallback = (username: string, password: string, done: Function) => {
  // console.log('In VerifyCallback')
  // TODO: How to define user
  User.findOne({ username: username })
      .then((user) => {
        if (!user) { return done(null, false) }

        const isValid = isValidPassord(password, user.hash, user.salt)

        if (isValid) {
          return done(null, user)
        } else {
          return done(null, false)
        }
      })
      .catch((err: Error) => {
        done(err)
      })

}

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

const strategy = new LocalStrategy(verifyCallback)

passport.use(strategy)

// TODO: How to handle user.id
passport.serializeUser((user: any, done) => {
  done(null, user.id)
})

passport.deserializeUser((userId, done) => {
  User.findById(userId)
    .then((user) => {
      done(null, user)
    })
    .catch((err: Error) => done(err))
})