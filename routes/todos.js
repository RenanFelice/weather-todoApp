const express = require('express');
const router = express.Router();
const todosController = require('../controllers/TodosController')


// Get todo List
router.get('/', todosController.getTodos)

// Add todo
router.post('/add/newtodo', todosController.addTodo)


// Edit todo
router.post('/edit', todosController.editTodo)

// Delete todo
router.get('/delete/:id', todosController.deleteTodo)



module.exports = router;