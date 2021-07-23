const User = require('../models/user');
const {
  errorConfig,
  handleError,
  NotFoundError,
} = require('../utils/constants');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ users }))
    .catch((err) => handleError(err, res));
};

const getUserById = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError();
      }
      return res.send({ user });
    })
    .catch((err) => handleError(
      err,
      res,
      {
        notFoundErrorMessage: errorConfig.notFoundErrorMessages.users,
      },
    ));
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ user }))
    .catch((err) => handleError(
      err,
      res,
      {
        validationErrorMessage: errorConfig.validationErrorMessages.users.createUser,
      },
    ));
};

const updateUser = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError();
      }
      return res.send({ user });
    })
    .catch((err) => handleError(
      err,
      res,
      {
        valdationErrorMessage: errorConfig.validationErrorMessages.users.updateUser,
        notFoundErrorMessage: errorConfig.notFoundErrorMessages.users,
      },
    ));
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError();
      }
      return res.send({ user });
    })
    .catch((err) => handleError(
      err,
      res,
      {
        valdationErrorMessage: errorConfig.validationErrorMessages.users.updateAvatar,
        notFoundErrorMessage: errorConfig.notFoundErrorMessages.users,
      },
    ));
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
};
