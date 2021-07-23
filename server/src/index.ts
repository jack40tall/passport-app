import express from 'express'
import config from './config/envconfig'
import './config/passport'
import path from 'path'
import MongoStore from 'connect-mongo'
import session from 'express-session'
import passport from 'passport'
import { router as routes } from './routes'
import mongoose from 'mongoose'

const { SERVER_PORT, SECRET, DB_URL } = config

const app = express()

app.use(session({
  secret: SECRET!,
  store: MongoStore.create({
    mongoUrl: DB_URL,
    ttl: 1000 * 60 * 60 * 24
  }),
  cookie: { maxAge: 1000 * 60 * 60 * 24 },
  name: 'jacksonsesh'
}))

app.use(express.json())
app.use(express.urlencoded( {extended: true} ))

//!Only used in production
// app.use(express.static(path.join(__dirname, '../../client/build')))

// A safe practice to ensure timeout hasn't occurred since making this request. 
app.use(passport.initialize())

// Gives us access to the request.session object (also serialize and deserialize)
app.use(passport.session())

app.use(routes)


app.listen(SERVER_PORT, () => {
  console.log('Example app listening on port: ', SERVER_PORT)
})