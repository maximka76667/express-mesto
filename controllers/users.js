const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then(users => res.send(users))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }))
}

const getUserById = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .then(user => {
      if(user) {
        return res.send(user)
      }
      return res.status(404).send({ message: 'Запрашиваемый пользователь не найден' })
    })
    .catch(err => {
      if(err.reason == 'Error: Argument passed in must be a single String of 12 bytes or a string of 24 hex characters') {
        return res.status(400).send({ message: 'Переданы некорректные данные' })
      }
      return res.status(500).send({ message: 'Произошла ошибка' }
    )})
}

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then(user => res.send(user))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
}

const updateUser = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .then(user => res.send(user))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }))
}

const updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then(user => res.send(user))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }))
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar
}
