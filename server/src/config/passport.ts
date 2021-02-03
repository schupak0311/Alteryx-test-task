// @ts-nocheck
const LocalStrategy = require("passport-local").Strategy;
const config = require("./config");
const jsonwebtoken = require("jsonwebtoken");
const userModel = require("../models/user.model");

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    userModel.findById(id).then((err, user) => {
      done(err, user);
    });
  });

  passport.use(
    "local-login",
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password",
        passReqToCallback: true,
      },
      (req, username, done) => {
        userModel.findByUsername(username).then((user) => done(null, user));
      }
    )
  );

  passport.use('refreshJWT', new CustomStrategy(
    function(req, done) {
      const refreshToken = req.swagger.params.refreshToken.value;

      jsonwebtoken.verify(refreshToken, config.jwt.sessionSecret, (err, decoded) => {
        if (err) return done(null, false);

        authModel.findByRefreshToken(decoded.id, refreshToken).then((user) => {
          return done(null, user);
        });
      });
    }
  ));

};
