const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client/build')));

PORT = process.env.PORT || 3002;

app.use('/auth', require('./routes/auth'));
app.use('/user', require('./routes/user'));
app.use('/product', require('./routes/product'));
app.use('/admin', require('./routes/admin'));
app.use('/checkout', require('./routes/checkout'));


app.listen(PORT, () => {
  console.log('Server started on port', PORT);
});