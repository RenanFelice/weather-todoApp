const express = require('express')
const app = express()
const port = 3001
const db = require('./config/database')



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})