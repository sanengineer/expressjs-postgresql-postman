const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;

// load up the user model
const db = require("../models");
const User = db.Product;

console.log(User);

console.log(`\n\n${User}\n\n`);

module.exports = function (passport) {
  const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("JWT"),
    secretOrKey: "nodeauthsecret",
  };
  passport.use(
    "jwt",
    new JwtStrategy(options, function (jwt_payload, done) {
      User.findByPk(jwt_payload.id)
        .then((usernameReqBody) => {
          return done(null, usernameReqBody);
        })
        .catch((error) => {
          return done(error, false);
        });
    })
  );
};
