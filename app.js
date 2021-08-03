require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { celebrate, Joi } = require('celebrate');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/not-found-error');
const ConflictError = require('./errors/conflict-error');

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.post('/sign-up', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().min(2),
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
}), createUser);

app.post('/sign-in', login);

app.use('/cards', auth, require('./routes/cards'));
app.use('/users', auth, require('./routes/users'));

app.use((req, res, next) => {
  next(new NotFoundError('Запрашиваемый маршрут не найден'));
});

app.use((err, req, res, next) => {
  if (err.name === 'MongoError' && err.code === 11000) {
    next(new ConflictError('Почтовый адрес уже используется'));
  }
  next(err);
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  let { message = 'На сервере произошла ошибка' } = err;

  if (err.errors) {
    const property = err.message.split(': ')[1];
    message = err.errors[property].message;
  }

  console.log(err);

  res
    .status(statusCode)
    .send({ message });

  next();
});

app.listen(3000);
