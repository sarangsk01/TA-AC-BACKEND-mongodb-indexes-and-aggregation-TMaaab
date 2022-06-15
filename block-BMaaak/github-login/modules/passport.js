var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var User = require('../models/User');

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: '/auth/github/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      var user = {
        name: profile.displayName,
        username: profile.username,
        email: profile._json.email,
        photo: profile._json.avatar_url,
      };
      User.findOne({ email: profile._json.email }, (err, user) => {
        if (err) return done(err);
        if (!user) {
          User.create(user, (err, addedUser) => {
            if (err) return done(err);
            return done(null, addedUser);
          });
        }
        done(null, user);
      });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});
