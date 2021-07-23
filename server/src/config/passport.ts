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