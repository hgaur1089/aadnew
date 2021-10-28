const express = require('express');
const router = express.Router();
const loginController = require('../controller/user/login-controller');

router.post('/login', loginController.login);

module.exports = router;

