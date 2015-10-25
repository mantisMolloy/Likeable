var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var liker = require('./liker');
var FB = require('fb');

exports.setup = function (User, config) {
  passport.use(new FacebookStrategy({
      clientID: config.facebook.clientID,
      clientSecret: config.facebook.clientSecret,
      callbackURL: config.facebook.callbackURL,
      profileFields: ['name']
    },
    function(accessToken, refreshToken, profile, done) {
      User.findOne({
        'facebook.id': profile.id
      },
      function(err, user) {
        if (err) {
          return done(err);
        }

        FB.setAccessToken(accessToken);
        FB.api(profile.id + '/likes?limit=100000', function (res) {
          if(!res || res.error) {
            console.log(!res ? 'error occurred' : res.error);
            return;
          }

          //call liker module
          liker(res.data, function (liker) {
            like = liker;
          },
          function (detected) {
            det = detected;
          },
          function (lastLikes){
            last25 = lastLikes;
          });


          console.log(last25);

          if (user === null) {
            user = new User({
              name: profile.name.familyName,
              liker: like,
              detected: det,
              last: last25,
              role: user,
              username: profile.username,
              provider: 'facebook',
              facebook: profile._json
            });
            user.save(function(err) {
              if (err) return done(err);
              done(err, user);
            });
          } else {
            return done(err, user);
          }

        });
      })
    }
  ));
};
