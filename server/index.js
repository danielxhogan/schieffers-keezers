const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const pool = require('./db');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

PORT = 3001;

app.use('/auth', require('./routes/auth'));
app.use('/user', require('./routes/user'));
app.use('/product', require('./routes/product'));
// app.use('/admin', require('./routes/admin'));


app.listen(PORT, () => {
  console.log('Server started on port', PORT);
});