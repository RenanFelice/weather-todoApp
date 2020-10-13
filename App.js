const express = require('express')
const app = express()
const port = 3001
const bodyParser = require('body-parser');
const todosRouter = require('./routes/todos')



app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());


app.use('/todos', todosRouter)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})