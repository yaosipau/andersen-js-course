/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(express.static('client'));
app.use(bodyParser.json());

app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use('/users', require('./routes/users'));

app.use((error, request, response, next) => {
  response.status(422).send({ error: error.message });
});
mongoose.connect(
  'mongodb+srv://admin:admin@cluster0-glxkw.mongodb.net/test?retryWrites=true&w=majority',
  { useNewUrlParser: true, useFindAndModify: false },
  () => {
    console.log('Connected to DataBase!');
  }
);
app.listen(port, err => {
  if (err) {
    return console.log('something goes wrong', err);
  }
  console.log(`server is listening on ${port} port`);
});
