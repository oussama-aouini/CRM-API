const jsonwebtoken = require('jsonwebtoken')

function issueJWT(user) {
  const _id = user._id

  const expiresIn = '1d'

  const payload = {
    sub: _id,
    iat: Date.now(),
  }

  const signedToken = jsonwebtoken.sign(payload, 'secret', {
    expiresIn: expiresIn,
  })

  return {
    token: signedToken,
    expires: expiresIn,
  }
}

module.exports.issueJWT = issueJWT
