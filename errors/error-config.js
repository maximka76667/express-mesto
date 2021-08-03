const BAD_REQUEST_ERROR_CODE = 400;
const UNAUTHORIZED_ERROR_CODE = 401;
const FORBIDDEN_ERROR_CODE = 403;
const NOT_FOUND_ERROR_CODE = 404;
const CONFLICT_ERROR_CODE = 409;
const DEFAULT_ERROR_CODE = 500;

const errorMessages = {
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
  unauthorizedErrorMessage: 'Неправильные почта или пароль',
  forbiddenErrorMessage: 'Необходима авторизация',
  notFoundErrorMessages: {
    cards: 'Карточка с указанным _id не найдена.',
    users: 'Пользователь по указанному _id не найден.',
  },
  castErrorMessage: 'Невалидный id ',
  defaultErrorMessage: 'Произошла ошибка.',
};

module.exports = {
  BAD_REQUEST_ERROR_CODE,
  UNAUTHORIZED_ERROR_CODE,
  FORBIDDEN_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  CONFLICT_ERROR_CODE,
  DEFAULT_ERROR_CODE,
  errorMessages,
};
