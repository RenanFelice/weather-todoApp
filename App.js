const express = require('express')
const app = express()
const port = 3001
const db = require('./config/database')
const bodyParser = require('body-parser');



app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());


app.use('/todos', require('./routes/todos'))

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})