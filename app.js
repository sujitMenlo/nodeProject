var express = require('express');
var app = express();
global.router = express.Router();
global.mongoose = require('mongoose');
global._ = require('lodash');
global.passwordHash = require('password-hash');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
require('dotenv').config()

var url = "mongodb://localhost:27017/menlo_db";

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

 app.use(require('./router/index'));

app.post('/test', (req, res) => {
	res.send({ data: req.body });
})

app.listen(process.env.PORT, () => {
	console.log("app is running on PORT  ", process.env.PORT)
})

// ***************
