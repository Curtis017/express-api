// TODO: Add account locking (possibly increase time between attempts by a factor)
// TODO: Add email verification (random number sent to email isVerified & verificationCode field in user)
// https://www.mongodb.com/blog/post/password-authentication-with-mongoose-part-2
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

let UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    maxlength: 254,
    unique: true,
    validate: {
      validator: (email) => {
        return /^[a-zA-Z0-9_+&*-]+(?:\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,7}$/.test(email);
      },
      message: '{VALUE} is not a valid email!'
    }
  },
  password: {
    type: String,
    required: true,
    maxlength: 64,
    validate: {
      validator: (pass) => {
        return /^[a-zA-Z0-9!@()_`~#]{8,64}$/.test(pass);
      },
      message: 'Provided password is not valid!'
    }
  },
  firstname: {
    type: String,
    required: true,
    maxlength: 254,
    validate: {
      validator: (name) => {
        return /^[a-zA-Z']{2,256}$/.test(name);
      },
      message: '{VALUE} is not a valid first name!'
    }
  },
  lastname: {
    type: String,
    required: true,
    maxlength: 254,
    validate: {
      validator: (name) => {
        return /^[a-zA-Z']{2,256}$/.test(name);
      },
      message: '{VALUE} is not a valid last name!'
    }
  },
  role: {
    type: String,
    enum: ['Client', 'Admin'],
    default: 'Client'
  },
  emailVerificationToken: {
    type: String
  },
  emailVerificationExpiration: {
    type: Date
  }
}, {
  timestamps: true
});

UserSchema.pre('save', function (next) {
  let user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) {
    return next();
  }

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) {
      return next(err);
    }

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) {
        return next(err);
      }

      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function (candidatePassword, hashedPassword = this.password, user = this) {
  return new Promise(function (resolve, reject) {
    bcrypt.compare(candidatePassword, hashedPassword, function (err, isMatch) {
      if (err) {
        return reject(err);
      }
      return isMatch ? resolve(user) : reject('PasswordValidationError');
    });
  });
}

// User payload returned with jwt token
UserSchema.virtual('payload').get( function () {
  return {
    email: this.email,
    firstname: this.firstname,
    lastname: this.lastname
  };
});

module.exports = mongoose.model('user', UserSchema);
