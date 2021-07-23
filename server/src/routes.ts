import { Router, Request, Response, NextFunction } from 'express'
import passport from 'passport'
import { genPassword } from './passwordUtils'
import { User } from './config/database'

export const router = Router()

router.get('/logged_in', (req, res) => {
  console.log('in logged in')
  res.send(req.user)
})

router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    req.logout()
  })
})

const isAuthenticatedMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if(req.isAuthenticated()) return next()
  return res.sendStatus(401)
}

/* Post Routes */
//passport.authenticate() makes a call to the verifyCallback function in config/passport.js
router.post('/login', passport.authenticate('local'), (req, res) => {
  // console.log('req.user: \n', req.user)
  res.send(req.user)
})

router.post('/register', (req, res) => {
  const saltHash = genPassword(req.body.password)

  const salt = saltHash.salt
  const hash = saltHash.hash
  const username = req.body.username

  User.findOne({ 'username': username }, (err: Error, user: any) => {
    if (err) return res.send(null)

    if(user) {
      return res.sendStatus(404)
    }

    // TODO: Does this get typing
    const newUser = new User({
      username: username,
      hash: hash,
      salt: salt,
    })
  
    console.log("in register")
  
    newUser.save()
        .then((user: any) => {
          req.login(newUser, (err) => {
            console.log('login success')
            // console.log(req.user)
            return res.send(req.user)
          })
        })
  })
})

