import passport from 'passport'
import { IProfile, OIDCStrategy, VerifyOIDCFunctionWithReq, VerifyCallback } from 'passport-azure-ad'
import connection, { User } from './database'
import config from './envconfig'

const { AZURE_ID_META_DATA, AZURE_CLIENT_ID, AZURE_CLIENT_SECRET, AZURE_REDIRECT_URL } = config

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
const verifyFn: any = (
  _req: Request,
  _iss: string,
  _sub: string,
  profile: IProfile,
  _accessToken: string,
  _refreshToken: string,
  done: VerifyCallback
) => {
  if (profile) {
    return done(null, profile.oid)
  }
  return done(null, false)
}

const strategy = new OIDCStrategy({
    identityMetadata: AZURE_ID_META_DATA!,
    clientID: AZURE_CLIENT_ID!,
    clientSecret: AZURE_CLIENT_SECRET,
    responseType: 'code id_token',
    responseMode: 'form_post',
    redirectUrl: AZURE_REDIRECT_URL!,
    allowHttpForRedirectUrl: true,
    validateIssuer: false,
        // issuer: 'horrocksengineersinc.onmicrosoft.com', // Only need if AZURE_ID_META_DATA url is set to a common endpoint
    passReqToCallback: true,
    useCookieInsteadOfSession: false, // Only set to true if using { session: false } in `passport.authenticate()`
    // cookieEncryptionKeys: [
    //   { key: '12345678901234567890123456789012', iv: '123456789012' },
    //   { key: 'abcdefghijklmnopqrstuvwxyzabcdef', iv: 'abcdefghijkl' }
    // ],
    scope: ['profile'],
    // Setting loggingLevel to info provides a lot of info that can be used when debugging.
    loggingLevel: 'info',
    nonceLifetime: 60 * 60 * 24, // One day in seconds
    nonceMaxAmount: 5
  },
  verifyFn
)

passport.use(strategy)

// TODO: Typings are off here.
passport.serializeUser(function (user, done) {
  console.log('serializeUser: ', user)
  // Second argument passed to session
  // req.session.passport.user = secondArgument
  // Generally smart to serialize as little info as possible.
  // Leads to better performance.
  // Also prevents data from becoming stale.
  done(null, user)
})

// First parameter is from session
// req.session.passport.user = firstParameter
// It is then assigned to req.user
// This is called on every request because we want to be
// sure to have accurate, up to do info.
// req.user = User.findOneById(req.session.passport.user)
// TODO: Typings are off here.
passport.deserializeUser(function (user:any, done) {
  console.log("deserialize: ", user)
  done(null, user)
})