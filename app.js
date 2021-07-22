const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
  req.user = {
    _id: '60f92a2617239020683df716' // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.use('/cards', require('./routes/cards'));
app.use('/users', require('./routes/users'));

app.listen(3000);