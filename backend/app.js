const express = require('express')
const app = express()
const port = 8000
const server = app.listen(port, () => {
    console.log(`app listening on port ${port}!`);
  });

  app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  app.get('/aa', (req, res) => {
    res.send('Hello World!')
  })

require('./startup/routes')(app);