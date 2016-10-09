'use strict';

const passport = require('passport');
const passportJWT = require('passport-jwt');
const User = require('../user/user.model').User;
const conf = require('../../config/auth');
const jwt = require('jwt-simple');

let extractJWT = passportJWT.ExtractJwt;

function generateJwtClaims(userClaims) {
    let claims = {
        sub: userClaims.id
    };
    return _.extend(userClaims, claims);
}
function generateUserClaims(user) {
    return {
        id   : user.id,
        name : user.full_name,
        level: user.level
    };
}
function generatePayload(user) {
    return generateJwtClaims(generateUserClaims(user));
}

function userFoundToken(user, request, res) {
    if (user.validPassword(request.password)) {
        let payload = generatePayload(user);
        let token = jwt.encode(payload, conf.jwtSecret);
        return res.json({token: token});
    }
    return handleError(res, 'User not found', 404);
}

function objNotFound(error, res) {
    return handleError(res, 'User not found', 404);
}

function handleError(res, err, code = 500) {
    return res
        .status(code)
        .send(err);
}


exports = module.exports = ()=> {

    function all(req, res) {
        User.find({}).then((user) => {
            return res.json({users: user});
        }).catch((error) => {
            return handleError(res, 'no User');
        })
    }

    function token(req, res) {
        if ((req.body.login) && req.body.password) {
            let promise = User.findOne({
                $or: [
                    {email: req.body.login},
                    {'local.username': req.body.login}
                ]
            })
                .select('+local.password')
                .exec();

            return promise
                .then(user => userFoundToken(user, req.body, res))
                .catch(error => objNotFound(error, res));
        }
        objNotFound(null, res);
    }

    return {
        all,
        token
    }
};
