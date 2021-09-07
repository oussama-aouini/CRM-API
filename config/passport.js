const bcrypt = require('bcryptjs')
var JwtStrategy = require('passport-jwt').Strategy
var ExtractJwt = require('passport-jwt').ExtractJwt
const LocalStrategy = require('passport-local').Strategy

// Load User model
const Admin = require('../models/admin')
const Client = require('../models/client')
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('Bearer')
opts.secretOrKey = 'secret'
const admin_strategy = new JwtStrategy(opts, function (jwt_payload, done) {
  Admin.findById(jwt_payload.sub, function (err, user) {
    if (err) {
      return done(err, false)
    }
    if (user) {
      return done(null, user)
    } else {
      return done(null, false)
    }
  })
})
const client_strategy = new JwtStrategy(opts, function (jwt_payload, done) {
  Client.findById(jwt_payload.sub, function (err, user) {
    if (err) {
      return done(err, false)
    }
    if (user) {
      return done(null, user)
    } else {
      return done(null, false)
    }
  })
})
module.exports = function (passport) {
  passport.use('admin_strategy', admin_strategy)
  passport.use('client_strategy', client_strategy)
}
