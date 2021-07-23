import { Router, Request, Response, NextFunction } from 'express'
import passport from 'passport'
import cookieParser from 'cookie-parser'
import { genPassword } from './passwordUtils'
import { User } from './config/database'
import path from 'path'

export const router = Router()

// TODO: Should I always include next and/or call it, even when it isn't used?
// TODO: Should put app.use(middleware) or include it here?
// router.get('/logged_in', cookieParser(), (req, res, next) => {
//   console.log('logged_in', req)
// })

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

  // res.redirect('/login')
})

// Get Routes
// router.get('/', (req, res, next) => {
//   res.send('<h1>Home<h1/><p>Please <a href="/register">register</a></p>')
// })

// router.get('/login', (req, res, next) => {
//   const form = '<h1>Login Page</h1><form method="POST" action="/login">\
//   Enter Username:<br><input types="text" name="username"\
//   <br>Enter Password:<br><input types="password" name="password">\
//   <br><br><input type="submit" value="Submit"></form>'

//   res.send(form)
// })

// router.get('/register', (req, res, next) => {

//   const form = '<h1>Register Pages</h1><form method="post" action="register">\
//   Enter Username:<br><input type="text" name="username">\
//   <br>Enter Password:<br><input type="password" name="password">\
//   <br><br><input type="submit" balue="Submit"></form>'

//   res.send(form)
// })


// router.get('/protected-route', isAuthenticatedMiddleware, (req, res, next) => {

//   if (req.isAuthenticated()) {
//     res.send('<h1>You are authenticated</h1><p><a href="/logout">Logoout and reload</a></p>')
//   } else {
//     res.send('<h1>You are not authenticated</h1><p><a href="/login">Login</a></p>')
//   }
// })

// router.get('/logout', (req, res, next) => {
//   req.logout()
//   res.redirect('/protected-route')
// })

// router.get('/login-success', (req, res, next) => {
//   res.send('<p>You successfully logged in. --> <a href="/protected-route">Go to protected route</a></p>')
// })

// router.get('/login-failure', (req, res, next) => {
//   res.send('<p>You entered the wrong password.')
// })

// router.get('/*', (_, res) => {
//   res.sendFile(path.join(__dirname, '../../client/build', 'index.html'))
// })