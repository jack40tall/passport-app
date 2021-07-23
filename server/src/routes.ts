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

  // TODO: Does this get typing
  const newUser = new User({
    username: username,
    hash: hash,
    salt: salt,
  })

  //TODO: Are promises okay?
  newUser.save()
      .then((user: any) => {
        // console.log(user)
      })
})

