var express = require('express');
var router = express.Router();
var olympiansController = require('../controllers/olympiansController')

router.get('/olympians', olympiansController.index);

module.exports = router;
