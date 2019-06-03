const pry = require('pryjs')
var express = require('express');
var router = express.Router();
var olympianStatsController = require('../controllers/olympianStatsController')

router.get('/', olympianStatsController.index);

module.exports = router;
