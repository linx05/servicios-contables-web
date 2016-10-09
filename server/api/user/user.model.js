'use strict';

let uniqueValidator = require('mongoose-unique-validator');
let bcrypt = require('bcryptjs');
let Schema = mongoose.Schema;

const LocalAccount = require('./local/local.model');

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
        enum    : ['admin', 'user', 'employee']
    },
    active     : {
        type   : Boolean,
        default: true
    },
    local      : {
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
    if (!user.isModified('local.password')) return callback();

    // Password changed so we need to hash it
    user.local.password = UserSchema.statics.generateHash(user.local.password);
    callback();
});

// generating a hash
UserSchema.statics.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
UserSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = {
    User      : mongoose.model('User', UserSchema),
    UserSchema: UserSchema,
    accounts  : {
        LocalAccount: LocalAccount
    }
};
