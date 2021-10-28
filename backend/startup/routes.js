const express = require("express");
const cookieParser = require('cookie-parser');
const routes = require('../routes');

module.exports = function(app) {
    app.use(cookieParser());
    app.use('/api', routes);
};