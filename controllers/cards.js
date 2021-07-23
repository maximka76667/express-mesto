const Card = require('../models/card');
const {
  errorConfig,
  handleError,
  NotFoundError,
} = require('../utils/constants');

const getCards = (req, res) => {
  Card.find({})
    .populate('user')
    .then((cards) => res.send({ cards }))
    .catch((err) => handleError(err, res));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ card }))
    .catch((err) => handleError(err, res, errorConfig.validationErrorMessages.cards.createCard));
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndDelete(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError();
      }
      return res.send({ card });
    })
    .catch((err) => handleError(
      err,
      res,
      {
        notFoundErrorMessage: errorConfig.notFoundErrorMessages.cards,
      },
    ));
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
        throw new NotFoundError();
      }
      return res.send({ card });
    })
    .catch((err) => handleError(
      err,
      res,
      {
        validationErrorMessage: errorConfig.validationErrorMessages.cards.likeCard,
        notFoundErrorMessage: errorConfig.notFoundErrorMessages.cards,
      },
    ));
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
        throw new NotFoundError();
      }
      return res.send({ card });
    })
    .catch((err) => handleError(
      err,
      res,
      {
        validationErrorMessage: errorConfig.validationErrorMessages.cards.dislikeCard,
        notFoundErrorMessage: errorConfig.notFoundErrorMessages.cards,
      },
    ));
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
