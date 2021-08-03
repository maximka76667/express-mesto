const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const UnauthorizedError = require('../errors/unauthorized-error');
const { errorMessages } = require('../errors/error-config');

const errorMessage = errorMessages.unauthorizedErrorMessage;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (link) => /^(https?:\/\/)(www.)?([\w-]{1,32}\.[\w-]{1,32})[^\s]*#?$/.test(link),
      message: 'Неправильно указаная ссылка',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'Неправильно указаная почта',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
}, {
  versionKey: false,
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError(errorMessage);
      }

      return bcrypt.compare(password, user.password)
        .then(((matched) => {
          if (!matched) {
            throw new UnauthorizedError(errorMessage);
          }
          return user;
        }));
    });
};

module.exports = mongoose.model('user', userSchema);
