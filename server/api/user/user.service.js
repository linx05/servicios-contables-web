
let User = require('./user.model').User;

function createUser({full_name = name, email = correo, level = nivel, active = activado,
    username = usuario, password = clave}, cb){
    let cuenta = {
        username,
        password
    };
    let user = new User({
        full_name,
        email,
        level,
        active,
        cuenta
    });
    return user.save(cb);
}

exports = module.exports = {
    create: createUser
};
