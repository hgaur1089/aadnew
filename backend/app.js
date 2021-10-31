const express = require('express')
var path = require('path');
const app = express()
const port = 8000

const db = require('./config/mongoose');

app.use(express.urlencoded({extended:false}));

const server = app.listen(port, (err) => {
  if(err) console.log(err);
  console.log(`app listening on port ${port}!`);
});

app.set('views', './views');
app.set('view engine', 'ejs');
require('./startup/routes')(app);

