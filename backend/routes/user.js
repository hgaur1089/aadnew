const express = require('express');
const router = express.Router();
const otpController = require('../controller/user/otp-controller');
const ekycController = require('../controller/user/ekyc-controller');

router.post('/otp', otpController.otp);
router.post('/ekyc', ekycController.ekyc)

module.exports = router;

