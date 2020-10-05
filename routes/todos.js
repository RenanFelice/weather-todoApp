const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Todo = require('../models/Todo');

router.get('/', (req, res) => {
    Todo.findAll()
    .then(todos => {
        res.json(todos)
    })
    .catch(err => console.log('errouuuuu', err ))
   
})

module.exports = router;