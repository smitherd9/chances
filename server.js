var express = require('express');
var app = express();
app.use(express.static('public'));





exports.app = app;


app.listen(process.env.PORT || 8080);