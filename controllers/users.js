const User = require('../models/user');

const VALIDATIOD_ERROR_CODE = 400;
const NOT_FOUND_ERROR_CODE = 404;
const DEFAULT_ERROR_CODE = 500;

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(DEFAULT_ERROR_CODE).send({ message: 'Произошла ошибка' }));
};

const getUserById = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Пользователь по указанному _id не найден.' });
      }
      return res.send(user);
    })
    .catch(() => res.status(DEFAULT_ERROR_CODE).send({ message: 'Произошла ошибка' }));
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(VALIDATIOD_ERROR_CODE).send({ message: 'Переданы некорректные данные при создании пользователя.' });
      }
      return res.status(DEFAULT_ERROR_CODE).send({ message: 'Произошла ошибка.' });
    });
};

const updateUser = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Пользователь с указанным _id не найден.' });
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(VALIDATIOD_ERROR_CODE).send({ message: 'Переданы некорректные данные при обновлении профиля.' });
      }
      return res.status(DEFAULT_ERROR_CODE).send({ message: 'Произошла ошибка.' });
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Пользователь с указанным _id не найден.' });
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(VALIDATIOD_ERROR_CODE).send({ message: 'Переданы некорректные данные при обновлении аватара.' });
      }
      return res.status(DEFAULT_ERROR_CODE).send({ message: 'Произошла ошибка.' });
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
};
