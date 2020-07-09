const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const nodemailer = require('nodemailer');
const colors = require('colors');

const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('/', require('./routes/form'));

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Express server running on port ${port}`.cyan.underline.bold)
});