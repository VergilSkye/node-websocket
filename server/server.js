const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');

const publicPath = path.join(__dirname, '../public');
//Setting express
const app = express();

//app.set('views', publicPath);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(express.static(publicPath));


app.listen(3000, function() {
    console.log('Express server listening on port 3000');
});

console.log(publicPath);