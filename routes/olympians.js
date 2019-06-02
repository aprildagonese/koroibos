const pry = require('pryjs')
var express = require('express');
var router = express.Router();
var olympiansController = require('../controllers/olympiansController')

router.get('/', olympiansController.index);

module.exports = router;
