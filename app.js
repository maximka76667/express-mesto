require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { celebrate, Joi, errors } = require('celebrate');
const { login, createUser } = require('./controllers/users');

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
    link: Joi.string().min(2),
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
}), createUser);
app.post('/sign-in', login);

app.use(require('./middlewares/auth'));

app.use('/cards', require('./routes/cards'));
app.use('/users', require('./routes/users'));

app.use((req, res) => {
  res.status(404).send({ message: 'Запрашиваемый маршрут не существует.' });
});

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message = 'На сервере произошла ошибка' } = err;

  res
    .status(statusCode)
    .send({ message });

  next(err);
});

app.listen(3000);
