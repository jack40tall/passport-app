import { Router, Request, Response, NextFunction } from 'express'
import passport from 'passport'
import { genPassword } from './passwordUtils'
import { User } from './config/database'
import config from './config/envconfig'

const { AZURE_AD_SUCCESS, AZURE_AD_FAILURE, AZURE_TENANT_ID } = config

export const router = Router()

router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    req.logout()
    console.log('logged out')
  })
  res.sendStatus(200)
})
//passport.authenticate() makes a call to the verifyCallback function in config/passport.js
//@ts-ignore
router.get('/login', passport.authenticate('azuread-openidconnect', { failureRedirect: AZURE_AD_FAILURE, tenantIdOrName: AZURE_TENANT_ID }), (req, res) => {
  console.log('in login')
  res.send(req)
})

router.get('/user', (req, res) => {
  console.log('in /user route')
  if (req.user) {
    return res.status(200).send(req.user)
  } 
  return res.status(404).send('No established session authenticated.')
})

/* Post Routes */
router.post('/auth/openid/return',
  passport.authenticate('azuread-openidconnect', {failureRedirect: AZURE_AD_FAILURE}), (req, res) => {
    res.redirect(AZURE_AD_SUCCESS!)
  }
  )


