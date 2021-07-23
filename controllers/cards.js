const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .populate('user')
    .then((cards) => res.send(cards))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Переданы некорректные данные при создании карточки.' });
      }
      return res.status(500).send({ message: 'Произошла ошибка.' });
    });
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndDelete(cardId)
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'Карточка с указанным _id не найдена.' });
      }
      return res.send(card);
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

const likeCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    {
      $addToSet: {
        likes: req.user._id,
      },
    }, {
      new: true,
      runValidators: true,
    },
  )
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'Карточка с указанным _id не найдена.' });
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Переданы некорректные данные для постановки лайка.' });
      }
      return res.status(500).send({ message: 'Произошла ошибка.' });
    });
};

const dislikeCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    {
      $pull: {
        likes: req.user._id,
      },
    }, {
      new: true,
      runValidators: true,
    },
  )
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'Карточка с указанным _id не найдена.' });
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Переданы некорректные данные для снятия лайка.' });
      }
      return res.status(500).send({ message: 'Произошла ошибка.' });
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
