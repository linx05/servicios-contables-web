const passport = require('passport');
const passportJWT = require('passport-jwt');
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
// load up the user model
let User = require('../../api/user/user.model').User;
let config = require('../../config/auth');

let params = {
    secretOrKey   : config.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeader()
};

const strategy = function (jwt_payload, done) {
    User.findById(jwt_payload.id, function (err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    });
};

module.exports = function () {
    passport.use(new JwtStrategy(params, strategy));
    return {
        initialize  : function () {
            return passport.initialize();
        },
        authenticate: function () {
            return passport.authenticate("jwt", {session: config.jwtSession});
        }
    }
};
