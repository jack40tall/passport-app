import crypto from 'crypto'

export const isValidPassword = (password: string, hash: string, salt: string) => {
  const hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')
  return hash === hashVerify
}

export const genPassword = (password: string) => {
  const salt = crypto.randomBytes(32).toString('hex')
  const genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')

  return {
    salt: salt,
    hash: genHash
  }
}

export default isValidPassword