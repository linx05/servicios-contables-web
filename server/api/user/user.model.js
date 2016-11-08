'use strict';

let uniqueValidator = require('mongoose-unique-validator');
let bcrypt = require('bcryptjs');
let Schema = mongoose.Schema;

mongoose.plugin(uniqueValidator);

const requiredStringValidator = [
    (val) => {
        let testVal = val.trim();
        return (testVal.length > 0);
    },
    '{PATH} cannot be empty'
];

let UserSchema = new Schema({
    full_name  : {
        type    : String,
        validate: requiredStringValidator
    },
    email      : {
        type    : String,
        unique  : true,
        required: true
    },
    level      : {
        type    : String,
        required: true,
        enum    : ['admin', 'cliente', 'empleado']
    },
    active     : {
        type   : Boolean,
        default: true
    },
    cuenta      : {
        username: {type: String, unique: true},
        password: {type: String, select: false}
    },
    settings   : {
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
});

UserSchema.pre('save', function (callback) {
    let user = this;
    // Break out if the password hasn't changed
    if (!user.isModified('cuenta.password')) return callback();

    // Password changed so we need to hash it
    user.cuenta.password = UserSchema.statics.generateHash(user.cuenta.password);
    callback();
});

// generating a hash
UserSchema.statics.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
UserSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.cuenta.password);
};

module.exports = {
    User      : mongoose.model('User', UserSchema),
    UserSchema: UserSchema
};
