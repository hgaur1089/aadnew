const express = require('express');
const router = express.Router();
const user = require('./user');
const home = require('./home');

router.use('/user', user);
router.use('/home', home);

module.exports = router;