var express = require('express');
var router = express.Router();

router.get('/olympians', olympiansController.index);

module.exports = router;
