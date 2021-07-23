const BAD_REQUEST_ERROR_CODE = 400;
const NOT_FOUND_ERROR_CODE = 404;
const DEFAULT_ERROR_CODE = 500;

const errorConfig = {
  validationErrorMessages: {
    cards: {
      createCard: 'Переданы некорректные данные при создании карточки.',
      likeCard: 'Переданы некорректные данные для постановки лайка.',
      dislikeCard: 'Переданы некорректные данные при снятии лайка.',
    },
    users: {
      createUser: 'Переданы некорректные данные при создании пользователя.',
      updateUser: 'Переданы некорректные данные при обновлении профиля.',
      updateAvatar: 'Переданы некорректные данные при обновлении аватара.',
    },
  },
  notFoundErrorMessages: {
    cards: 'Карточка с указанным _id не найдена.',
    users: 'Пользователь по указанному _id не найден.',
  },
  castErrorMessage: 'Невалидный id ',
  defaultErrorMessage: 'Произошла ошибка.',
};

const handleError = (
  err,
  res,
  {
    validationErrorMessage,
    notFoundErrorMessage,
  },
) => {
  switch (err.name) {
    case 'ValidationError':
      return res.status(BAD_REQUEST_ERROR_CODE).send({ message: validationErrorMessage });
    case 'CastError':
      return res.status(BAD_REQUEST_ERROR_CODE).send({ message: errorConfig.castErrorMessage });
    case 'NotFoundError':
      return res.status(NOT_FOUND_ERROR_CODE).send({ message: notFoundErrorMessage });
    default:
      return res.status(DEFAULT_ERROR_CODE).send({ message: errorConfig.defaultErrorMessage });
  }
};

function NotFoundError() {
  Error.call(this);
  this.name = 'NotFoundError';
  this.message = 'Not Found';
  this.stack = (new Error()).stack;
}

NotFoundError.prototype = Object.create(Error.prototype);

module.exports = {
  errorConfig,
  handleError,
  NotFoundError,
};
