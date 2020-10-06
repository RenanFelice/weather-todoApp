const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Todo = require('../models/Todo');


// Get todo List
router.get('/', (req, res) => {
    Todo.findAll()
    .then(todos => {
        res.json(todos)
    })
    .catch(err => console.log('errouuuuu', err ))
   
})

// Add todo
router.get('/add/:newtodo', (req, res) => {

    Todo.create({
        task:req.params.newtodo
    })
    .then(todo => console.log(todo))
    .catch(err => console.log('erro ao adicionar todo', err))
})

// Delete todo

router.get('/delete/:id', (req, res) => {
    Todo.destroy({
        where: {
          id: req.params.id
        }
      });
})


module.exports = router;