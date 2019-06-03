var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var olympiansRouter = require('./routes/olympians');
var olympianStatsRouter = require('./routes/olympian_stats');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/olympians', olympiansRouter);
app.use('/api/v1/olympian_stats', olympianStatsRouter);

module.exports = app;
