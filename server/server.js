const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000 ;
const app = express();

//app.set('views', publicPath);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(express.static(publicPath));


app.listen(port, () => {
    console.log('Express server listening on port ',port);
});

console.log(publicPath);